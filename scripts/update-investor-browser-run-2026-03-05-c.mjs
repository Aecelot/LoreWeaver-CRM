import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';

const sa = JSON.parse(readFileSync('../service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const updates = [
  {
    id: 'GppvgF7whqZ1eimFNMlU', // Mercuri.vc
    data: {
      name: 'Mercuri.VC',
      investorThesis: 'UK early-stage VC at intersection of media, entertainment & technology. Backs companies building transformative tools and business models that reshape how data and content is created, consumed, monetised. Focus on frontier tech (generative AI, immersive experiences). Fund 1: £42m (Scott Trust), Fund 2: £50m (May 2023, British Business Bank anchor). Takes board seats.',
      investorStage: 'pre-seed, seed',
      typicalCheckSize: '£500K-£1M',
      portfolioGaming: ['Unakin (AI for games)', 'Oorbit (cloud gaming)', 'Radical Motion (motion for games)', 'HuggingFace'],
      lastInvestmentDate: '2025 (active Fund 2)',
      // Scoring
      thesisFitScore: 4, // Gaming/entertainment + AI, has gaming portfolio
      stageFitScore: 5, // Explicitly pre-seed/seed
      checkSizeFitScore: 3, // £500K-1M (~EUR 600K-1.2M) - larger than ideal
      gamingExpertiseScore: 4, // 3 gaming investments (Unakin, Oorbit, Radical Motion)
      activityScore: 5, // Fund 2 launched 2023, 6-8 investments/year
      geographyFitScore: 3, // UK-based, UK-focused
      totalFitScore: 44, // (4×3)+(5×2)+(3×2)+(4×2)+(5×1)+(3×1)=44
      investorTier: 'tier-1'
    }
  },
  {
    id: 'HTOz1CO0NSzKE9OgR30n', // Nuard Ventures
    data: {
      name: 'Nuard Ventures',
      investorThesis: 'Finnish early-stage VC focusing on gaming, AI, and tech. "Empowering Innovation, Beyond Investment" - provides guidance, knowledge, talent, and network. 3 partners with 75+ years combined experience. Strong gaming portfolio with notable exit (Jido acquired by Roblox). Global reach with sustainability focus.',
      investorStage: 'early-stage',
      typicalCheckSize: 'Estimated seed range',
      portfolioGaming: ['Appcharge (game monetization)', 'Audiomob (in-game audio ads)', 'Black Block (web3 gaming)', 'Flowstate Games', 'Frozen Monkey Games (F2P web3)', 'Funcraft (mobile games)', 'Jido (acquired by Roblox)'],
      lastInvestmentDate: '2024 (33 total investments)',
      // Scoring
      thesisFitScore: 5, // Explicitly gaming + AI focus
      stageFitScore: 5, // Early-stage focused
      checkSizeFitScore: 3, // Unknown, estimated seed range
      gamingExpertiseScore: 5, // Gaming-dedicated, 7+ gaming investments, Roblox exit
      activityScore: 4, // 33 investments, active
      geographyFitScore: 4, // Finland, EU-based
      totalFitScore: 49, // (5×3)+(5×2)+(3×2)+(5×2)+(4×1)+(4×1)=49
      investorTier: 'tier-1'
    }
  },
  {
    id: 'K2i9R0HrpVANBTGB4NAQ', // Moonfire
    data: {
      name: 'Moonfire',
      investorThesis: '"The home for the next generation of founders." London-based VC with 5 investment themes: Capital & Finance, Gaming/Community/Leisure, Health & Wellbeing, Work & Knowledge, Security/Infrastructure/Tooling. "Golden Triangle" framework: Access, Efficiency, Quality, Data. Focus on scalable, capital-efficient software. Avoids hardware and traditional marketplaces.',
      investorStage: 'seed',
      typicalCheckSize: 'Seed range (not disclosed)',
      portfolioGaming: ['Scriptic (interactive storytelling)'],
      lastInvestmentDate: '2025 (active)',
      // Scoring
      thesisFitScore: 4, // Gaming is 1 of 5 themes, not primary
      stageFitScore: 5, // Seed focused
      checkSizeFitScore: 3, // Unknown, estimated seed range
      gamingExpertiseScore: 3, // 1 gaming investment, gaming is a theme but not primary
      activityScore: 4, // Active, thought leadership content
      geographyFitScore: 3, // UK-based, Europe-friendly
      totalFitScore: 41, // (4×3)+(5×2)+(3×2)+(3×2)+(4×1)+(3×1)=41
      investorTier: 'tier-1'
    }
  }
];

// Ixia Capital (id: HAjgH0myfUitZKQBTJEI) skipped - SSL certificate invalid, website unreachable

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
