import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccountPath = path.resolve(__dirname, '../../service-account.json');
process.env.GOOGLE_APPLICATION_CREDENTIALS = serviceAccountPath;

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const db = admin.firestore();
const STUDIO_PIPELINE_ID = 'Yo2OlGZdFFMWkFTr0n08';

interface StudioData {
  name: string;
  company?: string;
  website?: string;
  country: string;
  city?: string;
  tier?: string;
  source: string;
  projectType?: string[];
  notes?: string;
  fit?: number;
}

const studios: StudioData[] = [
  // === TURKEY 🇹🇷 ===
  {
    name: 'TaleWorlds Entertainment',
    company: 'TaleWorlds Entertainment',
    website: 'https://www.taleworlds.com/',
    country: 'Turkey',
    city: 'Ankara',
    tier: 'AAA',
    source: 'Turkey Region Research 2026-03',
    projectType: ['RPG', 'Sandbox', 'Medieval', 'Strategy'],
    notes: 'Mount & Blade series (Warband, With Fire & Sword, Bannerlord). Masters of medieval sandbox RPG with emergent narrative. PERFECT fit.',
    fit: 98,
  },
  {
    name: 'Phew Phew Games',
    company: 'Phew Phew Games',
    country: 'Turkey',
    city: 'Turkey',
    tier: 'Indie',
    source: 'Turkey Region Research 2026-03',
    projectType: ['Action', 'Roguelite', 'Narrative'],
    notes: 'Anomaly Agent (Jan 2024), Anomaly President (Q1 2026). Action-narrative roguelite hybrid. Strong narrative focus.',
    fit: 90,
  },
  {
    name: 'Tekden Studio',
    company: 'Tekden Studio',
    country: 'Turkey',
    city: 'Turkey',
    tier: 'Indie',
    source: 'Turkey Region Research 2026-03',
    projectType: ['Action-Adventure', 'Historical', 'Medieval'],
    notes: 'Ertugrul of Ulukayin (Q4 2026). Turkish medieval action-adventure! Cultural narrative.',
    fit: 92,
  },
  {
    name: 'Nowhere Studios',
    company: 'Nowhere Studios',
    country: 'Turkey',
    city: 'Turkey',
    tier: 'Indie',
    source: 'Turkey Region Research 2026-03',
    projectType: ['Platformer', 'Narrative', 'Atmospheric'],
    notes: 'Monochroma (2014). Narrative-driven atmospheric platformer.',
    fit: 85,
  },
  {
    name: 'ELYZIO',
    company: 'ELYZIO',
    country: 'Turkey',
    city: 'Turkey',
    tier: 'Indie',
    source: 'Turkey Region Research 2026-03',
    projectType: ['Indie', 'RPG'],
    notes: "Warden's Will (Jan 2025), Pera Coda (2026).",
    fit: 80,
  },
  {
    name: 'Peak Games',
    company: 'Peak Games',
    website: 'https://peak.com/',
    country: 'Turkey',
    city: 'Istanbul',
    tier: 'AAA',
    source: 'Turkey Region Research 2026-03',
    projectType: ['Mobile', 'Puzzle', 'Casual'],
    notes: 'Acquired by Zynga for $1.8B. Mobile gaming giant. 43+ alumni startups.',
    fit: 50,
  },
  {
    name: 'Dream Games',
    company: 'Dream Games',
    country: 'Turkey',
    city: 'Istanbul',
    tier: 'AAA',
    source: 'Turkey Region Research 2026-03',
    projectType: ['Mobile', 'Puzzle'],
    notes: 'Royal Match. $2.75B valuation. Mobile puzzle.',
    fit: 40,
  },
  {
    name: 'Fugo Games',
    company: 'Fugo Games',
    country: 'Turkey',
    city: 'Turkey',
    tier: 'AA',
    source: 'Turkey Region Research 2026-03',
    projectType: ['Various'],
    notes: '10+ years experience. Turkish gaming veteran.',
    fit: 70,
  },
  {
    name: 'threeW Games',
    company: 'threeW Games',
    country: 'Turkey',
    city: 'Turkey',
    tier: 'Indie',
    source: 'Turkey Region Research 2026-03',
    projectType: ['Indie'],
    notes: 'Feather Party (March 2024), Zombie Graveyard Simulator (June 2025).',
    fit: 65,
  },

  // === GREECE 🇬🇷 ===
  {
    name: 'Aventurine SA',
    company: 'Aventurine SA',
    country: 'Greece',
    city: 'Athens',
    tier: 'AA',
    source: 'Turkey Region Research 2026-03',
    projectType: ['MMORPG', 'Fantasy'],
    notes: 'Darkfall series. Developer and publisher. Greek MMORPG studio.',
    fit: 80,
  },
  {
    name: 'IPHIGAMES',
    company: 'IPHIGAMES',
    country: 'Greece',
    city: 'Athens',
    tier: 'Indie',
    source: 'Turkey Region Research 2026-03',
    projectType: ['Indie'],
    notes: 'Athens-based indie studio and publishing label.',
    fit: 75,
  },
  {
    name: 'Beyond Those Hills',
    company: 'Beyond Those Hills',
    country: 'Greece',
    city: 'Athens',
    tier: 'Indie',
    source: 'Turkey Region Research 2026-03',
    projectType: ['Narrative', 'Indie'],
    notes: 'Athens indie developer. Narrative focus.',
    fit: 80,
  },
  {
    name: 'Gemcraft Games Studio',
    company: 'Gemcraft Games Studio',
    website: 'http://gemcraftgames.com/',
    country: 'Greece',
    city: 'Athens',
    tier: 'Indie',
    source: 'Turkey Region Research 2026-03',
    projectType: ['Mobile', 'PC', 'Innovative'],
    notes: 'Independent developer specializing in high-quality mobile/PC games with innovative mechanics.',
    fit: 75,
  },
  {
    name: 'ZeusPlay',
    company: 'ZeusPlay',
    website: 'https://zeusplay.com/',
    country: 'Greece',
    city: 'Thessaloniki',
    tier: 'AA',
    source: 'Turkey Region Research 2026-03',
    projectType: ['Software', 'Games'],
    notes: 'Thessaloniki-based game/software company.',
    fit: 65,
  },
  {
    name: 'Monsters',
    company: 'Monsters',
    country: 'Greece',
    city: 'Athens',
    tier: 'Indie',
    source: 'Turkey Region Research 2026-03',
    projectType: ['Indie'],
    notes: 'Athens indie studio.',
    fit: 70,
  },
  {
    name: 'Dionous Games',
    company: 'Dionous Games',
    country: 'Greece',
    city: 'Athens',
    tier: 'Indie',
    source: 'Turkey Region Research 2026-03',
    projectType: ['Indie'],
    notes: 'Athens indie studio.',
    fit: 70,
  },

  // === CYPRUS 🇨🇾 ===
  {
    name: 'Owlcat Games',
    company: 'Owlcat Games',
    website: 'https://owlcatgames.com/',
    country: 'Cyprus',
    city: 'Nicosia',
    tier: 'AAA',
    source: 'Turkey Region Research 2026-03',
    projectType: ['CRPG', 'Tactical', 'Narrative', 'RPG'],
    notes: 'Pathfinder: Kingmaker, Wrath of the Righteous, Rogue Trader. CRPG MASTERS! Complex narrative RPGs. Now publishing (Aug 2024). PERFECT fit!',
    fit: 99,
  },
  {
    name: 'Synvector',
    company: 'Synvector',
    country: 'Cyprus',
    city: 'Limassol',
    tier: 'AA',
    source: 'Turkey Region Research 2026-03',
    projectType: ['Action-RPG', 'Sci-Fi', 'Tactical'],
    notes: 'Sci-fi action RPG with tactical pause. Command mercenary fleet in morally complex galaxy.',
    fit: 88,
  },
  {
    name: 'Scorewarrior',
    company: 'Scorewarrior',
    country: 'Cyprus',
    city: 'Limassol',
    tier: 'AA',
    source: 'Turkey Region Research 2026-03',
    projectType: ['4X Strategy', 'MMO'],
    notes: 'Founded 2015. 4X strategy MMO games.',
    fit: 75,
  },
  {
    name: 'Wargaming Nicosia',
    company: 'Wargaming',
    country: 'Cyprus',
    city: 'Nicosia',
    tier: 'AAA',
    source: 'Turkey Region Research 2026-03',
    projectType: ['MMO', 'Military', 'Strategy'],
    notes: 'World of Tanks, World of Warships. Major Cyprus office.',
    fit: 60,
  },
];

