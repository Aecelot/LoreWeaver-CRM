import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = require('../../service-account.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function main() {
  // Get investor leads in "researched" stage
  const researchedSnap = await db.collection('leads')
    .where('type', '==', 'investor')
    .where('pipeline.stageId', '==', 'researched')
    .get();
  
  console.log(`\n=== RESEARCHED INVESTORS: ${researchedSnap.size} ===\n`);
  
  let withScore = 0;
  let withoutScore = 0;
  
  researchedSnap.forEach((doc) => {
    const data = doc.data();
    const score = data.investor?.fitScore;
    
    if (score !== undefined && score !== null) {
      withScore++;
    } else {
      withoutScore++;
      console.log(`NO SCORE: ${data.name} | ${data.investor?.type || 'no type'} | ${data.country || 'no country'}`);
    }
  });
  
  console.log(`\n--- Summary ---`);
  console.log(`With fitScore: ${withScore}`);
  console.log(`Without fitScore: ${withoutScore}`);
}

main().catch(console.error);
