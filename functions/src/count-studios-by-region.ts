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
  const snap = await db.collection('leads').where('type', '==', 'studio').get();
  
  const byCountry: Record<string, number> = {};
  
  snap.docs.forEach(d => {
    const data = d.data();
    const country = data.country || data.location || 'Unknown';
    byCountry[country] = (byCountry[country] || 0) + 1;
  });
  
  console.log('Studios by region:');
  Object.entries(byCountry)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .forEach(([k, v]) => console.log(`  ${k}: ${v}`));
  
  console.log(`\nTotal studios: ${snap.size}`);
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
