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

const irelandScotlandStudios: Partial<Lead>[] = [
  // IRELAND
  {
    company: 'Romero Games',
    website: 'https://www.romerogames.ie',
    notes: `Irish AAA studio founded by gaming legends John and Brenda Romero.

**Location:** Galway, Ireland
**Founded:** 2015
**Founders:** John Romero (DOOM creator) + Brenda Romero (game design legend)

**Games:**
- Empire of Sin — Prohibition-era strategy RPG
- SIGIL — DOOM WAD

**Why Consider:**
- John Romero = gaming royalty (DOOM, Quake)
- Brenda Romero = narrative game design pioneer
- Strategy RPG with narrative elements
- AAA resources in Ireland

**Fit Score: 80** — Strategy RPG with narrative`,
    country: 'Ireland',
    region: 'Europe',
    tags: ['aaa', 'strategy', 'rpg', 'galway', 'romero', 'doom'],
    fit: 80,
  },
  {
    company: 'Black Shamrock',
    website: 'https://www.black-shamrock.com',
    notes: `Ireland's leading AAA co-development studio.

**Location:** Dublin, Ireland
**Owner:** Virtuos (acquired 2017)

**Specialty:** "AAA RPG and action-adventure titles for PC and consoles"

**Worked on:**
- Marvel's Midnight Suns
- The Outer Worlds
- Grounded
- Back 4 Blood

**Why Perfect for LoreWeaver:**
- Explicit RPG specialization
- Action-adventure expertise
- AAA co-development = potential integration partner

**Fit Score: 82** — AAA RPG co-dev specialists`,
    country: 'Ireland',
    region: 'Europe',
    tags: ['aaa', 'co-dev', 'rpg', 'action-adventure', 'dublin', 'virtuos'],
    fit: 82,
  },
  {
    company: 'Spooky Doorway',
    website: 'https://www.spookydoorway.com',
    notes: `Irish indie studio specializing in narrative adventure games.

**Location:** Ireland

**Mission:** "Small adventure games with light-hearted and caring narratives"

**Games:**
- The Darkside Detective series — Point-and-click detective comedy
- Emerged from Isometric Dreams collective

**Why PERFECT for LoreWeaver:**
- "Light-hearted and caring narratives" = explicit focus
- Detective/adventure games = dialogue-heavy
- Indie = perfect Architect customer

**Fit Score: 88** — Narrative adventure specialists`,
    country: 'Ireland',
    region: 'Europe',
    tags: ['indie', 'adventure', 'detective', 'narrative', 'comedy'],
    fit: 88,
  },
  {
    company: 'Dreamfeel',
    website: 'https://dreamfeel.ie',
    notes: `Irish indie studio making personal, narrative games.

**Location:** Dublin, Ireland

**Games:**
- If Found... — LGBTQ+ visual novel, BAFTA nominated
- Curtain — Personal narrative

**Why PERFECT for LoreWeaver:**
- Visual novel expertise
- Personal narrative focus
- BAFTA nominated

**Fit Score: 85** — Personal narrative games`,
    country: 'Ireland',
    region: 'Europe',
    tags: ['indie', 'visual-novel', 'lgbtq', 'personal', 'dublin', 'bafta'],
    fit: 85,
  },
  // SCOTLAND
  {
    company: 'Blazing Griffin',
    website: 'https://www.blazinggriffin.com',
    notes: `Scottish BAFTA-winning narrative game studio.

**Location:** Glasgow, Scotland
**Size:** ~100 people
**Also does:** Film production, post-production

**Mission:** "BAFTA award-winning narrative-driven studio specialising in mystery, detective, and story-rich experiences"

**Games:**
- Murder Mystery Machine
- Hercule Poirot: The London Case — IP adaptation
- Arsène Lupin: Once a Thief — IP adaptation

**Specialty:** "Story-first games" + global IP partnerships

**Why PERFECT for LoreWeaver:**
- "Narrative-driven" explicit
- "Mystery, detective, story-rich experiences"
- "Story-first games"
- Works with major IP holders (Agatha Christie estate, etc.)

**Fit Score: 95** — BAFTA narrative specialists, IP partnerships`,
    country: 'United Kingdom',
    region: 'Europe',
    tags: ['narrative', 'detective', 'mystery', 'bafta', 'glasgow', 'ip-adaptation', 'story-first'],
    fit: 95,
  },
  {
    company: 'Screen Burn Interactive',
    website: 'https://screenburn.com',
    notes: `Scottish BAFTA-winning narrative adventure studio (formerly No Code).

**Location:** Glasgow, Scotland
**Founded:** 2015
**Formerly:** No Code
**Publisher:** Devolver Digital, Annapurna Interactive

**Awards:**
- BAFTA Scotland Best Game
- BAFTA Best British Game (2020)
- Multiple BAFTA wins

**Games:**
- Stories Untold — Experimental text adventure
- Observation — Sci-fi thriller (play as AI)

**Why PERFECT for LoreWeaver:**
- "Multiple BAFTA Award winning"
- "Exceptional storytelling, atmosphere, and game design"
- Experimental narrative approaches
- Jon McKellan = writer/director

**Fit Score: 92** — Multi-BAFTA narrative experimenters`,
    country: 'United Kingdom',
    region: 'Europe',
    tags: ['narrative', 'experimental', 'bafta', 'glasgow', 'devolver', 'annapurna', 'sci-fi'],
    fit: 92,
  },
  {
    company: 'SchiZotypy Games',
    website: '',
    notes: `Scottish indie studio on a narrative mission.

**Location:** Edinburgh, Scotland

**Mission:** "On a mission to return narrative-driven games to the forefront of video gaming"

**Why PERFECT for LoreWeaver:**
- Explicit narrative mission
- "Return narrative-driven games to the forefront"
- Edinburgh indie

**Fit Score: 85** — Narrative mission statement`,
    country: 'United Kingdom',
    region: 'Europe',
    tags: ['indie', 'narrative', 'edinburgh', 'mission-driven'],
    fit: 85,
  },
  {
    company: '4J Studios',
    website: 'https://www.4jstudios.com',
    notes: `Scottish studio known for Minecraft console ports.

**Location:** Dundee, Scotland

**Games:**
- Minecraft console versions (key partner)
- Reforj — Original voxel game

**Why Consider:**
- Massive reach through Minecraft
- Own game engine ("Elements")
- Scottish games industry leaders

**Fit Score: 65** — Minecraft partner, less narrative focus`,
    country: 'United Kingdom',
    region: 'Europe',
    tags: ['minecraft', 'dundee', 'voxel', 'console'],
    fit: 65,
  },
];

async function importStudios() {
  console.log(`\n🇮🇪🏴󠁧󠁢󠁳󠁣󠁴󠁿 Importing ${irelandScotlandStudios.length} Ireland + Scotland studios...\n`);
  
  const now = admin.firestore.Timestamp.now();
  let imported = 0;
  let skipped = 0;
  
  for (const studio of irelandScotlandStudios) {
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
  console.log('🇮🇪🏴󠁧󠁢󠁳󠁣󠁴󠁿 Ireland + Scotland import complete!\n');
}

importStudios()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
