// Update studio batch 20 with research results
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
    id: "NXJCjELSNDKJ1S223sx5",
    name: "CyberConnect2",
    icpScore: 55,
    status: "active",
    notes: "Fukuoka, Japan AA. Founded 1996. CEO: Hiroshi Matsuyama (born 1970, also founder). 200+ employees. Known for LICENSED ANIME GAMES: Naruto Ultimate Ninja Storm series, Dragon Ball Z Kakarot (10M+ sales), Demon Slayer games, JoJo's Bizarre Adventure. Also created original .hack franchise (2002-2012). 2026: Announced .hack//Z.E.R.O. (Project Dusk) - first original IP in years, action RPG. 30th anniversary celebration. Montreal studio expansion. Fuga: Melodies of Steel trilogy (original IP) shows narrative capability. Challenge: Heavy licensed IP focus (Bandai Namco relationship) limits Director application - IP owners control narrative. Action combat games with limited branching story. Large studio = longer sales cycles. Director fit for original IPs only (Fuga-style games). Source: Wikipedia, Polygon, AniTrendz interview",
    tags: ["japan", "aa", "anime", "licensed-ip", "action", "bandai-namco", "original-ip-revival", "architect-icp"],
    contacts: [
      { name: "Hiroshi Matsuyama", role: "CEO & Founder", linkedin: "hiroshi-matsuyama", source: "Wikipedia" }
    ]
  },
  {
    id: "w5yBAJzDdhMZyHGaJJMK",
    name: "Cybernetic Walrus",
    icpScore: 35,
    status: "active",
    notes: "Antwerp, Belgium indie. Founded Jan 2017. 9 employees. Games: Antigraviator (anti-gravity racer 2018), Does it Stack?, Order 13 (horror simulation), Rise of Humanity. Current: Roadside Research (1-4 player co-op alien gas station simulator). Distinctive simulation games with quirky twists. Belgian Game Awards recognition. Genre focus: SIMULATION with horror/comedy elements, not narrative-driven. Order 13 has horror atmosphere but simulation gameplay loop. Small team, simulation focus. NOT a Director fit - their games are systems-driven simulations with minimal story/dialogue needs. Could use Architect for flavor text/NPC barks but limited value. Source: Belgian Game Awards, cyberneticwalrus.com, Flanders Game Hub",
    tags: ["belgium", "indie", "simulation", "horror", "co-op", "anti-gravity", "systems-focus", "no-narrative"],
    contacts: []
  },
  {
    id: "1EUzeFmuyrd9nf12ufv6",
    name: "Daedalic Entertainment",
    icpScore: 45,
    status: "qualified",
    notes: "DUPLICATE ENTRY - See Is5bYKqhl1UBtoxDtVwq for main record. Hamburg, Germany. PUBLISHER ONLY since 2023 (closed development after Lord of the Rings: Gollum failure). Owned by Nacon (acquired 2022 for €53M). Publishing narrative adventures. 2025: Publishing 'The Fading of Nicole Wilson' (folk-horror adventure) from One-O-One Games. Strong adventure game legacy (Deponia, Edna & Harvey, Ken Follett's Pillars of the Earth, Shadow Tactics). 32 German Developer Awards. As publisher could introduce Director to external devs they work with - but Nacon corporate ownership adds layers. Recommend consolidating duplicate entries. Source: Wikipedia, Nacon Connect 2025, Metacritic",
    tags: ["germany", "publisher", "adventure", "nacon", "narrative", "duplicate-entry"],
    contacts: []
  },
  {
    id: "Is5bYKqhl1UBtoxDtVwq",
    name: "Daedalic Entertainment",
    icpScore: 50,
    status: "active",
    notes: "Hamburg, Germany. PUBLISHER ONLY since 2023 (closed dev after Gollum failure). Founded 2007 by Carsten Fichtelmann (CEO). Owned by NACON (acquired Feb 2022 for €53M). ~45 employees. Published: Deponia series, Edna & Harvey, Ken Follett's Pillars of the Earth, The Dark Eye: Chains of Satinav, Shadow Tactics series. 32 German Developer Awards for adventure games. 2025: Publishing 'The Fading of Nicole Wilson' (folk-horror adventure from One-O-One Games). As publisher could introduce Director/Architect to their external dev partners making narrative adventures. Challenge: Not developing games themselves anymore, Nacon corporate ownership means decisions go through parent company. Medium Director fit as channel to narrative devs they publish. Source: Wikipedia, GlobeNewswire, Nacon Connect 2025",
    tags: ["germany", "publisher", "adventure", "nacon", "narrative", "external-devs", "architect-icp"],
    contacts: [
      { name: "Carsten Fichtelmann", role: "CEO & Founder", source: "Wikipedia" }
    ]
  },
  {
    id: "XrORaAbPHHRfqMXqynrb",
    name: "Deadtoast Entertainment",
    icpScore: 30,
    status: "active",
    notes: "CORRECTION: SWEDISH studio (not Denmark as previously listed). Solo developer Victor Ågren. Games: My Friend Pedro (2019, Devolver Digital published - 250K+ sales in first week), Nunchuck Charlie (Flash game, Adult Swim). Previously worked at Media Molecule (UK). My Friend Pedro is a run-and-gun bullet-time shooter with stylish action - zero narrative depth, pure gameplay. Working on My Friend Pedro sequel (announced). ONE-MAN TEAM = no capacity for complex tool integration. Action-focused games with no dialogue/story systems. NOT a Director fit - gameplay-only focus, solo dev can't dedicate resources to AI integration. Note: CRM had wrong country and game title. Source: Wikipedia, PC Games Insider, The Verge, itch.io",
    tags: ["sweden", "indie", "solo-dev", "action", "shooter", "devolver", "no-narrative", "data-correction"],
    contacts: [
      { name: "Victor Ågren", role: "Solo Developer & Founder", source: "PC Games Insider" }
    ]
  },
  {
    id: "bNhsPeDGYR7qCh2Vibzn",
    name: "Deck13 Interactive",
    icpScore: 45,
    status: "qualified",
    notes: "DUPLICATE ENTRY - See e3R7bIzOuTJrqL2XBFYN for main record. Frankfurt, Germany AA. Founded 2001. Now part of FOCUS ENTERTAINMENT (Pullup Entertainment). ~100 employees, expanding to Montreal. Games: Lords of the Fallen (original 2014), The Surge 1&2, Atlas Fallen. Action-RPGs in souls-like genre. Also runs Deck13 Spotlight publishing label. CEO: Lars Janssen (appointed Mar 2024). Souls-likes have environmental storytelling and lore but limited dialogue/branching narrative - combat is the focus. Director value is limited for their genre. Recommend consolidating duplicate entries. Source: Wikipedia, deck13.com, MarketScreener",
    tags: ["germany", "aa", "action-rpg", "souls-like", "focus-entertainment", "publishing", "duplicate-entry"],
    contacts: [
      { name: "Lars Janssen", role: "CEO", source: "MarketScreener" }
    ]
  },
  {
    id: "e3R7bIzOuTJrqL2XBFYN",
    name: "Deck13 Interactive",
    icpScore: 48,
    status: "active",
    notes: "Frankfurt, Germany AA. Founded 2001. Part of FOCUS ENTERTAINMENT (Pullup Entertainment). ~100 employees, Montreal expansion. CEO: Lars Janssen (appointed Mar 2024). Games: Lords of the Fallen (original 2014), The Surge 1&2, Atlas Fallen (2023). Also runs Deck13 Spotlight publishing label. Souls-like action-RPGs - combat-focused with environmental storytelling and lore fragments, but minimal dialogue systems or branching narrative. Some NPC interaction but not dialogue-heavy. CrossCode (published) is more narrative but externally developed. Challenge: Genre focus on combat loops over story, corporate parent (Focus) adds decision layers. Low-medium Director fit - could benefit from dynamic lore/item descriptions or NPC ambient dialogue, but not core to their game design. Source: Wikipedia, deck13.com, MarketScreener",
    tags: ["germany", "aa", "action-rpg", "souls-like", "focus-entertainment", "publishing", "architect-icp"],
    contacts: [
      { name: "Lars Janssen", role: "CEO", source: "MarketScreener" }
    ]
  },
  {
    id: "KwZULkv9j5kD9GH5sPHG",
    name: "Devespresso Games",
    icpScore: 78,
    status: "active",
    notes: "South Korea indie. Founded by T.L. Riven (Tristan Lee Riven - game writer/designer) and Minho Kim (key artist, experience inspired The Coma). Games: The Coma: Cutting Class (2017), The Coma 2: Vicious Sisters (2020), The Coma: Recut. Korean survival horror-adventure series set in haunted school. Inspired by Korean education pressure/culture. Strong narrative focus - horror atmosphere with story investigation, hide-and-seek gameplay. Published by Headup and WhisperGames. Described as 'Lone Survivor meets Persona'. NARRATIVE-HEAVY horror games with Korean cultural elements. Director FIT - survival horror benefits from dynamic tension, story pacing, NPC behaviors. Small indie team focused on story-driven horror. Challenge: Korean market focus, small team capacity. Source: Steam, Kotaku, Surreal and Creepy interview, Wikipedia",
    tags: ["south-korea", "indie", "horror", "survival", "narrative", "visual-novel-style", "korean-culture", "director-icp"],
    contacts: [
      { name: "Tristan Lee Riven", role: "Game Writer & Designer, Co-founder", source: "Surreal and Creepy" },
      { name: "Minho Kim", role: "Key Artist, Co-founder", source: "Wikipedia" }
    ]
  },
  {
    id: "iMpGASYOgLcZoOJv1hcB",
    name: "Devolver Digital",
    icpScore: 65,
    status: "active",
    notes: "Austin, Texas. PUBLISHER ONLY (no internal dev). Founded June 2009 by Mike Wilson, Harry Miller, Rick Stults, Graeme Struthers, Nigel Lowrie (ex-Gathering of Developers, Gamecock). PUBLICLY TRADED (LON: DEVO). Major indie publisher - Hotline Miami, Enter the Gungeon, Cult of the Lamb, Inscryption, Loop Hero, Shadow Warrior, The Talos Principle, Fall Guys, My Friend Pedro. Oct 2024: Launched Big Fan Games (licensed IP indie publishing). Known for developer-friendly terms and distinctive marketing (E3 presentations). Portfolio includes narrative games (Gris, Olija) and action games. As publisher could introduce Director/Architect to their developer network - but Devolver is hands-off with dev process. Challenge: Publisher not developer, public company pressures, doesn't mandate tools to devs. Medium Director fit as introduction channel, not direct sale. Source: Wikipedia, TechCrunch, investors.devolverdigital.com",
    tags: ["usa", "publisher", "indie", "publicly-traded", "developer-network", "hands-off", "introduction-channel"],
    contacts: [
      { name: "Mike Wilson", role: "Co-founder", source: "Wikipedia" },
      { name: "Nigel Lowrie", role: "Co-founder", source: "Wikipedia" },
      { name: "Harry Miller", role: "Co-founder", source: "Wikipedia" },
      { name: "Graeme Struthers", role: "Co-founder", source: "Wikipedia" },
      { name: "Rick Stults", role: "Co-founder", source: "Wikipedia" }
    ]
  },
  {
    id: "Zn2DmlvoybyltGTjY1MZ",
    name: "DigixArt",
    icpScore: 88,
    status: "qualified",
    notes: "Montpellier, France indie. Founded April 2015 by Yoan Fanise (ex-Ubisoft Montpellier - 14 years, directed Valiant Hearts: The Great War). ~20 employees. OWNED BY THQ NORDIC (acquired). BAFTA winner. Games: Lost in Harmony (2016, mobile rhythm), 11-11: Memories Retold (2018, with Aardman Animations & Bandai Namco - WWI narrative), Road 96 (2021, THQ Nordic published - PROCEDURAL NARRATIVE hitchhiking adventure, critical acclaim, Pégase awards). PROCEDURAL NARRATIVE EXPERTS - Road 96 is EXACTLY what Director enables (emergent story from systems). Yoan Fanise pioneered procedural storytelling in games. Team has deep narrative design expertise. STRONG DIRECTOR FIT - proven interest in emergent narrative, technical capability, indie scale but THQ Nordic backing. Could be flagship case study. Challenge: THQ Nordic ownership means corporate approval needed. Source: Wikipedia, GamesBeat, CNC France, digixart.com",
    tags: ["france", "indie", "narrative", "procedural-storytelling", "adventure", "thq-nordic", "ubisoft-alumni", "bafta", "director-icp", "flagship-candidate"],
    contacts: [
      { name: "Yoan Fanise", role: "Founder & Creative Director", linkedin: "yoan-fanise", source: "Wikipedia" }
    ]
  }
];

async function updateBatch20() {
  console.log('Updating studio batch 20 with Director ICP research...\n');
  
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
      researchBatch: 20
    });
    
    const qualified = update.icpScore >= 85 ? '✅ QUALIFIED' : '';
    console.log(`📝 ${update.name} - ICP: ${update.icpScore} ${qualified}`);
    console.log(`   Status: ${update.status}`);
    console.log(`   Tags: ${update.tags.slice(0, 5).join(', ')}...`);
    console.log(`   Contacts: ${mergedContacts.length}`);
    console.log('');
  }
  
  await batch.commit();
  console.log('\n✅ Batch 20 updates committed successfully!');
  
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
  
  console.log('\n=== DATA QUALITY NOTES ===');
  console.log('- Deadtoast Entertainment: CORRECTED country from Denmark to Sweden');
  console.log('- Found 2 duplicate entries: Daedalic Entertainment, Deck13 Interactive');
  console.log('- Recommend CRM cleanup to merge duplicate records');
}

updateBatch20().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
