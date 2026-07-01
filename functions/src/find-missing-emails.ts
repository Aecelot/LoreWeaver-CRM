import * as admin from 'firebase-admin';
const serviceAccount = require('../../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function findMissingEmails() {
  // Query studios without email
  const snapshot = await db.collection('leads')
    .where('type', '==', 'studio')
    .limit(500)
    .get();
  
  console.log('Total studios found:', snapshot.size);
  
  const needsEmail: any[] = [];
  
  snapshot.forEach((doc: any) => {
    const data = doc.data();
    const hasEmail = data.contact?.email;
    const alreadyResearched = data.contactResearched;
    const website = data.website || '';
    const hasValidWebsite = website && website.startsWith('http') && !website.includes('discord');
    
    // Score: prefer icpScore, fall back to fit
    const score = data.icpScore || data.fit || 0;
    
    if (!hasEmail && !alreadyResearched && hasValidWebsite) {
      needsEmail.push({
        id: doc.id,
        name: data.name,
        website: data.website,
        score: score,
        country: data.country,
        fitReason: data.fitReason
      });
    }
  });
  
  // Sort by score descending
  needsEmail.sort((a, b) => (b.score || 0) - (a.score || 0));
  
  console.log('Studios needing email research:', needsEmail.length);
  console.log('\n=== TOP 20 STUDIOS FOR EMAIL RESEARCH ===');
  console.log(JSON.stringify(needsEmail.slice(0, 20), null, 2));
}

findMissingEmails().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
