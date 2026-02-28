// Update Remedy, Hazelight, Weather Factory with deep research
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
    name: "Remedy Entertainment",
    searchName: "Remedy",
    data: {
      priority: "high",
      contact: { 
        name: "Sam Lake", 
        role: "Creative Director", 
        email: "", 
        phone: "", 
        linkedin: "",
        twitter: ""
      },
      location: "Espoo, Finland",
      tags: ["finland", "aa", "narrative", "cinematic", "director-icp", "researched", "ai-cautious"],
      notes: `DEEP RESEARCH COMPLETE (2026-02-27)

== COMPANY ==
Founded: 1995 | Public: HEL:REMEDY
Team: 367 (Dec 2024), ~385 (Jun 2025)
Location: Espoo, Finland + Stockholm office
Revenue: €50.66M (FY 2024)

== KEY PEOPLE ==
Sam Lake — Creative Director. Industry icon. Face of Max Payne. Writer on all major titles.
Tero Virtala — CEO
Thomas Puha — Communications Director

== GAMES ==
FBC: Firebreak (2025) — Control spin-off. UNDERPERFORMED.
Alan Wake 2 (2023) — GOTY contender. Massive live-action integration.
Control (2019) — Hit. Connected universe with Alan Wake.
Quantum Break (2016), Alan Wake (2010), Max Payne (2001-03)

== TECH ==
Northlight Engine (proprietary)
Extensive live-action capture
Strong internal tooling

== AI STANCE (CRUCIAL) ==
Feb 2026: "NOT using generative AI on Control Resonant"
Use AI for "dull" parts (mocap tracking) but NOT creative work
"Cautious... monitoring ethical considerations"
= Open to production AI, skeptical of creative AI

== FIT ==
Director ICP: NPC ambient dialogue for vast narrative games
NOT Architect: Too large, proprietary tools

See: research/leads/remedy.md for full dossier`,
      "studio.size": "367",
      "studio.games": ["Alan Wake 2", "Control", "FBC: Firebreak", "Quantum Break", "Alan Wake", "Max Payne"],
      "studio.fitScore": 90,
      "studio.fitReason": "Cinematic narrative masters. AI-cautious but open to production AI. Director fits 'AI for delivery not generation' philosophy.",
      "pipeline.stageId": "researched",
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  },
  {
    name: "Hazelight Studios",
    searchName: "Hazelight",
    data: {
      priority: "high",
      contact: { 
        name: "Josef Fares", 
        role: "Founder, Creative Director, CEO", 
        email: "", 
        phone: "", 
        linkedin: "",
        twitter: "@josef_fares"
      },
      location: "Stockholm, Sweden",
      tags: ["sweden", "aa", "co-op", "narrative", "director-icp", "researched", "ea-originals"],
      notes: `DEEP RESEARCH COMPLETE (2026-02-27)

== COMPANY ==
Founded: 2014
Team: 81 employees (11 nationalities)
Location: Stockholm (Münchenbryggeriet)
Publisher: EA Originals (keeps IP)

== KEY PEOPLE ==
Josef Fares — Founder/CEO/Creative Director. Film director before games. Famous "F*** the Oscars" speech. VERY outspoken.

== GAMES ==
Split Fiction (Mar 2025) — Reviews: "Hazelight's best yet"
It Takes Two (2021) — GOTY 2021. 20M+ copies.
A Way Out (2018) — 3.5M+ copies
Brothers (2013) — Made at Starbreeze

== UNIQUE MODEL ==
EVERY game is co-op only
Friend's Pass — free for co-op partners
Asymmetric gameplay (different mechanics per player)

== TECH ==
Unreal Engine
Friend's Pass system (proprietary)

== AI STANCE ==
UNKNOWN — no public statements. Josef would have strong opinions.

== FIT ==
Director ICP: Perfect! Asymmetric co-op = NPCs should react differently to each player
Dynamic dialogue enhances replayability
Fits their "variety is key" design philosophy

See: research/leads/hazelight.md for full dossier`,
      "studio.size": "81",
      "studio.games": ["Split Fiction", "It Takes Two", "A Way Out", "Brothers: A Tale of Two Sons"],
      "studio.fitScore": 90,
      "studio.fitReason": "It Takes Two GOTY. Co-op games = NPCs need to respond differently to different players. Perfect Director use case.",
      "pipeline.stageId": "researched",
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  },
  {
    name: "Weather Factory",
    searchName: "Weather Factory",
    data: {
      priority: "high",
      contact: { 
        name: "Alexis Kennedy", 
        role: "Co-founder, Writer", 
        email: "", 
        phone: "", 
        linkedin: "",
        twitter: "@alexiskennedy"
      },
      location: "London, UK",
      tags: ["uk", "indie", "narrative", "literary", "architect-icp", "researched", "failbetter-alumni"],
      notes: `DEEP RESEARCH COMPLETE (2026-02-27)

== COMPANY ==
Founded: 2017
Team: 2 full-time (husband-wife) + freelancers
Location: London (spare bedroom!)
Funding: Kickstarter + revenue

== KEY PEOPLE ==
Alexis Kennedy — Co-founder. FOUNDED FAILBETTER GAMES (Fallen London, Sunless Sea). Wrote for Dragon Age, Stellaris. Industry icon for narrative design.
Lottie Bevan — Co-founder/Producer. Ex-Failbetter (Sunless Skies, Zubmariner).

== GAMES ==
House of Light (2024) — BOOK OF HOURS DLC
BOOK OF HOURS (2023) — "Most successful game of both our careers"
Cultist Simulator (2018) — Double BAFTA nominated
+ Pre-WF at Failbetter: Fallen London, Sunless Sea

== UNIQUE APPROACH ==
Card-based systemic narrative
Dense interconnected lore (thousands of snippets)
No traditional dialogue trees
Gothic/Lovecraftian aesthetic

== AI STANCE ==
UNKNOWN — no public statements. Literary focus may mean skeptical.

== FIT ==
Architect ICP: PERFECT. They write thousands of text snippets for systemic games.
Architect helps organize, tag, track lore consistency.
Alexis Kennedy endorsement = massive credibility.

== NETWORK ==
Emily Short connection — same IF community.
Could be warm path to other narrative designers.

See: research/leads/weather-factory.md for full dossier`,
      "studio.size": "2 full-time + freelancers",
      "studio.games": ["BOOK OF HOURS", "Cultist Simulator", "House of Light", "The Lady Afterwards"],
      "studio.fitScore": 90,
      "studio.fitReason": "Alexis Kennedy = Failbetter founder, narrative design icon. Perfect Architect validation. If he uses it, everyone notices.",
      "pipeline.stageId": "researched",
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  }
];

async function updateLeads() {
  for (const update of updates) {
    const snapshot = await db.collection('leads')
      .where('name', '==', update.searchName)
      .limit(1)
      .get();
    
    if (snapshot.empty) {
      // Try partial match
      const allLeads = await db.collection('leads').get();
      let found = null;
      allLeads.forEach(doc => {
        if (doc.data().name?.toLowerCase().includes(update.searchName.toLowerCase())) {
          found = doc;
        }
      });
      
      if (found) {
        await found.ref.update(update.data);
        console.log(`✅ Updated ${update.name} (found as ${found.data().name})`);
      } else {
        console.log(`⚠️  ${update.name} not found, creating...`);
        await db.collection('leads').add({
          name: update.name,
          type: "studio",
          status: "active",
          website: "",
          country: update.data.location.split(',').pop().trim(),
          ...update.data,
          pipeline: { pipelineId: "default", stageId: "researched", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
          createdBy: "research-deep-dive",
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        console.log(`✅ Created ${update.name}`);
      }
    } else {
      await snapshot.docs[0].ref.update(update.data);
      console.log(`✅ Updated ${update.name}`);
    }
  }
  
  process.exit(0);
}

updateLeads();
