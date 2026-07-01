/**
 * Seed script to add Online Communities & Virtual Events to the CRM
 * Research date: March 31, 2026
 *
 * Includes:
 * - Steam Next Fest (June 2026)
 * - Steam themed fests (Party-Based RPG, etc.)
 * - Major game jams (narrative-focused)
 * - Discord community events
 * - Virtual showcases (LudoNarraCon)
 *
 * Run with: npx ts-node src/seed-online-events.ts
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

interface OnlineEvent {
  name: string;
  type: "virtual-showcase" | "game-jam" | "community" | "online" | "webinar";
  startDate: Date;
  endDate?: Date;
  location: string;
  country: string;
  website: string;
  registrationUrl?: string;
  cost: string;
  expectedAudience: string;
  loreWeaverScore: number;
  loreWeaverReason: string;
  organizer: string;
  discordUrl?: string;
  tags: string[];
  notes: string;
  priority: "high" | "medium" | "low";
  status: "upcoming" | "past" | "cancelled";
  isOnline: boolean;
}

const onlineEvents: OnlineEvent[] = [
  // =====================
  // STEAM EVENTS
  // =====================
  {
    name: "Steam Next Fest - June 2026",
    type: "virtual-showcase",
    startDate: new Date("2026-06-15"),
    endDate: new Date("2026-06-22"),
    location: "Online (Steam)",
    country: "Global",
    website: "https://partner.steamgames.com/doc/marketing/upcoming_events/nextfest",
    registrationUrl: "https://partner.steamgames.com/optin/sale/nextfest_june_2026",
    cost: "Free",
    expectedAudience: "Millions of Steam users",
    loreWeaverScore: 10,
    loreWeaverReason: "Premier demo showcase, massive reach, perfect for Director alpha demo",
    organizer: "Valve / Steam",
    tags: ["steam", "demos", "showcase", "indie", "global"],
    notes: "Multi-day celebration where fans try demos, watch livestreams, and learn about upcoming games. Registration required.",
    priority: "high",
    status: "upcoming",
    isOnline: true,
  },
  {
    name: "Steam Party-Based RPG Fest",
    type: "virtual-showcase",
    startDate: new Date("2026-09-14"),
    endDate: new Date("2026-09-21"),
    location: "Online (Steam)",
    country: "Global",
    website: "https://partner.steamgames.com/doc/marketing/upcoming_events/themed_sales/party_based_rpg_2026",
    registrationUrl: "https://partner.steamgames.com/optin/sale/sale_party_rpg_2026",
    cost: "Free",
    expectedAudience: "Millions of Steam users",
    loreWeaverScore: 9,
    loreWeaverReason: "Party-based RPGs are prime Director targets - multiple characters, branching dialogue, party interactions",
    organizer: "Valve / Steam",
    tags: ["steam", "rpg", "party-based", "narrative", "showcase"],
    notes: "Perfect timing for Director launch (Q2 2027). Games with multiple playable characters in RPG format.",
    priority: "high",
    status: "upcoming",
    isOnline: true,
  },
  {
    name: "Steam Summer Sale 2026",
    type: "virtual-showcase",
    startDate: new Date("2026-06-25"),
    endDate: new Date("2026-07-09"),
    location: "Online (Steam)",
    country: "Global",
    website: "https://partner.steamgames.com/doc/marketing/upcoming_events",
    cost: "Free",
    expectedAudience: "Hundreds of millions of Steam users",
    loreWeaverScore: 5,
    loreWeaverReason: "Major visibility event but primarily for released games with discounts",
    organizer: "Valve / Steam",
    tags: ["steam", "sale", "seasonal"],
    notes: "Visibility opportunity for Architect if commercial SaaS model active by then.",
    priority: "low",
    status: "upcoming",
    isOnline: true,
  },
  {
    name: "Steam Medieval Fest",
    type: "virtual-showcase",
    startDate: new Date("2026-04-20"),
    endDate: new Date("2026-04-27"),
    location: "Online (Steam)",
    country: "Global",
    website: "https://partner.steamgames.com/doc/marketing/upcoming_events/themed_sales/medieval_2026",
    registrationUrl: "https://partner.steamgames.com/optin/sale/sale_medieval_2026",
    cost: "Free",
    expectedAudience: "Millions of Steam users",
    loreWeaverScore: 6,
    loreWeaverReason: "Relevant for Faereld (dark fantasy) if demo ready; medieval games often story-heavy",
    organizer: "Valve / Steam",
    tags: ["steam", "medieval", "fantasy"],
    notes: "Games that take place in medieval times. Could register Faereld demo if available.",
    priority: "medium",
    status: "upcoming",
    isOnline: true,
  },
  // =====================
  // NARRATIVE-FOCUSED GAME JAMS
  // =====================
  {
    name: "Narrative Design Awards 2026",
    type: "game-jam",
    startDate: new Date("2026-04-01"),
    endDate: new Date("2026-09-30"),
    location: "Online (itch.io)",
    country: "Global",
    website: "https://itch.io/jam/nda-26",
    cost: "Free",
    expectedAudience: "30-100 narrative designers",
    loreWeaverScore: 10,
    loreWeaverReason: "Direct narrative design industry focus - exactly LoreWeaver's target audience",
    organizer: "itch.io community",
    tags: ["narrative", "awards", "game-jam", "writing", "design"],
    notes: "Explicit narrative design focus. Consider sponsoring or providing Architect licenses for participants.",
    priority: "high",
    status: "upcoming",
    isOnline: true,
  },
  {
    name: "Branchy Studio Narrative Jam",
    type: "game-jam",
    startDate: new Date("2026-04-01"),
    endDate: new Date("2026-04-30"),
    location: "Online (itch.io)",
    country: "Global",
    website: "https://itch.io/jam/branchy-studio-narrtive-jam",
    cost: "Free",
    expectedAudience: "20-50 narrative game developers",
    loreWeaverScore: 10,
    loreWeaverReason: "Explicit narrative game jam - perfect audience for Architect tool demos",
    organizer: "Branchy Studio",
    tags: ["narrative", "game-jam", "story", "indie"],
    notes: "Small but highly targeted. Consider reaching out to organizers for partnership.",
    priority: "high",
    status: "upcoming",
    isOnline: true,
  },
  {
    name: "NaNoRenO 2026",
    type: "game-jam",
    startDate: new Date("2026-03-01"),
    endDate: new Date("2026-03-31"),
    location: "Online (itch.io)",
    country: "Global",
    website: "https://itch.io/jam/nanoreno-2026",
    cost: "Free",
    expectedAudience: "320+ visual novel developers",
    loreWeaverScore: 10,
    loreWeaverReason: "Largest visual novel game jam, perfect Architect target audience",
    organizer: "NaNoRenO community",
    tags: ["visual-novel", "game-jam", "narrative", "renpy", "indie"],
    notes: "Already running (March). Plan for NaNoRenO 2027 engagement - sponsor or provide tools.",
    priority: "high",
    status: "past",
    isOnline: true,
  },
  {
    name: "Mystery Game Jam 2026",
    type: "game-jam",
    startDate: new Date("2026-05-01"),
    endDate: new Date("2026-05-31"),
    location: "Online (itch.io)",
    country: "Global",
    website: "https://itch.io/jam/mystery-game-jam-2026",
    cost: "Free",
    expectedAudience: "280+ mystery game developers",
    loreWeaverScore: 9,
    loreWeaverReason: "Mystery games require complex branching narratives - prime Director use case",
    organizer: "itch.io community",
    tags: ["mystery", "detective", "game-jam", "narrative"],
    notes: "Mystery/detective games often dialogue-heavy. Great Director demo opportunity.",
    priority: "high",
    status: "upcoming",
    isOnline: true,
  },
  {
    name: "Otome Jam 2026",
    type: "game-jam",
    startDate: new Date("2026-04-01"),
    endDate: new Date("2026-06-30"),
    location: "Online (itch.io)",
    country: "Global",
    website: "https://itch.io/jam/otome-jam-2026",
    cost: "Free",
    expectedAudience: "149+ otome/romance VN developers",
    loreWeaverScore: 9,
    loreWeaverReason: "Romance VNs are extremely narrative-heavy with complex branching paths",
    organizer: "itch.io community",
    tags: ["otome", "romance", "visual-novel", "game-jam"],
    notes: "Otome games have dedicated fanbase. Strong narrative requirements.",
    priority: "high",
    status: "upcoming",
    isOnline: true,
  },
  {
    name: "(No) Dialogue Jam",
    type: "game-jam",
    startDate: new Date("2026-04-15"),
    endDate: new Date("2026-04-30"),
    location: "Online (itch.io)",
    country: "Global",
    website: "https://itch.io/jam/dialogue-jam-26",
    cost: "Free",
    expectedAudience: "144+ game developers",
    loreWeaverScore: 8,
    loreWeaverReason: "Interesting narrative constraint - shows interest in dialogue/narrative mechanics",
    organizer: "itch.io community",
    tags: ["dialogue", "experimental", "game-jam", "narrative"],
    notes: "Unique angle on narrative games - exploring limits of dialogue.",
    priority: "medium",
    status: "upcoming",
    isOnline: true,
  },
  {
    name: "Dutch Game Jam #5 - Spring 2026",
    type: "game-jam",
    startDate: new Date("2026-04-01"),
    endDate: new Date("2026-04-15"),
    location: "Online (itch.io)",
    country: "Netherlands",
    website: "https://itch.io/jam/dutch-game-jam-5-spring-2026",
    cost: "Free",
    expectedAudience: "10-50 Dutch developers",
    loreWeaverScore: 7,
    loreWeaverReason: "Local Netherlands game jam - good for Dutch gamedev community connections",
    organizer: "Dutch Game Jam community",
    tags: ["dutch", "netherlands", "local", "game-jam"],
    notes: "Small but local. Good for building relationships with Dutch devs.",
    priority: "medium",
    status: "upcoming",
    isOnline: true,
  },
  // =====================
  // VIRTUAL SHOWCASES
  // =====================
  {
    name: "LudoNarraCon 2026",
    type: "virtual-showcase",
    startDate: new Date("2026-05-01"),
    endDate: new Date("2026-05-05"),
    location: "Online (Steam)",
    country: "Global",
    website: "https://www.fellowtraveller.games/ludonarracon",
    cost: "Free to attend; application required for showcasing",
    expectedAudience: "500,000+ narrative game fans",
    loreWeaverScore: 10,
    loreWeaverReason: "The premiere narrative games festival - exact LoreWeaver target market",
    organizer: "Fellow Traveller",
    tags: ["narrative", "steam", "showcase", "indie", "visual-novel", "adventure"],
    notes: "CRITICAL: Watch for application deadlines. Perfect for Director showcase. Date estimated from previous years (typically May).",
    priority: "high",
    status: "upcoming",
    isOnline: true,
  },
  {
    name: "Day of the Devs 2026",
    type: "virtual-showcase",
    startDate: new Date("2026-06-07"),
    endDate: new Date("2026-06-08"),
    location: "Online + San Francisco",
    country: "Global/USA",
    website: "https://dayofthedevs.com",
    cost: "Free to view; application required",
    expectedAudience: "100,000+ viewers",
    loreWeaverScore: 9,
    loreWeaverReason: "Indie-focused showcase with global reach, typically during GDC/Summer Game Fest period",
    organizer: "Double Fine / iam8bit",
    tags: ["indie", "showcase", "summer-game-fest"],
    notes: "Typically runs during Summer Game Fest week. Applications usually open in spring.",
    priority: "high",
    status: "upcoming",
    isOnline: true,
  },
  // =====================
  // DISCORD COMMUNITY EVENTS
  // =====================
  {
    name: "Funsmith Club (by GDS) - Ongoing",
    type: "community",
    startDate: new Date("2026-04-01"),
    endDate: new Date("2026-12-31"),
    location: "Online (Discord)",
    country: "Global",
    website: "https://disboard.org/server/604006028513640489",
    cost: "Free",
    expectedAudience: "1,979 game designers",
    loreWeaverScore: 9,
    loreWeaverReason: "Active game design community with portfolio reviews, playtesting, career guidance",
    organizer: "Game Design Syndicate",
    discordUrl: "https://disboard.org/server/join/604006028513640489",
    tags: ["discord", "community", "game-design", "networking", "portfolio"],
    notes: "Join and engage regularly. Offer Architect demos/workshops. Monthly events.",
    priority: "high",
    status: "upcoming",
    isOnline: true,
  },
  {
    name: "NoLubeGoodLuck Game Devs - Ongoing",
    type: "community",
    startDate: new Date("2026-04-01"),
    endDate: new Date("2026-12-31"),
    location: "Online (Discord)",
    country: "Global",
    website: "https://disboard.org/server/1292626173045506138",
    cost: "Free",
    expectedAudience: "549 indie game developers",
    loreWeaverScore: 8,
    loreWeaverReason: "Active indie dev community with self-promo, LFG, game jam announcements",
    organizer: "NoLubeGoodLuck community",
    discordUrl: "https://disboard.org/server/join/1292626173045506138",
    tags: ["discord", "community", "indie", "networking", "game-jams"],
    notes: "Good for finding game jam partners and indie devs interested in tools.",
    priority: "medium",
    status: "upcoming",
    isOnline: true,
  },
  {
    name: "Nova-box Community",
    type: "community",
    startDate: new Date("2026-04-01"),
    endDate: new Date("2026-12-31"),
    location: "Online (Discord)",
    country: "France/Europe",
    website: "https://disboard.org/server/1326133734709399604",
    cost: "Free",
    expectedAudience: "76 visual novel developers/fans",
    loreWeaverScore: 9,
    loreWeaverReason: "VN studio community (Along the Edge, Seers Isle) - direct narrative game focus",
    organizer: "Nova-box (Bordeaux indie studio)",
    discordUrl: "https://disboard.org/server/join/1326133734709399604",
    tags: ["discord", "visual-novel", "narrative", "indie"],
    notes: "Small but highly targeted. European VN studio community.",
    priority: "high",
    status: "upcoming",
    isOnline: true,
  },
  // =====================
  // REDDIT COMMUNITY EVENTS
  // =====================
  {
    name: "r/gamedev Screenshot Saturday - Weekly",
    type: "community",
    startDate: new Date("2026-04-01"),
    endDate: new Date("2026-12-31"),
    location: "Online (Reddit + Twitter)",
    country: "Global",
    website: "https://www.reddit.com/r/gamedev/",
    cost: "Free",
    expectedAudience: "515,000+ game developers",
    loreWeaverScore: 8,
    loreWeaverReason: "Weekly showcase opportunity with massive reach",
    organizer: "r/gamedev community",
    tags: ["reddit", "twitter", "weekly", "showcase", "screenshots"],
    notes: "Every Saturday. Use #screenshotsaturday on Twitter. Good for Architect/Director dev progress.",
    priority: "medium",
    status: "upcoming",
    isOnline: true,
  },
];

async function seedOnlineEvents() {
  console.log("Seeding Online Communities & Virtual Events...\n");

  const now = Timestamp.now();
  let created = 0;
  let skipped = 0;

  for (const event of onlineEvents) {
    // Check if event already exists
    const existingSnapshot = await db.collection("events")
      .where("name", "==", event.name)
      .where("startDate", "==", Timestamp.fromDate(event.startDate))
      .get();

    if (!existingSnapshot.empty) {
      console.log(`⏭️  Skipping: ${event.name} (already exists)`);
      skipped++;
      continue;
    }

    const eventDoc = {
      ...event,
      startDate: Timestamp.fromDate(event.startDate),
      endDate: event.endDate ? Timestamp.fromDate(event.endDate) : null,
      createdAt: now,
      updatedAt: now,
      createdBy: "skel-research",
      researchDate: "2026-03-31",
    };

    const ref = await db.collection("events").add(eventDoc);
    console.log(`✅ Created: ${event.name} (${ref.id})`);
    created++;
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Created: ${created}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Total:   ${onlineEvents.length}`);
}

// Run the seed function
seedOnlineEvents()
  .then(() => {
    console.log("\n✨ Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding events:", error);
    process.exit(1);
  });
