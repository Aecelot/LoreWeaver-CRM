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

// Israel Studios - Deep Dive Research 2026-03-08
const studios = [
  // ==================== HIGH FIT (Narrative/Story Focus) ====================
  { 
    name: 'Happy Juice Games', 
    games: ['Lost in Play', 'The Office Quest (collab)'], 
    focus: 'Adventure/Quest Games', 
    fitScore: 98, 
    website: 'https://www.happyjuice.games/', 
    location: 'Tel Aviv', 
    country: 'Israel',
    contact: 'Yuval Markovich (Co-Founder)',
    notes: 'Founded by Yuval Markovich, Oren Rubin, Alon Simon. "Lost in Play" (2022) = Overwhelmingly Positive Steam reviews. Quest/adventure focus with high-quality graphics and animation. Apple featured. PERFECT FIT - narrative adventure specialists.' 
  },
  { 
    name: 'Capricia Productions', 
    games: ['Of Bird and Cage', 'Outta Hand'], 
    focus: 'Music-Driven Story Games', 
    fitScore: 98, 
    website: 'https://www.capriciaproductions.com/', 
    location: 'Jerusalem', 
    country: 'Israel',
    contact: 'Arnold Nesis (Founder/CEO)',
    notes: 'Founded 2015 by Arnold Nesis + Ben Shmuelof (met in metal band). "FIRST OF ITS KIND STORY-DRIVEN MUSIC GAME". Of Bird and Cage (2021) features artists from Guns N\' Roses, Evanescence, Within Temptation, Epica. 11-50 employees. PERFECT FIT - narrative + music fusion.' 
  },
  { 
    name: 'We Create Stuff', 
    games: ['In Sound Mind', 'Nightmare House 2', 'Nightmare House: Reimagined'], 
    focus: 'Psychological Horror/Narrative', 
    fitScore: 95, 
    website: 'https://wecreatestuff.com/', 
    location: 'Tel Aviv', 
    country: 'Israel',
    contact: 'Ido Tal',
    notes: 'Tel Aviv. "In Sound Mind" (2021) = psychological horror with The Living Tombstone music. Metacritic 70. Story-driven console games. 50+ developers. Former Half-Life modders (Nightmare House = highest-rated mod). Groundbreaking for Israeli console gaming.' 
  },
  { 
    name: 'Clover Bite', 
    games: ['GRIME', 'GRIME II'], 
    focus: 'Metroidvania/Soulslike', 
    fitScore: 92, 
    website: '', 
    location: 'Haifa', 
    country: 'Israel',
    contact: 'Yarden (Developer)',
    notes: 'Internal studio of Tiltan School of Design. Haifa. "GRIME" (2021) = acclaimed Metroidvania/Soulslike. Published by Akupara Games. GRIME II in development. High narrative potential.' 
  },
  { 
    name: 'Corbomite Games', 
    games: ['Zbang', 'Pizza Morgana', 'Star Shipping Inc'], 
    focus: 'Narrative Adventure/Episodic', 
    fitScore: 90, 
    website: 'https://corporate.corbomitegames.com/', 
    location: 'Tel Aviv', 
    country: 'Israel',
    contact: 'Oded Sharon (CEO)',
    notes: 'Founded 2006 by Oded Sharon (BSC CS+Physics Tel Aviv, MBA Technion). "Highly narrative games, appealing to mass audience". GDC speaker on Middle East market. Episodic adventure games.' 
  },

  // ==================== ESTABLISHED STUDIOS ====================
  { 
    name: 'Nokobot', 
    games: ['PC/Mobile/VR games'], 
    focus: 'Indie/VR/AR', 
    fitScore: 78, 
    website: '', 
    location: 'Israel', 
    country: 'Israel',
    notes: 'Indie studio. PC, mobile, VR/AR content. Innovation-focused.' 
  },
  { 
    name: 'Publex', 
    games: ['Mobile/Desktop/Web games'], 
    focus: 'Unity/Unreal Games', 
    fitScore: 70, 
    website: '', 
    location: 'Israel', 
    country: 'Israel',
    notes: 'Unity 3D and Unreal Engine specialists. Mobile, desktop, web.' 
  },

  // ==================== MAJOR PLAYERS (Track but mostly casual/AAA) ====================
  { 
    name: 'Playtika', 
    games: ['Slotomania', 'Bingo Blitz', 'Best Fiends', 'Switchcraft'], 
    focus: 'Social Casino/Casual', 
    fitScore: 65, 
    website: 'https://www.playtika.com/', 
    location: 'Herzliya', 
    country: 'Israel',
    notes: 'Founded 2010. Sold for $4.4B (2016). 4,000+ employees. Acquired Jelly Button (2017), Wooga (2018). Switchcraft = narrative match-3. Mostly casino/casual but has some narrative games.' 
  },
  { 
    name: 'Plarium', 
    games: ['RAID: Shadow Legends', 'Vikings: War of Clans', 'Throne: Kingdom at War'], 
    focus: 'Strategy/RPG Mobile', 
    fitScore: 68, 
    website: 'https://plarium.com/', 
    location: 'Herzliya', 
    country: 'Israel',
    notes: 'Founded 2009. Sold for $500M (2017). 450M+ registered users. Strategy and mid-core RPGs. Some narrative potential in RPG titles.' 
  },
  { 
    name: 'Moon Active', 
    games: ['Coin Master'], 
    focus: 'Casual/Social', 
    fitScore: 55, 
    website: 'https://www.moonactive.com/', 
    location: 'Tel Aviv', 
    country: 'Israel',
    notes: 'Coin Master = one of highest grossing mobile games ever. Casual/social focus. Offices in Poland too. Less narrative-focused.' 
  },
  { 
    name: 'CrazyLabs', 
    games: ['Hypercasual portfolio'], 
    focus: 'Hypercasual', 
    fitScore: 50, 
    website: 'https://www.crazylabs.com/', 
    location: 'Israel', 
    country: 'Israel',
    notes: 'Top hypercasual publisher. Billions of downloads. Not narrative-focused.' 
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
    if (focusLower.includes('narrative') || focusLower.includes('story') || focusLower.includes('adventure') || focusLower.includes('quest')) {
      fitTags.push('Narrative Focus');
    }
    if (focusLower.includes('horror') || focusLower.includes('psychological')) {
      fitTags.push('Horror');
    }
    if (focusLower.includes('metroidvania') || focusLower.includes('soulslike') || focusLower.includes('rpg')) {
      fitTags.push('RPG/Action');
    }
    if (focusLower.includes('music')) {
      fitTags.push('Music-Driven');
    }
    if (focusLower.includes('vr') || focusLower.includes('ar')) {
      fitTags.push('VR/AR');
    }
    
    // Determine priority
    const priority = studio.fitScore >= 95 ? 'high' : studio.fitScore >= 85 ? 'medium' : 'none';
    
    // Determine tags
    const tags = ['israel', 'start-up-nation'];
    if (studio.fitScore >= 90) tags.push('narrative-focus');
    
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
        size: ['Playtika', 'Plarium', 'Moon Active', 'CrazyLabs'].includes(studio.name) ? 'AAA' : 'indie',
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
        source: 'israel-research-2026-03-08',
        region: 'middle-east',
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
