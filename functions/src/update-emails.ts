import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

interface EmailUpdate {
  id: string;
  name: string;
  email: string;
}

const updates: EmailUpdate[] = [
  { id: '1bDuhYqWYSsV1kxFaNZM', name: 'NeoBards Entertainment', email: 'recruiting@neobards.com' },
];

async function updateEmails() {
  console.log(`Updating ${updates.length} leads with email addresses...`);
  
  for (const update of updates) {
    try {
      const docRef = db.collection('leads').doc(update.id);
      const doc = await docRef.get();
      
      if (!doc.exists) {
        console.log(`❌ ${update.name}: Document not found`);
        continue;
      }
      
      await docRef.update({
        'contact.email': update.email,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      console.log(`✅ ${update.name}: Updated with ${update.email}`);
    } catch (err) {
      console.error(`❌ ${update.name}: Error - ${err}`);
    }
  }
  
  console.log('Done!');
  process.exit(0);
}

updateEmails().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
