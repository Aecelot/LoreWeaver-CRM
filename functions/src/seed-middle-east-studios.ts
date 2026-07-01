/**
 * Seed script to add Middle East game development studios
 * Focus: AA/Indie studios good fit for Architect/Director
 *
 * Run with: npx ts-node src/seed-middle-east-studios.ts
 */

import * as admin from "firebase-admin";
import { Timestamp } from "firebase-admin/firestore";

if (!admin.apps.length) {
  admin.initializeApp({
    projectId: "loreweaver-crm",
  });
}

const db = admin.firestore();

interface StudioData {
  name: string;
  website: string;
  country: string;
  city?: string;
  tier: "AAA" | "AA" | "Indie";
  teamSize?: string;
  founded?: number;
  funding?: string;
  keyGames: string[];
  genres: string[];
  narrativeFit: number;
  architectFit: boolean;
  directorFit: boolean;
  notes: string;
  whyGoodFit: string;
  contactNotes?: string;
}

const meStudios: StudioData[] = [
  // SAUDI ARABIA
  {
    name: "Starvania Studio",
    website: "https://starvania.com",
    country: "Saudi Arabia",
    city: "Riyadh",
    tier: "Indie",
    teamSize: "5-10",
    founded: 2022,
    funding: "$1.1M (Aug 2025)",
    keyGames: ["Bahamut and the Waqwaq Tree"],
    genres: ["Action Adventure", "Fantasy", "Metroidvania"],
    narrativeFit: 85,
    architectFit: true,
    directorFit: false,
    notes: "Founded by Meaad Aflah and Muslih Alzahrani. Debut game Bahamut and the Waqwaq Tree released 2024/2025 - inspired by Arabian mythology. Part of NEOM Level Up Accelerator Cohort 3. Narrative-driven with deep cultural integration.",
    whyGoodFit: "Explicitly narrative-driven indie with Arabian cultural themes. Perfect Architect candidate for planning story content. Small team = approachable. Fresh $1.1M funding means they're building.",
    contactNotes: "Active on Twitter @StarvaniaStudio. LinkedIn presence. NEOM Level Up connection.",
  },
  {
    name: "Semaphore Lab",
    website: "https://semaphorelab.com",
    country: "Saudi Arabia",
    city: "Riyadh",
    tier: "AA",
    teamSize: "20-50",
    founded: 2010,
    keyGames: ["Unearthed: Trail of Ibn Battuta", "Badiya"],
    genres: ["Action Adventure", "Third Person", "Open World"],
    narrativeFit: 80,
    architectFit: true,
    directorFit: true,
    notes: "Pioneer Saudi studio. Unearthed was episodic action-adventure following explorer Ibn Battuta across Middle East - directly Uncharted-inspired. Also does VR/simulation. One of the longest-running Saudi game studios.",
    whyGoodFit: "Proven narrative game developer (Unearthed series). Episodic format = complex branching story. Middle East adventure setting fits cultural narrative tools. Director could enhance NPC interactions in future projects.",
    contactNotes: "info@semaphorelab.com. Steam presence.",
  },
  
  // JORDAN
  {
    name: "Tamatem Games",
    website: "https://tamatem.co",
    country: "Jordan",
    city: "Amman",
    tier: "AA",
    teamSize: "100+",
    founded: 2013,
    funding: "500 Startups, Endeavor-backed",
    keyGames: ["Girl's Secrets (published)", "50+ localized titles"],
    genres: ["Mobile RPG", "Strategy", "Story Narrative", "Cards"],
    narrativeFit: 75,
    architectFit: true,
    directorFit: false,
    notes: "Leading MENA mobile publisher. 150M+ downloads. Offices in Amman and Riyadh. Explicitly lists 'story-narratives' as a genre focus. Partnership with Nanobit on narrative mobile game. Best Publisher Award 2024.",
    whyGoodFit: "Publisher with narrative genre focus. Could use Architect for their localization/adaptation pipeline. Large content volume across 50+ games = tool need. Strong regional distribution.",
    contactNotes: "Contact via website. Hussam Hammo is founder/CEO.",
  },
  {
    name: "Maysalward",
    website: "https://maysalward.com",
    country: "Jordan",
    city: "Amman",
    tier: "AA",
    teamSize: "50+",
    founded: 2003,
    keyGames: ["Arabian Lords", "MENA Speed", "Zonkt!"],
    genres: ["Strategy", "Racing", "Mobile"],
    narrativeFit: 65,
    architectFit: true,
    directorFit: false,
    notes: "One of oldest MENA game studios. UAE HQ with Amman dev studio. Arabian Lords is strategy game with Middle Eastern historical narrative. Pioneer in regional game development.",
    whyGoodFit: "Arabian Lords shows narrative/cultural content capability. Long track record = stable partner. Strategy games need dialogue and story systems. Could use Architect for content planning.",
    contactNotes: "Based in Amman dev center. Long industry presence.",
  },

  // LEBANON
  {
    name: "Falafel Games",
    website: "https://falafel-games.com",
    country: "Lebanon",
    city: "Beirut",
    tier: "AA",
    teamSize: "30-50",
    founded: 2008,
    keyGames: ["Era of Vision", "Knights of Glory"],
    genres: ["4X Strategy", "RPG", "MMO"],
    narrativeFit: 78,
    architectFit: true,
    directorFit: true,
    notes: "Co-founded by Radwan Kasmiya and Vince Ghossoub. First RPG with authentic Arab Conquest history - high fidelity to historical records. Decade of experience in MMO Strategy/RPG. Also does co-dev and Metaverse work.",
    whyGoodFit: "Explicit focus on narrative authenticity and cultural storytelling. Era of Vision was groundbreaking Arab-history RPG. MMO experience = scale. Director could enhance their multiplayer NPC systems.",
    contactNotes: "HQ in Beirut. CEO Vince Ghossoub. contact@falafel-games.com likely.",
  },

  // UAE
  {
    name: "Pixelhunters",
    website: "https://pixelhunters.com",
    country: "UAE",
    city: "Dubai",
    tier: "AA",
    teamSize: "50+",
    founded: 2007,
    keyGames: ["Various entertainment and brand games"],
    genres: ["Entertainment", "Educational", "Brand Games"],
    narrativeFit: 60,
    architectFit: true,
    directorFit: false,
    notes: "First indie game dev studio in UAE. 3D animation, VR, experiential agency. Broad portfolio including entertainment, brand, and educational games. Pioneer in UAE game industry.",
    whyGoodFit: "Long UAE presence = regional connections. Diverse portfolio shows adaptability. Could use Architect for their entertainment/brand game narratives. Less Director fit (more casual/brand focus).",
    contactNotes: "Dubai-based. Website contact form.",
  },
  {
    name: "Hybrid Humans",
    website: "https://hybridhumans.ae",
    country: "UAE",
    city: "Abu Dhabi",
    tier: "Indie",
    teamSize: "10-20",
    keyGames: ["Hop Hop Away", "Who Lurks"],
    genres: ["Narrative Adventure", "Puzzle", "Indie"],
    narrativeFit: 75,
    architectFit: true,
    directorFit: false,
    notes: "Abu Dhabi indie studio. Gained international attention with narrative-driven gameplay in titles like Who Lurks. Creative approach to game design and user engagement.",
    whyGoodFit: "Explicitly narrative-driven gameplay focus. Indie scale = approachable. Abu Dhabi government heavily investing in games = ecosystem support. Good Architect candidate for story planning.",
    contactNotes: "Abu Dhabi-based. Check LinkedIn.",
  },
  {
    name: "Dark Emerald Studios",
    website: "https://darkemerald.ae",
    country: "UAE",
    city: "Dubai",
    tier: "Indie",
    teamSize: "5-15",
    keyGames: ["In development"],
    genres: ["Indie", "Immersive Experiences"],
    narrativeFit: 70,
    architectFit: true,
    directorFit: false,
    notes: "Dubai indie studio focused on creating indie games and immersive experiences. Newer studio building portfolio.",
    whyGoodFit: "Early-stage = could adopt tools from the start. Immersive experiences often need strong narrative. Dubai location = regional showcase opportunity.",
    contactNotes: "Dubai-based. Website contact.",
  },

  // EGYPT
  {
    name: "Instinct Games",
    website: "https://instinctgames.com",
    country: "Egypt",
    city: "Cairo",
    tier: "AA",
    teamSize: "50+",
    founded: 2011,
    keyGames: ["Wicked Lair", "Temple Run: Treasure Hunters"],
    genres: ["Mobile", "Action", "Puzzle"],
    narrativeFit: 55,
    architectFit: true,
    directorFit: false,
    notes: "Egyptian studio with work-for-hire and original IP experience. Collaborated on major franchises. Growing Egyptian game dev scene.",
    whyGoodFit: "Established Egyptian studio with IP experience. Could use Architect for original narrative projects. Less narrative-heavy historically but market is shifting.",
    contactNotes: "Cairo-based. Industry connections.",
  },

  // TURKEY (often grouped with MENA)
  {
    name: "TaleWorlds Entertainment",
    website: "https://www.taleworlds.com",
    country: "Turkey",
    city: "Ankara",
    tier: "AA",
    teamSize: "100+",
    founded: 2005,
    keyGames: ["Mount & Blade", "Mount & Blade II: Bannerlord"],
    genres: ["Action RPG", "Strategy", "Sandbox"],
    narrativeFit: 82,
    architectFit: true,
    directorFit: true,
    notes: "Legendary Mount & Blade series. Bannerlord is massive sandbox RPG with emergent narrative. Self-published success story. Strong modding community.",
    whyGoodFit: "Mount & Blade has emergent storytelling and dynamic NPC factions - perfect Director use case. Bannerlord's scale needs narrative tools. Could enhance companion/lord dialogue systems with Director.",
    contactNotes: "contact@taleworlds.com. Very independent, might be harder to reach but high value.",
  },
  {
    name: "Peak Games",
    website: "https://peak.com",
    country: "Turkey",
    city: "Istanbul",
    tier: "AAA",
    teamSize: "500+",
    founded: 2010,
    funding: "Acquired by Zynga for $1.8B (2020)",
    keyGames: ["Toon Blast", "Toy Blast", "Lost Bubble"],
    genres: ["Puzzle", "Casual"],
    narrativeFit: 40,
    architectFit: false,
    directorFit: false,
    notes: "Now Zynga Istanbul. Massive casual puzzle success. Included for completeness but not narrative-focused.",
    whyGoodFit: "Low fit - casual puzzle focus, no narrative need. Skip for Architect/Director outreach.",
    contactNotes: "Now Zynga Istanbul. Enterprise contact through Zynga.",
  },
  {
    name: "Gram Games",
    website: "https://gram.gs",
    country: "Turkey",
    city: "Istanbul",
    tier: "AA",
    teamSize: "50+",
    founded: 2012,
    funding: "Acquired by Zynga (2018)",
    keyGames: ["Merge Dragons!", "Merge Magic!"],
    genres: ["Puzzle", "Merge"],
    narrativeFit: 50,
    architectFit: true,
    directorFit: false,
    notes: "Merge genre pioneers. Now Zynga. Merge Dragons has light narrative elements and world-building. Less heavy narrative but some story content.",
    whyGoodFit: "Merge games increasingly add story layers. Could use Architect for event narratives. Lower priority but possible.",
    contactNotes: "Now Zynga Istanbul.",
  },
];

