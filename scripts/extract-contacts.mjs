// Extract contacts from Gmail and add to CRM
import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, '..', 'service-account.json'), 'utf8')
);

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

const GOG = `"${process.env.LOCALAPPDATA}\\Programs\\gogcli\\gog.exe"`;

// Exclusion patterns - skip these
const EXCLUDE_DOMAINS = [
  'amazon.com', 'amazonaws.com', 'aws-marketing', 'google.com', 'accounts.google.com',
  'docusign.com', 'docusign.net', 'mail.docusign.com', 'eumail.docusign.net',
  'linkedin.com', 'github.com', 'formspree.io', 'miro.com', 'eventbrite.com',
  'googlemail.com', 'mailer-daemon', 'noreply', 'no-reply', 'support@',
  'hello@', 'info@', 'admin@', 'newsletter', 'updates@', 'notifications@',
  'marketing', 'hubspot', 'mailchimp', 'sendgrid', 'tailscale.com',
  'ovh.ca', 'ovh.us', 'signup.aws', 'seedblink.com', 'firm24.com',
  'angelinvestmentnetwork', 'angelspartners.com', 'gamehaap.com',
  'ligo.nl', 'fireflies.ai', 'codecks.io', 'apollo.io',
  'loreweaver.ink', 'grimmwyrdstudios.com', // Our own domains
];

const EXCLUDE_NAMES = [
  'mail delivery', 'postmaster', 'mailer-daemon', 'security alert',
  'the miro team', 'team tailscale', 'google', 'amazon web services',
];

function shouldExclude(email, name) {
  const emailLower = (email || '').toLowerCase();
  const nameLower = (name || '').toLowerCase();
  
  for (const pattern of EXCLUDE_DOMAINS) {
    if (emailLower.includes(pattern)) return true;
  }
  for (const pattern of EXCLUDE_NAMES) {
    if (nameLower.includes(pattern)) return true;
  }
  return false;
}

