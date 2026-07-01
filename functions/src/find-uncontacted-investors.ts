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
    
    // Skip if already contacted or disqualified
    if (['contacted', 'disqualified', 'meeting', 'negotiation', 'closed'].includes(status)) {
      continue;
    }
    
    uncontacted.push({
      name: data.name,
      score: data.fitScore || data.icpScore || 0,
      country: data.country || '-',
      stage: data.investmentStage || data.stage || '-',
      status: status
    });
  }
  
  // Sort by score descending
  uncontacted.sort((a, b) => b.score - a.score);
  
  console.log(`Uncontacted investors (${uncontacted.length} total):\n`);
  console.log('Score | Name | Country | Stage | Status');
  console.log('------|------|---------|-------|-------');
  
  uncontacted.slice(0, 25).forEach(inv => {
    console.log(`${inv.score.toString().padStart(5)} | ${inv.name} | ${inv.country} | ${inv.stage} | ${inv.status}`);
  });
}

run().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
