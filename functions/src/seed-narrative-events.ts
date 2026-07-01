/**
 * Seed script to add Narrative Design & Writing Events to the CRM
 * Research date: March 31, 2026
 *
 * Focus: Events relevant to LoreWeaver Architect users
 * - Narrative design conferences
 * - Game writing workshops
 * - Storytelling events
 * - UX/Design conferences with narrative tracks
 *
 * Run with: npx ts-node src/seed-narrative-events.ts
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

interface NarrativeEvent {
  name: string;
  type: "conference" | "meetup" | "workshop" | "awards" | "online" | "festival";
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
  tags: string[];
  notes: string;
  priority: "high" | "medium" | "low";
  status: "upcoming" | "past" | "cancelled";
  category: "narrative" | "writing" | "storytelling" | "design" | "gaming";
}

const narrativeEvents: NarrativeEvent[] = [
  // =====================
  // MAJOR CONFERENCES
  // =====================
  {
    name: "Develop:Brighton 2026",
    type: "conference",
    startDate: new Date("2026-07-14"),
    endDate: new Date("2026-07-16"),
    time: "09:00-18:00",
    location: "Brighton",
    venue: "DoubleTree by Hilton Brighton Metropole",
    country: "UK",
    website: "https://www.developconference.com",
    cost: "£300-600 (full pass)",
    expectedAudience: "2,000+ game developers",
    loreWeaverScore: 9,
    loreWeaverReason: "UK's largest game dev conference, Design track includes narrative sessions, exhibitor opportunity",
    organizer: "Develop Conference",
    tags: ["conference", "game-dev", "narrative", "design", "b2b"],
    notes: "Speaker submissions open. Consider exhibitor package. Design track with narrative content.",
    priority: "high",
    status: "upcoming",
    category: "gaming",
  },
  {
    name: "gamescom dev 2026 (Narrative Track)",
    type: "conference",
    startDate: new Date("2026-08-23"),
    endDate: new Date("2026-08-25"),
    time: "09:00-19:00",
    location: "Cologne",
    venue: "Koelnmesse",
    country: "Germany",
    website: "https://dev.gamescom.global",
    cost: "Included with Business 5 Days (~€250-400)",
    expectedAudience: "3,000+ developers, 390 speakers, 200+ sessions",
    loreWeaverScore: 10,
    loreWeaverReason: "Europe's largest game dev conference. Narrative design CONFIRMED as key program component. AI+narrative workshops planned.",
    organizer: "Koelnmesse",
    tags: ["conference", "narrative-design", "ai-narrative", "b2b", "europe"],
    notes: "MUST ATTEND. Narrative design confirmed as key track. AI+storytelling workshops. Submit speaker proposal ASAP.",
    priority: "high",
    status: "upcoming",
    category: "narrative",
  },
  {
    name: "41st Narrative Conference (ISSN)",
    type: "conference",
    startDate: new Date("2026-06-04"),
    endDate: new Date("2026-06-06"),
    location: "Aarhus",
    venue: "Aarhus University",
    country: "Denmark",
    website: "https://www.thenarrativesociety.org/2026-conference",
    cost: "€150-300 (academic conference)",
    expectedAudience: "300+ narrative researchers, academics, practitioners",
    loreWeaverScore: 9,
    loreWeaverReason: "Pure narrative focus, academic credibility, research partnerships, thought leadership positioning",
    organizer: "Narrative Research Lab & Centre for Fictionality Studies, Aarhus University",
    tags: ["academic", "narrative", "research", "storytelling"],
    notes: "Consider submitting academic paper on LoreWeaver's approach to emergent narrative. ~6h from Amsterdam.",
    priority: "high",
    status: "upcoming",
    category: "narrative",
  },
  {
    name: "UX Rotterdam 2026",
    type: "conference",
    startDate: new Date("2026-04-16"),
    endDate: new Date("2026-04-17"),
    location: "Rotterdam",
    country: "Netherlands",
    website: "https://uxrotterdam.com",
    cost: "€400-500",
    expectedAudience: "650 UX professionals",
    loreWeaverScore: 8,
    loreWeaverReason: "UX overlaps with narrative design (user journey storytelling). Architect demo opportunity.",
    organizer: "UX Rotterdam",
    tags: ["ux", "design", "user-journey", "storytelling"],
    notes: "2 conference days, 34 keynotes, 12 workshops. First UX Rotterdam edition. ~1h from Amsterdam.",
    priority: "high",
    status: "upcoming",
    category: "design",
  },
  {
    name: "Everything Procedural Conference 2026",
    type: "conference",
    startDate: new Date("2026-04-07"),
    endDate: new Date("2026-04-10"),
    location: "Breda",
    country: "Netherlands",
    website: "https://www.everythingprocedural.com",
    cost: "TBA",
    expectedAudience: "300+ game developers, technical artists",
    loreWeaverScore: 8,
    loreWeaverReason: "Procedural generation for games - Director synergy. Procedural narrative discussions.",
    organizer: "Everything Procedural",
    tags: ["procedural", "game-dev", "technical", "narrative-generation"],
    notes: "Focus on procedural content generation. Perfect for discussing Director's emergent narrative approach.",
    priority: "high",
    status: "upcoming",
    category: "gaming",
  },

  // =====================
  // FESTIVALS & CULTURAL EVENTS
  // =====================
  {
    name: "IMPAKT Festival 2026",
    type: "festival",
    startDate: new Date("2026-04-08"),
    endDate: new Date("2026-04-12"),
    location: "Utrecht",
    country: "Netherlands",
    website: "https://impakt.nl",
    cost: "€50-100 (festival pass)",
    expectedAudience: "2,000+ digital artists, media creators",
    loreWeaverScore: 7,
    loreWeaverReason: "Technology + narrative through cultural lens. Creative community, indie developer crossover.",
    organizer: "IMPAKT",
    tags: ["festival", "digital-culture", "art", "technology", "storytelling"],
    notes: "Explores tech and narrative. ~30min from Amsterdam.",
    priority: "medium",
    status: "upcoming",
    category: "storytelling",
  },
  {
    name: "FIBER Festival 2026",
    type: "festival",
    startDate: new Date("2026-05-28"),
    endDate: new Date("2026-05-31"),
    location: "Amsterdam",
    country: "Netherlands",
    website: "https://fiberfestival.nl",
    cost: "€30-60",
    expectedAudience: "1,000+ digital culture enthusiasts",
    loreWeaverScore: 7,
    loreWeaverReason: "Digital storytelling through audiovisual performances. Creative Amsterdam community.",
    organizer: "FIBER",
    tags: ["festival", "digital-culture", "audiovisual", "storytelling", "amsterdam"],
    notes: "Digital culture festival with narrative exploration. Local Amsterdam event.",
    priority: "medium",
    status: "upcoming",
    category: "storytelling",
  },
  {
    name: "Tell Tale Festival",
    type: "festival",
    startDate: new Date("2026-09-10"),
    location: "Kemzeke",
    venue: "Verbeke Foundation",
    country: "Belgium",
    website: "https://www.facebook.com/events/verbeke-foundation/tell-tale-festival/1441711984409817/",
    cost: "TBA",
    expectedAudience: "500+ storytellers, artists",
    loreWeaverScore: 6,
    loreWeaverReason: "International storytelling festival, cultural crossover, oral tradition community",
    organizer: "Verbeke Foundation",
    tags: ["storytelling", "festival", "oral-tradition", "art"],
    notes: "Traditional storytelling focus. ~2h from Amsterdam.",
    priority: "low",
    status: "upcoming",
    category: "storytelling",
  },

  // =====================
  // WRITING WORKSHOPS & COURSES
  // =====================
  {
    name: "Video Games: Creative and Critical Writing (Summer Course)",
    type: "workshop",
    startDate: new Date("2026-06-29"),
    endDate: new Date("2026-07-17"),
    location: "TBD (European university)",
    country: "Europe",
    website: "https://www.summerschoolsineurope.eu/course/video-games-creative-and-critical-writing",
    cost: "TBA",
    expectedAudience: "20-30 students, aspiring game writers",
    loreWeaverScore: 9,
    loreWeaverReason: "Direct game writing focus. Future user pipeline, academic partnership opportunity.",
    organizer: "Summer Schools in Europe",
    tags: ["workshop", "game-writing", "academic", "students"],
    notes: "3-week intensive on game narrative. Consider guest lecture or partnership.",
    priority: "high",
    status: "upcoming",
    category: "writing",
  },
  {
    name: "International Writers Collective - Spring 2026",
    type: "workshop",
    startDate: new Date("2026-04-29"),
    location: "Amsterdam / The Hague",
    country: "Netherlands",
    website: "https://internationalwriterscollective.com",
    cost: "€415/course",
    expectedAudience: "10-15 writers per course",
    loreWeaverScore: 6,
    loreWeaverReason: "Local Amsterdam creative writing community. Potential for narrative-focused partnerships.",
    organizer: "International Writers' Collective",
    tags: ["writing", "workshop", "amsterdam", "creative-writing"],
    notes: "Multiple levels of creative writing. Local network building.",
    priority: "medium",
    status: "upcoming",
    category: "writing",
  },
  {
    name: "STORYBOX Writing Sessions (Mezrab)",
    type: "meetup",
    startDate: new Date("2026-04-01"),
    time: "Monthly",
    location: "Amsterdam",
    venue: "Treehouse NDSM",
    country: "Netherlands",
    website: "https://mezrab.nl",
    cost: "€10-15 per session",
    expectedAudience: "15-30 writers per session",
    loreWeaverScore: 6,
    loreWeaverReason: "Community storytelling, local presence, monthly engagement opportunity",
    organizer: "Mezrab",
    tags: ["writing", "storytelling", "meetup", "amsterdam", "monthly"],
    notes: "Monthly sessions focused on story beginnings/endings. Ongoing community.",
    priority: "medium",
    status: "upcoming",
    category: "storytelling",
  },

  // =====================
  // WRITERS GUILD & INDUSTRY EVENTS
  // =====================
  {
    name: "WGGB: Shaping Your Game Narrative (Webinar)",
    type: "online",
    startDate: new Date("2026-01-29"),
    time: "Online",
    location: "Online",
    country: "UK",
    website: "https://writersguild.org.uk/write-on/",
    cost: "Free (WGGB members) / £15",
    expectedAudience: "50-100 writers",
    loreWeaverScore: 7,
    loreWeaverReason: "Game narrative specific, industry writers community, UK market entry",
    organizer: "Writers' Guild of Great Britain",
    tags: ["webinar", "game-writing", "guild", "online"],
    notes: "Past event but WGGB runs regular game writing events. Check for upcoming sessions.",
    priority: "medium",
    status: "past",
    category: "writing",
  },
  {
    name: "European Writers Salon Madrid",
    type: "conference",
    startDate: new Date("2026-09-25"),
    endDate: new Date("2026-09-27"),
    location: "Madrid",
    country: "Spain",
    website: "https://www.eventbrite.co.uk/e/european-writers-salon-madrid-25-27-september-2026-tickets-1982204181065",
    cost: "TBA",
    expectedAudience: "100-200 writers",
    loreWeaverScore: 5,
    loreWeaverReason: "General writing community, not game-specific. Lower priority.",
    organizer: "European Writers Salon",
    tags: ["writers", "salon", "creative-writing", "europe"],
    notes: "Weekend of creativity and community. Flight required.",
    priority: "low",
    status: "upcoming",
    category: "writing",
  },

  // =====================
  // AWARDS
  // =====================
  {
    name: "Dutch Game Awards 2026 (Narrative Category)",
    type: "awards",
    startDate: new Date("2026-11-19"),
    time: "18:30-23:00",
    location: "Breda",
    venue: "Chassé Theater",
    country: "Netherlands",
    website: "https://www.dutchgameawards.nl",
    cost: "Free to submit",
    expectedAudience: "300-500 industry professionals",
    loreWeaverScore: 8,
    loreWeaverReason: "Includes Narrative category. Architect submission potential, industry visibility.",
    organizer: "Dutch Games Association",
    tags: ["awards", "narrative", "industry", "netherlands"],
    notes: "Submit Architect in Tools category. Part of Dutch Game Week. Submissions open March 2026.",
    priority: "high",
    status: "upcoming",
    category: "gaming",
  },

  // =====================
  // REGULAR MEETUPS
  // =====================
  {
    name: "Mezrab Storytelling Night (Weekly)",
    type: "meetup",
    startDate: new Date("2026-04-01"),
    time: "Every Tuesday/Friday",
    location: "Amsterdam",
    venue: "Mezrab",
    country: "Netherlands",
    website: "https://mezrab.nl",
    cost: "€10-15",
    expectedAudience: "50-100 per night",
    loreWeaverScore: 6,
    loreWeaverReason: "Regular storytelling community. 'Mythos' (ancient myths), 'Spotlight Story Lab' (new narratives).",
    organizer: "Mezrab",
    tags: ["storytelling", "meetup", "weekly", "amsterdam"],
    notes: "Weekly storytelling nights. Open Stage Wednesdays for spontaneous stories.",
    priority: "low",
    status: "upcoming",
    category: "storytelling",
  },
  {
    name: "Storytelling Brussels (Monthly)",
    type: "meetup",
    startDate: new Date("2026-04-01"),
    time: "Monthly (check schedule)",
    location: "Brussels",
    country: "Belgium",
    website: "https://www.meetup.com/storytelling-brussels/",
    cost: "Free / Donation",
    expectedAudience: "20-40 storytellers",
    loreWeaverScore: 5,
    loreWeaverReason: "Local storytelling collective, community building",
    organizer: "Storytelling Brussels",
    tags: ["storytelling", "meetup", "monthly", "brussels"],
    notes: "Check Meetup for exact dates. Building local narrative community.",
    priority: "low",
    status: "upcoming",
    category: "storytelling",
  },
];

async function seedNarrativeEvents() {
  console.log("Seeding Narrative Design & Writing Events...\n");

  const now = Timestamp.now();
  let created = 0;
  let skipped = 0;

  for (const event of narrativeEvents) {
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
      researchType: "narrative-writing-events",
    };

    const ref = await db.collection("events").add(eventDoc);
    console.log(`✅ Created: ${event.name} (${ref.id})`);
    created++;
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Created: ${created}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Total:   ${narrativeEvents.length}`);
}

// Run the seed function
seedNarrativeEvents()
  .then(() => {
    console.log("\n✨ Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding narrative events:", error);
    process.exit(1);
  });
