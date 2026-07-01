import * as admin from 'firebase-admin';
import * as path from 'path';

// Initialize Firebase Admin
const serviceAccountPath = path.resolve(__dirname, '../../service-account.json');
process.env.GOOGLE_APPLICATION_CREDENTIALS = serviceAccountPath;

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const db = admin.firestore();

interface Lead {
  name: string;
  company?: string;
  website?: string;
  country?: string;
  city?: string;
  tier?: string;
  status: string;
  type: string;
  source?: string;
  projectType?: string[];
  notes?: string;
  fit?: number;
  pipeline?: {
    id: string;
    stageId: string;
    enteredAt: FirebaseFirestore.Timestamp;
  };
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

// Studio pipeline ID
const STUDIO_PIPELINE_ID = 'Yo2OlGZdFFMWkFTr0n08';

const studios: Partial<Lead>[] = [
  // 🇺🇦 UKRAINE
  {
    name: 'GSC Game World',
    company: 'GSC Game World',
    website: 'https://gsc-game.com/',
    country: 'Ukraine',
    city: 'Kyiv/Prague',
    tier: 'AAA',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['FPS', 'Action RPG', 'Open World'],
    notes: 'S.T.A.L.K.E.R. series (2, Legends). 400+ employees. Split between Kyiv and Prague due to war. Major franchise with deep atmosphere and narrative.',
    fit: 85,
  },
  {
    name: 'Frogwares',
    company: 'Frogwares',
    website: 'https://frogwares.com/',
    country: 'Ukraine',
    city: 'Kyiv',
    tier: 'AA',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['Detective', 'Adventure', 'Narrative RPG'],
    notes: 'Sherlock Holmes franchise, The Sinking City. 80+ employees. MASTERS of detective narrative games. PERFECT Architect fit.',
    fit: 95,
  },
  {
    name: 'Twigames',
    company: 'Twigames',
    website: 'https://twigames.com/',
    country: 'Ukraine',
    city: 'Kyiv',
    tier: 'Indie',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['Narrative RPG', 'Adventure'],
    notes: '"Hollow Home" narrative RPG about child fleeing occupation. WON Indie Cup Ukraine 2024. War-themed narrative storytelling. PERFECT Architect fit.',
    fit: 98,
  },
  {
    name: 'Mauris',
    company: 'Mauris',
    website: 'https://corsairs-legacy.com/',
    country: 'Ukraine',
    city: 'Ukraine',
    tier: 'Indie',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['RPG', 'Open World', 'Pirate'],
    notes: '"Corsairs Legacy" open-world pirate RPG. Strong narrative elements, ship combat, exploration.',
    fit: 90,
  },
  {
    name: '1Stone Games',
    company: '1Stone Games',
    website: 'https://1stonegames.com/',
    country: 'Ukraine',
    city: 'Ukraine',
    tier: 'Indie',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['Narrative', 'Psychological'],
    notes: '"Unmasked: An Inner Journey" — narrative psychological game.',
    fit: 88,
  },
  {
    name: 'Vostok Games',
    company: 'Vostok Games',
    website: 'https://vostokgames.com/',
    country: 'Ukraine',
    city: 'Kyiv',
    tier: 'AA',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['Survival', 'Battle Royale'],
    notes: 'Fear the Wolves, Survarium. 50+ employees. Founded by ex-S.T.A.L.K.E.R. devs.',
    fit: 70,
  },
  {
    name: '4A Games (Reburn)',
    company: '4A Games',
    website: 'https://4a-games.com/',
    country: 'Ukraine',
    city: 'Kyiv/Malta',
    tier: 'AAA',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['FPS', 'Narrative', 'Post-Apocalyptic'],
    notes: 'Metro series (2033, Last Light, Exodus). Rebranding to "Reburn" in 2025. 150+ employees. Strong atmospheric narrative.',
    fit: 80,
  },
  
  // 🇵🇱 POLAND
  {
    name: 'CD Projekt Red',
    company: 'CD Projekt Red',
    website: 'https://cdprojektred.com/',
    country: 'Poland',
    city: 'Warsaw',
    tier: 'AAA',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['RPG', 'Open World', 'Narrative'],
    notes: 'The Witcher series, Cyberpunk 2077, Phantom Liberty. 1,100+ employees. Gold standard for narrative RPGs.',
    fit: 90,
  },
  {
    name: '11 bit studios',
    company: '11 bit studios',
    website: 'https://11bitstudios.com/',
    country: 'Poland',
    city: 'Warsaw',
    tier: 'AA',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['Strategy', 'Narrative', 'Survival'],
    notes: 'Frostpunk 2 (Digital Dragons GOTY 2024), This War of Mine, The Alters. 250+ employees. MASTERS of narrative systems. PERFECT fit.',
    fit: 95,
  },
  {
    name: 'Bloober Team',
    company: 'Bloober Team',
    website: 'https://blooberteam.com/',
    country: 'Poland',
    city: 'Krakow',
    tier: 'AA',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['Horror', 'Narrative', 'Psychological'],
    notes: 'Silent Hill 2 remake, Layers of Fear, The Medium. 350+ employees. Horror-narrative specialists.',
    fit: 85,
  },
  {
    name: 'Critical Hit Games',
    company: 'Critical Hit Games',
    website: 'https://criticalhitgames.com/',
    country: 'Poland',
    city: 'Krakow',
    tier: 'Indie',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['Detective', 'Narrative', 'Noir'],
    notes: '"Nobody Wants to Die" — narrative detective noir. Nominated Best Polish Narrative 2024. PERFECT Architect fit.',
    fit: 95,
  },
  {
    name: "Fool's Theory",
    company: "Fool's Theory",
    website: 'https://foolstheory.com/',
    country: 'Poland',
    city: 'Krakow',
    tier: 'AA',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['RPG', 'Narrative', 'Supernatural'],
    notes: '"The Thaumaturge" — narrative RPG. 60+ employees. Nominated Best Polish Narrative 2024. Strong dialogue systems.',
    fit: 95,
  },
  {
    name: 'Draw Distance',
    company: 'Draw Distance',
    website: 'https://drawdistance.dev/',
    country: 'Poland',
    city: 'Krakow',
    tier: 'AA',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['RPG', 'Narrative', 'Horror'],
    notes: 'Vampire: The Masquerade - Reckoning New York. World of Darkness license. 40+ employees.',
    fit: 92,
  },
  {
    name: 'Techland',
    company: 'Techland',
    website: 'https://techland.net/',
    country: 'Poland',
    city: 'Wrocław',
    tier: 'AAA',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['Action RPG', 'Open World', 'Survival'],
    notes: 'Dying Light series. 400+ employees. Strong faction systems and side quests.',
    fit: 75,
  },
  {
    name: 'CreativeForge Games',
    company: 'CreativeForge Games',
    website: 'https://creativeforge.pl/',
    country: 'Poland',
    city: 'Poland',
    tier: 'AA',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['Tactical', 'Strategy', 'Narrative'],
    notes: 'Hard West, Phantom Doctrine. Tactical narrative games with branching stories.',
    fit: 88,
  },
  {
    name: 'The Knights of Unity',
    company: 'The Knights of Unity',
    website: 'https://theknightsofunity.com/',
    country: 'Poland',
    city: 'Poland',
    tier: 'Indie',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['Unity', 'VR', 'Tools'],
    notes: '45 Unity developers. VR games, dev services. Potential integration partner.',
    fit: 70,
  },
  {
    name: 'Moonmana',
    company: 'Moonmana',
    website: 'https://moonmana.com/',
    country: 'Poland',
    city: 'Gdańsk',
    tier: 'AA',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['MMO', 'Strategy', 'Mobile'],
    notes: 'Pirates of Everseas — Top 5 strategy in 44 countries. Vividglow dev tool.',
    fit: 65,
  },
  
  // 🇨🇿 CZECH REPUBLIC
  {
    name: 'Warhorse Studios',
    company: 'Warhorse Studios',
    website: 'https://warhorsestudios.cz/',
    country: 'Czech Republic',
    city: 'Prague',
    tier: 'AA',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['RPG', 'Historical', 'Open World'],
    notes: 'Kingdom Come: Deliverance 1 & 2 (Feb 2025 massive success). 200+ employees. Daniel Vávra (Mafia creator). Historical narrative RPG masters. PERFECT fit.',
    fit: 98,
  },
  {
    name: 'Bohemia Interactive',
    company: 'Bohemia Interactive',
    website: 'https://www.bohemia.net/',
    country: 'Czech Republic',
    city: 'Prague',
    tier: 'AAA',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['Simulation', 'Survival', 'Sandbox'],
    notes: 'Arma series, DayZ, Ylands. 400+ employees. Simulation focus, limited narrative.',
    fit: 60,
  },
  {
    name: 'Amanita Design',
    company: 'Amanita Design',
    website: 'https://amanita-design.net/',
    country: 'Czech Republic',
    city: 'Prague',
    tier: 'Indie',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['Adventure', 'Puzzle', 'Art'],
    notes: 'Machinarium, Creaks, Botanicula, Samorost. 15 employees. Unique visual storytelling.',
    fit: 85,
  },
  {
    name: 'CBE Software',
    company: 'CBE Software',
    website: 'https://cbesoftware.com/',
    country: 'Czech Republic',
    city: 'Prague',
    tier: 'Indie',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['Horror', 'Narrative', 'Psychological'],
    notes: '"Someday You\'ll Return" — psychological horror with deep narrative. ~10 employees.',
    fit: 90,
  },
  {
    name: 'Charles Games',
    company: 'Charles Games',
    website: 'https://charlesgames.net/',
    country: 'Czech Republic',
    city: 'Prague',
    tier: 'Indie',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['Documentary', 'Narrative', 'Historical'],
    notes: '"Svoboda 1945: Liberation", "Attentat 1942" — documentary narrative games. ~10 employees. Interactive historical storytelling. PERFECT fit.',
    fit: 95,
  },
  
  // 🇷🇸 SERBIA
  {
    name: '3Lateral',
    company: '3Lateral (Epic Games)',
    website: 'https://www.3lateral.com/',
    country: 'Serbia',
    city: 'Novi Sad',
    tier: 'AAA',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['Technology', 'Character Creation', 'MetaHuman'],
    notes: 'MetaHuman Creator. Acquired by Epic Games 2019. 100+ employees. Character technology focus.',
    fit: 70,
  },
  {
    name: 'Nordeus',
    company: 'Nordeus',
    website: 'https://nordeus.com/',
    country: 'Serbia',
    city: 'Belgrade',
    tier: 'AA',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['Mobile', 'Sports', 'Management'],
    notes: 'Top Eleven — 260M users. Acquired by Take-Two for $378M (2021). 180+ employees.',
    fit: 50,
  },
  {
    name: 'Eipix Entertainment',
    company: 'Eipix Entertainment',
    website: 'https://www.eipix.com/',
    country: 'Serbia',
    city: 'Serbia',
    tier: 'AA',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['Hidden Object', 'Puzzle', 'Adventure'],
    notes: 'Hidden object puzzle adventure games for Big Fish. 250 employees. Founded 2005.',
    fit: 80,
  },
  {
    name: 'Mad Head Games',
    company: 'Mad Head Games',
    website: 'https://www.madheadgames.com/',
    country: 'Serbia',
    city: 'Serbia',
    tier: 'AA',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['Hidden Object', 'Adventure', 'Casual'],
    notes: 'Hidden object and adventure games. 100+ employees.',
    fit: 78,
  },
  {
    name: 'Two Desperados',
    company: 'Two Desperados',
    website: 'https://twodesperados.com/',
    country: 'Serbia',
    city: 'Serbia',
    tier: 'Indie',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['Puzzle', 'Narrative', 'Adventure'],
    notes: 'Narrative puzzle games. ~20 employees.',
    fit: 85,
  },
  
  // 🇭🇷 CROATIA
  {
    name: 'Croteam',
    company: 'Croteam',
    website: 'http://www.croteam.com/',
    country: 'Croatia',
    city: 'Zagreb',
    tier: 'AA',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['FPS', 'Puzzle', 'Philosophy'],
    notes: 'Serious Sam series, The Talos Principle. Founded 1992 — one of Europe\'s oldest. 100+ employees.',
    fit: 85,
  },
  {
    name: 'Nanobit',
    company: 'Nanobit',
    website: 'https://www.nanobit.com/',
    country: 'Croatia',
    city: 'Zagreb',
    tier: 'AA',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['Mobile', 'Narrative', 'Interactive Story'],
    notes: 'Mobile interactive story games. 185M downloads. 150+ employees. Hollywood Story, My Story: Choose Your Path.',
    fit: 55,
  },
  {
    name: 'Pine Studio',
    company: 'Pine Studio',
    website: 'https://pinestudio.com/',
    country: 'Croatia',
    city: 'Samobor',
    tier: 'Indie',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['Puzzle', 'Escape Room', 'VR'],
    notes: 'Escape Simulator, Faraway, The Birdcage. ~20 employees.',
    fit: 80,
  },
  {
    name: 'Exordium Games',
    company: 'Exordium Games',
    website: 'https://exordiumgames.com/',
    country: 'Croatia',
    city: 'Zagreb',
    tier: 'Indie',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['Adventure', 'Narrative', 'Indie'],
    notes: 'Bear With Me, 100+ games. Founded 2014. 30+ employees. 20M+ mobile users.',
    fit: 85,
  },
  {
    name: 'Gamechuck',
    company: 'Gamechuck',
    website: 'https://game-chuck.com/',
    country: 'Croatia',
    city: 'Croatia',
    tier: 'Indie',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['Interactive Comics', 'Narrative', 'Innovation'],
    notes: 'Creating new "interactive comics" genre. Retro-styled games. Narrative innovation. PERFECT fit.',
    fit: 92,
  },
  {
    name: 'Lion Game Lion',
    company: 'Lion Game Lion',
    website: 'http://www.liongamelion.com/',
    country: 'Croatia',
    city: 'Zagreb',
    tier: 'AA',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['FPS', 'Heist', 'Co-op'],
    notes: 'RAID: WWII, heist DLCs for Payday. Founded 2014. 40+ employees.',
    fit: 75,
  },
  
  // 🇷🇴 ROMANIA
  {
    name: 'Amber',
    company: 'Amber',
    website: 'https://amberstudio.com/',
    country: 'Romania',
    city: 'Bucharest',
    tier: 'AA',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['Co-Development', 'Full Service', 'Multi-Platform'],
    notes: 'Full-service game dev. Offices: Bucharest, Botosani, SF, LA, Guadalajara, Montreal. 500+ employees.',
    fit: 65,
  },
  {
    name: 'machinations.io',
    company: 'machinations.io',
    website: 'https://machinations.io/',
    country: 'Romania',
    city: 'Romania',
    tier: 'Indie',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['Tools', 'Game Design', 'Economy'],
    notes: 'Game economy design platform. 35K users. $5M funding. Potential partnership for game systems design.',
    fit: 70,
  },
  {
    name: 'DPS Games',
    company: 'DPS Games',
    website: 'https://dpsgames.ro/',
    country: 'Romania',
    city: 'Bucharest',
    tier: 'Indie',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['VR', 'AR', 'Indie'],
    notes: 'VR/AR indie studio. Animation, rigging expertise.',
    fit: 75,
  },
  {
    name: 'FHD Interactive',
    company: 'FHD Interactive',
    website: 'https://fhdinteractive.com/',
    country: 'Romania',
    city: 'Romania',
    tier: 'Indie',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['Adventure', 'Narrative'],
    notes: 'Narrative adventures.',
    fit: 85,
  },
  
  // 🇧🇬 BULGARIA
  {
    name: 'Haemimont Games',
    company: 'Haemimont Games',
    website: 'https://www.haemimontgames.com/',
    country: 'Bulgaria',
    city: 'Sofia',
    tier: 'AA',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['Strategy', 'Simulation', 'City Builder'],
    notes: 'Tropico series, Surviving Mars. 100+ employees. Strong systems design.',
    fit: 75,
  },
  {
    name: 'Black Sea Games',
    company: 'Black Sea Games',
    website: 'https://blackseagames.com/',
    country: 'Bulgaria',
    city: 'Sofia',
    tier: 'Indie',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['RPG', 'Strategy', 'Medieval'],
    notes: 'Legends of Eisenwald. 30+ employees. Medieval RPG focus.',
    fit: 80,
  },
  
  // 🇭🇺 HUNGARY
  {
    name: 'NeoCoreGames',
    company: 'NeoCoreGames',
    website: 'https://neocoregames.com/',
    country: 'Hungary',
    city: 'Budapest',
    tier: 'AA',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['RPG', 'Action RPG', 'Strategy'],
    notes: 'Van Helsing trilogy, King Arthur series, Deathtrap. Founded 2005. Strong ARPG narrative.',
    fit: 85,
  },
  {
    name: 'Primal Game Studio',
    company: 'Primal Game Studio',
    website: 'https://primalgs.com/',
    country: 'Hungary',
    city: 'Hungary',
    tier: 'AA',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['Action RPG', 'Dark Fantasy', 'MOBA'],
    notes: '"Mandragora" dark fantasy action RPG, "Around" hand-drawn adventure. 50+ employees. Founded 2012. PERFECT fit.',
    fit: 92,
  },
  
  // 🇸🇮 SLOVENIA
  {
    name: 'Outfit7',
    company: 'Outfit7',
    website: 'https://outfit7.com/',
    country: 'Slovenia',
    city: 'Ljubljana',
    tier: 'AAA',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['Mobile', 'Kids', 'Virtual Pet'],
    notes: 'Talking Tom — 12 BILLION downloads. 400+ employees. Kids/mobile focus, not narrative fit.',
    fit: 45,
  },
  
  // 🇲🇰 NORTH MACEDONIA
  {
    name: 'Intetic',
    company: 'Intetic',
    website: 'https://www.intetic.com/',
    country: 'North Macedonia',
    city: 'North Macedonia',
    tier: 'Indie',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['Horror', 'Narrative', 'Adventure'],
    notes: 'The Strange Story of Brian Fisher (Chapters 1 & 2). Founded 2012. Story-focused horror.',
    fit: 82,
  },
  
  // 🇦🇱 ALBANIA
  {
    name: 'BEEZ Agency',
    company: 'BEEZ Agency',
    website: 'https://beez.games/',
    country: 'Albania',
    city: 'Tirana',
    tier: 'Indie',
    type: 'studio',
    source: 'Eastern Europe Research 2026-03',
    projectType: ['Indie', 'Game Dev'],
    notes: 'Female-founded (Lorena Gjana, March 2022). Building Albanian gaming industry. Working on "Seven Seas".',
    fit: 78,
  },
];

async function importStudios() {
  console.log(`\n🇪🇺 Importing ${studios.length} Eastern European studios...\n`);
  
  const batch = db.batch();
  const now = admin.firestore.Timestamp.now();
  let count = 0;
  
  for (const studio of studios) {
    const docRef = db.collection('leads').doc();
    
    const lead: Lead = {
      name: studio.name!,
      company: studio.company,
      website: studio.website,
      country: studio.country,
      city: studio.city,
      tier: studio.tier,
      status: 'new',
      type: 'studio',
      source: studio.source,
      projectType: studio.projectType,
      notes: studio.notes,
      fit: studio.fit,
      pipeline: {
        id: STUDIO_PIPELINE_ID,
        stageId: 'new',
        enteredAt: now,
      },
      createdAt: now,
      updatedAt: now,
    };
    
    batch.set(docRef, lead);
    count++;
    
    // Log by country
    const flag = getFlag(studio.country || '');
    console.log(`  ${flag} ${studio.name} (${studio.city || studio.country}) — fit: ${studio.fit}`);
  }
  
  await batch.commit();
  console.log(`\n✅ Imported ${count} Eastern European studios!`);
  
  // Summary by country
  const byCountry = studios.reduce((acc, s) => {
    const country = s.country || 'Unknown';
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  console.log('\n📊 Summary by Country:');
  for (const [country, num] of Object.entries(byCountry).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${getFlag(country)} ${country}: ${num}`);
  }
  
  // Top narrative fits
  const topFits = studios.filter(s => (s.fit || 0) >= 90).sort((a, b) => (b.fit || 0) - (a.fit || 0));
  console.log('\n🎯 Top Architect Fits (90+):');
  for (const s of topFits) {
    console.log(`  ${getFlag(s.country || '')} ${s.name}: ${s.fit}`);
  }
}

function getFlag(country: string): string {
  const flags: Record<string, string> = {
    'Ukraine': '🇺🇦',
    'Poland': '🇵🇱',
    'Czech Republic': '🇨🇿',
    'Serbia': '🇷🇸',
    'Croatia': '🇭🇷',
    'Romania': '🇷🇴',
    'Bulgaria': '🇧🇬',
    'Hungary': '🇭🇺',
    'Slovenia': '🇸🇮',
    'North Macedonia': '🇲🇰',
    'Albania': '🇦🇱',
    'Slovakia': '🇸🇰',
  };
  return flags[country] || '🌍';
}

importStudios()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
