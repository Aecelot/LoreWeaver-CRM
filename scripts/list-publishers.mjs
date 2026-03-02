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

async function listPublishers() {
  const snap = await db.collection('leads')
    .where('type', '==', 'publisher')
    .get();
  
  const pubs = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (b.score || 0) - (a.score || 0));
  
  console.log(`Publishers in CRM (${pubs.length} total):\n`);
  
  // Group by AI investment level
  const aiInvestors = [];
  const narrativePubs = [];
  const others = [];
  
  for (const p of pubs) {
    const tags = p.tags || [];
    const notes = (p.notes || '').toLowerCase();
    
    const hasAiInvestment = 
      tags.some(t => t.includes('ai') || t.includes('nvidia')) ||
      notes.includes('nvidia ace') ||
      notes.includes('ai investment') ||
      notes.includes('ai-first') ||
      notes.includes('chief ai officer');
    
    const isNarrativeFocused = 
      tags.includes('narrative') || 
      tags.includes('narrative-specialist') ||
      notes.includes('narrative');
    
    if (hasAiInvestment) {
      aiInvestors.push(p);
    } else if (isNarrativeFocused) {
      narrativePubs.push(p);
    } else {
      others.push(p);
    }
  }
  
  console.log('=== AI TOOL INVESTORS ===\n');
  for (const p of aiInvestors) {
    console.log(`${p.score || '?'} | ${p.name} (${p.country}) | ${p.size || '?'}`);
    const aiNote = (p.notes || '').substring(0, 200);
    if (aiNote) console.log(`     ${aiNote}...`);
    console.log('');
  }
  
  console.log('\n=== NARRATIVE-FOCUSED ===\n');
  for (const p of narrativePubs) {
    console.log(`${p.score || '?'} | ${p.name} (${p.country}) | ${p.size || '?'}`);
  }
  
  console.log('\n=== OTHER PUBLISHERS ===\n');
  for (const p of others) {
    console.log(`${p.score || '?'} | ${p.name} (${p.country}) | ${p.size || '?'}`);
  }
  
  process.exit(0);
}

listPublishers().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
