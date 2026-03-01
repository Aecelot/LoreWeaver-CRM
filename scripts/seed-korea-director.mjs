// Seed South Korean studios for Director outreach
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
  {
    name: "Project Moon",
    type: "studio",
    country: "South Korea",
    city: "Seoul",
    website: "https://projectmoon.studio/",
    size: "11-50",
    games: ["Lobotomy Corporation", "Library of Ruina", "Limbus Company"],
    genres: ["RPG", "Deck-builder", "Narrative"],
    icp: "Director",
    score: 90,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "~45 employees. Deep narrative universe with interconnected lore. Full Korean voice acting. Dynamic NPC behavior would fit their complex character systems. On-device = fits premium positioning. Twitter @ProjMoonStudio.",
    source: "research",
    tags: ["narrative-heavy", "korea", "director-target", "established"]
  },
  {
    name: "Dvora Studio",
    type: "studio",
    country: "South Korea",
    city: "Seoul",
    website: "https://www.dvorastudio.com/",
    size: "2-10",
    games: ["The Coma: Cutting Class", "The Coma 2: Vicious Sisters", "Vambrace: Cold Soul", "Scarlet Hood"],
    genres: ["Horror", "Adventure", "Narrative"],
    icp: "Director",
    score: 85,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: "https://www.linkedin.com/company/devespresso-games"
    },
    notes: "Formerly Devespresso Games. 2-10 employees. Horror-adventure with branching narrative. Korean school/cultural settings. Active release cadence.",
    source: "research",
    tags: ["narrative-heavy", "korea", "director-target", "horror"]
  },
  {
    name: "Studio BBB",
    type: "studio",
    country: "South Korea",
    city: "Seoul",
    website: "https://store.steampowered.com/app/2680440/MONOWAVE/",
    size: "2-10",
    games: ["MONOWAVE"],
    genres: ["Puzzle", "Adventure", "Narrative"],
    icp: "Director",
    score: 90,
    contact: {
      name: "",
      role: "",
      email: "monowave.bbb@gmail.com",
      linkedin: ""
    },
    notes: "5 employees (Sogang University graduates). MONOWAVE = puzzle adventure about emotions with 'Empathy system' using song. PERFECT Director fit — emotional narrative is core mechanic. New studio, open to tooling. Won multiple awards.",
    source: "research",
    tags: ["narrative-heavy", "korea", "director-target", "emotional", "new-studio"]
  },
  {
    name: "Team Dada",
    type: "studio",
    country: "South Korea",
    city: "Gwangju",
    website: "https://store.steampowered.com/app/2812430/National_Exorcist_Association/",
    size: "2-10",
    games: ["National Exorcist Association"],
    genres: ["Horror", "Narrative", "Adventure"],
    icp: "Director",
    score: 92,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "NARRATIVE-DRIVEN EXORCISM — not physical but through storytelling (Korean gut rituals, hanpuri). Korean folklore/shamanic elements. Started as webtoon. Supported by Gwangju Global Game Center. EXCELLENT Director fit — narrative IS the gameplay mechanic.",
    source: "research",
    tags: ["narrative-heavy", "korea", "director-target", "folklore", "narrative-mechanic"]
  },
  {
    name: "Codename: Spring",
    type: "studio",
    country: "South Korea",
    city: "",
    website: "",
    size: "2-10",
    games: ["Archetype Blue"],
    genres: ["Roguelike", "Deck-builder", "Narrative"],
    icp: "Director",
    score: 80,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Story-centered gameplay combining roguelite with sophisticated storytelling. Psychological themes (trauma, subconscious). Designed around 'combat, scenarios, and the subconscious'. 2026 release target.",
    source: "research",
    tags: ["narrative-heavy", "korea", "director-target", "roguelike"]
  },
  {
    name: "Gino Games",
    type: "studio",
    country: "South Korea",
    city: "",
    website: "",
    size: "11-50",
    games: ["Hello Seoul: Itaewon"],
    genres: ["Puzzle", "Platformer", "Narrative"],
    icp: "Director",
    score: 82,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Backed by Neowiz. Post-apocalyptic puzzle platformer set in ruined Seoul/Itaewon. 'Impressionist' pixel art. Emotional narrative focus. Won 'Most Anticipated' awards 2024-2025. Publisher backing = budget for tooling.",
    source: "research",
    tags: ["narrative-heavy", "korea", "director-target", "publisher-backed"]
  },
  {
    name: "Kesera Games",
    type: "studio",
    country: "South Korea",
    city: "",
    website: "https://store.steampowered.com/app/2510580/Nientum__Opus_Zero/",
    size: "2-10",
    games: ["Nientum – Opus Zero"],
    genres: ["Action", "Adventure", "Rhythm"],
    icp: "Director",
    score: 75,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "2D action adventure with theatrical/musical elements. Story about two girls with lost memories. Narrative based on myths/fairy tales. Won BIC Excellence in Audio, Gamescom Asia awards, Google Indie Game Accelerator.",
    source: "research",
    tags: ["korea", "director-target", "rhythm", "mythological"]
  },
  {
    name: "Concord",
    type: "studio",
    country: "South Korea",
    city: "",
    website: "",
    size: "2-10",
    games: ["Graytail"],
    genres: ["Action", "Adventure", "Exploration"],
    icp: "Director",
    score: 72,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Zelda-inspired action-adventure. Taipei Indie Game Awards 2026 nominee. Detective + pilot's daughter story. Physics-based interactions. K-Indie shift toward 3D exploration games.",
    source: "research",
    tags: ["korea", "director-target", "exploration", "adventure"]
  }
];

async function seedKoreaDirectorLeads() {
  console.log(`Seeding ${leads.length} South Korean Director leads...\n`);
  
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
    
    console.log(`✅ ${lead.name} — ${lead.size} — Score ${lead.score}`);
    added++;
  }
  
  console.log(`\n✅ Added ${added}, skipped ${skipped}`);
  process.exit(0);
}

seedKoreaDirectorLeads().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
