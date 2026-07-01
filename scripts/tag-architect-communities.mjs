import admin from 'firebase-admin';
import { readFileSync } from 'fs';

const sa = JSON.parse(readFileSync('./service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

async function main() {
  // Get all community leads
  const snapshot = await db.collection('leads')
    .where('type', '==', 'community')
    .get();
  
  console.log(`Found ${snapshot.size} community leads`);
  
  let updated = 0;
  const batchSize = 500;
  let batch = db.batch();
  let batchCount = 0;
  
  for (const doc of snapshot.docs) {
    const data = doc.data();
    const tags = data.tags || [];
    
    // Add 'architect' tag if not already present
    if (!tags.includes('architect')) {
      batch.update(doc.ref, {
        tags: admin.firestore.FieldValue.arrayUnion('architect'),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      updated++;
      batchCount++;
      
      if (batchCount >= batchSize) {
        await batch.commit();
        console.log(`Committed batch of ${batchCount}`);
        batch = db.batch();
        batchCount = 0;
      }
    }
  }
  
  // Commit remaining
  if (batchCount > 0) {
    await batch.commit();
    console.log(`Committed final batch of ${batchCount}`);
  }
  
  console.log(`\n✅ Added 'architect' tag to ${updated} community leads`);
  process.exit(0);
}

main();
