import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';

const sa = JSON.parse(readFileSync('../service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const updates = [
  {
    id: 'avpk5UFRTifUZFDIAjCE', // Angels Den
    data: {
      name: 'Angels Den',
      website: 'https://www.angelsden.com',
      country: 'UK',
      investorThesis: 'UK\'s largest and longest-running angel investment network (since 2007). 21,000+ experienced investors. Sector-agnostic - "backing exceptional founders across all sectors." Provides curated early-stage opportunities with screened pipeline, portfolio tracking, expert collaboration, and exclusive events. Typical rounds £100K-£500K, individual investments from £10K. EIS/SEIS eligible deals common. No specific gaming or AI focus but broad tech coverage. Platform model - connects founders with individual angel investors rather than investing from fund.',
      investorStage: 'pre-seed, seed',
      typicalCheckSize: 'GBP 100K-500K rounds (individual angels from £10K)',
      portfolioGaming: [],
      thesisFitScore: 2, // Generalist, no gaming/AI focus
      stageFitScore: 5, // Pre-seed/seed focused - perfect
      checkSizeFitScore: 5, // £100-500K perfect for our round size
      gamingExpertiseScore: 1, // No gaming portfolio visible
      activityScore: 4, // Active network since 2007, 21K+ investors
      geographyFitScore: 3, // UK-based, Europe-friendly
      totalFitScore: 35, // (2×3)+(5×2)+(5×2)+(1×2)+(4×1)+(3×1)=6+10+10+2+4+3=35
      investorTier: 'tier-2'
    }
  },
  {
    id: 'b7BbXSKI0q4cVtpoLvN5', // Behold Ventures
    data: {
      name: 'Behold Ventures',
      website: 'https://behold.vc',
      country: 'Sweden',
      investorThesis: 'Gaming-dedicated VC fund. "Laser-focused on enabling the next generation of game entrepreneurs." Founded by industry veterans: Karl Magnus Troedsson (ex-DICE/EA, Raw Fury), Sigurlína Ingvarsdóttir (ex-CCP, EA/DICE), Magnus Kenneby (Sequent). Fund size SEK 550M (~EUR 50M), closed July 2025 oversubscribed. EIF backing. "Video games truly are the medium of our century." Strong values alignment focus - emphasize reversed due diligence. Invest in ambitious, creative founders with strategic thinking aptitude. Nordic focus but Europe-wide. Team includes Brynjólfur Erlingsson (analytics lead, Minecraft/Battlefield/EVE/Crusader Kings background) and Ali Farha (Star Stable). EXCELLENT FIT for LoreWeaver - gaming-endemic fund with tools/platform understanding.',
      investorStage: 'pre-seed, seed',
      typicalCheckSize: 'EUR 500K-2M estimated (SEK 550M fund)',
      portfolioGaming: ['early-stage game studios (fund just closed)'],
      thesisFitScore: 5, // Gaming-dedicated fund - perfect thesis match
      stageFitScore: 5, // Early-stage focused - perfect
      checkSizeFitScore: 3, // EUR 500K-2M likely, bit large for our EUR 150K raise
      gamingExpertiseScore: 5, // Gaming-ONLY fund, team from DICE/EA/CCP
      activityScore: 5, // Just closed fund July 2025, actively deploying
      geographyFitScore: 4, // EU-based (Sweden), invests Europe-wide
      totalFitScore: 50, // (5×3)+(5×2)+(3×2)+(5×2)+(5×1)+(4×1)=15+10+6+10+5+4=50
      investorTier: 'tier-1'
    }
  },
  {
    id: 'bNATX9BjKsAh4lVHB3BI', // Heartcore Capital
    data: {
      name: 'Heartcore Capital',
      website: 'https://heartcore.com',
      country: 'Denmark',
      investorThesis: 'Premier European VC, founded 2007 in Copenhagen. Multi-fund structure: 5 early-stage funds, 2 growth-opportunity funds, 1 web3 fund - ~EUR 770M total AUM. "Investing in Happiness" - focus on technology companies. Three themes: (1) Empowering People - tech enabling individuals, (2) Reimagining Work - productivity/collaboration, (3) Protecting the Planet - sustainable tech. 100+ portfolio companies, 65 active. Created 5 unicorns, 10 soonicorns, €10B+ enterprise value. Check size $50K-$5M, sweet spot $5M. Seed through Series B. Strong founder reputation, top decile/quartile returns. NO GAMING FOCUS - consumer/enterprise tech generalist. "Entrepreneur is our customer" approach. Not a fit for LoreWeaver - no gaming expertise, check size too large.',
      investorStage: 'seed, series-a, series-b',
      typicalCheckSize: 'USD 50K-5M, sweet spot $5M (EUR 4.5M)',
      portfolioGaming: [],
      thesisFitScore: 2, // Consumer tech generalist, no gaming/game-tools focus
      stageFitScore: 4, // Seed included but sweet spot is larger rounds
      checkSizeFitScore: 2, // Sweet spot $5M way too large for our raise
      gamingExpertiseScore: 0, // No gaming investments visible
      activityScore: 5, // Very active, 100+ investments, ongoing deployment
      geographyFitScore: 4, // EU-based (Denmark), invests pan-European
      totalFitScore: 27, // (2×3)+(4×2)+(2×2)+(0×2)+(5×1)+(4×1)=6+8+4+0+5+4=27
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
