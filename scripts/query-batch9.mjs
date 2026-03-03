// Query batch 9 leads (80-89) from Firestore
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

async function queryBatch9() {
  console.log('Querying investor leads for batch 9 (offset 80, limit 10)...\n');
  
  // Get all investor leads that need research (no fitScore or short notes)
  const snapshot = await db.collection('leads')
    .where('type', '==', 'investor')
    .get();
  
  let leads = [];
  
  snapshot.forEach(doc => {
    const data = doc.data();
    if (data.name && data.name.trim() !== '') {
      const hasNoFitScore = !data.investor?.fitScore && data.investor?.fitScore !== 0;
      const hasShortNotes = !data.notes || data.notes.length < 200;
      if (hasNoFitScore || hasShortNotes) {
        leads.push({ id: doc.id, ...data });
      }
    }
  });
  
  // Sort by name for consistency
  leads.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  
  // Get batch 9 (offset 80, limit 10)
  const batch9 = leads.slice(80, 90);
  
  console.log(`Total leads needing research: ${leads.length}`);
  console.log(`Batch 9 (80-89): ${batch9.length} leads\n`);
  
  batch9.forEach((lead, i) => {
    console.log(`${80 + i}. ${lead.name} (${lead.id})`);
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
  console.log(JSON.stringify(batch9.map(l => ({
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

queryBatch9().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
