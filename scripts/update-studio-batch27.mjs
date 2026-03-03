// Update batch 27 leads with research findings
// Director ICP re-scoring based on ICP_DIRECTOR.md criteria
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
    id: 'O0aRnNX9sAPruvnYLfvm',
    name: 'MachineGames',
    data: {
      icpScore: 65,
      tags: ['sweden', 'aaa', 'shooter', 'narrative', 'bethesda', 'xbox', 'reference', 'director-icp'],
      notes: `Founded 2009 by ex-Starbreeze devs. ~100 employees. Part of Bethesda/Xbox (Microsoft).

GAMES: Wolfenstein: The New Order/II, Indiana Jones and the Great Circle (2024).

TECH: id Tech engine. Focus on "living world" with NPC interactions.

DIRECTOR FIT: AAA studio, high-budget productions. Indiana Jones emphasized NPC "living world" design. However, Microsoft ownership means corporate approval needed. Too large for ideal Director target but strong reference potential.

ICP: 65 - AAA scale exceeds ideal target; good reference account potential.

Source: Wikipedia, Vice interview (Dec 2024), Xbox Wire

Researched: 2026-03-03`
    }
  },
  {
    id: 'g4jee6yMscqSOzVQxPh3',
    name: 'Mercury Steam',
    data: {
      icpScore: 55,
      tags: ['spain', 'aa', 'action', 'metroidvania', 'nintendo', 'director-icp'],
      notes: `Madrid-based. Founded 2002. ~120 employees. CEO: Enric Alvarez.

GAMES: Metroid Dread (GOTY nominee), Castlevania: Lords of Shadow series.

PARTNERSHIPS: Close Nintendo collaboration on Metroid.

DIRECTOR FIT: AA studio with strong action games. Metroidvania genre has limited NPC dialogue - gameplay-focused over narrative. Nintendo partnership may limit external AI tools.

ICP: 55 - Right studio size but games lack NPC dialogue density.

Source: Wikipedia, GameRant

Researched: 2026-03-03`
    }
  },
  {
    id: 'K8edfujzyY9VBXchJFBL',
    name: 'miHoYo / HoYoverse',
    data: {
      icpScore: 30,
      tags: ['china', 'aaa', 'gacha', 'rpg', 'ai-forward', 'nvidia-ace', 'has-ai-solution'],
      notes: `Shanghai-based. Massive studio (5000+ employees). Global brand as HoYoverse.

GAMES: Genshin Impact, Honkai: Star Rail, Zenless Zone Zero.

AI STANCE: Signed up for NVIDIA ACE (Jan 2024) for AI NPCs. Already using AI voice in Tears of Themis. Active AI R&D lab building "virtual worlds indistinguishable from reality" by 2030.

DIRECTOR FIT: Already has AI NPC solution via NVIDIA ACE partnership. Too large, too advanced in AI adoption to be Director customer - competitor situation.

ICP: 30 - Already using NVIDIA ACE; not a Director target.

Source: IGN (Jan 2024), Reddit discussions, Medium

Researched: 2026-03-03`
    }
  },
  {
    id: '6yb9mX1CfEGqEI3VoDXU',
    name: 'MiTale',
    data: {
      icpScore: 70,
      country: 'Finland', // CORRECTED from Denmark
      website: 'https://www.mitalegames.com',
      tags: ['finland', 'indie', 'narrative', 'vr', 'interactive-storytelling', 'architect-icp', 'director-icp'],
      notes: `CORRECTED: Finnish studio (was listed as Denmark). Helsinki-based. ~20 developers.

CEO: Natasha (IGDA Chair-Emeritus).

GAMES: Willow Guard (Steam), C.L.A.Y., My Best Friends.

FOCUS: Interactive storytelling, mixed reality, gamification. Tech-forward for an indie.

SERVICES: Also offers game dev services (prototyping, art, audio).

EVENTS 2026: IGDA Helsinki (Mar 17), gamescom (Aug).

DIRECTOR FIT: Narrative focus aligns well. 20 devs is on smaller end but they're tech-forward. Interactive storytelling specialty suggests openness to narrative AI.

ICP: 70 - Good narrative fit, smaller team size, but tech-forward mindset.

Source: mitalegames.com, Red Nettle Studio bio, Linktree

Researched: 2026-03-03`
    }
  },
  {
    id: '3CoNfG9z1K8TYdKsM0oq',
    name: 'Mojiken Studio',
    data: {
      icpScore: 55,
      tags: ['indonesia', 'indie', 'narrative', 'adventure', 'toge-productions', 'acquired', 'architect-icp'],
      notes: `Indonesian indie studio. Now owned by Toge Productions (acquired Dec 2023).

GAMES: A Space for the Unbound (multiple Indonesia Game Awards 2023), When the Past was Around.

STYLE: Slice-of-life narrative adventures. 1990s Indonesia setting. Themes: anxiety, depression, love, supernatural.

DIRECTOR FIT: Strong narrative focus but small indie budget. Pixel art adventures with limited NPC dialogue systems. Now under publisher umbrella - decisions go through Toge.

ICP: 55 - Great narrative fit but small scale; decision-making through parent company.

Source: Mojiken website, Game Developer, IGN SEA

Researched: 2026-03-03`
    }
  },
  {
    id: '6hVD0S8pAOHjkdZfBQua',
    name: 'Moon Studios',
    data: {
      icpScore: 35,
      tags: ['austria', 'indie', 'narrative-platformer', 'action-rpg', 'ai-cautious', 'architect-icp'],
      notes: `Founded 2010 by Thomas Mahler & Gennadiy Korol. Remote-first studio.

GAMES: Ori and the Blind Forest, Ori and the Will of the Wisps, No Rest for the Wicked (2024 Early Access).

AI STANCE: Thomas Mahler explicitly stated "no generative AI is being used to create art or assets" but uses AI for workflow tools. AI-cautious on creative/generative content.

DIRECTOR FIT: ❌ DOES NOT FIT - explicitly rejects generative AI for creative content. Director = runtime generative dialogue which conflicts with their stated position.

ARCHITECT FIT: ✅ Better fit - production AI for writers aligns with their "AI as workflow tool" stance.

ICP: 35 - Explicit AI-cautious stance makes Director a poor fit.

Source: Wikipedia (No Rest for the Wicked), Thomas Mahler Twitter

Researched: 2026-03-03`
    }
  },
  {
    id: 'jdDjAMlBN578m1jmHZ4o',
    name: 'Mooneye Studios',
    data: {
      icpScore: 40,
      tags: ['germany', 'indie', 'narrative', 'wholesome', 'publisher', 'small-team', 'architect-icp'],
      notes: `Hamburg-based. Founded 2014. 4-person team.

GAMES: Lost Ember (2019 - narrative adventure as wolf spirit).

PUBLISHING: Also publishes indie games as "Mooneye Indies" (since 2021): Smushi Come Home, Farewell North, Haven Park.

FOCUS: "Wholesome and narrative indie games."

DIRECTOR FIT: Too small (4 people) for Director target. Narrative adventures lack complex NPC dialogue systems. Publishing arm might be partnership opportunity for reaching other studios.

ICP: 40 - Strong narrative values but team too small for Director scope.

Source: mooneyestudios.com, Adventure Game Hotspot

Researched: 2026-03-03`
    }
  },
  {
    id: 'hIMsNsS6fKJgzC83K94b',
    name: 'Digital Sun',
    data: {
      icpScore: 55,
      tags: ['spain', 'indie', 'action-rpg', 'roguelike', 'director-icp'],
      notes: `CORRECTED location: Valencia, Spain (was listed as Seville). Founded 2014.

GAMES: Moonlighter (2018), The Mageseeker: A League of Legends Story, Cataclismo. Moonlighter 2 announced for 2025.

PUBLISHING: 11 bit studios (Moonlighter).

STYLE: Action RPGs with roguelike elements. Moonlighter has shopkeeping + dungeon crawling.

DIRECTOR FIT: Action-focused with limited NPC dialogue. Roguelike structure means less persistent narrative. Some NPC interaction in shopkeeping but not dialogue-heavy.

ICP: 55 - Some NPC interaction potential but roguelike focus limits dialogue depth.

Source: digitalsungames.com, Reddit AMA, Game Rebellion DB

Researched: 2026-03-03`
    }
  },
  {
    id: 'Ue0Kuu3McVJpxf61krl0',
    name: 'Motion Twin',
    data: {
      icpScore: 35,
      tags: ['france', 'indie', 'roguelike', 'worker-coop', 'small-team'],
      notes: `Bordeaux, France. Founded 2001. Worker cooperative - no hierarchy, equal salary.

STRUCTURE: Max 10 members by design. Decisions made collectively.

GAMES: Dead Cells (2017 - 10M+ copies). Roguelike/metroidvania.

SPINOFF: Evil Empire studio handles Dead Cells ongoing development.

DIRECTOR FIT: ❌ Poor fit. 
1. Max 10-person cooperative structure = too small
2. Roguelike genre = minimal NPC dialogue (gameplay over narrative)
3. Unique business structure may resist external partnerships

ICP: 35 - Wrong genre, wrong scale, unique structure.

Source: Wikipedia, motiontwin.com, EGM interview

Researched: 2026-03-03`
    }
  },
  {
    id: 'XNP4l7FbGCq9au8StDf3',
    name: 'Muro Studios',
    data: {
      icpScore: 25,
      website: 'https://murostudios.com',
      tags: ['finland', 'indie', 'action', 'platformer', 'small-team'],
      notes: `Helsinki, Finland. 2-person indie studio.

GAMES: Shadow Bug (award-winning ninja action platformer).

FOCUS: Action/platformer games. No narrative focus.

DIRECTOR FIT: ❌ Not a fit.
1. 2-person team = far too small
2. Action/platformer genre = no NPC dialogue
3. No narrative focus

ICP: 25 - Wrong genre, wrong scale.

Source: murostudios.com, Steam, Giant Bomb

Researched: 2026-03-03`
    }
  }
];

