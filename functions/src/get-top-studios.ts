import * as admin from 'firebase-admin';
import * as path from 'path';
import * as fs from 'fs';

const serviceAccountPath = path.resolve(__dirname, '../../service-account.json');
const serviceAccount = require(serviceAccountPath);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function main() {
  const snap = await db.collection('leads')
    .where('type', '==', 'studio')
    .get();
  
  const studios = snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  
  // Sort by fit score
  studios.sort((a: any, b: any) => (b.studio?.fitScore || 0) - (a.studio?.fitScore || 0));
  
  // Take top 30
  const top30 = studios.slice(0, 30);
  
  // Output for research
  console.log('Top 30 Studios for Contact Research:\n');
  
  const researchList: any[] = [];
  
  top30.forEach((s: any, i: number) => {
    console.log(`${i + 1}. ${s.name}`);
    console.log(`   Website: ${s.website || 'N/A'}`);
    console.log(`   Games: ${s.studio?.games?.join(', ') || 'N/A'}`);
    console.log(`   Focus: ${s.studio?.focus || 'N/A'}`);
    console.log(`   Fit Score: ${s.studio?.fitScore || 'N/A'}`);
    console.log('');
    
    researchList.push({
      id: s.id,
      name: s.name,
      website: s.website || '',
      games: s.studio?.games || [],
      focus: s.studio?.focus || '',
      fitScore: s.studio?.fitScore || 0,
      // Fields to research:
      contactEmail: '',
      contactName: '',
      firstName: '',
      customLine: ''
    });
  });
  
  // Save to JSON for research
  const outPath = path.resolve(__dirname, '../../top30-studios-research.json');
  fs.writeFileSync(outPath, JSON.stringify(researchList, null, 2));
  console.log(`\nSaved to: ${outPath}`);
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
