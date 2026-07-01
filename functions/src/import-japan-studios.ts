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

// Japanese Studios - Comprehensive list
const studios = [
  // TIER 1: Visual Novel Studios (High Priority)
  { name: 'Visual Arts / Key', games: ['Clannad', 'Little Busters', 'Planetarian', 'Rewrite'], focus: 'Emotional Visual Novel', fitScore: 95, website: 'https://key.visualarts.gr.jp/' },
  { name: 'Type-Moon', games: ['Fate/stay Night', 'Tsukihime', 'Melty Blood'], focus: 'Action Visual Novel', fitScore: 95, website: 'https://www.typemoon.com/' },
  { name: 'Nitroplus', games: ['Steins;Gate', 'Saya no Uta', 'Demonbane'], focus: 'Sci-fi/Horror Visual Novel', fitScore: 95, website: 'https://www.nitroplus.co.jp/' },
  { name: 'Frontwing', games: ['Grisaia series', 'Island'], focus: 'Romance Visual Novel', fitScore: 90, website: 'https://frontwing.jp/' },
  { name: 'Age (âge)', games: ['Muv-Luv', 'Muv-Luv Alternative'], focus: 'Sci-fi Visual Novel', fitScore: 95, website: 'https://www.age-soft.jp/' },
  { name: 'Leaf / Aquaplus', games: ['Utawarerumono', 'White Album 2', 'ToHeart'], focus: 'Tactical RPG / Visual Novel', fitScore: 95, website: 'https://aquaplus.jp/' },
  { name: '07th Expansion', games: ['Higurashi When They Cry', 'Umineko', 'Ciconia'], focus: 'Horror/Mystery Visual Novel', fitScore: 95, website: 'https://07th-expansion.net/' },
  { name: 'AkabeiSoft2', games: ['Sharin no Kuni', 'G-Senjou no Maou'], focus: 'Drama Visual Novel', fitScore: 90, website: '' },
  { name: 'August', games: ['Fortune Arterial', 'Aiyoku no Eustia'], focus: 'Fantasy Visual Novel', fitScore: 85, website: 'https://august-soft.com/' },
  { name: 'Mages Inc.', games: ['Steins;Gate', 'Chaos;Head', 'Robotics;Notes'], focus: 'Science Adventure VN', fitScore: 95, website: 'https://mages.co.jp/' },
  { name: 'Alice Soft', games: ['Rance series', 'Dohna Dohna'], focus: 'Strategy RPG', fitScore: 85, website: 'https://www.alicesoft.com/' },
  { name: 'Novectacle', games: ['The House in Fata Morgana'], focus: 'Gothic Visual Novel', fitScore: 95, website: '' },
  { name: 'Light', games: ['Dies Irae', 'Paradise Lost'], focus: 'Chuuni Visual Novel', fitScore: 85, website: '' },
  { name: 'ALcot', games: ['Clover Day\'s', 'Osananajimi wa Daitouryou'], focus: 'Romance Visual Novel', fitScore: 80, website: 'http://www.alcot.biz/' },
  { name: 'Eushully', games: ['Kamidori Alchemy Meister', 'Ikusa Megami'], focus: 'Strategy RPG / VN', fitScore: 85, website: 'https://www.eukleia.co.jp/' },

  // TIER 2: Narrative Adventure
  { name: 'Access Games', games: ['Deadly Premonition', 'D4'], focus: 'Eccentric Adventure', fitScore: 90, website: 'http://www.access-games.com/' },
  { name: 'Grasshopper Manufacture', games: ['No More Heroes', 'Killer7', 'Let It Die'], focus: 'Action Adventure', fitScore: 90, website: 'https://www.grasshopper.co.jp/' },
  { name: 'Level-5', games: ['Professor Layton', 'Ni no Kuni', 'Yo-kai Watch'], focus: 'Puzzle/RPG', fitScore: 90, website: 'https://www.level5.co.jp/' },
  { name: 'Acquire Corp.', games: ['Octopath Traveler', 'Tenchu', 'Way of the Samurai'], focus: 'HD-2D RPG', fitScore: 90, website: 'https://www.acquire.co.jp/' },

  // TIER 3: JRPG Studios
  { name: 'Atlus', games: ['Persona 5', 'Shin Megami Tensei', 'Catherine'], focus: 'Turn-based RPG', fitScore: 95, website: 'https://atlus.com/' },
  { name: 'Nihon Falcom', games: ['Trails series', 'Ys series'], focus: 'Action RPG', fitScore: 95, website: 'https://www.falcom.co.jp/' },
  { name: 'Monolith Soft', games: ['Xenoblade Chronicles'], focus: 'Action RPG', fitScore: 90, website: 'https://www.monolithsoft.co.jp/' },
  { name: 'Mistwalker', games: ['Lost Odyssey', 'Fantasian', 'The Last Story'], focus: 'Classic JRPG', fitScore: 90, website: 'https://www.mistwalkercorp.com/' },
  { name: 'tri-Ace', games: ['Star Ocean', 'Valkyrie Profile', 'Resonance of Fate'], focus: 'Action RPG', fitScore: 90, website: 'https://www.tri-ace.co.jp/' },
  { name: 'Experience Inc.', games: ['Stranger of Sword City', 'Demon Gaze'], focus: 'Dungeon RPG', fitScore: 85, website: 'https://www.experienceinc.jp/' },
  { name: 'Compile Heart', games: ['Neptunia series', 'Death end re;Quest'], focus: 'JRPG', fitScore: 85, website: 'https://www.compileheart.com/' },
  { name: 'Nippon Ichi Software', games: ['Disgaea', 'Phantom Brave'], focus: 'Tactical RPG', fitScore: 90, website: 'https://nippon1.jp/' },

  // TIER 4: Indie/Doujin
  { name: 'Q-Games', games: ['PixelJunk series'], focus: 'Indie', fitScore: 80, website: 'https://www.q-games.com/' },
  { name: 'Skeleton Crew Studio', games: ['BitSummit co-founder'], focus: 'Indie', fitScore: 75, website: '' },
  { name: 'Pygmy Studio', games: ['BitSummit co-founder'], focus: 'Indie', fitScore: 75, website: 'https://pygmy.jp/' },
  { name: 'Team Shanghai Alice', games: ['Touhou Project'], focus: 'Bullet Hell / Doujin', fitScore: 85, website: '' },
  { name: 'Team GrisGris', games: ['Corpse Party'], focus: 'Horror Visual Novel', fitScore: 90, website: '' },
  { name: 'onion games', games: ['moon', 'Million Onion Hotel', 'Black Bird'], focus: 'Experimental', fitScore: 85, website: 'https://oniongames.jp/' },
  { name: 'Pocketpair', games: ['Palworld', 'Craftopia'], focus: 'Survival / Action', fitScore: 80, website: 'https://www.pocketpair.jp/' },
  { name: 'Wonderland Kazakiri', games: ['CASSETTE BOY'], focus: 'Adventure', fitScore: 75, website: '' },
  { name: 'WarmingApp', games: ['Miniature LAND'], focus: 'Puzzle', fitScore: 70, website: '' },
  { name: 'SmokingWOLF / SilverSecond', games: ['Wolf RPG Editor'], focus: 'Tools / Doujin', fitScore: 80, website: 'https://silversecond.net/' },
  { name: 'Daisuke Amaya (Pixel)', games: ['Cave Story', 'Kero Blaster'], focus: 'Action Platformer', fitScore: 85, website: '' },
  { name: 'ABA Games', games: ['rRootage', 'Noiz2sa'], focus: 'Minimalist Shmup', fitScore: 70, website: '' },
  { name: 'VIA Studio', games: ['Rhythm games'], focus: 'Rhythm / Action', fitScore: 70, website: '' },
  { name: 'Kinoko Studio', games: ['Puzzle games'], focus: 'Puzzle', fitScore: 65, website: '' },
  { name: 'Ancient', games: ['Streets of Rage 2'], focus: 'Retro Action', fitScore: 75, website: 'https://www.ancient.co.jp/' },

  // TIER 5: Narrative Support Studios
  { name: 'Artdink', games: ['A-Train', 'Aquanaut\'s Holiday'], focus: 'Simulation', fitScore: 75, website: 'https://www.artdink.co.jp/' },
  { name: 'Artoon / Arzest', games: ['Yoshi\'s New Island'], focus: 'Platformer', fitScore: 60, website: '' },
  { name: 'Arc System Works', games: ['Guilty Gear', 'BlazBlue'], focus: 'Fighting', fitScore: 70, website: 'https://www.arcsystemworks.jp/' },
  { name: 'Arika', games: ['Street Fighter EX', 'Tetris 99'], focus: 'Fighting / Puzzle', fitScore: 65, website: 'https://www.arika.co.jp/' },

  // Additional notable studios
  { name: 'Marvelous', games: ['Story of Seasons', 'Rune Factory'], focus: 'Life Sim / RPG', fitScore: 85, website: 'https://www.marv.jp/' },
  { name: 'Cygames', games: ['Granblue Fantasy', 'Uma Musume'], focus: 'Mobile RPG', fitScore: 85, website: 'https://www.cygames.co.jp/' },
  { name: 'G-Mode', games: ['Mobile/Retro games'], focus: 'Mobile', fitScore: 60, website: 'https://www.g-mode.co.jp/' },
  { name: 'Room6', games: ['Publisher'], focus: 'Indie Publishing', fitScore: 70, website: '' },
  { name: 'Active Gaming Media', games: ['Playism platform'], focus: 'Publishing / Localization', fitScore: 75, website: 'https://www.activegamingmedia.com/' },
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
    if (studio.focus.toLowerCase().includes('visual novel') || studio.focus.toLowerCase().includes('vn')) {
      fitTags.push('Narrative Focus');
    }
    if (studio.focus.toLowerCase().includes('rpg')) {
      fitTags.push('Narrative Focus');
    }
    if (studio.focus.toLowerCase().includes('adventure')) {
      fitTags.push('Narrative Focus');
    }
    
    // Create lead
    await db.collection('leads').add({
      name: studio.name,
      type: 'studio',
      website: studio.website,
      country: 'Japan',
      location: 'Japan',
      status: 'new',
      priority: studio.fitScore >= 90 ? 'medium' : 'none',
      owner: '',
      contact: {
        name: '',
        role: '',
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
        fitReason: 'Japanese studio - ' + studio.focus,
        fitTags: fitTags,
      },
      tags: ['japan', 'asia'],
      notes: '',
      pipeline: {
        id: STUDIO_PIPELINE_ID,
        stageId: 'new-lead',
      },
      metadata: {
        source: 'japan-research-2026-03-07',
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
