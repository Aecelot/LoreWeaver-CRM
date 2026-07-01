import admin from 'firebase-admin';
import { readFileSync } from 'fs';

const sa = JSON.parse(readFileSync('./service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const leads = [
  // HIGH FIT - Narrative Focus
  { name: "Kiro'o Games", country: 'Cameroon', location: 'Yaoundé', website: 'https://kiroogames.com', icpScore: 92, tags: ['cameroon', 'indie', 'rpg', 'african-fantasy', 'narrative', 'cultural'], notes: "EXCELLENT FIT. Aurion: Legacy of the Kori-Odan (2016) - FIRST African fantasy action-RPG. Deep African mythology and lore. 20-person team. First game studio in Central Africa. Critics say the team really knows how to tell a story. STRONG Director candidate - African fantasy worldbuilding." },
  
  { name: 'Leti Arts', country: 'Ghana', location: 'Accra and Nairobi', website: 'https://letiarts.com', icpScore: 88, tags: ['ghana', 'kenya', 'indie', 'comics', 'mythology', 'storytelling', 'cultural'], notes: "EXCELLENT FIT. Africa's Legends franchise - games and comics based on African folklore. Ananse (Ghanaian folklore hero), 8 African superheroes. CEO: Eyram Tawia. 50K+ downloads. Offices in Ghana and Kenya. Cross-media storytelling universe. STRONG Architect candidate - managing narrative across games/comics." },
  
  { name: 'ChopUp Games', country: 'Nigeria', location: 'Lagos', website: '', icpScore: 85, tags: ['nigeria', 'indie', 'narrative', 'cultural', 'mobile'], notes: "STRONG FIT. Games that tell the African narrative. Danfo (Lagos bus racing), Jagun: Clash of Kingdoms (African warrior themes). Focus on Nigerian urban culture and storytelling. Cultural preservation through games." },
  
  { name: 'Jiwe Studios', country: 'Kenya', location: 'Nairobi', website: '', icpScore: 82, tags: ['kenya', 'indie', 'post-apocalyptic', 'narrative', 'cultural'], notes: "STRONG FIT. Usoni - African post-apocalyptic game set at Lake Turkana. Deep cultural storytelling about El Molo people. Jiwe means stone in Kiswahili. Unique setting and narrative approach." },
  
  // MEDIUM-HIGH FIT
  { name: 'Maliyo Games', country: 'Nigeria', location: 'Lagos', website: 'https://maliyo.com', icpScore: 78, tags: ['nigeria', 'indie', 'mobile', 'narrative', 'cultural'], notes: "Founded 2012 by Hugo Obi. Share experiences of everyday Africans through games. Aboki Run, Okada Ride, Whot King. African-themed mobile with narrative elements. Beautifully crafted narratives mentioned on website." },
  
  { name: 'Nyamakop', country: 'South Africa', location: 'Johannesburg', website: 'https://nyamakop.co.za', icpScore: 80, tags: ['south-africa', 'indie', 'puzzle', 'platformer', 'african-inspired'], notes: "GOOD FIT. Semblance - world's first true plat-former (deformable platforms). Relooted (2026). African-inspired games for global audience. Founded 2016. Diverse inclusive team." },
  
  { name: 'Free Lives', country: 'South Africa', location: 'Cape Town', website: 'https://freelives.net', icpScore: 72, tags: ['south-africa', 'indie', 'action', 'satire'], notes: "Well-established SA studio. Broforce (1M+ units), GORN, Terra Nil, Genital Jousting. Founded 2012. Strong brand but action-focused, less narrative. Terra Nil has environmental storytelling." },
  
  { name: 'Sea Monster Entertainment', country: 'South Africa', location: 'South Africa', website: 'https://seamonster.digital', icpScore: 75, tags: ['south-africa', 'impact-games', 'educational', 'storytelling'], notes: "Impact games studio. Authentic Storytelling. Creative Solutions. Games for Change Africa sponsor. Financial education, social impact games. VR therapy tools. Less entertainment focus but strong narrative craft." },
  
  { name: 'Usiku Games', country: 'Kenya', location: 'Nairobi', website: 'https://usiku.games', icpScore: 76, tags: ['kenya', 'indie', 'impact', 'mobile', 'conservation'], notes: "Founded 2019. Games that inspire action and positive change. Runs Nairobi Game Development Centre. Co-founded PAGG (Pan-Africa Gaming Group). Electric Blue gecko conservation game. 50K+ downloads flagship title." },
  
  // MEDIUM FIT
  { name: 'Gamsole', country: 'Nigeria', location: 'Nigeria', website: '', icpScore: 68, tags: ['nigeria', 'indie', 'mobile'], notes: "35+ games, 10M+ downloads. Windows Phone pioneer. Casual mobile focus." },
  
  { name: 'Kuluya Games', country: 'Nigeria', location: 'Lagos', website: '', icpScore: 65, tags: ['nigeria', 'indie', 'mobile'], notes: "Nigerian mobile games studio. Early African game dev pioneer." },
  
  { name: 'Kayfo Games', country: 'Senegal', location: 'Senegal', website: '', icpScore: 70, tags: ['senegal', 'indie', 'west-africa'], notes: "Senegalese game studio. Part of Pan-Africa Gaming Group." },
  
  { name: 'Digital Mania', country: 'Tunisia', location: 'Tunisia', website: '', icpScore: 72, tags: ['tunisia', 'indie', 'north-africa'], notes: "Tunisian game studio. Part of Pan-Africa Gaming Group." },
  
  { name: 'Qene Games', country: 'Ethiopia', location: 'Ethiopia', website: '', icpScore: 70, tags: ['ethiopia', 'indie', 'east-africa'], notes: "Ethiopian game studio. Part of Pan-Africa Gaming Group. Qene = Ethiopian poetic form." },
  
  { name: 'Khanga Rue', country: 'Tanzania', location: 'Tanzania', website: '', icpScore: 68, tags: ['tanzania', 'indie', 'east-africa'], notes: "Tanzanian game studio. Part of Pan-Africa Gaming Group." },
  
  { name: 'Black Division Games', country: 'Kenya', location: 'Nairobi', website: '', icpScore: 70, tags: ['kenya', 'indie', 'action'], notes: "Nairobi X - alien invasion of Nairobi. Andrew Kaggia founder. Action focus with local setting." },
  
  { name: 'Celestial Games', country: 'South Africa', location: 'South Africa', website: '', icpScore: 65, tags: ['south-africa', 'indie', 'retro'], notes: "Toxic Bunny HD. South African retro gaming revival." },
  
  { name: 'Deluxe Creation', country: 'Nigeria', location: 'Nigeria', website: '', icpScore: 75, tags: ['nigeria', 'indie', 'narrative', 'african-stories'], notes: "Founded 2014 by Edushola. Games that tell African stories through engaging narratives and captivating visuals. Small team, narrative focus." },
  
  { name: 'Internet of Elephants', country: 'Kenya', location: 'Nairobi', website: '', icpScore: 72, tags: ['kenya', 'indie', 'conservation', 'wildlife'], notes: "Wildlife conservation games. AR experiences with real animals. Immersive storytelling about nature." },
  
  { name: 'Bisonplay', country: 'Nigeria', location: 'Nigeria', website: '', icpScore: 62, tags: ['nigeria', 'indie'], notes: "Nigerian game development company." },
  
  { name: 'Manrad Games', country: 'Nigeria', location: 'Lagos', website: '', icpScore: 65, tags: ['nigeria', 'indie'], notes: "Lagos-based game studio." },
  
  { name: 'Studio Bonza', country: 'South Africa', location: 'Cape Town', website: '', icpScore: 68, tags: ['south-africa', 'indie'], notes: "Cape Town indie studio." },
  
  { name: 'Weza Interactive', country: 'South Africa', location: 'South Africa', website: '', icpScore: 65, tags: ['south-africa', 'indie'], notes: "South African game developer." },
  
  { name: 'Afrosoft', country: 'Nigeria', location: 'Nigeria', website: '', icpScore: 62, tags: ['nigeria', 'indie'], notes: "Nigerian software and games." },
  
  { name: 'Imisi 3D', country: 'Nigeria', location: 'Lagos', website: '', icpScore: 70, tags: ['nigeria', 'vr', 'ar', 'immersive'], notes: "Lagos-based XR studio. VR/AR experiences. Imisi = imagination in Yoruba. Immersive storytelling." }
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
      tags: [...lead.tags, 'africa'],
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
  }
  
  await batch.commit();
  console.log('Added', count, 'African leads');
  
  const highIcp = leads.filter(l => l.icpScore >= 80).length;
  const medIcp = leads.filter(l => l.icpScore >= 65 && l.icpScore < 80).length;
  console.log('High ICP (80+):', highIcp);
  console.log('Medium ICP (65-79):', medIcp);
  
  // By country
  const byCountry = {};
  leads.forEach(l => { byCountry[l.country] = (byCountry[l.country] || 0) + 1; });
  console.log('\nBy country:');
  Object.entries(byCountry).sort((a,b) => b[1] - a[1]).forEach(([k,v]) => console.log(' ', k + ':', v));
  
  process.exit(0);
}

main();
