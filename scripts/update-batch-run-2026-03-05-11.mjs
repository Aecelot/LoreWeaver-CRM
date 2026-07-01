// Batch research update - 2026-03-05 run 11 (5 studios)
import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, '..', 'service-account.json'), 'utf8')
);

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

const researchData = [
  {
    id: 'LVE5DwlH5byZHiY46uee',
    name: 'The Molasses Flood',
    research: `== COMPANY ==
The Molasses Flood - Boston-based studio, ACQUIRED by CD PROJEKT RED (April 2025)
Now fully integrated into CD Projekt's Boston operations.

== CONTACTS ==
Email: contact@themolassesflood.com
LinkedIn: linkedin.com/company/the-molasses-flood
Website: themolassesflood.com

== KEY PERSONNEL ==
- Forrest Dowling - CEO/Design Lead
- Ben Schwartz - Lead Narrative Designer
- Kendra - VP/Executive Producer (leading Boston team)

== GAMES ==
- The Flame in the Flood (roguelite survival)
- Drake Hollow
- Project Sirius (upcoming Witcher multiplayer game)

== NOTES ==
⚠️ DISQUALIFY - No longer independent. Absorbed into CD PROJEKT RED as of April 2025.
They are now developing Project Sirius within CDPR structure.
Former team from Irrational Games (BioShock).`,
    status: 'disqualified',
    disqualifyReason: 'Acquired by CD PROJEKT RED (April 2025)'
  },
  {
    id: 'LxvPONICNXnxROh2rIKZ',
    name: 'Bisonplay',
    research: `== COMPANY ==
BisonPlay - Small indie studio in London, UK

== CONTACTS ==
LinkedIn: uk.linkedin.com/company/bisonplay
Website: bisonplay.com

== DETAILS ==
- Location: London, NW9, UK
- Size: 2-10 employees
- Industry: Computer Games

== NOTES ==
Very small studio. Limited public presence. No direct email found.
Contact via LinkedIn or website form recommended.`,
    status: 'researched'
  },
  {
    id: 'MHpmPZmlhOdkj9ENM9vu',
    name: 'Black River Studios',
    research: `== COMPANY ==
Black River Studios - Brazilian game studio, Samsung 1st party content creator

== CONTACTS ==
Email: hello@blackriverstudios.net
Phone: +55 19 99950-0173
Facebook: facebook.com/blackrivergames/
Twitter: @BlackRvrStudios (1.1K followers)
Website: blackriverstudios.net

== LOCATION ==
Manaus, AM, Brazil (part of SIDIA - Samsung's R&D center)

== GAMES ==
- Finding Monsters Adventure
- Tin & Kuna
- Angest (VR)
- Conflict 0: Shattered (VR)
- Rock & Rails (VR)

== NARRATIVE FOCUS ==
Uses "Writer's Rooms" methodology for narrative design.
Led by Game Designers or UX Designers.
Strong VR portfolio - cutting edge tech focus.

== NOTES ==
Good Director prospect - narrative focus, VR experience, innovative methodology.
Rating: 5.0 (22 reviews on Facebook)`,
    status: 'researched'
  },
  {
    id: 'MZYN2MZd5DSYu8qrXWPJ',
    name: 'Octeto Studios',
    research: `== COMPANY ==
Octeto Studios - Independent game studio, Santiago, Chile (founded 2012)
Founder: Julio Marambio

== CONTACTS ==
Email: contact@octetostudios.com
Direct: julio@octetostudios.com
Phone: +56 9 9699 9639
Website: octetostudios.com
Twitter: @OctetoStudios (2.2K followers)
LinkedIn: linkedin.com/company/octeto-studios

== ADDRESS ==
Guardia Vieja 202, Of 403, Providencia, Santiago, Chile

== GAMES ==
- Sky Oceans: Wings for Hire (narrative RPG)
- Cyber Ops (strategy)
- Undo: The Worst Trip (adventure)

== NARRATIVE FOCUS ==
★★★ STRONG PROSPECT ★★★
Focus: RPG, Strategy, Adventure
Creates original IPs with character-driven narratives.
Sky Oceans features crew with backstories and personal agendas.

== CLIENTS ==
Niantic, Nickelodeon, Cartoon Network

== ACHIEVEMENTS ==
- 2022 Google Indie Games Fund selection
- 12+ years in operation

== NOTES ==
Excellent Director prospect - narrative-driven studio, strong portfolio, international clients.
Services: Art, full-cycle dev (PC/Console/Mobile/Web)`,
    status: 'qualified'
  },
  {
    id: 'N92rcqEKlo5mAhDo3sl5',
    name: 'Dead Mage',
    research: `== COMPANY ==
Dead Mage - Indie studio focused on narrative-driven games
Founded: 2010, now US-based (Pasadena, TX)

== CONTACTS ==
Email: info@deadmage.com
Website: deadmage.com
LinkedIn: linkedin.com/company/dead-mage (3.1K followers)

== ADDRESS ==
2829 S Shave St, Pasadena, Texas 77502, US
Size: 1-10 employees

== KEY PERSONNEL ==
- Amir H. Fassihi - Studio Director
- Nima Memari - Design Lead
- Shakib Omrani - Narrative Designer
- Aryan Bina - Game Designer

== GAMES ==
- Children of Morta (action RPG roguelite - major success)
- Tale of Ronin (upcoming samurai RPG)

== NARRATIVE FOCUS ==
★★★ STRONG PROSPECT ★★★
"Deep narratives and innovative game mechanics"
"Emotionally resonant stories"
Children of Morta praised for family-focused narrative within roguelite genre.

== NOTES ==
High-quality Director prospect. Has dedicated Narrative Designer on staff.
Children of Morta demonstrates mastery of narrative in procedural gameplay.
Small team, indie mindset, rich storytelling focus.`,
    status: 'qualified'
  }
];

async function updateLeads() {
  console.log('Updating 5 researched studios...\n');
  const updatedIds = [];
  
  for (const data of researchData) {
    try {
      // Add note to notes collection
      await db.collection('notes').add({
        leadId: data.id,
        content: data.research,
        status: data.status === 'qualified' ? 'hot' : (data.status === 'disqualified' ? 'cold' : 'warm'),
        createdBy: 'skel-batch-research',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      // Update lead status
      const updateData = {
        status: data.status,
        'pipeline.stageId': data.status,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };
      
      if (data.disqualifyReason) {
        updateData.disqualifyReason = data.disqualifyReason;
      }
      
      await db.collection('leads').doc(data.id).update(updateData);
      
      updatedIds.push(data.id);
      console.log(`✅ ${data.name}: Updated (${data.status})`);
    } catch (err) {
      console.error(`❌ ${data.name}: ${err.message}`);
    }
  }
  
  // Update state file
  const statePath = join(__dirname, 'batch-research-state.json');
  const state = JSON.parse(readFileSync(statePath, 'utf8'));
  state.completedIds.push(...updatedIds);
  state.lastRunAt = new Date().toISOString();
  state.stats.researched = state.completedIds.length;
  writeFileSync(statePath, JSON.stringify(state, null, 2));
  
  console.log(`\nState updated. Total researched: ${state.completedIds.length}`);
  console.log('Done!');
  process.exit(0);
}

updateLeads().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
