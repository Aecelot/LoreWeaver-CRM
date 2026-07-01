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
  
  const uncontacted: any[] = [];
  
  for (const doc of snapshot.docs) {
    const data = doc.data();
    const status = data.status || data.pipeline?.stageId || 'unknown';
    
    if (['contacted', 'disqualified', 'meeting', 'negotiation', 'closed'].includes(status)) {
      continue;
    }
    
    uncontacted.push({
      name: data.name,
      country: data.country || '-',
      type: data.type || '-',
      stage: data.investmentStage || '-',
      focus: data.description?.slice(0, 80) || '-',
      website: data.website || '-'
    });
  }
  
  console.log(`\n=== ${uncontacted.length} UNCONTACTED INVESTORS ===\n`);
  
  uncontacted.forEach((inv, i) => {
    console.log(`${i+1}. ${inv.name} (${inv.country})`);
    console.log(`   Type: ${inv.type} | Stage: ${inv.stage}`);
    console.log(`   ${inv.focus}`);
    console.log(`   ${inv.website}\n`);
  });
}

run().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
