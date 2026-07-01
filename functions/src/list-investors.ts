import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccountPath = path.join(__dirname, '../../service-account.json');
const serviceAccount = require(serviceAccountPath);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function run() {
  const snapshot = await db.collection('leads')
    .where('pipeline.pipelineId', '==', 'investors')
    .get();
  
  console.log(`Found ${snapshot.size} investors:\n`);
  snapshot.docs.forEach(d => console.log('-', d.data().name));
}

run().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
