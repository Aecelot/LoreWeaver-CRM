/**
 * Batch research update script - 2026-03-05 00:37 run
 * Updates 5 studios researched via browser automation
 */

import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';

// Firebase init
const sa = JSON.parse(readFileSync('./service-account.json', 'utf8'));
if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(sa) });
}
const db = admin.firestore();

const studioData = [
  {
    id: '6b8pSePusfrha2VV2bXW',
    name: 'Bromio',
    email: 'info@bromio.com.mx',
    website: 'https://bromio.com.mx',
    note: `RESEARCHED 2026-03-05 via browser automation

Email found: info@bromio.com.mx
Website: bromio.com.mx
Location: Puebla, Puebla, Mexico
Founded: May 6, 2013
Games: Pato Box, Remnants of The Rift
Key contact: Tony (Game Director, @tonyel3 on Twitter)
Social: Twitter @firehorsegames, Facebook @FireHorseStudio`
  },
  {
    id: '6vobzTZSbmYudAFdsioE',
    name: 'Fire Horse Studio',
    email: 'contact@firehorse.com.br',
    website: 'https://firehorse.com.br',
    note: `RESEARCHED 2026-03-05 via browser automation

Email found: contact@firehorse.com.br
Website: firehorse.com.br
Location: São Paulo, Brazil
Founded: 2012
Games: Like a Boss, OAK
Social: Twitter @firehorsegames, Facebook @FireHorseStudio, Discord: w5azHEvQwW`
  },
  {
    id: '7H78xJt4VOSrIiSSUEfR',
    name: 'Rockhead Studios',
    email: 'contact@rockheadgames.com',
    website: 'https://rockheadgames.com',
    note: `RESEARCHED 2026-03-05 via browser automation

Email found: contact@rockheadgames.com (also support@rockheadgames.com)
Website: rockheadgames.com
Location: Porto Alegre, Brazil
Founded: 2011
Employees: ~10
Games: Starlit Adventures, Starlit Kart Racing
LinkedIn: 1.8K+ followers
Facebook: 5.5K+ followers`
  },
  {
    id: '7P6P4j8hFUzMExpkBTAm',
    name: 'Curse Game Studio',
    email: null,
    website: null,
    note: `RESEARCHED 2026-03-05 via browser automation

No direct email found - search results confused with CurseForge (modding platform).
May need manual verification of studio existence or different name.`
  },
  {
    id: '8wiUjF59PRnrSDlMj2XM',
    name: 'Free Lives',
    email: 'support@freelives.net',
    website: 'https://freelives.net',
    note: `RESEARCHED 2026-03-05 via browser automation

Email found: support@freelives.net
Website: freelives.net
Location: Constantia, Cape Town, South Africa
Founded: April 2012 by Evan Greenwood
Games: Broforce, Terra Nil, Gorn, Genital Jousting
Team: Sean Wright (Game Developer), Luc Wolthers
Facebook: 11.9K+ followers
Instagram: @freelives_official (5.9K+ followers)`
  }
];

async function updateStudios() {
  console.log('Updating 5 studios...');
  
  for (const studio of studioData) {
    try {
      // Add research note
      await db.collection('notes').add({
        leadId: studio.id,
        content: studio.note,
        status: 'warm',
        createdBy: 'skel-batch',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      // Update lead
      const updateData = {
        status: 'researched',
        'pipeline.stageId': 'researched',
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };
      
      if (studio.email) {
        updateData.contactEmail = studio.email;
      }
      if (studio.website) {
        updateData.website = studio.website;
      }
      
      await db.collection('leads').doc(studio.id).update(updateData);
      console.log(`  ✓ ${studio.name}`);
    } catch (err) {
      console.log(`  ✗ ${studio.name}: ${err.message}`);
    }
  }
  
  // Update state file
  const STATE_FILE = './scripts/batch-research-state.json';
  const state = JSON.parse(readFileSync(STATE_FILE, 'utf8'));
  
  // Add new IDs to completed
  for (const studio of studioData) {
    if (!state.completedIds.includes(studio.id)) {
      state.completedIds.push(studio.id);
    }
  }
  
  state.lastRunAt = new Date().toISOString();
  state.stats.researched += studioData.filter(s => s.email).length;
  state.stats.errors += studioData.filter(s => !s.email).length;
  
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
  
  console.log(`\nDone. State updated: ${state.completedIds.length} total completed.`);
}

updateStudios()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
