// Seed batch 5: More Singapore + Japan + diversified leads
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
  // SINGAPORE
  {
    name: "The Gentlebros",
    type: "studio",
    country: "Singapore",
    city: "Singapore",
    website: "https://thegentlebros.com/",
    size: "2-10",
    games: ["Cat Quest", "Cat Quest II", "Cat Quest III", "Slashy Hero"],
    genres: ["Action", "RPG", "Adventure", "Narrative"],
    icp: "Director",
    score: 85,
    contact: {
      name: "Desmond Wong",
      role: "Co-founder",
      email: "",
      linkedin: ""
    },
    notes: "3-4 core people, recently expanded. Cat Quest franchise made $5M+ in 3 years. Award-winning. Fun narrative with adventure gameplay. DigiPen Singapore alumni.",
    source: "research",
    tags: ["narrative-heavy", "singapore", "director-target", "award-winner", "profitable"]
  },
  {
    name: "BattleBrew Productions",
    type: "studio",
    country: "Singapore",
    city: "Singapore",
    website: "https://www.battle-brew.com/",
    size: "11-50",
    games: ["Cuisineer", "Battlesky TapTap"],
    genres: ["Action", "Roguelike", "Simulation", "Narrative"],
    icp: "Director",
    score: 78,
    contact: {
      name: "Benjamin Chua",
      role: "Co-founder",
      email: "",
      linkedin: ""
    },
    notes: "12 veteran developers (ex-Ubisoft, Gameloft, Gumi). Cuisineer = action roguelike + restaurant sim. Crystal Dynamics spotlight as AAPI studio.",
    source: "research",
    tags: ["singapore", "director-target", "roguelike", "veteran-team"]
  },
  {
    name: "Daylight Studios",
    type: "studio",
    country: "Singapore",
    city: "Singapore",
    website: "https://www.day-lightstudios.com/",
    size: "11-50",
    games: ["Holy Potatoes! A Weapon Shop?!", "Holy Potatoes! We're in Space?!", "Holy Potatoes! What the Hell?!"],
    genres: ["Simulation", "RPG", "Narrative", "Comedy"],
    icp: "Director",
    score: 75,
    contact: {
      name: "Alwyn Lee",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Founded 2011. Holy Potatoes! series = comedic simulation/RPG franchise with narrative elements. Also runs DaylightX incubator for new games.",
    source: "research",
    tags: ["singapore", "director-target", "simulation", "comedy", "franchise"]
  },

  // JAPAN
  {
    name: "SerialProject",
    type: "studio",
    country: "Japan",
    city: "",
    website: "",
    size: "1-5",
    games: ["SerialWorld"],
    genres: ["RPG", "Deckbuilder", "Narrative", "Comedy"],
    icp: "Director",
    score: 72,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "2 core members, established 2023. SerialWorld = 'comedic yet serious RPG' + deckbuilder. Small team, narrative-focused.",
    source: "research",
    tags: ["japan", "director-target", "deckbuilder", "small-team"]
  },
  {
    name: "KEIZO (Astlibra dev)",
    type: "studio",
    country: "Japan",
    city: "",
    website: "",
    size: "1-5",
    games: ["Astlibra Revision", "Astlibra Gaiden"],
    genres: ["Action", "RPG", "Narrative"],
    icp: "Director",
    score: 85,
    contact: {
      name: "KEIZO",
      role: "Solo Developer",
      email: "",
      linkedin: ""
    },
    notes: "SOLO DEV spent 15 YEARS making Astlibra. One of highest-rated JRPGs on Steam. 'Fractal narrative' praise. Overwhelmingly Positive.",
    source: "research",
    tags: ["narrative-heavy", "japan", "director-target", "solo-dev", "acclaim"]
  },
  {
    name: "Compile Heart",
    type: "studio",
    country: "Japan",
    city: "Tokyo",
    website: "https://www.compileheart.com/",
    size: "51-200",
    games: ["Mary Skelter", "Death end re;Quest", "Neptunia", "Calamity Angels"],
    genres: ["RPG", "Dungeon Crawler", "Narrative"],
    icp: "Director",
    score: 82,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Mid-sized Japanese studio. Mary Skelter and Death end re;Quest = narrative-heavy RPGs. Part of Idea Factory. Good narrative track record.",
    source: "research",
    tags: ["narrative-heavy", "japan", "director-target", "rpg", "established"]
  },

  // KOREA additional
  {
    name: "INNO Games Korea",
    type: "studio",
    country: "South Korea",
    city: "Seoul",
    website: "",
    size: "2-10",
    games: [],
    genres: ["Visual Novel", "Narrative"],
    icp: "Director",
    score: 70,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Small Korean VN studio. Part of growing K-VN scene.",
    source: "research",
    tags: ["korea", "director-target", "visual-novel"]
  },

  // THAILAND additional
  {
    name: "Erost Game79 Studio",
    type: "studio",
    country: "Thailand",
    city: "",
    website: "",
    size: "1-5",
    games: ["Tale of REN"],
    genres: ["Visual Novel", "Narrative", "Fantasy"],
    icp: "Director",
    score: 70,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Thai VN developer. Tale of REN = fantasy VN about Mizu Ren Nanami's journey. Featured in SEA VN showcase.",
    source: "research",
    tags: ["thailand", "director-target", "visual-novel"]
  }
];

async function seedAsiaDirectorLeads5() {
  console.log(`Seeding ${leads.length} batch 5 Director leads...\n`);
  
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

seedAsiaDirectorLeads5().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
