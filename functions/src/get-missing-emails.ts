import * as admin from 'firebase-admin';
const serviceAccount = require('../../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function analyzeLeads() {
  // Query leads in both studio pipelines
  const studioPipelineIds = ['GgsAYpDcelzHMNoRtamS', 'Yo2OlGZdFFMWkFTr0n08'];
  
  const noEmailList: any[] = [];
  const hasWebsiteNoEmail: any[] = [];
  
  for (const pipelineId of studioPipelineIds) {
    const snapshot = await db.collection('leads')
      .where('pipeline.pipelineId', '==', pipelineId)
      .limit(500)
      .get();
    
    snapshot.forEach((doc: any) => {
      const data = doc.data();
      
      // Skip if has email or already researched
      if (data.contact?.email) return;
      if (data.contactResearched) return;
      if (data.pipeline?.stageId === 'archived') return;
      
      const name = data.name || '';
      const website = data.website || '';
      
      // Skip communities/discords
      if (name.includes('Discord') || name.includes('Community') || name.includes('Forum')) return;
      
      const lead = {
        id: doc.id,
        name: name,
        fitScore: data.fitScore || 0,
        narrativeFit: data.narrativeFit || 0,
        website: website,
        country: data.country || '',
        stage: data.pipeline?.stageId || ''
      };
      
      noEmailList.push(lead);
      
      // Has website we can research
      if (website && website.trim() !== '') {
        hasWebsiteNoEmail.push(lead);
      }
    });
  }
  
  // Sort by narrativeFit then fitScore
  hasWebsiteNoEmail.sort((a: any, b: any) => {
    if (b.narrativeFit !== a.narrativeFit) return b.narrativeFit - a.narrativeFit;
    return b.fitScore - a.fitScore;
  });
  
  console.log(`Total studios without email: ${noEmailList.length}`);
  console.log(`Studios WITH website needing email: ${hasWebsiteNoEmail.length}`);
  console.log('\n=== Top 20 Studios with Websites Needing Emails ===');
  console.log(JSON.stringify(hasWebsiteNoEmail.slice(0, 20), null, 2));
}

analyzeLeads().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
