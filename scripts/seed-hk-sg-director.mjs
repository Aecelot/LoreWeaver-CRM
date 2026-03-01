// Seed Hong Kong & Singapore deep dive: Director targets
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
  // === HONG KONG / HK DIASPORA ===
  {
    name: "sunset visitor 斜陽過客",
    type: "studio",
    country: "Canada",
    city: "Vancouver",
    website: "https://www.sunsetvisitor.studio/",
    size: "2-10",
    games: ["1000xRESIST"],
    genres: ["Adventure", "Narrative", "Sci-Fi", "Drama"],
    icp: "Director",
    score: 95,
    contact: {
      name: "Remy Siu",
      role: "Creative Director / Founder",
      email: "",
      linkedin: ""
    },
    notes: "4 people. HK diaspora in Vancouver. 1000xRESIST = PEABODY AWARD WINNER. Overwhelmingly Positive on Steam. Themes: HK protests, COVID, intergenerational trauma. Backgrounds in theatre/dance/performance art. Publisher: Fellow Traveller. DREAM LEAD.",
    source: "research",
    tags: ["narrative-heavy", "hk-diaspora", "director-target", "peabody", "award-winning", "indie"]
  },
  {
    name: "Genuine Studio",
    type: "studio",
    country: "Hong Kong",
    city: "Hong Kong",
    website: "",
    size: "2-10",
    games: ["Detective Kobayashi"],
    genres: ["Visual Novel", "Mystery", "Narrative"],
    icp: "Director",
    score: 85,
    contact: {
      name: "",
      role: "CEO",
      email: "",
      linkedin: ""
    },
    notes: "5 people. Detective Kobayashi = visual novel inspired by Danganronpa and Sherlock Holmes. CEO is a writer who created Kobayashi character 17 years ago. Narrative-driven VN, 4 crime case chapters. Released on iOS 2015, Steam later.",
    source: "research",
    tags: ["narrative-heavy", "hong-kong", "director-target", "visual-novel", "mystery"]
  },
  {
    name: "GameOne",
    type: "studio",
    country: "Hong Kong",
    city: "Hong Kong",
    website: "",
    size: "11-50",
    games: ["求婚365日", "魔鬼推銷員", "大魔王物語", "馬場風雲", "永恒传说"],
    genres: ["RPG", "Simulation", "Adventure"],
    icp: "Director",
    score: 70,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Veteran HK studio (1990s-2000s). Multiple narrative/simulation games. Historical significance in HK gaming scene. May be less active now but worth checking status.",
    source: "research",
    tags: ["hong-kong", "director-target", "veteran", "rpg"]
  },

  // === SINGAPORE ===
  {
    name: "Witching Hour Studios",
    type: "studio",
    country: "Singapore",
    city: "Singapore",
    website: "http://www.witching-hour.net/",
    size: "2-10",
    games: ["Masquerada: Songs and Shadows", "Ravenmark: Scourge of Estellion"],
    genres: ["Tactical RPG", "Strategy", "Narrative"],
    icp: "Director",
    score: 92,
    contact: {
      name: "Ian Gregory Tan",
      role: "Co-founder / Creative Director",
      email: "enquiries@witching-hour.net",
      linkedin: ""
    },
    notes: "Founded 2010 by 3 friends. FIRST SG INDIE TO HIRE FULL-TIME NARRATIVE DESIGNER. Ian = former D&D dungeon master. 'We've always been about stories.' Masquerada = Dragon Age-inspired tactical RPG, Venetian fantasy. Singapore's most successful indie. DigiPen alumni.",
    source: "research",
    tags: ["narrative-heavy", "singapore", "director-target", "tactical-rpg", "narrative-designer", "award-winning"]
  },
  {
    name: "General Interactive Co.",
    type: "studio",
    country: "Singapore",
    city: "Singapore",
    website: "http://www.generalinteractive.co/",
    size: "2-10",
    games: ["Chinatown Detective Agency"],
    genres: ["Point-and-Click", "Mystery", "Narrative", "Cyberpunk"],
    icp: "Director",
    score: 90,
    contact: {
      name: "Mark, Ricardo, Rik",
      role: "Founders",
      email: "",
      linkedin: ""
    },
    notes: "Founded by 3 people. Chinatown Detective Agency = cybernoir point-and-click set in 2037 Singapore. Carmen Sandiego inspired. Real-world research mechanics. Published by Humble Games. Full voice acting with local Singapore talent. Released 2022 on PC/Switch/Xbox.",
    source: "research",
    tags: ["narrative-heavy", "singapore", "director-target", "point-and-click", "mystery", "cyberpunk"]
  },
  {
    name: "Gattai Games",
    type: "studio",
    country: "Singapore",
    city: "Singapore",
    website: "https://www.gattaigames.com/",
    size: "2-10",
    games: ["Stifled", "Lurking"],
    genres: ["Horror", "VR", "Narrative", "Stealth"],
    icp: "Director",
    score: 85,
    contact: {
      name: "Justin Ng Guo Xiong",
      role: "Co-founder",
      email: "",
      linkedin: ""
    },
    notes: "4-5 people (4 friends). Founded 2014. 'Gattai' = Japanese for 'combine'. Stifled = MULTI-AWARD WINNING VR horror, mic-enabled (enemies hear your screams). Focusing on NARRATIVE TENSION over cheap jump scares. DigiPen alumni. Student game Lurking evolved into Stifled.",
    source: "research",
    tags: ["narrative-heavy", "singapore", "director-target", "vr", "horror", "award-winning", "innovative"]
  },
  {
    name: "BattleBrew Productions",
    type: "studio",
    country: "Singapore",
    city: "Singapore",
    website: "https://www.battle-brew.com/",
    size: "11-50",
    games: ["Cuisineer", "HellHeart Breaker", "Noodle Souperstar"],
    genres: ["Roguelike", "Action", "Dating Sim"],
    icp: "Director",
    score: 78,
    contact: {
      name: "Sebastian Kuah",
      role: "Lead Programmer",
      email: "",
      linkedin: ""
    },
    notes: "10+ production team. Founded 2017. DigiPen alumni + former AAA staff. Cuisineer = food-focused roguelike published by XSEED/Marvelous. HellHeart Breaker = action roguelite + dating sim (narrative angle). Angel investment 2017.",
    source: "research",
    tags: ["singapore", "director-target", "roguelike", "dating-sim", "funded"]
  },

  // === ADDITIONAL SINGAPORE INDIES ===
  {
    name: "Erabit Studios",
    type: "studio",
    country: "Singapore",
    city: "Singapore",
    website: "https://erabit.com/",
    size: "11-50",
    games: [],
    genres: ["Publisher", "Mobile", "PC"],
    icp: "Director",
    score: 72,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Singapore-based publisher and developer HQ. Could be partnership angle for Director distribution in SEA market.",
    source: "research",
    tags: ["singapore", "director-target", "publisher", "partnership"]
  },
  {
    name: "Springloaded",
    type: "studio",
    country: "Singapore",
    city: "Singapore",
    website: "https://springloaded.co/",
    size: "2-10",
    games: ["Super Mash"],
    genres: ["Action", "Roguelike", "Indie"],
    icp: "Director",
    score: 70,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Singapore indie. Super Mash = genre-mashing roguelike. Worth investigating for narrative angle.",
    source: "research",
    tags: ["singapore", "director-target", "roguelike"]
  },

  // === HK PUBLISHERS / LARGER STUDIOS ===
  {
    name: "37GAMES (Overseas)",
    type: "publisher",
    country: "Hong Kong",
    city: "Hong Kong",
    website: "https://sea.37games.com/",
    size: "51-200",
    games: ["Soul Land", "King's Romance", "Blades and Rings"],
    genres: ["Mobile", "RPG", "Strategy"],
    icp: "Director",
    score: 68,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Major Chinese publisher with HK office. Parent company 37 Interactive Entertainment (China). Mobile/browser RPGs. Large scale - partnership angle for Director in mobile RPG market.",
    source: "research",
    tags: ["hong-kong", "director-target", "publisher", "mobile", "partnership", "scale"]
  },
  {
    name: "Eastasiasoft",
    type: "publisher",
    country: "Hong Kong",
    city: "Hong Kong",
    website: "https://www.eastasiasoft.com/",
    size: "11-50",
    games: [],
    genres: ["Publisher", "Indie"],
    icp: "Director",
    score: 72,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "HK-based indie publisher. Publishes narrative games from Asian developers. Partnership angle - could introduce Director to their dev partners.",
    source: "research",
    tags: ["hong-kong", "director-target", "publisher", "partnership", "indie"]
  },
  {
    name: "6waves",
    type: "publisher",
    country: "Hong Kong",
    city: "Hong Kong",
    website: "https://www.6waves.com/",
    size: "51-200",
    games: [],
    genres: ["Mobile", "Social", "Strategy"],
    icp: "Director",
    score: 65,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Major mobile game publisher. Founded 2008. Social/strategy games. Less narrative focus but scale opportunity.",
    source: "research",
    tags: ["hong-kong", "director-target", "publisher", "mobile", "scale"]
  }
];

async function seedHKSGDirectorLeads() {
  console.log(`Seeding ${leads.length} HK/SG Director leads...\n`);
  
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

seedHKSGDirectorLeads().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
