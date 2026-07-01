import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load service account from CRM project
const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, '..', 'service-account.json'), 'utf8')
);

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

// Normalize name for comparison
function normalizeName(name) {
  if (!name) return '';
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '') // Remove all non-alphanumeric
    .trim();
}

async function deduplicateStudios() {
  // Load scraped Belgian studios
  const scrapedData = JSON.parse(
    readFileSync('C:\\Users\\rijkg\\clawd\\research\\belgian-studios-2026-04-04.json', 'utf8')
  );
  const scrapedStudios = scrapedData.companies;
  
  console.log(`\n=== BELGIAN STUDIOS DEDUPLICATION ===\n`);
  console.log(`Scraped studios from gameindustry.be: ${scrapedStudios.length}`);
  
  // Query all existing leads from CRM
  const leadsSnap = await db.collection('leads').get();
  const existingLeads = leadsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
  
  console.log(`Existing leads in CRM: ${existingLeads.length}`);
  
  // Create normalized name map for existing leads
  const existingNormalized = new Map();
  for (const lead of existingLeads) {
    const normalized = normalizeName(lead.name);
    if (!existingNormalized.has(normalized)) {
      existingNormalized.set(normalized, []);
    }
    existingNormalized.get(normalized).push(lead);
  }
  
  // Categorize scraped studios
  const newStudios = [];
  const existingStudios = [];
  
  for (const studio of scrapedStudios) {
    const normalized = normalizeName(studio.name);
    
    if (existingNormalized.has(normalized)) {
      const matches = existingNormalized.get(normalized);
      existingStudios.push({
        ...studio,
        crmMatches: matches.map(m => ({
          id: m.id,
          name: m.name,
          type: m.type,
          status: m.status,
          country: m.country
        }))
      });
    } else {
      newStudios.push(studio);
    }
  }
  
  console.log(`\n--- RESULTS ---`);
  console.log(`New (not in CRM): ${newStudios.length}`);
  console.log(`Already in CRM: ${existingStudios.length}`);
  
  // Output existing studios in CRM
  if (existingStudios.length > 0) {
    console.log(`\n=== ALREADY IN CRM (${existingStudios.length}) ===`);
    for (const s of existingStudios) {
      const match = s.crmMatches[0];
      console.log(`  ✓ ${s.name} → CRM: "${match.name}" (${match.type}, ${match.status})`);
    }
  }
  
  // Output new studios
  if (newStudios.length > 0) {
    console.log(`\n=== NEW LEADS (${newStudios.length}) ===`);
    for (const s of newStudios.slice(0, 30)) {
      console.log(`  + ${s.name} | ${s.location} | ${s.type}`);
    }
    if (newStudios.length > 30) {
      console.log(`  ... and ${newStudios.length - 30} more`);
    }
  }
  
  // Save updated JSON with deduplication info
  const outputData = {
    ...scrapedData,
    deduplication: {
      checkedAt: new Date().toISOString(),
      totalScraped: scrapedStudios.length,
      newLeads: newStudios.length,
      existingInCrm: existingStudios.length
    },
    companies: scrapedStudios.map(studio => {
      const normalized = normalizeName(studio.name);
      const isInCrm = existingNormalized.has(normalized);
      const crmMatch = isInCrm ? existingNormalized.get(normalized)[0] : null;
      
      return {
        ...studio,
        isNewLead: !isInCrm,
        crmStatus: isInCrm ? 'existing' : 'new',
        crmId: crmMatch?.id || null,
        crmLeadStatus: crmMatch?.status || null
      };
    }),
    newLeadsOnly: newStudios,
    existingLeadsInfo: existingStudios
  };
  
  writeFileSync(
    'C:\\Users\\rijkg\\clawd\\research\\belgian-studios-2026-04-04-deduped.json',
    JSON.stringify(outputData, null, 2)
  );
  
  console.log(`\n✓ Saved deduplicated data to belgian-studios-2026-04-04-deduped.json`);
  
  // Summary for high-priority narrative studios
  const narrativePriority = scrapedData.high_priority_leads || [];
  console.log(`\n=== HIGH PRIORITY NARRATIVE LEADS STATUS ===`);
  for (const hp of narrativePriority) {
    const studio = scrapedStudios.find(s => s.name === hp.name);
    if (studio) {
      const normalized = normalizeName(hp.name);
      const isNew = !existingNormalized.has(normalized);
      const status = isNew ? '🆕 NEW' : '✓ EXISTS';
      console.log(`  ${status} ${hp.name} - ${hp.reason}`);
    }
  }
  
  process.exit(0);
}

deduplicateStudios().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
