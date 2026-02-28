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

const researchContent = `DEEP RESEARCH COMPLETE (2026-02-27)

== COMPANY ==
Founded: 2014
Team: 81 employees
Location: Stockholm, Sweden
Status: Independent (owned 100% by Josef Fares)

== KEY PEOPLE ==
Josef Fares (@josef_fares) — Founder, Director
Film director turned game director. VERY vocal, authentic.
Brothers: Fares Fares (actor), Sam Fares

== GAMES ==
Split Fiction (Mar 2025) — Latest co-op
It Takes Two (2021) — GOTY 2021, 20M+ sold
A Way Out (2018) — 6M sold
Brothers (2013) — Breakthrough

== DESIGN ==
Co-op ONLY — every game requires 2 players
Asymmetric gameplay — players have different abilities
NPCs react to BOTH players simultaneously

== FIT ==
Director ICP: PERFECT
Asymmetric co-op = NPCs should react differently to each player
Their games are about relationships — Director enhances this

See: research/leads/hazelight.md`;

const snap = await db.collection('leads')
  .where('name', '>=', 'Hazelight')
  .where('name', '<=', 'Hazelight\uf8ff')
  .limit(1)
  .get();

if (snap.empty) {
  console.log('Hazelight not found');
  process.exit(1);
}

const leadDoc = snap.docs[0];

// Update the notes field on the lead
await leadDoc.ref.update({ notes: researchContent });

// Add to notes collection
await db.collection('notes').add({
  leadId: leadDoc.id,
  content: researchContent,
  status: 'warm',
  createdBy: 'system-research',
  createdAt: admin.firestore.FieldValue.serverTimestamp(),
  updatedAt: admin.firestore.FieldValue.serverTimestamp()
});

console.log('✅ Hazelight: Added research note');
process.exit(0);
