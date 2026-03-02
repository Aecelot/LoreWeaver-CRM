// Upsert Larian Studios and Guerrilla Games with deep research
// Run: node scripts/upsert-larian-guerrilla.mjs
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

const leads = [
  {
    searchName: "Larian Studios",
    data: {
      name: "Larian Studios",
      type: "studio",
      status: "active",
      priority: "high",
      owner: "system",
      contact: { 
        name: "Adam Smith", 
        role: "Writing Director", 
        email: "", 
        linkedin: "https://ie.linkedin.com/in/adam-smith-7638a8288",
        twitter: ""
      },
      website: "https://larian.com",
      country: "Belgium",
      location: "Ghent, Belgium (HQ)",
      tags: ["belgium", "aaa", "narrative", "branching", "rpg", "indie", "architect-icp", "director-icp", "researched", "high-priority"],
      notes: `DEEP RESEARCH COMPLETE (2026-03-02)

== COMPANY ==
Founded: 1996 | HQ: Ghent, Belgium
Employees: ~530 (2025) | Ownership: Private (Tencent minority)
7 studios: Belgium, Ireland, UK, Spain, Poland, Malaysia, Canada

== KEY PEOPLE ==
Swen Vincke — Founder & CEO (Twitter: @LarAtLarian)
Adam Smith — Writing Director (Ireland)
Michael Douse — Director of Publishing (Twitter: @Cromwelp)

== GAMES ==
Baldur's Gate 3 (2023) — GOTY, 2M+ words, 17K+ endings
Divinity: Original Sin 2 (2017) — RPG landmark
Divinity (TBA) — New engine, announced Dec 2025

== TECH ==
Divinity Engine 4.0 — Proprietary, heavy pipeline tooling
Automated dialogue recording, testing frameworks
Writers work in integrated tools

== AI STANCE ==
PRAGMATIC — Uses AI for early ideation only
Swen: "Not replacing workers with AI"
"Not releasing games with AI components"
Open to tools that augment, not replace

== FIT ==
Architect: EXCELLENT (90/100) — 2M+ words QA
Director: VERY GOOD (85/100) — Complex NPC memory
OVERALL: 88/100

ANGLE: Narrative consistency at scale across 7 distributed studios.

See: C:\\Users\\rijkg\\clawd\\research\\leads\\larian-studios.md`,
      studio: { 
        size: "530", 
        type: "aaa-indie", 
        games: ["Baldur's Gate 3", "Divinity: Original Sin 2", "Divinity (upcoming)"], 
        focus: "Narrative RPG", 
        fitScore: 88, 
        fitReason: "Massive dialogue QA needs (2M+ words, 17K endings). Complex NPC systems. Pragmatic AI stance. Global distributed team." 
      },
      pipeline: { 
        pipelineId: "default", 
        stageId: "researched", 
        enteredStageAt: admin.firestore.FieldValue.serverTimestamp() 
      },
      createdBy: "research-claude",
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  },
  {
    searchName: "Guerrilla Games",
    data: {
      name: "Guerrilla Games",
      type: "studio",
      status: "active",
      priority: "low",
      owner: "system",
      contact: { 
        name: "Annie Kitain", 
        role: "Lead Writer", 
        email: "", 
        linkedin: "",
        twitter: ""
      },
      website: "https://guerrilla-games.com",
      country: "Netherlands",
      location: "Amsterdam",
      tags: ["netherlands", "aaa", "open-world", "action-rpg", "playstation", "sony", "reference", "researched"],
      notes: `DEEP RESEARCH COMPLETE (2026-03-02)

== COMPANY ==
Founded: 2000 | HQ: Amsterdam, Netherlands
Employees: ~385 (2025) | Ownership: Sony (100%)
PlayStation Studios first-party

== KEY PEOPLE ==
Jan-Bart van Beek — Studio Director
Joel Eschler — Studio Director
Hella Schmidt — Studio Director
Annie Kitain — Lead Writer
Benjamin McCaw — Narrative Director

== GAMES ==
Horizon Forbidden West (2022) — Linear narrative
Horizon Zero Dawn (2017) — 10M+ copies
Horizon MMORPG (coming) — NCSOFT partnership
Uses Decima engine (shared with Kojima)

== AI STANCE ==
No public GenAI statement
Focus on game AI (HTN planning for robots)
Voice actress says "not going to replace actors"

== FIT ==
Architect: LOW (40/100) — Linear narrative
Director: LOW (30/100) — Action-first, not dialogue-driven
OVERALL: 35/100

STATUS: REFERENCE ACCOUNT ONLY
Dutch AAA flagship for credibility. Not a sales target.
Sony procurement barriers. Linear narrative = less need.

See: C:\\Users\\rijkg\\clawd\\research\\leads\\guerrilla-games.md`,
      studio: { 
        size: "385", 
        type: "aaa", 
        games: ["Horizon Forbidden West", "Horizon Zero Dawn", "Killzone series"], 
        focus: "Open-world action RPG", 
        fitScore: 35, 
        fitReason: "Reference only. Linear narrative, Sony first-party. Action focus over dialogue." 
      },
      pipeline: { 
        pipelineId: "default", 
        stageId: "researched", 
        enteredStageAt: admin.firestore.FieldValue.serverTimestamp() 
      },
      createdBy: "research-claude",
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  }
];

async function upsertLeads() {
  console.log("Upserting leads...\n");
  
  for (const lead of leads) {
    try {
      // Search for existing lead
      const snapshot = await db.collection('leads')
        .where('name', '==', lead.searchName)
        .limit(1)
        .get();
      
      if (snapshot.empty) {
        // Create new lead
        const docRef = await db.collection('leads').add(lead.data);
        console.log(`✅ CREATED: ${lead.searchName} (ID: ${docRef.id})`);
      } else {
        // Update existing lead
        const doc = snapshot.docs[0];
        await doc.ref.update(lead.data);
        console.log(`📝 UPDATED: ${lead.searchName} (ID: ${doc.id})`);
      }
    } catch (error) {
      console.error(`❌ ERROR: ${lead.searchName}:`, error.message);
    }
  }
  
  console.log("\n✅ Done!");
  process.exit(0);
}

upsertLeads();
