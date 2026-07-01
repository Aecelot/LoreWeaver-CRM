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
    contactName?: string;
    contactRole?: string;
    notes?: string;
  };
}

const updates: ContactUpdate[] = [
  {
    id: '5s97oYipHUMwLRtkwn4n',
    name: 'Remedy Entertainment',
    updates: {
      email: 'press@remedygames.com',
      notes: 'Thomas Puha (Comms Director): thomas.puha@remedygames.com'
    }
  },
  {
    id: 'AjMqH3ztmDuyxt2UGdV1',
    name: 'Tequila Works',
    updates: {
      email: 'info@tequilaworks.com',
      notes: 'Press: Lara Rodriguez - lara.rodriguez@TequilaWorks.com'
    }
  },
  {
    id: '6hVD0S8pAOHjkdZfBQua',
    name: 'Moon Studios',
    updates: {
      email: 'thomas@moongamestudios.com',
      linkedin: 'https://linkedin.com/in/thomas-mahler-4076996'
    }
  },
  {
    id: 'BoOlw43KNufY2vDaFmCo',
    name: 'Ogre Head Studio',
    updates: {
      email: 'support@ogrehead.com',
      phone: '+91 8977 208794'
    }
  },
  {
    id: '8pbzqi1Y08ns6QivQPU6',
    name: 'Cellar Door Games',
    updates: {
      linkedin: 'https://linkedin.com/in/knelee/'
    }
  },
  {
    id: '5LWsgi0FmBn1XsRW850U',
    name: 'Spiders',
    updates: {
      linkedin: 'https://fr.linkedin.com/in/jehanne-rousseau-4699912',
      twitter: '@JehanneRousseau'
    }
  },
  {
    id: 'Ak1Q7BqALqTRQL6sUCo7',
    name: 'The Chinese Room',
    updates: {
      linkedin: 'https://linkedin.com/company/the-chinese-room-ltd/',
      twitter: '@ChineseRoom'
    }
  },
  {
    id: 'ANjWGgNo1AhG3UuUW7b7',
    name: 'Capricia Productions',
    updates: {
      phone: '+972-50-8445759'
    }
  },
  {
    id: '3B9A1eu3g2d53FpdsID0',
    name: 'Kaigan Games',
    updates: {
      linkedin: 'https://linkedin.com/company/kaigan-games-entertainment'
    }
  }
];

async function enrichContacts() {
  console.log('=== CRM Contact Enrichment ===');
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
      
      // Build the update object
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
      if (update.updates.contactName) {
        contactUpdate.name = update.updates.contactName;
      }
      if (update.updates.contactRole) {
        contactUpdate.role = update.updates.contactRole;
      }

      // Build notes update
      let notesUpdate: any = {};
      if (update.updates.notes) {
        notesUpdate.enrichmentNotes = update.updates.notes;
      }

      // Update the document
      await docRef.update({
        contact: contactUpdate,
        ...notesUpdate,
        'meta.enrichedAt': admin.firestore.FieldValue.serverTimestamp(),
        'meta.enrichmentSource': 'automated-batch-2026-03-24'
      });

      console.log(`✅ ${update.name}: Updated`);
      if (update.updates.email) console.log(`   Email: ${update.updates.email}`);
      if (update.updates.phone) console.log(`   Phone: ${update.updates.phone}`);
      if (update.updates.linkedin) console.log(`   LinkedIn: ${update.updates.linkedin}`);
      if (update.updates.twitter) console.log(`   Twitter: ${update.updates.twitter}`);
      
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
