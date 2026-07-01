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
    name: 'Remagine Ventures',
    type: 'VC Fund',
    country: 'Israel',
    website: 'https://www.remagine.vc',
    stage: 'Seed',
    focus: 'Gaming, entertainment, tech intersection. Active thesis on AI x creative tools.',
    checkSize: 'Seed stage',
  },
  {
    name: 'Konvoy Ventures',
    type: 'VC Fund',
    country: 'USA',
    website: 'https://www.konvoy.vc',
    stage: 'Pre-seed to Series A',
    focus: 'Gaming infrastructure, analytics, developer enablement. How games are built, scaled, monetized.',
    checkSize: '$3M-$11M',
    aum: '$258M'
  },
  {
    name: 'Powerhouse Capital',
    type: 'VC Fund',
    country: 'USA',
    website: 'https://www.powerhouse.capital',
    stage: 'Seed to Growth',
    focus: 'Media, entertainment, gaming intersection. Long-term partnership style.',
    checkSize: 'Varies',
  }
];

async function run() {
  for (const inv of investors) {
    const lead = {
      name: inv.name,
      type: inv.type,
      country: inv.country,
      website: inv.website,
      description: inv.focus,
      investmentStage: inv.stage,
      checkSize: inv.checkSize,
      status: 'contacted',
      pipeline: {
        pipelineId: 'investors',
        stageId: 'contacted'
      },
      outreach: {
        status: 'contacted',
        contactedAt: admin.firestore.FieldValue.serverTimestamp()
      },
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const ref = await db.collection('leads').add(lead);
    console.log(`✓ ${inv.name} added (${ref.id})`);
  }
}

run().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
