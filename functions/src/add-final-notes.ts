import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

const serviceAccountPath = path.resolve(__dirname, '../../service-account.json');
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const PIPELINE_ID = 'MUCFmGdpqPYAT0tKSAWs';
const RESEARCH_DIR = 'C:\\Users\\rijkg\\clawd\\research';

const updates = [
  { name: 'Bitmagic', file: 'competitor-deep-dive-bitmagic-2026-03-07.md' },
  { name: 'Sortium', file: 'competitor-deep-dive-sortium-2026-03-07.md' },
  { name: 'Mantella', file: 'competitor-deep-dive-mantella-2026-03-07.md' },
  { name: 'AI Game Master (App)', file: 'competitor-deep-dive-ai-game-master-app-2026-03-07.md' }
];

async function main() {
  console.log('Adding final research notes...\n');
  
  for (const u of updates) {
    try {
      const snap = await db.collection('leads')
        .where('name', '==', u.name)
        .where('pipeline.id', '==', PIPELINE_ID)
        .get();
      
      if (snap.empty) {
        console.log(`⚠️  Not found: ${u.name}`);
        continue;
      }
      
      const leadId = snap.docs[0].id;
      const filePath = path.join(RESEARCH_DIR, u.file);
      
      let content = `Research file: ${u.file}`;
      if (fs.existsSync(filePath)) {
        const full = fs.readFileSync(filePath, 'utf-8');
        content = full.length > 50000 ? full.substring(0, 50000) + '\n[Truncated]' : full;
      } else {
        console.log(`⚠️  File not found: ${u.file}`);
      }
      
      await db.collection('notes').add({
        leadId,
        content,
        status: 'cold',
        createdBy: 'skel-deepdive',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      await db.collection('leads').doc(leadId).update({
        'metadata.deepDiveDate': '2026-03-07',
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      console.log(`✅ Added: ${u.name}`);
    } catch (e: any) {
      console.error(`❌ Error: ${u.name}:`, e.message);
    }
  }
  
  console.log('\nDone!');
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
