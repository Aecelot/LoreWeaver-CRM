import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccountPath = path.join(__dirname, '../../service-account.json');
const serviceAccount = require(serviceAccountPath);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const targets = ['griffin', 'midgame', 'fors'];

async function run() {
  const snapshot = await db.collection('leads')
    .where('pipeline.pipelineId', '==', 'investors')
    .get();
  
  let updated = 0;
  
  for (const doc of snapshot.docs) {
    const name = doc.data().name?.toLowerCase() || '';
    if (targets.some(t => name.includes(t))) {
      await doc.ref.update({
        'status': 'contacted',
        'pipeline.stageId': 'contacted',
        'outreach.status': 'contacted',
        'outreach.contactedAt': admin.firestore.FieldValue.serverTimestamp(),
        'updatedAt': admin.firestore.FieldValue.serverTimestamp()
      });
      console.log('✓', doc.data().name);
      updated++;
    }
  }
  console.log(`\nUpdated: ${updated}`);
}

run().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
