const admin = require('firebase-admin');
const serviceAccount = require('../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function findLeadsWithoutEmail() {
  const snapshot = await db.collection('leads').get();
  const leads = [];
  
  // Sites to exclude (not actual studios)
  const excludeDomains = ['discord.gg', 'reddit.com', 'linkedin.com', 'twitter.com', 
    'facebook.com', 'youtube.com', 'twitch.tv', 'itch.io', 'gamejolt.com',
    'forum.', 'wiki.', 'N/A'];
  
  // Tags indicating actual game studios with narrative focus
  const narrativeTags = ['narrative', 'narrative-heavy', 'rpg', 'story', 'dialogue',
    'visual-novel', 'adventure', 'crpg', 'jrpg', 'director-target', 'director-icp',
    'branching-narrative', 'choice-based', 'if', 'indie', 'aa', 'aaa'];
  
  snapshot.forEach(doc => {
    const data = doc.data();
    const isAngel = data.company?.includes('(Angel)') || data.type === 'investor';
    const website = (data.website || '').toLowerCase();
    const hasGoodWebsite = website && 
      website.startsWith('http') && 
      !excludeDomains.some(d => website.includes(d));
    const missingEmail = !data.contact?.email;
    const tags = data.tags || [];
    const hasNarrativeTag = tags.some(t => narrativeTags.includes(t.toLowerCase()));
    
    if (!isAngel && hasGoodWebsite && missingEmail && data.company) {
      leads.push({
        id: doc.id,
        company: data.company,
        website: data.website || '',
        fitScore: data.fitScore || 0,
        country: data.country || '',
        linkedin: data.contact?.linkedin || '',
        tags: tags,
        hasNarrativeTag
      });
    }
  });
  
  // Sort: narrative studios first, then by fit score
  leads.sort((a, b) => {
    if (a.hasNarrativeTag && !b.hasNarrativeTag) return -1;
    if (!a.hasNarrativeTag && b.hasNarrativeTag) return 1;
    return (b.fitScore || 0) - (a.fitScore || 0);
  });
  
  console.log(JSON.stringify(leads.slice(0, 30), null, 2));
  console.log('\nTotal actual studios missing email:', leads.length);
}

findLeadsWithoutEmail().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
