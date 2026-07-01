import admin from 'firebase-admin';
import { readFileSync } from 'fs';

const sa = JSON.parse(readFileSync('./service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const PIPELINE_ID = 'WgXKQnG8ERl0otVg758c';
const INITIAL_STAGE = 'identified';

// Fit score calculation helper
function calcFitScore(criteria) {
  let score = 0;
  if (criteria.narrativeFocused) score += 3;
  if (criteria.activeCommunity) score += 3;
  if (criteria.toolFriendly) score += 2;
  if (criteria.targetDemographic) score += 2;
  if (criteria.largeReach) score += 1;
  if (criteria.lowSaturation) score += 1;
  score += criteria.otherScore || 0;
  return Math.min(score, 12); // Cap at 12
}

const communities = [
  // ============ NARRATIVE TOOLS COMMUNITIES ============
  {
    name: 'r/interactivefiction',
    platform: 'reddit',
    communityType: 'narrative-tools',
    estimatedReach: 25000,
    engagementQuality: 'high',
    accessMethod: 'public',
    platformUrl: 'https://reddit.com/r/interactivefiction',
    narrativeFocus: true,
    fitCriteria: { narrativeFocused: true, activeCommunity: true, toolFriendly: true, targetDemographic: true, largeReach: true, lowSaturation: true },
    notes: 'EXCELLENT FIT. Core IF community. Twine, Ink, Inform users. Very tool-friendly, loves new narrative tech.',
    tags: ['interactive-fiction', 'twine', 'ink', 'narrative-design']
  },
  {
    name: 'Twine Games Discord',
    platform: 'discord',
    communityType: 'narrative-tools',
    estimatedReach: 8000,
    engagementQuality: 'high',
    accessMethod: 'public',
    platformUrl: 'https://discord.gg/twine',
    narrativeFocus: true,
    fitCriteria: { narrativeFocused: true, activeCommunity: true, toolFriendly: true, targetDemographic: true, lowSaturation: true },
    notes: 'EXCELLENT FIT. Twine users = narrative-first creators. Tool announcements welcome.',
    tags: ['twine', 'interactive-fiction', 'branching-narrative']
  },
  {
    name: 'Ink Discord (Inkle)',
    platform: 'discord',
    communityType: 'narrative-tools',
    estimatedReach: 5000,
    engagementQuality: 'high',
    accessMethod: 'public',
    platformUrl: 'https://discord.gg/inkle',
    narrativeFocus: true,
    fitCriteria: { narrativeFocused: true, activeCommunity: true, toolFriendly: true, targetDemographic: true, lowSaturation: true },
    notes: 'EXCELLENT FIT. Ink scripting language users. Unity integration crowd. Serious narrative devs.',
    tags: ['ink', 'inkle', 'unity', 'dialogue-system']
  },
  {
    name: "Ren'Py Discord",
    platform: 'discord',
    communityType: 'narrative-tools',
    estimatedReach: 30000,
    engagementQuality: 'high',
    accessMethod: 'public',
    platformUrl: 'https://discord.gg/renpy',
    narrativeFocus: true,
    fitCriteria: { narrativeFocused: true, activeCommunity: true, toolFriendly: true, targetDemographic: true, largeReach: true },
    notes: 'EXCELLENT FIT. Visual novel creators. Huge community, very active. Tool-friendly.',
    tags: ['renpy', 'visual-novel', 'narrative']
  },
  {
    name: 'Choice of Games Forum',
    platform: 'forum',
    communityType: 'narrative-tools',
    estimatedReach: 15000,
    engagementQuality: 'high',
    accessMethod: 'public',
    platformUrl: 'https://forum.choiceofgames.com',
    narrativeFocus: true,
    fitCriteria: { narrativeFocused: true, activeCommunity: true, targetDemographic: true, lowSaturation: true },
    notes: 'STRONG FIT. ChoiceScript authors. Dedicated IF creators. Very narrative-focused but may be protective of their tooling.',
    tags: ['choicescript', 'interactive-fiction', 'text-games']
  },
  {
    name: 'r/visualnovels',
    platform: 'reddit',
    communityType: 'narrative-tools',
    estimatedReach: 350000,
    engagementQuality: 'medium',
    accessMethod: 'public',
    platformUrl: 'https://reddit.com/r/visualnovels',
    narrativeFocus: true,
    fitCriteria: { narrativeFocused: true, activeCommunity: true, largeReach: true },
    notes: 'Large but more consumer-focused. Has dev threads. Worth monitoring.',
    tags: ['visual-novel', 'vn', 'narrative']
  },
  {
    name: 'Visual Novel Dev Discord',
    platform: 'discord',
    communityType: 'narrative-tools',
    estimatedReach: 12000,
    engagementQuality: 'high',
    accessMethod: 'public',
    platformUrl: '',
    narrativeFocus: true,
    fitCriteria: { narrativeFocused: true, activeCommunity: true, toolFriendly: true, targetDemographic: true },
    notes: 'Dev-focused VN community. Tool announcements welcome.',
    tags: ['visual-novel', 'gamedev', 'narrative']
  },
  {
    name: 'Yarn Spinner Discord',
    platform: 'discord',
    communityType: 'narrative-tools',
    estimatedReach: 3000,
    engagementQuality: 'high',
    accessMethod: 'public',
    platformUrl: 'https://discord.gg/yarnspinner',
    narrativeFocus: true,
    fitCriteria: { narrativeFocused: true, activeCommunity: true, toolFriendly: true, targetDemographic: true, lowSaturation: true },
    notes: 'EXCELLENT FIT. Yarn Spinner dialogue tool users. Unity focus. Very aligned audience.',
    tags: ['yarn-spinner', 'dialogue', 'unity', 'narrative']
  },

  // ============ GAME DEV GENERAL ============
  {
    name: 'r/gamedev',
    platform: 'reddit',
    communityType: 'gamedev-general',
    estimatedReach: 1500000,
    engagementQuality: 'medium',
    accessMethod: 'public',
    platformUrl: 'https://reddit.com/r/gamedev',
    narrativeFocus: false,
    fitCriteria: { activeCommunity: true, toolFriendly: true, targetDemographic: true, largeReach: true },
    notes: 'Massive reach. Self-promo rules strict but Feedback Friday and tool showcases exist.',
    tags: ['gamedev', 'indie', 'general']
  },
  {
    name: 'r/indiegaming',
    platform: 'reddit',
    communityType: 'gamedev-general',
    estimatedReach: 400000,
    engagementQuality: 'medium',
    accessMethod: 'public',
    platformUrl: 'https://reddit.com/r/indiegaming',
    narrativeFocus: false,
    fitCriteria: { activeCommunity: true, targetDemographic: true, largeReach: true },
    notes: 'Indie-focused. More game showcase than tools but still relevant.',
    tags: ['indie', 'gamedev']
  },
  {
    name: 'r/IndieDev',
    platform: 'reddit',
    communityType: 'gamedev-general',
    estimatedReach: 300000,
    engagementQuality: 'medium',
    accessMethod: 'public',
    platformUrl: 'https://reddit.com/r/IndieDev',
    narrativeFocus: false,
    fitCriteria: { activeCommunity: true, targetDemographic: true, largeReach: true },
    notes: 'Indie developers. Good for tool awareness.',
    tags: ['indie', 'gamedev']
  },
  {
    name: 'r/INAT',
    platform: 'reddit',
    communityType: 'gamedev-general',
    estimatedReach: 80000,
    engagementQuality: 'high',
    accessMethod: 'public',
    platformUrl: 'https://reddit.com/r/INAT',
    narrativeFocus: false,
    fitCriteria: { activeCommunity: true, targetDemographic: true },
    notes: 'I Need A Team. People forming teams = early-stage projects. Good timing for Architect.',
    tags: ['team-building', 'indie', 'collaboration']
  },
  {
    name: 'r/gamedesign',
    platform: 'reddit',
    communityType: 'gamedev-general',
    estimatedReach: 200000,
    engagementQuality: 'high',
    accessMethod: 'public',
    platformUrl: 'https://reddit.com/r/gamedesign',
    narrativeFocus: false,
    fitCriteria: { activeCommunity: true, targetDemographic: true, largeReach: true },
    notes: 'Game designers. Good for narrative design discussions.',
    tags: ['game-design', 'narrative-design']
  },
  {
    name: 'Game Dev League Discord',
    platform: 'discord',
    communityType: 'gamedev-general',
    estimatedReach: 100000,
    engagementQuality: 'high',
    accessMethod: 'public',
    platformUrl: 'https://discord.gg/gamedev',
    narrativeFocus: false,
    fitCriteria: { activeCommunity: true, toolFriendly: true, targetDemographic: true, largeReach: true },
    notes: 'STRONG FIT. One of the largest gamedev Discords. Has tool showcase channels.',
    tags: ['gamedev', 'discord', 'community']
  },
  {
    name: 'Game Dev Network Discord',
    platform: 'discord',
    communityType: 'gamedev-general',
    estimatedReach: 50000,
    engagementQuality: 'high',
    accessMethod: 'public',
    platformUrl: '',
    narrativeFocus: false,
    fitCriteria: { activeCommunity: true, toolFriendly: true, targetDemographic: true },
    notes: 'Active gamedev community. Tool-friendly.',
    tags: ['gamedev', 'discord', 'networking']
  },

  // ============ ENGINE-SPECIFIC ============
  {
    name: 'Godot Discord',
    platform: 'discord',
    communityType: 'engine-specific',
    estimatedReach: 80000,
    engagementQuality: 'high',
    accessMethod: 'public',
    platformUrl: 'https://discord.gg/godot',
    narrativeFocus: false,
    fitCriteria: { activeCommunity: true, toolFriendly: true, targetDemographic: true, largeReach: true },
    notes: 'STRONG FIT. Godot = indie-friendly, open-source mindset. Very tool-receptive.',
    tags: ['godot', 'engine', 'indie', 'open-source']
  },
  {
    name: 'r/godot',
    platform: 'reddit',
    communityType: 'engine-specific',
    estimatedReach: 250000,
    engagementQuality: 'high',
    accessMethod: 'public',
    platformUrl: 'https://reddit.com/r/godot',
    narrativeFocus: false,
    fitCriteria: { activeCommunity: true, toolFriendly: true, targetDemographic: true, largeReach: true },
    notes: 'Large Godot community. Indie-focused, tool-friendly.',
    tags: ['godot', 'engine', 'indie']
  },
  {
    name: 'RPG Maker Discord',
    platform: 'discord',
    communityType: 'engine-specific',
    estimatedReach: 40000,
    engagementQuality: 'high',
    accessMethod: 'public',
    platformUrl: '',
    narrativeFocus: true,
    fitCriteria: { narrativeFocused: true, activeCommunity: true, toolFriendly: true, targetDemographic: true },
    notes: 'EXCELLENT FIT. RPG Maker = narrative-heavy by default. Perfect Architect audience.',
    tags: ['rpgmaker', 'rpg', 'narrative', 'jrpg']
  },
  {
    name: 'r/RPGMaker',
    platform: 'reddit',
    communityType: 'engine-specific',
    estimatedReach: 100000,
    engagementQuality: 'high',
    accessMethod: 'public',
    platformUrl: 'https://reddit.com/r/RPGMaker',
    narrativeFocus: true,
    fitCriteria: { narrativeFocused: true, activeCommunity: true, targetDemographic: true },
    notes: 'STRONG FIT. RPG Maker community. Very narrative-focused.',
    tags: ['rpgmaker', 'rpg', 'narrative']
  },
  {
    name: 'Unity Discord',
    platform: 'discord',
    communityType: 'engine-specific',
    estimatedReach: 200000,
    engagementQuality: 'medium',
    accessMethod: 'public',
    platformUrl: 'https://discord.gg/unity',
    narrativeFocus: false,
    fitCriteria: { activeCommunity: true, largeReach: true },
    notes: 'Huge but general. Worth being present for visibility.',
    tags: ['unity', 'engine']
  },

  // ============ GAME JAM ORGANIZATIONS ============
  {
    name: 'Global Game Jam',
    platform: 'jam-org',
    communityType: 'jam-community',
    estimatedReach: 45000,
    engagementQuality: 'high',
    accessMethod: 'public',
    platformUrl: 'https://globalgamejam.org',
    narrativeFocus: false,
    fitCriteria: { activeCommunity: true, toolFriendly: true, targetDemographic: true, largeReach: true },
    notes: 'STRONG FIT. Largest game jam. 48-hour constraint = need rapid prototyping tools. Sponsor opportunities.',
    tags: ['game-jam', 'ggj', 'global', '48-hour']
  },
  {
    name: 'Ludum Dare',
    platform: 'jam-org',
    communityType: 'jam-community',
    estimatedReach: 30000,
    engagementQuality: 'high',
    accessMethod: 'public',
    platformUrl: 'https://ldjam.com',
    narrativeFocus: false,
    fitCriteria: { activeCommunity: true, toolFriendly: true, targetDemographic: true, largeReach: true },
    notes: 'STRONG FIT. Oldest online jam. Very community-driven. Tool-friendly.',
    tags: ['game-jam', 'ludum-dare', 'online']
  },
  {
    name: 'GMTK Game Jam',
    platform: 'jam-org',
    communityType: 'jam-community',
    estimatedReach: 30000,
    engagementQuality: 'high',
    accessMethod: 'public',
    platformUrl: 'https://itch.io/jam/gmtk-jam',
    narrativeFocus: false,
    fitCriteria: { activeCommunity: true, targetDemographic: true, largeReach: true },
    notes: 'Mark Brown jam. Huge participation. Design-focused.',
    tags: ['game-jam', 'gmtk', 'design']
  },
  {
    name: 'Brackeys Game Jam',
    platform: 'jam-org',
    communityType: 'jam-community',
    estimatedReach: 20000,
    engagementQuality: 'high',
    accessMethod: 'public',
    platformUrl: 'https://itch.io/jam/brackeys',
    narrativeFocus: false,
    fitCriteria: { activeCommunity: true, toolFriendly: true, targetDemographic: true },
    notes: 'Beginner-friendly. Good for early Architect adopters.',
    tags: ['game-jam', 'brackeys', 'beginner-friendly']
  },
  {
    name: 'NaNoRenO',
    platform: 'jam-org',
    communityType: 'jam-community',
    estimatedReach: 5000,
    engagementQuality: 'high',
    accessMethod: 'public',
    platformUrl: 'https://itch.io/jam/nanoreno',
    narrativeFocus: true,
    fitCriteria: { narrativeFocused: true, activeCommunity: true, toolFriendly: true, targetDemographic: true, lowSaturation: true },
    notes: 'EXCELLENT FIT. Visual novel jam (March). Narrative-first. Perfect timing for beta.',
    tags: ['game-jam', 'visual-novel', 'narrative', 'renpy']
  },
  {
    name: 'Interactive Fiction Competition',
    platform: 'jam-org',
    communityType: 'jam-community',
    estimatedReach: 3000,
    engagementQuality: 'high',
    accessMethod: 'public',
    platformUrl: 'https://ifcomp.org',
    narrativeFocus: true,
    fitCriteria: { narrativeFocused: true, activeCommunity: true, targetDemographic: true, lowSaturation: true },
    notes: 'EXCELLENT FIT. Annual IF competition. Core narrative game creators.',
    tags: ['interactive-fiction', 'competition', 'text-games']
  },
  {
    name: 'Narrative Game Jam (itch.io)',
    platform: 'jam-org',
    communityType: 'jam-community',
    estimatedReach: 2000,
    engagementQuality: 'high',
    accessMethod: 'public',
    platformUrl: 'https://itch.io/jams/tag-narrative',
    narrativeFocus: true,
    fitCriteria: { narrativeFocused: true, activeCommunity: true, toolFriendly: true, targetDemographic: true, lowSaturation: true },
    notes: 'EXCELLENT FIT. Narrative-tagged jams on itch.io. Multiple per year.',
    tags: ['game-jam', 'narrative', 'itch']
  },

  // ============ INDIE PLATFORMS ============
  {
    name: 'Itch.io Community',
    platform: 'itch',
    communityType: 'indie-platform',
    estimatedReach: 800000,
    engagementQuality: 'medium',
    accessMethod: 'public',
    platformUrl: 'https://itch.io',
    narrativeFocus: false,
    fitCriteria: { activeCommunity: true, toolFriendly: true, targetDemographic: true, largeReach: true },
    notes: 'STRONG FIT. 800K+ creators. Devlog culture. Tool pages welcome. Can list Architect as a tool.',
    tags: ['itch', 'indie', 'platform', 'devlog']
  },
  {
    name: 'Itch.io Narrative Tools',
    platform: 'itch',
    communityType: 'narrative-tools',
    estimatedReach: 50000,
    engagementQuality: 'high',
    accessMethod: 'public',
    platformUrl: 'https://itch.io/tools/tag-narrative',
    narrativeFocus: true,
    fitCriteria: { narrativeFocused: true, activeCommunity: true, toolFriendly: true, targetDemographic: true },
    notes: 'EXCELLENT FIT. Narrative tools section on itch. Direct competitors listed here.',
    tags: ['itch', 'narrative', 'tools']
  },
  {
    name: 'IndieDB',
    platform: 'forum',
    communityType: 'indie-platform',
    estimatedReach: 200000,
    engagementQuality: 'medium',
    accessMethod: 'public',
    platformUrl: 'https://indiedb.com',
    narrativeFocus: false,
    fitCriteria: { activeCommunity: true, targetDemographic: true, largeReach: true },
    notes: 'Indie game database. Modding community. Tool pages available.',
    tags: ['indiedb', 'indie', 'modding']
  },
  {
    name: 'Game Jolt',
    platform: 'itch',
    communityType: 'indie-platform',
    estimatedReach: 100000,
    engagementQuality: 'medium',
    accessMethod: 'public',
    platformUrl: 'https://gamejolt.com',
    narrativeFocus: false,
    fitCriteria: { activeCommunity: true, targetDemographic: true },
    notes: 'Indie platform. Younger audience. Tool listings possible.',
    tags: ['gamejolt', 'indie', 'platform']
  },

  // ============ STUDENT/ACADEMIC ============
  {
    name: 'IGDA Student SIG',
    platform: 'association',
    communityType: 'student',
    estimatedReach: 10000,
    engagementQuality: 'high',
    accessMethod: 'application',
    platformUrl: 'https://igda.org/sigs/students/',
    narrativeFocus: false,
    fitCriteria: { activeCommunity: true, toolFriendly: true, targetDemographic: true },
    notes: 'STRONG FIT. Student game developers. Tool workshops welcome. University connections.',
    tags: ['igda', 'student', 'academic', 'networking']
  },
  {
    name: 'DigiPen Game Dev Community',
    platform: 'university',
    communityType: 'student',
    estimatedReach: 5000,
    engagementQuality: 'high',
    accessMethod: 'invite-only',
    platformUrl: '',
    narrativeFocus: false,
    fitCriteria: { activeCommunity: true, targetDemographic: true },
    notes: 'Premier game dev school. Student projects. Alumni network.',
    tags: ['digipen', 'university', 'student']
  },
  {
    name: 'USC Games Community',
    platform: 'university',
    communityType: 'student',
    estimatedReach: 3000,
    engagementQuality: 'high',
    accessMethod: 'invite-only',
    platformUrl: '',
    narrativeFocus: false,
    fitCriteria: { activeCommunity: true, targetDemographic: true },
    notes: 'Top US game program. Strong narrative design track.',
    tags: ['usc', 'university', 'student', 'narrative']
  },

  // ============ WRITING/WORLDBUILDING ============
  {
    name: 'r/worldbuilding',
    platform: 'reddit',
    communityType: 'writing',
    estimatedReach: 900000,
    engagementQuality: 'high',
    accessMethod: 'public',
    platformUrl: 'https://reddit.com/r/worldbuilding',
    narrativeFocus: true,
    fitCriteria: { narrativeFocused: true, activeCommunity: true, largeReach: true },
    notes: 'STRONG FIT. Worldbuilders = lore creators. Many making games. Huge overlap with Architect users.',
    tags: ['worldbuilding', 'lore', 'writing', 'creative']
  },
  {
    name: 'r/writing',
    platform: 'reddit',
    communityType: 'writing',
    estimatedReach: 2500000,
    engagementQuality: 'medium',
    accessMethod: 'public',
    platformUrl: 'https://reddit.com/r/writing',
    narrativeFocus: true,
    fitCriteria: { narrativeFocused: true, activeCommunity: true, largeReach: true },
    notes: 'Massive but general writing. Some game writers. Worth monitoring.',
    tags: ['writing', 'creative', 'general']
  },
  {
    name: 'r/fantasywriters',
    platform: 'reddit',
    communityType: 'writing',
    estimatedReach: 300000,
    engagementQuality: 'high',
    accessMethod: 'public',
    platformUrl: 'https://reddit.com/r/fantasywriters',
    narrativeFocus: true,
    fitCriteria: { narrativeFocused: true, activeCommunity: true, largeReach: true },
    notes: 'Fantasy writers. Overlap with RPG/game narrative creators.',
    tags: ['fantasy', 'writing', 'worldbuilding']
  },

  // ============ YOUTUBE/CONTENT CREATORS ============
  {
    name: 'Game Dev YouTube Community',
    platform: 'youtube',
    communityType: 'gamedev-general',
    estimatedReach: 500000,
    engagementQuality: 'high',
    accessMethod: 'public',
    platformUrl: '',
    narrativeFocus: false,
    fitCriteria: { activeCommunity: true, toolFriendly: true, largeReach: true },
    notes: 'DevLog creators (Miziziziz, Vimlark, etc.). One video = massive reach. Partnership opportunities.',
    tags: ['youtube', 'devlog', 'content-creator']
  },
  {
    name: 'Tool Review Channels',
    platform: 'youtube',
    communityType: 'gamedev-general',
    estimatedReach: 200000,
    engagementQuality: 'high',
    accessMethod: 'public',
    platformUrl: '',
    narrativeFocus: false,
    fitCriteria: { toolFriendly: true, largeReach: true },
    notes: 'Channels that review game dev tools. Direct promotion opportunity.',
    tags: ['youtube', 'tools', 'reviews']
  },

  // ============ ASSOCIATIONS ============
  {
    name: 'IGDA Narrative SIG',
    platform: 'association',
    communityType: 'writing',
    estimatedReach: 2000,
    engagementQuality: 'high',
    accessMethod: 'application',
    platformUrl: 'https://igda.org/sigs/game-writing/',
    narrativeFocus: true,
    fitCriteria: { narrativeFocused: true, activeCommunity: true, toolFriendly: true, targetDemographic: true, lowSaturation: true },
    notes: 'EXCELLENT FIT. Professional narrative designers. Core audience. Workshop opportunities.',
    tags: ['igda', 'narrative', 'professional', 'networking']
  },
  {
    name: 'Interactive Fiction Technology Foundation',
    platform: 'association',
    communityType: 'narrative-tools',
    estimatedReach: 1000,
    engagementQuality: 'high',
    accessMethod: 'public',
    platformUrl: 'https://iftechfoundation.org',
    narrativeFocus: true,
    fitCriteria: { narrativeFocused: true, activeCommunity: true, toolFriendly: true, lowSaturation: true },
    notes: 'EXCELLENT FIT. IF preservation and tools. Very aligned mission.',
    tags: ['interactive-fiction', 'foundation', 'tools']
  },

  // ============ TWITTER/MASTODON ============
  {
    name: '#indiedev Twitter',
    platform: 'twitter',
    communityType: 'gamedev-general',
    estimatedReach: 500000,
    engagementQuality: 'medium',
    accessMethod: 'public',
    platformUrl: 'https://twitter.com/hashtag/indiedev',
    narrativeFocus: false,
    fitCriteria: { activeCommunity: true, targetDemographic: true, largeReach: true },
    notes: 'Large indie presence on Twitter/X. Screenshot Saturday, etc.',
    tags: ['twitter', 'indiedev', 'social']
  },
  {
    name: '#narrativedesign Twitter',
    platform: 'twitter',
    communityType: 'writing',
    estimatedReach: 20000,
    engagementQuality: 'high',
    accessMethod: 'public',
    platformUrl: 'https://twitter.com/hashtag/narrativedesign',
    narrativeFocus: true,
    fitCriteria: { narrativeFocused: true, activeCommunity: true, targetDemographic: true },
    notes: 'Narrative designers on Twitter. Professional community.',
    tags: ['twitter', 'narrative-design', 'professional']
  },
  {
    name: 'Mastodon Gamedev',
    platform: 'mastodon',
    communityType: 'gamedev-general',
    estimatedReach: 30000,
    engagementQuality: 'high',
    accessMethod: 'public',
    platformUrl: 'https://mastodon.gamedev.place',
    narrativeFocus: false,
    fitCriteria: { activeCommunity: true, toolFriendly: true, targetDemographic: true, lowSaturation: true },
    notes: 'STRONG FIT. Mastodon gamedev instance. Indie-friendly, less saturated than Twitter.',
    tags: ['mastodon', 'gamedev', 'fediverse']
  }
];

async function main() {
  let batch = db.batch();
  let count = 0;
  
  for (const c of communities) {
    const fitScore = calcFitScore(c.fitCriteria);
    
    const ref = db.collection('leads').doc();
    batch.set(ref, {
      name: c.name,
      type: 'community',
      status: 'new',
      priority: fitScore >= 10 ? 'high' : fitScore >= 7 ? 'medium' : 'low',
      country: '',
      location: '',
      website: c.platformUrl,
      tags: c.tags || [],
      notes: c.notes,
      contact: { name: '', role: '', email: '', phone: '', linkedin: '' },
      community: {
        platform: c.platform,
        communityType: c.communityType,
        estimatedReach: c.estimatedReach,
        engagementQuality: c.engagementQuality,
        accessMethod: c.accessMethod,
        platformUrl: c.platformUrl,
        narrativeFocus: c.narrativeFocus,
        referralCode: '',
        betaSignupsAttributed: 0,
        fitScore: fitScore,
        fitCriteria: c.fitCriteria
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
  console.log('Added', count, 'community leads');
  
  // Stats
  const highFit = communities.filter(c => calcFitScore(c.fitCriteria) >= 10).length;
  const medFit = communities.filter(c => { const s = calcFitScore(c.fitCriteria); return s >= 7 && s < 10; }).length;
  const narrativeFocused = communities.filter(c => c.narrativeFocus).length;
  const totalReach = communities.reduce((sum, c) => sum + c.estimatedReach, 0);
  
  console.log('\nStats:');
  console.log('  High fit (10+):', highFit);
  console.log('  Medium fit (7-9):', medFit);
  console.log('  Narrative-focused:', narrativeFocused);
  console.log('  Total estimated reach:', totalReach.toLocaleString());
  
  // By platform
  const byPlatform = {};
  communities.forEach(c => { byPlatform[c.platform] = (byPlatform[c.platform] || 0) + 1; });
  console.log('\nBy platform:');
  Object.entries(byPlatform).sort((a,b) => b[1] - a[1]).forEach(([k,v]) => console.log(' ', k + ':', v));
  
  // By type
  const byType = {};
  communities.forEach(c => { byType[c.communityType] = (byType[c.communityType] || 0) + 1; });
  console.log('\nBy community type:');
  Object.entries(byType).sort((a,b) => b[1] - a[1]).forEach(([k,v]) => console.log(' ', k + ':', v));
  
  process.exit(0);
}

main();
