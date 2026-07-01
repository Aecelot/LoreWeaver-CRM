/**
 * Seed script to add Korean gaming industry leads
 * 
 * Run with: npx ts-node src/seed-korea.ts
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

interface KoreanLead {
  name: string;
  type: "association" | "agency" | "publisher";
  website: string;
  country: string;
  contact?: {
    email?: string;
    phone?: string;
    notes?: string;
  };
  focus?: string;
  notes: string;
}

const koreanLeads: KoreanLead[] = [
  // Industry Associations & Government Agencies
  {
    name: "K-GAMES (Korea Association of Game Industry)",
    type: "association",
    website: "https://kgames.or.kr",
    country: "South Korea",
    contact: {
      phone: "+82 2-3477-2703",
      notes: "Policy dept. Address: 834-26 Yeoksam-dong, Gangnam-gu, Seoul (06250)",
    },
    focus: "Industry body, organizes G-STAR expo",
    notes: "Facilitates partnerships, provides publisher lists, supports international business matching. Best first contact for Korean market entry.",
  },
  {
    name: "KOCCA (Korea Creative Content Agency)",
    type: "association",
    website: "https://kocca.kr",
    country: "South Korea",
    contact: {
      email: "welcon@kocca.kr",
      notes: "Overseas business centers in US, Europe, Japan",
    },
    focus: "Government agency promoting Korean games globally",
    notes: "Runs global roadshows (Gamescom Korea Pavilion), matchmaking events, support programs. Email with short pitch for introductions to Korean publishers.",
  },
  // BD Agencies
  {
    name: "NAVI Games Agency",
    type: "agency",
    website: "",
    country: "South Korea",
    contact: {
      email: "bd@navigames.co.kr",
    },
    focus: "Game BD and publishing partnerships",
    notes: "Specializes in game business development and publishing partnerships in Korea. More responsive than direct publisher outreach.",
  },
  {
    name: "ELITE GAMES",
    type: "agency",
    website: "",
    country: "South Korea",
    contact: {
      email: "business@eliterising.com",
    },
    focus: "Publishing, player support, QA services",
    notes: "Offers publishing, player support, and QA services. Acts as intermediary for Korean publishers.",
  },
  // Major Publishers
  {
    name: "Nexon",
    type: "publisher",
    website: "https://company.nexon.com",
    country: "South Korea",
    focus: "MMOs, action, free-to-play",
    notes: "One of the biggest Korean publishers. Strong global presence. Use website Business Inquiry form or LinkedIn BD contacts.",
  },
  {
    name: "NCSOFT",
    type: "publisher",
    website: "https://kr.ncsoft.com",
    country: "South Korea",
    focus: "MMOs (Lineage series), mobile",
    notes: "Very IP-strong. Known for Lineage franchise. Use website partnership form.",
  },
  {
    name: "Netmarble",
    type: "publisher",
    website: "https://netmarble.com",
    country: "South Korea",
    focus: "Mobile + PC, big IP titles",
    notes: "Active in global publishing. Strong mobile presence.",
  },
  {
    name: "Krafton",
    type: "publisher",
    website: "https://krafton.com",
    country: "South Korea",
    focus: "PUBG, battle royale, diverse",
    notes: "Record-high revenue recently. PUBG creators. Diversifying portfolio.",
  },
  {
    name: "Smilegate",
    type: "publisher",
    website: "https://smilegate.com",
    country: "South Korea",
    contact: {
      phone: "+82-31-600-8200",
    },
    focus: "Lost Ark, CrossFire",
    notes: "Major publisher behind Lost Ark and CrossFire. Strong narrative games.",
  },
  {
    name: "Com2uS",
    type: "publisher",
    website: "https://com2us.com",
    country: "South Korea",
    focus: "Mobile (Summoners War)",
    notes: "Strong mobile focus. Summoners War franchise.",
  },
  {
    name: "Pearl Abyss",
    type: "publisher",
    website: "https://pearl-abyss.com",
    country: "South Korea",
    focus: "Black Desert, MMOs",
    notes: "Growing fast internationally. Known for Black Desert Online. Strong narrative/world-building.",
  },
  {
    name: "Supercent",
    type: "publisher",
    website: "https://corp.supercent.io",
    country: "South Korea",
    focus: "Casual/mobile",
    notes: "Rising star. Newest high-download publisher in Korea.",
  },
];

async function seedKoreanLeads() {
  console.log("Seeding Korean gaming industry leads...\n");

  // Get the studio pipeline
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

  const now = Timestamp.now();
  let added = 0;
  let skipped = 0;

  for (const lead of koreanLeads) {
    // Check if lead already exists
    const existingSnapshot = await db.collection("leads")
      .where("name", "==", lead.name)
      .get();

    if (!existingSnapshot.empty) {
      console.log(`⏭️  Skipping "${lead.name}" - already exists`);
      skipped++;
      continue;
    }

    const leadData: Record<string, unknown> = {
      type: lead.type,
      name: lead.name,
      status: "new-lead",
      priority: lead.type === "association" ? "high" : "medium",
      owner: "",
      contact: {
        name: "",
        role: "",
        email: lead.contact?.email || "",
        phone: lead.contact?.phone || "",
        linkedin: "",
      },
      website: lead.website,
      country: lead.country,
      region: "Asia",
      tags: ["korea", "asia-expansion", lead.type],
      focus: lead.focus || "",
      notes: lead.notes + (lead.contact?.notes ? `\n\n${lead.contact.notes}` : ""),
      pipeline: {
        pipelineId: pipelineId,
        stageId: stageId,
      },
      createdAt: now,
      updatedAt: now,
      createdBy: "system",
    };

    // Only add tier for publishers
    if (lead.type === "publisher") {
      leadData.tier = "AAA";
    }

    const docRef = await db.collection("leads").add(leadData);
    console.log(`✅ Added "${lead.name}" (${lead.type}) - ID: ${docRef.id}`);
    added++;
  }

  console.log(`\n✅ Done! Added ${added} leads, skipped ${skipped} existing.`);
}

seedKoreanLeads()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error seeding Korean leads:", err);
    process.exit(1);
  });
