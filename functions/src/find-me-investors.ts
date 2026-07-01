import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccountPath = path.join(__dirname, '../../service-account.json');
const serviceAccount = require(serviceAccountPath);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function run() {
  const snapshot = await db.collection('leads')
    .where('pipeline.pipelineId', '==', 'investors')
    .get();
  
  const meKeywords = ['uae', 'dubai', 'emirates', 'oman', 'saudi', 'qatar', 'bahrain', 'kuwait', 'middle east', 'abu dhabi'];
  
  const results: any[] = [];
  for (const doc of snapshot.docs) {
    const d = doc.data();
    const country = (d.country || '').toLowerCase();
    const name = (d.name || '').toLowerCase();
    const desc = (d.description || '').toLowerCase();
    
    if (meKeywords.some(k => country.includes(k) || name.includes(k) || desc.includes(k))) {
      results.push({ name: d.name, country: d.country, status: d.status });
    }
  }
  
  if (results.length === 0) {
    console.log('No Middle East investors found in CRM.');
  } else {
    console.log(`Middle East investors found (${results.length}):\n`);
    results.forEach(r => console.log(`- ${r.name} | ${r.country} | ${r.status}`));
  }
}

run().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
