import * as admin from 'firebase-admin';
import * as path from 'path';

// Initialize Firebase
const serviceAccountPath = path.join(__dirname, '../../service-account.json');
const serviceAccount = require(serviceAccountPath);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Investors to mark as contacted
const investorNames = [
  'LVP',
  'London Venture Partners',
  'The Games Fund',
  'Play Ventures',
  'Kitsune Ventures',
  'Sisu',
  'Bitkraft',
  'BITKRAFT',
  'Transcend',
  'No More Robots',
  '505 Games',
  'Fil Rouge Capital',
  'Humble Games',
  'Supercell Investments',
  'Supercell',
  'Kowloon Nights',
  'Initial Capital',
  'Makers Fund'
];

async function markInvestorsContacted() {
  console.log('Searching for investor leads...\n');
  
  // Get all leads from the investor pipeline
  const snapshot = await db.collection('leads')
    .where('pipeline.pipelineId', '==', 'investors')
    .get();
  
  console.log(`Found ${snapshot.size} investor leads total\n`);
  
  let updated = 0;
  const matched: string[] = [];
  const notFound: string[] = [...investorNames];
  
  for (const doc of snapshot.docs) {
    const data = doc.data();
    const name = data.name?.toLowerCase() || '';
    
    // Check if this lead matches any of our target names
    const matchedName = investorNames.find(target => 
      name.includes(target.toLowerCase()) || 
      target.toLowerCase().includes(name)
    );
    
    if (matchedName) {
      // Update with contacted status
      await doc.ref.update({
        'status': 'contacted',
        'pipeline.stageId': 'contacted',
        'outreach.status': 'contacted',
        'outreach.contactedAt': admin.firestore.FieldValue.serverTimestamp(),
        'updatedAt': admin.firestore.FieldValue.serverTimestamp()
      });
      
      console.log(`✓ ${data.name}`);
      matched.push(data.name);
      updated++;
      
      // Remove from notFound
      const idx = notFound.findIndex(n => n.toLowerCase() === matchedName.toLowerCase());
      if (idx > -1) notFound.splice(idx, 1);
    }
  }
  
  console.log(`\n--- Summary ---`);
  console.log(`Updated: ${updated} leads`);
  console.log(`Matched: ${matched.join(', ')}`);
  
  if (notFound.length > 0) {
    console.log(`\nNot found (may need manual check):`);
    notFound.forEach(n => console.log(`  - ${n}`));
  }
}

markInvestorsContacted()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
