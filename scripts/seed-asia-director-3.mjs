// Seed final batch of Asian studios for Director outreach (Thailand + Japan + Singapore)
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
  // THAILAND
  {
    name: "FairPlay Studios",
    type: "studio",
    country: "Thailand",
    city: "Bangkok",
    website: "https://fairplaystudios.net/",
    size: "11-50",
    games: ["The Land Beneath Us", "Fallen Knight", "Nightmare Circus"],
    genres: ["Action", "Roguelike", "Platformer"],
    icp: "Director",
    score: 78,
    contact: {
      name: "Thanisorn Boonsoong",
      role: "CEO",
      email: "",
      linkedin: ""
    },
    notes: "Leading Thai indie studio. The Land Beneath Us won multiple awards (TGS 2023, BIDC 2024). First Thai game on Apple Arcade (Fallen Knight). Game industry veterans.",
    source: "research",
    tags: ["thailand", "director-target", "roguelike", "award-winner"]
  },

  // JAPAN
  {
    name: "Too Kyo Games",
    type: "studio",
    country: "Japan",
    city: "Tokyo",
    website: "",
    size: "2-10",
    games: ["World's End Club", "Rain Code", "ENIGMA ARCHIVES: RAIN CODE"],
    genres: ["Adventure", "Visual Novel", "Narrative", "Mystery"],
    icp: "Director",
    score: 95,
    contact: {
      name: "Kazutaka Kodaka",
      role: "CEO / Creator",
      email: "",
      linkedin: ""
    },
    notes: "7 core members. Founded by Danganronpa creator (Kodaka) + Zero Escape creator (Uchikoshi). LEGENDARY narrative game creators. Focus on mystery/psychological narrative. PERFECT Director fit — narrative is their entire identity.",
    source: "research",
    tags: ["narrative-heavy", "japan", "director-target", "legendary", "mystery", "vn"]
  },
  {
    name: "PLAYISM",
    type: "studio",
    country: "Japan",
    city: "Tokyo",
    website: "https://playism.com/",
    size: "11-50",
    games: ["SIGNALIS", "Momodora", "Deeeer Simulator"],
    genres: ["Publisher", "Indie", "Various"],
    icp: "Director",
    score: 75,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Japanese indie publisher. Handles many narrative Japanese indies. Good for partnership/publishing relationship. SIGNALIS = narrative sci-fi horror hit.",
    source: "research",
    tags: ["japan", "director-target", "publisher", "indie-focused"]
  },

  // Additional smaller Korean studios
  {
    name: "VIC Game Studios",
    type: "studio",
    country: "South Korea",
    city: "",
    website: "",
    size: "11-50",
    games: ["Breakers: Unlock the World"],
    genres: ["RPG", "Anime", "Mobile"],
    icp: "Director",
    score: 70,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Breakers = anime-style RPG published by NCSoft. Multi-character combat, gacha, airships exploration. Less narrative-focused but good NCSoft connection.",
    source: "research",
    tags: ["korea", "director-target", "mobile", "ncsoft-backed"]
  },

  // SINGAPORE
  {
    name: "Witching Hour Studios",
    type: "studio",
    country: "Singapore",
    city: "Singapore",
    website: "https://witchinghourstudios.com/",
    size: "2-10",
    games: ["Masquerada: Songs and Shadows", "Ravenwatch"],
    genres: ["RPG", "Tactical", "Narrative"],
    icp: "Director",
    score: 85,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Masquerada = tactical RPG with rich narrative, fully voiced. Set in Venetian-inspired fantasy world. Won multiple awards. Ravenwatch = upcoming co-op action RPG. Strong narrative DNA.",
    source: "research",
    tags: ["narrative-heavy", "singapore", "director-target", "rpg", "tactical"]
  },

  // VIETNAM
  {
    name: "Senses Studios",
    type: "studio",
    country: "Vietnam",
    city: "Ho Chi Minh City",
    website: "",
    size: "2-10",
    games: ["Sense - A Cyberpunk Ghost Story"],
    genres: ["Horror", "Adventure", "Narrative", "Cyberpunk"],
    icp: "Director",
    score: 82,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Sense = 2.5D horror adventure with narrative focus. Neo Hong Kong 2083 setting. Cantonese horror folklore + cyberpunk aesthetic. Strong cultural narrative.",
    source: "research",
    tags: ["narrative-heavy", "vietnam", "director-target", "horror", "cyberpunk"]
  },

  // Additional Taiwan
  {
    name: "18Light Game",
    type: "studio",
    country: "Taiwan",
    city: "Taipei",
    website: "",
    size: "2-10",
    games: ["MO:Astray", "MO:Astray 2"],
    genres: ["Platformer", "Puzzle", "Narrative"],
    icp: "Director",
    score: 80,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "MO:Astray = puzzle platformer with sci-fi narrative about alien organism. Won 2020 Taipei Game Show Best Indie Game. Critically acclaimed storytelling.",
    source: "research",
    tags: ["narrative-heavy", "taiwan", "director-target", "platformer", "award-winner"]
  }
];

async function seedAsiaDirectorLeads3() {
  console.log(`Seeding ${leads.length} final Asian Director leads...\n`);
  
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

seedAsiaDirectorLeads3().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
