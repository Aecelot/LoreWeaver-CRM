// Update batch 23 studio leads with research findings
// Director ICP scoring based on narrative focus, studio size, and middleware fit
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
    id: 'r4WrtngjHgXjFRHvKydZ',
    name: 'Furoshiki Lab',
    website: 'http://furoshikilab.wixsite.com/furoshikilab',
    notes: `Small Japanese indie studio developing 2D adventure games. Known for horror novel adventures including a game set in 1999 Japan involving enigmatic organization "Aojuji Hospital". Published by HYPER REAL (Japanese indie games publisher). Active on Steam and Twitter (@furoshiki_lab). Creates games with fictional languages and cult themes (PrayerPlay Order of Knowledge). Unity developers. Source: Steam, Gematsu, Glitchwave`,
    tags: ['japan', 'indie', 'horror', 'adventure', 'narrative', 'visual-novel', 'architect-icp'],
    icpScore: 60,
    icpReason: 'Very small indie, niche horror VN market. Narrative-focused but limited scale and budget for middleware. Language barrier for sales.',
    contacts: [
      { name: 'Furoshiki Lab', role: 'Studio', twitter: '@furoshiki_lab' }
    ]
  },
  {
    id: 'jcIsI3auANLIMYzG8nnd',
    name: 'Galaxy4Games',
    website: 'https://galaxy4games.com',
    notes: `Vietnamese work-for-hire game development studio founded 2020, now 40+ specialists. Offers full-cycle game development services for mobile, web, and blockchain/Web3 platforms. Creates casual, hyper-casual, puzzle, match-3, educational, and branded games for iOS, Android, and web. NOT making original IP - they build games for clients (publishers, startups, global brands). Source: galaxy4games.com, Goodfirms`,
    tags: ['vietnam', 'indie', 'mobile', 'web', 'web3', 'work-for-hire', 'casual', 'services'],
    icpScore: 20,
    icpReason: 'Work-for-hire studio building games for clients, not creating original narrative IPs. No fit for Director.',
    contacts: []
  },
  {
    id: '5BOXmG23OMbf7zQaJEEQ',
    name: 'Game Kitchen',
    website: 'https://www.thegamekitchen.com',
    notes: `Seville, Spain indie studio. Creators of Blasphemous 1 & 2 (dark Metroidvania with religious horror lore). Also made The Last Door (horror adventure). Deep Spanish folklore/cultural themes woven into narrative. Team17 published. ~$7.4M annual revenue (2025). Founded by core team with strong narrative focus - their games are defined by rich lore and dark fantasy storytelling. High profile in European indie scene. Source: Reddit AMA, Games from Spain, RocketReach`,
    tags: ['spain', 'indie', 'metroidvania', 'horror', 'narrative', 'lore-heavy', 'dark-fantasy', 'director-icp', 'qualified'],
    icpScore: 85,
    icpReason: 'Excellent fit: narrative-driven games with deep lore, indie scale perfect for Director middleware, proven franchise looking to expand.',
    contacts: [
      { name: 'Mauricio García', role: 'CEO & Producer', email: '', linkedin: '' },
      { name: 'Enrique Cabeza', role: 'Creative Director', email: '', linkedin: '' }
    ]
  },
  {
    id: 'bs8wwq9g9R8k3O7bcuRb',
    name: 'Game Science',
    website: 'https://www.gamesci.com.cn',
    notes: `Chinese AAA studio founded June 2014 by 7 ex-Tencent developers (worked on Asura MMO). Created Black Myth: Wukong (2024) - massive action-RPG based on Journey to the West. UE5, narrative-heavy with Chinese mythology. Viral 2020 trailer (50M views China). Now 100+ employees. Headquarters in Shenzhen. Major success - likely has extensive in-house tools and resources. Source: Wikipedia, Fandom wiki`,
    tags: ['china', 'aaa', 'action-rpg', 'mythology', 'narrative', 'ue5', 'director-icp'],
    icpScore: 55,
    icpReason: 'Narrative-heavy games but AAA scale means in-house resources. Black Myth success gives them budget for custom solutions. Language/market barriers.',
    contacts: [
      { name: 'Feng Ji (冯骥)', role: 'Co-founder', email: '', linkedin: '' },
      { name: 'Yang Qi (杨奇)', role: 'Co-founder', email: '', linkedin: '' }
    ]
  },
  {
    id: 'gwnFbaMf5rcWp3biknh2',
    name: 'Gamota',
    website: 'https://gamota.com',
    notes: `Vietnamese mobile game PUBLISHER (not developer), part of Appota Group. Founded Aug 2014, Hanoi. 51-100 employees. One of top 3 mobile game publishers in Vietnam. 15+ million players, 100+ published mobile game titles, 10 years experience. Won "Excellent Game Publisher 2024" at Vietnam Game Awards. Publishes games from other studios - not a development studio. Source: LinkedIn, Crunchbase, Vietnam.vn`,
    tags: ['vietnam', 'aa', 'publishing', 'mobile', 'publisher', 'not-developer'],
    icpScore: 30,
    icpReason: 'Publisher not developer. Mobile-focused. Could potentially require games they publish to use Director, but indirect path.',
    contacts: [
      { name: 'Vu Thi Trang', role: 'CEO', email: '', linkedin: '' }
    ]
  },
  {
    id: 'HUpDLkFFamrzuXASIady',
    name: 'Gearbox Software',
    website: 'https://www.gearboxsoftware.com',
    notes: `Texas-based AA/AAA studio founded 1999. Best known for Borderlands franchise (looter-shooter with humor/story), Brothers in Arms, Duke Nukem. Now owned by Embracer Group. Borderlands 4 released 2025. CEO Randy Pitchford also runs Gearbox Studios (film/TV). Large established studio with in-house tools and extensive development infrastructure. Source: Wikipedia, Gearbox website`,
    tags: ['usa', 'aa', 'fps', 'looter-shooter', 'borderlands', 'established', 'director-icp'],
    icpScore: 40,
    icpReason: 'Established studio with in-house narrative systems. Borderlands has procedural elements but not emergent narrative focus. May resist external middleware.',
    contacts: [
      { name: 'Randy Pitchford', role: 'CEO & Founder', email: '', linkedin: '' }
    ]
  },
  {
    id: 'Smw3DWVRCAiKsbmvzpRh',
    name: 'Genius Sonority',
    website: 'https://www.geniussonority.co.jp',
    notes: `Japanese developer founded June 2002 by Manabu Yamana, jointly owned by Nintendo and The Pokémon Company. Work-for-hire studio for Pokémon games (Pokémon Colosseum, XD, Trozei, Cafe Mix, etc.). Also created original IP The Denpa Men (3DS RPG). Second-party developer under Nintendo umbrella - limited creative control on most projects. Source: Wikipedia, Bulbapedia, Serebii`,
    tags: ['japan', 'aa', 'puzzle', 'pokemon', 'work-for-hire', 'nintendo', 'second-party'],
    icpScore: 25,
    icpReason: 'Work-for-hire studio under Nintendo/TPC ownership. No independent decision-making on tooling. Pokemon games dont need emergent narrative.',
    contacts: [
      { name: 'Manabu Yamana (山名 学)', role: 'Founder', email: '', linkedin: '' }
    ]
  },
  {
    id: 'LBBaNHd92kmYsiKM9Wu5',
    name: 'Gentle Troll Entertainment',
    website: 'https://www.gentle-troll.com',
    notes: `Würzburg, Bavaria indie studio founded 2014. ~16 employees. Background in serious games/educational games for 15+ years. Now transitioning to entertainment with first game "Underdown" (received FFF Bayern funding). Unity developers. Featured in GG Bavaria indie showcase 2025. Making narrative-focused games. German government funding recipient. Source: gentle-troll.com, LinkedIn, RocketReach`,
    tags: ['germany', 'indie', 'narrative', 'serious-games', 'unity', 'funded', 'architect-icp'],
    icpScore: 70,
    icpReason: 'Transitioning from serious games to entertainment. Narrative focus aligns with Director. Small scale, government-funded - may have limited middleware budget.',
    contacts: [
      { name: 'Michel Wacker', role: 'Founder & CEO', email: '', linkedin: '' }
    ]
  },
  {
    id: 'dlgeVHAN2nNigQ7GWrO8',
    name: 'Ghost Ship Games',
    website: 'https://ghostship.dk',
    notes: `Copenhagen, Denmark indie studio founded spring 2016 by 6 ex-Press Play veterans. Now 40+ employees. Created Deep Rock Galactic (co-op FPS mining shooter, procedurally-generated caves). Funded by Danish government (Cap Nova). Also launched Ghost Ship Publishing to help other indie devs. DRG has 3+ million players, known for non-toxic community. Source: Wikipedia, ghostship.dk, NME, GameRant`,
    tags: ['denmark', 'indie', 'co-op', 'shooter', 'procedural', 'publishing', 'director-icp'],
    icpScore: 45,
    icpReason: 'Procedural-focused gameplay, not narrative-heavy. Deep Rock Galactic is about emergent gameplay moments not story. May not need Director.',
    contacts: [
      { name: 'Søren Lundgaard', role: 'CEO & Co-founder', email: '', linkedin: '' }
    ]
  },
  {
    id: 'pPVK8wmZBiboeaCRFwnP',
    name: 'Giant Sparrow',
    website: 'https://giantsparrow.com',
    notes: `Santa Monica, California indie studio. BAFTA-winning narrative specialists. Created The Unfinished Swan (2012, BAFTA best debut + game innovation) and What Remains of Edith Finch (2017, BAFTA best game, Game Awards best narrative). Led by creative director Ian Dallas. Currently working on third game (teased Oct 2024). Defines the narrative exploration genre. Their games are entirely about storytelling innovation. Premium Director target. Source: Wikipedia, NYT, Checkpoint Gaming`,
    tags: ['usa', 'indie', 'narrative', 'exploration', 'walking-sim', 'bafta', 'story-focused', 'director-icp', 'qualified'],
    icpScore: 90,
    icpReason: 'PERFECT FIT: Narrative specialists, BAFTA-winning story games, exactly the studio Director is designed for. High-priority target.',
    contacts: [
      { name: 'Ian Dallas', role: 'Creative Director & Founder', email: '', linkedin: '' }
    ]
  }
];

