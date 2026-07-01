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

const saStudios: Partial<Lead>[] = [
  {
    company: 'The Brotherhood Games',
    website: 'http://www.thebrotherhoodgames.com',
    notes: `South African studio known for award-winning sci-fi horror.

**Games:**
- **STASIS** — Isometric sci-fi horror adventure
  - Won numerous awards: Best Music, Best Adventure, Best Sound Design
  - Praised by IGN, Kotaku internationally
  - Available on Steam, GOG, Humble Store

**Why PERFECT for LoreWeaver:**
- Sci-fi horror = heavy narrative genre
- Award-winning storytelling
- International recognition
- Adventure game = dialogue/narrative focused

**Fit Score: 92** — Award-winning narrative horror adventure`,
    country: 'South Africa',
    region: 'Africa',
    tags: ['indie', 'horror', 'sci-fi', 'narrative', 'adventure', 'award-winning', 'steam'],
    fit: 92,
  },
  {
    company: 'RuneStorm',
    website: 'http://www.runestorm.com',
    notes: `South African studio known for unique game concepts.

**Team:** Nolan Richert, Arn Richert, Logan Richert

**Games:**
- Viscera Cleanup Detail — Janitorial duties after alien invasion (cult hit)
- Rooks Keep — Fantasy deathmatch arena

**Background:** Started with Ballistic Weapons mod for Unreal Tournament 2004

**Why Consider:**
- Viscera Cleanup Detail = cult following
- Fantasy arena = character/world building
- Strong Unreal Engine experience

**Fit Score: 70** — Unique concepts, arena focus`,
    country: 'South Africa',
    region: 'Africa',
    tags: ['indie', 'unreal', 'fantasy', 'unique-concepts', 'cult-hit'],
    fit: 70,
  },
  {
    name: 'Gareth Fouche',
    company: 'Rogue Moon Studios',
    website: 'http://roguemoonstudios.com',
    notes: `South African indie studio creating cyberpunk narratives.

**Games:**
- **System Crash** — Cyberpunk collectible card game
  - Blade Runner/Netrunner inspired
  - Steam Greenlit

**Why Perfect for LoreWeaver:**
- Cyberpunk genre = narrative heavy
- Blade Runner/Netrunner inspiration = deep worldbuilding
- Card game with story elements

**Fit Score: 85** — Cyberpunk narrative card game`,
    country: 'South Africa',
    region: 'Africa',
    tags: ['indie', 'cyberpunk', 'card-game', 'narrative', 'blade-runner', 'steam'],
    fit: 85,
  },
  {
    company: 'Clockwork Acorn',
    website: 'http://clockworkacorn.com',
    notes: `Stellenbosch-founded indie studio.

**Founders:** Francois van Niekerk, Leon van Niekerk, Hilgard Bell

**Games:**
- Monster and Medicine — Being overhauled for Steam release

**Also Does:** Outsourced development work

**Why Consider:**
- Steam release in progress
- Stellenbosch tech hub presence

**Fit Score: 65** — Growing studio`,
    country: 'South Africa',
    region: 'Africa',
    tags: ['indie', 'stellenbosch', 'steam', 'outsourcing'],
    fit: 65,
  },
  {
    company: 'RetroEpic Software',
    website: 'http://www.retroepic.com',
    notes: `One of the LARGEST game dev names in South Africa.

**Founders:** Niki and Keith Boshoff

**Games:**
- A Day in the Woods — Hit title
- Jungle Beat: The Game
- Scorch Runner

**Philosophy:** Believes in hiring self-taught programmers with exceptional talent

**Why Consider:**
- One of SA's largest studios
- Mix of own IP and client work
- Established presence

**Fit Score: 72** — Major SA studio`,
    country: 'South Africa',
    region: 'Africa',
    tags: ['established', 'large-studio', 'cape-town', 'client-work'],
    fit: 72,
  },
  {
    company: 'Celestial Games',
    website: 'http://celestial-games.com',
    notes: `The GRANDFATHER of South African indie game development.

**History:**
- Released Toxic Bunny in 1996 — iconic SA platformer
- Was part of Electronic Arts at one point
- Released Toxic Bunny HD in 2012

**Why Consider:**
- SA gaming pioneer (since 1996!)
- Historical significance
- Continued development

**Fit Score: 60** — Pioneer, historical significance`,
    country: 'South Africa',
    region: 'Africa',
    tags: ['pioneer', 'platformer', 'historical', 'ea-alumni'],
    fit: 60,
  },
  {
    name: 'Peter Cardwell-Gardner',
    company: 'Made with Monster Love',
    website: 'http://www.madewithmonsterlove.com',
    notes: `One-man indie studio with award-winning titles.

**Games:**
- Cadence — Steam Greenlight title (synesthesia music game)
- Toward the Light — Success at 7DFPS 2012

**Why Consider:**
- Solo dev with international recognition
- Innovative concepts
- Music/experience focus

**Fit Score: 68** — Experimental indie`,
    country: 'South Africa',
    region: 'Africa',
    tags: ['solo-dev', 'music', 'experimental', 'steam'],
    fit: 68,
  },
  {
    company: 'Team Lazerbeam',
    website: 'http://teamlazerbeam.com',
    notes: `South African indie studio with quirky narrative games.

**Founders:** Richard Pieterse, Jason Sutherland, Ben Rausch

**Games:**
- Snow Cones — First date simulator (narrative!)
- Games based on tears and pizza

**Why Consider:**
- First date simulator = narrative/dialogue focused
- Quirky, unique concepts

**Fit Score: 75** — Dating sim = narrative heavy`,
    country: 'South Africa',
    region: 'Africa',
    tags: ['indie', 'dating-sim', 'narrative', 'quirky'],
    fit: 75,
  },
  {
    company: 'Every.Single.Soldier',
    website: 'http://www.everysinglesoldier.com',
    notes: `One-person studio creating acclaimed strategy war games.

**Founder:** Johan Nagel (solo developer)

**Games:**
- Vietnam '65 — Strategy simulation
- Afghanistan '11
- CVN 76 Carrier Deck

**Partnership:** Works with RetroEpic Software

**Why Consider:**
- Strategy games need dynamic scenarios
- Historical warfare = narrative context
- Solo dev producing AAA-quality strategy

**Fit Score: 70** — Strategy with narrative context`,
    country: 'South Africa',
    region: 'Africa',
    tags: ['solo-dev', 'strategy', 'military', 'simulation', 'historical'],
    fit: 70,
  },
  {
    company: 'Formula D Interactive',
    website: 'http://www.formula-d.com',
    notes: `Interactive experience studio focused on storytelling.

**Focus:** Education, museums, visitor centres

**Philosophy:** "Tell a story" through interactive experiences

**Why Consider:**
- Explicit "tell a story" focus
- Educational narrative
- Museum/experience design

**Fit Score: 72** — Storytelling focus in interactive experiences`,
    country: 'South Africa',
    region: 'Africa',
    tags: ['interactive', 'museum', 'education', 'storytelling', 'experiences'],
    fit: 72,
  },
];

async function importStudios() {
  console.log(`\n🇿🇦 Importing ${saStudios.length} more South Africa studios (batch 2)...\n`);
  
  const now = admin.firestore.Timestamp.now();
  let imported = 0;
  let skipped = 0;
  
  for (const studio of saStudios) {
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
  console.log('🇿🇦 South Africa batch 2 complete!\n');
}

importStudios()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
