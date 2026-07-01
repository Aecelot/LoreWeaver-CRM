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

const northAfricaStudios: Partial<Lead>[] = [
  // Morocco
  {
    name: '',
    company: 'AJB Games Studio',
    email: '',
    website: 'https://ajbstudio.itch.io',
    status: 'new',
    source: 'research',
    notes: `Moroccan indie studio creating cultural/historical games.

**Games:**
- The Moroccan Castle Game — 3D adventure showcasing Moroccan culture and history

**Developer Focus:**
- Game design including level design, gameplay mechanics, and narrative
- Cultural heritage preservation through games

**Why Consider:**
- Moroccan cultural narrative focus
- 3D adventure with historical themes
- Explicit narrative design experience

**Fit Score: 70** — Moroccan cultural narrative focus`,
    country: 'Morocco',
    region: 'Africa',
    tags: ['indie', 'cultural', 'historical', 'narrative', 'moroccan', '3d-adventure'],
    fit: 70,
  },
  // Tunisia
  {
    name: 'Walid Sultan Midani',
    company: 'Digital Mania',
    email: '',
    website: 'https://www.digitalmaniastudio.com',
    status: 'new',
    source: 'research',
    notes: `Tunisia's FIRST independent video game studio. Founded 2012.

**Founder:** Walid Sultan Midani

**Key Facts:**
- Tunisia's first game studio = industry pioneer
- PAGG (Pan-Africa Gaming Group) member
- Multiplatform: Facebook, iOS, Android
- Featured in Vice documentary

**Why Consider:**
- Pioneer = industry influence in Tunisia
- PAGG member = pan-African connections
- Overcame early setbacks to persist

**Fit Score: 65** — Pioneer studio, mobile focus but ecosystem influence`,
    country: 'Tunisia',
    region: 'Africa',
    tags: ['mobile', 'pioneer', 'pagg', 'tunis', 'multiplatform'],
    fit: 65,
  },
  {
    name: '',
    company: 'NewGen Studio',
    email: 'bizdev@newgen-studio.com',
    website: 'https://www.newgen-studio.com',
    status: 'new',
    source: 'research',
    notes: `Tunisian indie studio focused on PC/Steam games.

**Location:** Mégrine, Tunisia
**Contact:** bizdev@newgen-studio.com, +216 52.888.435

**Focus:** Steam/PC games (not just mobile)

**Why Consider:**
- PC/Steam focus = better narrative potential than mobile-only
- More established pipeline
- Growing Tunisian scene

**Fit Score: 60** — PC/Steam focus, growing studio`,
    country: 'Tunisia',
    region: 'Africa',
    tags: ['indie', 'pc', 'steam', 'tunis'],
    fit: 60,
  },
];

async function importStudios() {
  console.log(`\n🌍 Importing ${northAfricaStudios.length} North Africa studios (Morocco + Tunisia)...\n`);
  
  const now = admin.firestore.Timestamp.now();
  let imported = 0;
  let skipped = 0;
  
  for (const studio of northAfricaStudios) {
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
  console.log('🌍 North Africa import complete!\n');
}

importStudios()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
