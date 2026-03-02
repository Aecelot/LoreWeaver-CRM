#!/usr/bin/env node
/**
 * Seed additional gaming angel investors into CRM (batch 2)
 * Source: Shizune.co top 50 US gaming angels
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

// Initialize Firebase
const serviceAccount = JSON.parse(readFileSync('./service-account.json', 'utf-8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const angels = [
  // High-activity US angels from Shizune (not in batch 1)
  {
    company: "Edward Lando (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 82,
    stage: "Seed, Pre-Seed",
    notes: "Pareto Holdings founder. 16 gaming investments. Focus: Software, Health Care, IT. Wharton alum.",
    source: "Shizune",
    contactName: "Edward Lando",
    tags: ["angel", "high-volume", "tier-2"]
  },
  {
    company: "Bryan Rosenblatt (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 85,
    stage: "Seed, Series A, Pre-Seed",
    notes: "Craft Ventures partner. 15 gaming investments. Former Reddit Head of Sales. Portfolio: Neuralink, Feastables.",
    source: "Shizune",
    contactName: "Bryan Rosenblatt",
    tags: ["angel", "craft-ventures", "tier-2"]
  },
  {
    company: "Wei Guo (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 85,
    stage: "Seed, Series A, Angel",
    notes: "UpHonest Capital founding partner. 13 gaming investments. 400+ startups invested. 76 unicorns. Cross-border US-China focus.",
    source: "Shizune",
    contactName: "Wei Guo",
    tags: ["angel", "high-volume", "cross-border", "tier-2"]
  },
  {
    company: "Jonathan Keidan (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 82,
    stage: "Seed, Series A, Series B",
    notes: "Torch Capital founder. 13 gaming investments. InsideHook co-founder. Media + tech + entertainment focus. NYC-based.",
    source: "Shizune",
    contactName: "Jonathan Keidan",
    tags: ["angel", "torch-capital", "media", "tier-2"]
  },
  {
    company: "Joanne Wilson (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 80,
    stage: "Seed, Series A, Angel",
    notes: "Gotham Gal. 12 gaming investments. 90+ portfolio. Food52, Sweeten, Makers Row. NYC angel, consumer + e-commerce focus.",
    source: "Shizune",
    contactName: "Joanne Wilson",
    linkedIn: "https://linkedin.com/in/joannewilson",
    website: "https://gothamgal.com",
    tags: ["angel", "gotham-gal", "consumer", "tier-2"]
  },
  {
    company: "Mark Cuban (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 85,
    stage: "Seed, Series A, Angel",
    notes: "Dallas Mavericks owner. 10 gaming investments. Shark Tank. Broad portfolio across tech, blockchain, gaming.",
    source: "Shizune",
    contactName: "Mark Cuban",
    tags: ["angel", "celebrity", "tier-2"]
  },
  {
    company: "Clark Landry (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 78,
    stage: "Seed, Series A, Angel",
    notes: "Clover Leaf Ventures managing partner. 10 gaming investments. CESPPA co-founder. Yale alum.",
    source: "Shizune",
    contactName: "Clark Landry",
    tags: ["angel", "tier-2"]
  },
  {
    company: "Gary Vaynerchuk (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 80,
    stage: "Seed, Series A, Angel",
    notes: "VaynerX chairman. 10 gaming investments. VaynerMedia founder. Strong social media presence. Consumer + mobile focus.",
    source: "Shizune",
    contactName: "Gary Vaynerchuk",
    tags: ["angel", "celebrity", "consumer", "tier-2"]
  },
  {
    company: "Trevor Wright (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 75,
    stage: "Seed",
    notes: "9 gaming investments.",
    source: "Shizune",
    contactName: "Trevor Wright",
    tags: ["angel", "tier-3"]
  },
  {
    company: "Kyle Vogt (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 82,
    stage: "Seed, Series A",
    notes: "Cruise Automation co-founder (GM acquisition). 8 gaming investments. Twitch co-founder. Robotics + tech background.",
    source: "Shizune",
    contactName: "Kyle Vogt",
    tags: ["angel", "cruise-founder", "twitch", "tier-2"]
  },
  {
    company: "Tim Ferriss (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 82,
    stage: "Seed, Angel",
    notes: "4-Hour Workweek author. 8 gaming investments. Uber, Shopify, Facebook early investor. High-profile angel.",
    source: "Shizune",
    contactName: "Tim Ferriss",
    tags: ["angel", "celebrity", "tier-2"]
  },
  {
    company: "Nick Green (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 75,
    stage: "Seed",
    notes: "8 gaming investments.",
    source: "Shizune",
    contactName: "Nick Green",
    tags: ["angel", "tier-3"]
  },
  {
    company: "Kimbal Musk (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 78,
    stage: "Seed, Series A",
    notes: "Tesla board. 8 gaming investments. Square Roots, Big Green founder. Food + tech focus but invests broadly.",
    source: "Shizune",
    contactName: "Kimbal Musk",
    tags: ["angel", "musk-family", "tier-2"]
  },
  {
    company: "Daniel Curran (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 75,
    stage: "Seed",
    notes: "8 gaming investments.",
    source: "Shizune",
    contactName: "Daniel Curran",
    tags: ["angel", "tier-3"]
  },
  {
    company: "Kevin Love (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 75,
    stage: "Seed",
    notes: "NBA player. 8 gaming investments. Athlete-investor.",
    source: "Shizune",
    contactName: "Kevin Love",
    tags: ["angel", "athlete", "tier-3"]
  },
  {
    company: "Gabby Dizon (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 82,
    stage: "Seed, Pre-Seed",
    notes: "Yield Guild Games co-founder. 8 gaming investments. Web3 gaming pioneer. Strong gaming industry background.",
    source: "Shizune",
    contactName: "Gabby Dizon",
    tags: ["angel", "web3-gaming", "ygg", "tier-2"]
  },
  {
    company: "Matt Mullenweg (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 85,
    stage: "Seed, Series A",
    notes: "WordPress/Automattic founder. 8 gaming investments. Developer tools background. Open source advocate.",
    source: "Shizune",
    contactName: "Matt Mullenweg",
    tags: ["angel", "wordpress-founder", "dev-tools", "tier-2"]
  },
  {
    company: "Christian Edler (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 75,
    stage: "Seed",
    notes: "7 gaming investments.",
    source: "Shizune",
    contactName: "Christian Edler",
    tags: ["angel", "tier-3"]
  },
  {
    company: "Jason Finger (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 75,
    stage: "Seed",
    notes: "7 gaming investments.",
    source: "Shizune",
    contactName: "Jason Finger",
    tags: ["angel", "tier-3"]
  },
  {
    company: "Güimar Vaca Sittic (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 75,
    stage: "Seed",
    notes: "7 gaming investments.",
    source: "Shizune",
    contactName: "Güimar Vaca Sittic",
    tags: ["angel", "tier-3"]
  },
  {
    company: "Kevin Moore (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 75,
    stage: "Seed",
    notes: "7 gaming investments.",
    source: "Shizune",
    contactName: "Kevin Moore",
    tags: ["angel", "tier-3"]
  },
  {
    company: "Wayne Chang (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 78,
    stage: "Seed, Series A",
    notes: "7 gaming investments. Crashlytics co-founder (Twitter acquisition).",
    source: "Shizune",
    contactName: "Wayne Chang",
    tags: ["angel", "crashlytics", "tier-2"]
  },
  {
    company: "Paul Buchheit (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 88,
    stage: "Seed, Series A",
    notes: "Gmail creator. Y Combinator partner. 7 gaming investments. Created 'Don't be evil'. Top-tier angel.",
    source: "Shizune",
    contactName: "Paul Buchheit",
    tags: ["angel", "gmail-creator", "yc", "tier-1"]
  },
  {
    company: "Justin Mateen (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 78,
    stage: "Seed",
    notes: "Tinder co-founder. 7 gaming investments. Consumer + mobile focus.",
    source: "Shizune",
    contactName: "Justin Mateen",
    tags: ["angel", "tinder-founder", "tier-2"]
  },
  {
    company: "Max Mullen (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 75,
    stage: "Seed",
    notes: "Instacart co-founder. 7 gaming investments.",
    source: "Shizune",
    contactName: "Max Mullen",
    tags: ["angel", "instacart", "tier-2"]
  },
  {
    company: "Justin Kan (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 88,
    stage: "Seed, Series A",
    notes: "Twitch co-founder. 7 gaming investments. Y Combinator partner. Atrium founder. Top gaming angel.",
    source: "Shizune",
    contactName: "Justin Kan",
    tags: ["angel", "twitch-founder", "yc", "tier-1"]
  },
  {
    company: "Scooter Braun (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 75,
    stage: "Seed",
    notes: "Music manager (Justin Bieber, Ariana Grande). 7 gaming investments. Entertainment + media focus.",
    source: "Shizune",
    contactName: "Scooter Braun",
    tags: ["angel", "entertainment", "tier-3"]
  },
  {
    company: "Jon Oringer (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 82,
    stage: "Seed, Series A",
    notes: "Shutterstock founder. 7 gaming investments. Content marketplace background. Creator economy.",
    source: "Shizune",
    contactName: "Jon Oringer",
    tags: ["angel", "shutterstock-founder", "creator-economy", "tier-2"]
  },
  {
    company: "Naval Ravikant (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 90,
    stage: "Seed, Angel",
    notes: "AngelList founder. 7 gaming investments. Twitter, Uber, Notion early investor. Philosophy + tech. Top-tier angel.",
    source: "Shizune",
    contactName: "Naval Ravikant",
    tags: ["angel", "angellist-founder", "tier-1"]
  },
  {
    company: "John Legend (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 72,
    stage: "Seed",
    notes: "Artist/producer. 7 gaming investments. Celebrity investor.",
    source: "Shizune",
    contactName: "John Legend",
    tags: ["angel", "celebrity", "tier-3"]
  }
];

async function seedAngels() {
  console.log(`Seeding ${angels.length} additional gaming angel investors...`);
  
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
    
    console.log(`✅ Added: ${angel.company} (ICP: ${angel.icpScore})`);
    added++;
  }
  
  console.log(`\n✅ Done! Added ${added}, skipped ${skipped} (already exist)`);
}

seedAngels().catch(console.error);
