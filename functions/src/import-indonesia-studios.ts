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

// Indonesian Studios - Comprehensive list
const studios = [
  // TIER 1: Narrative Excellence (Fit 95+)
  { name: 'Toge Productions', games: ['Coffee Talk', 'Coffee Talk Episode 2', 'A Space for the Unbound', 'Infectonator', 'When the Past was Around'], focus: 'Narrative Adventure / Publisher', fitScore: 98, website: 'https://www.togeproductions.com/', location: 'Tangerang', notes: 'Founded 2009. Toge Game Fund Initiative ($10K grants). Acquired Mojiken Studio. Indonesia\'s leading indie publisher.' },
  { name: 'Mojiken Studio', games: ['A Space for the Unbound', 'When the Past was Around'], focus: 'Pixel Art Adventure', fitScore: 98, website: 'https://mojikenstudio.com/', location: 'Surabaya', notes: 'Acquired by Toge Productions Dec 2023. Won big at Indonesia Game Awards 2023. 90s Indonesian magical realism.' },
  { name: 'Pikselnesia', games: ['Afterlove EP', 'What Comes After', 'Coffee Talk (co-dev)'], focus: 'Visual Novel / Narrative', fitScore: 98, website: '', location: 'Jakarta (remote)', notes: 'Founded by Mohammad Fahmi (passed away 2022). Afterlove EP = his final project. Lead narrative: Galuh Elsa. Published by Fellow Traveller.' },
  
  // TIER 2: Major Studios
  { name: 'Agate International', games: ['Various - serious games, mobile'], focus: 'Game Development Services', fitScore: 80, website: 'https://agate.id/', location: 'Bandung', notes: 'Founded April 2009. CEO: Arief Widhiyasa. 200+ staff. Largest game dev in Indonesia. Worked with Square Enix, EA. 20+ awards.' },
  { name: 'Gambir Studio', games: ['The Anomalous Hour', 'Cooking games', 'Roguelites'], focus: 'Mobile/Horror', fitScore: 75, website: 'https://gambirstudio.com/', location: 'Indonesia', notes: 'Founded August 2016. 13 games, 10M+ downloads. Horror and casual games.' },
  
  // TIER 3: Other Indies
  { name: 'Nightspade', games: ['Mobile games'], focus: 'Mobile', fitScore: 70, website: 'https://www.nightspade.com/', location: 'Bandung', notes: 'Mobile game studio. iOS, Android, Windows.' },
  { name: 'RedRain Game Studio', games: ['Various'], focus: 'Game Development', fitScore: 65, website: '', location: 'Jakarta', notes: 'Jakarta-based studio.' },
  { name: 'Lentera Nusantara', games: ['Nusantara: Legend of The Winged Ones'], focus: 'Visual Novel / Otome', fitScore: 90, website: '', location: 'Indonesia', notes: 'Indonesian otome/VN developer. Cultural themes.' },
  { name: 'Tahugames', games: ['Various indie titles'], focus: 'Indie', fitScore: 70, website: '', location: 'Indonesia', notes: 'Indonesian indie studio.' },
  
  // TIER 4: Support/Services
  { name: 'Anantarupa Studios', games: ['Game art services'], focus: 'Art Outsourcing', fitScore: 60, website: 'https://anantarupa.com/', location: 'Indonesia', notes: 'Game art and animation services.' },
  { name: 'Ekuator Games', games: ['Various'], focus: 'Game Development', fitScore: 65, website: '', location: 'Indonesia', notes: 'Indonesian game developer.' },
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
    if (focusLower.includes('narrative') || focusLower.includes('adventure') || focusLower.includes('visual novel')) {
      fitTags.push('Narrative Focus');
    }
    if (focusLower.includes('pixel')) {
      fitTags.push('Pixel Art');
    }
    if (focusLower.includes('publisher')) {
      fitTags.push('Publisher');
    }
    
    // Determine priority
    const priority = studio.fitScore >= 95 ? 'high' : studio.fitScore >= 85 ? 'medium' : 'none';
    
    // Create lead
    await db.collection('leads').add({
      name: studio.name,
      type: 'studio',
      website: studio.website,
      country: 'Indonesia',
      location: studio.location || 'Indonesia',
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
        size: studio.name === 'Agate International' ? 'large' : 'indie',
        type: studio.focus.includes('Publisher') || studio.focus.includes('Services') ? 'Publisher' : 'Developer',
        games: studio.games,
        focus: studio.focus,
        fitScore: studio.fitScore,
        fitReason: studio.notes || 'Indonesian studio - ' + studio.focus,
        fitTags: fitTags,
      },
      tags: ['indonesia', 'asia', 'southeast-asia'],
      notes: studio.notes || '',
      pipeline: {
        id: STUDIO_PIPELINE_ID,
        stageId: 'new-lead',
      },
      metadata: {
        source: 'indonesia-research-2026-03-07',
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
