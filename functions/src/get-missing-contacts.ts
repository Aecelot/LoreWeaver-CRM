import * as admin from 'firebase-admin';

const serviceAccount = require('../../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function getStudiosWithoutContacts() {
  console.log('Querying leads and contacts...');
  
  // Get all lead IDs that have contacts
  const leadContactsSnapshot = await db.collection('leadContacts').get();
  const leadsWithContacts = new Set(leadContactsSnapshot.docs.map(doc => doc.data().leadId));
  console.log(`Leads with contacts: ${leadsWithContacts.size}`);
  
  // Get high-fitScore leads
  const leadsSnapshot = await db.collection('leads')
    .orderBy('icpScore', 'desc')
    .limit(500)
    .get();
  
  console.log(`Checked top ${leadsSnapshot.size} leads by ICP score`);
  
  // Filter to those without contacts and with valid website
  const studios = leadsSnapshot.docs
    .map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.company,
        website: data.website || '',
        icpScore: data.icpScore,
        country: data.country,
        region: data.region,
        type: data.type,
        hasContact: leadsWithContacts.has(doc.id)
      };
    })
    .filter(s => !s.hasContact && s.website && !s.website.includes('discord.gg'))
    .slice(0, 25);
  
  console.log(`\nStudios missing contacts (${studios.length}):\n`);
  studios.forEach((s, i) => {
    console.log(`${i+1}. ${s.name} (ICP: ${s.icpScore}) - ${s.country}`);
    console.log(`   ${s.website}`);
  });
  
  console.log('\n--- JSON ---');
  console.log(JSON.stringify(studios, null, 2));
}

getStudiosWithoutContacts().catch(e => console.error('Error:', e));
