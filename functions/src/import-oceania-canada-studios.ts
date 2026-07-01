import * as admin from 'firebase-admin';
import * as path from 'path';

// Initialize Firebase Admin
const serviceAccountPath = path.resolve(__dirname, '../../service-account.json');
process.env.GOOGLE_APPLICATION_CREDENTIALS = serviceAccountPath;

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();

const STUDIO_PIPELINE_ID = 'Yo2OlGZdFFMWkFTr0n08';

interface Lead {
  name: string;
  company: string;
  email: string;
  website: string;
  status: string;
  source: string;
  notes: string;
  country: string;
  region: string;
  tags: string[];
  fit: number;
  pipelineId: string;
  pipeline: {
    id: string;
    stageId: string;
    enteredAt: admin.firestore.Timestamp;
  };
  createdAt: admin.firestore.Timestamp;
  updatedAt: admin.firestore.Timestamp;
}

const oceaniaCanadaStudios: Partial<Lead>[] = [
  // AUSTRALIA
  {
    company: 'Summerfall Studios',
    website: 'https://www.summerfallstudios.com',
    notes: `Australian narrative studio with BioWare veteran leadership.

**Location:** Melbourne, Australia
**Creative Director:** David Gaider (former Dragon Age lead writer!)

**Mission:** "Creators of narrative-led, character-driven games"

**Games:**
- Stray Gods: The Roleplaying Musical — Grammy and BAFTA nominated!
  - Branching narrative + branching music/lyrics
  - Player choices affect melodies, lyrics, and music styles
  - Inspired by Buffy "Once More, With Feeling"

**Why ULTIMATE FIT for LoreWeaver:**
- David Gaider = Dragon Age narrative legend
- "Narrative-led, character-driven" explicit mission
- Grammy + BAFTA nominated
- Branching everything (story, music, lyrics)
- Perfect alignment with Director's vision

**Fit Score: 98** — Dragon Age writer + branching musical narrative`,
    country: 'Australia',
    region: 'Oceania',
    tags: ['narrative', 'musical', 'branching', 'bioware-alumni', 'bafta', 'grammy', 'melbourne'],
    fit: 98,
  },
  {
    company: 'Team Cherry',
    website: 'https://www.teamcherry.com.au',
    notes: `Australian indie studio behind Hollow Knight phenomenon.

**Location:** Adelaide, South Australia
**Size:** 3 people (Ari Gibson, William Pellen, Jack Vine)

**Games:**
- Hollow Knight — 4+ million copies, metroidvania masterpiece
- Hollow Knight: Silksong — Highly anticipated sequel

**Why Consider:**
- Massive cultural impact
- Environmental storytelling expertise
- "Beautiful hand-drawn art and tight gameplay"
- Atmospheric narrative

**Fit Score: 78** — Environmental storytelling, less dialogue`,
    country: 'Australia',
    region: 'Oceania',
    tags: ['indie', 'metroidvania', 'hollow-knight', 'adelaide', 'environmental'],
    fit: 78,
  },
  {
    company: 'House House',
    website: 'https://househou.se',
    notes: `Australian studio behind viral Untitled Goose Game.

**Location:** Melbourne, Australia

**Games:**
- Untitled Goose Game — Cultural phenomenon, award-winning
- Push Me Pull You

**Why Consider:**
- Viral success
- Unique design philosophy
- Film Victoria funded

**Fit Score: 70** — Comedy/puzzle focus`,
    country: 'Australia',
    region: 'Oceania',
    tags: ['indie', 'comedy', 'viral', 'melbourne', 'puzzle'],
    fit: 70,
  },
  {
    company: 'Witch Beam',
    website: 'https://witchbeam.com.au',
    notes: `Australian studio known for emotionally resonant games.

**Location:** Brisbane, Australia

**Games:**
- Unpacking — Zen puzzle game with environmental storytelling
- Assault Android Cactus

**Why Consider:**
- Unpacking = narrative through objects
- Environmental storytelling masters
- Award-winning

**Fit Score: 75** — Environmental narrative`,
    country: 'Australia',
    region: 'Oceania',
    tags: ['indie', 'unpacking', 'environmental', 'brisbane', 'zen'],
    fit: 75,
  },
  {
    company: 'League of Geeks',
    website: 'https://www.leagueofgeeks.com',
    notes: `Australian studio known for digital board games with narrative.

**Location:** Melbourne, Australia

**Games:**
- Armello — Digital board game with procedural stories
- Solium Infernum

**Why Consider:**
- Procedural narrative in board game format
- Strategy + story blend

**Fit Score: 72** — Procedural narrative`,
    country: 'Australia',
    region: 'Oceania',
    tags: ['indie', 'board-game', 'procedural', 'melbourne', 'strategy'],
    fit: 72,
  },
  {
    company: 'Massive Monster',
    website: 'https://massivemonster.co',
    notes: `Australian studio behind Cult of the Lamb.

**Location:** Melbourne, Australia

**Games:**
- Cult of the Lamb — Roguelike cult sim, 3M+ sales
- The Adventure Pals

**Why Consider:**
- Massive commercial success
- Dark humor narrative
- Cult management = character relationships

**Fit Score: 72** — Roguelike focus`,
    country: 'Australia',
    region: 'Oceania',
    tags: ['indie', 'roguelike', 'cult-of-lamb', 'melbourne', 'viral'],
    fit: 72,
  },
  {
    company: 'Robot Circus',
    website: 'https://robotcircus.com.au',
    notes: `Australian indie studio blending narrative with gameplay.

**Location:** Melbourne, Australia

**Focus:** "Narrative-driven experiences with well-crafted gameplay"

**Games:**
- Machinarium (mobile port)
- Original narrative projects

**Why Perfect for LoreWeaver:**
- "Narrative-driven experiences" explicit
- Visually stunning games

**Fit Score: 80** — Narrative-driven indie`,
    country: 'Australia',
    region: 'Oceania',
    tags: ['indie', 'narrative', 'mobile', 'melbourne'],
    fit: 80,
  },
  // NEW ZEALAND
  {
    company: 'Scarlet City Studios',
    website: 'https://www.scarletcitystudios.com',
    notes: `New Zealand indie studio with alternative storytelling focus.

**Location:** Auckland, New Zealand

**Byline:** "Telling an alternative story"

**Why Consider:**
- Alternative storytelling focus
- Auckland-based
- Innovative approach

**Fit Score: 75** — Alternative narrative focus`,
    country: 'New Zealand',
    region: 'Oceania',
    tags: ['indie', 'narrative', 'auckland', 'alternative'],
    fit: 75,
  },
  {
    company: 'RocketWerkz',
    website: 'https://rocketwerkz.com',
    notes: `New Zealand studio founded by DayZ creator.

**Location:** Auckland, New Zealand
**Founder:** Dean Hall (DayZ creator)

**Games:**
- Icarus — Survival game
- Stationeers

**Why Consider:**
- Emergent narrative through survival
- AAA ambitions
- Independent

**Fit Score: 65** — Survival focus`,
    country: 'New Zealand',
    region: 'Oceania',
    tags: ['indie', 'survival', 'auckland', 'dayz'],
    fit: 65,
  },
  // CANADA
  {
    company: 'BioWare',
    website: 'https://www.bioware.com',
    notes: `Legendary Canadian RPG studio — THE narrative game pioneers.

**Location:** Edmonton, Alberta
**Founded:** 1995
**Owner:** EA

**Games:**
- Mass Effect trilogy + Andromeda
- Dragon Age series (Origins, II, Inquisition, Veilguard)
- Star Wars: Knights of the Old Republic
- Baldur's Gate 1 & 2

**Why LEGENDARY:**
- "Pioneered branching narratives and player-driven choice systems"
- "Storytelling Maestros"
- "Rich narratives and unforgettable characters"
- Literally defined modern narrative RPGs

**Fit Score: 85** — THE narrative RPG pioneers (but AAA/EA)`,
    country: 'Canada',
    region: 'North America',
    tags: ['aaa', 'rpg', 'dragon-age', 'mass-effect', 'edmonton', 'ea', 'legendary'],
    fit: 85,
  },
  {
    company: 'Sunset Visitor',
    website: 'https://sunsetvisitor.com',
    notes: `Canadian studio that made one of 2024's best narrative games.

**Location:** Vancouver, BC
**Publisher:** Fellow Traveller

**Games:**
- 1000xResist — PEABODY AWARD WINNER
  - "Narrative-based adventure with environmental exploration and conversational choices"
  - "Time and memory are core game mechanics"
  - Asian-Canadian creators team
  - Compared to Nier: Automata impact
  - "Experimental and innovative storytelling"

**Why ULTIMATE FIT for LoreWeaver:**
- Peabody Award for storytelling excellence
- "Narrative-based adventure"
- "Conversational choices"
- IGF nominations
- First-time studio = perfect early Architect adopter

**Fit Score: 95** — Peabody-winning narrative adventure`,
    country: 'Canada',
    region: 'North America',
    tags: ['narrative', 'adventure', 'peabody', 'vancouver', 'experimental', 'asian-canadian'],
    fit: 95,
  },
  {
    company: 'Artifact 5',
    website: 'https://artifact5.com',
    notes: `Canadian boutique studio focused on emotional storytelling.

**Location:** Canada

**Focus:** "Surreal and emotionally driven games" + "New modes of storytelling through mechanics"

**Why PERFECT for LoreWeaver:**
- "Emotionally driven games"
- "New modes of storytelling through mechanics"
- Boutique = perfect Architect customer

**Fit Score: 85** — Emotional narrative innovation`,
    country: 'Canada',
    region: 'North America',
    tags: ['indie', 'narrative', 'emotional', 'experimental', 'boutique'],
    fit: 85,
  },
  {
    company: 'Auldman',
    website: '',
    notes: `Canadian indie studio making narrative RPGs.

**Location:** Calgary, Alberta

**Games:**
- Sovereign Syndicate — Steampunk RPG, Victorian themes

**Why Consider:**
- Narrative RPG focus
- Fresh take on steampunk
- Canadian indie

**Fit Score: 78** — Steampunk narrative RPG`,
    country: 'Canada',
    region: 'North America',
    tags: ['indie', 'rpg', 'steampunk', 'calgary', 'victorian'],
    fit: 78,
  },
  {
    company: 'Compulsion Games',
    website: 'https://compulsiongames.com',
    notes: `Canadian studio known for dystopian narrative games.

**Location:** Montreal, Quebec
**Owner:** Xbox Game Studios

**Games:**
- We Happy Few — Dystopian survival adventure
- Contrast — Puzzle platformer with noir narrative
- South of Midnight (upcoming)

**Why Perfect for LoreWeaver:**
- Narrative-heavy dystopian worlds
- Strong atmosphere + story
- Xbox backing

**Fit Score: 82** — Dystopian narrative specialists`,
    country: 'Canada',
    region: 'North America',
    tags: ['narrative', 'dystopian', 'montreal', 'xbox', 'adventure'],
    fit: 82,
  },
  {
    company: 'Red Barrels',
    website: 'https://redbarrelsgames.com',
    notes: `Canadian horror studio with narrative focus.

**Location:** Montreal, Quebec
**Founded by:** Ubisoft/EA veterans

**Games:**
- Outlast series — Horror with found-footage narrative

**Why Consider:**
- Horror narrative specialists
- Environmental storytelling
- AAA veterans

**Fit Score: 75** — Horror narrative`,
    country: 'Canada',
    region: 'North America',
    tags: ['horror', 'narrative', 'montreal', 'outlast', 'indie'],
    fit: 75,
  },
];

