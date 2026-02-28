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
  // Try environment variables first (for local development)
  if (process.env.GMAIL_CLIENT_ID && process.env.GMAIL_CLIENT_SECRET) {
    return {
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
    };
  }

  // Fall back to Firebase functions config
  const config = functions.config();
  if (config.gmail?.client_id && config.gmail?.client_secret) {
    return {
      clientId: config.gmail.client_id,
      clientSecret: config.gmail.client_secret,
    };
  }

  throw new Error("Gmail credentials not configured. Set GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET.");
}

// Create OAuth2 client for Gmail
export function createOAuth2Client() {
  const credentials = getGmailCredentials();
  return new google.auth.OAuth2(
    credentials.clientId,
    credentials.clientSecret,
    "https://us-central1-loreweaver-crm.cloudfunctions.net/gmailCallback"
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

// Collection references
export const collections = {
  sequences: "sequences",
  leads: "leads",
  leadSequences: "leadSequences",
  emailEvents: "emailEvents",
  config: "config",
};
