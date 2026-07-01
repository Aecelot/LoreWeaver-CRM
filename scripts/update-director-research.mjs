import admin from 'firebase-admin';
import { readFileSync } from 'fs';

const sa = JSON.parse(readFileSync('./service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const updates = [
  {
    id: 'LEmJoy6HmEVl62seRHfr', // Emily Short
    research: `RESEARCHED 2026-03-04: THE narrative design thought leader. IEEE Transactions on Games editor, GDC AI Summit advisor. Former Spirit AI (Character Engine), now Wizards of the Coast. Founded Oxford/London IF Group (2014). Created conversation-as-primary-interaction genre.

CONTACT: LinkedIn (emily-short-0b515614), emshort.blog

PITCH: Director as evolution of conversation-based games she pioneered. Emergent character behavior + on-device inference addresses her Spirit AI work.`
  },
  {
    id: 'h3PDM9AHSszf6y4zgr51', // AI and Games
    research: `RESEARCHED 2026-03-04: Dr. Tommy Thompson — PhD AI for games, GDC AI Summit advisor, IGGI industry advisor, BAFTA Connect. 250K+ YouTube subs since 2014. AI consultancy for AAA/indie since 2017.

CONTACT: Passionfroot (passionfroot.me/aiandgames), LinkedIn (t2thompson), Substack (4.2K subs), @AIandGames

PITCH: Emergent narrative AI that runs on-device — differentiated from cloud competitors. Offer exclusive demo access or interview.`
  },
  {
    id: '6FM7ISsLzZfnHFQt2RUy', // NarraScope
    research: `RESEARCHED 2026-03-04: Annual hybrid IF/narrative conference. 2026: June 12-14, University at Albany NY. Hosted by Interactive Fiction Technology Foundation. Talks on Discord, recordings on YouTube.

CONTACT: narrascope.org (call for talks open)

ACTION: Submit talk proposal — "Beyond dialogue trees: How AI Director generates plot from character goals". Free speaker access + lunches.`
  },
  {
    id: 'JEqRf76HDVEA7gCnyfp2', // AIIDE
    research: `RESEARCHED 2026-03-04: 22nd AAAI Conference on AI and Interactive Digital Entertainment. 2026: Nov 9-13, Belo Horizonte, Brazil. Theme: "New Grounds" (first outside US/Canada).

CONTACT: sites.google.com/view/aiide2026, aiide.org, @AIIDEconference

ACTION: Submit technical/demo paper (deadline ~June/July 2026). Perfect venue for Director academic credibility.`
  },
  {
    id: 'RYlXul6vWGmFjDHdrFh5', // Georgia Tech
    research: `RESEARCHED 2026-03-04: Entertainment Intelligence Lab, Dr. Mark Riedl (Professor). Focus: story generation, interactive narratives, computational creativity, explainable AI. Funded by NSF, DARPA, Disney, Google, Meta, Amazon. 15K+ citations.

CONTACT: eilab.gatech.edu, mark-riedl page

PITCH: Academic collaboration, demo evaluation, PhD intern pipeline. Riedl is THE name in narrative AI.`
  },
  {
    id: 'gSdQreCinGsuAIT0Rsto', // UC Santa Cruz EIS
    research: `RESEARCHED 2026-03-04: Expressive Intelligence Studio. Directors: Michael Mateas (MacArthur Chair), Noah Wardrip-Fruin. One of largest technical game research groups. Focus: AI + art + design intersection.

CONTACT: eis.ucsc.edu, people page

PITCH: Research collaboration, seminar invitation. Mateas created Facade — pioneering interactive drama.`
  },
  {
    id: 'XlpcVY9adn9uH6nFBXhC', // Two Minute Papers
    research: `RESEARCHED 2026-03-04: Károly Zsolnai-Fehér, PhD Vienna University of Technology. 1.5M YouTube subs. AI research explainer.

CONTACT: karoly@twominutepapers.com, sponsorship form at site

PITCH: "What a time to be alive!" — emergent narrative AI for games. Visual demo + technical innovation angle.`
  },
  {
    id: 'lGG0A85d8Q8dE5GEaUi7', // Inkle
    research: `RESEARCHED 2026-03-04: Narrative game studio (80 Days, Heaven's Vault, Sorcery!). Created ink scripting language. Discord: 9,200+ members.

CONTACT: discord.com/invite/inkle

PITCH: Recruit playtesters from narrative-focused community. Many ink users interested in next-gen narrative tools.`
  },
  {
    id: 'qb9pgEa5AqNsvJuFBUo1', // IGDA Narrative SIG
    research: `RESEARCHED 2026-03-04: Founded 2002. Game writers and narrative designers. Active on Discord, FB, LinkedIn, Bluesky, X. Runs Arcjam game jam.

CONTACT: game-writing.com, social channels

PITCH: Professional narrative designers who understand dialogue tree pain. Director solves their workflow bottleneck.`
  },
  {
    id: 'UpDx7dqqX995TYTqq9OU', // ICIDS
    research: `RESEARCHED 2026-03-04: International Conference on Interactive Digital Storytelling. Main conference of ARDIN. Premier academic venue for narrative AI. Springer proceedings.

CONTACT: icids.eae.utah.edu, ardin.online

ACTION: Submit research paper (deadline ~June). Academic credibility for Director approach.`
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
  
  console.log(`\n=== Updated ${updates.length} Director community leads with research ===`);
  process.exit(0);
}

main();
