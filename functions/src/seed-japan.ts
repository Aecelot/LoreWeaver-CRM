/**
 * Seed script to add Japanese gaming industry leads
 * 
 * Run with: npx ts-node src/seed-japan.ts
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

interface JapaneseLead {
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
  tier?: "AAA" | "AA" | "Indie";
  notes: string;
}

const japaneseLeads: JapaneseLead[] = [
  // Industry Associations & Government Support
  {
    name: "CESA (Computer Entertainment Supplier's Association)",
    type: "association",
    website: "https://cesa.or.jp",
    country: "Japan",
    focus: "Main industry body, organizes Tokyo Game Show & CEDEC",
    notes: "Publishes industry reports, supports business matching. Contact via inquiry form or TGS channels. Great for publisher lists and networking. English sections available.",
  },
  {
    name: "JETRO (Japan External Trade Organization)",
    type: "association",
    website: "https://jetro.go.jp/en/",
    country: "Japan",
    focus: "Government agency helping foreign companies enter Japan",
    notes: "Offers free consulting, matchmaking, market research. Participates in GDC Japan Pavilion. Look for 'Invest Japan' or game-specific support programs. Contact local JETRO office first.",
  },
  {
    name: "iGi (indie Game incubator)",
    type: "association",
    website: "https://igi.dev/en/",
    country: "Japan",
    focus: "Japan's first indie-focused incubator",
    notes: "Backed by Marvelous and others. Runs demo days for publishers (100+ network), mentoring, exhibitions at TGS/BitSummit. Strong indie publisher connections.",
  },
  {
    name: "IGDA Japan",
    type: "association",
    website: "https://igda.jp",
    country: "Japan",
    focus: "Local IGDA chapter",
    notes: "Good for community and informal connections. Networking focused.",
  },
  // BD / Localization Partners
  {
    name: "GameTomo",
    type: "agency",
    website: "https://gametomo.co.jp/developers",
    country: "Japan",
    focus: "Indie localization and publishing in Japan",
    notes: "Invites devs to Tokyo, offers guest desks, helps with marketing to Japanese players. Strong indie focus.",
  },
  {
    name: "GozenGames",
    type: "agency",
    website: "",
    country: "Japan",
    focus: "BD, product management, consulting",
    notes: "Provides business development, product management, and consulting for succeeding in the Japanese gaming market.",
  },
  {
    name: "Shueisha Games (AMU project)",
    type: "agency",
    website: "https://shueisha-games.com/en/pitch/",
    country: "Japan",
    focus: "Publishing investment and development support",
    notes: "Open to pitches from developers WORLDWIDE (not just Japan). Offers development support, publishing investment. Has pitch submission page.",
  },
  // Major Publishers
  {
    name: "Nintendo",
    type: "publisher",
    website: "https://nintendo.com",
    country: "Japan",
    focus: "Console, family-friendly, first-party heavy",
    tier: "AAA",
    notes: "Very selective. First-party focused. Strong IP protection.",
  },
  {
    name: "Sony Interactive Entertainment",
    type: "publisher",
    website: "https://sie.com",
    country: "Japan",
    focus: "PlayStation, action/adventure",
    tier: "AAA",
    notes: "Strong in action/adventure. PlayStation platform holder.",
  },
  {
    name: "Bandai Namco Entertainment",
    type: "publisher",
    website: "https://bandainamcoent.co.jp",
    country: "Japan",
    focus: "Mobile, console, anime IPs",
    tier: "AAA",
    notes: "Diverse portfolio. Active in third-party publishing. Strong anime IP connections.",
  },
  {
    name: "Square Enix",
    type: "publisher",
    website: "https://square-enix.com",
    country: "Japan",
    focus: "RPGs, Final Fantasy series",
    tier: "AAA",
    notes: "Strong global reach. RPG specialists. Final Fantasy, Dragon Quest franchises.",
  },
  {
    name: "Capcom",
    type: "publisher",
    website: "https://capcom.com",
    country: "Japan",
    focus: "Action games, Resident Evil, Monster Hunter",
    tier: "AAA",
    notes: "Action game specialists. Strong franchises: RE, Monster Hunter, Street Fighter.",
  },
  {
    name: "SEGA",
    type: "publisher",
    website: "https://sega.com",
    country: "Japan",
    focus: "Varied (Sonic, Yakuza), mobile/PC",
    tier: "AAA",
    notes: "Diverse portfolio. Sonic franchise. Growing PC/mobile focus.",
  },
  {
    name: "Konami",
    type: "publisher",
    website: "https://konami.com",
    country: "Japan",
    focus: "eFootball, diverse portfolio",
    tier: "AAA",
    notes: "Sports games focus (eFootball/PES). Diverse portfolio.",
  },
  {
    name: "Koei Tecmo",
    type: "publisher",
    website: "https://koeitecmo.co.jp",
    country: "Japan",
    focus: "Strategy, Warriors series, mobile",
    tier: "AA",
    notes: "Strategy games, Warriors/Musou series. Team Ninja (Nioh).",
  },
  {
    name: "The Pokémon Company",
    type: "publisher",
    website: "https://pokemon.co.jp",
    country: "Japan",
    focus: "Pokémon IP",
    tier: "AAA",
    notes: "Massive IP. Joint venture with Nintendo and Game Freak. Very selective.",
  },
  {
    name: "Cygames",
    type: "publisher",
    website: "https://cygames.co.jp",
    country: "Japan",
    focus: "Mobile (gacha), Granblue Fantasy",
    tier: "AA",
    notes: "Strong mobile/gacha. Granblue Fantasy, Uma Musume. High production values.",
  },
  {
    name: "mixi",
    type: "publisher",
    website: "https://mixi.co.jp",
    country: "Japan",
    focus: "Mobile games, Monster Strike",
    tier: "AA",
    notes: "Monster Strike developer. Major mobile presence in Japan.",
  },
  {
    name: "GungHo Online Entertainment",
    type: "publisher",
    website: "https://gungho.co.jp",
    country: "Japan",
    focus: "Mobile, Puzzle & Dragons",
    tier: "AA",
    notes: "Puzzle & Dragons creator. Strong mobile gacha expertise.",
  },
  {
    name: "FromSoftware",
    type: "publisher",
    website: "https://fromsoftware.jp",
    country: "Japan",
    focus: "Souls-like, Elden Ring",
    tier: "AAA",
    notes: "More developer than publisher. Souls series, Elden Ring. Owned by Kadokawa.",
  },
  {
    name: "ATLUS",
    type: "publisher",
    website: "https://atlus.com",
    country: "Japan",
    focus: "Persona, SMT series",
    tier: "AA",
    notes: "Persona and Shin Megami Tensei series. Strong narrative/RPG focus. SEGA subsidiary.",
  },
  {
    name: "Level-5",
    type: "publisher",
    website: "https://level5.co.jp",
    country: "Japan",
    focus: "Professor Layton, Ni no Kuni",
    tier: "AA",
    notes: "Family-friendly RPGs. Professor Layton, Ni no Kuni, Yo-kai Watch.",
  },
  {
    name: "Marvelous",
    type: "publisher",
    website: "https://marv.jp",
    country: "Japan",
    focus: "Story of Seasons, action games",
    tier: "AA",
    notes: "Story of Seasons (Harvest Moon), Senran Kagura. Backs iGi incubator.",
  },
  {
    name: "CyberAgent",
    type: "publisher",
    website: "https://cyberagent.co.jp",
    country: "Japan",
    focus: "Mobile games, Uma Musume",
    tier: "AA",
    notes: "Parent company of Cygames. Major mobile game investments.",
  },
];

async function seedJapaneseLeads() {
  console.log("Seeding Japanese gaming industry leads...\n");

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

  for (const lead of japaneseLeads) {
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
      tags: ["japan", "asia-expansion", lead.type],
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

    // Only add tier for publishers with defined tier
    if (lead.tier) {
      leadData.tier = lead.tier;
    }

    const docRef = await db.collection("leads").add(leadData);
    console.log(`✅ Added "${lead.name}" (${lead.type}) - ID: ${docRef.id}`);
    added++;
  }

  console.log(`\n✅ Done! Added ${added} leads, skipped ${skipped} existing.`);
}

seedJapaneseLeads()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error seeding Japanese leads:", err);
    process.exit(1);
  });
