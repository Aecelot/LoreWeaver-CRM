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

const africaStudios: Partial<Lead>[] = [
  // CAMEROON
  {
    name: 'Olivier Madiba',
    company: "Kiro'o Games",
    website: 'https://www.kiroogames.com',
    notes: `Cameroon's pioneering game studio. FIRST Black African studio on Xbox.

**Founder/CEO:** Olivier Madiba (founded 2007, registered 2013)
**Started with:** $100 and daily power outages

**Games:**
- **Aurion: Legacy of the Kori-Odan** — African mythology action RPG
  - FIRST Black African game on Xbox (2024)
  - ID@Xbox Developer Acceleration Program
  - 10-year development project
  - Inspired by African culture and cosmogony

**Mission:** "100% African video game studio by Africans"

**Achievements:**
- Successful Kickstarter (€182,504)
- PAGG founding member
- Featured in CNN, Prime Gaming, Vice

**Why PERFECT for LoreWeaver:**
- African mythology RPG = IDEAL fit
- "Symbols about the African challenge" = deep narrative
- Xbox platform = serious studio
- 10+ years perseverance
- Geopolitical themes in games

**Fit Score: 98** — African mythology RPG on Xbox, pioneering studio`,
    country: 'Cameroon',
    region: 'Africa',
    tags: ['rpg', 'african-mythology', 'xbox', 'narrative', 'pioneer', 'pagg', 'kickstarter'],
    fit: 98,
  },
  // SENEGAL
  {
    company: 'Kayfo Game Studio',
    website: 'https://www.kayfo.sn',
    notes: `Senegal's leading game studio creating culturally rooted mobile games.

**Location:** Dakar, Senegal
**Focus:** "Fun, meaningful, and culturally rooted mobile games for African audiences"

**Games:**
- Detective Syra — Hidden objects adventure set in Senegal (narrative!)
- Kayfo Games Collection — 12 African mini-games
- Afro Juggle — Football with African tournament
- Euro Kick Tournament — On Poki platform
- Clean my Beach — Environmental awareness
- Da'karapid — Endless runner set in Dakar

**Platform:** Kayfo Play — Instant games platform expanding across Africa (Senegal, Côte d'Ivoire, more coming)

**Why Perfect for LoreWeaver:**
- Detective Syra = narrative adventure game
- African cultural focus
- Growing platform (Kayfo Play)
- PAGG member

**Fit Score: 78** — Detective Syra narrative game, platform influence`,
    country: 'Senegal',
    region: 'Africa',
    tags: ['mobile', 'cultural', 'narrative', 'dakar', 'platform', 'pagg'],
    fit: 78,
  },
  // ETHIOPIA
  {
    name: 'Dawit Abraham',
    company: 'Qene Games',
    website: 'https://qenetech.com',
    notes: `Ethiopia's FIRST game development studio. Award-winning.

**Location:** Addis Ababa
**Founders:** Dawit Abraham, Samrawit Demeke, Henok Teklu

**Games:**
- **Kukulu** — Winner of AppsAfrica 2018 Award for Best Entertainment Solution
  - Ethiopian chicken escape game with cultural elements
- **Gebeta** — Winner of AppsAfrica 2020 App of the Year
  - Modern Mancala with Ethiopian twist
  - Published by Carry1st

**Mission:** "Games with unique experience woven into every character, scene, and music"

**Vision:** Gaming industry to exceed coffee exports for Ethiopia

**Why Perfect for LoreWeaver:**
- Ethiopian culture deeply embedded
- "Every character, scene, and music" = narrative attention
- Award-winning twice
- PAGG member
- Ambitious growth plans

**Fit Score: 82** — Cultural narrative in every element, award-winning`,
    country: 'Ethiopia',
    region: 'Africa',
    tags: ['mobile', 'cultural', 'ethiopian', 'award-winning', 'addis-ababa', 'pagg', 'carry1st'],
    fit: 82,
  },
  // RWANDA
  {
    company: 'DopeApps',
    website: 'https://www.facebook.com/dopeapps/',
    notes: `Rwanda-based game and software development company.

**Location:** Kigali, Rwanda

**Focus:** Innovative software and games

**Why Consider:**
- PAGG founding member
- Rwandan market presence
- Growing East African ecosystem

**Fit Score: 60** — Limited public info, PAGG connection`,
    country: 'Rwanda',
    region: 'Africa',
    tags: ['mobile', 'kigali', 'pagg', 'software'],
    fit: 60,
  },
  // TANZANIA
  {
    company: 'Khanga Rue Media',
    website: 'https://www.facebook.com/KhangaRueMedia/',
    notes: `Tanzania-based media and game development company.

**Location:** Dar es Salaam, Tanzania

**Focus:** Advertising, media production, games

**Also Does:** Radio productions (Clouds FM), social impact content

**Why Consider:**
- PAGG founding member
- Media production = storytelling capability
- Tanzanian market

**Fit Score: 55** — Media focus, some game development`,
    country: 'Tanzania',
    region: 'Africa',
    tags: ['media', 'games', 'dar-es-salaam', 'pagg', 'advertising'],
    fit: 55,
  },
  // CENTRAL AFRICAN REPUBLIC
  {
    company: 'Masseka Game Studio',
    website: '',
    notes: `Central African Republic indie game studio.

**Focus:** African games

**Why Consider:**
- One of very few CAR studios
- PAGG member
- Underserved market

**Fit Score: 55** — Limited info, unique market`,
    country: 'Central African Republic',
    region: 'Africa',
    tags: ['indie', 'car', 'pagg'],
    fit: 55,
  },
  // CÔTE D'IVOIRE  
  {
    company: 'Paradise Game',
    website: 'https://www.paradise.game',
    notes: `Côte d'Ivoire gaming company focused on African gaming ecosystem.

**Location:** Abidjan, Côte d'Ivoire

**Focus:** Gaming platform and tournaments

**Kayfo Play:** Expanding to Côte d'Ivoire (partnership)

**Why Consider:**
- West African presence
- Platform for gaming
- Tournament organization

**Fit Score: 50** — Platform/esports focus`,
    country: "Côte d'Ivoire",
    region: 'Africa',
    tags: ['platform', 'esports', 'abidjan', 'west-africa'],
    fit: 50,
  },
  // UGANDA
  {
    company: 'Kola Studios',
    website: 'https://kolastudios.com',
    notes: `Uganda-based game development studio.

**Location:** Kampala, Uganda

**Why Consider:**
- East African presence
- Growing Ugandan tech scene

**Fit Score: 55** — Ugandan market presence`,
    country: 'Uganda',
    region: 'Africa',
    tags: ['indie', 'kampala', 'east-africa'],
    fit: 55,
  },
];

async function importStudios() {
  console.log(`\n🌍 Importing ${africaStudios.length} PAGG + other African studios...\n`);
  
  const now = admin.firestore.Timestamp.now();
  let imported = 0;
  let skipped = 0;
  
  for (const studio of africaStudios) {
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
  console.log('🌍 Africa PAGG batch complete!\n');
}

importStudios()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
