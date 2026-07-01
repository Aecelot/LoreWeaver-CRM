import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';

const sa = JSON.parse(readFileSync('../service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const updates = [
  {
    id: 'qDkYjJzJE3onRe5mxfWy', // ThrillCapital
    data: {
      name: 'ThrillCapital',
      website: 'https://thrillcapital.com',
      country: 'United Kingdom',
      investorThesis: 'UK-based investment platform for sports and entertainment. Mission: "Provide a pathway to success for all great sporting talent, technologies and projects wherever, whoever, or whatever their circumstance." Focus areas: motorsport, extreme sports, esports, sports technologies. CHALLENGE: Primary focus is traditional sports (athletes, teams, events), not video game development or game tools. Esports is only gaming-adjacent vertical. No AI, narrative, or B2B SaaS angle visible. Website blocked our research (Wordfence security). Limited public info available.',
      investorStage: 'Unknown',
      typicalCheckSize: 'Unknown',
      portfolioGaming: [],
      thesisFitScore: 2, // Esports only gaming connection, sports focus not game dev
      stageFitScore: 0, // Unknown
      checkSizeFitScore: 0, // Unknown
      gamingExpertiseScore: 2, // Esports tangentially related, no game dev expertise
      activityScore: 1, // Unknown activity, blocked website
      geographyFitScore: 3, // UK-based, Europe-friendly
      totalFitScore: 14, // (2×3)+(0×2)+(0×2)+(2×2)+(1×1)+(3×1) = 6+0+0+4+1+3 = 14
      investorTier: 'tier-4'
    }
  },
  {
    id: 'qURKDGSW4hjrHvx0H9Bj', // SNÖ Ventures
    data: {
      name: 'SNÖ Ventures',
      website: 'https://sno.vc',
      country: 'Norway',
      investorThesis: 'Nordic-focused VC providing global access and local support for the region\'s most daring tech pioneers. GAMING PORTFOLIO: PortalOne (hybrid games + live shows - backed by Tiger Global, Founders Fund, Coatue, Temasek), Sky Mavis/Axie Infinity (blockchain games - backed by a16z, Paradigm, Accel). Also: AI/tech companies (IntuiCell, Nolla Health, Take Take Take chess). Team: Magne Uppman (Founding Partner), Teodor Bjerrang (Founding Partner), Max Samuel (Partner). Email: post@sno.vc. ANALYSIS: Gaming investments are present but focus is broader tech. Check size unknown but co-investor profile (Tiger Global, a16z) suggests larger rounds. Could be good connector to Nordic gaming ecosystem. PortalOne investment shows understanding of games×entertainment convergence.',
      investorStage: 'Early-stage (pre-seed to series-a based on portfolio)',
      typicalCheckSize: 'Unknown (co-invests with large funds)',
      portfolioGaming: ['PortalOne (hybrid games + live shows)', 'Sky Mavis/Axie Infinity (blockchain gaming)'],
      thesisFitScore: 4, // Invests in gaming broadly
      stageFitScore: 4, // Early stage based on portfolio
      checkSizeFitScore: 2, // Unknown but co-investors are large funds
      gamingExpertiseScore: 4, // PortalOne + Axie show gaming understanding
      activityScore: 4, // Active portfolio, quality co-investors
      geographyFitScore: 4, // Nordic/EU, invests cross-border
      totalFitScore: 38, // (4×3)+(4×2)+(2×2)+(4×2)+(4×1)+(4×1) = 12+8+4+8+4+4 = 40
      investorTier: 'tier-2'
    }
  },
  {
    id: 'r0ZBDrHltqAmCaVBoGYr', // Ikigai Ventures
    data: {
      name: 'Ikigai Ventures',
      website: 'https://ikigaiventures.io',
      country: 'Luxembourg',
      investorThesis: 'Seed-stage fund backed by SiGMA Group (iGaming conferences). Focus: Gaming and Frontier Tech. CRITICAL DISTINCTION: "Gaming" here means iGaming (gambling/casino), NOT video game development. Portfolio: Glitnor, Stars Games, WikiBet, Quantum Gaming, iLotto - all gambling/casino platforms. Tech hubs in Belgrade & Noida (100+ devs). Team: Eman Pulis (GP - founder of SiGMA/AIBC conferences), Vinícius de Carvalho (Investment Partner). Contact: hello@ikigaiventures.io. CHALLENGE: Despite "gaming" label, their expertise is gambling industry, not narrative games/AI tools. iGaming and video game development are entirely different industries with different customers, regulations, and technologies. NOT A GOOD FIT for LoreWeaver despite surface-level "gaming" tag.',
      investorStage: 'seed',
      typicalCheckSize: 'Unknown (seed-stage implies reasonable range)',
      portfolioGaming: ['None relevant - all iGaming/gambling'],
      thesisFitScore: 2, // iGaming ≠ game development
      stageFitScore: 5, // Seed stage explicitly stated
      checkSizeFitScore: 3, // Unknown but seed implies reasonable
      gamingExpertiseScore: 1, // iGaming expertise, not video game dev
      activityScore: 4, // Active fund (launched 2022)
      geographyFitScore: 4, // EU-based (Luxembourg)
      totalFitScore: 28, // (2×3)+(5×2)+(3×2)+(1×2)+(4×1)+(4×1) = 6+10+6+2+4+4 = 32
      investorTier: 'tier-3'
    }
  }
];

async function main() {
  // Update investors
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
  
  console.log(`\n=== Processed ${updates.length} investors ===`);
  process.exit(0);
}

main();
