// Seed 10 Dutch/Benelux gaming-focused investors
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

const leads = [
  // === GAMING-FOCUSED ===
  {
    name: "Midgame Fund",
    country: "Netherlands",
    location: "Utrecht, Netherlands",
    website: "https://midgame.fund",
    tags: ["netherlands", "gaming-focused", "early-stage", "indie", "benelux"],
    investor: {
      type: "Angel Syndicate",
      founded: "2021",
      investmentFocus: "Dutch indie game studios",
      fundingPreferences: "EUR 10K-150K",
      geographicalRegions: ["Netherlands"],
      hqRegion: "Netherlands",
      fitScore: 95,
      fitReason: "Dutch game devs funding games. Perfect stage fit (10K-150K). Gaming-only. Run by Adriaan de Jongh (Hidden Folks)."
    },
    notes: "35+ Dutch game developers pooling resources. Portfolio: 3+ games funded. Perfect for LoreWeaver — indie tool for indie devs they fund."
  },
  {
    name: "ForsVC",
    country: "Belgium",
    location: "Kortrijk, Belgium",
    website: "https://fors.vc",
    tags: ["belgium", "gaming-focused", "early-stage", "benelux", "strategic"],
    investor: {
      type: "VC Fund",
      founded: "2021",
      investmentFocus: "Gaming studios, publishers, game tech",
      fundingPreferences: "EUR 150K-1.5M",
      geographicalRegions: ["Belgium", "Netherlands", "France", "Germany"],
      hqRegion: "Belgium",
      fitScore: 90,
      fitReason: "EUR 18M gaming-only fund. Benelux focus. Backed by BNP Paribas, Howest DAE, Cronos. Portfolio: Twirlbound, Glowfish, Mystic Forge."
    },
    notes: "First Belgian gaming VC. Perfect fit — gaming tools in their thesis. Check size matches our EUR 400K round."
  },
  {
    name: "Hiro Capital",
    country: "UK",
    location: "London, UK / Luxembourg",
    website: "https://hiro.capital",
    tags: ["uk", "gaming-focused", "eu-wide", "strategic", "ai-interested"],
    investor: {
      type: "VC Fund",
      founded: "2019",
      investmentFocus: "Gaming, esports, digital sports, metaverse tech",
      fundingPreferences: "EUR 500K-5M",
      geographicalRegions: ["UK", "Europe", "North America"],
      hqRegion: "UK",
      fitScore: 80,
      fitReason: "Major European gaming VC. Sir Nick Clegg joined. Larger checks but strategic value. Invests in game tech."
    },
    notes: "HIRO III fund launching. Focus on AI + gaming intersection. Good for Series A but worth relationship building."
  },
  {
    name: "BITKRAFT Ventures",
    country: "Germany",
    location: "Berlin, Germany",
    website: "https://www.bitkraft.vc",
    tags: ["germany", "gaming-focused", "eu-wide", "ai-interested", "strategic"],
    investor: {
      type: "VC Fund",
      founded: "2015",
      investmentFocus: "Gaming, esports, AI, immersive media",
      fundingPreferences: "EUR 500K-10M",
      geographicalRegions: ["Global"],
      hqRegion: "Germany",
      fitScore: 75,
      fitReason: "Largest gaming VC globally ($1B+ AUM). Founded by ESL co-founder Jens Hilgers. Too large for current round but strategic."
    },
    notes: "130+ portfolio companies. Game tech in thesis. Better for Series A. Worth tracking."
  },

  // === DUTCH GENERALIST WITH GAMING ===
  {
    name: "Rocket Capital",
    country: "Netherlands",
    location: "Amsterdam, Netherlands",
    website: "https://www.rocketcapital.nl",
    tags: ["netherlands", "early-stage", "gaming", "adtech", "benelux"],
    investor: {
      type: "VC Fund",
      founded: "2010",
      investmentFocus: "Gaming, AdTech, Sales/Marketing tech",
      fundingPreferences: "EUR 500K-10M (Series B focus)",
      geographicalRegions: ["Netherlands", "Europe"],
      hqRegion: "Netherlands",
      fitScore: 65,
      fitReason: "Dutch VC with gaming in thesis. Series B focus (too late for us). Good for future rounds."
    },
    notes: "Portfolio includes gaming companies. Later stage focus but worth relationship."
  },
  {
    name: "Peak Capital",
    country: "Netherlands",
    location: "Amsterdam, Netherlands",
    website: "https://peak.capital",
    tags: ["netherlands", "early-stage", "saas", "ai-interested", "benelux"],
    investor: {
      type: "VC Fund",
      founded: "2010",
      investmentFocus: "Marketplaces, platforms, SaaS",
      fundingPreferences: "EUR 100K-1M",
      geographicalRegions: ["Netherlands", "Europe"],
      hqRegion: "Netherlands",
      fitScore: 70,
      fitReason: "SaaS/platform focus fits Architect's model. Not gaming-specific but AI interested. Good stage fit."
    },
    notes: "Founder-friendly. Digital media in portfolio. Could position LoreWeaver as SaaS platform play."
  },
  {
    name: "Dutch Founders Fund",
    country: "Netherlands",
    location: "Amsterdam, Netherlands",
    website: "https://dutchfoundersfund.com",
    tags: ["netherlands", "early-stage", "angel-syndicate", "benelux"],
    investor: {
      type: "Angel Syndicate",
      founded: "2018",
      investmentFocus: "Dutch tech startups",
      fundingPreferences: "EUR 100K-500K",
      geographicalRegions: ["Netherlands"],
      hqRegion: "Netherlands",
      fitScore: 70,
      fitReason: "Dutch-focused angel group. Tech generalist but good stage fit. Strong local network."
    },
    notes: "Good for syndicate follow-on. Dutch entrepreneur network valuable."
  },
  {
    name: "Newion",
    country: "Netherlands",
    location: "Amsterdam, Netherlands",
    website: "https://newion.nl",
    tags: ["netherlands", "early-stage", "b2b", "saas", "benelux"],
    investor: {
      type: "VC Fund",
      founded: "2016",
      investmentFocus: "B2B SaaS, enterprise software",
      fundingPreferences: "EUR 500K-3M",
      geographicalRegions: ["Netherlands", "Europe"],
      hqRegion: "Netherlands",
      fitScore: 65,
      fitReason: "B2B SaaS focus matches LoreWeaver. Not gaming but enterprise tool angle could work."
    },
    notes: "Lean startup methodology focus. Could position Architect as B2B creative tool."
  },

  // === REGIONAL/STRATEGIC ===
  {
    name: "Invest-NL",
    country: "Netherlands",
    location: "The Hague, Netherlands",
    website: "https://www.invest-nl.nl",
    tags: ["netherlands", "government", "strategic", "benelux"],
    investor: {
      type: "Government Fund",
      founded: "2019",
      investmentFocus: "Dutch innovation, scale-ups",
      fundingPreferences: "EUR 1M+",
      geographicalRegions: ["Netherlands"],
      hqRegion: "Netherlands",
      fitScore: 50,
      fitReason: "Dutch government investment arm. Too large for current stage. Worth knowing for later."
    },
    notes: "Co-invests with private VCs. Could be relevant for EUR 400K round or later."
  },
  {
    name: "Creative Industries Fund NL",
    country: "Netherlands",
    location: "Rotterdam, Netherlands",
    website: "https://stimuleringsfonds.nl",
    tags: ["netherlands", "government", "creative", "grants", "benelux"],
    investor: {
      type: "Government Fund",
      founded: "2012",
      investmentFocus: "Creative industries, digital culture",
      fundingPreferences: "Grants, not equity",
      geographicalRegions: ["Netherlands"],
      hqRegion: "Netherlands",
      fitScore: 60,
      fitReason: "Grants for creative industries. Gaming is eligible. Non-dilutive funding option."
    },
    notes: "Stimuleringsfonds Creatieve Industrie. Game development grants available. Check eligibility."
  }
];

