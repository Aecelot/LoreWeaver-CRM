/**
 * Batch Studio Research via Browser Automation
 * 
 * Phases:
 * 1. research - Deep dive on all unresearched studios
 * 2. contacts - Farm contacts for all studios
 * 
 * State tracked in batch-research-state.json
 */

import admin from 'firebase-admin';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';

// Firebase init
const sa = JSON.parse(readFileSync('./service-account.json', 'utf8'));
if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(sa) });
}
const db = admin.firestore();

const STATE_FILE = './scripts/batch-research-state.json';
const BATCH_SIZE = 5; // Studios per run (conservative for browser automation)

// Load or init state
function loadState() {
  if (existsSync(STATE_FILE)) {
    return JSON.parse(readFileSync(STATE_FILE, 'utf8'));
  }
  return {
    phase: 'research', // 'research' or 'contacts'
    completedIds: [],
    startedAt: new Date().toISOString(),
    lastRunAt: null,
    stats: { researched: 0, contacts: 0, errors: 0 }
  };
}

function saveState(state) {
  state.lastRunAt = new Date().toISOString();
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

// Browser search via OpenClaw CLI (simpler than CDP directly)
async function browserSearch(query) {
  const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  
  try {
    // Use openclaw browser commands via CLI
    const snapshotCmd = `openclaw browser snapshot --url "${url}" --wait 3000 --format text 2>&1`;
    const result = execSync(snapshotCmd, { 
      encoding: 'utf8', 
      timeout: 30000,
      maxBuffer: 1024 * 1024 * 5 // 5MB buffer
    });
    return result;
  } catch (err) {
    console.error(`Search failed for: ${query}`, err.message);
    return null;
  }
}

// Extract info from Google search results
function extractResearchData(searchResult, studioName) {
  if (!searchResult) return null;
  
  const data = {
    description: '',
    games: [],
    techStack: [],
    contacts: [],
    emails: [],
    linkedIns: [],
    notes: []
  };
  
  // Extract emails
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/g;
  const emails = searchResult.match(emailRegex) || [];
  data.emails = [...new Set(emails.filter(e => 
    !e.includes('example') && 
    !e.includes('email@') &&
    !e.includes('your@')
  ))];
  
  // Extract LinkedIn URLs
  const linkedInRegex = /linkedin\.com\/in\/[\w-]+/g;
  const linkedIns = searchResult.match(linkedInRegex) || [];
  data.linkedIns = [...new Set(linkedIns)];
  
  // Look for key roles
  const rolePatterns = [
    /(\w+[\w\s]*)\s*[-–—]\s*(Narrative\s*(?:Director|Designer|Lead))/gi,
    /(\w+[\w\s]*)\s*[-–—]\s*(Creative\s*Director)/gi,
    /(\w+[\w\s]*)\s*[-–—]\s*(Lead\s*Writer)/gi,
    /(\w+[\w\s]*)\s*[-–—]\s*(Game\s*Director)/gi,
    /(Narrative\s*(?:Director|Designer|Lead))\s*[-–—:]\s*(\w+[\w\s]*)/gi,
  ];
  
  for (const pattern of rolePatterns) {
    const matches = searchResult.matchAll(pattern);
    for (const match of matches) {
      data.contacts.push(match[0]);
    }
  }
  
  // Extract game titles (look for known patterns)
  const gamePatterns = [
    /known for[:\s]+([^.]+)/gi,
    /games include[:\s]+([^.]+)/gi,
    /released[:\s]+([^.]+)/gi,
  ];
  
  for (const pattern of gamePatterns) {
    const match = pattern.exec(searchResult);
    if (match) {
      data.games.push(match[1].trim());
    }
  }
  
  // Look for engine mentions
  if (/unity/i.test(searchResult)) data.techStack.push('Unity');
  if (/unreal/i.test(searchResult)) data.techStack.push('Unreal');
  if (/godot/i.test(searchResult)) data.techStack.push('Godot');
  if (/ren'?py/i.test(searchResult)) data.techStack.push("Ren'Py");
  
  // Build notes from AI overview if present
  const aiOverviewMatch = searchResult.match(/AI Overview[\s\S]*?(?=Search Results|$)/i);
  if (aiOverviewMatch) {
    data.notes.push('AI Overview: ' + aiOverviewMatch[0].slice(0, 500));
  }
  
  return data;
}

// Research a single studio
async function researchStudio(studio) {
  console.log(`  Researching: ${studio.name}`);
  
  const query = `${studio.name} game studio narrative team contact`;
  const searchResult = await browserSearch(query);
  
  if (!searchResult) {
    return { success: false, error: 'Search failed' };
  }
  
  const data = extractResearchData(searchResult, studio.name);
  
  // Build research note
  const noteLines = [`RESEARCHED ${new Date().toISOString().split('T')[0]} via browser automation`];
  
  if (data.emails.length) {
    noteLines.push(`\nEmails found: ${data.emails.join(', ')}`);
  }
  if (data.linkedIns.length) {
    noteLines.push(`\nLinkedIn profiles: ${data.linkedIns.map(l => 'linkedin.com/' + l.split('linkedin.com/')[1]).join(', ')}`);
  }
  if (data.contacts.length) {
    noteLines.push(`\nKey contacts: ${data.contacts.slice(0, 5).join('; ')}`);
  }
  if (data.techStack.length) {
    noteLines.push(`\nTech stack: ${data.techStack.join(', ')}`);
  }
  if (data.games.length) {
    noteLines.push(`\nGames: ${data.games.slice(0, 3).join('; ')}`);
  }
  
  return {
    success: true,
    data,
    note: noteLines.join('')
  };
}

// Farm contacts for a studio
async function farmContacts(studio) {
  console.log(`  Contact farming: ${studio.name}`);
  
  const query = `"${studio.name}" narrative director OR lead writer OR creative director LinkedIn`;
  const searchResult = await browserSearch(query);
  
  if (!searchResult) {
    return { success: false, error: 'Search failed' };
  }
  
  const contacts = [];
  
  // Extract LinkedIn profiles with names
  const linkedInPattern = /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)\s*[-–—|]\s*(?:.*?linkedin|LinkedIn)/g;
  const matches = searchResult.matchAll(linkedInPattern);
  for (const match of matches) {
    contacts.push({ name: match[1], source: 'LinkedIn' });
  }
  
  // Extract emails
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/g;
  const emails = searchResult.match(emailRegex) || [];
  const validEmails = [...new Set(emails.filter(e => 
    !e.includes('example') && 
    !e.includes('email@') &&
    !e.includes('your@') &&
    !e.includes('privacy') &&
    !e.includes('support@google')
  ))];
  
  return {
    success: true,
    contacts,
    emails: validEmails
  };
}

// Main batch processor
async function processBatch() {
  const state = loadState();
  console.log(`\n=== Batch Research Run ===`);
  console.log(`Phase: ${state.phase}`);
  console.log(`Completed so far: ${state.completedIds.length}`);
  
  // Get studios to process
  let studios;
  
  if (state.phase === 'research') {
    // Get unresearched studios
    const snapshot = await db.collection('leads')
      .where('type', '==', 'studio')
      .limit(500)
      .get();
    
    studios = snapshot.docs
      .filter(d => d.data().status !== 'researched' && !state.completedIds.includes(d.id))
      .map(d => ({ id: d.id, ...d.data() }))
      .slice(0, BATCH_SIZE);
    
    if (studios.length === 0) {
      console.log('Research phase complete! Switching to contacts phase...');
      state.phase = 'contacts';
      state.completedIds = []; // Reset for next phase
      saveState(state);
      return processBatch(); // Recurse to start contacts phase
    }
    
    // Process research batch
    for (const studio of studios) {
      try {
        const result = await researchStudio(studio);
        
        if (result.success) {
          // Add note to CRM
          await db.collection('notes').add({
            leadId: studio.id,
            content: result.note,
            status: 'warm',
            createdBy: 'skel-batch',
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
          });
          
          // Update lead status
          const updateData = {
            status: 'researched',
            'pipeline.stageId': 'researched',
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
          };
          
          // Add any emails found
          if (result.data.emails.length > 0) {
            updateData.contactEmail = result.data.emails[0];
          }
          
          await db.collection('leads').doc(studio.id).update(updateData);
          
          state.completedIds.push(studio.id);
          state.stats.researched++;
          console.log(`    ✓ ${studio.name}`);
        } else {
          state.stats.errors++;
          console.log(`    ✗ ${studio.name}: ${result.error}`);
        }
      } catch (err) {
        state.stats.errors++;
        console.log(`    ✗ ${studio.name}: ${err.message}`);
      }
      
      // Small delay between searches
      await new Promise(r => setTimeout(r, 2000));
    }
    
  } else if (state.phase === 'contacts') {
    // Get all studios for contact farming
    const snapshot = await db.collection('leads')
      .where('type', '==', 'studio')
      .limit(500)
      .get();
    
    studios = snapshot.docs
      .filter(d => !state.completedIds.includes(d.id))
      .map(d => ({ id: d.id, ...d.data() }))
      .slice(0, BATCH_SIZE);
    
    if (studios.length === 0) {
      console.log('\n=== ALL DONE! ===');
      console.log(`Total researched: ${state.stats.researched}`);
      console.log(`Total contacts: ${state.stats.contacts}`);
      console.log(`Errors: ${state.stats.errors}`);
      state.phase = 'complete';
      saveState(state);
      return;
    }
    
    // Process contacts batch
    for (const studio of studios) {
      try {
        const result = await farmContacts(studio);
        
        if (result.success) {
          const updateData = {
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
          };
          
          // Add contacts found
          if (result.emails.length > 0 && !studio.contactEmail) {
            updateData.contactEmail = result.emails[0];
          }
          if (result.contacts.length > 0) {
            updateData.contactName = result.contacts[0].name;
          }
          
          if (Object.keys(updateData).length > 1) {
            await db.collection('leads').doc(studio.id).update(updateData);
            state.stats.contacts++;
          }
          
          state.completedIds.push(studio.id);
          console.log(`    ✓ ${studio.name} (${result.emails.length} emails, ${result.contacts.length} contacts)`);
        } else {
          state.stats.errors++;
          console.log(`    ✗ ${studio.name}: ${result.error}`);
        }
      } catch (err) {
        state.stats.errors++;
        console.log(`    ✗ ${studio.name}: ${err.message}`);
      }
      
      // Small delay
      await new Promise(r => setTimeout(r, 2000));
    }
  }
  
  saveState(state);
  
  // Calculate remaining
  const remaining = state.phase === 'research' 
    ? '(research phase)' 
    : `${443 - state.completedIds.length} studios left`;
  
  console.log(`\nBatch complete. ${remaining}`);
  console.log(`Stats: researched=${state.stats.researched}, contacts=${state.stats.contacts}, errors=${state.stats.errors}`);
}

// Run
processBatch()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
