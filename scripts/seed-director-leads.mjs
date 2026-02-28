// Seed Director leads - Belgium, France, Germany
// Director ICP: AA studios (20-150 ppl), RPGs/action-RPGs with NPC dialogue needs
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

const directorLeads = [
  // ========== BELGIUM ==========
  {
    name: "Appeal Studios",
    type: "studio",
    status: "active",
    priority: "high",
    owner: "system",
    contact: { name: "", role: "", email: "", phone: "", linkedin: "" },
    website: "https://www.appeal-studios.com",
    country: "Belgium",
    location: "Belgium",
    tags: ["belgium", "aa", "open-world", "action-adventure", "director-icp"],
    notes: "Founded 2018 (reformed). 55 employees. Making Project-S (open-world sci-fi adventure). Original creators of Outcast (1999 open-world pioneer). Embracer owned. Veteran team. Source: Embracer PR, appeal-studios.com",
    studio: { 
      size: "55", 
      type: "aa", 
      games: ["Outcast", "Outcast: Second Contact", "Project-S (in dev)"], 
      focus: "Open-world action adventure", 
      fitScore: 90, 
      fitReason: "Open-world with NPCs. Perfect size for Director. Veteran open-world expertise." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-director"
  },
  {
    name: "Larian Studios",
    type: "studio",
    status: "active",
    priority: "low",
    owner: "system",
    contact: { name: "Swen Vincke", role: "CEO", email: "", phone: "", linkedin: "" },
    website: "https://larian.com",
    country: "Belgium",
    location: "Ghent",
    tags: ["belgium", "aaa", "crpg", "narrative", "director-icp"],
    notes: "Founded 1996. 500+ employees globally. Baldur's Gate 3, Divinity series. THE benchmark for CRPG dialogue/NPC systems. Too large for typical sale but important reference. Working on new Divinity project. Source: Wikipedia, larian.com",
    studio: { 
      size: "500+", 
      type: "aaa", 
      games: ["Baldur's Gate 3", "Divinity: Original Sin 2", "Divinity: Original Sin"], 
      focus: "CRPG with complex dialogue", 
      fitScore: 25, 
      fitReason: "Too large, has internal tools. But THE reference for RPG dialogue systems." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-director"
  },

  // ========== FRANCE ==========
  {
    name: "Cyanide Studio",
    type: "studio",
    status: "active",
    priority: "high",
    owner: "system",
    contact: { name: "", role: "", email: "", phone: "", linkedin: "" },
    website: "https://cyanide-studio.com",
    country: "France",
    location: "Nanterre (Paris)",
    tags: ["france", "aa", "action-rpg", "licensed", "director-icp"],
    notes: "Founded 2000 by 7 ex-Ubisoft. 110 employees. Styx series (stealth RPG), Blood Bowl, Werewolf: The Apocalypse. Also has Montreal studio (Amusement Cyanide). Nacon owned. Source: Wikipedia, cyanide-studio.com",
    studio: { 
      size: "110", 
      type: "aa", 
      games: ["Styx: Master of Shadows", "Styx: Shards of Darkness", "Blood Bowl 3", "Werewolf: The Apocalypse - Earthblood"], 
      focus: "Action-RPG, licensed games", 
      fitScore: 80, 
      fitReason: "Multiple RPGs with NPC/dialogue systems. Right size. Styx has stealth + dialogue." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-director"
  },
  {
    name: "Tactical Adventures",
    type: "studio",
    status: "active",
    priority: "high",
    owner: "system",
    contact: { name: "", role: "", email: "", phone: "", linkedin: "" },
    website: "https://www.tactical-adventures.com",
    country: "France",
    location: "Paris",
    tags: ["france", "indie", "crpg", "dnd", "director-icp"],
    notes: "~35 employees. Paris-based. Made Solasta: Crown of the Magister (D&D 5e CRPG). Self-published. Working on Solasta 2. Community-driven dev. Also has Lyon subsidiary (Talyon). Source: solasta-game.com, Wikipedia",
    studio: { 
      size: "35", 
      type: "indie", 
      games: ["Solasta: Crown of the Magister", "Solasta 2 (in dev)"], 
      focus: "CRPG / D&D", 
      fitScore: 90, 
      fitReason: "Pure CRPG with party dialogue/NPC interactions. Perfect Director fit. Small enough to adopt." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-director"
  },
  {
    name: "Spiders",
    type: "studio",
    status: "active",
    priority: "high",
    owner: "system",
    contact: { name: "Jehanne Rousseau", role: "CEO & Co-founder", email: "", phone: "", linkedin: "" },
    website: "https://www.spiders-games.com",
    country: "France",
    location: "Paris",
    tags: ["france", "aa", "action-rpg", "narrative", "director-icp"],
    notes: "Founded 2008. 95 employees. GreedFall (colonial action-RPG with deep dialogue), Steelrising. GreedFall 2 in development. Nacon owned. Jehanne Rousseau is CEO. Source: Wikipedia, GameDeveloper",
    studio: { 
      size: "95", 
      type: "aa", 
      games: ["GreedFall", "GreedFall 2", "Steelrising", "The Technomancer"], 
      focus: "Action RPG with dialogue", 
      fitScore: 85, 
      fitReason: "GreedFall has extensive NPC dialogue/faction systems. Perfect Director showcase." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-director"
  },
  {
    name: "Sandfall Interactive",
    type: "studio",
    status: "active",
    priority: "medium",
    owner: "system",
    contact: { name: "Guillaume Broche", role: "CEO & Creative Director", email: "", phone: "", linkedin: "" },
    website: "https://www.sandfall.co",
    country: "France",
    location: "Montpellier",
    tags: ["france", "indie", "jrpg", "narrative", "director-icp"],
    notes: "Founded 2020. 30+ employees. Clair Obscur: Expedition 33 (2025 hit JRPG). Ex-Ubisoft founders. Published by Kepler Interactive. Turn-based RPG with narrative focus. Source: sandfall.co, Wikipedia FR",
    studio: { 
      size: "30+", 
      type: "indie", 
      games: ["Clair Obscur: Expedition 33"], 
      focus: "JRPG / turn-based RPG", 
      fitScore: 75, 
      fitReason: "Turn-based RPG has NPC dialogue but less real-time NPC AI needs than action-RPGs." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-director"
  },
  {
    name: "Asobo Studio",
    type: "studio",
    status: "active",
    priority: "low",
    owner: "system",
    contact: { name: "", role: "", email: "", phone: "", linkedin: "" },
    website: "https://www.asobostudio.com",
    country: "France",
    location: "Bordeaux",
    tags: ["france", "aa", "narrative", "adventure", "director-icp"],
    notes: "Founded 2002. 200+ employees. A Plague Tale: Innocence/Requiem (story-driven medieval). Microsoft Flight Simulator. Too large, but strong narrative team. Source: Wikipedia",
    studio: { 
      size: "200+", 
      type: "aa", 
      games: ["A Plague Tale: Innocence", "A Plague Tale: Requiem", "Microsoft Flight Simulator"], 
      focus: "Story adventure / simulation", 
      fitScore: 40, 
      fitReason: "Too large, internal tools likely. But A Plague Tale has NPC companion dialogue." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-director"
  },

  // ========== GERMANY ==========
  {
    name: "Piranha Bytes",
    type: "studio",
    status: "active",
    priority: "high",
    owner: "system",
    contact: { name: "", role: "", email: "", phone: "", linkedin: "" },
    website: "https://www.piranha-bytes.com",
    country: "Germany",
    location: "Essen",
    tags: ["germany", "indie", "open-world-rpg", "classic", "director-icp"],
    notes: "Founded 1997. 25-31 employees. Gothic, Risen, ELEX series. Iconic German open-world RPGs with faction systems and NPC dialogue. THQ Nordic owned. Strong community. Source: Wikipedia, worldofelex.de",
    studio: { 
      size: "25-31", 
      type: "indie", 
      games: ["Gothic", "Gothic 2", "Risen", "ELEX", "ELEX II"], 
      focus: "Open-world RPG", 
      fitScore: 90, 
      fitReason: "Pioneer of open-world RPG with reactive NPCs. Small team. Perfect Director fit." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-director"
  },
  {
    name: "Deck13 Interactive",
    type: "studio",
    status: "active",
    priority: "medium",
    owner: "system",
    contact: { name: "", role: "", email: "", phone: "", linkedin: "" },
    website: "https://www.deck13.com",
    country: "Germany",
    location: "Frankfurt",
    tags: ["germany", "aa", "action-rpg", "souls-like", "director-icp"],
    notes: "Founded 2001. 80+ employees. Lords of the Fallen (original), The Surge 1&2, Atlas Fallen. Souls-like action RPGs. Also runs Deck13 Spotlight publishing. Source: Wikipedia, deck13.com",
    studio: { 
      size: "80+", 
      type: "aa", 
      games: ["Lords of the Fallen", "The Surge", "The Surge 2", "Atlas Fallen"], 
      focus: "Souls-like action RPG", 
      fitScore: 65, 
      fitReason: "Action-RPG but less dialogue focus (Souls-like). Some NPC interaction though." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-director"
  },
  {
    name: "KING Art Games",
    type: "studio",
    status: "active",
    priority: "medium",
    owner: "system",
    contact: { name: "Jan Theysen", role: "Co-founder", email: "", phone: "", linkedin: "" },
    website: "https://kingart-games.com",
    country: "Germany",
    location: "Bremen",
    tags: ["germany", "indie", "adventure", "rpg", "director-icp"],
    notes: "Founded by Jan Theysen and Marc König. Book of Unwritten Tales (point-and-click with dialogue). Iron Harvest (RTS). The Dwarves (action-RPG based on novels). Source: Wikipedia, kingart-games.com",
    studio: { 
      size: "20-40", 
      type: "indie", 
      games: ["The Book of Unwritten Tales", "Iron Harvest", "The Dwarves"], 
      focus: "Adventure / RPG", 
      fitScore: 70, 
      fitReason: "Book of Unwritten Tales is dialogue-heavy. The Dwarves has RPG dialogue. Good fit." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-director"
  },
  {
    name: "Yager Development",
    type: "studio",
    status: "active",
    priority: "low",
    owner: "system",
    contact: { name: "", role: "", email: "", phone: "", linkedin: "" },
    website: "https://www.yager.de",
    country: "Germany",
    location: "Berlin",
    tags: ["germany", "aa", "shooter", "director-icp"],
    notes: "Founded 1999. 100+ employees. Made Spec Ops: The Line (narrative shooter masterpiece). Now focused on The Cycle (multiplayer). Tencent has controlling stake. Source: Wikipedia, kevurugames.com",
    studio: { 
      size: "100+", 
      type: "aa", 
      games: ["Spec Ops: The Line", "The Cycle: Frontier"], 
      focus: "Shooter / multiplayer", 
      fitScore: 40, 
      fitReason: "Spec Ops was narrative excellence but now multiplayer focus. Less relevant." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-director"
  },
  {
    name: "Daedalic Entertainment",
    type: "studio",
    status: "active",
    priority: "medium",
    owner: "system",
    contact: { name: "Carsten Fichtelmann", role: "CEO", email: "", phone: "", linkedin: "" },
    website: "https://www.daedalic.com",
    country: "Germany",
    location: "Hamburg",
    tags: ["germany", "publisher", "adventure", "director-icp"],
    notes: "Founded 2007. ~45 employees. NOW PUBLISHER ONLY (closed dev 2023). Published Deponia, Ken Follett's Pillars of the Earth, The Dark Eye series. Could introduce Director to devs they work with. Nacon owned. Source: Wikipedia",
    studio: { 
      size: "45", 
      type: "publisher", 
      games: ["Deponia (published)", "Ken Follett's Pillars of the Earth", "The Dark Eye: Chains of Satinav"], 
      focus: "Adventure game publishing", 
      fitScore: 55, 
      fitReason: "Publisher now, not dev. But publishes narrative RPGs - could be channel partner." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-director"
  }
];

async function seedDirectorLeads() {
  console.log(`Adding ${directorLeads.length} Director leads (BE/FR/DE)...\n`);
  
  const byCountry = {};
  
  for (const lead of directorLeads) {
    const docRef = await db.collection('leads').add({
      ...lead,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    const priority = { high: '🔴', medium: '🟡', low: '🟢' };
    const country = lead.country;
    byCountry[country] = (byCountry[country] || 0) + 1;
    
    console.log(`${priority[lead.priority] || '⚪'} ${lead.name.padEnd(25)} | Fit: ${lead.studio.fitScore} | ${lead.country}`);
  }
  
  console.log(`\n✅ Done. Added ${directorLeads.length} Director leads.`);
  console.log(`   Belgium: ${byCountry['Belgium'] || 0}`);
  console.log(`   France: ${byCountry['France'] || 0}`);
  console.log(`   Germany: ${byCountry['Germany'] || 0}`);
  process.exit(0);
}

seedDirectorLeads();
