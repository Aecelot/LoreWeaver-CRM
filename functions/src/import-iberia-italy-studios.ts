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

const studios: Partial<Lead>[] = [
  // SPAIN
  {
    company: 'Fictiorama Studios',
    website: 'https://www.fictiorama.com',
    notes: `Narrative-driven adventure studio — 3 brothers.

**Location:** Madrid, Spain
**Founded:** 2013
**Founders:** Mario, Alberto, Luis Oliván (brothers)

**Mission:** "Passion for narrative-driven games"
- "Visionary creative studio at the forefront of interactive storytelling"
- "Craft immersive worlds that captivate and inspire"

**Games:**
- Dead Synchronicity: Tomorrow Comes Today — "Dark point and click adventure"
  - "Space-time distortions, dystopian atmosphere, dark bloodstained plot"
- Do Not Feed the Monkeys (watching sim)

**Why PERFECT FIT for LoreWeaver:**
- EXPLICIT "narrative-driven games" passion
- "Interactive storytelling" mission
- Dark narrative adventure specialists
- Family studio = indie vibe

**Fit Score: 92** — Narrative adventure masters`,
    country: 'Spain',
    region: 'Europe',
    tags: ['narrative', 'adventure', 'point-and-click', 'madrid', 'brothers', 'dystopian'],
    fit: 92,
  },
  {
    company: 'Tequila Works',
    website: 'https://www.tequilaworks.com',
    notes: `Major Spanish narrative studio.

**Location:** Madrid, Spain
**Founded:** 2009
**Founder:** Raúl Rubio

**Games:**
- RiME — Emotional adventure, critical acclaim
- The Sexy Brutale — Narrative puzzle
- Gylt — Horror adventure
- Song of Nunu — League of Legends narrative spinoff

**Team includes:** Narrative Director (Michael Santorum)

**Why PERFECT FIT for LoreWeaver:**
- RiME = emotional storytelling
- Dedicated Narrative Director role
- Major narrative studio
- Riot Games partnership

**Fit Score: 90** — Emotional narrative adventures`,
    country: 'Spain',
    region: 'Europe',
    tags: ['narrative', 'adventure', 'rime', 'madrid', 'emotional', 'riot-games'],
    fit: 90,
  },
  {
    company: 'Pendulo Studios',
    website: 'https://www.pendulostudios.com',
    notes: `Classic Spanish adventure studio — Runaway series.

**Location:** Madrid, Spain
**Founded:** 1993
**Experience:** 30+ years

**Games:**
- Runaway saga — Classic adventure trilogy
- Yesterday
- Blacksad: Under the Skin

**Team includes:** Josué Monchán (Senior Narrative Designer, Writer & Localization Manager)

**Why PERFECT FIT for LoreWeaver:**
- 30 years adventure experience
- Runaway = narrative adventure legacy
- Dedicated Senior Narrative Designer
- Licensed IP (Blacksad)

**Fit Score: 88** — Adventure veterans, narrative expertise`,
    country: 'Spain',
    region: 'Europe',
    tags: ['adventure', 'narrative', 'runaway', 'madrid', 'veteran', 'licensed-ip'],
    fit: 88,
  },
  {
    company: 'Deconstructeam',
    website: 'https://deconstructeam.com',
    notes: `Cyberpunk narrative studio — The Red Strings Club.

**Location:** Spain
**Founded:** 2014

**Games:**
- The Red Strings Club — Cyberpunk narrative adventure
  - "Narrative experience about fate, freedom and happiness"
- Gods Will Be Watching
- Essays on Empathy

**Why PERFECT FIT for LoreWeaver:**
- "Narrative experience" explicit
- Philosophical themes
- Cyberpunk storytelling
- Critical acclaim

**Fit Score: 95** — Narrative experience pioneers`,
    country: 'Spain',
    region: 'Europe',
    tags: ['narrative', 'cyberpunk', 'adventure', 'philosophical', 'red-strings-club'],
    fit: 95,
  },
  {
    company: 'Chibig',
    website: 'https://chibig.com',
    notes: `Cozy adventure studio.

**Location:** Spain
**Focus:** Wholesome adventures

**Games:**
- Mika and the Witch Mountain — Cozy adventure
- Summer in Mara
- Koa and the Five Pirates of Mara

**Why Perfect for LoreWeaver:**
- Story-driven adventures
- Wholesome gaming

**Fit Score: 75** — Cozy adventure`,
    country: 'Spain',
    region: 'Europe',
    tags: ['adventure', 'cozy', 'spain', 'wholesome'],
    fit: 75,
  },
  {
    company: 'Gammera Nest',
    website: 'https://gammeranest.com',
    notes: `Museum collaboration adventure studio.

**Location:** Spain

**Games:**
- Nubla — Adventure with Thyssen Museum
- M, City in the Centre of the World

**Why Perfect for LoreWeaver:**
- Art/cultural narrative
- Museum partnerships

**Fit Score: 72** — Cultural narrative`,
    country: 'Spain',
    region: 'Europe',
    tags: ['adventure', 'cultural', 'museum', 'spain', 'art'],
    fit: 72,
  },
  {
    company: 'Mango Protocol',
    website: 'https://mangoprotocol.com',
    notes: `Art-focused studio.

**Location:** Spain
**Team includes:** Mariona Valls (Co-founder & Art Director)

**Why Consider:**
- Art-focused development
- Narrative panels participant

**Fit Score: 68** — Art focus`,
    country: 'Spain',
    region: 'Europe',
    tags: ['indie', 'art', 'spain'],
    fit: 68,
  },
  // ITALY
  {
    company: 'We Are Muesli',
    website: 'https://www.wearemuesli.it',
    notes: `Milan narrative specialists — cultural/historical themes.

**Location:** Milan, Italy

**Mission:** "Specializing in narrative games with cultural, historical and artistic themes"

**Why PERFECT FIT for LoreWeaver:**
- EXPLICIT "specializing in narrative games"
- Cultural/historical themes
- Milan-based

**Fit Score: 92** — Narrative specialists, cultural focus`,
    country: 'Italy',
    region: 'Europe',
    tags: ['narrative', 'cultural', 'historical', 'milan', 'artistic'],
    fit: 92,
  },
  {
    company: 'Caracal Games',
    website: 'https://www.caracalgames.com',
    notes: `Rome indie studio.

**Location:** Rome, Italy

**Mission:** "We develop indie games with creative gameplay and immersive stories"

**Why Perfect for LoreWeaver:**
- "Immersive stories" explicit
- Rome-based indie

**Fit Score: 82** — Immersive stories`,
    country: 'Italy',
    region: 'Europe',
    tags: ['narrative', 'indie', 'rome', 'stories'],
    fit: 82,
  },
  {
    company: 'Jyamma Games',
    website: 'https://jyammagames.com',
    notes: `Milan AAA indie — Dante RPG.

**Location:** Milan, Italy

**Games:**
- Enotria: The Last Song — Soulslike
- La Divina Commedia — Dark fantasy action-RPG (Dante inspired)
  - Announced at Gamescom 2025

**Why Perfect for LoreWeaver:**
- La Divina Commedia = literary narrative
- Italian cultural adaptation
- AAA ambitions

**Fit Score: 78** — Literary RPG`,
    country: 'Italy',
    region: 'Europe',
    tags: ['rpg', 'soulslike', 'milan', 'dante', 'literary'],
    fit: 78,
  },
  {
    company: 'Fumble GDR',
    website: 'https://fumblegdr.it',
    notes: `Italian narrative TTRPG studio.

**Location:** Italy
**Publisher:** MS Edizioni (via Ares Games)

**Games:**
- Green Oaks
- Five Days
- Last Resort

**Focus:** "Narrative" focused TTRPG

**Why Perfect for LoreWeaver:**
- Narrative TTRPG expertise
- Story design skills

**Fit Score: 70** — TTRPG focus`,
    country: 'Italy',
    region: 'Europe',
    tags: ['ttrpg', 'narrative', 'italy'],
    fit: 70,
  },
  {
    company: 'Twin Wolves Studio',
    website: 'https://twinwolves-studio.com',
    notes: `Italian indie studio.

**Location:** Italy

**Focus:** Digital interactive entertainment

**Fit Score: 60** — TBD`,
    country: 'Italy',
    region: 'Europe',
    tags: ['indie', 'italy'],
    fit: 60,
  },
  {
    company: 'Lunar Great Wall Studios',
    website: 'https://lunargreatwall.com',
    notes: `Milan indie studio.

**Location:** Milan, Italy
**Founded:** 2016
**Founder:** Marco Ponte

**Fit Score: 62** — Milan presence`,
    country: 'Italy',
    region: 'Europe',
    tags: ['indie', 'milan', 'italy'],
    fit: 62,
  },
  // PORTUGAL
  {
    company: 'Nerd Monkeys',
    website: 'https://nerdmonkeys.pt',
    notes: `Portuguese point-and-click adventure studio.

**Location:** Portugal

**Games:**
- Detective Case and Clown Bot in: Murder in the Hotel Lisbon — "Pixel art point-and-click adventure"
- Detective Case and Clown Bot in: The Express Killer — "Set in Portugal during the 80s"
- Out of Line

**Why PERFECT FIT for LoreWeaver:**
- Classic point-and-click
- Narrative mystery games
- Portuguese cultural setting

**Fit Score: 85** — Point-and-click adventure specialists`,
    country: 'Portugal',
    region: 'Europe',
    tags: ['adventure', 'point-and-click', 'portugal', 'mystery', 'pixel-art'],
    fit: 85,
  },
  {
    company: 'Doppio Games',
    website: 'https://doppio.games',
    notes: `Voice-activated narrative studio (Fortis acquired).

**Location:** Portugal
**Founded:** 2018
**Acquired by:** Fortis Games
**Investors:** Amazon, Google

**Focus:** "Voice-activated and narrative games"

**Why PERFECT for LoreWeaver:**
- EXPLICIT "narrative games" focus
- Voice = innovative narrative delivery
- Major investor backing

**Fit Score: 85** — Voice narrative innovation`,
    country: 'Portugal',
    region: 'Europe',
    tags: ['narrative', 'voice', 'portugal', 'amazon', 'google', 'innovative'],
    fit: 85,
  },
  {
    company: 'Studio Ellipsis',
    website: 'https://studioellipsis.com',
    notes: `FunPlus Lisbon studio — cross-platform storytelling.

**Location:** Lisbon, Portugal
**Founded:** 2024
**Owner:** FunPlus
**Lead:** Alexandre Amancio

**Mission:** "Cross-platform storytelling and immersive IP experiences"

**Why PERFECT for LoreWeaver:**
- "Cross-platform storytelling" explicit
- "Immersive IP experiences"
- Alexandre Amancio leadership
- AAA resources

**Fit Score: 88** — Cross-platform narrative, AAA backing`,
    country: 'Portugal',
    region: 'Europe',
    tags: ['narrative', 'storytelling', 'lisbon', 'funplus', 'cross-platform'],
    fit: 88,
  },
  {
    company: 'Battlesheep',
    website: 'https://battlesheep.pt',
    notes: `Lisbon indie studio.

**Location:** Lisbon, Portugal

**Focus:** Original and work-for-hire games for mobile and web

**Fit Score: 58** — Mobile/web focus`,
    country: 'Portugal',
    region: 'Europe',
    tags: ['mobile', 'web', 'lisbon', 'portugal'],
    fit: 58,
  },
  {
    company: 'Not a Game Studio',
    website: 'https://www.notagamestudio.com',
    notes: `Lisbon digital media atelier.

**Location:** Lisbon, Portugal

**Focus:** "Bridging conventional art with new emerging technologies"
- Game development background

**Fit Score: 65** — Digital art/games`,
    country: 'Portugal',
    region: 'Europe',
    tags: ['art', 'digital', 'lisbon', 'portugal'],
    fit: 65,
  },
];

async function importStudios() {
  console.log(`\n🇪🇸🇮🇹🇵🇹 Importing ${studios.length} Spain/Italy/Portugal studios...\n`);
  
  const now = admin.firestore.Timestamp.now();
  let imported = 0;
  let skipped = 0;
  
  for (const studio of studios) {
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
  console.log('🇪🇸🇮🇹🇵🇹 Spain/Italy/Portugal import complete!\n');
}

importStudios()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
