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
  // === ARGENTINA 🇦🇷 ===
  {
    name: 'Nimble Giant Entertainment',
    company: 'Nimble Giant Entertainment',
    website: 'https://nimblegiant.com/',
    country: 'Argentina',
    city: 'Buenos Aires',
    tier: 'AAA',
    source: 'LatAm Research 2026-03',
    projectType: ['4X Strategy', 'MMORPG', 'Sci-Fi'],
    notes: 'Founded 2002, one of leading studios in Latin America. Acquired by Saber Interactive 2020. Master of Orion, Star Trek Infinite, Endless Legend/Space 2 expansion work, Champions of Regnum.',
    fit: 88,
  },
  {
    name: 'OTA IMON Studios',
    company: 'OTA IMON Studios',
    country: 'Argentina',
    city: 'Argentina',
    tier: 'Indie',
    source: 'LatAm Research 2026-03',
    projectType: ['Roguelite', 'RPG'],
    notes: 'Zet Zillion — roguelite RPG. Featured at Latin American Games Showcase 2024.',
    fit: 85,
  },
  {
    name: 'C2 Games Studio',
    company: 'C2 Games Studio',
    country: 'Argentina',
    city: 'Argentina',
    tier: 'Indie',
    source: 'LatAm Research 2026-03',
    projectType: ['Action-Adventure'],
    notes: 'Astor: Blade of the Monolith. Action-adventure title.',
    fit: 82,
  },
  {
    name: 'Manalith Studios',
    company: 'Manalith Studios',
    country: 'Argentina',
    city: 'Argentina',
    tier: 'Indie',
    source: 'LatAm Research 2026-03',
    projectType: ['Card-Battler', 'RPG', 'Roguelike'],
    notes: 'Dungeon Drafters — card-battler RPG. Strong narrative potential.',
    fit: 88,
  },
  {
    name: 'Coffee Powered Machine',
    company: 'Coffee Powered Machine',
    country: 'Argentina',
    city: 'Buenos Aires',
    tier: 'Indie',
    source: 'LatAm Research 2026-03',
    projectType: ['Action', 'Strategy', 'Mythology'],
    notes: 'Okhlos — unique mythology-inspired action game.',
    fit: 80,
  },
  {
    name: 'Killabunnies',
    company: 'Killabunnies',
    country: 'Argentina',
    city: 'Argentina',
    tier: 'AA',
    source: 'LatAm Research 2026-03',
    projectType: ['Various'],
    notes: 'Dynamic game dev studio. 30 developers, 15+ years experience. At Gamescom Latam.',
    fit: 75,
  },
  {
    name: 'OPQAM',
    company: 'OPQAM',
    country: 'Argentina',
    city: 'Buenos Aires',
    tier: 'Indie',
    source: 'LatAm Research 2026-03',
    projectType: ['Arcade', 'Action'],
    notes: 'Buenos Aires indie. Classic arcade games with modern elements. Xbox, PlayStation, PC.',
    fit: 70,
  },
  {
    name: 'Byte Conveyor Studios',
    company: 'Byte Conveyor Studios',
    country: 'Argentina',
    city: 'Buenos Aires',
    tier: 'Indie',
    source: 'LatAm Research 2026-03',
    projectType: ['Mobile'],
    notes: 'Buenos Aires indie. Mobile games deploying worldwide.',
    fit: 65,
  },
  {
    name: 'Abylight Buenos Aires',
    company: 'Abylight Studios',
    country: 'Argentina',
    city: 'Buenos Aires',
    tier: 'AA',
    source: 'LatAm Research 2026-03',
    projectType: ['Various'],
    notes: 'New studio (2026). Spanish Abylight Studios expansion to Argentina. Emerging platforms focus.',
    fit: 70,
  },

  // === MEXICO 🇲🇽 ===
  {
    name: 'Lienzo',
    company: 'Lienzo',
    website: 'https://www.lienzo.mx/',
    country: 'Mexico',
    city: 'Chihuahua',
    tier: 'AA',
    source: 'LatAm Research 2026-03',
    projectType: ['Action-Adventure', 'Mythology', 'Cultural'],
    notes: 'Mulaka (Tarahumara indigenous mythology!), Hunter\'s Legacy. PERFECT cultural narrative fit. "Gaming is the best medium for storytelling."',
    fit: 98,
  },
  {
    name: 'Mácula Interactive',
    company: 'Mácula Interactive',
    country: 'Mexico',
    city: 'Mexico City',
    tier: 'Indie',
    source: 'LatAm Research 2026-03',
    projectType: ['Narrative', 'Historical', 'Adventure'],
    notes: '"Mexico, 1921: A Deep Slumber" — Mexican Revolution setting! Microsoft Developer Acceleration Program 2024. Based in historic center. PERFECT narrative fit.',
    fit: 95,
  },
  {
    name: 'Bromio',
    company: 'Bromio',
    website: 'https://bromio.com.mx/',
    country: 'Mexico',
    city: 'Mexico',
    tier: 'AA',
    source: 'LatAm Research 2026-03',
    projectType: ['Various', 'Porting'],
    notes: 'Award-winning Mexican studio. Develops games + helps others port to Steam, Epic, Nintendo, PlayStation, Xbox.',
    fit: 75,
  },
  {
    name: 'Kometa Games',
    company: 'Kometa Games',
    country: 'Mexico',
    city: 'Mexico',
    tier: 'Indie',
    source: 'LatAm Research 2026-03',
    projectType: ['Indie'],
    notes: 'Mexican indie studio.',
    fit: 70,
  },
];

async function importStudios() {
  console.log(`\n🌎 Importing ${studios.length} Latin American studios (Argentina + Mexico)...\n`);
  
  const batch = db.batch();
  const now = admin.firestore.Timestamp.now();
  let count = 0;
  
  const countryEmoji: Record<string, string> = {
    'Argentina': '🇦🇷',
    'Mexico': '🇲🇽',
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
    
    const emoji = countryEmoji[studio.country] || '🌎';
    console.log(`  ${emoji} ${studio.name} (${studio.city || studio.country}) — fit: ${studio.fit}`);
  }
  
  await batch.commit();
  console.log(`\n✅ Imported ${count} Latin American studios!`);
  
  // Summary by country
  const byCountry: Record<string, number> = {};
  for (const s of studios) {
    byCountry[s.country] = (byCountry[s.country] || 0) + 1;
  }
  
  console.log('\n📊 By Country:');
  for (const [country, num] of Object.entries(byCountry)) {
    const emoji = countryEmoji[country] || '🌎';
    console.log(`  ${emoji} ${country}: ${num}`);
  }
  
  const topFits = studios.filter(s => (s.fit || 0) >= 85).sort((a, b) => (b.fit || 0) - (a.fit || 0));
  console.log('\n🎯 Top Architect Fits (85+):');
  for (const s of topFits) {
    const emoji = countryEmoji[s.country] || '🌎';
    console.log(`  ${emoji} ${s.name}: ${s.fit}`);
  }
}

importStudios()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
