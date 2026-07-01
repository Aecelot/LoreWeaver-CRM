import admin from 'firebase-admin';
import { readFileSync } from 'fs';

const sa = JSON.parse(readFileSync('./service-account.json', 'utf8'));
if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(sa) });
}
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

const updates = [
  {
    id: "EwzlCWmupEH1EDMgkdIv",
    name: "Black Cube Games",
    note: `**Research Summary (2026-03-05)**

**Contact Information:**
- Email: info@blackcubegames.com
- Website: blackcubegames.com
- Address: Boschplaat 52, 1187KX, Amstelveen, Netherlands
- LinkedIn: linkedin.com/company/black-cube-games (1.9K+ followers)
- Twitter: @BlackCubeGames
- Facebook: facebook.com/BlackCubeGame

**Business Contacts (rcp Family - acquired Sept 2023):**
- Seb Downie-Blackwell: sdownie@r-control.de
- Elle Chen: echen@r-control.de

**Key Team Member:**
- Ehsan Tahmoures - Writer & Narrative Designer

**About:**
Amsterdam-based studio known for narrative-driven titles like "The Tale of Bistun". Passionate game developers with proven history of releasing games on multiple platforms. Joined rcp (remote control productions) family in September 2023.

**Director Fit:** Strong - narrative-driven studio with focus on cultural mythology. Already have dedicated narrative designer on team.`,
    status: "researched"
  },
  {
    id: "FIPfLtV8AgTF6jTMP2db",
    name: "Bekhoteam",
    note: `**Research Summary (2026-03-05)**

**CORRECTION: NOT Iran-based - Studio is based in Chile**

**Contact Information:**
- Website: bekhoteam.net
- LinkedIn: linkedin.com/company/bekho-team (220+ followers)
- Location: Avenida Seminario 53, Providencia, Santiago, Chile

**About:**
HTML5/instant games developer specializing in hyper casual games with async/sync multiplayer. Available for work for hire. Developed games like Endless Lake and Golf Champions.

**History:**
- Attended Tokyo Game Show 2017 (Latin New Stars Area)
- Attended Game Connection America 2018

**Director Fit:** Weak - Focused on hyper casual HTML5 games, not narrative-driven content. Location was incorrectly listed as Iran in CRM.`,
    status: "researched"
  },
  {
    id: "FRc5rjuGNRkAUGfeXa45",
    name: "Babil Games",
    note: `**Research Summary (2026-03-05)**

**Contact Information:**
- Email: info@babilgames.com
- Website: babilgames.com
- Phone: +971 4 368 0958
- Address: 14 Blvd Plz Tower One Emaar Blvd L, Dubai, UAE
- LinkedIn: linkedin.com/company/babil-games (11.9K+ followers)
- Facebook: facebook.com/BabilGames (11.8K+ followers)

**About:**
Top-tier mobile games publisher in MENA region with international operations. Founded 2012 in Dubai. ~72 employees. Part of Stillfront Group since 2016.

**Games:**
- The Grand Frontier (game-specific support: thegrandfrontier@babilgames.com)

**Director Fit:** Strong potential as publisher - They specialize in MENA localization, UA, and culturally adapted content. Could be partnership target for Director deployment in MENA market. Publisher model, not internal development focus.`,
    status: "researched"
  },
  {
    id: "GAoLoSsOOG9VjuKkxqyM",
    name: "Aquiris (Epic Games Brasil)",
    note: `**Research Summary (2026-03-05)**

**ACQUIRED BY EPIC GAMES (April 2022) - Now "Epic Games Brasil"**

**Contact Information:**
- Email: contact@aquiris.com.br (legacy)
- Support: support@aquiris.com.br
- DPO: dpo@support.epicgames.com
- Website: aquiris.com.br
- Phone: +55 51 3026 3556
- Address: Ipiranga Avenue, 6681 Building 93, Room 205, Porto Alegre, RS, Brazil
- Facebook: facebook.com/aquiris (18.9K followers)

**About:**
Founded 2007 in Porto Alegre, Brazil. Nearly 200 employees. Epic's first Latin American expansion. Develops for browser, PC, and mobile.

**Known Games:**
- Horizon Chase Turbo
- Horizon Chase 2
- CN Superstar Soccer
- The Great Prank War
- Ballistic

**Director Fit:** Low priority - Now owned by Epic Games. Would require enterprise-level engagement through Epic corporate structure.`,
    status: "researched"
  },
  {
    id: "H9lKShX3cZiTH8EvMWfp",
    name: "AN Games Studio",
    note: `**Research Summary (2026-03-05)**

**Contact Information:**
- Support Email: support@angamesstudio.com
- Educational: learn@angamesstudio.com
- Website: angamesstudio.com
- LinkedIn: linkedin.com/company/angamesstudios (1.4K+ followers)
- Facebook: facebook.com/AN.Games.Studio (22.3K+ followers, 5.0 rating)
- Location: Cairo, Egypt

**About:**
Indie game studio founded 2013 by Ahmed Fawzy. Specializes in cross-platform game development, including AR/VR games and applications. Also runs educational platform (learn.angamesstudio.com) teaching game development courses.

**Focus Areas:**
- 3D Games
- Augmented Reality
- Virtual Reality
- Cross-platform development

**Director Fit:** Moderate - Small indie studio with strong social presence. Educational focus suggests interest in new tools/tech. Egypt-based (MENA region growth market).`,
    status: "researched"
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
        createdBy: 'Skel (batch research)',
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp()
      });
      
      console.log(`✅ Updated: ${update.name}`);
    } catch (error) {
      console.error(`❌ Error updating ${update.name}:`, error.message);
    }
  }
  console.log('\nDone!');
}

updateLeads();
