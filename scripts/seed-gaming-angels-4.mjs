#!/usr/bin/env node
/**
 * Seed game industry insider angels (batch 4) - 50 MORE LOW PROFILE, HIGH RELEVANCE
 * Focus: VC partners with operator backgrounds, fund team members, syndicate members
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(readFileSync('./service-account.json', 'utf-8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const angels = [
  // === BITKRAFT TEAM (ESL founder's firm) ===
  {
    company: "Jens Hilgers (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Germany",
    icpScore: 95,
    stage: "Seed, Series A",
    checkSize: "$2M-5M",
    notes: "ESL founder (acquired). BITKRAFT founding GP. 45+ investments. Esports pioneer. Berlin-based. PERFECT FIT.",
    source: "BITKRAFT",
    contactName: "Jens Hilgers",
    linkedIn: "https://linkedin.com/in/jenshilgers",
    tags: ["angel", "esl-founder", "bitkraft", "top-priority"]
  },
  {
    company: "Moritz Baier-Lentz (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 90,
    stage: "Seed, Series A",
    notes: "Lightspeed Venture Partners gaming head. Former Goldman Sachs VP. BITKRAFT partner.",
    source: "BITKRAFT",
    contactName: "Moritz Baier-Lentz",
    tags: ["angel", "bitkraft", "lightspeed", "top-priority"]
  },
  {
    company: "Scott Rupp (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 88,
    stage: "Seed, Series A",
    notes: "BITKRAFT founding GP. 20+ years interactive entertainment. Denver-based.",
    source: "BITKRAFT",
    contactName: "Scott Rupp",
    tags: ["angel", "bitkraft", "operator"]
  },
  {
    company: "Dennis Fong (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 90,
    stage: "Seed, Series A",
    notes: "World's first pro gamer ('Thresh'). ~$1B exits (Xfire, Raptr, ggwp). BITKRAFT venture partner. Legend status.",
    source: "BITKRAFT",
    contactName: "Dennis Fong",
    tags: ["angel", "bitkraft", "pro-gamer", "operator", "top-priority"]
  },
  {
    company: "Malte Barth (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Portugal",
    icpScore: 85,
    stage: "Seed, Series A",
    notes: "BITKRAFT founding partner. 20+ years media/games/esports. Portugal-based.",
    source: "BITKRAFT",
    contactName: "Malte Barth",
    tags: ["angel", "bitkraft", "operator"]
  },
  {
    company: "Frank Zhu (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 85,
    stage: "Seed",
    notes: "BITKRAFT venture partner. Ex-Riot China, DreamWorks, Disney. 20 years cross-media.",
    source: "BITKRAFT",
    contactName: "Frank Zhu",
    tags: ["angel", "bitkraft", "riot", "operator"]
  },
  {
    company: "Nico Vereecke (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Germany",
    icpScore: 82,
    stage: "Seed",
    notes: "BITKRAFT venture partner. Built multiple crypto/fintech startups. Gaming + crypto focus.",
    source: "BITKRAFT",
    contactName: "Nico Vereecke",
    tags: ["angel", "bitkraft", "crypto"]
  },
  {
    company: "Carlos Pereira (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 85,
    stage: "Seed, Series A",
    notes: "BITKRAFT GP leading crypto strategy. Gaming, media, interactive entertainment.",
    source: "BITKRAFT",
    contactName: "Carlos Pereira",
    tags: ["angel", "bitkraft"]
  },
  {
    company: "Anuj Tandon (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Asia",
    country: "India",
    icpScore: 82,
    stage: "Seed",
    notes: "BITKRAFT partner, India & MENA. Good for Asia expansion.",
    source: "BITKRAFT",
    contactName: "Anuj Tandon",
    tags: ["angel", "bitkraft", "india"]
  },
  
  // === 1UP VENTURES TEAM (Indie-focused) ===
  {
    company: "Ed Fries (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 95,
    stage: "Seed",
    notes: "Former Microsoft VP, built Xbox game publishing. 1Up Ventures GP. Board member dozens of game companies. PERFECT FIT.",
    source: "1Up Ventures",
    contactName: "Ed Fries",
    linkedIn: "https://linkedin.com/in/edfries",
    tags: ["angel", "xbox", "microsoft", "1up", "top-priority"]
  },
  {
    company: "Kelly Wallick (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 90,
    stage: "Seed",
    notes: "Indie MEGABOOTH founder. Former IGF Chair. 1Up Ventures partner. 15 years indie games. Community builder.",
    source: "1Up Ventures",
    contactName: "Kelly Wallick",
    linkedIn: "https://linkedin.com/in/kelly-wallick-193b705",
    tags: ["angel", "1up", "indie", "community", "top-priority"]
  },
  {
    company: "Emily Greer (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 90,
    stage: "Seed",
    notes: "Kongregate co-founder & CEO. Double Loop Games co-founder. 1Up venture partner. AdVenture Capitalist, Animation Throwdown.",
    source: "1Up Ventures",
    contactName: "Emily Greer",
    linkedIn: "https://linkedin.com/in/emilygreer",
    tags: ["angel", "1up", "kongregate", "operator", "top-priority"]
  },
  {
    company: "Chris Wheaton (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 78,
    stage: "Seed",
    notes: "1Up Ventures fund admin. Stanford MBA. 20+ years CFO/COO/GM experience.",
    source: "1Up Ventures",
    contactName: "Chris Wheaton",
    linkedIn: "https://linkedin.com/in/chris-wheaton-5442476b",
    tags: ["angel", "1up", "finance"]
  },
  
  // === SISU GAME VENTURES TEAM (Finnish gaming veterans) ===
  {
    company: "Samuli Syvähuoko (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Finland",
    icpScore: 95,
    stage: "Seed",
    notes: "Sisu founding partner. Remedy Entertainment co-founder (Max Payne, Alan Wake). 60+ portfolio. PERFECT FIT.",
    source: "Sisu Ventures",
    contactName: "Samuli Syvähuoko",
    tags: ["angel", "sisu", "remedy-founder", "top-priority"]
  },
  {
    company: "Paul Bragiel (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 88,
    stage: "Seed",
    notes: "Sisu founding partner. Co-founded i/o ventures, GameFounders, Golden Gate Ventures. 20+ years entrepreneur/investor.",
    source: "Sisu Ventures",
    contactName: "Paul Bragiel",
    tags: ["angel", "sisu", "gamefounders"]
  },
  {
    company: "Erik Gloersen (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Finland",
    icpScore: 85,
    stage: "Seed",
    notes: "Sisu general partner. Game industry veteran.",
    source: "Sisu Ventures",
    contactName: "Erik Gloersen",
    tags: ["angel", "sisu"]
  },
  {
    company: "Kalle Kaivola (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Finland",
    icpScore: 82,
    stage: "Seed",
    notes: "Sisu venture partner. Finnish game industry.",
    source: "Sisu Ventures",
    contactName: "Kalle Kaivola",
    tags: ["angel", "sisu"]
  },
  {
    company: "Moaffak Ahmed (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Finland",
    icpScore: 85,
    stage: "Seed",
    notes: "Sisu co-founder & venture partner. 25+ years entrepreneurship + investments.",
    source: "Sisu Ventures",
    contactName: "Moaffak Ahmed",
    tags: ["angel", "sisu"]
  },
  {
    company: "Kadri Härma (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Estonia",
    icpScore: 80,
    stage: "Seed",
    notes: "Sisu venture partner. Baltic gaming.",
    source: "Sisu Ventures",
    contactName: "Kadri Härma",
    tags: ["angel", "sisu", "baltic"]
  },
  {
    company: "Jere Partanen (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Finland",
    icpScore: 82,
    stage: "Seed",
    notes: "Sisu principal. Active Finnish gaming investor.",
    source: "Sisu Ventures",
    contactName: "Jere Partanen",
    tags: ["angel", "sisu"]
  },
  
  // === PLAY VENTURES TEAM (Finland + Singapore) ===
  {
    company: "Harri Manninen (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Finland",
    icpScore: 92,
    stage: "Pre-Seed, Seed",
    notes: "Play Ventures founding partner. Rocket Pack founder. Angel portfolio: Mighty Bear Games, FitXR, etc. Nordic XR Startups. PERFECT FIT.",
    source: "Play Ventures",
    contactName: "Harri Manninen",
    linkedIn: "https://linkedin.com/in/harrimanninen",
    tags: ["angel", "play-ventures", "operator", "top-priority"]
  },
  {
    company: "Henric Suuronen (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Asia",
    country: "Singapore",
    icpScore: 88,
    stage: "Pre-Seed, Seed",
    notes: "Play Ventures founding partner. Singapore-based. Asia gaming focus.",
    source: "Play Ventures",
    contactName: "Henric Suuronen",
    tags: ["angel", "play-ventures", "singapore"]
  },
  
  // === GRIFFIN GAMING PARTNERS TEAM ===
  {
    company: "Peter Levin (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 90,
    stage: "Seed to Pre-IPO",
    notes: "Griffin Gaming founder. $1.5B under management. Former Lionsgate president. LA-based.",
    source: "Griffin Gaming",
    contactName: "Peter Levin",
    tags: ["angel", "griffin", "lionsgate", "top-priority"]
  },
  {
    company: "Nick Tuosto (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 88,
    stage: "Seed to Pre-IPO",
    notes: "Griffin Gaming founder. $750M Fund II. Gaming infrastructure focus.",
    source: "Griffin Gaming",
    contactName: "Nick Tuosto",
    tags: ["angel", "griffin"]
  },
  
  // === MAKERS FUND TEAM ===
  {
    company: "Jay Chi (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Asia",
    country: "Singapore",
    icpScore: 88,
    stage: "Seed, Series A",
    notes: "Makers Fund founding partner. Kowloon Nights founding partner. 15+ years industry. Asia focus.",
    source: "Makers Fund",
    contactName: "Jay Chi",
    tags: ["angel", "makers-fund", "kowloon-nights", "asia"]
  },
  {
    company: "Michael Cheung (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Asia",
    country: "Singapore",
    icpScore: 82,
    stage: "Seed",
    notes: "Makers Fund investment team.",
    source: "Makers Fund",
    contactName: "Michael Cheung",
    tags: ["angel", "makers-fund"]
  },
  {
    company: "Yohei Ishii (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Asia",
    country: "Japan",
    icpScore: 85,
    stage: "Seed",
    notes: "Makers Fund investment team. Japan gaming market expertise.",
    source: "Makers Fund",
    contactName: "Yohei Ishii",
    tags: ["angel", "makers-fund", "japan"]
  },
  {
    company: "Alli Ottarsson (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Iceland",
    icpScore: 82,
    stage: "Seed",
    notes: "Makers Fund investment team. Nordic/Iceland.",
    source: "Makers Fund",
    contactName: "Alli Ottarsson",
    tags: ["angel", "makers-fund", "nordic"]
  },
  {
    company: "Matthew Ball (Advisor/Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 85,
    stage: "Seed",
    notes: "Makers Fund advisor. Metaverse author. Former Amazon Studios head of strategy. High-profile thought leader.",
    source: "Makers Fund",
    contactName: "Matthew Ball",
    tags: ["angel", "makers-fund", "metaverse", "advisor"]
  },
  
  // === GAME SEER TEAM ===
  {
    company: "Mikel (Game Seer)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Germany",
    icpScore: 88,
    stage: "Seed",
    notes: "Game Seer founder. Pioneer digital game distribution Europe 2005+. Built to IPO. Indie PC/console focus.",
    source: "Game Seer",
    contactName: "Mikel",
    website: "https://game-seer.com",
    tags: ["angel", "game-seer", "german", "indie"]
  },
  {
    company: "Bertrand (Game Seer)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Germany",
    icpScore: 85,
    stage: "Seed",
    notes: "Game Seer co-founder & managing partner. Ex-Nexway (Amazon, EA, Bethesda, Warner Bros accounts). Quadrilingual.",
    source: "Game Seer",
    contactName: "Bertrand",
    website: "https://game-seer.com",
    tags: ["angel", "game-seer", "german", "distribution"]
  },
  {
    company: "Thomas (Game Seer)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "France",
    icpScore: 80,
    stage: "Seed",
    notes: "Game Seer publishing producer & scouting. Ex-Ubisoft, Focus Home Interactive, Xbox release team. French esports organizer.",
    source: "Game Seer",
    contactName: "Thomas",
    website: "https://game-seer.com",
    tags: ["angel", "game-seer", "french", "ubisoft"]
  },
  
  // === ADDITIONAL GAMING ANGELS (Industry veterans) ===
  {
    company: "Joost van Dreunen (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 85,
    stage: "Seed",
    notes: "Makers Fund advisor. SuperData Research founder (Nielsen acquired). NYU professor. Gaming industry analyst.",
    source: "Makers Fund",
    contactName: "Joost van Dreunen",
    tags: ["angel", "makers-fund", "analyst", "academic"]
  },
  {
    company: "Anna Sweet (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 82,
    stage: "Seed",
    notes: "Makers Fund advisor. Gaming industry executive.",
    source: "Makers Fund",
    contactName: "Anna Sweet",
    tags: ["angel", "makers-fund", "advisor"]
  },
  {
    company: "Donovan Duncan (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 80,
    stage: "Seed",
    notes: "Makers Fund advisor.",
    source: "Makers Fund",
    contactName: "Donovan Duncan",
    tags: ["angel", "makers-fund", "advisor"]
  },
  
  // === LVP TEAM (London Venture Partners) ===
  {
    company: "David Gardiner (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "UK",
    icpScore: 90,
    stage: "Seed",
    notes: "LVP founding partner. Games-only fund. Ex-EA, Playfish. 20+ years gaming.",
    source: "LVP",
    contactName: "David Gardiner",
    tags: ["angel", "lvp", "ea", "playfish", "top-priority"]
  },
  {
    company: "David Hayward (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "UK",
    icpScore: 88,
    stage: "Seed",
    notes: "LVP partner. UK games ecosystem.",
    source: "LVP",
    contactName: "David Hayward",
    tags: ["angel", "lvp", "uk"]
  },
  
  // === INITIAL CAPITAL TEAM ===
  {
    company: "Alexis Bonte (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "UK",
    icpScore: 90,
    stage: "Seed",
    notes: "Initial Capital. eRepublik Labs founder. Stillfront board. European gaming veteran.",
    source: "Initial Capital",
    contactName: "Alexis Bonte",
    tags: ["angel", "initial-capital", "operator", "top-priority"]
  },
  
  // === HEARTCORE CAPITAL TEAM ===
  {
    company: "Max Niederhofer (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Germany",
    icpScore: 82,
    stage: "Seed",
    notes: "Heartcore Capital partner. 17 European gaming investments. Copenhagen-based.",
    source: "Heartcore",
    contactName: "Max Niederhofer",
    tags: ["angel", "heartcore", "nordic"]
  },
  
  // === ADDITIONAL EUROPEAN ANGELS ===
  {
    company: "Oscar Clark (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "UK",
    icpScore: 85,
    stage: "Seed",
    notes: "UK games consultant & angel. Everyplay, Unity, Papaya Mobile. Author 'Games As A Service'. 25+ years.",
    source: "LinkedIn",
    contactName: "Oscar Clark",
    tags: ["angel", "uk", "gaas", "consultant"]
  },
  {
    company: "Nicholas Lovell (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "UK",
    icpScore: 85,
    stage: "Seed",
    notes: "Gamesbrief founder. 'The Curve' author. F2P expert. UK games consultant & angel.",
    source: "LinkedIn",
    contactName: "Nicholas Lovell",
    tags: ["angel", "uk", "f2p", "author"]
  },
  {
    company: "Tadhg Kelly (Angel)",
    type: "investor",
    subType: "angel",
    product: "director",
    region: "Europe",
    country: "Ireland",
    icpScore: 82,
    stage: "Seed",
    notes: "What Games Are author. Game design consultant. Irish angel.",
    source: "LinkedIn",
    contactName: "Tadhg Kelly",
    tags: ["angel", "ireland", "design"]
  },
  
  // === KOWLOON NIGHTS ===
  {
    company: "Kowloon Nights",
    type: "investor",
    subType: "micro-vc",
    product: "director",
    region: "Asia",
    country: "Singapore",
    icpScore: 88,
    stage: "Seed",
    notes: "Non-dilutive game funding. Project financing. Partners with Makers Fund. Good for alternative funding discussions.",
    source: "InvestGame",
    website: "https://www.kowloonnights.com",
    tags: ["micro-vc", "project-finance", "asia"]
  },
  
  // === ADDITIONAL FUNDS (Small, accessible) ===
  {
    company: "Acequia Capital",
    type: "investor",
    subType: "micro-vc",
    product: "director",
    region: "North America",
    country: "US",
    icpScore: 82,
    stage: "Seed",
    notes: "Indie games focus. Participated in Dead Astronauts round.",
    source: "GamesIndustry.biz",
    tags: ["micro-vc", "indie"]
  },
  {
    company: "Lifelike Capital",
    type: "investor",
    subType: "micro-vc",
    product: "director",
    region: "Europe",
    country: "UK",
    icpScore: 82,
    stage: "Seed",
    notes: "European gaming micro-VC. Co-invested Dead Astronauts.",
    source: "GamesMarkt",
    tags: ["micro-vc", "european"]
  }
];

async function seedAngels() {
  console.log(`Seeding ${angels.length} game industry insider angels (batch 4)...`);
  
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
