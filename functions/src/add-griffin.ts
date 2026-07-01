import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccountPath = path.join(__dirname, '../../service-account.json');
const serviceAccount = require(serviceAccountPath);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function run() {
  const lead = {
    name: 'Griffin Gaming Partners',
    type: 'VC Fund',
    country: 'USA',
    website: 'https://griffingp.com',
    description: '$1.5B AUM multi-stage gaming fund. Backs studios, platforms, infra. Early Discord investor. Led Fuse Games $7M.',
    investmentStage: 'Seed to Series C',
    checkSize: '$7M-$50M',
    status: 'contacted',
    pipeline: {
      pipelineId: 'investors',
      stageId: 'contacted'
    },
    outreach: {
      status: 'contacted',
      contactedAt: admin.firestore.FieldValue.serverTimestamp()
    },
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  };

  const ref = await db.collection('leads').add(lead);
  console.log(`✓ Griffin Gaming Partners added (${ref.id})`);
}

run().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
