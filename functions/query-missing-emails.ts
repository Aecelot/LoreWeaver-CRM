import * as admin from 'firebase-admin';
const serviceAccount = require('../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function getLeadsMissingEmail() {
  try {
    // Get all studios
    const snapshot = await db.collection('leads')
      .where('type', '==', 'studio')
      .get();
    
    const highPriority: any[] = [];  // Has contact name but no email
    const withWebsite: any[] = [];   // Has website but no email
    const other: any[] = [];
    
    snapshot.forEach(doc => {
      const data = doc.data();
      // Check if contact.email is missing or empty
      if (!data.contact?.email) {
        const lead = {
          id: doc.id,
          name: data.name,
          website: data.website,
          fitScore: data.fitScore || 0,
          country: data.country,
          contact: data.contact || {}
        };
        
        // Prioritize leads with contact names (easier to find)
        if (data.contact?.name) {
          highPriority.push(lead);
        } else if (data.website) {
          withWebsite.push(lead);
        } else {
          other.push(lead);
        }
      }
    });
    
    // Sort each by fitScore, combine
    highPriority.sort((a, b) => (b.fitScore || 0) - (a.fitScore || 0));
    withWebsite.sort((a, b) => (b.fitScore || 0) - (a.fitScore || 0));
    
    const results = [...highPriority.slice(0, 15), ...withWebsite.slice(0, 10)];
    
    console.log('Total missing email:', snapshot.size - (snapshot.size - highPriority.length - withWebsite.length - other.length));
    console.log('High priority (has contact name):', highPriority.length);
    console.log('With website:', withWebsite.length);
    console.log('\n--- TOP 20 TO ENRICH ---\n');
    console.log(JSON.stringify(results.slice(0, 20), null, 2));
  } catch (err) {
    console.error('Error:', err);
  }
}

getLeadsMissingEmail().then(() => process.exit(0));
