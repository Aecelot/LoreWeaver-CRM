// Update Paradox Interactive with deep research and move to researched
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

async function updateParadox() {
  // Find Paradox
  const snap = await db.collection('leads')
    .where('name', '==', 'Paradox Interactive')
    .limit(1)
    .get();
  
  if (snap.empty) {
    console.log('❌ Paradox Interactive not found');
    process.exit(1);
  }
  
  const doc = snap.docs[0];
  const id = doc.id;
  
  // Update with research
  await db.collection('leads').doc(id).update({
    score: 95, // Upgraded from 90
    size: '594',
    type: 'publisher', // They're a publisher, not just studio
    icp: 'Architect',
    contact: {
      name: 'Mattias Rengstedt',
      role: 'Chief Business Officer',
      email: 'mattias.rengstedt@paradoxplaza.com',
      linkedin: ''
    },
    notes: `TIER 1 ARCHITECT TARGET. $223M revenue (2024), 594 employees, publicly traded (OMX: PDX).

KEY INSIGHT: CK3 has 22 DLCs with thousands of narrative events. Massive scale = perfect Architect fit for style consistency QA.

⚠️ AI CAUTION: Stellaris: The Machine Age (May 2024) caused backlash over AI voices — Steam ratings dropped. They now have "strict guidelines" for ethical AI use.

OUTREACH STRATEGY:
- Lead with "content QA at scale" not "AI"
- Frame as production tool (like grammar check)
- Emphasize style consistency across 22 DLCs
- Mention modding ecosystem support

CONTACTS:
- CEO: Fredrik Wester (fredrik.wester@paradoxplaza.com)
- CBO: Mattias Rengstedt (mattias.rengstedt@paradoxplaza.com) — partnerships
- CFO: Alexander Bricca

Recent: Acquired Haemimont Games (Jan 2025). Chapter IV DLC for CK3 (Japan expansion).

Full research: research/leads/paradox-interactive.md`,
    tags: ['sweden', 'publisher', 'aa', 'strategy', 'simulation', 'architect-icp', 'researched', 'tier-1', 'ai-cautious'],
    'studio.fitScore': 95,
    'studio.fitReason': 'CK3 has 22 DLCs with thousands of events. Massive scale = style consistency QA. BUT AI-cautious after Stellaris controversy.',
    'pipeline.stageId': 'researched',
    'pipeline.enteredStageAt': admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  });
  
  // Add research note
  await db.collection('notes').add({
    leadId: id,
    type: 'research',
    content: `## Deep Research Complete (2026-03-02)

### Company Profile
- Revenue: $223M (2024)
- Operating Profit: 721M SEK
- Cash: 1.47B SEK
- Employees: ~594

### AI Stance — CRITICAL
Stellaris: The Machine Age (May 2024) used AI voices and caused backlash. Steam ratings dropped from "Very Positive" to "Mixed". They now have "strict guidelines" for ethical AI use.

### Architect Fit: EXCELLENT
- CK3 alone has 22 DLCs with thousands of events
- Massive QA burden on narrative consistency
- Style guide enforcement across teams
- Modding community creates compatible content

### Key Contacts
- CBO Mattias Rengstedt — handles partnerships (since 2024)
- CEO Fredrik Wester — vision (with company 18+ years)

### Outreach Approach
DO: Lead with "content QA at scale", "style consistency", "production tool"
DON'T: Lead with "AI", mention replacing writers, bring up Stellaris

Full report: research/leads/paradox-interactive.md`,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  });
  
  console.log('✅ Updated Paradox Interactive');
  console.log('   - Score: 90 → 95');
  console.log('   - Type: studio → publisher');
  console.log('   - Stage: new → researched');
  console.log('   - Added contact: Mattias Rengstedt (CBO)');
  console.log('   - Added research note');
  
  process.exit(0);
}

updateParadox().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
