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

const balticStudios: Partial<Lead>[] = [
  // LITHUANIA
  {
    company: 'Nordcurrent',
    website: 'https://nordcurrent.com',
    notes: `Lithuania's largest game developer/publisher. Makes narrative-driven games at massive scale.

**Location:** Vilnius
**Founded:** 2002
**Stats:** 50+ games, 500M+ players worldwide

**Narrative Games:**
- **Murder in the Alps** — Detective narrative game
- **Eriksholm** — "Isometric, narrative-driven stealth game"

**Other Hits:**
- Cooking Fever — 500M+ downloads
- Airplane Chefs, Pocket Styler

**Recent:** Acquired River End Games (Sweden) in 2023

**Why PERFECT for LoreWeaver:**
- Multiple narrative-driven titles
- "Narrative-driven stealth" = explicit focus
- Detective games = dialogue heavy
- Massive scale publisher
- LGDA member

**Fit Score: 90** — Narrative games at scale`,
    country: 'Lithuania',
    region: 'Europe',
    tags: ['publisher', 'narrative', 'detective', 'mobile', 'vilnius', 'lgda', 'stealth'],
    fit: 90,
  },
  {
    company: 'Sneaky Box',
    website: '',
    notes: `Lithuanian indie studio listed as "successful local company."

**Location:** Lithuania

**Why Consider:**
- Part of thriving Lithuanian gamedev ecosystem
- Listed alongside Nordcurrent, Estoty, TutoTOONS

**Fit Score: 65** — Local success, limited public info`,
    country: 'Lithuania',
    region: 'Europe',
    tags: ['indie', 'lithuania'],
    fit: 65,
  },
  {
    company: 'Estoty',
    website: '',
    notes: `Lithuanian mobile game studio with educational arm.

**Location:** Lithuania

**Also Runs:** Estoty School — Mobile game development courses

**Why Consider:**
- Established presence
- Educational influence
- Mobile focus

**Fit Score: 55** — Mobile focus, training influence`,
    country: 'Lithuania',
    region: 'Europe',
    tags: ['mobile', 'education', 'lithuania'],
    fit: 55,
  },
  // LATVIA
  {
    company: 'Soaphog Game Studio',
    website: '',
    notes: `Latvian indie studio. Won Latvian Game of the Year.

**Location:** Riga
**Team:** 8 people

**Games:**
- **Rezrog** — Roguelike dungeon crawler
  - WON Latvian "Game of the Year"
  - ~4 years development

**Why Perfect for LoreWeaver:**
- Dungeon crawler = character/quest narrative
- Award-winning quality
- Established 8-person team

**Fit Score: 75** — Award-winning dungeon crawler`,
    country: 'Latvia',
    region: 'Europe',
    tags: ['indie', 'roguelike', 'dungeon-crawler', 'award-winning', 'riga'],
    fit: 75,
  },
  {
    company: 'Hypercell Games',
    website: 'https://hypercell.games',
    notes: `Latvian mobile game company with massive reach.

**Location:** Riga
**Reach:** Hundreds of millions of players

**Focus:** Mobile game development

**Why Consider:**
- Massive player reach
- Mobile casual focus
- Riga presence

**Fit Score: 55** — Mobile casual, less narrative depth`,
    country: 'Latvia',
    region: 'Europe',
    tags: ['mobile', 'casual', 'riga', 'scale'],
    fit: 55,
  },
  // ESTONIA
  {
    company: 'Rhea Games',
    website: 'https://gamedevestonia.ee/database/rhea-games',
    notes: `Estonian indie studio focused on meaningful games.

**Location:** Estonia

**Mission:** "Crafting meaningful and impactful games"

**Why Perfect for LoreWeaver:**
- Explicit "meaningful and impactful" mission
- Aligns with narrative-first development
- Early stage = tool adoption potential

**Fit Score: 78** — Meaningful games mission`,
    country: 'Estonia',
    region: 'Europe',
    tags: ['indie', 'meaningful', 'narrative', 'tallinn'],
    fit: 78,
  },
  {
    company: 'Sign Narva',
    website: 'https://gamedevestonia.ee/database/sign-narva',
    notes: `Estonian VR game studio.

**Location:** Narva, Estonia

**Focus:** VR games with cutting-edge technology + gameplay

**Why Consider:**
- VR = immersive narrative potential
- Cutting-edge tech adoption
- Estonian tech hub presence

**Fit Score: 65** — VR narrative potential`,
    country: 'Estonia',
    region: 'Europe',
    tags: ['vr', 'immersive', 'narva'],
    fit: 65,
  },
  {
    company: 'Placeholder Gameworks',
    website: '',
    notes: `Estonian serious games studio.

**Location:** Estonia

**Focus:** Serious games (educational/training)

**Presence:** GDC 2025

**Why Consider:**
- Serious games = educational narrative
- GDC presence = industry connection

**Fit Score: 65** — Serious games, educational narrative`,
    country: 'Estonia',
    region: 'Europe',
    tags: ['serious-games', 'education', 'tallinn'],
    fit: 65,
  },
  {
    company: 'Venomite Studios',
    website: '',
    notes: `Estonian Unity game studio with 10+ years experience.

**Location:** Tallinn
**Founded:** 2014
**Engine:** Unity

**Focus:** Big game projects

**Why Consider:**
- 10+ years experience
- Unity expertise
- Proven track record

**Fit Score: 60** — Established, Unity focus`,
    country: 'Estonia',
    region: 'Europe',
    tags: ['unity', 'tallinn', 'established'],
    fit: 60,
  },
  {
    company: 'Mars Games',
    website: 'https://gamedevestonia.ee/database/mars-games',
    notes: `Estonian indie studio focused on innovation.

**Location:** Estonia

**Mission:** "Disrupt and innovate in the video game market"

**Why Consider:**
- Innovation-focused
- Growing studio

**Fit Score: 60** — Innovation focus`,
    country: 'Estonia',
    region: 'Europe',
    tags: ['indie', 'innovation', 'tallinn'],
    fit: 60,
  },
  {
    company: 'HRA Interactive',
    website: 'https://gamedevestonia.ee/database/hra-interactive',
    notes: `Estonian boutique studio founded 2023.

**Location:** Estonia
**Founded:** 2023
**Structure:** "Small-by-design" — built for solo, duo, trio projects

**Why Consider:**
- Boutique approach
- New studio = tool adoption
- Focused team structure

**Fit Score: 62** — Boutique, new studio`,
    country: 'Estonia',
    region: 'Europe',
    tags: ['indie', 'boutique', 'new', 'tallinn'],
    fit: 62,
  },
];

async function importStudios() {
  console.log(`\n🇪🇪🇱🇻🇱🇹 Importing ${balticStudios.length} Baltic studios...\n`);
  
  const now = admin.firestore.Timestamp.now();
  let imported = 0;
  let skipped = 0;
  
  for (const studio of balticStudios) {
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
  console.log('🇪🇪🇱🇻🇱🇹 Baltics import complete!\n');
}

importStudios()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
