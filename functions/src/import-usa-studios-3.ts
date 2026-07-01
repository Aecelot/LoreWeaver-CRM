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

const usaStudios3: Partial<Lead>[] = [
  // SOUTH - TEXAS/AUSTIN
  {
    company: 'Archetype Entertainment',
    website: 'https://www.archetype-entertainment.com',
    notes: `BioWare veterans building narrative-first AAA RPG.

**Location:** Austin, Texas
**Founded:** 2019
**Owner:** Wizards of the Coast (Hasbro)
**Founder:** James Ohlen (BioWare Creative Director)

**Team:** Veterans from BioWare, Naughty Dog, 343 Industries, Blizzard

**Mission:** "Epic story-driven roleplaying games"
- "Narrative-first AAA"
- "Large-scale sci-fi RPGs with deep player choice"
- "Cinematic storytelling"

**Games:**
- Exodus — Sci-fi RPG, "consequences of choices over time"

**Why ULTIMATE FIT for LoreWeaver:**
- James Ohlen = Dragon Age, KOTOR, Baldur's Gate, Neverwinter
- "Story-driven RPGs with player at center of epic personal narrative"
- "Impactful choices"
- AAA resources + BioWare DNA

**Fit Score: 98** — BioWare DNA, narrative-first mission`,
    country: 'United States',
    region: 'North America',
    tags: ['rpg', 'narrative', 'bioware-alumni', 'austin', 'wizards', 'aaa', 'exodus'],
    fit: 98,
  },
  {
    company: 'Airship Syndicate',
    website: 'https://airshipsyndicate.com',
    notes: `Comic creator's RPG studio.

**Location:** Austin, Texas
**Founder:** Joe Madureira (comic artist)

**Games:**
- Battle Chasers: Nightwar — JRPG-style
- Darksiders Genesis — Action RPG
- Ruined King: A League of Legends Story — Turn-based narrative RPG

**Why Perfect for LoreWeaver:**
- Story-driven RPGs
- Licensed IP (Riot Games partnership)
- Comic book narrative sensibility

**Fit Score: 82** — Narrative RPG, comic roots`,
    country: 'United States',
    region: 'North America',
    tags: ['rpg', 'jrpg', 'austin', 'darksiders', 'league-of-legends', 'comic'],
    fit: 82,
  },
  // NORTH - PACIFIC NORTHWEST (Seattle/Washington)
  {
    company: 'Sucker Punch Productions',
    website: 'https://www.suckerpunch.com',
    notes: `PlayStation studio known for narrative open-world games.

**Location:** Bellevue, Washington
**Founded:** 1997
**Owner:** Sony Interactive Entertainment

**Games:**
- Sly Cooper series
- inFAMOUS series — Branching moral choices
- Ghost of Tsushima — Historical narrative action
- Ghost of Yotei (upcoming)

**Why Perfect for LoreWeaver:**
- Open-world narrative
- Moral choice systems (inFAMOUS)
- Historical storytelling (Ghost)

**Fit Score: 80** — Open-world narrative, Sony first-party`,
    country: 'United States',
    region: 'North America',
    tags: ['aaa', 'open-world', 'ghost-of-tsushima', 'infamous', 'bellevue', 'sony'],
    fit: 80,
  },
  {
    company: 'tinyBuild',
    website: 'https://www.tinybuild.com',
    notes: `Indie publisher with narrative titles.

**Location:** Bellevue, Washington
**Founded:** 2011

**Published:**
- Hello Neighbor — Stealth horror
- Graveyard Keeper — Narrative sim
- Streets of Rogue
- Potion Craft

**Why Consider:**
- Publishes narrative games
- Strong indie partnerships
- Quirky, innovative titles

**Fit Score: 68** — Publisher`,
    country: 'United States',
    region: 'North America',
    tags: ['publisher', 'indie', 'bellevue', 'hello-neighbor'],
    fit: 68,
  },
  // NORTH - BOSTON/NORTHEAST
  {
    company: 'Ghost Story Games',
    website: 'https://www.ghoststorygames.com',
    notes: `Ken Levine's new studio — BioShock creator.

**Location:** Boston, Massachusetts (Westwood area)
**Founded:** 2017
**Founder:** Ken Levine (BioShock, System Shock 2)
**Owner:** Take-Two Interactive

**Mission:** "Emergent narrative-driven titles"
- "Experimental approach to narrative design"
- "Immersive sim"

**Games:**
- Judas — "Single player narrative-driven game", "narrative FPS"

**Why ULTIMATE FIT for LoreWeaver:**
- Ken Levine = narrative game LEGEND
- BioShock = defined narrative FPS
- "Emergent narrative" focus
- Experimental narrative design

**Fit Score: 95** — Ken Levine, emergent narrative pioneer`,
    country: 'United States',
    region: 'North America',
    tags: ['narrative', 'immersive-sim', 'bioshock', 'boston', 'ken-levine', 'take-two', 'judas'],
    fit: 95,
  },
  {
    company: 'Looking Glass Studios Alumni',
    website: '',
    notes: `Note: Looking Glass closed but alumni spread narrative DNA.

**Legacy:** System Shock, Thief, Ultima Underworld
**Alumni at:**
- Irrational Games → Ghost Story (Ken Levine)
- Ion Storm → Various
- Arkane Studios

**Why Important:**
- Invented immersive sim genre
- Environmental storytelling pioneers
- Emergent narrative

**Historical reference only — not active studio**`,
    country: 'United States',
    region: 'North America',
    tags: ['historical', 'looking-glass', 'immersive-sim'],
    fit: 0, // Skip - historical reference
  },
  // SOUTH - FLORIDA
  {
    company: 'Dinobyte Softworks',
    website: 'https://dinobyte.com',
    notes: `Florida narrative indie studio.

**Location:** Orlando, Florida
**Founded:** 2019

**Focus:** "Narrative-driven games that prioritize emotional storytelling and immersive gameplay"

**Why PERFECT for LoreWeaver:**
- "Narrative-driven" explicit
- "Emotional storytelling" focus
- Small indie = perfect Architect customer

**Fit Score: 85** — Narrative-focused indie`,
    country: 'United States',
    region: 'North America',
    tags: ['narrative', 'indie', 'orlando', 'emotional', 'storytelling'],
    fit: 85,
  },
  {
    company: 'Artix Entertainment',
    website: 'https://www.artix.com',
    notes: `Browser/mobile RPG studio.

**Location:** Tampa area, Florida
**Size:** 30+ developers

**Focus:** "Video games filled with monsters, magic, and amazing stories"

**Games:**
- AdventureQuest series
- DragonFable
- AQWorlds

**Why Consider:**
- "Amazing stories" focus
- Browser RPGs with narrative
- Long-running studio

**Fit Score: 70** — Browser RPG focus`,
    country: 'United States',
    region: 'North America',
    tags: ['rpg', 'browser', 'tampa', 'adventurequest', 'online'],
    fit: 70,
  },
  // MIDWEST
  {
    company: 'Iron Galaxy Studios',
    website: 'https://irongalaxystudios.com',
    notes: `Chicago-based co-development studio.

**Location:** Chicago, Illinois + Orlando, Florida
**Founded:** 2008

**Games/Work:**
- Killer Instinct (Season 2-3)
- Extinction
- Co-dev on many AAA titles

**Why Consider:**
- Action game expertise
- Co-development partnerships

**Fit Score: 65** — Action focus, co-dev`,
    country: 'United States',
    region: 'North America',
    tags: ['co-dev', 'action', 'chicago', 'fighting'],
    fit: 65,
  },
  // NEW YORK
  {
    company: 'iNK Stories',
    website: 'https://inkstories.com',
    notes: `NYC immersive storytelling studio.

**Location:** New York City

**Focus:** "Creates immersive storylines across multiple mediums"
- Graphic novels
- Documentaries
- VR
- Original video games

**Why Perfect for LoreWeaver:**
- "Immersive storylines" explicit
- Multi-medium storytelling
- VR narrative experience

**Fit Score: 78** — Multi-medium narrative`,
    country: 'United States',
    region: 'North America',
    tags: ['narrative', 'vr', 'nyc', 'immersive', 'multi-medium'],
    fit: 78,
  },
  {
    company: 'Woodsy Studio',
    website: 'https://woodsy-studio.com',
    notes: `Visual novel studio.

**Location:** USA

**Mission:** "Rich stories with a strong blend of adventure and romance"
- Founded by screenwriters
- "Tired of seeing stories and writing treated as an afterthought"

**Games:**
- Visual novels with adventure elements

**Why PERFECT for LoreWeaver:**
- "Rich stories" mission
- Screenwriter founders
- "Writing treated as afterthought" = they GET IT

**Fit Score: 85** — Visual novel, story-first philosophy`,
    country: 'United States',
    region: 'North America',
    tags: ['visual-novel', 'narrative', 'romance', 'screenwriters', 'indie'],
    fit: 85,
  },
  // ADDITIONAL PACIFIC NORTHWEST
  {
    company: 'Camouflaj',
    website: 'https://camouflaj.com',
    notes: `Narrative stealth studio.

**Location:** Seattle, Washington
**Founder:** Ryan Payton (ex-Kojima Productions)

**Games:**
- République — Narrative stealth adventure
- Iron Man VR

**Why Perfect for LoreWeaver:**
- Narrative stealth focus
- Story-driven mobile/VR
- Kojima Productions DNA

**Fit Score: 80** — Narrative stealth specialists`,
    country: 'United States',
    region: 'North America',
    tags: ['narrative', 'stealth', 'seattle', 'republique', 'vr', 'kojima-alumni'],
    fit: 80,
  },
  {
    company: 'That Game Company',
    website: 'https://thatgamecompany.com',
    notes: `Emotional experience pioneers.

**Location:** Los Angeles, California (but worth mentioning)
**Founder:** Jenova Chen

**Games:**
- Journey — Emotional wordless narrative
- Flower
- Sky: Children of the Light

**Why Perfect for LoreWeaver:**
- Emotional storytelling without words
- Innovative narrative design
- Award-winning

**Fit Score: 75** — Wordless narrative, emotional`,
    country: 'United States',
    region: 'North America',
    tags: ['emotional', 'journey', 'los-angeles', 'artistic', 'mobile'],
    fit: 75,
  },
];

async function importStudios() {
  console.log(`\n🇺🇸 Importing ${usaStudios3.length} USA Part 3 (North + South) studios...\n`);
  
  const now = admin.firestore.Timestamp.now();
  let imported = 0;
  let skipped = 0;
  
  for (const studio of usaStudios3) {
    // Skip entries with fit 0 (historical references)
    if (studio.fit === 0) {
      console.log(`⏭️  Skipping ${studio.company} (historical reference)`);
      skipped++;
      continue;
    }
    
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
    console.log(`✅ Added ${studio.company} — Fit: ${studio.fit} — ID: ${docRef.id}`);
    imported++;
  }
  
  console.log(`\n📊 Summary: ${imported} imported, ${skipped} skipped`);
  console.log('🇺🇸 USA Part 3 import complete!\n');
}

importStudios()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
