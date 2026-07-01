import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';

const sa = JSON.parse(readFileSync('../service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const updates = [
  {
    id: 'FyHcSnmDutcR1IW5GrMz', // KPT Seed Fund
    data: {
      name: 'Fundusz Zalążkowy KPT (KPT Seed Fund)',
      investorThesis: 'Joint venture of Krakow Technology Park and SATUS Venture. Explicitly focuses on innovative projects WITH SPECIAL EMPHASIS on the games industry ("ze szczególnym uwzględnieniem branży gier"). Partner of Digital Dragons Incubator - supports young game studios entering commercial market. Early-stage focus (seed/pre-seed). 20+ portfolio companies, 14 profitable exits since 2009.',
      investorStage: 'pre-seed, seed',
      typicalCheckSize: 'EUR 25-100K (estimated Polish seed range)',
      portfolioGaming: [], // Digital Dragons partnership but visible portfolio is mostly tech
      lastInvestmentDate: 'Unknown - fund may be largely deployed',
      // Scoring
      thesisFitScore: 5, // Explicitly gaming-focused, Digital Dragons partner
      stageFitScore: 5, // Pre-seed/seed explicitly
      checkSizeFitScore: 4, // EUR 25-100K fits our EUR 25-100K angel target
      gamingExpertiseScore: 4, // Digital Dragons partner, gaming stated focus, though portfolio has limited visible gaming
      activityScore: 2, // No recent investments visible, fund seems mostly deployed (est 2009)
      geographyFitScore: 4, // EU-based (Poland), invests cross-border
      totalFitScore: 47, // (5×3)+(5×2)+(4×2)+(4×2)+(2×1)+(4×1)=15+10+8+8+2+4=47
      investorTier: 'tier-1'
    }
  },
  {
    id: 'GWYlNlPcpbG1Cl9wcBjK', // Fitch Media Ventures
    data: {
      name: 'Fitch Media Ventures',
      investorThesis: 'UK-based investor covering seed to revenue growth stages. Focus areas: advertising, social media, automotive, and gaming. "We provide the skills and experience that turn a good idea into a sustainable business." Combines funding with operational expertise. Note: Website appears outdated/non-responsive as of March 2026.',
      investorStage: 'seed to growth',
      typicalCheckSize: 'Unknown',
      portfolioGaming: [], // No visible gaming portfolio
      lastInvestmentDate: 'Unknown - activity unclear',
      // Scoring
      thesisFitScore: 4, // Gaming included in thesis, but also advertising/social/automotive
      stageFitScore: 4, // Seed included in range
      checkSizeFitScore: 3, // Unknown, assuming reasonable range
      gamingExpertiseScore: 2, // Mentions gaming but no visible gaming portfolio
      activityScore: 1, // Website broken, unclear if actively investing
      geographyFitScore: 3, // UK-based
      totalFitScore: 34, // (4×3)+(4×2)+(3×2)+(2×2)+(1×1)+(3×1)=12+8+6+4+1+3=34
      investorTier: 'tier-2'
    }
  },
  {
    id: 'GdwvR2qneTs8A9uTfN0s', // MicroWave Ventures
    data: {
      name: 'MicroWave Ventures',
      investorThesis: 'Spain-based VC. Website redirects/non-functional as of March 2026. Listed focus areas: fintech, gaming, consumer. Unable to verify thesis or portfolio due to website issues.',
      investorStage: 'Unknown',
      typicalCheckSize: 'Unknown',
      portfolioGaming: [],
      lastInvestmentDate: 'Unknown',
      // Scoring - conservative due to lack of data
      thesisFitScore: 2, // Gaming mentioned in tags but unverified
      stageFitScore: 0, // Unknown
      checkSizeFitScore: 0, // Unknown
      gamingExpertiseScore: 0, // Unable to verify
      activityScore: 0, // Website broken, status unclear
      geographyFitScore: 4, // EU-based (Spain)
      totalFitScore: 10, // (2×3)+(0×2)+(0×2)+(0×2)+(0×1)+(4×1)=6+0+0+0+0+4=10
      investorTier: 'tier-4',
      researchNote: 'Website non-functional. Needs LinkedIn/alternate research.'
    }
  }
];

async function main() {
  // Update CRM
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
  
  // Remove processed investors from queue
  const queuePath = './investor-browser-queue.json';
  const queue = JSON.parse(readFileSync(queuePath, 'utf8'));
  const processedIds = updates.map(u => u.id);
  const newQueue = queue.filter(inv => !processedIds.includes(inv.id));
  writeFileSync(queuePath, JSON.stringify(newQueue, null, 2));
  console.log(`\n✓ Removed ${processedIds.length} investors from queue`);
  console.log(`✓ Queue now has ${newQueue.length} remaining investors`);
  
  console.log(`\n=== Updated ${updates.length} investors with thesis + scores ===`);
  process.exit(0);
}

main();
