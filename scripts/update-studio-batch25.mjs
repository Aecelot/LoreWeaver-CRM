// Update batch 25 studio leads with research findings
// Offset 80, limit 10 — Director ICP scoring
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
  // Inkle (primary) - Already researched, just add tag
  {
    id: 'LeP0y84H39uzAJL24dwo',
    data: {
      tags: ['uk', 'indie', 'narrative', 'ink-creator', 'partnership-potential', 'architect-icp', 'researched', 'director-icp'],
      icpScore: 40,
      'studio.fitScore': 40,
      'studio.fitReason': 'Ink creators. Partnership potential for ink+Director integration, but they are skeptical of AI narrative generation. Not direct customers but potential partners.',
      status: 'active'
    }
  },
  // Inkle (US presence) - DUPLICATE, mark for merge
  {
    id: 'mIZenqopExAuzP44YSfR',
    data: {
      tags: ['usa', 'indie', 'narrative', 'interactive-fiction', 'architect-icp', 'duplicate'],
      notes: `DUPLICATE ENTRY — Merge with primary Inkle record (LeP0y84H39uzAJL24dwo).
This appears to be a duplicate for US presence tracking.`,
      icpScore: 0,
      status: 'inactive'
    }
  },
  // Inkle Studios - DUPLICATE, mark for merge
  {
    id: 'z6CrmxeITgJhUAQmGhzk',
    data: {
      tags: ['narrative', 'interactive-fiction', 'architect-icp', 'duplicate'],
      notes: `DUPLICATE ENTRY — Merge with primary Inkle record (LeP0y84H39uzAJL24dwo).
Same company: Inkle Studios = Inkle.`,
      icpScore: 0,
      status: 'inactive'
    }
  },
  // Insomniac Games
  {
    id: 'c7QNHaiiXXDaTdlwWXGG',
    data: {
      website: 'https://insomniac.games',
      country: 'USA',
      location: 'Burbank, California, USA',
      tags: ['usa', 'aaa', 'action', 'open-world', 'sony', 'enterprise', 'not-a-fit', 'researched'],
      notes: `RESEARCH COMPLETE (2026-03-03)

== COMPANY ==
Name: Insomniac Games
Founded: 1994
HQ: Burbank, California, USA
Owner: Sony Interactive Entertainment (acquired 2019)
Size: 350+ employees (AAA scale)
CEO: Ted Price (retiring March 2025)

== GAMES ==
Marvel's Spider-Man series (2018, 2020, 2023)
Marvel's Wolverine (in development, reveal Spring 2026)
Ratchet & Clank series
Resistance series
Sunset Overdrive

== UPCOMING ==
Marvel's Wolverine (expected late 2026+)
Spider-Man 3, X-Men, Venom games in pipeline

== FIT ==
Director ICP: 15/100
NOT A PRIORITY — AAA Sony first-party studio.
- Too large for indie Director pitch
- Enterprise sales cycle through Sony procurement
- Strong internal narrative teams
- May have concerns about AI (SAG-AFTRA strike 2024)

STATUS: REFERENCE ACCOUNT
Track for industry trends but don't pursue actively.

Source: Wikipedia, insomniac.games`,
      'studio.fitScore': 15,
      'studio.fitReason': 'Sony AAA first-party. Too large, enterprise procurement. Reference account only.',
      icpScore: 15,
      status: 'active'
    }
  },
  // inXile Entertainment
  {
    id: 'f5G5ZIKr80OwjggQwD2D',
    data: {
      website: 'https://inxile-entertainment.com',
      country: 'USA',
      location: 'Newport Beach, CA + New Orleans, LA, USA',
      tags: ['usa', 'aa', 'rpg', 'narrative', 'microsoft', 'xbox', 'enterprise', 'director-icp', 'researched'],
      notes: `RESEARCH COMPLETE (2026-03-03)

== COMPANY ==
Name: inXile Entertainment
Founded: 2002 by Brian Fargo
HQ: Newport Beach, CA + New Orleans, LA
Owner: Microsoft/Xbox Game Studios (acquired 2018)
Size: ~110 employees

== KEY PEOPLE ==
Brian Fargo — Founder (Interplay founder, created Wasteland, exec-produced Fallout)
Chad Moore — Game Director (Clockwork Revolution)
Jason D. Anderson — Principal Designer (co-created Fallout at Interplay)

== GAMES ==
Wasteland 2 (2014) — Kickstarted revival of post-apocalyptic RPG
Wasteland 3 (2020) — Co-op tactical RPG
Torment: Tides of Numenera (2017) — Narrative-heavy RPG
The Bard's Tale IV (2018)
Clockwork Revolution (in development) — First AAA title, steampunk RPG

== FIT ==
Director ICP: 70/100
GOOD FIT — Narrative-heavy RPG studio with strong dialogue tradition.
+ Wasteland, Torment = proven narrative expertise
+ Clockwork Revolution in active development = timing opportunity
+ ~110 people = manageable team size
- Microsoft ownership = enterprise sales cycle
- Xbox Game Studios procurement process
- May have internal AI strategy from Microsoft

STATUS: QUALIFIED LEAD (Enterprise)
Strong RPG narrative fit. Needs enterprise approach through Xbox.

Source: Wikipedia, inxile-entertainment.com, Pure Xbox`,
      'studio.fitScore': 70,
      'studio.fitReason': 'Brian Fargo\'s narrative RPG studio. Wasteland/Torment heritage. Clockwork Revolution in dev. Microsoft-owned = enterprise sale.',
      icpScore: 70,
      status: 'active',
      category: 'lead'
    }
  },
  // IO Interactive
  {
    id: 'qhsh2ZltOsNwvg7RRL2b',
    data: {
      website: 'https://www.ioi.dk',
      country: 'Denmark',
      location: 'Copenhagen, Denmark (+ Barcelona, Malmö, Istanbul)',
      tags: ['denmark', 'aaa', 'stealth', 'action', '007', 'independent', 'enterprise', 'researched'],
      notes: `RESEARCH COMPLETE (2026-03-03)

== COMPANY ==
Name: IO Interactive
Founded: 1998
HQ: Copenhagen, Denmark
Status: INDEPENDENT (self-owned since 2017)
Size: 400+ employees (AAA scale)
CEO: Hakan Abrak
Offices: Copenhagen, Barcelona, Malmö, Istanbul

== GAMES ==
Hitman series (World of Assassination trilogy 2016-2021)
007 First Light (releasing May 2026) — James Bond origin story
Project Dragon (in development with Xbox Game Studios) — Fantasy RPG

== FIT ==
Director ICP: 30/100
ENTERPRISE REFERENCE — Large independent AAA studio.
+ Hitman = emergent gameplay, could benefit from dynamic NPC dialogue
+ 007 First Light = spy narrative, Bond conversations
+ Independent = no platform holder in sales chain
- 400+ employees = enterprise procurement
- Internal tools likely mature
- Two major titles in development = resource-constrained

STATUS: ENTERPRISE REFERENCE
Track for industry intel. May approach after Director proves at smaller scale.

Source: ioi.dk, Wikipedia, GamesRadar`,
      'studio.fitScore': 30,
      'studio.fitReason': 'Large independent AAA. Hitman & 007 = stealth/spy narrative. Too large for initial outreach but enterprise potential.',
      icpScore: 30,
      status: 'active'
    }
  },
  // Iron Galaxy Studios
  {
    id: '1zpwnCepB7RoOoYd09Ts',
    data: {
      website: 'https://irongalaxystudios.com',
      country: 'USA',
      location: 'Chicago, Orlando, Nashville, Austin, USA',
      tags: ['usa', 'aa', 'ports', 'co-dev', 'work-for-hire', 'not-a-fit', 'researched'],
      notes: `RESEARCH COMPLETE (2026-03-03)

== COMPANY ==
Name: Iron Galaxy Studios
Founded: 2008
HQ: Chicago, IL (+ Orlando, Nashville, Austin)
Focus: Co-development & Porting services

== BUSINESS MODEL ==
Work-for-hire studio. They support other studios:
- Console ports (Switch, PC, etc.)
- Co-development on existing franchises
- Post-launch support

== GAMES (as co-dev/port)
Killer Instinct (Xbox)
Skyrim Anniversary Edition (PS5/XSX port)
Diablo III console port
Uncharted: Legacy of Thieves Collection (PC port)
Many others as support studio

== FIT ==
Director ICP: 0/100
NOT A FIT — This is a porting/co-dev studio, not original IP developers.
They don't make games with narrative; they port/support others' games.
Decision-makers are their clients, not Iron Galaxy.

STATUS: INACTIVE
Do not pursue — wrong business model (work-for-hire, not IP creators).

Source: irongalaxystudios.com, MobyGames`,
      'studio.fitScore': 0,
      'studio.fitReason': 'Porting/co-dev work-for-hire studio. No original IP or narrative needs.',
      icpScore: 0,
      status: 'inactive'
    }
  },
  // Ishtar Games
  {
    id: 'd6PZpj8ESs7ClhpKBfob',
    data: {
      website: 'https://ishtar.games',
      country: 'France',
      location: 'Lille + Bordeaux, France',
      tags: ['france', 'indie', 'rpg', 'strategy', 'management', 'tactical', 'architect-icp', 'researched'],
      notes: `RESEARCH COMPLETE (2026-03-03)

== COMPANY ==
Name: Ishtar Games (formerly CCCP)
HQ: Lille + Bordeaux, France
Type: Indie studio + publisher
Philosophy: "Built, run and founded by players"

== GAMES ==
Dead in Bermuda (2015) — Survival management RPG
Dead in Vinland (2018) — Viking survival RPG
The Last Spell (2023) — Tactical RPG/tower defense (hit game)
Lakeburg Legacies (2023) — Village management
Dead in Antares (2025) — Sci-fi survival management

PUBLISHING:
Spirited Thief, Forgotten Mines, Worlds of Aria

== STYLE ==
Complex games mixing genres with RPG elements
Survival + management + narrative
Turn-based tactical combat

== FIT ==
Director ICP: 45/100
MODERATE FIT — RPG elements but primarily management/tactical games.
+ RPG character dialogue in games
+ Active development (Dead in Antares recent)
+ Indie scale = accessible decision makers
- Core loop is management, not conversation-heavy
- Tactical combat focus over NPC interaction
- French = may prefer French-language support

Architect ICP: 55/100
Better for narrative authoring than runtime NPC dialogue.

STATUS: PROSPECT
Worth exploring but not priority. Better Architect fit than Director.

Source: ishtar.games, Steam`,
      'studio.fitScore': 45,
      'studio.fitReason': 'French indie. RPG/management hybrid games. Narrative present but not core. Better Architect fit.',
      icpScore: 45,
      status: 'active'
    }
  },
  // Jo-Mei Games
  {
    id: 'n1tpvpXOw1m6T5ZNnnoE',
    data: {
      website: 'https://jo-mei.com',
      country: 'Germany',
      location: 'Berlin, Germany',
      tags: ['germany', 'indie', 'narrative', 'emotional', 'art-games', 'ea-originals', 'director-icp', 'researched'],
      notes: `RESEARCH COMPLETE (2026-03-03)

== COMPANY ==
Name: Jo-Mei Games GmbH
Founded: 2009
HQ: Berlin, Germany
Founders: Cornelia Geppert, Boris Munser
Size: ~12 people

== KEY PEOPLE ==
Cornelia Geppert — Creative Director, Co-founder
Boris Munser — Co-founder

== HISTORY ==
2009: Founded
2011: KOYOTL (browser dungeon crawler)
2013: Brave Little Beasties (browser game)
2016-2019: Sea of Solitude development (EA Originals)
2021: Sea of Solitude: Director's Cut (Switch, with Quantic Dream)
2023+: "Project Ocean" in full production

== GAMES ==
Sea of Solitude (2019) — Emotional narrative about loneliness/mental health
  Published by EA Originals
  Switch version published by Quantic Dream
Project Ocean (in development) — Government funded

== STYLE ==
Art games about emotional themes
Mental health, loneliness, relationships
Small team, personal stories

== FIT ==
Director ICP: 65/100
GOOD FIT — Narrative-focused emotional games.
+ Strong narrative focus (Sea of Solitude)
+ Small team = accessible decision makers
+ Currently in production on new title
+ EA/Quantic Dream relationships = proven partners
- Very personal/artistic approach may resist AI
- Small scope = limited NPC population
- German funding = may have specific tool requirements

STATUS: QUALIFIED LEAD
Emotional narrative indie. Worth outreach for Project Ocean.
Pitch: AI-enhanced emotional responses in NPCs.

Source: jo-mei.com, Wikipedia, EA`,
      'studio.fitScore': 65,
      'studio.fitReason': 'Berlin emotional narrative studio. Sea of Solitude acclaim. Project Ocean in development. Good narrative fit.',
      icpScore: 65,
      status: 'active',
      category: 'lead'
    }
  },
  // Jump Over The Age
  {
    id: 'Q8OoTniQmBg6BCAQvUHt',
    data: {
      website: 'https://jumpovertheage.com',
      country: 'USA',
      location: 'USA',
      tags: ['usa', 'indie', 'narrative', 'jrpg', 'time-loop', 'lgbtq', 'solo-dev', 'architect-icp', 'researched'],
      notes: `RESEARCH COMPLETE (2026-03-03)

== COMPANY ==
Name: Jump Over The Age
Type: Solo developer (Mia Marcelle / insertdisc5)
Location: USA

== KEY PERSON ==
Mia Marcelle — Solo developer, artist, writer

== GAMES ==
START AGAIN: a prologue (2022) — Free prologue
In Stars and Time (2023) — Time-loop turn-based RPG
  Overwhelmingly Positive reviews on Steam
  Emotional narrative about burden of time loops
  Won multiple awards, compared favorably to Undertale

== STYLE ==
Deeply personal narrative games
Time-loop mechanics with emotional weight
LGBTQ+ themes and representation
Solo development = limited scope but high quality

== FIT ==
Director ICP: 35/100
LOWER FIT — Solo developer, likely won't integrate complex middleware.
+ Exceptional narrative quality
+ Time-loop = interesting dynamic dialogue potential
- Solo dev = no team to implement integration
- Likely prefers full creative control
- Very personal artistic vision

Architect ICP: 50/100
May benefit from authoring tools but probably prefers own workflow.

STATUS: PROSPECT (MONITOR)
Talented narrative creator but solo scale limits integration potential.
Track for potential partnerships or if they expand team.

Source: Steam, Reddit`,
      'studio.fitScore': 35,
      'studio.fitReason': 'Solo dev behind acclaimed In Stars and Time. Exceptional narrative but solo scale limits middleware integration potential.',
      icpScore: 35,
      status: 'active'
    }
  }
];

