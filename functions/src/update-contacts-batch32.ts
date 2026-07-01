/**
 * CRM Contact Enrichment Batch 32 - Update found contacts
 * Run with: npx ts-node src/update-contacts-batch32.ts
 */

import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    projectId: "loreweaver-crm",
  });
}

const db = admin.firestore();

interface ContactUpdate {
  studioName: string;
  leadId: string;
  email: string;
  contactName?: string;
  notes?: string;
}

const contactsFound: ContactUpdate[] = [
  {
    studioName: "Peakware Studio",
    leadId: "JjzwPA2MxF1UhPKRDQe4",
    email: "business@peakwarestudio.com",
    notes: "Thailand indie studio - found on website contact page"
  },
  {
    studioName: "Q-Games",
    leadId: "QPaZZnmZkPWg0nu5V6kR",
    email: "contact@q-games.com",
    notes: "Japan - Dylan Cuthbert's studio. Business development email from contact page. Also: pr@q-games.com for press"
  },
  {
    studioName: "Dark Emerald Studios",
    leadId: "Z9knbSHxhCiooCtTE3uz",
    email: "info@darkemerald.me",
    notes: "UAE indie studio - making Enci's Solution. Business inquiries email from contact page"
  },
  {
    studioName: "Pomelo Games",
    leadId: "WdHB6h8pnzO6TSAnXgHn",
    email: "hello@pomelogames.com",
    notes: "Uruguay - Once Upon a Tower, Outlanders series. Found on website footer"
  },
  {
    studioName: "GameEon Studios",
    leadId: "U4PgHAvTCYmExcEUgI0E",
    email: "hello@gameeon.in",
    notes: "India (Mumbai) - Mumbai Gullies developer. Client services + original games. Phone: +91 89769 89251"
  }
];

// Studios researched but no email found (mark as contactResearched)
const studiosResearchedNoEmail = [
  { leadId: "CPUmwNf1Yt3tguOiFr9k", name: "Nippon Ichi Software", reason: "No public business email - use NIS America for Western contact" },
  { leadId: "IjR42GeSy3rDds3a9LLn", name: "Access Games", reason: "Contact form only on website - no direct email" },
  { leadId: "KPrPHrQtoEvwUzqWxQ0r", name: "Team17", reason: "Large publisher - no public business email, address only" },
  { leadId: "bNhsPeDGYR7qCh2Vibzn", name: "Deck13 Interactive", reason: "Contact form only - jobs@deck13.com and press@deck13.com available" },
  { leadId: "Xgym1rGSkzSHuNE8e3AB", name: "Sumo Digital", reason: "Large studio - addresses only, no public email" },
  { leadId: "bVeZaT5zio53yi62TMmC", name: "Nodding Heads Games", reason: "Contact form only on website - Raji developers" },
  { leadId: "ZKgcH4pJWIfqGTsaBN7g", name: "Asobo Studio", reason: "No contact email visible - A Plague Tale developer" },
  { leadId: "alvbSuAaStpQKkf4WRXT", name: "Starbreeze Studios", reason: "Email obfuscated on website - Payday developer" },
  { leadId: "IO8j4qnOUtuw60VJXDV0", name: "Studio Sirah", reason: "Contact form only - Kurukshetra developer" },
  { leadId: "GnGfNFYAAyB5L5Nn7ILI", name: "Chickmania Entertainment", reason: "Phone only: +962777150128 - Jordan marketing/games agency" },
  { leadId: "QalmPeJt0O4xAZgLGRr4", name: "Caramel Tech Studios", reason: "Website has internal server error on contact page" },
  { leadId: "GFCW0lRjIgsKgHPv6arA", name: "NExT Studios", reason: "Website blocked/403 - Tencent studio" },
  { leadId: "SRoEtQEJ7O7HtP54aUMt", name: "Harvester Games", reason: "No contact page found - Cat Lady developer" },
  { leadId: "HL1ANS4OIKmq2Iqu3TIK", name: "Humble Games", reason: "Rebranded to Balor Games, website transition ongoing" },
];

async function updateContacts() {
  console.log("CRM Contact Enrichment Batch 32 - Updating contacts...\n");
  
  // Update contacts with found emails
  for (const contact of contactsFound) {
    try {
      const leadRef = db.collection("leads").doc(contact.leadId);
      await leadRef.update({
        "contact.email": contact.email,
        ...(contact.contactName && { "contact.name": contact.contactName }),
        contactResearched: true,
        contactResearchNotes: contact.notes || "",
        contactUpdatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      console.log(`✅ Updated ${contact.studioName}: ${contact.email}`);
    } catch (error) {
      console.error(`❌ Failed to update ${contact.studioName}:`, error);
    }
  }
  
  console.log("\n--- Marking researched (no email found) ---\n");
  
  // Mark studios as researched but no email
  for (const studio of studiosResearchedNoEmail) {
    try {
      const leadRef = db.collection("leads").doc(studio.leadId);
      await leadRef.update({
        contactResearched: true,
        contactResearchNotes: studio.reason,
        contactUpdatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      console.log(`📝 Marked ${studio.name} as researched: ${studio.reason}`);
    } catch (error) {
      console.error(`❌ Failed to mark ${studio.name}:`, error);
    }
  }
  
  console.log("\n=== SUMMARY ===");
  console.log(`Emails found and updated: ${contactsFound.length}`);
  console.log(`Marked as researched (no email): ${studiosResearchedNoEmail.length}`);
  console.log(`Total processed: ${contactsFound.length + studiosResearchedNoEmail.length}`);
}

updateContacts().catch(console.error);
