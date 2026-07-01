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

// Jordan Studios - Deep Dive Research 2026-03-08
const studios = [
  // ==================== MAJOR STUDIOS ====================
  { 
    name: 'Maysalward', 
    games: ['Trix', 'Tarneeb', 'Dominoes Pro', 'Hand', 'Baloot'], 
    focus: 'Card/Board Mobile Games', 
    fitScore: 82, 
    website: 'https://maysalward.com/', 
    location: 'Amman', 
    country: 'Jordan',
    contact: 'Nour Khrais (CEO)',
    notes: 'Founded 2003 — FIRST mobile game studio in Middle East. Pioneer. HQ Amman + UK studio. KAFD partner. Jordan Gaming Lab. WHO PlayApartTogether partner. Led MENA gaming ecosystem building with boot camps, events, annual summit.' 
  },
  { 
    name: 'Tamatem Games', 
    games: ['Arabic localizations', 'Publishing'], 
    focus: 'Publisher/Localizer', 
    fitScore: 78, 
    website: 'https://tamatem.co/', 
    location: 'Amman', 
    country: 'Jordan',
    contact: 'Hussam Hammo (Founder)',
    notes: 'Leading MENA publisher. Specializes in localizing international games for Arabic market. $5M funding (2022). Glocalization experts.' 
  },
  { 
    name: 'Mad Hook', 
    games: ['Highway Drifter', 'The Chase: Cop Pursuit', 'Rooftop Run', 'Arabian Standoff', 'Amer: The Chase Hit and Run'], 
    focus: 'Racing/Action Mobile', 
    fitScore: 85, 
    website: 'https://www.madhook.io/', 
    location: 'Amman', 
    country: 'Jordan',
    contact: 'Hazim Hanbali (Co-Founder)',
    notes: 'Founded 2018 by Hazim Hanbali + Ibrahim Al Hasan. 100M+ downloads. Google IGA 2019. FIRST Arabic studio on PlayStation 5. Cross-platform: mobile, PC, PS5. Explosive growth.' 
  },
  { 
    name: 'Shanab Games', 
    games: ['Desert King', 'Grand (قراند)', 'Drift Online', 'Hunters vs Props Online'], 
    focus: 'Racing/Action Mobile', 
    fitScore: 80, 
    website: '', 
    location: 'Amman', 
    country: 'Jordan',
    notes: 'Founded 2016. Racing and action games for MENA. 10M+ installs. Desert King = 5M downloads. High-quality 3D car culture games.' 
  },
  { 
    name: 'Chickmania Entertainment', 
    games: ['Jackaro', 'Cars! Boom! Boom!', 'Gomat: Drift & Drag', 'Carrom'], 
    focus: 'Board/Social Mobile Games', 
    fitScore: 78, 
    website: 'https://chickmania.com/', 
    location: 'Amman', 
    country: 'Jordan',
    notes: 'Founded 2017. Marketing agency turned game dev. Jackaro = flagship board game. 4M+ downloads. 50K daily players. 35 staff. Also offers video production + marketing services.' 
  },
  { 
    name: 'Nifty Craft', 
    games: ['The World of Nifty Craft'], 
    focus: 'MMORPG/Card Battler', 
    fitScore: 85, 
    website: '', 
    location: 'Jordan', 
    country: 'Jordan',
    notes: '2D Sandbox MMORPG with player-driven economy. Card Battler MMO mechanics. MEVP backed + US VC. PvPvE combat + crafting + trading. Unique narrative potential.' 
  },

  // ==================== OTHER STUDIOS ====================
  { 
    name: 'RABABA Games', 
    games: ['TBD'], 
    focus: 'Mobile Games', 
    fitScore: 65, 
    website: '', 
    location: 'Jordan', 
    country: 'Jordan',
    notes: 'Jordanian game studio.' 
  },
  { 
    name: 'Shusmo Games', 
    games: ['TBD'], 
    focus: 'Mobile Games', 
    fitScore: 65, 
    website: '', 
    location: 'Jordan', 
    country: 'Jordan',
    notes: 'Jordanian game studio.' 
  },
  { 
    name: 'Ambrator Games', 
    games: ['TBD'], 
    focus: 'Mobile Games', 
    fitScore: 65, 
    website: '', 
    location: 'Jordan', 
    country: 'Jordan',
    notes: 'Jordanian game studio.' 
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
    if (focusLower.includes('mmorpg') || focusLower.includes('rpg')) {
      fitTags.push('RPG');
    }
    if (focusLower.includes('card') || focusLower.includes('board')) {
      fitTags.push('Board/Card');
    }
    if (focusLower.includes('racing') || focusLower.includes('action')) {
      fitTags.push('Racing/Action');
    }
    if (focusLower.includes('publisher') || focusLower.includes('localizer')) {
      fitTags.push('Publisher');
    }
    
    // Determine priority
    const priority = studio.fitScore >= 85 ? 'medium' : 'none';
    
    // Determine tags
    const tags = ['mena', 'jordan', 'amman'];
    
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
        type: studio.focus.includes('Publisher') ? 'Publisher' : 'Developer',
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
        source: 'jordan-research-2026-03-08',
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
