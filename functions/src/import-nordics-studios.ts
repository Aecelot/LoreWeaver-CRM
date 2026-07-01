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

const nordicStudios: Partial<Lead>[] = [
  // FINLAND
  {
    company: 'Remedy Entertainment',
    website: 'https://www.remedygames.com',
    notes: `Finnish studio that BUILT THEIR OWN NARRATIVE ENGINE. 30 years of story-driven games.

**Location:** Espoo, Finland
**Founded:** 1995
**Technology:** Created **Northlight Storytelling Engine**

**Mission:** "Known for STORY-DRIVEN and visually stunning action games"

**Games:**
- Max Payne series — Noir narrative
- Alan Wake (2010) — Writer protagonist
- Quantum Break — TV series + game hybrid
- Control (2019) — Remedy Connected Universe
- Alan Wake 2 (2023) — Critical masterpiece

**Why ULTIMATE FIT for LoreWeaver:**
- BUILT THEIR OWN ENGINE specifically for narrative
- "Narrative elements key to their prior games"
- Created "Remedy Connected Universe" (Alan Wake + Control)
- 30 years refining narrative tech
- Verge profile: "one of the most confounding studios in games"

**Fit Score: 99** — Built their own narrative engine!`,
    country: 'Finland',
    region: 'Europe',
    tags: ['narrative-engine', 'story-driven', 'aaa', 'alan-wake', 'control', 'espoo', 'northlight'],
    fit: 99,
  },
  {
    company: 'Random Potion',
    website: 'https://www.randompotion.com',
    notes: `Finnish indie studio adapting tabletop RPG to digital.

**Location:** Tampere, Finland
**Founded:** 2017

**Games:**
- Digital co-op RPG based on "The Dark Eye" (Germany's most popular tabletop RPG)

**Why Perfect for LoreWeaver:**
- Tabletop RPG adaptation = dialogue-heavy
- The Dark Eye = rich narrative system
- Co-op format
- Finnish indie quality

**Fit Score: 85** — Tabletop RPG adaptation, narrative-heavy`,
    country: 'Finland',
    region: 'Europe',
    tags: ['indie', 'rpg', 'tabletop', 'co-op', 'tampere', 'the-dark-eye'],
    fit: 85,
  },
  // SWEDEN
  {
    name: 'Thomas Grip',
    company: 'Frictional Games',
    website: 'https://frictionalgames.com',
    notes: `Swedish studio known for horror themes and NARRATIVE EXPERIENCES.

**Location:** Malmö, Sweden
**Founded:** 2007
**Founders:** Thomas Grip, Jens Nilsson

**Games:**
- Penumbra Series
- Amnesia: The Dark Descent — Defined survival horror genre
- SOMA — "Philosophical horror," existential sci-fi
- Amnesia: Rebirth, Amnesia: The Bunker

**Why PERFECT for LoreWeaver:**
- "Narrative-driven experience" explicit in mission
- Created entire horror narrative genre
- SOMA = 5 years developing "philosophical horror"
- "Existential dread and intellectual engagement"
- Minimal combat = all narrative

**Fit Score: 98** — Narrative horror masters`,
    country: 'Sweden',
    region: 'Europe',
    tags: ['horror', 'narrative', 'philosophical', 'soma', 'amnesia', 'malmö'],
    fit: 98,
  },
  {
    name: 'Josef Fares',
    company: 'Hazelight Studios',
    website: 'https://www.hazelight.se',
    notes: `Swedish studio founded by film director. GAME OF THE YEAR winner.

**Location:** Stockholm, Sweden
**Founded:** 2014
**Founder:** Josef Fares (former film director)
**Publisher:** EA Originals

**Games:**
- A Way Out (2018) — First co-op only third-person adventure
- It Takes Two (2021) — WON GAME OF THE YEAR
- Split Fiction (2025) — Sci-fi + fantasy co-op

**Why PERFECT for LoreWeaver:**
- Film director = cinematic narrative expertise
- GOTY winner (It Takes Two)
- All games = co-op narrative adventures
- "Intense collaboration" gameplay = character relationships
- "Pushing creative boundaries"

**Fit Score: 98** — GOTY co-op narrative adventures`,
    country: 'Sweden',
    region: 'Europe',
    tags: ['co-op', 'narrative', 'goty', 'film-director', 'ea-originals', 'stockholm'],
    fit: 98,
  },
  {
    company: 'Tarsier Studios',
    website: 'https://www.tarsierstudios.com',
    notes: `Swedish studio creating atmospheric horror adventures.

**Location:** Malmö, Sweden
**Publisher:** THQ Nordic (Embracer)

**Games:**
- Little Nightmares (2017) — Horror adventure classic
- Little Nightmares II (2021)
- REANIMAL (Feb 2026) — Co-op horror adventure

**Why Perfect for LoreWeaver:**
- "Haunting stories reminiscent of Norse mythology"
- Atmospheric environmental storytelling
- Little Nightmares = visual narrative masterclass
- Co-op horror adventures

**Fit Score: 92** — Atmospheric horror narrative`,
    country: 'Sweden',
    region: 'Europe',
    tags: ['horror', 'narrative', 'little-nightmares', 'atmospheric', 'malmö', 'thq-nordic'],
    fit: 92,
  },
  {
    company: 'Valiant Game Studio',
    website: 'https://valiantgamestudio.com',
    notes: `Swedish indie studio creating episodic adventure games.

**Location:** Stockholm, Sweden

**Games:**
- Pendula Swing — Episodic adventure, fantasy 1920s America

**Also:** Services for independent games industry

**Why Consider:**
- Episodic adventure format
- Fantasy narrative focus
- Indie services provider

**Fit Score: 80** — Episodic narrative adventure`,
    country: 'Sweden',
    region: 'Europe',
    tags: ['indie', 'episodic', 'adventure', 'fantasy', 'stockholm'],
    fit: 80,
  },
  // DENMARK
  {
    name: 'Arnt Jensen',
    company: 'Playdead',
    website: 'https://playdead.io',
    notes: `Danish studio that won "Breakthroughs in Storytelling" award.

**Location:** Copenhagen, Denmark
**Founded:** 2006
**Founders:** Arnt Jensen, Dino Patti

**Games:**
- LIMBO (2010) — Dark puzzle platformer, critical acclaim
- INSIDE (2016) — WON "Breakthroughs in Storytelling" award
- Next Game — 3rd-person sci-fi adventure (in development)

**Why PERFECT for LoreWeaver:**
- Won "BREAKTHROUGHS IN STORYTELLING" award
- Visual/environmental storytelling masters
- "Darkly funny and filled with macabre surprises"
- Next game = full narrative adventure

**Fit Score: 95** — Storytelling breakthrough award winners`,
    country: 'Denmark',
    region: 'Europe',
    tags: ['narrative', 'storytelling-award', 'limbo', 'inside', 'copenhagen', 'environmental'],
    fit: 95,
  },
  {
    company: 'IO Interactive',
    website: 'https://www.ioi.dk',
    notes: `Danish AAA studio creating immersive sims and major IP.

**Location:** Copenhagen, Denmark

**Games:**
- Hitman series — Immersive sim with narrative
- Project 007 — James Bond game (in development)

**Why Consider:**
- Immersive sim = emergent narrative
- James Bond = major narrative IP
- AAA scale and quality
- Copenhagen presence

**Fit Score: 80** — Immersive sim + Bond IP`,
    country: 'Denmark',
    region: 'Europe',
    tags: ['aaa', 'immersive-sim', 'hitman', 'james-bond', 'copenhagen'],
    fit: 80,
  },
  {
    company: 'Niila Games',
    website: 'https://niila.io',
    notes: `Danish studio creating narrative-driven digital comics and mobile games.

**Location:** Copenhagen, Denmark

**Focus:** "Narrative driven digital comics" + mobile games

**Why Consider:**
- Explicit "narrative driven digital comics" focus
- Mobile + narrative hybrid
- Copenhagen indie scene

**Fit Score: 75** — Narrative digital comics`,
    country: 'Denmark',
    region: 'Europe',
    tags: ['mobile', 'narrative', 'digital-comics', 'copenhagen'],
    fit: 75,
  },
  // NORWAY
  {
    company: 'Funcom',
    website: 'https://www.funcom.com',
    notes: `Norwegian studio legendary for narrative adventures. 26+ years experience.

**Location:** Oslo, Norway (+ Durham, NC)
**Founded:** 1993

**Specialization:** MMORPGs, sandbox survival, "narrative-driven adventures"

**Games:**
- **The Longest Journey** series — LEGENDARY narrative adventure
- Dreamfall, Dreamfall Chapters
- The Secret World — Story-driven MMO
- Age of Conan, Anarchy Online, Conan Exiles

**Why PERFECT for LoreWeaver:**
- The Longest Journey = LEGENDARY narrative franchise
- "Narrative-driven adventures" explicit focus
- 26+ years of narrative experience
- MMO narrative expertise

**Fit Score: 92** — The Longest Journey legends`,
    country: 'Norway',
    region: 'Europe',
    tags: ['narrative', 'adventure', 'mmo', 'longest-journey', 'oslo', 'legendary'],
    fit: 92,
  },
  {
    company: 'Hyper Games',
    website: '',
    notes: `Norwegian studio behind Snufkin narrative adventure.

**Location:** Norway

**Games:**
- Snufkin: Melody of Moominvalley — Narrative adventure based on Moomin

**Why Consider:**
- Recent narrative hit
- Moomin IP = storytelling
- Norwegian indie

**Fit Score: 75** — Narrative adventure hit`,
    country: 'Norway',
    region: 'Europe',
    tags: ['indie', 'narrative', 'adventure', 'moomin', 'oslo'],
    fit: 75,
  },
];

async function importStudios() {
  console.log(`\n🇸🇪🇫🇮🇩🇰🇳🇴 Importing ${nordicStudios.length} Nordic studios...\n`);
  
  const now = admin.firestore.Timestamp.now();
  let imported = 0;
  let skipped = 0;
  
  for (const studio of nordicStudios) {
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
  console.log('🇸🇪🇫🇮🇩🇰🇳🇴 Nordics import complete!\n');
}

importStudios()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
