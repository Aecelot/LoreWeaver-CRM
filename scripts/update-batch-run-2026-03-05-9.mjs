// Batch research update - 2026-03-05 run 9
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
    id: 'J57hhNhRAFWerM12tgV1',
    name: 'Cupcake Entertainment',
    note: `**Research (2026-03-05)**

Brazilian F2P casual puzzle games studio based in Porto Alegre.

**Contact:**
- Email: contact@cupcakese.com
- LinkedIn: linkedin.com/company/cupcake-entertainment (1.8K followers)
- Facebook: @cupcakesocial (12.4K followers)
- Instagram: @cupcakeentertainment (590 followers)

**Notes:** LOW priority for LoreWeaver. Focus is casual puzzle games, not narrative.`,
    status: 'cold'
  },
  {
    id: 'J9x8HTy1rHghEUrVFKNG',
    name: 'Hybrid Humans',
    note: `**Research (2026-03-05)**

UAE indie studio based in Abu Dhabi (Hamdan Street). Female-founded by Fakhra AlMansouri.

**Contact:**
- Website: hybridhumans.ae
- LinkedIn: linkedin.com/company/hybridhumans (460 followers)
- Instagram: @hybridhumans (2.5K followers)

**Games:** Bye Bye Sheep, Who Lurks (iOS/Android)

**Notes:** MEDIUM priority. 3 employees. UAE regional connection could be valuable given Rijk's UAE company formation.`,
    status: 'cold'
  },
  {
    id: 'JkoOkWPudx9O8384pGnE',
    name: 'Gamsole',
    note: `**Research (2026-03-05)**

Africa's leading mobile game studio. Founded 2008, Lagos, Nigeria. 9M+ downloads worldwide.

**Contact:**
- Phone: +234 807 940 5773
- Address: 2b Oko Awo Street, Victoria Island, Lagos
- LinkedIn (founder): linkedin.com/in/abiola-olaniran-9a169223 (5.4K followers)
- Facebook: 53.2K followers
- Twitter: @GamsoleStudios

**Founder:** Abiola Olaniran

**Notes:** LOW-MEDIUM priority. Mobile-focused, not narrative-heavy. Pioneer in African game dev.`,
    status: 'cold'
  },
  {
    id: 'Jx727nDql1KEwJqfYtq5',
    name: 'Toge Productions',
    note: `**Research (2026-03-05)**

Indonesian indie game developer AND publisher. Founded 2011, based in Tangerang. BitSummit sponsor.

**Contact:**
- General: info@togeproductions.com
- Press: press@togeproductions.com / arya@togeproductions.com
- Publishing: publishing@togeproductions.com
- Game Fund: tgfi@togeproductions.com
- Address: Jl. Taman Elok Sel. No.976, Binong, Kec. Curug, Tangerang, Banten 15810
- LinkedIn: 7.6K followers
- Twitter: @togeproductions (84.4K followers)

**Notable Games:** Coffee Talk series, A Space for the Unbound, Infectonator, Necronator

**Notes:** **HIGH PRIORITY** for LoreWeaver! Known for narrative-driven games. Coffee Talk is visual novel/cafe sim. A Space for the Unbound is story-driven adventure. Also operates Toge Game Fund Initiative supporting SEA developers. Perfect Architect/Director customer.`,
    status: 'warm'
  },
  {
    id: 'JxhQaRTVeVBQekc6xvPR',
    name: 'Studio Bonza',
    note: `**Research (2026-03-05)**

Note: Search shows "Bonza Games" = Minimega (Australian puzzle studio). May be different from intended lead.

**Company found:** Minimega / Bonza Puzzles
**Location:** Regional NSW, Australia
**Founders:** Ben and Punya Huxter (founded 2014)

**Contact:**
- Email: info@bonza-games.com
- Press: ben.huxter@minimega.com.au
- Phone: +61 417 061 954
- Website: bonzapuzzles.com

**Notes:** LOW priority. Word puzzle games. Verify if this is correct Studio Bonza.`,
    status: 'cold'
  }
];

async function updateCRM() {
  const batch = db.batch();
  
  for (const item of updates) {
    // Add research note to notes collection
    const noteRef = db.collection('notes').doc();
    batch.set(noteRef, {
      leadId: item.id,
      content: item.note,
      status: item.status,
      createdBy: 'Skel (AI Research)',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    // Update lead status
    const leadRef = db.collection('leads').doc(item.id);
    batch.update(leadRef, {
      status: 'researched',
      'pipeline.stageId': 'researched',
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`Prepared update for ${item.name}`);
  }
  
  await batch.commit();
  console.log('\nBatch committed successfully!');
  process.exit(0);
}

updateCRM().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
