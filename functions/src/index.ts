import * as functions from "firebase-functions";
import cors from "cors";
import { processScheduledEmails, checkForReplies } from "./gmail";
import { db, collections, createOAuth2Client } from "./config";
import { Timestamp } from "firebase-admin/firestore";
import { google } from "googleapis";

// Configure CORS - allow all origins
const corsMiddleware = cors({ origin: true });

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
export const emailOpen = functions.https.onRequest((req, res) => {
  corsMiddleware(req, res, async () => {
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
});

/**
 * Track link clicks
 */
export const emailClick = functions.https.onRequest((req, res) => {
  corsMiddleware(req, res, async () => {
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
});

// =============================================================================
// GMAIL OAUTH (Firestore triggers to bypass org network policies)
// =============================================================================

/**
 * Generate Gmail OAuth URL via Firestore trigger
 * Frontend creates a request doc, this function writes the response
 */
export const onGmailAuthRequest = functions.firestore
  .document("gmailAuthRequests/{requestId}")
  .onCreate(async (snap) => {
    try {
      // Use frontend redirect to bypass org policy blocking HTTP functions
      const oauth2Client = createOAuth2Client(true);

      const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: [
          "https://www.googleapis.com/auth/gmail.send",
          "https://www.googleapis.com/auth/gmail.readonly",
          "https://www.googleapis.com/auth/gmail.modify",
          "https://www.googleapis.com/auth/userinfo.email",
          "https://www.googleapis.com/auth/contacts.readonly",
        ],
      });

      // Use snap.ref to update the same document that triggered
      await snap.ref.update({
        url: authUrl,
        status: "completed",
        completedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error("Error generating auth URL:", error);
      await snap.ref.update({
        error: "Failed to generate auth URL",
        status: "error",
        completedAt: Timestamp.now(),
      });
    }
  });

/**
 * Exchange OAuth code for tokens via Firestore trigger
 * Frontend writes the code to Firestore, this function exchanges it
 */
export const onGmailCodeExchange = functions.firestore
  .document("gmailCodeExchange/{exchangeId}")
  .onCreate(async (snap) => {
    const exchangeId = snap.id;
    console.log(`[Gmail OAuth] Trigger fired for exchange: ${exchangeId}`);

    const data = snap.data();
    const code = data?.code;
    console.log(`[Gmail OAuth] Code received: ${code ? code.substring(0, 20) + '...' : 'NO CODE'}`);

    if (!code) {
      console.error("[Gmail OAuth] No code provided in document");
      await snap.ref.update({
        status: "error",
        error: "No code provided",
        completedAt: Timestamp.now(),
      });
      return;
    }

    try {
      console.log("[Gmail OAuth] Creating OAuth2 client with frontend redirect...");
      const oauth2Client = createOAuth2Client(true);

      console.log("[Gmail OAuth] Exchanging code for tokens...");
      const { tokens } = await oauth2Client.getToken(code);
      console.log("[Gmail OAuth] Token exchange successful, got tokens:", {
        hasAccessToken: !!tokens.access_token,
        hasRefreshToken: !!tokens.refresh_token,
        expiryDate: tokens.expiry_date,
      });

      oauth2Client.setCredentials(tokens);

      // Get user email
      console.log("[Gmail OAuth] Fetching user info...");
      const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
      const userInfo = await oauth2.userinfo.get();
      const email = userInfo.data.email;
      console.log("[Gmail OAuth] User email:", email);

      // Store tokens in Firestore
      console.log("[Gmail OAuth] Storing tokens in Firestore...");
      await db.collection(collections.config).doc("gmail").set({
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresAt: tokens.expiry_date,
        email: email,
        connectedAt: Timestamp.now(),
      });
      console.log("[Gmail OAuth] Tokens stored successfully");

      await snap.ref.update({
        status: "completed",
        email: email,
        completedAt: Timestamp.now(),
      });
      console.log("[Gmail OAuth] Exchange document updated with completed status");
    } catch (error: unknown) {
      const err = error as { message?: string; code?: string; response?: { data?: unknown } };
      console.error("[Gmail OAuth] Error exchanging code:", {
        message: err.message,
        code: err.code,
        responseData: err.response?.data,
        fullError: JSON.stringify(error, Object.getOwnPropertyNames(error)),
      });
      await snap.ref.update({
        status: "error",
        error: err.message || "Failed to exchange code for tokens",
        completedAt: Timestamp.now(),
      });
    }
  });

/**
 * Handle Gmail OAuth callback
 * Exchanges auth code for tokens and stores them
 * NOTE: This must remain an HTTP function for Google OAuth redirect
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
    res.redirect("https://loreweaver-crm.web.app/settings?gmail=connected");
  } catch (error) {
    console.error("Error exchanging code for tokens:", error);
    res.redirect("https://loreweaver-crm.web.app/settings?gmail=error");
  }
});

// NOTE: getGmailStatus and disconnectGmail removed - handled directly via Firestore from frontend
// Frontend reads config/gmail for status, deletes config/gmail for disconnect

/**
 * Send test email via Firestore trigger
 * Frontend writes a request doc, this function sends the email
 */
export const onTestEmailRequest = functions.firestore
  .document("testEmailRequests/{requestId}")
  .onCreate(async (snap) => {
    const data = snap.data();
    const to = data?.to;
    const subject = data?.subject || "Test Email from LoreWeaver CRM";
    const body = data?.body || "<p>This is a test email to verify Gmail connection is working.</p>";

    console.log(`[Test Email] Sending test email to: ${to}`);

    if (!to) {
      await snap.ref.update({
        status: "error",
        error: "No recipient email provided",
        completedAt: Timestamp.now(),
      });
      return;
    }

    try {
      // Get Gmail config
      const configDoc = await db.collection(collections.config).doc("gmail").get();
      if (!configDoc.exists) {
        throw new Error("Gmail not connected. Please connect Gmail first.");
      }

      const config = configDoc.data();
      if (!config?.refreshToken) {
        throw new Error("Gmail refresh token not found. Please reconnect Gmail.");
      }

      // Create OAuth client and send email
      const { getGmailClient } = await import("./config");
      const gmail = await getGmailClient();

      const htmlBody = `
        <!DOCTYPE html>
        <html>
        <body>
          ${body}
          <hr>
          <p style="color: #888; font-size: 12px;">
            Sent from LoreWeaver CRM - Test Email
          </p>
        </body>
        </html>
      `;

      const email = [
        `To: ${to}`,
        `Subject: ${subject}`,
        "MIME-Version: 1.0",
        'Content-Type: text/html; charset="UTF-8"',
        "",
        htmlBody,
      ].join("\r\n");

      const encodedEmail = Buffer.from(email).toString("base64url");

      const response = await gmail.users.messages.send({
        userId: "me",
        requestBody: {
          raw: encodedEmail,
        },
      });

      console.log(`[Test Email] Email sent successfully, messageId: ${response.data.id}`);

      await snap.ref.update({
        status: "completed",
        messageId: response.data.id,
        completedAt: Timestamp.now(),
      });
    } catch (error: unknown) {
      const err = error as { message?: string };
      console.error("[Test Email] Error sending test email:", err.message);
      await snap.ref.update({
        status: "error",
        error: err.message || "Failed to send test email",
        completedAt: Timestamp.now(),
      });
    }
  });

// =============================================================================
// GOOGLE CONTACTS IMPORT
// =============================================================================

interface GoogleContact {
  resourceName: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
}

/**
 * Import contacts from Google People API via Firestore trigger
 * Frontend writes a request doc, this function fetches contacts and returns them
 */
export const onContactImportRequest = functions.firestore
  .document("contactImportRequests/{requestId}")
  .onCreate(async (snap) => {
    console.log("[Contact Import] Trigger fired");

    try {
      const { getPeopleClient } = await import("./config");
      const people = await getPeopleClient();

      const contacts: GoogleContact[] = [];
      let nextPageToken: string | undefined;

      // Fetch all contacts with pagination
      do {
        console.log(`[Contact Import] Fetching page, token: ${nextPageToken || 'initial'}`);

        const response = await people.people.connections.list({
          resourceName: "people/me",
          pageSize: 1000,
          pageToken: nextPageToken,
          personFields: "names,emailAddresses,phoneNumbers,organizations",
        });

        const connections = response.data.connections || [];
        console.log(`[Contact Import] Got ${connections.length} connections`);

        for (const person of connections) {
          // Only include contacts with at least a name or email
          const name = person.names?.[0]?.displayName;
          const email = person.emailAddresses?.[0]?.value;

          if (name || email) {
            contacts.push({
              resourceName: person.resourceName || "",
              name: name || "",
              email: email || "",
              phone: person.phoneNumbers?.[0]?.value || "",
              company: person.organizations?.[0]?.name || "",
              jobTitle: person.organizations?.[0]?.title || "",
            });
          }
        }

        nextPageToken = response.data.nextPageToken || undefined;
      } while (nextPageToken);

      console.log(`[Contact Import] Total contacts found: ${contacts.length}`);

      await snap.ref.update({
        status: "completed",
        contacts: contacts,
        totalCount: contacts.length,
        completedAt: Timestamp.now(),
      });
    } catch (error: unknown) {
      const err = error as { message?: string; code?: number };
      console.error("[Contact Import] Error:", err.message);

      // Check for permission error
      const errorMessage = err.code === 403
        ? "Contact permission not granted. Please disconnect and reconnect Gmail to grant contact access."
        : err.message || "Failed to import contacts";

      await snap.ref.update({
        status: "error",
        error: errorMessage,
        completedAt: Timestamp.now(),
      });
    }
  });

// =============================================================================
// NEWSLETTER FUNCTIONS
// =============================================================================

import {
  processNewsletterSend,
  handleNewsletterOpen,
  handleNewsletterClick,
  handleNewsletterUnsubscribe,
} from "./newsletter";

/**
 * Trigger newsletter send when request document is created
 */
export const onNewsletterSendRequest = functions.firestore
  .document("newsletterSendRequests/{requestId}")
  .onCreate(async (snap) => {
    const data = snap.data();
    const newsletterId = data?.newsletterId;

    if (!newsletterId) {
      await snap.ref.update({
        status: "error",
        error: "No newsletter ID provided",
        completedAt: Timestamp.now(),
      });
      return;
    }

    await processNewsletterSend(newsletterId, snap.ref);
  });

/**
 * Track newsletter opens via tracking pixel
 */
export const newsletterOpen = functions.https.onRequest((req, res) => {
  corsMiddleware(req, res, async () => {
    try {
      const { id } = req.query;

      if (typeof id === "string") {
        await handleNewsletterOpen(id);
      }
    } catch (error) {
      console.error("Error tracking newsletter open:", error);
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
});

/**
 * Track newsletter link clicks
 */
export const newsletterClick = functions.https.onRequest((req, res) => {
  corsMiddleware(req, res, async () => {
    try {
      const { id } = req.query;

      if (typeof id === "string") {
        const url = await handleNewsletterClick(id);

        if (url) {
          res.redirect(302, url);
          return;
        }
      }
    } catch (error) {
      console.error("Error tracking newsletter click:", error);
    }

    res.status(400).send("Invalid tracking link");
  });
});

/**
 * Handle newsletter unsubscribe
 */
export const newsletterUnsubscribe = functions.https.onRequest(async (req, res) => {
  try {
    const { id } = req.query;

    if (typeof id === "string") {
      const success = await handleNewsletterUnsubscribe(id);

      if (success) {
        res.send(`
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Unsubscribed</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                margin: 0;
                background: #f9fafb;
              }
              .container {
                text-align: center;
                padding: 2rem;
                background: white;
                border-radius: 8px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                max-width: 400px;
              }
              h1 {
                color: #111827;
                margin: 0 0 0.5rem;
              }
              p {
                color: #6b7280;
                margin: 0;
              }
              .icon {
                font-size: 3rem;
                margin-bottom: 1rem;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="icon">✓</div>
              <h1>Unsubscribed</h1>
              <p>You have been successfully unsubscribed from this mailing list.</p>
            </div>
          </body>
          </html>
        `);
        return;
      }
    }

    res.status(400).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: #f9fafb;
          }
          .container {
            text-align: center;
            padding: 2rem;
            background: white;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            max-width: 400px;
          }
          h1 {
            color: #111827;
            margin: 0 0 0.5rem;
          }
          p {
            color: #6b7280;
            margin: 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Invalid Link</h1>
          <p>This unsubscribe link is invalid or has expired.</p>
        </div>
      </body>
      </html>
    `);
  } catch (error) {
    console.error("Error handling unsubscribe:", error);
    res.status(500).send("An error occurred");
  }
});
