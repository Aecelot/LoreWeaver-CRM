import * as admin from 'firebase-admin';
const serviceAccount = require('../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function getScoringSummary() {
  try {
    const snapshot = await db.collection('leads')
      .where('type', '==', 'studio')
      .get();
    
    let totalStudios = 0;
    let scored = 0;
    let unscored = 0;
    
    const byCategory = {
      narrativeFirst: [] as any[],  // 90-100
      strongNarrative: [] as any[], // 70-89
      someNarrative: [] as any[],   // 50-69
      lightNarrative: [] as any[],  // 30-49
      noFit: [] as any[],           // 0-29
      unscored: [] as any[]
    };
    
    snapshot.forEach(doc => {
      const data = doc.data();
      totalStudios++;
      
      const fit = data.fit;
      const hasEmail = !!data.contact?.email;
      const info = { name: data.name, fit, hasEmail, country: data.country };
      
      if (fit === undefined || fit === null || (fit === 0 && !data.fitReason)) {
        unscored++;
        byCategory.unscored.push(info);
      } else {
        scored++;
        if (fit >= 90) byCategory.narrativeFirst.push(info);
        else if (fit >= 70) byCategory.strongNarrative.push(info);
        else if (fit >= 50) byCategory.someNarrative.push(info);
        else if (fit >= 30) byCategory.lightNarrative.push(info);
        else byCategory.noFit.push(info);
      }
    });
    
    console.log('=== LoreWeaver CRM Studio Scoring Summary ===');
    console.log(`Date: ${new Date().toISOString()}\n`);
    console.log(`Total Studios: ${totalStudios}`);
    console.log(`Scored: ${scored} (${Math.round(scored/totalStudios*100)}%)`);
    console.log(`Unscored: ${unscored} (${Math.round(unscored/totalStudios*100)}%)\n`);
    
    console.log('=== By Category ===');
    console.log(`🌟 Narrative-First (90-100): ${byCategory.narrativeFirst.length}`);
    byCategory.narrativeFirst.sort((a,b) => b.fit - a.fit).slice(0,10).forEach(s => 
      console.log(`   ${s.fit}: ${s.name} ${s.hasEmail ? '📧' : ''} [${s.country}]`));
    
    console.log(`\n💪 Strong Narrative (70-89): ${byCategory.strongNarrative.length}`);
    byCategory.strongNarrative.sort((a,b) => b.fit - a.fit).slice(0,15).forEach(s => 
      console.log(`   ${s.fit}: ${s.name} ${s.hasEmail ? '📧' : ''} [${s.country}]`));
    
    console.log(`\n📖 Some Narrative (50-69): ${byCategory.someNarrative.length}`);
    console.log(`📄 Light Narrative (30-49): ${byCategory.lightNarrative.length}`);
    console.log(`❌ No Fit (0-29): ${byCategory.noFit.length}`);
    console.log(`❓ Unscored: ${byCategory.unscored.length}`);
    
    // Top priority leads (high fit with email)
    const allScored = [...byCategory.narrativeFirst, ...byCategory.strongNarrative];
    const priorityLeads = allScored.filter(s => s.hasEmail).sort((a,b) => b.fit - a.fit);
    
    console.log('\n=== TOP PRIORITY LEADS (High Fit + Has Email) ===');
    priorityLeads.slice(0, 20).forEach((s, i) => 
      console.log(`${i+1}. [${s.fit}] ${s.name} [${s.country}]`));
    
  } catch (err) {
    console.error('Error:', err);
  }
}

getScoringSummary().then(() => process.exit(0));
