import * as admin from 'firebase-admin';
import * as path from 'path';

// Initialize Firebase Admin
const serviceAccountPath = path.resolve(__dirname, '../../service-account.json');
process.env.GOOGLE_APPLICATION_CREDENTIALS = serviceAccountPath;

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();

const STUDIO_PIPELINE_ID = 'Yo2OlGZdFFMWkFTr0n08';

interface Lead {
  name: string;
  company: string;
  email: string;
  website: string;
  status: string;
  source: string;
  notes: string;
  country: string;
  region: string;
  tags: string[];
  fit: number;
  pipelineId: string;
  pipeline: {
    id: string;
    stageId: string;
    enteredAt: admin.firestore.Timestamp;
  };
  createdAt: admin.firestore.Timestamp;
  updatedAt: admin.firestore.Timestamp;
}

const westEurope2Studios: Partial<Lead>[] = [
  // BELGIUM
  {
    company: 'Larian Studios',
    website: 'https://larian.com',
    notes: `Belgian studio that created BALDUR'S GATE 3 — ULTIMATE GOTY 2023.

**Location:** Ghent, Belgium (HQ) + Quebec, Dublin, Kuala Lumpur, Guildford, Barcelona, Warsaw
**Founded:** 1996
**Founder:** Swen Vincke
**Size:** ~500 employees

**STAGGERING STATS:**
- **1.5 MILLION words of dialogue**
- **1.3 million lines, 140+ hours of cutscenes**
- **Triple the word count of Lord of the Rings**

**Games:**
- Divinity: Original Sin 1 & 2 — Critically acclaimed CRPGs
- Baldur's Gate 3 — WON 6 GAME OF THE YEAR AWARDS

**Why ULTIMATE FIT for LoreWeaver:**
- Literally the MOST dialogue-heavy game ever made
- Vladimir Gaidenko (scripter) gave DevGAMM masterclass on "scripting the unscriptable"
- "What if" branching approach for every scenario
- Dedicated writer for working out all romance permutations
- If ANYONE needs narrative tools, it's Larian

**Fit Score: 100** — The ultimate narrative scale challenge`,
    country: 'Belgium',
    region: 'Europe',
    tags: ['crpg', 'baldurs-gate', 'branching', 'ghent', 'goty', 'massive-dialogue'],
    fit: 100,
  },
  {
    company: 'Tale of Tales',
    website: 'https://tale-of-tales.com',
    notes: `Belgian art game pioneers.

**Location:** Belgium
**Founded:** 2003
**Founders:** Auriea Harvey + Michaël Samyn

**Games:**
- The Path — Horror art game
- The Graveyard
- Sunset

**Why Consider:**
- Art game pioneers
- Experimental narrative

**Fit Score: 72** — Art game niche`,
    country: 'Belgium',
    region: 'Europe',
    tags: ['art-game', 'experimental', 'narrative', 'indie'],
    fit: 72,
  },
  // SPAIN
  {
    company: 'Tequila Works',
    website: 'https://www.tequilaworks.com',
    notes: `Spanish studio known for narrative-driven adventures.

**Location:** Madrid, Spain
**Founded:** 2009
**Founders:** Raúl Rubio, Luz Sancho (veterans from Blizzard, MercurySteam, Sony)

**Games:**
- Deadlight — 2.5D zombie survival
- Rime — Narrative puzzle adventure, beautiful
- Gylt — Horror adventure
- The Sexy Brutale — Time-loop murder mystery
- Song of Nunu — League of Legends narrative adventure

**Why PERFECT for LoreWeaver:**
- "Narrative-driven adventure and puzzle games"
- Artistic visual styles
- Innovative storytelling
- Rime = environmental narrative

**Fit Score: 88** — Narrative adventure specialists`,
    country: 'Spain',
    region: 'Europe',
    tags: ['narrative', 'adventure', 'puzzle', 'madrid', 'rime'],
    fit: 88,
  },
  {
    company: 'MercurySteam',
    website: 'https://www.mercurysteam.com',
    notes: `Spanish AAA studio, Nintendo partner.

**Location:** Madrid, Spain
**Notable:** Worked with Nintendo on Metroid

**Games:**
- Castlevania: Lords of Shadow series
- Metroid: Samus Returns (Nintendo)
- Metroid Dread (Nintendo) — Action-adventure masterpiece

**Why Consider:**
- AAA action-adventure
- Narrative through environmental design
- Nintendo collaboration

**Fit Score: 75** — AAA action focus`,
    country: 'Spain',
    region: 'Europe',
    tags: ['aaa', 'metroid', 'castlevania', 'action-adventure', 'madrid'],
    fit: 75,
  },
  // ITALY
  {
    company: 'Storm in a Teacup',
    website: 'https://stcware.com',
    notes: `Italian studio focused on storytelling experiences.

**Location:** Rome, Italy
**Founded:** 2013
**Founder:** Carlo Ivo Alimo Bianchi

**Mission:** "We want to tell stories, experiences that we want to share"

**Games:**
- N.E.R.O.: Nothing Ever Remains Obscure
- Close to the Sun — First-person horror adventure (Tesla-punk)
- Steel Seed — Upcoming sci-fi adventure

**Why PERFECT for LoreWeaver:**
- "We want to tell stories" = explicit mission
- Horror narrative specialists
- First-person adventure games

**Fit Score: 85** — Story-focused studio`,
    country: 'Italy',
    region: 'Europe',
    tags: ['narrative', 'horror', 'adventure', 'rome', 'story-first'],
    fit: 85,
  },
  {
    company: 'LKA',
    website: 'https://lka.it',
    notes: `Italian studio specializing in interactive narrative.

**Location:** Florence, Italy

**Games:**
- The Town of Light — Mental health narrative
- Martha is Dead — Psychological horror, Italy WWII setting

**Why PERFECT for LoreWeaver:**
- Historical narrative games
- Psychological storytelling
- Italian setting and culture

**Fit Score: 88** — Psychological narrative specialists`,
    country: 'Italy',
    region: 'Europe',
    tags: ['narrative', 'psychological', 'horror', 'historical', 'florence'],
    fit: 88,
  },
  // NETHERLANDS
  {
    company: 'Guerrilla Games',
    website: 'https://www.guerrilla-games.com',
    notes: `Dutch AAA studio, Sony first-party.

**Location:** Amsterdam, Netherlands
**Owner:** Sony Interactive Entertainment

**Games:**
- Killzone series
- Horizon Zero Dawn — Open-world narrative RPG
- Horizon Forbidden West

**Why Consider:**
- Massive open-world narrative
- World-building expertise
- AAA resources

**Fit Score: 78** — AAA, Sony first-party`,
    country: 'Netherlands',
    region: 'Europe',
    tags: ['aaa', 'horizon', 'open-world', 'amsterdam', 'sony'],
    fit: 78,
  },
  {
    company: 'Abbey Games',
    website: 'https://abbeygames.com',
    notes: `Dutch indie studio with unique narrative-tactical games.

**Location:** Netherlands (Dutch Game Garden alumni)

**Games:**
- Reus — God game
- Renowned Explorers: International Society — "Attitude-based gameplay challenging tactical AND storytelling skills"
- Godhood — Religion sim

**Why PERFECT for LoreWeaver:**
- Renowned Explorers = procedural storytelling
- "Challenges storytelling skills"
- Unique narrative mechanics

**Fit Score: 82** — Procedural narrative`,
    country: 'Netherlands',
    region: 'Europe',
    tags: ['indie', 'strategy', 'procedural', 'narrative', 'dutch-game-garden'],
    fit: 82,
  },
  {
    company: 'Triumph Studios',
    website: 'https://www.triumphstudios.com',
    notes: `Dutch strategy RPG studio.

**Location:** Netherlands
**Owner:** Paradox Interactive

**Games:**
- Age of Wonders series — Strategy RPG
- Overlord series

**Why Consider:**
- RPG elements
- Story campaigns

**Fit Score: 70** — Strategy focus`,
    country: 'Netherlands',
    region: 'Europe',
    tags: ['strategy', 'rpg', 'age-of-wonders', 'paradox'],
    fit: 70,
  },
  // AUSTRIA
  {
    company: 'Moon Studios',
    website: 'https://www.orithegame.com',
    notes: `Austrian studio known for emotional narrative platformers.

**Location:** Vienna, Austria
**Founded:** 2010
**Founders:** Thomas Mahler (ex-Blizzard), Gennadiy Korol

**Games:**
- Ori and the Blind Forest — "Emotional narrative, hand-painted art"
- Ori and the Will of the Wisps — Award-winning sequel
- No Rest for the Wicked — Action RPG

**Why PERFECT for LoreWeaver:**
- "Emotional narrative" specialists
- Award-winning storytelling
- Now doing RPG (No Rest for the Wicked)

**Fit Score: 85** — Emotional narrative experts`,
    country: 'Austria',
    region: 'Europe',
    tags: ['indie', 'ori', 'emotional', 'narrative', 'platformer', 'rpg', 'vienna'],
    fit: 85,
  },
  // PORTUGAL
  {
    company: 'Nerd Monkeys',
    website: 'https://www.nerdmonkeys.pt',
    notes: `Portuguese indie studio.

**Location:** Portugal

**Games:**
- Detective Case and Clown Bot series — Point-and-click adventures
- Murder mystery adventures

**Why Consider:**
- Adventure game specialists
- Detective narratives

**Fit Score: 75** — Adventure game focus`,
    country: 'Portugal',
    region: 'Europe',
    tags: ['adventure', 'detective', 'point-and-click', 'indie'],
    fit: 75,
  },
  // SWITZERLAND
  {
    company: 'Okomotive',
    website: 'https://okomotive.net',
    notes: `Swiss indie studio.

**Location:** Zurich, Switzerland

**Games:**
- FAR: Lone Sails — Atmospheric vehicle adventure
- FAR: Changing Tides

**Why Consider:**
- Environmental storytelling
- Atmospheric narrative

**Fit Score: 72** — Environmental narrative`,
    country: 'Switzerland',
    region: 'Europe',
    tags: ['indie', 'atmospheric', 'adventure', 'zurich'],
    fit: 72,
  },
];

