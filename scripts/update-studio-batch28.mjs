// Update batch 28 studio leads with research data
// Director ICP scoring: emergent narrative, independent (not platform-owned), RPG/adventure focus
import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, '..', 'service-account.json'), 'utf8')
);

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

const updates = [
  {
    id: 'hdixYC1bXrIzQEuDLg9I',
    name: 'NAT Games',
    data: {
      website: 'https://www.nat.game',
      icpScore: 50,
      tags: ['south-korea', 'aa', 'mmorpg', 'mobile', 'director-icp'],
      notes: `Korean MMORPG developer (public company). Founded 2013, Seoul. Known for V4 (Nexon partnership), Overhit, Blue Archive (Yostar). Focus on mobile MMORPGs with gacha mechanics. Narrative in MMOs typically scripted quest content, not emergent. Low Director fit - MMO quest structure is static. Source: Tracxn, MMOCulture`,
      contacts: []
    }
  },
  {
    id: '62G0mfan41oQXhWSm3ZL',
    name: 'Naughty Dog',
    data: {
      website: 'https://www.naughtydog.com',
      icpScore: 40,
      tags: ['usa', 'aaa', 'action-adventure', 'narrative', 'sony-first-party', 'reference'],
      notes: `Sony first-party studio (PlayStation Studios). The Last of Us, Uncharted series. Co-president Neil Druckmann. Highly cinematic, linear narrative - not emergent. Working on Intergalactic: The Heretic Prophet. Platform-owned = won't buy external middleware. Reference only for narrative quality benchmarks. Source: Wikipedia, GamesRadar`,
      contacts: [
        { name: 'Neil Druckmann', role: 'Co-President', source: 'Wikipedia' }
      ]
    }
  },
  {
    id: 'Mo4Gx15qD2zXjM25NWIP',
    name: 'Nekcom Games',
    data: {
      website: 'https://nekcomgames.com',
      icpScore: 45,
      tags: ['china', 'indie', 'horror', 'puzzle', 'narrative'],
      notes: `Wuhan, China indie studio. Founded 2011 by Xiangyu Luo. Known for DYING series (horror/puzzle) and Showa American Story (action RPG). Small team. Linear narrative experiences. Low Director fit - puzzle/horror with fixed story structure. Source: nekcomgames.com, LinkedIn, Gematsu`,
      contacts: [
        { name: 'Xiangyu Luo', role: 'Founder', source: 'LinkedIn' }
      ]
    }
  },
  {
    id: '9ye5JXODjorkwBWRthyM',
    name: 'NEOWIZ',
    data: {
      website: 'https://www.neowiz.com',
      icpScore: 65,
      tags: ['south-korea', 'aa', 'souls-like', 'narrative', 'director-icp', 'pivot-to-narrative'],
      notes: `Korean publisher/developer pivoting to PC/console single-player. Round8 Studio subsidiary made Lies of P (critically acclaimed souls-like, narrative focus). Game Director Jiwon Choi emphasizes storytelling: "Strong storytelling creates emotional attachment." Lies of P: Overture sequel in development. Independent company, growing narrative focus. Medium Director fit - narrative-driven action RPG direction. Source: Wikipedia, Korea Times, GamesPress`,
      contacts: [
        { name: 'Jiwon Choi', role: 'Game Director (Round8)', source: 'Korea Times' }
      ]
    }
  },
  {
    id: 'DY1jzA5uvr8xd2vbOlIG',
    name: 'Night School Studio',
    data: {
      website: 'https://nightschoolstudio.com',
      icpScore: 55,
      tags: ['usa', 'indie', 'narrative', 'adventure', 'branching', 'netflix-owned', 'reference', 'architect-icp'],
      notes: `Netflix Games studio (acquired 2021). Founded 2014 by cousins Sean Krankel and Adam Hines. Famous for Oxenfree's naturalistic dialogue system with branch conversations. ~1,200 lines vs tens of thousands in comparable titles. Efficient narrative design. Proprietary dialogue tech. Platform-owned = won't buy external middleware. Excellent reference for dialogue system benchmarks. Source: Wikipedia, Netflix, Engadget, WIRED`,
      contacts: [
        { name: 'Sean Krankel', role: 'Co-Founder', source: 'Wikipedia' },
        { name: 'Adam Hines', role: 'Co-Founder', source: 'Wikipedia' }
      ]
    }
  },
  {
    id: 'nODoTxMZG8dpP3pQe4R5',
    name: 'Nightspade',
    data: {
      website: 'https://www.nightspade.com',
      icpScore: 35,
      tags: ['indonesia', 'indie', 'mobile', 'casual'],
      notes: `Bandung, Indonesia game studio. Received East Venture investment (2011). Multi-platform (iOS, Android, Windows). Focus appears to be mobile/casual games. Listed among recognized Indonesian developers. Very low Director fit - mobile casual focus, no clear narrative RPG. Source: nightspade.com, LinkedIn, Crunchbase`,
      contacts: []
    }
  },
  {
    id: '5toEcPMkYnvt00HVHx1S',
    name: 'Ninja Theory',
    data: {
      website: 'https://ninjatheory.com',
      icpScore: 45,
      tags: ['uk', 'aaa', 'action', 'narrative', 'xbox-first-party', 'reference', 'architect-icp'],
      notes: `Xbox Game Studios (acquired 2018). Cambridge, UK. Hellblade: Senua's Sacrifice (BAFTA), Senua's Saga: Hellblade II (2024). Mental health narrative focus - Senua experiences psychosis. Ground-truth reference for narrative themes. Platform-owned = won't buy external middleware. Reference only for narrative quality and accessibility. Source: Wikipedia, Xbox Wire`,
      contacts: []
    }
  },
  {
    id: 'euHBjIu6Tb9YKgYkTV2r',
    name: 'Nippon Ichi Software (NIS)',
    data: {
      website: 'https://nippon1.jp',
      icpScore: 60,
      tags: ['japan', 'aa', 'srpg', 'jrpg', 'visual-novel', 'narrative', 'independent', 'architect-icp'],
      notes: `Independent Japanese publisher/developer. President Kenzo Saruhashi (succeeded Tetsuhisa Seko, died Jan 2025). Known for Disgaea series (darkly comedic SRPG), GrimGrimoire, The Witch and the Hundred Knight. Quirky narratives with complex themes. Studio ToOefuf subsidiary (CEO Takehito Harada). 5 new projects for 2025-2026 including Curse (dungeon crawler RPG) and Kyouran (action RPG). Independent, narrative focus. Medium Director fit - dialogue-heavy SRPGs, Japanese market. Source: Wikipedia, Reddit, JilFarid`,
      contacts: [
        { name: 'Kenzo Saruhashi', role: 'President', source: 'Wikipedia' }
      ]
    }
  },
  {
    id: 'odzVnsLWf7rETQoRVEOT',
    name: 'Nomada Studio',
    data: {
      website: 'https://www.nomada.studio',
      icpScore: 45,
      tags: ['spain', 'indie', 'art', 'adventure', 'narrative', 'emotional', 'architect-icp'],
      notes: `Barcelona-based ~20 employees. Co-founded 2018 by illustrator Conrad Roset (Creative Director). GRIS (2018, BAFTA), Neva (2024, BAFTA Artistic Achievement 2025). Art-driven emotional storytelling with minimal/no dialogue. Environmental narrative, not character dialogue. Low Director fit - wordless/minimal dialogue games. Source: nomada.studio, conradroset.com, Catalan News`,
      contacts: [
        { name: 'Conrad Roset', role: 'Creative Director / Co-Founder', source: 'nomada.studio' },
        { name: 'Adrián Cuevas', role: 'Programmer / Producer', source: 'Meristation' },
        { name: 'Roger Mendoza', role: 'Programmer / Producer', source: 'Meristation' }
      ]
    }
  },
  {
    id: '5BHMXh7v4YMnuiJ6Lr5p',
    name: 'Obsidian Entertainment',
    data: {
      website: 'https://www.obsidian.net',
      icpScore: 50,
      tags: ['usa', 'aaa', 'rpg', 'narrative', 'xbox-first-party', 'reference', 'director-icp', 'architect-icp'],
      notes: `Xbox Game Studios (acquired 2018). Irvine, CA. Founded 2003 by ex-Black Isle (Feargus Urquhart CEO). Legendary RPG narrative heritage: Fallout: New Vegas, Pillars of Eternity, The Outer Worlds. 2025 banner year: Avowed and The Outer Worlds 2 both released. Platform-owned = won't buy external middleware. Top-tier reference for dialogue systems and RPG narrative design. Source: Wikipedia, PC Gamer, NYT`,
      contacts: [
        { name: 'Feargus Urquhart', role: 'CEO', source: 'Wikipedia' }
      ]
    }
  }
];

async function updateBatch28() {
  console.log('Updating batch 28 studio leads with research data...\n');
  
  for (const update of updates) {
    try {
      await db.collection('leads').doc(update.id).update({
        ...update.data,
        researchedAt: admin.firestore.FieldValue.serverTimestamp(),
        researchBatch: 28
      });
      console.log(`✓ Updated: ${update.name} (ICP: ${update.data.icpScore})`);
    } catch (err) {
      console.error(`✗ Failed: ${update.name} - ${err.message}`);
    }
  }
  
  console.log('\nBatch 28 complete.');
  
  // Summary
  const qualified = updates.filter(u => u.data.icpScore >= 85);
  console.log(`\nQualified leads (ICP >= 85): ${qualified.length}`);
  qualified.forEach(u => console.log(`  - ${u.name}: ${u.data.icpScore}`));
  
  const platformOwned = updates.filter(u => 
    u.data.tags.includes('xbox-first-party') || 
    u.data.tags.includes('sony-first-party') || 
    u.data.tags.includes('netflix-owned')
  );
  console.log(`\nPlatform-owned (reference only): ${platformOwned.length}`);
  platformOwned.forEach(u => console.log(`  - ${u.name}`));
}

updateBatch28().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
