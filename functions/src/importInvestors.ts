/**
 * One-time import script for investor data from Excel files
 *
 * Prerequisites:
 * 1. Install dependencies: cd functions && npm install
 * 2. Login to Google Cloud: gcloud auth application-default login
 * 3. Set project: gcloud config set project loreweaver-crm
 *
 * Run with: npm run import:investors
 */

import * as admin from "firebase-admin";
import * as XLSX from "xlsx";
import * as path from "path";

// Initialize Firebase Admin with application default credentials
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: "loreweaver-crm",
  });
}

const db = admin.firestore();

// Configure Firestore to ignore undefined values
db.settings({ ignoreUndefinedProperties: true });

// Types
interface ExcelRow {
  Logo?: string;
  "VC Name"?: string;
  Websites?: string;
  Country?: string;
  "Investment Size"?: string;
  Sectors?: string;
  "General Email"?: string;
  Rounds?: string;
  "Portfolio Link"?: string;
  "Partners' LinkedIn Profile"?: string;
  "Partners' LinkedIn Profile (2)"?: string;
  "Partners' LinkedIn Profile (3)"?: string;
  "Country 1"?: string;
  "Country 2"?: string;
}

interface ImportStats {
  processed: number;
  created: number;
  skipped: number;
  contactsCreated: number;
  errors: string[];
}

// Safely convert any value to string
function toStr(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value.trim();
  return String(value).trim();
}

// Extract name from LinkedIn URL
function extractNameFromLinkedIn(linkedinUrl: string): string {
  if (!linkedinUrl) return "";

  // Extract the slug from the URL
  // e.g., https://www.linkedin.com/in/spencer-lake-a4924629/ -> spencer-lake
  const match = linkedinUrl.match(/linkedin\.com\/in\/([^/?]+)/);
  if (!match) return "";

  const slug = match[1];
  // Remove trailing numbers and convert dashes to spaces, capitalize
  const nameParts = slug
    .replace(/-[a-f0-9]{6,}$/, "") // Remove trailing hex IDs
    .replace(/-\d+$/, "") // Remove trailing numbers
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase());

  return nameParts.join(" ");
}

// Parse sectors into tags
function parseSectors(sectors: string): string[] {
  if (!sectors) return [];

  return sectors
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map((s) => s.toLowerCase().replace(/\s+/g, "-")); // Convert to slug format
}

// Get the first country from a potentially multi-country string
function parseCountry(country: string): string {
  if (!country) return "";
  // Handle "United States, France" -> "United States"
  return country.split(",")[0].trim();
}

// Get geographical regions from country fields
function parseRegions(country1?: string, country2?: string): string[] {
  const regions: string[] = [];
  if (country1?.trim()) regions.push(country1.trim());
  if (country2?.trim()) regions.push(country2.trim());
  return regions;
}

async function getInvestorPipeline(): Promise<{ pipelineId: string; stageId: string } | null> {
  const pipelinesSnapshot = await db.collection("pipelines").where("type", "==", "investor").get();

  if (pipelinesSnapshot.empty) {
    console.error("No investor pipeline found! Please create one first.");
    return null;
  }

  const pipeline = pipelinesSnapshot.docs[0];
  const data = pipeline.data();

  // Find the first stage (should be "Identified" or "New Lead")
  const firstStage = data.stages?.find((s: { order: number }) => s.order === 1);

  return {
    pipelineId: pipeline.id,
    stageId: firstStage?.id || "identified",
  };
}

