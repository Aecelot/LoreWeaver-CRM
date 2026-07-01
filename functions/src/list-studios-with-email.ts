import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccountPath = path.resolve(__dirname, '../../service-account.json');
const serviceAccount = require(serviceAccountPath);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function main() {
  const snap = await db.collection('leads')
    .where('type', '==', 'studio')
    .get();
  
  const withEmail: any[] = [];
  
  snap.docs.forEach(doc => {
    const data = doc.data();
    if (data.contact?.email) {
      withEmail.push({
        id: doc.id,
        name: data.name,
        email: data.contact.email,
        contactName: data.contact.name,
        games: data.studio?.games || [],
        focus: data.studio?.focus || '',
        fitScore: data.studio?.fitScore || 0,
      });
    }
  });
  
  console.log(`${withEmail.length} studios with email:\n`);
  
  withEmail.sort((a, b) => (b.fitScore || 0) - (a.fitScore || 0));
  
  withEmail.forEach((s, i) => {
    console.log(`${i + 1}. ${s.name}`);
    console.log(`   Email: ${s.email}`);
    console.log(`   Contact: ${s.contactName || '-'}`);
    console.log(`   Games: ${s.games.slice(0, 2).join(', ') || '-'}`);
    console.log(`   Fit: ${s.fitScore}`);
    console.log('');
  });
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
