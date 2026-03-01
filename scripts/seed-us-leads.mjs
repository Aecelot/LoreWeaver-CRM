// Seed 50 US game studios/developers
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
  // === AAA NARRATIVE STUDIOS ===
  {
    name: "Obsidian Entertainment",
    country: "USA",
    location: "Irvine, California",
    website: "https://www.obsidian.net",
    tags: ["usa", "aaa", "rpg", "narrative", "director-icp", "architect-icp"],
    studio: {
      size: "200+",
      type: "aaa",
      games: ["Pillars of Eternity", "The Outer Worlds", "Avowed", "Fallout: New Vegas"],
      fitScore: 95,
      fitReason: "RPG masters. Massive branching narratives. Has internal dialogue tools but both products could enhance.",
      focus: "Western RPG"
    }
  },
  {
    name: "Naughty Dog",
    country: "USA",
    location: "Santa Monica, California",
    website: "https://www.naughtydog.com",
    tags: ["usa", "aaa", "action-adventure", "narrative", "director-icp"],
    studio: {
      size: "500+",
      type: "aaa",
      games: ["The Last of Us", "Uncharted", "The Last of Us Part II"],
      fitScore: 85,
      fitReason: "Narrative-driven action adventures. Sony first-party, may have internal tools.",
      focus: "Cinematic Action"
    }
  },
  {
    name: "Insomniac Games",
    country: "USA",
    location: "Burbank, California",
    website: "https://insomniac.games",
    tags: ["usa", "aaa", "action", "open-world", "director-icp"],
    studio: {
      size: "500+",
      type: "aaa",
      games: ["Spider-Man", "Ratchet & Clank", "Spider-Man 2"],
      fitScore: 85,
      fitReason: "Open world games with NPC dialogue. Sony first-party.",
      focus: "Action Adventure"
    }
  },
  {
    name: "Santa Monica Studio",
    country: "USA",
    location: "Los Angeles, California",
    website: "https://sms.playstation.com",
    tags: ["usa", "aaa", "action-rpg", "narrative", "director-icp"],
    studio: {
      size: "300+",
      type: "aaa",
      games: ["God of War", "God of War Ragnarök"],
      fitScore: 90,
      fitReason: "God of War — deep narrative action RPG. Director for NPC interactions.",
      focus: "Action RPG"
    }
  },
  {
    name: "Bethesda Game Studios",
    country: "USA",
    location: "Rockville, Maryland",
    website: "https://bethesdagamestudios.com",
    tags: ["usa", "aaa", "open-world", "rpg", "director-icp"],
    studio: {
      size: "400+",
      type: "aaa",
      games: ["Skyrim", "Fallout 4", "Starfield"],
      fitScore: 85,
      fitReason: "Massive open world RPGs with tons of NPC dialogue. Has Creation Engine tools.",
      focus: "Open World RPG"
    }
  },
  {
    name: "BioWare",
    country: "USA",
    location: "Austin, Texas / Edmonton, Canada",
    website: "https://www.bioware.com",
    tags: ["usa", "aaa", "rpg", "narrative", "director-icp", "architect-icp"],
    studio: {
      size: "500+",
      type: "aaa",
      games: ["Mass Effect", "Dragon Age", "Baldur's Gate"],
      fitScore: 90,
      fitReason: "Legendary narrative RPG studio. Dragon Age Dreadwolf in development. Both products fit.",
      focus: "Narrative RPG"
    }
  },
  {
    name: "That's No Moon",
    country: "USA",
    location: "Los Angeles, California",
    website: "https://thatsnomoon.com",
    tags: ["usa", "aaa", "narrative", "action-adventure", "director-icp"],
    studio: {
      size: "100+",
      type: "aaa",
      games: ["Unannounced AAA title"],
      fitScore: 90,
      fitReason: "Ex-Naughty Dog, Santa Monica veterans. Working on narrative AAA game. Perfect timing.",
      focus: "Narrative Adventure"
    }
  },
  {
    name: "Sucker Punch Productions",
    country: "USA",
    location: "Bellevue, Washington",
    website: "https://www.suckerpunch.com",
    tags: ["usa", "aaa", "open-world", "action", "director-icp"],
    studio: {
      size: "200+",
      type: "aaa",
      games: ["Ghost of Tsushima", "Infamous"],
      fitScore: 90,
      fitReason: "Ghost of Tsushima — open world with narrative quests. Director for NPC variety.",
      focus: "Open World Action"
    }
  },

  // === AA NARRATIVE STUDIOS ===
  {
    name: "Double Fine Productions",
    country: "USA",
    location: "San Francisco, California",
    website: "https://www.doublefine.com",
    tags: ["usa", "aa", "adventure", "narrative", "architect-icp"],
    studio: {
      size: "70+",
      type: "aa",
      games: ["Psychonauts 2", "Broken Age", "Brütal Legend"],
      fitScore: 95,
      fitReason: "Tim Schafer's studio. Narrative adventure masters. Perfect Architect ICP.",
      focus: "Narrative Adventure"
    }
  },
  {
    name: "Telltale Games (New)",
    country: "USA",
    location: "Los Angeles, California",
    website: "https://telltale.com",
    tags: ["usa", "aa", "adventure", "narrative", "branching", "architect-icp"],
    studio: {
      size: "50+",
      type: "aa",
      games: ["The Wolf Among Us 2", "The Expanse"],
      fitScore: 95,
      fitReason: "Revived Telltale. Branching narrative is their DNA. Perfect Architect ICP.",
      focus: "Episodic Adventure"
    }
  },
  {
    name: "Gearbox Software",
    country: "USA",
    location: "Frisco, Texas",
    website: "https://www.gearboxsoftware.com",
    tags: ["usa", "aa", "fps", "looter-shooter", "director-icp"],
    studio: {
      size: "500+",
      type: "aa",
      games: ["Borderlands", "Tiny Tina's Wonderlands", "Tales from the Borderlands"],
      fitScore: 80,
      fitReason: "Borderlands has lots of NPC dialogue and humor. Director for variety.",
      focus: "Looter Shooter"
    }
  },
  {
    name: "Vicarious Visions (Blizzard Albany)",
    country: "USA",
    location: "Albany, New York",
    website: "",
    tags: ["usa", "aa", "rpg", "action", "director-icp"],
    studio: {
      size: "200+",
      type: "aa",
      games: ["Diablo II: Resurrected", "Tony Hawk remasters"],
      fitScore: 70,
      fitReason: "Now part of Blizzard. RPG work on Diablo.",
      focus: "Remasters / Action RPG"
    }
  },

  // === INDIE NARRATIVE STUDIOS ===
  {
    name: "Supergiant Games",
    country: "USA",
    location: "San Francisco, California",
    website: "https://www.supergiantgames.com",
    tags: ["usa", "indie", "action-rpg", "narrative", "director-icp", "architect-icp"],
    studio: {
      size: "25",
      type: "indie",
      games: ["Hades", "Hades II", "Transistor", "Bastion", "Pyre"],
      fitScore: 95,
      fitReason: "Narrative masters. Every game has stellar story. Small team. Both products fit.",
      focus: "Action RPG"
    }
  },
  {
    name: "Fullbright",
    country: "USA",
    location: "Portland, Oregon",
    website: "https://fullbrig.ht",
    tags: ["usa", "indie", "narrative", "exploration", "architect-icp"],
    studio: {
      size: "10",
      type: "indie",
      games: ["Gone Home", "Tacoma", "Open Roads"],
      fitScore: 95,
      fitReason: "Pure narrative exploration games. Perfect Architect ICP.",
      focus: "Narrative Exploration"
    }
  },
  {
    name: "Night School Studio",
    country: "USA",
    location: "Glendale, California",
    website: "https://nightschoolstudio.com",
    tags: ["usa", "indie", "narrative", "adventure", "branching", "architect-icp"],
    studio: {
      size: "25",
      type: "indie",
      games: ["Oxenfree", "Oxenfree II", "Afterparty"],
      fitScore: 95,
      fitReason: "Oxenfree — branching dialogue system. Invented walk-and-talk dialogue. Perfect Architect.",
      focus: "Supernatural Adventure"
    }
  },
  {
    name: "Giant Sparrow",
    country: "USA",
    location: "Los Angeles, California",
    website: "",
    tags: ["usa", "indie", "narrative", "exploration", "architect-icp"],
    studio: {
      size: "15",
      type: "indie",
      games: ["What Remains of Edith Finch", "The Unfinished Swan"],
      fitScore: 95,
      fitReason: "What Remains of Edith Finch — narrative masterpiece. Perfect Architect ICP.",
      focus: "Narrative Exploration"
    }
  },
  {
    name: "Variable State",
    country: "USA",
    location: "San Francisco, California",
    website: "https://variablestate.com",
    tags: ["usa", "indie", "narrative", "mystery", "architect-icp"],
    studio: {
      size: "10",
      type: "indie",
      games: ["Virginia", "Last Stop"],
      fitScore: 90,
      fitReason: "Cinematic narrative games. Virginia was dialogue-free but Last Stop has branching.",
      focus: "Narrative Mystery"
    }
  },
  {
    name: "Campo Santo",
    country: "USA",
    location: "San Francisco, California",
    website: "https://www.camposanto.com",
    tags: ["usa", "indie", "narrative", "adventure", "architect-icp"],
    studio: {
      size: "15",
      type: "indie",
      games: ["Firewatch", "In the Valley of Gods (cancelled)"],
      fitScore: 90,
      fitReason: "Firewatch — narrative adventure masterpiece. Now owned by Valve.",
      focus: "Narrative Adventure"
    }
  },
  {
    name: "The Chinese Room",
    country: "USA",
    location: "Brighton, UK (but published in US)",
    website: "https://www.thechineseroom.co.uk",
    tags: ["usa", "indie", "narrative", "horror", "architect-icp"],
    studio: {
      size: "30",
      type: "indie",
      games: ["Everybody's Gone to the Rapture", "Dear Esther", "Still Wakes the Deep"],
      fitScore: 90,
      fitReason: "Walking sim pioneers. Narrative-focused horror now.",
      focus: "Narrative Horror"
    }
  },
  {
    name: "Cardboard Computer",
    country: "USA",
    location: "Kentucky/Chicago",
    website: "http://cardboardcomputer.com",
    tags: ["usa", "indie", "narrative", "adventure", "experimental", "architect-icp"],
    studio: {
      size: "3",
      type: "indie",
      games: ["Kentucky Route Zero"],
      fitScore: 90,
      fitReason: "Kentucky Route Zero — acclaimed narrative adventure. Tiny team.",
      focus: "Experimental Narrative"
    }
  },
  {
    name: "Inkle (US presence)",
    country: "USA",
    location: "Cambridge, UK (but US market)",
    website: "https://www.inklestudios.com",
    tags: ["usa", "indie", "narrative", "interactive-fiction", "architect-icp"],
    studio: {
      size: "3",
      type: "indie",
      games: ["80 Days", "Heaven's Vault", "Sorcery!"],
      fitScore: 95,
      fitReason: "Already researched — partnership angle for Director ↔ ink integration.",
      focus: "Interactive Fiction"
    }
  },
  {
    name: "thatgamecompany",
    country: "USA",
    location: "Santa Monica, California",
    website: "https://thatgamecompany.com",
    tags: ["usa", "indie", "emotional", "multiplayer", "director-icp"],
    studio: {
      size: "40",
      type: "indie",
      games: ["Journey", "Flower", "Sky: Children of the Light"],
      fitScore: 75,
      fitReason: "Emotional games but minimal dialogue. Sky has social elements.",
      focus: "Emotional Experience"
    }
  },
  {
    name: "The Molasses Flood",
    country: "USA",
    location: "Boston, Massachusetts",
    website: "https://molassesflood.com",
    tags: ["usa", "indie", "survival", "narrative", "director-icp"],
    studio: {
      size: "20",
      type: "indie",
      games: ["The Flame in the Flood", "Drake Hollow"],
      fitScore: 75,
      fitReason: "Survival games with narrative elements.",
      focus: "Survival Adventure"
    }
  },
  {
    name: "Heart Machine",
    country: "USA",
    location: "Los Angeles, California",
    website: "https://www.heartmachine.com",
    tags: ["usa", "indie", "action-rpg", "director-icp"],
    studio: {
      size: "30",
      type: "indie",
      games: ["Hyper Light Drifter", "Solar Ash", "Hyper Light Breaker"],
      fitScore: 80,
      fitReason: "Atmospheric action games. Hyper Light Breaker is multiplayer RPG.",
      focus: "Action RPG"
    }
  },
  {
    name: "Subset Games",
    country: "USA",
    location: "Davis, California",
    website: "https://subsetgames.com",
    tags: ["usa", "indie", "strategy", "roguelike", "architect-icp"],
    studio: {
      size: "3",
      type: "indie",
      games: ["FTL", "Into the Breach"],
      fitScore: 70,
      fitReason: "Strategy roguelikes. Less narrative focus but acclaimed studio.",
      focus: "Strategy Roguelike"
    }
  },
  {
    name: "Klei Entertainment",
    country: "USA",
    location: "Vancouver, Canada (NA market)",
    website: "https://www.klei.com",
    tags: ["usa", "indie", "survival", "roguelike", "director-icp"],
    studio: {
      size: "80",
      type: "indie",
      games: ["Don't Starve", "Oxygen Not Included", "Rotwood"],
      fitScore: 75,
      fitReason: "Survival games. Rotwood has NPC elements.",
      focus: "Survival / Roguelike"
    }
  },
  {
    name: "Yacht Club Games",
    country: "USA",
    location: "Los Angeles, California",
    website: "https://yachtclubgames.com",
    tags: ["usa", "indie", "platformer", "retro", "architect-icp"],
    studio: {
      size: "20",
      type: "indie",
      games: ["Shovel Knight", "Shovel Knight Dig", "Mina the Hollower"],
      fitScore: 70,
      fitReason: "Retro platformers. Some NPC dialogue in Shovel Knight.",
      focus: "Retro Platformer"
    }
  },
  {
    name: "WayForward",
    country: "USA",
    location: "Valencia, California",
    website: "https://wayforward.com",
    tags: ["usa", "indie", "platformer", "licensed", "architect-icp"],
    studio: {
      size: "100+",
      type: "indie",
      games: ["Shantae", "River City Girls", "Contra: Operation Galuga"],
      fitScore: 75,
      fitReason: "2D action games with character dialogue. Shantae has narrative.",
      focus: "2D Action"
    }
  },
  {
    name: "Iron Galaxy Studios",
    country: "USA",
    location: "Chicago, Illinois",
    website: "https://irongalaxystudios.com",
    tags: ["usa", "aa", "action", "fighting", "director-icp"],
    studio: {
      size: "150+",
      type: "aa",
      games: ["Killer Instinct", "Extinction", "Rumbleverse"],
      fitScore: 65,
      fitReason: "Action/fighting games. Less narrative focus.",
      focus: "Action / Fighting"
    }
  },
  {
    name: "Certain Affinity",
    country: "USA",
    location: "Austin, Texas",
    website: "https://certainaffinity.com",
    tags: ["usa", "aa", "fps", "co-dev", "director-icp"],
    studio: {
      size: "200+",
      type: "aa",
      games: ["Halo Infinite co-dev", "Call of Duty co-dev"],
      fitScore: 60,
      fitReason: "Co-development studio for FPS titles.",
      focus: "FPS Co-dev"
    }
  },

  // === PUBLISHERS / PUBLISHER-DEVELOPERS ===
  {
    name: "Devolver Digital",
    country: "USA",
    location: "Austin, Texas",
    website: "https://www.devolverdigital.com",
    tags: ["usa", "publisher", "indie", "action", "narrative"],
    studio: {
      size: "100+",
      type: "publisher",
      games: ["Cult of the Lamb", "Inscryption", "Hotline Miami", "Weird West"],
      fitScore: 85,
      fitReason: "Top indie publisher. Could distribute LoreWeaver tools to their devs.",
      focus: "Indie Publishing"
    }
  },
  {
    name: "Annapurna Interactive",
    country: "USA",
    location: "Los Angeles, California",
    website: "https://annapurnainteractive.com",
    tags: ["usa", "publisher", "indie", "narrative", "artistic"],
    studio: {
      size: "50+",
      type: "publisher",
      games: ["What Remains of Edith Finch", "Outer Wilds", "Stray", "Cocoon"],
      fitScore: 90,
      fitReason: "Prestige narrative publisher. Perfect partner for Architect distribution.",
      focus: "Artistic Indie Publishing"
    }
  },
  {
    name: "Panic",
    country: "USA",
    location: "Portland, Oregon",
    website: "https://panic.com",
    tags: ["usa", "publisher", "indie", "narrative", "experimental"],
    studio: {
      size: "50+",
      type: "publisher",
      games: ["Firewatch", "Untitled Goose Game", "Playdate"],
      fitScore: 85,
      fitReason: "Quality-focused publisher. Published Firewatch.",
      focus: "Indie Publishing"
    }
  },
  {
    name: "Raw Fury",
    country: "USA",
    location: "Stockholm, Sweden (US office)",
    website: "https://rawfury.com",
    tags: ["usa", "publisher", "indie", "narrative"],
    studio: {
      size: "40+",
      type: "publisher",
      games: ["Sable", "Norco", "Star Renegades"],
      fitScore: 85,
      fitReason: "Norco — narrative adventure. Good indie publisher for Architect.",
      focus: "Indie Publishing"
    }
  },
  {
    name: "Fellow Traveller",
    country: "USA",
    location: "Melbourne (US market)",
    website: "https://www.fellowtraveller.games",
    tags: ["usa", "publisher", "indie", "narrative"],
    studio: {
      size: "20+",
      type: "publisher",
      games: ["Neo Cab", "Paradise Killer", "Citizen Sleeper"],
      fitScore: 95,
      fitReason: "Narrative-first publisher. Citizen Sleeper is perfect fit. Partnership potential.",
      focus: "Narrative Publishing"
    }
  },

  // === MORE INDIE STUDIOS ===
  {
    name: "Jump Over The Age",
    country: "USA",
    location: "UK/US",
    website: "",
    tags: ["usa", "indie", "narrative", "tabletop", "architect-icp"],
    studio: {
      size: "1",
      type: "indie",
      games: ["Citizen Sleeper", "In Other Waters", "Starward Vector"],
      fitScore: 95,
      fitReason: "Citizen Sleeper — tabletop narrative RPG. Solo dev with massive narrative output.",
      focus: "Narrative RPG"
    }
  },
  {
    name: "Queasy Games",
    country: "USA",
    location: "Vancouver, Canada (NA)",
    website: "",
    tags: ["usa", "indie", "music", "rhythm", "architect-icp"],
    studio: {
      size: "10",
      type: "indie",
      games: ["Sound Shapes", "Guacamelee"],
      fitScore: 65,
      fitReason: "Music/rhythm games. Less narrative.",
      focus: "Music / Rhythm"
    }
  },
  {
    name: "DrinkBox Studios",
    country: "USA",
    location: "Toronto, Canada (NA)",
    website: "https://drinkboxstudios.com",
    tags: ["usa", "indie", "action", "metroidvania", "director-icp"],
    studio: {
      size: "30",
      type: "indie",
      games: ["Guacamelee", "Nobody Saves the World", "Severed"],
      fitScore: 75,
      fitReason: "Action games with character dialogue.",
      focus: "Action Metroidvania"
    }
  },
  {
    name: "Ska Studios",
    country: "USA",
    location: "Seattle, Washington",
    website: "https://ska-studios.com",
    tags: ["usa", "indie", "action-rpg", "souls-like", "architect-icp"],
    studio: {
      size: "2",
      type: "indie",
      games: ["Salt and Sanctuary", "Salt and Sacrifice"],
      fitScore: 75,
      fitReason: "2D souls-like with lore/narrative. Husband-wife team.",
      focus: "2D Souls-like"
    }
  },
  {
    name: "Moon Studios",
    country: "USA",
    location: "Vienna, Austria (but published in US)",
    website: "https://www.orithegame.com",
    tags: ["usa", "indie", "platformer", "metroidvania", "architect-icp"],
    studio: {
      size: "80",
      type: "indie",
      games: ["Ori and the Blind Forest", "Ori and the Will of the Wisps", "No Rest for the Wicked"],
      fitScore: 85,
      fitReason: "Ori games have emotional narrative. No Rest for the Wicked is action RPG.",
      focus: "Metroidvania / Action RPG"
    }
  },
  {
    name: "Harebrained Schemes",
    country: "USA",
    location: "Seattle, Washington",
    website: "https://harebrained-schemes.com",
    tags: ["usa", "indie", "srpg", "narrative", "architect-icp"],
    studio: {
      size: "60",
      type: "indie",
      games: ["Shadowrun Returns", "BattleTech", "The Lamplighters League"],
      fitScore: 90,
      fitReason: "Shadowrun — narrative CRPG. Branching dialogue. Perfect Architect ICP.",
      focus: "Tactical RPG"
    }
  },
  {
    name: "inXile Entertainment",
    country: "USA",
    location: "Newport Beach, California",
    website: "https://inxile-entertainment.com",
    tags: ["usa", "aa", "rpg", "narrative", "architect-icp", "director-icp"],
    studio: {
      size: "100+",
      type: "aa",
      games: ["Wasteland 3", "Torment: Tides of Numenera", "Clockwork Revolution"],
      fitScore: 95,
      fitReason: "CRPG masters. Wasteland 3 has massive branching. Both products fit.",
      focus: "CRPG"
    }
  },
  {
    name: "Larian Studios (US Office)",
    country: "USA",
    location: "Dublin (but strong US presence)",
    website: "https://larian.com",
    tags: ["usa", "aaa", "crpg", "narrative", "director-icp", "architect-icp"],
    studio: {
      size: "400+",
      type: "aaa",
      games: ["Baldur's Gate 3", "Divinity: Original Sin 2"],
      fitScore: 95,
      fitReason: "BG3 creators. Massive narrative RPGs. Has internal tools but validation target.",
      focus: "CRPG"
    }
  },
  {
    name: "Paradox Development Studio",
    country: "USA",
    location: "Stockholm, Sweden (US market)",
    website: "https://www.paradoxinteractive.com",
    tags: ["usa", "aa", "strategy", "simulation", "architect-icp"],
    studio: {
      size: "300+",
      type: "aa",
      games: ["Crusader Kings III", "Victoria 3", "Hearts of Iron IV"],
      fitScore: 80,
      fitReason: "CK3 has character dialogue/events. Event writing at scale.",
      focus: "Grand Strategy"
    }
  },
  {
    name: "Firaxis Games",
    country: "USA",
    location: "Sparks, Maryland",
    website: "https://firaxis.com",
    tags: ["usa", "aa", "strategy", "4x", "director-icp"],
    studio: {
      size: "200+",
      type: "aa",
      games: ["Civilization VI", "XCOM 2", "Marvel's Midnight Suns"],
      fitScore: 80,
      fitReason: "Midnight Suns has social/dialogue elements. Strategy with narrative.",
      focus: "Turn-based Strategy"
    }
  },
  {
    name: "Respawn Entertainment",
    country: "USA",
    location: "Los Angeles, California",
    website: "https://www.respawn.com",
    tags: ["usa", "aaa", "fps", "action", "director-icp"],
    studio: {
      size: "400+",
      type: "aaa",
      games: ["Apex Legends", "Titanfall", "Star Wars Jedi: Survivor"],
      fitScore: 85,
      fitReason: "Jedi Survivor — narrative action adventure. Director for NPC variety.",
      focus: "FPS / Action Adventure"
    }
  },
  {
    name: "Asobo Studio",
    country: "USA",
    location: "Bordeaux, France (US market)",
    website: "https://www.asobostudio.com",
    tags: ["usa", "aa", "adventure", "narrative", "architect-icp"],
    studio: {
      size: "200+",
      type: "aa",
      games: ["A Plague Tale: Innocence", "A Plague Tale: Requiem", "Flight Simulator"],
      fitScore: 90,
      fitReason: "A Plague Tale — narrative adventure. Perfect Architect ICP.",
      focus: "Narrative Adventure"
    }
  },
  {
    name: "Private Division",
    country: "USA",
    location: "New York, New York",
    website: "https://www.privatedivision.com",
    tags: ["usa", "publisher", "aa", "narrative"],
    studio: {
      size: "100+",
      type: "publisher",
      games: ["The Outer Worlds", "Hades II", "Tales of the Shire"],
      fitScore: 85,
      fitReason: "Take-Two's indie label. Published Outer Worlds, Hades II.",
      focus: "AA Publishing"
    }
  },
  {
    name: "11 bit studios (US)",
    country: "USA",
    location: "Warsaw, Poland (US market)",
    website: "https://www.11bitstudios.com",
    tags: ["usa", "indie", "strategy", "narrative", "architect-icp"],
    studio: {
      size: "250+",
      type: "indie",
      games: ["Frostpunk", "This War of Mine", "The Alters"],
      fitScore: 85,
      fitReason: "This War of Mine — narrative survival. The Alters upcoming.",
      focus: "Narrative Survival"
    }
  }
];

async function seedUSLeads() {
  console.log(`Seeding ${leads.length} US leads...\n`);
  
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
      createdBy: 'seed-us',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`✅ ${lead.name} — Score: ${lead.studio.fitScore}`);
    created++;
  }
  
  console.log(`\n✅ Created ${created}, skipped ${skipped}`);
  process.exit(0);
}

seedUSLeads().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
