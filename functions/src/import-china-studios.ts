import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccountPath = path.resolve(__dirname, '../../service-account.json');
const serviceAccount = require(serviceAccountPath);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

// Chinese Studios - Comprehensive list
const studios = [
  // TIER 1: Major Narrative/Story-Heavy (HIGH PRIORITY)
  { name: 'miHoYo / HoYoverse', games: ['Genshin Impact', 'Honkai: Star Rail', 'Zenless Zone Zero', 'Tears of Themis'], focus: 'Open World RPG / Otome', fitScore: 95, website: 'https://www.mihoyo.com/', location: 'Shanghai' },
  { name: 'Game Science', games: ['Black Myth: Wukong', 'Black Myth: Zhong Kui'], focus: 'AAA Action RPG', fitScore: 95, website: 'https://www.gamesci.com.cn/', location: 'Hangzhou' },
  { name: 'Hypergryph', games: ['Arknights', 'Arknights: Endfield'], focus: 'Tactical RPG', fitScore: 95, website: 'https://www.hypergryph.com/', location: 'Shanghai' },
  { name: 'Papergames', games: ['Infinity Nikki', 'Love and Producer', 'Shining Nikki', 'Love and Deepspace'], focus: 'Otome / Dress-up', fitScore: 95, website: 'https://www.papegames.net/', location: 'Suzhou' },
  { name: 'Kuro Games', games: ['Wuthering Waves', 'Punishing: Gray Raven'], focus: 'Action RPG', fitScore: 90, website: 'https://www.kurogames.com/', location: 'Guangzhou' },
  
  // TIER 2: Indie Publishers/Leaders
  { name: 'Coconut Island Games', games: ['Publisher/Developer'], focus: 'Indie Publisher', fitScore: 85, website: 'https://coconut-island.com/', location: 'Shanghai' },
  { name: 'Pixpil', games: ['Eastward'], focus: 'Pixel Art Adventure', fitScore: 95, website: '', location: 'Shanghai' },
  { name: 'NExT Studios', games: ['Biped', 'Crown Trick', 'SYNCED'], focus: 'Indie (Tencent)', fitScore: 85, website: 'https://www.nextstudios.com/', location: 'Shenzhen' },
  { name: 'Astrolabe Games', games: ['Shanghai Summer'], focus: 'Visual Novel', fitScore: 95, website: '', location: 'China' },
  
  // TIER 3: Mobile/Gacha (Story-Heavy)
  { name: 'Yostar', games: ['Azur Lane publisher', 'Arknights publisher'], focus: 'Publisher', fitScore: 80, website: 'https://www.yostar.co.jp/', location: 'Shanghai' },
  { name: 'Manjuu / Yongshi', games: ['Azur Lane'], focus: 'Mobile RPG', fitScore: 80, website: '', location: 'Shanghai' },
  { name: 'Sunborn / MICA Team', games: ['Girls\' Frontline', 'Girls\' Frontline 2', 'Neural Cloud'], focus: 'Tactical RPG', fitScore: 90, website: 'https://www.sunborngame.com/', location: 'Shanghai' },
  { name: 'Lilith Games', games: ['AFK Arena', 'Rise of Kingdoms', 'Dislyte'], focus: 'Mobile RPG', fitScore: 75, website: 'https://www.lilithgames.com/', location: 'Shanghai' },
  { name: 'Infold Games', games: ['Love and Deepspace'], focus: 'Otome', fitScore: 90, website: '', location: 'Shanghai' },
  
  // TIER 4: Indie Scene
  { name: 'Echo Games', games: ['Indie action'], focus: 'Action', fitScore: 70, website: '', location: 'China' },
  { name: 'Team Ladybug', games: ['Record of Lodoss War'], focus: 'Metroidvania', fitScore: 75, website: '', location: 'China' },
  { name: 'Softstar Beijing', games: ['Xuan-Yuan Sword', 'Sword and Fairy'], focus: 'Chinese RPG', fitScore: 90, website: 'https://www.softstar.com.tw/', location: 'Beijing' },
  { name: 'Aurogon Shanghai', games: ['Sword and Fairy: Together Forever'], focus: 'Action RPG', fitScore: 85, website: '', location: 'Shanghai' },
  
  // TIER 5: VN/Story Publishers
  { name: 'XD Inc.', games: ['TapTap platform'], focus: 'Platform/Publisher', fitScore: 70, website: 'https://www.xd.com/', location: 'Shanghai' },
  { name: 'Bilibili Gaming', games: ['FGO CN publisher', 'Various'], focus: 'Publisher/Platform', fitScore: 75, website: 'https://www.bilibili.com/', location: 'Shanghai' },
  { name: 'indienova', games: ['Indie platform'], focus: 'Platform', fitScore: 75, website: 'https://indienova.com/', location: 'China' },
  
  // TIER 6: RPG Specialists
  { name: 'Pathea Games', games: ['My Time at Portia', 'My Time at Sandrock'], focus: 'Life Sim RPG', fitScore: 85, website: 'https://pathea.net/', location: 'Chongqing' },
  { name: 'Thermite Games', games: ['Immortal Life'], focus: 'Life Sim', fitScore: 80, website: '', location: 'China' },
  { name: 'Wangyuan Shengtang', games: ['Tale of Immortal'], focus: 'Xianxia RPG', fitScore: 85, website: '', location: 'China' },
  { name: 'Leenzee Games', games: ['The Rewinder', 'The Matchmaker'], focus: 'Adventure/Puzzle', fitScore: 90, website: '', location: 'China' },
  { name: 'Giant Network', games: ['Pascal\'s Wager'], focus: 'Soulslike', fitScore: 80, website: 'https://www.ztgame.com/', location: 'Shanghai' },
  
  // TIER 7: Horror/Narrative
  { name: 'Chilla\'s Art', games: ['Horror games'], focus: 'Horror', fitScore: 75, website: '', location: 'China' },
  { name: 'GuiGu Studio', games: ['Chinese Parents'], focus: 'Simulation', fitScore: 80, website: '', location: 'China' },
  { name: 'YuanGong Studio', games: ['Bright Memory'], focus: 'FPS/Action', fitScore: 70, website: '', location: 'Shenzhen' },
  
  // TIER 8: Community/Organizations
  { name: 'CiGA (China Indie Game Alliance)', games: ['WePlay Expo', 'indiePlay Awards'], focus: 'Organization', fitScore: 80, website: 'https://www.ciga.me/', location: 'Shanghai' },
];

