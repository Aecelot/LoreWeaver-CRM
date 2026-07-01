// Batch research update - 2026-03-05 Run 26
// Studios researched: Rogue Snail, Telltale Games (New), Bloober Team, Quirkat, OKAM Studio

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

const researchData = [
  {
    id: 'sIhygPFAm3KTFZoN1O8Y',
    name: 'Rogue Snail',
    note: `**Research completed 2026-03-05**

**Company Info:**
- Brazilian indie studio, fully remote
- Known for: Relic Hunters series, Star Vikings Forever
- LinkedIn: 7.9K+ followers

**Contact Details:**
- General: administrativo@roguesnail.com
- Press/Business: press@roguesnail.com
- Support: support@roguesnail.com
- Website: https://roguesnail.com

**Key Contacts:**
- Mark Venturelli (CEO) - mventurelli@gmail.com

**Narrative Fit:** Indie studio known for character-driven games. Good Director prospect.`,
    status: 'warm'
  },
  {
    id: 'scJs3AmSCjbipZNvqmO3',
    name: 'Telltale Games (New)',
    note: `**Research completed 2026-03-05**

**Company Info:**
- Re-founded under LCG Entertainment (2019)
- HQ: Malibu, California
- Pioneer in narrative adventure games
- LinkedIn: 25.5K+ followers
- Twitter: @telltalegames (840.9K followers)

**Contact Details:**
- Support: support@telltalegames.com
- Email format: FLast@telltale.com
- Phone: (415) 258-1638
- Website: telltale.com
- PR: telltale.com/about-us

**Key Products:** The Walking Dead, The Expanse, Wolf Among Us

**Narrative Fit:** MAJOR Director target - pioneers of episodic narrative games. High priority.`,
    status: 'hot'
  },
  {
    id: 'ug4rvvotbCuUzbvWSF96',
    name: 'Bloober Team',
    note: `**Research completed 2026-03-05**

**Company Info:**
- Polish studio (Kraków), 250+ employees
- Established 2008, publicly traded
- Specializes in psychological horror
- Facebook: 36.4K+ followers

**Contact Details:**
- HR/Creative: hr@blooberteam.com
- Email format: First.Last@blooberteam.com
- Phone: +48 123538555
- Website: www.blooberteam.com
- PR/Press: blooberteam.prowly.com

**Key Contacts:**
- Mateusz Lenart (Creative Director)
- Andrzej Mądrzak (Lead Writer) - andrzej.madrzak@blooberteam.com

**Key Products:** Silent Hill 2 Remake, Observer, Layers of Fear, The Medium

**Narrative Fit:** Strong narrative focus in horror. Great Director prospect for atmospheric storytelling.`,
    status: 'hot'
  },
  {
    id: 'tHARMSecLU7pQK9keScd',
    name: 'Quirkat',
    note: `**Research completed 2026-03-05**

**Company Info:**
- Pioneering MENA game studio
- HQ: Dubai, Studio: Amman Jordan, Also London
- First major video game studio from Middle East

**Contact Details:**
- Email: info@quirkat.com
- Phone: +962 6 5858912
- Website: quirkat.com

**Key Contacts:**
- Mahmoud Ali Khasawneh (CEO/CTO)

**Key Products:** Arabian Lords, Pro Foosball

**Narrative Fit:** Regional pioneer with cultural storytelling focus. Good for MENA market entry.`,
    status: 'warm'
  },
  {
    id: 'uuhGARd15OpBhPsInk8Q',
    name: 'OKAM Studio',
    note: `**Research completed 2026-03-05**

**Company Info:**
- Argentinian studio (Buenos Aires) - CLOSED
- Award-winning indie developer
- Used Godot Engine
- Facebook: 3.1K+ followers

**Contact Details:**
- Email: contact@okamgames.com
- Alt email: martina@okamstudio.com
- Phone: +54 9 114553 3086

**Key Contacts:**
- Martina Santoro (Founder) - now Executive Producer at Annapurna Interactive
- LinkedIn: 9.5K+ followers
- Also: President of ADVA (Argentina Video Game Developers Association)

**Key Products:** Realms of the Void

**Narrative Fit:** Studio closed but founder now at Annapurna - potential connection for larger partnerships.`,
    status: 'cold'
  }
];

async function updateLeads() {
  console.log('Updating CRM with research data...\n');
  
  for (const data of researchData) {
    try {
      // Update lead status
      await db.collection('leads').doc(data.id).update({
        status: 'researched',
        'pipeline.stageId': 'researched',
        updatedAt: FieldValue.serverTimestamp()
      });
      
      // Add research note
      await db.collection('notes').add({
        leadId: data.id,
        content: data.note,
        status: data.status,
        createdBy: 'Skel (batch research)',
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp()
      });
      
      console.log(`✓ ${data.name} - updated and note added`);
    } catch (error) {
      console.error(`✗ ${data.name} - error:`, error.message);
    }
  }
  
  console.log('\nDone!');
}

updateLeads();
