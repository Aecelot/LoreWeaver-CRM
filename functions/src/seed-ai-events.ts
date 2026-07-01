/**
 * Seed script to add AI & Tech Events Netherlands to the CRM
 * Research date: March 31, 2026
 *
 * Includes:
 * - Major AI conferences in NL (ML Conference, World Summit AI, etc.)
 * - AI/tech meetup groups in Amsterdam
 * - MCP/Agent-focused events
 *
 * Run with: npx ts-node src/seed-ai-events.ts
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

interface AIEvent {
  name: string;
  type: "conference" | "meetup" | "workshop" | "summit" | "online";
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
  tags: string[];
  notes: string;
  priority: "high" | "medium" | "low";
  status: "upcoming" | "past" | "cancelled";
}

const aiTechEvents: AIEvent[] = [
  // =====================
  // MAJOR CONFERENCES
  // =====================
  {
    name: "ML Conference Amsterdam 2026",
    type: "conference",
    startDate: new Date("2026-04-20"),
    endDate: new Date("2026-04-24"),
    time: "09:00-17:00",
    location: "Amsterdam",
    venue: "Van der Valk Hotel Amsterdam - Amstel",
    country: "Netherlands",
    website: "https://mlconference.ai/amsterdam/",
    ticketUrl: "https://mlconference.ai/amsterdam/tickets-amsterdam/",
    cost: "€539 (1-day) to €2,099 (full week bootcamp)",
    expectedAudience: "2,500+ ML engineers, data scientists, AI developers",
    loreWeaverScore: 9,
    loreWeaverReason: "Generative AI, LLMs, RAG, MLOps, agentic workflows - all directly applicable to Director",
    organizer: "Software & Support Media",
    tags: ["ml", "genai", "llm", "rag", "mlops", "agentic", "production"],
    notes: "5-day event: Bootcamps Apr 20-21, Conference Apr 22-23, Workshops Apr 24. Sessions on agentic AI, RAG, production patterns directly applicable to Director architecture.",
    priority: "high",
    status: "upcoming",
  },
  {
    name: "Devworld Conference 2026",
    type: "conference",
    startDate: new Date("2026-05-07"),
    endDate: new Date("2026-05-08"),
    location: "Amsterdam",
    country: "Netherlands",
    website: "https://devworldconference.com/",
    cost: "TBD",
    expectedAudience: "1,500+ developers",
    loreWeaverScore: 7,
    loreWeaverReason: "Developer conference with AI track, good for reaching game developers",
    organizer: "Various",
    tags: ["developers", "tech", "ai"],
    notes: "Developer-focused conference with AI integration tracks.",
    priority: "medium",
    status: "upcoming",
  },
  {
    name: "TechLead Conf 2026 Amsterdam",
    type: "conference",
    startDate: new Date("2026-06-11"),
    endDate: new Date("2026-06-12"),
    location: "Amsterdam",
    country: "Netherlands",
    website: "https://dev.events/conferences/tech-lead-conf-2026-amsterdam-cvf1x3en",
    cost: "TBD",
    expectedAudience: "500+ tech leads, engineering managers",
    loreWeaverScore: 6,
    loreWeaverReason: "Tech leadership, AI strategy at organizational level",
    organizer: "Various",
    tags: ["techlead", "leadership", "strategy"],
    notes: "Good for connecting with decision-makers at studios.",
    priority: "medium",
    status: "upcoming",
  },
  {
    name: "AgentCon Utrecht 2026",
    type: "conference",
    startDate: new Date("2026-06-25"),
    location: "Utrecht",
    country: "Netherlands",
    website: "https://dev.events/conferences/agent-con-utrecht-puon6yfj",
    cost: "TBD",
    expectedAudience: "300-500 AI agent developers",
    loreWeaverScore: 9,
    loreWeaverReason: "AI agents focus - directly relevant to Director's multi-agent architecture (DM/NPC/World agents)",
    organizer: "Various",
    tags: ["agents", "multi-agent", "agentic-ai", "orchestration"],
    notes: "Perfect for Director team. Multi-agent orchestration directly aligns with LoreWeaver's architecture.",
    priority: "high",
    status: "upcoming",
  },
  {
    name: "ICAI Summer School 2026",
    type: "workshop",
    startDate: new Date("2026-06-29"),
    endDate: new Date("2026-06-30"),
    time: "09:00-18:30",
    location: "Amsterdam",
    venue: "Lab42",
    country: "Netherlands",
    website: "https://www.eventbrite.com/e/tickets-icai-summer-school-june-29th-30th-2026-1383489738049",
    cost: "Free/Low",
    expectedAudience: "200+ PhD students, AI researchers",
    loreWeaverScore: 8,
    loreWeaverReason: "Academic AI connections, sessions on human-AI interaction, causal reasoning relevant to narrative AI",
    organizer: "ICAI (Innovation Center for Artificial Intelligence)",
    tags: ["academic", "research", "phd", "human-ai", "causality"],
    notes: "Includes canal cruise networking. Topics: energy-efficient AI, causality, human-AI interaction, large reasoning models.",
    priority: "high",
    status: "upcoming",
  },
  {
    name: "Intelligent Systems Conference 2026",
    type: "conference",
    startDate: new Date("2026-09-03"),
    endDate: new Date("2026-09-04"),
    location: "Amsterdam",
    country: "Netherlands",
    website: "https://dev.events/conferences/12th-intelligent-systems-conference-2026-zkdiephw",
    cost: "TBD",
    expectedAudience: "500+ AI researchers",
    loreWeaverScore: 7,
    loreWeaverReason: "Academic AI systems conference, potential research partnerships",
    organizer: "IntelliSys",
    tags: ["academic", "research", "intelligent-systems"],
    notes: "12th edition. Academic AI systems research.",
    priority: "medium",
    status: "upcoming",
  },
  {
    name: "MCP Dev Summit Europe 2026",
    type: "summit",
    startDate: new Date("2026-09-17"),
    endDate: new Date("2026-09-18"),
    location: "Amsterdam",
    country: "Netherlands",
    website: "https://dev.events/conferences/mcp-dev-summit-europe-xozvqupc",
    cost: "TBD",
    expectedAudience: "500+ MCP developers",
    loreWeaverScore: 10,
    loreWeaverReason: "MCP (Model Context Protocol) is Director's core architecture! THE event for LoreWeaver's tech stack",
    organizer: "Various",
    tags: ["mcp", "model-context-protocol", "architecture", "integration"],
    notes: "MUST ATTEND. Director uses MCP architecture. Perfect for showcasing LoreWeaver's MCP implementation.",
    priority: "high",
    status: "upcoming",
  },
  {
    name: "World Summit AI 2026",
    type: "summit",
    startDate: new Date("2026-10-14"),
    endDate: new Date("2026-10-15"),
    location: "Amsterdam",
    country: "Netherlands",
    website: "https://worldsummit.ai/",
    cost: "~€800-1,500",
    expectedAudience: "10,000+ AI ecosystem: enterprises, startups, investors, researchers",
    loreWeaverScore: 8,
    loreWeaverReason: "Major investor presence - relevant for EUR 400K round. Global AI ecosystem networking",
    organizer: "Inspired Minds",
    tags: ["summit", "enterprise", "startups", "investors", "networking"],
    notes: "10th anniversary edition. Theme: 'Guardians of Tomorrow'. Part of World AI Week (100+ events). Great for investor networking.",
    priority: "high",
    status: "upcoming",
  },
  {
    name: "Data Saturday Holland 2026",
    type: "conference",
    startDate: new Date("2026-10-09"),
    endDate: new Date("2026-10-10"),
    location: "Utrecht",
    country: "Netherlands",
    website: "https://dev.events/conferences/data-saturday-holland-2026-8xbahqf6",
    cost: "Free/Low",
    expectedAudience: "300+ data professionals",
    loreWeaverScore: 5,
    loreWeaverReason: "Data community event, some ML content",
    organizer: "Data Saturday",
    tags: ["data", "community", "free"],
    notes: "Community-driven data conference.",
    priority: "low",
    status: "upcoming",
  },
  // =====================
  // MEETUP GROUPS (Key Groups to Join)
  // =====================
  {
    name: "AI On The Amstel Meetup (Apr: Autonomous AI)",
    type: "meetup",
    startDate: new Date("2026-04-01"),
    time: "17:00-21:00",
    location: "Amsterdam",
    country: "Netherlands",
    website: "https://www.meetup.com/ai-on-the-amstel-meetup/",
    cost: "Free",
    expectedAudience: "500+ (waitlist)",
    loreWeaverScore: 8,
    loreWeaverReason: "Large Amsterdam AI community, autonomous AI focus relevant to Director",
    organizer: "AI On The Amstel",
    tags: ["meetup", "autonomous-ai", "networking", "amsterdam"],
    notes: "4.7★ rating. Currently on waitlist (500 attendees). Topic: 'Autonomous AI – how far can we go?'",
    priority: "high",
    status: "upcoming",
  },
  {
    name: "AI Native Netherlands: Scaling AI in Production",
    type: "meetup",
    startDate: new Date("2026-04-07"),
    time: "18:00-21:00",
    location: "Amsterdam",
    country: "Netherlands",
    website: "https://www.meetup.com/ai-native-amsterdam/",
    cost: "Free",
    expectedAudience: "183 attendees",
    loreWeaverScore: 8,
    loreWeaverReason: "Production AI focus matches Director deployment challenges",
    organizer: "AI Native Netherlands",
    tags: ["meetup", "production-ai", "aiops", "scaling"],
    notes: "4.7★ rating. Topic: AIOps, Architecture, Human Oversight.",
    priority: "high",
    status: "upcoming",
  },
  {
    name: "Vibe-Coding Meetup: How to AI (Show & Tell)",
    type: "meetup",
    startDate: new Date("2026-04-08"),
    time: "18:00-21:00",
    location: "Amsterdam",
    country: "Netherlands",
    website: "https://www.meetup.com/amsterdam-vibe-coding-meetup/",
    cost: "Free",
    expectedAudience: "67 attendees",
    loreWeaverScore: 7,
    loreWeaverReason: "AI + Product/Design intersection, creative AI focus",
    organizer: "Vibe-Coding Meetup",
    tags: ["meetup", "ai-coding", "product", "design"],
    notes: "4.7★ rating. AI meets Product & Design community. 3 seats left!",
    priority: "medium",
    status: "upcoming",
  },
  {
    name: "AI Native Netherlands: Prompts to Pre-Training",
    type: "meetup",
    startDate: new Date("2026-05-07"),
    time: "17:45-21:00",
    location: "Amsterdam",
    country: "Netherlands",
    website: "https://www.meetup.com/ai-native-amsterdam/",
    cost: "Free",
    expectedAudience: "87 attendees",
    loreWeaverScore: 8,
    loreWeaverReason: "Training/fine-tuning focus directly relevant to LoreWeaver's style-transfer work",
    organizer: "AI Native Netherlands",
    tags: ["meetup", "training", "fine-tuning", "pre-training"],
    notes: "4.7★ rating. Topic: 'From Prompts to Pre-Training: Quality, Scale, and the Road to AI Native'",
    priority: "high",
    status: "upcoming",
  },
  {
    name: "PyLadies Amsterdam: AgentCamp Amsterdam 2026",
    type: "meetup",
    startDate: new Date("2026-04-23"),
    time: "18:00-21:00",
    location: "Online",
    country: "Netherlands",
    website: "https://www.meetup.com/pyladiesams/",
    cost: "Free",
    expectedAudience: "33 attendees",
    loreWeaverScore: 7,
    loreWeaverReason: "Python AI agents focus, diverse community",
    organizer: "PyLadies Amsterdam",
    tags: ["meetup", "python", "agents", "online"],
    notes: "4.7★ rating. Online event on AI agents.",
    priority: "medium",
    status: "upcoming",
  },
  {
    name: "DataTalks NL: Data & AI Strategy",
    type: "meetup",
    startDate: new Date("2026-04-16"),
    time: "18:30-21:00",
    location: "Amsterdam",
    country: "Netherlands",
    website: "https://www.meetup.com/datatalks-nl/",
    cost: "Free",
    expectedAudience: "39 attendees",
    loreWeaverScore: 6,
    loreWeaverReason: "Data/AI strategy discussion, decision-maker audience",
    organizer: "DataTalks NL",
    tags: ["meetup", "data", "strategy", "business"],
    notes: "10th edition. Topic: 'Data & AI Strategy: Making the Right Moves'",
    priority: "medium",
    status: "upcoming",
  },
  {
    name: "Databricks Community NL: MLOps Edition",
    type: "meetup",
    startDate: new Date("2026-04-02"),
    time: "18:00-21:00",
    location: "Amsterdam",
    country: "Netherlands",
    website: "https://www.meetup.com/databricks-community-nl/",
    cost: "Free",
    expectedAudience: "25 attendees",
    loreWeaverScore: 6,
    loreWeaverReason: "MLOps focus relevant to Director deployment",
    organizer: "Databricks",
    tags: ["meetup", "databricks", "mlops"],
    notes: "4.3★ rating. Databricks Community Night - MLOps edition.",
    priority: "medium",
    status: "upcoming",
  },
  {
    name: "Amsterdam AI Developers: AI-Ready Data Framework",
    type: "meetup",
    startDate: new Date("2026-04-15"),
    time: "19:00-21:00",
    location: "Online",
    country: "Netherlands",
    website: "https://www.meetup.com/amsterdam-ai-developers-group/",
    cost: "Free",
    expectedAudience: "18 attendees",
    loreWeaverScore: 7,
    loreWeaverReason: "Agent skills development, relevant to Director architecture",
    organizer: "Amsterdam AI Developers Group",
    tags: ["meetup", "agents", "online", "development"],
    notes: "4.3★ rating. Topic: 'AI-Ready Data Framework with Agent Skills'",
    priority: "medium",
    status: "upcoming",
  },
];

async function seedAIEvents() {
  console.log("Seeding AI & Tech Events Netherlands...\n");

  const now = Timestamp.now();
  let created = 0;
  let skipped = 0;

  for (const event of aiTechEvents) {
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
      category: "ai-tech", // Distinguish from game events
    };

    const ref = await db.collection("events").add(eventDoc);
    console.log(`✅ Created: ${event.name} (${ref.id})`);
    created++;
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Created: ${created}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Total:   ${aiTechEvents.length}`);
}

// Run the seed function
seedAIEvents()
  .then(() => {
    console.log("\n✨ Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding AI events:", error);
    process.exit(1);
  });
