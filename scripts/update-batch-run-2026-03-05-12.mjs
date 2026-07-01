// Batch research update - 2026-03-05 run 12 (5 studios)
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
    id: 'NCY0CabScYkLkIpz0ORN',
    name: 'Annapurna Interactive',
    research: `== COMPANY ==
Annapurna Interactive - Major indie game publisher ("A24 of gaming")
Location: Los Angeles, CA, USA
LinkedIn: 18K+ followers
Website: annapurnainteractive.com

== CONTACTS ==
General/Pitch: contact@annapurnainteractive.com
Hiring: hiring@annapurnainteractive.com
Press/PR: pr@popagenda.co (or annapurna@tarabrunopr.com)
Support: help@annapurnainteractive.com
Privacy: privacy@annapurnainteractive.com
Phone: +1 310 724 5678

== KEY CONTEXT ==
⚠️ MAJOR EVENT: Entire staff resigned Sept 2024 following dispute with parent company
Currently restructuring under new leadership (Hector Sanchez)
Honoring existing contracts but submission process in flux
Prefers to actively seek games rather than unsolicited submissions

== GAMES ==
Outer Wilds, Stray, What Remains of Edith Finch, Kentucky Route Zero, Florence, Cocoon

== LOREWEAVER FIT ==
HIGH - Major narrative-focused publisher. Worth monitoring for stability before outreach.
Currently in transition period.`,
    status: 'warm'
  },
  {
    id: 'NmVOZmIkwuKs001gsUeQ',
    name: 'Brain Ladder Game Studio',
    research: `== COMPANY ==
Brain Ladder Game Studio - Limited online presence
ZoomInfo listing exists but no public details

== CONTACTS ==
No public contact email found
May require LinkedIn research

== LOREWEAVER FIT ==
LOW - Insufficient information available. Skip or manual research needed.`,
    status: 'cold'
  },
  {
    id: 'OZXoms4nIlAMCGWCHzQj',
    name: 'Plarium',
    research: `== COMPANY ==
Plarium - Global mobile/social game developer
400M+ users worldwide
HQ: Herzliya, Israel
Offices: Ukraine (Kharkiv, Kyiv, Lviv), Warsaw
Acquired by MTG (Modern Times Group) in 2024/2025

== CONTACTS ==
Business/Pitch: business@plarium.com
Media/PR: deanna@plarium.com
Kyiv Office: kyiv@plarium.com
HR: recruiting.kyiv@plarium.com
Partners Portal: plarium.com/en/partners/

== KEY PERSONNEL ==
Guy Ulmer - Business Development Lead (Israel)

== GAMES ==
Raid: Shadow Legends, Mech Arena, Vikings: War of Clans

== LOREWEAVER FIT ==
MEDIUM-LOW - Large mobile publisher, primarily F2P/gacha. Not narrative-focused.
Possible pitch angle: narrative depth for player engagement in RPGs.`,
    status: 'cold'
  },
  {
    id: 'OmkxrwT7vWyEkl7WtrMK',
    name: 'Tahoe Games',
    research: `== COMPANY ==
Tahoe Games - Indonesian indie game developer
Location: Kediri, East Java, Indonesia
Acquired by Toge Productions (Mar 2022) for 4 Billion Rupiah
Part of Southeast Asian indie game scene

== CONTACTS ==
Email: tahoe.studio.kdr@gmail.com
Twitter: twitter.com/tahoegames
Facebook: 1.5K+ followers

== LOREWEAVER FIT ==
MEDIUM - Small indie under Toge Productions umbrella.
Toge is significant SEA publisher - consider approaching through Toge or directly for Architect.`,
    status: 'warm'
  },
  {
    id: 'P72FP5iqXKgmV6e8FYDZ',
    name: "Fool's Theory",
    research: `== COMPANY ==
Fool's Theory - Polish RPG developer, narrative-driven experiences
Location: Dworkowa 4, Bielsko-Biała, Poland, 43-300
Founded: 2015
Size: 51-200 employees
LinkedIn: 11.2K+ followers
Facebook: 2.3K+ followers
Website: foolstheory.com

== CONTACTS ==
Business: biz@foolstheory.com
Media: media@foolstheory.com
General: info@foolstheory.com
DPO: rodo@foolstheory.com (Łukasz Wyrzykowski)

== KEY PERSONNEL ==
Krzysztof Maka - CEO (krzysztof.maka@foolstheory.com)

== GAMES ==
- The Thaumaturge (2024, published by 11 Bit Studios)
- Seven: The Days Long Gone (2017)
- Working on Witcher remake (CD Projekt Red partnership)

== LOREWEAVER FIT ==
HIGH - Narrative-focused RPG studio with proven track record.
Strong fit for Director. Polish studio = EU market.
Contact via biz@foolstheory.com`,
    status: 'hot'
  }
];

async function run() {
  console.log('Updating CRM with research notes (Run 12)...\n');
  
  for (const item of researchData) {
    try {
      // Add note
      await db.collection('notes').add({
        leadId: item.id,
        content: item.research,
        status: item.status,
        createdBy: 'skel-research',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log(`✓ Added note for ${item.name}`);
      
      // Update lead status
      await db.collection('leads').doc(item.id).update({
        status: 'researched',
        'pipeline.stageId': 'researched',
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log(`✓ Updated status for ${item.name}\n`);
      
    } catch (err) {
      console.error(`✗ Error for ${item.name}:`, err.message, '\n');
    }
  }
  
  console.log('Done!');
  process.exit(0);
}

run();
