// Update studio batch 17 with research results
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
    id: "uhIeY31HPx4kZqIjVGRa",
    name: "10 Chambers",
    icpScore: 55,
    status: "active",
    notes: "Founded by Ulf Andersson (ex-Payday designer). Co-op horror shooters (GTFO, Den of Wolves). RECENT: Feb 2025 layoffs, significant restructuring, several co-founders left. Ulf Andersson and Simon Viklund remain. Focus is multiplayer co-op action, minimal narrative depth. Tencent investor. NOT a strong Director fit - action-focused, procedural mission-based, light on emergent narrative needs. Source: PC Gamer, Eurogamer Feb 2025",
    tags: ["sweden", "indie", "co-op", "horror", "shooter", "tencent-backed", "restructuring-2025"],
    contacts: []
  },
  {
    id: "VKLzapbaRA976qS7X5EL", 
    name: "11 bit studios",
    icpScore: 92,
    status: "qualified",
    notes: "STRONG DIRECTOR FIT. Founded 2010 by ex-CD Projekt. ~100 employees. Warsaw, Poland. Publicly traded (WSE). 'Meaningful entertainment' philosophy — emotionally impactful narrative-driven games. This War of Mine (9M+ copies, war survival narrative), Frostpunk 1&2 (society survival with moral dilemmas), The Alters (2025, Jan - narrative sci-fi). Frostpunk 3 planned for 2027. NARRATIVE FOCUS: Games hinge on player choices with moral weight, emergent stories from systems. Recent layoffs (end 2024) on cancelled narrative project. Director could enhance their society simulation with emergent NPC storylines. Source: Wikipedia, 11bitstudios.com, Reddit",
    tags: ["poland", "aa", "narrative", "survival", "meaningful-entertainment", "director-icp", "publicly-traded", "moral-choices"],
    contacts: []
  },
  {
    id: "2cBzLJZ8yndAXjHVi28k",
    name: "11 bit studios (US)",
    icpScore: 0,
    status: "dead",
    notes: "DUPLICATE - merge with main 11 bit studios entry (VKLzapbaRA976qS7X5EL). No separate US entity found.",
    tags: ["duplicate", "remove"],
    contacts: []
  },
  {
    id: "6gxhyTVhYiJTxM1cyB2R",
    name: "Abbey Games",
    icpScore: 68,
    status: "active",
    notes: "Utrecht, Netherlands. Small indie (~3-4 core). Strategy/god games with narrative elements. Reus (1M+ copies, god game), Renowned Explorers (strategy RPG), Godhood (religion sim). Games have character/story but primarily strategy-focused. Architect may be better fit than Director - their games use authored content over emergent narrative. Dutch studio, local to LoreWeaver. Source: abbeygames.com, Dutch Game Industry Directory",
    tags: ["netherlands", "indie", "god-game", "strategy", "architect-icp", "local-nl"],
    contacts: []
  },
  {
    id: "OPDK2jz43NnzvgD5zFn3",
    name: "Abrakam Entertainment",
    icpScore: 62,
    status: "active",
    notes: "Seraing/Liège, Belgium. 20+ employees. CEO: Jean-Michel Vilain, COO: Patrick Gigase. Faeria (CCG with board mechanics), Roguebook (roguelike deckbuilder). Also does co-dev services. Strategy card games with lore but not deep emergent narrative. Architect could help with character dialogue/lore, but Director less relevant for card game mechanics. Source: Crunchbase, LinkedIn, abrakam.com",
    tags: ["belgium", "indie", "ccg", "strategy", "co-dev", "architect-icp"],
    contacts: [
      { name: "Jean-Michel Vilain", role: "CEO", source: "Crunchbase" },
      { name: "Patrick Gigase", role: "COO", source: "Crunchbase" }
    ]
  },
  {
    id: "0IE7vOyc3TkWrxwMPALy",
    name: "Acquire",
    icpScore: 85,
    status: "qualified",
    notes: "DIRECTOR FIT. Japanese AA studio. Founded 1994. Now owned by Kadokawa (Feb 2024 acquisition - same parent as FromSoftware). Known for: Tenchu (stealth ninja), Way of the Samurai (open-world samurai RPG with branching paths), Octopath Traveler (co-dev with Square Enix), Mario & Luigi: Brothership (Nintendo co-dev). Way of the Samurai series = PERFECT Director use case: open narratives, multiple endings based on player choices, NPC relationships. Challenge: Japanese market, language barrier, corporate ownership. Source: Wikipedia, Nintendo Life",
    tags: ["japan", "aa", "action-rpg", "narrative", "kadokawa", "branching-narrative", "director-icp"],
    contacts: []
  },
  {
    id: "hMI4mahYUtW6trS07Az4",
    name: "Agate International",
    icpScore: 78,
    status: "active",
    notes: "Indonesia's largest game studio. 250+ games/gamification projects. Valthirian Arc: Hero School Story 2 (JRPG), Riftstorm (action roguelite), Memories (visual novel). Strong in narrative-driven games + SEA cultural localization. Also does co-dev services. Visual novels and JRPGs = good Architect fit. Director could work for Riftstorm-style games with emergent encounters. Growing studio with significant portfolio. Source: agate.id, Wikipedia, LinkedIn",
    tags: ["indonesia", "aa", "action-rpg", "jrpg", "visual-novel", "co-dev", "director-icp", "sea"],
    contacts: []
  },
  {
    id: "kXIfjuyifeLeez1PVAU1",
    name: "Almost Human",
    icpScore: 45,
    status: "dormant",
    notes: "LIKELY DORMANT. Finnish indie (Espoo). Founded 2011 by ex-Remedy/Futuremark devs: Petri Häkkinen, Antti Tiihonen, Olli Pelz, Juho Salila. Legend of Grimrock 1&2 (dungeon crawlers, 2012/2014). No new releases since 2015. Website exists but no activity. Not working on Grimrock 3. Classic grid-based dungeon crawlers - more authored puzzles than emergent narrative. Low priority unless they resurface. Source: Wikipedia, NeoGAF",
    tags: ["finland", "indie", "dungeon-crawler", "rpg", "dormant", "ex-remedy"],
    contacts: [
      { name: "Petri Häkkinen", role: "Co-founder", source: "LinuxGameNews" },
      { name: "Antti Tiihonen", role: "Co-founder", source: "LinuxGameNews" }
    ]
  },
  {
    id: "PGcZV6QOK9cnnOymhlaD",
    name: "Alt Shift",
    icpScore: 88,
    status: "qualified",
    notes: "STRONG DIRECTOR FIT. Montpellier, France. Founded 2010. Crying Suns (tactical roguelite, FTL-like, Dune/Foundation inspired - story-rich procedural). Now making Battlestar Galactica: Scattered Hopes (2026, Dotemu publishing) - narrative crisis management, licensed IP. They specialize in STORY-RICH roguelites with procedural narrative. Perfect Director use case: enhance emergent storytelling in roguelite runs. French games industry connection. Source: altshift.fr, Dotemu, Wikipedia",
    tags: ["france", "indie", "narrative", "roguelite", "sci-fi", "licensed-ip", "director-icp", "dotemu"],
    contacts: []
  },
  {
    id: "rVitRSEfJDH9UYdhKU0P",
    name: "Alterego Games",
    icpScore: 82,
    status: "active",
    notes: "GOOD DIRECTOR FIT. Utrecht, Netherlands. Cinematic/narrative adventure games. The True Tales of Bloodstreet 13 (branching detective narrative, Amsterdam setting), Woven, Sanity of Morris, City of Springs. Collaboration with Sneaky Mammoth and Lunar Brothers. Strong focus on player choices affecting story outcomes. Dutch studio, local to LoreWeaver. Branching narratives = Director opportunity for dynamic story variations. Source: alteregogames.nl, Dutch Game Industry Directory",
    tags: ["netherlands", "indie", "narrative", "adventure", "branching", "detective", "director-icp", "local-nl"],
    contacts: []
  }
];

async function updateBatch17() {
  console.log('Updating studio batch 17 with Director ICP research...\n');
  
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
      researchBatch: 17
    });
    
    const qualified = update.icpScore >= 85 ? '✅ QUALIFIED' : '';
    console.log(`📝 ${update.name} - ICP: ${update.icpScore} ${qualified}`);
    console.log(`   Status: ${update.status}`);
    console.log(`   Tags: ${update.tags.join(', ')}`);
    console.log(`   Contacts: ${mergedContacts.length}`);
    console.log('');
  }
  
  await batch.commit();
  console.log('\n✅ Batch 17 updates committed successfully!');
  
  // Summary
  const qualified = updates.filter(u => u.icpScore >= 85);
  const active = updates.filter(u => u.status === 'active');
  const dormant = updates.filter(u => u.status === 'dormant' || u.status === 'dead');
  
  console.log('\n=== SUMMARY ===');
  console.log(`Total processed: ${updates.length}`);
  console.log(`Qualified (ICP >= 85): ${qualified.length}`);
  console.log(`  - ${qualified.map(u => u.name).join(', ')}`);
  console.log(`Active: ${active.length}`);
  console.log(`Dormant/Dead: ${dormant.length}`);
}

updateBatch17().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
