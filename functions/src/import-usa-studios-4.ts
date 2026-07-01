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

const usaStudios4: Partial<Lead>[] = [
  // DC/VIRGINIA/MARYLAND AREA
  {
    company: 'Something Wicked Games',
    website: 'https://somethingwickedgames.com',
    notes: `Bethesda/Obsidian veterans building narrative RPG.

**Location:** Washington DC area
**Founded:** 2021
**Founders:**
- **Jeff Gardiner** — Producer on Fallout 3, Fallout 4, Skyrim; Project Lead Fallout 76
- **Charles Staples** — Design Director on The Outer Worlds, Level Design Lead South Park: Stick of Truth
- Ekram Rashid

**Team:** Veterans from Bethesda Game Studios, Obsidian Entertainment

**Games:**
- Wyrdsong — Open-world RPG, "unreliable narrator", preternatural setting

**Why ULTIMATE FIT for LoreWeaver:**
- Jeff Gardiner = Elder Scrolls + Fallout legacy
- Charles Staples = Outer Worlds narrative design
- "Player choice" and "consequences" focus
- Building exactly what Director enables

**Fit Score: 97** — Bethesda + Obsidian DNA, narrative RPG mission`,
    country: 'United States',
    region: 'North America',
    tags: ['rpg', 'narrative', 'bethesda-alumni', 'obsidian-alumni', 'dc', 'wyrdsong', 'open-world'],
    fit: 97,
  },
  {
    company: 'NEARstudios',
    website: 'https://nearstudios.com',
    notes: `Bethesda/BioWare/Naughty Dog alumni co-op RPG studio.

**Location:** Maryland
**Founded:** 2024
**Founders:** Heather Cerlan, Jason Richardson

**Games:**
- Hawthorn — Co-op sandbox RPG, "nostalgic adventure stories of '80s and '90s"

**Why Perfect for LoreWeaver:**
- Veteran narrative RPG pedigree
- Adventure story focus
- Co-op narrative RPG

**Fit Score: 85** — AAA alumni, adventure RPG`,
    country: 'United States',
    region: 'North America',
    tags: ['rpg', 'co-op', 'maryland', 'bethesda-alumni', 'bioware-alumni', 'hawthorn'],
    fit: 85,
  },
  {
    company: 'Loric Games',
    website: 'https://loricgames.com',
    notes: `Northern Virginia narrative RPG startup.

**Location:** Northern Virginia
**Focus:** Narrative-first development

**Games:**
- Echoes of Elysium — "Iterating on the narrative"

**Why Perfect for LoreWeaver:**
- "Iterating on the narrative" focus
- Building Virginia game dev ecosystem
- Early stage = perfect adoption timing

**Fit Score: 78** — Narrative focus, emerging`,
    country: 'United States',
    region: 'North America',
    tags: ['narrative', 'rpg', 'virginia', 'indie', 'startup'],
    fit: 78,
  },
  // NORTH CAROLINA
  {
    company: 'Raleigh Game Studios',
    website: 'https://raleighgamestudios.com',
    notes: `Narrative-first indie studio.

**Location:** Raleigh, North Carolina

**Mission:** 
- "Create single-player games that focus on engrossing narratives that players will not want to end"
- "Storytellers. Gamers. Believers that the best games are built on a solid narrative"
- "Focused on delivering narrative-driven gaming experiences"
- "We focus on the story first and foremost"

**Why PERFECT FIT for LoreWeaver:**
- EXPLICIT narrative-first mission
- "Story first and foremost"
- "Engrossing narratives"
- Exactly our target customer profile

**Fit Score: 92** — Mission perfectly aligned with Architect`,
    country: 'United States',
    region: 'North America',
    tags: ['narrative', 'single-player', 'raleigh', 'story-first', 'indie'],
    fit: 92,
  },
  {
    company: 'Prologue Games',
    website: 'https://prologuegames.com',
    notes: `Story-driven game studio.

**Location:** North Carolina

**Mission:** "Dedicated to building rich story driven games"

**Why Perfect for LoreWeaver:**
- "Rich story driven games" explicit
- Perfect Architect customer

**Fit Score: 85** — Story-driven mission`,
    country: 'United States',
    region: 'North America',
    tags: ['narrative', 'story-driven', 'north-carolina', 'indie'],
    fit: 85,
  },
  {
    company: 'Redact Games',
    website: 'https://redactgames.com',
    notes: `Michigan narrative adventure studio.

**Location:** Michigan
**Founder:** Nate Berens

**Games:**
- Sagebrush — "Narrative adventure exploring a cult compound in the aftermath of something bad happening"

**Why Perfect for LoreWeaver:**
- Narrative adventure focus
- Dark thematic storytelling
- Small indie team

**Fit Score: 82** — Narrative adventure specialists`,
    country: 'United States',
    region: 'North America',
    tags: ['narrative', 'adventure', 'michigan', 'indie', 'horror'],
    fit: 82,
  },
  // MIDWEST
  {
    company: 'Midwest Games',
    website: 'https://www.midwestgames.com',
    notes: `Midwest-focused indie publisher.

**Location:** Midwest USA

**Mission:** "Creating opportunities for the abundant talent across the Midwest and other underrepresented regions"

**Why Consider:**
- Publisher for Midwest studios
- Could be partnership channel

**Fit Score: 65** — Publisher`,
    country: 'United States',
    region: 'North America',
    tags: ['publisher', 'midwest', 'indie'],
    fit: 65,
  },
  {
    company: 'Red Lamb Studios',
    website: 'https://redlambstudios.com',
    notes: `Wisconsin narrative gaming + novels studio.

**Location:** Wisconsin

**Mission:** "Craft immersive gaming experiences and narratives"
- Also produces novels

**Why Perfect for LoreWeaver:**
- "Immersive narratives" explicit
- Cross-media storytelling
- Novel production = strong writing

**Fit Score: 80** — Narrative + novels focus`,
    country: 'United States',
    region: 'North America',
    tags: ['narrative', 'novels', 'wisconsin', 'indie', 'cross-media'],
    fit: 80,
  },
  // SOUTH - LOUISIANA
  {
    company: 'Geography of Robots',
    website: 'https://geographyofrobots.com',
    notes: `NORCO creators — Southern Gothic narrative adventure.

**Location:** Louisiana
**Publisher:** Raw Fury

**Games:**
- NORCO — "Southern Gothic point-and-click narrative adventure"
  - Set in South Louisiana
  - "Sinking suburbs and industrial swamps"
  - Critical acclaim

**Why PERFECT for LoreWeaver:**
- "Point-and-click narrative adventure"
- Southern Gothic storytelling
- Louisiana regional authenticity
- Award-winning narrative

**Fit Score: 90** — Narrative adventure excellence`,
    country: 'United States',
    region: 'North America',
    tags: ['narrative', 'adventure', 'point-and-click', 'louisiana', 'southern-gothic', 'norco'],
    fit: 90,
  },
  {
    company: 'Ghost Garden Games',
    website: 'https://ghostgardengames.com',
    notes: `Women-led Louisiana narrative studio.

**Location:** Baton Rouge, Louisiana
**Founded:** 2015
**Note:** Women-led, gender-inclusive

**Focus:** "Passion for telling narrative-driven stories"

**Xbox Game Studios Game Camp participant**

**Why Perfect for LoreWeaver:**
- "Narrative-driven stories" explicit
- Diverse studio = fresh perspectives
- Xbox partnership potential

**Fit Score: 82** — Narrative-driven, women-led`,
    country: 'United States',
    region: 'North America',
    tags: ['narrative', 'women-led', 'louisiana', 'baton-rouge', 'xbox', 'inclusive'],
    fit: 82,
  },
  // SOUTH - GEORGIA/TENNESSEE
  {
    company: 'Traega Entertainment',
    website: 'https://www.traega.com',
    notes: `AAA veteran indie studio.

**Location:** Atlanta area, Georgia

**Team:** Veterans from Blizzard, Riot, EA, Microsoft, Ubisoft, Disney, Midway, Funcom

**Why Consider:**
- AAA veteran talent
- Funcom = narrative RPG experience (Longest Journey)
- Strong industry pedigree

**Fit Score: 75** — AAA veterans, TBD focus`,
    country: 'United States',
    region: 'North America',
    tags: ['aaa-veterans', 'atlanta', 'blizzard', 'riot', 'ea'],
    fit: 75,
  },
  {
    company: 'NC2 Media',
    website: 'https://nc2media.com',
    notes: `Tennessee game studio.

**Location:** Franklin, Tennessee

**Why Consider:**
- Tennessee presence
- Small studio

**Fit Score: 60** — TBD`,
    country: 'United States',
    region: 'North America',
    tags: ['tennessee', 'indie'],
    fit: 60,
  },
  // COLORADO (note: Deck Nine + Serenity Forge already added)
  {
    company: 'IllFonic',
    website: 'https://www.illfonic.com',
    notes: `Asymmetric horror/action studio.

**Location:** Colorado
**Founded:** 2007

**Games:**
- Predator: Hunting Grounds
- Friday the 13th: The Game
- Killer Klowns from Outer Space

**Why Consider:**
- Licensed IP expertise
- Multiplayer narrative (killer vs survivors)

**Fit Score: 65** — Multiplayer action focus`,
    country: 'United States',
    region: 'North America',
    tags: ['multiplayer', 'horror', 'colorado', 'licensed-ip'],
    fit: 65,
  },
  // MIDWEST - PUBLISHER NOTE
  {
    company: 'Dire Wolf Digital',
    website: 'https://direwolfdigital.com',
    notes: `Digital card/board game studio.

**Location:** Denver, Colorado
**Founded:** 2010
**Size:** 100+ team

**Games:**
- Pokemon Trading Card Game Online
- The Elder Scrolls: Legends
- Eternal

**Why Consider:**
- TES: Legends = narrative card game
- Large experienced team

**Fit Score: 68** — Card game focus`,
    country: 'United States',
    region: 'North America',
    tags: ['card-games', 'denver', 'elder-scrolls', 'pokemon'],
    fit: 68,
  },
];

async function importStudios() {
  console.log(`\n🇺🇸 Importing ${usaStudios4.length} USA Part 4 (Midwest + South) studios...\n`);
  
  const now = admin.firestore.Timestamp.now();
  let imported = 0;
  let skipped = 0;
  
  for (const studio of usaStudios4) {
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
  console.log('🇺🇸 USA Part 4 import complete!\n');
}

importStudios()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
