import * as admin from 'firebase-admin';
const serviceAccount = require('../../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function findStudiosWithoutEmail() {
  const snapshot = await db.collection('leads').get();
  
  const studiosNeedingEmail: any[] = [];
  
  snapshot.forEach((doc: any) => {
    const data = doc.data();
    // Only studios with websites (so we can research them) and missing contact email
    if (!data.contact?.email && data.company && data.website) {
      studiosNeedingEmail.push({
        id: doc.id,
        company: data.company,
        website: data.website || '',
        fitScore: data.fitScore || 0,
        narrativeFit: data.narrativeFit || 0,
        contact: data.contact || {},
        country: data.country || '',
        tags: data.tags || []
      });
    }
  });
  
  // Sort by narrativeFit first (our manual scoring), then fitScore
  studiosNeedingEmail.sort((a, b) => {
    if (b.narrativeFit !== a.narrativeFit) return b.narrativeFit - a.narrativeFit;
    return b.fitScore - a.fitScore;
  });
  
  const top25 = studiosNeedingEmail.slice(0, 25);
  
  console.log(JSON.stringify(top25, null, 2));
  console.log('\n--- Total studios without email (with websites):', studiosNeedingEmail.length);
}

findStudiosWithoutEmail().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
