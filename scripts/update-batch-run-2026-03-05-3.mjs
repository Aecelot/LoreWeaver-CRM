// Batch research update - 2026-03-05 run 3
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

const researchData = [
  {
    id: 'BEHVyY7ub9WhNQGyAeTT',
    name: 'Black Division Games',
    note: `Research conducted 2026-03-05:
No public presence found for "Black Division Games" as a game studio. Google search returns no matching results - only confusion with Treyarch (Black Ops), Massive Entertainment (The Division), etc. May be a very early-stage studio with no web presence, or the name may be incorrect.
Status: Unable to verify existence.`,
    status: 'cold'
  },
  {
    id: 'BHcncBPLFIcDJ6QVwvCI',
    name: 'Full Control',
    note: `Research conducted 2026-03-05:
**Full Control ApS** - Danish game development studio
- Founded: 2004 by Thomas Hentschel Lund
- Location: Vejby/Copenhagen, Denmark
- Phone: (+45) 2991 2995
- Website: www.fullcontrol.dk
- Known games: Space Hulk, Frontline Tactics, Jagged Alliance, Smack Boxing
- Developed proprietary "TX Engine"
- 5-9 employees, strategy/tactics games focus
- CVR: 27777074
Good fit for Director - established strategy game dev with narrative experience (Jagged Alliance).`,
    status: 'warm',
    website: 'https://www.fullcontrol.dk'
  },
  {
    id: 'BKGxHPxfMG65jRRzhnEr',
    name: 'Umbu Games',
    note: `Research conducted 2026-03-05:
**Umbu Games** - Brazilian game development studio
- Founded: 2015
- Location: Belo Horizonte, Minas Gerais, Brazil
- Address: Rua Joaquim Carlos Maciel 66, Sala 01, 31960-050
- Email: contato@umbugames.com
- Phone: +55 31 98876-6435
- Website: umbugames.com
- Services: Full-service game dev, 2D/3D game art, VFX
- Attended Gamescom LATAM
- Looking for publishers for PC/console/mobile games
Growing LATAM studio with art/VFX capabilities - could benefit from Architect for narrative tooling.`,
    status: 'warm',
    website: 'https://umbugames.com',
    email: 'contato@umbugames.com'
  },
  {
    id: 'BQ11IAawdSeI4Nr5BbhT',
    name: 'Doha Pixel Forge',
    note: `Research conducted 2026-03-05:
Mentioned in SDLC Corp article as Qatar-based studio focusing on:
- Artistic game design
- Cinematic visuals
- Creative game mechanics
- Narrative-driven indie games
- Visual story experiences
However, NO direct website or contact info found. Related (but different) companies:
- Pixel Creations (pixeldoha.com) - sales@pixeldoha.com, +974 70 559 229
- Digital Forge (digitalforge.qa) - info@digitalforge.qa, +974 5594 1322
May be very new/stealth studio. Qatar gaming scene is emerging.
Status: Cannot verify contact details.`,
    status: 'cold'
  },
  {
    id: 'BRw3bYa6fVic78aWvyXj',
    name: 'Nour: Play With Light team',
    note: `Research conducted 2026-03-05:
NOTE: Game is actually "Nour: Play With Your Food" (not "Play With Light")
**Terrifying Jellyfish** - Solo dev studio
- Developer: TJ Hughes
- Location: St. Louis, Missouri, USA
- Website: food.game
- Twitter: @jellyoccult
- Publisher: Panic Inc.
- Platforms: PS5, Switch, PC
Experimental food art game - artistic/experimental focus. TJ Hughes is solo dev with unique visual style. Very niche - not traditional narrative game, but could be interested in creative narrative tools.`,
    status: 'warm',
    website: 'https://food.game'
  }
];

async function updateLeads() {
  const batch = db.batch();
  const now = admin.firestore.FieldValue.serverTimestamp();
  
  for (const data of researchData) {
    console.log(`Updating ${data.name} (${data.id})...`);
    
    // Add note to notes collection
    const noteRef = db.collection('notes').doc();
    batch.set(noteRef, {
      leadId: data.id,
      content: data.note,
      status: data.status,
      createdBy: 'Skel (batch research)',
      createdAt: now,
      updatedAt: now
    });
    
    // Update lead status and any new data
    const leadUpdate = {
      status: 'researched',
      'pipeline.stageId': 'researched',
      updatedAt: now
    };
    if (data.website) leadUpdate.website = data.website;
    if (data.email) leadUpdate.email = data.email;
    
    const leadRef = db.collection('leads').doc(data.id);
    batch.update(leadRef, leadUpdate);
  }
  
  await batch.commit();
  console.log('Batch committed successfully');
  
  // Update state file
  const stateFile = join(__dirname, 'batch-research-state.json');
  const state = JSON.parse(readFileSync(stateFile, 'utf8'));
  
  const newIds = researchData.map(d => d.id);
  state.completedIds.push(...newIds);
  state.lastRunAt = new Date().toISOString();
  state.stats.researched += researchData.length;
  
  writeFileSync(stateFile, JSON.stringify(state, null, 2));
  console.log(`State updated. Total researched: ${state.stats.researched}`);
}

updateLeads().then(() => {
  console.log('Done!');
  process.exit(0);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
