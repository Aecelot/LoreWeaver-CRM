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
  // Major Studios
  {
    name: 'ARVORE',
    company: 'ARVORE Immersive Experiences',
    website: 'https://arvore.io/',
    country: 'Brazil',
    city: 'São Paulo',
    tier: 'AA',
    source: 'Brazil Research 2026-03',
    projectType: ['VR', 'Narrative', 'Immersive'],
    notes: 'Emmy Award-winning Brazilian XR studio. Pixel Ripped series (1989, 1995, 1978), YUKI, CLAWBALL. "Immersive storytelling company." PERFECT narrative fit for Architect.',
    fit: 98,
  },
  {
    name: 'Behold Studios',
    company: 'Behold Studios',
    website: 'https://beholdstudios.com/',
    country: 'Brazil',
    city: 'Brasília',
    tier: 'AA',
    source: 'Brazil Research 2026-03',
    projectType: ['RPG', 'Tactical', 'Narrative'],
    notes: 'Chroma Squad, Knights of Pen and Paper. Quirky narrative-driven RPGs. Tactical strategy with humor. PERFECT fit.',
    fit: 95,
  },
  {
    name: 'Other Tales Interactive',
    company: 'Other Tales Interactive',
    website: 'https://www.othertales.com/',
    country: 'Brazil',
    city: 'Brazil',
    tier: 'Indie',
    source: 'Brazil Research 2026-03',
    projectType: ['Narrative', 'Adventure', 'Emotional'],
    notes: '"Miniatures" — four handcrafted adventures about childhood where imagination and reality merge. Emotional narrative. "Best Art Style 2024" nomination.',
    fit: 95,
  },
  {
    name: 'JoyMasher',
    company: 'JoyMasher',
    website: 'https://joymasher.com/',
    country: 'Brazil',
    city: 'Curitiba',
    tier: 'Indie',
    source: 'Brazil Research 2026-03',
    projectType: ['Retro', 'Action', 'Platformer'],
    notes: 'Oniken, Odallus, Blazing Chrome. "We know retro." High-quality retro action games since 2012.',
    fit: 85,
  },
  {
    name: 'Rogue Snail',
    company: 'Rogue Snail',
    website: 'https://roguesnail.com/',
    country: 'Brazil',
    city: 'Remote',
    tier: 'AA',
    source: 'Brazil Research 2026-03',
    projectType: ['Roguelike', 'Action', 'Historical'],
    notes: 'Fully remote Brazilian studio. Relic Hunters, Hell Clock, Star Vikings. Hell Clock set in Brazil\'s 19th century War of Canudos — historical narrative!',
    fit: 88,
  },
  {
    name: 'Long Hat House',
    company: 'Long Hat House',
    website: 'https://longhathouse.com/',
    country: 'Brazil',
    city: 'Brazil',
    tier: 'Indie',
    source: 'Brazil Research 2026-03',
    projectType: ['Metroidvania', 'Platformer', 'Folklore'],
    notes: 'Dandara, Berserk Boy. Dandara features Brazilian/African folklore themes. Strong implicit narrative.',
    fit: 88,
  },
  {
    name: 'Aquiris (Epic Games Brasil)',
    company: 'Aquiris / Epic Games',
    website: 'https://aquiris.com.br/',
    country: 'Brazil',
    city: 'Porto Alegre',
    tier: 'AAA',
    source: 'Brazil Research 2026-03',
    projectType: ['Racing', 'Action', 'Mobile'],
    notes: 'Horizon Chase, Grid Legends. Acquired by Epic Games. Now Epic Games Brasil. Racing focus.',
    fit: 65,
  },
  {
    name: 'Mad Mimic',
    company: 'Mad Mimic',
    website: 'https://madmimic.com/',
    country: 'Brazil',
    city: 'Brazil',
    tier: 'Indie',
    source: 'Brazil Research 2026-03',
    projectType: ['Roguelike', 'Action'],
    notes: 'Rising Hell, Mullet MadJack. Mullet MadJack going to Taipei Game Show 2026.',
    fit: 70,
  },
  
  // Indie Studios
  {
    name: 'Electric Monkeys',
    company: 'Electric Monkeys',
    country: 'Brazil',
    city: 'São Paulo',
    tier: 'Indie',
    source: 'Brazil Research 2026-03',
    projectType: ['Indie'],
    notes: '18 employees. Seeking partners/investors/publishers.',
    fit: 70,
  },
  {
    name: 'Ilex Games',
    company: 'Ilex Games',
    country: 'Brazil',
    city: 'São Paulo',
    tier: 'Indie',
    source: 'Brazil Research 2026-03',
    projectType: ['Outsourcing', 'Indie'],
    notes: 'Two lines of work: outsourcing (art, programming, game design) and original IP development.',
    fit: 65,
  },
  {
    name: 'Rockhead Studios',
    company: 'Rockhead Studios',
    country: 'Brazil',
    city: 'Brazil',
    tier: 'Indie',
    source: 'Brazil Research 2026-03',
    projectType: ['Indie'],
    notes: 'Brazilian indie studio. Appears in BIG Festival/Abragames searches.',
    fit: 70,
  },
  {
    name: 'Tapps Games',
    company: 'Tapps Games',
    website: 'https://tappsgames.com/',
    country: 'Brazil',
    city: 'Brazil',
    tier: 'AA',
    source: 'Brazil Research 2026-03',
    projectType: ['Mobile', 'Casual'],
    notes: 'Large Brazilian mobile game publisher.',
    fit: 50,
  },
  {
    name: 'Umbu Games',
    company: 'Umbu Games',
    country: 'Brazil',
    city: 'Brazil',
    tier: 'Indie',
    source: 'Brazil Research 2026-03',
    projectType: ['Indie'],
    notes: 'Brazilian indie studio.',
    fit: 70,
  },
  {
    name: 'Kokku',
    company: 'Kokku',
    website: 'https://kokku.com.br/',
    country: 'Brazil',
    city: 'Brazil',
    tier: 'AA',
    source: 'Brazil Research 2026-03',
    projectType: ['Co-development', 'AAA Support'],
    notes: 'AAA co-development and outsourcing services.',
    fit: 50,
  },
  {
    name: 'Bombservice',
    company: 'Bombservice',
    country: 'Brazil',
    city: 'Brazil',
    tier: 'Indie',
    source: 'Brazil Research 2026-03',
    projectType: ['Metroidvania', 'Action'],
    notes: 'Momodora series, Minoria. Momodora: Moonlit Farewell (2024). Acclaimed action-platformers.',
    fit: 80,
  },
  {
    name: 'Minimol Games',
    company: 'Minimol Games',
    country: 'Brazil',
    city: 'Brazil',
    tier: 'Indie',
    source: 'Brazil Research 2026-03',
    projectType: ['Indie'],
    notes: 'Brazilian indie studio. Appears in BIG Festival.',
    fit: 70,
  },
  {
    name: 'Flux Games',
    company: 'Flux Games',
    country: 'Brazil',
    city: 'Brazil',
    tier: 'Indie',
    source: 'Brazil Research 2026-03',
    projectType: ['Indie'],
    notes: 'Brazilian indie studio. Appears in BIG Festival.',
    fit: 70,
  },
];

async function importStudios() {
  console.log(`\n🇧🇷 Importing ${studios.length} Brazilian studios...\n`);
  
  const batch = db.batch();
  const now = admin.firestore.Timestamp.now();
  let count = 0;
  
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
    
    console.log(`  🇧🇷 ${studio.name} (${studio.city || 'Brazil'}) — fit: ${studio.fit}`);
  }
  
  await batch.commit();
  console.log(`\n✅ Imported ${count} Brazilian studios!`);
  
  const topFits = studios.filter(s => (s.fit || 0) >= 85).sort((a, b) => (b.fit || 0) - (a.fit || 0));
  console.log('\n🎯 Top Architect Fits (85+):');
  for (const s of topFits) {
    console.log(`  🇧🇷 ${s.name}: ${s.fit}`);
  }
}

importStudios()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
