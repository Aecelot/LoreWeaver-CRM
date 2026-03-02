#!/usr/bin/env node
/**
 * Seed gaming angel investors into CRM
 * Source: research/gaming-angels-2026-03-02.md
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

// Initialize Firebase
const serviceAccount = JSON.parse(readFileSync('./service-account.json', 'utf-8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const angels = [
  // Tier 1: Game Tools / Infrastructure Focus
  {
    company: "David Helgason (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Denmark",
    icpScore: 95,
    stage: "Seed, Series A",
    checkSize: "€100K-500K",
    notes: "Unity founder. Invests in game infrastructure (Coherence, Flow Engineering). Perfect fit for narrative AI tools positioning.",
    source: "Shizune",
    contactName: "David Helgason",
    linkedIn: "https://linkedin.com/in/davidhelgason",
    tags: ["angel", "game-tools", "unity-founder", "tier-1"]
  },
  {
    company: "Paul Heydon (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "UK",
    icpScore: 95,
    stage: "Pre-Seed to Series A",
    checkSize: "$50K-250K",
    notes: "Early investor in Supercell, Unity, Peak, Doppio Games. 30+ years founder/operator/investor. Strong game tools track record.",
    source: "Shizune",
    contactName: "Paul Heydon",
    tags: ["angel", "game-tools", "supercell-investor", "tier-1"]
  },
  {
    company: "Sebastien de Halleux (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 92,
    stage: "Pre-Seed, Seed",
    checkSize: "$100K-250K",
    notes: "Playfish co-founder (acquired by EA). Graph Ventures founding partner. Operator background, understands production tools.",
    source: "Rho",
    contactName: "Sebastien de Halleux",
    linkedIn: "https://linkedin.com/in/sdehalleux",
    website: "https://graphventures.com",
    tags: ["angel", "game-tools", "operator", "tier-1"]
  },
  {
    company: "Charlie Cheever (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 88,
    stage: "Pre-Seed to Series B",
    checkSize: "$10K-500K",
    notes: "50+ portfolio. Focus on Games, AI, SMB Software. Sweet spot $100K. Quora co-founder.",
    source: "Rho",
    contactName: "Charlie Cheever",
    linkedIn: "https://linkedin.com/in/ccheever",
    website: "https://ccheever.com",
    tags: ["angel", "ai-gaming", "tier-1"]
  },
  {
    company: "Mike Verdu (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 90,
    stage: "Seed, Series A",
    notes: "VP Games at Netflix. Portfolio: Azarus, Stream Captain, Rogue Games. Deep gaming industry experience.",
    source: "Shizune",
    contactName: "Mike Verdu",
    tags: ["angel", "game-tools", "netflix", "tier-1"]
  },
  {
    company: "Nate Mitchell (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 85,
    stage: "Seed, Series A",
    notes: "Oculus co-founder & VP Product. VR/gaming infrastructure background.",
    source: "Shizune",
    contactName: "Nate Mitchell",
    tags: ["angel", "vr-gaming", "tier-1"]
  },
  {
    company: "Kevin Lin (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 88,
    stage: "Pre-Seed to Series A",
    notes: "Twitch co-founder. Metatheory CEO. 5 gaming investments. Gaming + AI focus.",
    source: "Shizune",
    contactName: "Kevin Lin",
    tags: ["angel", "twitch-founder", "tier-1"]
  },
  {
    company: "Mark Pincus (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 85,
    stage: "Seed to Series B",
    notes: "Zynga founder. Early investor in Napster, Twitter, Facebook. 5 gaming investments.",
    source: "Shizune",
    contactName: "Mark Pincus",
    tags: ["angel", "zynga-founder", "tier-1"]
  },
  {
    company: "Siqi Chen (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 88,
    stage: "Pre-Seed to Series A",
    notes: "Runway co-founder. Focus: Software, AI, Gaming. 4 gaming investments.",
    source: "Shizune",
    contactName: "Siqi Chen",
    tags: ["angel", "ai-gaming", "tier-1"]
  },
  {
    company: "David Baszucki (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 82,
    stage: "Seed",
    notes: "Roblox founder & CEO. User-generated content platform experience.",
    source: "Shizune",
    contactName: "David Baszucki",
    tags: ["angel", "roblox-founder", "tier-1"]
  },
  {
    company: "Kevin Chou (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 85,
    stage: "Seed, Series A",
    notes: "Kabam co-founder. 3 gaming investments. Mobile gaming background.",
    source: "Shizune",
    contactName: "Kevin Chou",
    tags: ["angel", "kabam-founder", "tier-1"]
  },
  {
    company: "David Bettner (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 80,
    stage: "Seed",
    notes: "Words With Friends creator. 2 gaming investments.",
    source: "Shizune",
    contactName: "David Bettner",
    tags: ["angel", "game-creator", "tier-1"]
  },
  {
    company: "Justin Waldron (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 78,
    stage: "Seed",
    notes: "Zynga early employee. 2 gaming investments.",
    source: "Shizune",
    contactName: "Justin Waldron",
    tags: ["angel", "zynga-alum", "tier-1"]
  },
  {
    company: "Emmett Shear (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 88,
    stage: "Pre-Seed to Series A",
    notes: "Twitch co-founder & former CEO. Brief OpenAI CEO. 3 gaming investments.",
    source: "Shizune",
    contactName: "Emmett Shear",
    tags: ["angel", "twitch-founder", "tier-1"]
  },
  {
    company: "Phil Sanderson (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 90,
    stage: "Seed, Series A",
    checkSize: "$100K-10M",
    notes: "Griffin Gaming Partners. Portfolio: Phoenix Labs, WinZO, Harmony Games. 44+ investments.",
    source: "Rho",
    contactName: "Phil Sanderson",
    linkedIn: "https://linkedin.com/in/sfvc1",
    website: "https://griffingp.com/team",
    tags: ["angel", "griffin-gaming", "tier-1"]
  },
  
  // Tier 2: Active US Gaming Angels
  {
    company: "Strauss Zelnick (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 82,
    stage: "Seed, Angel",
    notes: "Take-Two CEO. Portfolio: Prove, Players' Lounge, Ready. 3 gaming investments.",
    source: "Shizune",
    contactName: "Strauss Zelnick",
    tags: ["angel", "take-two", "tier-2"]
  },
  {
    company: "Eden Chen (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 75,
    stage: "Seed",
    notes: "3 gaming investments.",
    source: "Shizune",
    contactName: "Eden Chen",
    tags: ["angel", "tier-2"]
  },
  {
    company: "Colin Carrier (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 75,
    stage: "Seed",
    notes: "3 gaming investments.",
    source: "Shizune",
    contactName: "Colin Carrier",
    tags: ["angel", "tier-2"]
  },
  {
    company: "Cyan Banister (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 78,
    stage: "Pre-Seed to Series A",
    notes: "Prolific angel investor. 3 gaming investments. Tech + gaming focus.",
    source: "Shizune",
    contactName: "Cyan Banister",
    tags: ["angel", "tier-2"]
  },
  {
    company: "Scott Banister (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 78,
    stage: "Seed",
    notes: "PayPal mafia. 2 gaming investments.",
    source: "Shizune",
    contactName: "Scott Banister",
    tags: ["angel", "paypal-mafia", "tier-2"]
  },
  {
    company: "Jason Calacanis (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 80,
    stage: "Pre-Seed, Seed",
    checkSize: "$25K-100K",
    notes: "LAUNCH Fund. 2 gaming investments. High-profile angel.",
    source: "Shizune",
    contactName: "Jason Calacanis",
    tags: ["angel", "launch-fund", "tier-2"]
  },
  {
    company: "Kevin Hartz (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 78,
    stage: "Seed, Series A",
    notes: "Eventbrite co-founder. 2 gaming investments.",
    source: "Shizune",
    contactName: "Kevin Hartz",
    tags: ["angel", "eventbrite", "tier-2"]
  },
  {
    company: "Michael Dornbrook (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 75,
    stage: "Seed",
    notes: "Gaming focus. 2 gaming investments.",
    source: "Shizune",
    contactName: "Michael Dornbrook",
    tags: ["angel", "tier-2"]
  },
  {
    company: "Scott Belsky (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 82,
    stage: "Seed, Series A",
    notes: "Adobe CPO. Behance founder. 2 gaming investments. Creator tools background.",
    source: "Shizune",
    contactName: "Scott Belsky",
    tags: ["angel", "adobe", "creator-tools", "tier-2"]
  },
  {
    company: "Balaji Srinivasan (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 80,
    stage: "Seed",
    notes: "Former A16Z GP. Coinbase CTO. 2 gaming investments. Tech/crypto/gaming.",
    source: "Shizune",
    contactName: "Balaji Srinivasan",
    tags: ["angel", "a16z-alum", "tier-2"]
  },
  {
    company: "Leah Culver (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 78,
    stage: "Seed",
    notes: "Developer tools + gaming. 2 investments.",
    source: "Shizune",
    contactName: "Leah Culver",
    tags: ["angel", "dev-tools", "tier-2"]
  },
  {
    company: "John Lilly (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 78,
    stage: "Seed, Series A",
    notes: "Mozilla former CEO. Greylock partner. 2 gaming investments.",
    source: "Shizune",
    contactName: "John Lilly",
    tags: ["angel", "greylock", "tier-2"]
  },
  {
    company: "Greg Castle (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 75,
    stage: "Seed",
    notes: "Gaming angel. 2 investments.",
    source: "Shizune",
    contactName: "Greg Castle",
    tags: ["angel", "tier-2"]
  },
  {
    company: "Terrence Rohan (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 75,
    stage: "Seed",
    notes: "Gaming + media. 2 investments.",
    source: "Shizune",
    contactName: "Terrence Rohan",
    tags: ["angel", "tier-2"]
  },
  {
    company: "Trevor McFedries (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 80,
    stage: "Pre-Seed to Series B",
    checkSize: "$5K-50K",
    notes: "Brud founder. Games + AI + Web3 focus. 16+ investments.",
    source: "Rho",
    contactName: "Trevor McFedries",
    linkedIn: "https://linkedin.com/in/trevor-mcfedries-0a5285a8",
    tags: ["angel", "ai-gaming", "tier-2"]
  },
  {
    company: "Rick Thompson (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 85,
    stage: "Seed",
    checkSize: "$250K-2.5M",
    notes: "Signia Ventures. Portfolio: Cloud9, Super Evil Mega Corp. 19+ investments.",
    source: "Rho",
    contactName: "Rick Thompson",
    linkedIn: "https://linkedin.com/in/rlthompson",
    tags: ["angel", "esports", "tier-2"]
  },
  {
    company: "Eric Hippeau (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 82,
    stage: "Seed, Series A",
    checkSize: "$100K-3M",
    notes: "Lerer Hippeau managing partner. Media + gaming. NYC-based.",
    source: "Rho",
    contactName: "Eric Hippeau",
    linkedIn: "https://linkedin.com/in/erichippeau",
    tags: ["angel", "lerer-hippeau", "tier-2"]
  },
  {
    company: "Mark Dyne (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 78,
    stage: "Seed to Series B",
    checkSize: "$100K-5M",
    notes: "Morpheus partner. FinTech + Games focus.",
    source: "Rho",
    contactName: "Mark Dyne",
    linkedIn: "https://linkedin.com/in/markdyne",
    tags: ["angel", "tier-2"]
  },
  {
    company: "Kishen Patel (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 80,
    stage: "Seed",
    notes: "Consumer Tech + Gaming angel. Interviewed by Solsten on game funding.",
    source: "Solsten",
    contactName: "Kishen Patel",
    tags: ["angel", "tier-2"]
  },
  
  // Tier 3: Active European Angels
  {
    company: "Stefan Lindeberg (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Sweden",
    icpScore: 88,
    stage: "Pre-Seed, Seed",
    notes: "Nordic Game Ventures co-founder. 2 investments in past 12 months. Active.",
    source: "Shizune",
    contactName: "Stefan Lindeberg",
    tags: ["angel", "nordic", "tier-3"]
  },
  {
    company: "Jacob Key (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Sweden",
    icpScore: 85,
    stage: "Seed, Series A",
    notes: "Luminar Ventures co-founder. Portfolio: Challengermode. Gaming + tech.",
    source: "Shizune",
    contactName: "Jacob Key",
    tags: ["angel", "nordic", "tier-3"]
  },
  {
    company: "Sam Enrico Williams (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "UK",
    icpScore: 85,
    stage: "Pre-Seed, Seed",
    notes: "18 gaming investments in Europe. Very active.",
    source: "Shizune",
    contactName: "Sam Enrico Williams",
    tags: ["angel", "uk", "tier-3"]
  },
  {
    company: "Ralf Dummel (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Germany",
    icpScore: 80,
    stage: "Seed",
    notes: "15 gaming investments. German angel.",
    source: "Shizune",
    contactName: "Ralf Dummel",
    tags: ["angel", "germany", "tier-3"]
  },
  {
    company: "Ilkka Paananen (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Finland",
    icpScore: 92,
    stage: "Seed, Series A",
    notes: "Supercell founder & CEO. Via Supercell Investments backs game tech.",
    source: "Wikipedia",
    contactName: "Ilkka Paananen",
    tags: ["angel", "supercell-founder", "tier-3"]
  },
  {
    company: "Mikko Kodisoja (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Finland",
    icpScore: 85,
    stage: "Seed",
    notes: "Supercell co-founder.",
    source: "Tracxn",
    contactName: "Mikko Kodisoja",
    tags: ["angel", "supercell-founder", "tier-3"]
  },
  {
    company: "Mikael Hed (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Finland",
    icpScore: 82,
    stage: "Seed",
    notes: "Rovio co-founder. 1 angel investment.",
    source: "Tracxn",
    contactName: "Mikael Hed",
    tags: ["angel", "rovio-founder", "tier-3"]
  },
  {
    company: "Niklas Hed (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Finland",
    icpScore: 80,
    stage: "Seed",
    notes: "Rovio co-founder.",
    source: "Tracxn",
    contactName: "Niklas Hed",
    tags: ["angel", "rovio-founder", "tier-3"]
  },
  
  // Angel Syndicates & Groups
  {
    company: "The Games Angels",
    type: "investor",
    subType: "syndicate",
    product: "director",
    region: "Europe",
    country: "UK",
    icpScore: 95,
    stage: "Seed",
    notes: "UK games industry veterans syndicate. Explicitly backs 'tools' and 'game-adjacent companies'. Perfect fit.",
    source: "Website",
    website: "https://thegamesangels.com",
    tags: ["syndicate", "game-tools", "uk", "top-priority"]
  },
  {
    company: "Nordic Game Ventures",
    type: "investor",
    subType: "syndicate",
    product: "director",
    region: "Europe",
    country: "Sweden",
    icpScore: 92,
    stage: "Seed",
    notes: "50+ years combined experience. 20+ Nordic game company investments. Regional synergy with Dutch.",
    source: "Website",
    website: "https://nordicgameventures.com",
    tags: ["syndicate", "nordic", "top-priority"]
  },
  {
    company: "EGD Syndicate",
    type: "investor",
    subType: "syndicate",
    product: "director",
    region: "Global",
    country: "US",
    icpScore: 85,
    stage: "Seed",
    notes: "200+ gaming professionals. Spawned F4 Fund in 2024.",
    source: "Substack",
    website: "https://elitegamedevelopers.substack.com",
    tags: ["syndicate", "global"]
  },
  {
    company: "Supercell Investments",
    type: "investor",
    subType: "corporate",
    product: "director",
    region: "Europe",
    country: "Finland",
    icpScore: 90,
    stage: "Seed to Series A",
    notes: "Backs studios and game tech. 'Technologies that power games' explicitly mentioned.",
    source: "Website",
    website: "https://investments.supercell.com",
    tags: ["corporate-angel", "game-tech", "top-priority"]
  },
  {
    company: "Kima Ventures",
    type: "investor",
    subType: "super-angel",
    product: "director",
    region: "Europe",
    country: "France",
    icpScore: 82,
    stage: "Pre-Seed, Seed",
    notes: "Super angel fund. 22 European gaming investments. Very active (invests in 2 startups/week).",
    source: "Shizune",
    tags: ["super-angel", "france"]
  },
  {
    company: "Angels Den",
    type: "investor",
    subType: "syndicate",
    product: "director",
    region: "Europe",
    country: "UK",
    icpScore: 75,
    stage: "Seed",
    notes: "UK syndicate. 12 gaming investments.",
    source: "Shizune",
    tags: ["syndicate", "uk"]
  },
  {
    company: "Game Seer",
    type: "investor",
    subType: "micro-vc",
    product: "director",
    region: "Global",
    country: "US",
    icpScore: 78,
    stage: "Seed",
    notes: "Indie game funding specialist. Also backs game-adjacent tools.",
    source: "Website",
    website: "https://game-seer.com",
    tags: ["micro-vc", "indie-games"]
  }
];

async function seedAngels() {
  console.log(`Seeding ${angels.length} gaming angel investors...`);
  
  let added = 0;
  let skipped = 0;
  
  for (const angel of angels) {
    // Check if already exists
    const existing = await db.collection('leads')
      .where('company', '==', angel.company)
      .get();
    
    if (!existing.empty) {
      console.log(`⏭️  Skip (exists): ${angel.company}`);
      skipped++;
      continue;
    }
    
    await db.collection('leads').add({
      ...angel,
      status: 'new',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    console.log(`✅ Added: ${angel.company} (${angel.country}, ICP: ${angel.icpScore})`);
    added++;
  }
  
  console.log(`\n✅ Done! Added ${added}, skipped ${skipped} (already exist)`);
}

seedAngels().catch(console.error);
