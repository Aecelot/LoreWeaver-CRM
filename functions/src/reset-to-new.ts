/**
 * Reset all competition leads back to "New" stage
 */

import * as admin from "firebase-admin";
import { Timestamp } from "firebase-admin/firestore";

if (!admin.apps.length) {
  admin.initializeApp({ projectId: "loreweaver-crm" });
}

const db = admin.firestore();

async function resetAll() {
  const snapshot = await db.collection("leads")
    .where("type", "==", "competition")
    .where("pipeline.stageId", "==", "researched")
    .get();

  console.log(`Moving ${snapshot.size} leads back to New...`);

  const now = Timestamp.now();
  let count = 0;
  for (const doc of snapshot.docs) {
    await doc.ref.update({
      "pipeline.stageId": "new",
      "pipeline.enteredStageAt": now,
      "status": "new",
      "updatedAt": now,
    });
    count++;
  }
  console.log(`Done. Reset ${count} leads.`);
}

resetAll().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
