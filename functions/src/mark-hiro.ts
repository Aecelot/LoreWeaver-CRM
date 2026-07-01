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
    .where('name', '==', 'Hiro Capital')
    .get();
  
  if (snapshot.empty) {
    console.log('Hiro Capital not found');
    return;
  }
  
  const doc = snapshot.docs[0];
  await doc.ref.update({
    'status': 'contacted',
    'pipeline.stageId': 'contacted',
    'outreach.status': 'contacted',
    'outreach.contactedAt': admin.firestore.FieldValue.serverTimestamp(),
    'updatedAt': admin.firestore.FieldValue.serverTimestamp()
  });
  console.log('✓ Hiro Capital marked as contacted');
}

run().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
