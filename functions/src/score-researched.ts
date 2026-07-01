import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = require('../../service-account.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

// Scoring criteria for LoreWeaver (€550K raise, gaming/AI, EU-focus)
function calculateFitScore(data: any): number {
  let score = 0;
  
  const investorData = data.investor || {};
  const name = (data.name || '').toLowerCase();
  const description = (investorData.description || '').toLowerCase();
  const focus = (investorData.focus || []).map((f: string) => f.toLowerCase());
  const portfolio = (investorData.portfolio || []).map((p: string) => p.toLowerCase());
  const stages = (investorData.type || '').toLowerCase();
  const country = (data.country || '').toLowerCase();
  const checkSize = investorData.checkSize || '';
  const contact = data.contact || {};
  
  // 1. Gaming/AI Focus (+30 max)
  const gamingKeywords = ['gaming', 'games', 'game', 'interactive', 'entertainment', 'esports', 'metaverse'];
  const aiKeywords = ['ai', 'artificial intelligence', 'machine learning', 'ml', 'generative', 'llm'];
  const creativeKeywords = ['creative', 'media', 'content', 'storytelling', 'narrative'];
  
  const allText = `${name} ${description} ${focus.join(' ')} ${portfolio.join(' ')}`;
  
  if (gamingKeywords.some(k => allText.includes(k))) score += 20;
  if (aiKeywords.some(k => allText.includes(k))) score += 15;
  if (creativeKeywords.some(k => allText.includes(k))) score += 10;
  // Cap at 30
  score = Math.min(score, 30);
  let focusScore = score;
  score = focusScore;
  
  // 2. Stage Match (+25 max) - Pre-seed/Seed ideal for €550K
  if (stages.includes('pre-seed') || stages.includes('preseed')) score += 15;
  if (stages.includes('seed')) score += 15;
  if (stages.includes('series a')) score += 5; // Less ideal but acceptable
  // Cap stage contribution
  score = Math.min(score, focusScore + 25);
  
  // 3. Geographic Fit (+20 max) - EU priority, then US/UK
  const euCountries = ['netherlands', 'germany', 'france', 'finland', 'sweden', 'denmark', 'norway', 
    'belgium', 'austria', 'spain', 'italy', 'portugal', 'poland', 'estonia', 'luxembourg', 
    'ireland', 'switzerland', 'czechia', 'czech republic', 'romania', 'hungary', 'bulgaria'];
  const tier1Countries = ['united kingdom', 'uk', 'united states', 'us', 'usa'];
  
  if (euCountries.some(c => country.includes(c))) score += 20;
  else if (tier1Countries.some(c => country.includes(c))) score += 15;
  else if (country) score += 5;
  
  // 4. Check Size Match (+15 max) - €550K round
  const checkLower = checkSize.toLowerCase();
  // Ideal: €100K-€1M range investors
  if (checkLower.includes('250k') || checkLower.includes('500k') || checkLower.includes('100k')) score += 15;
  else if (checkLower.includes('1m') || checkLower.includes('1.5m') || checkLower.includes('€1')) score += 10;
  else if (checkLower.includes('5m') || checkLower.includes('$5')) score += 5;
  else if (checkSize) score += 3;
  
  // 5. Contact Info (+10 max)
  if (contact.email && contact.email.length > 0) score += 7;
  if (contact.linkedin && contact.linkedin.length > 0) score += 3;
  
  // Ensure score is 0-100
  return Math.min(100, Math.max(0, score));
}

async function main() {
  // Get researched investors without scores
  const researchedSnap = await db.collection('leads')
    .where('type', '==', 'investor')
    .where('pipeline.stageId', '==', 'researched')
    .get();
  
  console.log(`\nScoring researched investors...\n`);
  
  let updated = 0;
  let skipped = 0;
  const batch = db.batch();
  
  for (const doc of researchedSnap.docs) {
    const data = doc.data();
    const existingScore = data.investor?.fitScore;
    
    if (existingScore !== undefined && existingScore !== null) {
      skipped++;
      continue;
    }
    
    const newScore = calculateFitScore(data);
    
    console.log(`${data.name}: ${newScore}`);
    
    batch.update(doc.ref, {
      'investor.fitScore': newScore,
      'updatedAt': new Date()
    });
    
    updated++;
  }
  
  if (updated > 0) {
    await batch.commit();
    console.log(`\n✓ Updated ${updated} leads with fitScores`);
  }
  
  console.log(`Skipped ${skipped} (already had scores)`);
}

main().catch(console.error);
