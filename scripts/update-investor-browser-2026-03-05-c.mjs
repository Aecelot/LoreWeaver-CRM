import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';

const sa = JSON.parse(readFileSync('../service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const updates = [
  {
    id: '7ObS8ZG7fLILZlNdHT9h', // KaleaVentures
    data: {
      name: 'Kalea Ventures',
      investorThesis: 'AI-focused VC (Palo Alto). Invests in AI-driven platforms disrupting education, healthcare, gaming, and robotics. Seeks companies building "tomorrow\'s intelligent systems."',
      investorStage: 'seed',
      typicalCheckSize: 'Unknown',
      portfolioGaming: [],
      // Scoring
      thesisFitScore: 4, // AI + gaming + robotics
      stageFitScore: 3, // VC, unclear exact stages
      checkSizeFitScore: 0, // Unknown
      gamingExpertiseScore: 2, // Mentions gaming but not gaming-focused
      activityScore: 4, // Actively seeking investments
      geographyFitScore: 2, // US-based (Palo Alto, not UK as originally listed)
      totalFitScore: 28, // (4×3)+(3×2)+(0×2)+(2×2)+(4×1)+(2×1)=28
      investorTier: 'tier-3',
      country: 'US' // Correction: based in Palo Alto, not UK
    }
  },
  {
    id: '8PZOCW0FRv7SJ8aXvWtn', // Makers Fund
    data: {
      name: 'Makers Fund',
      investorThesis: 'Gaming-dedicated global VC ($500M Fund III). Backs interactive entertainment from seed to growth. "Funding the next generation of creators and innovators." Focus on Asia expansion. Advisors include Matthew Ball.',
      investorStage: 'seed, series-a, growth',
      typicalCheckSize: '$500K-$40M (median $5-10M)',
      portfolioGaming: [
        'Scopely (acquired by Savvy Gaming Group)',
        'Croteam (acquired by Devolver Digital)',
        'Rest.ai (acquired by Unity)',
        'Ready at Dawn (acquired by Facebook Games)',
        'Owlchemy Labs (acquired by Google)',
        'Undead Labs (acquired by Microsoft)',
        'Sumo Digital (IPO LSE AIM)',
        'Gracenote (acquired by Nielsen)',
        'Firemonkeys (acquired by Sony)',
        'NaturalMotion (acquired by Zynga)'
      ],
      // Scoring
      thesisFitScore: 5, // Gaming-dedicated fund
      stageFitScore: 4, // Seed included, goes to growth
      checkSizeFitScore: 1, // $500K minimum too high for EUR 150K round
      gamingExpertiseScore: 5, // Gaming-dedicated, massive portfolio
      activityScore: 5, // Very active, $500M fund
      geographyFitScore: 3, // UK/global, invests cross-border
      totalFitScore: 43, // (5×3)+(4×2)+(1×2)+(5×2)+(5×1)+(3×1)=43
      investorTier: 'tier-1'
    }
  },
  {
    id: '8o0ici4zdYzoiTc2bkjZ', // Almi Invest
    data: {
      name: 'Almi Invest',
      investorThesis: 'Sweden\'s most active early-stage investor (government-backed). Invests in scalable startups with innovative tech contributing to sustainable growth. All sectors including gaming, VR, AR. SWEDEN-ONLY: Companies must be registered in Sweden.',
      investorStage: 'pre-seed, seed',
      typicalCheckSize: 'SEK 1-10M (~EUR 90K-900K)',
      portfolioGaming: [],
      // Scoring
      thesisFitScore: 3, // Generalist with tech focus, gaming included
      stageFitScore: 5, // Pre-seed/seed focused
      checkSizeFitScore: 5, // EUR 90K-900K is perfect
      gamingExpertiseScore: 2, // Invests in gaming but generalist
      activityScore: 5, // Sweden's most active early-stage investor
      geographyFitScore: 0, // BLOCKER: Sweden-only, LoreWeaver is Netherlands
      totalFitScore: 38, // (3×3)+(5×2)+(5×2)+(2×2)+(5×1)+(0×1)=38
      investorTier: 'tier-2',
      notes: 'GEOGRAPHY BLOCKER: Only invests in Sweden-registered companies. LoreWeaver is Netherlands-based.'
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
