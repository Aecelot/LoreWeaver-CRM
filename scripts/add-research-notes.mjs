// Add research findings as notes to the notes collection
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

// Leads with research in their notes field that need to be migrated
const leadsToMigrate = [
  'Inkle',
  'Remedy',
  'Hazelight',
  'Weather Factory',
  'like Charlie',
  'Supermassive',
  "Fool's Theory",
  'Failbetter'
];

async function migrateResearchToNotes() {
  console.log('Migrating research from notes field to notes collection...\n');
  
  for (const leadName of leadsToMigrate) {
    // Find the lead
    const snapshot = await db.collection('leads')
      .where('name', '>=', leadName)
      .where('name', '<=', leadName + '\uf8ff')
      .limit(1)
      .get();
    
    if (snapshot.empty) {
      console.log(`⚠️  ${leadName}: Lead not found`);
      continue;
    }
    
    const leadDoc = snapshot.docs[0];
    const lead = leadDoc.data();
    
    if (!lead.notes || lead.notes.length < 100) {
      console.log(`⚠️  ${leadName}: No research in notes field`);
      continue;
    }
    
    // Check if we already have a research note for this lead
    const existingNotes = await db.collection('notes')
      .where('leadId', '==', leadDoc.id)
      .get();
    
    const hasResearchNote = existingNotes.docs.some(d => 
      d.data().content?.includes('DEEP RESEARCH') || d.data().content?.includes('== COMPANY ==')
    );
    
    if (hasResearchNote) {
      console.log(`⏭️  ${leadName}: Research note already exists`);
      continue;
    }
    
    // Create the note
    await db.collection('notes').add({
      leadId: leadDoc.id,
      content: lead.notes,
      status: 'warm', // Research = warm lead
      createdBy: 'system-research',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`✅ ${leadName}: Added research note (${lead.notes.length} chars)`);
  }
  
  console.log('\nDone!');
  process.exit(0);
}

migrateResearchToNotes().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
