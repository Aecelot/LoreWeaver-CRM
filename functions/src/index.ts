import * as functions from "firebase-functions";
import { processScheduledEmails, checkForReplies } from "./gmail";
import { db, collections, createOAuth2Client } from "./config";
import { Timestamp } from "firebase-admin/firestore";
import { google } from "googleapis";

// =============================================================================
// SCHEDULED FUNCTIONS (Gen 1)
// =============================================================================

/**
 * Process scheduled emails every hour
 * Checks for emails that need to be sent based on sequence timing
 */
export const processEmails = functions
  .runWith({ memory: "256MB" })
  .pubsub.schedule("every 1 hours")
  .timeZone("Europe/Amsterdam")
  .onRun(async () => {
    console.log("Running scheduled email processor...");
    await processScheduledEmails();
    console.log("Scheduled email processor complete.");
    return null;
  });

/**
 * Check for replies every 15 minutes
 * Updates sequence status when recipients reply
 */
export const processReplies = functions
  .runWith({ memory: "256MB" })
  .pubsub.schedule("every 15 minutes")
  .timeZone("Europe/Amsterdam")
  .onRun(async () => {
    console.log("Checking for replies...");
    await checkForReplies();
    console.log("Reply check complete.");
    return null;
  });

// =============================================================================
// TRACKING ENDPOINTS (Gen 1)
// =============================================================================

/**
 * Track email opens via tracking pixel
 */
export const emailOpen = functions.https.onRequest(async (req, res) => {
  // Enable CORS
  res.set("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "GET");
    res.status(204).send("");
    return;
  }

  try {
    const { id } = req.query;

    if (typeof id === "string") {
      const data = JSON.parse(Buffer.from(id, "base64url").toString());
      const { leadId, sequenceId, step } = data;

      // Update the email event
      const sequenceDoc = await db
        .collection(collections.leadSequences)
        .where("leadId", "==", leadId)
        .where("sequenceId", "==", sequenceId)
        .limit(1)
        .get();

      if (!sequenceDoc.empty) {
        const doc = sequenceDoc.docs[0];
        const status = doc.data();
        const updatedHistory = status.history.map((e: { step: number; opened: boolean }) =>
          e.step === step && !e.opened
            ? { ...e, opened: true, openedAt: Timestamp.now() }
            : e
        );
        await doc.ref.update({ history: updatedHistory });
      }
    }
  } catch (error) {
    console.error("Error tracking open:", error);
  }

  // Return 1x1 transparent GIF
  const pixel = Buffer.from(
    "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
    "base64"
  );
  res.set("Content-Type", "image/gif");
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.send(pixel);
});

/**
 * Track link clicks
 */
export const emailClick = functions.https.onRequest(async (req, res) => {
  // Enable CORS
  res.set("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "GET");
    res.status(204).send("");
    return;
  }

  try {
    const { id } = req.query;

    if (typeof id === "string") {
      const data = JSON.parse(Buffer.from(id, "base64url").toString());
      const { leadId, sequenceId, step, url } = data;

      // Update the email event
      const sequenceDoc = await db
        .collection(collections.leadSequences)
        .where("leadId", "==", leadId)
        .where("sequenceId", "==", sequenceId)
        .limit(1)
        .get();

      if (!sequenceDoc.empty) {
        const doc = sequenceDoc.docs[0];
        const status = doc.data();
        const updatedHistory = status.history.map((e: { step: number; clicked: boolean }) =>
          e.step === step && !e.clicked
            ? { ...e, clicked: true, clickedAt: Timestamp.now() }
            : e
        );
        await doc.ref.update({ history: updatedHistory });
      }

      // Redirect to original URL
      if (url) {
        res.redirect(302, url);
        return;
      }
    }
  } catch (error) {
    console.error("Error tracking click:", error);
  }

  res.status(400).send("Invalid tracking link");
});

// =============================================================================
// GMAIL OAUTH (Gen 1)
// =============================================================================

/**
 * Generate Gmail OAuth URL
 * Called from frontend to get the authorization URL
 */
export const gmailAuthUrl = functions.https.onRequest(async (req, res) => {
  // Enable CORS
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  const oauth2Client = createOAuth2Client();

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/gmail.send",
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/gmail.modify",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });

  res.json({ url: authUrl });
});

/**
 * Handle Gmail OAuth callback
 * Exchanges auth code for tokens and stores them
 */
export const gmailCallback = functions.https.onRequest(async (req, res) => {
  const { code } = req.query;

  if (typeof code !== "string") {
    res.status(400).send("Missing authorization code");
    return;
  }

  try {
    const oauth2Client = createOAuth2Client();
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Get user email
    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();
    const email = userInfo.data.email;

    // Store tokens in Firestore
    await db.collection(collections.config).doc("gmail").set({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresAt: tokens.expiry_date,
      email: email,
      connectedAt: Timestamp.now(),
    });

    // Redirect back to CRM settings with success
    res.redirect("https://loreweaver-crm.firebaseapp.com/settings?gmail=connected");
  } catch (error) {
    console.error("Error exchanging code for tokens:", error);
    res.redirect("https://loreweaver-crm.firebaseapp.com/settings?gmail=error");
  }
});

/**
 * Check Gmail connection status
 */
export const gmailStatus = functions.https.onRequest(async (req, res) => {
  // Enable CORS
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  try {
    const configDoc = await db.collection(collections.config).doc("gmail").get();

    if (!configDoc.exists) {
      res.json({ connected: false });
      return;
    }

    const config = configDoc.data();
    res.json({
      connected: true,
      email: config?.email,
      connectedAt: config?.connectedAt?.toDate(),
    });
  } catch (error) {
    console.error("Error checking Gmail status:", error);
    res.json({ connected: false, error: "Failed to check status" });
  }
});

/**
 * Disconnect Gmail
 */
export const gmailDisconnect = functions.https.onRequest(async (req, res) => {
  // Enable CORS
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  try {
    await db.collection(collections.config).doc("gmail").delete();
    res.json({ success: true });
  } catch (error) {
    console.error("Error disconnecting Gmail:", error);
    res.status(500).json({ success: false, error: "Failed to disconnect" });
  }
});
