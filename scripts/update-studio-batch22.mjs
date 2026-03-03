// Update batch 22 leads with research, ICP scores for Director, contacts, and tags
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
    id: 'hit9YFhTnM58yc0lMKqG',
    name: 'Fast Travel Games',
    icpScore: 72,
    status: 'active',
    tags: ['sweden', 'indie', 'vr', 'narrative', 'horror', 'director-icp', 'researched'],
    notes: `RESEARCH (2026-03-03)

== COMPANY ==
Founded: 2016 in Stockholm, Sweden
Team: ~30 (downsized from 120 in 2025 industry layoffs)
Focus: VR-exclusive game developer and publisher
Funding: Raised seed round, $4M in 2021

== KEY PEOPLE ==
Founders from Rovio, EA, DICE (Angry Birds, Mirror's Edge, Battlefield)

== GAMES ==
- Vampire: The Masquerade - Justice (VR RPG)
- Wraith: The Oblivion - Afterlife (VR horror)
- The Midnight Walk (published, won Best VR/AR Game at TGA 2025)
- Ghost Signal: A Stellaris Game
- Apex Construct (first game, 2018)

== NARRATIVE FIT ==
VTM: Justice and Wraith: Afterlife are narrative VR games in World of Darkness setting.
VR focus means immersive storytelling, direct NPC interaction.
Publishing arm could use Director for third-party titles.

== DIRECTOR ICP: 72 ==
+ Strong narrative focus in VR
+ World of Darkness games (rich lore)
+ Publishing arm (multiple potential integrations)
- VR is niche market
- Recent downsizing, uncertain budget
- Smaller scale than AA/AAA

Source: fasttravelgames.com, Crunchbase, GamesBeat`,
  },
  {
    id: 'rOcJbNBnpeUMDpDdR3fA',
    name: 'Fatshark',
    icpScore: 55,
    status: 'active',
    tags: ['sweden', 'aa', 'co-op', 'action', 'warhammer', 'director-icp', 'researched'],
    contacts: [
      { name: 'Mårten Stormdal', role: 'Narrative Director', source: 'Darktide dev blog' },
      { name: 'Victor Magnuson', role: 'Design Director', source: 'PC Gamer interview' },
      { name: 'Martin Wahlund', role: 'Co-Founder', source: 'fatshark.se' },
    ],
    notes: `RESEARCH (2026-03-03)

== COMPANY ==
Founded: 2007 in Stockholm (Södermalm), Sweden
Team: ~200 employees
Self-publishing studio (formerly work-for-hire)

== KEY PEOPLE ==
Martin Wahlund - Co-Founder
Rikard Blomberg - Co-Founder
Mårten Stormdal - Narrative Director
Victor Magnuson - Design Director
Dan Abnett - Principal Writer (Darktide)

== GAMES ==
- Warhammer 40K: Darktide (2022, ongoing updates)
- Warhammer: Vermintide 1 & 2
- Lead and Gold (2010, first game)
- Co-founded Bitsquid engine (sold to Autodesk 2014)

== NARRATIVE FIT ==
Has dedicated Narrative Director (Mårten Stormdal).
Darktide uses evolving narrative, player character VO.
Co-op action focus = less emergent NPC dialogue need.
Working with major author (Dan Abnett) for world building.

== DIRECTOR ICP: 55 ==
+ Has narrative team and infrastructure
+ Major franchise (Warhammer)
+ Live service = ongoing content needs
- Co-op action focus, less NPC dialogue
- Combat-centric gameplay
- Already have established narrative workflow

Source: fatshark.se, playdarktide.com, PC Gamer`,
  },
  {
    id: 'gUHIy1sUVpD76pWoN24D',
    name: 'Fellow Traveller',
    icpScore: 88,
    status: 'qualified',
    tags: ['usa', 'australia', 'publisher', 'indie', 'narrative', 'director-icp', 'architect-icp', 'high-priority', 'researched'],
    contacts: [
      { name: 'Chris Wright', role: 'Founder & Managing Director', email: 'c******@fellowtraveller.games', source: 'RocketReach, ACMI' },
      { name: 'Marla', role: 'Head of Marketing', source: 'fellowtraveller.games' },
      { name: 'Spencer', role: 'Scout', source: 'fellowtraveller.games' },
      { name: 'Louis', role: 'Producer', source: 'fellowtraveller.games' },
    ],
    notes: `RESEARCH (2026-03-03)

== COMPANY ==
Founded: 2011 (as Surprise Attack Games, rebranded 2018)
Location: Melbourne, Australia (but USA presence)
Type: PUBLISHER specializing in narrative indie games
Founder: Chris Wright (20+ years marketing/studio management)

== KEY PEOPLE ==
Chris Wright - Founder & Managing Director
Marla - Head of Marketing
Spencer - Scout (finds games)
Louis - Producer (ex-SEGA, Curve Digital)
Sam - Finance Manager
Christopher - Biz Dev (ex-Indie MEGABOOTH)

== PUBLISHED GAMES ==
- Citizen Sleeper (tabletop RPG in space)
- Paradise Killer (murder mystery)
- Genesis Noir (noir adventure)
- The Pale Beyond (survival narrative)
- Neo Cab, In Other Waters, Orwell series

== NARRATIVE FIT ==
THIS IS A NARRATIVE-FIRST PUBLISHER!
Every game they publish has "narrative at their core."
Mission: "exploring the possibility space of what narrative games can be"
Hosts LudoNarraCon (narrative games showcase)

== DIRECTOR ICP: 88 ==
+ Publisher = multiple games could use Director
+ 100% narrative focus ("narrative at core")
+ Portfolio of dialogue-heavy games
+ Active scout looking for "fresh" narrative games
+ Could be PARTNER not just customer
- Indies have smaller budgets
- May prefer custom solutions

== STRATEGIC VALUE ==
Could introduce Director to their entire studio network.
Partnership potential > individual sale.

Source: fellowtraveller.games, Wikipedia, ACMI`,
  },
  {
    id: 'fGzY0LvdzzkS8MpAKZzh',
    name: 'Firaxis Games',
    icpScore: 45,
    status: 'active',
    tags: ['usa', 'aaa', 'strategy', '4x', 'director-icp', 'researched'],
    contacts: [
      { name: 'Sid Meier', role: 'Co-Founder', source: 'Wikipedia' },
    ],
    notes: `RESEARCH (2026-03-03)

== COMPANY ==
Founded: 1996 by Sid Meier, Brian Reynolds, Jeff Briggs
Location: Hunt Valley, Maryland, USA
Parent: 2K Games (Take-Two)
Focus: Strategy games

== KEY PEOPLE ==
Sid Meier - Co-Founder, legendary game designer
Brian Reynolds - Co-Founder (later left)
Jeff Briggs - Co-Founder
Was hiring Narrative Lead with "world history" passion

== GAMES ==
- Civilization series (VI launched 2016)
- XCOM series
- Alpha Centauri (classic)

== NARRATIVE FIT ==
4X/strategy games have limited NPC dialogue.
Civ games have leader interactions but scripted.
XCOM has more emergent gameplay but combat-focused.
Narrative Lead job posting suggests interest in story.

== DIRECTOR ICP: 45 ==
+ AAA studio with resources
+ Civilization leaders could use dynamic dialogue
+ Looking for narrative talent
- Strategy genre = less NPC conversation
- Turn-based = different pacing than real-time dialogue
- 2K parent = corporate decision making

Source: firaxis.com, Wikipedia, PC Gamer`,
  },
  {
    id: 'cduyHpMMpO3LK4DSBDxy',
    name: 'Fishing Cactus',
    icpScore: 65,
    status: 'active',
    tags: ['belgium', 'indie', 'narrative', 'typing', 'architect-icp', 'researched'],
    contacts: [
      { name: 'Bruno Urbain', role: 'Co-Founder', source: 'LinkedIn' },
      { name: 'Julien Hamaide', role: 'Co-Founder', source: 'LinkedIn' },
    ],
    notes: `RESEARCH (2026-03-03)

== COMPANY ==
Founded: 2008 by Bruno Urbain and Julien Hamaide
Location: Mons (Digital Innovation Valley), Belgium
Team: 20-38 employees
Type: Indie studio + work-for-hire

== KEY PEOPLE ==
Bruno Urbain - Co-Founder
Julien Hamaide - Co-Founder
Founders from ex-10Tacle (Totems, Urban Race)

== GAMES ==
- Epistory - Typing Chronicles (narrative typing adventure)
- Nanotale (successor to Epistory)
- Algo Bot (puzzle)
- Shift Quantum
- 50+ titles across platforms (incl. work-for-hire)

== NARRATIVE FIT ==
Epistory and Nanotale are NARRATIVE typing games.
"Smart games with soul" philosophy.
Work-for-hire arm = could integrate into client projects.

== DIRECTOR ICP: 65 ==
+ Narrative focus (Epistory/Nanotale)
+ Belgian (EU studio, easier to work with)
+ Work-for-hire means diverse project exposure
- Small team, limited budget
- Typing games = unique interaction, less dialogue
- Mixed portfolio (not all narrative)

Source: fishingcactus.com, LinkedIn, YouTube`,
  },
  {
    id: 'BNggBhM8K2DkfFSQvld1',
    name: 'Flashbulb Games',
    icpScore: 25,
    status: 'active',
    tags: ['denmark', 'indie', 'sandbox', 'party', 'nordisk-owned', 'researched'],
    notes: `RESEARCH (2026-03-03)

== COMPANY ==
Founded: 2016 (from ex-Press Play after Microsoft closure)
Location: Copenhagen, Denmark
Team: ~30 developers
Owner: Nordisk Games (acquired)

== GAMES ==
- Trailmakers (open-world vehicle builder)
- Rubber Bandits (party brawler)
- Focus: Player creativity, sandbox experiences

== NARRATIVE FIT ==
Sandbox/building games = NO narrative focus.
Party games = minimal dialogue.
"Games you play WITH, not just play" = mechanics over story.

== DIRECTOR ICP: 25 ==
- No narrative focus
- Sandbox/party genres
- No NPC dialogue needs
- Wrong target entirely

NOT A FIT for Director or Architect.

Source: flashbulbgames.com, nordiskgames.com, playtrailmakers.com`,
  },
  {
    id: '52vSmvgTPrhniQML030W',
    name: 'Flying Wild Hog',
    icpScore: 52,
    status: 'active',
    tags: ['poland', 'aa', 'action', 'shooter', 'embracer', 'director-icp', 'researched'],
    contacts: [
      { name: 'Michał Szustak', role: 'CEO & Co-Founder', source: 'Tracxn' },
      { name: 'Klaudiusz Zych', role: 'Co-Founder', source: 'Wikipedia' },
      { name: 'Tomasz Baran', role: 'Co-Founder', source: 'Wikipedia' },
    ],
    notes: `RESEARCH (2026-03-03)

== COMPANY ==
Founded: 2009 in Warsaw, Poland
Team: ~200 employees across 3 Polish studios
Owner: Plaion (Embracer Group) - acquired via Supernova Capital 2019
Address: Plac Unii Building A, Puławska 2, 02-566 Warsaw

== KEY PEOPLE ==
Michał Szustak - CEO & Co-Founder (ex-CD Projekt, People Can Fly)
Klaudiusz Zych - Co-Founder
Tomasz Baran - Co-Founder

== GAMES ==
- Shadow Warrior series (1, 2, 3)
- Hard Reset (2011, first game)
- Trek to Yomi (2022, samurai narrative)
- Evil West (2022, weird west action)
- Space Punks (cancelled)

== NARRATIVE FIT ==
Trek to Yomi is their most narrative-focused game (samurai story).
Mostly action/shooter focus.
Shadow Warrior has humor/story but gameplay-first.
Evil West has story but action-heavy.

== DIRECTOR ICP: 52 ==
+ Trek to Yomi shows narrative capability
+ Large team with resources
+ Polish studio (EU, good timezone)
- Action/shooter focus
- Embracer ownership = corporate constraints
- Combat-first game design

Source: flyingwildhog.com, Wikipedia, Tracxn`,
  },
  {
    id: 'P72FP5iqXKgmV6e8FYDZ',
    name: "Fool's Theory",
    icpScore: 92,
    status: 'qualified',
    // Already well-researched, just adding score
    tags: ['poland', 'aa', 'rpg', 'witcher', 'director-icp', 'architect-icp', 'high-priority', 'researched'],
  },
  {
    id: 'X6Kv8kmwIAxdddPV1Atf',
    name: 'Frictional Games',
    icpScore: 85,
    status: 'qualified',
    tags: ['sweden', 'indie', 'horror', 'narrative', 'director-icp', 'architect-icp', 'high-priority', 'researched'],
    contacts: [
      { name: 'Thomas Grip', role: 'Co-Founder & Creative Director', source: 'Wikipedia, frictionalgames.com' },
      { name: 'Jens Nilsson', role: 'Co-Founder', source: 'Wikipedia' },
    ],
    notes: `RESEARCH (2026-03-03)

== COMPANY ==
Founded: 2007 by Thomas Grip and Jens Nilsson
Location: Malmö, Sweden (office) + remote team
Team: ~25 employees + contractors
Type: Independent, self-funded

== KEY PEOPLE ==
Thomas Grip - Co-Founder & Creative Director (lead designer, programmer, writer)
Jens Nilsson - Co-Founder

== GAMES ==
- Penumbra series (2007-2008, first games)
- Amnesia: The Dark Descent (2010, breakout hit)
- Amnesia: A Machine for Pigs (published, by The Chinese Room)
- SOMA (2015, sci-fi horror, philosophical)
- Amnesia: Rebirth (2020)
- Amnesia: The Bunker (2023)
- Working on "SOMA-style" sci-fi/horror project

== NARRATIVE FIT ==
NARRATIVE-FIRST HORROR STUDIO!
SOMA praised for philosophical depth (consciousness, identity).
Amnesia series = environmental storytelling + character drama.
Thomas Grip writes extensively about game design/narrative.
Hiring narrative designers who "love sci-fi and horror."

== DIRECTOR ICP: 85 ==
+ DEEP narrative focus (SOMA's philosophical themes)
+ Small team = agile decision making
+ Sweden = EU, good fit
+ Hiring narrative designers = investing in story
+ Horror genre often has dynamic NPC encounters
+ On-device friendly (indie scale)
- Small team = limited budget
- Horror niche = specific market

== STRATEGIC VALUE ==
Perfect indie showcase for Director.
SOMA-style games need emergent character dialogue.
Could be flagship indie case study.

Source: frictionalgames.com, Wikipedia, NME`,
  },
  {
    id: 'kCDuRaFrwGoL6YvmTPIH',
    name: 'Frontier Developments',
    icpScore: 40,
    status: 'active',
    tags: ['uk', 'aaa', 'simulation', 'management', 'public-company', 'director-icp', 'researched'],
    contacts: [
      { name: 'David Braben', role: 'Founder & President', source: 'frontier.co.uk' },
      { name: 'Jo Cooke', role: 'CEO (since Jan 2026)', source: 'frontier.co.uk' },
      { name: 'Jonny Watts', role: 'Former CEO (Executive Director until May 2026)', source: 'frontier.co.uk' },
    ],
    notes: `RESEARCH (2026-03-03)

== COMPANY ==
Founded: 1994 by David Braben (Elite co-creator)
Location: Cambridge Science Park, UK
Team: 400+ employees
Type: Publicly traded (LSE: FDEV)
Phone: +44 (0)1223 394 300

== KEY PEOPLE ==
David Braben - Founder & President (was CEO for 28 years until 2022)
Jo Cooke - CEO (since Jan 2026)
Jonny Watts - Former CEO, Executive Director (until May 2026)

== GAMES ==
- Elite: Dangerous (space sim, ongoing)
- Planet Coaster / Planet Zoo (management sims)
- Jurassic World Evolution 1 & 2
- F1 Manager series
- Warhammer Age of Sigmar: Realms of Ruin (RTS)
- Complex Games (acquired team making tactical RPGs)

== NARRATIVE FIT ==
Simulation/management games = limited NPC dialogue.
Elite: Dangerous has some mission dialogue but mostly procedural.
Jurassic/Planet games = management focus, no NPCs.
Complex Games division makes tactical RPGs (Chaos Gate - Daemonhunters).

== DIRECTOR ICP: 40 ==
+ Large studio with resources
+ Complex Games division makes RPGs (better fit)
+ Publicly traded = can afford tools
- Core business is simulation/management
- Limited NPC dialogue in main franchises
- Corporate decision-making (public company)

== NOTE ==
Complex Games division (Cambridge) could be separate contact.
Making tactical RPGs which have more dialogue needs.

Source: frontier.co.uk, Wikipedia`,
  },
];

