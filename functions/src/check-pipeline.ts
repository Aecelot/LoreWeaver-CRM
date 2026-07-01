import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccountPath = path.resolve(__dirname, '../../service-account.json');
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const PIPELINE_ID = 'MUCFmGdpqPYAT0tKSAWs';

async function main() {
  const snap = await db.collection('leads').where('pipeline.id', '==', PIPELINE_ID).get();
  
  const byStage: Record<string, number> = {};
  const byStatus: Record<string, number> = {};
  
  snap.docs.forEach(doc => {
    const data = doc.data();
    const stageId = data.pipeline?.stageId || 'unknown';
    const status = data.status || 'unknown';
    
    byStage[stageId] = (byStage[stageId] || 0) + 1;
    byStatus[status] = (byStatus[status] || 0) + 1;
  });
  
  console.log('Total leads in Competition Pipeline:', snap.size);
  console.log('\nBy pipeline.stageId:');
  Object.entries(byStage).sort((a, b) => (b[1] as number) - (a[1] as number)).forEach(([k, v]) => console.log(`  ${k}: ${v}`));
  console.log('\nBy status field:');
  Object.entries(byStatus).sort((a, b) => (b[1] as number) - (a[1] as number)).forEach(([k, v]) => console.log(`  ${k}: ${v}`));
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
