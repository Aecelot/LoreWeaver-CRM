// Query batch 16 leads (150-159) from Firestore
// Target: type=investor AND status=new
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

async function queryBatch16() {
  console.log('Querying investor leads with status=new for batch 16 (offset 150, limit 10)...\n');
  
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
  
  // Get batch 16 (offset 150, limit 10)
  const batch16 = leads.slice(150, 160);
  
  console.log(`Total investor leads with status=new: ${leads.length}`);
  console.log(`Batch 16 (150-159): ${batch16.length} leads\n`);
  
  if (batch16.length === 0) {
    console.log('No leads in this batch range. All new investor leads have been processed.');
    console.log('\nShowing remaining unprocessed leads instead:\n');
    
    // Show leads that still need research (no ICP score)
    const needsResearch = leads.filter(l => !l.investor?.fitScore && l.investor?.fitScore !== 0);
    console.log(`Leads still needing research: ${needsResearch.length}`);
    
    needsResearch.forEach((lead, i) => {
      console.log(`${i}. ${lead.name} (${lead.id})`);
      console.log(`   Website: ${lead.website || 'N/A'}`);
      console.log(`   Country: ${lead.country || 'N/A'}`);
      console.log(`   Tags: ${lead.tags?.join(', ') || 'none'}`);
      console.log('');
    });
  }
  
  batch16.forEach((lead, i) => {
    console.log(`${150 + i}. ${lead.name} (${lead.id})`);
    console.log(`   Website: ${lead.website || 'N/A'}`);
    console.log(`   Country: ${lead.country || 'N/A'}`);
    console.log(`   Tags: ${lead.tags?.join(', ') || 'none'}`);
    console.log(`   Current ICP: ${lead.investor?.fitScore ?? 'N/A'}`);
    console.log(`   Contact: ${lead.contact?.name || 'N/A'} - ${lead.contact?.email || 'N/A'}`);
    console.log(`   Notes: ${(lead.notes || '').substring(0, 100)}...`);
    console.log('');
  });
  
  // Output JSON for processing
  if (batch16.length > 0) {
    console.log('\n=== JSON OUTPUT ===');
    console.log(JSON.stringify(batch16.map(l => ({
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
}

queryBatch16().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
