const admin = require('firebase-admin');
const serviceAccount = require('../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const updates = [
  {
    id: 'DRticizNAFkW5sBQNbCM',
    company: 'Ghost Story Games',
    email: 'Community@GhostStoryGames.com',
    source: 'ghoststorygames.com/contact'
  },
  {
    id: 'CvBygRLJaTD6iREIzpE3',
    company: 'Screen Burn Interactive',
    email: 'hello@screenburn.com',
    source: 'screenburn.com'
  },
  {
    id: '7hzYJZQJzQOSYEEJUNXI',
    company: 'Black Shamrock',
    email: 'dublinoffice@virtuosgames.com',
    source: 'black-shamrock.com/contact-us'
  },
  {
    id: 'AH4EC5uFPi5H9vrc7A1W',
    company: 'Niila Games',
    email: 'contact@niila.io',
    source: 'niila.io'
  },
  {
    id: 'AR15OLj8Pcm9GAAdsDWT',
    company: 'Woodsy Studio',
    email: 'jenny@woodsy-studio.com',
    source: 'woodsy-studio.com/about-us'
  },
  {
    id: '9RRHvBwa6ebmQMOXutRB',
    company: 'Caracal Games',
    email: 'info@caracalgames.com',
    source: 'caracalgames.com'
  }
];

async function updateContacts() {
  const batch = db.batch();
  
  for (const update of updates) {
    const docRef = db.collection('leads').doc(update.id);
    batch.update(docRef, {
      'contact.email': update.email,
      'contact.emailSource': update.source,
      'contact.emailFoundAt': new Date().toISOString()
    });
    console.log(`Queued update for ${update.company}: ${update.email}`);
  }
  
  await batch.commit();
  console.log('\nBatch update complete! Updated', updates.length, 'leads.');
}

updateContacts().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
