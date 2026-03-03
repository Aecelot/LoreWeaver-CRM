// Query batch 21 leads: type=studio, status=new OR status=active
// For Director (emergent narrative AI) ICP scoring
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

async function queryStudioBatch21() {
  console.log('Querying studio leads with status=new OR status=active (offset 40, limit 10)...\n');
  
  // Get all studio leads
  const snapshot = await db.collection('leads')
    .where('type', '==', 'studio')
    .get();
  
  let leads = [];
  
  snapshot.forEach(doc => {
    const data = doc.data();
    // Only include leads with status=new or status=active
    if ((data.status === 'new' || data.status === 'active') && data.name && data.name.trim() !== '') {
      leads.push({ id: doc.id, ...data });
    }
  });
  
  // Sort by name for consistency
  leads.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  
  // Get batch (offset 40, limit 10)
  const batch = leads.slice(40, 50);
  
  console.log(`Total studio leads (new/active): ${leads.length}`);
  console.log(`Batch 21 (40-49): ${batch.length} leads\n`);
  
  batch.forEach((lead, i) => {
    console.log(`${i + 40}. ${lead.name} (${lead.id})`);
    console.log(`   Status: ${lead.status}`);
    console.log(`   Website: ${lead.website || 'N/A'}`);
    console.log(`   Country: ${lead.country || 'N/A'}`);
    console.log(`   Tags: ${lead.tags?.join(', ') || 'none'}`);
    console.log(`   Current ICP: ${lead.icpScore ?? 'N/A'}`);
    console.log(`   Contacts: ${lead.contacts?.length || 0}`);
    console.log(`   Notes: ${(lead.notes || '').substring(0, 100)}...`);
    console.log('');
  });
  
  // Output JSON for processing
  console.log('\n=== JSON OUTPUT ===');
  console.log(JSON.stringify(batch.map(l => ({
    id: l.id,
    name: l.name,
    status: l.status,
    website: l.website,
    country: l.country,
    tags: l.tags,
    icpScore: l.icpScore,
    contacts: l.contacts,
    notes: l.notes
  })), null, 2));
}

queryStudioBatch21().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
