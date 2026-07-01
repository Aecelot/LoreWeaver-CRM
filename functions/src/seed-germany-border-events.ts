/**
 * Seed script to add German Border Region Game Dev Events to the CRM
 * Research date: March 31, 2026
 *
 * Includes:
 * - gamescom dev 2026 (Cologne)
 * - gamescom 2026 (Cologne)
 * - FMX 2026 (Stuttgart)
 * - MeetToMatch Cologne Edition
 * - Leadership Dinner @ gamescom
 *
 * Run with: npx ts-node src/seed-germany-border-events.ts
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

interface GameEvent {
  name: string;
  type: "conference" | "meetup" | "workshop" | "awards" | "online";
  startDate: Date;
  endDate?: Date;
  time?: string;
  location: string;
  venue?: string;
  country: string;
  website: string;
  ticketUrl?: string;
  cost: string;
  expectedAudience: string;
  loreWeaverScore: number;
  loreWeaverReason: string;
  organizer: string;
  contacts?: { name: string; email: string; role: string }[];
  discordUrl?: string;
  tags: string[];
  notes: string;
  priority: "high" | "medium" | "low";
  status: "upcoming" | "past" | "cancelled";
}

const germanyBorderEvents: GameEvent[] = [
  {
    name: "FMX 2026",
    type: "conference",
    startDate: new Date("2026-05-05"),
    endDate: new Date("2026-05-08"),
    time: "09:00-19:00",
    location: "Stuttgart",
    venue: "Haus der Wirtschaft, Willi-Bleicher-Straße 19",
    country: "Germany",
    website: "https://www.fmx.de",
    ticketUrl: "https://fmx.de/en/tickets",
    cost: "Conference Pass €410 (Pro), €205 (Student), Business Pass €510, Day Pass €205",
    expectedAudience: "4,000+ professionals in animation, VFX, games, immersive media",
    loreWeaverScore: 7,
    loreWeaverReason: "Focus on animation/VFX/games/immersive media. 30th anniversary edition. Strong overlap with narrative-driven development, good for technical partnerships.",
    organizer: "Filmakademie Baden-Württemberg GmbH",
    contacts: [
      { name: "FMX Tickets", email: "tickets@fmx.de", role: "Ticket Support" },
      { name: "FMX Press", email: "press@fmx.de", role: "Press Contact" },
    ],
    tags: ["animation", "vfx", "games", "immersive", "transmedia", "conference", "germany"],
    notes: "30th anniversary edition. Co-located with Stuttgart International Festival of Animated Film (ITFS). Combi Pass (FMX+ITFS) €450. Extended Early Bird until March 30. On Campus program May 8 for talents/education.",
    priority: "medium",
    status: "upcoming",
  },
  {
    name: "gamescom dev 2026",
    type: "conference",
    startDate: new Date("2026-08-23"),
    endDate: new Date("2026-08-25"),
    time: "09:00-19:00",
    location: "Cologne",
    venue: "Koelnmesse",
    country: "Germany",
    website: "https://dev.gamescom.global",
    ticketUrl: "https://tickets.gamescom.global/gamescom2026_tickets_fb_e",
    cost: "Basic €227, Content €399, Trade €719, VIP €1,439, Student €103 (Early Bird until March 31)",
    expectedAudience: "5,000+ game industry professionals",
    loreWeaverScore: 10,
    loreWeaverReason: "Europe's largest game developer conference. Direct access to narrative designers, studio leads, publishers. Matchmaking system for B2B meetings. Indie expo opportunity.",
    organizer: "Koelnmesse / game – Verband der deutschen Games-Branche",
    contacts: [
      { name: "gamescom dev", email: "dev@gamescom.global", role: "General Contact" },
    ],
    discordUrl: "https://discord.gg/gamescomdev",
    tags: ["b2b", "conference", "developers", "publishers", "investors", "matchmaking", "networking", "indie-expo", "germany"],
    notes: "Formerly devcom, rebranded late 2025. Speaker applications close April 5, 2026. Indie booth applications close April 30, 2026. All tickets include gamescom Business 3 Days (Aug 26-28). Aug 23 Sunset Mixer, Aug 24 Developer Night, Aug 24 Leadership Dinner (Trade/VIP). ~2.5h from Amsterdam.",
    priority: "high",
    status: "upcoming",
  },
  {
    name: "gamescom 2026",
    type: "conference",
    startDate: new Date("2026-08-26"),
    endDate: new Date("2026-08-30"),
    time: "09:00-20:00",
    location: "Cologne",
    venue: "Koelnmesse",
    country: "Germany",
    website: "https://www.gamescom.global",
    ticketUrl: "https://tickets.gamescom.global/gamescom2026_tickets_fb_e",
    cost: "Same tickets as gamescom dev (Business 5 Days Pass covers both)",
    expectedAudience: "370,000+ attendees (industry + consumer)",
    loreWeaverScore: 9,
    loreWeaverReason: "World's largest gaming event. Same ticket covers both gamescom dev and gamescom. Business area for B2B meetings (Trade/VIP). Major publishers present (Ubisoft, Nintendo, Capcom, etc.).",
    organizer: "Koelnmesse / game – Verband der deutschen Games-Branche",
    tags: ["exhibition", "publishers", "investors", "networking", "consumer", "germany"],
    notes: "Business days Aug 26-28, public days Aug 28-30. gamescom dev booth presence (with Trade ticket). Opening Night Live Aug 25. gamescom LAN Aug 26-30. ~2.5h from Amsterdam.",
    priority: "high",
    status: "upcoming",
  },
  {
    name: "MeetToMatch - The Cologne Edition",
    type: "meetup",
    startDate: new Date("2026-08-24"),
    time: "09:00-18:00",
    location: "Cologne",
    venue: "Koelnmesse / Various",
    country: "Germany",
    website: "https://www.meettomatch.com",
    cost: "Included with gamescom dev Trade/VIP ticket",
    expectedAudience: "500+ developers, publishers, investors",
    loreWeaverScore: 8,
    loreWeaverReason: "Focused B2B matchmaking during gamescom week. Concentrated networking with developers and investors.",
    organizer: "MeetToMatch",
    tags: ["b2b", "matchmaking", "networking", "investors", "publishers", "germany"],
    notes: "Part of gamescom week. Requires gamescom dev Trade or VIP ticket for full access.",
    priority: "high",
    status: "upcoming",
  },
  {
    name: "Leadership Dinner @ gamescom 2026",
    type: "meetup",
    startDate: new Date("2026-08-24"),
    time: "19:00-22:00",
    location: "Cologne",
    venue: "TBD",
    country: "Germany",
    website: "https://dev.gamescom.global/leadership-events/",
    cost: "Included with gamescom dev Trade/VIP ticket",
    expectedAudience: "100-200 industry executives",
    loreWeaverScore: 9,
    loreWeaverReason: "High-value executive networking. Industry leaders, studio heads, publisher decision-makers.",
    organizer: "gamescom dev",
    tags: ["networking", "executives", "leadership", "dinner", "germany"],
    notes: "Requires gamescom dev Trade or VIP ticket. Exclusive networking with industry executives.",
    priority: "high",
    status: "upcoming",
  },
  {
    name: "gamescom dev Sunset Mixer 2026",
    type: "meetup",
    startDate: new Date("2026-08-23"),
    time: "18:00-22:00",
    location: "Cologne",
    venue: "Koelnmesse / Outdoor area",
    country: "Germany",
    website: "https://dev.gamescom.global",
    cost: "Included with all gamescom dev tickets",
    expectedAudience: "1,000+ developers",
    loreWeaverScore: 8,
    loreWeaverReason: "Opening night networking event. Great for making first connections before the conference.",
    organizer: "gamescom dev",
    tags: ["networking", "party", "opener", "germany"],
    notes: "First day networking event. Included with all gamescom dev tickets (including Basic).",
    priority: "high",
    status: "upcoming",
  },
  {
    name: "gamescom dev Developer Night 2026",
    type: "meetup",
    startDate: new Date("2026-08-24"),
    time: "20:00-02:00",
    location: "Cologne",
    venue: "TBD",
    country: "Germany",
    website: "https://dev.gamescom.global",
    cost: "Included with gamescom dev Content/Trade/VIP tickets",
    expectedAudience: "2,000+ developers",
    loreWeaverScore: 8,
    loreWeaverReason: "Main party event. Informal networking opportunity with developers from around the world.",
    organizer: "gamescom dev",
    tags: ["networking", "party", "developers", "germany"],
    notes: "Main conference party. Included with Content, Trade, and VIP tickets (not Basic).",
    priority: "high",
    status: "upcoming",
  },
];

async function seedEvents() {
  console.log("Seeding German Border Region Game Dev Events...\n");

  const now = Timestamp.now();
  let created = 0;
  let skipped = 0;

  for (const event of germanyBorderEvents) {
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
      region: "germany-border",
    };

    const ref = await db.collection("events").add(eventDoc);
    console.log(`✅ Created: ${event.name} (${ref.id})`);
    created++;
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Created: ${created}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Total:   ${germanyBorderEvents.length}`);
}

// Run the seed function
seedEvents()
  .then(() => {
    console.log("\n✨ Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding events:", error);
    process.exit(1);
  });
