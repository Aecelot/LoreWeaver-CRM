import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccountPath = path.join(__dirname, '../../service-account.json');
const serviceAccount = require(serviceAccountPath);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const investors = [
  {
    name: 'Middle East Venture Partners (MEVP)',
    country: 'UAE',
    website: 'https://mevp.com',
    description: 'Dubai VC, $150M Fund IV. Early and growth-stage tech. 6 gaming investments. 12+ years investing in MENA.',
    checkSize: '$1M–$10M',
    stage: 'Seed to Growth',
    type: 'VC Fund'
  },
  {
    name: 'Vision Ventures',
    country: 'Saudi Arabia',
    website: 'https://visionventures.sa',
    description: 'Saudi early-stage VC. 13 gaming investments in MENA. Seed and Series A across tech verticals.',
    checkSize: '$500K–$5M',
    stage: 'Pre-seed to Series A',
    type: 'VC Fund'
  },
  {
    name: 'GEM Capital',
    country: 'UAE',
    website: 'https://gem-capital.com',
    description: 'Gaming-focused VC. 11 MENA gaming investments. International PE/VC in games industry. Cyprus/Dubai.',
    checkSize: '$500K–$5M',
    stage: 'Pre-seed to Series A',
    type: 'VC Fund'
  },
  {
    name: 'Impact46',
    country: 'Saudi Arabia',
    website: 'https://impact46.com',
    description: 'Saudi VC actively backing gaming startups. 8 gaming investments. Early-stage tech focus.',
    checkSize: '$500K–$5M',
    stage: 'Seed to Series A',
    type: 'VC Fund'
  },
  {
    name: 'Merak Capital',
    country: 'Saudi Arabia',
    website: 'https://merakcapital.com',
    description: 'Saudi VC backing gaming and entertainment startups. Mentioned in MENA gaming investment surge.',
    checkSize: '$1M–$10M',
    stage: 'Seed to Series B',
    type: 'VC Fund'
  },
  {
    name: 'Nuwa Capital',
    country: 'UAE',
    website: 'https://nuwa.capital',
    description: 'Dubai VC with 5 gaming investments. Backs tech across MENA region.',
    checkSize: '$1M–$10M',
    stage: 'Seed to Series A',
    type: 'VC Fund'
  },
  {
    name: 'Flat6Labs',
    country: 'UAE',
    website: 'https://flat6labs.com',
    description: 'MENA accelerator network. 6 gaming investments. Offices in Abu Dhabi, Bahrain, Egypt, Saudi, Tunisia.',
    checkSize: '$50K–$500K',
    stage: 'Pre-seed/Seed',
    type: 'Accelerator'
  },
  {
    name: 'WePlay Ventures',
    country: 'Turkey',
    website: 'https://weplayventures.com',
    description: 'Gaming VC investing in early-stage game studios in Eastern Europe and Central Asia. 12 gaming investments.',
    checkSize: '$200K–$2M',
    stage: 'Pre-seed to Seed',
    type: 'VC Fund'
  },
  {
    name: 'Ludus Venture Studio',
    country: 'Turkey',
    website: 'https://ludus.gg',
    description: 'Gaming venture studio in Turkey. 13 gaming investments. Invests in and nurtures game startups.',
    checkSize: '$100K–$1M',
    stage: 'Pre-seed to Seed',
    type: 'Venture Studio'
  },
  {
    name: 'vgames',
    country: 'Israel',
    website: 'https://vgames.co',
    description: 'Israeli gaming-focused VC. 6 MENA gaming investments. Backs game studios and gaming tech.',
    checkSize: '$500K–$5M',
    stage: 'Seed to Series A',
    type: 'VC Fund'
  },
  {
    name: 'OurCrowd',
    country: 'Israel',
    website: 'https://ourcrowd.com',
    description: 'Israeli equity crowdfunding platform. 10 gaming investments. Global reach, strong tech portfolio.',
    checkSize: '$500K–$10M',
    stage: 'Seed to Growth',
    type: 'Equity Crowdfunding'
  },
  {
    name: 'Entrée Capital',
    country: 'Israel',
    website: 'https://entreecap.com',
    description: 'Israeli VC with 7 gaming investments. Backs consumer tech, gaming, and enterprise.',
    checkSize: '$500K–$10M',
    stage: 'Seed to Series B',
    type: 'VC Fund'
  },
  {
    name: '500 Global Istanbul',
    country: 'Turkey',
    website: 'https://500.co',
    description: '500 Global Turkish arm. 5 gaming investments. Accelerator + seed fund.',
    checkSize: '$100K–$500K',
    stage: 'Pre-seed to Seed',
    type: 'Accelerator'
  },
  {
    name: 'Wa\'ed Ventures',
    country: 'Saudi Arabia',
    website: 'https://waed.net',
    description: 'Aramco entrepreneurship arm. Backs Saudi tech startups including gaming/entertainment.',
    checkSize: '$500K–$5M',
    stage: 'Seed to Series A',
    type: 'Corporate VC'
  }
];

async function run() {
  console.log('Adding more Middle East investors...\n');
  
  for (const inv of investors) {
    const lead = {
      name: inv.name,
      type: inv.type,
      country: inv.country,
      website: inv.website,
      description: inv.description,
      investmentStage: inv.stage,
      checkSize: inv.checkSize,
      status: 'new',
      pipeline: {
        pipelineId: 'investors',
        stageId: 'new'
      },
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    await db.collection('leads').add(lead);
    console.log(`✓ ${inv.name} (${inv.country})`);
  }
  
  console.log(`\nAdded ${investors.length} more Middle East investors.`);
}

run().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
