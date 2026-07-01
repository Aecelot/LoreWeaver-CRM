import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

async function getLeadsMissingEmail() {
  const snapshot = await db.collection('leads')
    .limit(1500)
    .get();
  
  // Also get pipelines for reference
  const pipelineSnapshot = await db.collection('pipelines').get();
  const pipelineNames: {[key: string]: string} = {};
  pipelineSnapshot.forEach((doc: any) => {
    pipelineNames[doc.id] = doc.data().name || doc.id;
  });
  
  console.log('Pipelines:', pipelineNames);
  
  const gameStudios: any[] = [];
  
  snapshot.forEach((doc: any) => {
    const data = doc.data();
    const email = data.contact?.email;
    const website = data.website;
    const pipelineId = data.pipeline?.id || data.pipelineId || '';
    
    // Skip if has email or no website
    if (email && email.trim() !== '') return;
    if (!website || website.includes('discord.gg') || website.includes('reddit.com')) return;
    
    gameStudios.push({
      id: doc.id,
      name: data.name,
      website: website,
      country: data.country || '',
      pipelineId: pipelineId,
      pipelineName: pipelineNames[pipelineId] || 'none'
    });
  });
  
  // Group by pipeline
  const byPipeline: {[key: string]: any[]} = {};
  gameStudios.forEach(s => {
    const key = s.pipelineName;
    if (!byPipeline[key]) byPipeline[key] = [];
    byPipeline[key].push(s);
  });
  
  console.log('\nLeads missing email by pipeline:');
  Object.keys(byPipeline).forEach(p => {
    console.log(`  ${p}: ${byPipeline[p].length}`);
  });
  
  // Get studios from the game pipeline (non-investors)
  const gameStudioPipeline = Object.keys(byPipeline).find(p => 
    p.toLowerCase().includes('studio') || 
    p.toLowerCase().includes('game') ||
    p.toLowerCase().includes('lead')
  );
  
  if (gameStudioPipeline) {
    console.log(`\n${gameStudioPipeline} leads missing email (top 25):`);
    console.log(JSON.stringify(byPipeline[gameStudioPipeline].slice(0, 25), null, 2));
  } else {
    // Just show some samples from each pipeline
    console.log('\nSample from each pipeline:');
    Object.keys(byPipeline).slice(0, 3).forEach(p => {
      console.log(`\n${p}:`);
      console.log(JSON.stringify(byPipeline[p].slice(0, 5), null, 2));
    });
  }
  
  process.exit(0);
}

getLeadsMissingEmail().catch((err: any) => {
  console.error(err);
  process.exit(1);
});
