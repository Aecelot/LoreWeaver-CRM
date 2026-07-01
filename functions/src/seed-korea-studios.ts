/**
 * Seed script to add South Korean game development studios
 * Focus: Narrative-heavy studios good fit for Architect/Director
 *
 * Run with: npx ts-node src/seed-korea-studios.ts
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
  narrativeFit: number; // 1-100
  architectFit: boolean;
  directorFit: boolean;
  notes: string;
  whyGoodFit: string;
  contactNotes?: string;
}

const koreanStudios: StudioData[] = [
  // HIGH PRIORITY - Narrative-Heavy AAA
  {
    name: "Shift Up",
    website: "https://shiftup.co.kr",
    country: "South Korea",
    city: "Seoul",
    tier: "AAA",
    teamSize: "300+",
    founded: 2013,
    funding: "IPO 2024 (KOSDAQ)",
    keyGames: ["Stellar Blade", "Goddess of Victory: Nikke", "Destiny Child"],
    genres: ["Action RPG", "Character Action", "Gacha"],
    narrativeFit: 85,
    architectFit: true,
    directorFit: true,
    notes: "First Korean studio with direct Sony publishing deal. Founded by Kim Hyung Tae (Blade & Soul illustrator). IPO'd July 2024 at $2.4B valuation. Stellar Blade sold 1M+ copies in 2 weeks.",
    whyGoodFit: "AAA single-player narrative focus. Moving from mobile gacha to console story games. Stellar Blade has deep lore and character-driven story. Sequel confirmed - could use Architect for planning.",
    contactNotes: "Use LinkedIn or careers@shiftup.co.kr. CEO Kim Hyung Tae active on social media.",
  },
  {
    name: "Smilegate RPG",
    website: "https://www.smilegate.com",
    country: "South Korea",
    city: "Seoul",
    tier: "AAA",
    teamSize: "500+",
    founded: 2018,
    funding: "Subsidiary of Smilegate Holdings",
    keyGames: ["Lost Ark"],
    genres: ["MMORPG", "Action RPG"],
    narrativeFit: 90,
    architectFit: true,
    directorFit: true,
    notes: "Lost Ark subsidiary of Smilegate. Game has massive narrative scale with branching storylines. Amazon Games Western publishing partner. Stated goal: 'GOTY caliber' console titles.",
    whyGoodFit: "Lost Ark has millions of words of dialogue, complex branching quests, hundreds of NPCs. Perfect use case for both Architect (planning) and Director (dynamic NPC responses). Building AAA console division.",
    contactNotes: "Contact via Smilegate global site. Smilegate Barcelona is their Western AAA console studio.",
  },
  {
    name: "Pearl Abyss",
    website: "https://www.pearlabyss.com",
    country: "South Korea",
    city: "Anyang",
    tier: "AAA",
    teamSize: "1000+",
    founded: 2010,
    funding: "Public (KOSDAQ: 263750)",
    keyGames: ["Black Desert Online", "Black Desert Mobile", "Crimson Desert", "DokeV"],
    genres: ["MMORPG", "Open World", "Action Adventure"],
    narrativeFit: 88,
    architectFit: true,
    directorFit: true,
    notes: "Black Desert franchise grossed $2B+. Crimson Desert is narrative-focused open world (delayed but highly anticipated). DokeV is creature-collection open world. Strong world-building DNA.",
    whyGoodFit: "Crimson Desert is explicitly story-driven single-player/MMO hybrid. Pearl Abyss investing heavily in narrative. Black Desert has deep lore systems. Perfect Director candidate for emergent NPC behaviors.",
    contactNotes: "ir@pearlabyss.com for investor relations. Business inquiries via website.",
  },
  {
    name: "Krafton",
    website: "https://www.krafton.com",
    country: "South Korea",
    city: "Seoul",
    tier: "AAA",
    teamSize: "3000+",
    founded: 2007,
    funding: "Public (KOSPI: 259960), $3.7B IPO 2021",
    keyGames: ["PUBG", "PUBG Mobile", "The Callisto Protocol", "Project Windless"],
    genres: ["Battle Royale", "Survival Horror", "Open World RPG"],
    narrativeFit: 80,
    architectFit: true,
    directorFit: true,
    notes: "PUBG creators. Diversifying into narrative games. Project Windless is open-world action RPG based on Korean fantasy novel 'The Bird That Drinks Tears'. Led by ex-Far Cry director Patrik Méthé.",
    whyGoodFit: "Project Windless is massive narrative bet - adapting beloved 20-year-old Korean fantasy series. Krafton explicitly investing in story-driven games. Has resources and appetite for innovation.",
    contactNotes: "pr@krafton.com. Multiple studios under umbrella (Striking Distance, Unknown Worlds, etc.)",
  },
  {
    name: "NCSOFT",
    website: "https://www.ncsoft.com",
    country: "South Korea",
    city: "Seongnam",
    tier: "AAA",
    teamSize: "4000+",
    founded: 1997,
    funding: "Public (KOSPI: 036570)",
    keyGames: ["Lineage", "Lineage 2", "Aion", "Blade & Soul", "Guild Wars 2", "Throne and Liberty"],
    genres: ["MMORPG", "Action MMORPG"],
    narrativeFit: 82,
    architectFit: true,
    directorFit: true,
    notes: "Korean MMO pioneer. Lineage franchise is 25+ years old with deep lore. Recently invested in narrative-focused studios (Dynamis One). Throne and Liberty shows renewed focus on story.",
    whyGoodFit: "Massive existing narrative IP (Lineage universe). Actively acquiring narrative-focused studios. New IPs show story investment. Could use Director for their MMO NPC systems at scale.",
    contactNotes: "partnership@ncsoft.com. Has overseas offices (US, Japan, Taiwan).",
  },

  // MEDIUM PRIORITY - Emerging/Growing
  {
    name: "Tripod Studio",
    website: "https://www.tripodstudio.co.kr",
    country: "South Korea",
    city: "Seoul",
    tier: "AA",
    teamSize: "200+",
    founded: 2010,
    funding: "Smilegate subsidiary",
    keyGames: ["Lost Ark (co-developer)"],
    genres: ["MMORPG", "Action RPG"],
    narrativeFit: 85,
    architectFit: true,
    directorFit: true,
    notes: "Co-developed Lost Ark with Smilegate RPG. Deep experience in narrative design at massive scale. Handled much of Lost Ark's quest and story content.",
    whyGoodFit: "Proven narrative design experience on one of the most content-rich MMORPGs. Understands branching dialogue at scale. Good Architect candidate for quest planning tools.",
    contactNotes: "Contact via Smilegate. Less public-facing than parent company.",
  },
  {
    name: "NAT Games",
    website: "https://www.natgames.co.kr",
    country: "South Korea",
    city: "Seoul",
    tier: "AA",
    teamSize: "100+",
    founded: 2015,
    funding: "Krafton subsidiary (acquired 2021)",
    keyGames: ["Overprime (cancelled)", "New IP in development"],
    genres: ["Action", "MOBA", "RPG"],
    narrativeFit: 70,
    architectFit: true,
    directorFit: false,
    notes: "Krafton subsidiary. Overprime was cancelled but team retained for new projects. Strong technical team, pivoting to narrative games under Krafton umbrella.",
    whyGoodFit: "Krafton is pushing narrative direction. NAT has talented team looking for new direction. Could be early adopter of Architect for their next project.",
    contactNotes: "Contact through Krafton.",
  },
  {
    name: "Devsisters",
    website: "https://www.devsisters.com",
    country: "South Korea",
    city: "Seoul",
    tier: "AA",
    teamSize: "500+",
    founded: 2007,
    funding: "Public (KOSDAQ: 194480)",
    keyGames: ["Cookie Run: Kingdom", "Cookie Run: OvenBreak", "Cookie Run: Tower of Adventures"],
    genres: ["RPG", "Endless Runner", "Strategy"],
    narrativeFit: 65,
    architectFit: true,
    directorFit: false,
    notes: "Cookie Run franchise has surprisingly deep narrative. 'Kingdom' has extensive story content and character arcs. Expanding into more narrative-heavy experiences.",
    whyGoodFit: "Cookie Run: Kingdom shows narrative ambition in casual space. Architect could help plan their expanding story universe. Large content volume = authoring tool need.",
    contactNotes: "contact@devsisters.com. Active in Western markets.",
  },
  {
    name: "Nexon Korea",
    website: "https://www.nexon.com",
    country: "South Korea",
    city: "Seoul",
    tier: "AAA",
    teamSize: "5000+",
    founded: 1994,
    funding: "Public (TYO: 3659)",
    keyGames: ["MapleStory", "Dungeon Fighter Online", "KartRider", "The First Descendant", "Blue Archive"],
    genres: ["MMORPG", "Looter Shooter", "Casual", "Gacha"],
    narrativeFit: 75,
    architectFit: true,
    directorFit: true,
    notes: "One of Korea's largest publishers. MapleStory franchise has decades of lore. The First Descendant is new live-service looter with story focus. Blue Archive popular for narrative.",
    whyGoodFit: "Massive legacy IP (MapleStory universe). The First Descendant shows investment in story-driven live service. Blue Archive proves they understand character narrative. Scale = tool need.",
    contactNotes: "partnership@nexon.co.kr. Nexon has studios in Japan, US, Belgium.",
  },
  {
    name: "Netmarble",
    website: "https://www.netmarble.com",
    country: "South Korea",
    city: "Seoul",
    tier: "AAA",
    teamSize: "6000+",
    founded: 2000,
    funding: "Public (KOSPI: 251270)",
    keyGames: ["Seven Knights", "Lineage 2: Revolution", "Marvel Future Fight", "Solo Leveling: Arise"],
    genres: ["Mobile RPG", "MMORPG", "Action RPG"],
    narrativeFit: 72,
    architectFit: true,
    directorFit: false,
    notes: "Major mobile publisher. Solo Leveling: Arise adapts popular Korean webtoon. Strong IP adaptation capabilities. Multiple studios under umbrella.",
    whyGoodFit: "Solo Leveling shows narrative IP adaptation expertise. Large content teams that could benefit from Architect. Less Director fit (more scripted mobile content).",
    contactNotes: "business@netmarble.com. Very active in Western markets.",
  },
  {
    name: "Com2uS",
    website: "https://www.com2us.com",
    country: "South Korea",
    city: "Seoul",
    tier: "AA",
    teamSize: "1500+",
    founded: 1998,
    funding: "Public (KOSDAQ: 078340)",
    keyGames: ["Summoners War", "Summoners War: Chronicles", "MLB 9 Innings"],
    genres: ["Gacha RPG", "MMORPG", "Sports"],
    narrativeFit: 60,
    architectFit: true,
    directorFit: false,
    notes: "Summoners War franchise is massive ($2B+ revenue). Chronicles expanded into full MMORPG with story. Heavy blockchain/web3 investment.",
    whyGoodFit: "Summoners War universe expanding with more narrative content. Chronicles proved appetite for story. Architect could help manage expanding lore.",
    contactNotes: "biz@com2us.com. Owns Gamevil.",
  },
];

async function seedKoreanStudios() {
  console.log("Seeding South Korean game development studios...\n");

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

  const now = Timestamp.now();
  let created = 0;
  let skipped = 0;

  for (const studio of koreanStudios) {
    // Check if already exists
    const existingSnapshot = await db.collection("leads")
      .where("name", "==", studio.name)
      .get();

    if (!existingSnapshot.empty) {
      console.log(`Skipping ${studio.name} - already exists`);
      skipped++;
      continue;
    }

    const tags = [
      "korea",
      "asia",
      studio.tier.toLowerCase(),
      ...studio.genres.map(g => g.toLowerCase().replace(/\s+/g, "-")),
    ];
    if (studio.architectFit) tags.push("architect-fit");
    if (studio.directorFit) tags.push("director-fit");
    if (studio.narrativeFit >= 80) tags.push("high-narrative");

    const leadData = {
      type: "studio",
      name: studio.name,
      status: "new-lead",
      priority: studio.narrativeFit >= 85 ? "high" : studio.narrativeFit >= 75 ? "medium" : "low",
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
      region: "Asia",
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
    console.log(`Created ${studio.name} (${studio.tier}, narrative fit: ${studio.narrativeFit}) - ID: ${leadRef.id}`);
    created++;
  }

  console.log(`\nDone! Created: ${created}, Skipped: ${skipped}`);
}

seedKoreanStudios()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
