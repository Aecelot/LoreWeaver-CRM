import * as admin from 'firebase-admin';
const serviceAccount = require('../../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

interface ContactUpdate {
  id: string;
  company: string;
  email: string;
  website?: string; // Optional website correction
}

const updates: ContactUpdate[] = [
  { id: 'hwUziGzu67ounrgsGEqA', company: 'Mystic Forge', email: 'pitch@mysticforge.com' },
  { id: '0HeqcvmdjhR3RupwpzUZ', company: 'AdHoc Studio', email: 'contact@adhocla.com', website: 'https://www.adhocla.com' },
  { id: '0hPrkg5AKRcHkzEnHMa3', company: 'Compulsion Games', email: 'info@compulsiongames.com' },
  { id: '3ViCUUi2ht97rSS4jnxq', company: 'Remedy Entertainment', email: 'feedback@remedygames.com' },
  { id: '4U7qPu9qGrPqplYXSl55', company: 'iNK Stories', email: 'info@inkstories.com' },
  { id: '2pKDHdpPVyZIzYXfKwge', company: 'Artifact 5', email: 'info@artifact5.com' },
  { id: '4y5pGgSatf2cSti2cNFM', company: 'IO Interactive', email: 'ioi@ioi.dk' },
  { id: '2KWYIgxLND9grkue1h3F', company: 'LEAP Game Studios', email: 'contact@leapgs.com' },
  { id: '56DoOYV7XXHWXih5dImy', company: 'Hiker Games', email: 'contact@hikergames.com' },
];

async function updateContacts() {
  console.log('Starting contact email updates...\n');
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const update of updates) {
    try {
      const docRef = db.collection('leads').doc(update.id);
      const doc = await docRef.get();
      
      if (!doc.exists) {
        console.log(`❌ ${update.company}: Document not found (${update.id})`);
        errorCount++;
        continue;
      }
      
      const updateData: any = {
        'contact.email': update.email,
        'updatedAt': admin.firestore.FieldValue.serverTimestamp()
      };
      
      // Also update website if provided
      if (update.website) {
        updateData['website'] = update.website;
      }
      
      await docRef.update(updateData);
      
      console.log(`✅ ${update.company}: Added email ${update.email}`);
      if (update.website) {
        console.log(`   Also updated website to ${update.website}`);
      }
      successCount++;
      
    } catch (error: any) {
      console.log(`❌ ${update.company}: Error - ${error.message}`);
      errorCount++;
    }
  }
  
  console.log(`\n--- Summary ---`);
  console.log(`Successfully updated: ${successCount}`);
  console.log(`Errors: ${errorCount}`);
}

updateContacts().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