async function importStudios() {
  console.log(`\n🌍 Importing ${studios.length} Turkey/Greece/Cyprus studios...\n`);
  
  const batch = db.batch();
  const now = admin.firestore.Timestamp.now();
  let count = 0;
  
  const countryEmoji: Record<string, string> = {
    'Turkey': '🇹🇷',
    'Greece': '🇬🇷',
    'Cyprus': '🇨🇾',
  };
  
  for (const studio of studios) {
    const docRef = db.collection('leads').doc();
    
    const lead: any = {
      name: studio.name,
      status: 'new',
      type: 'studio',
      country: studio.country,
      pipeline: {
        id: STUDIO_PIPELINE_ID,
        stageId: 'new',
        enteredAt: now,
      },
      createdAt: now,
      updatedAt: now,
    };
    
    if (studio.company) lead.company = studio.company;
    if (studio.website) lead.website = studio.website;
    if (studio.city) lead.city = studio.city;
    if (studio.tier) lead.tier = studio.tier;
    if (studio.source) lead.source = studio.source;
    if (studio.projectType) lead.projectType = studio.projectType;
    if (studio.notes) lead.notes = studio.notes;
    if (studio.fit) lead.fit = studio.fit;
    
    batch.set(docRef, lead);
    count++;
    
    const emoji = countryEmoji[studio.country] || '🌍';
    console.log(`  ${emoji} ${studio.name} (${studio.city || studio.country}) — fit: ${studio.fit}`);
  }
  
  await batch.commit();
  console.log(`\n✅ Imported ${count} Turkey/Greece/Cyprus studios!`);
  
  // Summary by country
  const byCountry: Record<string, number> = {};
  for (const s of studios) {
    byCountry[s.country] = (byCountry[s.country] || 0) + 1;
  }
  
  console.log('\n📊 By Country:');
  for (const [country, num] of Object.entries(byCountry)) {
    const emoji = countryEmoji[country] || '🌍';
    console.log(`  ${emoji} ${country}: ${num}`);
  }
  
  const topFits = studios.filter(s => (s.fit || 0) >= 85).sort((a, b) => (b.fit || 0) - (a.fit || 0));
  console.log('\n🎯 Top Architect Fits (85+):');
  for (const s of topFits) {
    const emoji = countryEmoji[s.country] || '🌍';
    console.log(`  ${emoji} ${s.name}: ${s.fit}`);
  }
}

importStudios()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
