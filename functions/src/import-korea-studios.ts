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

// Korean Studios to import
const studios = [
  // Priority 1: Narrative-focused
  {
    name: 'Hoochoo Game Studios',
    website: '',
    games: ['No Umbrellas Allowed'],
    focus: 'Narrative Adventure',
    fitScore: 85,
    country: 'South Korea',
  },
  {
    name: 'NONIL GAME STUDIOS',
    website: '',
    games: ['MY DIVORCE STORY'],
    focus: 'Life Sim / Narrative',
    fitScore: 80,
    country: 'South Korea',
  },
  {
    name: 'Muroo Games',
    website: '',
    games: ['The Tale of Sohyun'],
    focus: 'Korean Historical Narrative',
    fitScore: 85,
    country: 'South Korea',
  },
  {
    name: 'DOTORIS',
    website: '',
    games: ['Lynn, The Girl Drawn On Puzzles'],
    focus: 'Puzzle Narrative',
    fitScore: 80,
    country: 'South Korea',
  },
  {
    name: 'Team OOPArts',
    website: '',
    games: ['Frostory'],
    focus: 'Adventure',
    fitScore: 75,
    country: 'South Korea',
  },
  {
    name: 'PROJECT MOREUM',
    website: '',
    games: ['Shutter Nyang'],
    focus: 'Photography Adventure',
    fitScore: 75,
    country: 'South Korea',
  },
  {
    name: 'No More 500',
    website: '',
    games: ['Suhoshin'],
    focus: 'Historical Thriller Visual Novel',
    fitScore: 90,
    country: 'South Korea',
  },
  
  // Priority 2: RPG/Adventure
  {
    name: 'Rootless Studio',
    website: '',
    games: ["8Doors: Arum's Afterlife Adventure"],
    focus: 'Action RPG',
    fitScore: 80,
    country: 'South Korea',
  },
  {
    name: 'Dave Studio',
    website: '',
    games: ['Luna: The Dimension Watcher'],
    focus: 'Adventure',
    fitScore: 75,
    country: 'South Korea',
  },
  {
    name: 'Healiasoft',
    website: '',
    games: ['RHYNK'],
    focus: 'Adventure',
    fitScore: 70,
    country: 'South Korea',
  },
  {
    name: 'QueseraGames',
    website: '',
    games: ['KALPA'],
    focus: 'RPG',
    fitScore: 75,
    country: 'South Korea',
  },
  {
    name: 'Giant Dice',
    website: '',
    games: ['Dungeon Rogue: Legendary Adventure'],
    focus: 'Roguelike RPG',
    fitScore: 70,
    country: 'South Korea',
  },
  {
    name: 'LOADSTARS',
    website: '',
    games: ['Fated Alive'],
    focus: 'Adventure',
    fitScore: 70,
    country: 'South Korea',
  },
  
  // BIC Festival participants
  {
    name: 'Pengonauts',
    website: '',
    games: ['StarVaders'],
    focus: 'Indie',
    fitScore: 65,
    country: 'South Korea',
  },
  {
    name: 'Ada Eden',
    website: '',
    games: ['1001 Nights'],
    focus: 'Adventure',
    fitScore: 70,
    country: 'South Korea',
  },
  {
    name: 'Studio Sinkhole',
    website: '',
    games: [],
    focus: 'Indie',
    fitScore: 60,
    country: 'South Korea',
  },
  {
    name: 'Visuallight Co., Ltd',
    website: '',
    games: ['Wolf and Pigs'],
    focus: 'Adventure',
    fitScore: 65,
    country: 'South Korea',
  },
  
  // Other INDIECRAFT studios
  {
    name: 'Buildupgames inc.',
    website: '',
    games: ['Tile Tactics: Battle Arena'],
    focus: 'Strategy',
    fitScore: 50,
    country: 'South Korea',
  },
  {
    name: 'Onfire Games',
    website: '',
    games: ['Brain Meltdown'],
    focus: 'Puzzle',
    fitScore: 50,
    country: 'South Korea',
  },
  {
    name: 'THE BRICKS',
    website: '',
    games: ['30 Days'],
    focus: 'Simulation',
    fitScore: 55,
    country: 'South Korea',
  },
  {
    name: 'Team Croissant',
    website: '',
    games: ['URLATE'],
    focus: 'Rhythm',
    fitScore: 45,
    country: 'South Korea',
  },
  {
    name: 'BigRadar Co., Ltd.',
    website: '',
    games: ['BATTLE FLEX'],
    focus: 'Action',
    fitScore: 45,
    country: 'South Korea',
  },
  {
    name: 'NANALI STUDIOS',
    website: '',
    games: ['FOREST ISLAND'],
    focus: 'Simulation',
    fitScore: 50,
    country: 'South Korea',
  },
  {
    name: 'Ozaak, Inc.',
    website: '',
    games: ['Acretia'],
    focus: 'Action',
    fitScore: 50,
    country: 'South Korea',
  },
  {
    name: 'Round8 Studio',
    website: '',
    games: ['Lies of P'],
    focus: 'Souls-like RPG',
    fitScore: 85,
    country: 'South Korea',
  },
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
    
    // Create lead
    await db.collection('leads').add({
      name: studio.name,
      type: 'studio',
      website: studio.website,
      country: studio.country,
      location: 'South Korea',
      status: 'new',
      priority: 'none',
      owner: '',
      contact: {
        name: '',
        role: '',
        email: '',
        phone: '',
        linkedin: '',
      },
      studio: {
        size: 'indie',
        type: 'Developer',
        games: studio.games,
        focus: studio.focus,
        fitScore: studio.fitScore,
        fitReason: 'Korean indie studio from INDIECRAFT/BIC Festival',
        fitTags: studio.fitScore >= 80 ? ['Narrative Focus'] : [],
      },
      tags: ['korea', 'indiecraft'],
      notes: '',
      pipeline: {
        id: STUDIO_PIPELINE_ID,
        stageId: 'new-lead',
      },
      metadata: {
        source: 'korea-research-2026-03-07',
        region: 'asia',
      },
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now(),
      createdBy: 'skel-import',
    });
    
    console.log(`IMPORTED: ${studio.name} (fit: ${studio.fitScore})`);
    imported++;
  }
  
  console.log(`\nDone! Imported: ${imported}, Skipped: ${skipped}`);
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
