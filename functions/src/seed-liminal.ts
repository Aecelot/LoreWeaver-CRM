/**
 * Seed script to add Liminal Group as a lead and John Lewis as a contact
 *
 * Run with: npx ts-node src/seed-liminal.ts
 */

import * as admin from "firebase-admin";
import { Timestamp } from "firebase-admin/firestore";

// Initialize Firebase Admin with explicit project ID
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: "loreweaver-crm",
  });
}

const db = admin.firestore();

async function seedLiminalGroup() {
  console.log("Seeding Liminal Group and John Lewis...\n");

  // First, get the studio pipeline to find the correct pipeline ID and first stage
  const pipelinesSnapshot = await db.collection("pipelines").where("type", "==", "studio").get();

  let pipelineId = "studio-default";
  let stageId = "new-lead";

  if (!pipelinesSnapshot.empty) {
    const pipeline = pipelinesSnapshot.docs[0];
    pipelineId = pipeline.id;
    const stages = pipeline.data().stages || [];
    if (stages.length > 0) {
      stageId = stages[0].id;
    }
    console.log(`Found studio pipeline: ${pipelineId}, first stage: ${stageId}`);
  } else {
    console.log("No studio pipeline found, using defaults");
  }

  // Get the first user to use as createdBy (or use a default)
  // In production, you'd want to specify the actual user
  const usersSnapshot = await db.collection("leads").limit(1).get();
  let createdBy = "system";
  if (!usersSnapshot.empty) {
    const existingLead = usersSnapshot.docs[0].data();
    if (existingLead.createdBy) {
      createdBy = existingLead.createdBy;
      console.log(`Using createdBy from existing lead: ${createdBy}`);
    }
  }

  const now = Timestamp.now();

  // Check if Liminal Group already exists
  const existingLeadSnapshot = await db.collection("leads")
    .where("name", "==", "Liminal Group")
    .get();

  let leadId: string;

  if (!existingLeadSnapshot.empty) {
    leadId = existingLeadSnapshot.docs[0].id;
    console.log(`Liminal Group lead already exists with ID: ${leadId}`);
  } else {
    // Create Liminal Group as a lead
    const liminalGroupLead = {
      type: "studio",
      name: "Liminal Group",
      status: "active",
      priority: "medium",
      owner: "",
      contact: {
        name: "John Lewis",
        role: "Founder",
        email: "john.kipling.lewis@gmail.com",
        phone: "",
        linkedin: "",
      },
      website: "https://www.liminal-group.net",
      country: "Netherlands",
      location: "Amsterdam, Netherlands",
      tags: [],
      notes: "AI-focused development services company. Helps enhance development processes with AI and transform projects.",
      studio: {
        size: "startup",
        type: "AI Development Services",
        games: [],
        focus: "AI-enhanced development",
        fitScore: 0,
        fitReason: "",
      },
      pipeline: {
        pipelineId: pipelineId,
        stageId: stageId,
        enteredStageAt: now,
      },
      createdAt: now,
      updatedAt: now,
      createdBy: createdBy,
      leadSource: "other",
      companySize: "startup",
    };

    const leadRef = await db.collection("leads").add(liminalGroupLead);
    leadId = leadRef.id;
    console.log(`Created Liminal Group lead with ID: ${leadId}`);
  }

  // Check if John Lewis contact already exists
  const existingContactSnapshot = await db.collection("contacts")
    .where("email", "==", "john.kipling.lewis@gmail.com")
    .get();

  let contactId: string;

  if (!existingContactSnapshot.empty) {
    contactId = existingContactSnapshot.docs[0].id;
    console.log(`John Lewis contact already exists with ID: ${contactId}`);
  } else {
    // Create John Lewis as a contact
    const johnLewisContact = {
      name: "John Lewis",
      email: "john.kipling.lewis@gmail.com",
      role: "Founder",
      phone: "",
      linkedin: "",
      company: "Liminal Group",
      notes: "Founder of Liminal Group, an AI-focused development services company based in Amsterdam, Netherlands.",
      tags: [],
      createdAt: now,
      updatedAt: now,
      createdBy: createdBy,
    };

    const contactRef = await db.collection("contacts").add(johnLewisContact);
    contactId = contactRef.id;
    console.log(`Created John Lewis contact with ID: ${contactId}`);
  }

  // Check if lead-contact link already exists
  const existingLinkSnapshot = await db.collection("leadContacts")
    .where("leadId", "==", leadId)
    .where("contactId", "==", contactId)
    .get();

  if (!existingLinkSnapshot.empty) {
    console.log("Lead-contact link already exists");
  } else {
    // Create the lead-contact link
    const leadContactLink = {
      leadId: leadId,
      contactId: contactId,
      isPrimary: true,
      role: "Founder",
      createdAt: now,
      createdBy: createdBy,
    };

    const linkRef = await db.collection("leadContacts").add(leadContactLink);
    console.log(`Created lead-contact link with ID: ${linkRef.id}`);
  }

  console.log("\nSeed completed successfully!");
  console.log(`Lead ID: ${leadId}`);
  console.log(`Contact ID: ${contactId}`);
}

// Run the seed function
seedLiminalGroup()
  .then(() => {
    console.log("\nDone!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding data:", error);
    process.exit(1);
  });
