import * as admin from 'firebase-admin';

const serviceAccount = require('../../service-account.json');
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

// Studios researched but no public email found
const researchedNoEmail = [
  { id: '5BHMXh7v4YMnuiJ6Lr5p', reason: 'Microsoft-owned, no public business email' },  // Obsidian
  { id: 'QgrHVVPeK5bFrQ9csOY6', reason: 'No public business email' },  // thatgamecompany
  { id: 'H2A7BIvT1jeNTAthkaDv', reason: 'Contact form only' },  // Amanita Design
  { id: 'PGcZV6QOK9cnnOymhlaD', reason: 'Contact form only' },  // Alt Shift
  { id: 'NCY0CabScYkLkIpz0ORN', reason: 'No public business email' },  // Annapurna Interactive
  { id: '62G0mfan41oQXhWSm3ZL', reason: 'Sony-owned, no public business email' },  // Naughty Dog
  { id: 'a2shV3QQwrWIf2icS375', reason: 'Sony-owned, no public business email' },  // Sucker Punch
];

async function markResearched() {
  const batch = db.batch();
  
  for (const item of researchedNoEmail) {
    const docRef = db.collection('leads').doc(item.id);
    batch.update(docRef, {
      'contactResearched': true,
      'contactResearchNote': item.reason,
      'contactResearchedAt': admin.firestore.FieldValue.serverTimestamp(),
      'updatedAt': admin.firestore.FieldValue.serverTimestamp()
    });
    console.log(`Marked as researched: ${item.id} (${item.reason})`);
  }
  
  await batch.commit();
  console.log(`\nMarked ${researchedNoEmail.length} studios as researched (no email found)`);
  process.exit(0);
}

markResearched().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
