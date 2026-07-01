import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccountPath = path.resolve(__dirname, '../../service-account.json');
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function main() {
  // Check all pipelines for studio type leads
  const snap = await db.collection('leads')
    .where('type', '==', 'studio')
    .get();
  
  console.log(`Total studio leads: ${snap.size}\n`);
  
  // Group by pipeline
  const byPipeline: Record<string, any[]> = {};
  
  snap.docs.forEach(doc => {
    const data = doc.data();
    const pipelineId = data.pipeline?.id || 'no-pipeline';
    if (!byPipeline[pipelineId]) byPipeline[pipelineId] = [];
    byPipeline[pipelineId].push({
      id: doc.id,
      name: data.name,
      email: data.contact?.email,
      contactName: data.contact?.name,
      fitScore: data.studio?.fitScore,
      games: data.studio?.games,
      focus: data.studio?.focus,
      website: data.website,
      stage: data.pipeline?.stageId
    });
  });
  
  // Get pipeline names
  const pipelines = await db.collection('pipelines').get();
  const pipelineNames: Record<string, string> = {};
  pipelines.docs.forEach(doc => {
    pipelineNames[doc.id] = doc.data().name;
  });
  
  for (const [pipelineId, leads] of Object.entries(byPipeline)) {
    const name = pipelineNames[pipelineId] || pipelineId;
    console.log(`\n=== ${name} (${leads.length} leads) ===`);
    
    // Sort by fit score descending
    leads.sort((a, b) => (b.fitScore || 0) - (a.fitScore || 0));
    
    // Show top 10 with details
    leads.slice(0, 15).forEach((l, i) => {
      console.log(`${i + 1}. ${l.name}`);
      console.log(`   Email: ${l.email || 'NONE'}`);
      console.log(`   Contact: ${l.contactName || 'NONE'}`);
      console.log(`   Fit: ${l.fitScore || 'N/A'} | Games: ${l.games?.join(', ') || 'N/A'}`);
      console.log(`   Stage: ${l.stage}`);
    });
  }
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
