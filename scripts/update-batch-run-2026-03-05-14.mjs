import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Firebase
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(readFileSync(join(__dirname, '..', 'service-account.json'), 'utf8'));
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}

const db = admin.firestore();

const researchData = [
  {
    id: 'PCSqqJ62AdsHsAxUK96a',
    name: 'Imisi 3D',
    note: `**Research completed 2026-03-05**

**Company:** Imisi 3D
**Type:** XR Creation Lab (NOT a game studio)
**Location:** Lagos, Nigeria
**Website:** https://imisi3d.com
**Email:** hello@imisi3d.com
**Phone:** +2349083368210

**Key Person:** Judith Okonkwo (Founder)

**About:** Extended Reality (AR/VR/MR) creation lab focused on building the African XR ecosystem. Creates XR solutions, builds community of African VR/AR creators, provides educational experiences. Worked with UNICEF on educational VR content.

**LoreWeaver Fit:** LOW - Not a game studio. XR/education focus, not narrative games.`,
    status: 'cold',
    website: 'https://imisi3d.com'
  },
  {
    id: 'PoOM1S5BsktKDnFZT6xf',
    name: 'CrazyLabs',
    note: `**Research completed 2026-03-05**

**Company:** CrazyLabs
**Type:** Mobile Games Publisher
**Location:** Tel Aviv, Israel
**Website:** https://www.crazylabs.com
**Email:** support@crazylabs.com
**HQ:** 132 Menachem Begin Road, 20th Floor, Azrieli Center, Tel Aviv, Israel

**About:** Top #3 mobile game publisher with 6.5B+ downloads. Part of Embracer Group. Specializes in hyper-casual and hybrid-casual games (Super Stylist, Phone Case DIY). Uses CLIK Dashboard for developer submissions. LinkedIn: 86.5K+ followers.

**LoreWeaver Fit:** LOW - Focus is hyper-casual games, minimal narrative depth. Very different market from our target (narrative-rich RPGs/story games).`,
    status: 'cold',
    website: 'https://www.crazylabs.com'
  },
  {
    id: 'Q77bW04AeuPzXIqFGLUW',
    name: 'Glass Egg',
    note: `**Research completed 2026-03-05**

**Company:** Glass Egg (Virtuos subsidiary)
**Type:** Art Outsourcing Studio
**Location:** Ho Chi Minh City & Da Lat, Vietnam
**Website:** https://www.glassegg.com
**Email:** contact@glassegg.com
**Phone:** +84 28 3943 1389

**About:** Premier game art outsourcing studio since 1999. Part of Virtuos (one of world's largest external game developers). Specializes in 3D/2D art production, vehicle modelling, hard-surface art. Does NOT develop games themselves.

**LoreWeaver Fit:** LOW - Art outsourcing studio, not game developer. They don't create narratives. Might be relevant through parent company Virtuos for larger partnerships.`,
    status: 'inactive',
    website: 'https://www.glassegg.com'
  },
  {
    id: 'St0fh93S4KyyzVO8LGzU',
    name: 'Manrad Games',
    note: `**Research completed 2026-03-05**

**Company:** Manrad Games
**Type:** Unknown/Not Found

**Research Result:** No specific, active, or public-facing "Manrad Games" studio found. Google AI Overview confirms no matches. May be a misspelling, defunct studio, or very small operation with no web presence.

**LoreWeaver Fit:** UNKNOWN - Cannot assess. Consider removing from CRM or marking for follow-up if more info becomes available.`,
    status: 'inactive',
    website: ''
  },
  {
    id: 'Sx1MWEhd6nQ5ueObcj7A',
    name: 'Batovi Games',
    note: `**Research completed 2026-03-05**

**Company:** Batovi Games Studio
**Type:** Indie Game Studio
**Location:** Montevideo, Uruguay
**Website:** https://batovi.com
**Contact:** batovi.com/contact.html

**About:** Small indie studio (2 people) founded in 2005. Known for sports/soccer games: Charrua Soccer, Pixel Cup Soccer. Also does advergames (Nickelodeon, MTV) and educational games for One Laptop Per Child program in Uruguay.

**LoreWeaver Fit:** LOW - Very small team, focus on sports games (not narrative-heavy). Might be interested in Architect if they expand into story-driven content, but currently low priority.`,
    status: 'cold',
    website: 'https://batovi.com'
  }
];

async function run() {
  console.log('Updating 5 studios with research notes...\n');
  
  for (const data of researchData) {
    console.log(`Processing: ${data.name}`);
    
    try {
      // Update lead
      const leadRef = db.collection('leads').doc(data.id);
      await leadRef.update({
        status: 'researched',
        'pipeline.stageId': 'researched',
        website: data.website || null,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      // Add note
      await db.collection('notes').add({
        leadId: data.id,
        content: data.note,
        status: data.status,
        createdBy: 'skel-batch-research',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      console.log(`  ✓ Updated (${data.status})`);
    } catch (err) {
      console.error(`  ✗ Error: ${err.message}`);
    }
  }
  
  console.log('\nDone!');
  process.exit(0);
}

run().catch(console.error);
