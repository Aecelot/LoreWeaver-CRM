// Update studio batch 21 with research results
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
    id: "aIwJiWDhhZq5AhS5FW2k",
    name: "DON'T NOD",
    icpScore: 70,
    status: "active",
    website: "https://dont-nod.com",
    notes: "Paris & Montreal AA narrative studio. Founded 2008. CEO: Oskar Guilbert. Narrative Director: Stéphane Beauverger. PUBLICLY TRADED (Euronext). Games: Life is Strange (created IP, Square Enix published), Vampyr, Tell Me Why, Banishers: Ghosts of New Eden, Lost Records: Bloom & Rage (2025). ~300 employees at peak, MAJOR LAYOFFS Oct 2024 (69 jobs cut), cancelled sci-fi project. Focus on 'narrative-driven IPs' - part of their DNA per leadership. Lost Records released Feb-Apr 2025 to critical acclaim. Challenge: Too large for indie sale, publicly traded = shareholder pressure, layoffs show financial stress, own narrative design expertise in-house. Director fit is MEDIUM - they could benefit from emergent narrative but have internal capabilities and resources. Better positioned as potential partner/case study than customer. Source: Wikipedia, dont-nod.com, Eurogamer, LinkedIn",
    tags: ["france", "aa", "narrative", "adventure", "publicly-traded", "layoffs", "life-is-strange", "montreal", "paris", "director-icp"],
    contacts: [
      { name: "Oskar Guilbert", role: "CEO", linkedin: "oskarguilbert", source: "LinkedIn" },
      { name: "Stéphane Beauverger", role: "Narrative Director", source: "Wikipedia" }
    ]
  },
  {
    id: "ChjipSpRHrkgPJ8rydHF",
    name: "Double Fine Productions",
    icpScore: 35,
    status: "active",
    website: "https://www.doublefine.com",
    notes: "San Francisco AA/AAA. Founded July 2000 by Tim Schafer (ex-LucasArts). OWNED BY MICROSOFT/Xbox Game Studios since June 2019. 105 employees (2025). Games: Psychonauts 1&2, Brutal Legend, Broken Age, Grim Fandango Remastered, Day of the Tentacle Remastered. Current project: Keeper (Oct 2025) by Lee Petty - 'story told without words' (NO DIALOGUE). Known for adventure games and quirky humor. Critically acclaimed but historically struggled with commercial performance until Microsoft acquisition. Challenge: MICROSOFT-OWNED = AAA corporate decision-making, current game has no dialogue (doesn't need Director), strong in-house narrative expertise, internal tools likely. NOT a Director fit - first-party Microsoft studio, no need for external narrative AI, Keeper explicitly wordless. Source: Wikipedia, doublefine.com, Xbox Wire, Polygon",
    tags: ["usa", "aa", "adventure", "microsoft", "first-party", "tim-schafer", "no-dialogue-games", "lucasarts-alumni"],
    contacts: [
      { name: "Tim Schafer", role: "Founder & Studio Head", source: "Wikipedia" },
      { name: "Lee Petty", role: "Creative Lead", source: "doublefine.com" }
    ]
  },
  {
    id: "PBnddMf0AosgnSLohvUg",
    name: "DoubleMoose",
    icpScore: 45,
    status: "active",
    website: "https://doublemoose.com",
    notes: "Barcelona, Spain indie. Quirky 'four-dimensional souls' studio description. Co-developed Renowned Explorers: International Society (2015) with Abbey Games - strategy adventure with procedural storytelling. Current: Abyssus ('brinepunk roguelike FPS') announced Aug 2025, published by Big Sugar. Small indie team. Abyssus is ACTION-FOCUSED roguelike FPS - minimal narrative, procedural combat encounters. Renowned Explorers had some narrative elements but was primarily strategy gameplay. Challenge: Small team, current game is action FPS with no dialogue focus, limited narrative DNA in recent projects. Low-Medium Director fit - Renowned Explorers showed narrative interest but Abyssus pivots away from that. Source: doublemoose.com, Gematsu, LinkedIn",
    tags: ["spain", "indie", "roguelike", "fps", "action", "strategy", "abbey-games-collab", "big-sugar"],
    contacts: []
  },
  {
    id: "CO1vi6g2SpT831yVBt8I",
    name: "Dragon Game Studio",
    icpScore: 40,
    status: "active",
    website: "http://www.dragongamestudio.com",
    notes: "Bali, Indonesia indie. Founded 2012 ('Year of the Dragon'). International team based in 'Islands of the Gods'. Focus: 'Life is wonderful, let our games be part of it' - positive, casual gaming philosophy. Very small indie team. Limited visibility on current projects or shipped titles. Indonesia emerging market for game dev with lower costs but also less infrastructure. Challenge: Very small team, unclear what games they've shipped recently, limited online presence, casual/mobile focus indicated. Low Director fit - team size and scope likely too small for Director integration, unclear if they make narrative RPGs. Would need more info on their current projects. Source: dragongamestudio.com, Facebook, YouTube",
    tags: ["indonesia", "indie", "bali", "casual", "small-team", "emerging-market"],
    contacts: []
  },
  {
    id: "1g2N3LyvCGVsZ4gva53d",
    name: "Draw Distance (formerly iFun4All)",
    icpScore: 75,
    status: "active",
    website: "https://drawdistance.dev",
    notes: "Krakow, Poland indie dev & publisher. 10+ years experience. SUBSIDIARY OF BLOOBER TEAM SA (horror studio). Games: Vampire: The Masquerade – Coteries of New York (2019), V:tM – Shadows of New York (2020), V:tM – Reckoning of New York (2024), Serial Cleaner (2017), Serial Cleaners (2022), Halls of Horror, Ritual Crown of Horns. V:tM series are VISUAL NOVEL RPGs - exactly Director's sweet spot. Worked with Microsoft, Paradox Interactive, Legendary, Curve Digital. Won Silver Award at DC Web Fest 2018. Polish game dev hub. Challenge: Bloober Team ownership = corporate approval layers, V:tM license is World of Darkness IP (Paradox owned) - IP holder controls narrative. GOOD Director fit for ORIGINAL IPs, visual novel format benefits from emergent dialogue and character relationships. Source: drawdistance.dev, Gematsu, grokipedia, LinkedIn",
    tags: ["poland", "indie", "visual-novel", "vampire", "world-of-darkness", "licensed-ip", "bloober-team", "publisher", "narrative", "director-icp"],
    contacts: []
  },
  {
    id: "8Jny2JfP0BDQC1aAxVUa",
    name: "Dreammu",
    icpScore: 25,
    status: "active",
    website: "",
    notes: "Indonesia indie. Tagged as visual novel / horror. MINIMAL ONLINE PRESENCE - no search results found for 'Dreammu' as a game studio. Possible: very early stage, haven't shipped games yet, or name is slightly different. Indonesia has growing visual novel scene (Yangyang Mobile's The Letter is notable). Challenge: Cannot verify existence or portfolio, no website, no social media found. UNVERIFIABLE LEAD - recommend low priority until more information surfaces. If Indonesian VN studio, could be Director fit but can't confirm. Source: Search returned no results",
    tags: ["indonesia", "indie", "visual-novel", "horror", "unverified", "no-web-presence"],
    contacts: []
  },
  {
    id: "qKyMzJ8om6K4MITcGRF5",
    name: "DrinkBox Studios",
    icpScore: 40,
    status: "active",
    website: "https://drinkboxstudios.com",
    notes: "Toronto, Canada indie. Founded April 2008 by Chris Harvey, Ryan MacLean, Graham Smith (ex-Pseudo Interactive). Award-winning studio. Games: Guacamelee! 1&2 (metroidvania brawlers), Severed (touch-based dungeon crawler, 2016), Mutant Blobs Attack, Nobody Saves the World (2022, action RPG). Current: Blighted! (in development). ~15-20 employees. Known for: vibrant art style, tight gameplay, Mexican folklore themes in Guacamelee. Challenge: Their games are GAMEPLAY-FOCUSED with minimal narrative/dialogue. Guacamelee has style but little story depth, Nobody Saves the World is form-swapping action with light RPG elements. NOT a Director fit - their design philosophy prioritizes tight action mechanics over branching narrative. Could use Architect for NPC flavor but not core to their work. Source: Wikipedia, drinkboxstudios.com, LinkedIn, workwithindies.com",
    tags: ["canada", "indie", "metroidvania", "action", "action-rpg", "gameplay-first", "toronto", "vibrant-art"],
    contacts: [
      { name: "Chris Harvey", role: "Co-founder", source: "Wikipedia" },
      { name: "Ryan MacLean", role: "Co-founder", source: "Wikipedia" },
      { name: "Graham Smith", role: "Co-founder", source: "Wikipedia" }
    ]
  },
  {
    id: "hwpMVA4WIDzrciUp1AGF",
    name: "DUT Studio",
    icpScore: 68,
    status: "active",
    website: "",
    notes: "Vietnam indie. Made: The Death (Thần Trùng) - Vietnamese psychological horror adventure released Sept 2022. Set in Hanoi, inspired by Vietnamese culture and folklore. Received 2,000+ Steam reviews, high local acclaim as successful Vietnam-made game. Horror adventure with narrative investigation gameplay. Vietnam emerging game dev market. Challenge: Only one shipped game (that we know of), small team, Vietnamese-focused content may limit international market, unclear what's next after The Death. Medium-High Director fit - horror adventure genre benefits from dynamic tension and NPC behaviors, proven they can ship narrative games, cultural authenticity angle. Would want to see their next project. Source: Southeast Asia Game Wiki, Gamota, TheSmartLocal, Steambase, Metacritic",
    tags: ["vietnam", "indie", "horror", "adventure", "narrative", "vietnamese-culture", "emerging-market", "steam-success", "director-icp"],
    contacts: []
  },
  {
    id: "JCVhENx36WYfHlwx6jME",
    name: "Everstone Studios (NetEase)",
    icpScore: 55,
    status: "active",
    website: "https://www.neteasegames.com",
    notes: "China AAA. NETEASE SUBSIDIARY. Made: Where Winds Meet (逆水寒) - open-world wuxia ARPG. Released globally Nov 14, 2025 on PC/PS5 (F2P). '10th-century China during Five Dynasties and Ten Kingdoms period.' 2nd CBT May 2025, announced global release at Gamescom 2025. Massive scope open-world with action combat. Wuxia themes = martial arts storytelling tradition. Challenge: NETEASE OWNED = massive Chinese tech giant, AAA scale means internal tools/resources, F2P model = different monetization focus, very large team. Director value is limited - NetEase has resources for internal solutions, open-world action combat focus over branching dialogue. Low-Medium fit - wuxia has narrative tradition but their scale exceeds Director's target market. Source: NetEase press releases, Steam, ir.netease.com",
    tags: ["china", "aaa", "netease", "open-world", "wuxia", "action-rpg", "f2p", "massive-scale", "ps5", "pc"],
    contacts: []
  },
  {
    id: "I2pgQ4TOIoL81rP9oc2D",
    name: "Failbetter Games",
    icpScore: 20,
    status: "active",
    website: "https://www.failbettergames.com",
    notes: "ALREADY RESEARCHED (2026-02-28). London, UK indie. Founded 2009. ~12-16 employees. Alexis Kennedy founder (left 2016, now Weather Factory). INVENTED Quality-Based Narrative (QBN). Games: Fallen London (live service since 2009), Sunless Sea/Skies, Mask of the Rose. Fallen London TTRPG (2025) with Magpie Games. ⚠️ CRITICAL: EXPLICITLY ANTI-GENERATIVE AI - website states 'We make our games WITHOUT CRUNCH OR GENERATIVE AI.' HARD NO for Director. Very opinionated about narrative tools (they invented QBN). Challenge: ANTI-AI STANCE makes them unsuitable for any generative AI pitch. Weather Factory (Alexis Kennedy + Lottie Bevan) may be more approachable. NOT A DIRECTOR FIT - explicit rejection of generative AI. Source: Previous research, failbettergames.com",
    tags: ["uk", "indie", "narrative", "qbn", "ai-anti-generative", "fallen-london", "live-service", "weather-factory-connection", "researched"],
    contacts: []
  }
];

