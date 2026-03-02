import { google } from "googleapis";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp();
}

export const db = admin.firestore();

// Get Gmail credentials from environment or functions config
function getGmailCredentials() {
  console.log("[Gmail Config] Getting credentials...");
  console.log("[Gmail Config] Env vars present:", {
    hasClientId: !!process.env.GMAIL_CLIENT_ID,
    hasClientSecret: !!process.env.GMAIL_CLIENT_SECRET,
  });

  // Try environment variables first (for local development)
  if (process.env.GMAIL_CLIENT_ID && process.env.GMAIL_CLIENT_SECRET) {
    console.log("[Gmail Config] Using environment variables");
    return {
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
    };
  }

  // Fall back to Firebase functions config
  const config = functions.config();
  console.log("[Gmail Config] Functions config present:", {
    hasGmail: !!config.gmail,
    hasClientId: !!config.gmail?.client_id,
    hasClientSecret: !!config.gmail?.client_secret,
  });

  if (config.gmail?.client_id && config.gmail?.client_secret) {
    console.log("[Gmail Config] Using functions config");
    return {
      clientId: config.gmail.client_id,
      clientSecret: config.gmail.client_secret,
    };
  }

  console.error("[Gmail Config] No credentials found!");
  throw new Error("Gmail credentials not configured. Set GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET.");
}

// Create OAuth2 client for Gmail
export function createOAuth2Client(redirectToFrontend = false) {
  const credentials = getGmailCredentials();
  const redirectUri = redirectToFrontend
    ? "https://loreweaver-crm.web.app/settings"
    : "https://us-central1-loreweaver-crm.cloudfunctions.net/gmailCallback";

  console.log("[Gmail Config] Creating OAuth2 client with:", {
    clientId: credentials.clientId.substring(0, 20) + "...",
    redirectUri,
  });

  return new google.auth.OAuth2(
    credentials.clientId,
    credentials.clientSecret,
    redirectUri
  );
}

// Get authenticated Gmail client
export async function getGmailClient() {
  const configDoc = await db.collection("config").doc("gmail").get();

  if (!configDoc.exists) {
    throw new Error("Gmail not connected. Please connect Gmail in Settings.");
  }

  const config = configDoc.data();
  if (!config?.refreshToken) {
    throw new Error("Gmail refresh token not found. Please reconnect Gmail.");
  }

  const oauth2Client = createOAuth2Client();
  oauth2Client.setCredentials({
    refresh_token: config.refreshToken,
  });

  // Refresh access token if needed
  const { credentials } = await oauth2Client.refreshAccessToken();
  oauth2Client.setCredentials(credentials);

  return google.gmail({ version: "v1", auth: oauth2Client });
}

// Get authenticated People API client (for Google Contacts)
export async function getPeopleClient() {
  const configDoc = await db.collection("config").doc("gmail").get();

  if (!configDoc.exists) {
    throw new Error("Gmail not connected. Please connect Gmail in Settings.");
  }

  const config = configDoc.data();
  if (!config?.refreshToken) {
    throw new Error("Gmail refresh token not found. Please reconnect Gmail.");
  }

  const oauth2Client = createOAuth2Client();
  oauth2Client.setCredentials({
    refresh_token: config.refreshToken,
  });

  // Refresh access token if needed
  const { credentials } = await oauth2Client.refreshAccessToken();
  oauth2Client.setCredentials(credentials);

  return google.people({ version: "v1", auth: oauth2Client });
}

// Collection references
export const collections = {
  sequences: "sequences",
  leads: "leads",
  leadSequences: "leadSequences",
  emailEvents: "emailEvents",
  config: "config",
};
