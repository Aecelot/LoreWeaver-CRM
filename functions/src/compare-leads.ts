import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccountPath = path.resolve(__dirname, '../../service-account.json');
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function main() {
  // Get a lead from Studio Pipeline (should be working)
  const studioSnap = await db.collection('leads')
    .where('pipeline.id', '==', 'GgsAYpDcelzHMNoRtamS')
    .limit(1)
    .get();
  
  // Get a lead from Competition Pipeline (not showing?)
  const compSnap = await db.collection('leads')
    .where('pipeline.id', '==', 'MUCFmGdpqPYAT0tKSAWs')
    .limit(1)
    .get();
  
  console.log('=== Studio Pipeline Lead (working) ===');
  if (!studioSnap.empty) {
    const data = studioSnap.docs[0].data();
    console.log(JSON.stringify(data, null, 2));
  } else {
    console.log('No leads found');
  }
  
  console.log('\n=== Competition Pipeline Lead (not showing?) ===');
  if (!compSnap.empty) {
    const data = compSnap.docs[0].data();
    console.log(JSON.stringify(data, null, 2));
  } else {
    console.log('No leads found');
  }
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
