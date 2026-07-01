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
const FieldValue = admin.firestore.FieldValue;

const updates = [
  {
    id: 'BTcQbsfMosN4gfVQ9z8r',
    name: 'Instinct Games',
    note: `**RESEARCH COMPLETED - 2026-03-05**

**Company:** Instinct Games
**Location:** Heliopolis, Cairo, Egypt
**Founded:** 2011
**Website:** https://www.instinctgames.com
**LinkedIn:** linkedin.com/company/instinct-games

**Notable Games:** ARK Survival Evolved, Atlas (co-development)

**Key Contacts:**
- Mostafa Hafez - Founder & CEO
- Mohamed Seif - Development Manager
- Omar Gad - Game Designer

**Email:** info@instinctgames.com
**Address:** 110 El Merghany St. Heliopolis, Cairo, Egypt

**Profile:** Egypt's leading game development studio, specializing in high-quality games across all platforms. Work-for-hire development services.`,
    status: 'researched'
  },
  {
    id: 'CMIQX6ya78Vr0ee20Ek7',
    name: 'Metaverse Studios',
    note: `**RESEARCH COMPLETED - 2026-03-05**

**Company:** Metaverse Game Studios, Inc.
**Location:** St. Petersburg, Florida, USA
**Founded:** 2020
**Founder:** Erkan Bayol
**Website:** www.angelicthegame.com / metaverse.gs
**LinkedIn:** linkedin.com/company/metaverse-game-studios

**Main Project:** Angelic - Narrative multiplayer strategy RPG (blockchain-based)

**Email:** hey@metaverse.gs
**Phone:** 938.442.3002
**HQ:** 7901 4th Street North, Suite 300, St. Petersburg, FL 33702

**Profile:** Blockchain game development studio focused on cross-platform game development and publishing. Deep storytelling, lore development, turn-based strategy with MMORPG elements. NARRATIVE-HEAVY - good Architect fit!`,
    status: 'researched'
  },
  {
    id: 'CvWIpstdwQfJToJz9Qk0',
    name: 'King Kode Studio',
    note: `**RESEARCH COMPLETED - 2026-03-05**

**Company:** KingKode Game Studio
**Location:** Karaj, Iran
**Website:** https://kingkodestudio.ir / https://privacy.kingcodestudio.com
**LinkedIn:** linkedin.com/company/kingkodegamestudio (760+ followers)

**Company Size:** 11-50 employees

**Email:** kingkodegamestudio@gmail.com / info@kingkodestudio.com
**Phone:** +98 26 34001281

**Profile:** Iranian mobile game development studio. Focus on mobile games and applications. Website has Persian content.`,
    status: 'researched'
  },
  {
    id: 'DMAyLyK2xGxQBfN0FrsF',
    name: 'Gamestorm Studios',
    note: `**RESEARCH COMPLETED - 2026-03-05**

**Company:** The Game Storm Studios (Private) Limited
**Location:** Lahore, Pakistan (HQ) + Dubai, UAE
**Founded:** 2013
**Founders:** Raheel Iqbal, Usman Sheikh, Harris
**Website:** https://www.thegamestormstudios.com
**LinkedIn:** pk.linkedin.com/company/game-storm-studios (32K+ followers)

**Company Size:** 151-200 employees
**Pakistan's largest game development studio**

**Email:** info@thegamestormstudios.com
**Privacy:** privacy@thegamestormstudios.com
**Phone (Pakistan):** +92 42 35972029
**Phone (Dubai):** +971 4 580 9797

**Offices:**
- Lahore HQ: 15th Floor, Arfa Software Technology Park, Ferozpur Road
- Dubai: Tiffany Tower, JLT

**Profile:** Full-service game and mobile app development studio with 10+ years experience. Mobile, PC, and console game development. Large team, good capacity for B2B services.`,
    status: 'researched'
  },
  {
    id: 'DsMIxEabnaQSDg04soBb',
    name: 'RealityArts Studio',
    note: `**RESEARCH COMPLETED - 2026-03-05**

**Company:** RealityArts Studio
**Location:** Istanbul, Turkey
**Founded:** 2016
**Co-Founders:** Ismail Ciftcioglu (Director), Bahar Baziki
**Website:** http://realityartsstudio.com
**LinkedIn:** linkedin.com/company/realityarts-studio (430+ followers)
**Facebook:** @realityartsst (7.8K+ followers)

**Company Size:** 2-10 employees (small indie)

**Main Game:** Unawake (action-adventure, published by Toplitz Productions)

**Email:** info@realityartsstudio.com
**Contact Page:** http://realityartsstudio.com/contact

**Profile:** AAA-quality PC & console game development, VR, immersive experiences. Small indie team with movie/production industry background. Note: They explicitly state they do not accept unsolicited scenarios/presentations.`,
    status: 'researched'
  }
];

async function updateLeads() {
  for (const update of updates) {
    try {
      // Update lead status and pipeline stage
      await db.collection('leads').doc(update.id).update({
        status: update.status,
        'pipeline.stageId': update.status,
        updatedAt: FieldValue.serverTimestamp()
      });
      
      // Add research note
      await db.collection('notes').add({
        leadId: update.id,
        content: update.note,
        status: 'cold',
        createdBy: 'Skel (batch research)',
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp()
      });
      
      console.log(`✓ Updated: ${update.name}`);
    } catch (err) {
      console.error(`✗ Error updating ${update.name}:`, err.message);
    }
  }
  
  console.log('\nDone!');
}

updateLeads();
