// Seed 20 Nordic (Sweden, Norway, Denmark, Finland, Iceland) game studios
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
  // === SWEDEN (10) ===
  {
    name: "Paradox Interactive",
    country: "Sweden",
    location: "Stockholm, Sweden",
    website: "https://www.paradoxinteractive.com",
    tags: ["sweden", "aa", "strategy", "simulation", "architect-icp"],
    studio: {
      size: "600+",
      type: "aa",
      games: ["Crusader Kings III", "Europa Universalis IV", "Victoria 3", "Hearts of Iron IV"],
      fitScore: 90,
      fitReason: "CK3 has character events and dialogue. Massive event/narrative writing at scale. Architect fit.",
      focus: "Grand Strategy"
    }
  },
  {
    name: "Avalanche Studios",
    country: "Sweden",
    location: "Stockholm, Sweden",
    website: "https://avalanchestudios.com",
    tags: ["sweden", "aaa", "open-world", "action", "director-icp"],
    studio: {
      size: "400+",
      type: "aaa",
      games: ["Just Cause", "Mad Max", "Generation Zero", "Contraband"],
      fitScore: 80,
      fitReason: "Open world games with NPC encounters. Director for dynamic dialogue.",
      focus: "Open World Action"
    }
  },
  {
    name: "Tarsier Studios",
    country: "Sweden",
    location: "Malmö, Sweden",
    website: "https://tarsier.se",
    tags: ["sweden", "indie", "horror", "narrative", "architect-icp"],
    studio: {
      size: "70",
      type: "indie",
      games: ["Little Nightmares", "Little Nightmares II", "Reanimal"],
      fitScore: 85,
      fitReason: "Atmospheric horror with environmental storytelling. Architect for narrative design.",
      focus: "Horror Adventure"
    }
  },
  {
    name: "Fatshark",
    country: "Sweden",
    location: "Stockholm, Sweden",
    website: "https://www.fatshark.se",
    tags: ["sweden", "aa", "action", "co-op", "director-icp"],
    studio: {
      size: "150+",
      type: "aa",
      games: ["Warhammer: Vermintide 2", "Darktide"],
      fitScore: 75,
      fitReason: "Co-op action with lore. Character banter system could use Director.",
      focus: "Co-op Action"
    }
  },
  {
    name: "Starbreeze Studios",
    country: "Sweden",
    location: "Stockholm, Sweden",
    website: "https://www.starbreeze.com",
    tags: ["sweden", "aa", "action", "co-op", "director-icp"],
    studio: {
      size: "200+",
      type: "aa",
      games: ["Payday 2", "Payday 3", "The Chronicles of Riddick"],
      fitScore: 70,
      fitReason: "Co-op heist games with character dialogue.",
      focus: "Co-op FPS"
    }
  },
  {
    name: "Simogo",
    country: "Sweden",
    location: "Malmö, Sweden",
    website: "https://simogo.com",
    tags: ["sweden", "indie", "narrative", "experimental", "architect-icp"],
    studio: {
      size: "5",
      type: "indie",
      games: ["Sayonara Wild Hearts", "Year Walk", "Device 6", "Lorelei and the Laser Eyes"],
      fitScore: 90,
      fitReason: "Narrative-focused experimental games. Lorelei is pure puzzle-narrative. Architect fit.",
      focus: "Experimental Narrative"
    }
  },
  {
    name: "Frictional Games",
    country: "Sweden",
    location: "Malmö, Sweden",
    website: "https://frictionalgames.com",
    tags: ["sweden", "indie", "horror", "narrative", "architect-icp"],
    studio: {
      size: "25",
      type: "indie",
      games: ["Amnesia: The Dark Descent", "SOMA", "Amnesia: Rebirth"],
      fitScore: 90,
      fitReason: "SOMA — narrative horror masterpiece. Environmental storytelling. Architect fit.",
      focus: "Horror Narrative"
    }
  },
  {
    name: "Coffee Stain Studios",
    country: "Sweden",
    location: "Skövde, Sweden",
    website: "https://www.coffeestain.com",
    tags: ["sweden", "indie", "simulation", "survival", "director-icp"],
    studio: {
      size: "50+",
      type: "indie",
      games: ["Satisfactory", "Goat Simulator", "Valheim (published)"],
      fitScore: 70,
      fitReason: "Simulation/survival games. Less narrative focused.",
      focus: "Simulation"
    }
  },
  {
    name: "Playdead",
    country: "Denmark",
    location: "Copenhagen, Denmark",
    website: "https://playdead.com",
    tags: ["denmark", "indie", "puzzle", "narrative", "atmospheric", "architect-icp"],
    studio: {
      size: "50",
      type: "indie",
      games: ["Limbo", "Inside", "Project 3 (in development)"],
      fitScore: 85,
      fitReason: "Atmospheric narrative games. Limbo/Inside are wordless but deeply narrative.",
      focus: "Atmospheric Puzzle"
    }
  },
  {
    name: "Dimfrost Studio",
    country: "Sweden",
    location: "Skövde, Sweden",
    website: "https://dimfrost.se",
    tags: ["sweden", "indie", "horror", "narrative", "nordic-folklore", "architect-icp"],
    studio: {
      size: "15",
      type: "indie",
      games: ["Bramble: The Mountain King"],
      fitScore: 90,
      fitReason: "Bramble — Nordic folklore horror. Deep narrative. Perfect Architect ICP.",
      focus: "Horror Narrative"
    }
  },

  // === FINLAND (5) ===
  {
    name: "Remedy Entertainment",
    country: "Finland",
    location: "Espoo, Finland",
    website: "https://www.remedygames.com",
    tags: ["finland", "aaa", "action", "narrative", "director-icp", "architect-icp"],
    studio: {
      size: "350+",
      type: "aaa",
      games: ["Alan Wake", "Control", "Alan Wake 2", "Max Payne"],
      fitScore: 95,
      fitReason: "Already researched — Architect ICP. 'AI for production not creation' stance matches.",
      focus: "Narrative Action"
    }
  },
  {
    name: "Housemarque",
    country: "Finland",
    location: "Helsinki, Finland",
    website: "https://housemarque.com",
    tags: ["finland", "aaa", "action", "roguelike", "director-icp"],
    studio: {
      size: "100+",
      type: "aaa",
      games: ["Returnal", "Resogun", "Nex Machina"],
      fitScore: 80,
      fitReason: "Returnal has narrative elements. Sony first-party now.",
      focus: "Action Roguelike"
    }
  },
  {
    name: "Supercell",
    country: "Finland",
    location: "Helsinki, Finland",
    website: "https://supercell.com",
    tags: ["finland", "aaa", "mobile", "strategy", "director-icp"],
    studio: {
      size: "400+",
      type: "aaa",
      games: ["Clash of Clans", "Clash Royale", "Brawl Stars", "Squad Busters"],
      fitScore: 65,
      fitReason: "Mobile games with characters. Less narrative focus but massive scale.",
      focus: "Mobile Strategy"
    }
  },
  {
    name: "Rovio Entertainment",
    country: "Finland",
    location: "Espoo, Finland",
    website: "https://www.rovio.com",
    tags: ["finland", "aa", "mobile", "casual", "director-icp"],
    studio: {
      size: "500+",
      type: "aa",
      games: ["Angry Birds", "Angry Birds 2", "Sonic Rumble"],
      fitScore: 60,
      fitReason: "Mobile casual games. Exploring narrative in casual mobile.",
      focus: "Mobile Casual"
    }
  },
  {
    name: "10 Chambers",
    country: "Finland",
    location: "Stockholm, Sweden (Finnish founders)",
    website: "https://10chambers.com",
    tags: ["finland", "indie", "horror", "co-op", "director-icp"],
    studio: {
      size: "40",
      type: "indie",
      games: ["GTFO", "Den of Wolves"],
      fitScore: 75,
      fitReason: "Co-op horror with lore/narrative elements.",
      focus: "Co-op Horror"
    }
  },

  // === DENMARK (4) ===
  {
    name: "IO Interactive",
    country: "Denmark",
    location: "Copenhagen, Denmark",
    website: "https://www.ioi.dk",
    tags: ["denmark", "aaa", "stealth", "action", "director-icp"],
    studio: {
      size: "400+",
      type: "aaa",
      games: ["Hitman", "Hitman 3", "Project 007"],
      fitScore: 85,
      fitReason: "Hitman has NPC dialogue systems. Project 007 is narrative-heavy James Bond.",
      focus: "Stealth Action"
    }
  },
  {
    name: "Ghost Ship Games",
    country: "Denmark",
    location: "Copenhagen, Denmark",
    website: "https://ghostshipgames.com",
    tags: ["denmark", "indie", "co-op", "action", "director-icp"],
    studio: {
      size: "30",
      type: "indie",
      games: ["Deep Rock Galactic", "Deep Rock Galactic: Survivor"],
      fitScore: 75,
      fitReason: "Co-op mining game with dwarf banter. Character dialogue system.",
      focus: "Co-op Action"
    }
  },
  {
    name: "Logic Artists",
    country: "Denmark",
    location: "Copenhagen, Denmark",
    website: "",
    tags: ["denmark", "indie", "rpg", "narrative", "architect-icp"],
    studio: {
      size: "30",
      type: "indie",
      games: ["Expeditions: Rome", "Expeditions: Viking"],
      fitScore: 85,
      fitReason: "Expeditions series — narrative RPGs with branching choices. Architect fit.",
      focus: "Tactical RPG"
    }
  },
  {
    name: "Full Control",
    country: "Denmark",
    location: "Copenhagen, Denmark",
    website: "",
    tags: ["denmark", "indie", "strategy", "tactical", "architect-icp"],
    studio: {
      size: "20",
      type: "indie",
      games: ["Space Hulk", "Jagged Alliance: Flashback"],
      fitScore: 70,
      fitReason: "Tactical games with narrative campaigns.",
      focus: "Tactical Strategy"
    }
  },

  // === ICELAND (1) ===
  {
    name: "CCP Games",
    country: "Iceland",
    location: "Reykjavik, Iceland",
    website: "https://www.ccpgames.com",
    tags: ["iceland", "aa", "mmo", "sci-fi", "director-icp"],
    studio: {
      size: "300+",
      type: "aa",
      games: ["EVE Online", "EVE Vanguard"],
      fitScore: 75,
      fitReason: "EVE Online — player-driven narrative. Could use Director for NPC content.",
      focus: "Sci-Fi MMO"
    }
  }
];

