import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, '..', 'service-account.json'), 'utf8')
);

if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

const updates = [
  {
    id: 'mIZenqopExAuzP44YSfR',
    name: 'Inkle (US presence)',
    note: `**Research completed 2026-03-05**

**Contact:**
- Email: info@inklestudios.com
- Website: inklestudios.com

**Key People:**
- Jon Ingold — Co-founder, Narrative Director (LinkedIn: linkedin.com/in/jon-ingold-0a854244)
- Joseph Humfrey — Co-founder

**Company Info:**
- Founded: November 2011
- Location: Cambridge, UK
- Focus: Interactive narrative games

**Notable Titles:**
- 80 Days
- Heaven's Vault
- Sorcery! series
- ink (open-source narrative scripting language)

**LoreWeaver Fit:** EXCELLENT — pioneers in interactive narrative, creators of ink scripting language. Perfect Director partner candidate.`,
    status: 'researched'
  },
  {
    id: 'qm88p8YrWzoeG9hfaHhb',
    name: 'Skullfish Studios',
    note: `**Research completed 2026-03-05**

**Contact:**
- Email: hello@skullfishstudios.com
- Website: skullfishstudios.com
- Facebook: facebook.com/SkullfishStudios (3.5K followers)

**Key People:**
- Gabriela Thobias — Art Director, Co-founder
- Rafael Ferrari — Co-founder

**Company Info:**
- Founded: 2016
- Location: São Paulo, Brazil
- Focus: VR games
- Team: ~8 people
- 20+ projects (VR, AR, PC, mobile)

**Notable Titles:**
- Lila's Tale and the Hidden Forest (2022)

**LoreWeaver Fit:** MODERATE — VR focus, Brazilian market. Less narrative-heavy based on portfolio.`,
    status: 'researched'
  },
  {
    id: 'qwY69c56ykS4VsX1wtDI',
    name: 'IguanaBee',
    note: `**Research completed 2026-03-05**

**Contact:**
- PR Email: pr@iguanabee.com
- Founder Email: daniel.winkler@iguanabee.com
- Jobs: jobs.anim@iguanabee.com
- Phone: +56 2 26382357
- Website: iguanabee.com
- LinkedIn: linkedin.com/company/iguanabee (2.4K followers)

**Key People:**
- Daniel Winkler — Founder
- Iván Vera — Founder
- Cristian González — Board Member

**Company Info:**
- Founded: 2011
- Location: Santiago, Chile
- Address: Mac Iver 484, Oficina 97, Santiago Centro
- Focus: Console, PC, VR games

**Notable Projects:**
- The Amazing Crackpots Club (co-production)
- Work-for-hire for major publishers

**LoreWeaver Fit:** GOOD — full-service studio, Latin American presence. Consider for Architect outreach.`,
    status: 'researched'
  },
  {
    id: 'r1Hd2cBnqPYk1kVMPExI',
    name: 'Maliyo Games',
    note: `**Research completed 2026-03-05**

**Contact:**
- Email: admin@maliyo.com
- Alt Email: marie.shabaya@maliyo.com (Africa Games Report)
- Website: maliyo.com
- LinkedIn: linkedin.com/company/maliyo-games (4.2K followers)
- Instagram: @maliyogames

**Key People:**
- Hugo Obi — CEO (gamescom speaker)

**Company Info:**
- Location: Lagos, Nigeria
- Address: 24 Balarabe Musa Cres, Lagos, 106104
- Size: 11-50 employees
- Revenue: ~$5.4M
- Focus: Mobile games, African-inspired content

**Notable Work:**
- Africa Games Report publisher
- Leading African game studio

**LoreWeaver Fit:** HIGH — African mobile market leader, focus on culturally relevant content. Good Director prospect for mobile narrative.`,
    status: 'researched'
  },
  {
    id: 'sAaC7UvZdvAJXQbJtGvc',
    name: 'Private Division',
    note: `**Research completed 2026-03-05**

**Contact:**
- BizDev: bizdev@privatedivision.com
- Press: press@privatedivision.com
- Website: privatedivision.com

**Company Info:**
- Founded: 2017
- Location: 110 W 44th St., New York, NY 10036
- Parent: Take-Two Interactive (also owns 2K, Rockstar)
- Size: ~46 employees
- Focus: Developer-focused indie publisher

**Notable Titles:**
- Kerbal Space Program
- Ancestors: The Humankind Odyssey
- After Us
- Penny's Big Breakaway

**Notes:**
- Ownership changes reported (may have been spun off from Take-Two)
- Unsolicited submissions may become company property

**LoreWeaver Fit:** MODERATE — publisher, not developer. Could be partnership channel to reach indie studios they publish.`,
    status: 'researched'
  }
];

async function updateLeads() {
  for (const update of updates) {
    try {
      // Update lead status
      await db.collection('leads').doc(update.id).update({
        status: update.status,
        'pipeline.stageId': update.status,
        updatedAt: FieldValue.serverTimestamp()
      });
      
      // Add research note
      await db.collection('notes').add({
        leadId: update.id,
        content: update.note,
        status: 'warm',
        createdBy: 'skel-batch-research',
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp()
      });
      
      console.log(`✓ Updated: ${update.name}`);
    } catch (err) {
      console.error(`✗ Error updating ${update.name}:`, err.message);
    }
  }
  
  console.log('\nDone!');
  process.exit(0);
}

updateLeads();
