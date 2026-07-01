/**
 * Debug: Check what's actually in a lead
 */

import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    projectId: "loreweaver-crm",
  });
}

const db = admin.firestore();

async function debugLead() {
  // Find LLMUnity lead
  const snapshot = await db.collection("leads")
    .where("name", "==", "LLMUnity (UndreamAI)")
    .get();

  if (snapshot.empty) {
    console.log("Lead not found");
    return;
  }

  const doc = snapshot.docs[0];
  const data = doc.data();
  
  console.log("Lead ID:", doc.id);
  console.log("\n=== Full Lead Data ===\n");
  console.log(JSON.stringify(data, null, 2));
  
  console.log("\n=== Key Fields ===");
  console.log("notes field:", data.notes ? `"${data.notes}" (${data.notes.length} chars)` : "EMPTY");
  console.log("competition.differentiator:", data.competition?.differentiator || "EMPTY");
  console.log("competition.products:", data.competition?.products || "EMPTY");
  console.log("pipeline.stageId:", data.pipeline?.stageId);
  
  // Check notes collection
  console.log("\n=== Notes Collection ===");
  const notesSnapshot = await db.collection("notes")
    .where("leadId", "==", doc.id)
    .get();
  
  console.log(`Found ${notesSnapshot.size} notes in collection`);
  notesSnapshot.forEach(noteDoc => {
    console.log("Note:", noteDoc.data());
  });
}

debugLead()
  .then(() => process.exit(0))
  .catch(err => { console.error(err); process.exit(1); });
