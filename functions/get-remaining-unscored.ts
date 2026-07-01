import * as admin from 'firebase-admin';
const serviceAccount = require('../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function getRemainingUnscored() {
  try {
    const snapshot = await db.collection('leads')
      .where('type', '==', 'studio')
      .get();
    
    const unscored: any[] = [];
    
    snapshot.forEach(doc => {
      const data = doc.data();
      // Check if fit is still 0 or missing (but not scored in our batch)
      if (data.fit === 0 || data.fit === undefined || data.fit === null) {
        unscored.push({
          id: doc.id,
          name: data.name,
          website: data.website,
          country: data.country,
          notes: data.notes?.substring(0, 200) || ''
        });
      }
    });
    
    console.log(`Remaining unscored studios: ${unscored.length}`);
    console.log(JSON.stringify(unscored.slice(0, 50), null, 2));
  } catch (err) {
    console.error('Error:', err);
  }
}

getRemainingUnscored().then(() => process.exit(0));
