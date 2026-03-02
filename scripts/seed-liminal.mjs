/**
 * Seed script to add Liminal Group as a lead and John Lewis as a contact
 * Uses Firebase Client SDK (no Admin SDK required)
 *
 * Run with: node scripts/seed-liminal.mjs
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDpGaiH7T9QmNzBYDZTNxV7HKdvfwj1lRI",
  authDomain: "loreweaver-crm.firebaseapp.com",
  projectId: "loreweaver-crm",
  storageBucket: "loreweaver-crm.firebasestorage.app",
  messagingSenderId: "92079160233",
  appId: "1:92079160233:web:5a84556b172542385fa2b8",
  measurementId: "G-BFGXTPQS8Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function seedLiminalGroup(userId) {
  console.log("Seeding Liminal Group and John Lewis...\n");

  const now = serverTimestamp();

  // First, get the studio pipeline
  const pipelinesSnapshot = await getDocs(query(collection(db, "pipelines"), where("type", "==", "studio")));

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

  // Check if Liminal Group already exists
  const existingLeadSnapshot = await getDocs(query(collection(db, "leads"), where("name", "==", "Liminal Group")));

  let leadId;

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
      createdBy: userId,
      leadSource: "other",
      companySize: "startup",
    };

    const leadRef = await addDoc(collection(db, "leads"), liminalGroupLead);
    leadId = leadRef.id;
    console.log(`Created Liminal Group lead with ID: ${leadId}`);
  }

  // Check if John Lewis contact already exists
  const existingContactSnapshot = await getDocs(query(collection(db, "contacts"), where("email", "==", "john.kipling.lewis@gmail.com")));

  let contactId;

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
      createdBy: userId,
    };

    const contactRef = await addDoc(collection(db, "contacts"), johnLewisContact);
    contactId = contactRef.id;
    console.log(`Created John Lewis contact with ID: ${contactId}`);
  }

  // Check if lead-contact link already exists
  const existingLinkSnapshot = await getDocs(
    query(
      collection(db, "leadContacts"),
      where("leadId", "==", leadId),
      where("contactId", "==", contactId)
    )
  );

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
      createdBy: userId,
    };

    const linkRef = await addDoc(collection(db, "leadContacts"), leadContactLink);
    console.log(`Created lead-contact link with ID: ${linkRef.id}`);
  }

  console.log("\nSeed completed successfully!");
  console.log(`Lead ID: ${leadId}`);
  console.log(`Contact ID: ${contactId}`);
}

// Get existing user from leads to use their ID
async function getUserId() {
  const leadsSnapshot = await getDocs(collection(db, "leads"));
  if (!leadsSnapshot.empty) {
    const lead = leadsSnapshot.docs[0].data();
    if (lead.createdBy) {
      return lead.createdBy;
    }
  }
  // Fallback - would need actual auth
  throw new Error("No existing leads found to get user ID. Please run this from the app.");
}

// Run the seed
getUserId()
  .then(userId => {
    console.log(`Using user ID: ${userId}`);
    return seedLiminalGroup(userId);
  })
  .then(() => {
    console.log("\nDone!");
    process.exit(0);
  })
  .catch(err => {
    console.error("Error:", err.message);
    process.exit(1);
  });
