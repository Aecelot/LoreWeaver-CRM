/**
 * Seed script to add Architect competitors as leads
 *
 * Run with: npx ts-node src/seed-competitors.ts
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

interface CompetitorData {
  name: string;
  country: string;
  website: string;
  products: string[];
  targetMarket: "architect" | "director" | "both";
  threatLevel: 1 | 2 | 3 | 4 | 5;
  foundedYear?: number;
  fundingStage?: string;
  teamSize?: string;
  differentiator: string;
  strengths: string[];
  weaknesses: string[];
  pricingInfo?: string;
  notes: string;
}

const competitors: CompetitorData[] = [
  {
    name: "Nevigo GmbH (articy:draft)",
    country: "Germany",
    website: "https://www.articy.com",
    products: ["articy:draft X"],
    targetMarket: "architect",
    threatLevel: 5,
    differentiator: "Industry standard narrative design tool",
    strengths: ["24K+ users", "Disco Elysium uses it", "Unity/Unreal integration", "Version control"],
    weaknesses: ["No AI features", "Expensive", "Desktop only"],
    pricingInfo: "Free tier then €399+/seat",
    notes: "Primary competitor - the 800-lb gorilla",
  },
  {
    name: "Arcweave Inc",
    country: "Greece",
    website: "https://arcweave.com",
    products: ["Arcweave"],
    targetMarket: "architect",
    threatLevel: 4,
    foundedYear: 2018,
    fundingStage: "Startup",
    teamSize: "10-15",
    differentiator: "Browser-based collaborative narrative design",
    strengths: ["38K creators", "Browser-based", "Instant prototyping", "Godot/Unity export"],
    weaknesses: ["No AI features", "Smaller than articy"],
    pricingInfo: "Free tier then ~€15/mo",
    notes: "Most similar positioning to Architect",
  },
  {
    name: "Urban Brain Studios (Chat Mapper)",
    country: "USA",
    website: "https://www.chatmapper.com",
    products: ["Chat Mapper"],
    targetMarket: "architect",
    threatLevel: 2,
    differentiator: "First commercial dialogue prototyping tool",
    strengths: ["Established", "Lua scripting", "Exports to XML", "Launching Chat Mapper AI"],
    weaknesses: ["Older tool", "Less active development"],
    pricingInfo: "~$100 one-time",
    notes: "Legacy tool - monitor their AI announcement",
  },
  {
    name: "Celtx Inc",
    country: "Canada",
    website: "https://www.celtx.com",
    products: ["Celtx Gem"],
    targetMarket: "architect",
    threatLevel: 2,
    fundingStage: "Established",
    differentiator: "Film/TV crossover narrative tool",
    strengths: ["Part of broader Celtx ecosystem", "Pipeline integration"],
    weaknesses: ["Different market focus (film/TV)"],
    pricingInfo: "Subscription",
    notes: "Adjacent competitor - film/TV background",
  },
  {
    name: "Pixel Crushers",
    country: "USA",
    website: "https://www.pixelcrushers.com",
    products: ["Dialogue System for Unity"],
    targetMarket: "architect",
    threatLevel: 3,
    fundingStage: "Established",
    differentiator: "Unity middleware that imports from everyone",
    strengths: ["Imports from articy/Arcweave/ink/Yarn/etc", "Has OpenAI addon"],
    weaknesses: ["Unity only", "Runtime not authoring"],
    pricingInfo: "$85 one-time",
    notes: "Middleware aggregator - potential partner or frenemy",
  },
  {
    name: "Yarn Spinner Ltd",
    country: "Australia",
    website: "https://yarnspinner.dev",
    products: ["Yarn Spinner"],
    targetMarket: "architect",
    threatLevel: 3,
    foundedYear: 2015,
    fundingStage: "Funded (grants)",
    differentiator: "Open source dialogue tool from Secret Lab",
    strengths: ["Night in the Woods", "DREDGE", "Serious indie cred", "Free core"],
    weaknesses: ["Open source hard to compete on price", "Scripting required"],
    pricingInfo: "Free + paid support",
    notes: "Secret Lab spinoff - funded by Australia Council/Epic/NYU",
  },
  {
    name: "Inkle Studios",
    country: "UK",
    website: "https://www.inklestudios.com/ink",
    products: ["ink scripting language"],
    targetMarket: "architect",
    threatLevel: 3,
    fundingStage: "Established",
    differentiator: "Open source narrative scripting language",
    strengths: ["80 Days", "Heaven's Vault", "9.2K Discord", "Powerful scripting"],
    weaknesses: ["Technical - requires learning scripting"],
    pricingInfo: "Free (open source)",
    notes: "Scripting-focused - targets technical users",
  },
  {
    name: "Interactive Fiction Technology Foundation",
    country: "USA",
    website: "https://twinery.org",
    products: ["Twine"],
    targetMarket: "architect",
    threatLevel: 1,
    fundingStage: "Nonprofit",
    differentiator: "Free hypertext interactive fiction tool",
    strengths: ["Lowest barrier to entry", "Huge hobbyist community"],
    weaknesses: ["Not professional grade", "Hobbyist focus"],
    pricingInfo: "Free (open source)",
    notes: "Entry-level - Twine users graduate to better tools",
  },
  {
    name: "Dialogic (Godot)",
    country: "Remote",
    website: "https://dialogic.pro",
    products: ["Dialogic"],
    targetMarket: "architect",
    threatLevel: 2,
    fundingStage: "Open source",
    differentiator: "Godot plugin for dialogue/VN creation",
    strengths: ["Growing with Godot", "3K Discord", "Open source"],
    weaknesses: ["Godot only"],
    pricingInfo: "Free (Patreon support)",
    notes: "Growing fast with Godot ecosystem",
  },
];

async function seedCompetitors() {
  console.log("Seeding competitors...\n");

  // Get the competition pipeline or create default
  const pipelinesSnapshot = await db.collection("pipelines").where("type", "==", "competition").get();

  let pipelineId = "competition-default";
  let stageId = "monitoring";

  if (!pipelinesSnapshot.empty) {
    const pipeline = pipelinesSnapshot.docs[0];
    pipelineId = pipeline.id;
    const stages = pipeline.data().stages || [];
    if (stages.length > 0) {
      stageId = stages[0].id;
    }
    console.log(`Found competition pipeline: ${pipelineId}, first stage: ${stageId}`);
  } else {
    console.log("No competition pipeline found, using defaults");
  }

  // Get createdBy from existing lead
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
  let created = 0;
  let skipped = 0;

  for (const competitor of competitors) {
    // Check if competitor already exists
    const existingSnapshot = await db.collection("leads")
      .where("name", "==", competitor.name)
      .get();

    if (!existingSnapshot.empty) {
      console.log(`Skipping ${competitor.name} - already exists`);
      skipped++;
      continue;
    }

    const leadData = {
      type: "competition",
      name: competitor.name,
      status: "monitoring",
      priority: competitor.threatLevel >= 4 ? "high" : competitor.threatLevel >= 3 ? "medium" : "low",
      owner: "",
      contact: {
        name: "",
        role: "",
        email: "",
        phone: "",
        linkedin: "",
      },
      website: competitor.website,
      country: competitor.country,
      location: competitor.country,
      tags: [competitor.targetMarket],
      notes: competitor.notes,
      competition: {
        products: competitor.products,
        targetMarket: competitor.targetMarket,
        threatLevel: competitor.threatLevel,
        strengths: competitor.strengths,
        weaknesses: competitor.weaknesses,
        fundingStage: competitor.fundingStage || "",
        teamSize: competitor.teamSize || "",
        foundedYear: competitor.foundedYear || null,
        differentiator: competitor.differentiator,
        pricingInfo: competitor.pricingInfo || "",
        lastChecked: now,
      },
      pipeline: {
        pipelineId: pipelineId,
        stageId: stageId,
        enteredStageAt: now,
      },
      createdAt: now,
      updatedAt: now,
      createdBy: createdBy,
    };

    const leadRef = await db.collection("leads").add(leadData);
    console.log(`Created ${competitor.name} with ID: ${leadRef.id}`);
    created++;
  }

  console.log(`\nSeed completed! Created: ${created}, Skipped: ${skipped}`);
}

// Run the seed function
seedCompetitors()
  .then(() => {
    console.log("\nDone!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding data:", error);
    process.exit(1);
  });
