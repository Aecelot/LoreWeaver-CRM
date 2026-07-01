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

const nigeriaStudios: Partial<Lead>[] = [
  {
    name: '',
    company: 'Dimension11',
    email: '',
    website: 'https://www.dimension11studios.com',
    status: 'new',
    source: 'research',
    notes: `Nigerian indie studio developing "Legends of Orisha: Blood and Water" — an **African mythology fantasy RPG**.

**Games:**
- Legends of Orisha: Blood and Water (In development) — African fantasy RPG based on Yoruba mythology
- Covidrun

**Origin:** Started at Obafemi Awolowo University

**Why PERFECT for LoreWeaver:**
- African mythology RPG = IDEAL Architect use case
- Orisha = Yoruba deities = rich narrative potential
- Academic origins suggest story rigor
- RPG in development = perfect timing for tools adoption

**Fit Score: 95** — African fantasy RPG in development = dream customer`,
    country: 'Nigeria',
    region: 'Africa',
    tags: ['indie', 'rpg', 'african-mythology', 'yoruba', 'fantasy', 'lagos', 'narrative'],
    fit: 95,
  },
  {
    name: '',
    company: 'Maliyo Games',
    email: '',
    website: 'https://maliyo.com',
    status: 'new',
    source: 'research',
    notes: `Pan-African mobile gaming leader. FIRST African studio with Disney collaboration.

**Team:** 30+ employees across 5 African countries
**HQ:** Lagos, Yaba (new studio opened Feb 2024)

**Games:**
- Disney Iwájú: Rising Chef — Based on Disney+ series set in futuristic Lagos
- Whot King — Nigerian card game digitized
- Safari City, Crazy Ludo, Aboki Run, Mama Atingi Shop

**Achievements:**
- Disney partnership (2024) — FIRST for African studio
- MaliyoCON 2025 (December) — First developer-led gaming conference in Nigeria
- Apple & Google featured
- African Games Industry Award winner

**Why Perfect for LoreWeaver:**
- "Beautifully crafted narratives" in mission statement
- Disney collab proves high-quality storytelling capability
- Industry leader building African gaming ecosystem
- Pan-African reach across 5 countries

**Fit Score: 92** — Narrative-first mobile leader with Disney validation`,
    country: 'Nigeria',
    region: 'Africa',
    tags: ['mobile', 'pan-african', 'disney', 'narrative', 'lagos', 'industry-leader', 'maliyocon'],
    fit: 92,
  },
  {
    name: '',
    company: 'JUJU Games',
    email: '',
    website: 'https://its-juju-games.itch.io',
    status: 'new',
    source: 'research',
    notes: `African creative collective focused on redefining gaming through African narratives.

**Games:**
- Vodou – A Space Odyssey — African sci-fi with West African spirituality
- Vodou – Rundown Prototype
- Canjin
- MANSA — Likely African historical/kingdom theme

**Why Perfect for LoreWeaver:**
- West African mythology focus (Vodou = Vodun spirituality)
- "Redefine and inspire through unique video games"
- Creative collective = experimental narrative approach
- Multiple narrative-heavy titles

**Fit Score: 90** — African mythology + narrative innovation`,
    country: 'Nigeria',
    region: 'Africa',
    tags: ['indie', 'mythology', 'vodou', 'african-spirituality', 'sci-fi', 'collective'],
    fit: 90,
  },
  {
    name: '',
    company: 'Goondu Interactive',
    email: '',
    website: 'https://goonduinteractive.weebly.com',
    status: 'new',
    source: 'research',
    notes: `Nigerian studio explicitly focused on story-rich games.

**Games:**
- Beyond Service (In development) — Story-rich title

**Mission:** "Evocative, story-rich games that combine powerful narratives with innovative gameplay"

**Why Perfect for LoreWeaver:**
- Explicitly narrative-focused mission
- "Redefine storytelling in gaming" = perfect alignment
- Story-rich game in active development

**Fit Score: 88** — Explicitly narrative-focused, game in development`,
    country: 'Nigeria',
    region: 'Africa',
    tags: ['indie', 'narrative', 'story-rich', 'lagos'],
    fit: 88,
  },
  {
    name: '',
    company: 'Raven Illusion Studio',
    email: '',
    website: 'https://www.ravenillusion.studio',
    status: 'new',
    source: 'research',
    notes: `Nigerian studio focused on interactive storytelling and cultural narratives.

**Games:**
- Taste of Wazobia — Nigerian cultural experience
- Unbroken: Our Last Stand — Narrative-focused title
- Adventurers: Mobile

**Why Perfect for LoreWeaver:**
- "Interactive storytelling" explicit focus
- "Bridge cultures and generations" mission
- Emphasis on inclusivity and cultural narrative
- "Groundbreaking narratives" goal

**Fit Score: 85** — Interactive storytelling focus`,
    country: 'Nigeria',
    region: 'Africa',
    tags: ['indie', 'interactive-story', 'cultural', 'narrative', 'lagos'],
    fit: 85,
  },
  {
    name: '',
    company: 'Gbrossoft',
    email: '',
    website: 'https://gbrossoft.com',
    status: 'new',
    source: 'research',
    notes: `Nigerian studio championing African science fiction and fantasy in gaming.

**Games:**
- Outliver — African sci-fi/fantasy title

**Why Consider:**
- Champions "African science fiction and fantasy"
- "Hardcore, globally appealing games"
- Genre fiction focus = narrative worldbuilding needs

**Fit Score: 82** — African genre fiction`,
    country: 'Nigeria',
    region: 'Africa',
    tags: ['indie', 'sci-fi', 'fantasy', 'african-genre', 'lagos'],
    fit: 82,
  },
];

async function importStudios() {
  console.log(`\n🇳🇬 Importing ${nigeriaStudios.length} Nigeria studios...\n`);
  
  const now = admin.firestore.Timestamp.now();
  let imported = 0;
  let skipped = 0;
  
  for (const studio of nigeriaStudios) {
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
  console.log('🇳🇬 Nigeria import complete!\n');
}

importStudios()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
