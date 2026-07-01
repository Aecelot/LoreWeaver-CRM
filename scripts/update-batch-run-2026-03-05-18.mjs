// Batch research update - 2026-03-05 run 18
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
    id: 'ZgqzrXc14bLnSc3FDFIL',
    name: 'Sparx* (Virtuos)',
    note: `**Research completed 2026-03-05**

**Emails:**
- General/Business: marketing@virtuosgames.com
- Careers: spx.careers@virtuosgames.com

**Contact:**
- LinkedIn: https://vn.linkedin.com/company/sparxvirtuos
- Contact form: https://www.virtuosgames.com/contact-us/
- Phone: +84-283-9976843

**Location:** 39B Truong Son Street, Ward 4, Tan Binh District, Ho Chi Minh City, Vietnam

**Profile:** Sparx* is a Virtuos studio in Vietnam specializing in 3D art, animation, and VFX for AAA games and movies. Part of global Virtuos network (63K+ LinkedIn followers). Work-for-hire art production studio.

**Fit:** Art/animation outsourcing studio - not a direct fit for narrative tools. Could be relevant for art pipeline integration or larger Virtuos partnership.`,
    status: 'researched'
  },
  {
    id: 'Zn2DmlvoybyltGTjY1MZ',
    name: 'DigixArt',
    note: `**Research completed 2026-03-05**

**Emails:**
- General: contact@digixart.com
- Jobs: jobs@digixart.com

**Contact:**
- Website: https://digixart.com
- LinkedIn: https://www.linkedin.com/company/digixart-entertainment/ (8.1K+ followers)

**Location:** 20 rue Cavelier de la Salle, Résidence Les Arts BP 70, 34000 Montpellier, France

**Founders:** Yoan Fanise, Anne-Laure Fanise (founded 2015)

**Games:** Road 96 (procedural narrative), Lost in Harmony, 11-11: Memories Retold

**Profile:** Award-winning indie studio focused on emotional, narrative-driven experiences. Acquired by Koch Media/Plaion. Pioneers in procedural narrative gaming.

**Fit:** EXCELLENT - Narrative-first studio. Road 96 pioneered procedural storytelling. Strong candidate for Director/Architect. Approach via contact@digixart.com.`,
    status: 'researched'
  },
  {
    id: 'ZtTKoNnfSYzaFrUUo12g',
    name: 'Deluxe Creation',
    note: `**Research completed 2026-03-05**

**Emails:**
- General: deluxecreationstudiosng@gmail.com

**Contact:**
- Website: https://www.deluxecreation.com
- Phone: +234 802 510 0988
- LinkedIn: https://ng.linkedin.com/in/edushola (Edu Shola - Founder)
- Facebook: 5.3K+ followers

**Location:** Lagos, Nigeria

**Founder:** Edu Shola (Creative Director)

**Focus:** Educational games, animation, Nigerian history (History Ville). Mobile games and animation for African market.

**Fit:** Educational games focus, not narrative-heavy traditional games. African market could be interesting for localization but limited fit for Director. Low priority.`,
    status: 'researched'
  },
  {
    id: 'ZtYzOl6sHQe0AT19CfvX',
    name: 'Larva Game Studios',
    note: `**Research completed 2026-03-05**

**Emails:**
- General: contact@larvagamestudios.com

**Contact:**
- Website: http://www.larvagamestudios.com
- LinkedIn: https://www.linkedin.com/company/larva-game-studios (5.2K+ followers)
- Twitter: @LarvaGS, @LarvaGS_esp

**Location:** Guadalajara, Mexico & Los Angeles, California

**Games:** Last Day on Earth, Night Vigilante, Lucha, Red Bull Crashed Ice Kinect

**Profile:** Premier game development studio and publisher for LATAM region. Console, PC, and mobile titles. Offers game design, level design, 2D/3D art, animation, and programming services.

**Fit:** LATAM publisher/developer. Could be interesting for Spanish localization or LATAM distribution. Work-for-hire services. Medium fit - worth monitoring.`,
    status: 'researched'
  },
  {
    id: 'a2shV3QQwrWIf2icS375',
    name: 'Sucker Punch Productions',
    note: `**Research completed 2026-03-05**

**Contact:**
- Website: https://www.suckerpunch.com
- Careers: https://jobs.suckerpunch.com
- Phone: (425) 649-2192
- LinkedIn: https://www.linkedin.com/company/sucker-punch-productions (42.2K+ followers)

**Location:** Bellevue, Washington, USA

**Parent:** Sony Interactive Entertainment (PlayStation Studios)

**Games:** Ghost of Tsushima, Ghost of Yotei (upcoming), infamous series, Sly Cooper

**Team Size:** 51-200 employees

**Profile:** AAA first-party PlayStation studio. Known for narrative-driven open-world action games. Ghost of Tsushima sold 13M+ copies. Currently hiring for Ghost of Yotei sequel.

**Fit:** AAA Sony first-party - enterprise tier. Would need PlayStation partnership or executive introduction. Very high value but difficult to approach directly. No public email - all contact through PlayStation Careers/Sony channels.`,
    status: 'researched'
  }
];

async function run() {
  const batch = db.batch();
  
  for (const { id, name, note, status } of updates) {
    // Update lead status and pipeline stage
    const leadRef = db.collection('leads').doc(id);
    batch.update(leadRef, { 
      status,
      'pipeline.stageId': status,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    // Add research note
    const noteRef = db.collection('notes').doc();
    batch.set(noteRef, {
      leadId: id,
      content: note,
      status: 'cold',
      createdBy: 'skel-batch',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`✓ ${name}`);
  }
  
  await batch.commit();
  console.log(`\nUpdated ${updates.length} studios`);
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