async function updateBatch25() {
  console.log('Updating batch 25 studio leads...\n');
  
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
      
      // Handle nested studio object for fitScore/fitReason
      if (update.data['studio.fitScore'] !== undefined) {
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
  
  console.log('\n=== BATCH 25 SUMMARY ===');
  console.log('Total leads processed: 10');
  console.log('');
  console.log('QUALIFIED LEADS (ICP >= 65):');
  console.log('  - inXile Entertainment (70) — Narrative RPG, Microsoft-owned');
  console.log('  - Jo-Mei Games (65) — Emotional narrative indie');
  console.log('');
  console.log('PROSPECTS (ICP 35-64):');
  console.log('  - Ishtar Games (45) — French RPG/management');
  console.log('  - Inkle (40) — Partnership potential, not direct customer');
  console.log('  - Jump Over The Age (35) — Solo dev, monitor');
  console.log('  - IO Interactive (30) — AAA enterprise reference');
  console.log('');
  console.log('NOT A FIT / INACTIVE:');
  console.log('  - Insomniac Games (15) — Sony AAA, reference only');
  console.log('  - Iron Galaxy Studios (0) — Porting/co-dev, no original IP');
  console.log('  - Inkle US (0) — Duplicate, merge with primary');
  console.log('  - Inkle Studios (0) — Duplicate, merge with primary');
}

updateBatch25().then(() => {
  console.log('\nDone!');
  process.exit(0);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
