import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';

const sa = JSON.parse(readFileSync('../service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const updates = [
  {
    id: 'jYgaAUQvuEcx0DfuKwI8', // Lifeline Ventures
    data: {
      name: 'Lifeline Ventures',
      website: 'https://www.lifelineventures.com',
      country: 'Finland',
      investorThesis: 'Sector-agnostic early-stage VC (pre-seed and seed) based in Helsinki, Finland. Team has global experience building/scaling companies as founders and CxO roles. Focus: "partner with founders from the very beginning" - resilient founders who can become industry leaders. Strong portfolio: ICEYE (SAR satellites, €2.4B valuation), Oura (smart ring, $200M Series D), Ever Cars ($31M Series A), Inven (AI deal sourcing). NO GAMING INVESTMENTS VISIBLE - portfolio is deep-tech, health-tech, fintech. Contact: firstname@lifelineventures.com',
      investorStage: 'pre-seed, seed',
      typicalCheckSize: 'Unknown - Nordic early-stage, likely EUR 100K-500K',
      portfolioGaming: [],
      thesisFitScore: 2, // Sector agnostic, tech but no gaming
      stageFitScore: 5, // Explicitly pre-seed and seed focused
      checkSizeFitScore: 4, // Early-stage Nordic, reasonable range
      gamingExpertiseScore: 0, // No gaming portfolio
      activityScore: 5, // Very active - ICEYE Series E, Ever Cars Series A, multiple 2025-2026 investments
      geographyFitScore: 4, // EU/Nordic, Finland-based, cross-border
      totalFitScore: 33, // (2×3)+(5×2)+(4×2)+(0×2)+(5×1)+(4×1)=6+10+8+0+5+4=33
      investorTier: 'tier-2'
    }
  },
  {
    id: 'kTRKlanjSLI2LQBYHm5s', // Danxia Capital
    data: {
      name: 'Danxia Capital',
      website: 'https://danxiacapital.com',
      country: 'United Kingdom',
      investorThesis: 'Web3/blockchain research collective (NOT a traditional VC fund). 20+ professionals across Europe, North America, Asia-Pacific with backgrounds in finance, IT, law, gaming, art. Focus: DeFi, Web3, AI, NFTs, gaming. Individual members invest personally, not at fund level. Portfolio includes some gaming: BitBrawl, ZOA Game, Angelic The Game, HashUp. Primary focus is research, market analysis, thought leadership. Less relevant for LoreWeaver due to: (1) not a fund structure, (2) web3/blockchain focus vs our on-prem AI narrative tech.',
      investorStage: 'seed (informal)',
      typicalCheckSize: 'Unknown - individual angel investments, likely small (EUR 10-50K)',
      portfolioGaming: ['BitBrawl', 'ZOA Game', 'Angelic The Game', 'HashUp'],
      thesisFitScore: 3, // Web3/gaming mentioned, but DeFi/blockchain primary focus
      stageFitScore: 3, // Early-stage but informal collective, not fund
      checkSizeFitScore: 2, // Individual angels, likely small checks
      gamingExpertiseScore: 3, // Has some gaming portfolio (4 games)
      activityScore: 3, // Research collective, some visible investments
      geographyFitScore: 3, // UK-based, global presence
      totalFitScore: 31, // (3×3)+(3×2)+(2×2)+(3×2)+(3×1)+(3×1)=9+6+4+6+3+3=31
      investorTier: 'tier-2'
    }
  }
];

// Invalid entries to mark
const invalidEntries = [
  {
    id: 'k4VYfKvVMn4mWfrGuLIq', // Rocket Capital
    data: {
      name: 'Rocket Capital (DEAD LINK)',
      website: 'https://www.rocketcapital.nl',
      country: 'Netherlands',
      investorThesis: 'WEBSITE DEAD - Domain rocketcapital.nl does not resolve (ENOTFOUND). Cannot research.',
      investorTier: 'tier-5',
      totalFitScore: 0
    }
  }
];

async function main() {
  // Update valid investors
  for (const update of updates) {
    await db.collection('leads').doc(update.id).update({
      ...update.data,
      status: 'researched',
      'pipeline.stageId': 'researched',
      researchedAt: new Date().toISOString(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log(`✓ Updated: ${update.data.name} (${update.data.investorTier}, score: ${update.data.totalFitScore})`);
  }
  
  // Mark invalid entries
  for (const entry of invalidEntries) {
    await db.collection('leads').doc(entry.id).update({
      ...entry.data,
      status: 'dead-link',
      'pipeline.stageId': 'dead-link',
      researchedAt: new Date().toISOString(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log(`✗ Marked invalid: ${entry.data.name}`);
  }
  
  // Remove processed investors from queue
  const queuePath = './investor-browser-queue.json';
  const queue = JSON.parse(readFileSync(queuePath, 'utf8'));
  const processedIds = [...updates.map(u => u.id), ...invalidEntries.map(e => e.id)];
  const newQueue = queue.filter(i => !processedIds.includes(i.id));
  writeFileSync(queuePath, JSON.stringify(newQueue, null, 2));
  console.log(`\n✓ Removed ${processedIds.length} investors from queue (${newQueue.length} remaining)`);
  
  console.log(`\n=== Processed ${updates.length} valid + ${invalidEntries.length} invalid investors ===`);
  process.exit(0);
}

main();
