// Update studio batch 18 with research results
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
    id: "EhflS3FBSoOoIS79gCKT",
    name: "Asobo Studio",
    icpScore: 88,
    status: "qualified",
    notes: "STRONG DIRECTOR FIT. French AA studio, Bordeaux. Founded 2002. 200+ employees. Co-founders: Sebastian Wloch (CEO), Alain Guyet (CTO), David Dedeine. A Plague Tale: Innocence/Requiem = exceptional story-driven medieval adventure with emotional narrative depth. Also Microsoft Flight Simulator (less relevant). Plague Tale series is PERFECT Director use case: character relationships, emotional beats, branching survival decisions. Large studio but narrative DNA is strong. Challenge: May have internal narrative tools already. Source: Tracxn, Wikipedia, asobostudio.com",
    tags: ["france", "aa", "narrative", "adventure", "story-driven", "director-icp", "emotional-narrative"],
    contacts: [
      { name: "Sebastian Wloch", role: "Co-founder & CEO", source: "Tracxn" },
      { name: "Alain Guyet", role: "Co-founder & CTO", source: "Tracxn" },
      { name: "David Dedeine", role: "Co-founder", source: "Tracxn" }
    ]
  },
  {
    id: "ZKgcH4pJWIfqGTsaBN7g",
    name: "Asobo Studio (duplicate)",
    icpScore: 0,
    status: "dead",
    notes: "DUPLICATE - merge with main Asobo Studio entry (EhflS3FBSoOoIS79gCKT). Same studio, same website, same info.",
    tags: ["duplicate", "remove"],
    contacts: []
  },
  {
    id: "le6ucHZV4VeOWXQ1sC0D",
    name: "Atlus",
    icpScore: 72,
    status: "active",
    notes: "Japanese AAA (owned by Sega). Legendary JRPG studio. Persona series, Shin Megami Tensei, Catherine, Metaphor: ReFantazio (2024 - massive critical success). Key creative: Katsura Hashino (Studio Zero director, Persona/Metaphor director). P-Studio and Studio Zero divisions. Games are EXTREMELY narrative-heavy with complex character relationships and branching social links. PERFECT Director use case in theory. Challenge: Japanese corporate structure, Sega parent company, language barrier, likely internal AI initiatives. Would need to approach through publisher relationship or GDC/TGS networking. Source: Wikipedia, Automaton Media",
    tags: ["japan", "aaa", "jrpg", "narrative", "sega", "director-icp", "social-links", "persona"],
    contacts: [
      { name: "Katsura Hashino", role: "Director (Studio Zero)", source: "Wikipedia" },
      { name: "Yukio Sugino", role: "Sega President", source: "Persona Central" }
    ]
  },
  {
    id: "j3DwNgOyrDyjDEl6WmO7",
    name: "Aurogon Shanghai",
    icpScore: 65,
    status: "active",
    notes: "Chinese AA studio, subsidiary of Wangyuan Shengtang. Known for Gujian (Legend of the Ancient Sword) series - wuxia action-RPGs with narrative depth. Multiple Gujian games (2010-present). Chinese market focus, primarily domestic audience. Games have strong narrative/wuxia storytelling traditions. Challenge: Chinese market access, language barrier, corporate subsidiary structure, different business culture. Not to be confused with Everstone Studio (Where Winds Meet) - different company. Source: Gematsu, IGN",
    tags: ["china", "aa", "action-rpg", "wuxia", "narrative", "director-icp", "gujian"],
    contacts: []
  },
  {
    id: "xvB3b7lOxhQ4yvCDpX5E",
    name: "Avalanche Studios Group",
    icpScore: 58,
    status: "active",
    notes: "Swedish AAA. Founded 2003 (originally Avalanche Studios, now Avalanche Studios Group). ~350 employees across Stockholm, New York, Liverpool. New CEO: Stefanía Guðrún Halldórsdóttir (March 2023, replaced Pim Holfve who left for Raw Fury). Owned by Nordisk Film (2018). Just Cause series (explosive open-world action), theHunter (hunting sim via Expansive Worlds subsidiary), Generation Zero (co-op survival). Contraband (Xbox exclusive) was CANCELLED 2024 along with layoffs. Games are action-focused, less narrative depth. Open-world systems could benefit from emergent NPC stories but not their current focus. Source: Wikipedia, Game Developer, Eurogamer",
    tags: ["sweden", "aaa", "open-world", "action", "nordisk", "restructuring-2024"],
    contacts: [
      { name: "Stefanía Guðrún Halldórsdóttir", role: "CEO", source: "Wikipedia" }
    ]
  },
  {
    id: "xaSSDD7Tq5ghfjYifMlR",
    name: "Berangin Creative",
    icpScore: 75,
    status: "active",
    notes: "Indonesian indie studio. Founded 2019. Small team (~10). Primarily animation studio that transitioned to game dev. Kejora = hand-drawn animated puzzle platformer adventure (delayed to 2026). Published by Soft Source (Singapore). Southeast Asian cultural roots, strong visual storytelling focus. Game is narrative puzzle adventure - good narrative fit but small scale. Architect may be better fit than Director for their authored narrative approach. Interesting for regional/SEA expansion. Source: Adventure Game Hotspot, Games Press, LinkedIn",
    tags: ["indonesia", "indie", "narrative", "adventure", "puzzle-platformer", "animation", "architect-icp", "sea"],
    contacts: []
  },
  {
    id: "9jpe3w9iqIX2bab4xwn8",
    name: "Bethesda Game Studios",
    icpScore: 68,
    status: "active",
    notes: "USA AAA (Microsoft/Xbox Game Studios). THE definitive open-world RPG studio. Todd Howard (Executive Producer/Director), Ashley Cheng (Managing Director), Angela Browder (Studio Director). Elder Scrolls (Skyrim, etc.), Fallout (3/4/76), Starfield (2023). Massive open worlds with emergent gameplay, faction systems, companion relationships. PERFECT Director use case: Radiant AI could be enhanced with emergent narrative, faction wars, NPC story arcs. Challenge: Now owned by Microsoft (Xbox), enterprise sales into Microsoft is extremely difficult, likely have massive internal AI/ML teams already. Would need Xbox/Microsoft partnership level approach. Source: Wikipedia, LinkedIn",
    tags: ["usa", "aaa", "open-world", "rpg", "microsoft", "xbox", "director-icp", "radiant-ai"],
    contacts: [
      { name: "Todd Howard", role: "Executive Producer & Director", source: "Wikipedia" },
      { name: "Ashley Cheng", role: "Managing Director", source: "Wikipedia" },
      { name: "Angela Browder", role: "Studio Director", source: "Wikipedia" }
    ]
  },
  {
    id: "UqKwuKNik79flM0Rh7yF",
    name: "BioWare",
    icpScore: 70,
    status: "active",
    notes: "USA AAA (EA subsidiary). Legendary narrative RPG studio. Founded 1995, Edmonton/Austin. Gary McKay (General Manager). Dragon Age series (Origins, DA2, Inquisition, Veilguard 2024), Mass Effect series (trilogy, Andromeda, ME4 in dev), KOTOR, Baldur's Gate, Jade Empire, Anthem (failed). THE studio that defined Western RPG narrative: companion relationships, player choice, branching stories, romance systems. Dragon Age: The Veilguard (Oct 2024) - mixed reception but narrative-focused. Challenge: EA ownership, recent troubles (Anthem failure, layoffs 2023), corporate bureaucracy. Still has narrative DNA but harder to sell into. Source: BioWare Blog, Wikipedia",
    tags: ["usa", "aaa", "rpg", "narrative", "ea", "companion-systems", "branching", "director-icp"],
    contacts: [
      { name: "Gary McKay", role: "General Manager", source: "BioWare Blog" }
    ]
  },
  {
    id: "EwzlCWmupEH1EDMgkdIv",
    name: "Black Cube Games",
    icpScore: 86,
    status: "qualified",
    notes: "GOOD DIRECTOR FIT. Dutch indie studio, Amsterdam/Amstelveen. Founded 2012. Team of ~10, Persian background (relocated to Europe). CEO: Ali Boroumand. The Tale of Bistun (2022, narrative-driven action-adventure inspired by Persian mythology), Realm of Fame (in development). Focus on immersive worlds, culture, and mythology. Narrative-first design philosophy. LOCAL to Netherlands - easy outreach. Small but experienced team (11+ years together). Persian/Middle Eastern storytelling could be unique use case for Director. Source: LinkedIn, ZoomInfo, blackcubegames.com",
    tags: ["netherlands", "indie", "narrative", "adventure", "mythology", "persian", "director-icp", "local-nl"],
    contacts: [
      { name: "Ali Boroumand", role: "CEO", source: "LinkedIn" }
    ]
  },
  {
    id: "ug4rvvotbCuUzbvWSF96",
    name: "Bloober Team",
    icpScore: 85,
    status: "qualified",
    notes: "DIRECTOR FIT. Polish AA studio, Krakow. Founded 2008. ~250 employees. Publicly traded (WSE: BLO). CEO: Piotr Babieno, Creative Director: Mateusz Lenart. Layers of Fear (1&2), Observer, The Medium, Blair Witch, Silent Hill 2 Remake (Oct 2024 - critical/commercial success), Cronos: The New Dawn (announced). Konami partnership (SH2). Another Silent Hill remake in full production. HORROR NARRATIVE SPECIALISTS - psychological horror relies heavily on environmental storytelling, character psychology, branching fear responses. Director could enhance dynamic horror narrative (NPC behaviors, story pacing based on player actions). AA size is approachable, proven track record, European. Source: Eurogamer, Wikipedia, IGN",
    tags: ["poland", "aa", "horror", "narrative", "konami-partner", "publicly-traded", "director-icp", "psychological-horror"],
    contacts: [
      { name: "Piotr Babieno", role: "CEO", source: "Eurogamer" },
      { name: "Mateusz Lenart", role: "Creative Director", source: "Wikipedia" }
    ]
  }
];

async function updateBatch18() {
  console.log('Updating studio batch 18 with Director ICP research...\n');
  
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
      researchBatch: 18
    });
    
    const qualified = update.icpScore >= 85 ? '✅ QUALIFIED' : '';
    console.log(`📝 ${update.name} - ICP: ${update.icpScore} ${qualified}`);
    console.log(`   Status: ${update.status}`);
    console.log(`   Tags: ${update.tags.join(', ')}`);
    console.log(`   Contacts: ${mergedContacts.length}`);
    console.log('');
  }
  
  await batch.commit();
  console.log('\n✅ Batch 18 updates committed successfully!');
  
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

updateBatch18().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
