import admin from 'firebase-admin';
import { readFileSync } from 'fs';

const sa = JSON.parse(readFileSync('./service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const PIPELINE_ID = 'WgXKQnG8ERl0otVg758c';
const INITIAL_STAGE = 'identified';

function calcFitScore(c) {
  let score = 0;
  if (c.narrativeFocused) score += 3;
  if (c.activeCommunity) score += 3;
  if (c.toolFriendly) score += 2;
  if (c.targetDemographic) score += 2;
  if (c.largeReach) score += 1;
  if (c.lowSaturation) score += 1;
  return Math.min(score, 12);
}

// ============================================================
// CATEGORY 1: GAME JAMS - ASIA (20)
// ============================================================
const gameJams = [
  // JAPAN
  { name: 'BitSummit (Kyoto)', platform: 'jam-org', communityType: 'jam-community', estimatedReach: 15000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://bitsummit.org', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'STRONG FIT. Japan largest indie festival. Kyoto annual. John Davis co-founder. Publisher networking.', tags: ['japan', 'bitsummit', 'kyoto', 'festival', 'indie'], country: 'Japan' },
  { name: 'Tokyo Indies Meetup', platform: 'jam-org', communityType: 'jam-community', estimatedReach: 3000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, lowSaturation: true, notes: 'Tokyo indie meetups. English-friendly. Regular events.', tags: ['japan', 'tokyo', 'meetup', 'indie'], country: 'Japan' },
  { name: 'Tokyo Indie Games Summit', platform: 'jam-org', communityType: 'jam-community', estimatedReach: 5000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'Publisher-led indie showcase. Growing visibility in Japan.', tags: ['japan', 'tokyo', 'summit', 'indie'], country: 'Japan' },
  { name: 'Comiket (Doujin Games)', platform: 'jam-org', communityType: 'jam-community', estimatedReach: 500000, engagementQuality: 'medium', accessMethod: 'public', platformUrl: 'https://comiket.co.jp', narrativeFocused: true, activeCommunity: true, largeReach: true, notes: 'Largest doujin event. Twice yearly Tokyo. Doujin soft/games section. VN overlap.', tags: ['japan', 'comiket', 'doujin', 'tokyo', 'visual-novel'], country: 'Japan' },
  { name: 'Comitia', platform: 'jam-org', communityType: 'jam-community', estimatedReach: 30000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: true, activeCommunity: true, targetDemographic: true, notes: 'Original works only (no fanwork). Doujin games welcome. Tokyo + Osaka.', tags: ['japan', 'comitia', 'doujin', 'original'], country: 'Japan' },
  
  // KOREA
  { name: 'BIC Festival (Busan Indie Connect)', platform: 'jam-org', communityType: 'jam-community', estimatedReach: 10000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://bicfest.org', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'STRONG FIT. Korea largest indie festival. Since 2015. Global hub ambition. BEXCO Busan.', tags: ['korea', 'busan', 'bic', 'festival', 'indie'], country: 'South Korea' },
  { name: 'G-Star Indie Zone', platform: 'jam-org', communityType: 'jam-community', estimatedReach: 20000, engagementQuality: 'medium', accessMethod: 'paid', platformUrl: 'https://gstar.or.kr', narrativeFocused: false, activeCommunity: true, largeReach: true, notes: 'Korea largest game show. Indie section growing. B2B focus.', tags: ['korea', 'gstar', 'busan', 'b2b'], country: 'South Korea' },
  { name: 'Korea Game Jam', platform: 'jam-org', communityType: 'jam-community', estimatedReach: 2000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, lowSaturation: true, notes: 'Korean game jam scene. GGJ Korea sites. Growing.', tags: ['korea', 'game-jam', 'ggj'], country: 'South Korea' },
  
  // CHINA
  { name: 'WePlay Expo (Shanghai)', platform: 'jam-org', communityType: 'jam-community', estimatedReach: 50000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, largeReach: true, notes: 'STRONG FIT. China largest indie expo. Community-oriented. CiGA affiliated. Doubled in size 2023.', tags: ['china', 'shanghai', 'weplay', 'expo', 'indie'], country: 'China' },
  { name: 'indiePlay Awards', platform: 'jam-org', communityType: 'jam-community', estimatedReach: 5000, engagementQuality: 'high', accessMethod: 'application', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'China indie game awards. 500+ games yearly. CiGA Game Jam award category.', tags: ['china', 'indieplay', 'awards', 'ciga'], country: 'China' },
  { name: 'CiGA Game Jam', platform: 'jam-org', communityType: 'jam-community', estimatedReach: 5000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://ciga.me', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'STRONG FIT. China Indie Game Alliance jam. First game jam in China (2011). Community builders.', tags: ['china', 'ciga', 'game-jam'], country: 'China' },
  
  // TAIWAN
  { name: 'Taipei Game Show Indie House', platform: 'jam-org', communityType: 'jam-community', estimatedReach: 30000, engagementQuality: 'high', accessMethod: 'application', platformUrl: 'https://tgs.tca.org.tw', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, largeReach: true, notes: 'STRONG FIT. Asia largest indie exhibition (200+ games). Jan/Feb. Red Candle Games origin.', tags: ['taiwan', 'taipei', 'tgs', 'indie-house'], country: 'Taiwan' },
  { name: 'Taipei Game Show Indie Game Award', platform: 'jam-org', communityType: 'jam-community', estimatedReach: 5000, engagementQuality: 'high', accessMethod: 'application', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'Indie awards at TGS. International entries. Prestige in Asia.', tags: ['taiwan', 'tgs', 'awards', 'indie'], country: 'Taiwan' },
  
  // SOUTHEAST ASIA
  { name: 'gamescom asia x Thailand Game Show', platform: 'jam-org', communityType: 'jam-community', estimatedReach: 15000, engagementQuality: 'high', accessMethod: 'paid', platformUrl: '', narrativeFocused: false, activeCommunity: true, largeReach: true, notes: 'SEA game show. Growing indie presence. TGS Indie House partners.', tags: ['thailand', 'gamescom-asia', 'sea'], country: 'Thailand' },
  { name: 'Singapore Games Guild', platform: 'jam-org', communityType: 'jam-community', estimatedReach: 2000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, lowSaturation: true, notes: 'Singapore game dev community. IGDA Singapore connected.', tags: ['singapore', 'guild', 'sea'], country: 'Singapore' },
  { name: 'Indie Wavemakers (Singapore)', platform: 'jam-org', communityType: 'jam-community', estimatedReach: 1500, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, lowSaturation: true, notes: 'Singapore indie interviews. Partners with Taipei Game Show.', tags: ['singapore', 'indie-wavemakers', 'interviews'], country: 'Singapore' },
  { name: 'Malaysia Game Developers (MY Gamedev)', platform: 'jam-org', communityType: 'jam-community', estimatedReach: 1500, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, targetDemographic: true, lowSaturation: true, notes: 'Malaysian game dev community. Growing scene.', tags: ['malaysia', 'sea', 'gamedev'], country: 'Malaysia' },
  { name: 'Indonesia Game Developer (AGI)', platform: 'jam-org', communityType: 'jam-community', estimatedReach: 3000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, targetDemographic: true, notes: 'Asosiasi Game Indonesia. National association.', tags: ['indonesia', 'agi', 'sea', 'association'], country: 'Indonesia' },
  { name: 'Vietnam Game Dev Community', platform: 'jam-org', communityType: 'jam-community', estimatedReach: 2000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, targetDemographic: true, lowSaturation: true, notes: 'Vietnamese game dev scene. Mobile focus but growing.', tags: ['vietnam', 'sea', 'gamedev'], country: 'Vietnam' },
  { name: 'Philippines Game Dev (GDAP)', platform: 'jam-org', communityType: 'jam-community', estimatedReach: 2000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, targetDemographic: true, lowSaturation: true, notes: 'Game Developers Association of the Philippines.', tags: ['philippines', 'gdap', 'sea', 'association'], country: 'Philippines' },
];

// ============================================================
// CATEGORY 2: NARRATIVE TOOLS / IF COMMUNITIES - ASIA (20)
// ============================================================
const narrativeTools = [
  // JAPAN
  { name: 'Japanese VN Creators (Lemmasoft JP)', platform: 'forum', communityType: 'narrative-tools', estimatedReach: 5000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: true, activeCommunity: true, targetDemographic: true, notes: 'Japanese VN creators on Lemmasoft. RenPy users. Cross-cultural.', tags: ['japan', 'visual-novel', 'renpy', 'lemmasoft'], country: 'Japan' },
  { name: 'Doujin VN Circle Community', platform: 'other', communityType: 'narrative-tools', estimatedReach: 20000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: true, activeCommunity: true, targetDemographic: true, notes: 'EXCELLENT FIT. Doujin visual novel circles. Comiket participants. Otome, BL, original VN.', tags: ['japan', 'doujin', 'visual-novel', 'circle'], country: 'Japan' },
  { name: 'roseVeRte (JP Doujin Circle)', platform: 'other', communityType: 'narrative-tools', estimatedReach: 2000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: true, activeCommunity: true, targetDemographic: true, lowSaturation: true, notes: 'Japanese doujin circle. Otome VNs. How to Take Off Your Mask, Cafe 0.', tags: ['japan', 'doujin', 'otome', 'visual-novel'], country: 'Japan' },
  { name: 'Japanese RPG Maker Community', platform: 'forum', communityType: 'engine-specific', estimatedReach: 50000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: true, activeCommunity: true, targetDemographic: true, largeReach: true, notes: 'EXCELLENT FIT. RPG Maker origin country. Huge JRPG creation scene.', tags: ['japan', 'rpgmaker', 'jrpg', 'narrative'], country: 'Japan' },
  { name: 'Wolf RPG Editor Community (Japan)', platform: 'forum', communityType: 'narrative-tools', estimatedReach: 10000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: true, activeCommunity: true, targetDemographic: true, notes: 'STRONG FIT. Japanese alternative to RPG Maker. Free. Strong doujin scene.', tags: ['japan', 'wolf-rpg', 'doujin', 'free'], country: 'Japan' },
  { name: 'Novelty (Japanese VN Engine)', platform: 'other', communityType: 'narrative-tools', estimatedReach: 3000, engagementQuality: 'medium', accessMethod: 'public', platformUrl: '', narrativeFocused: true, activeCommunity: true, targetDemographic: true, lowSaturation: true, notes: 'Japanese VN engine. Commercial and doujin use.', tags: ['japan', 'novelty', 'vn-engine'], country: 'Japan' },
  
  // KOREA
  { name: 'Korean VN Developers', platform: 'other', communityType: 'narrative-tools', estimatedReach: 5000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: true, activeCommunity: true, targetDemographic: true, notes: 'Korean visual novel scene. Otome focus. Growing rapidly.', tags: ['korea', 'visual-novel', 'otome'], country: 'South Korea' },
  { name: 'Turtle Cream (KR Developer)', platform: 'other', communityType: 'narrative-tools', estimatedReach: 1000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: true, activeCommunity: true, targetDemographic: true, lowSaturation: true, notes: 'Korean indie. RP7 (TGS Best Innovation). JRPG + puzzle narrative.', tags: ['korea', 'indie', 'narrative', 'jrpg'], country: 'South Korea' },
  
  // CHINA
  { name: 'Chinese IF Community', platform: 'other', communityType: 'narrative-tools', estimatedReach: 10000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: true, activeCommunity: true, targetDemographic: true, notes: 'Chinese interactive fiction. Twine, Ink in Chinese. Growing.', tags: ['china', 'interactive-fiction', 'twine'], country: 'China' },
  { name: 'Chinese Visual Novel Dev (Bilibili)', platform: 'other', communityType: 'narrative-tools', estimatedReach: 50000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://bilibili.com', narrativeFocused: true, activeCommunity: true, targetDemographic: true, largeReach: true, notes: 'STRONG FIT. VN creators on Bilibili. Tutorials, devlogs. Large audience.', tags: ['china', 'bilibili', 'visual-novel', 'video'], country: 'China' },
  { name: 'Chinese RPG Maker Community', platform: 'forum', communityType: 'engine-specific', estimatedReach: 30000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: true, activeCommunity: true, targetDemographic: true, notes: 'RPG Maker in China. Strong modding culture.', tags: ['china', 'rpgmaker', 'modding'], country: 'China' },
  { name: 'Orange Nova (Chinese IF)', platform: 'other', communityType: 'narrative-tools', estimatedReach: 2000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: true, activeCommunity: true, targetDemographic: true, lowSaturation: true, notes: 'Chinese IF engine/community. Alternative to Twine.', tags: ['china', 'if-engine', 'narrative'], country: 'China' },
  
  // TAIWAN
  { name: 'Taiwan VN Community', platform: 'other', communityType: 'narrative-tools', estimatedReach: 5000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: true, activeCommunity: true, targetDemographic: true, notes: 'Taiwanese VN creators. Red Candle Games origin. Strong narrative culture.', tags: ['taiwan', 'visual-novel', 'narrative'], country: 'Taiwan' },
  { name: 'Bahamut Game Forum (Taiwan)', platform: 'forum', communityType: 'narrative-tools', estimatedReach: 100000, engagementQuality: 'medium', accessMethod: 'public', platformUrl: '', narrativeFocused: true, activeCommunity: true, largeReach: true, notes: 'Taiwan largest gaming forum. Indie and VN sections.', tags: ['taiwan', 'bahamut', 'forum', 'gaming'], country: 'Taiwan' },
  
  // PAN-ASIA
  { name: 'Asian VN Jam Communities', platform: 'jam-org', communityType: 'narrative-tools', estimatedReach: 5000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: true, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'EXCELLENT FIT. Asian developers in NaNoRenO, Otome Jam. Cross-cultural.', tags: ['asia', 'visual-novel', 'jam', 'nanoreno'], country: 'Asia' },
  { name: 'Otome Game Developers (Asia)', platform: 'other', communityType: 'narrative-tools', estimatedReach: 8000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: true, activeCommunity: true, targetDemographic: true, notes: 'EXCELLENT FIT. Asian otome game creators. Strong in Japan, Korea.', tags: ['asia', 'otome', 'visual-novel', 'romance'], country: 'Asia' },
  { name: 'BL Game Developers (Asia)', platform: 'other', communityType: 'narrative-tools', estimatedReach: 5000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: true, activeCommunity: true, targetDemographic: true, notes: 'Boys Love game creators. Japan + China strong scenes.', tags: ['asia', 'bl', 'visual-novel', 'yaoi'], country: 'Asia' },
  { name: 'Light Novel to VN Adaptation Community', platform: 'other', communityType: 'narrative-tools', estimatedReach: 10000, engagementQuality: 'medium', accessMethod: 'public', platformUrl: '', narrativeFocused: true, activeCommunity: true, notes: 'LN/VN crossover community. Narrative adaptation focus.', tags: ['asia', 'light-novel', 'visual-novel', 'adaptation'], country: 'Asia' },
  { name: 'Gacha Game Narrative (Asia)', platform: 'other', communityType: 'narrative-tools', estimatedReach: 50000, engagementQuality: 'medium', accessMethod: 'public', platformUrl: '', narrativeFocused: true, activeCommunity: true, largeReach: true, notes: 'Story-heavy gacha games. Genshin, FGO, Arknights narrative communities.', tags: ['asia', 'gacha', 'narrative', 'mobile'], country: 'Asia' },
  { name: 'Asian Story-Driven Indie Devs', platform: 'other', communityType: 'narrative-tools', estimatedReach: 3000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: true, activeCommunity: true, toolFriendly: true, targetDemographic: true, lowSaturation: true, notes: 'EXCELLENT FIT. Cross-Asia narrative indie developers. English-speaking subset.', tags: ['asia', 'indie', 'narrative', 'english'], country: 'Asia' },
];

// ============================================================
// CATEGORY 3: INDIE PLATFORMS - ASIA (20)
// ============================================================
const indiePlatforms = [
  // CHINA
  { name: 'indienova', platform: 'itch', communityType: 'indie-platform', estimatedReach: 500000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://indienova.com', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, largeReach: true, notes: 'STRONG FIT. China indie games portal. Millions of players. Tool listings.', tags: ['china', 'indienova', 'portal', 'community'], country: 'China' },
  { name: 'TapTap', platform: 'itch', communityType: 'indie-platform', estimatedReach: 50000000, engagementQuality: 'medium', accessMethod: 'public', platformUrl: 'https://taptap.io', narrativeFocused: false, activeCommunity: true, largeReach: true, notes: 'China mobile game platform. Indie discovery. Massive reach.', tags: ['china', 'taptap', 'mobile', 'discovery'], country: 'China' },
  { name: 'Bilibili Games', platform: 'itch', communityType: 'indie-platform', estimatedReach: 10000000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://bilibili.com', narrativeFocused: false, activeCommunity: true, largeReach: true, notes: 'Bilibili gaming section. 2D indie focus. Video content overlap.', tags: ['china', 'bilibili', 'video', 'gaming'], country: 'China' },
  { name: 'Coconut Island Games (Community)', platform: 'other', communityType: 'indie-platform', estimatedReach: 10000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'Chinese indie publisher. Started first game jam in China. Community builders.', tags: ['china', 'coconut-island', 'publisher', 'community'], country: 'China' },
  { name: 'WeGame', platform: 'itch', communityType: 'indie-platform', estimatedReach: 5000000, engagementQuality: 'medium', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, largeReach: true, notes: 'Tencent game platform. More Chinese users than Steam. Indie section.', tags: ['china', 'wegame', 'tencent', 'platform'], country: 'China' },
  
  // JAPAN
  { name: 'DLsite (Doujin)', platform: 'itch', communityType: 'indie-platform', estimatedReach: 500000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://dlsite.com', narrativeFocused: true, activeCommunity: true, targetDemographic: true, largeReach: true, notes: 'Japan doujin sales platform. VN, RPG, doujin games. Large creator base.', tags: ['japan', 'dlsite', 'doujin', 'sales'], country: 'Japan' },
  { name: 'BOOTH (Pixiv)', platform: 'itch', communityType: 'indie-platform', estimatedReach: 200000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://booth.pm', narrativeFocused: false, activeCommunity: true, targetDemographic: true, notes: 'Pixiv marketplace. Doujin game sales. Art/game crossover.', tags: ['japan', 'booth', 'pixiv', 'doujin'], country: 'Japan' },
  { name: 'Freem! (Free Games Portal)', platform: 'itch', communityType: 'indie-platform', estimatedReach: 100000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://freem.ne.jp', narrativeFocused: true, activeCommunity: true, targetDemographic: true, notes: 'STRONG FIT. Japanese free games portal. RPG Maker, Wolf RPG games.', tags: ['japan', 'freem', 'free', 'rpgmaker'], country: 'Japan' },
  { name: 'Vector Game Downloads (Japan)', platform: 'itch', communityType: 'indie-platform', estimatedReach: 50000, engagementQuality: 'medium', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, notes: 'Japanese software/game download site. Freeware focus.', tags: ['japan', 'vector', 'freeware'], country: 'Japan' },
  { name: 'NicoNico Game (Nico Nico)', platform: 'itch', communityType: 'indie-platform', estimatedReach: 100000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://nicovideo.jp', narrativeFocused: false, activeCommunity: true, targetDemographic: true, notes: 'Japanese video platform. Game dev videos. RPG Maker playthroughs.', tags: ['japan', 'niconico', 'video', 'gaming'], country: 'Japan' },
  
  // KOREA
  { name: 'Naver Game (Korea)', platform: 'itch', communityType: 'indie-platform', estimatedReach: 500000, engagementQuality: 'medium', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, largeReach: true, notes: 'Korean portal gaming section. Indie discovery.', tags: ['korea', 'naver', 'portal'], country: 'South Korea' },
  { name: 'Indiegame.com (Korea)', platform: 'itch', communityType: 'indie-platform', estimatedReach: 50000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://indiegame.com', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'Korean indie game portal. BIC Festival coverage.', tags: ['korea', 'indiegame', 'portal', 'news'], country: 'South Korea' },
  { name: 'Indiera (Korea)', platform: 'association', communityType: 'indie-platform', estimatedReach: 6000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'STRONG FIT. Korean indie community. 6000+ members. Monthly meetups. Podcasts. BIC affiliated.', tags: ['korea', 'indiera', 'community', 'meetup'], country: 'South Korea' },
  
  // TAIWAN
  { name: 'Bahamut GNN (Taiwan)', platform: 'forum', communityType: 'indie-platform', estimatedReach: 200000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, largeReach: true, notes: 'Taiwan game news. Indie coverage. Large audience.', tags: ['taiwan', 'bahamut', 'news'], country: 'Taiwan' },
  { name: 'Taiwan Indie Dev Community', platform: 'other', communityType: 'indie-platform', estimatedReach: 3000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'Taiwanese indie developers. TGS Indie House participants.', tags: ['taiwan', 'indie', 'community'], country: 'Taiwan' },
  
  // SOUTHEAST ASIA
  { name: 'SEA Game Developers Network', platform: 'other', communityType: 'indie-platform', estimatedReach: 5000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'Cross-SEA game dev network. Growing rapidly.', tags: ['sea', 'network', 'gamedev'], country: 'Southeast Asia' },
  { name: 'Level Up KL (Malaysia)', platform: 'jam-org', communityType: 'indie-platform', estimatedReach: 3000, engagementQuality: 'high', accessMethod: 'paid', platformUrl: '', narrativeFocused: false, activeCommunity: true, targetDemographic: true, notes: 'Malaysian game dev conference. SEA hub.', tags: ['malaysia', 'level-up', 'conference'], country: 'Malaysia' },
  { name: 'GameStart Asia (Singapore)', platform: 'jam-org', communityType: 'indie-platform', estimatedReach: 10000, engagementQuality: 'high', accessMethod: 'paid', platformUrl: '', narrativeFocused: false, activeCommunity: true, notes: 'Singapore gaming convention. Indie showcase.', tags: ['singapore', 'gamestart', 'convention'], country: 'Singapore' },
  { name: 'GAME EMBER (Indonesia)', platform: 'jam-org', communityType: 'indie-platform', estimatedReach: 2000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, targetDemographic: true, lowSaturation: true, notes: 'Indonesian indie showcase. Growing scene.', tags: ['indonesia', 'game-ember', 'showcase'], country: 'Indonesia' },
  { name: 'Thailand Game Developers', platform: 'other', communityType: 'indie-platform', estimatedReach: 2000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, targetDemographic: true, lowSaturation: true, notes: 'Thai game dev community. gamescom asia host.', tags: ['thailand', 'gamedev', 'sea'], country: 'Thailand' },
];

// ============================================================
// CATEGORY 4: DISCORD / SOCIAL COMMUNITIES - ASIA (20)
// ============================================================
const discordCommunities = [
  // JAPAN
  { name: 'Japanese Game Dev Discord', platform: 'discord', communityType: 'gamedev-general', estimatedReach: 5000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'Japanese game developers. English-friendly subset.', tags: ['japan', 'discord', 'gamedev'], country: 'Japan' },
  { name: 'Int. Japanese Gaming Community', platform: 'discord', communityType: 'gamedev-general', estimatedReach: 3000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://discord.me/ijgc', narrativeFocused: false, activeCommunity: true, targetDemographic: true, notes: 'International Japanese gaming. English speakers interested in JP games.', tags: ['japan', 'international', 'gaming', 'discord'], country: 'Japan' },
  { name: 'BitSummit Discord', platform: 'discord', communityType: 'jam-community', estimatedReach: 2000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, lowSaturation: true, notes: 'BitSummit community Discord. Exhibitors and attendees.', tags: ['japan', 'bitsummit', 'festival', 'discord'], country: 'Japan' },
  
  // KOREA
  { name: 'Korean Indie Game Discord', platform: 'discord', communityType: 'gamedev-general', estimatedReach: 3000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, lowSaturation: true, notes: 'Korean indie developers. Growing Discord presence.', tags: ['korea', 'indie', 'discord'], country: 'South Korea' },
  { name: 'BIC Festival Discord', platform: 'discord', communityType: 'jam-community', estimatedReach: 1500, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, lowSaturation: true, notes: 'BIC Busan community. Exhibitors and developers.', tags: ['korea', 'bic', 'busan', 'discord'], country: 'South Korea' },
  
  // CHINA (Note: Discord limited in China, but overseas Chinese use it)
  { name: 'Chinese Indie Dev Discord (Overseas)', platform: 'discord', communityType: 'gamedev-general', estimatedReach: 5000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'Overseas Chinese game developers. English + Chinese.', tags: ['china', 'overseas', 'indie', 'discord'], country: 'China' },
  { name: 'CiGA Discord', platform: 'discord', communityType: 'gamedev-general', estimatedReach: 2000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, lowSaturation: true, notes: 'China Indie Game Alliance Discord.', tags: ['china', 'ciga', 'discord'], country: 'China' },
  
  // TAIWAN
  { name: 'Taiwan Game Dev Discord', platform: 'discord', communityType: 'gamedev-general', estimatedReach: 2000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, lowSaturation: true, notes: 'Taiwanese game developers. Active community.', tags: ['taiwan', 'gamedev', 'discord'], country: 'Taiwan' },
  
  // SOUTHEAST ASIA
  { name: 'SEA Game Dev Discord', platform: 'discord', communityType: 'gamedev-general', estimatedReach: 5000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'Southeast Asian game developers. Cross-country.', tags: ['sea', 'gamedev', 'discord'], country: 'Southeast Asia' },
  { name: 'Singapore Game Dev Discord', platform: 'discord', communityType: 'gamedev-general', estimatedReach: 2000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, lowSaturation: true, notes: 'Singapore developers. IGDA Singapore connected.', tags: ['singapore', 'gamedev', 'discord'], country: 'Singapore' },
  { name: 'Malaysian Game Dev Discord', platform: 'discord', communityType: 'gamedev-general', estimatedReach: 1500, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, targetDemographic: true, lowSaturation: true, notes: 'Malaysian developers. Level Up KL community.', tags: ['malaysia', 'gamedev', 'discord'], country: 'Malaysia' },
  { name: 'Indonesia Game Dev Discord', platform: 'discord', communityType: 'gamedev-general', estimatedReach: 2000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, targetDemographic: true, lowSaturation: true, notes: 'Indonesian developers. AGI connected.', tags: ['indonesia', 'gamedev', 'discord'], country: 'Indonesia' },
  { name: 'Philippines Game Dev Discord', platform: 'discord', communityType: 'gamedev-general', estimatedReach: 1500, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, targetDemographic: true, lowSaturation: true, notes: 'Filipino developers. GDAP connected.', tags: ['philippines', 'gamedev', 'discord'], country: 'Philippines' },
  { name: 'Vietnam Game Dev Discord', platform: 'discord', communityType: 'gamedev-general', estimatedReach: 1000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, targetDemographic: true, lowSaturation: true, notes: 'Vietnamese developers. Growing scene.', tags: ['vietnam', 'gamedev', 'discord'], country: 'Vietnam' },
  { name: 'Thai Game Dev Discord', platform: 'discord', communityType: 'gamedev-general', estimatedReach: 1000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, targetDemographic: true, lowSaturation: true, notes: 'Thai developers. gamescom asia community.', tags: ['thailand', 'gamedev', 'discord'], country: 'Thailand' },
  
  // PAN-ASIA
  { name: 'Asian Indie Devs Discord', platform: 'discord', communityType: 'gamedev-general', estimatedReach: 3000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'Cross-Asian indie developers. English-speaking.', tags: ['asia', 'indie', 'discord'], country: 'Asia' },
  { name: 'Asian VN Developers Discord', platform: 'discord', communityType: 'narrative-tools', estimatedReach: 2000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: true, activeCommunity: true, toolFriendly: true, targetDemographic: true, lowSaturation: true, notes: 'EXCELLENT FIT. Asian VN creators. English-speaking subset.', tags: ['asia', 'visual-novel', 'discord'], country: 'Asia' },
  { name: 'Anime/VN Game Dev Discord', platform: 'discord', communityType: 'narrative-tools', estimatedReach: 8000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: true, activeCommunity: true, targetDemographic: true, notes: 'Anime-style game developers. Strong Asia overlap.', tags: ['anime', 'visual-novel', 'discord'], country: 'Asia' },
  { name: 'Otome/BL Game Dev Discord', platform: 'discord', communityType: 'narrative-tools', estimatedReach: 5000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: true, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'EXCELLENT FIT. Otome/BL developers. Strong Asia presence.', tags: ['otome', 'bl', 'visual-novel', 'discord'], country: 'Asia' },
  { name: 'JRPG Dev Discord', platform: 'discord', communityType: 'engine-specific', estimatedReach: 4000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: true, activeCommunity: true, targetDemographic: true, notes: 'JRPG-style game developers. Narrative-heavy.', tags: ['jrpg', 'rpgmaker', 'discord'], country: 'Asia' },
];

// ============================================================
// CATEGORY 5: REDDIT / ONLINE FORUMS - ASIA (20)
// ============================================================
const redditCommunities = [
  // REDDIT (English-speaking Asian dev overlap)
  { name: 'r/visualnovels (Asian Dev Focus)', platform: 'reddit', communityType: 'narrative-tools', estimatedReach: 350000, engagementQuality: 'medium', accessMethod: 'public', platformUrl: 'https://reddit.com/r/visualnovels', narrativeFocused: true, activeCommunity: true, largeReach: true, notes: 'VN subreddit. Strong Japanese VN discussion. Dev threads.', tags: ['reddit', 'visual-novel', 'japan'], country: 'Asia' },
  { name: 'r/otomegames', platform: 'reddit', communityType: 'narrative-tools', estimatedReach: 100000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/otomegames', narrativeFocused: true, activeCommunity: true, targetDemographic: true, notes: 'STRONG FIT. Otome games subreddit. Dev resources. Jam announcements.', tags: ['reddit', 'otome', 'visual-novel'], country: 'Asia' },
  { name: 'r/gachagaming (Story Focus)', platform: 'reddit', communityType: 'narrative-tools', estimatedReach: 500000, engagementQuality: 'medium', accessMethod: 'public', platformUrl: 'https://reddit.com/r/gachagaming', narrativeFocused: true, activeCommunity: true, largeReach: true, notes: 'Gacha gaming. Story-heavy game discussions. Asia-developed games.', tags: ['reddit', 'gacha', 'mobile', 'asia'], country: 'Asia' },
  { name: 'r/JRPG', platform: 'reddit', communityType: 'narrative-tools', estimatedReach: 200000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/JRPG', narrativeFocused: true, activeCommunity: true, largeReach: true, notes: 'JRPG subreddit. Narrative-focused genre. Indie JRPG discussion.', tags: ['reddit', 'jrpg', 'narrative'], country: 'Asia' },
  { name: 'r/vndevs (Asian Dev Posts)', platform: 'reddit', communityType: 'narrative-tools', estimatedReach: 8000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://reddit.com/r/vndevs', narrativeFocused: true, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'VN developers. Asian developer posts.', tags: ['reddit', 'visual-novel', 'development'], country: 'Asia' },
  
  // CHINA FORUMS
  { name: 'NGA Gaming Forums (China)', platform: 'forum', communityType: 'indie-platform', estimatedReach: 5000000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, largeReach: true, notes: 'Chinese gaming forum. Massive. Indie discussion sections.', tags: ['china', 'nga', 'forum'], country: 'China' },
  { name: 'Tieba Gaming (Baidu)', platform: 'forum', communityType: 'indie-platform', estimatedReach: 10000000, engagementQuality: 'medium', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, largeReach: true, notes: 'Baidu forums. Gaming sections. Massive reach.', tags: ['china', 'tieba', 'baidu', 'forum'], country: 'China' },
  { name: 'Zhihu Game Dev (China)', platform: 'forum', communityType: 'gamedev-general', estimatedReach: 500000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'Chinese Quora. Game development Q&A. Tool discussions.', tags: ['china', 'zhihu', 'qa', 'gamedev'], country: 'China' },
  
  // JAPAN FORUMS
  { name: '5ch Game Dev (Japan)', platform: 'forum', communityType: 'gamedev-general', estimatedReach: 100000, engagementQuality: 'medium', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, notes: 'Japanese forum (5channel). Game creation boards.', tags: ['japan', '5ch', 'forum'], country: 'Japan' },
  { name: 'Pixiv Game Tag', platform: 'other', communityType: 'indie-platform', estimatedReach: 200000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://pixiv.net', narrativeFocused: false, activeCommunity: true, targetDemographic: true, notes: 'Pixiv game-tagged content. Doujin game promotion.', tags: ['japan', 'pixiv', 'art', 'doujin'], country: 'Japan' },
  
  // KOREA FORUMS
  { name: 'DCinside Game Dev (Korea)', platform: 'forum', communityType: 'gamedev-general', estimatedReach: 50000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, targetDemographic: true, notes: 'Korean forum. Game development galleries.', tags: ['korea', 'dcinside', 'forum'], country: 'South Korea' },
  { name: 'Namu Wiki Game Dev', platform: 'other', communityType: 'gamedev-general', estimatedReach: 100000, engagementQuality: 'medium', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, notes: 'Korean wiki. Game dev resources. Community edited.', tags: ['korea', 'namuwiki', 'wiki'], country: 'South Korea' },
  { name: 'Ruliweb (Korea)', platform: 'forum', communityType: 'indie-platform', estimatedReach: 200000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, notes: 'Korean gaming community. Indie discussion.', tags: ['korea', 'ruliweb', 'forum'], country: 'South Korea' },
  
  // TAIWAN
  { name: 'PTT Game Board (Taiwan)', platform: 'forum', communityType: 'indie-platform', estimatedReach: 100000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, notes: 'Taiwan BBS. Gaming boards. Indie discussion.', tags: ['taiwan', 'ptt', 'bbs'], country: 'Taiwan' },
  
  // GENERAL ASIA-FOCUSED
  { name: 'Fuwanovel Forums (VN Focus)', platform: 'forum', communityType: 'narrative-tools', estimatedReach: 30000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://forums.fuwanovel.moe', narrativeFocused: true, activeCommunity: true, targetDemographic: true, notes: 'STRONG FIT. Visual novel community. Asian VN focus. Dev posts.', tags: ['fuwanovel', 'visual-novel', 'asia'], country: 'Asia' },
  { name: 'VN Database Forums', platform: 'forum', communityType: 'narrative-tools', estimatedReach: 50000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://vndb.org', narrativeFocused: true, activeCommunity: true, notes: 'Visual Novel Database discussions. Developer posts.', tags: ['vndb', 'visual-novel', 'database'], country: 'Asia' },
  { name: 'Siliconera/Gematsu Readers', platform: 'other', communityType: 'indie-platform', estimatedReach: 100000, engagementQuality: 'medium', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, notes: 'Asian game news sites. Developer coverage.', tags: ['news', 'asia', 'coverage'], country: 'Asia' },
  { name: 'RPGSite Forums', platform: 'forum', communityType: 'narrative-tools', estimatedReach: 20000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: true, activeCommunity: true, notes: 'RPG-focused site. JRPG discussions. Indie coverage.', tags: ['rpgsite', 'jrpg', 'forum'], country: 'Asia' },
  { name: 'Hardcoregamer Asia', platform: 'other', communityType: 'indie-platform', estimatedReach: 50000, engagementQuality: 'medium', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, notes: 'Gaming news. Asian game coverage.', tags: ['hardcoregamer', 'news', 'asia'], country: 'Asia' },
  { name: 'Kotaku East Community', platform: 'other', communityType: 'indie-platform', estimatedReach: 200000, engagementQuality: 'medium', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, notes: 'Asian game news coverage. Developer features.', tags: ['kotaku', 'news', 'asia'], country: 'Asia' },
];

// ============================================================
// CATEGORY 6: UNIVERSITIES & STUDENTS - ASIA (20)
// ============================================================
const universities = [
  // JAPAN
  { name: 'Digital Hollywood University', platform: 'university', communityType: 'student', estimatedReach: 3000, engagementQuality: 'high', accessMethod: 'invite-only', platformUrl: 'https://www.dhw.ac.jp', narrativeFocused: false, activeCommunity: true, targetDemographic: true, notes: 'Tokyo game dev university. Anime, games, digital media.', tags: ['japan', 'tokyo', 'university', 'digital-hollywood'], country: 'Japan' },
  { name: 'HAL Osaka/Tokyo/Nagoya', platform: 'university', communityType: 'student', estimatedReach: 5000, engagementQuality: 'high', accessMethod: 'invite-only', platformUrl: '', narrativeFocused: false, activeCommunity: true, targetDemographic: true, notes: 'Japanese game dev school chain. Multiple campuses.', tags: ['japan', 'hal', 'school', 'multiple'], country: 'Japan' },
  { name: 'Tokyo University of Technology', platform: 'university', communityType: 'student', estimatedReach: 2000, engagementQuality: 'high', accessMethod: 'invite-only', platformUrl: '', narrativeFocused: false, activeCommunity: true, targetDemographic: true, notes: 'Game development program. Tokyo.', tags: ['japan', 'tokyo', 'university'], country: 'Japan' },
  { name: 'Japan Game Dev Student Community', platform: 'other', communityType: 'student', estimatedReach: 5000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'Cross-university Japanese students. Game dev circles.', tags: ['japan', 'student', 'cross-university'], country: 'Japan' },
  
  // KOREA
  { name: 'Korea Game Academy', platform: 'university', communityType: 'student', estimatedReach: 3000, engagementQuality: 'high', accessMethod: 'invite-only', platformUrl: '', narrativeFocused: false, activeCommunity: true, targetDemographic: true, notes: 'Korean game development school.', tags: ['korea', 'academy', 'school'], country: 'South Korea' },
  { name: 'KAIST Game Lab', platform: 'university', communityType: 'student', estimatedReach: 500, engagementQuality: 'high', accessMethod: 'invite-only', platformUrl: '', narrativeFocused: false, activeCommunity: true, targetDemographic: true, lowSaturation: true, notes: 'KAIST university game research. Technical focus.', tags: ['korea', 'kaist', 'research', 'university'], country: 'South Korea' },
  { name: 'Korean University Game Dev Clubs', platform: 'other', communityType: 'student', estimatedReach: 5000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'Cross-university Korean students.', tags: ['korea', 'student', 'clubs'], country: 'South Korea' },
  
  // CHINA
  { name: 'Tsinghua Game Design', platform: 'university', communityType: 'student', estimatedReach: 500, engagementQuality: 'high', accessMethod: 'invite-only', platformUrl: '', narrativeFocused: false, activeCommunity: true, targetDemographic: true, lowSaturation: true, notes: 'Top Chinese university. Game design program.', tags: ['china', 'tsinghua', 'university'], country: 'China' },
  { name: 'China Academy of Art Game Design', platform: 'university', communityType: 'student', estimatedReach: 1000, engagementQuality: 'high', accessMethod: 'invite-only', platformUrl: '', narrativeFocused: false, activeCommunity: true, targetDemographic: true, notes: 'Chinese art academy. Game design program.', tags: ['china', 'art', 'university'], country: 'China' },
  { name: 'Chinese University Game Dev Clubs', platform: 'other', communityType: 'student', estimatedReach: 10000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'Chinese university game dev clubs. CiGA student events.', tags: ['china', 'student', 'clubs', 'ciga'], country: 'China' },
  
  // TAIWAN
  { name: 'National Taiwan University Game Dev', platform: 'university', communityType: 'student', estimatedReach: 500, engagementQuality: 'high', accessMethod: 'invite-only', platformUrl: '', narrativeFocused: false, activeCommunity: true, targetDemographic: true, lowSaturation: true, notes: 'Top Taiwan university. Game dev program/club.', tags: ['taiwan', 'ntu', 'university'], country: 'Taiwan' },
  { name: 'Taiwan Game Dev Student Network', platform: 'other', communityType: 'student', estimatedReach: 2000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'Taiwanese student developers. TGS Indie House participants.', tags: ['taiwan', 'student', 'network'], country: 'Taiwan' },
  
  // SOUTHEAST ASIA
  { name: 'DigiPen Singapore', platform: 'university', communityType: 'student', estimatedReach: 1000, engagementQuality: 'high', accessMethod: 'invite-only', platformUrl: '', narrativeFocused: false, activeCommunity: true, targetDemographic: true, notes: 'DigiPen Singapore campus. SEA game dev education hub.', tags: ['singapore', 'digipen', 'university'], country: 'Singapore' },
  { name: 'Singapore Polytechnic Game Dev', platform: 'university', communityType: 'student', estimatedReach: 800, engagementQuality: 'high', accessMethod: 'invite-only', platformUrl: '', narrativeFocused: false, activeCommunity: true, targetDemographic: true, notes: 'Singapore polytechnic game programs.', tags: ['singapore', 'polytechnic', 'school'], country: 'Singapore' },
  { name: 'Malaysian Game Dev Schools', platform: 'university', communityType: 'student', estimatedReach: 1500, engagementQuality: 'high', accessMethod: 'invite-only', platformUrl: '', narrativeFocused: false, activeCommunity: true, targetDemographic: true, notes: 'Malaysian game dev education. Growing scene.', tags: ['malaysia', 'school', 'education'], country: 'Malaysia' },
  { name: 'Indonesian Game Dev Schools', platform: 'university', communityType: 'student', estimatedReach: 2000, engagementQuality: 'high', accessMethod: 'invite-only', platformUrl: '', narrativeFocused: false, activeCommunity: true, targetDemographic: true, notes: 'Indonesian game dev education. AGI student programs.', tags: ['indonesia', 'school', 'agi'], country: 'Indonesia' },
  { name: 'Thai Game Dev Academy', platform: 'university', communityType: 'student', estimatedReach: 1000, engagementQuality: 'high', accessMethod: 'invite-only', platformUrl: '', narrativeFocused: false, activeCommunity: true, targetDemographic: true, notes: 'Thai game dev education.', tags: ['thailand', 'academy', 'education'], country: 'Thailand' },
  
  // GGJ ASIA
  { name: 'Global Game Jam Asia Sites', platform: 'jam-org', communityType: 'student', estimatedReach: 10000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'GGJ university sites across Asia. Annual touchpoint.', tags: ['asia', 'ggj', 'university', 'jam'], country: 'Asia' },
  { name: 'IGDA Asia Student Chapters', platform: 'association', communityType: 'student', estimatedReach: 3000, engagementQuality: 'high', accessMethod: 'application', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'IGDA student chapters in Asia. Japan, Korea, Singapore, etc.', tags: ['asia', 'igda', 'student', 'chapters'], country: 'Asia' },
  { name: 'Asia Game Dev Youth Programs', platform: 'other', communityType: 'student', estimatedReach: 5000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'Youth game dev programs across Asia. Future developers.', tags: ['asia', 'youth', 'education'], country: 'Asia' },
];

// ============================================================
// CATEGORY 7: YOUTUBE / CONTENT CREATORS - ASIA (20)
// ============================================================
const youtubeCreators = [
  // JAPAN
  { name: 'Japanese Game Dev YouTubers', platform: 'youtube', communityType: 'gamedev-general', estimatedReach: 100000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'Japanese game dev content creators. Unity/UE tutorials.', tags: ['japan', 'youtube', 'tutorial'], country: 'Japan' },
  { name: 'NicoNico Game Creation', platform: 'youtube', communityType: 'gamedev-general', estimatedReach: 50000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, targetDemographic: true, notes: 'NicoNico game dev content. RPG Maker playthroughs.', tags: ['japan', 'niconico', 'gamedev'], country: 'Japan' },
  { name: 'RPG Maker JP Creators', platform: 'youtube', communityType: 'engine-specific', estimatedReach: 30000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: true, activeCommunity: true, targetDemographic: true, notes: 'STRONG FIT. Japanese RPG Maker tutorials. Narrative focus.', tags: ['japan', 'rpgmaker', 'tutorial'], country: 'Japan' },
  
  // CHINA
  { name: 'Bilibili Game Dev Creators', platform: 'youtube', communityType: 'gamedev-general', estimatedReach: 500000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://bilibili.com', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, largeReach: true, notes: 'STRONG FIT. Chinese game dev tutorials on Bilibili. Massive reach.', tags: ['china', 'bilibili', 'tutorial'], country: 'China' },
  { name: 'Chinese Unity Tutorials', platform: 'youtube', communityType: 'engine-specific', estimatedReach: 200000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, notes: 'Chinese Unity tutorials. Bilibili dominant.', tags: ['china', 'unity', 'tutorial'], country: 'China' },
  { name: 'Douyin Game Dev', platform: 'youtube', communityType: 'gamedev-general', estimatedReach: 100000, engagementQuality: 'medium', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, notes: 'Chinese TikTok. Short-form game dev content.', tags: ['china', 'douyin', 'short-form'], country: 'China' },
  
  // KOREA
  { name: 'Korean Game Dev YouTubers', platform: 'youtube', communityType: 'gamedev-general', estimatedReach: 50000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'Korean game dev content. Unity/UE focus.', tags: ['korea', 'youtube', 'tutorial'], country: 'South Korea' },
  { name: 'Korean Indie Devlog Creators', platform: 'youtube', communityType: 'gamedev-general', estimatedReach: 20000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, targetDemographic: true, notes: 'Korean indie devlogs. Growing scene.', tags: ['korea', 'devlog', 'indie'], country: 'South Korea' },
  
  // TAIWAN
  { name: 'Taiwan Game Dev YouTubers', platform: 'youtube', communityType: 'gamedev-general', estimatedReach: 20000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, targetDemographic: true, notes: 'Taiwanese game dev content.', tags: ['taiwan', 'youtube', 'gamedev'], country: 'Taiwan' },
  
  // SOUTHEAST ASIA
  { name: 'SEA Game Dev YouTubers', platform: 'youtube', communityType: 'gamedev-general', estimatedReach: 30000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'Southeast Asian game dev content. English often.', tags: ['sea', 'youtube', 'gamedev'], country: 'Southeast Asia' },
  { name: 'Singapore Game Dev Content', platform: 'youtube', communityType: 'gamedev-general', estimatedReach: 5000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, targetDemographic: true, lowSaturation: true, notes: 'Singapore game dev YouTubers.', tags: ['singapore', 'youtube', 'gamedev'], country: 'Singapore' },
  { name: 'Indonesian Game Dev YouTube', platform: 'youtube', communityType: 'gamedev-general', estimatedReach: 20000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, targetDemographic: true, notes: 'Indonesian game dev tutorials.', tags: ['indonesia', 'youtube', 'tutorial'], country: 'Indonesia' },
  
  // VN/NARRATIVE FOCUSED
  { name: 'Asian VN Let\'s Play Creators', platform: 'youtube', communityType: 'narrative-tools', estimatedReach: 100000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: true, activeCommunity: true, notes: 'VN Let\'s Play channels. Promotion opportunity.', tags: ['asia', 'visual-novel', 'lets-play'], country: 'Asia' },
  { name: 'Otome Game YouTubers', platform: 'youtube', communityType: 'narrative-tools', estimatedReach: 50000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: true, activeCommunity: true, notes: 'Otome game content creators. Strong community.', tags: ['asia', 'otome', 'youtube'], country: 'Asia' },
  { name: 'JRPG Content Creators', platform: 'youtube', communityType: 'narrative-tools', estimatedReach: 200000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: true, activeCommunity: true, notes: 'JRPG-focused YouTubers. Indie coverage potential.', tags: ['asia', 'jrpg', 'youtube'], country: 'Asia' },
  
  // TOOL REVIEW / TUTORIAL
  { name: 'Asian Tool Review Channels', platform: 'youtube', communityType: 'gamedev-general', estimatedReach: 30000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, notes: 'Asian game dev tool reviews. Partnership opportunity.', tags: ['asia', 'tools', 'review'], country: 'Asia' },
  { name: 'Chinese Tool Tutorial Creators', platform: 'youtube', communityType: 'gamedev-general', estimatedReach: 100000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, notes: 'STRONG FIT. Chinese game dev tool tutorials. Bilibili.', tags: ['china', 'tools', 'tutorial'], country: 'China' },
  { name: 'Japanese Tool Tutorial Creators', platform: 'youtube', communityType: 'gamedev-general', estimatedReach: 30000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, notes: 'Japanese tool tutorials. Wolf RPG, RPG Maker.', tags: ['japan', 'tools', 'tutorial'], country: 'Japan' },
  { name: 'Korean Tool Tutorial Creators', platform: 'youtube', communityType: 'gamedev-general', estimatedReach: 15000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, notes: 'Korean tool tutorials. Unity focus.', tags: ['korea', 'tools', 'tutorial'], country: 'South Korea' },
  { name: 'Indie Spotlight Channels (Asia)', platform: 'youtube', communityType: 'gamedev-general', estimatedReach: 50000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'Asian indie game spotlight channels. Coverage opportunity.', tags: ['asia', 'indie', 'spotlight'], country: 'Asia' },
];

// ============================================================
// CATEGORY 8: PROFESSIONAL ASSOCIATIONS - ASIA (20)
// ============================================================
const associations = [
  // JAPAN
  { name: 'CEDEC (CESA Developers Conference)', platform: 'association', communityType: 'gamedev-general', estimatedReach: 10000, engagementQuality: 'high', accessMethod: 'paid', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, notes: 'STRONG FIT. Japan largest game dev conference. Tool presentations.', tags: ['japan', 'cedec', 'conference', 'cesa'], country: 'Japan' },
  { name: 'CESA (Computer Entertainment Suppliers Association)', platform: 'association', communityType: 'gamedev-general', estimatedReach: 5000, engagementQuality: 'high', accessMethod: 'paid', platformUrl: '', narrativeFocused: false, activeCommunity: true, notes: 'Japan industry association. TGS organizer.', tags: ['japan', 'cesa', 'association', 'industry'], country: 'Japan' },
  { name: 'IGDA Japan', platform: 'association', communityType: 'gamedev-general', estimatedReach: 2000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'IGDA Japan chapter. Meetups. Tool workshops.', tags: ['japan', 'igda', 'chapter'], country: 'Japan' },
  { name: 'BitSummit Organizers', platform: 'association', communityType: 'jam-community', estimatedReach: 500, engagementQuality: 'high', accessMethod: 'application', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, lowSaturation: true, notes: 'BitSummit organization. Sponsor/exhibitor connections.', tags: ['japan', 'bitsummit', 'organizer'], country: 'Japan' },
  
  // KOREA
  { name: 'Korea Mobile Game Association', platform: 'association', communityType: 'gamedev-general', estimatedReach: 3000, engagementQuality: 'high', accessMethod: 'paid', platformUrl: '', narrativeFocused: false, activeCommunity: true, notes: 'Korean mobile game industry. BIC Festival partner.', tags: ['korea', 'mobile', 'association'], country: 'South Korea' },
  { name: 'IGDA Korea', platform: 'association', communityType: 'gamedev-general', estimatedReach: 1500, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'IGDA Korea chapter.', tags: ['korea', 'igda', 'chapter'], country: 'South Korea' },
  { name: 'BIC Organizing Committee', platform: 'association', communityType: 'jam-community', estimatedReach: 500, engagementQuality: 'high', accessMethod: 'application', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, lowSaturation: true, notes: 'BIC Festival organization. Sponsor/exhibitor connections.', tags: ['korea', 'bic', 'organizer'], country: 'South Korea' },
  { name: 'Korean Game Developers Association', platform: 'association', communityType: 'gamedev-general', estimatedReach: 5000, engagementQuality: 'high', accessMethod: 'paid', platformUrl: '', narrativeFocused: false, activeCommunity: true, notes: 'Korean game industry association.', tags: ['korea', 'association', 'industry'], country: 'South Korea' },
  
  // CHINA
  { name: 'CiGA (China Indie Game Alliance)', platform: 'association', communityType: 'gamedev-general', estimatedReach: 10000, engagementQuality: 'high', accessMethod: 'public', platformUrl: 'https://ciga.me', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'EXCELLENT FIT. China indie alliance. indiePlay, WePlay, Game Jams. Key partnership.', tags: ['china', 'ciga', 'alliance', 'indie'], country: 'China' },
  { name: 'China Game Developers Association', platform: 'association', communityType: 'gamedev-general', estimatedReach: 10000, engagementQuality: 'medium', accessMethod: 'paid', platformUrl: '', narrativeFocused: false, activeCommunity: true, notes: 'Official Chinese game industry association.', tags: ['china', 'association', 'industry'], country: 'China' },
  { name: 'IGDA China', platform: 'association', communityType: 'gamedev-general', estimatedReach: 1000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, lowSaturation: true, notes: 'IGDA China chapter. Limited due to firewall.', tags: ['china', 'igda', 'chapter'], country: 'China' },
  
  // TAIWAN
  { name: 'Taiwan Game Industry Association', platform: 'association', communityType: 'gamedev-general', estimatedReach: 2000, engagementQuality: 'high', accessMethod: 'paid', platformUrl: '', narrativeFocused: false, activeCommunity: true, notes: 'Taiwan industry association. TGS organizer.', tags: ['taiwan', 'association', 'industry'], country: 'Taiwan' },
  { name: 'IGDA Taiwan', platform: 'association', communityType: 'gamedev-general', estimatedReach: 1000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, lowSaturation: true, notes: 'IGDA Taiwan chapter.', tags: ['taiwan', 'igda', 'chapter'], country: 'Taiwan' },
  
  // SOUTHEAST ASIA
  { name: 'IGDA Singapore', platform: 'association', communityType: 'gamedev-general', estimatedReach: 1000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, lowSaturation: true, notes: 'IGDA Singapore chapter. Active community.', tags: ['singapore', 'igda', 'chapter'], country: 'Singapore' },
  { name: 'MDEC (Malaysia Digital Economy Corp)', platform: 'association', communityType: 'gamedev-general', estimatedReach: 2000, engagementQuality: 'high', accessMethod: 'paid', platformUrl: '', narrativeFocused: false, activeCommunity: true, notes: 'Malaysian digital economy. Game dev support.', tags: ['malaysia', 'mdec', 'government'], country: 'Malaysia' },
  { name: 'AGI (Asosiasi Game Indonesia)', platform: 'association', communityType: 'gamedev-general', estimatedReach: 2000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'Indonesian game association. Growing rapidly.', tags: ['indonesia', 'agi', 'association'], country: 'Indonesia' },
  { name: 'GDAP (Philippines)', platform: 'association', communityType: 'gamedev-general', estimatedReach: 1500, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, toolFriendly: true, targetDemographic: true, notes: 'Game Developers Association of the Philippines.', tags: ['philippines', 'gdap', 'association'], country: 'Philippines' },
  { name: 'Vietnam Game Dev Association', platform: 'association', communityType: 'gamedev-general', estimatedReach: 1000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, targetDemographic: true, lowSaturation: true, notes: 'Vietnamese game association. Emerging.', tags: ['vietnam', 'association'], country: 'Vietnam' },
  { name: 'Thai Game Industry Association', platform: 'association', communityType: 'gamedev-general', estimatedReach: 1000, engagementQuality: 'high', accessMethod: 'public', platformUrl: '', narrativeFocused: false, activeCommunity: true, targetDemographic: true, lowSaturation: true, notes: 'Thai game industry. gamescom asia host.', tags: ['thailand', 'association'], country: 'Thailand' },
  { name: 'Asia Game Business Summit', platform: 'association', communityType: 'gamedev-general', estimatedReach: 2000, engagementQuality: 'high', accessMethod: 'paid', platformUrl: '', narrativeFocused: false, activeCommunity: true, notes: 'Pan-Asia game business. B2B networking.', tags: ['asia', 'b2b', 'summit'], country: 'Asia' },
];

// ============================================================
// MAIN
// ============================================================
const allCategories = [
  { name: 'Game Jams (Asia)', leads: gameJams },
  { name: 'Narrative Tools (Asia)', leads: narrativeTools },
  { name: 'Indie Platforms (Asia)', leads: indiePlatforms },
  { name: 'Discord/Social (Asia)', leads: discordCommunities },
  { name: 'Reddit/Forums (Asia)', leads: redditCommunities },
  { name: 'Universities (Asia)', leads: universities },
  { name: 'YouTube/Content (Asia)', leads: youtubeCreators },
  { name: 'Associations (Asia)', leads: associations },
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
        country: c.country || '',
        location: '',
        website: c.platformUrl || '',
        tags: [...(c.tags || []), 'asia'],
        notes: c.notes,
        contact: { name: '', role: '', email: '', phone: '', linkedin: '' },
        community: {
          platform: c.platform,
          communityType: c.communityType,
          estimatedReach: c.estimatedReach,
          engagementQuality: c.engagementQuality,
          accessMethod: c.accessMethod,
          platformUrl: c.platformUrl || '',
          narrativeFocus: c.narrativeFocused || false,
          referralCode: '',
          betaSignupsAttributed: 0,
          fitScore: fitScore,
          fitCriteria: {
            narrativeFocused: c.narrativeFocused || false,
            activeCommunity: c.activeCommunity || false,
            toolFriendly: c.toolFriendly || false,
            targetDemographic: c.targetDemographic || false,
            largeReach: c.largeReach || false,
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
  
  console.log(`\n=== TOTAL: ${totalCount} Asian community leads added ===`);
  
  // Summary stats
  const allLeads = allCategories.flatMap(c => c.leads);
  const narrativeFocused = allLeads.filter(l => l.narrativeFocused).length;
  const highFit = allLeads.filter(l => calcFitScore(l) >= 10).length;
  const totalReach = allLeads.reduce((sum, l) => sum + l.estimatedReach, 0);
  
  // By country
  const byCountry = {};
  allLeads.forEach(l => { 
    const country = l.country || 'Asia';
    byCountry[country] = (byCountry[country] || 0) + 1; 
  });
  
  console.log(`\nStats:`);
  console.log(`  Narrative-focused: ${narrativeFocused}`);
  console.log(`  High fit (10+): ${highFit}`);
  console.log(`  Total estimated reach: ${totalReach.toLocaleString()}`);
  console.log(`\nBy country/region:`);
  Object.entries(byCountry).sort((a,b) => b[1] - a[1]).forEach(([k,v]) => console.log(`  ${k}: ${v}`));
  
  process.exit(0);
}

main();
