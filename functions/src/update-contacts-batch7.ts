import * as admin from 'firebase-admin';
const serviceAccount = require('../../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Contact enrichment batch 7 - found emails
const contactUpdates = [
  {
    id: 'UjF2fSrQakrDarbvIdJB',  // Out of the Blue
    email: 'info@outbluegames.com',
    name: 'Out of the Blue'
  },
  {
    id: 'rVitRSEfJDH9UYdhKU0P',  // Alterego Games
    email: 'info@alteregogames.com',
    name: 'Alterego Games'
  },
  {
    id: 'q7AsphotZEHkRSz2IQNO',  // KING Art Games
    email: 'pr@kingart-games.com',
    name: 'KING Art Games'
  },
  {
    id: 'EwzlCWmupEH1EDMgkdIv',  // Black Cube Games
    email: 'info@blackcubegames.com',
    name: 'Black Cube Games'
  },
  {
    id: '6yb9mX1CfEGqEI3VoDXU',  // MiTale
    email: 'contact@mitale.fi',
    name: 'MiTale'
  }
];

// Studios researched but no direct email found (form only or corporate-owned)
const noEmailFound = [
  { id: 'EhflS3FBSoOoIS79gCKT', name: 'Asobo Studio', reason: 'Contact form only' },
  { id: '0IE7vOyc3TkWrxwMPALy', name: 'Acquire', reason: 'Contact form only (Japanese)' },
  { id: 'Zn2DmlvoybyltGTjY1MZ', name: 'DigixArt', reason: 'THQ Nordic owned, no direct contact' },
  { id: 'DY1jzA5uvr8xd2vbOlIG', name: 'Night School Studio', reason: 'Netflix owned, no direct contact' },
  { id: '0xlZoopnI3N5oG1RhyDL', name: 'Nanobit', reason: 'Contact form only' },
  { id: '1bDuhYqWYSsV1kxFaNZM', name: 'NeoBards Entertainment', reason: 'Contact form only' }
];

async function updateContacts() {
  console.log('=== CRM Contact Enrichment Batch 7 ===');
  console.log(`Date: ${new Date().toISOString()}`);
  console.log('');
  
  // Update studios with found emails
  console.log('Updating contacts with emails:');
  for (const update of contactUpdates) {
    try {
      await db.collection('leads').doc(update.id).update({
        'contact.email': update.email,
        'contactResearched': true,
        'contactResearchedAt': new Date().toISOString(),
        'contactResearchedBy': 'skel-cron-batch7'
      });
      console.log(`✓ ${update.name}: ${update.email}`);
    } catch (error: any) {
      console.error(`✗ ${update.name}: ${error.message}`);
    }
  }
  
  console.log('');
  
  // Mark studios as researched (no email found)
  console.log('Marking as researched (no direct email):');
  for (const studio of noEmailFound) {
    try {
      await db.collection('leads').doc(studio.id).update({
        'contactResearched': true,
        'contactResearchedAt': new Date().toISOString(),
        'contactResearchedBy': 'skel-cron-batch7',
        'contactResearchNotes': studio.reason
      });
      console.log(`✓ ${studio.name}: ${studio.reason}`);
    } catch (error: any) {
      console.error(`✗ ${studio.name}: ${error.message}`);
    }
  }
  
  console.log('');
  console.log('=== Summary ===');
  console.log(`Emails added: ${contactUpdates.length}`);
  console.log(`Marked as researched (no email): ${noEmailFound.length}`);
  console.log(`Total processed: ${contactUpdates.length + noEmailFound.length}`);
}

updateContacts().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
