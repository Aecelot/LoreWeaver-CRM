// Add contacts extracted from Docusign emails (SAFE signers, LOI signers)
import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, '..', 'service-account.json'), 'utf8')
);

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

// Contacts extracted from Docusign "viewed/signed" emails
const contacts = [
  {
    name: "Chiara Kelm",
    document: "Loreweaver_SAFE_Agreement_EN.pdf",
    date: "2025-12-14",
    type: "investor",
    notes: "Viewed SAFE Agreement via Docusign"
  },
  {
    name: "Leandros Ntolas",
    document: "Letter of Intent – LoreWeaver Collaboration.pdf",
    date: "2025-11-13",
    type: "partner",
    notes: "Viewed LOI via Docusign"
  },
  {
    name: "Marc Omes",
    document: "Loreweaver_SAFE_Agreement_EN.pdf",
    date: "2025-11-03",
    type: "investor",
    notes: "Viewed SAFE Agreement via Docusign"
  },
  {
    name: "Collin van Ginkel",
    document: "LoreWeaver_Customer_LOI.pdf",
    date: "2025-10-23",
    type: "customer",
    notes: "Signed Customer LOI via Docusign"
  },
  {
    name: "Terri",
    document: "Loreweaver_SAFE_Agreement_EN.pdf",
    date: "2025-09-28",
    type: "investor",
    notes: "Viewed SAFE Agreement via Docusign (first name only)"
  },
  {
    name: "Shane",
    document: "Loreweaver_SAFE_Agreement_EN.pdf",
    date: "2025-09-26",
    type: "investor",
    notes: "Viewed SAFE Agreement via Docusign (first name only)"
  },
  {
    name: "TJ Richards",
    document: "Loreweaver_SAFE_Agreement_EN.pdf",
    date: "2025-09-26",
    type: "investor",
    notes: "Viewed SAFE Agreement via Docusign"
  },
  {
    name: "Tyler Lewis",
    document: "Loreweaver_SAFE_Agreement_EN.pdf",
    date: "2025-09-25",
    type: "investor",
    notes: "Viewed SAFE Agreement via Docusign"
  },
];

async function addDocusignContacts() {
  console.log('Adding Docusign contacts...\n');
  
  let added = 0;
  let skipped = 0;
  
  for (const contact of contacts) {
    // Check if already exists
    const existing = await db.collection('contacts')
      .where('name', '==', contact.name)
      .limit(1)
      .get();
    
    if (!existing.empty) {
      console.log(`⏭️  ${contact.name} (already exists)`);
      skipped++;
      continue;
    }
    
    await db.collection('contacts').add({
      name: contact.name,
      email: '',
      company: '',
      source: 'docusign-import',
      sourceDocument: contact.document,
      contactType: contact.type,
      lastContactDate: contact.date,
      notes: contact.notes,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`✅ ${contact.name} (${contact.type}) — ${contact.document}`);
    added++;
  }
  
  console.log(`\n✅ Added ${added} contacts, skipped ${skipped}`);
  process.exit(0);
}

addDocusignContacts().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
