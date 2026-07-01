import * as admin from 'firebase-admin';

const serviceAccount = require('../../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

interface ContactUpdate {
  leadId?: string;
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
    name: '11 bit studios',
    contact: {
      email: 'info@11bitstudios.com',
      phone: '+48 22 250 29 10'
    },
    address: 'Brzeska 2, 03-737, Warsaw, Poland',
    notes: 'Strong narrative studio (Frostpunk, This War of Mine). Publicly traded.'
  },
  {
    name: '10 Chambers',
    contact: {
      email: 'robin@10chambers.com',
      name: 'Robin Björkell',
      title: 'Press/Partnerships'
    },
    address: 'Drottninggatan 95A, 113 60 Stockholm, Sweden',
    notes: 'Developers of GTFO, Den of Wolves. Community email: community@10chambers.com'
  },
  {
    name: 'Abbey Games',
    contact: {
      email: 'info@abbeygames.com'
    },
    notes: 'Dutch studio (Reus, Godhood). LOCAL - Netherlands.'
  },
  {
    name: 'ACE Team',
    contact: {
      email: 'business@aceteam.cl'
    },
    notes: 'Chilean studio (Zeno Clash, Rock of Ages, Eternal Cylinder). Press: contact@aceteam.cl'
  },
  {
    name: 'Supercell',
    contact: {
      email: 'media@supercell.com'
    },
    address: 'Jätkäsaarenlaituri 1, 00180 Helsinki, Finland',
    notes: 'Major mobile studio (Clash of Clans, Brawl Stars). Press inquiries only.'
  }
];

async function updateContacts() {
  console.log('Starting contact enrichment batch...\n');
  
  let updated = 0;
  let notFound = 0;
  
  for (const update of contacts) {
    console.log(`Looking for: ${update.name}...`);
    
    // Find the lead by name
    const snapshot = await db.collection('leads')
      .where('name', '==', update.name)
      .limit(1)
      .get();
    
    if (snapshot.empty) {
      // Try case-insensitive search
      const allSnapshot = await db.collection('leads')
        .where('type', '==', 'studio')
        .get();
      
      let found = false;
      for (const doc of allSnapshot.docs) {
        const data = doc.data();
        if (data.name && data.name.toLowerCase() === update.name.toLowerCase()) {
          // Found with different casing
          await updateLead(doc.id, update);
          updated++;
          found = true;
          break;
        }
      }
      
      if (!found) {
        console.log(`  NOT FOUND: ${update.name}`);
        notFound++;
      }
    } else {
      const doc = snapshot.docs[0];
      await updateLead(doc.id, update);
      updated++;
    }
  }
  
  console.log(`\n=== BATCH COMPLETE ===`);
  console.log(`Updated: ${updated}`);
  console.log(`Not found: ${notFound}`);
}

async function updateLead(id: string, update: ContactUpdate) {
  const updateData: any = {
    contact: update.contact,
    'enrichment.lastUpdated': admin.firestore.FieldValue.serverTimestamp(),
    'enrichment.source': 'manual_batch4',
    'enrichment.date': new Date().toISOString().split('T')[0]
  };
  
  if (update.address) {
    updateData.address = update.address;
  }
  
  await db.collection('leads').doc(id).update(updateData);
  console.log(`  ✓ Updated ${update.name} (${id})`);
  
  // Add note if provided
  if (update.notes) {
    await db.collection('notes').add({
      leadId: id,
      content: update.notes,
      status: 'warm',
      createdBy: 'skel-enrichment',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log(`    + Added note`);
  }
}

updateContacts()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
