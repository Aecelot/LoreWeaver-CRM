/**
 * Seed script to add MORE World Model / Video Generation companies
 * Part 2 - Big Tech + Chinese players + specialized startups
 *
 * Run with: npx ts-node src/seed-world-model-companies-2.ts
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
  // Big Tech
  {
    name: "OpenAI (Sora)",
    country: "USA",
    website: "https://openai.com/sora",
    products: ["Sora", "Sora 2"],
    targetMarket: "director",
    threatLevel: 5,
    fundingStage: "Big Tech",
    fundingTotal: "$13B+",
    valuation: "$157B (2024)",
    differentiator: "Flagship video model positioned as 'world simulator'",
    strengths: [
      "OpenAI brand and distribution",
      "Sora 2 maintains 'world state' across shots",
      "ChatGPT integration potential",
      "Massive compute resources",
      "First-mover awareness in text-to-video"
    ],
    weaknesses: [
      "Slow to ship (Feb 2024 preview, Dec 2024 launch)",
      "Expensive ($200/mo for Pro)",
      "Not focused on games specifically",
      "Safety concerns limit availability"
    ],
    pricingInfo: "Plus $20/mo, Pro $200/mo",
    notes: "The 800-lb gorilla. If OpenAI pivots to games/interactive, massive threat.",
  },
  {
    name: "Google DeepMind (Veo)",
    country: "USA",
    website: "https://deepmind.google/technologies/veo/",
    products: ["Veo", "Veo 2", "Veo 3", "Veo 3.1"],
    targetMarket: "director",
    threatLevel: 4,
    fundingStage: "Big Tech",
    differentiator: "Google's answer to Sora - video generation with native audio",
    strengths: [
      "Veo 3 generates synchronized audio",
      "Available via Vertex AI API",
      "Integrated into Google ecosystem",
      "Rapid iteration (3 versions in 1 year)"
    ],
    weaknesses: [
      "Plays second fiddle to Sora in mindshare",
      "Enterprise focus, limited consumer access",
      "Not game-focused"
    ],
    notes: "Combined with Genie, Google has both video gen AND world models. Watch for convergence.",
  },

  // Chinese Players
  {
    name: "Kuaishou (Kling AI)",
    country: "China",
    website: "https://kling.kuaishou.com",
    products: ["Kling 2.6", "Kling O1"],
    targetMarket: "director",
    threatLevel: 4,
    fundingStage: "Public (HK:01024)",
    valuation: "~$20B (public)",
    differentiator: "China's leading video gen model - quality rivals Sora",
    strengths: [
      "Kling O1 is 'unified multimodal video model'",
      "Integrated with DeepSeek for reasoning",
      "Now standalone business unit",
      "Competitive with Western models on quality"
    ],
    weaknesses: [
      "Limited availability outside China",
      "Geopolitical/regulatory barriers for Western studios",
      "Chinese language focus"
    ],
    notes: "If Western studios can access, very competitive. Watch for global expansion.",
  },
  {
    name: "ByteDance (Jimeng/Doubao)",
    country: "China",
    website: "https://jimeng.jianying.com",
    products: ["Jimeng AI", "Seedance 1.5", "PixelDance", "Seaweed"],
    targetMarket: "director",
    threatLevel: 4,
    fundingStage: "Private (Big Tech)",
    valuation: "~$300B (ByteDance overall)",
    differentiator: "TikTok parent's video gen - massive distribution potential",
    strengths: [
      "Integrated with Jianying (CapCut equivalent)",
      "ByteDance's understanding of viral content",
      "Multiple model variants (PixelDance, Seaweed)",
      "DiT architecture similar to Sora"
    ],
    weaknesses: [
      "TikTok ban uncertainty affects perception",
      "China-first availability",
      "Not game-focused"
    ],
    notes: "ByteDance knows content virality. If they target games, serious threat via distribution.",
  },
  {
    name: "MiniMax (Hailuo AI)",
    country: "China",
    website: "https://hailuoai.com",
    products: ["Hailuo 02", "Video-01"],
    targetMarket: "director",
    threatLevel: 3,
    foundedYear: 2021,
    fundingStage: "Series B",
    fundingTotal: "$600M+",
    valuation: "$2.5B (Mar 2024)",
    differentiator: "One of China's 'AI six tigers' - AGI-oriented",
    strengths: [
      "Backed by Alibaba and Tencent",
      "Strong research team (ex-SenseTime)",
      "Fast feature iteration",
      "Available globally"
    ],
    weaknesses: [
      "Less name recognition in West",
      "Competing against much larger Chinese players"
    ],
    notes: "Most globally accessible Chinese player. Worth testing Hailuo for comparison.",
  },
  {
    name: "Stability AI",
    country: "UK/USA",
    website: "https://stability.ai",
    products: ["Stable Video Diffusion", "Stable Video 4D"],
    targetMarket: "director",
    threatLevel: 3,
    foundedYear: 2020,
    fundingStage: "Series A",
    fundingTotal: "$225M+",
    valuation: "$1B (2022, likely down)",
    differentiator: "Open source video generation - self-hostable",
    strengths: [
      "Open source model weights",
      "Can run on-device/on-prem",
      "Large community",
      "Stable Video 4D for novel view synthesis"
    ],
    weaknesses: [
      "Company turmoil (CEO departure 2024)",
      "Quality behind Runway/Sora",
      "Business model struggles"
    ],
    pricingInfo: "API-based + self-host",
    notes: "Open source angle relevant for Director. Could fine-tune for game use cases.",
  },

  // Specialized Startups
  {
    name: "Higgsfield",
    country: "USA",
    website: "https://higgsfield.ai",
    products: ["Higgsfield Video Engine"],
    targetMarket: "director",
    threatLevel: 3,
    foundedYear: 2023,
    fundingStage: "Series A+",
    fundingTotal: "$138M+",
    valuation: "$1.3B (Jan 2026)",
    differentiator: "'Click-to-video' AI for social media - fastest to viral content",
    strengths: [
      "$200M ARR in 2025 (claimed)",
      "Backed by Accel, Menlo, a16z",
      "Fast generation for short-form",
      "Social-first positioning"
    ],
    weaknesses: [
      "Social focus, not games",
      "Short-form only currently",
      "Consumer, not enterprise"
    ],
    notes: "Interesting growth trajectory. Social-to-games not impossible.",
  },
  {
    name: "Hedra",
    country: "USA",
    website: "https://www.hedra.com",
    products: ["Character-1", "Hedra API"],
    targetMarket: "director",
    threatLevel: 3,
    foundedYear: 2024,
    fundingStage: "Series A",
    fundingTotal: "$44M",
    differentiator: "Digital character foundation models - lip-sync and animation",
    strengths: [
      "a16z + Amazon Alexa Fund backed",
      "Character-focused (NPC-relevant)",
      "Fast audio-to-video lip sync",
      "Brand avatar use cases"
    ],
    weaknesses: [
      "Narrow focus on characters only",
      "Early stage",
      "Not full world generation"
    ],
    notes: "Character animation directly relevant to Director NPCs. Potential integration partner.",
  },
  {
    name: "VERSES AI",
    country: "Canada",
    website: "https://www.verses.ai",
    products: ["Genius (active inference platform)"],
    targetMarket: "director",
    threatLevel: 2,
    foundedYear: 2021,
    fundingStage: "Public (CBOE:VERS)",
    differentiator: "Active inference world models - Karl Friston's approach",
    strengths: [
      "Karl Friston as Chief Scientist",
      "Active inference is more sample-efficient",
      "Different architecture than transformers",
      "Robotics applications proven"
    ],
    weaknesses: [
      "Very research-focused",
      "Unproven at scale",
      "Small cap public company",
      "Not video generation focused"
    ],
    notes: "Wild card. Active inference could be paradigm shift. Worth tracking academically.",
  },
];

async function seedWorldModelCompanies2() {
  console.log("Seeding world model / video generation companies (Part 2)...\n");

  // Get the competition pipeline
  const pipelinesSnapshot = await db.collection("pipelines").where("type", "==", "competition").get();

  let pipelineId = "MUCFmGdpqPYAT0tKSAWs";
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
seedWorldModelCompanies2()
  .then(() => {
    console.log("\nDone!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding data:", error);
    process.exit(1);
  });
