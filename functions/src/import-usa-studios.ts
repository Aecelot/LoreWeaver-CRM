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

const usaStudios: Partial<Lead>[] = [
  // TIER 1: NARRATIVE RPG LEGENDS
  {
    company: 'Obsidian Entertainment',
    website: 'https://www.obsidian.net',
    notes: `Legendary narrative RPG studio, Black Isle successor.

**Location:** Irvine, California
**Founded:** 2003
**Owner:** Xbox Game Studios

**Legacy:** Founded by ex-Black Isle (Planescape: Torment, Baldur's Gate)

**Games:**
- Fallout: New Vegas — "Best narrative in the series"
- Pillars of Eternity 1 & 2 — Spiritual BG successor
- The Outer Worlds — Sci-fi RPG
- Avowed (upcoming)
- Pentiment — Historical narrative adventure

**Why LEGENDARY:**
- "Rich narrative-driven RPGs"
- "Memorable branching narrative"
- "One of the best storytellers in gaming"
- Black Isle DNA = narrative RPG royalty

**Fit Score: 95** — Narrative RPG legends`,
    country: 'United States',
    region: 'North America',
    tags: ['rpg', 'narrative', 'fallout', 'pillars', 'xbox', 'irvine', 'black-isle'],
    fit: 95,
  },
  {
    company: 'inXile Entertainment',
    website: 'https://www.inxile-entertainment.com',
    notes: `Narrative RPG studio focused on player choice.

**Location:** Newport Beach, California
**Founded:** 2002
**Founder:** Brian Fargo (Interplay founder)
**Owner:** Xbox Game Studios

**Mission:** "Creating beautiful, narrative-driven roleplaying experiences that react to your choices in painstaking detail"

**Games:**
- Wasteland 2 & 3 — Post-apocalyptic RPG
- Torment: Tides of Numenera — Planescape successor
- The Bard's Tale IV

**Why PERFECT for LoreWeaver:**
- "Narrative-driven roleplaying experiences"
- "React to your choices in painstaking detail"
- Torment = ultimate narrative RPG
- Brian Fargo = industry legend

**Fit Score: 95** — Narrative choice specialists`,
    country: 'United States',
    region: 'North America',
    tags: ['rpg', 'narrative', 'wasteland', 'torment', 'xbox', 'newport-beach', 'brian-fargo'],
    fit: 95,
  },
  {
    company: 'Deck Nine',
    website: 'https://deckninegames.com',
    notes: `Narrative adventure studio that BUILT THEIR OWN narrative tool!

**Location:** Westminster, Colorado
**Formerly:** Idol Minds

**CREATED:** StoryForge — proprietary narrative toolset!

**Specialty:** "Specializes in narrative storytelling"

**Games:**
- Life is Strange: Before the Storm
- Life is Strange: True Colors
- Life is Strange: Double Exposure
- The Expanse: A Telltale Series (collab)

**Why ULTIMATE FIT for LoreWeaver:**
- Built their OWN narrative tool (StoryForge)!
- "Specializes in narrative storytelling"
- Life is Strange IP = branching narrative masters
- Perfect validation + potential competitor/partner

**Fit Score: 99** — Built their own narrative tool!`,
    country: 'United States',
    region: 'North America',
    tags: ['narrative', 'life-is-strange', 'storyforge', 'branching', 'colorado', 'tool-builder'],
    fit: 99,
  },
  // TIER 2: NARRATIVE ADVENTURE SPECIALISTS
  {
    company: 'Night School Studio',
    website: 'https://nightschoolstudio.com',
    notes: `Narrative adventure pioneers with unique dialogue system.

**Location:** Glendale, California
**Founded:** 2014
**Founders:** Sean Krankel, Adam Hines (ex-Telltale)
**Owner:** Netflix (acquired 2021)

**Innovation:** "Branch conversations system"

**Games:**
- Oxenfree — Supernatural thriller with unique dialogue
- Oxenfree II: Lost Signals
- Afterparty

**Why PERFECT for LoreWeaver:**
- "Narrative-driven adventure games"
- Created "branch conversations system"
- "Supernatural themes, interpersonal dialogue"
- Ex-Telltale founders

**Fit Score: 92** — Branch conversation pioneers`,
    country: 'United States',
    region: 'North America',
    tags: ['narrative', 'adventure', 'oxenfree', 'dialogue', 'netflix', 'glendale', 'telltale-alumni'],
    fit: 92,
  },
  {
    company: 'Giant Sparrow',
    website: 'https://www.giantsparrow.com',
    notes: `Environmental narrative masters.

**Location:** Los Angeles, California
**Creative Director:** Ian Dallas
**Publisher:** Annapurna Interactive

**Games:**
- What Remains of Edith Finch — "Environmental Narrative Game", BAFTA
- The Unfinished Swan

**Why PERFECT for LoreWeaver:**
- "First-person narrative adventure"
- "Environmental Narrative Game"
- BAFTA winner for narrative
- "Magical ode to the joy of storytelling"

**Fit Score: 90** — Environmental narrative masters`,
    country: 'United States',
    region: 'North America',
    tags: ['narrative', 'adventure', 'edith-finch', 'environmental', 'annapurna', 'los-angeles', 'bafta'],
    fit: 90,
  },
  {
    company: 'Campo Santo',
    website: 'https://www.camposanto.com',
    notes: `Firewatch creators, narrative walking sim pioneers.

**Location:** San Francisco, California
**Founded:** 2013
**Founders:** Jake Rodkin, Sean Vanaman (ex-Telltale)
**Owner:** Valve (acquired 2018)

**Mission:** "Games about interesting people in fascinating places"

**Games:**
- Firewatch — 1.5M+ copies, "Narrative Experience"
- In the Valley of Gods (in development)

**Why PERFECT for LoreWeaver:**
- "Narrative Experience" pioneers
- Firewatch = dialogue-driven
- Ex-Telltale founders
- "Interesting people in fascinating places"

**Fit Score: 88** — Narrative experience creators`,
    country: 'United States',
    region: 'North America',
    tags: ['narrative', 'firewatch', 'walking-sim', 'valve', 'san-francisco', 'telltale-alumni'],
    fit: 88,
  },
  {
    company: 'Cardboard Computer',
    website: 'https://cardboard.computer',
    notes: `Kentucky Route Zero creators — magical realist narrative.

**Location:** USA
**Team:** Jake Elliott, Tamas Kemenczy, Ben Babbitt
**Publisher:** Annapurna Interactive

**Games:**
- Kentucky Route Zero — "Magical realist adventure", "Interactive fiction"

**Why PERFECT for LoreWeaver:**
- "Narrative-driven adventure"
- "Point-and-click adventure interactive fiction"
- Annapurna published
- New game in development

**Fit Score: 88** — Interactive fiction masters`,
    country: 'United States',
    region: 'North America',
    tags: ['narrative', 'interactive-fiction', 'kentucky-route-zero', 'annapurna', 'magical-realism'],
    fit: 88,
  },
  // TIER 3: TELLTALE SUCCESSORS
  {
    company: 'Telltale Games',
    website: 'https://telltale.com',
    notes: `Revived episodic narrative adventure studio.

**Location:** California
**Status:** Revived by LCG Entertainment (2019)

**Legacy:** Defined modern episodic narrative games

**Games:**
- The Walking Dead series — Defined choice-based narrative
- The Wolf Among Us 1 & 2
- Tales from the Borderlands

**Why Important:**
- Defined "your choices matter" genre
- Industry impact massive
- Now revived and active

**Fit Score: 85** — Episodic narrative pioneers (revived)`,
    country: 'United States',
    region: 'North America',
    tags: ['narrative', 'episodic', 'walking-dead', 'wolf-among-us', 'choice', 'revived'],
    fit: 85,
  },
  {
    company: 'AdHoc Studio',
    website: 'https://www.adhocstudio.com',
    notes: `Telltale veterans making narrative games.

**Location:** California
**Founders:** Pierre Shorette, Nick Herman + other ex-Telltale

**Games:**
- Dispatch — Original narrative game
- The Wolf Among Us 2 (collaboration)

**Why Perfect for LoreWeaver:**
- Telltale writing veterans
- "Narrative and cinematic elements"
- Indie = perfect Architect customer

**Fit Score: 85** — Telltale narrative veterans`,
    country: 'United States',
    region: 'North America',
    tags: ['narrative', 'telltale-alumni', 'dispatch', 'cinematic', 'indie'],
    fit: 85,
  },
  {
    company: 'Skunkape Games',
    website: 'https://www.skunkape.net',
    notes: `Telltale co-founder's new studio.

**Location:** California
**Founder:** Dan Connors (Telltale co-founder)

**Games:**
- Sam & Max remasters
- Telltale legacy projects

**Why Consider:**
- Telltale co-founder
- Point-and-click adventure
- Classic narrative games

**Fit Score: 78** — Classic adventure focus`,
    country: 'United States',
    region: 'North America',
    tags: ['adventure', 'telltale-alumni', 'sam-max', 'point-and-click', 'remaster'],
    fit: 78,
  },
  {
    company: 'Dramatic Labs',
    website: 'https://www.dramaticlabs.com',
    notes: `Telltale founder's narrative studio.

**Location:** California
**Founder:** Kevin Bruner (Telltale founder)
**Also:** Bruner House (publishing)

**Games:**
- Star Trek: Resurgence — Narrative adventure

**Why Perfect for LoreWeaver:**
- Telltale founder
- Star Trek IP = branching narrative
- Narrative adventure focus

**Fit Score: 82** — Telltale founder's new venture`,
    country: 'United States',
    region: 'North America',
    tags: ['narrative', 'telltale-alumni', 'star-trek', 'adventure'],
    fit: 82,
  },
  // TIER 4: OTHER NARRATIVE STUDIOS
  {
    company: 'Fullbright',
    website: 'https://fullbright.company',
    notes: `Walking simulator pioneers.

**Location:** Portland, Oregon
**Founded:** 2012

**Games:**
- Gone Home — Defined walking simulator genre
- Tacoma — Sci-fi narrative exploration

**Why PERFECT for LoreWeaver:**
- Pioneered walking simulator genre
- Environmental storytelling
- Narrative through exploration

**Fit Score: 85** — Walking sim pioneers`,
    country: 'United States',
    region: 'North America',
    tags: ['narrative', 'walking-sim', 'gone-home', 'tacoma', 'portland', 'environmental'],
    fit: 85,
  },
  {
    company: 'WayForward',
    website: 'https://wayforward.com',
    notes: `Character-driven platformer specialists.

**Location:** Valencia, California
**Founded:** 1990

**Games:**
- Shantae series — Character-driven platformer
- River City Girls
- Licensed games (Adventure Time, etc.)

**Why Consider:**
- Character-driven narratives
- Strong dialogue
- Independent

**Fit Score: 70** — Platformer focus`,
    country: 'United States',
    region: 'North America',
    tags: ['platformer', 'shantae', 'character', 'valencia', 'independent'],
    fit: 70,
  },
  {
    company: 'Double Fine Productions',
    website: 'https://www.doublefine.com',
    notes: `Tim Schafer's legendary adventure studio.

**Location:** San Francisco, California
**Founded:** 2000
**Founder:** Tim Schafer (LucasArts legend)
**Owner:** Xbox Game Studios

**Games:**
- Psychonauts 1 & 2 — Narrative platformer
- Broken Age — Point-and-click adventure
- Day of the Tentacle Remastered

**Why Important:**
- Tim Schafer = adventure game legend
- LucasArts adventure heritage
- Strong character writing

**Fit Score: 82** — Adventure game legends`,
    country: 'United States',
    region: 'North America',
    tags: ['adventure', 'psychonauts', 'tim-schafer', 'xbox', 'san-francisco', 'lucasarts'],
    fit: 82,
  },
  {
    company: 'Harebrained Schemes',
    website: 'https://harebrained-schemes.com',
    notes: `Narrative tactics specialists.

**Location:** Seattle, Washington
**Founders:** Jordan Weisman (BattleTech, Shadowrun creator)
**Owner:** Paradox Interactive

**Games:**
- Shadowrun Returns/Dragonfall/Hong Kong — Narrative cyberpunk RPG
- BattleTech — Story campaign

**Why Perfect for LoreWeaver:**
- Shadowrun = rich narrative RPG
- Dialogue-heavy tactics
- Branching stories

**Fit Score: 85** — Narrative tactics RPG`,
    country: 'United States',
    region: 'North America',
    tags: ['rpg', 'tactics', 'shadowrun', 'battletech', 'seattle', 'paradox'],
    fit: 85,
  },
  {
    company: 'Crate Entertainment',
    website: 'https://www.crateentertainment.com',
    notes: `Action RPG studio with narrative focus.

**Location:** Massachusetts
**Founded:** 2008 (ex-Iron Lore)

**Games:**
- Grim Dawn — Action RPG with lore
- Farthest Frontier

**Why Consider:**
- ARPG with deep lore
- World-building focus

**Fit Score: 68** — ARPG focus`,
    country: 'United States',
    region: 'North America',
    tags: ['arpg', 'grim-dawn', 'lore', 'massachusetts'],
    fit: 68,
  },
  {
    company: 'Failbetter Games',
    website: 'https://www.failbettergames.com',
    notes: `UK studio but worth noting — narrative game pioneers.

Note: Actually UK-based, but influential in US market.

**Games:**
- Fallen London — Browser narrative game
- Sunless Sea/Skies — Narrative roguelite

**Why Important:**
- "Quality-Based Narrative" system
- Narrative gameplay pioneers

Skip if UK-only focus.`,
    country: 'United States',
    region: 'North America',
    tags: ['narrative', 'fallen-london', 'sunless', 'roguelite'],
    fit: 0, // Skip - actually UK
  },
  {
    company: 'Thekla Inc',
    website: 'https://thekla.com',
    notes: `Jonathan Blow's studio.

**Location:** San Francisco, California
**Founder:** Jonathan Blow (Braid, The Witness)

**Games:**
- Braid — Puzzle platformer with narrative
- The Witness — Puzzle exploration

**Why Consider:**
- Innovative storytelling through gameplay
- Puzzle-narrative integration

**Fit Score: 65** — Puzzle focus`,
    country: 'United States',
    region: 'North America',
    tags: ['puzzle', 'braid', 'witness', 'jonathan-blow', 'san-francisco'],
    fit: 65,
  },
];

async function importStudios() {
  console.log(`\n🇺🇸 Importing ${usaStudios.length} USA studios...\n`);
  
  const now = admin.firestore.Timestamp.now();
  let imported = 0;
  let skipped = 0;
  
  for (const studio of usaStudios) {
    // Skip entries with fit 0 (marked for skip)
    if (studio.fit === 0) {
      console.log(`⏭️  Skipping ${studio.company} (marked skip)`);
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
  console.log('🇺🇸 USA import complete!\n');
}

importStudios()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
