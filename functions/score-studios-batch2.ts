import * as admin from 'firebase-admin';
const serviceAccount = require('../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// More studios with research notes or enough info to score
const scorableStudios: { id: string; fit: number; fitReason: string }[] = [
  // Narrative-first studios (90-100)
  { id: '2Jn2UdZY6i868txUNIuw', fit: 95, fitReason: 'sunset visitor = 1000xRESIST (Peabody Award winner). HK diaspora themes, Overwhelmingly Positive on Steam.' },
  { id: '1Cd1PglGOyze0s10ILE3', fit: 90, fitReason: 'Innocent Grey = Kara no Shoujo (acclaimed dark mystery VNs). Known for psychological depth and narrative complexity.' },
  
  // Strong narrative (70-89)
  { id: '2KrGQo9u53V11dNqHCrY', fit: 85, fitReason: 'TaleWorlds = Mount & Blade series. Emergent narrative through faction warfare and character progression. Exceptional fit.' },
  { id: '2p860worJ1CQShXpF6oi', fit: 82, fitReason: 'Dreams Uncorporated = Cris Tales (JRPG with time manipulation). Colombian culture focus, narrative-heavy RPG.' },
  { id: '3CZYLmUFqQvBLw73fPiN', fit: 85, fitReason: 'EVR Studio = Project TH (dual protagonists, Korean folklore, K-pop, political tensions). Excellent narrative concept.' },
  { id: '3CoNfG9z1K8TYdKsM0oq', fit: 80, fitReason: 'Mojiken Studio = A Space for the Unbound. Slice-of-life narrative focus, multiple awards.' },
  { id: '3B9A1eu3g2d53FpdsID0', fit: 75, fitReason: 'Kaigan Games = SIMULACRA series (found phone horror). Leading SEA indie horror, 7 international awards.' },
  { id: '0IE7vOyc3TkWrxwMPALy', fit: 75, fitReason: 'Acquire = Tenchu, Way of the Samurai. Open-world samurai RP. Now owned by Kadokawa (FromSoftware parent).' },
  { id: '0QWWXzVrdcFG6etZYUNo', fit: 80, fitReason: 'ChopUp Games = Games that tell the African narrative. Danfo, Jagun. Cultural preservation through storytelling.' },
  { id: '110TwAr3ZXLVgPsdIwBI', fit: 70, fitReason: 'Chibig = Deiland, Summer in Mara. Cozy adventures with narrative. Valencia, Spain indie.' },
  { id: '1g2N3LyvCGVsZ4gva53d', fit: 75, fitReason: 'Draw Distance = VTM: Coteries/Shadows of NY. Bloober Team subsidiary, narrative-focused visual novels.' },
  { id: '1huQOdnNyWXHca3A0Y0p', fit: 75, fitReason: 'Tall Story Games = Lucy Dreaming. British humor point-and-click. Husband-wife team, narrative-focused.' },
  { id: '5472jbniRKXx50Q3IY7x', fit: 78, fitReason: 'Tactical Adventures = Solasta (D&D 5e CRPG). Turn-based RPG with branching narrative. Solasta 2 in development.' },
  { id: '5BHMXh7v4YMnuiJ6Lr5p', fit: 70, fitReason: 'Obsidian = Fallout New Vegas, Pillars of Eternity. Legendary RPG narrative but Microsoft/Xbox ownership.' },
  { id: '5BOXmG23OMbf7zQaJEEQ', fit: 78, fitReason: 'Game Kitchen = Blasphemous, The Last Door. Deep Spanish folklore/cultural themes woven into dark narratives.' },
  { id: '2j95qwBCUe76ZjKcPYIH', fit: 75, fitReason: 'Genuine Studio = Detective Kobayashi (Ace Attorney/Danganronpa style). Hong Kong indie mystery adventure.' },
  { id: '1bDuhYqWYSsV1kxFaNZM', fit: 80, fitReason: 'NeoBards Entertainment = Working on new Silent Hill game. Strong narrative/horror DNA.' },
  { id: '3rwdu6FoSywrrilK122R', fit: 70, fitReason: 'Usiku Games = Games that inspire action. Nairobi Game Dev Centre. 50K+ downloads, conservation storytelling.' },
  { id: '4DmYKcxZudQTk229FN5k', fit: 65, fitReason: 'SuperGaming = Indus BR with deep lore (Mythwalkers). 12M+ pre-registrations. Narrative through BR lens.' },
  
  // Medium fit (50-69)
  { id: '03ta99ggGtdFEHHMqh3l', fit: 45, fitReason: 'GihOt = Mobile MMORPGs. ~7000 employees. Large but mobile/MMO focus, less emergent narrative.' },
  { id: '2Gl7TzrjN3VUBJAa0NzY', fit: 65, fitReason: 'Leenzee Games = WUCHANG (Soulslike set in Three Kingdoms). Action RPG with narrative elements.' },
  { id: '52vSmvgTPrhniQML030W', fit: 50, fitReason: 'Flying Wild Hog = Shadow Warrior, Trek to Yomi. Action-focused but some narrative depth. Embracer owned.' },
  { id: '1zpwnCepB7RoOoYd09Ts', fit: 25, fitReason: 'Iron Galaxy Studios = Co-development & porting services. Not making original narrative games.' },
  
  // Lower fit (30-49)
  { id: '2PaptnZOxse14MGfftyn', fit: 25, fitReason: 'Wildlife Studios = Mobile gaming (Zooba, Tennis Clash). Too casual for Director fit.' },
  { id: '1EUzeFmuyrd9nf12ufv6', fit: 35, fitReason: 'Daedalic = PUBLISHER ONLY since 2023. Closed development after Gollum failure. Nacon owned.' },
  { id: '1agycIxAWPzDUyToK2pK', fit: 15, fitReason: 'LuGus Studios = Drone simulation, training, education. Not entertainment-focused.' },
  { id: '1jS3MeGJmCHcIBxcI7wV', fit: 20, fitReason: 'Fugo Games = Mobile casual games since 2010. No narrative focus.' },
  { id: '2qvOnIpFxIp1kSD76g0Z', fit: 20, fitReason: 'Supercell = Clash of Clans, Brawl Stars. Mobile strategy, minimal narrative.' },
  
  // Scoring remaining studios with notes
  { id: '1BKOjC4cBR71cnqABQYs', fit: 45, fitReason: 'Warcave Games = Strategy game developers in Belgium. 10+ years experience.' },
  { id: '1SCc1AynfJVwM2JqWsrf', fit: 40, fitReason: 'Roofdog Games = Danish indie studio. Limited info on narrative focus.' },
  { id: '18tAgAVLzrjJoakDQH6I', fit: 35, fitReason: 'Game Ever Studio = Animation studio for TV and games in Argentina.' },
  { id: '1eY7yrtWW9Mv3LoYSH6N', fit: 35, fitReason: 'Tahugames = Indonesian indie studio. Limited info.' },
  { id: '1mFX5GfDiPwjFFgmHuAX', fit: 50, fitReason: 'Chicha Games = Peruvian cultural games. Some cultural narrative potential.' },
  { id: '2ObamwhKRjRliq1zvpZm', fit: 55, fitReason: 'Kreed Games = Castle Mashers (RPG mechanics). International team with Egypt focus.' },
  { id: '3KTcCCLaLd5etnj9Gdwf', fit: 65, fitReason: 'CorgiBites = Recognized for excellence in storytelling. Emerging Kazakhstan studio.' },
  { id: '4pBGBCGRrYvf1jsa99Y9', fit: 40, fitReason: 'Hoga = Strategy game for health awareness (liver infection). Gamification focus.' },
  { id: '4vFEWta0aR0zTgmCVL0x', fit: 35, fitReason: 'Darts Games = Azerbaijan local indie. Limited info.' },
  { id: '4E3ojH8SpT6qTt0lLRmb', fit: 45, fitReason: 'Miniboss = Brazilian indie action games. Some potential.' },
  { id: '2cBzLJZ8yndAXjHVi28k', fit: 0, fitReason: 'DUPLICATE of 11 bit studios. Merge records.' },
  { id: '5Lpbrqrnov7bu9JMSGOT', fit: 20, fitReason: 'Anantarupa Studios = Game art and animation services. Not a game developer.' },
  { id: '0Yuvv9ASZAbI6ap7UYfw', fit: 35, fitReason: 'Far Far Games = Kazakhstan studio. Limited info on gamedevmap.' },
  { id: '07UilkLmIbQlQHw0wlkh', fit: 40, fitReason: 'Thermite Games = Chinese studio. No research notes yet.' },
  
  // More studios from different regions
  { id: '5LWsgi0FmBn1XsRW850U', fit: 70, fitReason: 'DUPLICATE Spiders entry - already scored. GreedFall, Steelrising. Action RPGs with narrative.' },
];

async function updateStudios() {
  console.log('=== Studio Scoring Update Batch 2 ===');
  console.log(`Date: ${new Date().toISOString()}`);
  console.log(`Studios to process: ${scorableStudios.length}\n`);

  let successCount = 0;
  let errorCount = 0;
  let skippedCount = 0;

  for (const studio of scorableStudios) {
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
  console.log(`Total: ${scorableStudios.length}`);
}

updateStudios().then(() => process.exit(0)).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
