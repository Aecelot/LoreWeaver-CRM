import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';

const sa = JSON.parse(readFileSync('../service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const updates = [
  {
    id: 'tdlA4A1xM2rP9c9YA3T7', // gothamgal.com
    data: {
      name: 'Joanne Wilson (Gotham Gal)',
      website: 'https://gothamgal.com',
      country: 'United States',
      investorThesis: 'Prolific consumer-focused angel investor with 140+ portfolio companies. Strong focus on female entrepreneurs and values-aligned businesses. Primary sectors: food/beverage (Food52, Mouth, Num Pang), fashion/retail (Parachute Home, Le Tote), cannabis (Gotham dispensary chain - her current operator focus), real estate (Frame Home), and media (Eater/Curbed Network). Married to Fred Wilson (Union Square Ventures). No gaming or tech tools investments visible in portfolio. NOT a fit for LoreWeaver: Consumer/CPG focus, no gaming expertise, no AI/software interest evident.',
      investorStage: 'seed (angel)',
      typicalCheckSize: '$25K-100K (typical angel range)',
      portfolioGaming: [],
      thesisFitScore: 1, // Generalist consumer focus, no gaming/AI/tools
      stageFitScore: 5, // Early-stage angel focused
      checkSizeFitScore: 4, // $25K-50K typical, fits our range
      gamingExpertiseScore: 0, // No gaming investments in 140+ portfolio
      activityScore: 5, // Very active investor
      geographyFitScore: 2, // US-based, primarily invests in US
      totalFitScore: 28, // (1×3)+(5×2)+(4×2)+(0×2)+(5×1)+(2×1) = 3+10+8+0+5+2
      investorTier: 'tier-3'
    }
  },
  {
    id: 'xaZj8kEWOu7JFYQdLYlk', // growthbox.vc
    data: {
      name: 'Growth Box Ventures',
      website: 'https://growthbox.vc',
      country: 'Malta',
      investorThesis: 'Malta-based VC focused on iGaming (betting/casino affiliates), fintech, and lead generation. 62 investments, 5 exits, 57 active portfolio companies. Core thesis: digital transformation in gaming (iGaming/betting), fintech, and personal finance sectors. Portfolio includes: Odds Scanner, Spixler, Kindred (major gambling operator), PlayStar, Tipster Clad, NAGA (trading), Skilling (fintech). IMPORTANT: This is iGaming (gambling/betting industry) NOT video game development. NOT a fit for LoreWeaver: We build narrative AI for video games, not gambling tools. Their "gaming" focus is casino/betting affiliate marketing, completely different industry.',
      investorStage: 'seed to early-stage',
      typicalCheckSize: 'Unknown (iGaming seed typically EUR 100-500K)',
      portfolioGaming: ['Kindred (gambling operator)', 'Odds Scanner (betting affiliate)', 'Spixler (betting affiliate)', 'PlayStar (casino)'],
      thesisFitScore: 0, // iGaming (gambling) not video games - wrong sector entirely
      stageFitScore: 5, // Explicitly seed/early-stage
      checkSizeFitScore: 3, // Unknown but likely appropriate
      gamingExpertiseScore: 0, // iGaming ≠ video game development
      activityScore: 4, // 62 investments, appears active
      geographyFitScore: 4, // Malta/EU-based
      totalFitScore: 16, // (0×3)+(5×2)+(3×2)+(0×2)+(4×1)+(4×1) = 0+10+6+0+4+4
      investorTier: 'tier-4'
    }
  },
  {
    id: 'yiTR1P5naNpJqO7JsfE9', // graphventures.com
    data: {
      name: 'Graph Ventures',
      website: 'https://graphventures.com',
      country: 'United States',
      investorThesis: 'San Francisco-based seed fund founded 2011 by operators/founders. 180 companies, 9 unicorns (Robinhood, QuintoAndar, Envoy, TrueLayer, PicsArt, etc.), 8 IPOs, 39 acquisitions. Sectors: Consumer (23), Enterprise Apps (17), FinTech (12), High Tech (10), Retail (10). 70% of latest fund had woman/BIPOC founder. One-third investments outside US. Notable portfolio includes Dapper Labs (CryptoKitties, blockchain games) and companies acquired by Epic Games. Average seed round $3.62M. CONCERN: Only 2 investments in 2024, 0 in 2025-2026 - fund may be winding down or fully deployed. Worth reaching out but may be inactive. Moderate fit: some gaming exposure (Dapper Labs) but not gaming-focused, activity level concerning.',
      investorStage: 'seed to series-a',
      typicalCheckSize: '$100K-500K (avg seed round $3.62M total)',
      portfolioGaming: ['Dapper Labs (blockchain games)', 'Company acquired by Epic Games'],
      thesisFitScore: 3, // B2B SaaS/tech generalist, some gaming via Dapper Labs
      stageFitScore: 5, // 49/63 investments at seed
      checkSizeFitScore: 3, // Slightly large checks for EUR 150K round
      gamingExpertiseScore: 3, // Dapper Labs investment, Epic acquisition
      activityScore: 1, // Only 2 investments in 2024, 0 in 2025-2026
      geographyFitScore: 2, // US-based, invests globally but primarily US
      totalFitScore: 34, // (3×3)+(5×2)+(3×2)+(3×2)+(1×1)+(2×1) = 9+10+6+6+1+2
      investorTier: 'tier-2'
    }
  }
];

async function main() {
  // Update investors
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
  
  // Remove processed investors from queue
  const queuePath = './investor-browser-queue.json';
  const queue = JSON.parse(readFileSync(queuePath, 'utf8'));
  const processedIds = updates.map(u => u.id);
  const newQueue = queue.filter(i => !processedIds.includes(i.id));
  writeFileSync(queuePath, JSON.stringify(newQueue, null, 2));
  console.log(`\n✓ Removed ${processedIds.length} investors from queue (${newQueue.length} remaining)`);
  
  console.log(`\n=== Processed ${updates.length} investors ===`);
  process.exit(0);
}

main();
