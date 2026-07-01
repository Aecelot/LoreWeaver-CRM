import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';

const sa = JSON.parse(readFileSync('../service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const updates = [
  {
    id: '2VRNvnLyTVdkGFRVlNVc', // Max Mullen
    data: {
      name: 'Max Mullen',
      investorThesis: 'Instacart co-founder, prolific angel investor (100+ investments). Focuses on B2B SaaS, fintech, and AI. Runs Workshop SF founder community. Has written about "Super Agents" (AI orchestration) - shows AI/agent interest but no gaming investments.',
      investorStage: 'seed',
      typicalCheckSize: '$25-100K (estimated)',
      portfolioGaming: [],
      // Scoring
      thesisFitScore: 2, // Generalist tech/AI, no gaming
      stageFitScore: 5, // Angel, seed-focused
      checkSizeFitScore: 4, // $25-100K range
      gamingExpertiseScore: 0, // No gaming investments
      activityScore: 4, // Very active, 100+ investments
      geographyFitScore: 2, // US-based
      totalFitScore: 30, // (2×3)+(5×2)+(4×2)+(0×2)+(4×1)+(2×1)=30
      investorTier: 'tier-2'
    }
  },
  {
    id: '3P0XDPnLvc74C3hV3upR', // Gary Vaynerchuk
    data: {
      name: 'Gary Vaynerchuk',
      investorThesis: 'Celebrity angel investor (80+ companies). Early backer of Facebook, Twitter, Tumblr, Venmo, Snapchat, Coinbase, Uber, Liquid Death, Slack. Consumer tech focus - mobile, social, digital. No gaming investments visible.',
      investorStage: 'seed',
      typicalCheckSize: '$25-100K (estimated)',
      portfolioGaming: [],
      // Scoring
      thesisFitScore: 2, // Consumer/mobile focus, no gaming
      stageFitScore: 4, // Seed to Series A
      checkSizeFitScore: 4, // Angel checks
      gamingExpertiseScore: 0, // No gaming investments
      activityScore: 4, // Active, 80+ companies
      geographyFitScore: 2, // US-based
      totalFitScore: 28, // (2×3)+(4×2)+(4×2)+(0×2)+(4×1)+(2×1)=28
      investorTier: 'tier-3'
    }
  }
];

// RB-H (id: 2sfH2t24DjETgTEkwg3v) skipped - website unreachable

async function main() {
  for (const update of updates) {
    await db.collection('leads').doc(update.id).update({
      ...update.data,
      status: 'researched',
      'pipeline.stageId': 'researched',
      researchedAt: new Date().toISOString(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log(`✓ Updated: ${update.data.name}`);
  }
  
  console.log(`\n=== Updated ${updates.length} investors with thesis + scores ===`);
  process.exit(0);
}

main();
