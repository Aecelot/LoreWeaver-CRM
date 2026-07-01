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

// Pakistan Studios - Deep Dive Research 2026-03-08
const studios = [
  // ==================== MAJOR STUDIOS ====================
  { 
    name: 'Caramel Tech Studios', 
    games: ['Blades of Battle', 'Fruit Ninja (co-dev)', 'Jetpack Joyride (co-dev)'], 
    focus: 'Mid-Core SLG/RPG Mobile', 
    fitScore: 88, 
    website: 'https://www.carameltechstudios.com/', 
    location: 'Lahore', 
    country: 'Pakistan',
    notes: 'Founded by three brothers. Worked on Fruit Ninja + Jetpack Joyride. Specializes in Mid-Core SLG/RPG games, machine learning, high-end mobile. Also launched Fizz (SF startup) for real-time translation. 3.9K LinkedIn followers. MAJOR RPG expertise.' 
  },
  { 
    name: 'Mindstorm Studios', 
    games: ['Cricket Revolution', 'War Inc.', 'Hospital Inc.', 'ICC 2011', 'Whacksy Taxi'], 
    focus: 'Mobile/Casual/Hypercasual', 
    fitScore: 80, 
    website: '', 
    location: 'Lahore', 
    country: 'Pakistan',
    notes: 'Founded 2006. 15+ years experience. Pakistan leading mobile game studio. 46.5K LinkedIn, 10K Facebook. Runs NEWSTORMERS talent training program. Partnered with top publishers. Chart-topping casual/hypercasual games.' 
  },
  { 
    name: 'FRAG Games', 
    games: ['Life in Willowdale', '40+ client projects'], 
    focus: 'Console/PC/Mobile Development', 
    fitScore: 85, 
    website: 'https://www.frag-games.com/', 
    location: 'Lahore', 
    country: 'Pakistan',
    contact: 'Ali Ihsan (CEO)',
    notes: 'Founded 2013 by Rehman Faghihnia Rafiq. **FIRST studio in Pakistan to develop PS5 game** (Life in Willowdale). 40+ projects. Diverse portfolio: Card Games, MMORPGs, Turn-Based Strategy, FPS, JRPGs, Casual. Unity + Unreal. Part of Remote Control Productions family. 5.6K Facebook.' 
  },
  { 
    name: 'We.R.Play', 
    games: ['TBD'], 
    focus: 'Game Development', 
    fitScore: 72, 
    website: '', 
    location: 'Lahore', 
    country: 'Pakistan',
    notes: 'Prominent independent studio. Listed among top game dev companies in Pakistan.' 
  },
  { 
    name: 'Tintash', 
    games: ['TBD'], 
    focus: 'Game Development', 
    fitScore: 70, 
    website: '', 
    location: 'Pakistan', 
    country: 'Pakistan',
    notes: 'Notable studio contributing to Pakistan game development landscape.' 
  },

  // ==================== OTHER STUDIOS ====================
  { 
    name: 'tecHouse Games', 
    games: ['TBD'], 
    focus: 'Game Development', 
    fitScore: 65, 
    website: 'https://techousegames.com/', 
    location: 'Pakistan', 
    country: 'Pakistan',
    notes: 'Game development company. Publishes Top 10 lists of Pakistani studios.' 
  },
  { 
    name: 'Cloudcade', 
    games: ['TBD'], 
    focus: 'Developer/Publisher', 
    fitScore: 70, 
    website: '', 
    location: 'Lahore', 
    country: 'Pakistan',
    notes: 'Developer and Publisher based in Lahore.' 
  },
  { 
    name: 'Finz Games', 
    games: ['TBD'], 
    focus: 'Mobile', 
    fitScore: 60, 
    website: '', 
    location: 'Lahore', 
    country: 'Pakistan',
    notes: 'Mobile game developer in Lahore.' 
  },
  { 
    name: 'Knights Pvt. Ltd', 
    games: ['TBD'], 
    focus: 'Game Development', 
    fitScore: 60, 
    website: '', 
    location: 'Lahore', 
    country: 'Pakistan',
    notes: 'Game development company in Lahore.' 
  },
  { 
    name: 'OZI Technology', 
    games: ['TBD'], 
    focus: 'Game Development', 
    fitScore: 60, 
    website: '', 
    location: 'Pakistan', 
    country: 'Pakistan',
    notes: 'Game development company.' 
  },
  { 
    name: 'Trango Interactive', 
    games: ['TBD'], 
    focus: 'Game Development', 
    fitScore: 60, 
    website: '', 
    location: 'Pakistan', 
    country: 'Pakistan',
    notes: 'Interactive game development.' 
  },
  { 
    name: 'Mizo Studios', 
    games: ['TBD'], 
    focus: 'Game Development', 
    fitScore: 60, 
    website: '', 
    location: 'Pakistan', 
    country: 'Pakistan',
    notes: 'Game development studio.' 
  },
  { 
    name: 'Sablo Studio', 
    games: ['TBD'], 
    focus: 'Game Development', 
    fitScore: 55, 
    website: '', 
    location: 'Pakistan', 
    country: 'Pakistan',
    notes: 'Game development studio.' 
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
    
    const fitTags: string[] = [];
    const focusLower = studio.focus.toLowerCase();
    const notesLower = studio.notes.toLowerCase();
    
    if (focusLower.includes('rpg') || notesLower.includes('rpg')) {
      fitTags.push('RPG');
    }
    if (focusLower.includes('mobile')) {
      fitTags.push('Mobile');
    }
    if (focusLower.includes('console') || notesLower.includes('ps5') || notesLower.includes('playstation')) {
      fitTags.push('Console');
    }
    if (focusLower.includes('pc')) {
      fitTags.push('PC');
    }
    if (notesLower.includes('mmorpg')) {
      fitTags.push('MMORPG');
    }
    
    // Determine priority
    let priority = 'none';
    if (studio.fitScore >= 85) priority = 'medium';
    else if (studio.fitScore >= 75) priority = 'low';
    
    // Tags
    const tags = ['south-asia', 'pakistan', 'lahore'];
    if (studio.fitScore >= 80) tags.push('high-fit');
    
    // Create lead
    await db.collection('leads').add({
      name: studio.name,
      type: 'studio',
      website: studio.website,
      country: studio.country,
      location: studio.location,
      status: 'new',
      priority: priority,
      owner: '',
      contact: {
        name: (studio as any).contact?.split(' (')[0] || '',
        role: (studio as any).contact?.match(/\(([^)]+)\)/)?.[1] || '',
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
        fitReason: studio.notes,
        fitTags: fitTags,
      },
      tags: tags,
      notes: studio.notes,
      pipeline: {
        id: STUDIO_PIPELINE_ID,
        stageId: 'new-lead',
      },
      metadata: {
        source: 'pakistan-research-2026-03-08',
        region: 'south-asia',
      },
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now(),
      createdBy: 'skel-import',
    });
    
    console.log(`IMPORTED: ${studio.name} [${studio.location}] (${studio.focus}, fit: ${studio.fitScore})`);
    imported++;
  }
  
  console.log(`\n===========================`);
  console.log(`Imported: ${imported}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`===========================`);
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
