import * as admin from 'firebase-admin';
const serviceAccount = require('../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

interface ContactUpdate {
  id: string;
  name: string;
  updates: {
    email?: string;
    phone?: string;
    linkedin?: string;
    twitter?: string;
    notes?: string;
  };
}

const updates: ContactUpdate[] = [
  {
    id: '5toEcPMkYnvt00HVHx1S',
    name: 'Ninja Theory',
    updates: {
      notes: 'Email format: first.last@ninjatheory.com (e.g. tameem.antoniades@ninjatheory.com for Chief Creative Ninja)'
    }
  },
  {
    id: '2PaptnZOxse14MGfftyn',
    name: 'Wildlife Studios',
    updates: {
      email: 'media@wildlifestudios.com'
    }
  },
  {
    id: '2494mDH2SMqIo8QX1mZb',
    name: '1Stone Games',
    updates: {
      email: 'info@1stone.games',
      notes: 'Press: press@1stone.games'
    }
  },
  {
    id: '1NtkZD6Ejb9LCTMMwTdd',
    name: 'Gemcraft Games Studio',
    updates: {
      email: 'info@gemcraftgames.com',
      phone: '+30 211 2169355'
    }
  },
  {
    id: '2Jn2UdZY6i868txUNIuw',
    name: 'sunset visitor',
    updates: {
      linkedin: 'https://linkedin.com/in/remy-siu-a4545a14/'
    }
  },
  {
    id: '1Ltofapa1Jtp02BSfwbm',
    name: 'Polychroma Games',
    updates: {
      twitter: '@polychromagames',
      notes: 'Contact form on website. Facebook: fb.com/polychromagames'
    }
  }
];

async function enrichContacts() {
  console.log('=== CRM Contact Enrichment Batch 2 ===');
  console.log(`Date: ${new Date().toISOString()}`);
  console.log(`Updates to process: ${updates.length}\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const update of updates) {
    try {
      const docRef = db.collection('leads').doc(update.id);
      const doc = await docRef.get();
      
      if (!doc.exists) {
        console.log(`❌ ${update.name}: Document not found (${update.id})`);
        errorCount++;
        continue;
      }

      const data = doc.data()!;
      const existingContact = data.contact || {};
      
      const contactUpdate: any = { ...existingContact };
      
      if (update.updates.email) {
        contactUpdate.email = update.updates.email;
      }
      if (update.updates.phone) {
        contactUpdate.phone = update.updates.phone;
      }
      if (update.updates.linkedin) {
        contactUpdate.linkedin = update.updates.linkedin;
      }
      if (update.updates.twitter) {
        contactUpdate.twitter = update.updates.twitter;
      }

      let updateData: any = {
        contact: contactUpdate,
        'meta.enrichedAt': admin.firestore.FieldValue.serverTimestamp(),
        'meta.enrichmentSource': 'automated-batch2-2026-03-24'
      };
      
      if (update.updates.notes) {
        updateData.enrichmentNotes = update.updates.notes;
      }

      await docRef.update(updateData);

      console.log(`✅ ${update.name}: Updated`);
      if (update.updates.email) console.log(`   Email: ${update.updates.email}`);
      if (update.updates.phone) console.log(`   Phone: ${update.updates.phone}`);
      if (update.updates.linkedin) console.log(`   LinkedIn: ${update.updates.linkedin}`);
      if (update.updates.twitter) console.log(`   Twitter: ${update.updates.twitter}`);
      if (update.updates.notes) console.log(`   Notes: ${update.updates.notes}`);
      
      successCount++;
    } catch (err) {
      console.log(`❌ ${update.name}: Error - ${err}`);
      errorCount++;
    }
  }

  console.log('\n=== Summary ===');
  console.log(`Success: ${successCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`Total: ${updates.length}`);
}

enrichContacts().then(() => process.exit(0)).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