async function updateLeads() {
  console.log('Updating batch 22 leads with research...\n');
  
  let updated = 0;
  let qualified = 0;
  
  for (const update of updates) {
    const ref = db.collection('leads').doc(update.id);
    const doc = await ref.get();
    
    if (!doc.exists) {
      console.log(`❌ ${update.name} - NOT FOUND`);
      continue;
    }
    
    const data = doc.data();
    const updateData = {
      icpScore: update.icpScore,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    
    // Merge tags
    if (update.tags) {
      const existingTags = data.tags || [];
      const newTags = [...new Set([...existingTags, ...update.tags])];
      updateData.tags = newTags;
    }
    
    // Update status if provided
    if (update.status) {
      updateData.status = update.status;
    }
    
    // Update notes if provided
    if (update.notes) {
      updateData.notes = update.notes;
    }
    
    // Update contacts if provided
    if (update.contacts) {
      updateData.contacts = update.contacts;
    }
    
    await ref.update(updateData);
    
    const statusIcon = update.status === 'qualified' ? '⭐' : '✅';
    console.log(`${statusIcon} ${update.name} - ICP: ${update.icpScore}${update.status === 'qualified' ? ' [QUALIFIED]' : ''}`);
    updated++;
    if (update.status === 'qualified') qualified++;
  }
  
  console.log(`\n=== SUMMARY ===`);
  console.log(`Updated: ${updated} leads`);
  console.log(`Qualified (ICP >= 85): ${qualified} leads`);
  console.log(`\nQualified leads:`);
  updates.filter(u => u.icpScore >= 85).forEach(u => {
    console.log(`  - ${u.name} (ICP: ${u.icpScore})`);
  });
}

updateLeads().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
