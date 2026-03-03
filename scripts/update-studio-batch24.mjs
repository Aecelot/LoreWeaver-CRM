// Update batch 24 studio leads with research findings
// Offset 70, limit 10 — Director ICP scoring
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

const updates = [
  {
    id: '03ta99ggGtdFEHHMqh3l', // GihOt
    data: {
      website: 'https://gihot.vn',
      country: 'Vietnam',
      location: 'Ho Chi Minh City, Vietnam',
      tags: ['vietnam', 'indie', 'mobile', 'mmorpg', 'director-icp', 'researched'],
      notes: `RESEARCH COMPLETE (2026-03-03)

== COMPANY ==
Name: GihOt (part of GOSUVERSE)
Founded: Pioneer Vietnamese studio
HQ: Ho Chi Minh City, Vietnam
Focus: Mobile MMORPGs and online games
Employees: ~7,000 followers on Facebook

== GAMES ==
Mobile MMORPGs and online games for mobile platform
Focused on bringing Vietnamese games to global stage

== FIT ==
Director ICP: 55/100
- MMORPG focus = good for NPC dialogue
- Mobile platform = might need lightweight solutions
- Regional studio = less budget than Western studios
- Vietnamese market focus = may have localization needs

STATUS: PROSPECT
Worth outreach for mobile MMORPG narrative needs.

Source: gihot.vn, LinkedIn`,
      'studio.fitScore': 55,
      'studio.fitReason': 'Vietnam mobile MMORPG studio. Good fit for NPC dialogue in MMO games. Mobile focus may need lightweight inference.',
      icpScore: 55,
      status: 'active'
    }
  },
  {
    id: 'Q77bW04AeuPzXIqFGLUW', // Glass Egg
    data: {
      website: 'https://www.glassegg.com',
      country: 'Vietnam',
      location: 'Ho Chi Minh City, Vietnam',
      tags: ['vietnam', 'aa', 'art-outsource', 'virtuos', 'not-a-fit'],
      notes: `RESEARCH COMPLETE (2026-03-03)

== COMPANY ==
Name: Glass Egg (a Virtuos Studio)
Founded: 1999
HQ: Ho Chi Minh City, Vietnam (also Dalat)
Parent: Virtuos (largest external game developer)
Focus: Art outsourcing (2D/3D)

== SERVICES ==
- Art outsourcing for AAA studios
- Worked on: Need for Speed Unbound, Apex Legends, Demon's Souls Remake
- NOT a game developer — art services only

== FIT ==
Director ICP: 0/100
NOT A FIT — This is an art outsource studio, not a game developer.
They don't create games with narrative, only provide art services.

STATUS: INACTIVE
Do not pursue — wrong company type.

Source: glassegg.com, virtuosgames.com`,
      'studio.fitScore': 0,
      'studio.fitReason': 'Art outsource studio, not a game developer. No narrative needs.',
      icpScore: 0,
      status: 'inactive'
    }
  },
  {
    id: 'OOWpM326xAnYXrWUSz0r', // Gravity Co.
    data: {
      website: 'https://www.gravity.co.kr',
      country: 'South Korea',
      location: 'Mapo, Seoul, South Korea',
      tags: ['south-korea', 'aa', 'mmorpg', 'ragnarok', 'public', 'director-icp', 'researched'],
      notes: `RESEARCH COMPLETE (2026-03-03)

== COMPANY ==
Name: Gravity Co., Ltd.
Founded: ~2000
HQ: Seoul, South Korea
Stock: NASDAQ: GRVY (public company)
CEO: Hyun Chul Park
Users: 120M+ worldwide (Ragnarok franchise)

== KEY FRANCHISE ==
Ragnarok Online — iconic MMORPG
- Ragnarok Online (original)
- Ragnarok Zero
- Ragnarok M (mobile)
- Ragnarok Origin
- Ragnarok X: Next Generation
- Multiple mobile spin-offs

== SCALE ==
Large publisher/developer with global presence
Subsidiaries: Gravity Game Hub (Asia operations)
Markets: Korea, Taiwan, Thailand, Japan, SEA

== FIT ==
Director ICP: 75/100
- MMORPG = perfect for dynamic NPC dialogue
- Scale = budget for enterprise solutions
- Multiple active titles = cross-game potential
- Public company = longer sales cycle, procurement process
- Korean HQ = may need Korean localization/support

STATUS: QUALIFIED LEAD
Large MMORPG publisher. Director fits well for NPC dialogue in MMO games.
Enterprise sale — needs senior contact and localized approach.

Source: gravity.co.kr, Wikipedia, Crunchbase`,
      'studio.fitScore': 75,
      'studio.fitReason': 'Large Korean MMORPG publisher. Ragnarok franchise with 120M+ users. Director fits well for dynamic NPC dialogue in MMO games.',
      icpScore: 75,
      status: 'active',
      category: 'lead'
    }
  },
  {
    id: 'UxBptYu5boi0nuhWJNPa', // Grendel Games
    data: {
      website: 'https://grendelgames.com',
      country: 'Netherlands',
      location: 'Groningen, Netherlands',
      tags: ['netherlands', 'indie', 'serious-games', 'medical', 'healthcare', 'not-a-fit'],
      notes: `RESEARCH COMPLETE (2026-03-03)

== COMPANY ==
Name: Grendel Games
HQ: Groningen, Netherlands
Focus: Serious games for healthcare and training
Spinoff: Grendel Medical (surgical training)

== PRODUCTS ==
- Laptitude: laparoscopic surgery training
- Underground: surgical trainee education
- Garfield: childhood obesity
- Gryphon Rider: rehabilitation exercises
- Wijk & Water Battle: water consumption

== FIT ==
Director ICP: 0/100
NOT A FIT — Serious games / medical training company.
They don't make entertainment games with narrative NPCs.
Different market entirely (healthcare, education).

STATUS: INACTIVE
Do not pursue — wrong industry (healthcare/training, not entertainment).

Source: grendelgames.com, grendelmedical.com`,
      'studio.fitScore': 0,
      'studio.fitReason': 'Serious games company for healthcare training. Not entertainment gaming.',
      icpScore: 0,
      status: 'inactive'
    }
  },
  // Guerrilla Games - SKIP, already researched
  {
    id: 'Z7V7qYY8jROQzBOVH8uR', // Happy Volcano
    data: {
      website: 'https://www.happyvolcano.com',
      country: 'Belgium',
      location: 'Belgium',
      tags: ['belgium', 'indie', 'narrative', 'puzzle', 'architect-icp', 'researched'],
      notes: `RESEARCH COMPLETE (2026-03-03)

== COMPANY ==
Name: Happy Volcano
Founded: 2015
HQ: Belgium (international team to Philippines)
Funding: Hiro Capital, Sir Ian Livingstone
Team: ~12 people

== KEY PEOPLE ==
Jeroen Janssen — CEO, Founder
David Prinsmel — Game Director, Founder
Peter Maasen — Technical Director, Founder
Jarvs Tasker — Head of Communications

== GAMES ==
The Almost Gone (2020) — Narrative puzzle about death, loss, mental health. Award-winning.
You Suck at Parking — Racing game where goal is to stop
Modulus (2026) — Factory building puzzle game

== VALUES ==
No-crunch policy
Award-winning indie focus

== FIT ==
Director ICP: 45/100
- The Almost Gone shows narrative capability
- But puzzle games = less need for dynamic NPC dialogue
- Current games (YSAP, Modulus) are not narrative-driven
- Better fit for Architect (narrative design tool) than Director

Architect ICP: 65/100
- Narrative puzzle design background
- Could benefit from dialogue authoring tools

STATUS: PROSPECT (ARCHITECT)
Better fit for Architect than Director. Monitor for narrative game announcements.

Source: happyvolcano.com, Steam`,
      'studio.fitScore': 45,
      'studio.fitReason': 'Belgian indie with narrative background (The Almost Gone) but current games are puzzle-focused. Better Architect fit than Director.',
      icpScore: 45,
      status: 'active'
    }
  },
  {
    id: 'wIZeJpe8unYqyI9VjYOG', // Harebrained Schemes
    data: {
      website: 'https://harebrained-schemes.com',
      country: 'USA',
      location: 'Seattle, Washington, USA',
      tags: ['usa', 'indie', 'srpg', 'narrative', 'horror', 'director-icp', 'high-priority', 'researched'],
      notes: `RESEARCH COMPLETE (2026-03-03)

== COMPANY ==
Name: Harebrained Schemes
Founded: 2011
HQ: Seattle, Washington, USA
Status: INDIE AGAIN (left Paradox Jan 2024)
Founders: Jordan Weisman, Mitch Gitelman

== KEY PEOPLE ==
Jordan Weisman — Co-founder, Board Advisor (created BattleTech, Shadowrun, Crimson Skies)
Mitch Gitelman — Co-founder, CEO
Brian Poel — Studio Operations Manager

== GAMES ==
GRAFT (upcoming, 2026+) — Story-driven survival horror RPG on space station. "Narratively rich worlds, compelling characters, impactful choices"
The Lamplighters League (2023) — Turn-based tactics (flopped commercially)
BATTLETECH (2018) — Mech tactics RPG
Shadowrun Trilogy (2013-2015) — Cyberpunk RPG series. Narrative-heavy.

== HISTORY ==
- Founded by FASA legends (BattleTech, Shadowrun creators)
- Acquired by Paradox 2018
- Left Paradox Jan 2024 after Lamplighters League underperformed
- Now independent, working on GRAFT

== FIT ==
Director ICP: 90/100 — EXCELLENT FIT
- "Dense and narratively rich worlds, compelling characters, impactful choices" — PERFECT for Director
- GRAFT is story-driven survival horror RPG — ideal use case
- Shadowrun trilogy = proven narrative expertise
- Independent studio = faster decision making
- GRAFT in development = timing is right for engine integration

OUTREACH PRIORITY: HIGH
Contact Mitch Gitelman (CEO) about Director integration for GRAFT.
Pitch: Emergent NPC dialogue for survival horror RPG.

Source: harebrained-schemes.com, Wikipedia`,
      'studio.fitScore': 90,
      'studio.fitReason': 'EXCELLENT FIT. Narrative SRPG studio. GRAFT in development = perfect timing. "Dense and narratively rich worlds with impactful choices" aligns with Director.',
      icpScore: 90,
      status: 'active',
      category: 'lead'
    }
  },
  {
    id: 'SRoEtQEJ7O7HtP54aUMt', // Harvester Games
    data: {
      website: 'https://harvestergames.net',
      country: 'Poland',
      location: 'Poland',
      tags: ['poland', 'indie', 'horror', 'narrative', 'adventure', 'architect-icp', 'researched'],
      notes: `RESEARCH COMPLETE (2026-03-03)

== COMPANY ==
Name: Harvester Games
Founded: 2009
HQ: Poland
Team: 2 brothers (Remigiusz Michalski + micAmic)
Size: Micro-indie (very small)

== KEY PEOPLE ==
Remigiusz Michalski — Lead developer, creator

== GAMES ==
"Devil Came Through Here" trilogy:
- Downfall (2009, remade 2016)
- The Cat Lady (2012) — Cult classic horror adventure
- Lorelai (2019)
- Burnhouse Lane (2022) — Latest game

== STYLE ==
Horror graphic adventure games
Mature themes: death, loss, mental health
Point-and-click adventure format
Strong narrative focus

== FIT ==
Director ICP: 60/100
- Narrative-heavy adventure games = good for dialogue
- Very small team (2 people) = limited budget
- Adventure game format = traditional dialogue trees may suffice
- Indie horror niche = may not need dynamic NPCs

Architect ICP: 70/100
- Better fit for narrative authoring tools
- Could help with dialogue writing at scale

STATUS: PROSPECT
Small team limits budget. Better fit for Architect than Director.
Monitor for larger projects or partnerships.

Source: harvestergames.net, Steam, Reddit AMA`,
      'studio.fitScore': 60,
      'studio.fitReason': 'Polish horror adventure studio. Strong narrative but very small team (2 brothers). Limited budget. Better Architect fit.',
      icpScore: 60,
      status: 'active'
    }
  }
  // Hazelight Studios (both duplicates) — Already researched, skipping
];

