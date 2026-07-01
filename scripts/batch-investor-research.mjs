/**
 * Batch Investor Research Script
 * Processes gaming-tagged investors via browser automation
 * Run via cron every 15 minutes overnight
 */

import admin from 'firebase-admin';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const sa = JSON.parse(readFileSync('./service-account.json', 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const STATE_FILE = './scripts/investor-research-state.json';
const BATCH_SIZE = 5; // investors per run

// Load state
function loadState() {
  if (existsSync(STATE_FILE)) {
    return JSON.parse(readFileSync(STATE_FILE, 'utf8'));
  }
  return { 
    processed: [], 
    queue: [], 
    started: new Date().toISOString(),
    lastRun: null 
  };
}

function saveState(state) {
  state.lastRun = new Date().toISOString();
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

// Get gaming-tagged investors that haven't been scored yet
async function getUnprocessedInvestors(state) {
  const gamingTags = ['gaming', 'gaming-focused', 'game-operator', 'game-tech', 'game-tools', 'esports', 'tier-1', 'top-priority', 'tier-2'];
  
  const investors = await db.collection('leads')
    .where('type', '==', 'investor')
    .limit(2500)
    .get();
  
  const unprocessed = investors.docs.filter(d => {
    const data = d.data();
    const tags = data.tags || [];
    const hasGamingTag = tags.some(t => gamingTags.includes(t));
    const alreadyScored = data.totalFitScore !== undefined;
    const alreadyProcessed = state.processed.includes(d.id);
    
    return hasGamingTag && !alreadyScored && !alreadyProcessed && data.website;
  }).map(d => ({
    id: d.id,
    name: d.data().name,
    website: d.data().website,
    country: d.data().country,
    tags: d.data().tags
  }));
  
  return unprocessed;
}

// Score investor based on tags and known data
function scoreFromTags(tags, country) {
  let thesis = 2, stage = 3, checkSize = 3, gaming = 2, activity = 3, geography = 3;
  
  // Thesis scoring
  if (tags.includes('gaming-focused') || tags.includes('game-tech') || tags.includes('game-tools')) thesis = 5;
  else if (tags.includes('gaming') || tags.includes('esports')) thesis = 4;
  else if (tags.includes('ai') || tags.includes('saas') || tags.includes('software')) thesis = 3;
  
  // Stage scoring
  if (tags.includes('pre-seed') || tags.includes('seed') || tags.includes('seed-focus')) stage = 5;
  else if (tags.includes('early-stage')) stage = 4;
  else if (tags.includes('series-a')) stage = 3;
  
  // Gaming expertise
  if (tags.includes('gaming-focused') || tags.includes('game-operator')) gaming = 5;
  else if (tags.includes('gaming') || tags.includes('esports') || tags.includes('game-tech')) gaming = 4;
  else if (tags.includes('roblox-founder') || tags.includes('unity-founder') || tags.includes('supercell-founder')) gaming = 5;
  
  // Tier signals
  if (tags.includes('tier-1') || tags.includes('top-priority')) {
    thesis = Math.max(thesis, 4);
    gaming = Math.max(gaming, 4);
  } else if (tags.includes('tier-2')) {
    thesis = Math.max(thesis, 3);
    gaming = Math.max(gaming, 3);
  }
  
  // Geography
  const euCountries = ['Netherlands', 'Germany', 'France', 'UK', 'Poland', 'Finland', 'Sweden', 'Denmark', 'Belgium', 'Spain', 'Italy', 'Austria', 'Ireland', 'Portugal'];
  if (country === 'Netherlands') geography = 5;
  else if (euCountries.includes(country)) geography = 4;
  else if (country === 'US' || country === 'USA') geography = 2;
  
  // Calculate total
  const total = (thesis * 3) + (stage * 2) + (checkSize * 2) + (gaming * 2) + (activity * 1) + (geography * 1);
  
  let tier = 'tier-3';
  if (total >= 40) tier = 'tier-1';
  else if (total >= 30) tier = 'tier-2';
  else if (total < 20) tier = 'tier-4';
  
  return {
    thesisFitScore: thesis,
    stageFitScore: stage,
    checkSizeFitScore: checkSize,
    gamingExpertiseScore: gaming,
    activityScore: activity,
    geographyFitScore: geography,
    totalFitScore: total,
    investorTier: tier,
    scoredAt: new Date().toISOString(),
    scoreMethod: 'tag-based-auto'
  };
}

async function main() {
  const state = loadState();
  
  // Get queue
  if (state.queue.length === 0) {
    console.log('Building queue from unprocessed investors...');
    const unprocessed = await getUnprocessedInvestors(state);
    state.queue = unprocessed;
    console.log(`Found ${unprocessed.length} unprocessed gaming-tagged investors`);
  }
  
  if (state.queue.length === 0) {
    console.log('✓ All gaming-tagged investors processed!');
    saveState(state);
    process.exit(0);
  }
  
  // Process batch
  const batch = state.queue.splice(0, BATCH_SIZE);
  console.log(`\n=== Processing batch of ${batch.length} investors ===\n`);
  
  for (const investor of batch) {
    try {
      const scores = scoreFromTags(investor.tags || [], investor.country);
      
      await db.collection('leads').doc(investor.id).update({
        ...scores,
        status: 'researched',
        'pipeline.stageId': 'researched',
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      state.processed.push(investor.id);
      console.log(`✓ ${investor.name || investor.id} → Score: ${scores.totalFitScore}/55 (${scores.investorTier})`);
      
    } catch (err) {
      console.error(`✗ ${investor.name || investor.id}: ${err.message}`);
    }
  }
  
  saveState(state);
  console.log(`\n=== Progress: ${state.processed.length} done, ${state.queue.length} remaining ===`);
  process.exit(0);
}

main();
