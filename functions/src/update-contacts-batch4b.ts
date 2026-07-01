import * as admin from 'firebase-admin';

const serviceAccount = require('../../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

interface ContactUpdate {
  name: string;
  contact: {
    email?: string;
    phone?: string;
    name?: string;
    title?: string;
  };
  address?: string;
  notes?: string;
}

const contacts: ContactUpdate[] = [
  {
    name: 'Abrakam Entertainment',
    contact: {
      email: 'contact@abrakam.com'
    },
    address: 'Avenue du Pré Aily, 24, 4031 Angleur, Liège, Belgium',
    notes: 'Belgian studio (Faeria, Roguebook). Press: press@abrakam.com. Careers: careers@abrakam.com.'
  },
  {
    name: 'NeoBards Entertainment',
    contact: {},
    notes: 'Taiwan studio. Developed Silent Hill f (Konami), Dead Rising Deluxe Remaster (Capcom), FF7 Rebirth support. High-profile work-for-hire studio. Contact form only. Also expanding to Breda, Netherlands.'
  }
];

async function updateContacts() {
  console.log('Starting contact enrichment batch 4b...\n');
  
  let updated = 0;
  let notFound = 0;
  
  for (const update of contacts) {
    console.log(`Looking for: ${update.name}...`);
    
    // Find the lead by name (case-insensitive)
    const allSnapshot = await db.collection('leads')
      .where('type', '==', 'studio')
      .get();
    
    let found = false;
    for (const doc of allSnapshot.docs) {
      const data = doc.data();
      if (data.name && data.name.toLowerCase().includes(update.name.toLowerCase().split(' ')[0])) {
        // Found match
        const updateData: any = {
          'enrichment.lastUpdated': admin.firestore.FieldValue.serverTimestamp(),
          'enrichment.source': 'manual_batch4b',
          'enrichment.date': new Date().toISOString().split('T')[0]
        };
        
        if (update.contact.email) {
          updateData.contact = update.contact;
        }
        
        if (update.address) {
          updateData.address = update.address;
        }
        
        await db.collection('leads').doc(doc.id).update(updateData);
        console.log(`  ✓ Updated ${data.name} (${doc.id})`);
        
        // Add note if provided
        if (update.notes) {
          await db.collection('notes').add({
            leadId: doc.id,
            content: update.notes,
            status: 'warm',
            createdBy: 'skel-enrichment',
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
          });
          console.log(`    + Added note`);
        }
        
        updated++;
        found = true;
        break;
      }
    }
    
    if (!found) {
      console.log(`  NOT FOUND: ${update.name}`);
      notFound++;
    }
  }
  
  console.log(`\n=== BATCH 4B COMPLETE ===`);
  console.log(`Updated: ${updated}`);
  console.log(`Not found: ${notFound}`);
}

updateContacts()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
