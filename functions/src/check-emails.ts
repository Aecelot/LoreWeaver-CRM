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

async function main() {
  const snap = await db.collection('leads').get();
  let withEmail = 0;
  const byType: Record<string, { total: number; withEmail: number; examples: any[] }> = {};
  
  snap.docs.forEach(doc => {
    const data = doc.data();
    const type = data.type || 'unknown';
    
    if (!byType[type]) {
      byType[type] = { total: 0, withEmail: 0, examples: [] };
    }
    
    byType[type].total++;
    
    if (data.contact?.email) {
      withEmail++;
      byType[type].withEmail++;
      if (byType[type].examples.length < 5) {
        byType[type].examples.push({
          name: data.name,
          email: data.contact.email,
          contactName: data.contact.name
        });
      }
    }
  });
  
  console.log(`Total leads: ${snap.size}`);
  console.log(`Leads with email: ${withEmail}\n`);
  
  for (const [type, stats] of Object.entries(byType)) {
    console.log(`${type}: ${stats.withEmail}/${stats.total} with email`);
    if (stats.examples.length > 0) {
      stats.examples.forEach(e => {
        console.log(`  - ${e.name}: ${e.email} (${e.contactName || 'no contact name'})`);
      });
    }
  }
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
