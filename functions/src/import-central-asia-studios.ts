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

// Central Asia + Caucasus Studios - Deep Dive Research 2026-03-08
const studios = [
  // ==================== KAZAKHSTAN ====================
  { 
    name: 'Umai Gaming', 
    games: ['Iz'], 
    focus: 'Narrative RPG', 
    fitScore: 95, 
    website: '', 
    location: 'Almaty', 
    country: 'Kazakhstan',
    notes: '**ALL-FEMALE STUDIO** developing "Iz" — 2D pixel RPG set in 15th-century Kazakh steppes. **PERFECT Architect fit** for cultural storytelling. Featured in Astana Times.' 
  },
  { 
    name: 'Team Vanguard', 
    games: ['Lost Nomad'], 
    focus: 'Narrative RPG', 
    fitScore: 92, 
    website: '', 
    location: 'Kazakhstan', 
    country: 'Kazakhstan',
    notes: 'Creators of "Lost Nomad" — RPG based on **Turkic mythology**. Perfect narrative-first project for Architect.' 
  },
  { 
    name: 'Not Friendly Games', 
    games: ['TBD - 900K copies mentioned'], 
    focus: 'Indie', 
    fitScore: 85, 
    website: '', 
    location: 'Astana', 
    country: 'Kazakhstan',
    notes: 'Astana Hub studio. **900K+ copies sold**. Aiming for international success with high-quality gameplay. Supported by Astana Hub.' 
  },
  { 
    name: 'ALAMID Games', 
    games: ['Illusionary Manor', 'The Train Parable'], 
    focus: 'Indie/Outsourcing', 
    fitScore: 82, 
    website: 'https://alamid-games.com/', 
    location: 'Kazakhstan', 
    country: 'Kazakhstan',
    notes: 'Creative game development and outsourcing studio. Games: Illusionary Manor, The Train Parable. Showcased at AGGE (Almaty Geek Games Expo).' 
  },
  { 
    name: 'Astana Games', 
    games: ['TBD'], 
    focus: 'Unity Development', 
    fitScore: 75, 
    website: 'https://astanagames.com/', 
    location: 'Astana', 
    country: 'Kazakhstan',
    notes: 'Creative studio specializing in innovative game development. Unity expertise. Comprehensive game dev services.' 
  },
  { 
    name: 'CorgiBites', 
    games: ['TBD'], 
    focus: 'Indie', 
    fitScore: 72, 
    website: '', 
    location: 'Kazakhstan', 
    country: 'Kazakhstan',
    notes: 'Recognized for excellence in storytelling. Emerging studio.' 
  },
  { 
    name: 'Stardust Crusaders', 
    games: ['TBD'], 
    focus: 'Indie', 
    fitScore: 72, 
    website: '', 
    location: 'Kazakhstan', 
    country: 'Kazakhstan',
    notes: 'Recognized for excellence in storytelling and visuals. Emerging studio.' 
  },
  { 
    name: 'WindCity Games', 
    games: ['TBD'], 
    focus: 'Indie', 
    fitScore: 70, 
    website: '', 
    location: 'Kazakhstan', 
    country: 'Kazakhstan',
    notes: 'Recognized for excellence. Emerging studio.' 
  },
  { 
    name: 'Cyber Temple Games', 
    games: ['TBD'], 
    focus: 'Game Development', 
    fitScore: 65, 
    website: '', 
    location: 'Almaty', 
    country: 'Kazakhstan',
    notes: 'Listed on gamedevmap.com.' 
  },
  { 
    name: 'Far Far Games', 
    games: ['TBD'], 
    focus: 'Game Development', 
    fitScore: 65, 
    website: '', 
    location: 'Almaty', 
    country: 'Kazakhstan',
    notes: 'Listed on gamedevmap.com.' 
  },
  { 
    name: 'Goodwin Games', 
    games: ['TBD'], 
    focus: 'Game Development', 
    fitScore: 65, 
    website: '', 
    location: 'Almaty', 
    country: 'Kazakhstan',
    notes: 'Listed on gamedevmap.com.' 
  },
  { 
    name: 'Odd-Meter Games', 
    games: ['TBD'], 
    focus: 'Game Development', 
    fitScore: 65, 
    website: '', 
    location: 'Almaty', 
    country: 'Kazakhstan',
    notes: 'Listed on gamedevmap.com.' 
  },
  { 
    name: 'Wild Forest Studio', 
    games: ['TBD'], 
    focus: 'Game Development', 
    fitScore: 65, 
    website: '', 
    location: 'Almaty', 
    country: 'Kazakhstan',
    notes: 'Listed on gamedevmap.com.' 
  },

  // ==================== AZERBAIJAN ====================
  { 
    name: 'Cool Bears Game Studio', 
    games: ['Multiple mobile titles'], 
    focus: 'Mobile', 
    fitScore: 78, 
    website: '', 
    location: 'Baku', 
    country: 'Azerbaijan',
    notes: 'Founded 2018. Successful mobile games with large international audience. 820+ Facebook followers.' 
  },
  { 
    name: 'Gamepons', 
    games: ['TBD'], 
    focus: 'Ecosystem/Events', 
    fitScore: 70, 
    website: '', 
    location: 'Baku', 
    country: 'Azerbaijan',
    notes: 'Key ecosystem builder. Brings together local indie developers and hosts industry events like GameSummit.' 
  },
  { 
    name: 'PolyDream Studio', 
    games: ['TBD'], 
    focus: 'Game Development', 
    fitScore: 68, 
    website: '', 
    location: 'Baku', 
    country: 'Azerbaijan',
    notes: 'Local indie studio. Part of Azerbaijan growing scene (24+ studios in 2024).' 
  },
  { 
    name: 'AzDimension', 
    games: ['TBD'], 
    focus: 'Game Development', 
    fitScore: 65, 
    website: '', 
    location: 'Baku', 
    country: 'Azerbaijan',
    notes: 'Local indie studio.' 
  },
  { 
    name: 'Nomadman Studio', 
    games: ['TBD'], 
    focus: 'Game Development', 
    fitScore: 65, 
    website: '', 
    location: 'Baku', 
    country: 'Azerbaijan',
    notes: 'Local indie studio.' 
  },
  { 
    name: 'Dynamic Box Studio', 
    games: ['TBD'], 
    focus: 'Game Development', 
    fitScore: 65, 
    website: '', 
    location: 'Baku', 
    country: 'Azerbaijan',
    notes: 'Local indie studio.' 
  },
  { 
    name: 'Darts Games', 
    games: ['TBD'], 
    focus: 'Game Development', 
    fitScore: 62, 
    website: '', 
    location: 'Baku', 
    country: 'Azerbaijan',
    notes: 'Local indie studio.' 
  },
  { 
    name: 'Bad Button Studio', 
    games: ['TBD'], 
    focus: 'Game Development', 
    fitScore: 62, 
    website: '', 
    location: 'Baku', 
    country: 'Azerbaijan',
    notes: 'Local indie studio.' 
  },

  // ==================== GEORGIA ====================
  { 
    name: 'AnimatronX', 
    games: ['TBD'], 
    focus: 'VR/PC/Mobile Outsourcing', 
    fitScore: 75, 
    website: '', 
    location: 'Tbilisi', 
    country: 'Georgia',
    notes: 'Specialized Game Development and Outsourcing Company. Focus on VR, PC, and Mobile markets.' 
  },
  { 
    name: 'Lambda Gaming', 
    games: ['TBD'], 
    focus: 'Indie', 
    fitScore: 72, 
    website: '', 
    location: 'Tbilisi', 
    country: 'Georgia',
    notes: 'Focused on creating innovative, player-driven gaming experiences.' 
  },
  { 
    name: 'Anti-Gaming Studio', 
    games: ['TBD'], 
    focus: 'Game Development', 
    fitScore: 65, 
    website: '', 
    location: 'Tbilisi', 
    country: 'Georgia',
    notes: 'Development studio based in Tbilisi.' 
  },

  // ==================== UZBEKISTAN ====================
  { 
    name: 'East Games', 
    games: ['AAA projects'], 
    focus: 'AAA Development', 
    fitScore: 85, 
    website: '', 
    location: 'Tashkent', 
    country: 'Uzbekistan',
    notes: 'Mentioned as prominent AAA studio. Part of Uzbekistan **50+ studio, 600+ developer** ecosystem. 10x growth since 2021.' 
  },
  { 
    name: 'Amaya Soft', 
    games: ['TBD'], 
    focus: 'Game Development', 
    fitScore: 75, 
    website: '', 
    location: 'Tashkent', 
    country: 'Uzbekistan',
    notes: 'Prominent player in Uzbekistan gaming scene. Part of IT Park ecosystem.' 
  },
  { 
    name: 'GameDevHQ', 
    games: ['Training/Incubator'], 
    focus: 'Academy/Incubator', 
    fitScore: 70, 
    website: '', 
    location: 'Tashkent', 
    country: 'Uzbekistan',
    notes: 'Launched Dec 2024. **First specialized game dev institution in Central Asia**. Focuses on training developers and supporting startups.' 
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
    if (focusLower.includes('narrative') || notesLower.includes('narrative') || notesLower.includes('storytelling')) {
      fitTags.push('Narrative');
    }
    if (focusLower.includes('mobile')) {
      fitTags.push('Mobile');
    }
    if (focusLower.includes('vr')) {
      fitTags.push('VR');
    }
    if (focusLower.includes('indie')) {
      fitTags.push('Indie');
    }
    if (notesLower.includes('mythology') || notesLower.includes('cultural')) {
      fitTags.push('Cultural');
    }
    
    // Determine region tag
    let regionTag = 'central-asia';
    if (studio.country === 'Azerbaijan' || studio.country === 'Georgia') {
      regionTag = 'caucasus';
    }
    
    // Determine priority
    let priority = 'none';
    if (studio.fitScore >= 90) priority = 'high';
    else if (studio.fitScore >= 80) priority = 'medium';
    else if (studio.fitScore >= 70) priority = 'low';
    
    // Tags
    const tags = [regionTag, studio.country.toLowerCase()];
    if (studio.fitScore >= 85) tags.push('high-fit');
    if (notesLower.includes('turkic') || notesLower.includes('kazakh') || notesLower.includes('nomad')) {
      tags.push('cultural-narrative');
    }
    
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
        source: 'central-asia-caucasus-research-2026-03-08',
        region: regionTag,
      },
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now(),
      createdBy: 'skel-import',
    });
    
    console.log(`IMPORTED: ${studio.name} [${studio.country}] (${studio.focus}, fit: ${studio.fitScore})`);
    imported++;
  }
  
  console.log(`\n===========================`);
  console.log(`Imported: ${imported}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`===========================`);
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
