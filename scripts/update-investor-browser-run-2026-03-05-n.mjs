import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';

const sa = JSON.parse(readFileSync('../service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const updates = [
  {
    id: 'lXAxvUBY1lawHI8vTWdk', // WAGMI Ventures
    data: {
      name: 'WAGMI Ventures',
      website: 'https://wagmiventures.pt',
      country: 'Portugal',
      investorThesis: 'Portuguese Golden Visa fund focused on Web3/digital assets and eco-friendly real estate. NOT a fit for LoreWeaver. Invests in: (1) Tech - category-leading potential, founder-focused, (2) Web3/blockchain infrastructure, validators, off-grid datacenters for AI/mining. Portfolio: PillSorted (UK pharmacy startup), Faircado (circular economy browser plugin - Slush 2023 winner), AKJ (ecosystem token), Lone Star Datacenters (off-grid AI compute). NO GAMING investments. Primary focus is crypto/blockchain infrastructure and real estate for Portuguese residency. Contact: website-based.',
      investorStage: 'seed, series-a',
      typicalCheckSize: 'Unknown - Golden Visa fund structure',
      portfolioGaming: [],
      thesisFitScore: 1, // Mentions AI but for crypto mining, not games
      stageFitScore: 3, // Early stage but unclear
      checkSizeFitScore: 0, // Unknown, Golden Visa structure likely not aligned
      gamingExpertiseScore: 0, // No gaming portfolio
      activityScore: 3, // Active - Faircado, PillSorted investments
      geographyFitScore: 2, // Portugal, not core EU VC market
      totalFitScore: 14, // (1×3)+(3×2)+(0×2)+(0×2)+(3×1)+(2×1)=3+6+0+0+3+2=14
      investorTier: 'tier-4'
    }
  }
];

// Invalid entries to mark
const invalidEntries = [
  {
    id: 'lw8xHJK6ipvDPwBKcJkd', // GEM Capital
    data: {
      name: 'GEM Capital',
      website: 'https://gem-capital.com',
      country: 'Russia/EU',
      investorThesis: 'WEBSITE UNREACHABLE - gem-capital.com failed to load (fetch failed). Cannot research. Domain may be down or blocked.',
      investorTier: 'tier-5',
      totalFitScore: 0
    }
  },
  {
    id: 'lyy7Fq6Gg2Ah2lBRgdHY', // Orillion
    data: {
      name: 'Orillion',
      website: 'https://orillion.co',
      country: 'United Kingdom',
      investorThesis: 'NOT AN INVESTOR FUND - Orillion Limited is a private holding company in Gibraltar (company #120848). Website only shows legal disclaimer stating they are NOT regulated, do NOT provide investment management, fund management, or advisory services. This is a private vehicle, not a VC fund to pitch. Should be removed from investor pipeline.',
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
