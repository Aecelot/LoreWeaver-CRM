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
    name: 'MGX',
    country: 'UAE',
    website: 'https://www.mgx.ae',
    description: 'Abu Dhabi sovereign AI fund. Leading AI and advanced technology investor focused on enabling the AI fabric of the global economy.',
    checkSize: '$10M+',
    stage: 'Growth',
    type: 'Sovereign Fund'
  },
  {
    name: 'Mubadala Ventures',
    country: 'UAE',
    website: 'https://www.mubadala.com',
    description: 'Abu Dhabi sovereign wealth fund VC arm. Growth-stage global investments.',
    checkSize: '$10M+',
    stage: 'Growth',
    type: 'Sovereign VC'
  },
  {
    name: 'BECO Capital',
    country: 'UAE',
    website: 'https://www.beco.capital',
    description: 'Dubai early-stage VC. Consumer internet, SaaS, Fintech focus. Most active Dubai seed fund.',
    checkSize: '$500K–$5M',
    stage: 'Seed to Series A',
    type: 'VC Fund'
  },
  {
    name: 'Shorooq Partners',
    country: 'UAE',
    website: 'https://www.shorooq.ae',
    description: 'Dubai VC focused on Fintech, SaaS, and deep tech across MENA.',
    checkSize: '$500K–$3M',
    stage: 'Seed to Series A',
    type: 'VC Fund'
  },
  {
    name: 'Global Ventures',
    country: 'UAE',
    website: 'https://www.global.vc',
    description: 'Dubai VC backing Healthtech, Edtech, and enterprise solutions across emerging markets.',
    checkSize: '$1M–$10M',
    stage: 'Series A/B',
    type: 'VC Fund'
  },
  {
    name: 'Wamda Capital',
    country: 'UAE',
    website: 'https://www.wamda.com/capital',
    description: 'Dubai VC for regional scale-ups and cross-border MENA ventures.',
    checkSize: '$1M–$10M',
    stage: 'Series A/B',
    type: 'VC Fund'
  },
  {
    name: 'Hub71',
    country: 'UAE',
    website: 'https://www.hub71.com',
    description: 'Abu Dhabi tech ecosystem and accelerator. Angel network + non-dilutive support.',
    checkSize: '$50K–$500K',
    stage: 'Pre-seed/Seed',
    type: 'Accelerator'
  },
  {
    name: 'Dubai Angel Investors',
    country: 'UAE',
    website: 'https://www.dubaiangelinvestors.com',
    description: 'Early-stage angel network in Dubai backing tech startups.',
    checkSize: '$100K–$250K',
    stage: 'Seed',
    type: 'Angel Network'
  },
  {
    name: 'Savvy Games Group',
    country: 'Saudi Arabia',
    website: 'https://www.savvygames.com',
    description: 'Saudi sovereign gaming fund. Acquired Scopely. Invests globally in studios, esports, gaming tech. Massive capital.',
    checkSize: '$50M–$1B+',
    stage: 'All stages',
    type: 'Sovereign Gaming Fund'
  },
  {
    name: 'Saudi Venture Capital (SVC)',
    country: 'Saudi Arabia',
    website: 'https://www.svc.com.sa',
    description: 'Saudi government-backed VC. Fund-of-funds and direct investments.',
    checkSize: 'Varies',
    stage: 'All stages',
    type: 'Government VC'
  },
  {
    name: 'Oman Technology Fund (OTF)',
    country: 'Oman',
    website: 'https://www.otf.om',
    description: 'Oman sovereign tech fund backing early-stage startups.',
    checkSize: '$500K–$5M',
    stage: 'Seed to Series A',
    type: 'Sovereign Fund'
  }
];

async function run() {
  console.log('Adding Middle East investors...\n');
  
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
  
  console.log(`\nAdded ${investors.length} Middle East investors.`);
}

run().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
