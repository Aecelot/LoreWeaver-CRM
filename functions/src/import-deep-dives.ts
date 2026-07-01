/**
 * Import deep-dive research into CRM with full essays and contacts
 * 
 * Run with: npx ts-node src/import-deep-dives.ts
 */

import * as admin from "firebase-admin";
import { Timestamp } from "firebase-admin/firestore";

if (!admin.apps.length) {
  admin.initializeApp({ projectId: "loreweaver-crm" });
}

const db = admin.firestore();

interface DeepDive {
  leadName: string;
  altNames?: string[];
  threatLevel: 1 | 2 | 3 | 4 | 5;
  targetMarket: "architect" | "director" | "both";
  essay: string;
  contacts: Array<{
    name: string;
    role: string;
    linkedin?: string;
    email?: string;
    background?: string;
  }>;
  fundingStage: string;
  fundingAmount?: string;
  country: string;
  website: string;
  strengths: string[];
  weaknesses: string[];
  differentiator: string;
}

const deepDives: DeepDive[] = [
  {
    leadName: "Iconic",
    altNames: ["Iconic Interactive", "iconicgames.io"],
    threatLevel: 4,
    targetMarket: "director",
    country: "UK",
    website: "https://iconicgames.io",
    fundingStage: "Seed",
    fundingAmount: "$17M",
    differentiator: "On-device AI for voice-driven games with NVIDIA partnership",
    strengths: [
      "Same on-device positioning as Director",
      "$17M funding from Kindred, Northzone, Google AI Futures Fund",
      "Exceptional team from Unity, DeepMind, Meta, CD Projekt",
      "Deep NVIDIA ACE partnership",
      "CB Insights Top 100 AI Startups"
    ],
    weaknesses: [
      "Game studio, not tools company - no external SDK yet",
      "Uses CANNED RESPONSES, not true generative dialogue",
      "Heavy NVIDIA lock-in (not platform agnostic)",
      "Single puzzle game demo (The Oversight Bureau)",
      "Unproven at production scale"
    ],
    contacts: [
      { name: "Andrew Bowell", role: "CEO", background: "Former Senior Director Product Management at Unity, 20+ years game tech" },
      { name: "John Lusty", role: "Co-Founder", background: "Former Ninja Theory, Square Enix, Oculus, Five AI" },
      { name: "Junaid Hussain", role: "Co-Founder & President", background: "Former Partner at Kingsway Capital ($4B+ AUM), founded HodlCo" },
      { name: "Piotr Trochim", role: "Applied AI Lead", background: "Former DeepMind AND Meta AI research, CD Projekt (Witcher II)" }
    ],
    essay: `## Executive Summary

Iconic is a London-based startup building on-device AI technology for interactive gaming experiences. Founded in 2023, they've raised $17M total ($4M pre-seed + $13M seed) and have a deep partnership with NVIDIA. Their positioning—"on-device AI for games"—is IDENTICAL to LoreWeaver Director, making them our most direct competitor in the market.

CRITICAL INSIGHT: Iconic is primarily a GAME STUDIO building its own games, not a tools/middleware company (yet). This is both their strength and potential weakness.

## Funding History

- Pre-Seed (July 2024): $4M - Led by HodlCo, with FOV Ventures, Interface Capital, Sequoia/Atomico scouts
- Seed (December 2025): $13M - Co-led by Kindred Ventures and Northzone, with Google AI Futures Fund, Conviction
- Total Raised: $17M

Angels include former senior executives at DeepMind, OpenAI, Disney, Tencent, Microsoft.

## Product & Technology

Their first game "The Oversight Bureau" is a voice-driven narrative puzzle game using NVIDIA ACE/Riva for on-device speech-to-text plus their proprietary "Narrative Engine."

CRITICAL WEAKNESS DISCOVERED: Their AI uses CANNED RESPONSES, NOT true generative dialogue. From hands-on review: "The Oversight Bureau has a limited set of canned responses it can choose from, so its AI can't make new dialogue on the fly."

Technology stack:
- Uses SLLMs (Small Language Models) for local inference
- No internet connectivity required
- Runs three AI models locally: NVIDIA Riva ASR, sentiment analysis, dialogue generation
- ~90-100ms response times in demos

## Team (28 people)

Exceptional credentials - talent from DeepMind, Rockstar, Pixar, Sony, Meta, Microsoft, Unity, CD Projekt, LucasArts, Square Enix, EA, SEGA, Zynga.

## Competitive Analysis vs Director

THEY ARE A GAME STUDIO; WE ARE A TOOLS COMPANY.

Key differences:
1. Focus: Iconic builds games internally. We sell tools to studios.
2. Scope: Iconic = voice/dialogue only. LoreWeaver = full NPC AI (behavior, narrative, voice)
3. Dependency: Heavy NVIDIA lock-in. We're platform-agnostic.
4. Flexibility: Their "Narrative Engine" uses canned responses. We offer true generative AI.

## Gaps to Exploit

1. Game Studio Focus - They build games, not sell tools. We own "tools for studios" positioning.
2. Voice-Only - No behavior AI, no NPC autonomy. We can position as "full NPC AI."
3. Canned Responses - Their AI is NOT truly generative. We can claim true generative NPC AI.
4. NVIDIA Dependency - We can be platform-agnostic (AMD, Intel, Apple Silicon).
5. Single Game Demo - Narrow application. We show broader genre applicability.

## Watch For

SDK/tools announcement would escalate threat to CRITICAL+. Monitor their LinkedIn, Steam announcements, hiring for platform team.`
  },
  {
    leadName: "Artificial Agency",
    threatLevel: 4,
    targetMarket: "director",
    country: "Canada",
    website: "https://artificial.agency",
    fundingStage: "Seed",
    fundingAmount: "$16M",
    differentiator: "Generative behavior runtime with ex-DeepMind founders and BioWare veterans",
    strengths: [
      "4 ex-DeepMind founders + Richard Sutton (RL pioneer) as angel",
      "AAA veterans from BioWare (Mass Effect, Dragon Age, Anthem)",
      "$16M from Radical Ventures + Toyota Ventures",
      "Game Directors archetype directly competes with Director",
      "Strong RL/AI research pedigree"
    ],
    weaknesses: [
      "Cloud-dependent (~$1 per 5-min interaction)",
      "Documented hallucination issues (NPCs lying about world state)",
      "No shipped games yet",
      "Behavior-first (bottom-up) vs narrative-first (top-down)",
      "Developer skepticism about AI ethics (42% 'very concerned' per GDC survey)"
    ],
    contacts: [
      { name: "Brian Tanner", role: "CEO & Co-founder", background: "25 years RL/AI, research with Rich Sutton, engineering leadership at DeepMind" },
      { name: "Alex Kearney", role: "Co-founder, Head of Agents", background: "PhD in RL under Richard Sutton, DeepMind Research Scientist" },
      { name: "Mike Johanson", role: "Co-founder", background: "DeepMind" },
      { name: "Chris Entwistle", role: "Head of Game Product", background: "20 years: BioWare, Improbable, Dragon Age" },
      { name: "Mark Jaskiewicz", role: "Engineering Lead, Games", background: "20 years: Mass Effect, Anthem, Dragon Age, Call of Duty" }
    ],
    essay: `## Executive Summary

Artificial Agency is an Edmonton, Canada-based AI startup pioneering "generative behavior" for gaming. With $16M in seed funding and a team of former Google DeepMind researchers and AAA game veterans, they're building an AI-powered behavior engine that enables NPCs and game systems to make autonomous, intelligent decisions at runtime.

## Why They Matter

- Direct competitor in the AI game intelligence space
- "Game Directors" archetype directly overlaps with Director's narrative pacing
- Strong RL/AI pedigree (Richard Sutton's students, DeepMind alumni)
- AAA studio connections + BioWare/Mass Effect alumni on team

## Product: The Behavior Engine

A "generative behavior runtime" that transforms game systems into intelligent agents. Unlike traditional NPC systems using behavior trees and scripted dialogue, their engine enables runtime decision-making.

Agent Archetypes:
1. Characters - Fully autonomous, embodied beings that remember interactions and personalize encounters
2. Game Directors - Non-embodied agents that observe player progress, manage story, inject encounters, pace events

The "Game Directors" archetype is the collision point with LoreWeaver Director.

## Technology

- Model Agnostic Architecture (currently Llama 3)
- Foundation Models + Reinforcement Learning hybrid
- Cloud-based inference (~$1 per 5-min interaction)
- Unreal Engine 5 native integration

## Team (33 employees)

Founders all from Google DeepMind Edmonton office. Key leadership includes multiple BioWare veterans who worked on Mass Effect, Dragon Age, and Anthem.

## Critical Differentiation

Artificial Agency: BEHAVIOR (bottom-up, emergent from agent actions)
LoreWeaver Director: NARRATIVE (top-down, story intent guides behaviors)

They may struggle with coherent long-form storytelling. Director's strength is narrative understanding vs their action focus.

## Weaknesses

1. Cloud Dependency - Latency, cost scaling, privacy concerns
2. Hallucination Risk - AI characters have been documented lying about world state
3. No Shipped Games - Still in alpha, no production proof
4. Pricing Uncertainty - Who pays for inference at scale?

## Competitive Response

Different philosophy = coexistence possible. Director for authored narrative coherence, AA for sandbox emergence. Position Director as "narrative orchestration" vs their "behavioral autonomy."`
  },
  {
    leadName: "Series Entertainment",
    altNames: ["Series AI", "series.ai", "series.inc"],
    threatLevel: 5,
    targetMarket: "both",
    country: "USA",
    website: "https://series.inc",
    fundingStage: "Series A",
    fundingAmount: "$28M",
    differentiator: "Full-stack AI game creation platform (Rho Engine) with Netflix backing",
    strengths: [
      "$28M from Netflix, a16z, Dell Technologies",
      "Veteran team (ex-Kongregate CEO, Zynga, Riot)",
      "Acquired Pixelberry Studios (Choices app) as AI testbed",
      "100+ employees, rapid growth",
      "Strategic Netflix relationship for narrative games"
    ],
    weaknesses: [
      "NO public demo or shipped Rho-built games",
      "Stealth mode - minimal technical transparency",
      "Acquired declining studio with vocal fanbase",
      "Heavy industry backlash against AI in gaming",
      "Competing with Unity/Unreal/NVIDIA infinite resources"
    ],
    contacts: [
      { name: "Pany Haritatos", role: "Co-Founder & CEO", background: "Former Kongregate CEO (sold for $55M), led Snap Games, serial entrepreneur" },
      { name: "Julia Zhan", role: "Head of AI Product", background: "Former Product Lead, Riot Games" },
      { name: "Brian Schneider", role: "Head of Games", background: "Former Director of Design, Zynga" },
      { name: "Josh English", role: "Head of Engineering", background: "Former Lead Software Engineer, Google" }
    ],
    essay: `## Executive Summary

Series Entertainment (Series AI) is a San Francisco-based startup building the Rho Engine, billed as the "first AI-native, multimodal full-stack game creation platform." With $28M Series A from Netflix, Dell, and a16z, plus the acquisition of Pixelberry Studios (Choices: Stories You Play), they represent a well-funded threat to both Architect and Director.

## Funding

- Seed (Sept 2023): $7.9M from A16Z Games, BITKRAFT
- Series A (Sept 2024): $28M from Netflix, Dell, A16Z
- Total: ~$35.9M
- Valuation: ~$190M estimated

## The Rho Engine

CLAIMED capabilities (unverified - no public demo):
- Full-stack game creation pipeline
- Multimodal generation (visuals AND audio)
- Works as "meta engine" alongside Unity/Unreal
- Reduce dev time from "years to months"

## Pixelberry Acquisition (July 2024)

Bought from Nexon - interactive fiction studio (Choices: Stories You Play). Perfect AI testbed:
- Story content = exactly what LLMs generate
- Cut content costs via AI, scale story branches
- Existing playerbase for AI-enhanced content

WARNING: Pixelberry was struggling pre-acquisition (installs down, layoffs).

## Netflix Investment = Strategic

Netflix is aggressively building gaming division and wants "immersive narrative games." Series fits perfectly. Potential exclusive partnership or acquisition target.

## Team (100+ employees)

CEO Pany Haritatos has track record: Kongregate (sold $55M), Snap Games, multiple exits. Team DNA from Zynga, Riot, Google, Snap.

## Critical Assessment

THREAT LEVEL: HIGH but UNPROVEN

Why dangerous:
- Deep-pocketed strategic investors (Netflix!)
- Veteran team with exits
- Already has revenue-generating studio
- Broad platform play

Why it might fail:
- No demonstrated technology
- AI game content quality unproven
- Industry backlash is real
- Competing with giants

## Watch For

First AI integration will appear in Choices app. Monitor for GDC announcements or Netflix partnership news.`
  },
  {
    leadName: "Parametrix.ai",
    altNames: ["超参数科技", "Parametrix"],
    threatLevel: 4,
    targetMarket: "director",
    country: "China",
    website: "https://parametrix.ai",
    fundingStage: "Series B",
    fundingAmount: "$130M+",
    differentiator: "Scale monster - 500K-1M concurrent AI bots with GAEA system",
    strengths: [
      "$130M+ funding, unicorn valuation ($1B+)",
      "Proven scale: 500K-1M concurrent AI bots",
      "10.6B cumulative users served across 60+ countries",
      "Ex-Tencent AI Lab leadership (built JueYi/JueWu)",
      "Deep RL expertise battle-tested in Honor of Kings (100M+ DAU)"
    ],
    weaknesses: [
      "China-first focus, limited Western presence",
      "Population simulation vs character depth",
      "RL-heavy architecture (lighter compute, less personality)",
      "Quiet since mid-2023 (last major announcement)",
      "Enterprise sales cycle is slow"
    ],
    contacts: [
      { name: "Liu Yongsheng (Kakar Liu)", role: "Founder & CEO", background: "Former GM Tencent AI Lab, built JueYi (Go AI) and JueWu (Honor of Kings AI)" }
    ],
    essay: `## Executive Summary

Parametrix.ai is a Chinese AI unicorn focused on game AI, with $130M+ total funding and a $1B+ valuation. Founded by ex-Tencent AI Lab leadership, they've achieved massive scale: 500K-1M+ concurrent AI bots at peak, serving 10.6B cumulative users across 60+ countries.

## Key Differentiator from Director

Parametrix focuses on SCALE AND SIMULATION (hundreds of autonomous NPCs interacting), while Director focuses on INDIVIDUAL NPC DEPTH AND NARRATIVE ORCHESTRATION.

They're building Westworld's EXTRAS; Director builds Westworld's HOSTS.

## Funding

- Series A (Dec 2019): Undisclosed, 5Y Capital
- Series A+ (Jan 2021): $30M, 5Y Capital
- Series B (Jan 2022): $100M, Sequoia China (HongShan)
- Total: $130M+

## GAEA System

Their flagship AI NPC ecosystem platform:
- Demonstrated in "Living Chang'an City" tech demo
- Hundreds of autonomous NPCs interacting
- Architecture combines RL policy networks + LLM layer for planning/dialogue

## Scale Infrastructure

- Peak Concurrent AI Bots: 500K-1M+
- Daily Service Calls: ~240 billion
- Cumulative Users: 10.6B
- Countries: 60+

Most "AI bots" are RL-based behavioral agents, NOT LLM-driven. This explains scale: lighter compute than LLM inference.

## Team (200+ employees, 90% R&D)

Founder built JueYi (Go AI, won 2017 UEC Cup) and JueWu (Honor of Kings AI, beat pro players) at Tencent.

## Threat Assessment

MEDIUM-HIGH (different segment, but converging)

When Parametrix Wins: Massive NPC populations, behavioral bots for multiplayer, Asian market
When Director Wins: Character-driven narrative, Western studios, quality over quantity

## Strategic Response

Don't compete on "500K bots" metrics. Own the narrative depth / character coherence space. They build the POPULATION; we build the PERSONALITIES.`
  },
  {
    leadName: "rct AI",
    altNames: ["rct studio", "Delysium"],
    threatLevel: 2,
    targetMarket: "director",
    country: "USA",
    website: "https://rct.ai",
    fundingStage: "Series A",
    fundingAmount: "$14.2M",
    differentiator: "Original Morpheus Engine vision abandoned for Web3/blockchain pivot",
    strengths: [
      "Y Combinator W19 batch (TechCrunch 'favorite pick')",
      "Early mover in AI NPCs (2019 demos)",
      "Strong ex-Baidu NLP team",
      "Published research on Chaos Box algorithm"
    ],
    weaknesses: [
      "Founder Jesse Lyu LEFT to start Rabbit Inc.",
      "Multiple pivots: Interactive films → Web3 → AI Agents for blockchain",
      "No shipped consumer games despite 7 years and $14M",
      "Web3 stigma hurts credibility with traditional studios",
      "Technology likely outdated/unmaintained"
    ],
    contacts: [
      { name: "Jesse Lyu", role: "Original Founder (DEPARTED)", background: "Left ~2021-2022 to start Rabbit Inc. (R1 device). Forbes 30 Under 30." },
      { name: "Yuheng Chen", role: "Current CEO", background: "Former COO at Raven Tech, took over after Lyu departure" },
      { name: "Yan Zhang", role: "Co-Founder, CTO", background: "Technical lead from Raven Tech, now leads Delysium" }
    ],
    essay: `## Executive Summary

rct AI is a Y Combinator-backed (W19) company that developed the Morpheus Engine, an AI system for dynamic NPC behavior using deep learning and reinforcement learning. Originally positioned as "a new Pixar for interactive movies," the company pivoted heavily toward Web3/metaverse gaming with Delysium, and has since pivoted AGAIN to AI Agent infrastructure for blockchain.

KEY FINDING: The original founder Jesse Lyu left rct AI in 2021-2022 to start Rabbit Inc. (makers of the R1 AI device). The company appears to have abandoned its core NPC AI focus.

## Morpheus Engine (Original Vision)

Designed to:
- Generate dynamic NPC responses without pre-scripted decision trees
- Convert screenplays to 3D simulations using NLP
- Predict and generate real-time character animations

REALITY CHECK: No shipped products demonstrating these capabilities. Technology absorbed into Web3 pivot.

## The Pivots

- 2019-2020: Interactive films, VR (promised Steam release - never shipped)
- 2021: Announced blockchain component, pivoted to Web3
- March 2022: Launched Delysium ("world's first playable AAA MMO Web3 game")
- 2024-2026: Pivoted AGAIN to AI Agent infrastructure (Lucy OS, $AGI token)

The original Morpheus Engine game AI vision appears ABANDONED.

## Funding

- YC Seed (2019): Undisclosed
- Series A (2020): $10M from Makers Fund
- Total: $14.2M

## Red Flags

Jesse Lyu's pattern: Raven Tech → sold to Baidu → rct AI → pivoted, left → GAMA/NFT → abandoned → Rabbit Inc.

Pattern of hype → pivot → departure.

## Threat Assessment: LOW

Technology is 5+ years old with no visible updates. Company focus shifted away from game AI. But YC pedigree could resurface if they pivot back.

## Opportunity

The market they abandoned is Director's to capture. Use their early demos as proof-of-concept validation; deliver what they couldn't.`
  },
  {
    leadName: "Nevigo GmbH (articy:draft)",
    altNames: ["articy:draft", "Articy Software", "articy:draft X"],
    threatLevel: 5,
    targetMarket: "architect",
    country: "Germany",
    website: "https://www.articy.com",
    fundingStage: "Bootstrapped",
    fundingAmount: "Self-funded",
    differentiator: "Industry standard narrative design tool - the 800-lb gorilla",
    strengths: [
      "Dominant market position (Disco Elysium, Hogwarts Legacy, Talos Principle 2)",
      "Deep feature set built over 15+ years",
      "Strong Unity/Unreal integrations (open source plugins)",
      "Comprehensive localization workflow",
      "Free tier creates pipeline of users"
    ],
    weaknesses: [
      "Desktop-only, no web/cloud version",
      "AI bolted-on (third-party OpenAI/ElevenLabs), not native",
      "No real-time collaboration (SVN-based)",
      "Steep learning curve ('overwhelming' for new users)",
      "Opaque team pricing (must contact sales)",
      "Small team (11-25 employees), slow velocity"
    ],
    contacts: [
      { name: "Stefan Nyul", role: "Co-Founder", background: "Former Piranha Bytes (Gothic, Risen series)" },
      { name: "Kai Rosenkranz", role: "Co-Founder", background: "Known for Gothic soundtrack, former Piranha Bytes" }
    ],
    essay: `## Executive Summary

articy:draft is the dominant narrative design tool in the game development industry—the "800-lb gorilla" that Architect must contend with. Founded in 2009 by former Piranha Bytes developers (Gothic, Risen series), the company has built a comprehensive visual tool for interactive storytelling used by both AAA studios and indie developers.

## Market Position

Notable games made with articy:draft:
- Disco Elysium (ZA/UM)
- Hogwarts Legacy (Avalanche/Portkey)
- The Talos Principle 2 (Croteam)
- Immortals of Aveum (Ascendant Studios)
- Syberia: The World Before (Microids)

## Product: articy:draft X

Core features:
- Visual drag-and-drop branching story creation
- Flexible template system with inheritance
- Game object database (entities, assets, locations)
- articy:expresso scripting language
- Multi-language localization with DeepL integration
- Presentation/Simulation mode for playtesting

## AI Features (Surface-Level)

AI Extensions Plugin added in X (Nov 2023):
- AI-assisted preview images
- AI-assisted dialogue generation
- AI-assisted barks
- DeepL translation
- ElevenLabs voice synthesis (NEW in 4.2)

CRITICAL: Uses THIRD-PARTY AI (not in-house). AI is bolted-on, not core architecture. Can be disabled company-wide.

## Company

- Founded: 2009
- Location: Bochum, Germany
- Team: 11-25 employees (small, bootstrapped)
- No known VC funding

## Pricing

- FREE: €0 (700 objects/project, commercial use)
- Monthly: €7.97/month
- Annual: €79.99/year
- Team bundles: Contact sales (opaque pricing)

## Weaknesses to Exploit

1. Desktop-Only - No web version, no real-time cloud collaboration
2. Complex Collaboration - Requires server + SVN knowledge
3. AI Bolted-On - Third-party integrations, not deep generative AI
4. Steep Learning Curve - "Overwhelming" for new users
5. Opaque Team Pricing - Sales-driven, friction for decision-makers
6. Small Team Risk - 15+ years legacy, limited development velocity

## Architect Opportunity

Position as the "modern alternative":
- Cloud-native, work anywhere
- AI-first architecture
- Real-time collaboration (Figma for narrative)
- Transparent pricing
- Modern UX designed for 2020s`
  },
  {
    leadName: "Arcweave Inc",
    altNames: ["Arcweave", "arcweave.com"],
    threatLevel: 4,
    targetMarket: "architect",
    country: "Greece",
    website: "https://arcweave.com",
    fundingStage: "Seed",
    fundingAmount: "$850K",
    differentiator: "Browser-based collaborative narrative design - closest Architect competitor",
    strengths: [
      "38K+ creators, strong growth (150% over 2 years)",
      "Browser-based, zero installation, real-time collaboration",
      "Used by EA, Netflix, Microsoft, Amazon, Mojang",
      "Epic Games MegaGrant recipient",
      "AI Drama Manager in development (demoed Gamescom 2025)"
    ],
    weaknesses: [
      "No offline mode (pure cloud dependency)",
      "Browser performance limits at scale",
      "Poor mobile support",
      "Proprietary scripting (Arcscript lock-in)",
      "Key features (API, localization) paywalled to Team tier",
      "No Git integration for developer workflows"
    ],
    contacts: [
      { name: "Manos Kalaitzoglou", role: "Co-Founder & CEO", background: "Previous AR/gamification startup in Thailand" },
      { name: "Panagiotis (Panos) Kalaitzoglou", role: "Co-Founder & CTO", background: "Technical lead, brother of Manos" }
    ],
    essay: `## Executive Summary

Arcweave is a Greek browser-based collaborative narrative design tool, positioning itself as the "accessible alternative to articy:draft." Founded in 2018 by brothers Manos and Panos Kalaitzoglou, the company has grown to 38K+ claimed creators and secured $850K seed funding in December 2023.

THREAT LEVEL FOR ARCHITECT: HIGH - Arcweave directly targets our primary market with similar positioning (accessible, collaborative, modern) and is ~3 years ahead in market presence.

## Growth

- Dec 2023: 15,000+ users
- May 2024: 18,000+ users
- 2026: 38,000+ users
- Monthly exports: 4,000+

## Customers

EA, Netflix, Microsoft, Amazon, Mojang, various universities.

## Product

Core strengths:
- Browser-based, zero installation
- Real-time collaboration
- Visual flowchart editor
- Play Mode for instant prototyping
- Free plugins for Unity, Unreal, Godot

## Pricing

- Basic: Free (200 items, no commercial use)
- Pro: $15/mo (unlimited, commercial)
- Team: $25/mo (API, localization, version history)
- Enterprise: Custom (SSO, LMS)

## AI Features

- AI assistant with tiered usage
- AI Drama Manager in development (demoed Gamescom 2025)
- Positioning: "GenAI + human narrative blending"

## Funding

- Seed (Dec 2023): $850K from Galaxy Interactive, Genesis Ventures
- Pre-seed: Epic Games MegaGrant

## Team

- 8-15 employees
- Remote-first, Athens operations
- Brother co-founders

## Weaknesses to Exploit

1. No Offline Mode - Pure cloud dependency, data sovereignty concerns
2. Browser Performance Limits - Large projects lag
3. Limited Mobile - Doesn't work well on mobile
4. Proprietary Scripting - Arcscript lock-in
5. No Git Integration - Developers want version control
6. Localization Paywalled - Requires $25/mo Team tier

## Architect Opportunity

- Desktop app for power/offline + cloud sync
- Git-native for developer workflows
- AI-native from day one (not bolted on)
- Better enterprise features at lower tiers`
  }
];

async function importDeepDives() {
  console.log("Importing deep-dive research into CRM...\n");

  const now = Timestamp.now();
  let updated = 0;
  let notFound = 0;

  // Get createdBy from existing lead
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

    // Find lead by name or alt names
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

    // Update lead with full competition details
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

    // Add the full essay as a note
    const noteData = {
      leadId: leadId,
      content: dive.essay,
      status: "hot",
      createdBy: createdBy,
      createdAt: now,
      updatedAt: now,
    };
    await db.collection("notes").add(noteData);
    console.log(`  ✓ Added essay note (${dive.essay.length} chars)`);

    // Add contacts
    for (const contact of dive.contacts) {
      // Check if contact already exists
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
          email: contact.email || "",
          role: contact.role,
          phone: "",
          linkedin: contact.linkedin || "",
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

      // Link contact to lead
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
        console.log(`  ✓ Linked contact to lead`);
      }
    }

    updated++;
  }

  console.log(`\n========================================`);
  console.log(`Updated: ${updated}`);
  console.log(`Not found: ${notFound}`);
  console.log(`========================================`);
}

importDeepDives()
  .then(() => { console.log("\nDone!"); process.exit(0); })
  .catch((err) => { console.error("Error:", err); process.exit(1); });
