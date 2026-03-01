// Seed batch 4: More Asia + India + Publishers (Director targets)
import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, '..', 'service-account.json'), 'utf8')
);

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

const leads = [
  // CHINA
  {
    name: "Pixpil",
    type: "studio",
    country: "China",
    city: "Shanghai",
    website: "https://eastwardgame.com/",
    size: "11-50",
    games: ["Eastward"],
    genres: ["Adventure", "RPG", "Narrative", "Pixel Art"],
    icp: "Director",
    score: 92,
    contact: {
      name: "Tommo Zhou",
      role: "Co-founder / Lead Programmer",
      email: "",
      linkedin: ""
    },
    notes: "Started with 3 people, grew to ~12 full-time. Eastward = critically acclaimed narrative adventure with 90s anime vibes. Published by Chucklefish. Custom game engine. PERFECT Director fit — emotional narrative core.",
    source: "research",
    tags: ["narrative-heavy", "china", "director-target", "pixel-art", "acclaimed"]
  },
  {
    name: "Misty Mountain Studio",
    type: "studio",
    country: "China",
    city: "Shanghai",
    website: "https://www.mistymountainstudio.com/",
    size: "2-10",
    games: ["The Rewinder"],
    genres: ["Puzzle", "Adventure", "Narrative", "Mythology"],
    icp: "Director",
    score: 88,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "6 people. The Rewinder = Chinese mythology puzzle adventure. Now pivoting to 'game AI studio' — already interested in AI tools! Founded 2018 (Melbourne), moved to China 2020. WARM LEAD.",
    source: "research",
    tags: ["narrative-heavy", "china", "director-target", "ai-interested", "mythology"]
  },
  {
    name: "Gamirror Games",
    type: "publisher",
    country: "China",
    city: "Shanghai",
    website: "https://www.gamirrorgames.com/",
    size: "11-50",
    games: ["Dyson Sphere Program", "The Rewinder", "KARMA: The Dark World"],
    genres: ["Publisher", "Indie", "Various"],
    icp: "Director",
    score: 82,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Major Chinese indie publisher (formerly GameraGame). 6 consecutive years at TGS. Publishes narrative games including The Rewinder, KARMA. Good partnership angle — Director for their narrative portfolio.",
    source: "research",
    tags: ["china", "director-target", "publisher", "tgs-presence"]
  },

  // CANADA (Hong Kong diaspora - counts as Asia thematically)
  {
    name: "sunset visitor",
    type: "studio",
    country: "Canada",
    city: "Vancouver",
    website: "https://www.sunsetvisitor.studio/",
    size: "1-5",
    games: ["1000xRESIST"],
    genres: ["Adventure", "Narrative", "Sci-Fi"],
    icp: "Director",
    score: 95,
    contact: {
      name: "Remy Siu",
      role: "Creative Director",
      email: "",
      linkedin: ""
    },
    notes: "4 people with theatre/dance/performance backgrounds. 1000xRESIST = GOTY contender 2024, WON PEABODY AWARD. Hong Kong protests/diaspora themes. Paste calls it 'a dazzling testament to stories this medium has yet to tell'. LEGENDARY narrative.",
    source: "research",
    tags: ["narrative-heavy", "canada", "director-target", "award-winner", "peabody", "hong-kong-diaspora"]
  },

  // INDIA
  {
    name: "Nodding Heads Games",
    type: "studio",
    country: "India",
    city: "Pune",
    website: "https://www.noddingheadsgames.com/",
    size: "11-50",
    games: ["Raji: An Ancient Epic", "Raji: Kaliyuga"],
    genres: ["Action", "Adventure", "Narrative", "Mythology"],
    icp: "Director",
    score: 88,
    contact: {
      name: "Ian Maude",
      role: "Co-founder / Art Director",
      email: "",
      linkedin: ""
    },
    notes: "13 team members. Raji = 2M+ players, Indian mythology narrative. Sequel Raji: Kaliyuga announced. Netflix partnership. Story revolves around siblings' journey through realms. Strong cultural narrative DNA.",
    source: "research",
    tags: ["narrative-heavy", "india", "director-target", "mythology", "netflix"]
  },

  // JAPAN (VN specialists)
  {
    name: "Innocent Grey",
    type: "studio",
    country: "Japan",
    city: "Tokyo",
    website: "https://www.gungnir.co.jp/innocentgrey/",
    size: "2-10",
    games: ["Kara no Shoujo", "Cartagra", "Flowers"],
    genres: ["Visual Novel", "Mystery", "Narrative"],
    icp: "Director",
    score: 90,
    contact: {
      name: "Miki Sugina",
      role: "Director",
      email: "",
      linkedin: ""
    },
    notes: "Acclaimed VN studio. Kara no Shoujo series = dark mystery VNs set in post-war Japan. 'In a class by itself' per fans. Known for psychological depth and narrative complexity. PERFECT VN Director fit.",
    source: "research",
    tags: ["narrative-heavy", "japan", "director-target", "visual-novel", "mystery"]
  },

  // HONG KONG
  {
    name: "Genuine Studio",
    type: "studio",
    country: "Hong Kong",
    city: "Hong Kong",
    website: "",
    size: "2-10",
    games: ["Detective Kobayashi"],
    genres: ["Adventure", "Mystery", "Narrative"],
    icp: "Director",
    score: 78,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Detective Kobayashi = mystery adventure similar to Ace Attorney/Danganronpa. Hong Kong indie scene pioneer. Hong Kong cultural setting.",
    source: "research",
    tags: ["narrative-heavy", "hong-kong", "director-target", "mystery", "detective"]
  },

  // Additional Chinese publishers/studios
  {
    name: "indienova",
    type: "publisher",
    country: "China",
    city: "Beijing",
    website: "https://indienova.com/",
    size: "11-50",
    games: [],
    genres: ["Publisher", "Portal", "Indie"],
    icp: "Director",
    score: 70,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "THE indie game portal in China. Built by Chinese developers for global devs. Partnership angle — Director showcase to Chinese market via their platform.",
    source: "research",
    tags: ["china", "director-target", "publisher", "portal", "partnership"]
  },

  // Additional Southeast Asia
  {
    name: "Weyrdworks",
    type: "studio",
    country: "Malaysia",
    city: "Kuala Lumpur",
    website: "",
    size: "2-10",
    games: ["Weyrdlets"],
    genres: ["Simulation", "Virtual Pet", "Narrative"],
    icp: "Director",
    score: 72,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Virtual pet sim project. Featured alongside Kaigan Games in Main Game interviews. Malaysian indie scene.",
    source: "research",
    tags: ["malaysia", "director-target", "simulation"]
  }
];

async function seedAsiaDirectorLeads4() {
  console.log(`Seeding ${leads.length} batch 4 Director leads...\n`);
  
  let added = 0;
  let skipped = 0;
  
  for (const lead of leads) {
    // Check if exists
    const existing = await db.collection('leads')
      .where('name', '==', lead.name)
      .limit(1)
      .get();
    
    if (!existing.empty) {
      console.log(`⏭️  ${lead.name} (already exists)`);
      skipped++;
      continue;
    }
    
    await db.collection('leads').add({
      ...lead,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`✅ ${lead.name} (${lead.country}) — ${lead.size} — Score ${lead.score}`);
    added++;
  }
  
  console.log(`\n✅ Added ${added}, skipped ${skipped}`);
  process.exit(0);
}

seedAsiaDirectorLeads4().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
