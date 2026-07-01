import * as admin from 'firebase-admin';
const serviceAccount = require('../../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function getGameStudios() {
  const leadsRef = db.collection('leads');
  const snapshot = await leadsRef.get();
  
  const studioKeywords = ['games', 'studio', 'interactive', 'entertainment', 'software', 'digital'];
  const needsEmail: any[] = [];
  
  snapshot.forEach((doc: any) => {
    const data = doc.data();
    if (!data.name) return;
    
    const hasEmail = data.contact?.email && data.contact.email.trim() !== '';
    if (hasEmail) return;
    if (data.contactResearched) return;
    
    // Must have actual website (not reddit, linkedin, discord)
    if (!data.website || data.website === '' ||
        data.website.includes('reddit.com') ||
        data.website.includes('linkedin.com') ||
        data.website.includes('discord')) return;
    
    // Check if name suggests it's a game studio
    const nameLower = data.name.toLowerCase();
    const isStudio = studioKeywords.some(kw => nameLower.includes(kw)) ||
                    (data.website && !data.website.includes('vc') && 
                     !data.website.includes('capital') &&
                     !data.website.includes('invest'));
    
    // Exclude obvious VCs/investors
    if (nameLower.includes('capital') || nameLower.includes('ventures') ||
        nameLower.includes('invest') || nameLower.includes('fund') ||
        nameLower.includes('angel') || nameLower.includes('vc')) return;
        
    if (!isStudio) return;
    
    needsEmail.push({
      id: doc.id,
      name: data.name,
      website: data.website,
      country: data.country || ''
    });
  });
  
  // Shuffle to get diverse results
  needsEmail.sort(() => Math.random() - 0.5);
  console.log(JSON.stringify(needsEmail.slice(0, 25), null, 2));
  console.error('Total game studios needing email:', needsEmail.length);
  process.exit(0);
}

getGameStudios().catch(err => {
  console.error(err);
  process.exit(1);
});
