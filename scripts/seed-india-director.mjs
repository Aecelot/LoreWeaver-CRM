// Seed India deep dive: Director targets
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
  // TOP TIER - Strong narrative DNA
  {
    name: "Masala Games",
    type: "studio",
    country: "India",
    city: "Ahmedabad",
    website: "https://masalagames.com/",
    size: "11-50",
    games: ["Detective Dotson", "Detective Dotson: The Movie"],
    genres: ["Adventure", "Mystery", "Narrative", "Cozy"],
    icp: "Director",
    score: 95,
    contact: {
      name: "Shalin Shodhan",
      role: "CEO / Founder",
      email: "",
      linkedin: ""
    },
    notes: "30 people. Founder = BAFTA/OSCAR WINNER (ex-EA, ex-Pixar: Toy Story 3, Brave). Detective Dotson = 95% positive Steam, IGN 8.5. Indian pop culture + Bollywood vibes. Also making animated movie in UE5. DREAM LEAD for Director.",
    source: "research",
    tags: ["narrative-heavy", "india", "director-target", "mystery", "pixar-alumni", "bafta", "oscar"]
  },
  {
    name: "Studio Oleomingus",
    type: "studio",
    country: "India",
    city: "Chala, Gujarat",
    website: "https://oleomingus.com/",
    size: "1-5",
    games: ["Folds of a Separation", "It Takes A Long Time To Grow A Mountain", "Under A Porcelain Sun"],
    genres: ["Interactive Fiction", "Narrative", "Art Game", "Postcolonial"],
    icp: "Director",
    score: 92,
    contact: {
      name: "Dhruv Jani",
      role: "Co-founder",
      email: "",
      linkedin: ""
    },
    notes: "2 people (Dhruv Jani + Sushant Chakraborty). POSTCOLONIAL INTERACTIVE FICTION. Featured in NYT, The Guardian. India Foundation for Arts grants. 'Video games are a great place for politics'. NID alumni. PERFECT Director philosophy fit.",
    source: "research",
    tags: ["narrative-heavy", "india", "director-target", "art-game", "postcolonial", "nyt-featured", "literary"]
  },
  {
    name: "Ogre Head Studio",
    type: "studio",
    country: "India",
    city: "Hyderabad",
    website: "https://www.ogreheadstudio.com/",
    size: "2-10",
    games: ["Asura", "Yodha"],
    genres: ["Action", "Roguelike", "Deckbuilder", "Mythology"],
    icp: "Director",
    score: 85,
    contact: {
      name: "Zainuddeen Fahadh",
      role: "Founder",
      email: "",
      linkedin: ""
    },
    notes: "5 employees. Founded 2014, bootstrapped with ₹6 lakh. Asura = Indian mythology roguelike (well-received). Yodha = deckbuilder with astras/weapons. GDC India Pavilion. Offers dev services too.",
    source: "research",
    tags: ["narrative-heavy", "india", "director-target", "mythology", "roguelike", "bootstrapped"]
  },
  {
    name: "Mono Tusk Studios",
    type: "studio",
    country: "India",
    city: "Visakhapatnam",
    website: "https://www.monotuskstudios.com/",
    size: "2-10",
    games: ["Palm Sugar: A Village Story"],
    genres: ["RPG", "Pixel Art", "Narrative", "Cultural"],
    icp: "Director",
    score: 82,
    contact: {
      name: "P. Kartheek Raj",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Founded 2023. 'Cultural ambassadors on a mission'. Palm Sugar = pixel RPG set in rural South India. Telugu + English localization. Showcasing Indian heritage through games.",
    source: "research",
    tags: ["narrative-heavy", "india", "director-target", "cultural", "pixel-art", "regional"]
  },
  {
    name: "Brahman Studios",
    type: "studio",
    country: "India",
    city: "Hyderabad",
    website: "",
    size: "2-10",
    games: [],
    genres: ["Mobile", "Narrative", "Regional"],
    icp: "Director",
    score: 72,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Telugu game localization pioneer. Part of growing regional language gaming movement in India. Indian themes focus.",
    source: "research",
    tags: ["india", "director-target", "regional", "localization"]
  },

  // LARGER STUDIOS - Scale + narrative angle
  {
    name: "GameEon Studios",
    type: "studio",
    country: "India",
    city: "Mumbai",
    website: "https://gameeon.in/",
    size: "51-200",
    games: ["Mumbai Gullies", "Temple of Causality", "Indian Bike Driving 3D"],
    genres: ["Open World", "Action", "Adventure", "Narrative"],
    icp: "Director",
    score: 80,
    contact: {
      name: "Nikhil Malankar",
      role: "CEO / Founder",
      email: "",
      linkedin: ""
    },
    notes: "41-60 employees. Founded 2013, raised $1.52M. Mumbai Gullies = GTA-inspired open world set in Mumbai/Goa. 'Cultural storytelling' focus. Multiple sequels planned. Also does services.",
    source: "research",
    tags: ["narrative-heavy", "india", "director-target", "open-world", "funded", "gta-like"]
  },
  {
    name: "SuperGaming",
    type: "studio",
    country: "India",
    city: "Pune",
    website: "https://www.supergaming.com/",
    size: "51-200",
    games: ["Indus Battle Royale", "PAC-MAN Party Royale"],
    genres: ["Battle Royale", "Action", "Multiplayer"],
    icp: "Director",
    score: 75,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "150+ employees. Series A funded. Indus = Indo-futuristic BR with deep lore (Mythwalkers, COVEN org). 12M+ pre-registrations. Made games for 200M+ users. Narrative through BR lens.",
    source: "research",
    tags: ["india", "director-target", "battle-royale", "funded", "lore-heavy"]
  },

  // SOLO/SMALL DEVS - Indie narrative gems
  {
    name: "Armaan Sandhu (Unwording)",
    type: "studio",
    country: "India",
    city: "",
    website: "",
    size: "1-5",
    games: ["Unwording"],
    genres: ["Puzzle", "Narrative", "Mental Health"],
    icp: "Director",
    score: 80,
    contact: {
      name: "Armaan Sandhu",
      role: "Solo Developer",
      email: "",
      linkedin: ""
    },
    notes: "Solo dev. Unwording = 'narrative game about overcoming negative self-talk'. Mental health focus. Deeply personal narrative game.",
    source: "research",
    tags: ["narrative-heavy", "india", "director-target", "mental-health", "solo-dev"]
  },
  {
    name: "Quicktequila (Lovely Planet)",
    type: "studio",
    country: "India",
    city: "",
    website: "",
    size: "1-5",
    games: ["Lovely Planet", "Lovely Planet Arcade", "Lovely Planet 2"],
    genres: ["FPS", "Puzzle", "Abstract"],
    icp: "Director",
    score: 70,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Founded by 15-year-old solo dev. Lovely Planet = abstract FPS series, cult following. Unique visual style.",
    source: "research",
    tags: ["india", "director-target", "fps", "abstract", "cult"]
  },

  // ADDITIONAL STUDIOS
  {
    name: "Holy Cow Games",
    type: "studio",
    country: "India",
    city: "",
    website: "",
    size: "2-10",
    games: ["Bot Rods"],
    genres: ["Racing", "Action"],
    icp: "Director",
    score: 68,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Bot Rods = racing game. Part of growing Indian indie scene.",
    source: "research",
    tags: ["india", "director-target", "racing"]
  },
  {
    name: "Juego Studios",
    type: "studio",
    country: "India",
    city: "Bangalore",
    website: "https://www.juegostudio.com/",
    size: "51-200",
    games: [],
    genres: ["Service", "Enterprise", "AR/VR", "Narrative Design"],
    icp: "Director",
    score: 72,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Game development + enterprise solutions. Offers narrative design services. AR/VR + AI focus. Manufacturing, automotive, healthcare clients. Partnership angle for Director enterprise.",
    source: "research",
    tags: ["india", "director-target", "service", "enterprise", "ar-vr", "partnership"]
  },
  {
    name: "Toonz Media Group (Gaming)",
    type: "studio",
    country: "India",
    city: "Trivandrum",
    website: "https://toonz.co/gaming/",
    size: "51-200",
    games: [],
    genres: ["Mobile", "Casual", "Animation"],
    icp: "Director",
    score: 65,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Major Indian animation house with gaming division. 'Compelling narratives' in game design. Cross-platform mobile. Partnership angle.",
    source: "research",
    tags: ["india", "director-target", "mobile", "animation", "partnership"]
  }
];

async function seedIndiaDirectorLeads() {
  console.log(`Seeding ${leads.length} India Director leads...\n`);
  
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
    
    console.log(`✅ ${lead.name} (${lead.city || lead.country}) — ${lead.size} — Score ${lead.score}`);
    added++;
  }
  
  console.log(`\n✅ Added ${added}, skipped ${skipped}`);
  process.exit(0);
}

seedIndiaDirectorLeads().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
