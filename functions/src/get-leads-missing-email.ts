import * as admin from 'firebase-admin';
const serviceAccount = require('../../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function getStudiosNeedingResearch() {
  const snapshot = await db.collection('leads').get();
  
  const needsResearch: any[] = [];
  
  // Narrative-relevant tags that indicate high value
  const narrativeTags = ['narrative', 'rpg', 'story', 'visual-novel', 'adventure', 'branching', 
    'dialogue', 'quest', 'choice', 'character', 'jrpg', 'crpg', 'action-rpg', 'mystery',
    'director-target', 'director-icp', 'narrative-heavy', 'cinematic'];
  
  snapshot.forEach((doc: any) => {
    const data = doc.data();
    
    // Only actual game studios or publishers
    if (data.type !== 'studio' && data.type !== 'publisher') return;
    // Skip if disqualified
    if (data.pipeline?.stageId === 'disqualified') return;
    // Skip if already has contact email
    if (data.contact?.email) return;
    // Skip if already researched
    if (data.contactResearched === true) return;
    // Must have a website
    if (!data.website) return;
    // Skip non-website links
    if (data.website.includes('discord.') || data.website.includes('reddit.') || data.website.includes('linkedin.')) return;
    // Must have a name
    if (!data.name) return;
    
    // Calculate narrative fit score based on tags
    const tags = data.tags || [];
    let narrativeFit = 0;
    for (const tag of tags) {
      if (narrativeTags.some(nt => tag.toLowerCase().includes(nt))) {
        narrativeFit++;
      }
    }
    
    needsResearch.push({
      id: doc.id,
      name: data.name,
      narrativeFit: narrativeFit,
      website: data.website,
      country: data.country,
      stage: data.pipeline?.stageId,
      type: data.type,
      tags: tags
    });
  });
  
  // Sort by narrativeFit descending
  needsResearch.sort((a, b) => b.narrativeFit - a.narrativeFit);
  
  console.log(`Found ${needsResearch.length} studios/publishers needing contact research`);
  console.log('');
  console.log('=== TOP 20 NARRATIVE-FIT STUDIOS NEEDING RESEARCH ===');
  console.log(JSON.stringify(needsResearch.slice(0, 20), null, 2));
}

getStudiosNeedingResearch().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
