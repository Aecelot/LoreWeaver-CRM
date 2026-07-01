import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccountPath = path.resolve(__dirname, '../../service-account.json');
const serviceAccount = require(serviceAccountPath);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

// Contacts to update
const updates = [
  {
    name: 'Inkle (US presence)',
    contactEmail: 'contact@inklestudios.com',
    contactName: 'Jon Ingold',
  },
  {
    name: 'Mojiken Studio',
    contactEmail: 'contact@mojikenstudio.com',
    contactName: 'Elwin Lysander',
  },
  {
    name: 'Failbetter Games',
    contactEmail: 'enquiries@failbettergames.com',
    contactName: '',
  },
  {
    name: 'Simogo',
    contactEmail: 'info@simogo.com',
    contactName: 'Simon Flesser',
  },
  {
    name: 'Paintbucket Games',
    contactEmail: 'info@paintbucket.de',
    contactName: '',
  },
  {
    name: 'Cardboard Computer',
    contactEmail: 'hello@cardboard.computer',
    contactName: 'Jake Elliott',
  },
];

async function main() {
  for (const update of updates) {
    // Find lead by name
    const snap = await db.collection('leads')
      .where('name', '==', update.name)
      .limit(1)
      .get();
    
    if (snap.empty) {
      console.log(`NOT FOUND: ${update.name}`);
      continue;
    }
    
    const doc = snap.docs[0];
    const data = doc.data();
    
    // Update contact info
    await doc.ref.update({
      'contact.email': update.contactEmail,
      'contact.name': update.contactName || data.contact?.name || '',
      updatedAt: admin.firestore.Timestamp.now(),
    });
    
    console.log(`UPDATED: ${update.name} -> ${update.contactEmail}`);
  }
  
  console.log('\nDone!');
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
