// Seed 50 Asian leads: 10 each from China, South Korea, Japan, Vietnam, Indonesia
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
  // === CHINA (10) ===
  {
    name: "Game Science",
    country: "China",
    location: "Shenzhen, China",
    website: "https://www.gamesci.com.cn",
    tags: ["china", "aaa", "action-rpg", "director-icp"],
    studio: {
      size: "150+",
      type: "aaa",
      games: ["Black Myth: Wukong"],
      fitScore: 95,
      fitReason: "Black Myth Wukong creators. Massive action RPG with narrative. Director for NPC dialogue at scale.",
      focus: "Action RPG"
    }
  },
  {
    name: "miHoYo / HoYoverse",
    country: "China",
    location: "Shanghai, China",
    website: "https://www.hoyoverse.com",
    tags: ["china", "aaa", "gacha", "rpg", "director-icp"],
    studio: {
      size: "5000+",
      type: "aaa",
      games: ["Genshin Impact", "Honkai: Star Rail", "Zenless Zone Zero"],
      fitScore: 85,
      fitReason: "Massive gacha RPG developer. Lots of NPC dialogue. Very large, may have internal tools.",
      focus: "Gacha RPG"
    }
  },
  {
    name: "Everstone Studios (NetEase)",
    country: "China",
    location: "Hangzhou, China",
    website: "https://www.neteasegames.com",
    tags: ["china", "aaa", "open-world", "wuxia", "director-icp"],
    studio: {
      size: "200+",
      type: "aaa",
      games: ["Where Winds Meet"],
      fitScore: 90,
      fitReason: "Where Winds Meet — open world wuxia with narrative. Director ICP for dynamic NPC dialogue.",
      focus: "Open World RPG"
    }
  },
  {
    name: "Papergames",
    country: "China",
    location: "Suzhou, China",
    website: "https://papegames.com",
    tags: ["china", "aa", "visual-novel", "romance", "architect-icp"],
    studio: {
      size: "500+",
      type: "aa",
      games: ["Love and Deepspace", "Shining Nikki"],
      fitScore: 90,
      fitReason: "Love and Deepspace — narrative dating sim with branching dialogue. Architect for content management.",
      focus: "Visual Novel / Dating Sim"
    }
  },
  {
    name: "Citreat Studio",
    country: "China",
    location: "China",
    website: "",
    tags: ["china", "indie", "visual-novel", "narrative", "architect-icp"],
    studio: {
      size: "10",
      type: "indie",
      games: ["Zero-Sum Heart"],
      fitScore: 85,
      fitReason: "All-female studio making visual novels. Architect perfect for branching narrative management.",
      focus: "Visual Novel"
    }
  },
  {
    name: "Nekcom Games",
    country: "China",
    location: "Wuhan, China",
    website: "",
    tags: ["china", "indie", "rpg", "narrative", "director-icp"],
    studio: {
      size: "50+",
      type: "indie",
      games: ["Showa American Story", "Dying: 1983"],
      fitScore: 85,
      fitReason: "Showa American Story — narrative RPG. Director for NPC dialogue variety.",
      focus: "Narrative RPG"
    }
  },
  {
    name: "Pathea Games",
    country: "China",
    location: "Chongqing, China",
    website: "https://pathea.net",
    tags: ["china", "indie", "life-sim", "rpg", "architect-icp", "director-icp"],
    studio: {
      size: "80+",
      type: "indie",
      games: ["My Time at Sandrock", "My Time at Portia"],
      fitScore: 90,
      fitReason: "Life sim RPGs with tons of NPC dialogue and relationships. Both products fit well.",
      focus: "Life Simulation RPG"
    }
  },
  {
    name: "Leenzee Games",
    country: "China",
    location: "Beijing, China",
    website: "",
    tags: ["china", "aa", "action-rpg", "souls-like", "director-icp"],
    studio: {
      size: "100+",
      type: "aa",
      games: ["WUCHANG: Fallen Feathers"],
      fitScore: 85,
      fitReason: "Souls-like action RPG. Director for NPC interactions.",
      focus: "Souls-like Action RPG"
    }
  },
  {
    name: "Aurogon",
    country: "China",
    location: "Shanghai, China",
    website: "",
    tags: ["china", "aa", "action-rpg", "wuxia", "director-icp"],
    studio: {
      size: "100+",
      type: "aa",
      games: ["Phantom Blade Zero"],
      fitScore: 85,
      fitReason: "Phantom Blade Zero — wuxia action RPG with dark narrative. Director ICP.",
      focus: "Action RPG"
    }
  },
  {
    name: "TiMi Studio Group (Tencent)",
    country: "China",
    location: "Shenzhen, China",
    website: "https://www.timistudios.com",
    tags: ["china", "aaa", "open-world", "rpg", "director-icp"],
    studio: {
      size: "3000+",
      type: "aaa",
      games: ["Honor of Kings: World", "Arena of Valor"],
      fitScore: 80,
      fitReason: "Honor of Kings: World — open world RPG. Very large studio, may have internal tools.",
      focus: "Mobile / Open World"
    }
  },

  // === SOUTH KOREA (10) ===
  {
    name: "Project Moon",
    country: "South Korea",
    location: "Seoul, South Korea",
    website: "https://projectmoon.studio",
    tags: ["south-korea", "indie", "narrative", "roguelike", "architect-icp"],
    studio: {
      size: "30+",
      type: "indie",
      games: ["Lobotomy Corporation", "Library of Ruina", "Limbus Company"],
      fitScore: 95,
      fitReason: "Extremely narrative-heavy games. Massive text content. Perfect Architect ICP.",
      focus: "Narrative Roguelike"
    }
  },
  {
    name: "Devespresso Games",
    country: "South Korea",
    location: "Seoul, South Korea",
    website: "https://devespressogames.com",
    tags: ["south-korea", "indie", "horror", "narrative", "architect-icp"],
    studio: {
      size: "15",
      type: "indie",
      games: ["The Coma", "Scarlet Hood and the Wicked Wood"],
      fitScore: 90,
      fitReason: "Horror narrative games with branching stories. Architect for dialogue management.",
      focus: "Horror Adventure"
    }
  },
  {
    name: "Pearl Abyss",
    country: "South Korea",
    location: "Anyang, South Korea",
    website: "https://www.pearlabyss.com",
    tags: ["south-korea", "aaa", "mmorpg", "open-world", "director-icp"],
    studio: {
      size: "1000+",
      type: "aaa",
      games: ["Black Desert Online", "Crimson Desert"],
      fitScore: 85,
      fitReason: "Crimson Desert — narrative-focused open world. Director for dynamic NPC dialogue.",
      focus: "MMORPG / Open World"
    }
  },
  {
    name: "SHIFT UP",
    country: "South Korea",
    location: "Seoul, South Korea",
    website: "https://shiftup.co.kr",
    tags: ["south-korea", "aa", "action", "narrative", "director-icp"],
    studio: {
      size: "200+",
      type: "aa",
      games: ["Stellar Blade", "Nikke: Goddess of Victory"],
      fitScore: 85,
      fitReason: "Stellar Blade has narrative elements. Growing studio with action focus.",
      focus: "Action / Gacha"
    }
  },
  {
    name: "Smilegate RPG",
    country: "South Korea",
    location: "Seoul, South Korea",
    website: "https://www.smilegatemegaport.com",
    tags: ["south-korea", "aaa", "mmorpg", "director-icp"],
    studio: {
      size: "500+",
      type: "aaa",
      games: ["Lost Ark"],
      fitScore: 80,
      fitReason: "Lost Ark — MMORPG with narrative quests. Large studio.",
      focus: "MMORPG"
    }
  },
  {
    name: "Rootless Studio",
    country: "South Korea",
    location: "South Korea",
    website: "",
    tags: ["south-korea", "indie", "metroidvania", "narrative", "architect-icp"],
    studio: {
      size: "10",
      type: "indie",
      games: ["8Doors: Arum's Afterlife Adventure"],
      fitScore: 85,
      fitReason: "8Doors — Korean folklore metroidvania with narrative. Small team, Architect fit.",
      focus: "Metroidvania"
    }
  },
  {
    name: "NEOWIZ",
    country: "South Korea",
    location: "Seongnam, South Korea",
    website: "https://www.neowiz.com",
    tags: ["south-korea", "aa", "souls-like", "narrative", "director-icp"],
    studio: {
      size: "300+",
      type: "aa",
      games: ["Lies of P", "Skul: The Hero Slayer"],
      fitScore: 90,
      fitReason: "Lies of P — souls-like with strong narrative. Director for NPC dialogue.",
      focus: "Souls-like"
    }
  },
  {
    name: "Gravity Co.",
    country: "South Korea",
    location: "Seoul, South Korea",
    website: "https://www.gravity.co.kr",
    tags: ["south-korea", "aa", "mmorpg", "director-icp"],
    studio: {
      size: "500+",
      type: "aa",
      games: ["Ragnarok Online", "Ragnarok Origin"],
      fitScore: 75,
      fitReason: "Long-running MMORPG franchise. May need Director for new titles.",
      focus: "MMORPG"
    }
  },
  {
    name: "Krafton",
    country: "South Korea",
    location: "Seoul, South Korea",
    website: "https://www.krafton.com",
    tags: ["south-korea", "aaa", "battle-royale", "horror", "director-icp"],
    studio: {
      size: "2000+",
      type: "aaa",
      games: ["PUBG", "The Callisto Protocol"],
      fitScore: 80,
      fitReason: "The Callisto Protocol — narrative horror. Very large company.",
      focus: "Multiplayer / Horror"
    }
  },
  {
    name: "NAT Games",
    country: "South Korea",
    location: "Seoul, South Korea",
    website: "",
    tags: ["south-korea", "aa", "mmorpg", "narrative", "director-icp"],
    studio: {
      size: "200+",
      type: "aa",
      games: ["V4", "Overhit"],
      fitScore: 75,
      fitReason: "Mobile MMORPGs with story elements.",
      focus: "Mobile MMORPG"
    }
  },

  // === JAPAN (10) ===
  {
    name: "Spike Chunsoft",
    country: "Japan",
    location: "Tokyo, Japan",
    website: "https://www.spike-chunsoft.co.jp",
    tags: ["japan", "aa", "visual-novel", "mystery", "architect-icp"],
    studio: {
      size: "300+",
      type: "aa",
      games: ["Danganronpa", "Zero Escape", "AI: The Somnium Files"],
      fitScore: 95,
      fitReason: "Visual novel masters. Danganronpa, Zero Escape — massive branching narratives. Perfect Architect ICP.",
      focus: "Visual Novel / Mystery"
    }
  },
  {
    name: "Vanillaware",
    country: "Japan",
    location: "Osaka, Japan",
    website: "https://www.vanillaware.co.jp",
    tags: ["japan", "aa", "action-rpg", "narrative", "architect-icp"],
    studio: {
      size: "30",
      type: "aa",
      games: ["13 Sentinels: Aegis Rim", "Odin Sphere", "Unicorn Overlord"],
      fitScore: 95,
      fitReason: "13 Sentinels — masterpiece narrative game. Small team with deep story focus. Perfect Architect.",
      focus: "Action RPG / Visual Novel"
    }
  },
  {
    name: "Atlus",
    country: "Japan",
    location: "Tokyo, Japan",
    website: "https://atlus.com",
    tags: ["japan", "aaa", "jrpg", "narrative", "director-icp", "architect-icp"],
    studio: {
      size: "500+",
      type: "aaa",
      games: ["Persona 5", "Shin Megami Tensei V", "Metaphor: ReFantazio"],
      fitScore: 90,
      fitReason: "Persona series — massive dialogue and social links. Both products could fit.",
      focus: "JRPG"
    }
  },
  {
    name: "Level-5",
    country: "Japan",
    location: "Fukuoka, Japan",
    website: "https://www.level5.co.jp",
    tags: ["japan", "aa", "jrpg", "narrative", "director-icp"],
    studio: {
      size: "500+",
      type: "aa",
      games: ["Ni no Kuni", "Professor Layton", "Yokai Watch"],
      fitScore: 90,
      fitReason: "Story-driven games. Professor Layton puzzles with narrative. Director for NPC variety.",
      focus: "JRPG / Adventure"
    }
  },
  {
    name: "Furoshiki Lab",
    country: "Japan",
    location: "Japan",
    website: "",
    tags: ["japan", "indie", "action-adventure", "narrative", "architect-icp"],
    studio: {
      size: "10",
      type: "indie",
      games: ["Vernal Edge"],
      fitScore: 85,
      fitReason: "Loop-based action adventure with narrative. Small indie, Architect fit.",
      focus: "Action Adventure"
    }
  },
  {
    name: "Nippon Ichi Software (NIS)",
    country: "Japan",
    location: "Gifu, Japan",
    website: "https://nippon1.jp",
    tags: ["japan", "aa", "srpg", "visual-novel", "architect-icp"],
    studio: {
      size: "200+",
      type: "aa",
      games: ["Disgaea", "Yomawari", "Void Terrarium"],
      fitScore: 85,
      fitReason: "Disgaea series with lots of character dialogue. Architect for content management.",
      focus: "SRPG / Horror"
    }
  },
  {
    name: "Acquire",
    country: "Japan",
    location: "Tokyo, Japan",
    website: "https://www.acquire.co.jp",
    tags: ["japan", "aa", "action-rpg", "narrative", "director-icp"],
    studio: {
      size: "100+",
      type: "aa",
      games: ["Octopath Traveler", "Triangle Strategy"],
      fitScore: 90,
      fitReason: "Octopath/Triangle Strategy — narrative-heavy RPGs. Director for NPC dialogue.",
      focus: "HD-2D RPG"
    }
  },
  {
    name: "Genius Sonority",
    country: "Japan",
    location: "Tokyo, Japan",
    website: "",
    tags: ["japan", "aa", "puzzle", "narrative", "architect-icp"],
    studio: {
      size: "50+",
      type: "aa",
      games: ["Pokémon Colosseum", "The Denpa Men"],
      fitScore: 75,
      fitReason: "Pokémon spinoffs with story. Mid-tier fit.",
      focus: "RPG / Puzzle"
    }
  },
  {
    name: "Q-Games",
    country: "Japan",
    location: "Kyoto, Japan",
    website: "https://www.q-games.com",
    tags: ["japan", "indie", "experimental", "director-icp"],
    studio: {
      size: "50+",
      type: "indie",
      games: ["PixelJunk series", "The Tomorrow Children"],
      fitScore: 75,
      fitReason: "Experimental games. Founded by Rez creator. May explore narrative.",
      focus: "Experimental"
    }
  },
  {
    name: "CyberConnect2",
    country: "Japan",
    location: "Fukuoka, Japan",
    website: "https://www.cc2.co.jp",
    tags: ["japan", "aa", "action", "anime", "director-icp"],
    studio: {
      size: "200+",
      type: "aa",
      games: [".hack series", "Naruto Storm", "Demon Slayer"],
      fitScore: 85,
      fitReason: ".hack series — narrative RPGs. Lots of anime adaptations with dialogue.",
      focus: "Action / Anime"
    }
  },

  // === VIETNAM (10) ===
  {
    name: "Sky Mavis",
    country: "Vietnam",
    location: "Ho Chi Minh City, Vietnam",
    website: "https://skymavis.com",
    tags: ["vietnam", "aa", "blockchain", "rpg", "director-icp"],
    studio: {
      size: "200+",
      type: "aa",
      games: ["Axie Infinity", "Axie Infinity: Homeland"],
      fitScore: 70,
      fitReason: "Blockchain games with creature narratives. May expand to more story content.",
      focus: "Blockchain / Pet RPG"
    }
  },
  {
    name: "Sparx* (Virtuos)",
    country: "Vietnam",
    location: "Ho Chi Minh City, Vietnam",
    website: "https://www.sparx.com",
    tags: ["vietnam", "aa", "art-outsource", "co-dev"],
    studio: {
      size: "550+",
      type: "aa",
      games: ["Co-dev on AAA titles"],
      fitScore: 60,
      fitReason: "Art/animation studio, not game design. Low fit but connected to industry.",
      focus: "Art Outsource"
    }
  },
  {
    name: "GihOt",
    country: "Vietnam",
    location: "Vietnam",
    website: "https://gihot.vn",
    tags: ["vietnam", "indie", "online", "rpg", "director-icp"],
    studio: {
      size: "50+",
      type: "indie",
      games: ["Various online games"],
      fitScore: 70,
      fitReason: "One of first Vietnam game studios. Online RPG focus.",
      focus: "Online RPG"
    }
  },
  {
    name: "Gamota",
    country: "Vietnam",
    location: "Hanoi, Vietnam",
    website: "https://gamota.com",
    tags: ["vietnam", "aa", "publishing", "mobile", "director-icp"],
    studio: {
      size: "200+",
      type: "aa",
      games: ["Mobile game publishing"],
      fitScore: 65,
      fitReason: "Major Vietnamese publisher. Could distribute LoreWeaver tools.",
      focus: "Publishing"
    }
  },
  {
    name: "Galaxy4Games",
    country: "Vietnam",
    location: "Vietnam",
    website: "",
    tags: ["vietnam", "indie", "mobile", "web", "architect-icp"],
    studio: {
      size: "40+",
      type: "indie",
      games: ["Mobile/web games"],
      fitScore: 65,
      fitReason: "Full-cycle development. Could benefit from Architect.",
      focus: "Mobile / Web"
    }
  },
  {
    name: "DUT Studio",
    country: "Vietnam",
    location: "Vietnam",
    website: "",
    tags: ["vietnam", "indie", "narrative", "architect-icp"],
    studio: {
      size: "10",
      type: "indie",
      games: ["In development"],
      fitScore: 70,
      fitReason: "New studio with narrative focus. Content creator-founded.",
      focus: "Narrative"
    }
  },
  {
    name: "The Scourge Team",
    country: "Vietnam",
    location: "Saigon, Vietnam",
    website: "",
    tags: ["vietnam", "indie", "horror", "narrative", "architect-icp"],
    studio: {
      size: "5",
      type: "indie",
      games: ["The Scourge"],
      fitScore: 80,
      fitReason: "The Scourge — horror RPG set in 1990s Saigon. Vietnamese cultural narrative. Architect fit.",
      focus: "Horror RPG"
    }
  },
  {
    name: "Glass Egg",
    country: "Vietnam",
    location: "Ho Chi Minh City, Vietnam",
    website: "https://www.glassegg.com",
    tags: ["vietnam", "aa", "art-outsource"],
    studio: {
      size: "300+",
      type: "aa",
      games: ["Art outsource for EA, Ubisoft"],
      fitScore: 50,
      fitReason: "Art outsource studio. Not game design focused.",
      focus: "Art Outsource"
    }
  },
  {
    name: "Divmob",
    country: "Vietnam",
    location: "Ho Chi Minh City, Vietnam",
    website: "",
    tags: ["vietnam", "indie", "mobile", "casual", "architect-icp"],
    studio: {
      size: "100+",
      type: "indie",
      games: ["Mobile casual games"],
      fitScore: 60,
      fitReason: "Mobile game studio. Less narrative focus.",
      focus: "Mobile Casual"
    }
  },
  {
    name: "ONESOFT",
    country: "Vietnam",
    location: "Vietnam",
    website: "",
    tags: ["vietnam", "indie", "mobile", "simulation", "architect-icp"],
    studio: {
      size: "50+",
      type: "indie",
      games: ["Mobile simulation games"],
      fitScore: 65,
      fitReason: "Mobile simulation focus.",
      focus: "Mobile Simulation"
    }
  },

  // === INDONESIA (10) ===
  {
    name: "Toge Productions",
    country: "Indonesia",
    location: "Tangerang, Indonesia",
    website: "https://www.togeproductions.com",
    tags: ["indonesia", "indie", "narrative", "visual-novel", "architect-icp"],
    studio: {
      size: "30+",
      type: "indie",
      games: ["Coffee Talk", "A Space for the Unbound", "Mojiken collaboration"],
      fitScore: 95,
      fitReason: "Coffee Talk — pure narrative game. Southeast Asia's top indie publisher. Perfect Architect ICP.",
      focus: "Narrative / Publishing"
    }
  },
  {
    name: "Mojiken Studio",
    country: "Indonesia",
    location: "Surabaya, Indonesia",
    website: "https://mojiken.com",
    tags: ["indonesia", "indie", "narrative", "adventure", "architect-icp"],
    studio: {
      size: "15",
      type: "indie",
      games: ["A Space for the Unbound", "When the Past Was Around"],
      fitScore: 95,
      fitReason: "A Space for the Unbound — emotional narrative adventure. Perfect Architect ICP.",
      focus: "Narrative Adventure"
    }
  },
  {
    name: "Agate International",
    country: "Indonesia",
    location: "Bandung, Indonesia",
    website: "https://agate.id",
    tags: ["indonesia", "aa", "action-rpg", "co-dev", "director-icp"],
    studio: {
      size: "300+",
      type: "aa",
      games: ["Valthiria Arc", "Code Atma"],
      fitScore: 85,
      fitReason: "Largest Indonesian studio. Action RPGs with narrative. Director fit.",
      focus: "Action RPG / Co-dev"
    }
  },
  {
    name: "Dragon Game Studio",
    country: "Indonesia",
    location: "Bali, Indonesia",
    website: "",
    tags: ["indonesia", "indie", "rpg", "director-icp"],
    studio: {
      size: "20",
      type: "indie",
      games: ["Various RPGs"],
      fitScore: 75,
      fitReason: "Bali-based RPG studio. Founded 2012.",
      focus: "RPG"
    }
  },
  {
    name: "Creacle Studio",
    country: "Indonesia",
    location: "Indonesia",
    website: "",
    tags: ["indonesia", "indie", "narrative", "story", "architect-icp"],
    studio: {
      size: "10",
      type: "indie",
      games: ["Story-based games"],
      fitScore: 85,
      fitReason: "Focuses on story-based games. Architect fit.",
      focus: "Narrative"
    }
  },
  {
    name: "Berangin Creative",
    country: "Indonesia",
    location: "Indonesia",
    website: "",
    tags: ["indonesia", "indie", "narrative", "adventure", "architect-icp"],
    studio: {
      size: "10",
      type: "indie",
      games: ["Kejora"],
      fitScore: 85,
      fitReason: "Kejora — Indonesian narrative adventure. Delayed to 2026. Architect fit.",
      focus: "Narrative Adventure"
    }
  },
  {
    name: "DivineKids",
    country: "Indonesia",
    location: "Indonesia",
    website: "",
    tags: ["indonesia", "indie", "rpg", "adventure", "architect-icp"],
    studio: {
      size: "5",
      type: "indie",
      games: ["Petualangan Divinekids"],
      fitScore: 75,
      fitReason: "2D RPG adventure. Small indie.",
      focus: "RPG Adventure"
    }
  },
  {
    name: "Dreammu",
    country: "Indonesia",
    location: "Indonesia",
    website: "",
    tags: ["indonesia", "indie", "visual-novel", "horror", "architect-icp"],
    studio: {
      size: "10",
      type: "indie",
      games: ["Visual novels"],
      fitScore: 80,
      fitReason: "Visual novel developer. Architect fit.",
      focus: "Visual Novel"
    }
  },
  {
    name: "Tahoe Games",
    country: "Indonesia",
    location: "Jakarta, Indonesia",
    website: "",
    tags: ["indonesia", "indie", "horror", "narrative", "architect-icp"],
    studio: {
      size: "15",
      type: "indie",
      games: ["Pamali", "Rausan Timur"],
      fitScore: 90,
      fitReason: "Pamali — Indonesian folklore horror. Narrative-focused. Architect ICP.",
      focus: "Horror / Folklore"
    }
  },
  {
    name: "Nightspade",
    country: "Indonesia",
    location: "Indonesia",
    website: "",
    tags: ["indonesia", "indie", "action", "rpg", "director-icp"],
    studio: {
      size: "20",
      type: "indie",
      games: ["Action RPGs"],
      fitScore: 75,
      fitReason: "Indonesian action RPG developer.",
      focus: "Action RPG"
    }
  }
];

async function seedAsiaLeads() {
  console.log(`Seeding ${leads.length} Asian leads...\n`);
  
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
      createdBy: 'seed-asia',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`✅ ${lead.name} (${lead.country}) — Score: ${lead.studio.fitScore}`);
    created++;
  }
  
  console.log(`\n✅ Created ${created}, skipped ${skipped}`);
  process.exit(0);
}

seedAsiaLeads().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
