import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccountPath = path.resolve(__dirname, '../../service-account.json');
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

interface EmailUpdate {
  id: string;
  name: string;
  email: string;
}

const updates: EmailUpdate[] = [
  // Metronomik (Hi-Fi Rush, No Straight Roads)
  { id: 'F6pP0EPPmEX2WSdf3zag', name: 'Metronomik', email: 'heythere@metronomik.net' },
  
  // Draw Distance (Vampire: The Masquerade games)
  { id: '2nyBMa3O0ItIlGBpJoHs', name: 'Draw Distance', email: 'contact@drawdistance.dev' },
  
  // Variable State (Virginia, Last Stop)
  { id: 'GOFGrxUBXLHRtSqiPJPo', name: 'Variable State', email: 'mail@variablestate.com' },
  
  // The Astronauts (Vanishing of Ethan Carter, Witchfire)
  { id: 'DhUKMV5e8MPXfeES5cVx', name: 'The Astronauts', email: 'Contact@TheAstronauts.com' },
];

async function updateLeadEmails() {
  console.log(`Updating ${updates.length} leads with contact emails (Batch 2)...`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const update of updates) {
    try {
      const docRef = db.collection('leads').doc(update.id);
      const doc = await docRef.get();
      
      if (!doc.exists) {
        console.log(`❌ Lead not found: ${update.name} (${update.id})`);
        errorCount++;
        continue;
      }
      
      // Update contact email
      await docRef.update({
        'contact.email': update.email,
        'updatedAt': admin.firestore.FieldValue.serverTimestamp()
      });
      
      console.log(`✅ Updated: ${update.name} -> ${update.email}`);
      successCount++;
    } catch (err) {
      console.error(`❌ Error updating ${update.name}:`, err);
      errorCount++;
    }
  }
  
  console.log(`\nResults: ${successCount} updated, ${errorCount} errors`);
}

updateLeadEmails()
  .then(() => process.exit(0))
  .catch((err: Error) => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
