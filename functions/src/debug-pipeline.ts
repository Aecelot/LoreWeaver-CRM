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
  // Get all leads in competition pipeline
  const snap = await db.collection('leads').where('pipeline.id', '==', PIPELINE_ID).get();
  
  console.log('Total leads:', snap.size);
  console.log('\nFirst 10 leads with their stage data:\n');
  
  snap.docs.slice(0, 10).forEach(doc => {
    const data = doc.data();
    console.log(`${data.name}`);
    console.log(`  status: ${data.status}`);
    console.log(`  pipeline.stageId: ${data.pipeline?.stageId}`);
    console.log(`  pipeline.id: ${data.pipeline?.id}`);
    console.log('');
  });
  
  // Check if there are any leads NOT in the competition pipeline that might be competitors
  const allLeads = await db.collection('leads').get();
  const otherPipelines: Record<string, number> = {};
  
  allLeads.docs.forEach(doc => {
    const data = doc.data();
    const pipelineId = data.pipeline?.id || 'no-pipeline';
    if (pipelineId !== PIPELINE_ID) {
      otherPipelines[pipelineId] = (otherPipelines[pipelineId] || 0) + 1;
    }
  });
  
  console.log('\nLeads in OTHER pipelines:');
  Object.entries(otherPipelines).forEach(([k, v]) => console.log(`  ${k}: ${v}`));
  
  // Check for any issues with the pipeline.stageId field
  console.log('\n\nChecking for data inconsistencies...');
  let issues = 0;
  snap.docs.forEach(doc => {
    const data = doc.data();
    if (data.status !== data.pipeline?.stageId) {
      console.log(`MISMATCH: ${data.name} - status=${data.status}, stageId=${data.pipeline?.stageId}`);
      issues++;
    }
  });
  console.log(`Found ${issues} mismatches`);
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
