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
  // First, get the pipeline definition to see valid stages
  const pipelineDoc = await db.collection('pipelines').doc(PIPELINE_ID).get();
  const pipelineData = pipelineDoc.data();
  
  console.log('=== Competition Pipeline Stages ===');
  if (pipelineData?.stages) {
    pipelineData.stages.forEach((s: any) => {
      console.log(`  "${s.id}" -> "${s.name}"`);
    });
  }
  
  // Now check leads
  const snap = await db.collection('leads').where('pipeline.id', '==', PIPELINE_ID).get();
  
  console.log(`\n=== ${snap.size} leads in pipeline ===\n`);
  
  // Sample a few leads to see full structure
  console.log('Sample leads (first 5):');
  snap.docs.slice(0, 5).forEach(doc => {
    const data = doc.data();
    console.log(`\n${data.name}:`);
    console.log(`  id: ${doc.id}`);
    console.log(`  status: "${data.status}"`);
    console.log(`  pipeline.id: "${data.pipeline?.id}"`);
    console.log(`  pipeline.stageId: "${data.pipeline?.stageId}"`);
    console.log(`  has notes attached: checking...`);
  });
  
  // Check notes for those leads
  console.log('\n=== Notes Check ===');
  const leadIds = snap.docs.slice(0, 5).map(d => d.id);
  for (const leadId of leadIds) {
    const notesSnap = await db.collection('notes').where('leadId', '==', leadId).get();
    const lead = snap.docs.find(d => d.id === leadId)?.data();
    console.log(`${lead?.name}: ${notesSnap.size} notes`);
  }
  
  // Check stage distribution
  console.log('\n=== Stage Distribution ===');
  const stageCount: Record<string, number> = {};
  snap.docs.forEach(doc => {
    const stageId = doc.data().pipeline?.stageId || 'undefined';
    stageCount[stageId] = (stageCount[stageId] || 0) + 1;
  });
  Object.entries(stageCount).forEach(([k, v]) => console.log(`  ${k}: ${v}`));
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
