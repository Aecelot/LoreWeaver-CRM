import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccountPath = path.resolve(__dirname, '../../service-account.json');
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Investor Pipeline
const PIPELINE_ID = 'GP9Rvmr9C4yxLY90BF8y';
const INITIAL_STAGE = 'identified';

interface Investor {
  name: string;
  firm: string;
  type: 'vc' | 'angel';
  notes?: string;
}

const investors: Investor[] = [
  { name: 'Brianne Kimmel', firm: 'Worklife Ventures', type: 'vc' },
  { name: 'Arielle Zuckerberg', firm: 'Long Journey Ventures', type: 'vc' },
  { name: 'Jeff Morris Jr.', firm: 'Chapter One', type: 'vc' },
  { name: 'Benjamin Ling', firm: 'Bling Capital', type: 'vc' },
  { name: 'Elana Gold', firm: 'Red Beard Ventures', type: 'vc' },
  { name: 'Tim Guleri', firm: 'Sierra Ventures', type: 'vc' },
  { name: 'Maddi Holman', firm: 'Daring Ventures', type: 'vc' },
  { name: 'Shruti Gandhi', firm: 'Array Ventures', type: 'vc' },
  { name: 'Nicholas Chirls', firm: 'Asylum Ventures', type: 'vc' },
  { name: 'Sudarshan Ravi', firm: 'z21 Ventures', type: 'vc' },
  { name: 'Dustin Rosen', firm: 'Wonder Ventures', type: 'vc' },
  { name: 'Leah Solivan', firm: 'Precedent VC', type: 'vc' },
  { name: 'Chad Byers', firm: 'Susa Ventures', type: 'vc' },
  { name: 'James Gettinger', firm: 'Gutter Capital', type: 'vc' },
  { name: 'Jesse Middleton', firm: 'Flybridge', type: 'vc' },
  { name: 'Lauren Reeves', firm: 'MGV', type: 'vc' },
  { name: 'Nihal Mehta', firm: 'Eniac Ventures', type: 'vc', notes: 'Consumer tech, AI interest' },
  { name: 'Paige Finn Doherty', firm: 'Behind Genius Ventures', type: 'vc' },
  { name: 'Stephanie Rich', firm: 'Bread and Butter', type: 'vc' },
  { name: 'Alex Iskold', firm: '2048 Ventures', type: 'vc', notes: 'Ex-Techstars NYC, dev tools friendly' },
  { name: 'Yohei Nakajima', firm: 'Untapped Capital', type: 'vc', notes: 'Created BabyAGI, AI-native investor - HIGH PRIORITY' },
  { name: 'Allison Barr Allen', firm: 'Angel', type: 'angel' },
  { name: 'Stephanie Palmeri', firm: 'Next View', type: 'vc' },
  { name: 'Tyler Richards', firm: 'Startup Ignition', type: 'vc' },
  { name: 'Daniel Porras', firm: 'Flybridge', type: 'vc' },
  { name: 'Samantha Wong', firm: 'Blackbird', type: 'vc' },
  { name: 'Ashmeet Sidana', firm: 'Engineering Capital', type: 'vc' },
  { name: 'Jillian Williams', firm: 'Field Ventures', type: 'vc' },
  { name: 'Rex Salisbury', firm: 'Cambrian Ventures', type: 'vc' },
  { name: 'Brandon Bryant', firm: 'Harlem Capital', type: 'vc' },
  { name: 'Eric Bahn', firm: 'Hustle Fund', type: 'vc', notes: 'Spray-and-pray seed, very accessible' },
  { name: 'Loren Straub', firm: 'Bowery Capital', type: 'vc' },
];

async function main() {
  console.log(`Importing ${investors.length} investors to pipeline ${PIPELINE_ID}...\n`);
  
  const results = { added: 0, skipped: 0, errors: 0 };
  
  for (const inv of investors) {
    try {
      // Check if already exists (by name + firm)
      const existing = await db.collection('leads')
        .where('name', '==', inv.firm)
        .where('pipeline.id', '==', PIPELINE_ID)
        .get();
      
      if (!existing.empty) {
        console.log(`⏭️  Skipped (exists): ${inv.name} @ ${inv.firm}`);
        results.skipped++;
        continue;
      }
      
      // Create lead (firm as name, person as contact)
      const lead = {
        name: inv.firm,
        status: INITIAL_STAGE,
        pipeline: {
          id: PIPELINE_ID,
          stageId: INITIAL_STAGE,
        },
        contacts: [{
          name: inv.name,
          role: inv.type === 'angel' ? 'Angel Investor' : 'Partner',
          isPrimary: true,
        }],
        metadata: {
          type: inv.type,
          source: 'US Seed VCs List (2026-03-06)',
          tags: ['us-seed', 'generalist'],
        },
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      };
      
      const docRef = await db.collection('leads').add(lead);
      console.log(`✅ Added: ${inv.name} @ ${inv.firm} (${docRef.id})`);
      
      // Add note if exists
      if (inv.notes) {
        await db.collection('notes').add({
          leadId: docRef.id,
          content: inv.notes,
          status: 'cold',
          createdBy: 'skel-import',
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      }
      
      results.added++;
    } catch (e) {
      console.error(`❌ Error: ${inv.name} @ ${inv.firm}:`, e);
      results.errors++;
    }
  }
  
  console.log(`\n--- Results ---`);
  console.log(`Added: ${results.added}`);
  console.log(`Skipped: ${results.skipped}`);
  console.log(`Errors: ${results.errors}`);
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
