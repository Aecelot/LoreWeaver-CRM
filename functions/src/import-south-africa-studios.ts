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

const southAfricaStudios: Partial<Lead>[] = [
  {
    name: '',
    company: 'Nyamakop',
    email: '',
    website: 'https://nyamakop.co.za',
    status: 'new',
    source: 'research',
    notes: `Award-winning South African indie studio creating "African-inspired games for a global audience."

**Games:**
- Semblance (2018) — "World's first true plat-former" with deformable terrain mechanics
- Relooted (Feb 10, 2026) — Upcoming roguelike

**Why Perfect for LoreWeaver:**
- Explicitly focused on African cultural narratives
- Innovative gameplay mechanics could pair with emergent storytelling
- Growing studio with indie spirit
- Cape Town based

**Fit Score: 82** — Strong narrative-cultural focus, unique African perspective`,
    country: 'South Africa',
    region: 'Africa',
    tags: ['indie', 'narrative', 'african-culture', 'platformer', 'cape-town'],
    fit: 82,
  },
  {
    name: '',
    company: 'Free Lives',
    email: '',
    website: 'https://freelives.net',
    status: 'new',
    source: 'research',
    notes: `South Africa's most successful indie studio. Published by Devolver Digital.

**Games:**
- Broforce (2015) — Overwhelmingly Positive, action platformer parody
- GORN (VR) — Physics-based VR combat
- Genital Jousting — Comedy/party game
- Terra Nil (2023) — Ecological restoration sim (narrative environmental)
- Anger Foot (2024) — FPS roguelike
- Stick It to the Stickman (2025) — Roguelike brawler

**Why Consider:**
- Largest SA studio with global reach
- Terra Nil shows capacity for thoughtful, narrative-adjacent design
- Strong Devolver relationship = industry connections
- Action-heavy but with satirical storytelling hooks

**Fit Score: 75** — Action-focused but narrative potential in satire/world-building`,
    country: 'South Africa',
    region: 'Africa',
    tags: ['indie', 'action', 'devolver', 'cape-town', 'physics', 'satirical'],
    fit: 75,
  },
  {
    name: '',
    company: 'Yellow Lab Games',
    email: '',
    website: 'https://store.steampowered.com/app/2221780/Metavoidal/',
    status: 'new',
    source: 'research',
    notes: `Cape Town indie studio, acquired by Reforged Studios (Malta) in December 2024.

**Games:**
- Metavoidal (2025) — Pixel art roguelite brawler. "Play as a drummer fighting their way out of a corrupted band and their cult."

**Publisher:** Astrolabe Games

**Why Consider:**
- First PC/console title — early stage, open to tools
- Narrative framing (corrupted band cult) shows storytelling interest
- Now part of larger Reforged group — could influence multiple studios

**Fit Score: 70** — New entrant with narrative hooks in roguelite structure`,
    country: 'South Africa',
    region: 'Africa',
    tags: ['indie', 'roguelite', 'pixel-art', 'cape-town', 'acquired'],
    fit: 70,
  },
  {
    name: '',
    company: 'QCF Design',
    email: '',
    website: 'https://www.qcfdesign.com',
    status: 'new',
    source: 'research',
    notes: `Cape Town studio known for Desktop Dungeons.

**Games:**
- Desktop Dungeons (2013) — Award-winning puzzle roguelike
- Desktop Dungeons: Rewind — Expanded version

**Why Consider:**
- Strategy/puzzle roguelike with character progression
- Proven design chops
- Could benefit from NPC dialogue systems

**Fit Score: 65** — Less narrative focus but solid studio pedigree`,
    country: 'South Africa',
    region: 'Africa',
    tags: ['indie', 'roguelike', 'puzzle', 'cape-town', 'strategy'],
    fit: 65,
  },
];

async function importStudios() {
  console.log(`\n🇿🇦 Importing ${southAfricaStudios.length} South Africa studios...\n`);
  
  const now = admin.firestore.Timestamp.now();
  let imported = 0;
  let skipped = 0;
  
  for (const studio of southAfricaStudios) {
    // Check if already exists
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
  console.log('🇿🇦 South Africa import complete!\n');
}

importStudios()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
