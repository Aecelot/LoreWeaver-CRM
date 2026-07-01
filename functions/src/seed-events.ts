/**
 * Seed script to add Dutch + Benelux Game Dev Events to the CRM
 * Research date: March 31, 2026
 *
 * Includes:
 * - Dutch events (DGA, INDIGO, GodotCon, etc.)
 * - Belgian events (FLEGA, Brotaru, Belgian Game Awards)
 * - Nearby German events (gamescom, gamescom dev)
 * - Nordic events accessible from Benelux (Nordic Game)
 *
 * Run with: npx ts-node src/seed-events.ts
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

const beneluxGameEvents: GameEvent[] = [
  {
    name: "GodotCon Amsterdam",
    type: "conference",
    startDate: new Date("2026-04-23"),
    endDate: new Date("2026-04-24"),
    time: "10:00-18:00",
    location: "Amsterdam",
    venue: "Pathé Amsterdam Noord, Buikslotermeerplein 2003",
    country: "Netherlands",
    website: "https://conference.godotengine.org/2026/",
    ticketUrl: "https://tickets.godotengine.org/foundation/godotcon-ams-2026/",
    cost: "TBD",
    expectedAudience: "300-500 Godot developers",
    loreWeaverScore: 9,
    loreWeaverReason: "High indie dev concentration, open-source friendly community, many narrative-focused game makers use Godot",
    organizer: "Godot Foundation + Dutch Games Association",
    discordUrl: "https://discord.gg/A2YPMR23ye",
    tags: ["godot", "indie", "game-engine", "open-source", "narrative"],
    notes: "First GodotCon in Amsterdam (Godot Foundation's home city). Co-organized with DGA. Perfect for showcasing Director integration.",
    priority: "high",
    status: "upcoming",
  },
  {
    name: "Amsterdam Indie Game Developers Meetup",
    type: "meetup",
    startDate: new Date("2026-04-19"),
    time: "13:30-18:00",
    location: "Amsterdam",
    venue: "De Nieuwe Anita, 111 Frederik Hendrikstraat",
    country: "Netherlands",
    website: "https://www.meetup.com/amsterdam-indie-game-developers/",
    cost: "Free",
    expectedAudience: "20-40 indie developers",
    loreWeaverScore: 8,
    loreWeaverReason: "Grassroots dev relationships, prototype feedback, local community building",
    organizer: "Amsterdam Indie Game Developers",
    contacts: [
      { name: "Rutger", email: "", role: "Co-organizer" },
      { name: "Mirko", email: "", role: "Organizer" },
    ],
    discordUrl: "https://discord.gg/StY3uCyAyR",
    tags: ["indie", "meetup", "amsterdam", "networking", "prototypes"],
    notes: "Monthly meetup, 1,431 members, 4.8★ rating. Bring laptop for demos. Free and open to all.",
    priority: "high",
    status: "upcoming",
  },
  {
    name: "INDIGO 2026",
    type: "conference",
    startDate: new Date("2026-06-02"),
    endDate: new Date("2026-06-03"),
    location: "Rotterdam",
    venue: "World Trade Center (WTC)",
    country: "Netherlands",
    website: "https://indigoshowcase.nl/",
    ticketUrl: "https://www.eventbrite.com/checkout-external?eid=1981408192241",
    cost: "Conference €150 (Early bird €132), Business €225 (€198 early bird)",
    expectedAudience: "800-1000+ industry professionals",
    loreWeaverScore: 10,
    loreWeaverReason: "Premier B2B event, publishers, investors, studio decision-makers, MeetToMatch networking",
    organizer: "Benelux Games Promotional Initiative (BGPI)",
    contacts: [
      { name: "Martine Spaans", email: "martine@bgpi.nl", role: "Operations Manager" },
      { name: "Tom Jongens", email: "tom@bgpi.nl", role: "Sales Manager" },
      { name: "Alessandra van Otterlo", email: "alessandra@soops.net", role: "Speaker Scout" },
    ],
    tags: ["b2b", "publishers", "investors", "networking", "showcase", "meettomatch"],
    notes: "Must attend. Includes DISCOVER Showcase (game demos), INDIGO Talks (conference), MeetToMatch (B2B matchmaking). Early bird ends March 31!",
    priority: "high",
    status: "upcoming",
  },
  {
    name: "DGA Network Lunch (April)",
    type: "meetup",
    startDate: new Date("2026-04-01"),
    time: "12:00-14:00",
    location: "Utrecht",
    venue: "Dotslash Utrecht",
    country: "Netherlands",
    website: "https://dutchgamesassociation.nl/events/",
    cost: "Free (DGA members)",
    expectedAudience: "20-50 industry professionals",
    loreWeaverScore: 7,
    loreWeaverReason: "Regular industry touchpoint, studio leads, relationship building",
    organizer: "Dutch Games Association",
    tags: ["networking", "industry", "lunch", "monthly"],
    notes: "First Wednesday of each month. Great for maintaining industry relationships.",
    priority: "medium",
    status: "upcoming",
  },
  {
    name: "DGA Webinar: Franchise Building Mistakes",
    type: "online",
    startDate: new Date("2026-04-09"),
    time: "15:00-16:00",
    location: "Online",
    country: "Netherlands",
    website: "https://dutchgamesassociation.nl/events/dga-webinar-10-most-common-mistakes-franchise-building-games/",
    cost: "Free",
    expectedAudience: "50-100 attendees",
    loreWeaverScore: 5,
    loreWeaverReason: "IP/franchise focus, good for understanding studio pain points around content creation",
    organizer: "Dutch Games Association",
    contacts: [
      { name: "Christian Fonnesbech", email: "", role: "Speaker (IP Expert)" },
    ],
    tags: ["webinar", "ip", "franchise", "business"],
    notes: "Free webinar with IP expert on common franchise-building mistakes.",
    priority: "low",
    status: "upcoming",
  },
  {
    name: "playdev.club (April)",
    type: "meetup",
    startDate: new Date("2026-04-10"),
    time: "18:00-22:00",
    location: "Groningen",
    venue: "Game Bakery, Energieweg 11A",
    country: "Netherlands",
    website: "https://dutchgamesassociation.nl/playdev-club/",
    cost: "Free (must bring prototype)",
    expectedAudience: "15-25 developers with active projects",
    loreWeaverScore: 8,
    loreWeaverReason: "Direct prototype testing, peer feedback, FrieNDA environment - perfect for testing Director integration",
    organizer: "Dutch Games Association",
    contacts: [
      { name: "Alessandra", email: "alessandra@dutchgamesassociation.nl", role: "DGA Contact" },
    ],
    tags: ["prototypes", "playtesting", "feedback", "indie", "frienda"],
    notes: "Founded by Adriaan de Jongh. Must bring a prototype to attend. Under FrieNDA. ~2h from Amsterdam.",
    priority: "high",
    status: "upcoming",
  },
  {
    name: "DGA Network Lunch (May)",
    type: "meetup",
    startDate: new Date("2026-05-06"),
    time: "12:00-14:00",
    location: "Utrecht",
    venue: "Dotslash Utrecht",
    country: "Netherlands",
    website: "https://dutchgamesassociation.nl/events/",
    cost: "Free (DGA members)",
    expectedAudience: "20-50 industry professionals",
    loreWeaverScore: 7,
    loreWeaverReason: "Regular industry touchpoint",
    organizer: "Dutch Games Association",
    tags: ["networking", "industry", "lunch", "monthly"],
    notes: "",
    priority: "medium",
    status: "upcoming",
  },
  {
    name: "DGA x Engine Software Pop-Up Lunch",
    type: "meetup",
    startDate: new Date("2026-05-07"),
    time: "12:00-14:00",
    location: "Doetinchem",
    venue: "Engine Software",
    country: "Netherlands",
    website: "https://dutchgamesassociation.nl/events/dga-pop-up-lunch-may-2026/",
    cost: "Free",
    expectedAudience: "20-30 industry professionals",
    loreWeaverScore: 6,
    loreWeaverReason: "Visit established studio, networking in eastern NL",
    organizer: "Dutch Games Association",
    tags: ["networking", "studio-visit", "popup"],
    notes: "Pop-up lunch at Engine Software (established studio). ~2h from Amsterdam.",
    priority: "low",
    status: "upcoming",
  },
  {
    name: "DGA Network Lunch (June)",
    type: "meetup",
    startDate: new Date("2026-06-10"),
    time: "12:00-14:00",
    location: "Utrecht",
    venue: "Dotslash Utrecht",
    country: "Netherlands",
    website: "https://dutchgamesassociation.nl/events/",
    cost: "Free (DGA members)",
    expectedAudience: "20-50 industry professionals",
    loreWeaverScore: 7,
    loreWeaverReason: "Regular industry touchpoint",
    organizer: "Dutch Games Association",
    tags: ["networking", "industry", "lunch", "monthly"],
    notes: "",
    priority: "medium",
    status: "upcoming",
  },
  {
    name: "playdev.club (July)",
    type: "meetup",
    startDate: new Date("2026-07-01"),
    time: "14:30-18:30",
    location: "TBD",
    venue: "Dutch Game Nest",
    country: "Netherlands",
    website: "https://dutchgamesassociation.nl/playdev-club/",
    cost: "Free (must bring prototype)",
    expectedAudience: "15-25 developers",
    loreWeaverScore: 8,
    loreWeaverReason: "Prototype testing environment",
    organizer: "Dutch Games Association",
    tags: ["prototypes", "playtesting", "feedback", "indie"],
    notes: "",
    priority: "high",
    status: "upcoming",
  },
  {
    name: "DGA Network Lunch (July)",
    type: "meetup",
    startDate: new Date("2026-07-01"),
    time: "12:00-14:00",
    location: "Utrecht",
    venue: "Dotslash Utrecht",
    country: "Netherlands",
    website: "https://dutchgamesassociation.nl/events/",
    cost: "Free (DGA members)",
    expectedAudience: "20-50 industry professionals",
    loreWeaverScore: 7,
    loreWeaverReason: "Regular industry touchpoint",
    organizer: "Dutch Games Association",
    tags: ["networking", "industry", "lunch", "monthly"],
    notes: "",
    priority: "medium",
    status: "upcoming",
  },
  {
    name: "DGA Network Lunch (September)",
    type: "meetup",
    startDate: new Date("2026-09-02"),
    time: "12:00-14:00",
    location: "Utrecht",
    venue: "Dotslash Utrecht",
    country: "Netherlands",
    website: "https://dutchgamesassociation.nl/events/",
    cost: "Free (DGA members)",
    expectedAudience: "20-50 industry professionals",
    loreWeaverScore: 7,
    loreWeaverReason: "Regular industry touchpoint",
    organizer: "Dutch Games Association",
    tags: ["networking", "industry", "lunch", "monthly"],
    notes: "",
    priority: "medium",
    status: "upcoming",
  },
  {
    name: "DGA x B'GAME Pop-Up Lunch",
    type: "meetup",
    startDate: new Date("2026-09-24"),
    time: "12:00-14:00",
    location: "TBD",
    venue: "B'GAME",
    country: "Netherlands",
    website: "https://dutchgamesassociation.nl/events/dga-pop-up-lunch-september-2026/",
    cost: "Free",
    expectedAudience: "20-30 industry professionals",
    loreWeaverScore: 6,
    loreWeaverReason: "Pop-up networking event",
    organizer: "Dutch Games Association",
    tags: ["networking", "popup"],
    notes: "",
    priority: "low",
    status: "upcoming",
  },
  // =====================
  // BENELUX EVENTS (Belgium, Luxembourg, nearby Germany)
  // Research date: 2026-03-31
  // =====================
  {
    name: "FLEGA Café (April)",
    type: "meetup",
    startDate: new Date("2026-04-23"),
    time: "18:00-20:00",
    location: "TBD (check FLEGA website)",
    country: "Belgium",
    website: "https://www.flega.be/category/event/",
    cost: "Free",
    expectedAudience: "30-50 developers",
    loreWeaverScore: 8,
    loreWeaverReason: "Direct networking with Belgian game developers, builds relationships before larger events",
    organizer: "FLEGA (Flemish Games Association)",
    tags: ["networking", "belgium", "flega", "monthly", "flemish"],
    notes: "Monthly FLEGA networking event. Check FLEGA website for exact location.",
    priority: "high",
    status: "upcoming",
  },
  {
    name: "Nordic Game 2026",
    type: "conference",
    startDate: new Date("2026-05-26"),
    endDate: new Date("2026-05-29"),
    location: "Malmö",
    venue: "Slagthuset Conference Center",
    country: "Sweden",
    website: "https://nordicgame.com",
    cost: "~€400-600",
    expectedAudience: "2,500+ game professionals",
    loreWeaverScore: 8,
    loreWeaverReason: "Nordic studios strong in narrative games (Remedy, Playdead, Frictional). FLEGA organizes group booth.",
    organizer: "Nordic Game / Gameport Sweden",
    tags: ["b2b", "publishers", "nordic", "narrative", "flega-booth"],
    notes: "Apply via FLEGA for Belgian group booth participation. ~5.5h drive from Amsterdam.",
    priority: "high",
    status: "upcoming",
  },
  {
    name: "Brotaru Brussels (April)",
    type: "meetup",
    startDate: new Date("2026-04-07"),
    time: "18:00-22:00",
    location: "Brussels",
    venue: "Various (check brotaru.be)",
    country: "Belgium",
    website: "https://www.brotaru.be",
    cost: "Free",
    expectedAudience: "50-100 indie developers",
    loreWeaverScore: 9,
    loreWeaverReason: "Brussels indie dev community, perfect for Architect early adopters, tool-curious audience",
    organizer: "Brotaru / Games.brussels",
    tags: ["indie", "brussels", "monthly", "networking", "prototypes"],
    notes: "Monthly indie dev meetup in Brussels. Usually first Tuesday of month. Subscribe to newsletter for dates.",
    priority: "high",
    status: "upcoming",
  },
  {
    name: "Brotaru Brussels (May)",
    type: "meetup",
    startDate: new Date("2026-05-05"),
    time: "18:00-22:00",
    location: "Brussels",
    venue: "Various (check brotaru.be)",
    country: "Belgium",
    website: "https://www.brotaru.be",
    cost: "Free",
    expectedAudience: "50-100 indie developers",
    loreWeaverScore: 9,
    loreWeaverReason: "Monthly indie community event",
    organizer: "Brotaru / Games.brussels",
    tags: ["indie", "brussels", "monthly", "networking"],
    notes: "",
    priority: "high",
    status: "upcoming",
  },
  {
    name: "Brotaru Brussels (June)",
    type: "meetup",
    startDate: new Date("2026-06-02"),
    time: "18:00-22:00",
    location: "Brussels",
    venue: "Various (check brotaru.be)",
    country: "Belgium",
    website: "https://www.brotaru.be",
    cost: "Free",
    expectedAudience: "50-100 indie developers",
    loreWeaverScore: 9,
    loreWeaverReason: "Monthly indie community event",
    organizer: "Brotaru / Games.brussels",
    tags: ["indie", "brussels", "monthly", "networking"],
    notes: "",
    priority: "high",
    status: "upcoming",
  },
  {
    name: "FLEGA Party 2026",
    type: "meetup",
    startDate: new Date("2026-06-18"),
    time: "17:00-01:00",
    location: "TBD (Cologne or Belgium)",
    country: "Belgium",
    website: "https://www.flega.be",
    cost: "TBD",
    expectedAudience: "100-200 Belgian developers",
    loreWeaverScore: 7,
    loreWeaverReason: "Belgian industry networking, gamescom adjacent timing",
    organizer: "FLEGA",
    tags: ["networking", "party", "belgium", "flega"],
    notes: "Annual FLEGA networking party. Often around gamescom timing.",
    priority: "medium",
    status: "upcoming",
  },
  {
    name: "Immersive Tech Week Rotterdam 2026",
    type: "conference",
    startDate: new Date("2026-06-23"),
    endDate: new Date("2026-06-25"),
    location: "Rotterdam",
    country: "Netherlands",
    website: "https://immersivetechweek.com",
    cost: "TBD",
    expectedAudience: "1,000+ tech professionals",
    loreWeaverScore: 7,
    loreWeaverReason: "XR/immersive tech focus, relevant for Director's narrative AI applications in VR/AR",
    organizer: "Various",
    tags: ["vr", "ar", "xr", "immersive", "tech"],
    notes: "VR/AR narrative experiences are a growing market. Director's runtime could power interactive VR storytelling.",
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
    ticketUrl: "https://dev.gamescom.global/tickets/",
    cost: "Business 5-Day ~€200-400",
    expectedAudience: "5,000+ game professionals",
    loreWeaverScore: 10,
    loreWeaverReason: "Europe's leading developer conference, keynotes, panels, workshops, indie expo, matchmaking",
    organizer: "Koelnmesse",
    tags: ["b2b", "conference", "developers", "publishers", "investors", "matchmaking"],
    notes: "Formerly devcom. Aug 23 networking reception. Runs just before gamescom (Aug 26-30). ~2.5h from Amsterdam.",
    priority: "high",
    status: "upcoming",
  },
  {
    name: "gamescom 2026",
    type: "conference",
    startDate: new Date("2026-08-26"),
    endDate: new Date("2026-08-30"),
    location: "Cologne",
    venue: "Koelnmesse",
    country: "Germany",
    website: "https://www.gamescom.global",
    cost: "Various (business + consumer)",
    expectedAudience: "370,000+ attendees",
    loreWeaverScore: 10,
    loreWeaverReason: "World's largest game event, massive reach, publisher meetings, FLEGA organizes Belgian booth",
    organizer: "Koelnmesse",
    tags: ["exhibition", "publishers", "investors", "networking", "flega-booth"],
    notes: "Apply via FLEGA for Belgian group booth. Business days Aug 26-28, public Aug 28-30. ~2.5h from Amsterdam.",
    priority: "high",
    status: "upcoming",
  },
  {
    name: "Belgian Game Awards 2026",
    type: "awards",
    startDate: new Date("2026-10-15"),
    time: "18:00-23:00",
    location: "Brussels",
    venue: "Brussels Expo (historically)",
    country: "Belgium",
    website: "https://belgiangameawards.be",
    cost: "TBD",
    expectedAudience: "500+ industry professionals",
    loreWeaverScore: 8,
    loreWeaverReason: "Visibility, networking with award-winning Belgian studios",
    organizer: "FLEGA / WALGA / Games.brussels",
    tags: ["awards", "ceremony", "belgium", "networking"],
    notes: "Date estimated (typically mid-October). Check closer to event for exact date.",
    priority: "medium",
    status: "upcoming",
  },
  // =====================
  // LATER 2026 (outside Apr-Sep, but including for completeness)
  // =====================
  {
    name: "Dutch Game Week 2026",
    type: "conference",
    startDate: new Date("2026-11-14"),
    endDate: new Date("2026-11-22"),
    location: "Breda",
    country: "Netherlands",
    website: "https://dutchgameweek.nl/",
    cost: "Various",
    expectedAudience: "1000+ (industry + public)",
    loreWeaverScore: 8,
    loreWeaverReason: "Week-long industry festival, multiple networking opportunities",
    organizer: "Playgrounds",
    tags: ["conference", "festival", "esports", "applied-games"],
    notes: "City-wide event featuring talks, panels, networking, showcases, applied gaming, esports.",
    priority: "high",
    status: "upcoming",
  },
  {
    name: "Dutch Game Awards 2026",
    type: "awards",
    startDate: new Date("2026-11-19"),
    time: "18:30-23:00",
    location: "Breda",
    venue: "Chassé Theater",
    country: "Netherlands",
    website: "https://dutchgamesassociation.nl/events/dutch-game-awards-2026/",
    cost: "TBD",
    expectedAudience: "300-500 industry professionals",
    loreWeaverScore: 7,
    loreWeaverReason: "Awards ceremony, industry networking, potential for showcasing LoreWeaver-powered games",
    organizer: "Dutch Games Association",
    tags: ["awards", "ceremony", "industry", "networking"],
    notes: "Part of Dutch Game Week. Game submissions open March 2026.",
    priority: "medium",
    status: "upcoming",
  },
];

async function seedEvents() {
  console.log("Seeding Dutch + Benelux Game Dev Events...\n");

  const now = Timestamp.now();
  let created = 0;
  let skipped = 0;

  for (const event of beneluxGameEvents) {
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
  console.log(`   Total:   ${beneluxGameEvents.length}`);
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
