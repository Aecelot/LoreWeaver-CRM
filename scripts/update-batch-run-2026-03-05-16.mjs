// Batch research update - 2026-03-05 Run 16 (4:37 AM)
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

const researchResults = [
  {
    id: 'UxBptYu5boi0nuhWJNPa',
    name: 'Grendel Games',
    note: `== BATCH RESEARCH 2026-03-05 ==
Email: info@grendelgames.com
Contact: Anne Draaisma
Phone: +31 (0) 6 450 947 00
Address: Blokhuisplein 40, 8911 LJ Leeuwarden, Netherlands
LinkedIn: https://nl.linkedin.com/company/grendel-games (3.9K followers)
Website: https://grendelgames.com

FOCUS: Serious games for healthcare, education, sustainability, scenario-based learning.
NOT narrative entertainment games - they make training/simulation games.

LOW FIT for Director - not entertainment game studio.
Member of Dutch Games Association.`,
    status: 'cold',
    icpFit: 'low'
  },
  {
    id: 'VKLzapbaRA976qS7X5EL',
    name: '11 bit studios',
    note: `== BATCH RESEARCH 2026-03-05 ==
Email: info@11bitstudios.com
Key Contact: Michał Drozdowski (michal.drozdowski@11bitstudios.com)
Marketing Director: Lukasz Kukawski
Game Director: Tomasz Kisilewicz
CEO: Przemysław Marszał
Address: Brzeska 2, 03-737 Warsaw, Poland
Phone: +48 22 250 29 10
LinkedIn: https://www.linkedin.com/company/11bitstudios/ (39.7K followers)
Website: https://11bitstudios.com

GAMES: This War of Mine, Frostpunk, The Thaumaturge
FOCUS: Emotionally meaningful, narrative-heavy games

HIRING: Senior Narrative Designer (Project 12) - actively looking!
EXCELLENT FIT for Director - narrative-heavy studio, exactly our ICP.
Publicly traded (Warsaw Stock Exchange).`,
    status: 'hot',
    icpFit: 'excellent'
  },
  {
    id: 'WFCQjRvtcJlpoBZoywUa',
    name: 'Dimfrost Studio',
    note: `== BATCH RESEARCH 2026-03-05 ==
Email: contact@dimfroststudio.com
Alt Email: dimfroststudio@gmail.com
CEO/Founder: Fredrik Selldén
Location: Norrköping, Sweden
LinkedIn: https://linkedin.com/company/dimfrost-studio-ab (1.8K followers)
Facebook: https://facebook.com/dimfroststudio (2.9K followers)
Website: https://dimfrost.se

GAME: Bramble: The Mountain King (atmospheric, Nordic folklore horror)
FOCUS: Immersive storytelling, atmospheric environments
Founded: 2017
Size: 11-50 employees (grew to ~20)
Parent: Acquired by Zordix in 2019

EXCELLENT FIT for Director - narrative-driven, atmospheric games based on Nordic folklore.
Studio explicitly focuses on "storytelling and atmospheric environments."`,
    status: 'hot',
    icpFit: 'excellent'
  },
  {
    id: 'WJNJYeqVhI066fF4gwSi',
    name: 'Digital Mania Interactive',
    note: `== BATCH RESEARCH 2026-03-05 ==
Email: contact@digitalmaniastudio.com
Jobs: jobs@digitalmaniastudio.com
Phone: +216 71 862 780
Address: 44 bis, grand boulevard des berges du Lac, Tunis 1053, Tunisia
LinkedIn: https://linkedin.com/company/digitalmania-studio (1.1K followers)
Facebook: 7.8K followers
Instagram: @digitalmaniastd (760 followers)
Website: www.digitalmaniastudio.com

PLATFORMS: Mobile, Facebook, Kinect, Oculus Rift
Size: 11-50 employees
Location: Tunisia (indie studio)

MEDIUM FIT - indie studio but platforms suggest more casual/mobile focus.
Could be worth reaching out for Architect (narrative authoring tool).`,
    status: 'warm',
    icpFit: 'medium'
  },
  {
    id: 'WJvpMb3pKs1zq1hKk5CQ',
    name: 'Techouse Games',
    note: `== BATCH RESEARCH 2026-03-05 ==
Email: hrtechousegames@gmail.com (HR only)
Key Contact: Zohaib Ismail (LinkedIn 7.5K followers)
Location: Aitchison Society, Lahore, Pakistan
LinkedIn: https://pk.linkedin.com/company/techouse-games (7.9K followers)
Website: techousegames.com

GAMES: ATSS 2: TPS/FPS Gun Shooter
FOCUS: Mobile games, third-person/first-person shooters
Hiring: Unity Developers, Project Managers

LOW FIT for Director - focuses on action/shooter games, not narrative-heavy.
Mobile-focused, Pakistan-based studio.`,
    status: 'cold',
    icpFit: 'low'
  }
];

async function updateLeads() {
  console.log('Updating leads with research results...\n');

  for (const result of researchResults) {
    // Add note to notes collection
    await db.collection('notes').add({
      leadId: result.id,
      content: result.note,
      status: result.status,
      createdBy: 'batch-research',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Update lead status and pipeline stage
    await db.collection('leads').doc(result.id).update({
      status: 'researched',
      'pipeline.stageId': 'researched',
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log(`✅ ${result.name}: Added note (${result.status}) + marked researched`);
  }

  console.log('\nDone! Updated 5 leads.');
  process.exit(0);
}

updateLeads().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
