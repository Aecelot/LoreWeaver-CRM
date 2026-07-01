import admin from 'firebase-admin';
import { readFileSync } from 'fs';

const sa = JSON.parse(readFileSync('./service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const updates = [
  {
    id: '1uy6n48Tk0uHnlOyO9PC', // The Games Fund
    data: {
      investorThesis: 'Early-stage VC fund investing in game developers, gaming technologies, and services. Founded by video game industry veterans.',
      investorStage: 'seed',
      typicalCheckSize: '€100-500K (estimated)',
      portfolioGaming: ['Järvi', 'KEK Entertainment', 'Hypemasters', 'Purple Games', 'Made on Earth', 'Starkit'],
      thesisFitScore: 5,
      stageFitScore: 5,
      checkSizeFitScore: 4,
      gamingExpertiseScore: 5,
      activityScore: 4,
      geographyFitScore: 4,
      totalFitScore: 49,
      investorTier: 'tier-1'
    }
  },
  {
    id: '3LekHk9sxZV2OQBGCaQZ', // Supercell Investments
    data: {
      name: 'Supercell Investments',
      investorThesis: 'We invest in creative, independent studios and game tech teams striving to make truly great games played by millions for years.',
      investorStage: 'all-stages',
      typicalCheckSize: 'Flexible (corporate)',
      portfolioGaming: ['20+ mobile, PC, and game tech companies'],
      thesisFitScore: 5,
      stageFitScore: 3,
      checkSizeFitScore: 3,
      gamingExpertiseScore: 5,
      activityScore: 5,
      geographyFitScore: 4,
      totalFitScore: 45,
      investorTier: 'tier-1'
    }
  },
  {
    id: '29EISovsncMhKzNgaQRL', // SMOK Ventures
    data: {
      investorThesis: 'Early-stage fund focused on software development tools and AI in CEE & diaspora.',
      investorStage: 'seed',
      typicalCheckSize: '€100K-1M',
      portfolioGaming: [],
      contactEmail: 'borys@smok.vc',
      contactName: 'Borys Musielak',
      thesisFitScore: 4,
      stageFitScore: 5,
      checkSizeFitScore: 5,
      gamingExpertiseScore: 2,
      activityScore: 4,
      geographyFitScore: 4,
      totalFitScore: 40,
      investorTier: 'tier-1'
    }
  },
  {
    id: '2sMhZP8eCfM67VQpWPEV', // Roblox founder
    data: {
      name: 'David Baszucki (Roblox Founder)',
      investorThesis: 'Gaming/metaverse angel investor, Roblox co-founder',
      investorStage: 'seed',
      typicalCheckSize: '$50-250K (estimated)',
      portfolioGaming: ['Roblox (founder)'],
      thesisFitScore: 5,
      stageFitScore: 4,
      checkSizeFitScore: 4,
      gamingExpertiseScore: 5,
      activityScore: 3,
      geographyFitScore: 2,
      totalFitScore: 43,
      investorTier: 'tier-1'
    }
  },
  {
    id: '32W2CQoFoElh8bzhb7Qe', // Unity founder
    data: {
      name: 'David Helgason (Unity Founder)',
      investorThesis: 'Game engine/tools angel investor, Unity co-founder',
      investorStage: 'seed',
      typicalCheckSize: '$50-250K (estimated)',
      portfolioGaming: ['Unity (founder)'],
      thesisFitScore: 5,
      stageFitScore: 4,
      checkSizeFitScore: 4,
      gamingExpertiseScore: 5,
      activityScore: 3,
      geographyFitScore: 4,
      totalFitScore: 46,
      investorTier: 'tier-1'
    }
  },
  {
    id: '4AfVV4hgYQPGbTzd6Szu', // Tactile founder
    data: {
      investorThesis: 'Mobile/casual gaming angel investor, Tactile Games founder',
      investorStage: 'seed',
      typicalCheckSize: '$50-200K (estimated)',
      portfolioGaming: ['Tactile Games (founder)'],
      thesisFitScore: 5,
      stageFitScore: 5,
      checkSizeFitScore: 4,
      gamingExpertiseScore: 5,
      activityScore: 3,
      geographyFitScore: 4,
      totalFitScore: 47,
      investorTier: 'tier-1'
    }
  },
  {
    id: '3ThBseP0A2FKirvbBjw9', // Sam Enrico Williams
    data: {
      investorThesis: 'UK gaming and esports angel, seed-focused',
      investorStage: 'seed',
      typicalCheckSize: '$25-100K (estimated)',
      portfolioGaming: [],
      thesisFitScore: 4,
      stageFitScore: 5,
      checkSizeFitScore: 5,
      gamingExpertiseScore: 4,
      activityScore: 3,
      geographyFitScore: 4,
      totalFitScore: 42,
      investorTier: 'tier-1'
    }
  }
];

async function main() {
  for (const update of updates) {
    await db.collection('leads').doc(update.id).update({
      ...update.data,
      status: 'researched',
      'pipeline.stageId': 'researched',
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log(`✓ Updated: ${update.data.name || update.id}`);
  }
  
  console.log(`\n=== Updated ${updates.length} investors with scores ===`);
  process.exit(0);
}

main();
