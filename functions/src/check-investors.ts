import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = require('../../service-account.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function main() {
  // Get all investor leads
  const investorsSnap = await db.collection('leads').where('type', '==', 'investor').get();
  
  console.log(`\n=== INVESTOR LEADS: ${investorsSnap.size} total ===\n`);
  
  let withScore = 0;
  let withoutScore = 0;
  const scoreDistribution: Record<string, number> = {};
  
  investorsSnap.forEach((doc) => {
    const data = doc.data();
    const score = data.investor?.fitScore;
    
    if (score !== undefined && score !== null) {
      withScore++;
      const bucket = Math.floor(score / 10) * 10;
      scoreDistribution[`${bucket}-${bucket+9}`] = (scoreDistribution[`${bucket}-${bucket+9}`] || 0) + 1;
    } else {
      withoutScore++;
    }
  });
  
  console.log(`With fitScore: ${withScore}`);
  console.log(`Without fitScore: ${withoutScore}`);
  console.log(`\nScore distribution:`, scoreDistribution);
  
  // Get pipelines
  const pipelinesSnap = await db.collection('pipelines').get();
  console.log(`\n=== PIPELINES ===\n`);
  pipelinesSnap.forEach((doc) => {
    const data = doc.data();
    console.log(`${doc.id}: ${data.name} (type: ${data.type})`);
    if (data.stages) {
      data.stages.forEach((s: { id: string; name: string }) => console.log(`  - ${s.id}: ${s.name}`));
    }
  });
  
  // Sample some investors without scores
  console.log(`\n=== SAMPLE INVESTORS WITHOUT SCORE ===\n`);
  let count = 0;
  investorsSnap.forEach((doc) => {
    if (count >= 5) return;
    const data = doc.data();
    if (!data.investor?.fitScore) {
      console.log(`- ${data.name} | ${data.investor?.type || 'no type'} | ${data.status}`);
      count++;
    }
  });
}

main().catch(console.error);
