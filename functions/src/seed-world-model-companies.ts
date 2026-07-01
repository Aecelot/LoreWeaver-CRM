/**
 * Seed script to add World Model / Video Generation companies as competition
 * 
 * These are potential future competitors or partners for Director's
 * emergent narrative capabilities - they're building world simulation tech.
 *
 * Run with: npx ts-node src/seed-world-model-companies.ts
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
  fundingTotal?: string;
  valuation?: string;
  teamSize?: string;
  differentiator: string;
  strengths: string[];
  weaknesses: string[];
  pricingInfo?: string;
  notes: string;
}

const competitors: CompetitorData[] = [
  {
    name: "World Labs",
    country: "USA",
    website: "https://www.worldlabs.ai",
    products: ["Large World Models (LWMs)", "Marble (3D world generation)"],
    targetMarket: "director",
    threatLevel: 5,
    foundedYear: 2024,
    fundingStage: "Series B",
    fundingTotal: "$230M+",
    valuation: "$5B (Jan 2026)",
    differentiator: "Spatial intelligence - AI that perceives, generates, and interacts with 3D environments",
    strengths: [
      "Founded by Fei-Fei Li ('godmother of AI')",
      "Backed by a16z, NVIDIA, Radical Ventures",
      "Stanford AI Lab pedigree",
      "3D world generation from single image",
      "Massive valuation growth ($1B to $5B in 18 months)"
    ],
    weaknesses: [
      "No public product yet (as of early 2026)",
      "Focus on 3D environments, not narrative",
      "Research-heavy, unclear commercialization path"
    ],
    notes: "Most direct long-term threat if they move into game/narrative space. Watch closely.",
  },
  {
    name: "Runway",
    country: "USA",
    website: "https://runwayml.com",
    products: ["Gen-3 Alpha", "World Model (Dec 2025)", "Runway Studios"],
    targetMarket: "director",
    threatLevel: 4,
    foundedYear: 2018,
    fundingStage: "Series E",
    fundingTotal: "$544M+",
    valuation: "$5.3B (Feb 2026)",
    teamSize: "100-200",
    differentiator: "Video generation pioneer with world model ambitions",
    strengths: [
      "Market leader in AI video generation",
      "Gen-3 sets quality benchmark",
      "Strong creative/film industry adoption",
      "Runway Studios for original content",
      "$90M+ ARR (est. 2025)"
    ],
    weaknesses: [
      "Video focus, not interactive worlds",
      "World model just launched (Dec 2025)",
      "Expensive for indie/game studios"
    ],
    pricingInfo: "Standard $15/mo, Pro $35/mo, Enterprise custom",
    notes: "Could pivot to games. Their world model release signals strategic interest.",
  },
  {
    name: "Google DeepMind (Genie)",
    country: "UK/USA",
    website: "https://deepmind.google",
    products: ["Genie 2", "Genie 3", "Project Genie"],
    targetMarket: "director",
    threatLevel: 5,
    fundingStage: "Big Tech",
    differentiator: "Foundation world model that generates interactive, playable 3D environments",
    strengths: [
      "First to demo playable AI-generated worlds",
      "Google resources (compute, data, talent)",
      "Genie 3 available via Google AI Ultra (Feb 2026)",
      "Real-time physics simulation",
      "Can generate game-like environments from text/image"
    ],
    weaknesses: [
      "Not a product company",
      "Focus on research/AGI, not game dev tools",
      "Limited commercial availability",
      "Genie worlds limited to ~minutes of play"
    ],
    notes: "Research threat. If Google productizes this for game dev, major disruption. Monitor Project Genie rollout.",
  },
  {
    name: "Decart",
    country: "Israel",
    website: "https://decart.ai",
    products: ["Oasis (Minecraft-style world model)", "MirageLSD"],
    targetMarket: "director",
    threatLevel: 4,
    foundedYear: 2023,
    fundingStage: "Series B",
    fundingTotal: "$153M+",
    valuation: "$3.1B (Aug 2025)",
    differentiator: "Real-time world model - fastest generative AI for interactive experiences",
    strengths: [
      "Oasis reached 1M+ users in 3 days",
      "Real-time generation (playable Minecraft clone)",
      "Backed by Sequoia, Benchmark",
      "Already profitable (enterprise AI optimization)",
      "Partnership with Etched for custom hardware"
    ],
    weaknesses: [
      "Oasis is a tech demo, not a game engine",
      "Quality limited vs traditional engines",
      "No narrative capabilities"
    ],
    notes: "Most game-relevant competitor. Their real-time approach could be huge for emergent gameplay.",
  },
  {
    name: "Odyssey",
    country: "USA",
    website: "https://odyssey.ml",
    products: ["Odyssey-2 (world model)", "Interactive Video"],
    targetMarket: "director",
    threatLevel: 3,
    foundedYear: 2023,
    fundingStage: "Series A",
    fundingTotal: "$18M+",
    differentiator: "General-purpose world models trained on real-world data via sensor backpacks",
    strengths: [
      "Founded by self-driving veterans (Oliver Cameron)",
      "Backed by Pixar co-founder Ed Catmull",
      "NVIDIA & Samsung investment (Feb 2026)",
      "Unique data collection approach",
      "Interactive video streaming at 40ms"
    ],
    weaknesses: [
      "Early stage vs competitors",
      "Limited funding compared to others",
      "No game-specific features"
    ],
    notes: "Interesting approach. Could be partnership target for photorealistic world generation.",
  },
  {
    name: "Luma AI",
    country: "USA",
    website: "https://lumalabs.ai",
    products: ["Dream Machine", "Ray2", "3D Gaussian Splatting"],
    targetMarket: "director",
    threatLevel: 3,
    foundedYear: 2021,
    fundingStage: "Series C",
    fundingTotal: "$1B+",
    valuation: "$4B+ (Nov 2025)",
    differentiator: "Video generation with multimodal AGI ambitions",
    strengths: [
      "Massive $900M Series C (Nov 2025)",
      "Dream Machine quality competitive with Runway",
      "Used by major studios and agencies",
      "Building 2GW AI supercluster in Saudi Arabia"
    ],
    weaknesses: [
      "Video focus, not interactive/games",
      "No world model product yet",
      "Dependent on Saudi investment (geopolitical risk)"
    ],
    pricingInfo: "Free tier, Pro plans, Enterprise custom",
    notes: "Monitor for game dev features. Their resources could enable rapid pivot.",
  },
  {
    name: "Pika Labs",
    country: "USA",
    website: "https://pika.art",
    products: ["Pika 2.0"],
    targetMarket: "director",
    threatLevel: 2,
    foundedYear: 2023,
    fundingStage: "Series B",
    fundingTotal: "$135M",
    valuation: "$470-700M (2024)",
    differentiator: "Consumer-friendly video generation with character consistency",
    strengths: [
      "Fast iteration on features",
      "Character consistency (Pika 2.0)",
      "Strong consumer adoption",
      "Potential Meta acquisition target"
    ],
    weaknesses: [
      "Smaller than Runway/Luma",
      "No world model focus",
      "Consumer, not enterprise/game focus"
    ],
    notes: "Less relevant to Director but worth monitoring. Could be acquired and scaled.",
  },
  {
    name: "Genmo",
    country: "USA",
    website: "https://www.genmo.ai",
    products: ["Mochi 1 (open source)"],
    targetMarket: "director",
    threatLevel: 2,
    foundedYear: 2022,
    fundingStage: "Series A",
    fundingTotal: "$28.4M",
    differentiator: "Open source video generation - 'right brain of AGI'",
    strengths: [
      "Mochi 1 is open source (Apache 2.0)",
      "Strong motion quality",
      "Can be self-hosted/fine-tuned",
      "NEA-backed"
    ],
    weaknesses: [
      "Lower resolution (480p)",
      "Smaller funding than competitors",
      "Open source = harder to monetize"
    ],
    notes: "Potential integration target for Director. Open source makes experimentation possible.",
  },
  {
    name: "Haiper",
    country: "UK",
    website: "https://haiper.ai",
    products: ["Haiper 2.0"],
    targetMarket: "director",
    threatLevel: 2,
    foundedYear: 2023,
    fundingStage: "Pre-Series A",
    fundingTotal: "$19.2M",
    differentiator: "DeepMind alumni building video generation with unique architecture",
    strengths: [
      "Founded by ex-DeepMind (Yishu Miao, Ziyu Wang)",
      "Fast iteration",
      "London-based (EU market access)"
    ],
    weaknesses: [
      "Early stage",
      "Limited funding",
      "Competing against much larger players"
    ],
    notes: "UK presence interesting for EU partnerships. Watch for Series A.",
  },
  {
    name: "Etched",
    country: "USA",
    website: "https://www.etched.com",
    products: ["Sohu ASIC chip"],
    targetMarket: "director",
    threatLevel: 2,
    foundedYear: 2022,
    fundingStage: "Series B",
    fundingTotal: "$620M+",
    valuation: "$5B (Mar 2026)",
    differentiator: "Custom silicon for transformers - enables real-time world models",
    strengths: [
      "10x+ faster than GPUs for transformers",
      "Partnership with Decart",
      "Could make on-device world models viable",
      "Massive recent funding"
    ],
    weaknesses: [
      "Hardware company, not software",
      "Only works with transformer models",
      "No direct game dev offering"
    ],
    notes: "Enabling tech for Director's on-device goals. If Sohu delivers, could be key partner.",
  },
];

async function seedWorldModelCompanies() {
  console.log("Seeding world model / video generation companies...\n");

  // Get the competition pipeline
  const pipelinesSnapshot = await db.collection("pipelines").where("type", "==", "competition").get();

  let pipelineId = "MUCFmGdpqPYAT0tKSAWs"; // Competition pipeline ID from MEMORY.md
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
      tags: [competitor.targetMarket, "world-model", "video-generation"],
      notes: competitor.notes,
      competition: {
        products: competitor.products,
        targetMarket: competitor.targetMarket,
        threatLevel: competitor.threatLevel,
        strengths: competitor.strengths,
        weaknesses: competitor.weaknesses,
        fundingStage: competitor.fundingStage || "",
        fundingTotal: competitor.fundingTotal || "",
        valuation: competitor.valuation || "",
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
seedWorldModelCompanies()
  .then(() => {
    console.log("\nDone!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding data:", error);
    process.exit(1);
  });
