/**
 * Seed script to add University & Academic Game Events to the CRM
 * Research date: March 31, 2026
 *
 * Focus: Student showcases, academic conferences, university events
 * within 3 hours of Amsterdam for April-September 2026
 *
 * Run with: npx ts-node src/seed-university-events.ts
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
  type: "conference" | "meetup" | "workshop" | "awards" | "showcase" | "online";
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

const universityGameEvents: GameEvent[] = [
  {
    name: "Everything Procedural Conference 2026",
    type: "conference",
    startDate: new Date("2026-04-07"),
    endDate: new Date("2026-04-10"),
    time: "09:00-18:00",
    location: "Breda",
    venue: "BUAS Campus",
    country: "Netherlands",
    website: "https://www.everythingprocedural.com/",
    cost: "€150-400",
    expectedAudience: "200-400 tech artists, game developers",
    loreWeaverScore: 7,
    loreWeaverReason: "Procedural content generation overlaps with dynamic narrative systems. Technical networking opportunity.",
    organizer: "Breda University of Applied Sciences",
    tags: ["procedural", "technical", "academic", "buas", "houdini"],
    notes: "10th anniversary edition. Focus on procedural techniques in gaming. Technical artists and studios building content pipelines.",
    priority: "medium",
    status: "upcoming",
  },
  {
    name: "Virtual Production Gathering (VPG) 2026",
    type: "conference",
    startDate: new Date("2026-04-14"),
    endDate: new Date("2026-04-16"),
    time: "09:00-18:00",
    location: "Breda",
    venue: "BUAS Campus",
    country: "Netherlands",
    website: "https://vpgathering.com/",
    ticketUrl: "https://www.b2match.com/e/vp-gathering-2026",
    cost: "€150-300",
    expectedAudience: "300-500 educators, students, film/TV/game professionals",
    loreWeaverScore: 6,
    loreWeaverReason: "VP tech connects to real-time narrative (motion capture, AI integration). Education Day on April 14 for students.",
    organizer: "Breda University of Applied Sciences",
    tags: ["virtual-production", "academic", "buas", "students", "film-tv"],
    notes: "Theme: 'Leaders of the Craft'. Education Day specifically for educators and students. Cross-industry (film/TV/games).",
    priority: "medium",
    status: "upcoming",
  },
  {
    name: "DiGRA 2026 - Intersectional Pleasures",
    type: "conference",
    startDate: new Date("2026-06-14"),
    endDate: new Date("2026-06-18"),
    time: "09:00-18:00",
    location: "Maynooth",
    venue: "Maynooth University",
    country: "Ireland",
    website: "https://www.digraconference2026.com/",
    ticketUrl: "https://shop.maynoothuniversity.ie/index.php?app=ecom&ns=prodshow&ref=1590034a",
    cost: "€250-400 (early bird until April 1)",
    expectedAudience: "300-500 game researchers, academics, PhD students",
    loreWeaverScore: 9,
    loreWeaverReason: "Premier academic game research conference. Narrative studies, procedural rhetoric, player agency research. Academic validation opportunity.",
    organizer: "Digital Games Research Association (DiGRA)",
    contacts: [
      { name: "DiGRA Ireland Committee", email: "digraireland2026@gmail.com", role: "Organizers" },
    ],
    tags: ["academic", "research", "narrative", "digra", "phd-students"],
    notes: "17th Annual DiGRA Conference. Hybrid event. Theme: 'Intersectional Pleasures' - addresses player pleasure/agency. ~1h flight from Amsterdam.",
    priority: "high",
    status: "upcoming",
  },
  {
    name: "HKU Exposure 2026",
    type: "showcase",
    startDate: new Date("2026-06-24"),
    endDate: new Date("2026-06-28"),
    time: "11:00-19:00",
    location: "Utrecht",
    venue: "Multiple locations throughout Utrecht",
    country: "Netherlands",
    website: "https://www.hku.nl/en/exposure",
    cost: "Free",
    expectedAudience: "5,000+ visitors; ~700 graduating students",
    loreWeaverScore: 9,
    loreWeaverReason: "HKU Games has strong narrative design program. Direct access to graduating narrative designers and game writers.",
    organizer: "HKU - University of the Arts Utrecht",
    contacts: [
      { name: "HKU Games", email: "exposure@hku.nl", role: "Department" },
    ],
    tags: ["student-showcase", "graduation", "hku", "narrative-design", "recruitment"],
    notes: "Utrecht-wide festival. HKU Games students showcase final projects. Many focus on narrative, interactive fiction, experimental storytelling. Recruitment + beta tester pool.",
    priority: "high",
    status: "upcoming",
  },
  {
    name: "BUas Games Industry Showcase 2026",
    type: "showcase",
    startDate: new Date("2026-07-01"), // Approximate - typically early July
    time: "10:00-17:00",
    location: "Breda",
    venue: "BUAS Campus",
    country: "Netherlands",
    website: "https://www.dutchgamegarden.nl/events/buas-games-industry-showcase/",
    cost: "Free for industry",
    expectedAudience: "170+ industry visitors; 100+ student games",
    loreWeaverScore: 8,
    loreWeaverReason: "IGAD program includes narrative/writing specializations. Direct student recruitment opportunity.",
    organizer: "Breda University of Applied Sciences / Dutch Game Garden",
    tags: ["student-showcase", "igad", "buas", "recruitment", "prototypes"],
    notes: "Annual showcase with 100+ student games and prototypes. Industry professionals can talk directly with students. Exact 2026 date TBA - check website.",
    priority: "high",
    status: "upcoming",
  },
  {
    name: "Dutch DiGRA 2026",
    type: "conference",
    startDate: new Date("2026-11-18"),
    time: "10:00-17:00",
    location: "Utrecht",
    venue: "Utrecht University",
    country: "Netherlands",
    website: "https://gameresearch.nl/",
    cost: "Free/Low cost",
    expectedAudience: "50-100 game researchers, academics",
    loreWeaverScore: 7,
    loreWeaverReason: "Annual Dutch game studies symposium. Connects to Utrecht University's Center for Game Research. Local academic network.",
    organizer: "Utrecht University - Center for Game Research",
    tags: ["academic", "research", "dutch-digra", "utrecht-university"],
    notes: "One-day symposium for Dutch game researchers. Good for building local academic relationships. Outside Apr-Sep scope but important for network building.",
    priority: "medium",
    status: "upcoming",
  },
  {
    name: "Dutch Game Awards 2026 (Best Student Game)",
    type: "awards",
    startDate: new Date("2026-11-19"),
    time: "18:00-23:00",
    location: "Breda",
    venue: "Chassé Theater",
    country: "Netherlands",
    website: "https://www.dutchgameawards.nl/",
    cost: "€50-100",
    expectedAudience: "400-600 Dutch game industry",
    loreWeaverScore: 8,
    loreWeaverReason: "Best Student Game category showcases top Dutch student projects. Sponsorship opportunity. Part of Dutch Game Week (Nov 14-22).",
    organizer: "Dutch Games Association",
    tags: ["awards", "students", "dutch-games", "networking", "sponsorship"],
    notes: "Submissions open until July 31, 2026. LoreWeaver could sponsor Student Game category. Outside Apr-Sep scope but important industry event.",
    priority: "medium",
    status: "upcoming",
  },
];

async function seedEvents() {
  console.log("🎓 Seeding University & Academic Game Events...\n");

  const eventsRef = db.collection("events");
  let added = 0;
  let skipped = 0;

  for (const event of universityGameEvents) {
    // Check if event already exists
    const existing = await eventsRef
      .where("name", "==", event.name)
      .where("startDate", "==", Timestamp.fromDate(event.startDate))
      .get();

    if (!existing.empty) {
      console.log(`⏭️  Skipping (exists): ${event.name}`);
      skipped++;
      continue;
    }

    // Add the event
    const eventDoc = {
      ...event,
      startDate: Timestamp.fromDate(event.startDate),
      endDate: event.endDate ? Timestamp.fromDate(event.endDate) : null,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      source: "research/events-university-academic.md",
      category: "university-academic",
    };

    await eventsRef.add(eventDoc);
    console.log(`✅ Added: ${event.name} (${event.location}, ${event.startDate.toLocaleDateString()})`);
    added++;
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Added: ${added}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Total: ${universityGameEvents.length}`);
}

seedEvents()
  .then(() => {
    console.log("\n✨ Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding events:", error);
    process.exit(1);
  });
