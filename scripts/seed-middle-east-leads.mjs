import admin from 'firebase-admin';
import { readFileSync } from 'fs';

const sa = JSON.parse(readFileSync('./service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const leads = [
  // TURKEY - Strong narrative/RPG scene
  { name: 'TaleWorlds Entertainment', country: 'Turkey', location: 'Ankara', website: 'https://taleworlds.com', icpScore: 95, tags: ['turkey', 'indie', 'rpg', 'strategy', 'sandbox', 'medieval'], notes: "EXCEPTIONAL FIT. Mount and Blade series (Warband, Bannerlord). Strategy/action RPG, medieval sandbox, emergent narrative through faction warfare and character progression. 98% sales outside Turkey. Bannerlord has complex NPC relationships, diplomacy, faction dynamics. EXCELLENT Director candidate - their sandbox approach aligns perfectly with emergent narrative systems." },
  
  { name: 'Nowhere Studios', country: 'Turkey', location: 'Istanbul', website: '', icpScore: 88, tags: ['turkey', 'indie', 'narrative', 'cinematic'], notes: "EXCELLENT FIT. Monochroma - narrative platformer. Studio explicitly aims to create new narrative forms in games and change the way games are being told. Cinematic storytelling focus." },
  
  { name: 'Metaverse Studios', country: 'Turkey', location: 'Istanbul', website: '', icpScore: 85, tags: ['turkey', 'indie', 'rpg', 'strategy', 'narrative'], notes: "STRONG FIT. Angelic - ambitious narrative turn-based strategy RPG. Led by Erkan Bayol. Indie team with AAA narrative ambitions." },
  
  { name: 'Hero Concept', country: 'Turkey', location: 'Istanbul', website: '', icpScore: 78, tags: ['turkey', 'indie', 'beat-em-up', 'comic-style'], notes: "Mayhem Brawler - comic book art style beat em up. Interesting world-building, 90s nostalgia with narrative elements." },
  
  { name: 'RealityArts Studio', country: 'Turkey', location: 'Istanbul', website: 'http://realityartsstudio.com', icpScore: 75, tags: ['turkey', 'indie', 'action-adventure'], notes: "Unawake - first person melee action adventure for PC/next-gen consoles. Works with Turkish Ministry of Education for game dev training." },
  
  { name: 'Peak Games', country: 'Turkey', location: 'Istanbul', website: '', icpScore: 65, tags: ['turkey', 'mobile', 'puzzle', 'casual'], notes: "Toon Blast, Toy Blast. Acquired by Zynga for $1.8B (2020). Casual/puzzle focus, less narrative." },
  
  { name: 'Fugo Games', country: 'Turkey', location: 'Istanbul', website: '', icpScore: 62, tags: ['turkey', 'mobile', 'casual'], notes: "Founded 2010. Mobile casual games." },
  
  { name: 'F and F Digital Media', country: 'Turkey', location: 'Turkey', website: '', icpScore: 82, tags: ['turkey', 'indie', 'interactive-film', 'narrative'], notes: "STRONG FIT. Agarta - first interactive film genre game in Turkey. Focus on meaningful player decisions and consequences." },
  
  { name: 'Warlock Arts', country: 'Turkey', location: 'Turkey', website: '', icpScore: 70, tags: ['turkey', 'indie'], notes: "Indie game development studio." },
  
  { name: 'Curse Game Studio', country: 'Turkey', location: 'Istanbul', website: '', icpScore: 58, tags: ['turkey', 'mobile', 'hyper-casual'], notes: "Founded 2019. 3D mobile hyper-casual games." },
  
  // ISRAEL - Strong tech/mobile scene
  { name: 'Plarium', country: 'Israel', location: 'Herzliya', website: 'https://plarium.com', icpScore: 72, tags: ['israel', 'mobile', 'rpg', 'strategy'], notes: "RAID: Shadow Legends, 450M+ registered users. Founded 2009. Acquired 2017. Strategy, mid-core RPGs. 1,300+ employees. Strong tech but more mobile/casual focus." },
  
  { name: 'Dead Mage', country: 'Iran/USA', location: 'Iran (founders)', website: 'https://deadmage.com', icpScore: 92, tags: ['iran', 'usa', 'indie', 'rpg', 'narrative', 'action'], notes: "EXCEPTIONAL FIT. Children of Morta - STORY-DRIVEN action RPG about a family of heroes. Published by 11 bit studios. Also: Garshasp (Persian mythology), Shadow Blade, Tale of Ronin. Iranian-founded, deeply narrative-focused. Children of Morta praised for its family storytelling. EXCELLENT Director candidate." },
  
  { name: 'Playtika', country: 'Israel', location: 'Herzliya', website: '', icpScore: 62, tags: ['israel', 'mobile', 'casual', 'social-casino'], notes: "Largest gaming company in Israel. Social casino focus. Slotomania, etc. Less narrative relevance." },
  
  { name: 'Moon Active', country: 'Israel', location: 'Tel Aviv', website: '', icpScore: 60, tags: ['israel', 'mobile', 'casual'], notes: "Coin Master. Casual mobile. Huge scale but not narrative-focused." },
  
  { name: 'CrazyLabs', country: 'Israel', location: 'Israel', website: '', icpScore: 55, tags: ['israel', 'mobile', 'hyper-casual'], notes: "Hyper-casual mobile games." },
  
  { name: 'Candivore', country: 'Israel', location: 'Israel', website: '', icpScore: 58, tags: ['israel', 'mobile', 'casual'], notes: "Casual mobile games." },
  
  // UAE - Growing scene
  { name: 'Falafel Games', country: 'UAE', location: 'Dubai', website: '', icpScore: 85, tags: ['uae', 'mobile', 'rpg', 'strategy', 'cultural', 'narrative'], notes: "STRONG FIT. Arabic-first gaming pioneer. Knights of Glory, Forsan: The Arab Age. Culturally grounded RPGs and strategy games with local narratives, Arabic voice-overs, regional storytelling." },
  
  { name: 'Pixelhunters', country: 'UAE', location: 'Dubai', website: 'https://pixelhunters.com', icpScore: 75, tags: ['uae', 'indie', 'animation', '3d'], notes: "First indie game development studio in UAE (2009). 3D animation and game development." },
  
  { name: 'Hybrid Humans', country: 'UAE', location: 'Abu Dhabi', website: '', icpScore: 78, tags: ['uae', 'indie', 'narrative', 'mobile'], notes: "GOOD FIT. Hop Hop Away, Who Lurks. Known for narrative-driven gameplay and user engagement. International attention for creative approach." },
  
  { name: 'Dark Emerald Studios', country: 'UAE', location: 'Dubai', website: 'https://darkemerald.ae', icpScore: 72, tags: ['uae', 'indie', 'immersive'], notes: "Indie games and immersive experiences." },
  
  { name: 'Digital Unicorns', country: 'UAE', location: 'Dubai', website: '', icpScore: 75, tags: ['uae', 'indie', 'narrative', 'storytelling'], notes: "Renowned for blending storytelling with advanced game mechanics. Creating unique and engaging games." },
  
  { name: 'Tahadi Games', country: 'UAE', location: 'Dubai', website: '', icpScore: 68, tags: ['uae', 'publishing', 'mmorpg'], notes: "Founded 2008. Publishing MMORPGs and web games for MENA. Point Blank and other titles." },
  
  // SAUDI ARABIA - Major investment push
  { name: 'Manga Productions', country: 'Saudi Arabia', location: 'Riyadh', website: 'https://manga.com.sa', icpScore: 88, tags: ['saudi-arabia', 'anime', 'games', 'narrative', 'cultural', 'comics'], notes: "EXCELLENT FIT. Subsidiary of Misk Foundation (Crown Prince MBS). Animation, manga, games, comics - cross-media storytelling. Future Folktales, partnership with Sega/SNK. Training 4,000+ talents. Explicitly Arabian cultural narrative. Strong Architect candidate for cross-media consistency." },
  
  // JORDAN - Established scene
  { name: 'Maysalward', country: 'Jordan', location: 'Amman', website: '', icpScore: 75, tags: ['jordan', 'mobile', 'localization', 'publishing'], notes: "Successful in localizing games for MENA. ShaqDown partnership. Expertise in regional adaptation." },
  
  { name: 'Quirkat', country: 'Jordan', location: 'Amman', website: '', icpScore: 78, tags: ['jordan', 'indie', 'cultural', 'racing'], notes: "MENA-specific games. Arabian Lords, MENA Speed, Zonkt! Culturally relevant game development." },
  
  { name: 'Mad Hook', country: 'Jordan', location: 'Amman', website: 'https://madhook.io', icpScore: 70, tags: ['jordan', 'mobile', 'casual'], notes: "Founded 2018. The Chase, Highway Drifter, Rooftop Run. 50M+ downloads. Mobile casual focus." },
  
  { name: 'Babil Games', country: 'Jordan/UAE', location: 'Amman and Dubai', website: '', icpScore: 72, tags: ['jordan', 'uae', 'mobile', 'cultural'], notes: "60 staff across Dubai and Amman. Development, design, live ops, publishing. Jordanian and Emirati heritage values." },
  
  // EGYPT - Growing scene
  { name: 'Instinct Games', country: 'Egypt', location: 'Cairo', website: 'https://instinctgames.com', icpScore: 75, tags: ['egypt', 'indie', 'multi-platform'], notes: "Leading video games developer in Egypt (founded 2011). Co-developed multi-million seller games on major platforms." },
  
  { name: '2024 Studios', country: 'Egypt', location: 'Cairo', website: '', icpScore: 78, tags: ['egypt', 'indie', 'puzzle', 'narrative'], notes: "GOOD FIT. Egyptian indie studio. Keys to Success - minimalist game about finding success. Meaningful game design." },
  
  { name: 'Null DIES', country: 'Egypt', location: 'Cairo', website: 'http://nulldies.com', icpScore: 72, tags: ['egypt', 'indie'], notes: "Null Digital Illusion and Entertainment Studio. Cairo-based indie developer." },
  
  { name: 'AN Games Studio', country: 'Egypt', location: 'Egypt', website: 'https://angamesstudio.com', icpScore: 70, tags: ['egypt', 'indie', 'creative'], notes: "Creative Egyptian studio. Quality and cost-effective solutions." },
  
  { name: 'Dark Space Studios', country: 'Egypt', location: 'Egypt', website: '', icpScore: 68, tags: ['egypt', 'indie'], notes: "The Hero game. Egyptian game developer." },
  
  // TUNISIA
  { name: 'Digital Mania Interactive', country: 'Tunisia', location: 'Tunisia', website: '', icpScore: 72, tags: ['tunisia', 'indie', 'north-africa'], notes: "Part of Pan-Africa Gaming Group. Tunisian game development." },
  
  // LEBANON
  { name: 'Wixel Studios', country: 'Lebanon', location: 'Beirut', website: '', icpScore: 70, tags: ['lebanon', 'indie'], notes: "Lebanese game development. Challenging market but creative talent." },
  
  // IRAN - Emerging despite sanctions
  { name: 'Puya Arts', country: 'Iran', location: 'Iran', website: '', icpScore: 72, tags: ['iran', 'indie', 'cultural'], notes: "Iranian history-focused games. Domestic studio mining Persian heritage." },
  
  { name: 'Darinoos', country: 'Iran', location: 'Iran', website: '', icpScore: 60, tags: ['iran', 'localization'], notes: "Localization of international games for Iranian market." },
  
  { name: 'Brain Ladder Game Studio', country: 'Iran', location: 'Iran', website: '', icpScore: 65, tags: ['iran', 'indie'], notes: "Iranian game studio." },
  
  { name: 'Funny Mobile Games', country: 'Iran', location: 'Iran', website: '', icpScore: 58, tags: ['iran', 'mobile'], notes: "Iranian mobile game developer." },
  
  { name: 'King Kode Studio', country: 'Iran', location: 'Iran', website: '', icpScore: 62, tags: ['iran', 'indie'], notes: "Iranian indie game studio." },
  
  // PAKISTAN - Growing scene
  { name: 'Techouse Games', country: 'Pakistan', location: 'Pakistan', website: 'https://techousegames.com', icpScore: 72, tags: ['pakistan', 'indie', 'quality'], notes: "Quality over quantity philosophy. PC and PlayStation titles." },
  
  { name: 'Gamestorm Studios', country: 'Pakistan', location: 'Pakistan', website: 'https://thegamestormstudios.com', icpScore: 70, tags: ['pakistan', 'indie', 'mobile'], notes: "12+ years experience, 1000+ launches, 1B+ downloads. Works with indie studios and global publishers." },
  
  { name: 'Fried Chicken Games', country: 'Pakistan', location: 'Pakistan', website: '', icpScore: 65, tags: ['pakistan', 'indie'], notes: "Pakistani indie game developer." },
  
  { name: 'AbsoLogix', country: 'Pakistan', location: 'Pakistan', website: '', icpScore: 62, tags: ['pakistan', 'indie'], notes: "Pakistani game development." },
  
  { name: 'Play Spare', country: 'Pakistan', location: 'Pakistan', website: '', icpScore: 60, tags: ['pakistan', 'mobile'], notes: "Pakistani mobile games." },
  
  // QATAR
  { name: 'Doha Pixel Forge', country: 'Qatar', location: 'Doha', website: '', icpScore: 78, tags: ['qatar', 'indie', 'narrative', 'cultural'], notes: "GOOD FIT. Artistic game design, cinematic visuals, creative mechanics. Narrative-driven indie games, visual story experiences. Qatar cultural identity focus." },
  
  // Additional MENA studios
  { name: 'BeeLabs', country: 'MENA', location: 'MENA', website: '', icpScore: 68, tags: ['mena', 'educational', 'kids'], notes: "Fun educational mobile games for kids." },
  
  { name: 'Cryptyd', country: 'MENA', location: 'MENA', website: '', icpScore: 65, tags: ['mena', 'indie'], notes: "Game design and development services." },
  
  { name: 'KAUST Game Jam winner', country: 'Saudi Arabia', location: 'Saudi Arabia', website: '', icpScore: 75, tags: ['saudi-arabia', 'indie', 'narrative'], notes: "Re-Train - Excellence in Narrative award. Promising Saudi indie team." },

  { name: 'stc play', country: 'Saudi Arabia', location: 'Saudi Arabia', website: '', icpScore: 68, tags: ['saudi-arabia', 'publishing', 'mobile'], notes: "Gaming arm of stc Group. Partnership with Manga Productions. Publishing focus." }
];

async function main() {
  let batch = db.batch();
  let count = 0;
  
  for (const lead of leads) {
    const ref = db.collection('leads').doc();
    batch.set(ref, {
      name: lead.name,
      type: 'studio',
      status: 'new',
      priority: lead.icpScore >= 80 ? 'high' : lead.icpScore >= 65 ? 'medium' : 'low',
      country: lead.country,
      location: lead.location,
      website: lead.website,
      icpScore: lead.icpScore,
      tags: [...lead.tags, 'middle-east', 'mena'],
      notes: lead.notes,
      contact: { name: '', role: '', email: '', phone: '', linkedin: '' },
      pipeline: {
        pipelineId: 'GgsAYpDcelzHMNoRtamS',
        stageId: 'new-lead',
        enteredStageAt: admin.firestore.FieldValue.serverTimestamp()
      },
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      createdBy: 'skel'
    });
    count++;
    
    // Firebase batches limited to 500
    if (count % 400 === 0) {
      await batch.commit();
      batch = db.batch();
    }
  }
  
  await batch.commit();
  console.log('Added', count, 'Middle East leads');
  
  const highIcp = leads.filter(l => l.icpScore >= 80).length;
  const medIcp = leads.filter(l => l.icpScore >= 65 && l.icpScore < 80).length;
  console.log('High ICP (80+):', highIcp);
  console.log('Medium ICP (65-79):', medIcp);
  
  // By country
  const byCountry = {};
  leads.forEach(l => { 
    const c = l.country.split('/')[0]; // Handle Iran/USA
    byCountry[c] = (byCountry[c] || 0) + 1; 
  });
  console.log('\nBy country/region:');
  Object.entries(byCountry).sort((a,b) => b[1] - a[1]).forEach(([k,v]) => console.log(' ', k + ':', v));
  
  process.exit(0);
}

main();
