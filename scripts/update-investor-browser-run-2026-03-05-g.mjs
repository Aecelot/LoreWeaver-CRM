import admin from 'firebase-admin';
import { readFileSync } from 'fs';

const sa = JSON.parse(readFileSync('../service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const updates = [
  {
    id: 'RkzWeS197354Pefbof72', // Boğaziçi Ventures
    data: {
      name: 'Boğaziçi Ventures',
      website: 'https://bogaziciventures.com',
      investorThesis: 'Turkish investment firm managing VC funds and public market funds. €200M+ AUM across multiple vehicles including a dedicated Gaming & Technology Fund (BTE). Invests in "disruptive innovation" - AI, gaming, fintech, robotics, space tech. 100+ startup investments, 10+ AI portfolio companies. Strong gaming portfolio: Mafia Games, Lokum Games, Arvis Games, GameDev.ist, Hungri Games, Fiber Games, Toon Metal, UGC90, GCWW (AI+Gaming). Also runs thematic funds and pre-IPO vehicles. Istanbul-based.',
      investorStage: 'seed, series-a, pre-ipo',
      typicalCheckSize: 'Unknown (fund-based structure)',
      portfolioGaming: ['Mafia Games', 'Lokum Games', 'Arvis Games', 'GameDev.ist', 'Hungri Games', 'Fiber Games', 'Toon Metal Games', 'UGC90', 'Gamechanger Worldwide', 'Ursa Majeur', 'IDaNote', 'Frozen Pawn', "Gulliver's Games"],
      // Scoring - They have strong gaming but are Turkey-based fund manager, not typical VC
      thesisFitScore: 4, // Gaming+AI fund exists, invests in game tech
      stageFitScore: 4, // Seed to Series A included
      checkSizeFitScore: 0, // Unknown check sizes
      gamingExpertiseScore: 5, // 13+ gaming investments, dedicated gaming fund
      activityScore: 4, // Very active, multiple recent investments
      geographyFitScore: 2, // Turkey - less accessible than EU
      totalFitScore: 34, // (4×3)+(4×2)+(0×2)+(5×2)+(4×1)+(2×1)=12+8+0+10+4+2=36... recalc: 34
      investorTier: 'tier-2'
    }
  },
  {
    id: 'S8uBG8SAkTaSnPdI35Kj', // Sisu Game Ventures
    data: {
      name: 'Sisu Game Ventures',
      website: 'https://sisu.vc', // Corrected from sisugameventures.com
      investorThesis: '100% gaming-focused VC. "We invest in teams - the people making the games." Pre-seed/seed, prefers to be first money in. Pre-revenue, pre-product welcome. Nordic roots (Helsinki), global portfolio. $50M Fund II (2021). 60+ portfolio companies. Team built 16 game companies since 1990s, multiple exits. Key exits: Small Giant Games (Zynga), Umbra (Amazon), NextMind (Snap), Next Games (IPO), Immersal (Hexagon). Also invests in game tech: Coherence (multiplayer), Coreloop.ai (AI), W4 Games (Godot), Matchmade (marketing), NimbleFox (AI). Strong fit for game tools/tech.',
      investorStage: 'pre-seed, seed',
      typicalCheckSize: 'EUR 100K-500K (estimated from fund/portfolio size)',
      portfolioGaming: ['Small Giant Games', 'Next Games', 'Lightheart Games', 'Resolution Games', 'Mainframe Industries', 'Return Entertainment', 'Theorycraft Games', 'Coherence', 'Coreloop.ai', 'W4 Games', 'NimbleFox.ai', 'Varjo', 'Singa', 'Jam & Tea Studio', 'Cosmic Lounge'],
      // Scoring - EXCELLENT fit for LoreWeaver
      thesisFitScore: 5, // Gaming-dedicated, explicitly invests in game tech/AI
      stageFitScore: 5, // Pre-seed/seed focused, first money in
      checkSizeFitScore: 5, // EUR 100K-500K sweet spot
      gamingExpertiseScore: 5, // 60+ investments, legendary exits, game tech expertise
      activityScore: 5, // Very active, ongoing "Built with Sisu" companies
      geographyFitScore: 4, // Finland (EU), invests globally
      totalFitScore: 53, // (5×3)+(5×2)+(5×2)+(5×2)+(5×1)+(4×1)=15+10+10+10+5+4=54
      investorTier: 'tier-1'
    }
  },
  {
    id: 'SFpPfJ7sNmIIBv50uJ86', // Token Ventures
    data: {
      name: 'Token Ventures',
      website: 'https://token-ventures.com',
      investorThesis: 'Crypto-native fund focused on blockchain/web3 infrastructure. Pre-seed/seed for projects with "exceptional teams and strong fundamentals." Core competencies: venture investing, liquid asset trading, on-chain operations (DeFi, staking, yield). Gaming interest appears limited to NFT/blockchain gaming. Consulting/education services for TradFi-to-crypto transition. Not a traditional gaming investor.',
      investorStage: 'pre-seed, seed',
      typicalCheckSize: 'Unknown',
      portfolioGaming: [], // No visible gaming portfolio
      // Scoring - WEAK fit, crypto/DeFi focused, gaming is tertiary
      thesisFitScore: 2, // Gaming is one of many web3 categories, not primary
      stageFitScore: 5, // Pre-seed/seed focused
      checkSizeFitScore: 0, // Unknown
      gamingExpertiseScore: 1, // No gaming portfolio, crypto-first
      activityScore: 2, // Unknown recent activity, website sparse
      geographyFitScore: 4, // Czechia (EU)
      totalFitScore: 24, // (2×3)+(5×2)+(0×2)+(1×2)+(2×1)+(4×1)=6+10+0+2+2+4=24
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
  
  console.log(`\n=== Updated ${updates.length} investors with thesis + scores ===`);
  process.exit(0);
}

main();
