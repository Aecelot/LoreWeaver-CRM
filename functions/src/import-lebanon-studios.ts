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

// Lebanon Studios - Deep Dive Research 2026-03-08
const studios = [
  // ==================== ESTABLISHED STUDIOS ====================
  { 
    name: 'Wixel Studios', 
    games: ['Survival Race', 'Aurora (cancer awareness)', 'Abou Ahmad the Arabian'], 
    focus: 'Mobile/Social Impact', 
    fitScore: 75, 
    website: '', 
    location: 'Kaslik', 
    country: 'Lebanon',
    contact: 'Reine Abbas & Ziad Feghali (Co-Founders)',
    notes: 'Founded 2007/2008. FIRST indie game studio in Lebanon. Husband-wife team. Pioneer in Lebanese game scene. Mobile games + social impact projects (Aurora = childhood cancer awareness). Featured on GamesBeat.' 
  },
  { 
    name: 'Game Cooks', 
    games: ['AVO Escape Space'], 
    focus: 'Indie Games', 
    fitScore: 80, 
    website: '', 
    location: 'Beirut', 
    country: 'Lebanon',
    notes: 'Active indie studio. Finalist for Best Developer at 2025 MENA Games Industry Awards. "AVO Escape Space" nominated for Best Game. Recognized at Dubai Game Expo.' 
  },
  { 
    name: 'Voidkiller Studios', 
    games: ['TBD'], 
    focus: 'Indie Games', 
    fitScore: 70, 
    website: 'https://voidkiller.com/', 
    location: 'Beirut', 
    country: 'Lebanon',
    notes: 'Indie game dev studio from Lebanon. Active in Lebanese Game Developers community. Website: voidkiller.com' 
  },

  // ==================== NOTABLE INDIVIDUALS ====================
  { 
    name: 'Paul Salameh (Pou)', 
    games: ['Pou'], 
    focus: 'Mobile/Virtual Pet', 
    fitScore: 65, 
    website: '', 
    location: 'Lebanon', 
    country: 'Lebanon',
    notes: 'Created Pou (2012) = viral virtual pet game with hundreds of millions of downloads. Lebanese designer. One of the most successful games to come out of Lebanon.' 
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
    if (notesLower.includes('social impact') || notesLower.includes('awareness')) {
      fitTags.push('Social Impact');
    }
    if (notesLower.includes('narrative') || notesLower.includes('story')) {
      fitTags.push('Narrative');
    }
    
    // Determine priority
    let priority = 'none';
    if (studio.fitScore >= 80) priority = 'medium';
    else if (studio.fitScore >= 70) priority = 'low';
    
    // Tags
    const tags = ['mena', 'lebanon', 'beirut'];
    
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
        name: (studio as any).contact?.split(' (')[0]?.split(' & ')[0] || '',
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
        source: 'lebanon-research-2026-03-08',
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
