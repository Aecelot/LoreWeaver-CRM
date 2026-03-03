// Update studio batch 19 with research results
// Re-scored for Director (emergent narrative AI) ICP
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
    id: "8pbzqi1Y08ns6QivQPU6",
    name: "Cellar Door Games",
    icpScore: 55,
    status: "active",
    notes: "Toronto-based indie. Founded 2009 by brothers Kenny Lee (Lead Developer) and Teddy Lee (Game Designer/Co-founder). Rogue Legacy 1&2 = roguelite action-platformers with procedural generation and hereditary mechanics. Also: Full Metal Furies (co-op brawler). Roguelite genre relies on procedural systems over authored narrative. Some character traits/story but minimal deep narrative. Small team (brothers + remote contractors - artist Glauber Kotaki, musicians Gordon McGladdery/Judson Cowan). Better Architect fit than Director - could use narrative lore generation for run variety. Challenge: Procedural focus limits Director utility. Source: Wikipedia, Giant Bomb, PC Gamer",
    tags: ["canada", "indie", "roguelite", "action-platformer", "procedural", "architect-icp"],
    contacts: [
      { name: "Kenny Lee", role: "Co-founder & Lead Developer", linkedin: "knelee", source: "LinkedIn" },
      { name: "Teddy Lee", role: "Co-founder & Game Designer", source: "PC Gamer" }
    ]
  },
  {
    id: "dvi18KKcWjDUmlyTXgKT",
    name: "Certain Affinity",
    icpScore: 35,
    status: "active",
    notes: "Austin, Texas AA co-dev studio. Founded 2006 by Max Hoberman (CEO, former Halo multiplayer/online lead at Bungie). President/COO: Paul Sams (ex-Blizzard COO, joined Sep 2022). 180-250 employees. ACQUIRED BY KEYWORDS STUDIOS (Oct 2024) - now part of massive outsourcing conglomerate. Known for: Halo multiplayer content (Halo 2-Infinite), Call of Duty map packs, DOOM Eternal Switch port. Working on first original IP. Pure co-dev/multiplayer focus with ZERO narrative depth. Keywords ownership means corporate parent controls decisions. NOT a Director fit - FPS/multiplayer only, no story games, no decision autonomy post-acquisition. Source: Wikipedia, certainaffinity.com",
    tags: ["usa", "aa", "co-dev", "fps", "multiplayer", "keywords-studios", "acquired-2024"],
    contacts: [
      { name: "Max Hoberman", role: "Founder & CEO", source: "Wikipedia" },
      { name: "Paul Sams", role: "President & COO", source: "certainaffinity.com" }
    ]
  },
  {
    id: "110TwAr3ZXLVgPsdIwBI",
    name: "Chibig",
    icpScore: 65,
    status: "active",
    notes: "Valencia, Spain indie. Founded by Abraham Cozar Riera. Games: Deiland (tiny planet survival RPG), Summer in Mara (farming adventure), Mika and the Witch's Mountain (delivery game), Koa and the Five Pirates (adventure), Ankora: Lost Days (survival adventure). Also acts as PUBLISHER for other indie games. Cozy adventure/farming games with light narrative elements - player-NPC relationships, quest stories, exploration. Games have charm and character interaction but limited deep branching or emergent story. Small indie team. Better Architect fit for authored dialogue/quests than Director for emergent narrative. Source: chibig.com, Crunchbase, Gematsu",
    tags: ["spain", "indie", "cozy", "adventure", "farming", "publisher", "architect-icp"],
    contacts: [
      { name: "Abraham Cozar Riera", role: "Founder", source: "Crunchbase" }
    ]
  },
  {
    id: "qETHP26EefDvpbok2t2N",
    name: "Chucklefish",
    icpScore: 60,
    status: "active",
    notes: "London, UK indie. Founded 2011 by Finn Brice (Director). 18-19 employees. Also PUBLISHER. Games: Starbound (sandbox exploration, massive modding community), Wargroove 1&2 (Advance Wars-style tactics with map editor). Published: Stardew Valley (early, before ConcernedApe went solo), Risk of Rain. Retro pixel art aesthetic. Starbound has procedural universe with quest content but emergent narrative limited. Wargroove has campaign stories and custom scenario creation. Publisher role means they evaluate external games. Medium Director potential - tactics games have some narrative value, but primary focus is systems/strategy not story. Source: Wikipedia, chucklefish.org",
    tags: ["uk", "indie", "pixel-art", "sandbox", "tactics", "publisher", "architect-icp"],
    contacts: [
      { name: "Finn Brice", role: "Founder & Director", source: "Wikipedia" }
    ]
  },
  {
    id: "7zSTwTzcdGBT796O92VU",
    name: "Citreat Studio",
    icpScore: 70,
    status: "active",
    notes: "Chinese indie, ALL-FEMALE STUDIO. Founded May 2024. Zero-Sum Heart (2024) = visual novel about 18-year-old girl navigating love and sacrifice. Named in China's Top Video Games 2024 list. Pure visual novel focus - VERY narrative-heavy genre, perfect for authored dialogue (Architect) or branching story systems. Challenge: Brand new studio (founded 2024), very small, Chinese market focus, language barrier, limited track record. High narrative fit but risky due to size/newness. Could be interesting early partnership for Chinese VN market. Source: The World of Chinese, general VN research",
    tags: ["china", "indie", "visual-novel", "narrative", "all-female-team", "new-studio-2024", "architect-icp"],
    contacts: []
  },
  {
    id: "zm8LBP4BN1ZbiARtDDfw",
    name: "Coffee Stain Studios",
    icpScore: 25,
    status: "active",
    notes: "Skövde, Sweden AA. Founded 2010 by 9 University of Skövde students. OWNED BY EMBRACER GROUP (Coffee Stain Holding). Tim Badylak = former Coffee Stain Publishing CEO. Games: Goat Simulator (meme physics sandbox), Satisfactory (factory builder, massive success - full release Sep 2024), Sanctum series (FPS/tower defense hybrid). Also published Valheim (Iron Gate Studios). Pure sandbox/simulation/building games with ZERO narrative elements. Goat Simulator is chaos physics, Satisfactory is factory optimization loops. No story, no characters, no dialogue systems. NOT a Director fit at all. Embracer ownership adds corporate complexity. Source: Wikipedia, Embracer Group",
    tags: ["sweden", "aa", "sandbox", "simulation", "factory-builder", "embracer", "no-narrative"],
    contacts: []
  },
  {
    id: "aKbFAdr15MfOAp96ijYn",
    name: "Colossal Order",
    icpScore: 20,
    status: "active",
    notes: "Tampere, Finland indie. Founded 2009. CEO: Mariina Hallikainen. ~40 employees. Games: Cities in Motion 1&2 (mass transit sim), Cities: Skylines 1&2 (city builder). Published by Paradox Interactive. Cities: Skylines 2 had troubled launch (Oct 2023) with performance issues. Nov 2025: Announced transitioning C:S2 to Paradox's internal teams, Colossal Order moving to new projects. Pure city-builder/simulation - NO narrative elements whatsoever. Players manage infrastructure systems, not stories or characters. NOT a Director fit. Source: Wikipedia, colossalorder.fi, Ars Technica",
    tags: ["finland", "indie", "simulation", "city-builder", "paradox", "no-narrative", "transition-2025"],
    contacts: [
      { name: "Mariina Hallikainen", role: "CEO", source: "Wikipedia" }
    ]
  },
  {
    id: "sFGYa7aKSSYs35ziPelj",
    name: "Creacle Studio",
    icpScore: 72,
    status: "active",
    notes: "Yogyakarta, Indonesia indie. IT solutions company that transitioned to game development. Focus on story-based games with engaging narrative elements - combines deep narrative with gameplay. Part of Indonesian indie scene alongside Agate Studio and Digital Happiness. Southeast Asian market focus. Narrative-first philosophy noted in multiple sources. Challenge: Limited English-language information, regional market focus, unclear current titles/team size, IT services hybrid model. Higher Director potential due to narrative focus but needs more research on current projects. Good regional expansion opportunity for SEA market. Source: VCGamers, academic research paper (journal.ugm.ac.id), LinkedIn, Tech in Asia",
    tags: ["indonesia", "indie", "narrative", "story-games", "sea", "it-services", "director-icp"],
    contacts: []
  },
  {
    id: "jdiKfzyYJDdm2m1rcQSp",
    name: "CreativeForge Games",
    icpScore: 78,
    status: "active",
    notes: "Warsaw, Poland AA. Founded 2011 by Jakub Rozenek and Łukasz Żarnowiecki. Current CEO: Piotr Karbowski (since 2019, after core team departure). ~50 employees (had layoffs 2019). Games: Hard West 1&2 (turn-based tactical with supernatural Wild West setting), Phantom Doctrine (Cold War tactical espionage), Ancient Space (space RTS), Aircraft Carrier Survival. Tactical RPGs with STRONG NARRATIVE CAMPAIGNS - Hard West has branching Western horror stories, Phantom Doctrine has spy thriller plot with conspiracy elements. Director FIT - tactical games with story campaigns benefit from emergent mission narratives, character development, dynamic faction relationships. Polish studio = EU timezone. Challenge: Corporate instability (2019 team departure), public company pressures. Source: Wikipedia, TechRaptor, creativeforge.pl",
    tags: ["poland", "aa", "tactics", "rpg", "narrative", "western", "espionage", "director-icp"],
    contacts: [
      { name: "Piotr Karbowski", role: "CEO", source: "TechRaptor" },
      { name: "Jakub Rozenek", role: "Co-founder", source: "Wikipedia" },
      { name: "Łukasz Żarnowiecki", role: "Co-founder", source: "Wikipedia" }
    ]
  },
  {
    id: "tWGphDA1zMZTamTN5LzN",
    name: "Cyanide Studio",
    icpScore: 75,
    status: "active",
    notes: "Paris (Nanterre), France AA. Founded 2000 by Patrick Pligersdorffer (ex-Ubisoft, 7 ex-Ubi employees). ~110 employees. Also has Montreal studio (Amusement Cyanide). OWNED BY NACON (acquired by Bigben 2018, renamed Nacon). Games: Styx series (stealth RPG with goblin protagonist), Blood Bowl (Warhammer football), Space Hulk, Call of Cthulhu (Lovecraft horror RPG - narrative investigation), Werewolf: The Apocalypse - Earthblood (WoD action RPG), Game of Thrones RPG, Rogue Lords (roguelike), Tour de France/Pro Cycling Manager (sports), Chef Life. STRONG NARRATIVE PORTFOLIO - Call of Cthulhu, Werewolf, GoT, Styx all have deep story campaigns and licensed IP. Director potential for horror/investigation games with dynamic story pacing. Challenge: Nacon corporate ownership, licensed IP restrictions, mixed quality track record. Source: Wikipedia, cyanide-studio.com, Gematsu",
    tags: ["france", "aa", "rpg", "horror", "licensed-ip", "narrative", "stealth", "nacon", "director-icp"],
    contacts: [
      { name: "Patrick Pligersdorffer", role: "Founder", source: "Wikipedia" }
    ]
  }
];

