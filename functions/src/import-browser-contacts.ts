import * as admin from 'firebase-admin';

const serviceAccount = require('../../service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const updates = [
  { name: "Fool's Theory", email: "biz@foolstheory.com", notes: "Also: media@foolstheory.com for press" },
  { name: "Out of the Blue", email: "info@outbluegames.com" },
  { name: "Supercell Investments", email: "media@supercell.com", notes: "Media/press only - use contact form for pitches" },
  { name: "Behold Studios", email: "contato@beholdstudios.com.br", contactName: "Saulo Camarotti", contactRole: "Founder" },
  { name: "ACE Team", email: "business@aceteam.cl", notes: "Also: contact@aceteam.cl for general/press" },
  { name: "Sea Monster Entertainment", email: "hello@seamonster.digital" },
  { name: "Sandfall Interactive", email: "contact@sandfall.co", contactName: "Guillaume Broche", contactRole: "CEO & Creative Director" },
  { name: "Kurechii", email: "business@kurechii.com" },
];

async function importContacts() {
  console.log(`Importing ${updates.length} browser-found contacts...`);
  
  let updated = 0, notFound = 0;
  
  for (const update of updates) {
    const snapshot = await db.collection('leads').get();
    let found: admin.firestore.QueryDocumentSnapshot | null = null;
    
    for (const doc of snapshot.docs) {
      const data = doc.data();
      const name = (data.name || data.company || '').toLowerCase();
      if (name.includes(update.name.toLowerCase()) || update.name.toLowerCase().includes(name)) {
        found = doc;
        break;
      }
    }
    
    if (!found) {
      console.log(`  NOT FOUND: ${update.name}`);
      notFound++;
      continue;
    }
    
    const updateData: any = {
      email: update.email,
      contactEmail: update.email,
      contactEnriched: true,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    if (update.contactName) updateData.contactName = update.contactName;
    if (update.contactRole) updateData.contactRole = update.contactRole;
    if (update.notes) {
      const existing = found.data().notes || '';
      updateData.notes = existing ? `${existing}\n\n${update.notes}` : update.notes;
    }
    
    await found.ref.update(updateData);
    console.log(`  UPDATED: ${update.name} -> ${update.email}`);
    updated++;
  }
  
  console.log(`\nDone: ${updated} updated, ${notFound} not found`);
  process.exit(0);
}

importContacts().catch(err => { console.error(err); process.exit(1); });
