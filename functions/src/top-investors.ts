import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = require('../../service-account.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function main() {
  const investorsSnap = await db.collection('leads')
    .where('type', '==', 'investor')
    .get();
  
  const scored: Array<{name: string, score: number, type: string, country: string, contact: string, website: string}> = [];
  
  investorsSnap.forEach((doc) => {
    const data = doc.data();
    const score = data.investor?.fitScore;
    
    if (score !== undefined && score !== null) {
      scored.push({
        name: data.name || 'Unknown',
        score: score,
        type: data.investor?.type || 'N/A',
        country: data.country || 'N/A',
        contact: data.contact?.email || data.contact?.linkedin || 'No contact',
        website: data.website || 'N/A'
      });
    }
  });
  
  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);
  
  console.log('\n=== INVESTOR LEADS #11-20 ===\n');
  
  scored.slice(10, 20).forEach((inv, i) => {
    console.log(`${i + 11}. ${inv.name} — Score: ${inv.score}`);
    console.log(`   Stage: ${inv.type}`);
    console.log(`   Country: ${inv.country}`);
    console.log(`   Contact: ${inv.contact}`);
    console.log(`   Website: ${inv.website}`);
    console.log('');
  });
}

main().catch(console.error);
