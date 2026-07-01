const admin = require('firebase-admin');
const serviceAccount = require('../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function findStudiosNeedingEmails() {
  const snapshot = await db.collection('leads').get();
  
  // Skip patterns
  const skipPatterns = [
    /fund/i, /capital/i, /venture/i, /invest/i, /angel/i, /vc\b/i,
    /discord/i, /reddit/i, /forum/i, /youtube/i, /twitter/i,
    /community/i, /jam\b/i, /award/i, /festival/i, /conference/i,
    /linkedin\.com/i, /university/i, /school/i, /center$/i,
    /^r\//i, /\bvc\b/i
  ];
  
  const studios = [];
  
  snapshot.forEach(doc => {
    const data = doc.data();
    const name = data.name || '';
    const website = data.website || '';
    
    // Skip if no name or no website
    if (!name || !website) return;
    
    // Skip if has email already
    if (data.contact?.email) return;
    
    // Skip based on name or website patterns
    if (skipPatterns.some(p => p.test(name) || p.test(website))) return;
    
    // Prefer actual company websites (not social links)
    if (website.includes('linkedin.com') || 
        website.includes('twitter.com') || 
        website.includes('reddit.com') ||
        website.includes('discord.')) return;
    
    studios.push({
      id: doc.id,
      name: data.name,
      website: data.website,
      country: data.country || ''
    });
  });
  
  // Shuffle to get variety
  for (let i = studios.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [studios[i], studios[j]] = [studios[j], studios[i]];
  }
  
  console.log(`Found ${studios.length} potential studios needing emails`);
  console.log('\nFirst 20 candidates:');
  console.log(JSON.stringify(studios.slice(0, 20), null, 2));
}

findStudiosNeedingEmails().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
