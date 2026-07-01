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

async function markContacted() {
  // Read the CSV
  const csvPath = 'C:/Users/rijkg/clawd/exports/medium-contacts-50.csv';
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const lines = csvContent.split('\n').slice(1); // Skip header
  
  const emails: string[] = [];
  for (const line of lines) {
    if (!line.trim()) continue;
    // Parse CSV - email is 4th column
    const match = line.match(/^"[^"]*","[^"]*",\d+,([^,]+),/);
    if (match && match[1]) {
      emails.push(match[1].trim());
    }
  }
  
  console.log(`Found ${emails.length} emails in CSV`);
  
  // Find and update each lead
  let updated = 0;
  let notFound = 0;
  
  for (const email of emails) {
    // Find lead by email
    const snapshot = await db.collection('leads')
      .where('contact.email', '==', email)
      .limit(1)
      .get();
    
    if (snapshot.empty) {
      console.log(`  Not found: ${email}`);
      notFound++;
      continue;
    }
    
    const doc = snapshot.docs[0];
    const data = doc.data();
    
    // Update with contacted status
    await doc.ref.update({
      'outreach.status': 'contacted',
      'outreach.contactedAt': admin.firestore.FieldValue.serverTimestamp(),
      'outreach.contactedVia': 'email',
      'status': 'contacted',
      'updatedAt': admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`  ✓ ${data.name} (${email})`);
    updated++;
  }
  
  console.log(`\nDone: ${updated} updated, ${notFound} not found`);
}

markContacted()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
