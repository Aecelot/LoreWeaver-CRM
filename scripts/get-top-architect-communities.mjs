import admin from 'firebase-admin';
import { readFileSync } from 'fs';

const sa = JSON.parse(readFileSync('./service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

async function main() {
  // Get all architect-tagged community leads
  const snapshot = await db.collection('leads')
    .where('type', '==', 'community')
    .where('tags', 'array-contains', 'architect')
    .get();
  
  const leads = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  
  // Sort by fit score descending
  leads.sort((a, b) => (b.community?.fitScore || 0) - (a.community?.fitScore || 0));
  
  // Top 20
  const top20 = leads.slice(0, 20);
  
  console.log('# Top 20 Architect Community Leads by Fit Score\n');
  console.log('| Rank | Name | Score | Reach | Platform | Category |');
  console.log('|------|------|-------|-------|----------|----------|');
  
  top20.forEach((lead, i) => {
    const score = lead.community?.fitScore || 0;
    const reach = lead.community?.estimatedReach?.toLocaleString() || '?';
    const platform = lead.community?.platform || '?';
    const category = lead.community?.communityType || '?';
    console.log(`| ${i + 1} | ${lead.name} | ${score} | ${reach} | ${platform} | ${category} |`);
  });
  
  console.log('\n## Details\n');
  
  top20.forEach((lead, i) => {
    console.log(`### ${i + 1}. ${lead.name}`);
    console.log(`- **ID:** ${lead.id}`);
    console.log(`- **Fit Score:** ${lead.community?.fitScore || 0}`);
    console.log(`- **Reach:** ${lead.community?.estimatedReach?.toLocaleString() || '?'}`);
    console.log(`- **Platform:** ${lead.community?.platform || '?'}`);
    console.log(`- **URL:** ${lead.community?.platformUrl || lead.website || 'N/A'}`);
    console.log(`- **Access:** ${lead.community?.accessMethod || '?'}`);
    console.log(`- **Notes:** ${lead.notes || 'None'}`);
    console.log(`- **Tags:** ${lead.tags?.join(', ') || 'None'}`);
    console.log('');
  });
  
  process.exit(0);
}

main();
