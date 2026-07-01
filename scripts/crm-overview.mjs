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

async function overview() {
  const leadsSnap = await db.collection('leads').get();
  const leads = leadsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
  
  console.log(`\n=== LOREWEAVER CRM OVERVIEW ===\n`);
  console.log(`Total leads: ${leads.length}\n`);
  
  // By type
  const byType = {};
  for (const l of leads) {
    byType[l.type] = (byType[l.type] || 0) + 1;
  }
  console.log('By Type:');
  for (const [type, count] of Object.entries(byType).sort((a,b) => b[1] - a[1])) {
    console.log(`  ${type}: ${count}`);
  }
  
  // By status
  const byStatus = {};
  for (const l of leads) {
    const status = l.status || 'unknown';
    byStatus[status] = (byStatus[status] || 0) + 1;
  }
  console.log('\nBy Status:');
  for (const [status, count] of Object.entries(byStatus).sort((a,b) => b[1] - a[1])) {
    console.log(`  ${status}: ${count}`);
  }
  
  // By country (top 15)
  const byCountry = {};
  for (const l of leads) {
    const country = l.country || 'unknown';
    byCountry[country] = (byCountry[country] || 0) + 1;
  }
  console.log('\nBy Country (top 15):');
  const topCountries = Object.entries(byCountry).sort((a,b) => b[1] - a[1]).slice(0, 15);
  for (const [country, count] of topCountries) {
    console.log(`  ${country}: ${count}`);
  }
  
  // By priority
  const byPriority = {};
  for (const l of leads) {
    const priority = l.priority || 'none';
    byPriority[priority] = (byPriority[priority] || 0) + 1;
  }
  console.log('\nBy Priority:');
  for (const [priority, count] of Object.entries(byPriority).sort((a,b) => b[1] - a[1])) {
    console.log(`  ${priority}: ${count}`);
  }
  
  // High priority leads
  const highPriority = leads.filter(l => l.priority === 'high');
  if (highPriority.length > 0) {
    console.log(`\n=== HIGH PRIORITY LEADS (${highPriority.length}) ===\n`);
    for (const l of highPriority.slice(0, 20)) {
      const fit = l.studio?.fitScore || l.investor?.fitScore || '?';
      console.log(`  [${l.type}] ${l.name} (${l.country}) - Fit: ${fit} - Status: ${l.status}`);
    }
    if (highPriority.length > 20) {
      console.log(`  ... and ${highPriority.length - 20} more`);
    }
  }
  
  // Studios by size
  const studios = leads.filter(l => l.type === 'studio');
  const bySize = {};
  for (const s of studios) {
    const size = s.studio?.size || 'unknown';
    bySize[size] = (bySize[size] || 0) + 1;
  }
  console.log('\nStudios by Size:');
  for (const [size, count] of Object.entries(bySize).sort((a,b) => b[1] - a[1])) {
    console.log(`  ${size}: ${count}`);
  }
  
  // Investors by check size
  const investors = leads.filter(l => l.type === 'investor');
  console.log(`\nInvestors: ${investors.length}`);
  const withCheckSize = investors.filter(i => i.investor?.checkSizeMin || i.investor?.checkSizeMax);
  console.log(`  With check size info: ${withCheckSize.length}`);
  
  // Top 10 by fit score
  const withFit = leads.filter(l => (l.studio?.fitScore || l.investor?.fitScore) > 0);
  const topFit = withFit.sort((a, b) => {
    const aFit = a.studio?.fitScore || a.investor?.fitScore || 0;
    const bFit = b.studio?.fitScore || b.investor?.fitScore || 0;
    return bFit - aFit;
  }).slice(0, 15);
  
  console.log(`\n=== TOP 15 BY FIT SCORE ===\n`);
  for (const l of topFit) {
    const fit = l.studio?.fitScore || l.investor?.fitScore;
    console.log(`  ${fit} | [${l.type}] ${l.name} (${l.country}) - ${l.status}`);
  }
  
  // Pipeline stages
  const byStage = {};
  for (const l of leads) {
    const stage = l.pipeline?.stageId || 'none';
    byStage[stage] = (byStage[stage] || 0) + 1;
  }
  console.log('\nBy Pipeline Stage:');
  for (const [stage, count] of Object.entries(byStage).sort((a,b) => b[1] - a[1])) {
    console.log(`  ${stage}: ${count}`);
  }
  
  process.exit(0);
}

overview().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
