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

// Armenia + Kyrgyzstan Studios - Deep Dive Research 2026-03-08
const studios = [
  // ==================== ARMENIA (Yerevan) ====================
  { 
    name: 'Rockbite Games', 
    games: ['Deep Town', 'Sandship'], 
    focus: 'Mobile', 
    fitScore: 82, 
    website: '', 
    location: 'Yerevan', 
    country: 'Armenia',
    notes: 'Founded 2016. Prominent Yerevan-based indie studio. Mobile titles Deep Town and Sandship. One of largest Armenian game studios.' 
  },
  { 
    name: 'ArmNomads Games', 
    games: ['Hamster Maze', 'Junkyard Keeper', 'Scrape Master', 'Cubway'], 
    focus: 'Mobile', 
    fitScore: 78, 
    website: '', 
    location: 'Yerevan', 
    country: 'Armenia',
    notes: '8+ years experience. **80+ games developed**, 20M+ global users. 3.6K Facebook followers. Industry professionals focused on mobile.' 
  },
  { 
    name: 'RedWine Games Studio', 
    games: ['DuaLight'], 
    focus: 'Indie PC', 
    fitScore: 80, 
    website: '', 
    location: 'Yerevan', 
    country: 'Armenia',
    notes: 'Released **DuaLight** (cyberpunk platformer) on Steam December 2024. Manipulate gravity and time. New indie with Steam release.' 
  },
  { 
    name: 'Red Cat Games', 
    games: ['TBD'], 
    focus: 'Indie', 
    fitScore: 75, 
    website: '', 
    location: 'Armenia', 
    country: 'Armenia',
    notes: 'Armenia-based studio focusing on unique, award-winning games.' 
  },
  { 
    name: 'Fezard Games', 
    games: ['Casual mobile titles'], 
    focus: 'Casual Mobile', 
    fitScore: 68, 
    website: '', 
    location: 'Yerevan', 
    country: 'Armenia',
    notes: 'Founded 2022. Independent developer focusing on casual mobile games. Multi-platform indie.' 
  },
  { 
    name: 'Noor Games', 
    games: ['TBD'], 
    focus: 'Game Development', 
    fitScore: 65, 
    website: '', 
    location: 'Yerevan', 
    country: 'Armenia',
    notes: 'Local indie studio.' 
  },
  { 
    name: 'Cassette Studios', 
    games: ['TBD'], 
    focus: 'Game Development', 
    fitScore: 65, 
    website: '', 
    location: 'Yerevan', 
    country: 'Armenia',
    notes: 'Local indie studio.' 
  },
  { 
    name: 'Kimura Games', 
    games: ['TBD'], 
    focus: 'Game Development', 
    fitScore: 65, 
    website: '', 
    location: 'Yerevan', 
    country: 'Armenia',
    notes: 'Local indie studio.' 
  },
  { 
    name: 'Triada Studio', 
    games: ['TBD'], 
    focus: 'Game Development', 
    fitScore: 70, 
    website: '', 
    location: 'Yerevan', 
    country: 'Armenia',
    notes: 'Notable Armenian studio mentioned alongside Rockbite.' 
  },

  // ==================== KYRGYZSTAN (Bishkek) ====================
  { 
    name: 'Saratan Studio (Lalafun)', 
    games: ['YouTube/Mobile content'], 
    focus: 'Mobile/Edutainment', 
    fitScore: 75, 
    website: '', 
    location: 'Bishkek', 
    country: 'Kyrgyzstan',
    notes: '**10M+ YouTube subscribers** with content created in Kyrgyz Republic. Major player in Central Asia. Family entertainment and educational focus.' 
  },
  { 
    name: 'DBillions', 
    games: ['YouTube/Mobile content'], 
    focus: 'Mobile/Edutainment', 
    fitScore: 72, 
    website: '', 
    location: 'Bishkek', 
    country: 'Kyrgyzstan',
    notes: 'HTP (High Technology Park) resident. **Multiple Diamond Play Buttons**. Kids entertainment and edutainment.' 
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
    
    if (focusLower.includes('mobile')) {
      fitTags.push('Mobile');
    }
    if (focusLower.includes('indie')) {
      fitTags.push('Indie');
    }
    if (focusLower.includes('pc')) {
      fitTags.push('PC');
    }
    if (focusLower.includes('casual')) {
      fitTags.push('Casual');
    }
    if (focusLower.includes('edutainment') || notesLower.includes('education')) {
      fitTags.push('Edutainment');
    }
    if (notesLower.includes('steam')) {
      fitTags.push('Steam');
    }
    
    // Determine region tag
    let regionTag = 'caucasus';
    if (studio.country === 'Kyrgyzstan') {
      regionTag = 'central-asia';
    }
    
    // Determine priority
    let priority = 'none';
    if (studio.fitScore >= 80) priority = 'medium';
    else if (studio.fitScore >= 70) priority = 'low';
    
    // Tags
    const tags = [regionTag, studio.country.toLowerCase()];
    if (studio.fitScore >= 78) tags.push('established');
    
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
        source: 'armenia-kyrgyzstan-research-2026-03-08',
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
