import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccountPath = path.resolve(__dirname, '../../service-account.json');
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function main() {
  // Check for email sequences collection
  const collections = ['sequences', 'emailSequences', 'email_sequences', 'campaigns', 'outreach'];
  
  for (const col of collections) {
    const snap = await db.collection(col).get();
    if (!snap.empty) {
      console.log(`\n${col}: ${snap.size} documents`);
      snap.docs.forEach(doc => {
        const data = doc.data();
        console.log(`  - ${doc.id}: ${data.name || data.title || JSON.stringify(data).slice(0, 100)}`);
      });
    }
  }
  
  // Also check root collections
  const rootSnap = await db.listCollections();
  console.log('\nAll collections in DB:');
  for (const col of rootSnap) {
    const count = (await col.count().get()).data().count;
    if (count > 0) {
      console.log(`  ${col.id}: ${count}`);
    }
  }
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
