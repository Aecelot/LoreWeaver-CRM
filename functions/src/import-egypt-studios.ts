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

// Egypt Studios - Deep Dive Research 2026-03-08
const studios = [
  // ==================== HIGH FIT - NARRATIVE/RPG ====================
  { 
    name: 'Elder3 Studio', 
    games: ['The Egyptian Knight (in dev)'], 
    focus: 'Action RPG', 
    fitScore: 95, 
    website: '', 
    location: 'Cairo', 
    country: 'Egypt',
    contact: 'Nageb Suliman (Founder)',
    notes: 'Founded 2024. "Building Premium AA Action RPGs from MENA to the world." Flagship: The Egyptian Knight = Hack & Slash Action RPG, dark fantasy historical Egypt. UE5. $9K raised. Targeting underserved hardcore PC/Console market. MASSIVE narrative potential.' 
  },
  { 
    name: 'Rumbling Games', 
    games: ['Knights of Light'], 
    focus: 'Action RPG', 
    fitScore: 92, 
    website: '', 
    location: 'Cairo', 
    country: 'Egypt',
    contact: 'Ahmed Fouad (Founder)',
    notes: 'Founded 2015-2016. Made "Knights of Light" = FIRST Arabic AAA game. Historical action-RPG set in 7th century Iraq. "Competing in worldwide market by producing top quality games. Introducing our culture values & history in video game industry."' 
  },
  { 
    name: 'FitNot Games', 
    games: ['TBD'], 
    focus: 'Arabic Gaming Experiences', 
    fitScore: 90, 
    website: '', 
    location: 'Cairo', 
    country: 'Egypt',
    contact: 'Abdallah Elshabrawy',
    notes: 'Founded 2019. "We craft Arabic gaming experiences driven by MENA diverse culture, rooted heritage, and deep history. Games with impact, exquisite art style, captivating narrative, engaging gameplay." Funded by Exel by Merak. PERFECT narrative fit.' 
  },
  { 
    name: 'Falafel Games', 
    games: ['Strategy/RPG titles'], 
    focus: 'Strategy/RPG', 
    fitScore: 88, 
    website: 'https://falafel-games.com/', 
    location: 'Egypt', 
    country: 'Egypt',
    notes: 'Strategy and RPG games for Arabic speakers. Uses regional history for inspiration. "Leading developer and publisher in core Strategy and RPG games."' 
  },

  // ==================== MAJOR STUDIOS ====================
  { 
    name: 'Instinct Games', 
    games: ['ARK: Survival Evolved (co-dev)', 'ATLAS (co-dev)'], 
    focus: 'Work-for-Hire AAA', 
    fitScore: 75, 
    website: 'https://www.instinctgames.com/', 
    location: 'Cairo', 
    country: 'Egypt',
    contact: 'Mostafa Hafez (Founder)',
    notes: 'Founded 2011. LEADING game dev studio in Egypt. Co-developed ARK: Survival Evolved and ATLAS with Studio Wildcard. Work-for-hire model. Multi-million sellers. Full-cycle PC/console/mobile development.' 
  },

  // ==================== OTHER STUDIOS ====================
  { 
    name: '2024 Studios (Ugly Pirates)', 
    games: ['Ugly Pirates (MORPG)', 'Keys to Success'], 
    focus: 'MORPG', 
    fitScore: 78, 
    website: '', 
    location: 'Cairo', 
    country: 'Egypt',
    contact: 'Ahmed Meligy',
    notes: '2024 Studios creating "Ugly Pirates" MORPG. Won Microsoft Best Game Award + Instinct Best Game Award 2015. Keys to Success won Egypt Imagine Cup (games category).' 
  },
  { 
    name: 'Kreed Games', 
    games: ['Castle Mashers'], 
    focus: '2D Action Arcade', 
    fitScore: 70, 
    website: '', 
    location: 'Cairo', 
    country: 'Egypt',
    contact: 'Mohamed ElSamahy',
    notes: 'Founded 2016. International team (Egypt, Italy, Russia). Castle Mashers = 2D action arcade blending breakout with RPG mechanics.' 
  },
  { 
    name: 'GBArena', 
    games: ['Esports platform'], 
    focus: 'Esports Platform', 
    fitScore: 45, 
    website: '', 
    location: 'Cairo', 
    country: 'Egypt',
    notes: 'Founded 2015. Esports platform for MENA. Tournament organizers, publishers, sponsors, teams. AUC Venture Lab backed.' 
  },
  { 
    name: 'DAOverse Games', 
    games: ['Web3 games'], 
    focus: 'Web3/Blockchain Gaming', 
    fitScore: 40, 
    website: '', 
    location: 'Cairo', 
    country: 'Egypt',
    notes: 'Founded 2024. Web3 gaming platform. $107K raised. FIAT/crypto services, blockchain validation.' 
  },
  { 
    name: 'TRONX Company', 
    games: ['letterTRON'], 
    focus: 'Educational AR Games', 
    fitScore: 55, 
    website: '', 
    location: 'Cairo', 
    country: 'Egypt',
    notes: 'Founded 2019. Gamification company. Educational games with AR + AI for children 4-10. letterTRON = pronunciation teaching game.' 
  },
  { 
    name: 'belarabyapps.com', 
    games: ['Arabic learning apps'], 
    focus: 'EdTech/Arabic Learning', 
    fitScore: 50, 
    website: '', 
    location: 'Ismailia', 
    country: 'Egypt',
    notes: 'Founded 2018. Arabic learning apps for children 3-8. 1M+ downloads, 30+ countries. Mini-games, storytelling, adaptive tech.' 
  },
  { 
    name: 'D2D - WOW Zone Immersive', 
    games: ['XR Experiences'], 
    focus: 'XR/Immersive Experiences', 
    fitScore: 60, 
    website: '', 
    location: 'Cairo', 
    country: 'Egypt',
    notes: 'Founded 2015. Creative art-tech studio. WOW Zone = Egypt first LBX (location-based experience). XR storytelling, AI environments.' 
  },
  { 
    name: 'Hoga', 
    games: ['Liver infection awareness game'], 
    focus: 'Gamification/Health', 
    fitScore: 45, 
    website: '', 
    location: 'Cairo', 
    country: 'Egypt',
    notes: 'Founded 2014. Strategy game spreading awareness about liver infection through gamification.' 
  },
  { 
    name: 'Warrd', 
    games: ['Educational interactive solutions'], 
    focus: 'EdTech/Interactive', 
    fitScore: 55, 
    website: '', 
    location: 'Cairo', 
    country: 'Egypt',
    notes: 'Founded 2021. Edtech transforming content into apps, games, animations using XR and AI.' 
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
    if (focusLower.includes('rpg')) {
      fitTags.push('RPG');
    }
    if (focusLower.includes('action')) {
      fitTags.push('Action');
    }
    if (focusLower.includes('strategy')) {
      fitTags.push('Strategy');
    }
    if (focusLower.includes('narrative') || studio.notes.toLowerCase().includes('narrative')) {
      fitTags.push('Narrative');
    }
    if (focusLower.includes('arabic') || studio.notes.toLowerCase().includes('arabic')) {
      fitTags.push('Arabic-focused');
    }
    
    // Determine priority based on fit score
    let priority = 'none';
    if (studio.fitScore >= 90) priority = 'high';
    else if (studio.fitScore >= 80) priority = 'medium';
    else if (studio.fitScore >= 70) priority = 'low';
    
    // Tags
    const tags = ['mena', 'egypt', 'cairo'];
    if (studio.fitScore >= 85) tags.push('high-fit');
    
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
        source: 'egypt-research-2026-03-08',
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
