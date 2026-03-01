// Seed Indonesia deep dive: Director targets
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
  // === TOP TIER - Award-winning narrative studios ===
  {
    name: "Toge Productions",
    type: "studio",
    country: "Indonesia",
    city: "Tangerang",
    website: "https://www.togeproductions.com/",
    size: "51-200",
    games: ["Coffee Talk", "Coffee Talk Episode 2", "Coffee Talk Tokyo", "Infectonator", "Necronator"],
    genres: ["Visual Novel", "Narrative", "Simulation", "Strategy"],
    icp: "Director",
    score: 95,
    contact: {
      name: "Kris Antoni",
      role: "CEO / Founder",
      email: "",
      linkedin: ""
    },
    notes: "53 employees (2025). Indonesia's LEADING indie publisher + developer. Founded 2011. Coffee Talk = global hit. ACQUIRED Mojiken Studio (2023). Runs Toge Game Fund Initiative to support ID indie devs. Publishes most major Indonesian narrative games. DREAM LEAD - both as customer AND as publishing partner.",
    source: "research",
    tags: ["narrative-heavy", "indonesia", "director-target", "publisher", "visual-novel", "scale", "coffee-talk"]
  },
  {
    name: "Mojiken Studio",
    type: "studio",
    country: "Indonesia",
    city: "Surabaya",
    website: "",
    size: "11-50",
    games: ["A Space for the Unbound", "When the Past was Around"],
    genres: ["Adventure", "Narrative", "Pixel Art", "Drama"],
    icp: "Director",
    score: 95,
    contact: {
      name: "Brigitta Rena Estidianti",
      role: "Co-founder / Supervising Artist",
      email: "",
      linkedin: ""
    },
    notes: "THE GAME AWARDS 2023 NOMINEE (Games for Impact). Indonesia Game Awards 2023: GOTY + Studio of the Year + Best Visual Arts + Best PC/Console. Japan Future Award 2022. SEA Game Awards 2020 Best Storytelling. 'A Space for the Unbound' = first Indonesian game nominated at The Game Awards. Now part of Toge Productions. PEAK NARRATIVE DNA.",
    source: "research",
    tags: ["narrative-heavy", "indonesia", "director-target", "award-winning", "game-awards-nominee", "pixel-art", "acquired"]
  },
  {
    name: "Pikselnesia",
    type: "studio",
    country: "Indonesia",
    city: "Remote (Jakarta)",
    website: "https://pikselnesia.com/",
    size: "2-10",
    games: ["Afterlove EP", "What Comes After"],
    genres: ["Narrative", "Dating Sim", "Rhythm", "Adventure"],
    icp: "Director",
    score: 90,
    contact: {
      name: "Mohammad Fahmi",
      role: "Founder",
      email: "",
      linkedin: ""
    },
    notes: "Fully remote studio. Fahmi = ex-Toge (worked on Coffee Talk), founded Pikselnesia to 'put Indonesia on the map'. Afterlove EP = dating sim + rhythm + narrative hybrid (Fellow Traveller published). What Comes After = emotional train journey. 'We love telling stories through video games.'",
    source: "research",
    tags: ["narrative-heavy", "indonesia", "director-target", "dating-sim", "rhythm", "fellow-traveller"]
  },
  {
    name: "Digital Happiness",
    type: "studio",
    country: "Indonesia",
    city: "Bandung",
    website: "https://www.digitalhappiness.net/",
    size: "11-50",
    games: ["DreadOut", "DreadOut 2", "DreadOut: Keepers of the Dark"],
    genres: ["Horror", "Adventure", "Narrative"],
    icp: "Director",
    score: 88,
    contact: {
      name: "Rachmad Imron",
      role: "Founder",
      email: "",
      linkedin: ""
    },
    notes: "Founded 2011 by Rachmad Imron + Vadi Vanadi. DreadOut = Indonesian folklore horror, 1M+ downloads. First Indonesian dev to succeed in international crowdfunding. PewDiePie played DreadOut (massive exposure). 'Our local ghosts are scarier than Slenderman.' Horror + narrative with Indonesian mythology.",
    source: "research",
    tags: ["narrative-heavy", "indonesia", "director-target", "horror", "crowdfunding-pioneer", "mythology"]
  },
  {
    name: "Rolling Glory Jam",
    type: "studio",
    country: "Indonesia",
    city: "Bandung",
    website: "https://rollinggloryjam.com/",
    size: "2-10",
    games: ["Rage in Peace", "What Comes After", "Hello Goodboy"],
    genres: ["Adventure", "Narrative", "Side-Scroller"],
    icp: "Director",
    score: 85,
    contact: {
      name: "",
      role: "",
      email: "jam@rollingglory.com",
      linkedin: ""
    },
    notes: "Small team (2 full-time on Rage in Peace). All games published by Toge. 'Meaningful narratives' focus. Rage in Peace = story-driven action side-scroller. Hello Goodboy = heartwarming. What Comes After (co-dev with Pikselnesia). Started from PewDiePie game jam prototype.",
    source: "research",
    tags: ["narrative-heavy", "indonesia", "director-target", "side-scroller", "meaningful-narratives"]
  },
  {
    name: "Berangin Creative",
    type: "studio",
    country: "Indonesia",
    city: "Indonesia",
    website: "",
    size: "2-10",
    games: ["Kejora"],
    genres: ["Puzzle", "Platformer", "Narrative", "Adventure"],
    icp: "Director",
    score: 82,
    contact: {
      name: "Bagaskara Firdaus",
      role: "Founder",
      email: "",
      linkedin: ""
    },
    notes: "Founded 2019 as art/animation outsourcing. Kejora = hand-drawn animated narrative puzzle platformer. Released Jan 2026 on PC/Switch/PS/Xbox. Published by Soft Source (Singapore). Part of Telkom Indonesia's Indigo Game incubator. 5 years of development. Originally Cuphead-inspired run n gun, pivoted to narrative puzzle.",
    source: "research",
    tags: ["narrative-heavy", "indonesia", "director-target", "puzzle", "hand-drawn", "incubated"]
  },
  {
    name: "Gambir Studios",
    type: "studio",
    country: "Indonesia",
    city: "Indonesia",
    website: "",
    size: "2-10",
    games: ["Spices of Life"],
    genres: ["Cooking", "Simulation", "Narrative"],
    icp: "Director",
    score: 78,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Spices of Life = cooking game with narrative elements. Featured at ID@Xbox GDC Showcase 2025. Represented Indonesia and SE Asia at Xbox showcase. Growing studio to watch.",
    source: "research",
    tags: ["indonesia", "director-target", "cooking", "xbox-featured", "simulation"]
  },

  // === LARGER STUDIOS / SERVICES ===
  {
    name: "Agate International",
    type: "studio",
    country: "Indonesia",
    city: "Bandung",
    website: "https://agate.id/",
    size: "201-500",
    games: [],
    genres: ["Service", "Mobile", "Porting", "Gamification"],
    icp: "Director",
    score: 75,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "LARGEST game dev company in Indonesia and one of largest in SEA. Founded 2009. Full-cycle dev, 3D art, porting services. Gamification clients. Scale partner angle for Director enterprise/middleware.",
    source: "research",
    tags: ["indonesia", "director-target", "service", "enterprise", "scale", "partnership"]
  },
  {
    name: "Dragon Game Studio",
    type: "studio",
    country: "Indonesia",
    city: "Bali",
    website: "",
    size: "2-10",
    games: [],
    genres: ["Indie", "Mobile"],
    icp: "Director",
    score: 68,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Bali-based indie studio. Founded 2012. 'Year of the Dragon' significance. Part of growing Indonesian indie ecosystem.",
    source: "research",
    tags: ["indonesia", "director-target", "bali", "indie"]
  },
  {
    name: "Soft Source",
    type: "publisher",
    country: "Singapore",
    city: "Singapore",
    website: "",
    size: "2-10",
    games: [],
    genres: ["Publisher", "Indie"],
    icp: "Director",
    score: 75,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Singapore-based indie publisher focused on SEA games. Published Kejora (Berangin Creative). Partnership angle - could intro Director to their Indonesian dev partners.",
    source: "research",
    tags: ["singapore", "director-target", "publisher", "partnership", "sea-focus"]
  }
];

async function seedIndonesiaDirectorLeads() {
  console.log(`Seeding ${leads.length} Indonesia Director leads...\n`);
  
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

seedIndonesiaDirectorLeads().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
