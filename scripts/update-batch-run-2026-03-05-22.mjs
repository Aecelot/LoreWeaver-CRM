// Batch Research Update - Run 22 - 2026-03-05 06:37 AM
// Studios: Fried Chicken Games, F and F Digital Media, Almost Human, Nimble Giant Entertainment, Jiwe Studios

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(readFileSync('../service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const updates = [
  {
    id: 'jEqpBAAPbC9TqJmduJWT',
    company: 'Fried Chicken Games',
    note: `**Research (2026-03-05):** No verifiable game studio found with this name. Google AI Overview confirms no indexed entity. Possible confusion with "Little Chicken Game Company" (Amsterdam, Netherlands) or "Fried Chicken Labs" (Web3/blockchain gaming - not narrative-focused). Recommend verifying lead source or removing.`,
    status: 'cold'
  },
  {
    id: 'jcAbSfka6neybUiWAtNN',
    company: 'F and F Digital Media',
    note: `**Research (2026-03-05):** No verifiable game studio found with this name. Google AI confirms not in major industry databases. Possibly a small indie or misidentified entity. Related but unrelated companies found: F+F Distribution GmbH (game distribution, Germany), F&F Productions LLC (media production, Florida). Recommend verifying lead source or removing.`,
    status: 'cold'
  },
  {
    id: 'kXIfjuyifeLeez1PVAU1',
    company: 'Almost Human',
    note: `**Research (2026-03-05):**
- **Email:** contact@almosthuman.fi
- **Website:** almosthuman.fi / almosthumangames.com
- **Location:** Keilaranta 1, FI-02150 Espoo, Finland
- **Founded:** 2011 by four game industry veterans
- **Business ID:** 2390221-8
- **Known for:** Legend of Grimrock series (dungeon crawler RPGs)
- **Focus:** First-person dungeon crawling RPGs inspired by classics like Ultima Underworld
- **Status:** Dormant - no recent releases, but studio still registered`,
    status: 'warm',
    email: 'contact@almosthuman.fi',
    website: 'https://www.almosthuman.fi'
  },
  {
    id: 'klXVapWsRBbWoI4JSmc3',
    company: 'Nimble Giant Entertainment',
    note: `**Research (2026-03-05):**
- **Email:** contact@nimblegiant.com
- **Phone:** +54 11 4890 8609
- **Website:** nimblegiant.com
- **Location:** Buenos Aires, Argentina (offices in Uruguay, Chile, Peru, Barcelona, Sweden)
- **Founded:** 2002 (formerly NGD Studios until 2019)
- **Key people:** Adrian Lastres (Game Director), Lucas Wall (COO), Nicolas Maier (CTO)
- **Known for:** Champions of Regnum, Master of Orion (co-development)
- **Focus:** Leading Latin American game studio, PC/Console/Platform games
- **LinkedIn:** 610+ followers`,
    status: 'warm',
    email: 'contact@nimblegiant.com',
    website: 'https://nimblegiant.com'
  },
  {
    id: 'kqe4SzVLaZVmYNVXFZWz',
    company: 'Jiwe Studios',
    note: `**Research (2026-03-05):**
- **Email:** rock@jiwe.io
- **Phone:** +2547 2674 8696
- **Website:** jiwe.studio / jiwe.io
- **Location:** Nairobi, Kenya (also UK presence)
- **Focus:** Pan-African video game developer and publisher
- **Key person:** Benny Waweru (Lead Game Developer)
- **Partnerships:** ADMI (creative training), Blackhards (indie dev support)
- **Activities:** Jiwe Game Jams, NGDC (Nairobi Game Development Conference)
- **LinkedIn:** 610+ followers
- **Note:** Strong focus on African game development ecosystem`,
    status: 'warm',
    email: 'rock@jiwe.io',
    website: 'https://jiwe.studio'
  }
];

async function updateLeads() {
  console.log('Starting CRM updates...\n');
  
  for (const update of updates) {
    try {
      // Update lead status and fields
      const leadUpdate = {
        status: 'researched',
        'pipeline.stageId': 'researched',
        updatedAt: FieldValue.serverTimestamp()
      };
      
      if (update.email) leadUpdate.email = update.email;
      if (update.website) leadUpdate.website = update.website;
      
      await db.collection('leads').doc(update.id).update(leadUpdate);
      
      // Add research note
      await db.collection('notes').add({
        leadId: update.id,
        content: update.note,
        status: update.status,
        createdBy: 'skel-research-bot',
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp()
      });
      
      console.log(`✓ Updated: ${update.company} (${update.id})`);
    } catch (error) {
      console.error(`✗ Failed: ${update.company} - ${error.message}`);
    }
  }
  
  console.log('\nDone!');
}

updateLeads();
