import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';

const sa = JSON.parse(readFileSync('../service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const updates = [
  {
    id: 'g24pSHSFZ3Vf5az63T8S', // PixCapital
    data: {
      name: 'PixCapital',
      website: 'https://pixcapital.vc',
      country: 'France',
      investorThesis: 'Gaming-dedicated early-stage VC ("venture clan"). Founded 2023, Paris-based, invests globally. Self-described "gamers-at-heart" who have scaled studios and tech companies to exits. Pre-seed, seed, and Series A focus. Team are financial professionals who have bootstrapped, scaled, and exited gaming/tech companies. Investment thesis: "fuel the future rockets of gaming innovation" - gaming infrastructure and experiences. Portfolio includes: Karmine (esports), ArkRep (gaming), VaultN (game distribution platform - $1.6M seed). Conviction-based investments. Contact: via website form.',
      investorStage: 'pre-seed, seed, series-a',
      typicalCheckSize: 'Unknown - early stage gaming focus suggests EUR 50K-500K range',
      portfolioGaming: ['Karmine (esports)', 'ArkRep (gaming)', 'VaultN (game distribution)'],
      thesisFitScore: 5, // Explicitly gaming-focused, game tech, infrastructure
      stageFitScore: 5, // Pre-seed and seed focused
      checkSizeFitScore: 3, // Unknown but early-stage gaming suggests reasonable range
      gamingExpertiseScore: 5, // Gaming-dedicated fund, multiple gaming investments
      activityScore: 4, // VaultN investment 2025, founded 2023
      geographyFitScore: 4, // EU-based France, invests globally
      totalFitScore: 49, // (5×3)+(5×2)+(3×2)+(5×2)+(4×1)+(4×1)=15+10+6+10+4+4=49
      investorTier: 'tier-1'
    }
  },
  {
    id: 'hlWMZ4KnfOceVXXL5vVj', // Lifeline Ventures
    data: {
      name: 'Lifeline Ventures',
      website: 'https://www.lifelineventures.com',
      country: 'Finland',
      investorThesis: 'Sector-agnostic early-stage VC (pre-seed and seed) based in Helsinki, Finland. Team has global experience building/scaling companies as founders and CxO roles. Focus: "partner with founders from the very beginning" - resilient founders who can become industry leaders. Strong portfolio: ICEYE (SAR satellites, €2.4B valuation), Oura (smart ring, $200M Series D), Ever Cars ($31M Series A), Inven (AI deal sourcing). NO GAMING INVESTMENTS VISIBLE - portfolio is deep-tech, health-tech, fintech. Contact: firstname@lifelineventures.com.',
      investorStage: 'pre-seed, seed',
      typicalCheckSize: 'Unknown - pre-seed/seed focus',
      portfolioGaming: [],
      thesisFitScore: 2, // Generalist, software/tech but no gaming mention
      stageFitScore: 5, // Explicitly pre-seed and seed focused
      checkSizeFitScore: 3, // Unknown, but pre-seed/seed suggests reasonable sizes
      gamingExpertiseScore: 0, // No gaming investments visible
      activityScore: 5, // Very active - multiple 2025/2026 investments
      geographyFitScore: 4, // EU/Nordic, Finland-based
      totalFitScore: 31, // (2×3)+(5×2)+(3×2)+(0×2)+(5×1)+(4×1)=6+10+6+0+5+4=31
      investorTier: 'tier-2'
    }
  },
  {
    id: 'iD0jz6eqbTVl7notnDhe', // ConsenSys Mesh
    data: {
      name: 'ConsenSys Mesh',
      website: 'https://www.mesh.xyz',
      country: 'Switzerland',
      investorThesis: 'Web3/blockchain-focused VC founded 2015 by Ethereum co-founder Joseph Lubin. Invests across web3 ecosystem. 150+ portfolio companies, 240+ founders, 5K+ community, 6 accelerator cohorts (Tachyon - first dedicated web3 accelerator, 90+ projects). Portfolio includes: Sorare (sports/gaming NFTs), Aztec Protocol, CoW Protocol, Decrypt, Gitcoin, Gnosis, Safe, StarkWare, Rocket Pool. While Sorare is gaming-adjacent, thesis is fundamentally web3/blockchain - NOT aligned with LoreWeaver (on-prem AI, not crypto/web3). Wrong thesis fit.',
      investorStage: 'accelerator, seed, various',
      typicalCheckSize: 'Unknown - accelerator + VC hybrid model',
      portfolioGaming: ['Sorare (sports/gaming NFTs)'],
      thesisFitScore: 2, // Web3 focus, gaming is minor; LoreWeaver isn't web3
      stageFitScore: 4, // Accelerator + early stage, not explicitly seed-focused
      checkSizeFitScore: 3, // Unknown, accelerator/VC hybrid
      gamingExpertiseScore: 3, // Sorare is gaming-adjacent (1 investment)
      activityScore: 4, // Active ecosystem, ongoing accelerator
      geographyFitScore: 2, // Swiss/global but US-focused ecosystem
      totalFitScore: 32, // (2×3)+(4×2)+(3×2)+(3×2)+(4×1)+(2×1)=6+8+6+6+4+2=32
      investorTier: 'tier-2'
    }
  }
];

// Invalid entries to mark
const invalidEntries = [
  {
    id: 'cgtPo0MvIhoeaarIeBaZ', // PlayCap VC
    data: {
      name: 'PlayCap VC (DEAD LINK)',
      investorThesis: 'WEBSITE DEAD - Domain playcap.vc does not resolve (ENOTFOUND). Cannot research.',
      investorTier: 'tier-5',
      totalFitScore: 0
    }
  },
  {
    id: 'hDxYz2MnUI2mPZMMWshV', // Calamari Ventures
    data: {
      name: 'Calamari Ventures - INVALID (April Fools)',
      investorThesis: 'NOT A REAL VC - Website redirects to empty Notion page. Name includes "April Fool\'s!" - likely a joke/prank entry.',
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
