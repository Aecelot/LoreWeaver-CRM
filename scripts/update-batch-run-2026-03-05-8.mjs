// Batch research update - 2026-03-05 run 8
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
    id: 'HmsS7EcS2rn6uhCdn207',
    name: 'Swordtales',
    note: `**Research (2026-03-05)**

Brazilian indie studio known for "Toren" (2015, PS4/PC). Adventure game with Team Ico-style narrative.

**Contact:**
- Email: contato@toren-game.com (from 2017 job posting)
- Website: http://toren-game.com/
- Facebook: facebook.com/Swordtales (2.6K followers)

**Publisher:** Versus Evil

**Notes:** Studio appears inactive since 2017. Email may be outdated. No recent releases found.`,
    status: 'cold'
  },
  {
    id: 'ILcFsXxZZIMkn59I7Tr8',
    name: 'Cat Nigiri',
    note: `**Research (2026-03-05)**

Brazilian indie studio based in Florianópolis, Santa Catarina. Founded 2012, 2-10 employees. Known for "Necrosphere Deluxe" (Switch/PS4/Vita).

**Contact:**
- Website: http://www.catnigiri.com
- LinkedIn: linkedin.com/company/cat-nigiri (1.1K followers)
- Facebook: facebook.com/catnigiri (2.6K followers, 4.6★ rating)

**Publisher:** Phoenixx (Japan)

**Notes:** No direct email found. Contact via LinkedIn or website form. Last Facebook activity July 2020.`,
    status: 'cold'
  },
  {
    id: 'IbT3pAZz5jG1EiWw9VDa',
    name: 'Warlock Arts',
    note: `**Research (2026-03-05)**

Turkish indie studio based in Ankara. Founded 2013 by Gokhan Ertem. Game development & publishing.

**Contact:**
- Email: info@warlockarts.com
- Website: warlockarts.com
- LinkedIn: linkedin.com/company/warlock-arts (5.1K followers)
- IndieDB: indiedb.com/company/warlock-arts

**Tech:** Unity & Unreal Engine (Mobile, PC, Console), 3D Modeling & Animation

**Current Project:** Intergalactic Pawn Shop (RPG trading sim)

**Notes:** Active studio with good social presence. Good Architect prospect.`,
    status: 'warm'
  },
  {
    id: 'IrbNPrdbFna3UdS4T0FX',
    name: 'Axios Games',
    note: `**Research (2026-03-05)**

Indie game development & consulting studio from Buenos Aires, Argentina (also Barcelona). 7+ years experience.

**Contact:**
- Email: contact@axiosgames.com
- Website: axiosgames.com
- LinkedIn: linkedin.com/company/axios-games (470+ followers)

**Focus:** Indie games, studio strategy consulting

**Notes:** Small studio, founder-led. Attended Gamescom. May be more consulting-focused than development.`,
    status: 'cold'
  },
  {
    id: 'Iwh0kLEqK7K6ZH500LPt',
    name: 'Vicarious Visions (Blizzard Albany)',
    note: `**Research (2026-03-05)**

Major AAA studio. Founded 1991, rebranded to Blizzard Albany in April 2022. ~200 employees. Division of Blizzard Entertainment.

**Contact:**
- Location: 150 Broadway, Albany, NY 12204
- Phone: (518) 701-2500
- HR: HR@activision.com / 877-225-4702
- Careers: careers.blizzard.com/global/en/albany

**Key Personnel:**
- Studio Head: Simon Ebejer
- Former: Jen Oneal (moved to Blizzard management)

**Known For:** Diablo II Resurrected, Tony Hawk 1+2 remaster, Crash Bandicoot remakes

**Notes:** Not an Architect prospect - fully integrated into Activision Blizzard. Internal tools only.`,
    status: 'disqualified'
  }
];

async function updateLeads() {
  const batch = db.batch();
  
  for (const update of updates) {
    // Update lead status
    const leadRef = db.collection('leads').doc(update.id);
    batch.update(leadRef, { 
      status: 'researched',
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    // Add research note
    const noteRef = db.collection('notes').doc();
    batch.set(noteRef, {
      leadId: update.id,
      content: update.note,
      status: update.status,
      createdBy: 'skel-batch-research',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`✓ ${update.name} (${update.id}) - ${update.status}`);
  }
  
  await batch.commit();
  console.log('\n✅ All updates committed');
}

updateLeads().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
