import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccountPath = path.resolve(__dirname, '../../service-account.json');
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

interface EmailUpdate {
  id: string;
  name: string;
  email: string;
}

const updates: EmailUpdate[] = [
  // Larian Studios - press email for narrative lead
  { id: 'ipjPGOmCU4mgyYkyWzab', name: 'Larian Studios', email: 'press@larian.com' },
  
  // Inkle Studios
  { id: 'z6CrmxeITgJhUAQmGhzk', name: 'Inkle Studios', email: 'info@inklestudios.com' },
  
  // The Chinese Room
  { id: 'Ak1Q7BqALqTRQL6sUCo7', name: 'The Chinese Room', email: 'contact@thechineseroom.co.uk' },
  
  // Hazelight Studios
  { id: 'e5fqo2kKh6difkT3mEim', name: 'Hazelight Studios', email: 'contact@hazelight.se' },
  
  // Sabotage Studio
  { id: 'E7CUMOw4afJBpLj2UmNa', name: 'Sabotage Studio', email: 'info@sabotagestudio.com' },
  
  // Cellar Door Games - specific business contact
  { id: '8pbzqi1Y08ns6QivQPU6', name: 'Cellar Door Games', email: 'ryan.lee@cellardoorgames.com' },
  
  // Spiders
  { id: '5LWsgi0FmBn1XsRW850U', name: 'Spiders', email: 'contact@spiders-games.com' },
  
  // Daedalic Entertainment
  { id: 'Is5bYKqhl1UBtoxDtVwq', name: 'Daedalic Entertainment', email: 'scouting@daedalic.com' },
  
  // Supergiant Games - no direct email (contact form only)
  // { id: 'zEwsXVEs7roDn9HxjdEA', name: 'Supergiant Games', email: '' },
  
  // Kaigan Games - no direct email (contact form only)
  // { id: '3B9A1eu3g2d53FpdsID0', name: 'Kaigan Games', email: '' },
  
  // Guerrilla Games - no direct email (Sony first-party, form only)
  // { id: 'IQcbmtGs1LlkIEstq1Yy', name: 'Guerrilla Games', email: '' },
];

async function updateLeadEmails() {
  console.log(`Updating ${updates.length} leads with contact emails...`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const update of updates) {
    try {
      const docRef = db.collection('leads').doc(update.id);
      const doc = await docRef.get();
      
      if (!doc.exists) {
        console.log(`❌ Lead not found: ${update.name} (${update.id})`);
        errorCount++;
        continue;
      }
      
      // Update contact email
      await docRef.update({
        'contact.email': update.email,
        'updatedAt': admin.firestore.FieldValue.serverTimestamp()
      });
      
      console.log(`✅ Updated: ${update.name} -> ${update.email}`);
      successCount++;
    } catch (err) {
      console.error(`❌ Error updating ${update.name}:`, err);
      errorCount++;
    }
  }
  
  console.log(`\nResults: ${successCount} updated, ${errorCount} errors`);
}

updateLeadEmails()
  .then(() => process.exit(0))
  .catch((err: Error) => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
