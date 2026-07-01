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

const usaStudios2: Partial<Lead>[] = [
  // NARRATIVE ACTION/ADVENTURE
  {
    company: 'Supergiant Games',
    website: 'https://www.supergiantgames.com',
    notes: `Award-winning indie studio blending narrative with action.

**Location:** San Francisco, California
**Founded:** 2009
**Founders:** Amir Rao, Gavin Simon

**Mission:** "Creating adventures with engaging stories in beautiful, vibrant worlds"

**Games:**
- Bastion — Narrator-driven action RPG
- Transistor — Sci-fi narrative action
- Pyre — Narrative sports/visual novel hybrid
- Hades — GOTY, narrative roguelike revolution
- Hades II — Early Access

**Why PERFECT for LoreWeaver:**
- "Engaging stories" explicit mission
- Hades revolutionized narrative in roguelikes
- Deep character development
- Multiple GOTY awards

**Fit Score: 92** — Narrative roguelike pioneers`,
    country: 'United States',
    region: 'North America',
    tags: ['narrative', 'roguelike', 'hades', 'bastion', 'san-francisco', 'goty', 'action'],
    fit: 92,
  },
  {
    company: 'Ember Lab',
    website: 'https://www.emberlab.com',
    notes: `Animation studio turned game developer.

**Location:** Orange, California
**Founded:** 2009
**Founders:** Mike and Josh Grier (brothers)
**Background:** Animation and digital content studio

**Games:**
- Kena: Bridge of Spirits — "Story-driven, action adventure"
- Sequel in development

**Why Perfect for LoreWeaver:**
- "Story-driven" explicit focus
- Animation quality = cinematic narrative
- Action-adventure with narrative core

**Fit Score: 85** — Story-driven action adventure`,
    country: 'United States',
    region: 'North America',
    tags: ['narrative', 'adventure', 'kena', 'animation', 'orange-ca', 'story-driven'],
    fit: 85,
  },
  {
    company: 'Heart Machine',
    website: 'https://www.heartmachine.com',
    notes: `Atmospheric action studio with narrative focus.

**Location:** Los Angeles, California
**Founder:** Alx Preston
**Publisher:** Annapurna Interactive

**Mission:** "Adventures with engaging stories in beautiful, vibrant worlds"

**Games:**
- Hyper Light Drifter — Atmospheric action, visual storytelling
- Solar Ash — Same universe, narrative focus
- Hyper Light Breaker (upcoming)
- Possessor(s) (upcoming)

**Why Perfect for LoreWeaver:**
- "Engaging stories" mission
- Environmental narrative
- Annapurna published

**Fit Score: 80** — Atmospheric narrative`,
    country: 'United States',
    region: 'North America',
    tags: ['narrative', 'action', 'hyper-light', 'annapurna', 'los-angeles', 'atmospheric'],
    fit: 80,
  },
  // NARRATIVE ADVENTURE - SMALLER INDIES
  {
    company: 'Infinite Fall',
    website: 'https://www.nightinthewoods.com',
    notes: `Night in the Woods creators.

**Location:** Pennsylvania, USA
**Founders:** Alec Holowka, Scott Benson
**Publisher:** Finji

**Games:**
- Night in the Woods — "Adventure focused on exploration, story, and character"
- Lost Constellation

**Why PERFECT for LoreWeaver:**
- "Heavy focus on narrative"
- "Dozens of characters"
- Character-driven adventure
- Kickstarter success

**Fit Score: 88** — Character-focused narrative adventure`,
    country: 'United States',
    region: 'North America',
    tags: ['narrative', 'adventure', 'night-in-woods', 'character', 'finji', 'kickstarter'],
    fit: 88,
  },
  {
    company: 'Finji',
    website: 'https://finji.co',
    notes: `Indie publisher/developer focused on meaningful games.

**Location:** Grand Rapids, Michigan
**Founders:** Adam Saltsman, Rebekah Saltsman

**Published/Developed:**
- Night in the Woods
- Overland
- Tunic
- I Was a Teenage Exocolonist

**Why Perfect for LoreWeaver:**
- Publishes narrative-focused games
- "Meaningful games" philosophy
- Strong curation

**Fit Score: 78** — Publisher, narrative focus`,
    country: 'United States',
    region: 'North America',
    tags: ['publisher', 'narrative', 'finji', 'michigan', 'indie'],
    fit: 78,
  },
  // VISUAL NOVEL / NARRATIVE FOCUSED
  {
    company: 'Northway Games',
    website: 'https://www.northwaygames.com',
    notes: `I Was a Teenage Exocolonist creators.

**Location:** Seattle, Washington
**Founders:** Sarah Northway, Colin Northway

**Games:**
- I Was a Teenage Exocolonist — Narrative life sim with branching
- Rebuild series
- Incredipede

**Why Perfect for LoreWeaver:**
- Branching narrative life sim
- Choice-heavy gameplay
- Multiple endings

**Fit Score: 85** — Branching narrative specialists`,
    country: 'United States',
    region: 'North America',
    tags: ['narrative', 'life-sim', 'branching', 'seattle', 'visual-novel'],
    fit: 85,
  },
  {
    company: 'Serenity Forge',
    website: 'https://serenityforge.com',
    notes: `Narrative game studio and publisher.

**Location:** Boulder, Colorado
**Specialty:** Narrative-focused games

**Games:**
- Where the Water Tastes Like Wine — Narrative anthology
- The King's Bird
- Luna's Fishing Garden

**Published:**
- Doki Doki Literature Club Plus!

**Why Perfect for LoreWeaver:**
- Where the Water Tastes Like Wine = pure narrative
- American folklore storytelling
- Publishes narrative games

**Fit Score: 85** — Narrative anthology specialists`,
    country: 'United States',
    region: 'North America',
    tags: ['narrative', 'publisher', 'water-tastes-wine', 'boulder', 'anthology'],
    fit: 85,
  },
  // DETECTIVE/MYSTERY
  {
    company: 'Cloisters Interactive',
    website: 'https://cloistersinteractive.com',
    notes: `Disco Elysium-inspired detective RPG studio.

**Location:** USA

**Games:**
- The Pale Beyond — Narrative survival
- New detective RPG in development

**Why Perfect for LoreWeaver:**
- Narrative-heavy detective games
- Disco Elysium DNA

**Fit Score: 82** — Narrative detective games`,
    country: 'United States',
    region: 'North America',
    tags: ['narrative', 'detective', 'rpg', 'survival'],
    fit: 82,
  },
  // PUBLISHERS (that work with narrative studios)
  {
    company: 'Annapurna Interactive',
    website: 'https://annapurnainteractive.com',
    notes: `THE narrative game publisher.

**Location:** Los Angeles, California
**Founded:** 2016
**Parent:** Annapurna Pictures

**Published:**
- What Remains of Edith Finch
- Kentucky Route Zero
- Stray
- Outer Wilds
- 12 Minutes
- Cocoon

**Internal Development:**
- Blade Runner 2033: Labyrinth
- "Narrative-driven games" focus

**Why Important:**
- Defines narrative indie publishing
- "Personal experiences for everyone"
- Works with best narrative studios
- Now developing internally

**Fit Score: 75** — Publisher, not developer`,
    country: 'United States',
    region: 'North America',
    tags: ['publisher', 'narrative', 'annapurna', 'los-angeles', 'prestigious'],
    fit: 75,
  },
  {
    company: 'Devolver Digital',
    website: 'https://www.devolverdigital.com',
    notes: `Indie publisher with narrative titles.

**Location:** Austin, Texas
**Founded:** 2009

**Published narrative games:**
- Stories Untold / Observation (Screen Burn)
- Gris
- Inscryption
- Return of the Obra Dinn

**Why Consider:**
- Publishes narrative games
- "Bold, creative games"
- Strong indie partnerships

**Fit Score: 70** — Publisher`,
    country: 'United States',
    region: 'North America',
    tags: ['publisher', 'indie', 'devolver', 'austin', 'narrative'],
    fit: 70,
  },
  // IMMERSIVE SIM / EMERGENT NARRATIVE
  {
    company: 'Arkane Studios Austin',
    website: 'https://www.arkane-studios.com',
    notes: `Immersive sim specialists (US branch).

**Location:** Austin, Texas
**Owner:** Xbox/Bethesda
**Note:** US branch, parent is French

**Games:**
- Prey (2017) — Immersive sim with environmental narrative
- Redfall
- Deathloop support

**Why Consider:**
- Immersive sim = emergent narrative
- Environmental storytelling
- Note: May be reduced after layoffs

**Fit Score: 72** — Immersive sim narrative`,
    country: 'United States',
    region: 'North America',
    tags: ['immersive-sim', 'prey', 'austin', 'xbox', 'environmental'],
    fit: 72,
  },
  // CLASSIC ADVENTURE REVIVAL
  {
    company: 'Terrible Toybox',
    website: 'https://terribletoybox.com',
    notes: `Classic adventure game revival.

**Location:** USA
**Founders:** Ron Gilbert, Gary Winnick (LucasArts legends)

**Games:**
- Thimbleweed Park — Classic point-and-click
- Return to Monkey Island (consulting)

**Why Consider:**
- LucasArts adventure DNA
- Classic narrative adventure
- Ron Gilbert = Monkey Island creator

**Fit Score: 80** — Classic adventure legends`,
    country: 'United States',
    region: 'North America',
    tags: ['adventure', 'point-and-click', 'thimbleweed', 'lucasarts', 'ron-gilbert'],
    fit: 80,
  },
  // STORY-RICH INDIES
  {
    company: 'Mobius Digital',
    website: 'https://www.mobiusdigitalgames.com',
    notes: `Outer Wilds creators.

**Location:** Los Angeles, California
**Publisher:** Annapurna Interactive

**Games:**
- Outer Wilds — Exploration mystery, BAFTA winner
- Echoes of the Eye DLC

**Why Perfect for LoreWeaver:**
- Mystery-driven exploration
- Environmental storytelling
- BAFTA Best Game winner
- Time loop narrative

**Fit Score: 85** — Exploration narrative mystery`,
    country: 'United States',
    region: 'North America',
    tags: ['narrative', 'exploration', 'outer-wilds', 'annapurna', 'bafta', 'mystery'],
    fit: 85,
  },
  {
    company: 'The Molasses Flood',
    website: 'https://molassesflood.com',
    notes: `Narrative survival studio.

**Location:** Boston, Massachusetts
**Owner:** CD Projekt (acquired 2021)

**Games:**
- The Flame in the Flood — Survival roguelike
- Drake Hollow

**Why Consider:**
- Narrative in survival
- CD Projekt backing
- Ex-BioShock/Halo developers

**Fit Score: 70** — Survival focus`,
    country: 'United States',
    region: 'North America',
    tags: ['survival', 'narrative', 'boston', 'cd-projekt', 'roguelike'],
    fit: 70,
  },
  {
    company: 'Dim Bulb Games',
    website: 'https://dimbulb.games',
    notes: `Where the Water Tastes Like Wine lead developer.

**Location:** USA
**Founder:** Johnnemann Nordhagen (ex-Fullbright)

**Games:**
- Where the Water Tastes Like Wine — Narrative anthology masterpiece

**Why PERFECT for LoreWeaver:**
- "Blending narrative with folklore"
- American stories anthology
- Multiple storytelling styles
- Ex-Gone Home developer

**Fit Score: 90** — Narrative anthology creator`,
    country: 'United States',
    region: 'North America',
    tags: ['narrative', 'anthology', 'water-tastes-wine', 'folklore', 'fullbright-alumni'],
    fit: 90,
  },
];

async function importStudios() {
  console.log(`\n🇺🇸 Importing ${usaStudios2.length} USA Part 2 studios...\n`);
  
  const now = admin.firestore.Timestamp.now();
  let imported = 0;
  let skipped = 0;
  
  for (const studio of usaStudios2) {
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
  console.log('🇺🇸 USA Part 2 import complete!\n');
}

importStudios()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
