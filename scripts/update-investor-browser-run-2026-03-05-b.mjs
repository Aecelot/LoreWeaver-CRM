import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';

const sa = JSON.parse(readFileSync('../service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const updates = [
  {
    id: 'AjjTRn1NXaYzYtVZ8rwU', // byFounders
    data: {
      name: 'byFounders',
      investorThesis: 'Community-powered VC of the New Nordics. Invests in early-stage technology companies. Backs globally-ambitious & impact-aware founders from Nordic and Baltic countries. Known for founder-friendly terms. Uses "8T Framework" for evaluation. Generalist tech fund - no gaming focus.',
      investorStage: 'pre-seed, seed',
      typicalCheckSize: 'EUR 500K-4M',
      portfolioGaming: [],
      // Scoring per rubric
      thesisFitScore: 2, // Generalist tech, no gaming
      stageFitScore: 5, // Pre-seed/seed focused
      checkSizeFitScore: 1, // EUR 500K-4M is too large for EUR 150K raise
      gamingExpertiseScore: 0, // No gaming investments visible
      activityScore: 5, // Very active - multiple 2026 investments (Tangled, Intric, Willo, Sumary)
      geographyFitScore: 2, // Nordic/Baltic focus, NL outside core geography
      totalFitScore: 25, // (2×3)+(5×2)+(1×2)+(0×2)+(5×1)+(2×1)=25
      investorTier: 'tier-3'
    }
  },
  {
    id: 'BCMJ9VPR7rBdPHKiVtBt', // Truesight Venture Capital
    data: {
      name: 'Truesight Venture Capital',
      investorThesis: 'VC investing in pre-seed and seed stage startups in Europe. Invests in ambitious founders going after large markets, solving important problems with technology. Portfolio categories: AI/ML, Business Apps, Consumer, Data/Analytics, EdTech, FinTech, Future of Work, Health Tech, Marketing, Marketplace, Security, Talent. Has G-Loot (esports) in portfolio but no dedicated gaming focus.',
      investorStage: 'pre-seed, seed',
      typicalCheckSize: 'Unknown',
      portfolioGaming: ['G-Loot (esports)'],
      // Scoring per rubric
      thesisFitScore: 3, // Includes AI/ML, has gaming-adjacent investment
      stageFitScore: 5, // Pre-seed/seed focused
      checkSizeFitScore: 0, // Unknown
      gamingExpertiseScore: 2, // One esports investment (G-Loot)
      activityScore: 3, // Moderate activity visible
      geographyFitScore: 3, // UK-based, Europe-friendly
      totalFitScore: 29, // (3×3)+(5×2)+(0×2)+(2×2)+(3×1)+(3×1)=29
      investorTier: 'tier-3'
    }
  },
  {
    id: 'BEWGP7WJrzVCv4xhuHCU', // Play Ventures
    data: {
      name: 'Play Ventures',
      investorThesis: 'The leading gaming & consumer apps VC. Invests early into game studios, consumer apps, and B2B infrastructure/services for the gaming ecosystem. Founded by gaming entrepreneurs. Backs Appcharge, Scenario, PVX and many more gaming B2B tools. Perfect fit for LoreWeaver as they explicitly invest in gaming infrastructure.',
      investorStage: 'pre-seed, seed',
      typicalCheckSize: '$500K-1M',
      portfolioGaming: ['Appcharge', 'Scenario', 'PVX', '100+ gaming companies'],
      // Scoring per rubric
      thesisFitScore: 5, // Gaming-dedicated, explicit B2B gaming tools focus
      stageFitScore: 5, // Pre-seed/seed, invests even before products
      checkSizeFitScore: 3, // $500K-1M - good for EUR 400K round, large for EUR 150K
      gamingExpertiseScore: 5, // Gaming-dedicated with massive portfolio
      activityScore: 5, // Very active fund, $135M raised in 2021
      geographyFitScore: 4, // EU-based (Finland), global investment scope
      totalFitScore: 50, // (5×3)+(5×2)+(3×2)+(5×2)+(5×1)+(4×1)=50
      investorTier: 'tier-1'
    }
  }
];

async function main() {
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
  
  console.log(`\n=== Updated ${updates.length} investors with thesis + scores ===`);
  process.exit(0);
}

main();
