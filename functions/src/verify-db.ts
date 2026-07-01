import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccountPath = path.resolve(__dirname, '../../service-account.json');
const serviceAccount = require(serviceAccountPath);

console.log('Connecting to project:', serviceAccount.project_id);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function main() {
  // List all pipelines
  const pipelines = await db.collection('pipelines').get();
  console.log('\nPipelines in database:');
  pipelines.docs.forEach(doc => {
    console.log(`  ${doc.id} = "${doc.data().name}"`);
  });
  
  // Check if Competition Pipeline exists
  const compPipeline = await db.collection('pipelines').doc('MUCFmGdpqPYAT0tKSAWs').get();
  console.log('\nCompetition Pipeline (MUCFmGdpqPYAT0tKSAWs):');
  if (compPipeline.exists) {
    console.log('  EXISTS:', JSON.stringify(compPipeline.data()));
  } else {
    console.log('  NOT FOUND!');
  }
  
  // Count leads with that pipeline
  const leads = await db.collection('leads').where('pipeline.id', '==', 'MUCFmGdpqPYAT0tKSAWs').get();
  console.log(`\nLeads with pipeline.id = MUCFmGdpqPYAT0tKSAWs: ${leads.size}`);
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
