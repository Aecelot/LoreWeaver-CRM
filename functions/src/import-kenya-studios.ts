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

const kenyaStudios: Partial<Lead>[] = [
  {
    name: 'Max Musau',
    company: 'Jiwe Studio',
    email: '',
    website: 'https://jiwe.studio',
    status: 'new',
    source: 'research',
    notes: `Nairobi-based story-driven game studio. "Creating the most distinctive African story-driven games and experiences."

**Leadership:**
- Max Musau — CEO & Chief Sculptor
- Wendi Ndaki — Writer
- Marc Rigaudis — Creative Director

**Games:**
- USAWA — Afro-Futurist serious game (Fak'ugesi 2024 nominee)
- Usoni — Post-apocalyptic action-adventure
- Ophelia's Escape & Betrayal — Narrative adventure
- Multiple historical and environmental games

**Community Work:**
- Jiwe Community Game Jams 2025 — 4-month program across 4 African countries
- Exhibited at Guildford Games Festival (UK)
- Partnership with Blackhards
- Supporting Mwanzo Award for African games

**Why PERFECT for LoreWeaver:**
- Explicit "story-driven" mission statement
- Dedicated Writer on team = narrative-first development
- Multiple narrative titles in portfolio
- Building pan-African ecosystem
- Early-stage = open to adopting tools

**Fit Score: 92** — Story-driven mission, dedicated narrative team`,
    country: 'Kenya',
    region: 'Africa',
    tags: ['indie', 'narrative', 'story-driven', 'afro-futurist', 'nairobi', 'ecosystem'],
    fit: 92,
  },
  {
    name: '',
    company: 'Usiku Games',
    email: '',
    website: 'https://usiku.games',
    status: 'new',
    source: 'research',
    notes: `Nairobi game studio focused on #GamingForGood movement. Runs Africa's first games-focused co-working space.

**Games:**
- Jam Noma, Okoa Simba, Beat a Boda Boda
- Electric Blue gecko conservation game
- GIZ/African Union strategy game
- Kenya Communications Authority online safety game

**Key Facts:**
- Runs **Nairobi Game Development Center** — Africa's first game-focused co-working space
- Co-founders of **PAGG (Pan-Africa Gaming Group)**
- NVIDIA Inception member
- Focus on impact/serious games

**Why Consider:**
- Ecosystem leader — influences many African studios
- Serious/impact games have educational narrative needs
- NVIDIA partnership shows tech adoption appetite
- Could recommend Architect to NGDC member studios

**Fit Score: 75** — Impact games focus, but valuable ecosystem influence`,
    country: 'Kenya',
    region: 'Africa',
    tags: ['serious-games', 'impact', 'ecosystem', 'nairobi', 'nvidia', 'co-working', 'pagg'],
    fit: 75,
  },
];

async function importStudios() {
  console.log(`\n🇰🇪 Importing ${kenyaStudios.length} Kenya studios...\n`);
  
  const now = admin.firestore.Timestamp.now();
  let imported = 0;
  let skipped = 0;
  
  for (const studio of kenyaStudios) {
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
  console.log('🇰🇪 Kenya import complete!\n');
}

importStudios()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
