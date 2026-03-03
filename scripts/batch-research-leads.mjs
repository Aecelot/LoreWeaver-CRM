// Batch research leads - query new investor leads from Firestore
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

async function getNewInvestorLeads(limit = 10) {
  console.log(`Querying for investor leads with status=new (limit ${limit})...\n`);
  
  // Get ALL investor leads to see what we have
  const snapshot = await db.collection('leads')
    .where('type', '==', 'investor')
    .limit(200)
    .get();
  
  console.log(`Total investor leads found: ${snapshot.size}`);
  
  if (snapshot.empty) {
    console.log('No investor leads with status=new found.');
    return [];
  }
  
  let leads = [];
  let statusCounts = {};
  let withNames = 0;
  let withoutNames = 0;
  
  snapshot.forEach(doc => {
    const data = doc.data();
    // Count statuses
    statusCounts[data.status] = (statusCounts[data.status] || 0) + 1;
    
    if (data.name && data.name.trim() !== '') {
      withNames++;
      leads.push({ id: doc.id, ...data });
    } else {
      withoutNames++;
    }
  });
  
  console.log(`\nWith names: ${withNames}, Without names: ${withoutNames}`);
  console.log(`Status breakdown: ${JSON.stringify(statusCounts, null, 2)}`);
  
  // Filter for leads that need research (no fitScore or notes are short)
  leads = leads.filter(l => {
    const hasNoFitScore = !l.investor?.fitScore && l.investor?.fitScore !== 0;
    const hasShortNotes = !l.notes || l.notes.length < 200;
    return hasNoFitScore || hasShortNotes;
  }).slice(0, limit);
  
  console.log(`\nLeads needing research: ${leads.length}`);
  
  console.log(`Found ${leads.length} leads:\n`);
  leads.forEach((lead, i) => {
    console.log(`${i+1}. ${lead.name || lead.contact?.name || 'UNNAMED'} (${lead.id})`);
    console.log(`   Website: ${lead.website || 'N/A'}`);
    console.log(`   Country: ${lead.country || 'N/A'}`);
    console.log(`   Tags: ${lead.tags?.join(', ') || 'none'}`);
    console.log(`   ICP Score: ${lead.investor?.fitScore ?? 'N/A'}`);
    console.log(`   Contact: ${lead.contact?.name || 'N/A'} - ${lead.contact?.email || 'N/A'}`);
    console.log(`   Notes: ${lead.notes?.substring(0, 100) || 'none'}...`);
    console.log('');
  });
  
  return leads;
}

// Run
getNewInvestorLeads(10).then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
