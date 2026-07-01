// Batch research update - 2026-03-05 run 23
import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, '..', 'service-account.json'), 'utf8')
);

if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}
const db = admin.firestore();

const researchData = [
  {
    leadId: 'nmRzvVF8ljktETmmS8fz',
    name: 'Halberd Studios',
    note: `**Research completed 2026-03-05**

**Location:** Guadalajara, Jalisco, Mexico
**Website:** https://www.halberdstudios.com
**Founded:** 2016

**Contact:**
- Email: hi@halberdstudios.com (general)
- Email: mike@halberdstudios.com (Mike, business)
- Services form: https://www.halberdstudios.com/services

**Key People:**
- Miguel Hasson - CEO / Creative Director
- Raúl Bonillas - Director of Operations
- Gabriel Villaseñor - Lead Game Designer

**Games:**
- 9 Years of Shadows (released)
- Mariachi Legends (upcoming, combat-oriented Metroidvania)

**Focus:** Indie studio crafting legendary media, Mexican cultural themes

**Social:**
- LinkedIn: linkedin.com/company/halberd-studios (1.9K followers)
- X/Twitter: @HALBERDSTUDIOS
- Facebook: @HALBERDSTUDIOS (3.4K followers)
- Instagram: @halberdstudios (8.2K followers)

**Size:** 11-50 employees
**Address:** #1160 Av. De Las Americas, Zapopan, Jalisco, 45160, Mexico

**LoreWeaver Fit:** Narrative-driven Metroidvanias with story focus. Strong Director prospect.`,
    status: 'warm'
  },
  {
    leadId: 'qGAP4VdHS0TNrEyb2LGL',
    name: 'Weza Interactive',
    note: `**Research completed 2026-03-05**

**Full Name:** Weza Interactive Entertainment LTD
**Location:** Nairobi, Kenya
**Website:** https://weza.africa
**Founded:** 2016/2017

**Contact:**
- Email: weza.int.ent@gmail.com
- Social: @Weza_IE (X/Twitter)

**Founder:** Odongo George Ahere (James Ahere)

**Focus:** African-centered narrative games, Technology Art and Culture company with mission of empowering Africa using interactive media

**Games:**
- Mzito series (flagship - African mythology/culture)

**Social:**
- X/Twitter: @Weza_IE
- Instagram: @weza_ie (160+ followers)
- Facebook: @WezaIE (270+ followers)
- LinkedIn: ke.linkedin.com/company/wezaie
- itch.io: wezaie.itch.io

**LoreWeaver Fit:** STRONG narrative focus on African storytelling. Excellent Director prospect - exactly the kind of culturally-rich narrative-driven studio that benefits from AI-assisted storytelling tools.`,
    status: 'warm'
  },
  {
    leadId: 'qRVgrSpq8xrHd1f4dRPR',
    name: 'Flux Games',
    note: `**Research completed 2026-03-05**

**Full Name:** Flux Game Studio
**Location:** São Paulo, Brazil
**Website:** https://fluxgamestudio.com (also flux-ga-mes.com)
**Founded:** 2012

**Contact:**
- Email: contact@fluxgamestudio.com
- Phone: +55 11 2305-0125
- Address: Rua Padre Artur Somensi, 91, São Paulo, SP 05443010, Brazil

**Key People:**
- Stivenson Valério (founder/contact via Global Game Jam)

**Focus:** Game porting and development support. Leader in game porting with 20+ shipped ports.

**Social:**
- LinkedIn: linkedin.com/company/fluxgames (11.6K followers)
- Facebook: @FluxGamesOfficial (4.5K followers)
- Crunchbase: crunchbase.com/organization/flux-game-studio
- IndieDB: indiedb.com/company/flux-game-studio

**Size:** 51-200 employees (grown from 3 in 2012 to 20+)
**Revenue:** ~$5M (per RocketReach)

**LoreWeaver Fit:** LOWER priority - primarily a porting/work-for-hire studio rather than narrative IP creator. Could be relevant for Runtime middleware partnerships but not primary Director target.`,
    status: 'cold'
  },
  {
    leadId: 'qTQ8kp4L4MPT46dciyom',
    name: "Kiro'o Games",
    note: `**Research completed 2026-03-05**

**Location:** Yaoundé, Cameroon (first video game studio in Central Africa!)
**Website:** https://kirooworld.com
**Founded:** 2013

**Contact:**
- Email: contact@kiroogames.com
- Email: founders@kiroogames.com (founders direct)
- Phone: +237 675 463 991

**Focus:** African Fantasy (Afro-fantasy) narrative-driven games, creating new narrative, audio, visual benchmarks

**Games:**
- Aurion: Legacy of the Kori-Odan (flagship RPG - Steam release)
- Working on expanding IP (comics, animations, fintech)

**Social:**
- Facebook: facebook.com/kiroogames (8.4K followers)
- LinkedIn: cm.linkedin.com/company/kiro'o-games (2.2K followers)
- Steam: steamcommunity.com/id/kiroogames

**Size:** ~20 employees
**Awards:** Best African game studio 2021
**Fundraising:** Opening capital to investors (kirooshareholders.com)

**Notable:** Xbox honored them! Creating "Wallbreaker Vision" - most inspiring company in Africa

**LoreWeaver Fit:** EXCELLENT Director prospect. Pioneer in African narrative gaming with explicit focus on storytelling. Their narrative-driven RPG approach and cultural storytelling mission aligns perfectly with Director's value prop.`,
    status: 'hot'
  },
  {
    leadId: 'qXhS72Bh5WJ9YM39LYqJ',
    name: 'Imgnation Studios',
    note: `**Research completed 2026-03-05**

**Status:** UNABLE TO VERIFY

Search results do not find a game studio called "Imgnation Studios" - Google auto-corrects to "Imagination Studios" which returns various unrelated creative agencies and a Turkish casual games studio (Imaginite Studios).

Possible scenarios:
1. Name may be misspelled in CRM
2. Very small/new studio with no web presence yet
3. May have closed or renamed

**Recommendation:** Mark for manual review. Need to verify source of this lead and correct name if applicable.`,
    status: 'cold'
  }
];

async function updateCRM() {
  const batch = db.batch();
  const now = admin.firestore.FieldValue.serverTimestamp();
  
  for (const item of researchData) {
    // Add note to notes collection
    const noteRef = db.collection('notes').doc();
    batch.set(noteRef, {
      leadId: item.leadId,
      content: item.note,
      status: item.status,
      createdBy: 'skel-batch-research',
      createdAt: now,
      updatedAt: now
    });
    
    // Update lead status
    const leadRef = db.collection('leads').doc(item.leadId);
    batch.update(leadRef, {
      status: 'researched',
      'pipeline.stageId': 'researched',
      updatedAt: now
    });
    
    console.log(`✓ Prepared update for ${item.name} (${item.leadId})`);
  }
  
  await batch.commit();
  console.log('\n✅ All updates committed to Firestore');
  
  // Update state file
  const stateFile = join(__dirname, 'batch-research-state.json');
  const state = JSON.parse(readFileSync(stateFile, 'utf8'));
  
  const newIds = researchData.map(r => r.leadId);
  state.completedIds.push(...newIds);
  state.lastRunAt = new Date().toISOString();
  state.stats.researched += researchData.length;
  
  writeFileSync(stateFile, JSON.stringify(state, null, 2));
  console.log(`\n📊 State updated: ${state.stats.researched} total researched, ${state.completedIds.length} IDs tracked`);
}

updateCRM()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
