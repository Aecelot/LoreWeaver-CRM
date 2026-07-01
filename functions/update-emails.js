const admin = require('firebase-admin');
const serviceAccount = require('../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Emails found from research on 2026-03-24
const emailUpdates = [
  { name: 'Bromio', email: 'info@bromio.com.mx' },
  { name: 'Steer Studios', email: 'customersupport@steerstudios.com' },
  { name: 'tecHouse Games', email: 'info@techousegames.com' },
  { name: 'Tencent Games', email: 'info@tencent.com' },
  { name: 'Iconic', email: 'junaid@iconicgames.co' },
  { name: 'Articy:Draft', email: 'support@articy.com' },
  { name: 'Kanka', email: 'hello@kanka.io' },
  { name: 'Infinite Life Simulation', email: 'admin@infinitelifesimulation.com' },
  { name: 'Milanote', email: 'support@milanote.com' }
];

async function updateEmails() {
  const batch = db.batch();
  let updatedCount = 0;
  let notFoundCount = 0;
  
  for (const update of emailUpdates) {
    // Find lead by name
    const snapshot = await db.collection('leads')
      .where('name', '==', update.name)
      .limit(1)
      .get();
    
    if (snapshot.empty) {
      console.log(`NOT FOUND: ${update.name}`);
      notFoundCount++;
      continue;
    }
    
    const doc = snapshot.docs[0];
    const currentData = doc.data();
    
    // Update contact.email field
    const updateData = {
      contact: {
        ...currentData.contact,
        email: update.email
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    batch.update(doc.ref, updateData);
    console.log(`UPDATED: ${update.name} -> ${update.email}`);
    updatedCount++;
  }
  
  await batch.commit();
  
  console.log('\n=== SUMMARY ===');
  console.log(`Updated: ${updatedCount}`);
  console.log(`Not Found: ${notFoundCount}`);
}

updateEmails().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
