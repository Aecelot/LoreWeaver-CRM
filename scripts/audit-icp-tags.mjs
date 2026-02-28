// Audit and fix ICP tags for all leads
// Every lead must have either architect-icp or director-icp (or both)
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

// Rules for determining ICP based on fitReason, notes, or other fields
function determineICP(lead) {
  const tags = lead.tags || [];
  const hasArchitect = tags.includes('architect-icp');
  const hasDirector = tags.includes('director-icp');
  
  // Already tagged
  if (hasArchitect || hasDirector) {
    return { hasArchitect, hasDirector, needsUpdate: false };
  }
  
  // Try to determine from fitReason
  const fitReason = (lead.studio?.fitReason || '').toLowerCase();
  const notes = (lead.notes || '').toLowerCase();
  const combined = fitReason + ' ' + notes;
  
  // Director signals
  const directorSignals = [
    'director',
    'npc dialogue',
    'runtime',
    'dynamic dialogue',
    'co-op',
    'asymmetric',
    'open world',
    'rpg with',
    'action rpg',
  ];
  
  // Architect signals
  const architectSignals = [
    'architect',
    'branching narrative',
    'authoring',
    'narrative design',
    'writing tool',
    'production ai',
    'visual novel',
    'dialogue tree',
    'story-driven',
    'narrative-focused',
    'narrative focus',
    'lore',
    'walking sim',
    'adventure game',
    'point-and-click',
  ];
  
  let suggestArchitect = architectSignals.some(s => combined.includes(s));
  let suggestDirector = directorSignals.some(s => combined.includes(s));
  
  // If still unclear, default based on studio size
  if (!suggestArchitect && !suggestDirector) {
    const size = lead.studio?.size || '';
    const sizeNum = parseInt(size.replace(/[^0-9]/g, '')) || 0;
    
    if (sizeNum <= 30) {
      suggestArchitect = true; // Small indies → Architect
    } else if (sizeNum > 50) {
      suggestDirector = true; // Larger AA → Director
    } else {
      suggestArchitect = true; // Default to Architect for unknowns
    }
  }
  
  return {
    hasArchitect: suggestArchitect,
    hasDirector: suggestDirector,
    needsUpdate: true
  };
}

async function auditICPTags() {
  const snapshot = await db.collection('leads').get();
  
  console.log(`Auditing ${snapshot.size} leads for ICP tags...\n`);
  
  let missingCount = 0;
  let fixedCount = 0;
  const toFix = [];
  
  snapshot.forEach(doc => {
    const lead = { id: doc.id, ...doc.data() };
    const tags = lead.tags || [];
    const hasArchitect = tags.includes('architect-icp');
    const hasDirector = tags.includes('director-icp');
    
    if (!hasArchitect && !hasDirector) {
      missingCount++;
      const icp = determineICP(lead);
      toFix.push({ doc, lead, icp });
    }
  });
  
  console.log(`Found ${missingCount} leads missing ICP tags.\n`);
  
  if (toFix.length === 0) {
    console.log('✅ All leads have ICP tags!');
    process.exit(0);
  }
  
  // Preview changes
  console.log('Proposed fixes:');
  console.log('─'.repeat(80));
  
  for (const { lead, icp } of toFix) {
    const icpLabel = icp.hasArchitect && icp.hasDirector ? 'Both' :
                     icp.hasArchitect ? 'Architect' :
                     icp.hasDirector ? 'Director' : '???';
    console.log(`${lead.name.padEnd(35)} → ${icpLabel}`);
  }
  
  console.log('─'.repeat(80));
  console.log(`\nApplying fixes...`);
  
  for (const { doc, lead, icp } of toFix) {
    const newTags = [...(lead.tags || [])];
    if (icp.hasArchitect && !newTags.includes('architect-icp')) {
      newTags.push('architect-icp');
    }
    if (icp.hasDirector && !newTags.includes('director-icp')) {
      newTags.push('director-icp');
    }
    
    await doc.ref.update({ 
      tags: newTags,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    fixedCount++;
  }
  
  console.log(`\n✅ Fixed ${fixedCount} leads.`);
  process.exit(0);
}

auditICPTags().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