async function updateBatch27() {
  console.log('Updating batch 27 leads with research...\n');
  
  for (const update of updates) {
    try {
      await db.collection('leads').doc(update.id).update({
        ...update.data,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log(`✓ Updated ${update.name} (ICP: ${update.data.icpScore})`);
    } catch (err) {
      console.error(`✗ Failed to update ${update.name}: ${err.message}`);
    }
  }
  
  console.log('\n=== SUMMARY ===');
  console.log('Batch 27 research complete.');
  console.log('ICP Scores:');
  updates.forEach(u => {
    const qualified = u.data.icpScore >= 85 ? '✅ QUALIFIED' : '';
    console.log(`  ${u.name}: ${u.data.icpScore} ${qualified}`);
  });
  
  const qualified = updates.filter(u => u.data.icpScore >= 85);
  console.log(`\nQualified leads (ICP >= 85): ${qualified.length}`);
  
  console.log('\nKey findings:');
  console.log('- MiTale: Country corrected from Denmark → Finland');
  console.log('- Digital Sun: Location corrected from Seville → Valencia');
  console.log('- miHoYo: Already using NVIDIA ACE - competitor/has solution');
  console.log('- Moon Studios: AI-cautious - Director explicitly doesn\'t fit');
  console.log('- No leads qualified (highest: MiTale at 70)');
}

updateBatch27().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
