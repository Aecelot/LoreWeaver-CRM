// Update batch 14 leads (130-139) with research findings
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
    id: 'sYiiR6JSS0N7CrzDHzkf',
    name: 'Armada Builders',
    data: {
      notes: `Swiss early-stage VC focused on AI, Data, Cloud, and Robotics at Pre-Seed and Seed stages. Based in Switzerland with investments in Switzerland, Germany, UK, and US.

THESIS: Enterprise automation - "AI-native products built to make customer experiences radically more productive." They back founders building cutting-edge solutions for enterprise automation.

KEY POINTS:
- Deep tech focus with community of industry experts
- Enterprise AI and automation thesis
- "Automation for all" - general AI/data in cloud + robotics at edge
- Strong network and continued commitment to portfolio

RELEVANCE TO LOREWEAVER: Moderate. AI focus is relevant but they emphasize enterprise automation and productivity tools, not entertainment/gaming. No gaming portfolio companies found.

RESEARCH DATE: 2026-03-03`,
      tags: ['ai', 'data', 'robotics', 'cloud', 'enterprise', 'automation', 'pre-seed', 'seed'],
      investor: {
        type: 'Pre-Seed, Seed',
        investmentFocus: 'AI, Data, Robotics, Cloud, Enterprise Automation',
        fundingPreferences: 'Early-stage',
        fitScore: 50,
        fitReason: 'AI focus is relevant but enterprise automation thesis, no gaming/entertainment investments'
      }
    }
  },
  {
    id: 'FsmWDe2pQwC3Kkl3KHOR',
    name: 'Asabys Partners',
    data: {
      notes: `Barcelona-based VC investing exclusively in human healthcare and life sciences. Active in health-tech and biopharma industries across Spain and internationally.

THESIS: Healthcare innovation - biotech, pharma, health-tech, and life sciences only.

KEY POINTS:
- Spain-focused but invests internationally
- Seed to Series B stage
- €3M+ investment preference
- Member of AseBio (Spanish biotech association)

RELEVANCE TO LOREWEAVER: None. Pure healthcare/life sciences investor with no tech, gaming, or entertainment investments.

RESEARCH DATE: 2026-03-03`,
      tags: ['healthcare', 'life-sciences', 'biotech', 'biopharma', 'health-tech'],
      investor: {
        type: 'Seed, Series A, Series B',
        investmentFocus: 'Healthcare, Life-sciences, Biotech, Biopharma',
        fundingPreferences: 'above €3M',
        fitScore: 15,
        fitReason: 'Healthcare/life sciences only - no gaming, entertainment, or tech investments'
      }
    }
  },
  {
    id: 'EfO2Bwxs45lxT7hXxYQ6',
    name: 'Ascension',
    data: {
      website: 'https://www.ascension.vc/',
      notes: `London-based pre-seed and seed VC - one of the most active seed investors in UK (UKBAA Seed VC of the Year 2022). £83m+ under management with 12+ exits. Backs founders across UK, Europe, and North America.

**GAMING PORTFOLIO: Invested in Included Games (UK mobile game studio creating socially powered web3 gaming experiences)**

THESIS: Generalist with specific sectors including Next-Gen Media, Games, Music, Creative Industries. Impact-focused technology companies.

SECTORS: Creative Industries, IP, Entertainment, Digital Media, Games, Music, FinTech, E-commerce, Sustainability, New Work, Digital Health, Life Sciences.

KEY POINTS:
- Explicit Games sector focus
- Next-Gen Media thesis
- £75k-£700k typical investment size
- (S)EIS & Institutional Funds
- Strong UK startup ecosystem connections
- 300+ founders backed

RELEVANCE TO LOREWEAVER: HIGH. Explicit gaming and next-gen media investment thesis. Portfolio includes game companies. London location is accessible. Stage and check size fits.

RESEARCH DATE: 2026-03-03`,
      tags: ['games', 'next-gen-media', 'entertainment', 'creative-industries', 'music', 'fintech', 'deeptech', 'e-commerce', 'sustainability', 'impact'],
      investor: {
        type: 'Pre-Seed, Seed',
        investmentFocus: 'Games, Next-Gen Media, Creative Industries, Entertainment, FinTech, DeepTech',
        fundingPreferences: '£75k–£700k',
        fitScore: 80,
        fitReason: 'Explicit gaming/games sector focus with active portfolio (Included Games). Next-Gen Media thesis aligns with LoreWeaver narrative AI.'
      },
      status: 'qualified'
    }
  },
  {
    id: 'MtxoQuvKlJclpf8LzCZd',
    name: 'Aschendorff NEXT',
    data: {
      notes: `Corporate VC arm of Aschendorff Group, a traditional media company based in Münster, Germany. Founded 2018. Invests in digital business models and services for SMEs.

THESIS: Two focus areas:
1. Strategic investments supporting Aschendorff's core markets (local media)
2. Digital business models with growth potential

KEY POINTS:
- Media company CVC
- Focus on SME digital transformation
- German regional focus
- Network of media, tech, and startup experts
- Looking for companies that can "fundamentally change value chains"

CONTACT: Cansu Iflazoglu (Team Assistant) - +49 172 1980140

RELEVANCE TO LOREWEAVER: Low-moderate. Media company CVC could be interesting for content tech, but their focus is SME services and local media markets, not gaming/entertainment.

RESEARCH DATE: 2026-03-03`,
      tags: ['digital-business-models', 'services-and-solutions-for-smes', 'digital-transformation', 'media', 'cvc'],
      contact: {
        name: 'Cansu Iflazoglu',
        role: 'Team Assistant',
        phone: '+49 172 1980140'
      },
      investor: {
        type: 'Seed, Growth',
        investmentFocus: 'Digital Business Models, SME Services, Digital Transformation, Media',
        fundingPreferences: 'Not disclosed',
        fitScore: 40,
        fitReason: 'Media company CVC but focused on SME digital services and local German markets, not gaming/entertainment'
      }
    }
  },
  {
    id: 'EqH3hC68MUSV1oSAs0Sp',
    name: 'ASI Valuetech Seed Fund',
    data: {
      notes: `Polish early-stage VC focused exclusively on Energy and Industrial Manufacturing innovations. Based in Warsaw, Poland.

THESIS: Clean energy and industrial tech - innovations in energy storage, renewables, smart grid, predictive analytics for energy/manufacturing.

PORTFOLIO: VCG.AI, SeaSoil, Bluana Foods, WindTAK, Green0meter, Arvio Energy

KEY POINTS:
- Energy transition and industrial manufacturing only
- Seed to Series A stage
- Up to 1 million PLN (~€230k) investment
- Part of National Centre for Research and Development programs
- Strong focus on sustainability and green tech

RELEVANCE TO LOREWEAVER: None. Pure cleantech/energy investor with no tech, gaming, or entertainment investments.

RESEARCH DATE: 2026-03-03`,
      tags: ['energy', 'industrial-manufacturing', 'industry-4.0', 'renewables', 'clean-tech', 'energy-storage', 'smart-grid', 'cleantech'],
      investor: {
        type: 'Seed, Series A',
        investmentFocus: 'Energy, Industrial Manufacturing, Cleantech, Renewables',
        fundingPreferences: 'up to 1 million PLN (~€230k)',
        fitScore: 10,
        fitReason: 'Energy/cleantech only - no gaming, entertainment, or software investments'
      }
    }
  },
  {
    id: 'TWj5o1wjbVm1VGWMmYc8',
    name: 'Ask Yggdrasil Venture Capital',
    data: {
      notes: `Danish VC focused exclusively on biotech, pharma, and tech sectors. Based in Denmark with access to VC funds across Americas and Europe for diversified investments.

THESIS: Life sciences and biotech - investing in breakthrough pharmaceutical and biotechnology companies.

KEY POINTS:
- Denmark-based with international reach
- Pre-Seed to Series D (broad stage range)
- Strong biotech/pharma sector expertise
- Fund-of-funds approach for diversification

RELEVANCE TO LOREWEAVER: None. Pure biotech/pharma investor. The "tech" tag is misleading - refers to biotech/pharma tech, not general technology.

RESEARCH DATE: 2026-03-03`,
      tags: ['biotech', 'pharma', 'life-sciences'],
      investor: {
        type: 'Pre-Seed, Seed, Series A, Series B, Series C, Series D',
        investmentFocus: 'Biotech, Pharma, Life Sciences',
        fundingPreferences: 'Not disclosed',
        fitScore: 10,
        fitReason: 'Biotech/pharma only - no gaming, entertainment, or general tech investments'
      }
    }
  },
  {
    id: 'kUDBDIgX857ndJpfaMoA',
    name: 'Askeladden & Co',
    data: {
      notes: `Norwegian venture builder/incubator based in Oslo. Founded 2016. Idea factory, incubator, and investor that identifies opportunities, develops concepts, and scales companies.

PORTFOLIO (all Norwegian consumer services):
- Dr.Dropin (healthcare clinics)
- Squeeze (massage membership)
- Petrus (veterinary clinics)
- Randi (accounting)
- Rebil (used car marketplace)
- Digg Pizza (pizza chain)
- Blid (dental clinics)
- Verd (funeral homes)

THESIS: Norwegian consumer services - healthcare, retail, B2B services, food & beverage. They build and operate companies directly rather than just investing.

KEY POINTS:
- Venture builder model (not traditional VC)
- Norway-focused only
- Consumer services emphasis
- ~$25.5M in assets
- Heavy on healthcare and wellbeing services

RELEVANCE TO LOREWEAVER: None. Venture builder for Norwegian consumer services businesses. No technology, gaming, or entertainment investments.

RESEARCH DATE: 2026-03-03`,
      tags: ['venture-builder', 'consumer-services', 'healthcare', 'retail', 'norway'],
      investor: {
        type: 'Pre-Seed, Seed (Venture Builder)',
        investmentFocus: 'Consumer Services, Healthcare, Retail, F&B (Norway only)',
        fundingPreferences: 'Venture builder model',
        fitScore: 25,
        fitReason: 'Venture builder for Norwegian consumer services - no tech, gaming, or international investments'
      }
    }
  },
  {
    id: 'msLR6jPYZsha1A8bMH79',
    name: 'Aspire',
    data: {
      notes: `US-based healthcare-focused venture fund and accelerator (Aspire Ventures). Partners with Lancaster General Health to accelerate healthcare innovation.

THESIS: Healthcare transformation through technology - AI for healthcare, precision medicine, medical devices, health data.

KEY PROGRAMS:
- Smart Health Innovation Lab (healthcare market adoption accelerator)
- LG Health partnership (clinical experts + proprietary health system data)
- A2i (Adaptive AI approach for healthcare)
- APEX Fund (blockchain/DApps for healthcare data)

KEY POINTS:
- Healthcare-only focus despite AI/tech tags
- Strong clinical partnership model
- US-based (Pennsylvania)
- Up to $100K investments (very small)

RELEVANCE TO LOREWEAVER: None. Pure healthcare investor. AI focus is specifically healthcare AI, not general AI.

RESEARCH DATE: 2026-03-03`,
      tags: ['healthcare', 'precision-medicine', 'health-ai', 'medical-devices', 'health-data'],
      investor: {
        type: 'Pre-Seed, Seed',
        investmentFocus: 'Healthcare AI, Precision Medicine, Medical Devices, Health Data',
        fundingPreferences: 'up to $100K',
        fitScore: 20,
        fitReason: 'Healthcare-only investor. AI tag refers to healthcare AI specifically, not gaming/entertainment AI'
      }
    }
  },
  {
    id: 'Oi8HFlCNFeVUsxTuHrhA',
    name: 'astara innovation & venture lab',
    data: {
      notes: `Spanish mobility-focused CVC (formerly B4Motion). Investing arm of Astara, a global mobility company. Based in Spain with investments in Europe and South America.

THESIS: Mobility revolution - automotive, transportation, logistics, fleet management, EV infrastructure.

KEY POINTS:
- Corporate VC of Astara mobility group
- Pre-Seed and Seed stage
- €100k to €1.5M investments
- Spain and Switzerland geographical focus
- Building mobility ecosystem

RELEVANCE TO LOREWEAVER: None. Pure automotive/mobility investor with no tech, gaming, or entertainment investments.

RESEARCH DATE: 2026-03-03`,
      tags: ['automotive', 'logistics', 'mobility', 'transportation', 'cvc'],
      investor: {
        type: 'Pre-Seed, Seed',
        investmentFocus: 'Automotive, Mobility, Transportation, Logistics',
        fundingPreferences: '€100k to €1.5M',
        fitScore: 10,
        fitReason: 'Automotive/mobility CVC only - no gaming, entertainment, or software investments'
      }
    }
  },
  {
    id: 'GNJB2Px2R5BhTE1ro2hp',
    name: 'Astella',
    data: {
      country: 'Brazil',
      notes: `Brazilian early-stage VC based in São Paulo, Brazil (NOTE: incorrectly listed as US in CRM). Founded 2008. One of the pioneers of Brazilian VC ecosystem.

THESIS: SaaS, Marketplaces, and Consumer tech. Also invests in businesses driven by AI and data analytics.

KEY POINTS:
- Brazil/LatAm focus
- Pre-Seed to Series A
- SaaS primary focus with marketplace and consumer
- AI/data analytics as enabling technology
- Strong Brazilian startup ecosystem builder

PORTFOLIO EXAMPLES: Birdie.ai, BotCity, Wellhub (international expansion stories)

RELEVANCE TO LOREWEAVER: Low. SaaS/AI focus could be relevant but Brazil/LatAm geographical focus makes them unlikely to invest in European gaming tech.

RESEARCH DATE: 2026-03-03`,
      tags: ['saas', 'marketplace', 'consumer', 'ai', 'data-analytics', 'latam', 'brazil'],
      investor: {
        type: 'Pre-Seed, Seed, Series A',
        investmentFocus: 'SaaS, Marketplace, Consumer, AI, Data Analytics',
        fundingPreferences: 'Early-stage (Brazil/LatAm focus)',
        fitScore: 35,
        fitReason: 'SaaS/AI investor but Brazil/LatAm geographical focus - unlikely to invest in European gaming tech'
      }
    }
  }
];

