import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';

const sa = JSON.parse(readFileSync('../service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const updates = [
  {
    id: 'Yw9IiV84Hnu1SirLu9IL', // Jeff Seibert
    data: {
      name: 'Jeff Seibert',
      website: 'https://jeffseibert.com/',
      country: 'US',
      investorThesis: 'Serial entrepreneur and prolific angel investor. CEO/founder of Digits (AI-native accounting platform). Ex-Twitter Head of Consumer Product, ex-Crashlytics co-founder (acquired by Twitter 2013, now Google - runs on 6B monthly active smartphones). Featured in Netflix documentary The Social Dilemma. 58+ investments on record. Ranked in Seed 100 best early-stage investors. Focus areas: Data Services, AI, Consumer Internet, FinTech at pre-seed through Series A. Sweet spot $100K (~€90K). Stanford CS, Mayfield Fellow. Mobile/dev-tools background from Crashlytics could be relevant for game tech.',
      investorStage: 'pre-seed, seed, series-a',
      typicalCheckSize: 'USD 10K-500K, sweet spot $100K (~EUR 90K)',
      portfolioGaming: [],
      thesisFitScore: 3, // AI/data services focus, no gaming but dev tools background
      stageFitScore: 5, // Pre-seed/seed focused - perfect
      checkSizeFitScore: 5, // $100K sweet spot perfect for our round
      gamingExpertiseScore: 1, // No gaming investments but mobile analytics background
      activityScore: 5, // Very active, 58+ investments, Seed 100 ranked
      geographyFitScore: 2, // US-based (San Francisco Bay Area)
      totalFitScore: 38, // (3×3)+(5×2)+(5×2)+(1×2)+(5×1)+(2×1)=9+10+10+2+5+2=38
      investorTier: 'tier-2'
    }
  },
  {
    id: 'aAIPzHeLGggoeFWmThx4', // SDR. Capital
    data: {
      name: 'SDR. Capital',
      website: 'https://sdr.capital',
      country: 'United Kingdom',
      investorThesis: 'Solo investor focused on women and diverse founders. Has been investing globally in early-stage companies and small funds for "nearly a decade." Minimal website with no portfolio details, no stated thesis beyond diversity focus, no check sizes disclosed. Website mentions fintech, metaverse, gaming, energy, blockchain in tags but no substantiating evidence. Unable to assess fit due to insufficient public information.',
      investorStage: 'unknown (early-stage implied)',
      typicalCheckSize: 'Unknown',
      portfolioGaming: [],
      thesisFitScore: 2, // Generalist, gaming tag but no evidence
      stageFitScore: 0, // Unknown
      checkSizeFitScore: 0, // Unknown
      gamingExpertiseScore: 0, // No portfolio shown
      activityScore: 1, // "Nearly a decade" but no specifics
      geographyFitScore: 4, // UK-based
      totalFitScore: 11, // (2×3)+(0×2)+(0×2)+(0×2)+(1×1)+(4×1)=6+0+0+0+1+4=11
      investorTier: 'tier-4'
    }
  },
  {
    id: 'antx11XcxkVkKf899lGe', // Faraday Venture Partners
    data: {
      name: 'Faraday Venture Partners',
      website: 'https://faradayvp.com',
      country: 'Spain',
      investorThesis: 'Spanish/European early-stage VC founded 2011. Invests in "innovative early-stage companies" during commercial phases. Two models: (1) Faraday Club for deal-by-deal professional investors, (2) CNMV-regulated managed fund. €300K-1M initial investments, up to €4M follow-on. Track record: 64 startups invested, €49M deployed, 200+ club partners, 200+ fund investors, 7 exits. Presence in Spain, Germany, Belgium, France. Generalist thesis - no specific gaming or AI focus. Emphasizes supporting founders through quarterly/monthly follow-ups.',
      investorStage: 'pre-seed, seed',
      typicalCheckSize: 'EUR 300K-1M initial, up to EUR 4M follow-on',
      portfolioGaming: [],
      thesisFitScore: 2, // Generalist "innovative" - no gaming/AI specifics
      stageFitScore: 5, // Early-stage focused
      checkSizeFitScore: 3, // EUR 300K-1M too large for our EUR 150K round
      gamingExpertiseScore: 0, // No gaming portfolio visible
      activityScore: 3, // 64 investments over 13 years, active but rate unknown
      geographyFitScore: 4, // EU-based (Spain + Germany, Belgium, France)
      totalFitScore: 29, // (2×3)+(5×2)+(3×2)+(0×2)+(3×1)+(4×1)=6+10+6+0+3+4=29
      investorTier: 'tier-3'
    }
  }
];

// Note: ACK Ventures (alnsxzZleXtttwwVLCzp) skipped - LinkedIn only, needs manual research

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
  
  // Remove processed investors from queue (include ACK Ventures since it needs manual follow-up)
  const queuePath = './investor-browser-queue.json';
  const queue = JSON.parse(readFileSync(queuePath, 'utf8'));
  const processedIds = [
    ...updates.map(u => u.id),
    'alnsxzZleXtttwwVLCzp' // ACK Ventures - LinkedIn only, removed from auto queue
  ];
  const newQueue = queue.filter(i => !processedIds.includes(i.id));
  writeFileSync(queuePath, JSON.stringify(newQueue, null, 2));
  console.log(`\n✓ Removed ${processedIds.length} investors from queue (${newQueue.length} remaining)`);
  
  console.log(`\n=== Updated ${updates.length} investors with thesis + scores ===`);
  console.log(`Note: ACK Ventures (Denmark) skipped - LinkedIn only, needs manual research`);
  process.exit(0);
}

main();