async function updateBatch21() {
  console.log('Updating studio batch 21 with Director ICP research...\n');
  
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
    for (const contact of update.contacts || []) {
      const exists = mergedContacts.some(c => 
        c.name?.toLowerCase() === contact.name?.toLowerCase()
      );
      if (!exists && contact.name) {
        mergedContacts.push(contact);
      }
    }
    
    const updateData = {
      icpScore: update.icpScore,
      status: update.status,
      notes: update.notes,
      tags: update.tags,
      contacts: mergedContacts,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      researchedAt: new Date().toISOString(),
      researchBatch: 21
    };
    
    // Add website if provided and not empty
    if (update.website) {
      updateData.website = update.website;
    }
    
    batch.update(ref, updateData);
    
    const qualified = update.icpScore >= 85 ? '✅ QUALIFIED' : '';
    const highPot = update.icpScore >= 70 && update.icpScore < 85 ? '🔸 HIGH POTENTIAL' : '';
    console.log(`📝 ${update.name} - ICP: ${update.icpScore} ${qualified}${highPot}`);
    console.log(`   Status: ${update.status}`);
    console.log(`   Tags: ${update.tags.slice(0, 5).join(', ')}...`);
    console.log(`   Contacts: ${mergedContacts.length}`);
    console.log('');
  }
  
  await batch.commit();
  console.log('\n✅ Batch 21 updates committed successfully!');
  
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
  if (medium.length > 0) {
    console.log(`  - ${medium.map(u => `${u.name} (${u.icpScore})`).join(', ')}`);
  }
  console.log(`Low (<50): ${low.length}`);
  if (low.length > 0) {
    console.log(`  - ${low.map(u => `${u.name} (${u.icpScore})`).join(', ')}`);
  }
  
  console.log('\n=== NOTABLE FINDINGS ===');
  console.log('- Double Fine: Microsoft-owned, current game has NO DIALOGUE - not a fit');
  console.log('- DON\'T NOD: Major layoffs Oct 2024, publicly traded, too large but narrative experts');
  console.log('- Failbetter Games: EXPLICITLY ANTI-GENERATIVE AI - do not approach');
  console.log('- Draw Distance: Visual novel RPGs, Bloober subsidiary, good fit for original IPs');
  console.log('- DUT Studio: Vietnamese horror success story, emerging market opportunity');
  console.log('- Dreammu: UNVERIFIABLE - no web presence found, deprioritize');
  console.log('- Everstone/NetEase: AAA scale, internal resources, not target market');
}

updateBatch21().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