async function main() {
  const STUDIO_PIPELINE_ID = 'Yo2OlGZdFFMWkFTr0n08';
  let imported = 0;
  let skipped = 0;
  
  for (const studio of studios) {
    // Check if already exists
    const existing = await db.collection('leads')
      .where('name', '==', studio.name)
      .limit(1)
      .get();
    
    if (!existing.empty) {
      console.log(`SKIP (exists): ${studio.name}`);
      skipped++;
      continue;
    }
    
    const fitTags: string[] = [];
    if (studio.focus.toLowerCase().includes('visual novel') || studio.focus.toLowerCase().includes('vn')) {
      fitTags.push('Narrative Focus');
    }
    if (studio.focus.toLowerCase().includes('rpg')) {
      fitTags.push('Narrative Focus');
    }
    if (studio.focus.toLowerCase().includes('otome')) {
      fitTags.push('Narrative Focus');
    }
    if (studio.focus.toLowerCase().includes('adventure')) {
      fitTags.push('Narrative Focus');
    }
    
    // Create lead
    await db.collection('leads').add({
      name: studio.name,
      type: 'studio',
      website: studio.website,
      country: 'China',
      location: studio.location || 'China',
      status: 'new',
      priority: studio.fitScore >= 90 ? 'medium' : 'none',
      owner: '',
      contact: {
        name: '',
        role: '',
        email: '',
        phone: '',
        linkedin: '',
      },
      studio: {
        size: studio.name.includes('miHoYo') || studio.name.includes('NetEase') || studio.name.includes('Tencent') ? 'large' : 'indie',
        type: studio.focus.includes('Publisher') ? 'Publisher' : 'Developer',
        games: studio.games,
        focus: studio.focus,
        fitScore: studio.fitScore,
        fitReason: 'Chinese studio - ' + studio.focus,
        fitTags: fitTags,
      },
      tags: ['china', 'asia'],
      notes: '',
      pipeline: {
        id: STUDIO_PIPELINE_ID,
        stageId: 'new-lead',
      },
      metadata: {
        source: 'china-research-2026-03-07',
        region: 'asia',
      },
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now(),
      createdBy: 'skel-import',
    });
    
    console.log(`IMPORTED: ${studio.name} (${studio.focus}, fit: ${studio.fitScore})`);
    imported++;
  }
  
  console.log(`\n===========================`);
  console.log(`Imported: ${imported}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`===========================`);
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
