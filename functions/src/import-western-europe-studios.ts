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

const westEuropeStudios: Partial<Lead>[] = [
  // UK
  {
    company: 'Inkle Studios',
    website: 'https://www.inklestudios.com',
    notes: `UK studio that CREATED THEIR OWN narrative scripting language "ink" (open-source, v1.0).

**Location:** Cambridge, UK

**Technology:** Created "ink" — open-source narrative scripting language
- Powers Heaven's Vault, Pendragon
- "Custom scripting engine generates narrative on the fly"
- ~30,000 lines of dialogue managed

**Games:**
- Sorcery! series (2013-2016) — Steve Jackson gamebook adaptation
- 80 Days (2014) — Jules Verne, award-winning
- Heaven's Vault (2019) — Archaeological adventure, language puzzles
- Pendragon (2020) — Procedurally narrated tactics
- A Highland Song (2023) — BAFTA nominated

**Why ULTIMATE FIT for LoreWeaver:**
- CREATED THEIR OWN narrative scripting language
- "Pushing boundaries of interactive storytelling"
- Generates narrative on the fly
- Open-source approach = potential integration

**Fit Score: 99** — Created ink narrative language!`,
    country: 'United Kingdom',
    region: 'Europe',
    tags: ['narrative-tools', 'ink', 'interactive-fiction', 'cambridge', 'open-source', 'bafta'],
    fit: 99,
  },
  {
    company: 'Supermassive Games',
    website: 'https://www.supermassivegames.com',
    notes: `BAFTA-winning UK studio specializing in narrative interactive horror.

**Location:** Guildford, UK

**Mission:** "Innovation in both storytelling and VR"

**Games:**
- Until Dawn — Interactive horror classic
- The Dark Pictures Anthology (8+ games) — Branching horror series
- The Quarry — Teen horror
- The Casting of Frank Stone

**Why PERFECT for LoreWeaver:**
- "Narrative interactive horror" specialists
- Branching storylines = complex dialogue trees
- BAFTA-winning for storytelling
- Prolific output in narrative games

**Fit Score: 95** — Interactive narrative horror masters`,
    country: 'United Kingdom',
    region: 'Europe',
    tags: ['horror', 'narrative', 'branching', 'bafta', 'guildford', 'interactive-drama'],
    fit: 95,
  },
  {
    company: 'The Chinese Room',
    website: 'https://www.thechineseroom.co.uk',
    notes: `UK studio that pioneered the "walking simulator" genre.

**Location:** Brighton, UK

**Games:**
- Dear Esther (2012) — Walking simulator PIONEER
- Everybody's Gone to the Rapture — BAFTA winner
- Amnesia: A Machine for Pigs (with Frictional)
- Still Wakes the Deep (2024) — Oil rig horror

**Why PERFECT for LoreWeaver:**
- Walking simulator = PURE narrative
- Environmental storytelling masters
- BAFTA winner for Rapture
- Genre-defining work

**Fit Score: 90** — Walking simulator pioneers`,
    country: 'United Kingdom',
    region: 'Europe',
    tags: ['walking-sim', 'narrative', 'environmental', 'bafta', 'brighton', 'pioneer'],
    fit: 90,
  },
  {
    company: 'Wales Interactive',
    website: 'https://www.walesinteractive.com',
    notes: `Welsh studio leading the FMV (Full Motion Video) game revival.

**Location:** Wales, UK

**Specialty:** FMV narrative games

**Games:**
- The Bunker, Late Shift, Five Dates, Ten Dates
- The Isle Tide Hotel
- Sker Ritual (FPS)

**Why Perfect for LoreWeaver:**
- FMV = dialogue/script heavy
- "Leader in the revival of the genre"
- Multiple narrative titles
- Adapts to new niches

**Fit Score: 85** — FMV narrative specialists`,
    country: 'United Kingdom',
    region: 'Europe',
    tags: ['fmv', 'narrative', 'interactive-movie', 'wales', 'branching'],
    fit: 85,
  },
  {
    company: 'ustwo games',
    website: 'https://ustwogames.co.uk',
    notes: `Award-winning London studio known for elegant design.

**Location:** South London, UK

**Games:**
- Monument Valley series — Award-winning puzzler
- Alba: A Wildlife Adventure — Eco-adventure

**Why Consider:**
- Award-winning design
- Narrative through environment
- Small creative studio

**Fit Score: 72** — Environmental storytelling`,
    country: 'United Kingdom',
    region: 'Europe',
    tags: ['indie', 'puzzle', 'mobile', 'award-winning', 'london'],
    fit: 72,
  },
  {
    company: 'Sad Owl Studios',
    website: '',
    notes: `Scottish indie studio. WON BAFTA for Best British Video Game.

**Location:** Scotland, UK

**Games:**
- Viewfinder — Puzzle platformer, instant camera mechanic

**Achievement:** Won BAFTA Best British Video Game 2024

**Why Consider:**
- BAFTA winner
- Innovative design
- Scottish indie

**Fit Score: 70** — BAFTA quality, puzzle focus`,
    country: 'United Kingdom',
    region: 'Europe',
    tags: ['indie', 'puzzle', 'bafta-winner', 'scotland', 'innovative'],
    fit: 70,
  },
  // FRANCE
  {
    company: "Don't Nod",
    website: 'https://dont-nod.com',
    notes: `French studio that DEFINED modern narrative adventure games.

**Location:** Paris + Montreal
**Founded:** 2008

**Mission:** "Creating powerful and immersive NARRATIVE EXPERIENCES"

**Games:**
- Remember Me (2013)
- Life is Strange series — ICONIC, defined the genre
- Vampyr — Narrative action RPG
- Tell Me Why — Trans protagonist story
- Banishers: Ghosts of New Eden

**Why PERFECT for LoreWeaver:**
- Life is Strange = DEFINED modern narrative games
- "Immersive narrative experiences" explicit mission
- Choice-based storytelling experts
- Every game = unique narrative

**Fit Score: 98** — Life is Strange creators`,
    country: 'France',
    region: 'Europe',
    tags: ['narrative', 'life-is-strange', 'choice-based', 'paris', 'iconic'],
    fit: 98,
  },
  {
    company: 'Quantic Dream',
    website: 'https://www.quanticdream.com',
    notes: `French studio that pioneered "interactive drama" genre.

**Location:** Paris + Montreal
**Founded:** 1997
**Founder:** David Cage
**Owner:** NetEase (acquired 2022)

**Games:**
- Indigo Prophecy / Fahrenheit
- Heavy Rain — Interactive drama breakthrough
- Beyond: Two Souls
- Detroit: Become Human — Branching narrative masterpiece

**Why PERFECT for LoreWeaver:**
- DEFINED "interactive drama" genre
- Detroit = ultimate branching narrative
- David Cage = narrative game visionary
- "Unique narrative experiences"

**Fit Score: 95** — Interactive drama pioneers`,
    country: 'France',
    region: 'Europe',
    tags: ['interactive-drama', 'detroit', 'david-cage', 'branching', 'paris', 'netease'],
    fit: 95,
  },
  {
    company: 'Parallel Studio',
    website: '',
    notes: `French indie partnered with Quantic Dream for publishing.

**Location:** Paris

**Focus:** "Narrative, atmospheric and poetic cinematography"

**Partnership:** Quantic Dream (announced 2021)

**Why Consider:**
- Quantic Dream partnership
- Narrative focus explicit
- Atmospheric poetic games

**Fit Score: 78** — Narrative atmospheric`,
    country: 'France',
    region: 'Europe',
    tags: ['indie', 'narrative', 'atmospheric', 'paris', 'quantic-partner'],
    fit: 78,
  },
  // GERMANY
  {
    company: 'Daedalic Entertainment',
    website: 'https://www.daedalic.com',
    notes: `German publisher/developer renowned for adventure games.

**Location:** Hamburg
**Founded:** 2007

**Focus:** 4 pillars — "Story-telling, strategy, co-op, wholesome"

**Games:**
- Deponia series — Adventure classics
- Edna & Harvey: The Breakout
- Blackguards — Tactical RPG
- The Lord of the Rings: Gollum
- Silence

**Also:** Publisher supporting indie developers

**Why Perfect for LoreWeaver:**
- "Story-telling" as explicit pillar
- Adventure game tradition
- Publisher for indie narrative games
- German adventure legacy

**Fit Score: 88** — Adventure/story specialists`,
    country: 'Germany',
    region: 'Europe',
    tags: ['adventure', 'publisher', 'story-telling', 'hamburg', 'deponia'],
    fit: 88,
  },
  {
    company: 'KING Art Games',
    website: 'https://www.kingartgames.com',
    notes: `German studio continuing adventure game tradition.

**Location:** Bremen, Germany

**Games:**
- The Book of Unwritten Tales series — Adventure
- Iron Harvest — Story-driven RTS
- The Dwarves — Fantasy RPG

**Why Consider:**
- "Unwritten Tales" = narrative adventure
- Story-driven RTS
- German adventure tradition

**Fit Score: 80** — Narrative adventures`,
    country: 'Germany',
    region: 'Europe',
    tags: ['adventure', 'rts', 'narrative', 'bremen', 'fantasy'],
    fit: 80,
  },
];

async function importStudios() {
  console.log(`\n🇬🇧🇫🇷🇩🇪 Importing ${westEuropeStudios.length} Western Europe studios...\n`);
  
  const now = admin.firestore.Timestamp.now();
  let imported = 0;
  let skipped = 0;
  
  for (const studio of westEuropeStudios) {
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
  console.log('🇬🇧🇫🇷🇩🇪 Western Europe import complete!\n');
}

importStudios()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
