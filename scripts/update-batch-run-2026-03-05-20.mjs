// Batch research update - 2026-03-05 run 20
// Studios: DivineKids, Playtika, Moon Active, Sky Mavis, Maysalward

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

const updates = [
  {
    id: 'ceuBDG56VwBmDKgbg2sO',
    name: 'DivineKids',
    note: `**Research Notes (2026-03-05)**
- **Type:** Indonesian game studio (historical, founded early 2000s)
- **Founder:** David Setiabudi
- **Location:** Indonesia
- **Notable Games:** Petualangan DivineKids (2004 RPG), 13 Kerajaan (13 Kingdoms RPG), Campus Fighter
- **Recognition:** Won awards at Indonesia Game Show 2012
- **Status:** Appears to be a legacy studio from early Indonesian game dev scene
- **Contact:** No direct contact found - historical studio
- **Notes:** Pioneer of Indonesian game development, significant cultural impact`,
    status: 'researched'
  },
  {
    id: 'csL5XlaQkTW1Inwi6ek6',
    name: 'Playtika',
    note: `**Research Notes (2026-03-05)**
- **Type:** Public company, social casino games (NASDAQ: PLTK)
- **Website:** playtika.com
- **HQ:** 8 HaChoshlim St., Herzliya Pituarch, Tel Aviv, Israel
- **Phone:** +972 733163251
- **Founded:** 2010 by Robert Antokol (CEO)
- **Employees:** 3,700+
- **Contact Emails:**
  - General: info@playtika.com
  - Press: press@playtika.com
  - Privacy: privacy@playtika.com
  - Legal: dmca@playtika.com
- **Focus:** Social casino games (Slotomania, Bingo Blitz, Caesars Slots, Best Fiends)
- **Relevance:** Very large, likely not a Director target (casino focus)`,
    status: 'researched'
  },
  {
    id: 'cw9A0G6yAuGh46qKcv8V',
    name: 'Moon Active',
    note: `**Research Notes (2026-03-05)**
- **Type:** Mobile game company (one of world's fastest-growing)
- **Website:** moonactive.com
- **HQ:** Tel Aviv, Israel
- **CEO:** Samuel Albin (samuel@moonactive.com)
- **Founded:** Early 2010s
- **Contact Emails:**
  - General: info@moonactive.com
  - Privacy portal: www.moonactive-privacy.com
  - Email format: First@moonactive.com
- **Flagship Game:** Coin Master (massive casual hit)
- **Focus:** Casual mobile games
- **Relevance:** Large casual game company - different market than Director's RPG/narrative focus`,
    status: 'researched'
  },
  {
    id: 'eJ4hjT4FI8SZn3TmV51T',
    name: 'Sky Mavis',
    note: `**Research Notes (2026-03-05)**
- **Type:** Blockchain gaming / Web3 studio (Unicorn status)
- **Website:** skymavis.com
- **HQ:** Singapore (Sky Mavis PTE. LTD.)
- **Founded:** 2019
- **Founders:** Aleksander Leonard Larsen, Trung Nguyen, Jeffrey Zirlin
- **Contact:** aleksander@skymavis.com
- **Email format:** firstname@skymavis.com or first.last@skymavis.com
- **Support:** support.axieinfinity.com
- **Flagship:** Axie Infinity (play-to-earn blockchain game), Ronin blockchain
- **Focus:** Player-owned economies, NFT gaming, Web3
- **Relevance:** Blockchain focus different from Director's traditional RPG narrative`,
    status: 'researched'
  },
  {
    id: 'eggdsZkMKNJYVymu0ESV',
    name: 'Maysalward',
    note: `**Research Notes (2026-03-05)**
- **Type:** Mobile casual games developer (MENA region leader)
- **Website:** maysalward.com
- **HQ:** 24 King Hussein Business Park, Amman 11183, Jordan
- **Founded:** 2003 by Nour Khrais
- **Phone:** +962 79 6900217
- **Contact Emails:**
  - General: info@maysalward.com
  - Support: support@maysalward.com
- **Size:** 11-50 employees
- **Also:** HyperCasual studio in Leamington Spa, UK
- **Games:** Leo's Match Three Quest, Dominoes Infinite, casual mobile games
- **Focus:** Casual/HyperCasual mobile games
- **Relevance:** Casual game focus, not narrative-heavy - low Architect fit`,
    status: 'researched'
  }
];

async function run() {
  const now = admin.firestore.Timestamp.now();
  
  for (const u of updates) {
    console.log(`Updating ${u.name} (${u.id})...`);
    
    // Add note to notes collection
    await db.collection('notes').add({
      leadId: u.id,
      content: u.note,
      status: 'cold',
      createdBy: 'system-research',
      createdAt: now,
      updatedAt: now
    });
    
    // Update lead status
    await db.collection('leads').doc(u.id).update({
      status: u.status,
      'pipeline.stageId': u.status,
      updatedAt: now
    });
    
    console.log(`  ✓ Added note and set status to ${u.status}`);
  }
  
  console.log('\nDone! Updated 5 studios.');
}

run().catch(console.error);
