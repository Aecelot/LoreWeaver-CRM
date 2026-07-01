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

// Indian Studios - Comprehensive list
const studios = [
  // TIER 1: Narrative Excellence (Fit 95+)
  { name: 'Nodding Heads Games', games: ['Raji: An Ancient Epic', 'Raji 2 (development)'], focus: 'Action Adventure / Indian Mythology', fitScore: 98, website: 'https://www.noddingheadsgames.com/', location: 'Pune', notes: '13-person team. 2M+ players. Won Grand Prix at Taipei Game Awards 2021. Unreal Dev Grant. $930K Steam revenue. Nominated Best Debut at TGA 2020.' },
  { name: 'Studio Oleomingus', games: ['It Takes A Long Time To Grow A Mountain', 'Somewhere'], focus: 'Postcolonial Narrative / Experimental', fitScore: 98, website: '', location: 'Chala, Gujarat', notes: 'Dhruv Jani & Sushant Chakraborty. Won AMAZE Humble Award 2020. Exhibited at V&A London, Somerset House, GDC. India Foundation for the Arts grant.' },
  { name: 'Frostwood Interactive', games: ['Rainswept', 'Forgotten Fields', 'Unwording'], focus: 'Narrative Adventure / Point & Click', fitScore: 98, website: 'https://frostwoodinteractive.com/', location: 'Mumbai (from Goa)', notes: 'Founded 2017 by Armaan Sandhu. "Story-first studio". Atmospheric, emotionally resonant games. Deep characters, cinematic presentation.' },
  { name: 'Masala Games', games: ['Detective Dotson'], focus: 'Cozy Mystery Adventure', fitScore: 95, website: '', location: 'India', notes: 'Founder Shalin Shodhan = BAFTA-winning, Oscar-nominated. Ex-EA (Spore under Will Wright), ex-Pixar (Toy Story 3, Brave). Detective Dotson: 95% Very Positive Steam, 8.5 IGN.' },
  { name: 'Pyrodactyl Games', games: ['Unrest', 'Will Fight for Food', 'A.Typical RPG'], focus: 'Story-driven RPG', fitScore: 95, website: 'https://pyrodactyl.com/', location: 'International (India-founded)', notes: 'Founded by Arvind Raja Yadav. Unrest = ancient India RPG. Kickstarter 12x funded. Open-sourced game (MIT). International team.' },
  
  // TIER 2: Strong Narrative Focus (Fit 85-94)
  { name: 'Ogre Head Studio', games: ['Asura', 'Yodha (development)'], focus: 'Indian Mythology Roguelike', fitScore: 92, website: 'https://www.ogreheadstudio.com/', location: 'India', notes: 'Founded by Zain Fahadh. 100% independent, self-funded ($2K initial). Indian folklore + mythology focus.' },
  { name: 'Mono Tusk Studios', games: ['Palm Sugar: A Village Story'], focus: 'Pixel RPG / Rural India', fitScore: 90, website: '', location: 'Hyderabad', notes: 'Won Bharat Tech Triumph 2025. Selected for IGDC visibility. Rural South India setting.' },
  { name: 'Brewed Games', games: ['Winds of Arcana: Ruination'], focus: 'Metroidvania', fitScore: 88, website: '', location: 'India', notes: 'GDC 2025 India Pavilion. Won Upcoming Game of Year at IGDC 2024. Hollow Knight/Castlevania inspired.' },
  { name: 'Wingblade Studio', games: ['Null New Order'], focus: 'Narrative Hack-and-Slash', fitScore: 88, website: '', location: 'India', notes: 'UE5. God of War/Ninja Gaiden inspired. Indian history + mythology setting.' },
  { name: 'QUICKTEQUILA', games: ['Lovely Planet', 'Lovely Planet 2'], focus: 'FPS/Puzzle', fitScore: 80, website: '', location: 'India', notes: 'Vidhvat Madan. Made Lovely Planet as solo dev at 15 years old.' },
  
  // TIER 3: Mobile/Casual with Story Elements
  { name: 'SuperGaming', games: ['MaskGun', 'Indus', 'Tower Conquest'], focus: 'Mobile Multiplayer', fitScore: 75, website: 'https://www.supergaming.com/', location: 'Pune', notes: '$5.5M Series A. Bandai Namco investment. 50M+ downloads. Indus: 10M pre-regs.' },
  { name: 'GameEon Studios', games: ['Mumbai Gullies'], focus: 'Open World (GTA-inspired)', fitScore: 80, website: '', location: 'India', notes: 'Mumbai setting. Indian culture showcase. Ambitious AAA-style project.' },
  { name: '99Games', games: ['Star Chef', 'Star Chef 2', 'Dhoom:3 The Game'], focus: 'Casual/Strategy Mobile', fitScore: 70, website: '', location: 'Udupi, Karnataka', notes: 'Story-driven mobile games. Founded in Karnataka.' },
  { name: 'Moonfrog Labs', games: ['Teen Patti Gold', 'Baahubali: The Game', 'Ludo Club'], focus: 'Mobile Social/Casual', fitScore: 70, website: '', location: 'Bangalore', notes: 'Founded by Tanay Tayal & Oliver Jones. India-centric games. Baahubali = first Indian RTS.' },
  
  // TIER 4: Other Notable Studios
  { name: 'Xigma Games', games: ['The Bonfire: Forsaken Lands', 'The Bonfire 2'], focus: 'Survival/Strategy', fitScore: 75, website: '', location: 'Bangalore', notes: 'Indie studio. Bonfire series since 2018.' },
  { name: 'Gamestacy', games: ['Various'], focus: 'Game Development', fitScore: 65, website: '', location: 'India', notes: 'Large scale studio.' },
  { name: 'Studio Sirah', games: ['Indian content games'], focus: 'Indian Cultural Games', fitScore: 80, website: 'https://www.studiosirah.com/', location: 'India', notes: 'Core Indian content focus.' },
  { name: 'Dunali Games', games: ['Indie titles'], focus: 'Indie', fitScore: 75, website: '', location: 'India', notes: 'Emerging indie studio.' },
  { name: 'Rocklobster Games', games: ['Indie titles'], focus: 'Indie', fitScore: 70, website: '', location: 'India', notes: 'Indie developer.' },
  { name: 'Avian Hearts', games: ['Indie titles'], focus: 'Indie', fitScore: 70, website: '', location: 'India', notes: 'Small indie studio.' },
  { name: 'VishwaKarma Studios', games: ['Heroes Must Die'], focus: 'Action', fitScore: 70, website: '', location: 'India', notes: 'Heroes Must Die developer.' },
  { name: 'Lucid Labs', games: ['Possessions'], focus: 'Puzzle', fitScore: 70, website: '', location: 'India', notes: 'Puzzle game developer.' },
  { name: 'Holy Cow Games', games: ['Bot Rods'], focus: 'Racing/Action', fitScore: 65, website: '', location: 'India', notes: 'Bot Rods developer.' },
  
  // TIER 5: Services/Large Publishers
  { name: 'Nazara Technologies', games: ['Publisher - various mobile'], focus: 'Publisher/Mobile', fitScore: 60, website: 'https://www.nazara.com/', location: 'Mumbai', notes: 'Large mobile game publisher. Millions of active users.' },
  { name: 'JetSynthesys', games: ['Various mobile/esports'], focus: 'Mobile/Esports', fitScore: 55, website: '', location: 'Pune', notes: 'Gaming and esports company.' },
  { name: 'Juego Studios', games: ['Game dev services'], focus: 'Development Services', fitScore: 50, website: 'https://www.juegostudio.com/', location: 'India', notes: 'Game development services for USA, UK, UAE.' },
  
  // TIER 6: Art/Support Studios
  { name: 'Hashstash Studios', games: ['Art services'], focus: 'Game Art', fitScore: 45, website: '', location: 'Bangalore', notes: 'Game art studio.' },
  { name: 'Gameshastra', games: ['Mobile/casual'], focus: 'Mobile Development', fitScore: 50, website: '', location: 'Hyderabad', notes: 'Mobile and casual games.' },
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
    if (focusLower.includes('narrative') || focusLower.includes('story') || focusLower.includes('adventure')) {
      fitTags.push('Narrative Focus');
    }
    if (focusLower.includes('mythology') || focusLower.includes('indian') || focusLower.includes('cultural')) {
      fitTags.push('Cultural Themes');
    }
    if (focusLower.includes('rpg')) {
      fitTags.push('RPG');
    }
    
    // Determine priority
    const priority = studio.fitScore >= 95 ? 'high' : studio.fitScore >= 85 ? 'medium' : 'none';
    
    // Determine size
    let size = 'indie';
    if (studio.name === 'Nazara Technologies' || studio.name === 'SuperGaming') {
      size = 'large';
    }
    
    // Create lead
    await db.collection('leads').add({
      name: studio.name,
      type: 'studio',
      website: studio.website,
      country: 'India',
      location: studio.location || 'India',
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
        size: size,
        type: studio.focus.includes('Publisher') || studio.focus.includes('Services') ? 'Publisher' : 'Developer',
        games: studio.games,
        focus: studio.focus,
        fitScore: studio.fitScore,
        fitReason: studio.notes || 'Indian studio - ' + studio.focus,
        fitTags: fitTags,
      },
      tags: ['india', 'asia', 'south-asia'],
      notes: studio.notes || '',
      pipeline: {
        id: STUDIO_PIPELINE_ID,
        stageId: 'new-lead',
      },
      metadata: {
        source: 'india-research-2026-03-07',
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
