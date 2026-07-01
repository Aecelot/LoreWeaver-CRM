import admin from 'firebase-admin';
import { readFileSync } from 'fs';

const sa = JSON.parse(readFileSync('../service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const updates = [
  {
    id: 'Dzi7llwfIK6r9ZBKwe5u', // Pitchworks VC Studio Group
    data: {
      name: 'Pitchworks VC Studio Group',
      investorThesis: 'Venture Studio Group focused on Health-tech, Gaming, and Sports. Builds and co-builds ventures. Focus areas: Better Health (extending lifespan), Better Wealth (productivity/financial freedom), Better Earth (sustainability). Has in-house AI-powered GCC. Primary thesis is healthcare/wellness outcomes - gaming is mentioned but secondary.',
      investorStage: 'seed',
      typicalCheckSize: 'Unknown (Venture Studio)',
      portfolioGaming: ['Honebi'], // Only portfolio company mentioned
      // Scoring
      thesisFitScore: 2, // Gaming mentioned but clearly secondary to health-tech
      stageFitScore: 3, // Venture studio, early stage but not explicit
      checkSizeFitScore: 0, // No check size disclosed
      gamingExpertiseScore: 1, // Mention gaming, no real gaming portfolio evidence
      activityScore: 2, // Active but unclear recent timing
      geographyFitScore: 4, // France/EU, invests cross-border
      totalFitScore: 19, // (2×3)+(3×2)+(0×2)+(1×2)+(2×1)+(4×1)=6+6+0+2+2+4=20
      investorTier: 'tier-4'
    }
  },
  {
    id: 'EKsMH72yqRq7jymSLkUM', // Initial Capital
    data: {
      name: 'Initial Capital',
      investorThesis: 'Seed and early-stage technology investor with strong focus on Bitcoin ecosystem. "We love games, consumer products and technology enablers." Not a traditional VC - group of serial entrepreneurs investing own money. London/Austin based. Legendary gaming track record with early investments in Supercell, SpaceApe, Hutch (all exited). Active in gaming tools (Sanlo, Core Loop AI) and game studios.',
      investorStage: 'seed',
      typicalCheckSize: '$50-200K (estimated - angel/personal)',
      portfolioGaming: [
        'Supercell (exited)', 'SpaceApe (exited)', 'Hutch (exited)', 'GAMEE (exited)',
        'Gumbug (exited to Voodoo)', 'Peak (exited)', 'Magmatic (exited)', 'Polystream (exited)',
        'Sanlo', 'Core Loop AI', 'THNDR Games', 'Medal.tv', 'Netspeak Games',
        'Super Evil Megacorp', 'Resolution Games', 'Traplight', 'DazzleRocks',
        'TinyBytes', 'Viker', 'Farm Frens', 'Amihan', 'Riffraff.ai', 'Order of Meta', 'Pok Pok'
      ],
      lastInvestmentDate: '2025 (Antidote, Bringin)',
      // Scoring
      thesisFitScore: 4, // Games + tech enablers, but also heavy Bitcoin focus
      stageFitScore: 5, // Explicitly seed/early-stage
      checkSizeFitScore: 3, // Angel/personal money, probably moderate checks
      gamingExpertiseScore: 5, // Massive gaming portfolio including Supercell
      activityScore: 5, // Very active, recent investments mentioned
      geographyFitScore: 3, // UK-based, invests globally
      totalFitScore: 46, // (4×3)+(5×2)+(3×2)+(5×2)+(5×1)+(3×1)=12+10+6+10+5+3=46
      investorTier: 'tier-1'
    }
  },
  {
    id: 'FVTWObSqBV48qq4YkBX1', // Velo Partners
    data: {
      name: 'Velo Partners',
      investorThesis: 'Early stage VC investing in global gaming and gambling industry across mobile, online, land-based, real-money, social, B2B and B2C assets. Broad gaming/gambling focus spanning game studios and iGaming tech. Portfolio includes Splitgate (1047 Games), Candivore, Bunch, plus significant gambling/betting companies.',
      investorStage: 'seed',
      typicalCheckSize: 'Unknown',
      portfolioGaming: [
        '44pixels.ai', 'Splitgate (1047 Games)', 'Candivore', 'Bunch',
        'Arcadia Gaming', 'AxiumAI', 'Booment'
      ],
      // Note: Many portfolio companies are gambling-focused (Adda52, Baazi, Betgames, etc.)
      // Scoring
      thesisFitScore: 3, // Gaming + gambling, not game tools/AI specifically
      stageFitScore: 4, // Early stage VC
      checkSizeFitScore: 0, // No check size disclosed
      gamingExpertiseScore: 4, // Strong gaming portfolio (Splitgate, Bunch, Candivore) + gambling
      activityScore: 3, // Active portfolio, unclear recent timing
      geographyFitScore: 3, // UK-based
      totalFitScore: 31, // (3×3)+(4×2)+(0×2)+(4×2)+(3×1)+(3×1)=9+8+0+8+3+3=31
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
    console.log(`✓ Updated: ${update.data.name}`);
  }
  
  console.log(`\n=== Updated ${updates.length} investors with thesis + scores ===`);
  process.exit(0);
}

main();
