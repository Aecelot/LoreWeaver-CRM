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

// UAE Studios - Deep Dive Research 2026-03-08
const studios = [
  // ==================== HIGH FIT (Narrative/Story Focus) ====================
  { 
    name: 'Kashkool Games', 
    games: ['Sheba: A New Dawn'], 
    focus: 'Narrative Metroidvania RPG', 
    fitScore: 98, 
    website: 'https://kashkoolgames.com/', 
    location: 'Abu Dhabi', 
    country: 'UAE',
    contact: 'Omran Almansoori (CEO)',
    notes: 'Founded 2016 by the Almansoori brothers. First Abu Dhabi studio with global recognition. "Sheba: A New Dawn" - Metroidvania Action RPG with Arabian/Jinn mythology. Under Abu Dhabi Gaming umbrella. PERFECT FIT - authentic Middle Eastern storytelling focus.' 
  },
  { 
    name: 'Hybrid Humans', 
    games: ['Bye Bye Sheep', 'Who Lurks', 'Falcon Valley', 'Hop Hop Away'], 
    focus: 'Narrative Mobile Games', 
    fitScore: 92, 
    website: 'https://hybridhumans.ae/', 
    location: 'Abu Dhabi', 
    country: 'UAE',
    contact: 'Fakhra AlMansouri (Founder/CEO)',
    notes: 'Founded 2014 by Emirati female founder Fakhra AlMansouri. Ubisoft Abu Dhabi internship alumna. Games blend narrative-driven gameplay with creative design. Featured by The National UAE.' 
  },
  { 
    name: 'Antarsoft', 
    games: ['Story-driven games'], 
    focus: 'Story-Driven Games', 
    fitScore: 88, 
    website: 'https://antarsoftgames.com/', 
    location: 'UAE', 
    country: 'UAE',
    notes: 'Founded 2012. Indie studio specializing in story-driven games for PC, Console, Mobile. "Indie is the new pro" tagline.' 
  },
  { 
    name: 'Dark Emerald Studios', 
    games: ['Indie games', 'Immersive experiences'], 
    focus: 'Indie Games', 
    fitScore: 80, 
    website: 'https://www.darkemerald.ae/', 
    location: 'Dubai', 
    country: 'UAE',
    notes: 'Dubai indie studio. Working on indie games and immersive experiences.' 
  },

  // ==================== ESTABLISHED STUDIOS ====================
  { 
    name: 'Khosouf Studio', 
    games: ['BOX to the BEAT', 'Shadow Dreams', 'Asteroid Assault', 'UAE SPACE VR'], 
    focus: 'VR/Console Games', 
    fitScore: 85, 
    website: 'https://www.khosouf.com/', 
    location: 'Abu Dhabi', 
    country: 'UAE',
    contact: 'Ahmad Al-Natsheh (CEO)',
    notes: 'Founded 2016. Award-winning. First Middle East game on PS5 VR2 (BOX to the BEAT). 20+ projects. Unreal Engine specialists. 10+ years experience.' 
  },
  { 
    name: 'Pixelhunters', 
    games: ['Arabian Heroes', 'Multiplayer Team Training', 'VR Education Games'], 
    focus: 'VR/AR/Animation', 
    fitScore: 82, 
    website: 'https://www.pixelhunters.com/', 
    location: 'Dubai', 
    country: 'UAE',
    contact: 'Ani Atanasova (CEO)',
    notes: 'Founded 2009. First indie game studio in UAE. 3D animation, VR/AR, game development. $5.8M revenue. Teams in UAE and Bulgaria.' 
  },
  { 
    name: 'Boss Bunny Games', 
    games: ['Camel Dash', 'Dodge - Space Race 9', 'Freej Match', 'CZN Burak'], 
    focus: 'Mobile Games', 
    fitScore: 80, 
    website: '', 
    location: 'Abu Dhabi', 
    country: 'UAE',
    notes: 'HQ Abu Dhabi, office Dubai. Team includes King (Candy Crush), Sony PlayStation, Capcom veterans. Helps indie studios with MENA publishing.' 
  },
  { 
    name: 'Elecktron Labs', 
    games: ['MindPal'], 
    focus: 'Brain Training/EdGames', 
    fitScore: 75, 
    website: '', 
    location: 'Dubai', 
    country: 'UAE',
    notes: 'Award-winning. 25M users globally. MindPal won App of the Day (Apple) + App We Love (Google) + IMGA People\'s Choice Award.' 
  },
  { 
    name: 'Tarboosh Games', 
    games: ['Bikes Hill', 'Police Runner', 'Escape: Close Call', 'Desert Zombies'], 
    focus: 'Hypercasual', 
    fitScore: 70, 
    website: '', 
    location: 'Dubai', 
    country: 'UAE',
    notes: '40+ games. Tens of millions downloads. Acquired by Voodoo (French hypercasual giant).' 
  },
  { 
    name: 'Game Power 7', 
    games: ['Rappelz', 'Sniper Shoot'], 
    focus: 'MMORPG/Publisher', 
    fitScore: 72, 
    website: '', 
    location: 'Dubai', 
    country: 'UAE',
    notes: 'Founded 2007. Subsidiary of GNAM. Released Rappelz (2008) - MENA\'s first MMO, still biggest Arab virtual community. 5 offices worldwide, 22 countries.' 
  },
  { 
    name: 'Dizzaract', 
    games: ['Web3/Player-owned games'], 
    focus: 'Web3 Gaming', 
    fitScore: 65, 
    website: 'https://www.dizzaract.com/', 
    location: 'Abu Dhabi', 
    country: 'UAE',
    notes: 'Started in Dubai, moved to Abu Dhabi. Focus on player-owned game economies and assets. Web3 gaming.' 
  },

  // ==================== SUPPORT INFRASTRUCTURE ====================
  { 
    name: 'Ubisoft Abu Dhabi', 
    games: ['CSI: Hidden Crimes', 'NCIS: Hidden Crimes', 'Growtopia'], 
    focus: 'Mobile Games (AAA)', 
    fitScore: 60, 
    website: 'https://www.ubisoft.com/en-us/company/careers/locations/abu-dhabi', 
    location: 'Abu Dhabi', 
    country: 'UAE',
    contact: 'Yannick Theler (Managing Director)',
    notes: 'Opened 2011. First major game studio in UAE. 60+ employees. Mobile focus. Part of twofour54 partnership. AAA = probably not a lead.' 
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
    if (focusLower.includes('narrative') || focusLower.includes('story')) {
      fitTags.push('Narrative Focus');
    }
    if (focusLower.includes('rpg') || focusLower.includes('metroidvania')) {
      fitTags.push('RPG');
    }
    if (focusLower.includes('vr') || focusLower.includes('ar')) {
      fitTags.push('VR/AR');
    }
    if (focusLower.includes('mobile') || focusLower.includes('casual')) {
      fitTags.push('Mobile');
    }
    
    // Determine priority
    const priority = studio.fitScore >= 95 ? 'high' : studio.fitScore >= 85 ? 'medium' : 'none';
    
    // Determine tags
    const tags = ['mena', 'uae', studio.location.toLowerCase().replace(' ', '-')];
    
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
        source: 'uae-research-2026-03-08',
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
