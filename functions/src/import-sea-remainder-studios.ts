import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccountPath = path.resolve(__dirname, '../../service-account.json');
process.env.GOOGLE_APPLICATION_CREDENTIALS = serviceAccountPath;

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const db = admin.firestore();
const STUDIO_PIPELINE_ID = 'Yo2OlGZdFFMWkFTr0n08';

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

const studios: Partial<Lead>[] = [
  // 🇻🇳 VIETNAM
  {
    name: 'VNG Game Studio',
    company: 'VNG Corporation',
    website: 'https://vng.com.vn/',
    country: 'Vietnam',
    city: 'Ho Chi Minh',
    tier: 'AAA',
    type: 'studio',
    source: 'SEA Remainder Research 2026-03',
    projectType: ['MMORPG', 'Mobile', 'Platform'],
    notes: 'Vietnam\'s largest game company. ZingPlay (30M users), Thuận Thiên Kiếm. Founded 2004 by Lê Hồng Minh. Part of VGDA.',
    fit: 60,
  },
  {
    name: 'Hiker Games',
    company: 'Hiker Games',
    website: 'https://hikergames.com/',
    country: 'Vietnam',
    city: 'Hanoi',
    tier: 'AA',
    type: 'studio',
    source: 'SEA Remainder Research 2026-03',
    projectType: ['FPS', 'Historical', 'Action'],
    notes: '7554 (Vietnam\'s Call of Duty), 300475. Formerly Emobi Games. VGDA Head: Nguyễn Tuấn Huy. First Indochina War themed games.',
    fit: 85,
  },
  {
    name: 'DUT Studio',
    company: 'DUT Studio',
    website: 'https://www.facebook.com/DUTStudio/',
    country: 'Vietnam',
    city: 'Vietnam',
    tier: 'Indie',
    type: 'studio',
    source: 'SEA Remainder Research 2026-03',
    projectType: ['Horror', 'Narrative', 'Adventure'],
    notes: '"Thần Trùng / The Death" (2022) — psychological horror set in Hanoi. 2,000+ Steam reviews. Vietnamese cultural elements.',
    fit: 92,
  },
  {
    name: 'Rare Reversee',
    company: 'Rare Reversee',
    website: 'https://www.rarereversee.com/',
    country: 'Vietnam',
    city: 'Vietnam',
    tier: 'Indie',
    type: 'studio',
    source: 'SEA Remainder Research 2026-03',
    projectType: ['Horror', 'Narrative', 'Psychological'],
    notes: '"The Scourge / Tai Ương" (2024) — psychological horror in 1990s Saigon. AAA-quality visuals. PERFECT narrative fit.',
    fit: 95,
  },
  {
    name: 'marisa0704',
    company: 'marisa0704',
    country: 'Vietnam',
    city: 'Vietnam',
    tier: 'Indie',
    type: 'studio',
    source: 'SEA Remainder Research 2026-03',
    projectType: ['Horror', 'Narrative', 'Cooking'],
    notes: '"Brother Hai\'s Pho Restaurant" (2025) — viral horror game. Vietnamese culture, crime themes. Unity/Godot. Student developer.',
    fit: 88,
  },
  {
    name: 'Amanotes',
    company: 'Amanotes',
    website: 'https://www.amanotes.com/',
    country: 'Vietnam',
    city: 'Vietnam',
    tier: 'AA',
    type: 'studio',
    source: 'SEA Remainder Research 2026-03',
    projectType: ['Mobile', 'Rhythm', 'Casual'],
    notes: 'Magic Tiles 3 — 500M+ downloads. Mobile rhythm games.',
    fit: 50,
  },
  {
    name: 'Archmage Games Studio',
    company: 'Archmage Games Studio',
    website: 'https://archmagegames.com/',
    country: 'Vietnam',
    city: 'Hanoi',
    tier: 'Indie',
    type: 'studio',
    source: 'SEA Remainder Research 2026-03',
    projectType: ['PC', 'Indie', 'Unity'],
    notes: 'Indie PC games studio. Founded August 2021. Unity-based.',
    fit: 75,
  },
  {
    name: 'Bazooka Game Studio',
    company: 'Bazooka Game Studio',
    country: 'Vietnam',
    city: 'Hanoi',
    tier: 'Indie',
    type: 'studio',
    source: 'SEA Remainder Research 2026-03',
    projectType: ['Mobile', 'Casual'],
    notes: 'VGDA Deputy Organizing Committee North. Đàm Trọng Đức.',
    fit: 70,
  },
  {
    name: 'Wolffun Game',
    company: 'Wolffun Game',
    website: 'https://wolffungame.com/',
    country: 'Vietnam',
    city: 'Ho Chi Minh',
    tier: 'AA',
    type: 'studio',
    source: 'SEA Remainder Research 2026-03',
    projectType: ['Mobile', 'Strategy'],
    notes: 'VGDA Deputy Organizing Committee South. Nguyễn Đình Khánh.',
    fit: 70,
  },
  {
    name: 'GihOt (GOSUVERSE)',
    company: 'GihOt',
    website: 'https://gihot.vn/',
    country: 'Vietnam',
    city: 'Vietnam',
    tier: 'AA',
    type: 'studio',
    source: 'SEA Remainder Research 2026-03',
    projectType: ['Mobile', 'Online'],
    notes: 'One of Vietnam\'s pioneering mobile game studios. Part of GOSUVERSE.',
    fit: 55,
  },

  // 🇵🇭 PHILIPPINES
  {
    name: 'Polychroma Games',
    company: 'Polychroma Games',
    website: 'https://untilthengame.com/',
    country: 'Philippines',
    city: 'Philippines',
    tier: 'Indie',
    type: 'studio',
    source: 'SEA Remainder Research 2026-03',
    projectType: ['Narrative', 'Adventure', '2.5D'],
    notes: '"Until Then" (2024) — 2.5D narrative adventure. Filipino high school setting. DLC "Afterimages" 2026. International acclaim! @PolychromaGames. PERFECT Architect fit.',
    fit: 98,
  },
  {
    name: 'Ranida Games',
    company: 'Ranida Games',
    website: 'https://ranidagames.com/',
    country: 'Philippines',
    city: 'Philippines',
    tier: 'Indie',
    type: 'studio',
    source: 'SEA Remainder Research 2026-03',
    projectType: ['Fighting', 'Mythology', 'Action'],
    notes: '"BAYANI" — Filipino mythology fighting game. Pre-colonial Filipino warriors.',
    fit: 85,
  },
  {
    name: 'Monstronauts',
    company: 'Monstronauts',
    country: 'Philippines',
    city: 'Philippines',
    tier: 'Indie',
    type: 'studio',
    source: 'SEA Remainder Research 2026-03',
    projectType: ['Mobile', 'Casual', 'Simulation'],
    notes: '"Potion Punch 2" — mobile simulation games.',
    fit: 60,
  },
  {
    name: 'Senshi Labs',
    company: 'Senshi Labs',
    country: 'Philippines',
    city: 'Philippines',
    tier: 'Indie',
    type: 'studio',
    source: 'SEA Remainder Research 2026-03',
    projectType: ['Indie'],
    notes: 'Emerging studio. Showcased at Indie Game Stars @ PGDX 2025.',
    fit: 75,
  },
  {
    name: 'CoinFlip Games',
    company: 'CoinFlip Games',
    country: 'Philippines',
    city: 'Philippines',
    tier: 'Indie',
    type: 'studio',
    source: 'SEA Remainder Research 2026-03',
    projectType: ['Indie'],
    notes: 'Emerging studio. Showcased at Indie Game Stars @ PGDX 2025.',
    fit: 75,
  },
  {
    name: 'Secret 6',
    company: 'Secret 6',
    website: 'https://secret6.com/',
    country: 'Philippines',
    city: 'Manila',
    tier: 'AA',
    type: 'studio',
    source: 'SEA Remainder Research 2026-03',
    projectType: ['Co-dev', 'Art', 'AAA Support'],
    notes: 'AAA outsourcing and co-development. Art services.',
    fit: 50,
  },

  // 🇧🇩 BANGLADESH
  {
    name: 'Unbound Game Studio',
    company: 'Unbound Game Studio',
    website: 'https://unboundgamestudio.com/',
    country: 'Bangladesh',
    city: 'Dhaka',
    tier: 'Indie',
    type: 'studio',
    source: 'SEA Remainder Research 2026-03',
    projectType: ['Platformer', 'Puzzle', 'Mobile'],
    notes: 'Founded 2012. 30 employees. 25+ titles in platformers and puzzles.',
    fit: 75,
  },
  {
    name: 'PortBliss',
    company: 'PortBliss',
    website: 'https://www.portbliss.org/',
    country: 'Bangladesh',
    city: 'Bangladesh',
    tier: 'Indie',
    type: 'studio',
    source: 'SEA Remainder Research 2026-03',
    projectType: ['Mobile', 'Historical'],
    notes: '"Heroes of 71" — 1971 Liberation War themed mobile game. Revolutionary Bangladeshi gaming.',
    fit: 80,
  },
  {
    name: 'Adreama Games',
    company: 'Adreama Games',
    country: 'Bangladesh',
    city: 'Bangladesh',
    tier: 'Indie',
    type: 'studio',
    source: 'SEA Remainder Research 2026-03',
    projectType: ['Board Games', 'Narrative'],
    notes: 'Narrative-driven board games. Blurs line between gameplay and storytelling.',
    fit: 72,
  },

  // 🇱🇰 SRI LANKA
  {
    name: 'Mogo Games',
    company: 'Mogo Games',
    website: 'https://mogogames.lk/',
    country: 'Sri Lanka',
    city: 'Colombo',
    tier: 'Indie',
    type: 'studio',
    source: 'SEA Remainder Research 2026-03',
    projectType: ['RPG', 'Mythology', 'Narrative'],
    notes: '"Song of Kings" — FIRST Sri Lankan game at Tokyo Game Show 2025! Sri Lankan mythology. Founded 2022. Passion for storytelling. PERFECT fit.',
    fit: 95,
  },
  {
    name: 'RAM Studios',
    company: 'RAM Studios',
    website: 'https://www.instagram.com/ramstudiossl/',
    country: 'Sri Lanka',
    city: 'Sri Lanka',
    tier: 'Indie',
    type: 'studio',
    source: 'SEA Remainder Research 2026-03',
    projectType: ['Virtual', 'Experience'],
    notes: 'SriVerse virtual experiences. Lanka Comic Con 2024.',
    fit: 70,
  },
  {
    name: 'Iron Blood Games',
    company: 'Iron Blood Games',
    country: 'Sri Lanka',
    city: 'Sri Lanka',
    tier: 'Indie',
    type: 'studio',
    source: 'SEA Remainder Research 2026-03',
    projectType: ['Game Dev'],
    notes: 'Driving Sri Lankan game industry growth.',
    fit: 72,
  },
  {
    name: 'Miusoft',
    company: 'Miusoft',
    country: 'Sri Lanka',
    city: 'Sri Lanka',
    tier: 'Indie',
    type: 'studio',
    source: 'SEA Remainder Research 2026-03',
    projectType: ['Game Dev'],
    notes: 'Driving Sri Lankan game industry growth.',
    fit: 70,
  },
  {
    name: 'Chamindka Abeysinghe',
    company: 'Independent',
    country: 'Sri Lanka',
    city: 'Sri Lanka',
    tier: 'Indie',
    type: 'studio',
    source: 'SEA Remainder Research 2026-03',
    projectType: ['Narrative', 'Cultural', 'Art'],
    notes: '"Taala Village" — indie narrative with Sri Lankan cultural themes and atmosphere.',
    fit: 85,
  },
];

