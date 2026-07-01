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

const latamStudios2: Partial<Lead>[] = [
  // CHILE
  {
    company: 'This I Dreamt',
    website: 'https://thisidreamt.com',
    notes: `Narrative-focused JRPG studio.

**Location:** Santiago, Chile
**Team:** 3-person indie team
- Camila Gormaz (artist)
- Pablo Videla (game designer)
- Camilo Valderrama (programmer)
**Publisher:** Serenity Forge

**Mission:** "A Narrative focused indie Game Studio"

**Games:**
- Long Gone Days — "Story-driven, turn-based JRPG"
  - Steam tags: Story Rich, Narrative, Visual Novel, Choices Matter, Emotional
  - Military/political themes
  - Visual novel elements

**Why PERFECT FIT for LoreWeaver:**
- EXPLICIT "Narrative focused" mission
- "Story-driven" explicit
- JRPG + visual novel hybrid
- Small team = perfect Architect customer

**Fit Score: 95** — Narrative-first mission, story-driven JRPG`,
    country: 'Chile',
    region: 'South America',
    tags: ['narrative', 'jrpg', 'visual-novel', 'santiago', 'story-rich', 'choices-matter'],
    fit: 95,
  },
  {
    company: 'IguanaBee',
    website: 'https://iguanabee.com',
    notes: `Veteran Chilean game studio.

**Location:** Chile
**Founded:** 12+ years experience
**Publisher:** Sony (MonsterBag)

**Games:**
- What Lies in the Multiverse — Narrative puzzle platformer (with Studio Voyager)
- MonsterBag — Stealth adventure (Sony Vita)
- Headsnatchers
- Skull Island: Rise of Kong

**Why Perfect for LoreWeaver:**
- Multiverse = narrative-driven puzzle game
- 12 years experience
- Sony partnership history

**Fit Score: 78** — Narrative platformer, veteran studio`,
    country: 'Chile',
    region: 'South America',
    tags: ['platformer', 'narrative', 'chile', 'sony', 'puzzle', 'veteran'],
    fit: 78,
  },
  {
    company: 'Micropsia Games',
    website: 'https://micropsiagames.com',
    notes: `Steampunk adventure studio.

**Location:** Santiago, Chile

**Games:**
- The Watchmaker — Steampunk puzzle adventure
  - "Strikingly imaginative steampunk world"
  - Bizarre mechanical creatures

**Why Perfect for LoreWeaver:**
- Adventure game focus
- Imaginative worldbuilding

**Fit Score: 75** — Puzzle adventure`,
    country: 'Chile',
    region: 'South America',
    tags: ['adventure', 'puzzle', 'steampunk', 'santiago', 'indie'],
    fit: 75,
  },
  {
    company: 'BURA',
    website: 'https://www.bura.cl',
    notes: `Santiago indie studio (related to This I Dreamt).

**Location:** Santiago, Chile

**Games:**
- Long Gone Days — "2D modern-day military JRPG with visual novel elements and dystopian fiction"

**Why Perfect for LoreWeaver:**
- Visual novel + JRPG hybrid
- Dystopian narrative

**Fit Score: 85** — JRPG + visual novel`,
    country: 'Chile',
    region: 'South America',
    tags: ['jrpg', 'visual-novel', 'santiago', 'indie', 'military'],
    fit: 85,
  },
  {
    company: 'Octeto Studios',
    website: 'https://octeto.cl',
    notes: `Santiago indie game developer.

**Location:** Santiago, Chile

**Why Consider:**
- Chilean indie scene
- Santiago hub

**Fit Score: 60** — TBD focus`,
    country: 'Chile',
    region: 'South America',
    tags: ['indie', 'santiago', 'chile'],
    fit: 60,
  },
  {
    company: 'Raincup Games',
    website: 'https://www.raincupgames.com',
    notes: `Non-violent indie studio.

**Location:** Chile

**Mission:** "Memorable and non-violent indie video games developed with love from Chile"

**Why Consider:**
- Wholesome gaming focus
- Narrative potential

**Fit Score: 68** — Non-violent focus`,
    country: 'Chile',
    region: 'South America',
    tags: ['indie', 'non-violent', 'chile', 'wholesome'],
    fit: 68,
  },
  // COLOMBIA
  {
    company: 'Dreams Uncorporated',
    website: 'https://dreamsuncorporated.com',
    notes: `Colombian JRPG studio — Cris Tales creators.

**Location:** Colombia
**Founded:** With SYCK
**Publisher:** Modus Games

**Games:**
- Cris Tales — "Tribute to classic JRPGs" (Final Fantasy, Chrono Trigger, Persona)
  - Colombian cultural references
  - Turn-based RPG
  - E3 2019 announcement
- Prisma RPG (upcoming) — Multiverse gameplay

**Why PERFECT FIT for LoreWeaver:**
- Classic JRPG structure
- "Latin American references with classic JRPG"
- Colombian cultural authenticity
- Story-driven turn-based

**Fit Score: 92** — JRPG specialists, Colombian cultural games`,
    country: 'Colombia',
    region: 'South America',
    tags: ['jrpg', 'narrative', 'colombia', 'chrono-trigger', 'cultural', 'turn-based'],
    fit: 92,
  },
  {
    company: 'Brainz',
    website: 'https://brainz.co',
    notes: `Colombian narrative mobile studio.

**Location:** Colombia

**Mission:** "Creating narrative original IP through high production value mobile game"
- Great reception from critics and players

**Why Perfect for LoreWeaver:**
- "Narrative original IP" explicit
- High production value
- Mobile narrative

**Fit Score: 82** — Narrative mobile IP`,
    country: 'Colombia',
    region: 'South America',
    tags: ['narrative', 'mobile', 'colombia', 'original-ip'],
    fit: 82,
  },
  {
    company: 'Indie Level Studio',
    website: 'https://indielevelstudio.com',
    notes: `Colombian puzzle/adventure studio.

**Location:** Colombia

**Focus:** Puzzle and adventure games
**Awards:** IGF nominations

**Why Perfect for LoreWeaver:**
- Adventure game focus
- Award recognition

**Fit Score: 75** — Puzzle adventure`,
    country: 'Colombia',
    region: 'South America',
    tags: ['adventure', 'puzzle', 'colombia', 'awards'],
    fit: 75,
  },
  {
    company: 'Timba Games',
    website: 'https://timbagames.com',
    notes: `Colombian game studio.

**Location:** Colombia
**Size:** 3,100+ LinkedIn followers

**Mission:** "We love making games and spreading the knowledge"
- "Pushing entertainment and videogames industry in Colombia and Latin America"

**Why Consider:**
- Colombian game dev ecosystem builder
- Knowledge sharing

**Fit Score: 65** — TBD focus`,
    country: 'Colombia',
    region: 'South America',
    tags: ['colombia', 'indie', 'community'],
    fit: 65,
  },
  {
    company: 'Madbricks',
    website: 'https://madbricks.com',
    notes: `Colombian co-dev studio (Amber acquired).

**Location:** Bogotá, Colombia
**Acquired by:** Amber (2025)
**Experience:** 10+ years

**Focus:** Co-development across multiple genres and platforms

**Why Consider:**
- Large talent pool
- Multi-genre experience

**Fit Score: 62** — Co-dev focus`,
    country: 'Colombia',
    region: 'South America',
    tags: ['co-dev', 'bogota', 'colombia', 'amber'],
    fit: 62,
  },
  // PERU
  {
    company: 'LEAP Game Studios',
    website: 'https://leapgs.com',
    notes: `Peruvian indie studio.

**Location:** Lima, Peru

**Why Consider:**
- Peruvian indie presence
- Adventure focus

**Fit Score: 65** — Peru presence`,
    country: 'Peru',
    region: 'South America',
    tags: ['indie', 'lima', 'peru', 'adventure'],
    fit: 65,
  },
  // URUGUAY
  {
    company: 'Pomelo Games',
    website: 'https://pomelogames.com',
    notes: `Uruguayan mobile/indie studio.

**Location:** Uruguay

**Games:**
- Once Upon a Tower
- Various mobile titles

**Why Consider:**
- Uruguayan presence
- Mobile expertise

**Fit Score: 60** — Mobile focus`,
    country: 'Uruguay',
    region: 'South America',
    tags: ['mobile', 'uruguay', 'indie'],
    fit: 60,
  },
  // VENEZUELA (notable given challenges)
  {
    company: 'Nukefist',
    website: 'https://nukefist.com',
    notes: `Venezuelan fighting game studio.

**Location:** Venezuela

**Games:**
- Omen of Sorrow — Gothic horror fighting game

**Why Consider:**
- Venezuelan resilience
- Fighting game with narrative

**Fit Score: 55** — Fighting game focus`,
    country: 'Venezuela',
    region: 'South America',
    tags: ['fighting', 'venezuela', 'horror'],
    fit: 55,
  },
];

async function importStudios() {
  console.log(`\n🌎 Importing ${latamStudios2.length} Latin America Part 2 studios...\n`);
  
  const now = admin.firestore.Timestamp.now();
  let imported = 0;
  let skipped = 0;
  
  for (const studio of latamStudios2) {
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
  console.log('🌎 Latin America Part 2 import complete!\n');
}

importStudios()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
