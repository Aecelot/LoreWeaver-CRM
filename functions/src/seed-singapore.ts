/**
 * Seed script to add Singapore gaming industry leads
 * 
 * Run with: npx ts-node src/seed-singapore.ts
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

interface SingaporeLead {
  name: string;
  type: "association" | "agency" | "publisher" | "studio";
  website: string;
  country: string;
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
    notes?: string;
  };
  focus?: string;
  tier?: "AAA" | "AA" | "Indie";
  notes: string;
}

const singaporeLeads: SingaporeLead[] = [
  // Industry Associations & Government Agencies
  {
    name: "Singapore Games Association (SGGA)",
    type: "association",
    website: "https://sgga.org.sg",
    country: "Singapore",
    contact: {
      email: "hello@sgga.org.sg",
    },
    focus: "Key trade body for games industry",
    notes: "Supports local and international game companies. Organizes networking events, Publisher-Developer Connect (with IMDA), Industry Day. Has members' directory. Very responsive - email first with pitch.",
  },
  {
    name: "IMDA (Infocomm Media Development Authority)",
    type: "association",
    website: "https://imda.gov.sg",
    country: "Singapore",
    focus: "Government agency for digital media/games",
    notes: "Offers prototype grants with publisher feedback panels, supports local elements in games, co-organizes business events with SGGA. Search site for games/media development schemes.",
  },
  {
    name: "Enterprise Singapore",
    type: "association",
    website: "https://enterprisesg.gov.sg",
    country: "Singapore",
    focus: "Helps foreign companies set up/partner in Singapore",
    notes: "Business matching for SEA expansion. Contact for partnership facilitation.",
  },
  {
    name: "Economic Development Board (EDB) Singapore",
    type: "association",
    website: "https://edb.gov.sg",
    country: "Singapore",
    focus: "Supports tech/gaming investments",
    notes: "Helps foreign companies establish presence. Good for investment-related partnerships.",
  },
  // Publishers & Studios
  {
    name: "Garena",
    type: "publisher",
    website: "https://garena.com",
    country: "Singapore",
    focus: "SEA publisher (Free Fire), mobile, regional distribution",
    tier: "AAA",
    notes: "Massive SEA publisher. Free Fire creators. Strong mobile and regional distribution capabilities.",
  },
  {
    name: "Spiral Up Games",
    type: "publisher",
    website: "https://spiralupgames.com",
    country: "Singapore",
    contact: {
      email: "hello@spiralupgames.com",
      notes: "Submit via: forms.gle/SbpGGFDeTLztgrNx7",
    },
    focus: "Indie-focused publisher (PC emphasis)",
    tier: "Indie",
    notes: "Very approachable for submissions. Indie/PC focus. Singapore-based.",
  },
  {
    name: "NetEase Games (Singapore)",
    type: "publisher",
    website: "https://neteasegames.com",
    country: "Singapore",
    contact: {
      address: "126 Beach Road, #04-11 Guoco MidTown, Singapore",
    },
    focus: "SEA publishing, global investments",
    tier: "AAA",
    notes: "Regional office handles SEA publishing and global investments.",
  },
  {
    name: "Level Infinite",
    type: "publisher",
    website: "https://levelinfinite.com",
    country: "Singapore",
    focus: "Tencent subsidiary, publishing",
    tier: "AAA",
    notes: "Tencent's global publishing brand. Active in SEA region.",
  },
  {
    name: "Bandai Namco Studios Singapore",
    type: "studio",
    website: "https://bandainamcostudios.com",
    country: "Singapore",
    focus: "Asian development/publishing hub",
    tier: "AAA",
    notes: "Key Asian development and publishing hub for Bandai Namco.",
  },
  {
    name: "Ubisoft Singapore",
    type: "studio",
    website: "https://singapore.ubisoft.com",
    country: "Singapore",
    focus: "AAA development",
    tier: "AAA",
    notes: "Largest AAA studio in Southeast Asia. Major development hub.",
  },
  {
    name: "Virtuos",
    type: "studio",
    website: "https://virtuosgames.com",
    country: "Singapore",
    focus: "Co-development partner",
    tier: "AAA",
    notes: "Major co-development partner for global AAA titles. Art production, full game development.",
  },
  {
    name: "Riot Games (Singapore)",
    type: "publisher",
    website: "https://riotgames.com",
    country: "Singapore",
    focus: "League of Legends, Valorant (SEA)",
    tier: "AAA",
    notes: "Regional presence for SEA operations.",
  },
  {
    name: "HoYoverse (Singapore)",
    type: "publisher",
    website: "https://hoyoverse.com",
    country: "Singapore",
    focus: "Genshin Impact, Honkai",
    tier: "AAA",
    notes: "miHoYo's global brand. Regional presence in Singapore.",
  },
  {
    name: "Take-Two Interactive (Singapore)",
    type: "publisher",
    website: "https://take2games.com",
    country: "Singapore",
    focus: "Rockstar, 2K Games (SEA)",
    tier: "AAA",
    notes: "Regional presence for SEA operations.",
  },
  {
    name: "Wargaming (Singapore)",
    type: "publisher",
    website: "https://wargaming.com",
    country: "Singapore",
    focus: "World of Tanks, free-to-play",
    tier: "AA",
    notes: "Regional APAC hub. Free-to-play specialists.",
  },
  {
    name: "ExcelGames Interactive (EGI)",
    type: "agency",
    website: "https://egi.com.sg",
    country: "Singapore",
    focus: "APAC game distributor",
    notes: "Leading APAC distributor for games and related products across multiple countries. Good for market entry support.",
  },
];

async function seedSingaporeLeads() {
  console.log("Seeding Singapore gaming industry leads...\n");

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

  for (const lead of singaporeLeads) {
    // Check if lead already exists
    const existingSnapshot = await db.collection("leads")
      .where("name", "==", lead.name)
      .get();

    if (!existingSnapshot.empty) {
      console.log(`⏭️  Skipping "${lead.name}" - already exists`);
      skipped++;
      continue;
    }

    let notesText = lead.notes;
    if (lead.contact?.notes) {
      notesText += `\n\n${lead.contact.notes}`;
    }
    if (lead.contact?.address) {
      notesText += `\n\nAddress: ${lead.contact.address}`;
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
      tags: ["singapore", "asia-expansion", "sea", lead.type],
      focus: lead.focus || "",
      notes: notesText,
      pipeline: {
        pipelineId: pipelineId,
        stageId: stageId,
      },
      createdAt: now,
      updatedAt: now,
      createdBy: "system",
    };

    // Only add tier if defined
    if (lead.tier) {
      leadData.tier = lead.tier;
    }

    const docRef = await db.collection("leads").add(leadData);
    console.log(`✅ Added "${lead.name}" (${lead.type}) - ID: ${docRef.id}`);
    added++;
  }

  console.log(`\n✅ Done! Added ${added} leads, skipped ${skipped} existing.`);
}

seedSingaporeLeads()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error seeding Singapore leads:", err);
    process.exit(1);
  });
