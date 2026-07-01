// Batch research update - Run 17 (2026-03-05 04:52 AM)
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

const researchResults = [
  {
    id: "WdHB6h8pnzO6TSAnXgHn",
    name: "Pomelo Games",
    note: `== BATCH RESEARCH 2026-03-05 ==
Email: hello@pomelogames.com
Alt Email: contact@pomelogames.com (privacy/legal)
Website: https://pomelogames.com
LinkedIn: https://linkedin.com/company/pomelo-games (2.4K followers)
Location: Montevideo, Uruguay
Company Size: 11-50 employees
Games: Outlanders, Outlanders 2, Mars: Mars, Once Upon a Tower

Mobile/casual indie studio with quality games.
Focus on premium mobile experiences. Apple Arcade titles.

POTENTIAL FIT - Mobile-focused but quality-driven indie.
Consider for Architect as mobile narrative tooling.`,
    status: 'warm',
    icpFit: 'medium'
  },
  {
    id: "WsAuwbolkKm1VsPnJw9J",
    name: "Byte Conveyor Studios",
    note: `== BATCH RESEARCH 2026-03-05 ==
Email: No direct email found
Contact: Web form at byteconveyor.com/p/contact-us.html
Website: http://byteconveyor.com
Facebook: https://facebook.com/ByteConveyor
IndieDB: https://indiedb.com/company/byte-conveyor-studios
Location: Buenos Aires, Argentina
Founder: Diego Wasser (Razorwings18)
Focus: Mobile platforms, indie games
Games: AC-130 Gunship Simulator: Special Ops Squadron

Small solo-dev indie studio. Web form contact only.

LOW FIT - Small solo mobile dev, limited narrative focus.`,
    status: 'cold',
    icpFit: 'low'
  },
  {
    id: "X6Kv8kmwIAxdddPV1Atf",
    name: "Frictional Games",
    note: `== BATCH RESEARCH 2026-03-05 ==
Email: apply@frictionalgames.com
Phone: +46 708 88 52 33
Address: Frictional Games AB, Södra Strandgatan 4, 252 24 Helsingborg, Sweden
Website: https://frictionalgames.com
LinkedIn: https://linkedin.com/company/frictional-games (5.8K followers)
Location: Helsingborg, Sweden
Structure: Small, largely remote team

KEY CONTACTS:
- Narrative Lead: Grant Bailey
- Writer: Mikael Hedberg

Games: Amnesia series (Dark Descent, Rebirth), SOMA, Penumbra series

Horror/narrative-focused studio. Known for innovative narrative experiences.
"Our goal is to create narrative-focused experiences."

HIGH FIT - Perfect Director candidate. Small indie, narrative-first approach.
Strong horror/immersive storytelling. Would benefit from dynamic narrative tools.
PRIORITY LEAD.`,
    status: 'hot',
    icpFit: 'high'
  },
  {
    id: "XIwwoIrWlF101cHVmJX5",
    name: "AbsoLogix",
    note: `== BATCH RESEARCH 2026-03-05 ==
Email: admin@absologix.com
Website: https://absologix.com (may be inactive)
Facebook: https://facebook.com/absologix (2.2K followers)
Twitter: https://twitter.com/absologix
Location: Lahore, Pakistan (HQ) / Office in Kowloon, Hong Kong
Founded: 2010
Focus: Mobile game and app development, casual video games
Key Person: M.Waseem Aqil (Games Developer)
Platforms: Microsoft Store, Google Play

Mobile game dev studio focused on casual games.

LOW FIT - Casual mobile games, limited narrative depth.`,
    status: 'cold',
    icpFit: 'low'
  },
  {
    id: "YT258Uy7BmFkK6ucEXOb",
    name: "Rootless Studio",
    note: `== BATCH RESEARCH 2026-03-05 ==
Email: No direct email found
Press Contacts (via Inven Global): 
- Hongman "Nowl" Yoon: nowl@inven.co.kr
- Sung Wook "Beckor" Baek: beckor@inven.co.kr
Facebook: https://facebook.com/RootlessStudio (1.1K followers)
WelCon Profile: https://welcon.kocca.kr/en/directory/company/rootless-studio--1271
Location: South Korea
Founded: 2015
Publisher: Neowiz
Games: 8Doors: Arum's Afterlife Adventure
Funding: Kickstarter crowdfunding success

Korean indie studio. Action-adventure with narrative elements.
Note: Studio appears less active post-2021.

MEDIUM FIT - Narrative game but limited recent output.
Consider Architect for future projects.`,
    status: 'warm',
    icpFit: 'medium'
  }
];

async function updateLeads() {
  console.log('Starting batch research update (Run 17)...\n');
  
  for (const result of researchResults) {
    try {
      // Update lead status
      await db.collection('leads').doc(result.id).update({
        status: 'researched',
        'pipeline.stageId': 'researched',
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      // Add research note
      await db.collection('notes').add({
        leadId: result.id,
        content: result.note,
        status: result.status,
        createdBy: 'Skel (Auto-Research)',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      console.log(`✓ ${result.name} (${result.icpFit.toUpperCase()} fit)`);
    } catch (error) {
      console.error(`✗ Failed: ${result.name} - ${error.message}`);
    }
  }
  
  console.log('\nBatch update complete!');
  process.exit(0);
}

updateLeads();
