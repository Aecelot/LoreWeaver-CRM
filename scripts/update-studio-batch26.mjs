// Update batch 26 studio leads with research findings
// Offset 90, limit 10 — Director ICP scoring
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
  // KING Art Games
  {
    id: 'q7AsphotZEHkRSz2IQNO',
    data: {
      website: 'https://kingart-games.com',
      country: 'Germany',
      location: 'Bremen, Germany',
      tags: ['germany', 'indie', 'adventure', 'rpg', 'rts', 'point-and-click', 'narrative', 'federal-funding', 'director-icp', 'researched'],
      notes: `RESEARCH COMPLETE (2026-03-03)

== COMPANY ==
Name: KING Art Games
Founded: 2000 by Jan Theysen & Marc König
HQ: Bremen, Germany
Size: 51-200 employees

== KEY PEOPLE ==
Jan Theysen — Owner, Creative Director (LinkedIn: jan-theysen-a2134b11)
Marc König — Co-founder

== GAMES ==
The Book of Unwritten Tales series (2009-2014) — Point-and-click adventures with rich dialogue
The Dwarves (2016) — Tactical RPG based on novels, 75/100
Iron Harvest (2020) — RTS dieselpunk, 75/100
Battle Worlds: Kronos — Turn-based strategy

== UPCOMING / IN DEVELOPMENT ==
Warhammer 40K: Dawn of War IV (with Deep Silver/Games Workshop) — Major AAA RTS
"Tischplatte" — Classic RTS, €2.6M federal funding (Aug 2025)
"Schießeisen" — Cooperative action-shooter, federal funding
"Rundeisen" — €197K federal funding (Oct 2025)

== FUNDING ==
Multiple German federal game development grants (2021, 2025)
Total recent funding: €2.8M+ for new projects

== FIT ==
Director ICP: 65/100
GOOD FIT — German indie with strong dialogue heritage.
+ Book of Unwritten Tales = proven narrative/dialogue expertise
+ The Dwarves = novel adaptation = complex character dialogue
+ Multiple active projects = opportunity window
+ Federal funding = stable finances
+ Mid-size team = accessible decision makers
- Dawn of War IV likely uses internal/partner tools
- RTS focus may prioritize less NPC dialogue

STATUS: QUALIFIED LEAD
Strong dialogue heritage from adventure games. Worth outreach for Dawn of War IV or future projects.

Source: kingart-games.com, Wikipedia, Tracxn, gamesmarket.global`,
      'studio.fitScore': 65,
      'studio.fitReason': 'German indie with Book of Unwritten Tales dialogue heritage. Working on Dawn of War IV. Federal funding for multiple projects.',
      icpScore: 65,
      status: 'active',
      category: 'lead'
    }
  },
  // Klei Entertainment
  {
    id: 'dLhxiHTGnYDPJ7QKmwvN',
    data: {
      website: 'https://www.klei.com',
      country: 'Canada',
      location: 'Vancouver, British Columbia, Canada',
      tags: ['canada', 'indie', 'survival', 'roguelike', 'tencent', 'deck-building', 'director-icp', 'researched'],
      notes: `RESEARCH COMPLETE (2026-03-03)

== COMPANY ==
Name: Klei Entertainment Inc.
Founded: July 2005 by Jamie Cheng
HQ: Vancouver, BC, Canada (Yaletown)
Owner: Tencent majority stake (acquired Jan 2021)
Size: 50-100 employees

== KEY PEOPLE ==
Jamie Cheng — Founder, CEO (ex-Relic Entertainment AI programmer)
Nick Waanders — (via Slick merger)

== GAMES ==
Don't Starve / Don't Starve Together (2013+) — Survival, minimal dialogue
Oxygen Not Included (2019) — Colony sim
Invisible, Inc. (2015) — Tactical stealth
Griftlands (2021) — Deck-building RPG with negotiation dialogue
Mark of the Ninja (2012)
Hot Lava (2019)
Rotwood (2024+, Early Access) — Action roguelite

== TECH ==
Strong procedural/systemic game design
Early Access development model since 2012

== FIT ==
Director ICP: 40/100
MODERATE FIT — Systems-focused studio with minimal NPC dialogue.
+ Griftlands has negotiation dialogue system
+ Strong procedural content expertise
+ Indie accessible
- Survival/roguelike focus = little traditional NPC conversation
- Don't Starve = no dialogue
- Tencent ownership may affect tool decisions
- Vancouver = not EU market

STATUS: PROSPECT
Griftlands shows some dialogue interest, but overall systems-focused. Monitor for dialogue-heavy projects.

Source: klei.com, Wikipedia, YouTube, LinkedIn`,
      'studio.fitScore': 40,
      'studio.fitReason': 'Vancouver survival/roguelike studio (Tencent-owned). Griftlands has dialogue, but primarily systems-focused games.',
      icpScore: 40,
      status: 'active'
    }
  },
  // Krafton
  {
    id: 'NGF4CtjlXcmNFZiyDxCm',
    data: {
      website: 'https://www.krafton.com',
      country: 'South Korea',
      location: 'Seoul, South Korea',
      tags: ['south-korea', 'aaa', 'publisher', 'battle-royale', 'nvidia-partnership', 'enterprise', 'not-a-fit', 'researched'],
      notes: `RESEARCH COMPLETE (2026-03-03)

== COMPANY ==
Name: Krafton Inc.
HQ: Seoul, South Korea
Type: AAA Publisher/Holding Company (public company)
Subsidiaries: Bluehole, PUBG Studios, Striking Distance, Unknown Worlds, etc.

== GAMES / PORTFOLIO ==
PUBG: Battlegrounds (flagship battle royale)
Dark and Darker Mobile (2025)
inZOI (life sim, 2025)
Subnautica 2 (2025, via Unknown Worlds)
The Callisto Protocol (via Striking Distance)
Dinkum Together (2025)

== AI INITIATIVES ==
CES 2025: Partnered with NVIDIA on deep learning game tech
- PUBG Ally (AI companion system)
- Smart Zoi (AI features for inZOI)
Record earnings 2024

== FIT ==
Director ICP: 20/100
NOT A FIT — Large Korean publisher with internal AI capabilities.
- Working directly with NVIDIA on AI
- Enterprise scale = complex procurement
- Battle royale/sim focus = minimal narrative needs
- Has resources to build in-house
- Reference account for competitive intel only

STATUS: INACTIVE (COMPETITIVE REFERENCE)
Track for industry AI trends. They're building AI internally with NVIDIA.

Source: krafton.com, Wikipedia, GameRant, Korea Times`,
      'studio.fitScore': 20,
      'studio.fitReason': 'Korean AAA publisher with NVIDIA AI partnership. Building AI in-house. Competitive reference only.',
      icpScore: 20,
      status: 'active'
    }
  },
  // Larian Studios (primary) - already researched, just update tags
  {
    id: 'ipjPGOmCU4mgyYkyWzab',
    data: {
      tags: ['belgium', 'aaa', 'narrative', 'branching', 'rpg', 'indie', 'architect-icp', 'director-icp', 'researched', 'high-priority'],
      icpScore: 88,
      'studio.fitScore': 88,
      status: 'active',
      category: 'lead'
    }
  },
  // Larian Studios (duplicate) - mark for merge
  {
    id: 'wn1CpThsRGKlR8gMYW5K',
    data: {
      tags: ['belgium', 'aaa', 'narrative-rpg', 'architect-icp', 'duplicate'],
      notes: `DUPLICATE ENTRY — Merge with primary Larian record (ipjPGOmCU4mgyYkyWzab).
This is a duplicate tracking entry for the same studio.
See primary record for full research.`,
      icpScore: 0,
      status: 'inactive'
    }
  },
  // Larian Studios (US Office) - mark for merge
  {
    id: 'fQlRQIF4bdTmcpKcxybq',
    data: {
      tags: ['usa', 'aaa', 'crpg', 'narrative', 'director-icp', 'architect-icp', 'duplicate'],
      notes: `DUPLICATE ENTRY — Merge with primary Larian record (ipjPGOmCU4mgyYkyWzab).
This is a US office tracking entry. Larian has 7 studios globally.
See primary record for full research.`,
      icpScore: 0,
      status: 'inactive'
    }
  },
  // Leenzee Games
  {
    id: '2Gl7TzrjN3VUBJAa0NzY',
    data: {
      website: 'http://www.leenzee.com',
      country: 'China',
      location: 'China',
      tags: ['china', 'aa', 'action-rpg', 'souls-like', '505-games', 'director-icp', 'researched'],
      notes: `RESEARCH COMPLETE (2026-03-03)

== COMPANY ==
Name: Leenzee Games (凌雀游戏)
Founded: 2016
HQ: China
Type: AA Chinese indie

== GAMES ==
WUCHANG: Fallen Feathers (July 24, 2025)
- Soulslike action RPG set in Ming Dynasty China
- Published by 505 Games
- Platforms: PS5, Xbox Series, PC
- Xbox Game Pass Day One release
- Based on historical events with fictional story

== STYLE ==
Souls-like action combat
Historical Chinese setting
Single-player focused

== FIT ==
Director ICP: 35/100
LOWER FIT — Souls-like focus with minimal NPC dialogue.
+ Has narrative elements (historical story)
+ AA scale = accessible
+ Recently released = may be planning next project
- Souls-like genre = combat-focused, limited conversation
- Chinese market = language/localization complexity
- 505 Games publishing = less direct access

STATUS: PROSPECT (MONITOR)
Track for future projects. Current souls-like focus limits dialogue needs.

Source: leenzee.com, Gematsu, 505games.com, Wikipedia`,
      'studio.fitScore': 35,
      'studio.fitReason': 'Chinese souls-like studio. WUCHANG released July 2025 via 505 Games. Combat-focused, limited dialogue needs.',
      icpScore: 35,
      status: 'active'
    }
  },
  // Level-5
  {
    id: 'xAKEaGQlsV3ICFpqu27c',
    data: {
      website: 'https://www.level5.co.jp',
      country: 'Japan',
      location: 'Fukuoka, Japan',
      tags: ['japan', 'aa', 'jrpg', 'narrative', 'puzzle', 'publisher', 'director-icp', 'researched'],
      notes: `RESEARCH COMPLETE (2026-03-03)

== COMPANY ==
Name: Level-5 Inc. (株式会社レベルファイブ)
Founded: October 1998 by Akihiro Hino
HQ: Yakuin, Chūō-ku, Fukuoka, Japan
Type: Developer/Publisher (private)
Size: 300 employees (2024)
Subsidiary: Level-5 Osaka Office

== KEY PEOPLE ==
Akihiro Hino — Founder, President, CEO (Twitter: @AkihiroHino)

== FRANCHISES ==
Professor Layton (2007+) — Puzzle/narrative adventure, rich dialogue
Ni no Kuni (2011+) — JRPG with Studio Ghibli
Yo-kai Watch — Cross-media franchise
Inazuma Eleven — Sports RPG with anime
Fantasy Life — Action RPG
Dragon Quest VIII & IX (as developer for Square Enix)

== 2025 RELEASES ==
Fantasy Life i: The Girl Who Steals Time
Inazuma Eleven: Victory Road
Professor Layton and the New World of Steam (TBA 2025)

== HISTORY ==
- NA operations (Level-5 Abby) shut down Oct 2020
- One of top 10 Japanese game companies (early 2010s)
- Known for cross-media franchises (games + anime + manga)

== FIT ==
Director ICP: 55/100
MODERATE FIT — Strong narrative heritage but enterprise scale.
+ Professor Layton = dialogue-heavy puzzle games
+ Ni no Kuni = RPG with rich NPC interactions
+ Multiple 2025 releases = active development
- 300 employees = larger enterprise
- Japan-focused = language/localization needs
- Established internal tools (since 1998)
- NA pullback = harder to reach

STATUS: PROSPECT (ENTERPRISE)
Strong narrative heritage (Layton). Worth monitoring for EU expansion or localization partnerships.

Source: level5.co.jp, Wikipedia, TheGamer, Nintendo Life`,
      'studio.fitScore': 55,
      'studio.fitReason': 'Japanese AA publisher. Professor Layton/Ni no Kuni heritage = strong narrative. 300 employees, Japan-focused.',
      icpScore: 55,
      status: 'active'
    }
  },
  // like Charlie - already researched, update ICP
  {
    id: 'vqfM0KbCzGKjTZ1Ks90n',
    data: {
      tags: ['belgium', 'indie', 'narrative', 'branching', 'architect-icp', 'director-icp', 'researched', 'high-priority'],
      icpScore: 85,
      'studio.fitScore': 85,
      'studio.fitReason': 'Perfect 8-person Belgian narrative studio. Ghost on the Shore, Marie\'s Room. Exactly our target customer for Architect.',
      status: 'active',
      category: 'lead'
    }
  },
  // Liminal Group - NOT A GAME STUDIO
  {
    id: 'LgTDjQCrAqRmwxkzAfRR',
    data: {
      website: 'https://www.liminal-group.net',
      country: 'Netherlands',
      location: 'Netherlands',
      tags: ['netherlands', 'ai-services', 'narrative-ai', 'potential-partner', 'not-a-fit', 'wrong-type', 'researched'],
      type: 'other',
      notes: `RESEARCH COMPLETE (2026-03-03)

== NOT A GAME STUDIO ==
Liminal Group is an AI development services company, NOT a game studio.

== COMPANY ==
Name: Liminal Group
HQ: Netherlands
Type: AI Services / Consulting
Website: liminal-group.net

== SERVICES ==
- Specialized AI systems
- Agentic networks and vertical agents
- Fine-tuning and deep learning
- Natural language processing
- Previously developed "Liminal Script Engine" for dynamic narratives

== RELEVANCE ==
POTENTIAL COMPETITOR/PARTNER — They build narrative AI systems.
The Liminal Script Engine is directly in our space.

NOT A CUSTOMER — Wrong type of company.

== ACTION ==
- Mark as inactive for sales pipeline
- Move to partner/competitor tracking
- May be worth competitive analysis or partnership exploration

STATUS: INACTIVE (WRONG TYPE)
This is an AI services company, not a game studio customer.

Source: liminal-group.net`,
      'studio.fitScore': 0,
      'studio.fitReason': 'NOT A GAME STUDIO. AI services company building narrative AI. Potential competitor/partner, not customer.',
      icpScore: 0,
      status: 'inactive'
    }
  }
];

