// Seed Asian Publishers interested in AI game tools
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
  // === TIER 1: HEAVILY INVESTING IN AI ===
  {
    name: "Krafton",
    type: "publisher",
    country: "South Korea",
    city: "Seoul",
    website: "https://www.krafton.com/",
    size: "1000+",
    games: ["PUBG", "inZOI", "Subnautica (acquired)"],
    genres: ["Battle Royale", "Life Sim", "Survival"],
    icp: "Director",
    score: 95,
    contact: {
      name: "",
      role: "Chief AI Officer (newly appointed)",
      email: "",
      linkedin: ""
    },
    notes: "$70-90M AI INVESTMENT (6% of 2024 revenue). Just appointed CHIEF AI OFFICER. 'AI-first company' transformation. inZOI features NVIDIA-partnered CPCs (Co-Playable Characters) with Smart Zoi NPCs. Record revenue 2024. DREAM PARTNER for Director enterprise.",
    source: "research",
    tags: ["publisher", "korea", "director-target", "ai-first", "nvidia-partner", "enterprise", "scale"]
  },
  {
    name: "NetEase",
    type: "publisher",
    country: "China",
    city: "Hangzhou",
    website: "https://www.neteasegames.com/",
    size: "1000+",
    games: ["Naraka: Bladepoint", "Egg Party", "Identity V"],
    genres: ["Action", "Battle Royale", "UGC"],
    icp: "Director",
    score: 90,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "NVIDIA ACE partner for AI gaming characters (Jan 2024). Egg Party uses AI for UGC creation. Investing in AI for NPC/narrative. Record 2025 revenue. 'AI bets paid off.'",
    source: "research",
    tags: ["publisher", "china", "director-target", "nvidia-ace", "ai-investment", "enterprise"]
  },
  {
    name: "Tencent Games",
    type: "publisher",
    country: "China",
    city: "Shenzhen",
    website: "https://game.qq.com/",
    size: "1000+",
    games: ["Honor of Kings", "PUBG Mobile", "League of Legends"],
    genres: ["MOBA", "Battle Royale", "Mobile"],
    icp: "Director",
    score: 88,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "NVIDIA ACE partner. World's largest gaming company. Investing in AI for smarter systems and dynamic worlds. Owns Riot, Supercell stakes. Partnership angle for Director at massive scale.",
    source: "research",
    tags: ["publisher", "china", "director-target", "nvidia-ace", "enterprise", "scale"]
  },
  {
    name: "HoYoverse / miHoYo",
    type: "publisher",
    country: "China",
    city: "Shanghai",
    website: "https://www.hoyoverse.com/",
    size: "1000+",
    games: ["Genshin Impact", "Honkai: Star Rail", "Zenless Zone Zero"],
    genres: ["Gacha", "RPG", "Action"],
    icp: "Director",
    score: 92,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "NVIDIA ACE partner. 'Reconstructing narrative logic with real-time multi-modal dialogue.' Focusing on 'emotionally driven companionship' (AI soulmates). Had project for 'procedurally generated stories' (cut 2025). STRONG NARRATIVE DNA + AI investment.",
    source: "research",
    tags: ["publisher", "china", "director-target", "nvidia-ace", "narrative", "ai-investment"]
  },
  {
    name: "NCSOFT",
    type: "publisher",
    country: "South Korea",
    city: "Seoul",
    website: "https://www.ncsoft.com/",
    size: "1000+",
    games: ["Lineage", "Guild Wars", "Blade & Soul", "Throne and Liberty"],
    genres: ["MMORPG", "Action RPG"],
    icp: "Director",
    score: 82,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Adopting AI for game development efficiency. Major Korean publisher. MMO expertise = complex NPC/dialogue needs.",
    source: "research",
    tags: ["publisher", "korea", "director-target", "mmo", "ai-adoption"]
  },
  {
    name: "Nexon",
    type: "publisher",
    country: "South Korea",
    city: "Seoul",
    website: "https://www.nexon.com/",
    size: "1000+",
    games: ["MapleStory", "Dungeon Fighter Online", "The First Descendant"],
    genres: ["MMORPG", "Looter Shooter", "F2P"],
    icp: "Director",
    score: 80,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Publishing Arc Raiders (uses AI voice). Strong 2024 profits. Adopting AI for development. Global reach.",
    source: "research",
    tags: ["publisher", "korea", "director-target", "ai-voice", "enterprise"]
  },

  // === TIER 2: NARRATIVE-FOCUSED INDIE PUBLISHERS ===
  {
    name: "Fellow Traveller",
    type: "publisher",
    country: "Australia",
    city: "Melbourne",
    website: "https://www.fellowtraveller.games/",
    size: "11-50",
    games: ["1000xRESIST", "Orwell", "Neo Cab", "Citizen Sleeper"],
    genres: ["Narrative", "Adventure", "Indie"],
    icp: "Director",
    score: 95,
    contact: {
      name: "Chris Wright",
      role: "Founder",
      email: "",
      linkedin: ""
    },
    notes: "THE narrative indie publisher. 'Push games forward as storytelling medium.' Runs LudoNarraCon. Published sunset visitor, Pikselnesia (Asian devs). 'Finding devs doing interesting things with narrative.' PERFECT PARTNER for Director positioning.",
    source: "research",
    tags: ["publisher", "australia", "director-target", "narrative-specialist", "indie", "ludonarracon"]
  },
  {
    name: "PLAYISM",
    type: "publisher",
    country: "Japan",
    city: "Tokyo",
    website: "https://playism.com/",
    size: "11-50",
    games: ["Momodora", "Record of Lodoss War", "Kero Blaster"],
    genres: ["Indie", "Action", "Narrative", "Metroidvania"],
    icp: "Director",
    score: 85,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Japan's leading indie publisher by Active Gaming Media. Localizes Western indies for Japan + Japanese indies globally. 'Narrative depth' as publishing criteria. Bridge to Japanese market.",
    source: "research",
    tags: ["publisher", "japan", "director-target", "localization", "indie", "narrative"]
  },
  {
    name: "Gamirror Games",
    type: "publisher",
    country: "China",
    city: "Shanghai / Tokyo",
    website: "https://www.gamirrorgames.com/",
    size: "11-50",
    games: ["Dyson Sphere Program", "Volcano Princess", "The Last Spell"],
    genres: ["Indie", "Simulation", "Strategy"],
    icp: "Director",
    score: 88,
    contact: {
      name: "Uzuki Tachibana",
      role: "JP President",
      email: "",
      linkedin: ""
    },
    notes: "Formerly Gamera Games. 94 games published, $111.6M lifetime revenue. Shanghai + Tokyo offices. 'Great games reflect life.' Supports small indie teams and students. Chinese indie ecosystem hub.",
    source: "research",
    tags: ["publisher", "china", "japan", "director-target", "indie", "scale"]
  },
  {
    name: "Chorus Worldwide",
    type: "publisher",
    country: "Japan",
    city: "Tokyo",
    website: "https://chorusworldwide.com/",
    size: "11-50",
    games: ["A Space for the Unbound", "Coffee Talk"],
    genres: ["Narrative", "Indie", "Adventure"],
    icp: "Director",
    score: 85,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Co-published A Space for the Unbound (TGA nominee) with Toge. Focuses on bringing Asian indie games to global audience. Narrative focus.",
    source: "research",
    tags: ["publisher", "japan", "director-target", "narrative", "asia-bridge"]
  },
  {
    name: "Toge Productions (Publishing)",
    type: "publisher",
    country: "Indonesia",
    city: "Tangerang",
    website: "https://www.togeproductions.com/",
    size: "51-200",
    games: ["Coffee Talk", "A Space for the Unbound", "Rage in Peace"],
    genres: ["Narrative", "Visual Novel", "Indie"],
    icp: "Director",
    score: 92,
    contact: {
      name: "Kris Antoni",
      role: "CEO",
      email: "",
      linkedin: ""
    },
    notes: "Indonesia's leading indie publisher. 53 employees. Toge Game Fund supports devs. Publishes most major Indonesian narrative games. 'Meaningful narratives' philosophy. COULD LICENSE Director for their portfolio.",
    source: "research",
    tags: ["publisher", "indonesia", "director-target", "narrative", "toge-fund"]
  },

  // === TIER 3: MAJOR JAPANESE PUBLISHERS ===
  {
    name: "Bandai Namco",
    type: "publisher",
    country: "Japan",
    city: "Tokyo",
    website: "https://www.bandainamcoent.com/",
    size: "1000+",
    games: ["Elden Ring", "Tekken", "Tales of", "Gundam"],
    genres: ["Action RPG", "Fighting", "JRPG"],
    icp: "Director",
    score: 78,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "CESA report: Uses AI in development. Invested in DeepMotion for AI motion tech. Building new in-house engine. #1 in Japan game patents 2024. Tales series = major narrative franchise.",
    source: "research",
    tags: ["publisher", "japan", "director-target", "ai-adoption", "jrpg", "enterprise"]
  },
  {
    name: "Square Enix",
    type: "publisher",
    country: "Japan",
    city: "Tokyo",
    website: "https://www.square-enix.com/",
    size: "1000+",
    games: ["Final Fantasy", "Dragon Quest", "NieR", "Kingdom Hearts"],
    genres: ["JRPG", "Action RPG"],
    icp: "Director",
    score: 80,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "CESA report: Uses AI in development. Final Fantasy / NieR = peak narrative JRPG. 'AI-native studio' potential. Divesting non-core assets = looking for efficiency.",
    source: "research",
    tags: ["publisher", "japan", "director-target", "ai-adoption", "jrpg", "narrative"]
  },
  {
    name: "Sega",
    type: "publisher",
    country: "Japan",
    city: "Tokyo",
    website: "https://www.sega.com/",
    size: "1000+",
    games: ["Yakuza/Like a Dragon", "Persona", "Sonic"],
    genres: ["Action RPG", "JRPG", "Platformer"],
    icp: "Director",
    score: 82,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "CESA report: Uses AI in development. Yakuza/Like a Dragon = heavy narrative with many NPCs. Persona = social sim + narrative. Strong IP portfolio with dialogue-heavy games.",
    source: "research",
    tags: ["publisher", "japan", "director-target", "ai-adoption", "jrpg", "narrative"]
  },

  // === ADDITIONAL ASIAN PUBLISHERS ===
  {
    name: "Kakao Games",
    type: "publisher",
    country: "South Korea",
    city: "Seoul",
    website: "https://www.kakaogamescorp.com/",
    size: "201-500",
    games: ["ODIN: Valhalla Rising", "Path of Exile 2 (publishing)"],
    genres: ["MMORPG", "Action RPG"],
    icp: "Director",
    score: 72,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Major Korean publisher. 2025 loss after layoffs. May need efficiency tools. Part of Kakao Corp ecosystem.",
    source: "research",
    tags: ["publisher", "korea", "director-target", "mmo"]
  },
  {
    name: "Netmarble",
    type: "publisher",
    country: "South Korea",
    city: "Seoul",
    website: "https://www.netmarble.com/",
    size: "1000+",
    games: ["MARVEL Future Fight", "Ni no Kuni: Cross Worlds", "The Seven Deadly Sins"],
    genres: ["Mobile RPG", "Action"],
    icp: "Director",
    score: 75,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Adopting AI for development efficiency. Major mobile publisher. IP-based games with narrative needs.",
    source: "research",
    tags: ["publisher", "korea", "director-target", "mobile", "ai-adoption"]
  }
];

async function seedAsiaPublishers() {
  console.log(`Seeding ${leads.length} Asian Publisher leads...\n`);
  
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

seedAsiaPublishers().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
