import admin from 'firebase-admin';
import { readFileSync } from 'fs';

const sa = JSON.parse(readFileSync('../service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const updates = [
  {
    id: 'QIWGtl7whEshEcnnis0J', // CVX Ventures
    data: {
      name: 'CVX Ventures',
      investorThesis: 'Danish community-based VC founded 2020. Pools capital from experienced business professionals to invest in Nordic startups. DKK 800M (~EUR 107M) available across partner network. Generalist - sectors include energy, ESG, finance, proptech, consumer goods, gaming. Focus on board recruitment and advisory alongside capital. Helped 200+ companies through investments and board positions. Analyzes 1,100+ companies/year.',
      investorStage: 'seed',
      typicalCheckSize: 'Unknown (syndicate model)',
      portfolioGaming: [],
      // Scoring
      thesisFitScore: 2, // Generalist, gaming is one of many sectors
      stageFitScore: 5, // Pre-seed/seed focused
      checkSizeFitScore: 3, // Unknown exact, syndicate model
      gamingExpertiseScore: 1, // Gaming listed but no evidence of gaming expertise
      activityScore: 3, // Active since 2020, but unclear investment volume
      geographyFitScore: 4, // Denmark, EU-based
      totalFitScore: 31, // (2×3)+(5×2)+(3×2)+(1×2)+(3×1)+(4×1)=31
      investorTier: 'tier-2'
    }
  },
  {
    id: 'QlYMy8qs5MgrWm9mUDgc', // London Venture Partners (LVP)
    data: {
      name: 'London Venture Partners (LVP)',
      investorThesis: 'Gaming-dedicated VC investing EXCLUSIVELY in games ecosystem since 2001. Global investments in interactive entertainment, studios, content, technology, platforms, and services. Team of industry veterans and operators. Legendary portfolio: Supercell, Unity, Playfish, NaturalMotion, Futureplay. Recent: Jam & Tea Studios (AI games), Third Time Entertainment ($3.5M seed, blockchain games). $30B+ portfolio value created, 500M players reached, 56 gaming investments, 18 exits.',
      investorStage: 'all-stages',
      typicalCheckSize: '$500K-5M (estimated)',
      portfolioGaming: ['Supercell', 'Unity', 'Playfish', 'NaturalMotion', 'Futureplay', 'Bossa Studios', 'Bayes Holding', 'AppOnboard', 'Polystream', 'Klang', 'Jam & Tea Studios', 'Third Time Entertainment', 'Singularity 6', 'Vela Games', 'Double Loop Games', 'Sanlo', 'Bunch', 'NAG Studios'],
      // Scoring
      thesisFitScore: 5, // Gaming-dedicated, explicitly invests in game tech
      stageFitScore: 5, // All stages: angel, pre-seed, seed, growth
      checkSizeFitScore: 4, // $500K-5M typical
      gamingExpertiseScore: 5, // 56+ gaming investments, industry legends
      activityScore: 5, // Very active, recent investments in 2025/2026
      geographyFitScore: 3, // UK-based, invests globally
      totalFitScore: 51, // (5×3)+(5×2)+(4×2)+(5×2)+(5×1)+(3×1)=51
      investorTier: 'tier-1'
    }
  },
  {
    id: 'Re58vtGcPRVpmFJ82WMd', // Market One Capital
    data: {
      name: 'Market One Capital',
      investorThesis: 'European platform-focused VC. "We back platforms of tomorrow that democratize market access and enhance efficiency through the power of network effects." Pre-seed/seed focus across Europe. €140M AUM, 80+ companies backed including 3 unicorns. 10+ years investing. Office in Poland and Luxembourg. Sectors include gaming but thesis is platform/marketplace-centric, not gaming-specific.',
      investorStage: 'pre-seed, seed',
      typicalCheckSize: 'Up to €3M initial + follow-on reserves',
      portfolioGaming: [],
      // Scoring
      thesisFitScore: 2, // Platform/marketplace focus, not gaming-specific
      stageFitScore: 5, // Pre-seed and seed focused
      checkSizeFitScore: 4, // Up to €3M, good match
      gamingExpertiseScore: 1, // Gaming tagged but platform thesis, no gaming portfolio
      activityScore: 4, // 80+ companies, 3 unicorns, active fund
      geographyFitScore: 4, // Luxembourg/Poland, EU-based
      totalFitScore: 34, // (2×3)+(5×2)+(4×2)+(1×2)+(4×1)+(4×1)=34
      investorTier: 'tier-2'
    }
  }
];

// Skipped: Koobli Venture Capital (LinkedIn only, no website)

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
