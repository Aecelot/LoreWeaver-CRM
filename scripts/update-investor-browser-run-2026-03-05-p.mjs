import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';

const sa = JSON.parse(readFileSync('../service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const updates = [
  {
    id: 'pS42EGms5Q7AceXYttlb', // Early Game Ventures
    data: {
      name: 'Early Game Ventures',
      website: 'https://earlygame.vc',
      country: 'Romania',
      investorThesis: 'Romania/CEE-focused VC. Thesis: "Lead where others don\'t dare" - tech & IP-driven companies at pre-seed/seed/Series A, often at idea stage. Fund II: €60M (launched May 2024). Sector-agnostic tech: AI, DevTools, Cybersecurity, Fintech, Healthtech, Edtech. Notable portfolio: Druid (€100M+ raised), Bible Chat (Europe\'s fastest growing app), MeetGeek (AI meeting notes), Bunnyshell, Coda Intelligence. PlaySafeID is only gaming-adjacent investment. Despite name, NOT gaming-focused. Strong operational support, conviction-based investing. 60-70% Romania, rest Europe. Good for B2B AI/tools, but no narrative gaming expertise.',
      investorStage: 'pre-seed, seed, series-a',
      typicalCheckSize: '€500K-€2M initial, up to €6M over time',
      portfolioGaming: ['PlaySafeID (gaming identity/security)'],
      thesisFitScore: 3, // Generalist tech, no gaming/narrative AI focus
      stageFitScore: 5, // Pre-seed/seed focused - perfect
      checkSizeFitScore: 3, // €500K+ larger than our €150K round but could work for €400K
      gamingExpertiseScore: 2, // Only PlaySafeID is gaming-adjacent
      activityScore: 5, // Very active, new €60M fund
      geographyFitScore: 4, // EU-based, invests cross-border
      totalFitScore: 38, // (3×3)+(5×2)+(3×2)+(2×2)+(5×1)+(4×1) = 9+10+6+4+5+4 = 38
      investorTier: 'tier-2'
    }
  },
  {
    id: 'pfLZaXB3wcpQyGrwelt3', // Creandum
    data: {
      name: 'Creandum',
      website: 'https://creandum.com/',
      country: 'Sweden',
      investorThesis: 'Top-tier European early-stage VC (founded 2003). Thesis: "Back companies of tomorrow before it\'s obvious." Focus: Consumer, software, hardware tech. Seed to IPO support. Elite portfolio: Spotify, Klarna, iZettle, Depop, Trade Republic, KRY, Bolt, Epidemic Sound, Small Giant Games (mobile gaming - sold to Zynga for ~$700M). Pan-European with Nordic roots. High-conviction, long-term support through multiple rounds. CHALLENGE: Check sizes typically €1M+ at seed - too large for our current €150K round. Better fit for €400K equity round or later. Gaming expertise via Small Giant Games exit is relevant.',
      investorStage: 'seed, series-a, series-b',
      typicalCheckSize: '€1-5M (too large for current round)',
      portfolioGaming: ['Small Giant Games (mobile gaming - $700M exit to Zynga)'],
      thesisFitScore: 3, // Generalist tech but with gaming exit
      stageFitScore: 4, // Seed stage included
      checkSizeFitScore: 1, // Typically €1M+ - too large for €150K round
      gamingExpertiseScore: 4, // Small Giant Games exit shows gaming understanding
      activityScore: 5, // Very active, top-tier EU VC
      geographyFitScore: 4, // Sweden, pan-European
      totalFitScore: 36, // (3×3)+(4×2)+(1×2)+(4×2)+(5×1)+(4×1) = 9+8+2+8+5+4 = 36
      investorTier: 'tier-2'
    }
  },
  {
    id: 'pnBagwukJSS89z3SpKM3', // VTI Capital
    data: {
      name: 'VTI Capital',
      website: 'https://vticapital.com',
      country: 'Bulgaria',
      investorThesis: 'Sofia-based early-stage VC. Thesis: Help entrepreneurs find/execute right business model, then scale. Hands-on support: GTM strategy, business models, financing, M&A, team building. Sector-agnostic but tech-focused. NOTABLE GAMING PORTFOLIO: PlayCo (instant play gaming company), Coherent Labs (game UI middleware - EXITED), Chobolabs (mobile gaming - exited), FITE/Flips (combat sports streaming - exited). Also: Gtmhub ($120M Series C), Payhawk ($112M), OfficeRnD. Strong Bulgarian tech ecosystem connections. Check size undisclosed but likely €200K-500K range. Game tech/middleware experience via Coherent Labs could be valuable for understanding LoreWeaver.',
      investorStage: 'early-stage (pre-seed to series-a)',
      typicalCheckSize: 'Undisclosed, likely €200K-500K',
      portfolioGaming: ['PlayCo (instant play gaming)', 'Coherent Labs (game UI tech - exited)', 'Chobolabs (mobile gaming - exited)', 'FITE/Flips (combat sports streaming - exited)'],
      thesisFitScore: 3, // Generalist early-stage, sector-agnostic
      stageFitScore: 5, // Early stage focused - good fit
      checkSizeFitScore: 3, // Unknown but likely fits €400K round
      gamingExpertiseScore: 4, // Multiple gaming investments including game middleware (Coherent Labs!)
      activityScore: 3, // Active but smaller fund
      geographyFitScore: 2, // Bulgaria - peripheral EU market
      totalFitScore: 38, // (3×3)+(5×2)+(3×2)+(4×2)+(3×1)+(2×1) = 9+10+6+8+3+2 = 38
      investorTier: 'tier-2'
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
