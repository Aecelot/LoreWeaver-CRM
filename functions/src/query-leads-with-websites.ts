import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccountPath = path.resolve(__dirname, '../../service-account.json');
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function getLeadsWithWebsites() {
  console.log('Querying Firebase for enrichable leads...');
  
  const snapshot = await db.collection('leads')
    .where('type', '==', 'studio')
    .get();
  
  console.log(`Found ${snapshot.size} total studio leads`);
  
  const leads: any[] = [];
  snapshot.forEach((doc: admin.firestore.QueryDocumentSnapshot) => {
    const data = doc.data();
    // Get leads missing email but WITH a website
    if (!data.contact?.email && data.website) {
      // Score for prioritization: prefer leads with partial contact info
      let priority = 0;
      if (data.contact?.name) priority += 2;
      if (data.contact?.linkedin) priority += 2;
      if (data.contact?.role) priority += 1;
      if (data.fitScore > 0) priority += data.fitScore;
      
      leads.push({
        id: doc.id,
        name: data.name,
        website: data.website,
        fitScore: data.fitScore || 0,
        country: data.country,
        contact: data.contact || {},
        priority
      });
    }
  });
  
  console.log(`${leads.length} leads with websites missing email`);
  
  // Sort by priority descending
  leads.sort((a, b) => b.priority - a.priority);
  const top25 = leads.slice(0, 25);
  
  console.log('\nTop 25 leads to enrich (prioritized):');
  console.log(JSON.stringify(top25, null, 2));
  
  return top25;
}

getLeadsWithWebsites()
  .then(() => process.exit(0))
  .catch((err: Error) => {
    console.error('Error:', err);
    process.exit(1);
  });
