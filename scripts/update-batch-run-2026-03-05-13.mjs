import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Firebase
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(readFileSync(join(__dirname, '..', 'service-account.json'), 'utf8'));
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}

const db = admin.firestore();

const researchData = [
  {
    id: 'PGcZV6QOK9cnnOymhlaD',
    name: 'Alt Shift',
    note: `**Research completed 2026-03-05**

**Company:** Alt Shift (Alternative Shift SAS)
**Location:** 1 Place Francis Ponge, 34000 Montpellier, France
**Website:** https://altshift.fr
**Email:** contact@altshift.fr

**Key People (LinkedIn):**
- Frédéric Lopez (CEO)
- Vincent Noël (Co-founder)
- Ian Reiley (Writer/Narrative Designer)

**Games:** Crying Suns, Battlestar Galactica: Scattered Hopes
**Focus:** Neo-retro puzzle games, narrative-driven experiences

**Social:**
- LinkedIn: 2K+ followers (https://linkedin.com/company/alternative-shift)
- Facebook: 700+ followers

**Narrative Relevance:** HIGH - Strong narrative focus, Ian Reiley is dedicated narrative designer. Published Crying Suns (praised for story-rich gameplay). Good Director prospect.`,
    status: 'warm'
  },
  {
    id: 'PIS1zaENbnhH2ZEVNLrZ',
    name: 'Spike Chunsoft',
    note: `**Research completed 2026-03-05**

**Company:** Spike Chunsoft Co., Ltd.
**Location:** Japan (HQ), Long Beach, California (US office)
**Website:** https://spike-chunsoft.co.jp (JP), https://spike-chunsoft.com (US)

**Emails:**
- Press/Business (Japan): press@spike-chunsoft.co.jp
- Support (US): support@spike-chunsoft.com
- Contact form: https://www.spike-chunsoft.com/contact/

**Key People:**
- Alex Flagg - Lead Editor/Localization Supervisor (LinkedIn)

**Games:** Danganronpa series, Zero Escape series, AI: The Somnium Files, Master Detective Archives: RAIN CODE

**Social:**
- X: @SpikeChunsoft_e (117.5K followers)
- Facebook: 21K followers

**Narrative Relevance:** HIGH - Known for visual novels and narrative-heavy games. Danganronpa is iconic narrative game. Director prospect for VN-style features. Large studio - enterprise tier.`,
    status: 'warm'
  },
  {
    id: 'Pc09LQKWNjtsher42Flv',
    name: "That's No Moon",
    note: `**Research completed 2026-03-05**

**Company:** That's No Moon Entertainment
**Location:** 5419 McConnell Ave, Los Angeles, CA 90066, USA
**Website:** https://thatsnomoon.com
**Contact:** https://thatsnomoon.com/contact (contact form only)

**Email Domain:** @thatsnomoon.com (format: FLast@thatsnomoon.com - 93%)

**Team:** Independent AAA studio founded by veterans from major studios (Naughty Dog, Infinity Ward)

**Focus:** Narrative-driven AAA experiences. "Storytellers and game-makers who believe in the power of narrative-driven experiences."

**Social:**
- LinkedIn: 41.3K followers
- Facebook: 390 followers
- Instagram: @thatsnomoonent

**Narrative Relevance:** VERY HIGH - Entire studio DNA is narrative-focused AAA. Prime Director prospect. No public email - use contact form for outreach.`,
    status: 'hot'
  },
  {
    id: 'QPaZZnmZkPWg0nu5V6kR',
    name: 'Q-Games',
    note: `**Research completed 2026-03-05**

**Company:** Q-Games Ltd.
**Location:** Kyoto-shi, Kyoto, Japan
**Website:** https://www.q-games.com

**Emails:**
- General/Business: contact@q-games.com
- Press/Media: pr@q-games.com (or pr-team@q-games.com)

**Key People:**
- Dylan Cuthbert (Director/Founder) - ex-Nintendo, worked on Star Fox

**Games:** PixelJunk series, All You Need is Help (TGS 2024)
**Focus:** Unique, high-quality indie titles. 20+ years in Kyoto.

**Social:**
- Facebook: 1.4K followers

**Narrative Relevance:** MEDIUM - Known for unique gameplay, less narrative-focused. Smaller indie studio. May be interested in Architect for world-building.`,
    status: 'cold'
  },
  {
    id: 'QgrHVVPeK5bFrQ9csOY6',
    name: 'thatgamecompany',
    note: `**Research completed 2026-03-05**

**Company:** thatgamecompany
**Location:** Santa Monica, California, USA
**Website:** https://thatgamecompany.com

**Contact:** No direct email found. Use Games Press for press inquiries. Support via https://thatgamecompany.helpshift.com/

**Key People:**
- Jenova Chen (CEO & Creative Director)
- Jennie Kong (Narrative Writer) - key narrative contact

**Games:** flOw, Flower, Journey, Sky: Children of the Light

**Focus:** Emotional, timeless interactive entertainment. Human connection across ages.

**Social:**
- Facebook: 57.1K followers
- Instagram: 107.9K followers

**Narrative Relevance:** HIGH - Journey is iconic emotional narrative game. Sky has ongoing narrative content. Jennie Kong handles narrative. Use Games Press for outreach.`,
    status: 'warm'
  }
];

async function updateCRM() {
  console.log('Starting CRM updates for batch 13...');
  
  for (const studio of researchData) {
    try {
      // Add research note to notes collection
      await db.collection('notes').add({
        leadId: studio.id,
        content: studio.note,
        status: studio.status,
        createdBy: 'skel-research-bot',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log(`✓ Added note for ${studio.name}`);
      
      // Update lead status to researched
      await db.collection('leads').doc(studio.id).update({
        status: 'researched',
        'pipeline.stageId': 'researched',
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log(`✓ Updated status for ${studio.name}`);
      
    } catch (error) {
      console.error(`✗ Error updating ${studio.name}:`, error.message);
    }
  }
  
  // Update state file
  const statePath = join(__dirname, 'batch-research-state.json');
  const state = JSON.parse(readFileSync(statePath, 'utf8'));
  
  const newIds = researchData.map(s => s.id);
  state.completedIds.push(...newIds);
  state.lastRunAt = new Date().toISOString();
  state.stats.researched += researchData.length;
  
  writeFileSync(statePath, JSON.stringify(state, null, 2));
  console.log(`\n✓ Updated state file. Total researched: ${state.stats.researched}`);
  
  process.exit(0);
}

updateCRM();