async function updateBatch14() {
  console.log('Updating batch 14 leads with research findings...\n');
  
  for (const update of updates) {
    console.log(`Updating: ${update.name} (${update.id})`);
    
    try {
      const docRef = db.collection('leads').doc(update.id);
      const doc = await docRef.get();
      
      if (!doc.exists) {
        console.log(`  ⚠️ Document not found, skipping`);
        continue;
      }
      
      const currentData = doc.data();
      
      // Merge investor data
      const mergedInvestor = {
        ...currentData.investor,
        ...update.data.investor
      };
      
      // Merge contact if provided
      const mergedContact = update.data.contact ? {
        ...currentData.contact,
        ...update.data.contact
      } : currentData.contact;
      
      // Prepare update
      const updatePayload = {
        notes: update.data.notes,
        tags: update.data.tags,
        investor: mergedInvestor,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };
      
      if (update.data.website) {
        updatePayload.website = update.data.website;
      }
      
      if (update.data.country) {
        updatePayload.country = update.data.country;
      }
      
      if (mergedContact) {
        updatePayload.contact = mergedContact;
      }
      
      if (update.data.status) {
        updatePayload.status = update.data.status;
      }
      
      await docRef.update(updatePayload);
      
      const score = update.data.investor?.fitScore || 0;
      const status = update.data.status ? ` → ${update.data.status}` : '';
      console.log(`  ✓ Updated (ICP: ${score})${status}`);
      
    } catch (err) {
      console.log(`  ✗ Error: ${err.message}`);
    }
  }
  
  console.log('\n✅ Batch 14 update complete');
}

updateBatch14().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
