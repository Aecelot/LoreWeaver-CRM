// Seed additional Asian studios for Director outreach (China + SEA)
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
    name: "NEKCOM Games",
    type: "studio",
    country: "China",
    city: "Wuhan",
    website: "https://nekcomgames.com/",
    size: "11-50",
    games: ["Showa American Story", "DYING: Reborn", "DYING: 1983"],
    genres: ["RPG", "Horror", "Narrative"],
    icp: "Director",
    score: 88,
    contact: {
      name: "Xiangyu Luo",
      role: "CEO / Creative Director",
      email: "",
      linkedin: ""
    },
    notes: "30+ employees in Wuhan, offices in NYC and Tokyo. Showa American Story = post-apocalyptic romance RPG, alternate history. '80s/'90s Japanese-American culture from Chinese perspective. Founded 2011. Recently acquired 20% by GCL.",
    source: "research",
    tags: ["narrative-heavy", "china", "director-target", "established", "cultural"]
  },
  {
    name: "New One Studio",
    type: "studio",
    country: "China",
    city: "",
    website: "",
    size: "2-10",
    games: ["Road to Empress"],
    genres: ["Interactive Movie", "Narrative", "Strategy"],
    icp: "Director",
    score: 85,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Road to Empress = Wu Zetian inspired interactive movie. Goal: become emperor (not just gain favor). 1M copies in 12 days. Filled market gap for polished female-protagonist historical narrative.",
    source: "research",
    tags: ["narrative-heavy", "china", "director-target", "interactive-movie", "hit"]
  },
  {
    name: "Citreat Studio",
    type: "studio",
    country: "China",
    city: "",
    website: "https://citreatstudio.itch.io/",
    size: "1-5",
    games: ["Zero-Sum Heart", "Death Trick: Double Blind"],
    genres: ["Visual Novel", "Narrative", "Romance"],
    icp: "Director",
    score: 78,
    contact: {
      name: "Mari & Jenny",
      role: "Founders (Writer & Artist)",
      email: "",
      linkedin: ""
    },
    notes: "2-person all-female studio. Zero-Sum Heart = romantic thriller visual novel about sacrifice and love. 93% positive on Steam. Available on Switch too.",
    source: "research",
    tags: ["narrative-heavy", "china", "director-target", "visual-novel", "small-team"]
  },
  {
    name: "POLLARD STUDIO",
    type: "studio",
    country: "China",
    city: "",
    website: "",
    size: "2-10",
    games: ["KARMA: The Dark World"],
    genres: ["Horror", "Narrative", "Psychological"],
    icp: "Director",
    score: 82,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "KARMA: The Dark World = first-person narrative-driven psychological horror. Player is Daniel, agent from Leviathan Bureau of Thought. Espionage, betrayal, dark secrets. Published by Gamirror Games.",
    source: "research",
    tags: ["narrative-heavy", "china", "director-target", "horror", "psychological"]
  },

  // PHILIPPINES
  {
    name: "Polychroma Games",
    type: "studio",
    country: "Philippines",
    city: "Manila",
    website: "https://store.steampowered.com/app/1574820/Until_Then/",
    size: "2-10",
    games: ["Until Then", "Let's Go There and Wander Nowhere"],
    genres: ["Adventure", "Narrative", "Slice-of-life"],
    icp: "Director",
    score: 92,
    contact: {
      name: "Mickole Klein Nulud",
      role: "Game Director / Founder",
      email: "",
      linkedin: ""
    },
    notes: "10 core people. Until Then = critically acclaimed narrative adventure set in Philippines after global catastrophe. High school setting, Filipino culture. Built with Godot Engine. Releasing on Switch 2025. PERFECT Director fit.",
    source: "research",
    tags: ["narrative-heavy", "philippines", "director-target", "cultural", "acclaimed"]
  },

  // INDONESIA
  {
    name: "Mojiken Studio",
    type: "studio",
    country: "Indonesia",
    city: "Surabaya",
    website: "https://mojikenstudio.com/",
    size: "2-10",
    games: ["A Space for the Unbound", "When the Past Was Around", "Coffee Talk"],
    genres: ["Adventure", "Narrative", "Slice-of-life"],
    icp: "Director",
    score: 90,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "7 employees. A Space for the Unbound = slice-of-life narrative adventure, supernatural elements. Acquired by Toge Productions 2023. Founded 2013. Multiple award-winning narrative games. EXCELLENT Director fit.",
    source: "research",
    tags: ["narrative-heavy", "indonesia", "director-target", "slice-of-life", "established"]
  },
  {
    name: "Toge Productions",
    type: "studio",
    country: "Indonesia",
    city: "Tangerang",
    website: "https://www.togeproductions.com/",
    size: "11-50",
    games: ["Coffee Talk", "Coffee Talk Episode 2", "Infectonator"],
    genres: ["Visual Novel", "Narrative", "Simulation"],
    icp: "Director",
    score: 88,
    contact: {
      name: "Antoni",
      role: "Founder",
      email: "",
      linkedin: ""
    },
    notes: "Publisher + developer. Coffee Talk = visual novel about barista in fantasy Seattle. Founded 2009. Also runs Toge Game Fund Initiative for SEA devs. Owns Mojiken now. 30+ games released.",
    source: "research",
    tags: ["narrative-heavy", "indonesia", "director-target", "publisher", "established"]
  },

  // MALAYSIA
  {
    name: "Kaigan Games",
    type: "studio",
    country: "Malaysia",
    city: "Kuala Lumpur",
    website: "https://kaigangames.com/",
    size: "11-50",
    games: ["Sara Is Missing", "SIMULACRA", "SIMULACRA 2", "SIMULACRA 3"],
    genres: ["Horror", "Narrative", "Found Phone"],
    icp: "Director",
    score: 90,
    contact: {
      name: "Shahrizar Roslan",
      role: "CEO",
      email: "",
      linkedin: ""
    },
    notes: "13 employees. Leading SEA indie horror studio. SIMULACRA series = found phone horror games. 7 international awards, millions of downloads, 10K+ Discord members. Founded 2016.",
    source: "research",
    tags: ["narrative-heavy", "malaysia", "director-target", "horror", "found-phone", "established"]
  },

  // Additional Korean studios from earlier research
  {
    name: "Garage Arts",
    type: "studio",
    country: "South Korea",
    city: "",
    website: "",
    size: "2-10",
    games: ["Oh! Robot: Legendary Mechanic"],
    genres: ["Shooter", "Roguelike", "Narrative"],
    icp: "Director",
    score: 72,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Oh! Robot = futuristic top-down shooter with AI/robot society themes. Available on STOVE Store. 89% user recommendation rate.",
    source: "research",
    tags: ["korea", "director-target", "roguelike", "ai-theme"]
  }
];

async function seedAsiaDirectorLeads2() {
  console.log(`Seeding ${leads.length} additional Asian Director leads...\n`);
  
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

seedAsiaDirectorLeads2().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
