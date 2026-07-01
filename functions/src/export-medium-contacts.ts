import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

// Initialize Firebase
const serviceAccountPath = path.join(__dirname, '../../service-account.json');
const serviceAccount = require(serviceAccountPath);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

interface LeadData {
  name: string;
  country?: string;
  fit?: number;
  contact?: {
    email?: string;
    name?: string;
    role?: string;
  };
  website?: string;
}

async function exportMediumContacts() {
  // Get all studio leads (filter in memory to avoid index requirement)
  const snapshot = await db.collection('leads')
    .where('type', '==', 'studio')
    .get();

  const leadsWithEmail: Array<{
    id: string;
    name: string;
    country: string;
    fit: number;
    email: string;
    contactName: string;
    contactRole: string;
    website: string;
  }> = [];
  
  snapshot.forEach((doc) => {
    const data = doc.data() as LeadData;
    if (data.contact?.email) {
      leadsWithEmail.push({
        id: doc.id,
        name: data.name,
        country: data.country || '',
        fit: data.fit || 0,
        email: data.contact.email,
        contactName: data.contact.name || '',
        contactRole: data.contact.role || '',
        website: data.website || ''
      });
    }
  });

  console.log(`Total leads with email: ${leadsWithEmail.length}`);
  
  // Sort by fit score descending
  leadsWithEmail.sort((a, b) => b.fit - a.fit);
  
  // Skip the top 20% highest scoring, take from the middle
  const skipTop = Math.floor(leadsWithEmail.length * 0.2);
  const mediumLeads = leadsWithEmail.slice(skipTop);
  
  // Take up to 50
  const selected = mediumLeads.slice(0, 50);
  
  console.log(`Selected ${selected.length} medium-fit contacts (skipped top ${skipTop})`);
  if (selected.length > 0) {
    console.log(`Fit score range: ${selected[0]?.fit} to ${selected[selected.length-1]?.fit}`);
  }

  // Generate CSV
  const headers = ['Studio Name', 'Country', 'Fit Score', 'Email', 'Contact Name', 'Contact Role', 'Website'];
  const rows = selected.map(l => [
    `"${l.name.replace(/"/g, '""')}"`,
    `"${l.country}"`,
    l.fit,
    l.email,
    `"${l.contactName.replace(/"/g, '""')}"`,
    `"${l.contactRole.replace(/"/g, '""')}"`,
    l.website
  ].join(','));

  const csv = [headers.join(','), ...rows].join('\n');
  
  const outDir = 'C:/Users/rijkg/clawd/exports';
  const outPath = path.join(outDir, 'medium-contacts-50.csv');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPath, csv);
  
  console.log(`\nExported to: ${outPath}`);
  
  // Print summary
  console.log('\nSample (first 10):');
  selected.slice(0, 10).forEach(l => {
    console.log(`  ${l.name} (${l.country}) - Fit: ${l.fit} - ${l.email}`);
  });
}

exportMediumContacts()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
