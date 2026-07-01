import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

// Initialize Firebase Admin
const serviceAccount = require('../../service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

interface Lead {
  id: string;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  website?: string;
  location?: string;
  country?: string;
  icpScore?: number;
  priority?: string;
  status?: string;
  contactName?: string;
  contactEmail?: string;
  contactRole?: string;
  linkedIn?: string;
  notes?: string;
}

async function exportLeads() {
  console.log('Fetching researched leads with ICP score > 70...');
  
  // Fetch all leads and filter in memory (avoids composite index requirement)
  const leadsRef = db.collection('leads');
  const allSnapshot = await leadsRef.get();
  
  // Filter for researched leads with ICP > 70
  const filteredDocs = allSnapshot.docs.filter(doc => {
    const data = doc.data();
    const stageId = data.pipeline?.stageId || data.status || '';
    const icpScore = data.icpScore || 0;
    return stageId.toLowerCase() === 'researched' && icpScore > 70;
  });
  
  console.log(`Found ${filteredDocs.length} leads`);
  
  const leads: Lead[] = [];
  filteredDocs.forEach(doc => {
    const data = doc.data();
    leads.push({
      id: doc.id,
      name: data.name || data.company || '',
      company: data.company || data.name || '',
      email: data.email || data.contactEmail || '',
      phone: data.phone || '',
      website: data.website || '',
      location: data.location || '',
      country: data.country || '',
      icpScore: data.icpScore || 0,
      priority: data.priority || '',
      status: data.status || '',
      contactName: data.contactName || data.contacts?.[0]?.name || '',
      contactEmail: data.contactEmail || data.contacts?.[0]?.email || '',
      contactRole: data.contactRole || data.contacts?.[0]?.role || '',
      linkedIn: data.linkedIn || data.contacts?.[0]?.linkedIn || '',
      notes: data.notes || ''
    });
  });
  
  // Sort by ICP score descending
  leads.sort((a, b) => (b.icpScore || 0) - (a.icpScore || 0));
  
  // Generate CSV
  const headers = ['Name', 'Company', 'Contact Name', 'Contact Email', 'Contact Role', 'Phone', 'Website', 'LinkedIn', 'Location', 'Country', 'ICP Score', 'Priority', 'Notes'];
  const csvRows = [headers.join(',')];
  
  for (const lead of leads) {
    const row = [
      escapeCSV(lead.name || ''),
      escapeCSV(lead.company || ''),
      escapeCSV(lead.contactName || ''),
      escapeCSV(lead.contactEmail || ''),
      escapeCSV(lead.contactRole || ''),
      escapeCSV(lead.phone || ''),
      escapeCSV(lead.website || ''),
      escapeCSV(lead.linkedIn || ''),
      escapeCSV(lead.location || ''),
      escapeCSV(lead.country || ''),
      lead.icpScore?.toString() || '',
      escapeCSV(lead.priority || ''),
      escapeCSV(lead.notes || '')
    ];
    csvRows.push(row.join(','));
  }
  
  const csv = csvRows.join('\n');
  const outputPath = path.join(__dirname, '../../exports/researched-leads-70plus.csv');
  
  // Ensure exports directory exists
  const exportsDir = path.dirname(outputPath);
  if (!fs.existsSync(exportsDir)) {
    fs.mkdirSync(exportsDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, csv, 'utf8');
  console.log(`Exported ${leads.length} leads to ${outputPath}`);
  
  // Also print top 10 for verification
  console.log('\nTop 10 leads by ICP score:');
  leads.slice(0, 10).forEach((lead, i) => {
    console.log(`${i + 1}. ${lead.name} (${lead.icpScore}) - ${lead.contactEmail || 'no email'}`);
  });
  
  process.exit(0);
}

function escapeCSV(value: string): string {
  if (!value) return '';
  // If contains comma, newline, or quote, wrap in quotes and escape quotes
  if (value.includes(',') || value.includes('\n') || value.includes('"')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

exportLeads().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
