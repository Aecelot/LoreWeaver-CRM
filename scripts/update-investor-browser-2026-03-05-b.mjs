import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';

const sa = JSON.parse(readFileSync('../service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

// Investors researched via browser on 2026-03-05 (batch b - 11:44 AM)
const updates = [
  {
    id: '6N3uh75h78NXBeNPWpOC', // Mark Dyne / Morpheus Ventures
    data: {
      name: 'Mark Dyne (Morpheus Ventures)',
      investorThesis: 'Generalist early-stage VC. "Partners to extraordinary founders who dare to disrupt." Focus areas: crisis management, IP strategy & protection, hostile situations navigation, hypergrowth support. Provides hands-on operational help for complex scenarios. No explicit gaming focus on their website.',
      investorStage: 'seed, series-a',
      typicalCheckSize: 'Unknown (typical VC range)',
      portfolioGaming: ['FanDuel'], // Fantasy sports/betting, not game tech
      location: 'US',
      // Scoring per rubric
      thesisFitScore: 2, // Generalist, software/tech focus but no gaming thesis
      stageFitScore: 4, // Early-stage
      checkSizeFitScore: 3, // Unknown
      gamingExpertiseScore: 1, // FanDuel is fantasy sports/betting, not game tech
      activityScore: 3, // Active fund
      geographyFitScore: 2, // US-based
      totalFitScore: 27, // (2×3)+(4×2)+(3×2)+(1×2)+(3×1)+(2×1) = 6+8+6+2+3+2 = 27
      investorTier: 'tier-3',
      researchNotes: 'Morpheus Ventures is a generalist VC focused on helping founders through complex/hostile situations. Portfolio includes Rigetti (quantum), SafetyCulture, Sidecar Health, FanDuel. FanDuel is the only gaming-adjacent investment (fantasy sports/betting). Mark Dyne appears to be connected via prior personal investments. Low priority for LoreWeaver unless warm intro. Website: morpheus.com'
    }
  },
  {
    id: '74IlmiaesZy9fHzhl5v3', // Scott Belsky
    data: {
      name: 'Scott Belsky',
      investorThesis: 'Angel investor since 2010. Focus: consumer, marketplace, and "transformation by interface" space (enterprise/B2B). Product design and consumer-behavior obsessive. Founder of Behance, exec at Adobe. Looks for mission-driven teams that value design, exceptional product experiences, and solve problems by connecting and empowering people.',
      investorStage: 'seed',
      typicalCheckSize: '$50-250K (estimated)',
      portfolioGaming: [], // Zero gaming in extensive portfolio
      location: 'US',
      contactEmail: 'scott@belsky.com',
      // Scoring per rubric
      thesisFitScore: 3, // B2B SaaS, creative tools - adjacent but no gaming
      stageFitScore: 5, // Pre-seed/seed angel
      checkSizeFitScore: 4, // Sweet spot for our round
      gamingExpertiseScore: 0, // No gaming investments in 80+ portfolio
      activityScore: 5, // Very active (80+ investments)
      geographyFitScore: 2, // US-based
      totalFitScore: 34, // (3×3)+(5×2)+(4×2)+(0×2)+(5×1)+(2×1) = 9+10+8+0+5+2 = 34
      investorTier: 'tier-2',
      researchNotes: 'Behance founder, former Adobe exec. Very prolific angel with 80+ investments: Pinterest, Uber, Airtable, Notion, Superhuman, Ramp, Periscope, Carta, etc. ZERO gaming investments despite extensive portfolio. Design & consumer behavior focused. Only relevant if we emphasize Architect as a "creative tool" for narrative designers. Low priority. Website: scottbelsky.com'
    }
  },
  {
    id: '7OCvV9lNzCXP4FqXyJNj', // Griffin Gaming Partners
    data: {
      name: 'Griffin Gaming Partners',
      investorThesis: '"The definitive source of capital for the games industry." $1.5B AUM. Gaming-dedicated fund investing at intersection of content, social platforms, and software infrastructure. Focus areas: Developers & Publishers, Software & Infrastructure, Web3 Gaming, Platforms.',
      investorStage: 'seed, series-a, growth',
      typicalCheckSize: '$5-50M+ (large fund)',
      portfolioGaming: ['Discord', 'Overwolf', 'Second Dinner (Marvel Snap)', 'Scopely', 'AppLovin', 'Spyke', 'WinZo', 'UNKJD'],
      location: 'US',
      contactEmail: 'contact@griffingp.com',
      contactAddress: '1501 Colorado Avenue, Suite B, Santa Monica, CA 90404',
      // Scoring per rubric
      thesisFitScore: 5, // Gaming-dedicated, software infrastructure explicitly mentioned
      stageFitScore: 4, // Broad range seed to growth
      checkSizeFitScore: 2, // $1.5B fund = checks too large for current round
      gamingExpertiseScore: 5, // Gaming-dedicated with 50+ gaming investments
      activityScore: 5, // Very active
      geographyFitScore: 2, // US-based but invests globally
      totalFitScore: 44, // (5×3)+(4×2)+(2×2)+(5×2)+(5×1)+(2×1) = 15+8+4+10+5+2 = 44
      investorTier: 'tier-1',
      researchNotes: 'TOP TIER gaming VC. $1.5B AUM. Gaming Software & Infrastructure is explicitly in their thesis - perfect fit for LoreWeaver positioning. Check sizes likely too large for current EUR 150K round (typical $5-50M), but excellent for relationship building and future EUR 400K+ rounds. Their portfolio (Discord, Overwolf, Second Dinner) shows they understand game tools/platforms. Contact: contact@griffingp.com. Website: griffingp.com'
    }
  }
];

async function main() {
  console.log('=== Updating researched investors (batch b) ===\n');
  
  for (const update of updates) {
    await db.collection('leads').doc(update.id).update({
      ...update.data,
      status: 'researched',
      'pipeline.stageId': 'researched',
      researchedAt: admin.firestore.FieldValue.serverTimestamp(),
      researchSource: 'browser-research-cron'
    });
    console.log(`✅ Updated: ${update.data.name} (${update.data.investorTier}, score: ${update.data.totalFitScore})`);
  }

  // Update the queue file - remove processed investors
  const queuePath = './investor-browser-queue.json';
  const queue = JSON.parse(readFileSync(queuePath, 'utf8'));
  const processedIds = updates.map(u => u.id);
  const newQueue = queue.filter(item => !processedIds.includes(item.id));
  writeFileSync(queuePath, JSON.stringify(newQueue, null, 2));
  console.log(`\n📋 Queue updated: ${queue.length} → ${newQueue.length} (removed ${processedIds.length})`);

  console.log('\n=== Summary ===');
  for (const u of updates) {
    console.log(`- ${u.data.name}: ${u.data.investorTier.toUpperCase()} (score ${u.data.totalFitScore}/55)`);
  }
  
  process.exit(0);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
