// Seed European leads - Mixed Architect + Director (NL, PL, SE, FI, ES, DK)
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

const europeLeads = [
  // ========== NETHERLANDS ==========
  {
    name: "Triumph Studios",
    type: "studio",
    status: "active",
    priority: "medium",
    owner: "system",
    contact: { name: "", role: "", email: "", phone: "", linkedin: "" },
    website: "https://triumph.net",
    country: "Netherlands",
    location: "Delft",
    tags: ["netherlands", "aa", "strategy", "rpg", "paradox-owned", "director-icp"],
    notes: "Founded 1997. ~80 employees. Age of Wonders series, Overlord. Paradox Interactive owned since 2017. Strategy RPG with dialogue/NPC systems. Source: Wikipedia, triumph.net",
    studio: { 
      size: "80", 
      type: "aa", 
      games: ["Age of Wonders 4", "Age of Wonders: Planetfall", "Overlord"], 
      focus: "Strategy RPG", 
      fitScore: 70, 
      fitReason: "Strategy RPG has NPC dialogue. Paradox ownership may slow decisions." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-europe"
  },
  {
    name: "Guerrilla Games",
    type: "studio",
    status: "active",
    priority: "low",
    owner: "system",
    contact: { name: "", role: "", email: "", phone: "", linkedin: "" },
    website: "https://www.guerrilla-games.com",
    country: "Netherlands",
    location: "Amsterdam",
    tags: ["netherlands", "aaa", "open-world", "action-rpg", "playstation", "reference"],
    notes: "400 employees. Amsterdam. Horizon Zero Dawn, Horizon Forbidden West. PlayStation first-party. Too large but THE Dutch AAA studio. Source: Wikipedia, GameDeveloper",
    studio: { 
      size: "400", 
      type: "aaa", 
      games: ["Horizon Zero Dawn", "Horizon Forbidden West", "Killzone"], 
      focus: "Open-world action RPG", 
      fitScore: 20, 
      fitReason: "PlayStation first-party. Reference only." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-europe"
  },

  // ========== POLAND ==========
  {
    name: "11 bit studios",
    type: "studio",
    status: "active",
    priority: "high",
    owner: "system",
    contact: { name: "", role: "", email: "", phone: "", linkedin: "" },
    website: "https://11bitstudios.com",
    country: "Poland",
    location: "Warsaw",
    tags: ["poland", "aa", "narrative", "survival", "meaningful-entertainment", "director-icp"],
    notes: "Founded 2010 by ex-CD Projekt. 100 employees. This War of Mine (9M+ copies), Frostpunk, Frostpunk 2, The Alters. 'Meaningful entertainment' focus. Publicly traded (WSE). Source: Wikipedia, WholesGame",
    studio: { 
      size: "100", 
      type: "aa", 
      games: ["This War of Mine", "Frostpunk", "Frostpunk 2", "The Alters"], 
      focus: "Narrative survival / city-builder", 
      fitScore: 85, 
      fitReason: "Narrative-driven survival. Moral choices = NPC dialogue potential. Making RPG next." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-europe"
  },
  {
    name: "Bloober Team",
    type: "studio",
    status: "active",
    priority: "high",
    owner: "system",
    contact: { name: "Piotr Babieno", role: "CEO, Co-founder", email: "", phone: "", linkedin: "" },
    website: "https://www.blooberteam.com",
    country: "Poland",
    location: "Krakow",
    tags: ["poland", "aa", "horror", "narrative", "konami-partner", "director-icp"],
    notes: "Founded 2008. 250 employees. Layers of Fear, Observer, The Medium, Silent Hill 2 remake (2024), Cronos: The New Dawn. Konami partnership. Horror narrative specialists. Source: Wikipedia, CBR",
    studio: { 
      size: "250", 
      type: "aa", 
      games: ["Silent Hill 2 (remake)", "The Medium", "Layers of Fear", "Observer", "Cronos: The New Dawn"], 
      focus: "Horror / psychological narrative", 
      fitScore: 80, 
      fitReason: "Horror with NPC dialogue. Silent Hill = extensive character interactions." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-europe"
  },

  // ========== SWEDEN ==========
  {
    name: "Tarsier Studios",
    type: "studio",
    status: "active",
    priority: "medium",
    owner: "system",
    contact: { name: "", role: "", email: "", phone: "", linkedin: "" },
    website: "https://tarsier.se",
    country: "Sweden",
    location: "Malmö",
    tags: ["sweden", "aa", "horror", "visual-narrative", "embracer", "architect-icp"],
    notes: "Founded 2004. 60-70 employees. Little Nightmares 1&2, REANIMAL (2026). Embracer owned. Environmental storytelling, minimal dialogue. Source: Wikipedia, tarsier.se",
    studio: { 
      size: "60-70", 
      type: "aa", 
      games: ["Little Nightmares", "Little Nightmares II", "REANIMAL"], 
      focus: "Visual horror narrative", 
      fitScore: 75, 
      fitReason: "Environmental storytelling. Less dialogue but strong narrative intent." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-europe"
  },
  {
    name: "Fatshark",
    type: "studio",
    status: "active",
    priority: "low",
    owner: "system",
    contact: { name: "", role: "", email: "", phone: "", linkedin: "" },
    website: "https://www.fatshark.se",
    country: "Sweden",
    location: "Stockholm",
    tags: ["sweden", "aa", "co-op", "action", "warhammer", "director-icp"],
    notes: "180-200 employees. Stockholm (Södermalm). Warhammer: Vermintide, Warhammer 40K: Darktide. Co-op action specialists. Source: fatshark.se, LinkedIn",
    studio: { 
      size: "180-200", 
      type: "aa", 
      games: ["Warhammer: Vermintide 2", "Warhammer 40K: Darktide"], 
      focus: "Co-op action", 
      fitScore: 50, 
      fitReason: "Action-focused but has NPC dialogue/mission briefings." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-europe"
  },

  // ========== FINLAND ==========
  {
    name: "Remedy Entertainment",
    type: "studio",
    status: "active",
    priority: "high",
    owner: "system",
    contact: { name: "Sam Lake", role: "Creative Director", email: "", phone: "", linkedin: "" },
    website: "https://www.remedygames.com",
    country: "Finland",
    location: "Espoo",
    tags: ["finland", "aa", "narrative", "action", "cinematic", "director-icp"],
    notes: "Founded 1995. 250+ employees. Max Payne, Alan Wake (1&2), Control. Cinematic single-player action masters. Own engine. Publicly traded. Source: Wikipedia, remedygames.com",
    studio: { 
      size: "250+", 
      type: "aa", 
      games: ["Alan Wake 2", "Control", "Alan Wake", "Max Payne"], 
      focus: "Cinematic narrative action", 
      fitScore: 90, 
      fitReason: "PERFECT Director fit. Extensive NPC dialogue. Narrative is core to identity." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-europe"
  },
  {
    name: "Frozenbyte",
    type: "studio",
    status: "active",
    priority: "low",
    owner: "system",
    contact: { name: "", role: "", email: "", phone: "", linkedin: "" },
    website: "https://www.frozenbyte.com",
    country: "Finland",
    location: "Helsinki",
    tags: ["finland", "indie", "action-adventure", "puzzle", "director-icp"],
    notes: "Founded 2001. ~80 employees. Trine series (5 games, 15M+ copies), Starbase. Action-adventure puzzle. Source: Wikipedia, frozenbyte.com",
    studio: { 
      size: "80", 
      type: "indie", 
      games: ["Trine 5", "Trine 4", "Starbase"], 
      focus: "Action-adventure puzzle", 
      fitScore: 55, 
      fitReason: "Trine has narrative but less dialogue-heavy. Some NPC interaction." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-europe"
  },

  // ========== SPAIN ==========
  {
    name: "Tequila Works",
    type: "studio",
    status: "active",
    priority: "high",
    owner: "system",
    contact: { name: "Raúl Rubio", role: "CEO, Co-founder", email: "", phone: "", linkedin: "" },
    website: "https://tequilaworks.com",
    country: "Spain",
    location: "Madrid",
    tags: ["spain", "aa", "narrative", "adventure", "director-icp"],
    notes: "Founded 2009. ~127 employees. RiME, Gylt, Deadlight, Song of Nunu. Narrative adventure specialists. Raúl Rubio is CEO. Source: Wikipedia, RocketReach",
    studio: { 
      size: "127", 
      type: "aa", 
      games: ["RiME", "Gylt", "Deadlight", "Song of Nunu: A League of Legends Story"], 
      focus: "Narrative adventure", 
      fitScore: 80, 
      fitReason: "RiME/Gylt have strong narrative. Action-adventure with NPC potential." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-europe"
  },

  // ========== DENMARK ==========
  {
    name: "Playdead",
    type: "studio",
    status: "active",
    priority: "high",
    owner: "system",
    contact: { name: "Arnt Jensen", role: "Founder, Game Director", email: "", phone: "", linkedin: "" },
    website: "https://playdead.com",
    country: "Denmark",
    location: "Copenhagen",
    tags: ["denmark", "aa", "visual-narrative", "puzzle", "architect-icp"],
    notes: "Founded 2006. 70-100 employees. LIMBO, Inside (both masterpieces). Working on unannounced sci-fi project. Environmental storytelling masters. Arnt Jensen is founder. Source: Wikipedia, playdead.com",
    studio: { 
      size: "70-100", 
      type: "aa", 
      games: ["LIMBO", "Inside", "Unannounced sci-fi"], 
      focus: "Environmental narrative", 
      fitScore: 85, 
      fitReason: "Wordless narrative masters. Visual storytelling. New project = opportunity." 
    },
    pipeline: { pipelineId: "default", stageId: "new-lead", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
    createdBy: "research-europe"
  }
];

async function seedEuropeLeads() {
  console.log(`Adding ${europeLeads.length} European leads (NL/PL/SE/FI/ES/DK)...\n`);
  
  const byCountry = {};
  
  for (const lead of europeLeads) {
    const docRef = await db.collection('leads').add({
      ...lead,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    const priority = { high: '🔴', medium: '🟡', low: '🟢' };
    const country = lead.country;
    byCountry[country] = (byCountry[country] || 0) + 1;
    
    console.log(`${priority[lead.priority] || '⚪'} ${lead.name.padEnd(25)} | Fit: ${lead.studio.fitScore.toString().padStart(2)} | ${country}`);
  }
  
  console.log(`\n✅ Done. Added ${europeLeads.length} leads.`);
  Object.entries(byCountry).forEach(([c, n]) => console.log(`   ${c}: ${n}`));
  process.exit(0);
}

seedEuropeLeads();
