/**
 * Migrate notes from lead.notes field to notes collection
 *
 * Run with: npx ts-node src/migrate-notes.ts
 */

import * as admin from "firebase-admin";
import { Timestamp } from "firebase-admin/firestore";

if (!admin.apps.length) {
  admin.initializeApp({
    projectId: "loreweaver-crm",
  });
}

const db = admin.firestore();

async function migrateNotes() {
  console.log("Migrating notes from lead.notes field to notes collection...\n");

  // Get all competition leads with notes
  const leadsSnapshot = await db.collection("leads")
    .where("type", "==", "competition")
    .get();

  console.log(`Found ${leadsSnapshot.size} competition leads\n`);

  const now = Timestamp.now();
  let migrated = 0;
  let skipped = 0;
  let alreadyHasNotes = 0;

  for (const doc of leadsSnapshot.docs) {
    const lead = doc.data();
    const leadId = doc.id;
    const name = lead.name || "Unknown";
    const notesContent = lead.notes || "";

    // Skip if no notes to migrate
    if (!notesContent || notesContent.length < 10) {
      skipped++;
      continue;
    }

    // Check if notes already exist in collection for this lead
    const existingNotes = await db.collection("notes")
      .where("leadId", "==", leadId)
      .limit(1)
      .get();

    if (!existingNotes.empty) {
      console.log(`⊘ ${name}: already has notes in collection`);
      alreadyHasNotes++;
      continue;
    }

    // Create note in notes collection
    const noteData = {
      leadId: leadId,
      content: notesContent,
      status: "warm",  // Default status
      createdBy: lead.createdBy || "system",
      createdAt: now,
      updatedAt: now,
    };

    await db.collection("notes").add(noteData);
    console.log(`✓ ${name}: migrated (${notesContent.length} chars)`);
    migrated++;
  }

  console.log(`\n========================================`);
  console.log(`Migrated: ${migrated}`);
  console.log(`Skipped (no notes): ${skipped}`);
  console.log(`Already had notes: ${alreadyHasNotes}`);
  console.log(`========================================`);
}

// Run
migrateNotes()
  .then(() => {
    console.log("\nDone!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
