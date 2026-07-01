/**
 * Import batch 2 deep-dive research into CRM (13 competitors)
 * 
 * Run with: npx ts-node src/import-deep-dives-batch2.ts
 */

import * as admin from "firebase-admin";
import { Timestamp } from "firebase-admin/firestore";
import * as fs from "fs";
import * as path from "path";

if (!admin.apps.length) {
  admin.initializeApp({ projectId: "loreweaver-crm" });
}

const db = admin.firestore();

interface DeepDive {
  leadName: string;
  altNames?: string[];
  threatLevel: 1 | 2 | 3 | 4 | 5;
  targetMarket: "architect" | "director" | "both";
  country: string;
  website: string;
  fundingStage: string;
  fundingAmount?: string;
  differentiator: string;
  strengths: string[];
  weaknesses: string[];
  contacts: Array<{
    name: string;
    role: string;
    background?: string;
  }>;
  reportFile: string;
}

const deepDives: DeepDive[] = [
  {
    leadName: "Inworld AI",
    threatLevel: 5,
    targetMarket: "director",
    country: "USA",
    website: "https://inworld.ai",
    fundingStage: "Series B+",
    fundingAmount: "$117-120M",
    differentiator: "Best-funded AI NPC startup, pivoting to voice AI platform",
    strengths: [
      "$117-120M raised, $500M valuation",
      "Partnerships with Microsoft/Xbox, NVIDIA, Ubisoft, Disney",
      "Founded by API.AI team (sold to Google → Dialogflow)",
      "#1 ranked TTS on benchmarks",
      "SOC 2 / HIPAA / GDPR compliant"
    ],
    weaknesses: [
      "Pivoting AWAY from games to generic voice AI platform",
      "No shipped AAA titles despite partnerships",
      "Ending personal accounts (alienating indies)",
      "Character-level memory only - no world-level lore coherence",
      "Usage-based pricing creates budget uncertainty"
    ],
    contacts: [
      { name: "Kylan Gibbs", role: "CEO", background: "Ex-Google DeepMind PM, worked on early LLMs that became Gemini" },
      { name: "Ilya Gelfenbeyn", role: "Chairman", background: "API.AI founder, ex-Google Assistant Investments head" },
      { name: "Michael Ermolenko", role: "CTO", background: "Ex-Google Engineering Manager" }
    ],
    reportFile: "competitor-deep-dive-inworld-2026-03-06.md"
  },
  {
    leadName: "Convai",
    threatLevel: 3,
    targetMarket: "director",
    country: "USA",
    website: "https://convai.com",
    fundingStage: "Seed",
    fundingAmount: "$5M",
    differentiator: "Real-time conversational AI for NPCs with NVIDIA ACE integration",
    strengths: [
      "Voice-to-voice interaction (no text intermediary)",
      "Spatial awareness for 3D environments",
      "65+ languages, 500+ voices",
      "Free tier available",
      "15K+ registered users"
    ],
    weaknesses: [
      "Cloud-dependent = latency issues",
      "Smaller funding than Inworld ($5M vs $120M)",
      "Resource intensive for multiple characters",
      "Limited AAA partnerships"
    ],
    contacts: [
      { name: "Purnendu Mukherjee", role: "CEO & Founder", background: "Ex-NVIDIA engineer" },
      { name: "Sagar Trehan", role: "Head of Applied AI/ML", background: "" }
    ],
    reportFile: "competitor-deep-dive-convai-2026-03-06.md"
  },
  {
    leadName: "Charisma.ai",
    altNames: ["Charisma Entertainment"],
    threatLevel: 3,
    targetMarket: "both",
    country: "UK",
    website: "https://charisma.ai",
    fundingStage: "Seed",
    fundingAmount: "~$650K",
    differentiator: "Hybrid scripted+generative AI for brand-safe interactive storytelling",
    strengths: [
      "7+ years development (pre-GPT maturity)",
      "Hybrid control model (scripted + generative)",
      "Strong responsible AI positioning with guardrails",
      "Keywords Studios partnership for distribution",
      "Customers: Warner Bros, Dreamworks, Sky, BBC"
    ],
    weaknesses: [
      "Modest funding (~$650K vs competitors)",
      "Small team",
      "Training/education focus may dilute gaming"
    ],
    contacts: [
      { name: "Guy Gadney", role: "CEO & Co-founder", background: "Former BBC, Penguin, Guardian exec; Emmy/BAFTA producer" },
      { name: "John James", role: "CTO", background: "Current technical lead" }
    ],
    reportFile: "competitor-deep-dive-charisma-2026-03-06.md"
  },
  {
    leadName: "NVIDIA ACE",
    altNames: ["NVIDIA Avatar Cloud Engine"],
    threatLevel: 3,
    targetMarket: "director",
    country: "USA",
    website: "https://developer.nvidia.com/ace",
    fundingStage: "Corporate",
    fundingAmount: "N/A (NVIDIA division)",
    differentiator: "Suite of AI microservices for character embodiment (voice, animation) - COMPLEMENTARY to Director",
    strengths: [
      "NVIDIA's resources and market reach",
      "Components: Riva (ASR/TTS), Audio2Face (lip-sync), NeMo (LLMs)",
      "On-device with NVIGI SDK",
      "Partners: KRAFTON, Ubisoft, NetEase, Creative Assembly"
    ],
    weaknesses: [
      "Requires RTX 30x0+ with 8-12GB VRAM",
      "Micro-behaviors only - no macro-narrative orchestration",
      "Limited shipped games (Alien: Rogue Incursion, Total War: PHARAOH)"
    ],
    contacts: [
      { name: "Rev Lebaredian", role: "VP Omniverse & Simulation", background: "NVIDIA executive" }
    ],
    reportFile: "competitor-deep-dive-nvidia-ace-2026-03-06.md"
  },
  {
    leadName: "ink",
    altNames: ["inkle Studios", "inkle"],
    threatLevel: 2,
    targetMarket: "architect",
    country: "UK",
    website: "https://www.inklestudios.com/ink",
    fundingStage: "Self-funded",
    fundingAmount: "Game sales",
    differentiator: "Open source narrative scripting language - deliberate no visual editor",
    strengths: [
      "70+ third-party games (Sable, Haven, Neocab, Thirsty Suitors)",
      "Active community, annual inkJam",
      "MIT license, free forever",
      "inkle games: 80 Days (TIME GOTY), Heaven's Vault"
    ],
    weaknesses: [
      "No visual editor (deliberate choice)",
      "Technical barrier for non-programmers",
      "Small 3-person team"
    ],
    contacts: [
      { name: "Jon Ingold", role: "Co-founder & Narrative Director", background: "Cambridge math, ex-Sony lead designer, 25+ year IF career, XYZZY Award winner" },
      { name: "Joseph Humfrey", role: "Co-founder & Technical Director", background: "Technical co-founder" }
    ],
    reportFile: "competitor-deep-dive-ink-inkle-2026-03-06.md"
  },
  {
    leadName: "Yarn Spinner Ltd",
    altNames: ["Yarn Spinner", "Secret Lab"],
    threatLevel: 2,
    targetMarket: "architect",
    country: "Australia",
    website: "https://yarnspinner.dev",
    fundingStage: "Grants + Revenue",
    fundingAmount: "Epic MegaGrant + gov funding",
    differentiator: "Open source multi-engine dialogue system from Night in the Woods devs",
    strengths: [
      "Used in DREDGE, Night in the Woods, A Short Hike, NORCO",
      "Multi-engine: Unity, Godot, Unreal (alpha)",
      "2,738 Discord members, 2,700+ GitHub stars",
      "10+ years development"
    ],
    weaknesses: [
      "Text-primary, VS Code dependent",
      "Explicitly rejects AI features",
      "Modest Patreon (~$125/month)"
    ],
    contacts: [
      { name: "Dr. Jon Manning", role: "Creator", background: "PhD, O'Reilly author" },
      { name: "Dr. Paris Buttfield-Addison", role: "Co-founder", background: "PhD, O'Reilly author" }
    ],
    reportFile: "competitor-deep-dive-yarn-spinner-2026-03-06.md"
  },
  {
    leadName: "Hidden Door",
    threatLevel: 2,
    targetMarket: "director",
    country: "USA",
    website: "https://hiddendoor.co",
    fundingStage: "Seed",
    fundingAmount: "$9M",
    differentiator: "AI narrative platform for licensed IP social roleplaying (B2C consumer)",
    strengths: [
      "$9M from Makers Fund, Northzone",
      "Licensed IP: Wizard of Oz, Pride & Prejudice, The Crow",
      "Hybrid tech: trope engine + procedural + selective LLM",
      "Strong founder (Hilary Mason, ex-bitly Chief Scientist)"
    ],
    weaknesses: [
      "B2C consumer, not B2B studio tools",
      "IP licensing dependencies",
      "5 years development before launch"
    ],
    contacts: [
      { name: "Hilary Mason", role: "Co-founder & CEO", background: "Former bitly Chief Scientist, Fast Forward Labs founder (acquired by Cloudera)" },
      { name: "Matt Brandwein", role: "Co-founder", background: "Ex-Cloudera, Endeca product" }
    ],
    reportFile: "competitor-deep-dive-hidden-door-2026-03-06.md"
  },
  {
    leadName: "Latitude",
    altNames: ["AI Dungeon", "Latitude (AI Dungeon)"],
    threatLevel: 2,
    targetMarket: "director",
    country: "USA",
    website: "https://latitude.io",
    fundingStage: "Seed",
    fundingAmount: "$3.3M",
    differentiator: "Pioneer of LLM-powered infinite story games - cautionary tale",
    strengths: [
      "Pioneer (Dec 2019), viral growth to 1.5M users",
      "Creative GPT-2/3 use before anyone else",
      "Proved market demand for AI narrative"
    ],
    weaknesses: [
      "2021 content moderation disaster destroyed trust",
      "OpenAI dependency became existential risk",
      "Lost market to NovelAI and others",
      "Voyage pivot failed"
    ],
    contacts: [
      { name: "Nick Walton", role: "Founder & CEO", background: "BYU hackathon origin, built AI Dungeon" },
      { name: "Alan Walton", role: "Co-founder", background: "Brother, infrastructure" }
    ],
    reportFile: "competitor-deep-dive-ai-dungeon-2026-03-06.md"
  },
  {
    leadName: "Character.AI",
    threatLevel: 3,
    targetMarket: "director",
    country: "USA",
    website: "https://character.ai",
    fundingStage: "Series B+",
    fundingAmount: "$193M",
    differentiator: "Massive consumer AI character platform (20M MAU) - not yet in games",
    strengths: [
      "$193M raised, $2.7B Google deal",
      "20M MAU, 2 hours/day engagement",
      "Founded by Transformer paper co-author (Noam Shazeer)",
      "Massive engagement, proven character tech"
    ],
    weaknesses: [
      "Founders returned to Google",
      "No B2B game licensing yet",
      "Financial pressure + safety controversies",
      "Users declining (20M down from 28M peak)"
    ],
    contacts: [
      { name: "Noam Shazeer", role: "Co-founder (departed)", background: "Co-authored Transformer paper, 20 years Google, led LaMDA. Now back at Google leading Gemini" },
      { name: "Daniel De Freitas", role: "Co-founder (departed)", background: "Created Meena/LaMDA at Google Brain. Also returned to Google" },
      { name: "Karandeep Anand", role: "CEO", background: "Ex-Meta, ex-Brex" }
    ],
    reportFile: "competitor-deep-dive-character-ai-2026-03-06.md"
  },
  {
    leadName: "Spirit AI",
    altNames: ["Character Engine (Spirit AI)"],
    threatLevel: 1,
    targetMarket: "director",
    country: "USA",
    website: "https://spiritai.com",
    fundingStage: "Acquired",
    fundingAmount: "Acquired by Twitch/Amazon",
    differentiator: "DEFUNCT - Acquired by Twitch Nov 2022, Character Engine discontinued",
    strengths: [
      "Pre-LLM conversational AI middleware",
      "Emily Short (IF legend) was CPO 2016-2019",
      "Validated market need"
    ],
    weaknesses: [
      "ACQUIRED by Twitch/Amazon Nov 2022 - effectively defunct",
      "Character Engine discontinued",
      "No AAA titles ever shipped with it",
      "Pre-LLM approach less flexible"
    ],
    contacts: [
      { name: "Steve Andre", role: "Founder", background: "Ex-IBM Watson" },
      { name: "Dr. Mitu Khandaker", role: "Former CCO", background: "Now at NYU Game Center" },
      { name: "Emily Short", role: "Former CPO (2016-2019)", background: "Interactive fiction legend" }
    ],
    reportFile: "competitor-deep-dive-spirit-ai-2026-03-06.md"
  },
  {
    leadName: "ElevenLabs",
    threatLevel: 2,
    targetMarket: "director",
    country: "USA",
    website: "https://elevenlabs.io",
    fundingStage: "Series D",
    fundingAmount: "$781M total",
    differentiator: "Voice AI leader ($11B valuation) - COMPLEMENTARY voice component only",
    strengths: [
      "$11B valuation, $330M ARR, heading toward IPO",
      "400 employees",
      "#1 TTS quality",
      "75ms latency (Flash model) suitable for real-time"
    ],
    weaknesses: [
      "Voice component ONLY - not NPC AI brain",
      "No personality, memory, or behavior systems",
      "Inworld claims 20x cheaper TTS with higher quality"
    ],
    contacts: [
      { name: "Mati Staniszewski", role: "CEO & Co-founder", background: "Ex-Palantir" },
      { name: "Piotr Dąbkowski", role: "Co-founder", background: "Ex-Google DeepMind" }
    ],
    reportFile: "competitor-deep-dive-elevenlabs-2026-03-06.md"
  },
  {
    leadName: "Ubisoft NEO NPC",
    altNames: ["NEO NPCs", "Ubisoft NEO NPC/Teammates"],
    threatLevel: 2,
    targetMarket: "director",
    country: "France",
    website: "https://www.ubisoft.com",
    fundingStage: "Internal R&D",
    fundingAmount: "N/A (internal)",
    differentiator: "Ubisoft internal AI NPC tech - explicitly NOT for licensing",
    strengths: [
      "80-person team (up from 25)",
      "LLM-powered with Google Gemini",
      "Validates AAA investment in AI NPCs"
    ],
    weaknesses: [
      "Still R&D/prototype - no shipped games",
      "Explicitly internal middleware, no licensing intent",
      "Won't compete in tools market"
    ],
    contacts: [
      { name: "Xavier Manzanares", role: "Director of GenAI Gameplay", background: "Ex-Mario + Rabbids producer" },
      { name: "Virginie Mosser", role: "Narrative Director", background: "" },
      { name: "Guillemette Picard", role: "SVP Production Technology", background: "" }
    ],
    reportFile: "competitor-deep-dive-ubisoft-neo-2026-03-06.md"
  },
  {
    leadName: "Fable Studio",
    altNames: ["Fable", "Showrunner"],
    threatLevel: 2,
    targetMarket: "both",
    country: "USA",
    website: "https://fable-studio.com",
    fundingStage: "Seed",
    fundingAmount: "Amazon Alexa Fund + others",
    differentiator: "AI entertainment creation (Showrunner) - different market (consumer content)",
    strengths: [
      "Emmy-winning (Wolves in the Walls VR)",
      "Showrunner platform for AI-generated TV",
      "Amazon Alexa Fund backing",
      "Pioneering AI storytelling tech"
    ],
    weaknesses: [
      "Entertainment/consumer focus, not game tools",
      "Small team (~15)",
      "AI can't sustain story arcs beyond single episodes"
    ],
    contacts: [
      { name: "Edward Saatchi", role: "CEO & Co-founder", background: "Ex-Oculus Story Studio" },
      { name: "Pete Billington", role: "Co-founder", background: "Ex-Oculus Story Studio" }
    ],
    reportFile: "competitor-deep-dive-fable-studio-2026-03-06.md"
  },
  {
    leadName: "Pixel Crushers",
    altNames: ["Dialogue System for Unity"],
    threatLevel: 1,
    targetMarket: "architect",
    country: "USA",
    website: "https://www.pixelcrushers.com",
    fundingStage: "Self-funded",
    fundingAmount: "Asset sales",
    differentiator: "#1 Unity dialogue middleware - COMPLEMENTARY runtime that imports from authoring tools",
    strengths: [
      "#1 commercial dialogue middleware for Unity",
      "Used in Disco Elysium, Suzerain, Citizen Sleeper",
      "Imports from articy, Arcweave, ink, Yarn Spinner",
      "10+ years, legendary support"
    ],
    weaknesses: [
      "Runtime engine only - not authoring tool",
      "Solo developer (Tony Li)",
      "Unity-only"
    ],
    contacts: [
      { name: "Tony Li", role: "Creator & Owner", background: "Solo developer, 10+ years maintaining asset, legendary support reputation" }
    ],
    reportFile: "competitor-deep-dive-pixel-crushers-2026-03-06.md"
  }
];

