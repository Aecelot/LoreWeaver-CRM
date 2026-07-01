import * as admin from 'firebase-admin';
const serviceAccount = require('../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function getUnscoredStudios() {
  try {
    // Get all studios
    const snapshot = await db.collection('leads')
      .where('type', '==', 'studio')
      .get();
    
    const withEmail: any[] = [];
    const withoutEmail: any[] = [];
    
    snapshot.forEach(doc => {
      const data = doc.data();
      // Check if fit is 0 or missing
      if (data.fit === 0 || data.fit === undefined || data.fit === null) {
        const lead = {
          id: doc.id,
          name: data.name,
          website: data.website,
          country: data.country,
          fit: data.fit,
          contact: data.contact || {},
          notes: data.notes
        };
        
        if (data.contact?.email) {
          withEmail.push(lead);
        } else {
          withoutEmail.push(lead);
        }
      }
    });
    
    console.log('=== Unscored Studios ===');
    console.log(`Total unscored: ${withEmail.length + withoutEmail.length}`);
    console.log(`With email (priority): ${withEmail.length}`);
    console.log(`Without email: ${withoutEmail.length}`);
    console.log('\n--- WITH EMAIL (PRIORITY) ---\n');
    console.log(JSON.stringify(withEmail, null, 2));
    console.log('\n--- WITHOUT EMAIL ---\n');
    console.log(JSON.stringify(withoutEmail, null, 2));
  } catch (err) {
    console.error('Error:', err);
  }
}

getUnscoredStudios().then(() => process.exit(0));
