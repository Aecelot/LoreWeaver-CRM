/**
 * Move competitors with good notes + scores to "Researched" stage
 *
 * Run with: npx ts-node src/move-to-researched.ts
 */

import * as admin from "firebase-admin";
import { Timestamp } from "firebase-admin/firestore";

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: "loreweaver-crm",
  });
}

const db = admin.firestore();

// Minimum requirements to count as "researched"
const MIN_NOTES_LENGTH = 50;  // At least 50 chars of notes
const MIN_DIFFERENTIATOR_LENGTH = 20;  // Or a decent differentiator

async function moveToResearched() {
  console.log("Finding competitors to move to Researched stage...\n");

  // Get the competition pipeline and find "researched" stage ID
  const pipelinesSnapshot = await db.collection("pipelines").where("type", "==", "competition").get();
  
  if (pipelinesSnapshot.empty) {
    console.error("No competition pipeline found!");
    return;
  }

  const pipeline = pipelinesSnapshot.docs[0];
  const stages = pipeline.data().stages || [];
  
  console.log("Pipeline stages:");
  stages.forEach((s: any) => console.log(`  - ${s.id}: ${s.name}`));
  
  // Find the "researched" stage
  const researchedStage = stages.find((s: any) => 
    s.id.toLowerCase().includes("research") || 
    s.name.toLowerCase().includes("research")
  );
  
  if (!researchedStage) {
    console.error("No 'researched' stage found in pipeline!");
    console.log("Available stages:", stages.map((s: any) => s.id));
    return;
  }
  
  const researchedStageId = researchedStage.id;
  console.log(`\nTarget stage: "${researchedStage.name}" (${researchedStageId})\n`);

  // Get all competition leads currently in "new" stage
  const leadsSnapshot = await db.collection("leads")
    .where("type", "==", "competition")
    .where("pipeline.stageId", "==", "new")
    .get();

  console.log(`Found ${leadsSnapshot.size} leads in "new" stage\n`);

  const now = Timestamp.now();
  let moved = 0;
  let skipped = 0;

  for (const doc of leadsSnapshot.docs) {
    const lead = doc.data();
    const name = lead.name || "Unknown";
    
    // Check if this lead has enough info to be considered "researched"
    const notesLength = (lead.notes || "").length;
    const differentiatorLength = (lead.competition?.differentiator || "").length;
    const hasThreatLevel = lead.competition?.threatLevel != null;
    const hasStrengths = (lead.competition?.strengths || []).length > 0;
    const hasWeaknesses = (lead.competition?.weaknesses || []).length > 0;
    
    // Criteria: has threat level AND (decent notes OR decent differentiator OR has strengths/weaknesses)
    const hasEnoughInfo = hasThreatLevel && (
      notesLength >= MIN_NOTES_LENGTH ||
      differentiatorLength >= MIN_DIFFERENTIATOR_LENGTH ||
      hasStrengths ||
      hasWeaknesses
    );

    if (hasEnoughInfo) {
      await doc.ref.update({
        "pipeline.stageId": researchedStageId,
        "pipeline.enteredStageAt": now,
        "status": "researched",
        "updatedAt": now,
      });
      console.log(`✓ Moved: ${name}`);
      moved++;
    } else {
      // Log why it was skipped (for debugging)
      if (!hasThreatLevel) {
        console.log(`⊘ Skipped: ${name} (no threat level)`);
      } else {
        console.log(`⊘ Skipped: ${name} (notes: ${notesLength} chars, diff: ${differentiatorLength} chars)`);
      }
      skipped++;
    }
  }

  console.log(`\n========================================`);
  console.log(`TOTAL: Moved ${moved}, Skipped ${skipped}`);
  console.log(`========================================`);
}

// Run
moveToResearched()
  .then(() => {
    console.log("\nDone!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
