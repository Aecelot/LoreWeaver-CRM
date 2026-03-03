// Batch 1 Research Updates - 10 investor leads
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
    id: '04rkgHqTBgLWVEGVZ6GZ',
    name: 'TDU Invest',
    notes: `RESEARCH (2026-03-02):
TDU Invest is an Italian seed accelerator/venture builder. Takes equity in exchange for idea development, validation, business model creation, strategy, and fundraising. Focus on pre-seed and seed stages.

INVESTMENT THESIS: Digital native vertical brands (services/products), Open Innovation. Strong food retail background (founder created Foodation, multiple restaurant brands).

TEAM:
- Riccardo Cortese (Founder) - Serial food retail entrepreneur, ex-President young group CONFAPI Milan
- Francesco Giuseppe Cioffi - Tax/corporate lawyer
- Gerardo Cavaliere - Chartered accountant, Bocconi grad

ASSESSMENT: No gaming or AI dev tools focus. Food/retail oriented. Not a fit for LoreWeaver.`,
    tags: ['seed-stage', 'venture-builder', 'italy', 'food-tech', 'not-gaming'],
    fitScore: 30,
    fitCriteria: {
      preSeedFocus: true,
      gamingSectorActive: false,
      aiDevToolsThesis: false,
      euBased: true,
      relevantPortfolio: false
    }
  },
  {
    id: '05iElykepxXXl71FkFx3',
    name: 'Vitosha Venture Partners',
    notes: `RESEARCH (2026-03-02):
Bulgarian VC investing EUR 25K - EUR 1M in early-stage and growth-stage companies based in or related to Bulgaria.

INVESTMENT THESIS: Resourceful founders, ideas that matter, strong execution. Leverages investment experience, global network, and market access.

FOCUS AREAS: fintech, e-commerce, agtech, healthtech, proptech, AI, software

CONTACT: hello@vitosha.vc

ASSESSMENT: Bulgaria-focused generalist VC. No gaming focus. AI/software interest but no dev tools thesis. Geographically limited to Bulgaria.`,
    tags: ['seed-stage', 'growth-stage', 'bulgaria', 'generalist', 'ai-software', 'not-gaming'],
    fitScore: 25,
    fitCriteria: {
      preSeedFocus: false,
      gamingSectorActive: false,
      aiDevToolsThesis: false,
      euBased: true,
      relevantPortfolio: false
    }
  },
  {
    id: '068iZ4A4aSiIZhoD4Plg',
    name: 'Baobab Ventures',
    notes: `RESEARCH (2026-03-02):
UK-based deep tech VC run by operator-investor Carles Reina.

TEAM:
- Carles Reina (Managing Partner) - Early Uber EMEA employee, built Ops at Tractable AI (unicorn), GTM at Sonantic (acq. by Spotify), currently leads GTM at ElevenLabs (unicorn). First investor in ElevenLabs! 70+ startup investments including Revolut.

INVESTMENT THESIS: Deep tech, robotics, AI. Operator-angel approach with strong network.

PORTFOLIO: Revolut, HappyRobot, Vsim, Theker Robotics, Volumetric Bio, Murphy AI, ElevenLabs

CONTACT: team@baobabventures.vc

ASSESSMENT: Strong AI/deep tech focus and operator credibility (ElevenLabs!). Not gaming-specific but AI tools adjacent. Could be interested in AI for creative applications.`,
    tags: ['deep-tech', 'ai-focus', 'uk', 'operator-angel', 'elevenlabs-investor', 'potential-fit'],
    fitScore: 50,
    fitCriteria: {
      preSeedFocus: true,
      gamingSectorActive: false,
      aiDevToolsThesis: true,
      euBased: true,
      relevantPortfolio: true,
      otherScore: 3,
      otherReason: 'First investor in ElevenLabs (AI voice). Could see narrative AI appeal.'
    }
  },
  {
    id: '06P4gHHgoBqRycvrPt7S',
    name: 'Combination VC',
    notes: `RESEARCH (2026-03-02):
German early-stage VC with angel-like approach, backing product-focused founders.

INVESTMENT THESIS: Knowledge transfer from collective is "ultimate booster." Collective includes successful founders, celebrities/influencers, and track-record investors.

TEAM:
- Marius Obiegala (linkedin.com/in/marius-obiegala/)
- Johannes Sass (linkedin.com/in/johannes-sass/)

CONTACT: marius@combination.vc

FOCUS: SaaS, AI, DACH region, Europe

ASSESSMENT: SaaS/AI focus in DACH is relevant. Angel-like approach could be flexible. No gaming thesis but AI/SaaS overlap possible.`,
    tags: ['early-stage', 'saas', 'ai-focus', 'germany', 'dach-region', 'angel-approach'],
    fitScore: 40,
    fitCriteria: {
      preSeedFocus: true,
      gamingSectorActive: false,
      aiDevToolsThesis: true,
      euBased: true,
      relevantPortfolio: false
    }
  },
  {
    id: '0CHd3azAIZ6jhVnB2g2P',
    name: 'Lagoon Capital Oy',
    notes: `RESEARCH (2026-03-02):
Finnish VC focused on software-powered companies. Active since 2007.

TRACK RECORD: 50+ technology companies supported, 12 successful exits.

INVESTMENT THESIS: "Boosting Technology Companies to Business Success" - Equity investment + mentorship + international business networks. Target companies with strong teams and validated customer bases.

ASSESSMENT: Experienced Finland-based tech investor. No specific gaming or AI dev tools focus. Generalist software investor.`,
    tags: ['technology', 'finland', 'experienced-vc', 'software', 'generalist'],
    fitScore: 35,
    fitCriteria: {
      preSeedFocus: false,
      gamingSectorActive: false,
      aiDevToolsThesis: false,
      euBased: true,
      relevantPortfolio: false
    }
  },
  {
    id: '0D4d1YnHQBcDnDVpzJ6H',
    name: 'BackingMinds',
    notes: `RESEARCH (2026-03-02):
Swedish VC focused on finding and backing high-performing founders "outside traditional VC networks." Strong diversity focus.

INVESTMENT THESIS: Industry-agnostic, early-stage tech. "We look where others don't."

DIVERSITY STATS:
- 70% of companies founded outside capital cities
- 35% have founder with migrant background  
- 60% have at least one female founder

PORTFOLIO: Trustrace, Cemvision, TransferGalaxy, Denjo Dogs, BoneProx, Combify, Brain Stimulation, Bricknode, Dynamic Code, Lingio, Serviceform, Skrym, Nitrovolt, Snerpa Power, Uniqkey, Hybird Energy

ASSESSMENT: Industry-agnostic Swedish VC. No gaming or AI dev tools specific thesis. Diverse portfolio but no creative tech/games.`,
    tags: ['early-stage', 'sweden', 'industry-agnostic', 'diversity-focus', 'nordic'],
    fitScore: 30,
    fitCriteria: {
      preSeedFocus: true,
      gamingSectorActive: false,
      aiDevToolsThesis: false,
      euBased: true,
      relevantPortfolio: false
    }
  },
  {
    id: '0DjX7uahpFyRxcd3EhZw',
    name: 'Vantage',
    notes: `RESEARCH (2026-03-02):
UK-based early-stage investor helping founders scale with strategic capital and partnerships.

INVESTMENT THESIS: Highly selective. Looking for founders "with a chip on their shoulders" who are "missionaries of their vision." Diversity-friendly regardless of gender, color, age, background.

ASSESSMENT: Generic early-stage UK VC. No specific thesis around gaming, AI, or dev tools. Limited information available.`,
    tags: ['early-stage', 'uk', 'generalist', 'strategic-capital'],
    fitScore: 25,
    fitCriteria: {
      preSeedFocus: true,
      gamingSectorActive: false,
      aiDevToolsThesis: false,
      euBased: true,
      relevantPortfolio: false
    }
  },
  {
    id: '0DqT5lYDthd6lwHh3nT7',
    name: 'Shape VC',
    notes: `RESEARCH (2026-03-02):
Poland-based VC investing in early-stage companies with R&D components, specifically HARDWARE and IoT focus.

INVESTMENT THESIS: Early-stage companies that leverage hardware as a core component. Up to EUR 250K per investment.

PORTFOLIO: 18 portfolio companies in IT, hardware, IoT. Notable: Aether Biomedical ($5.8M raise).

CONTACT: contact@shape.vc

ASSESSMENT: Hardware/IoT focus is NOT aligned with LoreWeaver's software/AI narrative tools. Not a fit.`,
    tags: ['early-stage', 'poland', 'hardware', 'iot', 'r-and-d', 'not-software', 'not-fit'],
    fitScore: 15,
    fitCriteria: {
      preSeedFocus: true,
      gamingSectorActive: false,
      aiDevToolsThesis: false,
      euBased: true,
      relevantPortfolio: false,
      otherScore: -5,
      otherReason: 'Hardware focus - LoreWeaver is software/AI'
    }
  },
  {
    id: '0EF4O8M3aWPSI6iy2UDg',
    name: 'Casper Ventures',
    notes: `RESEARCH (2026-03-02):
Portuguese early-stage startup investment fund backing "exponential startups."

INVESTMENT THESIS: Food, AI for business, Health, Entertainment. "Not business as usual" - likes to invest early.

CONTACT: info@casperventures.com
ADDRESS: Av. Liberdade nº105, 4º esq., Lisbon

ASSESSMENT: Entertainment tag is interesting but no gaming-specific thesis. "AI for business" could be relevant. Worth a closer look if they have any gaming/creative tech portfolio companies.`,
    tags: ['early-stage', 'portugal', 'entertainment', 'ai-for-business', 'food', 'health'],
    fitScore: 40,
    fitCriteria: {
      preSeedFocus: true,
      gamingSectorActive: false,
      aiDevToolsThesis: true,
      euBased: true,
      relevantPortfolio: false,
      otherScore: 2,
      otherReason: 'Entertainment + AI for business thesis has overlap potential'
    }
  },
  {
    id: '0I0NXK6TZw7swXoTvA2j',
    name: 'Nextgrid',
    notes: `RESEARCH (2026-03-02):
Poland-based micro VC and accelerator focused on AI startups.

INVESTMENT THESIS: "Accelerating pace of Innovation by Investing in Artificial Intelligence Startups, Talent & Ecosystem"

STAGE: Early Stage Venture, Seed
PORTFOLIO: 7 companies (AI-focused)

CONTACT: hello@nextgrid.com (per existing data)

ASSESSMENT: Strong AI focus! Accelerator model could provide more than just capital. No specific gaming thesis but AI tools alignment. Worth exploring if they'd be interested in AI for creative/gaming applications.`,
    tags: ['ai-focus', 'poland', 'accelerator', 'seed-stage', 'micro-vc', 'potential-fit'],
    fitScore: 45,
    fitCriteria: {
      preSeedFocus: true,
      gamingSectorActive: false,
      aiDevToolsThesis: true,
      euBased: true,
      relevantPortfolio: false,
      otherScore: 2,
      otherReason: 'Strong AI thesis - could see narrative AI as interesting AI application'
    }
  }
];

async function updateLeads() {
  console.log('Updating 10 leads with research findings...\n');
  
  for (const update of updates) {
    try {
      const leadRef = db.collection('leads').doc(update.id);
      
      // Build update object
      const updateData = {
        notes: update.notes,
        tags: update.tags,
        'investor.fitScore': update.fitScore,
        'investor.fitCriteria': update.fitCriteria,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };
      
      await leadRef.update(updateData);
      console.log(`✅ ${update.name} - ICP Score: ${update.fitScore}`);
    } catch (err) {
      console.error(`❌ ${update.name}: ${err.message}`);
    }
  }
  
  console.log('\nDone!');
}

updateLeads().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
