import * as admin from 'firebase-admin';

const serviceAccount = require('../../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

interface ContactUpdate {
  leadId: string;
  company: string;
  email: string;
  name?: string;
  role?: string;
  note?: string;
}

const contactsToAdd: ContactUpdate[] = [
  {
    leadId: 'oCYX7UZqm8XmC5sJyGGo',
    company: 'Paintbucket Games',
    email: 'info@paintbucket.de',
    role: 'General Contact',
    note: 'Found on website contact page'
  },
  {
    leadId: 'VKLzapbaRA976qS7X5EL',
    company: '11 bit studios',
    email: 'info@11bitstudios.com',
    role: 'General Contact',
    note: 'Found on website contact page'
  },
  {
    leadId: 'N92rcqEKlo5mAhDo3sl5',
    company: 'Dead Mage',
    email: 'info@deadmage.com',
    role: 'General Contact',
    note: 'Found on website footer'
  },
  {
    leadId: 'wIZeJpe8unYqyI9VjYOG',
    company: 'Harebrained Schemes',
    email: 'info@hbs-studios.com',
    role: 'General Contact',
    note: 'Found on website'
  },
  {
    leadId: 'pPVK8wmZBiboeaCRFwnP',
    company: 'Giant Sparrow',
    email: 'ai@fortyseven.com',
    role: 'PR/Marketing',
    note: 'PR agency (Fortyseven Communications)'
  },
  {
    leadId: '8kPff8fkDAdnLFg1Xk4i',
    company: 'Pathea',
    email: 'contact@pathea.net',
    role: 'Media/PR',
    note: 'Media, PR, and Influencer inquiries'
  }
];

async function updateContacts() {
  console.log('CRM Contact Enrichment - Batch 19');
  console.log('==================================\n');
  
  let added = 0;
  let skipped = 0;
  
  for (const contact of contactsToAdd) {
    console.log(`Processing: ${contact.company}`);
    
    // Check if lead exists
    const leadDoc = await db.collection('leads').doc(contact.leadId).get();
    if (!leadDoc.exists) {
      console.log(`  ❌ Lead not found: ${contact.leadId}`);
      skipped++;
      continue;
    }
    
    // Check if contact already exists for this lead
    const existingContacts = await db.collection('leadContacts')
      .where('leadId', '==', contact.leadId)
      .get();
    
    const existingEmails = new Set<string>();
    for (const doc of existingContacts.docs) {
      const contactId = doc.data().contactId;
      const contactDoc = await db.collection('contacts').doc(contactId).get();
      if (contactDoc.exists) {
        existingEmails.add(contactDoc.data()?.email?.toLowerCase() || '');
      }
    }
    
    if (existingEmails.has(contact.email.toLowerCase())) {
      console.log(`  ⏭️  Contact already exists: ${contact.email}`);
      skipped++;
      continue;
    }
    
    // Create contact
    const contactRef = db.collection('contacts').doc();
    await contactRef.set({
      name: contact.name || '',
      email: contact.email,
      role: contact.role || '',
      phone: '',
      linkedin: '',
      company: contact.company,
      tags: [],
      createdBy: 'skel-enrichment',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    // Link contact to lead
    const linkRef = db.collection('leadContacts').doc();
    await linkRef.set({
      leadId: contact.leadId,
      contactId: contactRef.id,
      isPrimary: existingContacts.empty,
      role: contact.role || '',
      createdBy: 'skel-enrichment',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    // Add note about the contact source
    if (contact.note) {
      const noteRef = db.collection('notes').doc();
      await noteRef.set({
        leadId: contact.leadId,
        content: `Contact enrichment (Batch 19): Added ${contact.email} - ${contact.note}`,
        status: 'cold',
        createdBy: 'skel-enrichment',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }
    
    console.log(`  ✅ Added: ${contact.email}`);
    added++;
  }
  
  console.log('\n==================================');
  console.log(`Summary: ${added} added, ${skipped} skipped`);
}

updateContacts().catch(e => console.error('Error:', e));