async function updateBatch26() {
  console.log('Updating batch 26 studio leads...\n');
  
  for (const update of updates) {
    try {
      const docRef = db.collection('leads').doc(update.id);
      const doc = await docRef.get();
      
      if (!doc.exists) {
        console.log(`⚠️ Lead not found: ${update.id}`);
        continue;
      }
      
      const currentData = doc.data();
      
      // Merge tags
      const existingTags = currentData.tags || [];
      const newTags = update.data.tags || [];
      const mergedTags = [...new Set([...existingTags, ...newTags])];
      
      // Build update object
      const updateObj = {
        ...update.data,
        tags: mergedTags,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };
      
      // Handle nested studio object for fitScore/fitReason
      if (update.data['studio.fitScore'] !== undefined) {
        await docRef.update({
          ...updateObj,
          'studio.fitScore': update.data['studio.fitScore'],
          'studio.fitReason': update.data['studio.fitReason']
        });
      } else {
        await docRef.update(updateObj);
      }
      
      console.log(`✅ Updated: ${currentData.name} (ICP: ${update.data.icpScore})`);
    } catch (err) {
      console.error(`❌ Error updating ${update.id}:`, err.message);
    }
  }
  
  console.log('\n=== BATCH 26 SUMMARY ===');
  console.log('Total leads processed: 10');
  console.log('');
  console.log('QUALIFIED LEADS (ICP >= 65):');
  console.log('  - Larian Studios (88) — Already researched, high-priority');
  console.log('  - like Charlie (85) — Perfect Architect fit, Belgian indie');
  console.log('  - KING Art Games (65) — German dialogue heritage, Dawn of War IV');
  console.log('');
  console.log('PROSPECTS (ICP 35-64):');
  console.log('  - Level-5 (55) — Japanese AA, Professor Layton narrative');
  console.log('  - Klei Entertainment (40) — Systems-focused, Griftlands dialogue');
  console.log('  - Leenzee Games (35) — Chinese souls-like, limited dialogue');
  console.log('');
  console.log('NOT A FIT / INACTIVE:');
  console.log('  - Krafton (20) — Korean publisher, NVIDIA AI partnership');
  console.log('  - Larian Studios duplicate (0) — Merge with primary');
  console.log('  - Larian Studios US Office (0) — Merge with primary');
  console.log('  - Liminal Group (0) — NOT A STUDIO, AI services company');
}

updateBatch26().then(() => {
  console.log('\nDone!');
  process.exit(0);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
