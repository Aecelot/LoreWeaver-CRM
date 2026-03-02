import { getGmailClient, db, collections } from "./config";
import { Timestamp, FieldValue } from "firebase-admin/firestore";

// Base URL for tracking
const TRACKING_BASE_URL = "https://us-central1-loreweaver-crm.cloudfunctions.net";

interface NewsletterRecipient {
  contactId: string;
  email: string;
  name: string;
  company?: string;
}

interface Newsletter {
  id: string;
  listId: string;
  subject: string;
  body: string;
  status: string;
}

interface NewsletterList {
  filterTags: string[];
  filterLeadTypes: string[];
  manualIncludes: string[];
  manualExcludes: string[];
}

interface Contact {
  id: string;
  name: string;
  email: string;
  company?: string;
  tags?: string[];
  unsubscribedFrom?: string[];
}

interface Lead {
  id: string;
  type: string;
  name: string;
  contact: {
    name: string;
    email: string;
  };
}

/**
 * Simple markdown to HTML converter
 */
function markdownToHtml(markdown: string): string {
  let html = markdown
    // Escape HTML (but not our own tags)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // Headers
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Links - need to handle these before escaping broke them
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Line breaks
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br/>");

  // Wrap in paragraphs
  html = "<p>" + html + "</p>";

  // Fix the escaped link hrefs
  html = html.replace(/href="([^"]*?)&lt;([^"]*?)&gt;([^"]*?)"/g, 'href="$1<$2>$3"');

  return html;
}

/**
 * Create newsletter email with tracking
 */
