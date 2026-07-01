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

// Saudi Arabia Studios - Deep Dive Research 2026-03-08
const studios = [
  // ==================== HIGH FIT (Narrative/Cultural Focus) ====================
  { 
    name: 'Manga Productions', 
    games: ['The Journey', 'Future\'s Folktales', 'Asateer', 'Grendizer U', 'Najd (SNK)'], 
    focus: 'Animation/Games/Comics', 
    fitScore: 98, 
    website: 'https://manga.com.sa/', 
    location: 'Riyadh', 
    country: 'Saudi Arabia',
    contact: 'Essam Bukhary (CEO)',
    notes: 'Subsidiary of Misk Foundation (MBS). Joint venture with Toei Animation (Japan). Focus on anime/games with Arabian culture. SNK partnership for Najd character. 100M+ views on Future\'s Folktales. PERFECT FIT - narrative + cultural storytelling.' 
  },
  { 
    name: 'Table Knight Games', 
    games: ['Flipper Knight', 'Barrah Alsafah', 'Jawabak Jawabahom', 'Awaydak'], 
    focus: 'Saudi-Inspired Mobile Games', 
    fitScore: 92, 
    website: 'https://tableknightgames.com/', 
    location: 'Riyadh', 
    country: 'Saudi Arabia',
    notes: 'Founded 2016. "Saudi-inspired games that bring people together". TAQADAM Accelerator. 3M+ downloads. Beautiful character design. AR social app.' 
  },
  { 
    name: 'Spoilz', 
    games: ['Jet Warrior', 'Camel Run', 'Smack Sack', 'Re-Train'], 
    focus: 'Hypercasual/Narrative', 
    fitScore: 88, 
    website: '', 
    location: 'Riyadh', 
    country: 'Saudi Arabia',
    contact: 'Musab Almalki (CEO)',
    notes: 'Founded 2020. $700k pre-seed (Impact46). Won Excellence in Narrative at KAUST Game Jam for Re-Train. Merak Capital backed (2025). B2B/LiveOps services too.' 
  },
  { 
    name: 'GameIT', 
    games: ['Cognitive/Learning Games'], 
    focus: 'Educational Games', 
    fitScore: 80, 
    website: '', 
    location: 'Riyadh', 
    country: 'Saudi Arabia',
    contact: 'Dr. Heba M Atyah (Founder)',
    notes: 'Founded by Dr. Heba M Atyah (human rights, developmental disabilities background). LEAP 2022 Aviatrix Award. Microsoft for Startups. Kids cognitive/social/learning games.' 
  },
  { 
    name: 'Rwaa Games', 
    games: ['2048FACE', 'German War', 'Shas Wars', 'Fight and Conquer'], 
    focus: 'Strategy/History', 
    fitScore: 78, 
    website: '', 
    location: 'Saudi Arabia', 
    country: 'Saudi Arabia',
    notes: 'Arabic-focused market. Strategy + history games. Shas Wars = Middle Eastern history. Fight and Conquer encourages creativity.' 
  },

  // ==================== MAJOR FUNDED STUDIOS ====================
  { 
    name: 'Sandsoft Games', 
    games: ['Pacific Rim: Breach Wars', 'Rambo: Strike Force'], 
    focus: 'Mobile/IP Games', 
    fitScore: 85, 
    website: 'https://sandsoft.com/', 
    location: 'Riyadh', 
    country: 'Saudi Arabia',
    contact: 'David Fernandez (CEO)',
    notes: 'Founded 2020 by Ajlan & Bros. CEO David Fernandez (King veteran). Publishing: Miikka Lindgren (Rovio). Offices: Riyadh, Spain, China, Finland. Press Start talent program. $3.25M invested in Tiny Digital Factory. Vision 2030 aligned.' 
  },
  { 
    name: 'UMX Studio', 
    games: ['King Of Steering (KOS)', 'Climbing Sand Dune (CSD)', 'GST', 'Legend of Drift'], 
    focus: 'Racing/Action Mobile', 
    fitScore: 82, 
    website: 'https://umxstudio.co/', 
    location: 'Riyadh', 
    country: 'Saudi Arabia',
    contact: 'Ali Alharbi (Founder/CEO)',
    notes: 'Founded 2014 by Ali Alharbi. $4.5M funding (Jetapult). 70M+ downloads. 2.9M MAU. 84 employees. First Saudi studio featured by Apple. Al Arabiya TV coverage.' 
  },
  { 
    name: 'Lobah', 
    games: ['Social/Community Games'], 
    focus: 'Social Mobile Games', 
    fitScore: 80, 
    website: '', 
    location: 'Saudi Arabia', 
    country: 'Saudi Arabia',
    notes: 'Fast-rising Saudi indie. $12M funding from Saudi Social Development Bank at LEAP 2025. Social/community-based games focus.' 
  },
  { 
    name: 'Steer Studios', 
    games: ['Grunt Rush', 'Tom and Jerry (WB partnership)'], 
    focus: 'AAA Mobile Games', 
    fitScore: 70, 
    website: 'https://www.steerstudios.com/', 
    location: 'Riyadh', 
    country: 'Saudi Arabia',
    notes: 'Fully owned by SAVVY Games Group ($38B investment arm). AAA aspirations. Warner Bros partnership. 50%+ Saudi nationals. Part of Vision 2030. Probably too big/AAA for Architect but good to track.' 
  },

  // ==================== INFRASTRUCTURE/ECOSYSTEM ====================
  { 
    name: 'SAVVY Games Group', 
    games: ['Investment/Publishing arm'], 
    focus: 'Investment/Publishing', 
    fitScore: 65, 
    website: 'https://www.savvygames.com/', 
    location: 'Riyadh', 
    country: 'Saudi Arabia',
    notes: 'Saudi PIF gaming division. $38B investment commitment. Owns Steer Studios, ESL FACEIT. Stakes in Nintendo, Capcom, EA, Take-Two, Nexon. Olympic Esports Games 2027 host. Not a development lead but ecosystem gatekeeper.' 
  },
  { 
    name: 'Semaphore', 
    games: ['Various'], 
    focus: 'Game Development', 
    fitScore: 68, 
    website: '', 
    location: 'Riyadh', 
    country: 'Saudi Arabia',
    notes: 'Veteran Riyadh game development company.' 
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
    if (focusLower.includes('narrative') || focusLower.includes('story') || focusLower.includes('animation') || focusLower.includes('comics')) {
      fitTags.push('Narrative Focus');
    }
    if (focusLower.includes('saudi') || focusLower.includes('history') || focusLower.includes('cultural')) {
      fitTags.push('Cultural/Local');
    }
    if (focusLower.includes('mobile') || focusLower.includes('casual')) {
      fitTags.push('Mobile');
    }
    if (focusLower.includes('educational') || focusLower.includes('learning')) {
      fitTags.push('EdGames');
    }
    
    // Determine priority
    const priority = studio.fitScore >= 95 ? 'high' : studio.fitScore >= 85 ? 'medium' : 'none';
    
    // Determine tags
    const tags = ['mena', 'saudi-arabia', 'vision-2030'];
    
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
        size: studio.name === 'SAVVY Games Group' || studio.name === 'Steer Studios' ? 'AAA' : 'indie',
        type: studio.focus.includes('Investment') || studio.focus.includes('Publishing') ? 'Publisher' : 'Developer',
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
        source: 'saudi-research-2026-03-08',
        region: 'mena',
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