async function seedDutchInvestors() {
  console.log(`Seeding ${leads.length} Dutch/Benelux investors...\n`);
  
  let created = 0;
  let skipped = 0;
  
  for (const lead of leads) {
    // Check if exists
    const existing = await db.collection('leads')
      .where('name', '==', lead.name)
      .limit(1)
      .get();
    
    if (!existing.empty) {
      console.log(`⏭️  ${lead.name} already exists`);
      skipped++;
      continue;
    }
    
    const fitScore = lead.investor.fitScore;
    
    // Create lead
    await db.collection('leads').add({
      type: 'investor',
      status: 'active',
      owner: 'system',
      priority: fitScore >= 80 ? 'high' : fitScore >= 60 ? 'medium' : 'low',
      name: lead.name,
      website: lead.website || '',
      location: lead.location,
      country: lead.country,
      contact: { name: '', role: '', email: '' },
      tags: lead.tags,
      notes: lead.notes || '',
      investor: lead.investor,
      pipeline: {
        pipelineId: 'investors', // Use investor pipeline
        stageId: 'new',
        enteredStageAt: admin.firestore.FieldValue.serverTimestamp()
      },
      createdBy: 'seed-dutch-investors',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`✅ ${lead.name} — Score: ${fitScore}`);
    created++;
  }
  
  console.log(`\n✅ Created ${created}, skipped ${skipped}`);
  process.exit(0);
}

seedDutchInvestors().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
