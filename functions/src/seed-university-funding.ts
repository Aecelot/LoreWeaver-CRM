/**
 * Seed script to add University/R&D Partnership funding opportunities as leads
 *
 * Run with:
 * $env:GOOGLE_APPLICATION_CREDENTIALS = "C:\Users\rijkg\OneDrive\Documenten\GitHub\LoreWeaver-CRM\service-account.json"
 * cd "C:\Users\rijkg\OneDrive\Documenten\GitHub\LoreWeaver-CRM\functions"
 * npx ts-node src/seed-university-funding.ts
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

// Funding pipeline ID (create new or use existing)
const FUNDING_PIPELINE_ID = "university-rnd-funding";

interface FundingOpportunity {
  name: string;
  provider: string;
  amount: string;
  deadline: string | null;
  status: "open" | "closed" | "upcoming";
  website: string;
  fitScore: number;
  description: string;
  requirements: string[];
  contactEmail?: string;
  contactPhone?: string;
  notes: string;
}

const fundingOpportunities: FundingOpportunity[] = [
  {
    name: "CIIIC Kern - Immersive Experiences Research",
    provider: "Regieorgaan SIA (National Growth Fund)",
    amount: "€300,000 max per project",
    deadline: "April 21, 2026",
    status: "open",
    website: "https://regieorgaan-sia.nl/financiering/ciiic-kern/",
    fitScore: 95,
    description: "1.5-2 year applied research on immersive experiences (IX) for SMEs. Perfect for validating narrative AI in games.",
    requirements: [
      "Consortium with min 2 SMEs or 1 SME + 1 public org",
      "Partners contribute 50% of total budget",
      "Lead applicant must be research institution"
    ],
    contactEmail: "ruth.timmermans@regieorgaan-sia.nl",
    contactPhone: "+31 30 600 13 21",
    notes: "HIGHEST PRIORITY - Deadline imminent. Contact Utrecht University Center for Game Research as potential partner."
  },
  {
    name: "NWO Open Technology Programme 2026",
    provider: "NWO (Dutch Research Council)",
    amount: "€25.9M total budget",
    deadline: null, // Continuous
    status: "open",
    website: "https://www.nwo.nl/en/calls/open-technology-programme-2026",
    fitScore: 85,
    description: "Free, unrestricted applied research with industry collaboration. Continuous intake allows timing flexibility.",
    requirements: [
      "Main applicant: researcher at Dutch institution",
      "Industry partner(s) required with co-funding",
      "Focus on technology with clear application"
    ],
    contactEmail: "ttw-otp@nwo.nl",
    notes: "Most substantial funding. Would need university partner (TU Delft AI or Utrecht)."
  },
  {
    name: "KIEM Arbeidsbesparende AI",
    provider: "Regieorgaan SIA / NWO",
    amount: "€40,000 max per project",
    deadline: "September 15, 2026",
    status: "open",
    website: "https://www.nwo.nl/en/calls/kiem-arbeidsbesparende-ai",
    fitScore: 80,
    description: "1-year exploratory research on AI for labor savings/productivity in SMEs.",
    requirements: [
      "Consortium: research institution + 2 practice partners",
      "At least 1 SME partner",
      "25% co-financing from partners (can be in-kind)",
      "First-come-first-served"
    ],
    contactEmail: "kiem@regieorgaan-sia.nl",
    notes: "Position Architect as productivity tool for game developers. Good entry point before larger grants."
  },
  {
    name: "KIEM HighTech",
    provider: "Regieorgaan SIA + Holland High Tech",
    amount: "€40,000 max per project",
    deadline: "September 15, 2026",
    status: "open",
    website: "https://regieorgaan-sia.nl/financiering/kiem/kiem-hightech/",
    fitScore: 70,
    description: "1-year exploratory research on technology development within innovation domains including digitalization.",
    requirements: [
      "Consortium: research institution + min 2 partners",
      "At least 1 Dutch SME partner",
      "25% co-financing from partners",
      "Must fit innovation domain"
    ],
    contactEmail: "kiem@regieorgaan-sia.nl",
    contactPhone: "+31 6 16 00 57 73",
    notes: "Good backup if KIEM AI is more competitive. Focus on technical innovation angle."
  },
  {
    name: "Professional Doctorate Financing",
    provider: "NWO / Regieorgaan SIA",
    amount: "€271,400 per PD candidate",
    deadline: "November 12, 2026",
    status: "open",
    website: "https://regieorgaan-sia.nl/financiering/professional-doctorate/",
    fitScore: 60,
    description: "Multi-year funding for Professional Doctorate candidates at hogescholen.",
    requirements: [
      "Hogeschool partner required (HKU, BUas)",
      "Long-term commitment (4 years)",
      "Practice-oriented doctoral research"
    ],
    notes: "Long-term play. Could fund dedicated AI narrative researcher. Good for building academic ties."
  }
];

async function seedFundingOpportunities() {
  console.log("Starting University/R&D funding seeding...\n");

  const batch = db.batch();
  const leadsRef = db.collection("leads");
  const now = Timestamp.now();

  for (const funding of fundingOpportunities) {
    const leadData = {
      // Basic info
      name: funding.name,
      company: funding.provider,
      website: funding.website,
      status: "new",
      source: "research",
      
      // Pipeline
      pipeline: {
        pipelineId: FUNDING_PIPELINE_ID,
        stageId: "new"
      },
      
      // Custom fields for funding
      customFields: {
        amount: funding.amount,
        deadline: funding.deadline || "Continuous",
        fundingStatus: funding.status,
        fitScore: funding.fitScore,
        requirements: funding.requirements,
        contactEmail: funding.contactEmail || null,
        contactPhone: funding.contactPhone || null,
      },
      
      // Description
      description: funding.description,
      notes: funding.notes,
      
      // Tags
      tags: ["funding", "university-partnership", "r&d", "subsidy"],
      
      // Metadata
      createdAt: now,
      updatedAt: now,
      createdBy: "system-research",
    };

    const docRef = leadsRef.doc();
    batch.set(docRef, leadData);
    console.log(`✓ Added: ${funding.name} (fit: ${funding.fitScore}/100)`);
  }

  // Commit the batch
  await batch.commit();
  console.log(`\n✅ Successfully added ${fundingOpportunities.length} funding opportunities to CRM`);
}

// Run the seeding
seedFundingOpportunities()
  .then(() => {
    console.log("\nSeeding complete!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding:", error);
    process.exit(1);
  });
