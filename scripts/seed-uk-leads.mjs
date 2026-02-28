// Seed UK leads - Both Architect and Director
// 20 leads total: ~10 Architect + ~10 Director
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

const ukLeads = [
  // ========== ARCHITECT ICP (Narrative indies) ==========
  {
    name: "Inkle",
    type: "studio",
    status: "active",
    priority: "high",
    owner: "system",
    contact: { name: "Jon Ingold", role: "Co-founder, Narrative Director", email: "", phone: "", linkedin: "" },
    website: "https://www.inklestudios.com",
    country: "UK",
    location: "Cambridge",
    tags: ["uk", "indie", "narrative", "interactive-fiction", "architect-icp"],
    notes: "Founded 2011. ~4 employees. Created ink scripting language (industry standard!). 80 Days, Sorcery!, Heaven's Vault, A Highland Song, Overboard. BAFTA winners. Jon Ingold is co-founder. Source: Wikipedia, inklestudios.com",
    studio: { 
      size: "4", 
      type: "indie", 
      games: ["80 Days", "Heaven's Vault", "A Highland Song", "Sorcery!", "Overboard"], 
      focus: "Interactive narrative", 
      fitScore: 95, 
      fitReason: "THE narrative games studio. Created ink (used industry-wide). Perfect Architect fit." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-uk"
  },
  {
    name: "Weather Factory",
    type: "studio",
    status: "active",
    priority: "high",
    owner: "system",
    contact: { name: "Alexis Kennedy", role: "Co-founder", email: "", phone: "", linkedin: "" },
    website: "https://weatherfactory.biz",
    country: "UK",
    location: "London",
    tags: ["uk", "indie", "narrative", "cosmic-horror", "architect-icp"],
    notes: "Founded 2017 by Alexis Kennedy (Fallen London creator) + Lottie Bevan. Cultist Simulator (double BAFTA-nominated), BOOK OF HOURS. Develop Star Award 2019 Best Microstudio. Conscious indie aesthetic. Source: Wikipedia, weatherfactory.biz",
    studio: { 
      size: "2-5", 
      type: "indie", 
      games: ["Cultist Simulator", "BOOK OF HOURS"], 
      focus: "Narrative games / cosmic horror", 
      fitScore: 90, 
      fitReason: "Alexis Kennedy = narrative legend. Cultist Simulator has complex narrative systems." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-uk"
  },
  {
    name: "Failbetter Games",
    type: "studio",
    status: "active",
    priority: "high",
    owner: "system",
    contact: { name: "", role: "", email: "", phone: "", linkedin: "" },
    website: "https://www.failbettergames.com",
    country: "UK",
    location: "London",
    tags: ["uk", "indie", "narrative", "gothic", "architect-icp"],
    notes: "Founded 2009 by Alexis Kennedy (left 2016). 10-16 employees. Fallen London (browser RPG), Sunless Sea, Sunless Skies. Gothic/Victorian narrative. Working on Mask of the Rose and new world/genre. Source: Wikipedia, PC Gamer",
    studio: { 
      size: "10-16", 
      type: "indie", 
      games: ["Fallen London", "Sunless Sea", "Sunless Skies"], 
      focus: "Gothic narrative RPG", 
      fitScore: 90, 
      fitReason: "Fallen London = benchmark for browser narrative. Perfect authoring tool fit." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-uk"
  },
  {
    name: "Variable State",
    type: "studio",
    status: "active",
    priority: "medium",
    owner: "system",
    contact: { name: "Jonathan Burroughs", role: "Co-founder, Director", email: "", phone: "", linkedin: "" },
    website: "https://www.variablestate.com",
    country: "UK",
    location: "London",
    tags: ["uk", "indie", "narrative", "adventure", "architect-icp"],
    notes: "Small team. Virginia (2016, BAFTA nominated), Last Stop (2021). Narrative adventure focused. Jonathan Burroughs is director. Source: variablestate.com, Hollywood Reporter",
    studio: { 
      size: "5-10", 
      type: "indie", 
      games: ["Virginia", "Last Stop"], 
      focus: "Narrative adventure", 
      fitScore: 85, 
      fitReason: "Virginia was wordless narrative. Last Stop has branching dialogue. Good fit." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-uk"
  },
  {
    name: "Revolution Software",
    type: "studio",
    status: "active",
    priority: "high",
    owner: "system",
    contact: { name: "Charles Cecil", role: "Founder, CEO", email: "", phone: "", linkedin: "" },
    website: "https://revolution.co.uk",
    country: "UK",
    location: "York",
    tags: ["uk", "indie", "adventure", "point-and-click", "architect-icp"],
    notes: "Founded 1989. 15 employees. Broken Sword series (5 games), Beyond a Steel Sky. Charles Cecil founded. Adventure game legends. Still actively developing. Source: Wikipedia, PitchBook",
    studio: { 
      size: "15", 
      type: "indie", 
      games: ["Broken Sword series", "Beyond a Steel Sky", "Beneath a Steel Sky"], 
      focus: "Point-and-click adventure", 
      fitScore: 85, 
      fitReason: "Adventure game veterans since 1989. Dialogue-heavy games. Perfect fit." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-uk"
  },
  {
    name: "Tall Story Games",
    type: "studio",
    status: "active",
    priority: "medium",
    owner: "system",
    contact: { name: "Tom Hardwidge", role: "Co-founder", email: "", phone: "", linkedin: "" },
    website: "https://tallstorygames.com",
    country: "UK",
    location: "UK",
    tags: ["uk", "indie", "adventure", "point-and-click", "architect-icp"],
    notes: "Founded 2021. Husband-wife team (Tom + Emma Hardwidge). Lucy Dreaming, Heir of the Dog (2025). British humor point-and-click. Very small but narrative-focused. Source: Steam, gamespress.com",
    studio: { 
      size: "2", 
      type: "indie", 
      games: ["Lucy Dreaming", "Heir of the Dog"], 
      focus: "Point-and-click comedy", 
      fitScore: 80, 
      fitReason: "Small but dedicated to narrative adventure. Classic dialogue-heavy style." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-uk"
  },
  {
    name: "ustwo games",
    type: "studio",
    status: "active",
    priority: "medium",
    owner: "system",
    contact: { name: "", role: "", email: "", phone: "", linkedin: "" },
    website: "https://ustwogames.co.uk",
    country: "UK",
    location: "London (South)",
    tags: ["uk", "indie", "puzzle", "narrative", "mobile", "architect-icp"],
    notes: "15-43 employees (separate from ustwo agency). Monument Valley 1 & 2 (BAFTA/Apple Design Award), Alba: A Wildlife Adventure. Visual storytelling excellence. Source: Wikipedia, ustwogames.co.uk",
    studio: { 
      size: "15-43", 
      type: "indie", 
      games: ["Monument Valley", "Monument Valley 2", "Alba: A Wildlife Adventure"], 
      focus: "Puzzle / visual narrative", 
      fitScore: 75, 
      fitReason: "Environmental storytelling focus. Less dialogue but strong narrative intent." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-uk"
  },
  {
    name: "Chucklefish",
    type: "studio",
    status: "active",
    priority: "medium",
    owner: "system",
    contact: { name: "Finn Brice", role: "Founder, CEO", email: "", phone: "", linkedin: "" },
    website: "https://chucklefish.org",
    country: "UK",
    location: "London",
    tags: ["uk", "indie", "pixel-art", "publisher", "architect-icp"],
    notes: "Founded 2011. 18-19 employees. Starbound, Wargroove. Also PUBLISHER (published Stardew Valley). Self-funded, independent. Finn Brice is founder. Source: Wikipedia, chucklefish.org",
    studio: { 
      size: "18-19", 
      type: "indie", 
      games: ["Starbound", "Wargroove", "Witchbrook (in dev)"], 
      focus: "Pixel-art games + publishing", 
      fitScore: 70, 
      fitReason: "Also publisher — could introduce Architect to devs they work with." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-uk"
  },

  // ========== DIRECTOR ICP (AA studios with NPC needs) ==========
  {
    name: "Supermassive Games",
    type: "studio",
    status: "active",
    priority: "high",
    owner: "system",
    contact: { name: "", role: "", email: "", phone: "", linkedin: "" },
    website: "https://www.supermassivegames.com",
    country: "UK",
    location: "Guildford",
    tags: ["uk", "aa", "narrative-horror", "branching", "director-icp"],
    notes: "55+ employees post-2024 layoffs (was ~150). Until Dawn, The Dark Pictures Anthology, The Quarry. BAFTA-winning. Interactive horror with branching narratives. Working on Directive 8020. Source: Wikipedia, Bloomberg",
    studio: { 
      size: "55+", 
      type: "aa", 
      games: ["Until Dawn", "The Quarry", "The Dark Pictures Anthology", "The Casting of Frank Stone"], 
      focus: "Narrative horror", 
      fitScore: 90, 
      fitReason: "Branching narrative is CORE. Multiple NPCs with dialogue. Perfect Director showcase." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-uk"
  },
  {
    name: "The Chinese Room",
    type: "studio",
    status: "active",
    priority: "high",
    owner: "system",
    contact: { name: "Dan Pinchbeck", role: "Creative Director", email: "", phone: "", linkedin: "" },
    website: "https://www.thechineseroom.co.uk",
    country: "UK",
    location: "Brighton",
    tags: ["uk", "aa", "narrative", "exploration", "director-icp"],
    notes: "55 employees post-2025 layoffs. Dear Esther (pioneered walking sim), Everybody's Gone to the Rapture, Still Wakes the Deep (2024, 3x BAFTA). Also worked on Vampire: The Masquerade - Bloodlines 2. Regained independence from Sumo 2025. Source: Wikipedia, Reddit",
    studio: { 
      size: "55", 
      type: "aa", 
      games: ["Dear Esther", "Everybody's Gone to the Rapture", "Still Wakes the Deep", "Amnesia: A Machine for Pigs"], 
      focus: "Exploration / narrative horror", 
      fitScore: 85, 
      fitReason: "Narrative pioneer. Still Wakes the Deep has NPC dialogue. Good Director fit." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-uk"
  },
  {
    name: "Screen Burn Interactive (No Code)",
    type: "studio",
    status: "active",
    priority: "high",
    owner: "system",
    contact: { name: "Jon McKellan", role: "Co-founder", email: "", phone: "", linkedin: "" },
    website: "https://www.nocodestudio.com",
    country: "UK",
    location: "Glasgow (Scotland)",
    tags: ["uk", "scotland", "indie", "narrative-horror", "director-icp"],
    notes: "26 employees. Founded 2015 (Jon McKellan + Omar Khan). Was 'No Code', now Screen Burn Interactive. Stories Untold (BAFTA), Observation. Working on SILENT HILL: TOWNFALL. Ex-AAA veterans. Source: Wikipedia, nocodestudio.com",
    studio: { 
      size: "26", 
      type: "indie", 
      games: ["Stories Untold", "Observation", "SILENT HILL: TOWNFALL"], 
      focus: "Narrative horror / sci-fi", 
      fitScore: 80, 
      fitReason: "Observation has AI NPC (SAM). Silent Hill has NPC dialogue. Good fit." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-uk"
  },
  {
    name: "Rebellion Developments",
    type: "studio",
    status: "active",
    priority: "medium",
    owner: "system",
    contact: { name: "Jason Kingsley", role: "CEO, Co-founder", email: "", phone: "", linkedin: "" },
    website: "https://rebellion.com",
    country: "UK",
    location: "Oxford",
    tags: ["uk", "aa", "action", "stealth", "director-icp"],
    notes: "Founded 1992. 200+ employees. Sniper Elite series, Zombie Army, Strange Brigade, Atomfall (2025). Also owns 2000 AD comics. Jason & Chris Kingsley are co-founders. Multiple studios (Oxford, Warwick). Source: Wikipedia, PC Games Insider",
    studio: { 
      size: "200+", 
      type: "aa", 
      games: ["Sniper Elite 5", "Zombie Army 4", "Atomfall", "Strange Brigade"], 
      focus: "Action / tactical shooter", 
      fitScore: 55, 
      fitReason: "Large for typical sale. Some NPC dialogue but action-focused." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-uk"
  },
  {
    name: "Splash Damage",
    type: "studio",
    status: "active",
    priority: "low",
    owner: "system",
    contact: { name: "", role: "", email: "", phone: "", linkedin: "" },
    website: "https://www.splashdamage.com",
    country: "UK",
    location: "Bromley (London)",
    tags: ["uk", "aa", "multiplayer", "co-op", "director-icp"],
    notes: "163-400 employees. Founded 2001. Gears Tactics, Brink, Dirty Bomb. Multiplayer/co-op specialists. 4-day work week. Layoffs reported 2025. Source: Wikipedia, Eurogamer",
    studio: { 
      size: "163+", 
      type: "aa", 
      games: ["Gears Tactics", "Brink", "Gears 5 (co-dev)"], 
      focus: "Multiplayer / tactics", 
      fitScore: 35, 
      fitReason: "Multiplayer focus, less NPC dialogue. Not ideal Director fit." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-uk"
  },

  // ========== PUBLISHERS (Channel Partners) ==========
  {
    name: "Curve Games",
    type: "publisher",
    status: "active",
    priority: "medium",
    owner: "system",
    contact: { name: "John Clark", role: "CEO", email: "", phone: "", linkedin: "" },
    website: "https://curvegames.com",
    country: "UK",
    location: "London (Shoreditch)",
    tags: ["uk", "publisher", "indie", "channel-partner"],
    notes: "Publisher (formerly Curve Digital/Studios). Human Fall Flat, For The King, The Ascent, Dungeons of Hinterberg. Acquired by Nazara Technologies 2025. John Clark is CEO. Triple-I focus. Source: Wikipedia, GameDeveloper",
    studio: { 
      size: "40-60", 
      type: "publisher", 
      games: ["Human Fall Flat (pub)", "For The King (pub)", "The Ascent (pub)", "Dungeons of Hinterberg (pub)"], 
      focus: "Indie publishing", 
      fitScore: 60, 
      fitReason: "Publisher — could introduce LoreWeaver tools to devs they work with." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-uk"
  },

  // ========== REFERENCE (Too large / First-party) ==========
  {
    name: "Ninja Theory",
    type: "studio",
    status: "active",
    priority: "low",
    owner: "system",
    contact: { name: "Tameem Antoniades", role: "Chief Creative Ninja", email: "", phone: "", linkedin: "" },
    website: "https://ninjatheory.com",
    country: "UK",
    location: "Cambridge",
    tags: ["uk", "aaa", "action", "narrative", "xbox-first-party", "reference"],
    notes: "Xbox Game Studios (acquired 2018). Hellblade: Senua's Sacrifice (BAFTA), Senua's Saga: Hellblade II. Mental health narrative focus. Cambridge-based. Source: Wikipedia, ninjatheory.com",
    studio: { 
      size: "100+", 
      type: "aaa", 
      games: ["Hellblade: Senua's Sacrifice", "Senua's Saga: Hellblade II", "DmC: Devil May Cry"], 
      focus: "Action-adventure / narrative", 
      fitScore: 20, 
      fitReason: "First-party Xbox. Not a sales target but excellent reference for narrative+AI." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-uk"
  },
  {
    name: "Playground Games",
    type: "studio",
    status: "active",
    priority: "low",
    owner: "system",
    contact: { name: "", role: "", email: "", phone: "", linkedin: "" },
    website: "https://playground-games.com",
    country: "UK",
    location: "Leamington Spa",
    tags: ["uk", "aaa", "racing", "rpg", "xbox-first-party", "reference"],
    notes: "Xbox Game Studios. 455+ employees (2024). Forza Horizon series. Developing Fable (action-RPG reboot). 3 studios. Source: Wikipedia, Reddit",
    studio: { 
      size: "455+", 
      type: "aaa", 
      games: ["Forza Horizon 5", "Fable (in dev)"], 
      focus: "Racing / RPG", 
      fitScore: 25, 
      fitReason: "First-party Xbox. Fable could use Director for NPCs but internal tools likely." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-uk"
  },
  {
    name: "Frontier Developments",
    type: "studio",
    status: "active",
    priority: "low",
    owner: "system",
    contact: { name: "David Braben", role: "Founder, CEO", email: "", phone: "", linkedin: "" },
    website: "https://www.frontier.co.uk",
    country: "UK",
    location: "Cambridge",
    tags: ["uk", "aaa", "simulation", "open-world", "reference"],
    notes: "400+ employees. Founded by David Braben (Elite creator). Elite Dangerous, Planet Coaster, Planet Zoo, Jurassic World Evolution. Publicly traded. Source: Wikipedia, frontier.co.uk",
    studio: { 
      size: "400+", 
      type: "aaa", 
      games: ["Elite Dangerous", "Planet Coaster", "Planet Zoo", "Jurassic World Evolution"], 
      focus: "Simulation / management", 
      fitScore: 15, 
      fitReason: "Too large. Simulation focus, not narrative-heavy." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-uk"
  },
  {
    name: "Sumo Digital",
    type: "studio",
    status: "active",
    priority: "low",
    owner: "system",
    contact: { name: "", role: "", email: "", phone: "", linkedin: "" },
    website: "https://www.sumo-digital.com",
    country: "UK",
    location: "Sheffield",
    tags: ["uk", "aaa", "varied", "work-for-hire", "reference"],
    notes: "1200+ employees globally. Sheffield HQ. LittleBigPlanet 3, Crackdown 3, Sackboy, Snake Pass. Multiple sub-studios. Tencent owned (via Sumo Group). Source: Wikipedia, LinkedIn",
    studio: { 
      size: "1200+", 
      type: "aaa", 
      games: ["Sackboy: A Big Adventure", "Snake Pass", "Team Sonic Racing"], 
      focus: "Co-development / varied", 
      fitScore: 10, 
      fitReason: "Way too large. Work-for-hire focus." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-uk"
  }
];

async function seedUKLeads() {
  console.log(`Adding ${ukLeads.length} UK leads (Architect + Director)...\n`);
  
  const byTag = { architect: 0, director: 0, reference: 0, publisher: 0 };
  
  for (const lead of ukLeads) {
    const docRef = await db.collection('leads').add({
      ...lead,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    const priority = { high: '🔴', medium: '🟡', low: '🟢' };
    
    // Count by ICP
    if (lead.tags.includes('architect-icp')) byTag.architect++;
    else if (lead.tags.includes('director-icp')) byTag.director++;
    else if (lead.tags.includes('reference')) byTag.reference++;
    else if (lead.tags.includes('channel-partner') || lead.type === 'publisher') byTag.publisher++;
    
    console.log(`${priority[lead.priority] || '⚪'} ${lead.name.padEnd(30)} | Fit: ${lead.studio.fitScore.toString().padStart(2)} | ${lead.location}`);
  }
  
  console.log(`\n✅ Done. Added ${ukLeads.length} UK leads.`);
  console.log(`   Architect ICP: ${byTag.architect}`);
  console.log(`   Director ICP: ${byTag.director}`);
  console.log(`   Publishers: ${byTag.publisher}`);
  console.log(`   Reference (too large): ${byTag.reference}`);
  process.exit(0);
}

seedUKLeads();
