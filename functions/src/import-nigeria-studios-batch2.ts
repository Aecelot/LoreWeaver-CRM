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
    company: 'Quiva Games',
    website: 'https://quiva.games',
    notes: `Nigerian indie studio focused on competitive African-themed games. Founded 2019.

**Games:**
- CyberSpawns
- Edge of Infinity
- Cryptobarons — Real-time strategy

**Why Consider:**
- "Developing fun, competitive games that tell African stories"
- RTS genre = potential for Director integration
- Strategy games need NPC decision systems

**Fit Score: 75** — Strategy focus with African narratives`,
    country: 'Nigeria',
    region: 'Africa',
    tags: ['indie', 'strategy', 'rts', 'african-stories', 'competitive'],
    fit: 75,
  },
  {
    company: 'Kucheza Gaming',
    website: 'https://kuchezagaming.com',
    notes: `Nigerian studio integrating culture into gaming. Also provides art outsourcing and co-dev services.

**Games:**
- The Wild Kingdom
- Danfo Dash — Lagos traffic chaos game
- Oga Train Station

**Services:** Art outsourcing, co-development

**Why Consider:**
- Culture-focused games
- Service arm = could recommend Architect to clients
- Lagos cultural themes

**Fit Score: 70** — Cultural games + service influence`,
    country: 'Nigeria',
    region: 'Africa',
    tags: ['indie', 'cultural', 'lagos', 'services', 'co-dev'],
    fit: 70,
  },
  {
    company: 'Six Path Studio',
    website: 'https://studio.gameverse.africa',
    notes: `Nigerian studio creating culturally relevant games.

**Games:**
- Juju Traveller — Cultural adventure
- Lt. Ahmed
- Manchi
- Oasis: Endless Runner
- Puzzle Beam

**Why Consider:**
- Culturally relevant focus
- "Juju" = spiritual/magical themes
- Small but passionate team

**Fit Score: 72** — Cultural narrative potential`,
    country: 'Nigeria',
    region: 'Africa',
    tags: ['indie', 'cultural', 'adventure', 'juju'],
    fit: 72,
  },
  {
    company: 'Inuv8 Studios',
    website: 'https://www.instagram.com/inuv8_studios/',
    notes: `Nigerian indie studio focused on storytelling through games.

**Games:**
- Midnight Dreams

**Mission:** "Passionate about telling stories through game development, art, and animation"

**Why Consider:**
- Explicit storytelling focus
- Art + animation capabilities
- Early stage = open to tools

**Fit Score: 78** — Storytelling-first mission`,
    country: 'Nigeria',
    region: 'Africa',
    tags: ['indie', 'storytelling', 'animation', 'art'],
    fit: 78,
  },
  {
    company: 'Deluxe Creation Studio',
    website: 'https://deluxecreation.com',
    notes: `Lagos-based game dev and animation company with diverse portfolio.

**Games:**
- Chike – Sky Raider
- Captain EcoGen
- Stickman Fight series (Apocalypse, Dark Adventures, Badlandz)
- Save the Planet
- Burster Drones
- Banzur.io

**Why Consider:**
- Animation capabilities
- Diverse game portfolio
- Action games with narrative framing

**Fit Score: 65** — Action-focused, animation skills`,
    country: 'Nigeria',
    region: 'Africa',
    tags: ['indie', 'animation', 'action', 'lagos', 'diverse'],
    fit: 65,
  },
  {
    company: 'Dash Studio',
    website: 'https://dashstudios.tech',
    notes: `Nigerian studio amplifying African stories through games.

**Games:**
- Nouns Hunt

**Mission:** "Amplify African stories by developing, publishing, and distributing high-quality games tailored for African and global audiences"

**Focus:** Addressing gaps in African gaming ecosystem, nurturing local talent

**Why Consider:**
- Explicit African storytelling mission
- Publisher + developer
- Ecosystem builder

**Fit Score: 80** — African stories mission, publisher role`,
    country: 'Nigeria',
    region: 'Africa',
    tags: ['indie', 'publisher', 'african-stories', 'ecosystem'],
    fit: 80,
  },
  {
    company: 'Andicox Studio',
    website: 'https://andicoxstudio.com/games',
    notes: `Nigerian creative studio blending art and technology. Founded 2018.

**Games:**
- Ball Crusher
- Web Masters

**Mission:** "World of Creativity and Innovation" — redefining gaming by blending art and technology

**Why Consider:**
- Since 2018 = established
- Art + tech focus
- Immersive gameplay experiences

**Fit Score: 60** — Creative focus, less narrative emphasis`,
    country: 'Nigeria',
    region: 'Africa',
    tags: ['indie', 'creative', 'art-tech', 'lagos'],
    fit: 60,
  },
  {
    company: 'Logic Dev',
    website: 'https://linktr.ee/LogicDev',
    notes: `Nigerian indie studio specializing in 3D modeling, 2D animation, and filmmaking.

**Games:**
- Escape Protocol
- OTITE

**Why Consider:**
- Filmmaking background = narrative skills
- 3D/2D animation capabilities
- Creative innovation

**Fit Score: 68** — Film/animation background`,
    country: 'Nigeria',
    region: 'Africa',
    tags: ['indie', 'animation', '3d', 'filmmaking'],
    fit: 68,
  },
  {
    company: 'Anyhowanyhow Games',
    website: 'https://anyhowanyhow.itch.io/',
    notes: `Solo Nigerian indie developer (Faith) with big dreams.

**Games:**
- Infection Control

**Vision:** Dreams of creating a GTA-style Lagos adventure

**Why Consider:**
- GTA-style Lagos = massive narrative potential
- Passionate about animation and adventure
- Early stage = perfect for tools adoption

**Fit Score: 75** — GTA Lagos vision = narrative goldmine`,
    country: 'Nigeria',
    region: 'Africa',
    tags: ['solo-dev', 'adventure', 'lagos', 'gta-style', 'ambitious'],
    fit: 75,
  },
];

async function importStudios() {
  console.log(`\n🇳🇬 Importing ${nigeriaStudios.length} more Nigeria studios (batch 2)...\n`);
  
  const now = admin.firestore.Timestamp.now();
  let imported = 0;
  let skipped = 0;
  
  for (const studio of nigeriaStudios) {
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
  console.log('🇳🇬 Nigeria batch 2 complete!\n');
}

importStudios()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
