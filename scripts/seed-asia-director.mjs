// Seed additional Asian studios for Director outreach (Korea + Taiwan)
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
  // SOUTH KOREA
  {
    name: "Wonder Potion",
    type: "studio",
    country: "South Korea",
    city: "Seoul",
    website: "https://store.steampowered.com/app/1562700/SANABI/",
    size: "2-10",
    games: ["SANABI", "SANABI: Ghost Possession Day"],
    genres: ["Action", "Platformer", "Cyberpunk", "Narrative"],
    icp: "Director",
    score: 88,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "5 university students. Made SANABI - cyberpunk action platformer with strong narrative. Japanese players voted it personal GOTY. Published by Neowiz. Twitter @SANABI_Mufin.",
    source: "research",
    tags: ["narrative-heavy", "korea", "director-target", "cyberpunk", "neowiz-backed"]
  },
  {
    name: "SouthPAW Games",
    type: "studio",
    country: "South Korea",
    city: "Seoul",
    website: "https://southpaw.games/",
    size: "2-10",
    games: ["Skul: The Hero Slayer"],
    genres: ["Roguelike", "Action", "Platformer"],
    icp: "Director",
    score: 75,
    contact: {
      name: "Park Sang-woo",
      role: "CEO",
      email: "",
      linkedin: ""
    },
    notes: "University friends. Skul sold 2M+ copies - first Korean indie to hit 1M on Steam. Published by Neowiz. Less narrative-focused but strong K-indie connection.",
    source: "research",
    tags: ["korea", "director-target", "roguelike", "neowiz-backed", "successful"]
  },
  {
    name: "Ocean Drive Studio",
    type: "studio",
    country: "South Korea",
    city: "",
    website: "",
    size: "11-50",
    games: ["God Save Birmingham", "Section 13", "Blackout Protocol"],
    genres: ["Survival", "Horror", "Action", "Roguelike"],
    icp: "Director",
    score: 82,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Multiple projects. God Save Birmingham = medieval zombie survival with physics-based gameplay and 'grappling AI'. Section 13 = narrative-driven roguelite shooter. Published by Kakao Games.",
    source: "research",
    tags: ["korea", "director-target", "survival", "kakao-backed"]
  },
  {
    name: "EVR Studio",
    type: "studio",
    country: "South Korea",
    city: "",
    website: "",
    size: "11-50",
    games: ["Project TH (Two Hearts)"],
    genres: ["Stealth", "Action", "Narrative"],
    icp: "Director",
    score: 90,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Project TH = DUAL PROTAGONISTS (North Korean soldier + K-pop idol). Stealth-action drama. Korean folklore (Mudang), K-pop performances, political tensions. UE5. Game Pass confirmed. EXCELLENT narrative fit.",
    source: "research",
    tags: ["narrative-heavy", "korea", "director-target", "dual-protagonist", "cultural"]
  },
  {
    name: "Npixel",
    type: "studio",
    country: "South Korea",
    city: "",
    website: "",
    size: "51-200",
    games: ["Chrono Odyssey"],
    genres: ["MMORPG", "Action"],
    icp: "Director",
    score: 70,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Chrono Odyssey = MMORPG with time manipulation. Larger studio but narrative elements. June 2025 closed beta. UE5.",
    source: "research",
    tags: ["korea", "mmo", "larger-studio"]
  },
  
  // TAIWAN
  {
    name: "Red Candle Games",
    type: "studio",
    country: "Taiwan",
    city: "Taipei",
    website: "https://redcandlegames.com/",
    size: "11-50",
    games: ["Detention", "Devotion", "Nine Sols"],
    genres: ["Horror", "Narrative", "Action"],
    icp: "Director",
    score: 95,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "12 employees. LEGENDARY Taiwanese studio. Detention + Devotion = psychological horror with deep Taiwanese cultural themes. Nine Sols = Sekiro-like action. Devotion controversy (Xi Jinping easter egg). PERFECT Director fit - narrative is core.",
    source: "research",
    tags: ["narrative-heavy", "taiwan", "director-target", "horror", "cultural", "established"]
  },
  {
    name: "BearBone Studio",
    type: "studio",
    country: "Taiwan",
    city: "Taipei",
    website: "https://store.steampowered.com/app/1610440/Minds_Beneath_Us/",
    size: "2-10",
    games: ["Minds Beneath Us"],
    genres: ["Adventure", "Narrative", "Sci-Fi"],
    icp: "Director",
    score: 88,
    contact: {
      name: "Ted",
      role: "Producer/Writer",
      email: "",
      linkedin: ""
    },
    notes: "7 employees (university friends). Minds Beneath Us = emotional sci-fi narrative where humans are exploited as computing devices for AI. Won Taipei Game Show Grand Prix 2025. Twitter @BearboneStudio. PERFECT thematic alignment with AI tools.",
    source: "research",
    tags: ["narrative-heavy", "taiwan", "director-target", "sci-fi", "award-winner"]
  },
  {
    name: "NeoBards Entertainment",
    type: "studio",
    country: "Taiwan",
    city: "",
    website: "https://neobards.com/",
    size: "11-50",
    games: ["Silent Hill (new project)"],
    genres: ["Horror", "Narrative"],
    icp: "Director",
    score: 85,
    contact: {
      name: "AL Yang",
      role: "Creative/Design Director",
      email: "",
      linkedin: ""
    },
    notes: "Working on new Silent Hill game based on classic horror franchise. Speaking at Game-Connect 2025. Strong narrative/horror DNA.",
    source: "research",
    tags: ["narrative-heavy", "taiwan", "director-target", "horror", "aaa-adjacent"]
  },
  {
    name: "Futile Games",
    type: "studio",
    country: "Taiwan",
    city: "",
    website: "https://store.steampowered.com/app/2410460/_/",
    size: "2-10",
    games: ["mossasis"],
    genres: ["Adventure", "Narrative"],
    icp: "Director",
    score: 78,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Taipei Game Show award winner. Black and white comic style. Story about a young couple coming together and breaking apart.",
    source: "research",
    tags: ["narrative-heavy", "taiwan", "director-target", "artistic"]
  }
];

async function seedAsiaDirectorLeads() {
  console.log(`Seeding ${leads.length} Asian Director leads...\n`);
  
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

seedAsiaDirectorLeads().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
