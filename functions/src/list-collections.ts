import * as admin from 'firebase-admin';

const serviceAccount = require('../../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function listCollections() {
  console.log('Listing all collections...\n');
  
  const collections = await db.listCollections();
  
  for (const col of collections) {
    const snapshot = await col.limit(1).get();
    const count = (await col.count().get()).data().count;
    console.log(`${col.id}: ${count} documents`);
    
    if (snapshot.docs.length > 0) {
      console.log('  Sample fields:', Object.keys(snapshot.docs[0].data()).slice(0, 10).join(', '));
    }
  }
}

listCollections().catch(e => console.error('Error:', e));
