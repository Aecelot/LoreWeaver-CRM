/**
 * Batch import competitors from overnight research CSVs
 *
 * Run with: npx ts-node src/seed-batch-competitors.ts
 */

import * as admin from "firebase-admin";
import { Timestamp } from "firebase-admin/firestore";
import * as fs from "fs";
import * as path from "path";

// Initialize Firebase Admin with explicit project ID
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: "loreweaver-crm",
  });
}

const db = admin.firestore();

// CSV directory
const CSV_DIR = "C:\\Users\\rijkg\\clawd\\research\\competitors-batch";

// Map topic number to target market
const topicToMarket: { [key: string]: "architect" | "director" | "both" } = {
  "02": "director",    // AI NPC startups
  "03": "architect",   // RPG dialogue tools
  "04": "director",    // LLM game integration
  "05": "architect",   // Interactive fiction
  "06": "director",    // Voice AI gaming
  "07": "architect",   // Unity dialogue assets
  "08": "director",    // Procedural narrative
  "09": "architect",   // Game writing software
  "10": "director",    // NPC behavior AI
  "11": "architect",   // Godot narrative plugins
  "12": "director",    // AI Dungeon competitors
  "14": "both",        // Chinese game AI
  "15": "architect",   // Worldbuilding tools
  "16": "director",    // Character AI tools
  "17": "architect",   // Choice game publishers
  "18": "both",        // Academic narrative AI
  "19": "architect",   // GDD tools
  "20": "director",    // Simulation AI
};

function parseCSV(content: string): Array<{ [key: string]: string }> {
  const lines = content.trim().split("\n");
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]);
  const rows: Array<{ [key: string]: string }> = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const row: { [key: string]: string } = {};
    headers.forEach((header, idx) => {
      row[header] = values[idx] || "";
    });
    rows.push(row);
  }

  return rows;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function parseFunding(fundingStr: string): { amount: number | null; stage: string } {
  if (!fundingStr) return { amount: null, stage: "" };

  const cleanStr = fundingStr.replace(/[,$]/g, "").toLowerCase();

  // Extract stage
  let stage = "";
  if (cleanStr.includes("series a")) stage = "Series A";
  else if (cleanStr.includes("series b")) stage = "Series B";
  else if (cleanStr.includes("series c")) stage = "Series C";
  else if (cleanStr.includes("seed")) stage = "Seed";
  else if (cleanStr.includes("pre-seed")) stage = "Pre-Seed";

  // Extract amount
  let amount: number | null = null;
  const match = cleanStr.match(/(\d+(?:\.\d+)?)\s*(m|k|b)?/i);
  if (match) {
    amount = parseFloat(match[1]);
    const multiplier = match[2]?.toLowerCase();
    if (multiplier === "m") amount *= 1000000;
    else if (multiplier === "k") amount *= 1000;
    else if (multiplier === "b") amount *= 1000000000;
  }

  return { amount, stage };
}

function determineThreatLevel(row: { [key: string]: string }, targetMarket: string): number {
  const funding = parseFunding(row.Funding || "");
  const notes = (row.Notes || "").toLowerCase();

  // High threat indicators
  if (funding.amount && funding.amount > 15000000) return 5;
  if (notes.includes("aaa") || notes.includes("industry leader")) return 5;

  // Medium-high threat
  if (funding.amount && funding.amount > 5000000) return 4;
  if (notes.includes("working with") && notes.includes("studio")) return 4;

  // Medium threat
  if (funding.amount && funding.amount > 1000000) return 3;
  if (row.Stage && ["Series A", "Series B"].includes(row.Stage)) return 3;

  // Low threat
  if (notes.includes("open source") || notes.includes("free")) return 2;
  if (notes.includes("hobbyist") || notes.includes("academic")) return 1;

  return 3; // Default medium
}

