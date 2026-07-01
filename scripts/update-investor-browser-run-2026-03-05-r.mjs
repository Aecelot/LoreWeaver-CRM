import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';

const sa = JSON.parse(readFileSync('../service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const updates = [
  {
    id: 'rbTVDor7ETmQwq4fBMBR', // ccheever.com
    data: {
      name: 'Charlie Cheever',
      website: 'https://ccheever.com',
      country: 'United States',
      investorThesis: 'Quora co-founder turned prolific angel investor. 48+ investments on record. Explicit focus on Games, AI, SMB Software, and Real Estate/PropTech. Invests across pre-seed to Series B. Typical check around $100K (can go up to $1M). Notable portfolio includes Etched.ai and Harmonic. San Francisco Bay Area based. Strong fit for LoreWeaver: direct gaming + AI thesis alignment, appropriate check size for our seed round, active investor with broad network.',
      investorStage: 'pre-seed to series-b',
      typicalCheckSize: '$100K typical (up to $1M)',
      portfolioGaming: ['Multiple gaming investments - details via NFX Signal'],
      thesisFitScore: 5, // Explicitly invests in Games + AI
      stageFitScore: 5, // Pre-seed/seed included
      checkSizeFitScore: 5, // $100K sweet spot matches our EUR 50-200K
      gamingExpertiseScore: 4, // Multiple gaming investments on record
      activityScore: 5, // 48 investments, very active
      geographyFitScore: 2, // US-based, invests in US primarily
      totalFitScore: 50, // (5×3)+(5×2)+(5×2)+(4×2)+(5×1)+(2×1) = 15+10+10+8+5+2
      investorTier: 'tier-1'
    }
  },
  {
    id: 'sCJUBQigRAx0hlNUIBvn', // BITKRAFT Ventures
    data: {
      name: 'BITKRAFT Ventures',
      website: 'https://www.bitkraft.vc',
      country: 'Germany',
      investorThesis: 'Premier gaming-focused VC. Self-described focus on "Synthetic Reality™" - convergence of physical and digital worlds driven by video games, gaming tech, Web3, and AI. Investment range: Seed, Series A, Series B. Multiple funds: $165M Fund I, $272M Fund II (2021), $275M Fund III (2024), plus $100M Opportunity Fund and Token Funds. Portfolio unicorns: Higgsfield, Magic Eden, Immutable. 50+ gaming investments. Team founded by gamers with 3 decades of thought leadership. Global presence (Denver HQ, European founders). Strong fit for LoreWeaver: Gaming + AI thesis perfectly aligned. However, check sizes typically $250K-2M may be larger than our current round needs. Best approached for Series A or strategic intro.',
      investorStage: 'seed to series-b',
      typicalCheckSize: '$250K-2M (larger checks typical)',
      portfolioGaming: ['Higgsfield (unicorn)', 'Magic Eden (unicorn)', 'Immutable (unicorn)', '50+ gaming companies'],
      thesisFitScore: 5, // Gaming-dedicated fund with AI interest
      stageFitScore: 4, // Seed included but primarily Series A/B
      checkSizeFitScore: 4, // $250K-2M slightly large for EUR 150K round
      gamingExpertiseScore: 5, // 50+ gaming investments, 3 unicorns
      activityScore: 4, // Very active but no 2026 investments yet per Tracxn
      geographyFitScore: 4, // Germany-based, invests globally including EU
      totalFitScore: 49, // (5×3)+(4×2)+(4×2)+(5×2)+(4×1)+(4×1) = 15+8+8+10+4+4
      investorTier: 'tier-1'
    }
  },
  {
    id: 't4os4ZFNXUvpqb8kFzCJ', // Nordic Game Ventures
    data: {
      name: 'Nordic Game Ventures',
      website: 'https://nordicgameventures.com',
      country: 'Sweden',
      investorThesis: 'Nordic gaming-dedicated VC. Focus: games, game services, games tech, applied games in Nordic countries (Finland, Sweden, Norway, Denmark, Iceland). Regulated under AIFM (Finland & Sweden). Team: 50+ years combined games industry experience, raised 40+ MEUR for 150+ companies. ESG-focused with code-compliant reporting. CONCERN: Portfolio shows 3 bankruptcies (StageZero, Akribian, Supremacy Games). Tracxn shows 6 companies in 4 years with 0 new investments in last 3 years - fund may be fully deployed or inactive. Thesis fits well but activity level is concerning. Worth reaching out to confirm fund status before pursuit.',
      investorStage: 'seed to early-growth',
      typicalCheckSize: 'Unknown (Nordic seed range likely EUR 50-200K)',
      portfolioGaming: ['StageZero (bankrupt 24Q1)', 'Akribian (bankrupt 22Q3)', 'Supremacy Games (bankrupt 24Q4)'],
      thesisFitScore: 5, // Gaming-dedicated fund
      stageFitScore: 5, // Seed/early-stage focused
      checkSizeFitScore: 3, // Unknown but likely appropriate Nordic range
      gamingExpertiseScore: 5, // Gaming-only, 50+ years combined experience
      activityScore: 1, // 0 investments in last 3 years - major concern
      geographyFitScore: 4, // Nordic/EU-based
      totalFitScore: 46, // (5×3)+(5×2)+(3×2)+(5×2)+(1×1)+(4×1) = 15+10+6+10+1+4
      investorTier: 'tier-1'
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