async function seedNordicLeads() {
  console.log(`Seeding ${leads.length} Nordic leads...\n`);
  
  let created = 0;
  let skipped = 0;
  
  for (const lead of leads) {
    // Check if exists
    const existing = await db.collection('leads')
      .where('name', '==', lead.name)
      .limit(1)
      .get();
    
    if (!existing.empty) {
      console.log(`⏭️  ${lead.name} already exists`);
      skipped++;
      continue;
    }
    
    // Create lead
    await db.collection('leads').add({
      type: 'studio',
      status: 'active',
      owner: 'system',
      priority: lead.studio.fitScore >= 90 ? 'high' : lead.studio.fitScore >= 80 ? 'medium' : 'low',
      name: lead.name,
      website: lead.website || '',
      location: lead.location,
      country: lead.country,
      contact: { name: '', role: '', email: '' },
      tags: lead.tags,
      notes: '',
      studio: lead.studio,
      pipeline: {
        pipelineId: 'default',
        stageId: 'new',
        enteredStageAt: admin.firestore.FieldValue.serverTimestamp()
      },
      createdBy: 'seed-nordic',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`✅ ${lead.name} (${lead.country}) — Score: ${lead.studio.fitScore}`);
    created++;
  }
  
  console.log(`\n✅ Created ${created}, skipped ${skipped}`);
  process.exit(0);
}

seedNordicLeads().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
