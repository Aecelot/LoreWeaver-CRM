// Fix Remedy: Architect ICP, not Director
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

async function fixRemedy() {
  const snapshot = await db.collection('leads')
    .where('name', '==', 'Remedy Entertainment')
    .limit(1)
    .get();

  if (!snapshot.empty) {
    await snapshot.docs[0].ref.update({
      tags: ["finland", "aa", "narrative", "cinematic", "architect-icp", "researched", "ai-cautious"],
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
= Open to PRODUCTION AI, skeptical of CREATIVE/GENERATIVE AI

== FIT ==
**Architect ICP**: Production AI for writers = exactly what they're open to
**NOT Director**: Runtime generation = creative AI = what they're skeptical of

See: research/leads/remedy.md for full dossier`,
      "studio.fitReason": "Architect ICP. Their 'AI for production not creation' stance EXACTLY matches Architect (authoring tool). Director (runtime generation) would conflict with their stated position.",
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log("✅ Fixed Remedy: now Architect ICP");
  }
  
  process.exit(0);
}

fixRemedy();
