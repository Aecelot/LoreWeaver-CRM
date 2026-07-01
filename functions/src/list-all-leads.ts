import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccountPath = path.resolve(__dirname, '../../service-account.json');
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function main() {
  // Get all leads grouped by pipeline
  const snap = await db.collection('leads').get();
  
  const byPipeline: Record<string, any[]> = {};
  
  snap.docs.forEach(doc => {
    const data = doc.data();
    const pipelineId = data.pipeline?.id || 'no-pipeline';
    if (!byPipeline[pipelineId]) byPipeline[pipelineId] = [];
    byPipeline[pipelineId].push({ id: doc.id, name: data.name, stageId: data.pipeline?.stageId });
  });
  
  console.log('Leads by pipeline:\n');
  for (const [pipelineId, leads] of Object.entries(byPipeline)) {
    console.log(`${pipelineId}: ${leads.length} leads`);
    // Show first 3
    leads.slice(0, 3).forEach(l => {
      console.log(`  - ${l.name} (stage: ${l.stageId})`);
    });
    if (leads.length > 3) console.log(`  ... and ${leads.length - 3} more`);
    console.log('');
  }
  
  // Get pipeline names
  console.log('Pipeline ID to Name mapping:');
  const pipelines = await db.collection('pipelines').get();
  pipelines.docs.forEach(doc => {
    const data = doc.data();
    const leadCount = byPipeline[doc.id]?.length || 0;
    console.log(`  ${doc.id} = "${data.name}" (${leadCount} leads)`);
  });
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