const RESEARCH_DIR = "C:\\Users\\rijkg\\clawd\\research";

async function importDeepDivesBatch2() {
  console.log("Importing batch 2 deep-dive research into CRM (13 competitors)...\n");

  const now = Timestamp.now();
  let updated = 0;
  let notFound = 0;
  let noFile = 0;

  // Get createdBy
  const usersSnapshot = await db.collection("leads").limit(1).get();
  let createdBy = "system";
  if (!usersSnapshot.empty) {
    const existingLead = usersSnapshot.docs[0].data();
    if (existingLead.createdBy) {
      createdBy = existingLead.createdBy;
    }
  }

  for (const dive of deepDives) {
    console.log(`\n📋 Processing: ${dive.leadName}`);

    // Read the report file for the essay
    const reportPath = path.join(RESEARCH_DIR, dive.reportFile);
    let essay = "";
    try {
      if (fs.existsSync(reportPath)) {
        const fullReport = fs.readFileSync(reportPath, "utf-8");
        // Take first 5000 chars for note (avoid massive notes)
        essay = fullReport.substring(0, 5000);
        if (fullReport.length > 5000) {
          essay += "\n\n[... Full report in research/" + dive.reportFile + "]";
        }
      } else {
        console.log(`  ⚠️ Report file not found: ${dive.reportFile}`);
        noFile++;
      }
    } catch (err) {
      console.log(`  ⚠️ Error reading report: ${err}`);
    }

    // Find lead
    let leadDoc: admin.firestore.QueryDocumentSnapshot | null = null;
    const searchNames = [dive.leadName, ...(dive.altNames || [])];

    for (const name of searchNames) {
      const snapshot = await db.collection("leads")
        .where("name", "==", name)
        .limit(1)
        .get();
      if (!snapshot.empty) {
        leadDoc = snapshot.docs[0];
        break;
      }
    }

    if (!leadDoc) {
      console.log(`  ❌ Not found in CRM: ${dive.leadName}`);
      notFound++;
      continue;
    }

    const leadId = leadDoc.id;
    console.log(`  Found: ${leadDoc.data().name} (${leadId})`);

    // Update lead
    await leadDoc.ref.update({
      "website": dive.website,
      "country": dive.country,
      "location": dive.country,
      "priority": dive.threatLevel >= 4 ? "high" : dive.threatLevel >= 3 ? "medium" : "low",
      "competition.threatLevel": dive.threatLevel,
      "competition.targetMarket": dive.targetMarket,
      "competition.fundingStage": dive.fundingStage,
      "competition.fundingAmount": dive.fundingAmount || null,
      "competition.differentiator": dive.differentiator,
      "competition.strengths": dive.strengths,
      "competition.weaknesses": dive.weaknesses,
      "competition.lastChecked": now,
      "pipeline.stageId": "researched",
      "pipeline.enteredStageAt": now,
      "status": "researched",
      "updatedAt": now,
    });
    console.log(`  ✓ Updated lead details`);

    // Add essay as note (if we have content)
    if (essay.length > 100) {
      // Check if we already added a note today
      const existingNote = await db.collection("notes")
        .where("leadId", "==", leadId)
        .where("status", "==", "hot")
        .limit(1)
        .get();

      if (existingNote.empty) {
        const noteData = {
          leadId: leadId,
          content: essay,
          status: "hot",
          createdBy: createdBy,
          createdAt: now,
          updatedAt: now,
        };
        await db.collection("notes").add(noteData);
        console.log(`  ✓ Added essay note (${essay.length} chars)`);
      } else {
        console.log(`  ⊘ Note already exists`);
      }
    }

    // Add contacts
    for (const contact of dive.contacts) {
      const existingContact = await db.collection("contacts")
        .where("name", "==", contact.name)
        .limit(1)
        .get();

      let contactId: string;
      if (!existingContact.empty) {
        contactId = existingContact.docs[0].id;
        console.log(`  ⊘ Contact exists: ${contact.name}`);
      } else {
        const contactData = {
          name: contact.name,
          email: "",
          role: contact.role,
          phone: "",
          linkedin: "",
          company: dive.leadName,
          notes: contact.background || "",
          tags: [],
          createdAt: now,
          updatedAt: now,
          createdBy: createdBy,
        };
        const contactRef = await db.collection("contacts").add(contactData);
        contactId = contactRef.id;
        console.log(`  ✓ Created contact: ${contact.name}`);
      }

      // Link contact
      const existingLink = await db.collection("leadContacts")
        .where("leadId", "==", leadId)
        .where("contactId", "==", contactId)
        .limit(1)
        .get();

      if (existingLink.empty) {
        await db.collection("leadContacts").add({
          leadId: leadId,
          contactId: contactId,
          isPrimary: contact === dive.contacts[0],
          role: contact.role,
          createdAt: now,
          createdBy: createdBy,
        });
      }
    }

    updated++;
  }

  console.log(`\n========================================`);
  console.log(`Updated: ${updated}`);
  console.log(`Not found: ${notFound}`);
  console.log(`No report file: ${noFile}`);
  console.log(`========================================`);
}

importDeepDivesBatch2()
  .then(() => { console.log("\nDone!"); process.exit(0); })
  .catch((err) => { console.error("Error:", err); process.exit(1); });
