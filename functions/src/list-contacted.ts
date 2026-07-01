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
    .where('status', '==', 'contacted')
    .get();
  
  console.log(`=== CONTACTED INVESTORS (${snapshot.size}) ===\n`);
  
  const investors = snapshot.docs.map(doc => {
    const d = doc.data();
    return {
      name: d.name,
      country: d.country || '-',
      type: d.type || '-'
    };
  }).sort((a, b) => a.name.localeCompare(b.name));
  
  investors.forEach((inv, i) => {
    console.log(`${(i+1).toString().padStart(2)}. ${inv.name} (${inv.country})`);
  });
}

run().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
