#!/usr/bin/env node
/**
 * Seed game industry insider angels (batch 3) - LOW PROFILE, HIGH RELEVANCE
 * Focus: Former studio execs, middleware founders, operators who invest
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(readFileSync('./service-account.json', 'utf-8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const angels = [
  // === GAME INDUSTRY OPERATORS (Low profile, high relevance) ===
  
  {
    company: "Klaas Kersting (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Germany",
    icpScore: 95,
    stage: "Seed, Early Stage",
    checkSize: "€50K-500K",
    notes: "Phoenix Games/Flaregames/Gameforge founder. 40+ portfolio. Board: Supercell, Wooga. Serial gaming entrepreneur. Karlsruhe-based. PERFECT FIT - understands game tools.",
    source: "Crunchbase",
    contactName: "Klaas Kersting",
    linkedIn: "https://linkedin.com/in/klaaskersting",
    tags: ["angel", "game-operator", "german", "top-priority"]
  },
  {
    company: "Kristian Segerstråle (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 92,
    stage: "Seed, Series A",
    notes: "Super Evil Megacorp CEO (Vainglory). Playfish co-founder (EA acquisition). Active gaming angel. Deep mobile + competitive games experience.",
    source: "PitchBook",
    contactName: "Kristian Segerstråle",
    tags: ["angel", "game-operator", "playfish", "top-priority"]
  },
  {
    company: "Matt Bilbey (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "UK",
    icpScore: 90,
    stage: "Seed",
    notes: "Former EA Sports EVP. 20+ years EA executive. Now active gaming angel. Portfolio: Dead Astronauts + others. Deep AAA + sports game experience.",
    source: "PitchBook",
    contactName: "Matt Bilbey",
    tags: ["angel", "game-operator", "ea-alum", "top-priority"]
  },
  {
    company: "Karl Magnus Troedsson (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Sweden",
    icpScore: 95,
    stage: "Seed, Series A",
    checkSize: "$100K-5M",
    notes: "Ex-EA/DICE executive. Behold Ventures founder (€58M fund). Raw Fury. Angel investing since 2016. Bright Gambit co-founder. PERFECT FIT.",
    source: "Behold Ventures",
    contactName: "Karl Magnus Troedsson",
    linkedIn: "https://linkedin.com/in/karlmagnustroedsson",
    tags: ["angel", "game-operator", "dice", "behold", "top-priority"]
  },
  {
    company: "Sigurlína Ingvarsdóttir (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Iceland",
    icpScore: 90,
    stage: "Seed",
    notes: "Behold Ventures co-founder. Ex-CCP Games (EVE Online), EA/DICE. Deep MMO + live ops experience. Iceland-based.",
    source: "Behold Ventures",
    contactName: "Sigurlína Ingvarsdóttir",
    tags: ["angel", "game-operator", "ccp", "behold"]
  },
  {
    company: "Are Mack Growen (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Norway",
    icpScore: 85,
    stage: "Seed",
    notes: "Norwegian gaming angel. Portfolio: Dead Astronauts + others. Active in Nordic gaming ecosystem.",
    source: "GamesIndustry.biz",
    contactName: "Are Mack Growen",
    tags: ["angel", "game-operator", "nordic"]
  },
  {
    company: "Asbjoern Malte Soendergaard (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Denmark",
    icpScore: 85,
    stage: "Seed",
    notes: "Danish gaming angel. Active seed investor. Nordic gaming network.",
    source: "GamesIndustry.biz",
    contactName: "Asbjoern Malte Soendergaard",
    tags: ["angel", "game-operator", "nordic"]
  },
  {
    company: "Nicholas Francis (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Denmark",
    icpScore: 92,
    stage: "Seed",
    notes: "Unity co-founder. Now angel investor. Built the game engine. PERFECT FIT for game tools.",
    source: "Tracxn",
    contactName: "Nicholas Francis",
    tags: ["angel", "unity-founder", "game-tools", "top-priority"]
  },
  
  // === BRIGHT GAMBIT TEAM (Swedish gaming angel collective) ===
  
  {
    company: "Tim Browne (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Sweden",
    icpScore: 85,
    stage: "Seed",
    notes: "26 years game industry. Ex-Ubisoft, Codemasters, Activision Blizzard King, Avalanche Studios. Creative director background. Bright Gambit.",
    source: "Bright Gambit",
    contactName: "Tim Browne",
    linkedIn: "https://linkedin.com/in/timbrowne",
    tags: ["angel", "game-operator", "bright-gambit"]
  },
  {
    company: "Fawzi Mesmar (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Sweden",
    icpScore: 88,
    stage: "Seed",
    notes: "Award-winning game designer. 20 years: Ubisoft, EA, Activision Blizzard, Gameloft, Atlus. Battlefield, Persona, Candy Crush. Bright Gambit. Author.",
    source: "Bright Gambit",
    contactName: "Fawzi Mesmar",
    tags: ["angel", "game-operator", "designer", "bright-gambit"]
  },
  {
    company: "Andreea Chifu (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Sweden",
    icpScore: 82,
    stage: "Seed",
    notes: "Ex-Raw Fury, Paradox Interactive. Business development + publishing. Bright Gambit.",
    source: "Bright Gambit",
    contactName: "Andreea Chifu",
    linkedIn: "https://linkedin.com/in/andreeachifu",
    tags: ["angel", "game-operator", "publishing", "bright-gambit"]
  },
  {
    company: "Robert Bäckström (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Sweden",
    icpScore: 82,
    stage: "Seed",
    notes: "Games producer 16+ years. 10+ titles. Console + PC. Angel investor + startup experience. Bright Gambit.",
    source: "Bright Gambit",
    contactName: "Robert Bäckström",
    linkedIn: "https://linkedin.com/in/robertb7",
    tags: ["angel", "game-operator", "producer", "bright-gambit"]
  },
  {
    company: "Tobias Andersson (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Sweden",
    icpScore: 85,
    stage: "Seed",
    notes: "Turborilla founder (2008, 30 employees). Mobile games. Active angel investor. Bright Gambit.",
    source: "Bright Gambit",
    contactName: "Tobias Andersson",
    tags: ["angel", "game-operator", "founder", "bright-gambit"]
  },
  {
    company: "Vic Bassey (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Global",
    country: "UK",
    icpScore: 82,
    stage: "Seed",
    notes: "Griffin Gaming Partners advisor. GamesIndustryAfrica founder. Games publishing + biz dev. Bright Gambit.",
    source: "Bright Gambit",
    contactName: "Vic Bassey",
    tags: ["angel", "game-operator", "griffin", "africa"]
  },
  {
    company: "Juliette Auverny-Bennetot (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Sweden",
    icpScore: 80,
    stage: "Seed",
    notes: "Entertainment lawyer. 10 years games: Paradox Interactive, Raw Fury. Legal + contracts expertise. Bright Gambit.",
    source: "Bright Gambit",
    contactName: "Juliette Auverny-Bennetot",
    linkedIn: "https://linkedin.com/in/juliette-auverny-bennetot-928ab1b",
    tags: ["angel", "game-operator", "legal", "bright-gambit"]
  },
  
  // === UK GAMING ANGELS ===
  
  {
    company: "Huw Bishop (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "UK",
    icpScore: 85,
    stage: "Pre-Seed, Seed",
    notes: "Lead investor 10six Games. Angels Invest Wales. Active UK gaming angel.",
    source: "Wales Dev Bank",
    contactName: "Huw Bishop",
    tags: ["angel", "game-operator", "uk", "lead-investor"]
  },
  {
    company: "PlayCap (Syndicate)",
    type: "investor",
    subType: "syndicate",
    product: "director",
    region: "Global",
    country: "UK",
    icpScore: 88,
    stage: "Pre-Seed, Seed",
    notes: "Global angel network of women from games industry. Early-stage: studios, companies, game tech. Perfect for tools.",
    source: "Wales Dev Bank",
    website: "https://playcap.vc",
    tags: ["syndicate", "women-led", "game-tech"]
  },
  {
    company: "Bright Gambit (Syndicate)",
    type: "investor",
    subType: "syndicate",
    product: "director",
    region: "Europe",
    country: "Sweden",
    icpScore: 90,
    stage: "Seed",
    notes: "Swedish gaming angel collective. Founded 2021. Team: KM Troedsson, Fawzi Mesmar, Tim Browne + 7 others. All game industry veterans.",
    source: "Website",
    website: "https://brightgambit.com",
    tags: ["syndicate", "nordic", "game-veterans", "top-priority"]
  },
  {
    company: "Behold Ventures",
    type: "investor",
    subType: "micro-vc",
    product: "director",
    region: "Europe",
    country: "Sweden",
    icpScore: 92,
    stage: "Seed, Series A",
    checkSize: "$100K-5M",
    notes: "€58M gaming-only fund. Founded by KM Troedsson, Sigurlína Ingvarsdóttir, Magnus Kenneby. 18 portfolio companies. Nordic focus. PERFECT FIT.",
    source: "ArcticStartup",
    website: "https://behold.vc",
    tags: ["micro-vc", "nordic", "gaming-only", "top-priority"]
  },
  
  // === MORE NORDIC GAMING ANGELS ===
  
  {
    company: "Magnus Kenneby (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Sweden",
    icpScore: 82,
    stage: "Seed",
    notes: "Behold Ventures co-founder. Ex-Sequent Invest (small cap PE). Fast Track Capital, Mionix board.",
    source: "Behold Ventures",
    contactName: "Magnus Kenneby",
    tags: ["angel", "behold", "nordic"]
  },
  {
    company: "Binni Erlingsson (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Iceland",
    icpScore: 80,
    stage: "Seed",
    notes: "Behold Ventures team. Icelandic gaming investor.",
    source: "Mobidictum",
    contactName: "Binni Erlingsson",
    tags: ["angel", "behold", "iceland"]
  },
  
  // === GERMAN GAMING ANGELS ===
  
  {
    company: "Game Seer Venture Partners",
    type: "investor",
    subType: "micro-vc",
    product: "director",
    region: "Europe",
    country: "Germany",
    icpScore: 85,
    stage: "Seed",
    notes: "Aschaffenburg, Germany. Indie game funding specialist. Also backs game-adjacent tools.",
    source: "Website",
    website: "https://game-seer.com",
    tags: ["micro-vc", "german", "indie-games"]
  },
  
  // === MORE UK GAME INDUSTRY ANGELS ===
  
  {
    company: "Susan Cummings (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "UK",
    icpScore: 78,
    stage: "Pre-Seed, Seed",
    notes: "Game industry veteran. 10six Games co-founder. Wales-based.",
    source: "Wales Dev Bank",
    contactName: "Susan Cummings",
    tags: ["angel", "game-operator", "uk", "founder"]
  },
  {
    company: "Lee Cummings (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "UK",
    icpScore: 78,
    stage: "Pre-Seed, Seed",
    notes: "Game industry veteran. 10six Games co-founder. Wales-based.",
    source: "Wales Dev Bank",
    contactName: "Lee Cummings",
    tags: ["angel", "game-operator", "uk", "founder"]
  },
  
  // === F4 FUND / EGD ALUMNI ===
  
  {
    company: "F4 Fund",
    type: "investor",
    subType: "micro-vc",
    product: "director",
    region: "Global",
    country: "US",
    icpScore: 85,
    stage: "Seed",
    notes: "Spun out of EGD Syndicate in 2024. 34 angel investments 2019-2023. Gaming professionals collective.",
    source: "EGD Substack",
    website: "https://elitegamedevelopers.substack.com",
    tags: ["micro-vc", "gaming-professionals"]
  },
  
  // === FINNISH GAMING ANGELS ===
  
  {
    company: "Lifeline Ventures (Gaming Focus)",
    type: "investor",
    subType: "vc",
    product: "director",
    region: "Europe",
    country: "Finland",
    icpScore: 82,
    stage: "Seed, Series A",
    notes: "Finnish VC. 14 gaming investments in Europe. Early Supercell backer.",
    source: "Shizune",
    website: "https://lifelineventures.com",
    tags: ["vc", "finnish", "gaming"]
  },
  
  // === DANISH ANGELS ===
  
  {
    company: "Danish Business Angels (Gaming)",
    type: "investor",
    subType: "syndicate",
    product: "director",
    region: "Europe",
    country: "Denmark",
    icpScore: 78,
    stage: "Seed",
    notes: "350+ members (2024). Invested ~DKK 500m in 2023. Gaming subset available.",
    source: "Nordic Startup Hub",
    website: "https://danishbusinessangels.dk",
    tags: ["syndicate", "danish", "large-network"]
  }
];

async function seedAngels() {
  console.log(`Seeding ${angels.length} game industry insider angels...`);
  
  let added = 0;
  let skipped = 0;
  
  for (const angel of angels) {
    const existing = await db.collection('leads')
      .where('company', '==', angel.company)
      .get();
    
    if (!existing.empty) {
      console.log(`⏭️  Skip: ${angel.company}`);
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
  
  console.log(`\n✅ Done! Added ${added}, skipped ${skipped}`);
}

seedAngels().catch(console.error);
