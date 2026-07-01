import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';

const sa = JSON.parse(readFileSync('../service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const updates = [
  {
    id: 'OB8KtIVdAyLxNEcgZGQf', // ForsVC
    data: {
      name: 'ForsVC',
      investorThesis: 'EXCELLENT FIT - Gaming-dedicated €18M fund. "Investing in the future of gaming." Invests in full gaming ecosystem: game studios, game technology, game publishers, services. €150K-€1.5M tickets (equity, convertibles, project funding). Geographic focus: Belgium, Netherlands, France, Germany. Strong Benelux presence.',
      investorStage: 'seed, early-stage',
      typicalCheckSize: '€150K-€1.5M',
      portfolioGaming: ['Twirlbound', 'Galaxy Grove', 'Glowfish Interactive', 'Cyborn', 'Gamevestor', 'StriveCloud', 'Mystic Forge', 'Hero Zone VR', 'Arcanix', 'Aberratic', 'Oisoi Studio', 'Oro Interactive', 'Studio Deloryan'],
      lastInvestmentDate: 'January 2026 (Gamevestor €1M+)',
      // Scoring
      thesisFitScore: 5, // Gaming-dedicated fund
      stageFitScore: 5, // €150K-€1.5M early-stage tickets
      checkSizeFitScore: 5, // Perfect for €150K-€400K rounds
      gamingExpertiseScore: 5, // 13+ gaming portfolio companies
      activityScore: 5, // Galaxy Grove Oct 2025, Gamevestor Jan 2026
      geographyFitScore: 5, // Belgium, explicitly invests in Netherlands
      totalFitScore: 55, // (5×3)+(5×2)+(5×2)+(5×2)+(5×1)+(5×1)=55
      investorTier: 'tier-1',
      keyContacts: ['Arne Ottoy (Managing Partner)', 'Eric Diepeveen (Venture Partner)', 'Michiel Houwen (Growth Manager)'],
      contactEmail: 'hello@fors.vc',
      notes: 'TOP PRIORITY: Perfect geographic/stage/sector fit. Has FORSight founder support program. Dutch game Twirlbound in portfolio (Breda-based). Apply via contact form or intro via Dutch gaming scene.'
    }
  },
  {
    id: 'OYtyxLGLHaETwJO1QDZX', // Epiphany Capital
    data: {
      name: 'Epiphany Capital',
      investorThesis: 'NOT AN INVESTOR - M&A advisory firm, not a VC/investor. Advises on fundraising, secondaries, and M&A (buy/sell side). Tim Dempsey is managing partner. Deals include SaaS, fintech, healthtech, digital health - one gaming deal (PlayJam Series A) from 2010s. Tag incorrectly lists as investor.',
      investorStage: 'advisory (not investor)',
      typicalCheckSize: 'N/A (advisory firm)',
      portfolioGaming: [],
      // Scoring - Not applicable but scoring for completeness
      thesisFitScore: 0, // Not an investor
      stageFitScore: 0, // Not an investor
      checkSizeFitScore: 0, // N/A
      gamingExpertiseScore: 1, // One ancient gaming deal
      activityScore: 3, // Active in advisory
      geographyFitScore: 3, // UK
      totalFitScore: 7, // (0×3)+(0×2)+(0×2)+(1×2)+(3×1)+(3×1)=8
      investorTier: 'tier-5',
      notes: 'REMOVE FROM INVESTOR LIST - Advisory firm, not investor. Could be useful for future M&A advice but not for funding.'
    }
  },
  {
    id: 'PkaWNF9xzoPlswE458xX', // The Games Angels
    data: {
      name: 'The Games Angels',
      investorThesis: 'EXCELLENT FIT - Gaming industry veterans angel syndicate. Invest in games AND game-related companies (tools, platforms). Members invest individually or as syndicate - fully opt-in model means engaged investors. Portfolio shows strong game-tools/platform interest: Ready Player Me, Zibra AI (VFX/3D AI tools), AudioMob (audio ads), Immutable (Web3 gaming), Condense Reality, NumberEight (on-device AI). Currently NOT accepting cold outreach via website.',
      investorStage: 'angel, pre-seed, seed',
      typicalCheckSize: '£10K-100K (syndicate)',
      portfolioGaming: ['Ready Player Me', 'Zibra AI', 'AudioMob', 'Immutable', 'Condense Reality', 'NumberEight', 'Flick Games', 'Included Games', 'Landmark Games', 'Payload Studios', 'Formation Games', 'Soliton Interactive', 'JECO', 'Half Moon Studios', '1TK', 'Meeple Corp', 'NextBeat (acq by Duolingo)'],
      lastInvestmentDate: '2025 (NextBeat acquired by Duolingo Jan 2025)',
      // Scoring
      thesisFitScore: 5, // Game tools + games explicit focus
      stageFitScore: 5, // Angel/early-stage syndicate
      checkSizeFitScore: 4, // Angels typically smaller, syndicate can reach £100K+
      gamingExpertiseScore: 5, // Deep industry veterans, extensive game-tech portfolio
      activityScore: 5, // Very active, multiple 2024-2025 investments
      geographyFitScore: 4, // UK-based, invests internationally
      totalFitScore: 52, // (5×3)+(5×2)+(4×2)+(5×2)+(5×1)+(4×1)=52
      investorTier: 'tier-1',
      keyContacts: ['Nick Button-Brown (from X handle)'],
      notes: 'TOP PRIORITY for Director launch. Zibra AI and JECO show interest in AI dev tools. NOT accepting cold outreach - need warm intro. Search for members on LinkedIn for network connections.'
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
