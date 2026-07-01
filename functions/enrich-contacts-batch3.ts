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
    id: '1FL5aRgkBlF7EuevZMUG',
    name: 'Wolffun Game',
    updates: {
      email: 'contact@wolffungame.com',
      linkedin: 'https://sg.linkedin.com/company/wolffun-game',
      notes: 'HR contacts: tuyet@wolffungame.com, hong@wolffungame.com'
    }
  },
  {
    id: '2KrGQo9u53V11dNqHCrY',
    name: 'TaleWorlds Entertainment',
    updates: {
      email: 'info@taleworlds.com',
      notes: 'Press/PR: pr@taleworlds.com. Jobs: jobs@taleworlds.com. Format: first.last@taleworlds.com'
    }
  },
  {
    id: '03ta99ggGtdFEHHMqh3l',
    name: 'GihOt',
    updates: {
      notes: 'Email format: ***@gihot.vn. Part of GOSUVERSE. Vietnam Game Awards 2025 winner.'
    }
  }
];

async function enrichContacts() {
  console.log('=== CRM Contact Enrichment Batch 3 ===');
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
        'meta.enrichmentSource': 'automated-batch3-2026-03-24'
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
