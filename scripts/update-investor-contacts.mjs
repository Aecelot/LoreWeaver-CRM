// Update high-score investors with verified contact info
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

const updates = [
  {
    name: "London Venture Partners (LVP)",
    contact: {
      name: "David Gardner",
      role: "General Partner & Co-Founder",
      email: "", // Via website pitch form
      linkedin: "https://www.linkedin.com/in/david-gardner-7395662"
    },
    notes: "VERIFIED: Contact via website pitch form. Address: 25-EP, Victoria, London, SW1W 9NF. $18B value created. Supercell, Unity early investors."
  },
  {
    name: "Play Ventures",
    contact: {
      name: "Henric Suuronen",
      role: "Founding Partner",
      email: "henric@playventures.vc",
      linkedin: "https://www.linkedin.com/in/henricsuuronen"
    },
    notes: "VERIFIED: Email format [first]@playventures.vc. Henric = ex-King. Harri Manninen = ex-Rocket Games (sold to Disney). Very active - 8 investments in 2025."
  },
  {
    name: "Sisu Game Ventures",
    contact: {
      name: "Samuli Syvähuoko",
      role: "Founding Partner",
      email: "", // Via LinkedIn
      linkedin: "https://www.linkedin.com/in/samulisyvahuoko"
    },
    notes: "VERIFIED: Contact via LinkedIn. Samuli CO-FOUNDED REMEDY ENTERTAINMENT! Perfect connection point. Address: Yrjönkatu 11, 00100 Helsinki. $50M fund."
  },
  {
    name: "The Games Fund",
    contact: {
      name: "Investment Team",
      role: "General Inquiry",
      email: "apply@gamesfund.vc",
      linkedin: ""
    },
    notes: "VERIFIED: Pitch to apply@gamesfund.vc. General: info@gamesfund.vc. Investment size: $300K-$3M. Explicitly invests in gaming TECHNOLOGIES."
  },
  {
    name: "Midgame Fund",
    contact: {
      name: "Adriaan de Jongh",
      role: "Organizer",
      email: "", // Via website pitch form
      linkedin: "https://www.linkedin.com/in/adriaandejongh"
    },
    notes: "VERIFIED: Pitch via midgame.fund website. Adriaan = Hidden Folks creator, DGA board member. 35+ Dutch devs pooling resources. Rami Ismail is an investor."
  },
  {
    name: "ForsVC",
    contact: {
      name: "Investment Team",
      role: "General Inquiry",
      email: "info@fors.vc",
      linkedin: ""
    },
    notes: "VERIFIED: Email info@fors.vc. Pitch via website. Address: Marksesteenweg 58, 8500 Kortrijk, Belgium. €18M gaming-only fund. Backed by BNP Paribas, Howest DAE."
  },
  {
    name: "Makers Fund",
    contact: {
      name: "Michael Cheung",
      role: "Founding General Partner",
      email: "michael@makersfund.com",
      linkedin: "https://www.linkedin.com/in/michaelkcheung"
    },
    notes: "VERIFIED: Email format [first]@makersfund.com. Michael = ex-Tencent. Jay Chi = also Kowloon Nights partner. $1B AUM. AI + gaming in thesis."
  },
  {
    name: "Initial Capital",
    contact: {
      name: "Investment Team",
      role: "General Inquiry",
      email: "info@initialcapital.com",
      linkedin: ""
    },
    notes: "VERIFIED: Email info@initialcapital.com. Serial entrepreneurs investing own money. 'Tech enablers' in thesis = LoreWeaver fit."
  },
  {
    name: "Seedcamp",
    contact: {
      name: "Reshma Sohoni",
      role: "Managing Partner",
      email: "reshma@seedcamp.com",
      linkedin: ""
    },
    notes: "VERIFIED: Email format [first]@seedcamp.com. Address: 72-74 Dean Street, Soho Works, London W1D 3SG. Accelerator model."
  },
  {
    name: "Fil Rouge Capital",
    contact: {
      name: "Investment Team",
      role: "General Inquiry",
      email: "", 
      linkedin: ""
    },
    notes: "Polish gaming VC. CD Projekt ecosystem connections. 12 gaming investments."
  }
];

async function updateInvestorContacts() {
  console.log(`Updating ${updates.length} investor contacts...\n`);
  
  let updated = 0;
  let notFound = 0;
  
  for (const update of updates) {
    // Find the lead
    const snapshot = await db.collection('leads')
      .where('name', '==', update.name)
      .limit(1)
      .get();
    
    if (snapshot.empty) {
      console.log(`❌ ${update.name} not found`);
      notFound++;
      continue;
    }
    
    const doc = snapshot.docs[0];
    
    // Update with contact info
    await doc.ref.update({
      contact: update.contact,
      notes: update.notes,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`✅ ${update.name} — ${update.contact.email || 'LinkedIn/Form'}`);
    updated++;
  }
  
  console.log(`\n✅ Updated ${updated}, not found ${notFound}`);
  process.exit(0);
}

updateInvestorContacts().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
