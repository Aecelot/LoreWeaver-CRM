import * as admin from 'firebase-admin';
const serviceAccount = require('../../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function getNextBatch() {
  const snapshot = await db.collection('leads')
    .where('pipeline.pipelineId', '==', 'GgsAYpDcelzHMNoRtamS')
    .limit(500)
    .get();
  
  const needsResearch: any[] = [];
  
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
    
    // Must have website to research
    if (!website || website.trim() === '') return;
    
    needsResearch.push({
      id: doc.id,
      name: name,
      website: website,
      country: data.country || '',
      stage: data.pipeline?.stageId || ''
    });
  });
  
  console.log(JSON.stringify(needsResearch.slice(0, 30), null, 2));
}

getNextBatch().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
