import * as admin from 'firebase-admin';
const serviceAccount = require('../../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

interface ContactUpdate {
  id: string;
  name: string;
  email: string;
  source?: string;
}

const updates: ContactUpdate[] = [
  {
    id: "N92rcqEKlo5mAhDo3sl5",
    name: "Dead Mage",
    email: "info@deadmage.com",
    source: "Website footer"
  },
  {
    id: "JkxMkH6g5yA0GnIWDNql",
    name: "Mad Head Games",
    email: "contact@madheadgames.com",
    source: "Website contact page"
  },
  {
    id: "UiLzYuJ8eWIjDCa26mNJ",
    name: "Persona Theory Games",
    email: "hello@personatheory.com",
    source: "Website contact page"
  },
  {
    id: "OUmRtuCzcGTnfqO6jgWB",
    name: "Sandfall Interactive",
    email: "contact@sandfall.co",
    source: "Website legal page"
  },
  {
    id: "YeNVVqjV4D2bcNzcedDo",
    name: "Behold Studios",
    email: "contato@beholdstudios.com.br",
    source: "Crunchbase"
  },
  {
    id: "HEgo2QHyQwArilgMPkJr",
    name: "Sea Monster Entertainment",
    email: "asavela@seamonster.digital",
    source: "Website (business queries)"
  }
];

// Studios researched but no email found - mark as researched
const noEmailFound: string[] = [
  "TVXHqQME767aWDuT9AkR", // Papergames - website broken
  "ELUQ5CxZatP0H9rtFDjR", // Nyamakop - form only
  "TiwUSl5MK2cw1krJTvxf", // PortBliss - no contact
  "TpQ6P6dPlO3bNwuNtgss", // Pine Studio - form only
  "KwZULkv9j5kD9GH5sPHG", // Devespresso Games - DNS error
  "YQZGF6Kw3EO0dLbdtg2I", // BEEZ Agency - DNS error
  "DsMIxEabnaQSDg04soBb", // RealityArts Studio - no email
  "IQcbmtGs1LlkIEstq1Yy", // Guerrilla Games - Sony first-party
  "LvRplB3PXKToWYqAPyf7", // Archmage Games - no email
  "NNVFK58GT0plyH4vS2et", // Archmage Games (duplicate)
  "MKk114apTLRTJc24qrZs", // QUICKFIRE Games - wrong website
  "NSmXkSWlFIOypo8bMt9Q", // Compile Heart - Japanese form only
  "OOWpM326xAnYXrWUSz0r", // Gravity Co. - Korean, no public email
  "RDoOlWPJm8smDldOJ7X2", // CoinFlip Games - website down
];

async function updateContacts() {
  const batch = db.batch();
  const now = admin.firestore.FieldValue.serverTimestamp();
  
  // Update studios with found emails
  for (const update of updates) {
    const ref = db.collection('leads').doc(update.id);
    batch.update(ref, {
      'contact.email': update.email,
      'contactResearched': true,
      'contactResearchedAt': now,
      'enrichmentNotes': `Email found via ${update.source}. Batch 28.`,
      'updatedAt': now
    });
    console.log(`✓ ${update.name}: ${update.email}`);
  }
  
  // Mark studios as researched (no email found)
  for (const id of noEmailFound) {
    const ref = db.collection('leads').doc(id);
    batch.update(ref, {
      'contactResearched': true,
      'contactResearchedAt': now,
      'enrichmentNotes': 'Contact researched - no public email found. Batch 28.',
      'updatedAt': now
    });
  }
  console.log(`Marked ${noEmailFound.length} studios as researched (no email)`);
  
  await batch.commit();
  console.log(`\n✓ Updated ${updates.length} studios with emails`);
  console.log(`✓ Marked ${noEmailFound.length} studios as researched`);
  console.log(`Total processed: ${updates.length + noEmailFound.length}`);
}

updateContacts().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
