// Query ALL remaining investor leads with status=new
import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, '..', 'service-account.json'), 'utf8')
);

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

async function queryRemaining() {
  console.log('Querying ALL investor leads with status=new...\n');
  
  // Get all investor leads with status=new
  const snapshot = await db.collection('leads')
    .where('type', '==', 'investor')
    .where('status', '==', 'new')
    .get();
  
  let leads = [];
  
  snapshot.forEach(doc => {
    const data = doc.data();
    if (data.name && data.name.trim() !== '') {
      leads.push({ id: doc.id, ...data });
    }
  });
  
  // Sort by name for consistency
  leads.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  
  console.log(`Total investor leads with status=new: ${leads.length}\n`);
  
  leads.forEach((lead, i) => {
    console.log(`${i}. ${lead.name} (${lead.id})`);
    console.log(`   Website: ${lead.website || 'N/A'}`);
    console.log(`   Country: ${lead.country || 'N/A'}`);
    console.log(`   Tags: ${lead.tags?.join(', ') || 'none'}`);
    console.log(`   Current ICP: ${lead.investor?.fitScore ?? 'N/A'}`);
    console.log(`   Contact: ${lead.contact?.name || 'N/A'} - ${lead.contact?.email || 'N/A'}`);
    console.log(`   Notes: ${(lead.notes || '').substring(0, 100)}...`);
    console.log('');
  });
  
  // Output JSON for processing
  console.log('\n=== JSON OUTPUT ===');
  console.log(JSON.stringify(leads.map(l => ({
    id: l.id,
    name: l.name,
    website: l.website,
    country: l.country,
    tags: l.tags,
    currentScore: l.investor?.fitScore,
    investorType: l.investor?.type,
    investmentFocus: l.investor?.investmentFocus,
    fundingPreferences: l.investor?.fundingPreferences,
    notes: l.notes
  })), null, 2));
}

queryRemaining().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