function parseFrom(from) {
  // Parse "Name <email>" format
  const match = from.match(/^(.+?)\s*<(.+?)>$/);
  if (match) {
    return { name: match[1].replace(/"/g, '').trim(), email: match[2].toLowerCase().trim() };
  }
  // Just email
  const emailMatch = from.match(/([^\s<>]+@[^\s<>]+)/);
  if (emailMatch) {
    return { name: '', email: emailMatch[1].toLowerCase().trim() };
  }
  return null;
}

function inferCompany(email) {
  const domain = email.split('@')[1];
  if (!domain) return '';
  
  // Known domain mappings
  const domainMap = {
    'articy.com': 'Articy',
    'qubit.capital': 'Qubit Capital',
    'qubit-capital.com': 'Qubit Capital',
    'braventure.nl': 'Braventure',
    'dutchgamesassociation.nl': 'Dutch Games Association',
    'artificial.agency': 'Artificial Agency',
    'arcweave.com': 'Arcweave',
    'immutable.com': 'Immutable',
    'giantgames.nl': 'Giant Games',
    'openrouter.ai': 'OpenRouter',
    'abstraction.games': 'Abstraction Games',
    'hawkswellstudios.com': 'Hawkswell Studios',
    'goinnovationfunds.com': 'GO Innovation Funds',
    'pitchlab.nl': 'Pitchlab',
    'nysingh.nl': 'Nysingh',
    'inworld.ai': 'Inworld AI',
    'breda.nl': 'Gemeente Breda',
    'spendbase.co': 'Spendbase',
    'teamdecisiveheadq.com': 'Decisive HQ',
    'goldeneggcheck.com': 'Golden Egg Check',
    'deviantlegal.com': 'Deviant Legal',
    'stage-global.com': 'Stage Global',
    'allcorrectgames.com': 'AllCorrect Games',
    'infinitspace.com': 'Beyond / Infinitspace',
    'startupfountain.com': 'Startup Fountain',
    'alitic.software': 'Alitic Software',
    'gilcglobalnetwork.com': 'GILC Global Network',
  };
  
  if (domainMap[domain]) return domainMap[domain];
  
  // Try to extract company name from domain
  const parts = domain.split('.');
  if (parts.length >= 2) {
    const name = parts[0];
    if (name.length > 2 && !['gmail', 'hotmail', 'outlook', 'live', 'yahoo', 'icloud', 'student'].includes(name)) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  }
  return '';
}

async function fetchAllEmails(account) {
  const allThreads = [];
  let pageToken = null;
  let page = 0;
  
  do {
    page++;
    console.log(`  Fetching page ${page} for ${account}...`);
    
    const cmd = pageToken
      ? `${GOG} gmail search "in:inbox OR in:sent" --account=${account} --limit=100 --page="${pageToken}" --json`
      : `${GOG} gmail search "in:inbox OR in:sent" --account=${account} --limit=100 --json`;
    
    try {
      const result = execSync(cmd, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
      const data = JSON.parse(result);
      
      if (data.threads && data.threads.length > 0) {
        allThreads.push(...data.threads);
      }
      
      pageToken = data.nextPageToken;
    } catch (err) {
      console.error(`  Error fetching: ${err.message}`);
      break;
    }
  } while (pageToken && page < 10); // Limit to 10 pages (~1000 emails)
  
  return allThreads;
}

async function main() {
  console.log('Extracting contacts from Gmail...\n');
  
  const contacts = new Map(); // email -> contact info
  
  // Fetch emails from both accounts
  for (const account of ['rijk@loreweaver.ink', 'rens@grimmwyrdstudios.com']) {
    console.log(`\nFetching ${account}...`);
    const threads = await fetchAllEmails(account);
    console.log(`  Found ${threads.length} threads`);
    
    for (const thread of threads) {
      const parsed = parseFrom(thread.from);
      if (!parsed || !parsed.email) continue;
      if (shouldExclude(parsed.email, parsed.name)) continue;
      
      // Skip our own emails
      if (parsed.email.includes('rijk@') || parsed.email.includes('rens@')) continue;
      
      // Add or update contact
      if (!contacts.has(parsed.email)) {
        contacts.set(parsed.email, {
          email: parsed.email,
          name: parsed.name,
          company: inferCompany(parsed.email),
          source: account,
          subjects: [thread.subject],
          lastContact: thread.date,
        });
      } else {
        const existing = contacts.get(parsed.email);
        if (!existing.name && parsed.name) existing.name = parsed.name;
        existing.subjects.push(thread.subject);
        if (thread.date > existing.lastContact) existing.lastContact = thread.date;
      }
    }
  }
  
  console.log(`\n=== Found ${contacts.size} unique contacts ===\n`);
  
  // Save contact list for review
  const contactList = Array.from(contacts.values())
    .sort((a, b) => (b.lastContact || '').localeCompare(a.lastContact || ''));
  
  writeFileSync(
    join(__dirname, '..', 'data', 'extracted-contacts.json'),
    JSON.stringify(contactList, null, 2)
  );
  console.log(`Saved to data/extracted-contacts.json`);
  
  // Show preview
  console.log('\nTop 30 contacts (most recent first):\n');
  for (const c of contactList.slice(0, 30)) {
    console.log(`${c.name || '(no name)'} <${c.email}>`);
    console.log(`  Company: ${c.company || '(unknown)'}`);
    console.log(`  Last: ${c.lastContact}`);
    console.log(`  Subject: ${c.subjects[0]?.substring(0, 60)}...`);
    console.log('');
  }
  
  // Add to CRM
  console.log('\n=== Adding to CRM as contacts ===\n');
  
  let added = 0;
  let skipped = 0;
  
  for (const contact of contactList) {
    // Skip if no real name
    if (!contact.name || contact.name.length < 2) {
      skipped++;
      continue;
    }
    
    // Check if contact already exists
    const existing = await db.collection('contacts')
      .where('email', '==', contact.email)
      .limit(1)
      .get();
    
    if (!existing.empty) {
      skipped++;
      continue;
    }
    
    // Add contact
    await db.collection('contacts').add({
      name: contact.name,
      email: contact.email,
      company: contact.company,
      source: 'gmail-import',
      sourceAccount: contact.source,
      lastContactDate: contact.lastContact,
      sampleSubject: contact.subjects[0],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`✅ ${contact.name} (${contact.company || contact.email})`);
    added++;
  }
  
  console.log(`\n✅ Added ${added} contacts, skipped ${skipped}`);
  process.exit(0);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