async function seedMiddleEastStudios() {
  console.log("Seeding Middle East game development studios...\n");

  const pipelinesSnapshot = await db.collection("pipelines").where("type", "==", "studio").get();
  let pipelineId = "studio-default";
  let stageId = "new-lead";

  if (!pipelinesSnapshot.empty) {
    const pipeline = pipelinesSnapshot.docs[0];
    pipelineId = pipeline.id;
    const stages = pipeline.data().stages || [];
    if (stages.length > 0) stageId = stages[0].id;
    console.log(`Found studio pipeline: ${pipelineId}, first stage: ${stageId}`);
  }

  const usersSnapshot = await db.collection("leads").limit(1).get();
  let createdBy = "system";
  if (!usersSnapshot.empty) {
    const existingLead = usersSnapshot.docs[0].data();
    if (existingLead.createdBy) createdBy = existingLead.createdBy;
  }

  const now = Timestamp.now();
  let created = 0;
  let skipped = 0;

  for (const studio of meStudios) {
    const existingSnapshot = await db.collection("leads")
      .where("name", "==", studio.name)
      .get();

    if (!existingSnapshot.empty) {
      console.log(`Skipping ${studio.name} - already exists`);
      skipped++;
      continue;
    }

    const tags = [
      "mena",
      "middle-east",
      studio.tier.toLowerCase(),
      studio.country.toLowerCase().replace(/\s+/g, "-"),
      ...studio.genres.map(g => g.toLowerCase().replace(/\s+/g, "-")),
    ];
    if (studio.architectFit) tags.push("architect-fit");
    if (studio.directorFit) tags.push("director-fit");
    if (studio.narrativeFit >= 75) tags.push("high-narrative");

    const leadData = {
      type: "studio",
      name: studio.name,
      status: "new-lead",
      priority: studio.narrativeFit >= 80 ? "high" : studio.narrativeFit >= 65 ? "medium" : "low",
      owner: "",
      contact: {
        name: "",
        role: "",
        email: "",
        phone: "",
        linkedin: "",
      },
      website: studio.website,
      country: studio.country,
      location: studio.city ? `${studio.city}, ${studio.country}` : studio.country,
      region: "Middle East",
      tier: studio.tier,
      teamSize: studio.teamSize || "",
      founded: studio.founded || null,
      funding: studio.funding || "",
      tags: tags,
      notes: `${studio.notes}\n\n**Why Good Fit:**\n${studio.whyGoodFit}${studio.contactNotes ? `\n\n**Contact Notes:**\n${studio.contactNotes}` : ""}`,
      studio: {
        keyGames: studio.keyGames,
        genres: studio.genres,
        narrativeFit: studio.narrativeFit,
        architectFit: studio.architectFit,
        directorFit: studio.directorFit,
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
    console.log(`Created ${studio.name} (${studio.country}, ${studio.tier}, narrative: ${studio.narrativeFit}) - ID: ${leadRef.id}`);
    created++;
  }

  console.log(`\nDone! Created: ${created}, Skipped: ${skipped}`);
}

seedMiddleEastStudios()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
