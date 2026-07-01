import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';

const sa = JSON.parse(readFileSync('../service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const updates = [
  {
    id: 'ywUVHrQIuUD29fgReKNI', // hiro.capital
    data: {
      name: 'Hiro Capital',
      website: 'https://hiro.capital',
      country: 'United Kingdom',
      investorThesis: 'European founder-led VC investing in the "superabundant future" with explicit focus on AI, Spatial Computing, Simulation & Games, Autonomy, Robotics, Sports Tech, Digital Augmentation, Longevity, and Defence/Space. Invests from Seed to Series C across "Europe+" (EU, UK, Norway, Switzerland, Ukraine, Turkey, Israel). 25+ portfolio companies heavily weighted to gaming: Telltale Games (narrative games!), Machinations (game design tools!), Team Liquid (esports), Keen Games, Frameplay (in-game ads), Edgegap (game servers), Dreamcraft (no-code game creation), FRVR, Snowprint, Happy Volcano, Meeple Corp, Polyarc, FitXR, LIV, Skybound, and many more. Very hands-on investor, wants radical candour relationship with founders. EXCELLENT FIT for LoreWeaver: Gaming tools + AI + narrative games all in thesis. Machinations and Telltale are directly comparable investments. Only concern: their typical check size may be larger than our EUR 150K round (they do Seed-Series C).',
      investorStage: 'seed to series-c',
      typicalCheckSize: 'EUR 500K-2M+ (multi-stage fund, typical seed likely EUR 500K-1M)',
      portfolioGaming: ['Telltale Games', 'Machinations', 'Team Liquid', 'Keen Games', 'Frameplay', 'Edgegap', 'Dreamcraft', 'FRVR', 'Snowprint Studios', 'Happy Volcano', 'Meeple Corp', 'Polyarc', 'FitXR', 'LIV', 'Skybound', 'Noodle Cat Games', 'Firestoke Games', 'Loric Games', 'Soccerverse', 'Lightfox Games', 'Maintain Altitude', 'Loco'],
      thesisFitScore: 5, // Explicitly invests in games + AI + spatial computing + simulation
      stageFitScore: 4, // Seed included but ranges to Series C
      checkSizeFitScore: 2, // Multi-stage fund, checks likely EUR 500K-2M (too large for 150K round)
      gamingExpertiseScore: 5, // 22 gaming portfolio companies, gaming-dedicated
      activityScore: 4, // Very active fund, 25+ companies
      geographyFitScore: 3, // UK-based, explicitly invests Europe+
      totalFitScore: 44, // (5×3)+(4×2)+(2×2)+(5×2)+(4×1)+(3×1) = 15+8+4+10+4+3
      investorTier: 'tier-1'
    }
  }
];

async function main() {
  // Update investors
  for (const update of updates) {
    await db.collection('leads').doc(update.id).update({
      ...update.data,
      status: 'researched',
      'pipeline.stageId': 'researched',
      researchedAt: new Date().toISOString(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log(`✓ Updated: ${update.data.name} (${update.data.investorTier}, score: ${update.data.totalFitScore})`);
  }
  
  // Remove processed investors from queue
  const queuePath = './investor-browser-queue.json';
  const queue = JSON.parse(readFileSync(queuePath, 'utf8'));
  const processedIds = updates.map(u => u.id);
  const newQueue = queue.filter(i => !processedIds.includes(i.id));
  writeFileSync(queuePath, JSON.stringify(newQueue, null, 2));
  console.log(`\n✓ Removed ${processedIds.length} investors from queue (${newQueue.length} remaining)`);
  
  console.log(`\n=== Processed ${updates.length} investors ===`);
  process.exit(0);
}

main();
