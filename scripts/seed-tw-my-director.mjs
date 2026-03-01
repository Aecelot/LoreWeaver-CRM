// Seed Taiwan & Malaysia deep dive: Director targets
import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, '..', 'service-account.json'), 'utf8')
);

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

const leads = [
  // === TAIWAN ===
  {
    name: "SIGONO",
    type: "studio",
    country: "Taiwan",
    city: "Taipei",
    website: "https://www.sigono.com/",
    size: "11-50",
    games: ["OPUS: The Day We Found Earth", "OPUS: Rocket of Whispers", "OPUS: Echo of Starsong", "OPUS: Prism Peak"],
    genres: ["Adventure", "Narrative", "Visual Novel", "Sci-Fi"],
    icp: "Director",
    score: 95,
    contact: {
      name: "Scott Chen",
      role: "Co-founder",
      email: "",
      linkedin: ""
    },
    notes: "Founded 2013 by Brian Lee + Scott Chen (Carnegie Mellon). OPUS series = 10M+ downloads. First Taiwanese game in Famitsu Platinum Hall of Fame. OPUS: Echo of Starsong = IGF Excellence in Narrative Honorable Mention, Webby Winner, Cannes Spotlight Asia, multiple narrative awards. 'Heartfelt stories that touch on themes of love and self-fulfilment.' DREAM LEAD.",
    source: "research",
    tags: ["narrative-heavy", "taiwan", "director-target", "award-winning", "visual-novel", "sci-fi", "famitsu-platinum"]
  },
  {
    name: "Rayark",
    type: "studio",
    country: "Taiwan",
    city: "Taipei",
    website: "https://rayark.com/",
    size: "201-500",
    games: ["Cytus", "Cytus II", "Deemo", "VOEZ", "Implosion", "Sdorica"],
    genres: ["Rhythm", "RPG", "Action", "Narrative"],
    icp: "Director",
    score: 85,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Founded 2011 by 6 co-founders. 250 employees (2020). Tokyo branch for anime/game writing. Cytus/Deemo = rhythm games with deep narrative. Implosion = 2015 iOS GOTY. Sdorica = strategy RPG with narrative. SCALE opportunity for Director middleware.",
    source: "research",
    tags: ["taiwan", "director-target", "rhythm", "scale", "narrative", "partnership"]
  },
  {
    name: "BearBone Studio",
    type: "studio",
    country: "Taiwan",
    city: "Taiwan",
    website: "",
    size: "2-10",
    games: ["Minds Beneath Us"],
    genres: ["Adventure", "Narrative", "Cyberpunk", "Sci-Fi"],
    icp: "Director",
    score: 90,
    contact: {
      name: "Ted",
      role: "Producer / Writer",
      email: "",
      linkedin: ""
    },
    notes: "7 people (university friends). Minds Beneath Us = TAIPEI GAME SHOW 2025 WINNER. Cyberpunk narrative set in futuristic Taiwan/Asian city. 'Graphically beautiful.' 'Dedicated to delivering impactful stories.' Debut game released July 2024. Working on next big project.",
    source: "research",
    tags: ["narrative-heavy", "taiwan", "director-target", "cyberpunk", "tgs-winner", "debut"]
  },
  {
    name: "CreSpirit",
    type: "studio",
    country: "Taiwan",
    city: "Taiwan",
    website: "https://www.crespirit.com/",
    size: "2-10",
    games: ["Rabi-Ribi", "A Light in the Dark", "Last Command"],
    genres: ["Action", "Platformer", "Visual Novel", "Narrative"],
    icp: "Director",
    score: 82,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Founded 2014 by artists. Rabi-Ribi = cult hit action-platformer ('best boss fights ever' per fans). A Light in the Dark = visual novel (co-dev with STORIA). 'Celebrate love of art and video games.' Collaborate with global talent.",
    source: "research",
    tags: ["taiwan", "director-target", "visual-novel", "action", "cult-hit"]
  },
  {
    name: "Futile Games",
    type: "studio",
    country: "Taiwan",
    city: "Taiwan",
    website: "",
    size: "2-10",
    games: ["mossasis"],
    genres: ["Narrative", "Adventure", "Visual Novel"],
    icp: "Director",
    score: 78,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Taipei Game Show Indie Award finalist/winner. mossasis = narrative adventure. Part of growing Taiwan indie scene.",
    source: "research",
    tags: ["taiwan", "director-target", "narrative", "tgs-featured"]
  },
  {
    name: "padendon",
    type: "studio",
    country: "Taiwan",
    city: "Taiwan",
    website: "",
    size: "2-10",
    games: ["PAGUI-Battle"],
    genres: ["Action", "Asymmetric", "Horror", "Folklore"],
    icp: "Director",
    score: 75,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "PAGUI-Battle = asymmetric 3v1 exorcism game set in Taiwanese folklore. Free on Steam Feb 2025. Cultural storytelling through horror.",
    source: "research",
    tags: ["taiwan", "director-target", "folklore", "horror", "asymmetric"]
  },

  // === MALAYSIA ===
  {
    name: "Metronomik",
    type: "studio",
    country: "Malaysia",
    city: "Kuala Lumpur",
    website: "https://www.metronomik.net/",
    size: "11-50",
    games: ["No Straight Roads", "No Straight Roads 2"],
    genres: ["Action", "Adventure", "Rhythm", "Narrative"],
    icp: "Director",
    score: 92,
    contact: {
      name: "Wan Hazmer",
      role: "Co-founder / Game Director",
      email: "",
      linkedin: ""
    },
    notes: "Founded Dec 2017 by cousins Wan Hazmer (Lead Game Designer FINAL FANTASY XV) + Daim Dziauddin (Concept Artist STREET FIGHTER V). NSR = 500K+ players, 'proudly Malaysian'. NSR 2 coming 2026. Team of fresh grads trained in-house. 'Music-based games without rhythm game mechanics.' AAA PEDIGREE.",
    source: "research",
    tags: ["narrative-heavy", "malaysia", "director-target", "aaa-pedigree", "music", "ffxv-alumni"]
  },
  {
    name: "Kurechii",
    type: "studio",
    country: "Malaysia",
    city: "Malaysia",
    website: "https://kurechii.com/",
    size: "11-50",
    games: ["Postknight", "Postknight 2", "King's League", "King's League II", "Tiny Guardians"],
    genres: ["RPG", "Adventure", "Strategy", "Narrative"],
    icp: "Director",
    score: 88,
    contact: {
      name: "P'ng Yiwei",
      role: "Founder",
      email: "",
      linkedin: ""
    },
    notes: "24 employees. Award-winning. 62K Facebook followers. 'Guild of storytellers and world-builders.' Postknight = delivery RPG with charming narrative. King's League / Tiny Guardians share universe. 'Compelling stories that transport players.' STRONG NARRATIVE DNA.",
    source: "research",
    tags: ["narrative-heavy", "malaysia", "director-target", "award-winning", "mobile", "storytellers"]
  },
  {
    name: "Kaigan Games",
    type: "studio",
    country: "Malaysia",
    city: "Kuala Lumpur",
    website: "https://kaigangames.com/",
    size: "11-50",
    games: ["SIMULACRA", "SIMULACRA 2", "Sara Is Missing", "Simulacra 3"],
    genres: ["Horror", "Found Phone", "Narrative", "FMV"],
    icp: "Director",
    score: 85,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Already in CRM. Pioneered 'found phone' horror genre. Millions of downloads. Strong narrative through UI storytelling. Perfect Director fit for FMV/interactive narrative.",
    source: "research",
    tags: ["narrative-heavy", "malaysia", "director-target", "horror", "found-phone", "fmv"]
  },
  {
    name: "Streamline Studios",
    type: "studio",
    country: "Malaysia",
    city: "Kuala Lumpur",
    website: "https://www.streamline-studios.com/",
    size: "201-500",
    games: [],
    genres: ["Service", "AAA Support", "Art"],
    icp: "Director",
    score: 70,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "Major AAA co-development studio. Worked on Street Fighter, Final Fantasy, etc. 200+ employees. Partnership angle for Director enterprise integration.",
    source: "research",
    tags: ["malaysia", "director-target", "service", "aaa", "partnership", "scale"]
  },
  {
    name: "Passion Republic",
    type: "studio",
    country: "Malaysia",
    city: "Kuala Lumpur",
    website: "https://www.passionrepublic.com/",
    size: "51-200",
    games: ["GigaBash"],
    genres: ["Action", "Fighting", "Kaiju"],
    icp: "Director",
    score: 72,
    contact: {
      name: "",
      role: "",
      email: "",
      linkedin: ""
    },
    notes: "GigaBash = kaiju brawler, critically acclaimed. Also does AAA art/animation services. Could have narrative needs for future projects.",
    source: "research",
    tags: ["malaysia", "director-target", "fighting", "kaiju", "service"]
  }
];

async function seedTWMYDirectorLeads() {
  console.log(`Seeding ${leads.length} Taiwan/Malaysia Director leads...\n`);
  
  let added = 0;
  let skipped = 0;
  
  for (const lead of leads) {
    // Check if exists
    const existing = await db.collection('leads')
      .where('name', '==', lead.name)
      .limit(1)
      .get();
    
    if (!existing.empty) {
      console.log(`⏭️  ${lead.name} (already exists)`);
      skipped++;
      continue;
    }
    
    await db.collection('leads').add({
      ...lead,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`✅ ${lead.name} (${lead.city || lead.country}) — ${lead.size} — Score ${lead.score}`);
    added++;
  }
  
  console.log(`\n✅ Added ${added}, skipped ${skipped}`);
  process.exit(0);
}

seedTWMYDirectorLeads().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