async function seedBatchCompetitors() {
  console.log("Batch importing competitors from overnight research...\n");

  // Get the competition pipeline
  const pipelinesSnapshot = await db.collection("pipelines").where("type", "==", "competition").get();

  let pipelineId = "competition-default";
  let stageId = "new";

  if (!pipelinesSnapshot.empty) {
    const pipeline = pipelinesSnapshot.docs[0];
    pipelineId = pipeline.id;
    const stages = pipeline.data().stages || [];
    if (stages.length > 0) {
      stageId = stages[0].id;
    }
    console.log(`Found competition pipeline: ${pipelineId}, first stage: ${stageId}`);
  }

  // Get createdBy from existing lead
  const usersSnapshot = await db.collection("leads").limit(1).get();
  let createdBy = "system";
  if (!usersSnapshot.empty) {
    const existingLead = usersSnapshot.docs[0].data();
    if (existingLead.createdBy) {
      createdBy = existingLead.createdBy;
    }
  }
  console.log(`Using createdBy: ${createdBy}\n`);

  const now = Timestamp.now();
  let totalCreated = 0;
  let totalSkipped = 0;

  // Get existing lead names for deduplication
  const existingLeadsSnapshot = await db.collection("leads").select("name").get();
  const existingNames = new Set(existingLeadsSnapshot.docs.map(doc => doc.data().name?.toLowerCase()));
  console.log(`Found ${existingNames.size} existing leads to check against\n`);

  // Process each CSV
  const csvFiles = fs.readdirSync(CSV_DIR).filter(f => f.endsWith(".csv"));

  for (const csvFile of csvFiles) {
    const topicNum = csvFile.split("-")[0];
    const targetMarket = topicToMarket[topicNum] || "both";

    console.log(`\n📁 Processing ${csvFile} (${targetMarket})...`);

    const csvPath = path.join(CSV_DIR, csvFile);
    const content = fs.readFileSync(csvPath, "utf-8");
    const rows = parseCSV(content);

    let created = 0;
    let skipped = 0;

    for (const row of rows) {
      const name = row.Name?.trim();
      if (!name) continue;

      // Check for duplicates (case-insensitive)
      if (existingNames.has(name.toLowerCase())) {
        skipped++;
        continue;
      }

      const funding = parseFunding(row.Funding || row.Stage || "");
      const threatLevel = determineThreatLevel(row, targetMarket);

      // Normalize website
      let website = row.Website || "";
      if (website && !website.startsWith("http")) {
        website = `https://${website}`;
      }

      const leadData = {
        type: "competition",
        name: name,
        status: "monitoring",
        priority: threatLevel >= 4 ? "high" : threatLevel >= 3 ? "medium" : "low",
        owner: "",
        contact: {
          name: "",
          role: "",
          email: "",
          phone: "",
          linkedin: "",
        },
        website: website,
        country: row.Country || "",
        location: row.Country || "",
        tags: [targetMarket, topicNum],
        notes: row.Notes || "",
        competition: {
          products: row.Product ? [row.Product] : [],
          targetMarket: targetMarket,
          threatLevel: threatLevel,
          strengths: [],
          weaknesses: [],
          fundingStage: funding.stage || row.Stage || "",
          fundingAmount: funding.amount,
          teamSize: "",
          foundedYear: null,
          differentiator: row.Differentiator || "",
          pricingInfo: "",
          lastChecked: now,
          sourceFile: csvFile,
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

      try {
        await db.collection("leads").add(leadData);
        existingNames.add(name.toLowerCase()); // Add to set to prevent duplicates within batch
        created++;
      } catch (err) {
        console.error(`  ❌ Error adding ${name}:`, err);
      }
    }

    console.log(`  ✓ Created: ${created}, Skipped: ${skipped}`);
    totalCreated += created;
    totalSkipped += skipped;
  }

  console.log(`\n========================================`);
  console.log(`TOTAL: Created ${totalCreated}, Skipped ${totalSkipped}`);
  console.log(`========================================`);
}

// Run
seedBatchCompetitors()
  .then(() => {
    console.log("\nDone!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
