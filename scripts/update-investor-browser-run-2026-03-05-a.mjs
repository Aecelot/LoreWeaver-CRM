import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';

const sa = JSON.parse(readFileSync('../service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

// Investors researched via browser on 2026-03-05
const updates = [
  {
    id: '6VessfkSuCFYFCZLRMpS', // Negative Five Ventures
    data: {
      name: 'Negative Five Ventures',
      investorThesis: 'Venture Studio focused on game-tech, AI, Big Data, AR/VR, CloudTech, DevOps, and FinTech. They identify ambitious founders and help disruptive ideas emerge, providing Pre-Seed and Seed investments plus studio services.',
      investorStage: 'pre-seed, seed',
      typicalCheckSize: 'Unknown (venture studio model)',
      portfolioGaming: [], // Game tech focus but no specific portfolio listed
      contactEmail: 'info@negativefive.vc',
      contactPhone: '+49 175 8859 218',
      location: 'The Hague, Netherlands',
      // Scoring per rubric
      thesisFitScore: 5, // Game Tech explicitly listed as focus
      stageFitScore: 5, // Pre-Seed and Seed focused
      checkSizeFitScore: 3, // Unknown but venture studio typically smaller
      gamingExpertiseScore: 4, // Game Tech is core focus
      activityScore: 2, // Unknown recent activity
      geographyFitScore: 5, // Netherlands-based!
      totalFitScore: 46, // (5×3)+(5×2)+(3×2)+(4×2)+(2×1)+(5×1) = 15+10+6+8+2+5 = 46
      investorTier: 'tier-1',
      researchNotes: 'Dutch venture studio in The Hague with explicit Game Tech focus. Perfect geographic fit. Provides services beyond funding: UI/UX design, talent acquisition, branding, mentorship. Worth reaching out for both investment and potential collaboration. Website: negativefive.vc'
    }
  },
  {
    id: '6WEUpA8RYCgF1HaP2sUI', // Kishen Patel
    data: {
      name: 'Kishen Patel',
      investorThesis: 'Investor at Greycroft focusing on early-stage software investments, particularly AI applications, data infrastructure, and novel consumer technology. Previously worked at Netflix (original content strategy), BITKRAFT (gaming VC), Lightspeed, Subspace, and Spotter. Interested in cutting-edge technical products at consumer scale.',
      investorStage: 'seed, series-a',
      typicalCheckSize: '$500K-2M (Greycroft typical)',
      portfolioGaming: [], // Gaming-adjacent via BITKRAFT experience
      location: 'US',
      // Scoring per rubric
      thesisFitScore: 4, // AI interested, worked at BITKRAFT (gaming!), consumer tech
      stageFitScore: 5, // Early-stage at Greycroft
      checkSizeFitScore: 3, // Greycroft typically $500K-2M (slightly large)
      gamingExpertiseScore: 4, // BITKRAFT internship = gaming VC experience!
      activityScore: 4, // Active at Greycroft
      geographyFitScore: 2, // US-based but global outlook
      totalFitScore: 42, // (4×3)+(5×2)+(3×2)+(4×2)+(4×1)+(2×1) = 12+10+6+8+4+2 = 42
      investorTier: 'tier-1',
      researchNotes: 'Key insight: Has BITKRAFT gaming VC internship experience! At Greycroft focusing on AI applications. Also worked at Netflix on content strategy. Math nerd (Yale Applied Math, HBS). Blog at kishen-patel.com shows interest in AI agents. Good fit for narrative AI positioning.'
    }
  },
  {
    id: '6NLyUWaIVUUk4jL3ue1o', // Matt Mullenweg / Audrey Capital
    data: {
      name: 'Matt Mullenweg (Audrey Capital)',
      investorThesis: 'Audrey Capital is Matt Mullenweg\'s (WordPress/Automattic founder) personal investment fund. Invests broadly: AI, health tech, consumer products, longevity, food & beverage, fintech, crypto. No apparent gaming focus. Portfolio includes: Stripe, SpaceX, Telegram, GitLab, Calm, Sonos.',
      investorStage: 'seed, series-a',
      typicalCheckSize: '$50-500K (estimated)',
      portfolioGaming: [], // No gaming investments found
      location: 'US',
      // Scoring per rubric
      thesisFitScore: 2, // Generalist, no gaming/game tools focus
      stageFitScore: 5, // Seed focused
      checkSizeFitScore: 4, // Sweet spot for our round
      gamingExpertiseScore: 0, // No gaming investments visible in extensive portfolio
      activityScore: 5, // Very active (many 2024-2025 investments)
      geographyFitScore: 2, // US-based
      totalFitScore: 31, // (2×3)+(5×2)+(4×2)+(0×2)+(5×1)+(2×1) = 6+10+8+0+5+2 = 31
      investorTier: 'tier-2',
      researchNotes: 'WordPress/Automattic founder. Very diversified portfolio (AI, health, consumer, food, crypto) but NO gaming investments visible. Open source background could resonate with our approach. Lower priority - only pursue if warm intro available.'
    }
  }
];

// Mark these first 3 queue entries as having website issues
const websiteIssues = [
  {
    id: '4KlEv3sJc5CHuW5raDDk', // Jon Oringer
    issue: 'Website (shutterstock.com) is his company, not investment portfolio. Invests through Pareto Ventures. Need different URL.'
  },
  {
    id: '5aWK1brhbtpKQxuyRHxt', // Sports Innovation VC
    issue: 'Website (si-vc.com) redirects to unrelated site (Max Mullen/Instacart). Domain may have changed ownership.'
  },
  {
    id: '6A6c4IGpcXSTkXnh2389', // Ethan Levy
    issue: 'Website (deconstructoroffun.com) is gaming analysis/podcast site, not investor portfolio page. No investment thesis available.'
  }
];

async function main() {
  console.log('=== Updating researched investors ===\n');
  
  for (const update of updates) {
    await db.collection('leads').doc(update.id).update({
      ...update.data,
      status: 'researched',
      'pipeline.stageId': 'researched',
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log(`✓ Updated: ${update.data.name} (Score: ${update.data.totalFitScore}, ${update.data.investorTier})`);
  }
  
  console.log('\n=== Flagging investors with website issues ===\n');
  
  for (const issue of websiteIssues) {
    await db.collection('leads').doc(issue.id).update({
      websiteIssue: issue.issue,
      status: 'needs-website-update',
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log(`⚠ Flagged: ${issue.id} - ${issue.issue.substring(0, 50)}...`);
  }
  
  console.log(`\n=== Summary ===`);
  console.log(`Researched: ${updates.length} investors`);
  console.log(`Flagged: ${websiteIssues.length} investors (website issues)`);
  
  process.exit(0);
}

main();
