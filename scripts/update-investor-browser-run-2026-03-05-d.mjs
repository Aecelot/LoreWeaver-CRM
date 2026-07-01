import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';

const sa = JSON.parse(readFileSync('../service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const updates = [
  {
    id: 'KcMR8oaTxImpnI1sEBDI', // Blue Horizon Corporation
    data: {
      name: 'Blue Horizon Corporation',
      investorThesis: 'WRONG FIT - Sustainable food systems VC, NOT gaming. Focus: Alternative proteins, biology/tech/agriculture intersection, feeding 10B people by 2050. 100+ companies funded, 3 unicorns. Tags incorrectly listed gaming.',
      investorStage: 'seed, growth',
      typicalCheckSize: 'Unknown (large fund - $100M+ growth)',
      portfolioGaming: [],
      // Scoring
      thesisFitScore: 0, // Food systems, not gaming/tech
      stageFitScore: 3, // Seed + growth
      checkSizeFitScore: 1, // Too large
      gamingExpertiseScore: 0, // None
      activityScore: 4, // Very active, 100+ companies
      geographyFitScore: 3, // Switzerland, EU-friendly
      totalFitScore: 15, // (0×3)+(3×2)+(1×2)+(0×2)+(4×1)+(3×1)=15
      investorTier: 'tier-4'
    }
  },
  {
    id: 'KkR6vd0dIdfelUMsZMHq', // Bright Gambit
    data: {
      name: 'Bright Gambit',
      investorThesis: 'WRONG MODEL - Video game FUNDING initiative (revenue share), NOT equity investment. Funds indie games directly, no publishing claims, dev keeps creative control. Strong network value: team includes ex-DICE, EA, Ubisoft, Raw Fury, Paradox, Atlus veterans. Karl Magnus Troedsson is launching Behold Ventures (gaming VC). Portfolio: A Tiny Sticker Tale, Lonesome Village, SANYA, etc.',
      investorStage: 'development (game projects)',
      typicalCheckSize: 'Unknown (game dev budgets)',
      portfolioGaming: ['A Tiny Sticker Tale', 'Super Adventure Hand', 'SANYA', 'Orten Was The Case', 'Lonesome Village', 'GRUNND', 'Kredolis'],
      // Scoring - doesn't fit equity model, but network value
      thesisFitScore: 1, // Gaming yes, but funds games not companies
      stageFitScore: 0, // Not equity investment
      checkSizeFitScore: 0, // Not applicable
      gamingExpertiseScore: 5, // Deep expertise - industry veterans
      activityScore: 4, // Active portfolio
      geographyFitScore: 4, // Nordic/EU
      totalFitScore: 21, // (1×3)+(0×2)+(0×2)+(5×2)+(4×1)+(4×1)=21
      investorTier: 'tier-3',
      notes: 'VALUE: Network/intro potential via game industry veterans. Not direct investment target.'
    }
  },
  {
    id: 'L8OFzYHTzor6rDAmYupT', // Change Ventures
    data: {
      name: 'Change Ventures',
      investorThesis: 'GEOGRAPHIC MISMATCH - Baltic-only VC (Estonia, Latvia, Lithuania founders or diaspora). Pre-seed/seed €100K-500K. Generalist tech - FMCG data, AI demos, energy storage. No gaming focus. LoreWeaver (Netherlands) outside investment geography.',
      investorStage: 'pre-seed, seed',
      typicalCheckSize: '€100K-500K',
      portfolioGaming: [],
      // Scoring
      thesisFitScore: 2, // Generalist tech
      stageFitScore: 5, // Pre-seed/seed focused
      checkSizeFitScore: 5, // Sweet spot
      gamingExpertiseScore: 0, // None
      activityScore: 4, // Active
      geographyFitScore: 0, // Baltic-only, excludes Netherlands
      totalFitScore: 28, // (2×3)+(5×2)+(5×2)+(0×2)+(4×1)+(0×1)=28
      investorTier: 'tier-3',
      notes: 'EXCLUDED: Baltic founders only. LoreWeaver (NL) outside geography.'
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
