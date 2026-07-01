// Batch research update - 2026-03-05 run #19
import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, '..', 'service-account.json'), 'utf8')
);

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

const updates = [
  {
    id: 'bNhsPeDGYR7qCh2Vibzn',
    name: 'Deck13 Interactive',
    note: `**Research completed 2026-03-05**

**Contact Information:**
- General: info@deck13.com
- Jobs/HR: jobs@deck13.com
- Press: press@deck13.com
- Publishing (Spotlight): spotlight@deck13.com
- Phone: +49 6971671660

**Company Details:**
- Location: Frankfurt, Germany
- Founded: 2001
- Part of PULLUP Entertainment
- LinkedIn: 9.7K+ followers
- Notable games: The Surge series, Lords of the Fallen

**Publishing arm:** Deck13 Spotlight (currently full, not taking new projects)

**Narrative relevance:** Strong RPG/action-RPG focus with storytelling elements. German AA studio with publishing capabilities.`,
    status: 'warm'
  },
  {
    id: 'bO6mHNM50J85hKnbnxPb',
    name: 'Kayfo Games',
    note: `**Research completed 2026-03-05**

**Contact Information:**
- General/Business: contact@kayfo.games
- Support/Privacy: julien@kayfo.games

**Company Details:**
- Location: Dakar, Senegal (African mobile games studio)
- Website: kayfo.sn / kayfo.games
- Facebook: 1.5K+ followers
- LinkedIn: 2.7K+ followers

**Focus:** African mobile and web games, HTML5 games portal

**Narrative relevance:** Mobile games with African themes. Smaller indie studio - may be interested in accessible narrative tools.`,
    status: 'cold'
  },
  {
    id: 'bUfBROEuZxEQaiootgtr',
    name: 'WayForward',
    note: `**Research completed 2026-03-05**

**Contact Information:**
- Support/Inquiries: wayforward.com/support (form-based)
- Phone: (661) 286-2769
- Address: 28738 The Old Road, Valencia, CA 91355, USA

**Company Details:**
- Location: Valencia, California, USA
- Founded: 30+ years ago (independent studio)
- Notable games: Shantae series, River City Girls

**Publishing:** Independent developer and publisher, works with Limited Run Games for physical releases

**Narrative relevance:** Strong character-driven games with humor. Known for platformers with story elements. Established indie - might be interested in narrative tech for future projects.`,
    status: 'warm'
  },
  {
    id: 'c0LX1qtw2ntYHHpEFsy8',
    name: 'Darinoos',
    note: `**Research completed 2026-03-05**

**Status: DEFUNCT/INACTIVE**

Darinoos was a Persian game localization team active in Iran from early 2000s to mid-2010s. They were known for dubbing and translating games into Persian.

**No current contact information available** - team appears to be no longer active.

**Recommendation:** Mark as lost/inactive. Not a viable lead for LoreWeaver.`,
    status: 'cold'
  },
  {
    id: 'cQ1AI4k6bhJoBmmC7YUl',
    name: 'Funny Mobile Games',
    note: `**Research completed 2026-03-05**

**Contact Information:**
- General: info@funnymobilegames.com
- Contact: contact@funnymobilegames.com
- Website: funnymobilegames.com

**Company Details:**
- Focus: Mobile games

**Narrative relevance:** Mobile games studio - limited info available. May be interested in casual narrative features.`,
    status: 'cold'
  }
];

async function updateLeads() {
  const batch = db.batch();
  
  for (const update of updates) {
    // Update lead status
    const leadRef = db.collection('leads').doc(update.id);
    batch.update(leadRef, {
      status: 'researched',
      'pipeline.stageId': 'researched',
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    // Add research note
    const noteRef = db.collection('notes').doc();
    batch.set(noteRef, {
      leadId: update.id,
      content: update.note,
      status: update.status,
      createdBy: 'skel-batch-research',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`Prepared: ${update.name} (${update.id})`);
  }
  
  await batch.commit();
  console.log('\nAll updates committed successfully!');
}

updateLeads().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
