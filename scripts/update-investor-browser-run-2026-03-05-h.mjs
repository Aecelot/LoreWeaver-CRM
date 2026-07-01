import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';

const sa = JSON.parse(readFileSync('../service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const updates = [
  {
    id: 'SJbYNizJLqLQx4rRbRrL', // Fil Rouge Capital
    data: {
      name: 'Fil Rouge Capital',
      website: 'https://www.filrougecapital.com',
      country: 'Luxembourg', // Fixed from Poland
      investorThesis: 'Early stage investment fund focusing on pre-seed, seed, and Series A rounds. €100M AUM, 171 startups funded, 290 founders backed. Generalist tech investor with no stated gaming or AI focus. Based in Luxembourg (not Poland as originally listed). Accelerator-style program with mentors. Focus on "bold" entrepreneurs.',
      investorStage: 'pre-seed, seed, series-a',
      typicalCheckSize: 'EUR 500K-600K average (€100M / 171 startups)',
      portfolioGaming: [],
      thesisFitScore: 2, // Generalist, no gaming/AI mentioned
      stageFitScore: 5, // Perfect stage fit (pre-seed to Series A)
      checkSizeFitScore: 3, // Average €580K too large for our round
      gamingExpertiseScore: 0, // No gaming investments visible
      activityScore: 3, // 171 startups but unknown recent activity
      geographyFitScore: 4, // Luxembourg (EU)
      totalFitScore: 29, // (2×3)+(5×2)+(3×2)+(0×2)+(3×1)+(4×1)=6+10+6+0+3+4=29
      investorTier: 'tier-3'
    }
  },
  {
    id: 'XCHuy07S9Q4Qek8ajf0J', // Metis Ventures
    data: {
      name: 'Metis Ventures',
      website: 'https://metisventures.com',
      investorThesis: 'Data-driven VC backing "diverse founders with global ambition." 60 portfolio companies, $1.8B total portfolio value across 6 locations. Focuses on local-to-global market expansion. "Hybrid approach" blending data-driven scouting with active engagement. Metis Surge platform for portfolio support. Team of immigrants, operators, investors. Gaming mentioned in tags but not core thesis - primarily growth-stage generalist.',
      investorStage: 'seed, series-a, series-b', // $1.8B portfolio suggests later stage
      typicalCheckSize: 'Unknown (likely EUR 500K-2M given portfolio value)',
      portfolioGaming: [], // No gaming companies visible
      thesisFitScore: 2, // Generalist, gaming is one of many sectors
      stageFitScore: 3, // Portfolio value suggests Series A+ focus
      checkSizeFitScore: 2, // Likely too large
      gamingExpertiseScore: 1, // Gaming tag but no visible expertise
      activityScore: 4, // 60 companies, active
      geographyFitScore: 4, // Netherlands (EU)
      totalFitScore: 26, // (2×3)+(3×2)+(2×2)+(1×2)+(4×1)+(4×1)=6+6+4+2+4+4=26
      investorTier: 'tier-3'
    }
  },
  {
    id: 'YkYrIP4tMQLpHwq1ZZEJ', // Fabric Ventures
    data: {
      name: 'Fabric Ventures',
      website: 'https://www.fabric.vc',
      investorThesis: 'Thesis-driven VC for the "Machine Economy." 196 portfolio companies across Robotics, AI, Fintech, Distributed Computing & Web3. Team of founders, operators, engineers with decades of Internet/cloud/payments/DevOps/AI experience. Offices in NYC, London, Luxembourg, Dubai. Backs companies from inception. R[3]sidency program for builders. Backed by EU InnovFin/EFSI. Gaming listed in tags but primary focus is infrastructure/Web3/AI tooling.',
      investorStage: 'pre-seed, seed, series-a',
      typicalCheckSize: 'Unknown (196 companies suggests varied)',
      portfolioGaming: [], // Gaming mentioned but no specific portfolio
      thesisFitScore: 3, // AI/infrastructure focus, gaming adjacent
      stageFitScore: 4, // "From inception" suggests early stage
      checkSizeFitScore: 3, // Unknown, likely varied
      gamingExpertiseScore: 2, // Gaming tag but Web3/infra focus
      activityScore: 4, // 196 companies, very active
      geographyFitScore: 4, // Luxembourg HQ, EU-wide
      totalFitScore: 35, // (3×3)+(4×2)+(3×2)+(2×2)+(4×1)+(4×1)=9+8+6+4+4+4=35
      investorTier: 'tier-2'
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
