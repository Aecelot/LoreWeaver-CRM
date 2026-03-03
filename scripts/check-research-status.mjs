// Check overall investor leads research status
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

async function checkResearchStatus() {
  console.log('Checking investor leads research status...\n');
  
  // Get ALL investor leads
  const snapshot = await db.collection('leads')
    .where('type', '==', 'investor')
    .get();
  
  let statusCounts = {};
  let needsResearch = [];
  let hasICP = 0;
  let noICP = 0;
  
  snapshot.forEach(doc => {
    const data = doc.data();
    const status = data.status || 'unknown';
    statusCounts[status] = (statusCounts[status] || 0) + 1;
    
    const hasScore = data.investor?.fitScore !== undefined && data.investor?.fitScore !== null;
    if (hasScore) {
      hasICP++;
    } else {
      noICP++;
      needsResearch.push({ id: doc.id, ...data });
    }
  });
  
  console.log(`Total investor leads: ${snapshot.size}`);
  console.log(`With ICP score: ${hasICP}`);
  console.log(`Without ICP score: ${noICP}`);
  console.log(`\nStatus breakdown:`);
  Object.entries(statusCounts).sort().forEach(([status, count]) => {
    console.log(`  ${status}: ${count}`);
  });
  
  if (needsResearch.length > 0) {
    console.log(`\n=== Leads needing research (no ICP score): ===\n`);
    needsResearch.forEach((lead, i) => {
      console.log(`${i+1}. ${lead.name || 'UNNAMED'} (${lead.id})`);
      console.log(`   Status: ${lead.status}`);
      console.log(`   Website: ${lead.website || 'N/A'}`);
      console.log(`   Country: ${lead.country || 'N/A'}`);
      console.log(`   Tags: ${lead.tags?.join(', ') || 'none'}`);
      console.log('');
    });
  } else {
    console.log('\n✓ All investor leads have ICP scores!');
  }
}

checkResearchStatus().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
