import * as admin from 'firebase-admin';
import * as path from 'path';

// Initialize Firebase Admin
const serviceAccountPath = path.join(__dirname, '..', '..', 'service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
});

const db = admin.firestore();

interface Task {
  text: string;
  status: 'pending' | 'done';
  assignee: string;
  project?: string;
  priority?: string;
  dueDate?: string;
  createdAt: admin.firestore.FieldValue;
  updatedAt: admin.firestore.FieldValue;
  createdBy: string;
}

const tasks: Omit<Task, 'createdAt' | 'updatedAt'>[] = [
  // Rijk's tasks
  { text: 'Email Marco Morales', status: 'pending', assignee: 'Rijk', project: 'LW', createdBy: 'skel@openclaw.ai' },
  { text: 'Apply for WBSO 2026', status: 'pending', assignee: 'Rijk', project: 'LW', createdBy: 'skel@openclaw.ai' },
  { text: 'Add Twirlbound & Fishlabs to newsletter', status: 'pending', assignee: 'Rijk', project: 'LW', createdBy: 'skel@openclaw.ai' },
  { text: 'Get eHerkenning sorted out', status: 'pending', assignee: 'Rijk', project: 'LW', createdBy: 'skel@openclaw.ai' },
  { text: 'BTW-aangifte Grimmwyrd', status: 'pending', assignee: 'Rijk', project: 'GW', createdBy: 'skel@openclaw.ai' },
  { text: 'BTW-aangifte LoreWeaver', status: 'pending', assignee: 'Rijk', project: 'LW', createdBy: 'skel@openclaw.ai' },
  { text: 'Send investor newsletter via CRM', status: 'pending', assignee: 'Rijk', project: 'LW', createdBy: 'skel@openclaw.ai' },
  { text: 'HR: Talk to Stephan about marketing pause', status: 'pending', assignee: 'Rijk', project: 'LW', createdBy: 'skel@openclaw.ai' },
  { text: 'HR: Message Maxim (parting ways)', status: 'pending', assignee: 'Rijk', project: 'LW', createdBy: 'skel@openclaw.ai' },
  { text: 'INDIGO showcase application', status: 'pending', assignee: 'Rijk', project: 'LW', createdBy: 'skel@openclaw.ai' },
  { text: 'Investor letter', status: 'done', assignee: 'Rijk', project: 'LW', createdBy: 'skel@openclaw.ai' },
  { text: 'Make marketing materials for LoreWeaver Architect', status: 'done', assignee: 'Rijk', project: 'LW', priority: 'P1', dueDate: '2026-03-20', createdBy: 'skel@openclaw.ai' },
  
  // John's tasks
  { text: 'Beta launch planning (Apr 2)', status: 'pending', assignee: 'John', project: 'LW', dueDate: '2026-04-02', createdBy: 'skel@openclaw.ai' },
  { text: 'US people (hiring/contacts)', status: 'pending', assignee: 'John', project: 'LW', createdBy: 'skel@openclaw.ai' },
  { text: 'Pawel coordination', status: 'pending', assignee: 'John', project: 'LW', createdBy: 'skel@openclaw.ai' },
  
  // Kiomi's tasks (all done)
  { text: 'Beta marketing prep', status: 'done', assignee: 'Kiomi', project: 'LW', createdBy: 'skel@openclaw.ai' },
  { text: 'Studio outreach', status: 'done', assignee: 'Kiomi', project: 'LW', createdBy: 'skel@openclaw.ai' },
  { text: 'Clawdbot setup', status: 'done', assignee: 'Kiomi', project: 'LW', createdBy: 'skel@openclaw.ai' },
  
  // Jesse's tasks
  { text: 'Director repo cleanup', status: 'pending', assignee: 'Jesse', project: 'LW', createdBy: 'skel@openclaw.ai' },
  { text: 'Student team coordination', status: 'pending', assignee: 'Jesse', project: 'LW', createdBy: 'skel@openclaw.ai' },
  
  // Pawel's tasks
  { text: 'Meet John', status: 'pending', assignee: 'Pawel', project: 'LW', createdBy: 'skel@openclaw.ai' },
  { text: 'Create own task list', status: 'pending', assignee: 'Pawel', project: 'LW', createdBy: 'skel@openclaw.ai' },
];

async function seedTasks() {
  console.log(`Seeding ${tasks.length} tasks...`);
  
  const batch = db.batch();
  const tasksCollection = db.collection('tasks');
  
  for (const task of tasks) {
    const docRef = tasksCollection.doc();
    batch.set(docRef, {
      ...task,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }
  
  await batch.commit();
  console.log(`✓ Seeded ${tasks.length} tasks successfully`);
  
  // Summary
  const byAssignee = tasks.reduce((acc, t) => {
    acc[t.assignee] = (acc[t.assignee] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  console.log('\nTasks by assignee:');
  for (const [assignee, count] of Object.entries(byAssignee)) {
    console.log(`  ${assignee}: ${count}`);
  }
}

seedTasks()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error seeding tasks:', err);
    process.exit(1);
  });