async function importStudios() {
  console.log(`\n🌏 Importing ${studios.length} Southeast Asia Remainder studios...\n`);
  
  const batch = db.batch();
  const now = admin.firestore.Timestamp.now();
  let count = 0;
  
  for (const studio of studios) {
    const docRef = db.collection('leads').doc();
    
    const lead: any = {
      name: studio.name!,
      status: 'new',
      type: 'studio',
      pipeline: {
        id: STUDIO_PIPELINE_ID,
        stageId: 'new',
        enteredAt: now,
      },
      createdAt: now,
      updatedAt: now,
    };
    // Only add defined fields
    if (studio.company) lead.company = studio.company;
    if (studio.website) lead.website = studio.website;
    if (studio.country) lead.country = studio.country;
    if (studio.city) lead.city = studio.city;
    if (studio.tier) lead.tier = studio.tier;
    if (studio.source) lead.source = studio.source;
    if (studio.projectType) lead.projectType = studio.projectType;
    if (studio.notes) lead.notes = studio.notes;
    if (studio.fit) lead.fit = studio.fit;
    
    batch.set(docRef, lead);
    count++;
    
    const flag = getFlag(studio.country || '');
    console.log(`  ${flag} ${studio.name} (${studio.city || studio.country}) — fit: ${studio.fit}`);
  }
  
  await batch.commit();
  console.log(`\n✅ Imported ${count} Southeast Asia Remainder studios!`);
  
  const byCountry = studios.reduce((acc, s) => {
    const country = s.country || 'Unknown';
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  console.log('\n📊 Summary by Country:');
  for (const [country, num] of Object.entries(byCountry).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${getFlag(country)} ${country}: ${num}`);
  }
  
  const topFits = studios.filter(s => (s.fit || 0) >= 85).sort((a, b) => (b.fit || 0) - (a.fit || 0));
  console.log('\n🎯 Top Architect Fits (85+):');
  for (const s of topFits) {
    console.log(`  ${getFlag(s.country || '')} ${s.name}: ${s.fit}`);
  }
}

function getFlag(country: string): string {
  const flags: Record<string, string> = {
    'Vietnam': '🇻🇳',
    'Philippines': '🇵🇭',
    'Bangladesh': '🇧🇩',
    'Sri Lanka': '🇱🇰',
  };
  return flags[country] || '🌏';
}

importStudios()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