async function getExistingLeads(): Promise<Set<string>> {
  const existingNames = new Set<string>();
  const existingWebsites = new Set<string>();

  const leadsSnapshot = await db.collection("leads").where("type", "==", "investor").get();

  leadsSnapshot.docs.forEach((doc) => {
    const data = doc.data();
    if (data.name) {
      existingNames.add(data.name.toLowerCase().trim());
    }
    if (data.website) {
      // Normalize website for comparison
      const normalizedWebsite = data.website
        .toLowerCase()
        .replace(/^https?:\/\//, "")
        .replace(/^www\./, "")
        .replace(/\/$/, "");
      existingWebsites.add(normalizedWebsite);
    }
  });

  // Combine into a single set for quick lookup
  const combined = new Set<string>();
  existingNames.forEach((n) => combined.add(`name:${n}`));
  existingWebsites.forEach((w) => combined.add(`website:${w}`));

  return combined;
}

function isDuplicate(name: string, website: string, existing: Set<string>): boolean {
  const normalizedName = name.toLowerCase().trim();
  const normalizedWebsite = website
    ?.toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "") || "";

  return existing.has(`name:${normalizedName}`) ||
         (normalizedWebsite !== "" && existing.has(`website:${normalizedWebsite}`));
}

async function importFile(
  filePath: string,
  pipelineConfig: { pipelineId: string; stageId: string },
  existingLeads: Set<string>,
  userId: string
): Promise<ImportStats> {
  const stats: ImportStats = {
    processed: 0,
    created: 0,
    skipped: 0,
    contactsCreated: 0,
    errors: [],
  };

  console.log(`\nReading file: ${filePath}`);

  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows: ExcelRow[] = XLSX.utils.sheet_to_json(sheet);

  console.log(`Found ${rows.length} rows to process`);

  let batch = db.batch();
  let batchCount = 0;
  const MAX_BATCH_SIZE = 400; // Firestore limit is 500, leave room for contacts

  for (const row of rows) {
    stats.processed++;

    const vcName = toStr(row["VC Name"]);
    const website = toStr(row["Websites"]);

    if (!vcName) {
      stats.skipped++;
      continue;
    }

    // Check for duplicates
    if (isDuplicate(vcName, website, existingLeads)) {
      stats.skipped++;
      continue;
    }

    // Add to existing set to prevent duplicates within this import
    existingLeads.add(`name:${vcName.toLowerCase()}`);
    if (website) {
      const normalizedWebsite = website
        .toLowerCase()
        .replace(/^https?:\/\//, "")
        .replace(/^www\./, "")
        .replace(/\/$/, "");
      existingLeads.add(`website:${normalizedWebsite}`);
    }

    try {
      // Extract all string fields using toStr
      const generalEmail = toStr(row["General Email"]);
      const linkedIn1 = toStr(row["Partners' LinkedIn Profile"]);
      const country = toStr(row["Country"]);
      const sectors = toStr(row["Sectors"]);
      const rounds = toStr(row["Rounds"]);
      const investmentSize = toStr(row["Investment Size"]);
      const country1 = toStr(row["Country 1"]);
      const country2 = toStr(row["Country 2"]);

      // Create the lead document
      const leadRef = db.collection("leads").doc();
      const leadData = {
        name: vcName,
        type: "investor",
        status: "active",
        priority: "none" as const,
        category: "prospect",
        owner: userId,
        contact: {
          name: "",
          email: generalEmail,
          role: "",
          phone: "",
          linkedin: linkedIn1,
        },
        website: website,
        country: parseCountry(country),
        location: "",
        notes: "",
        tags: parseSectors(sectors),
        investor: {
          type: rounds,
          founded: "",
          investmentFocus: sectors,
          fundingPreferences: investmentSize,
          geographicalRegions: parseRegions(country1, country2),
          hqRegion: parseCountry(country),
          fitScore: undefined,
        },
        pipeline: {
          pipelineId: pipelineConfig.pipelineId,
          stageId: pipelineConfig.stageId,
          enteredStageAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        createdBy: userId,
      };

      batch.set(leadRef, leadData);
      batchCount++;

      // Create contacts for each partner LinkedIn
      const linkedInProfiles = [
        toStr(row["Partners' LinkedIn Profile"]),
        toStr(row["Partners' LinkedIn Profile (2)"]),
        toStr(row["Partners' LinkedIn Profile (3)"]),
      ].filter((url) => url !== "");

      for (const linkedIn of linkedInProfiles) {
        const contactName = extractNameFromLinkedIn(linkedIn);
        if (!contactName) continue;

        // Create contact
        const contactRef = db.collection("contacts").doc();
        batch.set(contactRef, {
          name: contactName,
          email: "",
          role: "Partner",
          phone: "",
          linkedin: linkedIn,
          company: vcName,
          tags: [],
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          createdBy: userId,
        });
        batchCount++;

        // Create lead-contact link
        const linkRef = db.collection("leadContacts").doc();
        batch.set(linkRef, {
          leadId: leadRef.id,
          contactId: contactRef.id,
          isPrimary: linkedIn === linkedInProfiles[0], // First one is primary
          role: "Partner",
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          createdBy: userId,
        });
        batchCount++;
        stats.contactsCreated++;
      }

      stats.created++;

      // Commit batch if approaching limit
      if (batchCount >= MAX_BATCH_SIZE) {
        console.log(`Committing batch of ${batchCount} operations...`);
        await batch.commit();
        batch = db.batch(); // Create new batch
        batchCount = 0;
      }

    } catch (error) {
      stats.errors.push(`${vcName}: ${error instanceof Error ? error.message : "Unknown error"}`);
    }

    // Progress update
    if (stats.processed % 100 === 0) {
      console.log(`Processed ${stats.processed}/${rows.length} rows...`);
    }
  }

  // Commit remaining batch
  if (batchCount > 0) {
    console.log(`Committing final batch of ${batchCount} operations...`);
    await batch.commit();
  }

  return stats;
}

async function main() {
  console.log("=".repeat(60));
  console.log("Investor Import Script");
  console.log("=".repeat(60));

  // Get pipeline configuration
  const pipelineConfig = await getInvestorPipeline();
  if (!pipelineConfig) {
    process.exit(1);
  }
  console.log(`Using pipeline: ${pipelineConfig.pipelineId}, stage: ${pipelineConfig.stageId}`);

  // Get existing leads for duplicate detection
  console.log("\nFetching existing leads for duplicate detection...");
  const existingLeads = await getExistingLeads();
  console.log(`Found ${existingLeads.size / 2} existing investor leads`);

  // Default user ID - you can change this
  const userId = "import-script";

  // File paths
  const dataDir = path.join(__dirname, "../../data");
  const files = [
    path.join(dataDir, "VB_VC Europe Seed & Series A database.xlsx"),
    path.join(dataDir, "Filtered_Angels_VCs_PreSeed.xlsx"),
  ];

  let totalStats: ImportStats = {
    processed: 0,
    created: 0,
    skipped: 0,
    contactsCreated: 0,
    errors: [],
  };

  for (const file of files) {
    const stats = await importFile(file, pipelineConfig, existingLeads, userId);

    totalStats.processed += stats.processed;
    totalStats.created += stats.created;
    totalStats.skipped += stats.skipped;
    totalStats.contactsCreated += stats.contactsCreated;
    totalStats.errors.push(...stats.errors);

    console.log(`\nFile complete: ${path.basename(file)}`);
    console.log(`  Processed: ${stats.processed}`);
    console.log(`  Created: ${stats.created}`);
    console.log(`  Skipped (duplicates): ${stats.skipped}`);
    console.log(`  Contacts created: ${stats.contactsCreated}`);
    if (stats.errors.length > 0) {
      console.log(`  Errors: ${stats.errors.length}`);
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("IMPORT COMPLETE");
  console.log("=".repeat(60));
  console.log(`Total processed: ${totalStats.processed}`);
  console.log(`Total created: ${totalStats.created}`);
  console.log(`Total skipped: ${totalStats.skipped}`);
  console.log(`Total contacts created: ${totalStats.contactsCreated}`);

  if (totalStats.errors.length > 0) {
    console.log(`\nErrors (${totalStats.errors.length}):`);
    totalStats.errors.slice(0, 10).forEach((e) => console.log(`  - ${e}`));
    if (totalStats.errors.length > 10) {
      console.log(`  ... and ${totalStats.errors.length - 10} more`);
    }
  }

  process.exit(0);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
