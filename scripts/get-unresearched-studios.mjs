// Get unresearched studio leads
import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const stateFile = join(__dirname, 'batch-research-state.json');
const state = JSON.parse(readFileSync(stateFile, 'utf8'));
const completedIds = new Set(state.completedIds);

const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, '..', 'service-account.json'), 'utf8')
);

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

async function getUnresearchedStudios() {
  const snapshot = await db.collection('leads')
    .where('type', '==', 'studio')
    .get();
  
  const unresearched = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    if (!completedIds.has(doc.id) && data.status !== 'researched') {
      unresearched.push({ id: doc.id, name: data.name, company: data.company, website: data.website, status: data.status });
    }
  });
  
  console.log(JSON.stringify(unresearched.slice(0, 10), null, 2));
  console.log(`\nTotal unresearched: ${unresearched.length}`);
}

getUnresearchedStudios().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