async function updateBatch24() {
  console.log('Updating batch 24 studio leads...\n');
  
  for (const update of updates) {
    try {
      const docRef = db.collection('leads').doc(update.id);
      const doc = await docRef.get();
      
      if (!doc.exists) {
        console.log(`⚠️ Lead not found: ${update.id}`);
        continue;
      }
      
      const currentData = doc.data();
      
      // Merge tags
      const existingTags = currentData.tags || [];
      const newTags = update.data.tags || [];
      const mergedTags = [...new Set([...existingTags, ...newTags])];
      
      // Build update object
      const updateObj = {
        ...update.data,
        tags: mergedTags,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };
      
      // Handle nested studio object
      if (update.data['studio.fitScore'] !== undefined) {
        updateObj['studio.fitScore'] = update.data['studio.fitScore'];
        updateObj['studio.fitReason'] = update.data['studio.fitReason'];
        delete updateObj['studio.fitScore'];
        delete updateObj['studio.fitReason'];
        
        // Need to use dot notation for nested fields
        await docRef.update({
          ...updateObj,
          'studio.fitScore': update.data['studio.fitScore'],
          'studio.fitReason': update.data['studio.fitReason']
        });
      } else {
        await docRef.update(updateObj);
      }
      
      console.log(`✅ Updated: ${currentData.name} (ICP: ${update.data.icpScore})`);
    } catch (err) {
      console.error(`❌ Error updating ${update.id}:`, err.message);
    }
  }
  
  console.log('\n=== SUMMARY ===');
  console.log('Leads updated: ' + updates.length);
  console.log('High ICP (>=85): Harebrained Schemes (90)');
  console.log('Qualified: Gravity Co. (75), Harebrained Schemes (90)');
  console.log('Inactive: Glass Egg (art outsource), Grendel Games (serious games)');
  console.log('Skipped: Guerrilla Games, Hazelight (2x duplicate) - already researched');
}

updateBatch24().then(() => {
  console.log('\nDone!');
  process.exit(0);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
