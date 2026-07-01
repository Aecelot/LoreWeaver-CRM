import * as admin from 'firebase-admin';
const serviceAccount = require('../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Large batch of remaining studios - scoring based on notes and genre patterns
const scorableStudios: { id: string; fit: number; fitReason: string }[] = [
  // Japanese VN/RPG studios (typically high narrative fit)
  { id: '39D4TKXT7IAWRWmTU6Jb', fit: 80, fitReason: 'Nihon Falcom = Trails/Ys series. Legendary JRPG developer with extensive narrative dialogue systems.' },
  { id: '39W8lDjxBjOHtyPWo77b', fit: 85, fitReason: 'Vanillaware = Odin Sphere, 13 Sentinels. Beautiful 2D art with deep narrative storytelling.' },
  { id: '2LvQvD74n9BKQeWwZNJm', fit: 75, fitReason: 'Experience Inc = Dungeon RPGs (Demon Gaze, Undernauts). Japanese RPG specialists.' },
  { id: '2GHyGveemxipKiqJqCsk', fit: 65, fitReason: 'Sunborn/MICA Team = Girls\' Frontline. Gacha with narrative but mobile monetization focus.' },
  { id: '5MUt9JXOr2W1z8Yi3afE', fit: 40, fitReason: 'Santa Monica Studio = God of War. AAA Sony first-party, too large for indie approach.' },
  
  // Korean studios
  { id: '3WLbJJ5kQpv9lhGRXzAA', fit: 40, fitReason: 'No More 500 = Korean studio. Limited info available.' },
  { id: '47hFCTkn5HqorlhBI7I9', fit: 60, fitReason: 'The Scourge Team = Vietnamese horror studio. Some narrative potential.' },
  
  // Studios needing quick scoring based on country/genre patterns
  // Poland (strong narrative game dev heritage)
  // Spain (good indie scene)  
  // France (strong AA narrative studios)
  // China (varies - some narrative, some mobile)
  // SEA (emerging narrative scene)
  // MENA (cultural storytelling focus)
  // Latin America (growing scene)
  // Africa (cultural storytelling focus)
];

// Now let me add more specific entries based on searching the database
const moreStudios: { id: string; fit: number; fitReason: string }[] = [
  // High potential leads from various regions
  { id: '5s97oYipHUMwLRtkwn4n', fit: 85, fitReason: 'Remedy Entertainment = Alan Wake, Control. Exceptional narrative-driven action games.' },
  { id: '6hVD0S8pAOHjkdZfBQua', fit: 85, fitReason: 'Moon Studios = Ori series. Emotional narrative through environmental storytelling and gameplay.' },
  { id: '8pbzqi1Y08ns6QivQPU6', fit: 60, fitReason: 'Cellar Door Games = Rogue Legacy. Roguelike with some family narrative elements.' },
  { id: 'AjMqH3ztmDuyxt2UGdV1', fit: 80, fitReason: 'Tequila Works = RiME, Gylt. Spanish studio known for emotional narrative experiences.' },
  { id: 'ANjWGgNo1AhG3UuUW7b7', fit: 65, fitReason: 'Capricia Productions = Israeli story-focused games.' },
  { id: 'Ak1Q7BqALqTRQL6sUCo7', fit: 90, fitReason: 'The Chinese Room = Dear Esther, Everybody\'s Gone to the Rapture. Walking sim narrative pioneers.' },
  { id: 'BoOlw43KNufY2vDaFmCo', fit: 60, fitReason: 'Ogre Head Studio = Story-centered roguelite. Psychological themes.' },
];

const allStudios = [...scorableStudios, ...moreStudios];

async function updateStudios() {
  console.log('=== Studio Scoring Update Batch 3 ===');
  console.log(`Date: ${new Date().toISOString()}`);
  console.log(`Studios to process: ${allStudios.length}\n`);

  let successCount = 0;
  let errorCount = 0;
  let skippedCount = 0;

  for (const studio of allStudios) {
    try {
      const docRef = db.collection('leads').doc(studio.id);
      const doc = await docRef.get();
      
      if (!doc.exists) {
        console.log(`❌ ${studio.id}: Document not found`);
        errorCount++;
        continue;
      }

      const data = doc.data()!;
      
      // Skip if already scored (fit > 0)
      if (data.fit && data.fit > 0 && studio.fit !== 0) {
        console.log(`⏭️ ${data.name}: Already scored (fit=${data.fit})`);
        skippedCount++;
        continue;
      }
      
      await docRef.update({
        fit: studio.fit,
        fitReason: studio.fitReason,
        researchedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      console.log(`✅ ${data.name}: fit=${studio.fit}`);
      successCount++;
    } catch (err) {
      console.log(`❌ ${studio.id}: Error - ${err}`);
      errorCount++;
    }
  }

  console.log('\n=== Summary ===');
  console.log(`Success: ${successCount}`);
  console.log(`Skipped: ${skippedCount}`);
  console.log(`Errors: ${errorCount}`);
}

updateStudios().then(() => process.exit(0)).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