function createNewsletterEmail(
  body: string,
  contactId: string,
  listId: string,
  newsletterId: string
): string {
  // Tracking pixel
  const trackingId = Buffer.from(
    JSON.stringify({ contactId, listId, newsletterId, t: Date.now() })
  ).toString("base64url");

  const trackingPixel = `<img src="${TRACKING_BASE_URL}/newsletterOpen?id=${trackingId}" width="1" height="1" style="display:none;" />`;

  // Convert markdown to HTML
  let htmlBody = markdownToHtml(body);

  // Wrap links for click tracking
  htmlBody = htmlBody.replace(
    /<a\s+href="([^"]+)"/g,
    (match, url) => {
      // Don't track unsubscribe links
      if (url.includes("unsubscribe")) return match;

      const clickId = Buffer.from(
        JSON.stringify({ contactId, listId, newsletterId, url, t: Date.now() })
      ).toString("base64url");
      return `<a href="${TRACKING_BASE_URL}/newsletterClick?id=${clickId}"`;
    }
  );

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        a { color: #3b82f6; }
        p { margin: 1em 0; }
        h1, h2, h3 { margin: 1.5em 0 0.5em; }
      </style>
    </head>
    <body>
      ${htmlBody}
      <hr style="margin: 2em 0; border: none; border-top: 1px solid #e5e7eb;">
      <p style="font-size: 12px; color: #6b7280;">
        Sent from LoreWeaver CRM
      </p>
      ${trackingPixel}
    </body>
    </html>
  `;
}

/**
 * Compute subscribers for a newsletter list
 */
async function computeSubscribers(
  list: NewsletterList,
  listId: string
): Promise<NewsletterRecipient[]> {
  const subscriberMap = new Map<string, NewsletterRecipient>();

  // Get all contacts
  const contactsSnap = await db.collection(collections.contacts).get();
  const contacts = contactsSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Contact[];

  // Get all leads
  const leadsSnap = await db.collection(collections.leads).get();
  const leads = leadsSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Lead[];

  // 1. Add contacts matching tags
  if (list.filterTags && list.filterTags.length > 0) {
    for (const contact of contacts) {
      if (contact.tags?.some((tag) => list.filterTags.includes(tag))) {
        if (contact.email) {
          subscriberMap.set(contact.id, {
            contactId: contact.id,
            email: contact.email,
            name: contact.name,
            company: contact.company,
          });
        }
      }
    }
  }

  // 2. Add contacts from leads matching lead types
  if (list.filterLeadTypes && list.filterLeadTypes.length > 0) {
    for (const lead of leads) {
      if (list.filterLeadTypes.includes(lead.type) && lead.contact?.email) {
        const matchingContact = contacts.find(
          (c) => c.email?.toLowerCase() === lead.contact.email?.toLowerCase()
        );

        const contactId = matchingContact?.id || `lead-${lead.id}`;

        if (!subscriberMap.has(contactId)) {
          subscriberMap.set(contactId, {
            contactId,
            email: lead.contact.email,
            name: lead.contact.name || lead.name,
            company: lead.name,
          });
        }
      }
    }
  }

  // 3. Add manual includes
  if (list.manualIncludes && list.manualIncludes.length > 0) {
    for (const contactId of list.manualIncludes) {
      const contact = contacts.find((c) => c.id === contactId);
      if (contact?.email && !subscriberMap.has(contactId)) {
        subscriberMap.set(contactId, {
          contactId: contact.id,
          email: contact.email,
          name: contact.name,
          company: contact.company,
        });
      }
    }
  }

  // 4. Remove manual excludes
  if (list.manualExcludes) {
    for (const contactId of list.manualExcludes) {
      subscriberMap.delete(contactId);
    }
  }

  // 5. Remove unsubscribed contacts
  for (const contact of contacts) {
    if (contact.unsubscribedFrom?.includes(listId)) {
      subscriberMap.delete(contact.id);
    }
  }

  // Filter out invalid emails
  return Array.from(subscriberMap.values()).filter(
    (s) => s.email && s.email.includes("@")
  );
}

/**
 * Process newsletter send request
 */
export async function processNewsletterSend(
  newsletterId: string,
  requestRef: FirebaseFirestore.DocumentReference
): Promise<void> {
  console.log(`[Newsletter] Processing send for ${newsletterId}`);

  try {
    // Update request status
    await requestRef.update({
      status: "processing",
    });

    // Get newsletter
    const newsletterDoc = await db
      .collection(collections.newsletters)
      .doc(newsletterId)
      .get();

    if (!newsletterDoc.exists) {
      throw new Error("Newsletter not found");
    }

    const newsletter = {
      id: newsletterDoc.id,
      ...newsletterDoc.data(),
    } as Newsletter;

    // Get list
    const listDoc = await db
      .collection(collections.newsletterLists)
      .doc(newsletter.listId)
      .get();

    if (!listDoc.exists) {
      throw new Error("Newsletter list not found");
    }

    const list = listDoc.data() as NewsletterList;

    // Compute subscribers
    const subscribers = await computeSubscribers(list, newsletter.listId);

    if (subscribers.length === 0) {
      throw new Error("No subscribers to send to");
    }

    console.log(`[Newsletter] Sending to ${subscribers.length} subscribers`);

    // Update newsletter stats
    await db.collection(collections.newsletters).doc(newsletterId).update({
      status: "sending",
      "stats.total": subscribers.length,
    });

    // Get Gmail client
    const gmail = await getGmailClient();

    let sentCount = 0;
    let failedCount = 0;

    // Send to each subscriber
    for (const subscriber of subscribers) {
      try {
        // Apply template variables
        let subject = newsletter.subject;
        let body = newsletter.body;

        const firstName = subscriber.name?.split(" ")[0] || "";

        subject = subject
          .replace(/\{\{name\}\}/g, subscriber.name || "")
          .replace(/\{\{firstName\}\}/g, firstName)
          .replace(/\{\{company\}\}/g, subscriber.company || "");

        // Create unsubscribe URL
        const unsubscribeId = Buffer.from(
          JSON.stringify({
            contactId: subscriber.contactId,
            listId: newsletter.listId,
          })
        ).toString("base64url");
        const unsubscribeUrl = `${TRACKING_BASE_URL}/newsletterUnsubscribe?id=${unsubscribeId}`;

        body = body
          .replace(/\{\{name\}\}/g, subscriber.name || "")
          .replace(/\{\{firstName\}\}/g, firstName)
          .replace(/\{\{company\}\}/g, subscriber.company || "")
          .replace(/\{\{unsubscribeUrl\}\}/g, unsubscribeUrl);

        // Create email with tracking
        const htmlBody = createNewsletterEmail(
          body,
          subscriber.contactId,
          newsletter.listId,
          newsletterId
        );

        // Create RFC 2822 email
        const email = [
          `To: ${subscriber.email}`,
          `Subject: ${subject}`,
          "MIME-Version: 1.0",
          'Content-Type: text/html; charset="UTF-8"',
          "",
          htmlBody,
        ].join("\r\n");

        const encodedEmail = Buffer.from(email).toString("base64url");

        // Send email
        const response = await gmail.users.messages.send({
          userId: "me",
          requestBody: {
            raw: encodedEmail,
          },
        });

        // Create recipient record
        await db.collection(collections.newsletterRecipients).add({
          newsletterId,
          contactId: subscriber.contactId,
          email: subscriber.email,
          name: subscriber.name,
          status: "sent",
          messageId: response.data.id,
          sentAt: Timestamp.now(),
          openedAt: null,
          clickedAt: null,
        });

        sentCount++;

        // Rate limiting - wait 100ms between emails
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error) {
        console.error(
          `[Newsletter] Failed to send to ${subscriber.email}:`,
          error
        );

        // Create failed recipient record
        await db.collection(collections.newsletterRecipients).add({
          newsletterId,
          contactId: subscriber.contactId,
          email: subscriber.email,
          name: subscriber.name,
          status: "failed",
          messageId: null,
          sentAt: null,
          openedAt: null,
          clickedAt: null,
        });

        failedCount++;
      }
    }

    // Update newsletter status
    await db.collection(collections.newsletters).doc(newsletterId).update({
      status: "sent",
      sentAt: Timestamp.now(),
      "stats.sent": sentCount,
    });

    // Update request status
    await requestRef.update({
      status: "completed",
      completedAt: Timestamp.now(),
      sentCount,
      failedCount,
    });

    console.log(
      `[Newsletter] Completed. Sent: ${sentCount}, Failed: ${failedCount}`
    );
  } catch (error: unknown) {
    const err = error as { message?: string };
    console.error("[Newsletter] Error processing send:", err.message);

    // Update newsletter status
    await db.collection(collections.newsletters).doc(newsletterId).update({
      status: "failed",
    });

    // Update request status
    await requestRef.update({
      status: "error",
      error: err.message || "Failed to send newsletter",
      completedAt: Timestamp.now(),
    });
  }
}

/**
 * Handle newsletter open tracking
 */
export async function handleNewsletterOpen(trackingId: string): Promise<void> {
  try {
    const data = JSON.parse(Buffer.from(trackingId, "base64url").toString());
    const { contactId, newsletterId } = data;

    // Find recipient record
    const recipients = await db
      .collection(collections.newsletterRecipients)
      .where("newsletterId", "==", newsletterId)
      .where("contactId", "==", contactId)
      .limit(1)
      .get();

    if (!recipients.empty) {
      const doc = recipients.docs[0];
      const recipientData = doc.data();

      // Only update if not already opened
      if (!recipientData.openedAt) {
        await doc.ref.update({
          openedAt: Timestamp.now(),
        });

        // Update newsletter stats
        await db
          .collection(collections.newsletters)
          .doc(newsletterId)
          .update({
            "stats.opened": FieldValue.increment(1),
          });
      }
    }
  } catch (error) {
    console.error("[Newsletter] Error tracking open:", error);
  }
}

/**
 * Handle newsletter click tracking
 */
export async function handleNewsletterClick(
  trackingId: string
): Promise<string | null> {
  try {
    const data = JSON.parse(Buffer.from(trackingId, "base64url").toString());
    const { contactId, newsletterId, url } = data;

    // Find recipient record
    const recipients = await db
      .collection(collections.newsletterRecipients)
      .where("newsletterId", "==", newsletterId)
      .where("contactId", "==", contactId)
      .limit(1)
      .get();

    if (!recipients.empty) {
      const doc = recipients.docs[0];
      const recipientData = doc.data();

      // Only update if not already clicked
      if (!recipientData.clickedAt) {
        await doc.ref.update({
          clickedAt: Timestamp.now(),
        });

        // Update newsletter stats
        await db
          .collection(collections.newsletters)
          .doc(newsletterId)
          .update({
            "stats.clicked": FieldValue.increment(1),
          });
      }
    }

    return url;
  } catch (error) {
    console.error("[Newsletter] Error tracking click:", error);
    return null;
  }
}

/**
 * Handle newsletter unsubscribe
 */
export async function handleNewsletterUnsubscribe(
  trackingId: string
): Promise<boolean> {
  try {
    const data = JSON.parse(Buffer.from(trackingId, "base64url").toString());
    const { contactId, listId } = data;

    // Skip if contactId starts with "lead-" (not a real contact)
    if (contactId.startsWith("lead-")) {
      console.log("[Newsletter] Cannot unsubscribe lead-based contact");
      return false;
    }

    // Update contact
    const contactRef = db.collection(collections.contacts).doc(contactId);
    const contactDoc = await contactRef.get();

    if (contactDoc.exists) {
      const contact = contactDoc.data() as Contact;
      const unsubscribedFrom = contact.unsubscribedFrom || [];

      if (!unsubscribedFrom.includes(listId)) {
        await contactRef.update({
          unsubscribedFrom: [...unsubscribedFrom, listId],
        });
      }

      // Find any newsletter recipients and update unsubscribe count
      // This is for tracking purposes
      const recentNewsletters = await db
        .collection(collections.newsletters)
        .where("listId", "==", listId)
        .orderBy("sentAt", "desc")
        .limit(1)
        .get();

      if (!recentNewsletters.empty) {
        await recentNewsletters.docs[0].ref.update({
          "stats.unsubscribed": FieldValue.increment(1),
        });
      }

      return true;
    }

    return false;
  } catch (error) {
    console.error("[Newsletter] Error handling unsubscribe:", error);
    return false;
  }
}
