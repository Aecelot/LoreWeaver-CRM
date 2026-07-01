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

// Taiwanese Studios - Comprehensive list
const studios = [
  // TIER 1: Narrative Excellence (Fit 95+)
  { name: 'Red Candle Games', games: ['Detention', 'Devotion', 'Nine Sols'], focus: 'Horror/Action Adventure', fitScore: 98, website: 'https://redcandlegames.com/', location: 'Taipei', notes: 'Founded 2015, 6 people. Designer: Coffee Yao. IndieCade Journey Award winner. Famitsu coverage.' },
  { name: 'SIGONO', games: ['OPUS: The Day We Found Earth', 'OPUS: Rocket of Whispers', 'OPUS: Echo of Starsong'], focus: 'Emotional Adventure', fitScore: 98, website: 'https://www.sigono.com/', location: 'Taiwan', notes: 'Founded 2013 by Brian Lee & Scott Chen. 10M+ downloads. First Taiwanese game in Famitsu Platinum Hall of Fame.' },
  { name: 'Rayark', games: ['Cytus', 'Cytus II', 'Deemo', 'VOEZ', 'Sdorica', 'Implosion'], focus: 'Rhythm/RPG', fitScore: 95, website: 'https://www.rayark.com/', location: 'Taipei', notes: 'Founded Sept 2011. Tokyo branch. Publisher of MO:Astray.' },
  
  // TIER 2: Strong Narrative Studios
  { name: 'Archpray Inc.', games: ['MO:Astray'], focus: 'Puzzle Platformer', fitScore: 90, website: 'https://en.archpray.net/', location: 'Southern Taiwan', notes: 'Young team (avg age <25). Published by Rayark. Started from graduate project.' },
  { name: 'Softstar Entertainment', games: ['Sword and Fairy', 'Xuan-Yuan Sword', 'The Legend of Heroes'], focus: 'Chinese RPG', fitScore: 90, website: 'https://www.softstar.com.tw/', location: 'New Taipei', notes: 'DOMO Studio subsidiary. Beijing/Shanghai/Xiamen branches. Classic Chinese RPG.' },
  { name: 'DOMO Studio', games: ['Sword and Fairy series'], focus: 'RPG', fitScore: 88, website: '', location: 'Taiwan', notes: 'Softstar subsidiary. Classic Chinese RPG series.' },
  
  // TIER 3: Taipei Game Show Indie House
  { name: 'YOHCAN Studio', games: ['Indie titles'], focus: 'Indie', fitScore: 75, website: '', location: 'Taiwan', notes: 'TGS 2025 exhibitor.' },
  { name: 'Game Nobility', games: ['Indie titles'], focus: 'Indie', fitScore: 75, website: '', location: 'Taiwan', notes: 'TGS 2025 exhibitor.' },
  { name: 'Gamtropy', games: ['Indie titles'], focus: 'Indie', fitScore: 75, website: '', location: 'Taiwan', notes: 'TGS 2025 exhibitor.' },
  { name: 'ASAX GAME', games: ['Indie titles'], focus: 'Indie', fitScore: 75, website: '', location: 'Taiwan', notes: 'TGS 2025 exhibitor.' },
  { name: 'Poly Poly Games', games: ['Indie titles'], focus: 'Indie', fitScore: 75, website: '', location: 'Taiwan', notes: 'TGS 2025 exhibitor.' },
  { name: '7QUARK', games: ['Indie titles'], focus: 'Indie', fitScore: 80, website: '', location: 'Taiwan', notes: 'TGS exhibitor, notable Taiwanese indie.' },
  
  // TIER 4: Publishers/Larger Studios
  { name: 'eastasiasoft', games: ['Publisher - dungeon RPGs'], focus: 'Publisher', fitScore: 80, website: 'https://www.eastasiasoft.com/', location: 'Hong Kong/Taiwan', notes: 'Indie publisher, Tokyo Clanpool.' },
  { name: 'Soft-World International', games: ['Publisher/Distributor'], focus: 'Publisher', fitScore: 65, website: '', location: 'Taiwan', notes: 'Major Taiwanese game distributor.' },
  { name: 'XPEC Entertainment', games: ['Various'], focus: 'Developer', fitScore: 70, website: '', location: 'Taiwan', notes: 'Taiwanese developer.' },
  { name: 'UserJoy Technology', games: ['MMO games'], focus: 'MMO', fitScore: 60, website: '', location: 'Taiwan', notes: 'MMO developer.' },
  { name: 'Runewaker Entertainment', games: ['Runes of Magic', 'Dragon\'s Prophet'], focus: 'MMO', fitScore: 65, website: '', location: 'Taiwan', notes: 'MMO developer.' },
  
  // Additional notable studios
  { name: 'Ukiyo Studios', games: ['Localization/Publishing'], focus: 'Localization', fitScore: 70, website: 'https://www.ukiyostudios.com/', location: 'Taiwan/Asia', notes: 'Asian game localization specialists. 150+ projects.' },
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
    const focusLower = studio.focus.toLowerCase();
    if (focusLower.includes('adventure') || focusLower.includes('horror') || focusLower.includes('emotional')) {
      fitTags.push('Narrative Focus');
    }
    if (focusLower.includes('rpg')) {
      fitTags.push('Narrative Focus');
    }
    if (focusLower.includes('rhythm') || focusLower.includes('puzzle')) {
      fitTags.push('Gameplay Focus');
    }
    
    // Determine priority
    const priority = studio.fitScore >= 95 ? 'high' : studio.fitScore >= 85 ? 'medium' : 'none';
    
    // Create lead
    await db.collection('leads').add({
      name: studio.name,
      type: 'studio',
      website: studio.website,
      country: 'Taiwan',
      location: studio.location || 'Taiwan',
      status: 'new',
      priority: priority,
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
        type: studio.focus.includes('Publisher') ? 'Publisher' : 'Developer',
        games: studio.games,
        focus: studio.focus,
        fitScore: studio.fitScore,
        fitReason: studio.notes || 'Taiwanese studio - ' + studio.focus,
        fitTags: fitTags,
      },
      tags: ['taiwan', 'asia'],
      notes: studio.notes || '',
      pipeline: {
        id: STUDIO_PIPELINE_ID,
        stageId: 'new-lead',
      },
      metadata: {
        source: 'taiwan-research-2026-03-07',
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
