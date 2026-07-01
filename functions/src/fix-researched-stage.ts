/**
 * Fix: Move leads with insufficient notes back to "New"
 * Only keep in "Researched" if they have real substance
 *
 * Run with: npx ts-node src/fix-researched-stage.ts
 */

import * as admin from "firebase-admin";
import { Timestamp } from "firebase-admin/firestore";

if (!admin.apps.length) {
  admin.initializeApp({
    projectId: "loreweaver-crm",
  });
}

const db = admin.firestore();

// STRICT criteria for "researched" - must have actual written notes
const MIN_NOTES_LENGTH = 100;  // Need real substance, not just a sentence

async function fixResearchedStage() {
  console.log("Auditing 'Researched' leads for actual substance...\n");

  // Get all competition leads in "researched" stage
  const leadsSnapshot = await db.collection("leads")
    .where("type", "==", "competition")
    .where("pipeline.stageId", "==", "researched")
    .get();

  console.log(`Found ${leadsSnapshot.size} leads in "researched" stage\n`);

  const now = Timestamp.now();
  let demoted = 0;
  let kept = 0;

  for (const doc of leadsSnapshot.docs) {
    const lead = doc.data();
    const name = lead.name || "Unknown";
    
    // Check actual notes content
    const notesLength = (lead.notes || "").length;
    
    // Only keep in Researched if notes have real content
    const hasRealSubstance = notesLength >= MIN_NOTES_LENGTH;

    if (!hasRealSubstance) {
      // Move back to "new"
      await doc.ref.update({
        "pipeline.stageId": "new",
        "pipeline.enteredStageAt": now,
        "status": "new",
        "updatedAt": now,
      });
      console.log(`↩ Demoted: ${name} (notes: ${notesLength} chars)`);
      demoted++;
    } else {
      console.log(`✓ Kept: ${name} (notes: ${notesLength} chars)`);
      kept++;
    }
  }

  console.log(`\n========================================`);
  console.log(`Kept in Researched: ${kept}`);
  console.log(`Demoted to New: ${demoted}`);
  console.log(`========================================`);
}

// Run
fixResearchedStage()
  .then(() => {
    console.log("\nDone!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
