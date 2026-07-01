import admin from 'firebase-admin';
import { readFileSync } from 'fs';

const sa = JSON.parse(readFileSync('./service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const updates = [
  {
    id: 'zs6uxc43xigo03FfICxl', // r/interactivefiction
    research: `RESEARCHED 2026-03-04: Core IF community on Reddit (25K). Covers Twine, Ink, Inform, ChoiceScript. Very tool-friendly. Has Discord: discord.gg/reJbMUB.

PITCH: "AI-powered character voice for your Twine/Ink stories." Post beta announcement with IF-focused messaging.`
  },
  {
    id: '5wEeIT4cuBBPO35svBCj', // IntFiction.org
    research: `RESEARCHED 2026-03-04: Main IF community forum since early 2000s. Sections for Twine, Inform, Ink, game design. Emily Short recommends as main hub. Tool announcements welcome.

CONTACT: intfiction.org (create account, post in appropriate section)

ACTION: Create account, introduce Architect in authoring tools section.`
  },
  {
    id: 'GrLkF0pdViwU06AA2irY', // NaNoRenO
    research: `RESEARCHED 2026-03-04: Month-long VN jam every March. Huge participation (hundreds of games). Ren'Py focused but engine-agnostic. NaNoRenO 2026: March 1-31.

CONTACT: itch.io/jam/nanoreno-2026

ACTION: SPONSOR/SUPPORT — Perfect Architect beta timing! Offer free beta to all participants.`
  },
  {
    id: 'IaL1UkhhgqOpS7MInSb3', // Ink Discord
    research: `RESEARCHED 2026-03-04: Official Inkle Studios Discord (9,219 members). ink scripting users. Powers 80 Days, Heaven's Vault, Sorcery!, Highland Song. Serious narrative devs using Unity.

CONTACT: discord.com/invite/inkle

PITCH: Architect complements ink — character voice consistency across large ink projects.`
  },
  {
    id: 'pMJ9NJ0VpYsTTxaNmIhB', // Ren'Py Discord
    research: `RESEARCHED 2026-03-04: LARGEST VN CREATOR COMMUNITY. 21,466+ members on official Discord. Very active, helpful. Connected to Lemmasoft Forums.

CONTACT: discord.com/invite/6ckxWYm (official)

ACTION: HIGH PRIORITY — Join immediately. NaNoRenO 2026 cross-promotion. Offer beta to VN developers.`
  },
  {
    id: 'Mjw73TMPTowo9CBJD7et', // Yarn Spinner
    research: `RESEARCHED 2026-03-04: Official Yarn Spinner community. Unity, Godot, Unreal integrations. Powers Night in the Woods, A Short Hike, DREDGE, Venba, Lost in Random. Professional-grade tool audience.

CONTACT: yarnspinner.dev (Discord linked from site), Patreon available

PITCH: Complementary positioning — Architect for voice, Yarn for structure. Technical audience values good tools.`
  },
  {
    id: 'tNBCOHVH819ZUTAXXwnS', // Dialogic
    research: `RESEARCHED 2026-03-04: Godot plugin for dialogue/VN creation. Open source, very active. Discord "super helpful" per Reddit. Growing rapidly with Godot's popularity.

CONTACT: discord.gg/DjcDgDaTMe, dialogic.pro, patreon.com/jowanSpooner

PITCH: Godot audience growing fast. Open source ethos. Complementary tool.`
  },
  {
    id: 'SlCEBvYYNW7j02DbBriX', // Twine Games Discord
    research: `RESEARCHED 2026-03-04: Twine community Discord (8K members). Narrative-first creators. Hobbyists to professionals. Very tool-friendly.

CONTACT: discord.gg/n5dJvPp

PITCH: "Write better dialogue for your Twine games with Architect."`
  },
  {
    id: 'IuYSRtIpNmfVIdHDhwjl', // IGDA Game Writing SIG
    research: `RESEARCHED 2026-03-04: Professional game writers association. Founded 2002. Runs Arcjam game jam. Active on Discord, FB, LinkedIn, Bluesky, X.

CONTACT: game-writing.com (multiple social channels)

PITCH: Professional audience — emphasize productivity gains. Workshop opportunity.`
  },
  {
    id: 'Fy2uDef6YMFPeNoOpzQ5', // AdventureX
    research: `RESEARCHED 2026-03-04: UK adventure/narrative game conference. Runs annual AdvXJam. Story-focused developer community.

CONTACT: adventurexpo.org, itch.io/jam/advxjam

ACTION: Apply for conference talk/demo. Participate in AdvXJam. UK networking potential.`
  }
];

async function main() {
  const notesRef = db.collection('notes');
  
  for (const update of updates) {
    // Add research note
    await notesRef.add({
      leadId: update.id,
      content: update.research,
      status: 'warm',
      createdBy: 'skel',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    // Update lead status
    await db.collection('leads').doc(update.id).update({
      status: 'researched',
      'pipeline.stageId': 'researched',
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`✓ Updated: ${update.id}`);
  }
  
  console.log(`\n=== Updated ${updates.length} Architect community leads with research ===`);
  process.exit(0);
}

main();
