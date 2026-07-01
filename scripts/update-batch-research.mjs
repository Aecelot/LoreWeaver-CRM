import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';

const sa = JSON.parse(readFileSync('./service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const updates = [
  {
    id: '47hFCTkn5HqorlhBI7I9',
    name: 'The Scourge Team',
    note: `RESEARCHED 2026-03-05 via browser

Vietnamese horror game (The Scourge / Tai Ương) by Rare Reversee and Beaztek.
Contact: Via Steam store page only
Released: Oct 2024

Small indie team, low priority for LoreWeaver outreach.`,
    status: 'cold'
  },
  {
    id: '4E3ojH8SpT6qTt0lLRmb',
    name: 'Miniboss',
    note: `RESEARCHED 2026-03-05 via browser

Indie studio by Pedro Medeiros, Amora B., and Heidy Motta.
Known for: Celeste, TowerFall, Out There Somewhere
Contact: studiominiboss.itch.io (no direct email found)
Pedro Medeiros - Art/Narrative, reachable via Twitter/X

Notable studio - pixel art expertise. Good Architect candidate.`,
    status: 'warm'
  },
  {
    id: '5MUt9JXOr2W1z8Yi3afE',
    name: 'Santa Monica Studio',
    note: `RESEARCHED 2026-03-05 via browser

AAA PlayStation studio (God of War series)
Email: sms@sony.com
Email format: First.Last@playstation.com
Narrative Director: Matt Sophos
Creative Director: Cory Barlog
LinkedIn: linkedin.com/company/santa-monica-studio
Address: 13031 W Jefferson Blvd, Suite 600, Los Angeles, CA 90094
501-1000 employees

Top-tier enterprise Director target!`,
    status: 'hot',
    email: 'sms@sony.com'
  },
  {
    id: '5RutuVQbIiLHhLLjJXUD',
    name: 'Leti Arts',
    note: `RESEARCHED 2026-03-05 via browser

African-focused narrative game studio (Ghana + Kenya)
Email: info@letiarts.com
Founders: Eyram Tawiah, Wesley Kirinya
Lead Game Dev: Robertson Nortey
Phone: +233 20 121 5655
Address: No 7 Nuumo Odametey Ave, Adenta, Accra, Ghana
Founded: 2009
Games: Africa's Legends, Sweave, Puzzle Scout
Tech: JavaScript, HTML, PHP

Strong narrative focus on African storytelling - excellent Architect fit!`,
    status: 'warm',
    email: 'info@letiarts.com'
  },
  {
    id: '5jLFUfaTenbZviXFNolf',
    name: 'Double Dash Studios',
    note: `RESEARCHED 2026-03-05 via browser

Brazilian indie studio (Rio de Janeiro)
Email: contato@doubledashstudios.com
Founded: 2017
Website: doubledashstudios.com
Games: Sky Racket (Steam + Switch), Irmão do Jorel game
Instagram: @doubledashstu (4.9K)
Facebook: @DoubleDashSTU (2.8K)

Solid indie studio, good Architect candidate.`,
    status: 'warm',
    email: 'contato@doubledashstudios.com'
  }
];

(async () => {
  for (const u of updates) {
    // Add note
    await db.collection('notes').add({
      leadId: u.id,
      content: u.note,
      status: u.status,
      createdBy: 'skel-batch',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    // Update lead
    const updateData = {
      status: 'researched',
      'pipeline.stageId': 'researched',
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    if (u.email) updateData.contactEmail = u.email;
    
    await db.collection('leads').doc(u.id).update(updateData);
    console.log('✓', u.name);
  }
  console.log('Done!');
  process.exit(0);
})();
