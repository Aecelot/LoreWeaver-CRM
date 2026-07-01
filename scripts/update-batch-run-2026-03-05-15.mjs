import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(readFileSync('../service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const updates = [
  {
    id: 'T3qMubhYFsC5aN5qdVrF',
    name: 'Hero Concept',
    note: `**Hero Concept** - Turkish game studio (founded 2017)

**Contact:**
- General: info@heroconcept.com
- Marketing/Keys: marketing@heroconcept.com
- Website: heroconcept.com

**Social:**
- Twitter: @HeroConcept
- Instagram: @heroconceptgames
- LinkedIn: /company/heroconcept

**Key Contact:**
- Serkan Özay - Co-Founder & Creative Director

**Games:** Mayhem Brawler (urban-fantasy beat 'em up), Doughlings series

**ICP Fit:** Beat 'em up games with narrative elements. Urban-fantasy setting shows interest in storytelling. Small indie team, good Director fit.

Researched: 2026-03-05`
  },
  {
    id: 'TdacxuH0D2PnkVFKxlgf',
    name: 'Yupi Studios',
    note: `**Yupi Studios** (Yupi Devshop) - Brazilian game studio

**Location:** R. Gama Rosa, 35 - Tambiá, João Pessoa - PB, Brazil

**Contact:**
- Website: yupidevshop.com
- Phone: +55 83 3576-9959

**Focus:** Mobile game development - Android, iOS, PWA, AR/VR games for mobile and Smart TVs

**Founded:** 2015

**ICP Fit:** LOW - Primarily mobile/AR/VR focus. Not strongly narrative-focused based on available info. Might be better Architect prospect for mobile game localization/character voice work.

Researched: 2026-03-05`
  },
  {
    id: 'UJObDBK76ZomqrJd9x5N',
    name: 'Project Moon',
    note: `**Project Moon** - South Korean indie game studio

**Location:** Suwon, South Korea
**Founded:** November 18, 2016
**Team Size:** ~50 employees

**Leadership:**
- Kim Ji-hoon - Founder, CEO, Director, Scenario Writer
- Lee YuMi - Key team member

**Contact:**
- Website: projectmoon.kr (contact page: projectmoon.kr/eng/contact/contact.php)
- Also: projectmoon.studio, limbuscompany.com
- Twitter: @ProjMoonStudio (241K+ followers), @LimbusCompany_B

**Games:**
- Lobotomy Corporation
- Library of Ruina
- Limbus Company
- HamHamPangPang

**ICP Fit:** EXCELLENT - Known for unique narrative-driven games with dark themes and shared "worldview" universe. Character-driven plots in dystopian settings. Strong narrative focus makes them ideal Director candidate. Large following shows market validation.

Researched: 2026-03-05`
  },
  {
    id: 'UL0fEklVzRQq9zBeTs7v',
    name: 'Falafel Games',
    note: `**Falafel Games** - UAE/MENA game studio

**Location:** TwoFour54, Abu Dhabi, UAE

**Contact:**
- Website: falafel-games.com
- Email: v@falafel-games.com
- Phone: +971 545 642 161

**Focus:** 4X Strategy, RPG, Social, Turn-based games
- Arabic-first development
- MMO games (Arabic Massive Multiplayer Online)
- Backed by Twofour54 investment (2014)

**Services:** 2D/3D art, game development, localization, sound design, game design and narrative development

**ICP Fit:** MEDIUM - Has narrative development services. Arabic-first focus is interesting niche. Could be good Architect prospect for localization and character voice work for Arabic markets. 4X/Strategy focus may need narrative tools for campaign stories.

Researched: 2026-03-05`
  },
  {
    id: 'UTAezHz2D4cyr0lGMRRB',
    name: 'CCP Games',
    note: `**CCP Games** - Icelandic game studio (Pearl Abyss subsidiary)

**Location:** Reykjavík, Iceland (Global HQ - "Gróska" studio)
**Founded:** 1997
**Owner:** Pearl Abyss (since 2019)

**Contact:**
- Website: ccpgames.com
- General: info@ccpgames.com
- Community/Narrative: communityteam@ccpgames.com
- Media/PR: media@ccpgames.com
- Support: support@eveonline.com
- Office Tours: officetours@ccpgames.com
- Twitter: @CCPGames (55K+ followers)
- Facebook: /ccpgames (21K+ followers)

**Games:**
- EVE Online (flagship - "world's largest living work of sci-fi")
- EVE Frontier
- EVE Galaxy Conquest

**ICP Fit:** AAA tier - Massive narrative universe with player-driven stories. Hiring Lead Narrative Designer (Reykjavík). Very strong narrative focus. Would need enterprise-tier Director licensing. Excellent reference customer potential.

Researched: 2026-03-05`
  }
];

async function updateLeads() {
  for (const update of updates) {
    try {
      // Add research note to notes collection
      await db.collection('notes').add({
        leadId: update.id,
        content: update.note,
        status: 'warm',
        createdBy: 'skel-batch-research',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });

      // Update lead status
      await db.collection('leads').doc(update.id).update({
        status: 'researched',
        'pipeline.stageId': 'researched',
        updatedAt: Timestamp.now()
      });

      console.log(`✓ Updated: ${update.name}`);
    } catch (err) {
      console.error(`✗ Failed: ${update.name}`, err.message);
    }
  }
  console.log('\nDone!');
  process.exit(0);
}

updateLeads();
