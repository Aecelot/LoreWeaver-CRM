import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccountPath = path.join(__dirname, '..', '..', 'service-account.json');
admin.initializeApp({ credential: admin.credential.cert(serviceAccountPath) });
const db = admin.firestore();

const newTasks = [
  { text: 'Pitch Faereld: Dead End to publishers', assignee: 'Rijk', project: 'GW' },
  { text: 'Write Epic MegaGrant application', assignee: 'Rijk', project: 'GW' },
  { text: 'Look for subsidies', assignee: 'Rijk', project: 'LW' },
  { text: 'Look for and recruit beta testers', assignee: 'Rijk', project: 'LW' },
];

async function addTasks() {
  console.log('Adding 4 new tasks for Rijk...');
  for (const task of newTasks) {
    await db.collection('tasks').add({
      ...task,
      status: 'pending',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      createdBy: 'skel@openclaw.ai',
    });
    console.log('✓', task.text);
  }
  console.log('Done!');
}

addTasks().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
