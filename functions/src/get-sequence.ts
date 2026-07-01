import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccountPath = path.resolve(__dirname, '../../service-account.json');
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function main() {
  const doc = await db.collection('sequences').doc('1ZlRAWnUUdkLsGQlEKv9').get();
  const data = doc.data();
  
  if (!data) {
    console.log('Sequence not found');
    return;
  }
  
  console.log('=== Sequence: ' + data.name + ' ===\n');
  console.log('ID:', doc.id);
  console.log('Created:', data.createdAt?.toDate?.() || 'unknown');
  console.log('');
  
  if (data.emails && Array.isArray(data.emails)) {
    console.log(`${data.emails.length} emails in sequence:\n`);
    data.emails.forEach((e: any, i: number) => {
      console.log(`--- Email ${i + 1} ---`);
      console.log('Subject:', e.subject || '(no subject)');
      console.log('Delay:', e.delayDays ? `${e.delayDays} days` : 'Day 0');
      console.log('Body:');
      console.log(e.body || '(no body)');
      console.log('');
    });
  } else {
    console.log('Raw data:', JSON.stringify(data, null, 2));
  }
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
