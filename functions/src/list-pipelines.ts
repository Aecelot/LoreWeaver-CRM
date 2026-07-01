import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccountPath = path.resolve(__dirname, '../../service-account.json');
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function main() {
  const snap = await db.collection('pipelines').get();
  console.log(`Found ${snap.size} pipelines:\n`);
  
  for (const doc of snap.docs) {
    const data = doc.data();
    console.log(`Pipeline: ${doc.id} - "${data.name}"`);
    if (data.stages) {
      for (const s of data.stages) {
        console.log(`  Stage: ${s.id} - "${s.name}"`);
      }
    }
    console.log('');
  }
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
