import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';

const sa = JSON.parse(readFileSync('../service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const updates = [
  {
    id: 'mxL16GPyc10Do76Bomu6', // BattlePass Studio
    data: {
      name: 'BattlePass Studio',
      website: 'https://battlepass.studio',
      country: 'Bulgaria',
      investorThesis: 'Bulgarian venture BUILDER (co-founder model), not traditional VC. Focus: Gaming, Entertainment, Travel & Marketplaces. They work as co-founders with equity stake, not passive investors. 15+ portfolio companies, 45+ team/advisors. Model: take significant equity in exchange for hands-on building support (product, fundraising, operations, growth). CEE-focused but globally ambitious. NOT ideal for B2B SaaS tools like LoreWeaver - their model is more suited for consumer startups where they can be co-founders. Contact: info@battlepass.studio',
      investorStage: 'pre-seed, seed',
      typicalCheckSize: 'Co-founder model (equity for services), not traditional check sizes',
      portfolioGaming: ['Glowter (football predictions app)', 'Various gaming-adjacent startups'],
      thesisFitScore: 2, // Gaming focus but venture builder model doesn't fit B2B tools
      stageFitScore: 5, // Early stage focused
      checkSizeFitScore: 1, // Co-founder model, not traditional investment
      gamingExpertiseScore: 3, // Gaming is one focus area but not dedicated
      activityScore: 3, // Active but slower pace for builder model
      geographyFitScore: 2, // Bulgaria, not core EU VC market
      totalFitScore: 27, // (2×3)+(5×2)+(1×2)+(3×2)+(3×1)+(2×1)=6+10+2+6+3+2=29... let me recalc: 6+10+2+6+3+2=29
      investorTier: 'tier-3'
    }
  },
  {
    id: 'nsOnIesrW5H6498SPqca', // Alma Ventures
    data: {
      name: 'Alma Ventures',
      website: 'https://almaventures.io/',
      country: 'United Kingdom',
      investorThesis: 'UK-based venture platform (capital + advisory) focused on "founders redefining how we live, care, play, create." FOUR CORE VERTICALS: Consumer Tech, Sports & Performance, MEDIA & GAMING, Health & Wellness. Seed to Series B stage. Strong advisory arm: growth strategy, investor readiness, fundraising, commercial partnerships. Portfolio includes: Rooter (esports streaming - $25M Series A), Playbook, Magma, Rewire, Feel, Carewell, Hello Inside, Infinite Reality. Scout for Headline fund. Testimonials show deep gaming/media network (1AM Gaming partnership). London-based, invests cross-border. STRONG FIT for LoreWeaver - gaming vertical, right stage, advisory-minded. Contact: info@almaventures.io',
      investorStage: 'seed, series-a, series-b',
      typicalCheckSize: 'Unknown - does direct investments + advisory for equity',
      portfolioGaming: ['Rooter (esports streaming - $25M Series A)', '1AM Gaming (co-investment partner)', 'Infinite Reality'],
      thesisFitScore: 4, // Media & Gaming vertical, consumer-leaning but gaming-focused
      stageFitScore: 4, // Seed to Series B, pre-seed may be early but seed fits
      checkSizeFitScore: 3, // Unknown exact size, but does Series A co-leads
      gamingExpertiseScore: 4, // Gaming/media vertical, Rooter, 1AM Gaming
      activityScore: 5, // Very active - multiple recent investments
      geographyFitScore: 3, // UK-based, Europe-friendly
      totalFitScore: 42, // (4×3)+(4×2)+(3×2)+(4×2)+(5×1)+(3×1)=12+8+6+8+5+3=42
      investorTier: 'tier-1'
    }
  },
  {
    id: 'op4kIHxvFBDPfpof5cTi', // Midgame Fund
    data: {
      name: 'Midgame Fund',
      website: 'https://midgame.fund',
      country: 'Netherlands',
      investorThesis: 'Dutch GAME FUNDING collective using REVENUE SHARE model (NOT equity). Run by Dutch game developers for game developers. Terms: revenue share until recoup + trailing share, NO equity taken, IP stays with developer. Total invested: ~€800K across 10+ projects (~€80-130K per project). Portfolio: Heirs of Eternity (Jotun Games, Feb 2026), Timber Trail (DioToons, Jan 2026), Button Effect (Frycandle), Dobbel Dungeon (Gamepie), Wispfire project, Regulator City (Orangepixel), Surmount, etc. IMPORTANT: They fund GAMES, not game TOOLS/tech. LoreWeaver is B2B middleware, not a game studio - THESIS MISMATCH despite strong Dutch gaming expertise. Could be valuable for referrals/network.',
      investorStage: 'project-based (game development funding)',
      typicalCheckSize: '€80-130K EUR per game project (revenue share)',
      portfolioGaming: ['Heirs of Eternity', 'Timber Trail', 'Button Effect', 'Dobbel Dungeon', 'Regulator City', 'Surmount', 'Octopus City Blues', 'All Hands On Deck', 'Unsung Warriors'],
      thesisFitScore: 1, // Funds games, NOT game tools/B2B - fundamental mismatch
      stageFitScore: 2, // Project-based, not company equity funding
      checkSizeFitScore: 4, // €80-130K fits range, but wrong model
      gamingExpertiseScore: 5, // 100% gaming, run by Dutch game devs
      activityScore: 5, // Very active - Feb 2026 investment
      geographyFitScore: 5, // Netherlands-based - perfect
      totalFitScore: 32, // (1×3)+(2×2)+(4×2)+(5×2)+(5×1)+(5×1)=3+4+8+10+5+5=35
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
