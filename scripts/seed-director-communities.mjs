import admin from 'firebase-admin';
import { readFileSync } from 'fs';

const sa = JSON.parse(readFileSync('./service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const PIPELINE_ID = 'WgXKQnG8ERl0otVg758c';
const INITIAL_STAGE = 'identified';

function calcFitScore(c) {
  let score = 0;
  if (c.emergentNarrative) score += 3;  // Core Director value prop
  if (c.technicalAudience) score += 2;  // Understands what we're building
  if (c.activeCommunity) score += 2;
  if (c.influencerPotential) score += 2; // Can spread the word
  if (c.industryReach) score += 2;       // B2B potential
  if (c.lowSaturation) score += 1;
  return Math.min(score, 12);
}

// ============================================================
// CATEGORY 1: TTRPG / SOLO RPG COMMUNITIES (20)
// ============================================================
const ttrpgSolo = [
  // SOLO RPG
  { name: 'r/Solo_Roleplaying', platform: 'reddit', communityType: 'ttrpg', estimatedReach: 80000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/Solo_Roleplaying', emergentNarrative: true, activeCommunity: true, influencerPotential: true, notes: 'EXCELLENT FIT. 80K solo RPG players. They use oracles to generate emergent narrative. Director is their dream tool.', tags: ['solo-rpg', 'reddit', 'oracle', 'emergent'], country: 'Global' },
  { name: 'Solo Roleplaying Discord', platform: 'discord', communityType: 'ttrpg', estimatedReach: 15000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://discord.gg/ah3Kq34wxz', emergentNarrative: true, activeCommunity: true, notes: 'EXCELLENT FIT. Active Discord for solo RPG. Direct engagement possible.', tags: ['solo-rpg', 'discord', 'community'], country: 'Global' },
  { name: 'r/Ironsworn', platform: 'reddit', communityType: 'ttrpg', estimatedReach: 25000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/Ironsworn', emergentNarrative: true, activeCommunity: true, technicalAudience: true, notes: 'EXCELLENT FIT. Ironsworn/Starforged players. System designed for solo emergent play.', tags: ['ironsworn', 'starforged', 'solo-rpg', 'pbta'], country: 'Global' },
  { name: 'Ironsworn Discord', platform: 'discord', communityType: 'ttrpg', estimatedReach: 10000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', emergentNarrative: true, activeCommunity: true, notes: 'Shawn Tomkin community. Solo RPG focused.', tags: ['ironsworn', 'discord', 'solo-rpg'], country: 'Global' },
  { name: 'r/mythic_gme', platform: 'reddit', communityType: 'ttrpg', estimatedReach: 8000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/mythic_gme', emergentNarrative: true, activeCommunity: true, technicalAudience: true, notes: 'EXCELLENT FIT. Mythic GM Emulator users. They literally use systems to generate emergent narrative.', tags: ['mythic-gme', 'oracle', 'solo-rpg', 'emergent'], country: 'Global' },
  
  // GENERAL TTRPG
  { name: 'r/rpg', platform: 'reddit', communityType: 'ttrpg', estimatedReach: 1500000, engagementQuality: 'medium', accessMethod: 'public', platformUrl: 'https://reddit.com/r/rpg', emergentNarrative: true, activeCommunity: true, influencerPotential: true, notes: 'Massive TTRPG subreddit. Good for announcements. DMs understand emergent narrative.', tags: ['ttrpg', 'reddit', 'general'], country: 'Global' },
  { name: 'r/DnD', platform: 'reddit', communityType: 'ttrpg', estimatedReach: 3500000, engagementQuality: 'medium', accessMethod: 'public', platformUrl: 'https://reddit.com/r/DnD', emergentNarrative: true, activeCommunity: true, influencerPotential: true, notes: 'Huge D&D community. DMs interested in AI tools for NPCs.', tags: ['dnd', 'reddit', 'ttrpg'], country: 'Global' },
  { name: 'r/DMAcademy', platform: 'reddit', communityType: 'ttrpg', estimatedReach: 700000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/DMAcademy', emergentNarrative: true, activeCommunity: true, technicalAudience: true, notes: 'STRONG FIT. DMs learning to run games. They want tools to help with NPC reactions and plot.', tags: ['dm', 'ttrpg', 'tools', 'reddit'], country: 'Global' },
  { name: 'r/worldbuilding', platform: 'reddit', communityType: 'ttrpg', estimatedReach: 900000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/worldbuilding', emergentNarrative: true, activeCommunity: true, notes: 'Worldbuilders. Interested in emergent lore and character interactions.', tags: ['worldbuilding', 'reddit', 'lore'], country: 'Global' },
  
  // SPECIFIC SYSTEMS
  { name: 'Foundry VTT Community', platform: 'discord', communityType: 'ttrpg', estimatedReach: 50000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', emergentNarrative: true, activeCommunity: true, technicalAudience: true, notes: 'STRONG FIT. Technical VTT users. Already use Ironsworn/Mythic modules. Integration potential.', tags: ['foundry', 'vtt', 'technical', 'integration'], country: 'Global' },
  { name: 'Roll20 Community', platform: 'forum', communityType: 'ttrpg', estimatedReach: 100000, engagementQuality: 'medium', accessMethod: 'public', platformUrl: '', activeCommunity: true, notes: 'Large VTT user base. Less technical but huge reach.', tags: ['roll20', 'vtt', 'ttrpg'], country: 'Global' },
  { name: 'Fantasy Grounds Community', platform: 'forum', communityType: 'ttrpg', estimatedReach: 30000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', activeCommunity: true, technicalAudience: true, notes: 'Premium VTT users. Spend money on tools.', tags: ['fantasy-grounds', 'vtt', 'premium'], country: 'Global' },
  { name: 'World Anvil Community', platform: 'other', communityType: 'ttrpg', estimatedReach: 50000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://worldanvil.com', emergentNarrative: true, activeCommunity: true, notes: 'STRONG FIT. Worldbuilders using digital tools. Already pay for narrative tools.', tags: ['world-anvil', 'worldbuilding', 'tools'], country: 'Global' },
  
  // PLAY BY POST / JOURNALING
  { name: 'r/pbp (Play by Post)', platform: 'reddit', communityType: 'ttrpg', estimatedReach: 30000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/pbp', emergentNarrative: true, activeCommunity: true, notes: 'Play by post RPG. Text-based, async. Natural Director audience.', tags: ['pbp', 'async', 'text-rpg'], country: 'Global' },
  { name: 'Journaling RPG Community', platform: 'other', communityType: 'ttrpg', estimatedReach: 10000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', emergentNarrative: true, activeCommunity: true, lowSaturation: true, notes: 'Solo journaling games (Thousand Year Old Vampire, etc.). Narrative-first.', tags: ['journaling', 'solo-rpg', 'narrative'], country: 'Global' },
  
  // GM TOOLS
  { name: 'r/rpg_generators', platform: 'reddit', communityType: 'ttrpg', estimatedReach: 15000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/rpg_generators', emergentNarrative: true, technicalAudience: true, activeCommunity: true, notes: 'EXCELLENT FIT. People who use procedural generation for RPGs. Director is exactly this.', tags: ['generators', 'procedural', 'tools'], country: 'Global' },
  { name: 'OSR (Old School Renaissance) Community', platform: 'reddit', communityType: 'ttrpg', estimatedReach: 50000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/osr', emergentNarrative: true, activeCommunity: true, notes: 'OSR players value emergent play and player agency. Anti-railroad.', tags: ['osr', 'emergent', 'sandbox'], country: 'Global' },
  { name: 'TTRPG Safety Tools Community', platform: 'other', communityType: 'ttrpg', estimatedReach: 5000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', activeCommunity: true, lowSaturation: true, notes: 'Interested in AI that respects player agency and boundaries.', tags: ['safety', 'ttrpg', 'tools'], country: 'Global' },
  { name: 'Itch.io TTRPG Creators', platform: 'itch', communityType: 'ttrpg', estimatedReach: 20000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://itch.io/physical-games', emergentNarrative: true, activeCommunity: true, technicalAudience: true, notes: 'TTRPG creators on itch. Could integrate Director concepts.', tags: ['itch', 'ttrpg', 'creators'], country: 'Global' },
  { name: 'RPG.net Forums', platform: 'forum', communityType: 'ttrpg', estimatedReach: 100000, engagementQuality: 'medium', accessMethod: 'public', platformUrl: 'https://rpg.net', emergentNarrative: true, activeCommunity: true, notes: 'Classic RPG forum. Industry insiders read it.', tags: ['rpgnet', 'forum', 'industry'], country: 'Global' },
];

// ============================================================
// CATEGORY 2: EMERGENT NARRATIVE GAME COMMUNITIES (20)
// ============================================================
const emergentGames = [
  // DWARF FORTRESS
  { name: 'r/dwarffortress', platform: 'reddit', communityType: 'emergent-games', estimatedReach: 300000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/dwarffortress', emergentNarrative: true, activeCommunity: true, influencerPotential: true, notes: 'EXCELLENT FIT. THE emergent narrative game community. They post stories constantly.', tags: ['dwarf-fortress', 'emergent', 'stories', 'reddit'], country: 'Global' },
  { name: 'Bay12 Games Forums', platform: 'forum', communityType: 'emergent-games', estimatedReach: 50000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://bay12games.com/dwarves', emergentNarrative: true, activeCommunity: true, technicalAudience: true, notes: 'EXCELLENT FIT. Hardcore DF community. Technical. Modders.', tags: ['dwarf-fortress', 'bay12', 'forum', 'modding'], country: 'Global' },
  { name: 'Dwarf Fortress Discord', platform: 'discord', communityType: 'emergent-games', estimatedReach: 30000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', emergentNarrative: true, activeCommunity: true, notes: 'Active DF Discord. Share stories daily.', tags: ['dwarf-fortress', 'discord', 'stories'], country: 'Global' },
  
  // RIMWORLD
  { name: 'r/RimWorld', platform: 'reddit', communityType: 'emergent-games', estimatedReach: 700000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/RimWorld', emergentNarrative: true, activeCommunity: true, influencerPotential: true, notes: 'EXCELLENT FIT. Huge RimWorld community. War crime stories. Emergent narrative gold.', tags: ['rimworld', 'emergent', 'stories', 'reddit'], country: 'Global' },
  { name: 'RimWorld Discord', platform: 'discord', communityType: 'emergent-games', estimatedReach: 40000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', emergentNarrative: true, activeCommunity: true, notes: 'Active RimWorld Discord.', tags: ['rimworld', 'discord'], country: 'Global' },
  { name: 'Ludeon Studios Forums', platform: 'forum', communityType: 'emergent-games', estimatedReach: 30000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', emergentNarrative: true, activeCommunity: true, technicalAudience: true, notes: 'Official RimWorld forums. Modders.', tags: ['rimworld', 'forum', 'modding'], country: 'Global' },
  
  // CRUSADER KINGS
  { name: 'r/CrusaderKings', platform: 'reddit', communityType: 'emergent-games', estimatedReach: 400000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/CrusaderKings', emergentNarrative: true, activeCommunity: true, influencerPotential: true, notes: 'EXCELLENT FIT. CK community. 90% emergent story screenshots. "My heir married a horse."', tags: ['crusader-kings', 'emergent', 'stories', 'paradox'], country: 'Global' },
  { name: 'Paradox Forums', platform: 'forum', communityType: 'emergent-games', estimatedReach: 200000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://forum.paradoxplaza.com', emergentNarrative: true, activeCommunity: true, notes: 'Paradox grand strategy forums. AAR (After Action Reports) culture.', tags: ['paradox', 'forum', 'aar', 'grand-strategy'], country: 'Global' },
  { name: 'r/paradoxplaza', platform: 'reddit', communityType: 'emergent-games', estimatedReach: 200000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/paradoxplaza', emergentNarrative: true, activeCommunity: true, notes: 'General Paradox subreddit. CK, EU4, Stellaris players.', tags: ['paradox', 'grand-strategy', 'reddit'], country: 'Global' },
  
  // OTHER EMERGENT GAMES
  { name: 'r/cavesofqud', platform: 'reddit', communityType: 'emergent-games', estimatedReach: 30000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/cavesofqud', emergentNarrative: true, activeCommunity: true, technicalAudience: true, notes: 'EXCELLENT FIT. Caves of Qud is procedural narrative. Story generation in a roguelike.', tags: ['caves-of-qud', 'roguelike', 'procedural', 'narrative'], country: 'Global' },
  { name: 'r/kenshi', platform: 'reddit', communityType: 'emergent-games', estimatedReach: 100000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/Kenshi', emergentNarrative: true, activeCommunity: true, notes: 'Kenshi community. Sandbox emergent stories. Survival RPG.', tags: ['kenshi', 'sandbox', 'emergent', 'rpg'], country: 'Global' },
  { name: 'r/projectzomboid', platform: 'reddit', communityType: 'emergent-games', estimatedReach: 200000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/projectzomboid', emergentNarrative: true, activeCommunity: true, notes: 'Project Zomboid. Emergent survival stories.', tags: ['project-zomboid', 'survival', 'emergent'], country: 'Global' },
  { name: 'r/starsector', platform: 'reddit', communityType: 'emergent-games', estimatedReach: 50000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/starsector', emergentNarrative: true, activeCommunity: true, technicalAudience: true, notes: 'Starsector players. Space sandbox emergent stories.', tags: ['starsector', 'space', 'sandbox', 'emergent'], country: 'Global' },
  { name: 'r/roguelikes', platform: 'reddit', communityType: 'emergent-games', estimatedReach: 100000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/roguelikes', emergentNarrative: true, activeCommunity: true, technicalAudience: true, notes: 'Traditional roguelike fans. Procedural generation enthusiasts.', tags: ['roguelike', 'procedural', 'traditional'], country: 'Global' },
  { name: 'r/roguelites', platform: 'reddit', communityType: 'emergent-games', estimatedReach: 50000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/roguelites', emergentNarrative: true, activeCommunity: true, notes: 'Roguelite fans. More casual but still into emergent gameplay.', tags: ['roguelite', 'procedural'], country: 'Global' },
  
  // COLONY SIMS
  { name: 'r/BaseBuildingGames', platform: 'reddit', communityType: 'emergent-games', estimatedReach: 80000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/BaseBuildingGames', emergentNarrative: true, activeCommunity: true, notes: 'Base building fans. RimWorld, DF, ONI. Colony stories.', tags: ['base-building', 'colony-sim', 'emergent'], country: 'Global' },
  { name: 'r/Stellaris', platform: 'reddit', communityType: 'emergent-games', estimatedReach: 300000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/Stellaris', emergentNarrative: true, activeCommunity: true, notes: 'Stellaris space empire stories. Emergent galactic narratives.', tags: ['stellaris', 'paradox', 'space', 'emergent'], country: 'Global' },
  { name: 'r/eu4', platform: 'reddit', communityType: 'emergent-games', estimatedReach: 200000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/eu4', emergentNarrative: true, activeCommunity: true, notes: 'Europa Universalis 4. Historical emergent narratives.', tags: ['eu4', 'paradox', 'history', 'emergent'], country: 'Global' },
  { name: 'Paradox AAR Community', platform: 'forum', communityType: 'emergent-games', estimatedReach: 20000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', emergentNarrative: true, activeCommunity: true, lowSaturation: true, notes: 'STRONG FIT. After Action Report writers. They write emergent narratives from gameplay.', tags: ['aar', 'paradox', 'narrative', 'writing'], country: 'Global' },
  { name: 'r/proceduralgeneration', platform: 'reddit', communityType: 'emergent-games', estimatedReach: 150000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/proceduralgeneration', emergentNarrative: true, activeCommunity: true, technicalAudience: true, notes: 'EXCELLENT FIT. Procgen enthusiasts. They understand what Director does technically.', tags: ['procgen', 'procedural', 'technical', 'generation'], country: 'Global' },
];

// ============================================================
// CATEGORY 3: IMMERSIVE SIM COMMUNITIES (20)
// ============================================================
const immersiveSim = [
  // CORE IMMERSIVE SIM
  { name: 'r/ImmersiveSim', platform: 'reddit', communityType: 'immersive-sim', estimatedReach: 22000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/ImmersiveSim', emergentNarrative: true, activeCommunity: true, technicalAudience: true, notes: 'EXCELLENT FIT. Core immersive sim community. They value systemic narrative.', tags: ['immersive-sim', 'looking-glass', 'systems', 'reddit'], country: 'Global' },
  { name: 'Looking Glass Fans Discord', platform: 'discord', communityType: 'immersive-sim', estimatedReach: 5000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', emergentNarrative: true, activeCommunity: true, technicalAudience: true, lowSaturation: true, notes: 'EXCELLENT FIT. Looking Glass Studios fans. System Shock, Thief, Ultima Underworld. OG immersive sim.', tags: ['looking-glass', 'system-shock', 'thief', 'classic'], country: 'Global' },
  { name: 'RPG Codex Immersive Sim Thread', platform: 'forum', communityType: 'immersive-sim', estimatedReach: 10000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://rpgcodex.net', emergentNarrative: true, activeCommunity: true, technicalAudience: true, notes: 'RPG Codex hardcore immersive sim discussion. Opinionated but influential.', tags: ['rpgcodex', 'immersive-sim', 'hardcore'], country: 'Global' },
  
  // SPECIFIC GAMES
  { name: 'r/Deusex', platform: 'reddit', communityType: 'immersive-sim', estimatedReach: 80000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/Deusex', emergentNarrative: true, activeCommunity: true, notes: 'Deus Ex fans. Classic immersive sim. Player choice matters.', tags: ['deus-ex', 'immersive-sim', 'choice'], country: 'Global' },
  { name: 'r/dishonored', platform: 'reddit', communityType: 'immersive-sim', estimatedReach: 100000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/dishonored', emergentNarrative: true, activeCommunity: true, notes: 'Dishonored fans. Arkane immersive sim. Systemic gameplay.', tags: ['dishonored', 'arkane', 'immersive-sim'], country: 'Global' },
  { name: 'r/prey', platform: 'reddit', communityType: 'immersive-sim', estimatedReach: 50000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/prey', emergentNarrative: true, activeCommunity: true, notes: 'Prey 2017 fans. Arkane immersive sim. Emergent gameplay stories.', tags: ['prey', 'arkane', 'immersive-sim'], country: 'Global' },
  { name: 'r/systemshock', platform: 'reddit', communityType: 'immersive-sim', estimatedReach: 25000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/systemshock', emergentNarrative: true, activeCommunity: true, technicalAudience: true, notes: 'System Shock fans. OG immersive sim. SHODAN worship.', tags: ['system-shock', 'looking-glass', 'classic'], country: 'Global' },
  { name: 'r/thief', platform: 'reddit', communityType: 'immersive-sim', estimatedReach: 20000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/thief', emergentNarrative: true, activeCommunity: true, notes: 'Thief series fans. Stealth immersive sim.', tags: ['thief', 'looking-glass', 'stealth'], country: 'Global' },
  { name: 'Arkane Fans Discord', platform: 'discord', communityType: 'immersive-sim', estimatedReach: 10000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', emergentNarrative: true, activeCommunity: true, notes: 'Arkane Studios fans. Dishonored, Prey, Deathloop.', tags: ['arkane', 'dishonored', 'prey', 'discord'], country: 'Global' },
  
  // NARRATIVE RPGs
  { name: 'r/DiscoElysium', platform: 'reddit', communityType: 'immersive-sim', estimatedReach: 200000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/DiscoElysium', emergentNarrative: true, activeCommunity: true, influencerPotential: true, notes: 'EXCELLENT FIT. Disco Elysium fans. Deep dialogue, character psychology. They\'d appreciate Director\'s character sheets.', tags: ['disco-elysium', 'narrative', 'dialogue', 'psychology'], country: 'Global' },
  { name: 'Disco Elysium Discord', platform: 'discord', communityType: 'immersive-sim', estimatedReach: 30000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', emergentNarrative: true, activeCommunity: true, notes: 'Active DE Discord. Narrative-obsessed.', tags: ['disco-elysium', 'discord', 'narrative'], country: 'Global' },
  { name: 'r/vtmb (Vampire Bloodlines)', platform: 'reddit', communityType: 'immersive-sim', estimatedReach: 40000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/vtmb', emergentNarrative: true, activeCommunity: true, notes: 'Vampire: Bloodlines fans. Classic immersive RPG. Character dialogue.', tags: ['vtm', 'bloodlines', 'rpg', 'dialogue'], country: 'Global' },
  { name: 'r/BaldursGate3', platform: 'reddit', communityType: 'immersive-sim', estimatedReach: 1000000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/BaldursGate3', emergentNarrative: true, activeCommunity: true, influencerPotential: true, notes: 'STRONG FIT. BG3 fans. Love emergent party dynamics and NPC reactions.', tags: ['baldurs-gate-3', 'larian', 'dnd', 'emergent'], country: 'Global' },
  { name: 'r/Pathfinder_Kingmaker', platform: 'reddit', communityType: 'immersive-sim', estimatedReach: 60000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/Pathfinder_Kingmaker', emergentNarrative: true, activeCommunity: true, notes: 'Owlcat CRPG fans. Deep systems RPG.', tags: ['pathfinder', 'owlcat', 'crpg'], country: 'Global' },
  { name: 'r/Wasteland', platform: 'reddit', communityType: 'immersive-sim', estimatedReach: 15000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/Wasteland', emergentNarrative: true, activeCommunity: true, notes: 'Wasteland fans. Post-apoc CRPG.', tags: ['wasteland', 'inxile', 'crpg'], country: 'Global' },
  { name: 'r/crpg', platform: 'reddit', communityType: 'immersive-sim', estimatedReach: 50000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/crpg', emergentNarrative: true, activeCommunity: true, technicalAudience: true, notes: 'CRPG general subreddit. Deep RPG fans.', tags: ['crpg', 'rpg', 'general'], country: 'Global' },
  { name: 'r/rpg_gamers', platform: 'reddit', communityType: 'immersive-sim', estimatedReach: 400000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/rpg_gamers', emergentNarrative: true, activeCommunity: true, influencerPotential: true, notes: 'Video game RPG fans. Large audience interested in narrative innovation.', tags: ['rpg', 'gaming', 'reddit'], country: 'Global' },
  
  // STEALTH/TACTICS
  { name: 'r/HitBoxPodcast Community', platform: 'other', communityType: 'immersive-sim', estimatedReach: 5000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', emergentNarrative: true, activeCommunity: true, lowSaturation: true, notes: 'Immersive sim podcast community.', tags: ['hitbox', 'podcast', 'immersive-sim'], country: 'Global' },
  { name: 'r/WeirdWest', platform: 'reddit', communityType: 'immersive-sim', estimatedReach: 10000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/WeirdWest', emergentNarrative: true, activeCommunity: true, notes: 'Weird West fans. Recent immersive sim with emergent systems.', tags: ['weird-west', 'immersive-sim', 'emergent'], country: 'Global' },
  { name: 'Gloomwood/NM Community', platform: 'discord', communityType: 'immersive-sim', estimatedReach: 10000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', emergentNarrative: true, activeCommunity: true, technicalAudience: true, notes: 'New Blood immersive sim fans. Gloomwood, etc.', tags: ['gloomwood', 'new-blood', 'retro'], country: 'Global' },
];

// ============================================================
// CATEGORY 4: AI NARRATIVE COMMUNITIES (20)
// ============================================================
const aiNarrative = [
  // AI WRITING/GAMES
  { name: 'r/AIDungeon', platform: 'reddit', communityType: 'ai-narrative', estimatedReach: 100000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/AIDungeon', emergentNarrative: true, activeCommunity: true, technicalAudience: true, notes: 'EXCELLENT FIT. AI Dungeon users. They want emergent AI narrative but with structure. Director solves their complaints.', tags: ['ai-dungeon', 'ai-narrative', 'text-adventure'], country: 'Global' },
  { name: 'AI Dungeon Discord', platform: 'discord', communityType: 'ai-narrative', estimatedReach: 50000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', emergentNarrative: true, activeCommunity: true, notes: 'Active AID Discord. Power users.', tags: ['ai-dungeon', 'discord', 'ai-narrative'], country: 'Global' },
  { name: 'r/NovelAi', platform: 'reddit', communityType: 'ai-narrative', estimatedReach: 80000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/NovelAi', emergentNarrative: true, activeCommunity: true, technicalAudience: true, notes: 'EXCELLENT FIT. NovelAI users. More sophisticated AI narrative users.', tags: ['novelai', 'ai-writing', 'narrative'], country: 'Global' },
  { name: 'NovelAI Discord', platform: 'discord', communityType: 'ai-narrative', estimatedReach: 100000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', emergentNarrative: true, activeCommunity: true, technicalAudience: true, notes: 'Large NovelAI Discord. Technical users.', tags: ['novelai', 'discord', 'ai-writing'], country: 'Global' },
  { name: 'r/KoboldAI', platform: 'reddit', communityType: 'ai-narrative', estimatedReach: 20000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/KoboldAI', emergentNarrative: true, activeCommunity: true, technicalAudience: true, notes: 'EXCELLENT FIT. KoboldAI users. Local LLM + narrative. Technical. They\'d understand Director\'s approach.', tags: ['koboldai', 'local-llm', 'ai-narrative'], country: 'Global' },
  { name: 'KoboldAI Discord', platform: 'discord', communityType: 'ai-narrative', estimatedReach: 30000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', emergentNarrative: true, activeCommunity: true, technicalAudience: true, notes: 'KoboldAI community. Very technical.', tags: ['koboldai', 'discord', 'local-llm'], country: 'Global' },
  
  // LOCAL LLM
  { name: 'r/LocalLLaMA', platform: 'reddit', communityType: 'ai-narrative', estimatedReach: 300000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/LocalLLaMA', emergentNarrative: true, activeCommunity: true, technicalAudience: true, notes: 'STRONG FIT. Local LLM enthusiasts. They want on-device AI. Director\'s on-prem approach resonates.', tags: ['local-llm', 'llama', 'on-device', 'technical'], country: 'Global' },
  { name: 'r/Oobabooga', platform: 'reddit', communityType: 'ai-narrative', estimatedReach: 30000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/Oobabooga', emergentNarrative: true, activeCommunity: true, technicalAudience: true, notes: 'Text-generation-webui users. Local LLM for RP/narrative.', tags: ['oobabooga', 'local-llm', 'webui'], country: 'Global' },
  { name: 'SillyTavern Community', platform: 'discord', communityType: 'ai-narrative', estimatedReach: 50000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', emergentNarrative: true, activeCommunity: true, technicalAudience: true, notes: 'STRONG FIT. SillyTavern users. Character AI roleplay. They want structured character interaction.', tags: ['sillytavern', 'character-ai', 'roleplay'], country: 'Global' },
  
  // AI ROLEPLAY
  { name: 'r/CharacterAI', platform: 'reddit', communityType: 'ai-narrative', estimatedReach: 200000, engagementQuality: 'medium', accessMethod: 'public', platformUrl: 'https://reddit.com/r/CharacterAI', emergentNarrative: true, activeCommunity: true, notes: 'Character.AI users. Casual but large. Some interested in better alternatives.', tags: ['character-ai', 'roleplay', 'chatbot'], country: 'Global' },
  { name: 'r/PygmalionAI', platform: 'reddit', communityType: 'ai-narrative', estimatedReach: 15000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/PygmalionAI', emergentNarrative: true, activeCommunity: true, technicalAudience: true, notes: 'Pygmalion AI users. Open source character AI.', tags: ['pygmalion', 'open-source', 'character-ai'], country: 'Global' },
  { name: 'Tavern AI Communities', platform: 'discord', communityType: 'ai-narrative', estimatedReach: 30000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', emergentNarrative: true, activeCommunity: true, technicalAudience: true, notes: 'TavernAI users. Character roleplay with AI.', tags: ['tavernai', 'roleplay', 'ai'], country: 'Global' },
  
  // AI GAME DEV
  { name: 'r/aigamedev', platform: 'reddit', communityType: 'ai-narrative', estimatedReach: 5000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/aigamedev', emergentNarrative: true, activeCommunity: true, technicalAudience: true, industryReach: true, lowSaturation: true, notes: 'STRONG FIT. AI in game development. Technical audience. Industry potential.', tags: ['ai-gamedev', 'ai', 'games', 'technical'], country: 'Global' },
  { name: 'AI and Games (YouTube/Newsletter)', platform: 'youtube', communityType: 'ai-narrative', estimatedReach: 100000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://aiandgames.com', emergentNarrative: true, activeCommunity: true, technicalAudience: true, industryReach: true, influencerPotential: true, notes: 'EXCELLENT FIT. Tommy Thompson. AI in games content creator. Industry influencer.', tags: ['ai-and-games', 'youtube', 'influencer', 'industry'], country: 'Global' },
  { name: 'r/artificial', platform: 'reddit', communityType: 'ai-narrative', estimatedReach: 200000, engagementQuality: 'medium', accessMethod: 'public', platformUrl: 'https://reddit.com/r/artificial', emergentNarrative: true, activeCommunity: true, notes: 'General AI subreddit. Could reach AI enthusiasts.', tags: ['ai', 'general', 'reddit'], country: 'Global' },
  
  // AI DUNGEON MASTERS
  { name: 'r/AIGameMasters', platform: 'reddit', communityType: 'ai-narrative', estimatedReach: 3000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/AIGameMasters', emergentNarrative: true, activeCommunity: true, technicalAudience: true, lowSaturation: true, notes: 'EXCELLENT FIT. AI as GM/DM for TTRPGs. Exactly Director\'s use case.', tags: ['ai-gm', 'ttrpg', 'ai-narrative', 'director-perfect'], country: 'Global' },
  { name: 'AI DM Discord Communities', platform: 'discord', communityType: 'ai-narrative', estimatedReach: 10000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', emergentNarrative: true, activeCommunity: true, technicalAudience: true, lowSaturation: true, notes: 'Various AI DM/GM Discord servers. Experimenting with AI for TTRPGs.', tags: ['ai-dm', 'discord', 'ttrpg', 'ai'], country: 'Global' },
  
  // WRITING
  { name: 'r/WritingWithAI', platform: 'reddit', communityType: 'ai-narrative', estimatedReach: 10000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/WritingWithAI', emergentNarrative: true, activeCommunity: true, notes: 'AI writing assistance. Could interest narrative designers.', tags: ['ai-writing', 'narrative', 'tools'], country: 'Global' },
  { name: 'Sudowrite Community', platform: 'discord', communityType: 'ai-narrative', estimatedReach: 20000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', emergentNarrative: true, activeCommunity: true, notes: 'Sudowrite users. AI writing tool. Fiction writers.', tags: ['sudowrite', 'ai-writing', 'fiction'], country: 'Global' },
];

// ============================================================
// CATEGORY 5: NARRATIVE DESIGN PROFESSIONALS (20)
// ============================================================
const narrativeDesign = [
  // IGDA / PROFESSIONAL
  { name: 'IGDA Narrative SIG', platform: 'association', communityType: 'narrative-design', estimatedReach: 5000, engagementQuality: 'high', accessMethod: 'application', platformUrl: 'https://igda.org', emergentNarrative: true, activeCommunity: true, technicalAudience: true, industryReach: true, notes: 'EXCELLENT FIT. Professional narrative designers. They understand the dialogue tree problem Director solves.', tags: ['igda', 'narrative', 'professional', 'sig'], country: 'Global' },
  { name: 'IGDA Writers SIG', platform: 'association', communityType: 'narrative-design', estimatedReach: 3000, engagementQuality: 'high', accessMethod: 'application', platformUrl: 'https://igda.org', emergentNarrative: true, activeCommunity: true, industryReach: true, notes: 'IGDA game writers special interest group.', tags: ['igda', 'writers', 'professional'], country: 'Global' },
  { name: 'NarraScope', platform: 'association', communityType: 'narrative-design', estimatedReach: 2000, engagementQuality: 'high', accessMethod: 'paid', platformUrl: 'https://narrascope.org', emergentNarrative: true, activeCommunity: true, industryReach: true, lowSaturation: true, notes: 'EXCELLENT FIT. Interactive fiction/narrative conference. Emily Short affiliated. Perfect audience.', tags: ['narrascope', 'interactive-fiction', 'conference'], country: 'Global' },
  { name: 'GDC Narrative Summit', platform: 'association', communityType: 'narrative-design', estimatedReach: 5000, engagementQuality: 'high', accessMethod: 'paid', platformUrl: 'https://gdconf.com', emergentNarrative: true, activeCommunity: true, technicalAudience: true, industryReach: true, notes: 'EXCELLENT FIT. GDC Narrative Summit attendees. Industry decision makers.', tags: ['gdc', 'narrative-summit', 'conference', 'industry'], country: 'Global' },
  { name: 'AdventureX', platform: 'association', communityType: 'narrative-design', estimatedReach: 1500, engagementQuality: 'high', accessMethod: 'paid', platformUrl: 'https://adventurexpo.org', emergentNarrative: true, activeCommunity: true, industryReach: true, lowSaturation: true, notes: 'STRONG FIT. UK narrative game conference. Adventure games, IF, narrative innovation.', tags: ['adventurex', 'uk', 'conference', 'adventure'], country: 'UK' },
  
  // THOUGHT LEADERS
  { name: 'Emily Short\'s Blog Readers', platform: 'other', communityType: 'narrative-design', estimatedReach: 20000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://emshort.blog', emergentNarrative: true, activeCommunity: true, technicalAudience: true, industryReach: true, influencerPotential: true, notes: 'EXCELLENT FIT. Emily Short is THE narrative design thought leader. Her readers are perfect audience.', tags: ['emily-short', 'thought-leader', 'narrative', 'blog'], country: 'Global' },
  { name: 'Narrative Game Developers Discord', platform: 'discord', communityType: 'narrative-design', estimatedReach: 3000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', emergentNarrative: true, activeCommunity: true, technicalAudience: true, lowSaturation: true, notes: 'STRONG FIT. Game narrative designers. Professional community.', tags: ['narrative', 'discord', 'professional'], country: 'Global' },
  
  // STUDIO-ADJACENT
  { name: 'Inkle Community', platform: 'discord', communityType: 'narrative-design', estimatedReach: 5000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', emergentNarrative: true, activeCommunity: true, technicalAudience: true, industryReach: true, notes: 'STRONG FIT. Inkle fans/devs. 80 Days, Heaven\'s Vault. Narrative innovation leaders.', tags: ['inkle', 'ink', 'narrative', 'studio'], country: 'UK' },
  { name: 'Failbetter Games Community', platform: 'discord', communityType: 'narrative-design', estimatedReach: 10000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', emergentNarrative: true, activeCommunity: true, notes: 'Fallen London, Sunless Sea. Quality-based narrative systems.', tags: ['failbetter', 'fallen-london', 'narrative'], country: 'UK' },
  { name: 'Choice of Games Forum', platform: 'forum', communityType: 'narrative-design', estimatedReach: 20000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://forum.choiceofgames.com', emergentNarrative: true, activeCommunity: true, technicalAudience: true, notes: 'STRONG FIT. ChoiceScript authors. Interactive fiction writers.', tags: ['choice-of-games', 'choicescript', 'if', 'forum'], country: 'Global' },
  
  // TOOLS COMMUNITIES
  { name: 'Yarn Spinner Community', platform: 'discord', communityType: 'narrative-design', estimatedReach: 5000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', emergentNarrative: true, activeCommunity: true, technicalAudience: true, notes: 'Yarn Spinner dialogue tool users. Technical narrative designers.', tags: ['yarn-spinner', 'dialogue', 'tools', 'unity'], country: 'Global' },
  { name: 'Articy Draft Community', platform: 'discord', communityType: 'narrative-design', estimatedReach: 3000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', activeCommunity: true, technicalAudience: true, industryReach: true, notes: 'Articy Draft users. Industry narrative tool. Paying customers.', tags: ['articy', 'narrative', 'tools', 'industry'], country: 'Global' },
  { name: 'Twine Community (IF)', platform: 'discord', communityType: 'narrative-design', estimatedReach: 15000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', emergentNarrative: true, activeCommunity: true, notes: 'Twine interactive fiction makers.', tags: ['twine', 'interactive-fiction', 'if'], country: 'Global' },
  
  // ONLINE COMMUNITIES
  { name: 'r/interactivefiction', platform: 'reddit', communityType: 'narrative-design', estimatedReach: 25000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/interactivefiction', emergentNarrative: true, activeCommunity: true, notes: 'Interactive fiction subreddit. IF creators and players.', tags: ['interactive-fiction', 'if', 'reddit'], country: 'Global' },
  { name: 'IntFiction.org', platform: 'forum', communityType: 'narrative-design', estimatedReach: 10000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://intfiction.org', emergentNarrative: true, activeCommunity: true, technicalAudience: true, notes: 'STRONG FIT. Main IF community forum. Inform, Twine, Ink authors.', tags: ['intfiction', 'forum', 'if', 'community'], country: 'Global' },
  { name: 'IF Comp Community', platform: 'other', communityType: 'narrative-design', estimatedReach: 3000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://ifcomp.org', emergentNarrative: true, activeCommunity: true, technicalAudience: true, lowSaturation: true, notes: 'Interactive Fiction Competition community. Annual IF competition.', tags: ['ifcomp', 'competition', 'if'], country: 'Global' },
  { name: 'Spring Thing Community', platform: 'other', communityType: 'narrative-design', estimatedReach: 1000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', emergentNarrative: true, activeCommunity: true, lowSaturation: true, notes: 'Spring Thing IF festival. Annual IF showcase.', tags: ['spring-thing', 'if', 'festival'], country: 'Global' },
  
  // WRITING
  { name: 'Game Writing Twitter/X', platform: 'other', communityType: 'narrative-design', estimatedReach: 50000, engagementQuality: 'medium', accessMethod: 'public', platformUrl: '', emergentNarrative: true, activeCommunity: true, industryReach: true, influencerPotential: true, notes: 'Game writers on Twitter/X. #gamewriting, #narrativedesign hashtags.', tags: ['twitter', 'gamewriting', 'social'], country: 'Global' },
  { name: 'Game Writers Guild', platform: 'association', communityType: 'narrative-design', estimatedReach: 1000, engagementQuality: 'high', accessMethod: 'application', platformUrl: '', activeCommunity: true, industryReach: true, lowSaturation: true, notes: 'Professional game writers organization.', tags: ['guild', 'writers', 'professional'], country: 'Global' },
];

// ============================================================
// CATEGORY 6: RPG YOUTUBERS / STREAMERS (20)
// ============================================================
const youtubeStreamers = [
  // MAJOR INFLUENCERS
  { name: 'Mandalore Gaming', platform: 'youtube', communityType: 'youtuber', estimatedReach: 1200000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://youtube.com/@MandaloreGaming', emergentNarrative: true, activeCommunity: true, influencerPotential: true, notes: 'EXCELLENT FIT. Reviews immersive sims, CRPGs, emergent games. Perfect for Director demo coverage.', tags: ['mandalore', 'youtube', 'immersive-sim', 'reviews'], country: 'Global' },
  { name: 'SsethTzeentach', platform: 'youtube', communityType: 'youtuber', estimatedReach: 2500000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://youtube.com/@SssethTzeentach', emergentNarrative: true, activeCommunity: true, influencerPotential: true, notes: 'EXCELLENT FIT. Covers emergent games (RimWorld, DF, etc.). Viral potential. Cult following.', tags: ['sseth', 'youtube', 'emergent', 'viral'], country: 'Global' },
  { name: 'Splattercat Gaming', platform: 'youtube', communityType: 'youtuber', estimatedReach: 400000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://youtube.com/@SplattercatGaming', emergentNarrative: true, activeCommunity: true, influencerPotential: true, notes: 'EXCELLENT FIT. Indie game coverage. Colony sims, roguelikes. Covers emergent games.', tags: ['splattercat', 'youtube', 'indie', 'colony-sim'], country: 'Global' },
  { name: 'CohhCarnage', platform: 'twitch', communityType: 'streamer', estimatedReach: 1500000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://twitch.tv/cohhcarnage', emergentNarrative: true, activeCommunity: true, influencerPotential: true, notes: 'STRONG FIT. Major streamer. Plays RPGs, narrative games. Professional, good for B2B visibility.', tags: ['cohh', 'twitch', 'rpg', 'streamer'], country: 'Global' },
  { name: 'Retromation', platform: 'youtube', communityType: 'youtuber', estimatedReach: 500000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://youtube.com/@Retromation', emergentNarrative: true, activeCommunity: true, influencerPotential: true, notes: 'STRONG FIT. Indie games, automation, colony sims. RimWorld, DF content.', tags: ['retromation', 'youtube', 'indie', 'automation'], country: 'Global' },
  
  // RPG FOCUSED
  { name: 'ACG (Angry Centaur Gaming)', platform: 'youtube', communityType: 'youtuber', estimatedReach: 800000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://youtube.com/@ACG', emergentNarrative: true, activeCommunity: true, influencerPotential: true, notes: 'RPG reviews. In-depth coverage. Good for serious game analysis.', tags: ['acg', 'youtube', 'reviews', 'rpg'], country: 'Global' },
  { name: 'Worth A Buy', platform: 'youtube', communityType: 'youtuber', estimatedReach: 400000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://youtube.com/@WorthABuyFan', activeCommunity: true, influencerPotential: true, notes: 'Honest game reviews. Would appreciate Director innovation.', tags: ['worth-a-buy', 'youtube', 'reviews'], country: 'UK' },
  { name: 'Mortismal Gaming', platform: 'youtube', communityType: 'youtuber', estimatedReach: 300000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://youtube.com/@MortismalGaming', emergentNarrative: true, activeCommunity: true, influencerPotential: true, notes: 'CRPG focused. Reviews narrative-heavy RPGs.', tags: ['mortismal', 'youtube', 'crpg', 'reviews'], country: 'Global' },
  { name: 'Cryomancer (NPC Reviews)', platform: 'youtube', communityType: 'youtuber', estimatedReach: 100000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', emergentNarrative: true, activeCommunity: true, influencerPotential: true, lowSaturation: true, notes: 'CRPG, immersive sim reviews. Smaller but dedicated.', tags: ['cryomancer', 'youtube', 'crpg', 'immersive-sim'], country: 'Global' },
  
  // EMERGENT GAME SPECIALISTS
  { name: 'Kruggsmash', platform: 'youtube', communityType: 'youtuber', estimatedReach: 400000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://youtube.com/@Kruggsmash', emergentNarrative: true, activeCommunity: true, influencerPotential: true, notes: 'EXCELLENT FIT. Dwarf Fortress storyteller. Creates narrative from DF emergent events. Perfect fit.', tags: ['kruggsmash', 'dwarf-fortress', 'storytelling', 'emergent'], country: 'Global' },
  { name: 'Many A True Nerd', platform: 'youtube', communityType: 'youtuber', estimatedReach: 700000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://youtube.com/@ManyATrueNerd', emergentNarrative: true, activeCommunity: true, influencerPotential: true, notes: 'STRONG FIT. RPG playthroughs. Creates stories from gameplay. Fallout, CK series.', tags: ['matn', 'youtube', 'rpg', 'playthrough'], country: 'UK' },
  { name: 'Rimmy Downunder', platform: 'youtube', communityType: 'youtuber', estimatedReach: 200000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://youtube.com/@RimmyDownunder', emergentNarrative: true, activeCommunity: true, influencerPotential: true, notes: 'RimWorld content. Emergent colony stories.', tags: ['rimmy', 'youtube', 'rimworld', 'emergent'], country: 'Australia' },
  
  // TTRPG STREAMERS
  { name: 'Matt Colville / MCDM', platform: 'youtube', communityType: 'youtuber', estimatedReach: 800000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://youtube.com/@maboroshi71', emergentNarrative: true, activeCommunity: true, influencerPotential: true, industryReach: true, notes: 'STRONG FIT. D&D/TTRPG thought leader. Running the Game series. Influential in TTRPG space.', tags: ['colville', 'mcdm', 'ttrpg', 'dm'], country: 'Global' },
  { name: 'Dungeon Dudes', platform: 'youtube', communityType: 'youtuber', estimatedReach: 500000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://youtube.com/@DungeonDudes', emergentNarrative: true, activeCommunity: true, influencerPotential: true, notes: 'D&D content. DM advice. Would appreciate AI NPC tools.', tags: ['dungeon-dudes', 'youtube', 'dnd', 'dm'], country: 'Global' },
  { name: 'WebDM', platform: 'youtube', communityType: 'youtuber', estimatedReach: 400000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://youtube.com/@WebDM', emergentNarrative: true, activeCommunity: true, influencerPotential: true, notes: 'TTRPG discussion. Would be interested in emergent NPC tech.', tags: ['webdm', 'youtube', 'ttrpg', 'discussion'], country: 'Global' },
  
  // INDIE FOCUSED
  { name: 'Jonas Tyroller', platform: 'youtube', communityType: 'youtuber', estimatedReach: 200000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://youtube.com/@JonasTyroller', activeCommunity: true, influencerPotential: true, technicalAudience: true, notes: 'Indie game dev. Technical audience. Could cover Director tech.', tags: ['jonas', 'youtube', 'gamedev', 'indie'], country: 'Global' },
  { name: 'Game Maker\'s Toolkit (GMTK)', platform: 'youtube', communityType: 'youtuber', estimatedReach: 2000000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://youtube.com/@GMTK', emergentNarrative: true, activeCommunity: true, influencerPotential: true, industryReach: true, notes: 'STRONG FIT. Game design analysis. Would cover emergent narrative innovation.', tags: ['gmtk', 'youtube', 'game-design', 'analysis'], country: 'UK' },
  { name: 'AI Explained', platform: 'youtube', communityType: 'youtuber', estimatedReach: 500000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://youtube.com/@AIExplained-official', emergentNarrative: true, activeCommunity: true, influencerPotential: true, technicalAudience: true, notes: 'STRONG FIT. AI tech explainer. Would cover Director as AI innovation.', tags: ['ai-explained', 'youtube', 'ai', 'tech'], country: 'Global' },
  { name: 'Two Minute Papers', platform: 'youtube', communityType: 'youtuber', estimatedReach: 1500000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://youtube.com/@TwoMinutePapers', emergentNarrative: true, activeCommunity: true, influencerPotential: true, technicalAudience: true, notes: 'STRONG FIT. AI research coverage. Would cover Director as emergent narrative AI.', tags: ['two-minute-papers', 'youtube', 'ai', 'research'], country: 'Global' },
  { name: 'Game Dev Unlocked', platform: 'youtube', communityType: 'youtuber', estimatedReach: 100000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', activeCommunity: true, technicalAudience: true, lowSaturation: true, notes: 'Indie game dev content. Technical tutorials.', tags: ['gamedev-unlocked', 'youtube', 'gamedev'], country: 'Global' },
];

// ============================================================
// CATEGORY 7: FESTIVALS & CONFERENCES (20)
// ============================================================
const festivals = [
  // MAJOR CONFERENCES
  { name: 'GDC AI Summit', platform: 'conference', communityType: 'festival', estimatedReach: 5000, engagementQuality: 'high', accessMethod: 'paid', platformUrl: 'https://gdconf.com', emergentNarrative: true, activeCommunity: true, technicalAudience: true, industryReach: true, notes: 'EXCELLENT FIT. GDC AI Summit. Perfect venue to present Director tech.', tags: ['gdc', 'ai-summit', 'conference', 'b2b'], country: 'USA' },
  { name: 'GDC Narrative Summit', platform: 'conference', communityType: 'festival', estimatedReach: 3000, engagementQuality: 'high', accessMethod: 'paid', platformUrl: 'https://gdconf.com', emergentNarrative: true, activeCommunity: true, industryReach: true, notes: 'EXCELLENT FIT. GDC Narrative Summit. Industry narrative designers.', tags: ['gdc', 'narrative-summit', 'conference', 'b2b'], country: 'USA' },
  { name: 'AIIDE Conference', platform: 'conference', communityType: 'festival', estimatedReach: 500, engagementQuality: 'high', accessMethod: 'paid', platformUrl: 'https://aiide.org', emergentNarrative: true, activeCommunity: true, technicalAudience: true, industryReach: true, lowSaturation: true, notes: 'EXCELLENT FIT. AI and Interactive Digital Entertainment. Academic + industry AI in games.', tags: ['aiide', 'academic', 'ai', 'conference'], country: 'USA' },
  { name: 'ICIDS (Interactive Storytelling)', platform: 'conference', communityType: 'festival', estimatedReach: 300, engagementQuality: 'high', accessMethod: 'paid', platformUrl: '', emergentNarrative: true, activeCommunity: true, technicalAudience: true, industryReach: true, lowSaturation: true, notes: 'EXCELLENT FIT. International Conference on Interactive Digital Storytelling. Academic narrative AI.', tags: ['icids', 'academic', 'interactive-storytelling', 'conference'], country: 'Global' },
  
  // INDIE FESTIVALS
  { name: 'Steam Next Fest', platform: 'festival', communityType: 'festival', estimatedReach: 1000000, engagementQuality: 'high', accessMethod: 'application', platformUrl: 'https://partner.steamgames.com', activeCommunity: true, influencerPotential: true, notes: 'STRONG FIT. Steam demo fest. Massive visibility for Director demo.', tags: ['steam', 'next-fest', 'demo', 'visibility'], country: 'Global' },
  { name: 'PAX West', platform: 'festival', communityType: 'festival', estimatedReach: 70000, engagementQuality: 'high', accessMethod: 'paid', platformUrl: 'https://west.paxsite.com', activeCommunity: true, influencerPotential: true, notes: 'Major US gaming convention. Player-focused buzz generation.', tags: ['pax', 'west', 'convention', 'players'], country: 'USA' },
  { name: 'PAX East', platform: 'festival', communityType: 'festival', estimatedReach: 60000, engagementQuality: 'high', accessMethod: 'paid', platformUrl: 'https://east.paxsite.com', activeCommunity: true, influencerPotential: true, notes: 'East coast PAX. Large audience.', tags: ['pax', 'east', 'convention'], country: 'USA' },
  { name: 'Gamescom (Indie Arena)', platform: 'festival', communityType: 'festival', estimatedReach: 300000, engagementQuality: 'high', accessMethod: 'paid', platformUrl: 'https://gamescom.global', activeCommunity: true, industryReach: true, influencerPotential: true, notes: 'STRONG FIT. Massive EU game show. Indie Arena Booth. B2B + press.', tags: ['gamescom', 'indie-arena', 'germany', 'b2b'], country: 'Germany' },
  { name: 'BitSummit (Kyoto)', platform: 'festival', communityType: 'festival', estimatedReach: 15000, engagementQuality: 'high', accessMethod: 'paid', platformUrl: 'https://bitsummit.org', emergentNarrative: true, activeCommunity: true, industryReach: true, notes: 'STRONG FIT. Japan\'s largest indie festival. RPG-loving audience. Asia expansion.', tags: ['bitsummit', 'japan', 'indie', 'festival'], country: 'Japan' },
  { name: 'BIC Festival (Busan)', platform: 'festival', communityType: 'festival', estimatedReach: 10000, engagementQuality: 'high', accessMethod: 'paid', platformUrl: 'https://bicfest.org', emergentNarrative: true, activeCommunity: true, industryReach: true, notes: 'STRONG FIT. Korea indie festival. RPG market. Asia expansion.', tags: ['bic', 'busan', 'korea', 'indie'], country: 'South Korea' },
  
  // NARRATIVE FOCUSED
  { name: 'NarraScope', platform: 'conference', communityType: 'festival', estimatedReach: 500, engagementQuality: 'high', accessMethod: 'paid', platformUrl: 'https://narrascope.org', emergentNarrative: true, activeCommunity: true, technicalAudience: true, industryReach: true, lowSaturation: true, notes: 'EXCELLENT FIT. IF/narrative conference. Emily Short affiliated. Perfect audience.', tags: ['narrascope', 'interactive-fiction', 'narrative', 'conference'], country: 'USA' },
  { name: 'AdventureX (London)', platform: 'conference', communityType: 'festival', estimatedReach: 1500, engagementQuality: 'high', accessMethod: 'paid', platformUrl: 'https://adventurexpo.org', emergentNarrative: true, activeCommunity: true, industryReach: true, lowSaturation: true, notes: 'STRONG FIT. UK narrative game conference. Adventure games, IF.', tags: ['adventurex', 'london', 'uk', 'narrative'], country: 'UK' },
  { name: 'WordPlay (Toronto)', platform: 'conference', communityType: 'festival', estimatedReach: 500, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', emergentNarrative: true, activeCommunity: true, lowSaturation: true, notes: 'Canadian IF festival. Narrative games showcase.', tags: ['wordplay', 'toronto', 'if', 'festival'], country: 'Canada' },
  
  // EUROPEAN
  { name: 'Reboot Develop (Croatia)', platform: 'conference', communityType: 'festival', estimatedReach: 2000, engagementQuality: 'high', accessMethod: 'paid', platformUrl: 'https://rebootdevelop.hr', activeCommunity: true, industryReach: true, notes: 'EU game dev conference. Industry networking.', tags: ['reboot', 'croatia', 'conference', 'eu'], country: 'Croatia' },
  { name: 'Nordic Game (Malmö)', platform: 'conference', communityType: 'festival', estimatedReach: 3000, engagementQuality: 'high', accessMethod: 'paid', platformUrl: 'https://nordicgame.com', activeCommunity: true, industryReach: true, notes: 'Nordic game industry conference. B2B focus.', tags: ['nordic-game', 'sweden', 'conference', 'b2b'], country: 'Sweden' },
  { name: 'Devcom (Cologne)', platform: 'conference', communityType: 'festival', estimatedReach: 5000, engagementQuality: 'high', accessMethod: 'paid', platformUrl: 'https://devcom.global', activeCommunity: true, industryReach: true, technicalAudience: true, notes: 'Gamescom dev conference. B2B, technical talks.', tags: ['devcom', 'germany', 'conference', 'b2b'], country: 'Germany' },
  { name: 'EGX (UK)', platform: 'festival', communityType: 'festival', estimatedReach: 50000, engagementQuality: 'high', accessMethod: 'paid', platformUrl: 'https://egx.net', activeCommunity: true, influencerPotential: true, notes: 'UK gaming expo. Player-focused. Rezzed indie section.', tags: ['egx', 'uk', 'expo', 'indie'], country: 'UK' },
  { name: 'Taipei Game Show', platform: 'festival', communityType: 'festival', estimatedReach: 30000, engagementQuality: 'high', accessMethod: 'paid', platformUrl: 'https://tgs.tca.org.tw', emergentNarrative: true, activeCommunity: true, industryReach: true, notes: 'STRONG FIT. Asia indie exhibition. Indie House section (200+ games).', tags: ['tgs', 'taipei', 'taiwan', 'indie'], country: 'Taiwan' },
  
  // NICHE
  { name: 'Roguelike Celebration', platform: 'conference', communityType: 'festival', estimatedReach: 1000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://roguelike.club', emergentNarrative: true, activeCommunity: true, technicalAudience: true, lowSaturation: true, notes: 'EXCELLENT FIT. Roguelike developers. Procedural generation experts. Would appreciate Director.', tags: ['roguelike', 'celebration', 'procgen', 'conference'], country: 'USA' },
  { name: 'Procedural Generation Jam', platform: 'jam-org', communityType: 'festival', estimatedReach: 2000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', emergentNarrative: true, activeCommunity: true, technicalAudience: true, lowSaturation: true, notes: 'STRONG FIT. ProcJam participants. Procedural generation enthusiasts.', tags: ['procjam', 'procedural', 'jam', 'procgen'], country: 'Global' },
];

// ============================================================
// CATEGORY 8: ACADEMIC / RESEARCH (20)
// ============================================================
const academic = [
  // RESEARCH LABS
  { name: 'UC Santa Cruz EIS', platform: 'academic', communityType: 'research', estimatedReach: 500, engagementQuality: 'high', accessMethod: 'application', platformUrl: 'https://eis.ucsc.edu', emergentNarrative: true, activeCommunity: true, technicalAudience: true, industryReach: true, notes: 'EXCELLENT FIT. Expressive Intelligence Studio. Michael Mateas, Noah Wardrip-Fruin. THE narrative AI lab.', tags: ['ucsc', 'eis', 'research', 'narrative-ai'], country: 'USA' },
  { name: 'Georgia Tech Game AI Lab', platform: 'academic', communityType: 'research', estimatedReach: 200, engagementQuality: 'high', accessMethod: 'application', platformUrl: '', emergentNarrative: true, activeCommunity: true, technicalAudience: true, industryReach: true, lowSaturation: true, notes: 'STRONG FIT. Mark Riedl\'s lab. Narrative AI research. Story generation.', tags: ['gatech', 'research', 'narrative-ai', 'riedl'], country: 'USA' },
  { name: 'MIT Media Lab (Games)', platform: 'academic', communityType: 'research', estimatedReach: 500, engagementQuality: 'high', accessMethod: 'application', platformUrl: 'https://media.mit.edu', activeCommunity: true, technicalAudience: true, industryReach: true, notes: 'MIT Media Lab games research. High prestige.', tags: ['mit', 'media-lab', 'research', 'games'], country: 'USA' },
  { name: 'CMU Entertainment Technology Center', platform: 'academic', communityType: 'research', estimatedReach: 300, engagementQuality: 'high', accessMethod: 'application', platformUrl: 'https://etc.cmu.edu', activeCommunity: true, technicalAudience: true, industryReach: true, notes: 'Carnegie Mellon ETC. Game design + technology.', tags: ['cmu', 'etc', 'research', 'games'], country: 'USA' },
  { name: 'NYU Game Center', platform: 'academic', communityType: 'research', estimatedReach: 400, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://gamecenter.nyu.edu', activeCommunity: true, technicalAudience: true, industryReach: true, notes: 'NYU Game Center. Game design research and education.', tags: ['nyu', 'game-center', 'research', 'education'], country: 'USA' },
  
  // EUROPEAN RESEARCH
  { name: 'Copenhagen IT University Games', platform: 'academic', communityType: 'research', estimatedReach: 200, engagementQuality: 'high', accessMethod: 'application', platformUrl: '', emergentNarrative: true, activeCommunity: true, technicalAudience: true, lowSaturation: true, notes: 'ITU Copenhagen. Game AI research. European leader.', tags: ['itu', 'copenhagen', 'research', 'europe'], country: 'Denmark' },
  { name: 'University of Malta MCAST', platform: 'academic', communityType: 'research', estimatedReach: 100, engagementQuality: 'high', accessMethod: 'application', platformUrl: '', emergentNarrative: true, activeCommunity: true, technicalAudience: true, lowSaturation: true, notes: 'Malta game AI research. Procedural content generation.', tags: ['malta', 'research', 'pcg', 'ai'], country: 'Malta' },
  { name: 'University of York Game Sci', platform: 'academic', communityType: 'research', estimatedReach: 150, engagementQuality: 'high', accessMethod: 'application', platformUrl: '', activeCommunity: true, technicalAudience: true, lowSaturation: true, notes: 'York University. Game science research.', tags: ['york', 'uk', 'research', 'games'], country: 'UK' },
  { name: 'Falmouth University Games', platform: 'academic', communityType: 'research', estimatedReach: 200, engagementQuality: 'high', accessMethod: 'application', platformUrl: '', activeCommunity: true, technicalAudience: true, notes: 'Falmouth games academy. UK game education leader.', tags: ['falmouth', 'uk', 'education', 'games'], country: 'UK' },
  { name: 'IGGI (Intelligent Games)', platform: 'academic', communityType: 'research', estimatedReach: 100, engagementQuality: 'high', accessMethod: 'application', platformUrl: '', emergentNarrative: true, activeCommunity: true, technicalAudience: true, industryReach: true, lowSaturation: true, notes: 'EXCELLENT FIT. UK EPSRC Centre for Doctoral Training. Game AI PhDs.', tags: ['iggi', 'uk', 'phd', 'game-ai'], country: 'UK' },
  
  // CONFERENCES / PUBLICATIONS
  { name: 'AIIDE Community', platform: 'academic', communityType: 'research', estimatedReach: 500, engagementQuality: 'high', accessMethod: 'paid', platformUrl: 'https://aiide.org', emergentNarrative: true, activeCommunity: true, technicalAudience: true, industryReach: true, notes: 'EXCELLENT FIT. AIIDE conference attendees. Academic + industry AI in games.', tags: ['aiide', 'conference', 'academic', 'ai'], country: 'Global' },
  { name: 'FDG (Foundations of Digital Games)', platform: 'academic', communityType: 'research', estimatedReach: 400, engagementQuality: 'high', accessMethod: 'paid', platformUrl: '', emergentNarrative: true, activeCommunity: true, technicalAudience: true, notes: 'STRONG FIT. FDG conference. Game research academic venue.', tags: ['fdg', 'conference', 'academic', 'research'], country: 'Global' },
  { name: 'DiGRA (Digital Games Research)', platform: 'academic', communityType: 'research', estimatedReach: 500, engagementQuality: 'high', accessMethod: 'paid', platformUrl: 'https://digra.org', activeCommunity: true, technicalAudience: true, notes: 'Digital Games Research Association. Academic games research.', tags: ['digra', 'conference', 'academic', 'research'], country: 'Global' },
  { name: 'IEEE CoG (Conference on Games)', platform: 'academic', communityType: 'research', estimatedReach: 600, engagementQuality: 'high', accessMethod: 'paid', platformUrl: '', emergentNarrative: true, activeCommunity: true, technicalAudience: true, notes: 'IEEE Games conference. Technical game AI research.', tags: ['ieee', 'cog', 'conference', 'technical'], country: 'Global' },
  { name: 'ICIDS Community', platform: 'academic', communityType: 'research', estimatedReach: 300, engagementQuality: 'high', accessMethod: 'paid', platformUrl: '', emergentNarrative: true, activeCommunity: true, technicalAudience: true, lowSaturation: true, notes: 'EXCELLENT FIT. Interactive Digital Storytelling conference. Narrative AI research.', tags: ['icids', 'conference', 'interactive-storytelling', 'academic'], country: 'Global' },
  
  // ONLINE ACADEMIC
  { name: 'r/MachineLearning (Game AI)', platform: 'reddit', communityType: 'research', estimatedReach: 3000000, engagementQuality: 'medium', accessMethod: 'public', platformUrl: 'https://reddit.com/r/MachineLearning', technicalAudience: true, activeCommunity: true, notes: 'ML subreddit. Game AI posts get attention.', tags: ['ml', 'reddit', 'ai', 'research'], country: 'Global' },
  { name: 'AI Game Dev Discord', platform: 'discord', communityType: 'research', estimatedReach: 5000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', emergentNarrative: true, activeCommunity: true, technicalAudience: true, lowSaturation: true, notes: 'STRONG FIT. AI in games Discord. Mix of academic and industry.', tags: ['ai-gamedev', 'discord', 'research', 'industry'], country: 'Global' },
  { name: 'Procedural Generation Researchers', platform: 'other', communityType: 'research', estimatedReach: 1000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', emergentNarrative: true, activeCommunity: true, technicalAudience: true, lowSaturation: true, notes: 'STRONG FIT. PCG research community. Academic procedural generation.', tags: ['pcg', 'research', 'procedural', 'academic'], country: 'Global' },
  { name: 'Game AI Pro Community', platform: 'other', communityType: 'research', estimatedReach: 2000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', activeCommunity: true, technicalAudience: true, industryReach: true, notes: 'Game AI Pro book community. Industry AI practitioners.', tags: ['game-ai-pro', 'book', 'industry', 'practitioners'], country: 'Global' },
  { name: 'Interactive Narrative Researchers', platform: 'academic', communityType: 'research', estimatedReach: 500, engagementQuality: 'high', accessMethod: 'application', platformUrl: '', emergentNarrative: true, activeCommunity: true, technicalAudience: true, industryReach: true, lowSaturation: true, notes: 'EXCELLENT FIT. Cross-institutional narrative AI researchers. UCSC, GT, etc.', tags: ['narrative-ai', 'research', 'cross-institution', 'academic'], country: 'Global' },
];

// ============================================================
// MAIN
// ============================================================
const allCategories = [
  { name: 'TTRPG / Solo RPG', leads: ttrpgSolo },
  { name: 'Emergent Narrative Games', leads: emergentGames },
  { name: 'Immersive Sims', leads: immersiveSim },
  { name: 'AI Narrative', leads: aiNarrative },
  { name: 'Narrative Design Professionals', leads: narrativeDesign },
  { name: 'YouTube / Streamers', leads: youtubeStreamers },
  { name: 'Festivals & Conferences', leads: festivals },
  { name: 'Academic / Research', leads: academic },
];

async function main() {
  let totalCount = 0;
  
  for (const category of allCategories) {
    let batch = db.batch();
    let count = 0;
    
    for (const c of category.leads) {
      const fitScore = calcFitScore(c);
      
      const ref = db.collection('leads').doc();
      batch.set(ref, {
        name: c.name,
        type: 'community',
        status: 'new',
        priority: fitScore >= 10 ? 'high' : fitScore >= 7 ? 'medium' : 'low',
        country: c.country || 'Global',
        location: '',
        website: c.platformUrl || '',
        tags: [...(c.tags || []), 'director'],  // TAG WITH DIRECTOR
        notes: c.notes,
        contact: { name: '', role: '', email: '', phone: '', linkedin: '' },
        community: {
          platform: c.platform,
          communityType: c.communityType,
          estimatedReach: c.estimatedReach,
          engagementQuality: c.engagementQuality,
          accessMethod: c.accessMethod,
          platformUrl: c.platformUrl || '',
          narrativeFocus: c.emergentNarrative || false,
          referralCode: '',
          betaSignupsAttributed: 0,
          fitScore: fitScore,
          fitCriteria: {
            emergentNarrative: c.emergentNarrative || false,
            technicalAudience: c.technicalAudience || false,
            activeCommunity: c.activeCommunity || false,
            influencerPotential: c.influencerPotential || false,
            industryReach: c.industryReach || false,
            lowSaturation: c.lowSaturation || false,
          }
        },
        pipeline: {
          pipelineId: PIPELINE_ID,
          stageId: INITIAL_STAGE,
          enteredStageAt: admin.firestore.FieldValue.serverTimestamp()
        },
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        createdBy: 'skel'
      });
      count++;
    }
    
    await batch.commit();
    console.log(`[${category.name}] Added ${count} leads`);
    totalCount += count;
  }
  
  console.log(`\n=== TOTAL: ${totalCount} Director community leads added ===`);
  
  // Summary stats
  const allLeads = allCategories.flatMap(c => c.leads);
  const emergentFocused = allLeads.filter(l => l.emergentNarrative).length;
  const highFit = allLeads.filter(l => calcFitScore(l) >= 10).length;
  const industryReach = allLeads.filter(l => l.industryReach).length;
  const influencers = allLeads.filter(l => l.influencerPotential).length;
  const totalReach = allLeads.reduce((sum, l) => sum + l.estimatedReach, 0);
  
  console.log(`\nStats:`);
  console.log(`  Emergent narrative focused: ${emergentFocused}`);
  console.log(`  High fit (10+): ${highFit}`);
  console.log(`  Industry reach: ${industryReach}`);
  console.log(`  Influencer potential: ${influencers}`);
  console.log(`  Total estimated reach: ${totalReach.toLocaleString()}`);
  
  process.exit(0);
}

main();
