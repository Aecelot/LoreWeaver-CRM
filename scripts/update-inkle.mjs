// Update Inkle lead with deep research
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

async function updateInkle() {
  // Find Inkle lead
  const snapshot = await db.collection('leads')
    .where('name', '==', 'Inkle')
    .limit(1)
    .get();

  if (snapshot.empty) {
    console.log('Inkle lead not found. Creating...');
    const newLead = {
      name: "Inkle",
      type: "studio",
      status: "active",
      priority: "high",
      owner: "system",
      contact: { 
        name: "Jon Ingold", 
        role: "Narrative Director, Co-founder", 
        email: "", 
        phone: "", 
        linkedin: "",
        twitter: "@joningold"
      },
      website: "https://www.inklestudios.com",
      country: "United Kingdom",
      location: "Cambridge",
      tags: ["uk", "indie", "narrative", "ink-creator", "partnership-potential", "architect-icp"],
      notes: `DEEP RESEARCH COMPLETE (2026-02-27)

== COMPANY ==
Founded: Nov 2011
Team: 3 full-time + 5-6 contractors
Location: Cambridge, UK
Bootstrapped (no VC)

== KEY PEOPLE ==
Jon Ingold (@joningold) — Narrative Director, Co-founder. Ex-Sony. Published author. GDC speaker.
Joseph Humfrey (@joethephish) — Art & Code Director. Ex-Rare/Sony.
Anastasia Wyatt — 2D Artist
Iain Merrick — Technical Dev (contractor), ex-Google

== GAMES ==
TR-49 (2026) — BEST LAUNCH IN 14 YEARS. Made in 9 months to learn Godot.
Expelled! (2025), A Highland Song (2023), Overboard! (2021), Pendragon (2020), Heaven's Vault (2019), 80 Days (2014), Sorcery! (2013-16)

== INK ECOSYSTEM ==
They CREATED ink — open source narrative scripting language.
4.1k+ GitHub stars. De facto indie narrative standard.
Used by: Stoic (Banner Saga), The Chinese Room (VTM Bloodlines 2), countless indies.
Integrations: Unity, Godot, Unreal, JS, GameMaker, Lua, Java, Rust

== AI STANCE (CRUCIAL) ==
Jon Ingold (Jul 2023): AI-generated narrative would be "a mistake"
Jon Ingold (Jun 2024): Using AI less, only for "short coding tasks"
SKEPTICAL of AI narrative generation, but not anti-AI in general.

== PARTNERSHIP ANGLE ==
NOT Architect (they built ink — don't need authoring tools)
YES ink + Director integration for ink USERS
Pitch: "Director handles dynamic NPC responses within ink-defined story bounds"
Value: Their community gets AI-enhanced delivery without them maintaining it

== WARM PATHS ==
- GDC/Develop conferences (both founders speak)
- Emily Short (AI narrative pioneer, collaborated with inkle)
- Contribute to ink-library first

See: research/leads/inkle.md for full dossier`,
      studio: { 
        size: "3 full-time + 5-6 contractors", 
        type: "indie", 
        games: ["TR-49", "Expelled!", "A Highland Song", "Overboard!", "Pendragon", "Heaven's Vault", "80 Days", "Sorcery!"], 
        focus: "Narrative interactive fiction", 
        fitScore: 95, 
        fitReason: "Created ink scripting language. Gold standard for narrative. Partnership potential for Director integration, NOT Architect sale." 
      },
      pipeline: { pipelineId: "default", stageId: "researched", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
      createdBy: "research-deep-dive",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    const docRef = await db.collection('leads').add(newLead);
    console.log(`✅ Created Inkle lead: ${docRef.id}`);
  } else {
    const doc = snapshot.docs[0];
    console.log(`Found Inkle lead: ${doc.id}`);
    
    await doc.ref.update({
      priority: "high",
      contact: { 
        name: "Jon Ingold", 
        role: "Narrative Director, Co-founder", 
        email: "", 
        phone: "", 
        linkedin: "",
        twitter: "@joningold"
      },
      location: "Cambridge",
      tags: ["uk", "indie", "narrative", "ink-creator", "partnership-potential", "architect-icp", "researched"],
      notes: `DEEP RESEARCH COMPLETE (2026-02-27)

== COMPANY ==
Founded: Nov 2011
Team: 3 full-time + 5-6 contractors
Location: Cambridge, UK
Bootstrapped (no VC)

== KEY PEOPLE ==
Jon Ingold (@joningold) — Narrative Director, Co-founder. Ex-Sony. Published author. GDC speaker.
Joseph Humfrey (@joethephish) — Art & Code Director. Ex-Rare/Sony.
Anastasia Wyatt — 2D Artist
Iain Merrick — Technical Dev (contractor), ex-Google

== GAMES ==
TR-49 (2026) — BEST LAUNCH IN 14 YEARS. Made in 9 months to learn Godot.
Expelled! (2025), A Highland Song (2023), Overboard! (2021), Pendragon (2020), Heaven's Vault (2019), 80 Days (2014), Sorcery! (2013-16)

== INK ECOSYSTEM ==
They CREATED ink — open source narrative scripting language.
4.1k+ GitHub stars. De facto indie narrative standard.
Used by: Stoic (Banner Saga), The Chinese Room (VTM Bloodlines 2), countless indies.
Integrations: Unity, Godot, Unreal, JS, GameMaker, Lua, Java, Rust

== AI STANCE (CRUCIAL) ==
Jon Ingold (Jul 2023): AI-generated narrative would be "a mistake"
Jon Ingold (Jun 2024): Using AI less, only for "short coding tasks"
SKEPTICAL of AI narrative generation, but not anti-AI in general.

== PARTNERSHIP ANGLE ==
NOT Architect (they built ink — don't need authoring tools)
YES ink + Director integration for ink USERS
Pitch: "Director handles dynamic NPC responses within ink-defined story bounds"
Value: Their community gets AI-enhanced delivery without them maintaining it

== WARM PATHS ==
- GDC/Develop conferences (both founders speak)
- Emily Short (AI narrative pioneer, collaborated with inkle)
- Contribute to ink-library first

See: research/leads/inkle.md for full dossier`,
      "studio.size": "3 full-time + 5-6 contractors",
      "studio.games": ["TR-49", "Expelled!", "A Highland Song", "Overboard!", "Pendragon", "Heaven's Vault", "80 Days", "Sorcery!"],
      "studio.fitReason": "Created ink scripting language. Gold standard for narrative. Partnership potential for Director integration, NOT Architect sale.",
      "pipeline.stageId": "researched",
      "pipeline.enteredStageAt": admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`✅ Updated Inkle lead with deep research`);
  }
  
  process.exit(0);
}

updateInkle();
