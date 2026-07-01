import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';

const sa = JSON.parse(readFileSync('../service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const updates = [
  {
    id: 'bz9jKROUdRkJGA9o3szg', // node.vc
    data: {
      name: 'node.vc',
      website: 'https://www.node.vc',
      country: 'Sweden',
      investorThesis: 'Nordic early-stage VC by founders and operators. Founded 2023, started investing early 2024. Sector-agnostic but focuses on "disruptive forces" across: New Experiences, Platform Technologies, Smarter Workplaces. 40+ prior investments by team. Team includes John Elvesjö (Managing Partner), Daniela Sjunnesson, Henrik Tellving, Mårten Skogö, Andy Johnston. Portfolio includes: Serverpod (Flutter app server), Lemonado (dashboards), StarHive (data management), Acembee (sustainability AI), Favora (fashion AI), Telgea (mobile operator). NO GAMING INVESTMENTS VISIBLE despite "gaming" tag. Generalist tech fund.',
      investorStage: 'early-stage (seed implied)',
      typicalCheckSize: 'Unknown - not disclosed',
      portfolioGaming: [],
      thesisFitScore: 2, // Generalist tech, mentions "new experiences" but no gaming/AI tools focus
      stageFitScore: 4, // Early-stage but exact stage unclear
      checkSizeFitScore: 0, // Unknown - not disclosed
      gamingExpertiseScore: 1, // Tagged gaming but no gaming portfolio visible
      activityScore: 4, // Started 2024, 40+ investments by team
      geographyFitScore: 4, // Nordic/EU, cross-border
      totalFitScore: 24, // (2×3)+(4×2)+(0×2)+(1×2)+(4×1)+(4×1)=6+8+0+2+4+4=24
      investorTier: 'tier-3'
    }
  },
  {
    id: 'cFlFw9tivyQ9NVKwb6Ko', // Alven
    data: {
      name: 'Alven',
      website: 'https://alven.co',
      country: 'France',
      investorThesis: 'Independent early-stage VC firm for 25 years, based in Paris. "For founders who won\'t stop short of their vision." $500M+ AUM. Primarily invests in French/French-related entrepreneurs in digital tech space. Focus on B2B SaaS and fintech. 62 Series A investments (avg $8.25M), 57 Seed investments (avg $5.24M), 9 Series B (avg $16M). Portfolio highlights: Stripe (early), Algolia, Dataiku, Qonto, Gorgias. Contact: contact@alven.co. NO GAMING INVESTMENTS VISIBLE despite tags - portfolio is entirely B2B SaaS/fintech.',
      investorStage: 'seed, series-a, series-b',
      typicalCheckSize: 'USD 5.24M avg seed, USD 8.25M avg Series A - TOO LARGE',
      portfolioGaming: [],
      thesisFitScore: 2, // Generalist digital tech, no gaming/AI tools focus
      stageFitScore: 4, // Seed included but primarily Series A
      checkSizeFitScore: 1, // $5M+ seed avg - way too large for EUR150K
      gamingExpertiseScore: 0, // No gaming investments visible despite tag
      activityScore: 5, // Very active, 128+ investments, recent Verley deal Feb 2026
      geographyFitScore: 4, // EU-based, France
      totalFitScore: 25, // (2×3)+(4×2)+(1×2)+(0×2)+(5×1)+(4×1)=6+8+2+0+5+4=25
      investorTier: 'tier-3'
    }
  },
  {
    id: 'cSNKslBUwCaurhw2hijW', // Hummingbird VC
    data: {
      name: 'Hummingbird VC',
      website: 'https://www.hummingbird.vc',
      country: 'United Kingdom',
      investorThesis: 'Global early-stage VC backing "outliers of the outliers." Concentrated bets philosophy - once put 25% of fund in one company. Nomadic team, global search for anomalies. "We don\'t meddle" - hands-off approach. Generalist but conviction-based. Invest $500K at seed to $50M+ when doubling/tripling down. 39 Seed investments (avg $7.51M), 30 Series A (avg $16.5M). Portfolio: Revolut (exit 2025), Aspire, Deall, Kaleidoscope. NO GAMING INVESTMENTS VISIBLE despite tags - portfolio is fintech/biotech/SaaS.',
      investorStage: 'pre-seed, seed, series-a, series-b',
      typicalCheckSize: 'USD 500K to $50M+ (seed $500K minimum)',
      portfolioGaming: [],
      thesisFitScore: 2, // Explicit generalist, adaptability focus, no gaming mention
      stageFitScore: 4, // Seed included ($500K up)
      checkSizeFitScore: 3, // $500K minimum - could work for EUR400K round but large for initial
      gamingExpertiseScore: 0, // No gaming investments visible despite tag
      activityScore: 4, // Active, recent exits (Revolut 2025)
      geographyFitScore: 3, // UK-based, global/nomadic
      totalFitScore: 27, // (2×3)+(4×2)+(3×2)+(0×2)+(4×1)+(3×1)=6+8+6+0+4+3=27
      investorTier: 'tier-3'
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
  
  // Remove processed investors from queue
  const queuePath = './investor-browser-queue.json';
  const queue = JSON.parse(readFileSync(queuePath, 'utf8'));
  const processedIds = updates.map(u => u.id);
  const newQueue = queue.filter(i => !processedIds.includes(i.id));
  writeFileSync(queuePath, JSON.stringify(newQueue, null, 2));
  console.log(`\n✓ Removed ${processedIds.length} investors from queue (${newQueue.length} remaining)`);
  
  console.log(`\n=== Updated ${updates.length} investors with thesis + scores ===`);
  process.exit(0);
}

main();
