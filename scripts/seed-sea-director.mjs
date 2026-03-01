// Seed SEA focus: Vietnam, Philippines, Thailand (Director targets)
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
  // ========== VIETNAM ==========
  {
    name: "Hiker Games",
    type: "studio",
    country: "Vietnam",
    city: "Ho Chi Minh City",
    website: "https://www.hikergames.com/",
    size: "11-50",
    games: ["7554", "300475", "HeroVerse"],
    genres: ["FPS", "Action", "Historical", "Narrative"],
    icp: "Director",
    score: 80,
    contact: {
      name: "Nguyen Tuan Huy",
      role: "Director",
      email: "",
      linkedin: ""
    },
    notes: "Pioneer 'Made in Vietnam' studio since 2009. 7554 = FPS based on First Indochina War. 300475 = Vietnam War game (crowdfunded). Historical narrative focus. Recently moved into blockchain but original core is narrative historical games.",
    source: "research",
    tags: ["narrative-heavy", "vietnam", "director-target", "historical", "pioneer"]
  },
  {
    name: "Rare Reversee",
    type: "studio",
    country: "Vietnam",
    city: "",
    website: "",
    size: "2-10",
    games: ["The Scourge | Tai Ương"],
    genres: ["Horror", "Adventure", "Narrative", "Psychological"],
    icp: "Director",
    score: 78,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "The Scourge (Tai Ương) = psychological horror adventure, released Oct 2024. Vietnamese folklore horror. Small team with Beaztek.",
    source: "research",
    tags: ["narrative-heavy", "vietnam", "director-target", "horror", "folklore"]
  },
  {
    name: "Sipher",
    type: "studio",
    country: "Vietnam",
    city: "Ho Chi Minh City",
    website: "",
    size: "11-50",
    games: ["Sipher Odyssey"],
    genres: ["ARPG", "Roguelike", "Action"],
    icp: "Director",
    score: 72,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Vietnam indie studio. Sipher Odyssey = ARPG shooter with roguelike elements. 2+ years in development. Active on Reddit.",
    source: "research",
    tags: ["vietnam", "director-target", "arpg", "roguelike"]
  },
  {
    name: "Bravestars Games",
    type: "studio",
    country: "Vietnam",
    city: "",
    website: "",
    size: "11-50",
    games: [],
    genres: ["Mobile", "Casual"],
    icp: "Director",
    score: 65,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Founded 2013 by young gamers aiming to bring Vietnamese culture to the world. Mobile-focused but cultural narrative angle.",
    source: "research",
    tags: ["vietnam", "director-target", "mobile", "cultural"]
  },

  // ========== PHILIPPINES ==========
  {
    name: "Squeaky Wheel",
    type: "studio",
    country: "Philippines",
    city: "Manila",
    website: "https://www.squeakywheel.ph/",
    size: "2-10",
    games: ["Political Animals", "Academia: School Simulator", "Ruinarch"],
    genres: ["Simulation", "Strategy", "Narrative"],
    icp: "Director",
    score: 82,
    contact: {
      name: "Ryan Sumo",
      role: "Co-founder",
      email: "",
      linkedin: ""
    },
    notes: "Founded 2015 by veterans (Ryan Sumo, Tristan Angeles, Marnielle Estrada). IGDA Manila roots. Political Animals = satirical election sim. Academia IP sold to Paradox in 2022! Ryan worked at PDX then returned to indie. Publisher of Ruinarch.",
    source: "research",
    tags: ["narrative-heavy", "philippines", "director-target", "simulation", "veteran", "paradox-connection"]
  },
  {
    name: "Maccima Games",
    type: "studio",
    country: "Philippines",
    city: "Manila",
    website: "https://www.maccima.com/",
    size: "1-5",
    games: ["Ruinarch"],
    genres: ["Strategy", "Simulation", "God Game"],
    icp: "Director",
    score: 78,
    contact: {
      name: "Marvin Apacible",
      role: "Co-founder",
      email: "",
      linkedin: ""
    },
    notes: "3 Filipino founders. Ruinarch = 'evil overlord simulator' where you wreak havoc on villagers. Published by Squeaky Wheel. 'Spreading rumors, creating chaos' — Director-style narrative manipulation!",
    source: "research",
    tags: ["narrative-heavy", "philippines", "director-target", "god-game", "chaos-sim"]
  },
  {
    name: "Ranida Games",
    type: "studio",
    country: "Philippines",
    city: "San Pedro Laguna",
    website: "",
    size: "2-10",
    games: [],
    genres: ["Indie", "Various"],
    icp: "Director",
    score: 68,
    contact: {
      name: "Ben Banta",
      role: "CEO / Head of Games",
      email: "",
      linkedin: ""
    },
    notes: "Founded 2015. Division of Ranida Studios Inc. CEO Ben Banta, Walter Manalo (Head of BD).",
    source: "research",
    tags: ["philippines", "director-target"]
  },
  {
    name: "Lawmage Academy (Verinius)",
    type: "studio",
    country: "Philippines",
    city: "",
    website: "",
    size: "1-5",
    games: ["Lawmage Academy"],
    genres: ["RPG", "Narrative", "Adventure"],
    icp: "Director",
    score: 80,
    contact: {
      name: "Gian Arabejo",
      role: "Developer (human rights lawyer)",
      email: "",
      linkedin: ""
    },
    notes: "Solo dev who is a HUMAN RIGHTS LAWYER. Lawmage Academy = RPG exploring moral/ethical philosophy. No simple 'morality system' — deeper narrative about what it means to be 'good'. PERFECT Director philosophy.",
    source: "research",
    tags: ["narrative-heavy", "philippines", "director-target", "rpg", "philosophy", "solo-dev"]
  },

  // ========== THAILAND ==========
  {
    name: "Urnique Studio",
    type: "studio",
    country: "Thailand",
    city: "Bangkok",
    website: "https://www.urniquestudio.com/",
    size: "2-10",
    games: ["Timelie", "Slap 'em UP!"],
    genres: ["Puzzle", "Adventure", "Narrative", "Time Manipulation"],
    icp: "Director",
    score: 88,
    contact: {
      name: "Parimeth Wongsatayanon",
      role: "Co-founder",
      email: "",
      linkedin: ""
    },
    notes: "5 core members (now 11-50). Timelie = award-winning time-manipulation stealth puzzle. COVID popularity surge. 'Deliver Experience Beyond Imagination' motto. PERFECT narrative puzzle fit for Director.",
    source: "research",
    tags: ["narrative-heavy", "thailand", "director-target", "puzzle", "time", "award-winner"]
  },
  {
    name: "Yggdrazil Group",
    type: "studio",
    country: "Thailand",
    city: "Bangkok",
    website: "",
    size: "51-200",
    games: ["Home Sweet Home", "Home Sweet Home EP2", "Home Sweet Home Survive"],
    genres: ["Horror", "Survival", "Narrative", "VR"],
    icp: "Director",
    score: 85,
    contact: {
      name: "Adam Abdularee",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "PUBLICLY LISTED (MAI 2020). Thailand's 2nd largest CG company. Home Sweet Home = Thai folklore horror series. 173M baht revenue (2018). Hollywood film 'Home Sweet Home Rebirth' in production! VR + narrative horror expertise.",
    source: "research",
    tags: ["narrative-heavy", "thailand", "director-target", "horror", "vr", "public-company", "hollywood"]
  },
  {
    name: "Sanuk Games",
    type: "studio",
    country: "Thailand",
    city: "Bangkok",
    website: "https://www.sanukgames.com/",
    size: "11-50",
    games: [],
    genres: ["Arcade", "Casual", "Ports"],
    icp: "Director",
    score: 70,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "15 employees. Veteran studio with programmers, artists, designers. Cross-platform (console/PC). Does ports and original games. 'Sanuk' means 'fun' in Thai.",
    source: "research",
    tags: ["thailand", "director-target", "veteran", "multiplatform"]
  },
  {
    name: "Vermillion Digital",
    type: "studio",
    country: "Thailand",
    city: "",
    website: "",
    size: "2-10",
    games: ["M.A.S.S. Builder"],
    genres: ["Action", "Mecha", "RPG"],
    icp: "Director",
    score: 75,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "M.A.S.S. Builder = mecha action RPG. 80s mecha anime inspired. Indie darling mentioned alongside Timelie and Land Beneath Us.",
    source: "research",
    tags: ["thailand", "director-target", "mecha", "action"]
  },
  {
    name: "Bit Egg Inc",
    type: "studio",
    country: "Thailand",
    city: "",
    website: "https://bitegginc.com/",
    size: "51-200",
    games: [],
    genres: ["Art Outsourcing", "Animation"],
    icp: "Director",
    score: 65,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "One of Thailand's largest game art/animation outsourcing studios. Clients: Square Enix, WayForward, Jam City. Could be partnership angle for Director — they provide art for narrative games.",
    source: "research",
    tags: ["thailand", "director-target", "outsourcing", "art", "partnership"]
  }
];

async function seedSEADirectorLeads() {
  console.log(`Seeding ${leads.length} SEA Director leads (Vietnam/Philippines/Thailand)...\n`);
  
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

seedSEADirectorLeads().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