async function updateBatch19() {
  console.log('Updating studio batch 19 with Director ICP research...\n');
  
  const batch = db.batch();
  
  for (const update of updates) {
    const ref = db.collection('leads').doc(update.id);
    const doc = await ref.get();
    
    if (!doc.exists) {
      console.log(`❌ ${update.name} (${update.id}) - NOT FOUND`);
      continue;
    }
    
    const existingData = doc.data();
    const mergedContacts = [...(existingData.contacts || [])];
    
    // Add new contacts if not already present
    for (const contact of update.contacts) {
      const exists = mergedContacts.some(c => 
        c.name?.toLowerCase() === contact.name?.toLowerCase()
      );
      if (!exists && contact.name) {
        mergedContacts.push(contact);
      }
    }
    
    batch.update(ref, {
      icpScore: update.icpScore,
      status: update.status,
      notes: update.notes,
      tags: update.tags,
      contacts: mergedContacts,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      researchedAt: new Date().toISOString(),
      researchBatch: 19
    });
    
    const qualified = update.icpScore >= 85 ? '✅ QUALIFIED' : '';
    console.log(`📝 ${update.name} - ICP: ${update.icpScore} ${qualified}`);
    console.log(`   Status: ${update.status}`);
    console.log(`   Tags: ${update.tags.slice(0, 5).join(', ')}...`);
    console.log(`   Contacts: ${mergedContacts.length}`);
    console.log('');
  }
  
  await batch.commit();
  console.log('\n✅ Batch 19 updates committed successfully!');
  
  // Summary
  const qualified = updates.filter(u => u.icpScore >= 85);
  const highPotential = updates.filter(u => u.icpScore >= 70 && u.icpScore < 85);
  const medium = updates.filter(u => u.icpScore >= 50 && u.icpScore < 70);
  const low = updates.filter(u => u.icpScore < 50);
  
  console.log('\n=== SUMMARY ===');
  console.log(`Total processed: ${updates.length}`);
  console.log(`Qualified (ICP >= 85): ${qualified.length}`);
  if (qualified.length > 0) {
    console.log(`  - ${qualified.map(u => u.name).join(', ')}`);
  }
  console.log(`High potential (70-84): ${highPotential.length}`);
  if (highPotential.length > 0) {
    console.log(`  - ${highPotential.map(u => `${u.name} (${u.icpScore})`).join(', ')}`);
  }
  console.log(`Medium (50-69): ${medium.length}`);
  console.log(`Low (<50): ${low.length}`);
}

updateBatch19().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
