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

const ghanaStudios: Partial<Lead>[] = [
  {
    name: 'Eyram Tawia',
    company: 'Leti Arts',
    email: '',
    website: 'https://www.letiarts.com',
    status: 'new',
    source: 'research',
    notes: `Ghana's pioneering African mythology game studio. Founded 2009. "Meaningful African games since 2009."

**Founder/CEO:** Eyram Tawia
**Team:** 10 full-time employees
**Offices:** Accra (Ghana) + Nairobi (Kenya)

**Mission:** "Reviving Africa's culture and heritage, delving into ancient tales, sharing them with a modern, enchanting twist"

**Key Stat:** "1260 African stories to be told" — massive narrative backlog

**Games:**
- Africa's Legends (Reawakening) — African mythology multiplayer puzzle-fighter
- Puzzle Scout — Word puzzles with African legends
- Karmzah — Empowering comic-based game
- **Karmzah: Blitz Racers — IN FORTNITE!** (Code: 6179-5875-1659)
- Ananse: The Origin — West African folklore hero
- Sweave — African-inspired patterns

**Upcoming:**
- VR experience
- Karmzah Run

**Also:**
- Afrocomix app — African comics/animations hub
- Leti Consulting — Game design, animation, character design

**Affiliations:**
- NVIDIA Inception member
- PAGG (Pan-Africa Gaming Group) member
- Gamescom 2025 exhibitor
- Harambe Entrepreneur Alliance

**Why PERFECT for LoreWeaver:**
- "1260 African stories to tell" = massive Architect potential
- African mythology specialists (Ananse, Africa's Legends)
- Character-driven narrative universe
- 10+ years experience
- Consulting arm = can recommend to clients
- Fortnite integration proves global platform reach

**Fit Score: 95** — African mythology masters, 1260+ story backlog`,
    country: 'Ghana',
    region: 'Africa',
    tags: ['mythology', 'narrative', 'african-folklore', 'ananse', 'accra', 'consulting', 'nvidia', 'fortnite', 'vr'],
    fit: 95,
  },
];

async function importStudios() {
  console.log(`\n🇬🇭 Importing ${ghanaStudios.length} Ghana studios...\n`);
  
  const now = admin.firestore.Timestamp.now();
  let imported = 0;
  let skipped = 0;
  
  for (const studio of ghanaStudios) {
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
  console.log('🇬🇭 Ghana import complete!\n');
}

importStudios()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
