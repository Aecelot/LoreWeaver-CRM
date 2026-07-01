// Batch research update: 2026-03-05 Run 5 (5 studios)
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
    id: 'E1CoNgyqU1DmCcQrh8lQ',
    name: 'Dark Space Studios',
    note: `**Research (2026-03-05)**
- **Email:** darkspaceltd@gmail.com
- **Phone:** +20 10 13631784
- **Location:** Egypt
- **Facebook:** @Darkspacestudio (3.3K followers)
- Egyptian game development studio`,
    status: 'researched'
  },
  {
    id: 'E3kihO5hHtsnPxJRb3J1',
    name: 'Play Spare',
    note: `**Research (2026-03-05)**
- **Website:** playspare.com
- **Location:** Pakistan
- **Founded:** 2019
- **Type:** B2C mobile game developer
- No direct email found - limited online presence`,
    status: 'researched'
  },
  {
    id: 'ELUQ5CxZatP0H9rtFDjR',
    name: 'Nyamakop',
    note: `**Research (2026-03-05)**
- **Press/Creator Contact:** nyamakop@mooncat.games
- **HR Email:** hr@nyamakop.co.za
- **Website:** nyamakop.co.za
- **Location:** Johannesburg, South Africa
- **Games:** Relooted, Semblance (Africa's first Nintendo game)
- **LinkedIn:** 2.4K+ followers
- Polygon called them "one of the most promising studios in African game development"
- Strong narrative focus - excellent Director prospect`,
    status: 'researched'
  },
  {
    id: 'EhflS3FBSoOoIS79gCKT',
    name: 'Asobo Studio',
    note: `**Research (2026-03-05)**
- **Email:** contact@asobostudio.com
- **CEO:** Sebastian Wloch (swloch@asobostudio.com)
- **Phone:** +33 5 56 01 04 98
- **Address:** 6 rue de la Seiglière, 33800 Bordeaux, France
- **Website:** asobostudio.com
- **Games:** A Plague Tale: Innocence/Requiem, Microsoft Flight Simulator
- **Facebook:** 16K+ followers
- Major AAA narrative studio - top Director prospect
- Also has HoloForge AR division`,
    status: 'researched'
  },
  {
    id: 'Eu0e76lQM1bmoZdSiTfW',
    name: 'Oktagon Games',
    note: `**Research (2026-03-05)**
- **General Email:** oktagongames@gmail.com
- **Business Contact:** ronaldo@oktagongames.com
- **Phone:** +55 21 3178-4436
- **Website:** oktagon.com.br
- **Location:** Rio de Janeiro, Brazil
- **Games:** MTG Puzzle Quest (official developer)
- Specializes in F2P mobile games and LiveOps
- **Note:** Acquired by Fortis Games in 2020
- **LinkedIn:** 5.6K+ followers`,
    status: 'researched'
  }
];

async function updateLeads() {
  console.log('Updating leads with research notes...\n');
  
  for (const update of updates) {
    try {
      // Update lead status
      await db.collection('leads').doc(update.id).update({
        status: update.status,
        'pipeline.stageId': update.status,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      // Add note to notes collection
      await db.collection('notes').add({
        leadId: update.id,
        content: update.note,
        status: 'warm',
        createdBy: 'skel-batch-research',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      console.log(`✅ ${update.name}: Updated to ${update.status} + note added`);
    } catch (error) {
      console.error(`❌ ${update.name}: ${error.message}`);
    }
  }
  
  console.log('\nDone!');
  process.exit(0);
}

updateLeads();
