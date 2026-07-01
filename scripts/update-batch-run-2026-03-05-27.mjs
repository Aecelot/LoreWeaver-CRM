// Batch research update - 2026-03-05 Run #27
// Studios researched via browser

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(
  readFileSync('C:/Users/rijkg/OneDrive/Documenten/GitHub/LoreWeaver-CRM/service-account.json', 'utf8')
);

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const updates = [
  {
    id: 'tLvJ8Sb4aM3QlhdcWDHY',
    name: 'Khanga Rue',
    note: `DISQUALIFIED - Not a game studio.

Khanga Rue is a creative/advertising agency based in Dar es Salaam, Tanzania, focused on social impact and behavioral change campaigns. Part of TBWA Global Collective.

Website: https://www.khangarue.com
LinkedIn: https://tz.linkedin.com/company/khangarue (620+ followers)
Phone: +255 742 234 432
Creative Director: Pat Olvera

Not relevant for LoreWeaver - they don't make games.`,
    status: 'disqualified'
  },
  {
    id: 'tM615ol6j4TNd8KAie2o',
    name: 'Puya Arts',
    note: `Iranian game studio known for Quest of Persia series - narrative-focused action-adventure games about Persian history/culture.

CONTACT:
- Puya Dadgar (Founder/Designer): https://www.linkedin.com/in/puyadadgar
- Now at Meta in Redmond, WA

NARRATIVE FOCUS: Yes - historical Persian narratives, cultural storytelling
GAMES: Quest of Persia series (The End of Innocence, Lotfali Khan Zand, Nader's Blade)
AWARDS: Game Connection America 2024 - Grand Award & Best Console Game for "Salvation"

Good Director prospect - narrative-driven historical games.`,
    status: 'researched',
    website: 'https://en.wikipedia.org/wiki/Quest_of_Persia'
  },
  {
    id: 'um5oSMyDr5oxFnNWUein',
    name: 'Inka Studios',
    note: `Small indie game studio from Arequipa, Peru (Latin America, not Africa).

CONTACT:
- Email: contactus@inkastudios.com
- Phone: 958312916
- Facebook & Twitter: @InkaStudios

GAMES: Inka Runners, Quiero mi Ceviche, I'm not late
Focus: Mobile/casual games

Lower priority - casual games, no clear narrative focus.`,
    status: 'researched',
    website: 'https://topgamedevelopers.com/gaming/studios/latin-america/peru/arequipa/inka-studios/',
    region: 'Latin America'
  },
  {
    id: 'un5uZjMNUTmFl4sZvbXl',
    name: 'KAUST Game Jam winner',
    note: `Should be renamed to: Spoilz Games

Saudi Arabia mobile gaming studio founded 2020. Won KAUST Game Jam for narrative excellence.

CONTACT:
- Website: www.spoilz.studio
- Email: hi@spoilz.studio
- Phone: +966 54 4060616
- CEO: Musab Almalki
- LinkedIn: Spoilz Games
- Location: Al Yasmeen District, Anas Bin Malik Road, Riyadh, Saudi Arabia

GAMES: Break'em All, Jet Warrior, Re-Train, Smack Sack
FUNDING: $693K pre-seed (April 2022)
NARRATIVE: Won excellence in narrative for "Re-Train"

Good prospect - Saudi cultural games with narrative focus.`,
    status: 'researched',
    website: 'https://www.spoilz.studio',
    suggestedName: 'Spoilz Games'
  },
  {
    id: 'vN97P8tknSsxWTJKhrWS',
    name: 'Internet of Elephants',
    note: `Nairobi-based conservation gaming studio - uses real wildlife data to create narrative experiences.

CONTACTS:
- General: info@internetofelephants.com
- Founder: Gautam Shah - gautam@internetofelephants.com
- Press/Partnerships: Anne Miltenburg - anne@internetofelephants.com
- Phone: +254 713 214 324 / +254 715 277 453 (East Africa Time)

Website: https://www.internetofelephants.com
Facebook: 2.7K+ followers
LinkedIn: Abhilash Krishnan (Growth & Insights)

GAMES: Wildeverse, Run Wild, Unseen Empire
FOCUS: AR conservation games, real animal data, wildlife storytelling

EXCELLENT PROSPECT - Narrative-driven wildlife experiences, educational games. Perfect fit for Director's emergent storytelling.`,
    status: 'researched',
    website: 'https://www.internetofelephants.com'
  }
];

async function run() {
  for (const u of updates) {
    // Add note to notes collection
    await db.collection('notes').add({
      leadId: u.id,
      content: u.note,
      status: u.status === 'disqualified' ? 'cold' : 'warm',
      createdBy: 'skel-batch-research',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    });
    
    // Update lead status
    const leadUpdate = {
      status: u.status,
      'pipeline.stageId': u.status,
      updatedAt: FieldValue.serverTimestamp()
    };
    if (u.website) leadUpdate.website = u.website;
    
    await db.collection('leads').doc(u.id).update(leadUpdate);
    console.log(`Updated ${u.name} (${u.id}) -> ${u.status}`);
  }
  console.log('Done!');
}

run().catch(console.error);
