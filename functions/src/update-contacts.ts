import * as admin from 'firebase-admin';
import * as fs from 'fs';

// Initialize Firebase Admin
const serviceAccount = JSON.parse(
  fs.readFileSync('C:\\Users\\rijkg\\OneDrive\\Documenten\\GitHub\\LoreWeaver-CRM\\service-account.json', 'utf8')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Contacts found via enrichment research - March 24, 2026
const updates = [
  { id: '2Jn2UdZY6i868txUNIuw', name: 'sunset visitor', email: 'hello@sunsetvisitor.studio' },
  { id: 'CDAElwycF00Vt1VNkELf', name: 'Squeaky Wheel', email: 'ryan@squeakywheel.ph' },
  { id: '7H78xJt4VOSrIiSSUEfR', name: 'Rockhead Studios', email: 'contact@rockheadgames.com' },
  { id: 'BRw3bYa6fVic78aWvyXj', name: 'Nour: Play With Light team', email: 'help@food.game' },
  { id: 'DY1jzA5uvr8xd2vbOlIG', name: 'Night School Studio', email: 'oxenfree@nightschoolstudio.com' },
  { id: 'DsMIxEabnaQSDg04soBb', name: 'RealityArts Studio', email: 'info@realityartsstudio.com' },
  { id: '62G0mfan41oQXhWSm3ZL', name: 'Naughty Dog', email: 'ndi-dog@naughtydog.com' },
  { id: 'CO1vi6g2SpT831yVBt8I', name: 'Dragon Game Studio', email: 'info@dragongamestudio.com' },
];

async function updateContacts() {
  const batch = db.batch();
  
  for (const update of updates) {
    const docRef = db.collection('leads').doc(update.id);
    batch.update(docRef, {
      'contact.email': update.email,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log(`Queued: ${update.name} -> ${update.email}`);
  }
  
  await batch.commit();
  console.log(`\n✓ Updated ${updates.length} contact emails in CRM`);
}

updateContacts().then(() => process.exit(0)).catch((err: any) => {
  console.error('Error updating contacts:', err);
  process.exit(1);
});