async function importStudios() {
  console.log(`\n🇪🇸🇮🇹🇳🇱🇧🇪🇦🇹 Importing ${westEurope2Studios.length} Western Europe Part 2 studios...\n`);
  
  const now = admin.firestore.Timestamp.now();
  let imported = 0;
  let skipped = 0;
  
  for (const studio of westEurope2Studios) {
    const existing = await db.collection('leads')
      .where('company', '==', studio.company)
      .where('pipelineId', '==', STUDIO_PIPELINE_ID)
      .get();
    
    if (!existing.empty) {
      console.log(`⏭️  Skipping ${studio.company} (already exists)`);
      skipped++;
      continue;
    }
    
    const lead: Lead = {
      name: studio.name || '',
      company: studio.company!,
      email: studio.email || '',
      website: studio.website || '',
      status: 'new',
      source: 'research',
      notes: studio.notes || '',
      country: studio.country!,
      region: studio.region!,
      tags: studio.tags || [],
      fit: studio.fit || 50,
      pipelineId: STUDIO_PIPELINE_ID,
      pipeline: {
        id: STUDIO_PIPELINE_ID,
        stageId: 'new',
        enteredAt: now,
      },
      createdAt: now,
      updatedAt: now,
    };
    
    const docRef = await db.collection('leads').add(lead);
    console.log(`✅ Added ${studio.company} (${studio.country}) — Fit: ${studio.fit} — ID: ${docRef.id}`);
    imported++;
  }
  
  console.log(`\n📊 Summary: ${imported} imported, ${skipped} skipped`);
  console.log('🇪🇸🇮🇹🇳🇱🇧🇪🇦🇹 Western Europe Part 2 import complete!\n');
}

importStudios()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