async function importStudios() {
  console.log(`\n🇦🇺🇳🇿🇨🇦 Importing ${oceaniaCanadaStudios.length} Oceania + Canada studios...\n`);
  
  const now = admin.firestore.Timestamp.now();
  let imported = 0;
  let skipped = 0;
  
  for (const studio of oceaniaCanadaStudios) {
    const existing = await db.collection('leads')
      .where('company', '==', studio.company)
      .where('pipelineId', '==', STUDIO_PIPELINE_ID)
      .get();
    
    if (!existing.empty) {
      console.log(`⏭️  Skipping ${studio.company} (already exists)`);
      skipped++;
      continue;
    }
    
    const lead: Lead = {
      name: studio.name || '',
      company: studio.company!,
      email: studio.email || '',
      website: studio.website || '',
      status: 'new',
      source: 'research',
      notes: studio.notes || '',
      country: studio.country!,
      region: studio.region!,
      tags: studio.tags || [],
      fit: studio.fit || 50,
      pipelineId: STUDIO_PIPELINE_ID,
      pipeline: {
        id: STUDIO_PIPELINE_ID,
        stageId: 'new',
        enteredAt: now,
      },
      createdAt: now,
      updatedAt: now,
    };
    
    const docRef = await db.collection('leads').add(lead);
    console.log(`✅ Added ${studio.company} (${studio.country}) — Fit: ${studio.fit} — ID: ${docRef.id}`);
    imported++;
  }
  
  console.log(`\n📊 Summary: ${imported} imported, ${skipped} skipped`);
  console.log('🇦🇺🇳🇿🇨🇦 Oceania + Canada import complete!\n');
}

importStudios()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
