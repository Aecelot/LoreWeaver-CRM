// Query leads 30-39 for batch 4 research
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

async function getAllInvestorLeadsNeedingResearch() {
  console.log('Querying ALL investor leads needing research...\n');
  
  const snapshot = await db.collection('leads')
    .where('type', '==', 'investor')
    .get();
  
  console.log(`Total investor leads: ${snapshot.size}`);
  
  let allLeads = [];
  let statusCounts = {};
  
  snapshot.forEach(doc => {
    const data = doc.data();
    statusCounts[data.status] = (statusCounts[data.status] || 0) + 1;
    if (data.name && data.name.trim() !== '') {
      allLeads.push({ id: doc.id, ...data });
    }
  });
  
  console.log(`Status breakdown: ${JSON.stringify(statusCounts, null, 2)}`);
  
  // Filter for leads that need research (no fitScore or notes are short)
  const needsResearch = allLeads.filter(l => {
    const hasNoFitScore = !l.investor?.fitScore && l.investor?.fitScore !== 0;
    const hasShortNotes = !l.notes || l.notes.length < 200;
    return hasNoFitScore || hasShortNotes;
  });
  
  console.log(`\nLeads needing research: ${needsResearch.length}`);
  
  // Get batch 4 (offset 30, limit 10)
  const batch4 = needsResearch.slice(30, 40);
  
  console.log(`\nBatch 4 (leads 30-39): ${batch4.length} leads\n`);
  
  batch4.forEach((lead, i) => {
    console.log(`${i+30}. ${lead.name || 'UNNAMED'} (${lead.id})`);
    console.log(`   Website: ${lead.website || 'N/A'}`);
    console.log(`   Country: ${lead.country || 'N/A'}`);
    console.log(`   Status: ${lead.status || 'N/A'}`);
    console.log(`   Tags: ${lead.tags?.join(', ') || 'none'}`);
    console.log(`   ICP Score: ${lead.investor?.fitScore ?? 'N/A'}`);
    console.log(`   Contact: ${lead.contact?.name || 'N/A'} - ${lead.contact?.email || 'N/A'}`);
    console.log(`   Notes length: ${lead.notes?.length || 0}`);
    console.log('');
  });
  
  // Also output as JSON for easier processing
  console.log('\n=== JSON OUTPUT ===');
  console.log(JSON.stringify(batch4.map(l => ({
    id: l.id,
    name: l.name,
    website: l.website,
    country: l.country,
    status: l.status,
    tags: l.tags,
    icpScore: l.investor?.fitScore,
    contact: l.contact
  })), null, 2));
  
  return batch4;
}

getAllInvestorLeadsNeedingResearch().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