async function updateBatch23() {
  console.log('Updating batch 23 leads with research findings...\n');
  
  const batch = db.batch();
  
  for (const update of updates) {
    const ref = db.collection('leads').doc(update.id);
    
    const updateData = {
      website: update.website,
      notes: update.notes,
      tags: update.tags,
      icpScore: update.icpScore,
      'studio.fitScore': update.icpScore,
      'studio.fitReason': update.icpReason,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    // Add contacts if any
    if (update.contacts && update.contacts.length > 0) {
      updateData.contacts = update.contacts;
    }
    
    batch.update(ref, updateData);
    
    console.log(`✓ ${update.name}`);
    console.log(`  ICP: ${update.icpScore} - ${update.icpReason.substring(0, 60)}...`);
    if (update.icpScore >= 85) {
      console.log(`  ⭐ QUALIFIED - High ICP score`);
    }
    console.log('');
  }
  
  await batch.commit();
  console.log('Batch 23 updates committed successfully!');
  
  // Summary
  const qualified = updates.filter(u => u.icpScore >= 85);
  console.log(`\n=== SUMMARY ===`);
  console.log(`Total leads updated: ${updates.length}`);
  console.log(`Qualified (ICP >= 85): ${qualified.length}`);
  qualified.forEach(q => console.log(`  - ${q.name} (${q.icpScore})`));
}

updateBatch23().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
