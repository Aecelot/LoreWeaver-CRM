import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(readFileSync('../service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const updates = [
  {
    id: '8yfmN78Hd2jVE8vyifSW',
    name: 'Yacht Club Games',
    note: `**Research (2026-03-05)**
- Website: https://yachtclubgames.com
- Emails: support@yachtclubgames.com (general), media@yachtclubgames.com (media/business), bizdev@yachtclubgames.com (business dev), retail@yachtclubgames.com (retail)
- Address: 1849 Sawtelle Suite #500, Los Angeles, CA 90025
- Key People: Sean Velasco (Developer, LinkedIn), David D'Angelo (Co-Founder & Programmer)
- Known for: Shovel Knight, Mina the Hollower
- Email format: [first_initial][last]@yachtclubgames.com
- LoreWeaver Fit: AAA indie with strong narrative/character work, good Director prospect`,
    status: 'researched',
    website: 'https://yachtclubgames.com'
  },
  {
    id: '93ycS6USAQzmuaa4g82q',
    name: 'Peak Games',
    note: `**Research (2026-03-05)**
- Website: https://peak.com
- Emails: contact@peak.com (general), press@peak.com (press), partnerships@peak.com (partnerships), support@peak.com (support)
- Location: Istanbul, Turkey
- Founded: 2010 by Sidar Şahin
- Known for: Toy Blast, Toon Blast (casual puzzle games)
- Acquired by Zynga
- Status: Mobile/casual focus, less narrative-driven
- LoreWeaver Fit: LOW - casual puzzle games, not narrative-focused`,
    status: 'researched',
    website: 'https://peak.com'
  },
  {
    id: '9MCJDILQ5cWW8QOfOMnu',
    name: 'Respawn Entertainment',
    note: `**Research (2026-03-05)**
- Website: https://www.respawn.com
- General inquiries: info@respawn.com
- Email format: FirstLast@respawn.com (50%) or First@respawn.com (32%)
- CEO: Vince Zampella (vince@respawn.com)
- Narrative Director: Amanda Doiron (Vancouver)
- Phone: (310) 749-1105
- Address: 5990 Sepulveda Blvd, Van Nuys, CA 91411 (HQ), also Vancouver & Madison WI
- Parent: Electronic Arts (EA)
- Known for: Apex Legends, Titanfall, Star Wars Jedi series
- LoreWeaver Fit: HIGH - narrative-driven action games, Star Wars Jedi series is prime Director territory. EA enterprise relationship.`,
    status: 'researched',
    website: 'https://www.respawn.com'
  },
  {
    id: '9NJa9sMX8DEA8a5jzWqQ',
    name: 'VOX Game Studio',
    note: `**Research (2026-03-05)**
- Website: https://gamecompanies.com/companies/vox-game-studio (no main website found)
- Email: contato@voxstudios.com.br
- Location: R. 24 de Outubro, 1681 - sala 1005, Porto Alegre - RS, Brazil
- Founded: 2011
- Projects: 25+ released, known for Kaze and the Wild Masks
- Attending: gamescom LATAM 2026
- LoreWeaver Fit: MEDIUM - Brazilian indie with platformer focus, less narrative but could be Architect prospect`,
    status: 'researched',
    website: ''
  },
  {
    id: '9yX7qPsUlEAfbnHm9mZ5',
    name: 'Manga Productions',
    note: `**Research (2026-03-05)**
- Website: https://manga.com.sa
- Contact page: https://manga.com.sa/contact-us (form-based)
- Japan branch: https://mangaproductions.co.jp
- Email format: [name]@manga.com.sa
- CEO: Essam Bukhary
- Location: Al-Fazary Square, Diplomatic Quarter, Riyadh, KSA
- Parent: MiSK Foundation (Mohammed bin Salman)
- LinkedIn: 19.8K+ followers
- Focus: Animation, video games, comics with patriotic Saudi themes
- LoreWeaver Fit: HIGH - animation/games studio with narrative focus, regional leader, well-funded (sovereign wealth)`,
    status: 'researched',
    website: 'https://manga.com.sa'
  }
];

async function run() {
  for (const u of updates) {
    // Add note
    await db.collection('notes').add({
      leadId: u.id,
      content: u.note,
      status: 'cold',
      createdBy: 'skel',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    });
    
    // Update lead status and website
    const updateData = {
      status: u.status,
      'pipeline.stageId': u.status,
      updatedAt: FieldValue.serverTimestamp()
    };
    if (u.website) updateData.website = u.website;
    
    await db.collection('leads').doc(u.id).update(updateData);
    console.log(`Updated: ${u.name}`);
  }
  console.log('Done!');
}

run();
