// Batch 3 Research Update - Leads 20-29
// Researched: 2026-03-02
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
    id: '0sylRxLhACrIo8rTgmYH',
    name: 'APX (now HEARTFELT_)',
    notes: `**Research Date:** 2026-03-02

**Overview:** APX is a Berlin-based earliest-stage investor, backed by Axel Springer (media) and Porsche. Founded 2013 as Axel Springer Plug & Play, invested in 100+ companies including N26 unicorn. As of May 2023, new investments made under successor fund HEARTFELT_.

**Focus:** Pre-seed startups with digital business models across Europe.

**Highlights:**
- Invested in 185+ founding teams since 2018
- Strong media/tech backing (Axel Springer)
- Now operating as HEARTFELT_ for new investments
- Focus on earliest-stage, often first investor

**Stage:** Pre-seed
**Geography:** Europe (Berlin HQ)

**LoreWeaver Fit:** Moderate. Digital focus aligns, but no specific gaming/entertainment thesis. Media backing (Axel Springer) could be relevant for narrative tech. Worth monitoring HEARTFELT_ activity.`,
    tags: ['pre-seed', 'digital', 'media-backed', 'berlin', 'axel-springer', 'porsche'],
    icpScore: 42,
    contact: {
      name: '',
      email: 'hello@apx.vc',
      role: '',
      phone: '',
      linkedin: ''
    }
  },
  {
    id: '11YilIjzd007ZSjh4sqQ',
    name: 'MIG Capital',
    notes: `**Research Date:** 2026-03-02

**Overview:** Munich-based venture capital firm focused on Life Science and Deep Tech startups. Unique positioning as Germany's only retail VC - 100% funded by individual investors (public funds), not institutional LPs.

**Focus:** Life Science & Deep Tech in Europe.

**Highlights:**
- Partners with startups to "push limits and make the world a better place"
- Founder-first mentality
- Retail VC model with public funding
- Strong European focus

**Stage:** Early-stage
**Geography:** Europe (Munich HQ)

**LoreWeaver Fit:** Low. Life science and deep-tech focus doesn't align with gaming/narrative AI. No relevant verticals or AI focus mentioned.`,
    tags: ['life-science', 'deep-tech', 'retail-vc', 'munich', 'germany'],
    icpScore: 28,
    contact: {
      name: '',
      email: '',
      role: '',
      phone: '',
      linkedin: ''
    }
  },
  {
    id: '14UAM7St7gSlUyRBNPc2',
    name: 'AKCES NCBR',
    notes: `**Research Date:** 2026-03-02

**Overview:** NCBR Investment Fund ASI S.A. (NIFASI) - Polish government-backed investment fund for innovative SMEs with R&D-based projects. Capital: 160M PLN (~€37M).

**Focus:** Innovative Polish SMEs with R&D projects.

**Type:** Government fund (not traditional VC)
**Geography:** Poland (Warsaw)

**Highlights:**
- Government-backed fund
- Focus on R&D-based innovation
- SME support mechanism

**LoreWeaver Fit:** Low. Government fund focused on Polish SMEs. Not suitable for international startup investment. Would require Polish presence and R&D grant-style approach.`,
    tags: ['government-fund', 'r&d', 'sme', 'poland', 'warsaw', 'not-vc'],
    icpScore: 18,
    contact: {
      name: '',
      email: 'biuro@nifasi.pl',
      role: '',
      phone: '',
      linkedin: ''
    }
  },
  {
    id: '14rG9mtthEFdfqO4iN2v',
    name: 'Socios Q',
    notes: `**Research Date:** 2026-03-02

**Overview:** Spanish early-stage investment vehicle focused on technology companies with high growth potential and innovative business models. Also invests in mature companies in restructuring/business model redefinition phase.

**Focus:** Technology, digital media, healthcare in Spain.

**Highlights:**
- Early stage and expansion capital
- Exceptionally invests seed with proven teams
- Mission to develop Spanish VC ecosystem
- Connects traditional financial investors with sustainable projects
- Focus on reasonable valuations

**Stage:** Early stage, expansion, seed (exceptional)
**Geography:** Spain

**LoreWeaver Fit:** Low-Moderate. Digital media interest but healthcare/general tech focus. Spanish ecosystem focus limits international relevance. No specific AI or gaming thesis.`,
    tags: ['early-stage', 'digital-media', 'technology', 'healthcare', 'spain', 'expansion'],
    icpScore: 35,
    contact: {
      name: '',
      email: 'info@sociosq.com',
      role: '',
      phone: '',
      linkedin: ''
    }
  },
  {
    id: '19g0QhExpc0QpVZTSlW6',
    name: 'Twin Track Ventures',
    notes: `**Research Date:** 2026-03-02

**Overview:** London-based venture fund focused on deep tech startups serving commercial and defence & security customers. Built on defence, science, and early-stage investing experience.

**Focus:** IP-rich technologies for commercial and defence/security markets across NATO.

**Portfolio Companies:**
- Cassi AI
- Hadean
- SE3.ai
- Uplift360

**Highlights:**
- Pre-seed and seed focus
- NATO geography requirement
- Deep tech with dual-use (commercial + defence)
- IP-rich technology preference

**Stage:** Pre-seed, seed
**Geography:** NATO countries (London HQ)

**LoreWeaver Fit:** Low-Moderate. Deep tech focus could include AI, but defence/security emphasis doesn't align with gaming/entertainment. Dual-use narrative for training simulations could be a stretch case.`,
    tags: ['deep-tech', 'defence', 'security', 'pre-seed', 'seed', 'london', 'nato', 'dual-use'],
    icpScore: 38,
    contact: {
      name: '',
      email: '',
      role: '',
      phone: '',
      linkedin: ''
    }
  },
  {
    id: '1A77VtTSMu9wuIHvorpw',
    name: 'ActiveCapital',
    notes: `**Research Date:** 2026-03-02

**Overview:** US-based (Texas) venture firm focused on pre-seed investing in enterprise software. Founded by Pat Matthews, entrepreneur turned investor. Despite Spanish location in CRM, this is a US firm.

**Focus:** Enterprise software, AI, cloud infrastructure.

**Highlights:**
- Pre-seed focus with $100K-$1M initial investments
- 20+ years enterprise software experience
- Strong founder testimonials
- Team includes founder operators
- Prefer to be first meaningful capital

**Team:**
- Pat Matthews (Founder & CEO)
- Cat Dizon (Co-founder & CFO)
- Chris Saum (Partner & Investor)

**Stage:** Pre-seed
**Geography:** USA (Texas)

**LoreWeaver Fit:** Moderate. AI and enterprise software focus aligns with B2B tool positioning. However, US-based and focused on American founders. Enterprise rather than gaming/creative tech.

**Note:** CRM lists as Spain but website indicates US firm.`,
    tags: ['enterprise-software', 'ai', 'pre-seed', 'usa', 'texas', 'b2b'],
    icpScore: 45,
    contact: {
      name: 'Pat Matthews',
      email: 'team@active.vc',
      role: 'Founder & CEO',
      phone: '',
      linkedin: 'https://www.linkedin.com/in/pat-matthews/'
    }
  },
  {
    id: '1AUxA3esa8LaJWEIf6ew',
    name: 'Butterfly Ventures',
    notes: `**Research Date:** 2026-03-02

**Overview:** Leading seed-stage deep tech VC in the Nordics, founded 2012. Offices in Oulu, Helsinki, Stockholm, Tallinn, Copenhagen. First European VC to operate 100% carbon neutrally.

**Focus:** Deep tech, hardware, hardware-interfacing software with social/environmental impact.

**Stats:**
- €77M under management
- ~100 companies invested
- 10 new portfolio companies/year
- €300K average investment
- €180M portfolio raised financing
- €1B portfolio market cap

**Highlights:**
- 80% of portfolio has no revenue at entry
- Business-driven: revenue within 6 months
- Cooperative approach, full partner support
- Strong follow-on capacity
- Impact investing emphasis

**Team:**
- Matti Kanninen (Managing Partner)
- Juho Risku (Partner) - linkedin.com/in/juho-risku-8a876/
- Ville Heikkinen (Partner)
- Tanya Horowitz (Partner, Stockholm)
- Liina Lehtonen (Principal, Copenhagen)

**Stage:** Seed
**Geography:** Nordics & Baltics

**LoreWeaver Fit:** Low-Moderate. Hardware/deep-tech focus doesn't align with software-first narrative AI. Impact investing angle could work for "games for good" but not core thesis. Nordic focus is geographically relevant for EU.`,
    tags: ['deep-tech', 'hardware', 'seed', 'nordic', 'finland', 'impact', 'carbon-neutral'],
    icpScore: 38,
    contact: {
      name: 'Juho Risku',
      email: 'hello@butterfly.vc',
      role: 'Partner',
      phone: '+358 40 557 4004',
      linkedin: 'https://www.linkedin.com/in/jrisku'
    }
  },
  {
    id: '1DJfRPKAzZQLPZSo8duk',
    name: 'Hard2beat',
    notes: `**Research Date:** 2026-03-02

**Overview:** Early-stage VC for Polish deep tech startups, based in Wrocław. Positions as "more than capital" - strategic support from day one. Blend of founder experience (€14M+ ARR, multiple exits) with VC expertise (100+ investments).

**Focus:** Polish deep tech startups.

**Highlights:**
- Founders + funders approach
- Strategic support: global sales, R&D, fundraising, legal
- Network of 250+ investors, angels, industry partners
- Quick decision making

**Stage:** Early-stage
**Geography:** Poland (Wrocław)

**LoreWeaver Fit:** Low-Moderate. Deep tech focus could include AI but no specific mention. Polish focus limits relevance unless targeting Polish gaming ecosystem (CD Projekt, 11bit Studios region). Strategic support model valuable.`,
    tags: ['deep-tech', 'early-stage', 'poland', 'wroclaw', 'strategic-support'],
    icpScore: 35,
    contact: {
      name: '',
      email: 'mz@hard2beat.vc',
      role: '',
      phone: '',
      linkedin: ''
    }
  },
  {
    id: '1DMGx8lUNdXAggf3Cfbl',
    name: 'FoolFarm',
    notes: `**Research Date:** 2026-03-02

**Overview:** Italian AI-focused venture capital firm, investing in AI startups since 2020. "AI Venture Capital" positioning.

**Focus:** AI-native startups.

**Highlights:**
- Pure AI thesis
- Italian market focus
- Operating since 2020 - experienced in AI investing
- Spa designation (Italian company structure)

**Stage:** Early-stage (implied)
**Geography:** Italy

**LoreWeaver Fit:** Moderate-Good. Pure AI focus aligns well with LoreWeaver's AI-first approach. Italian market has growing gaming scene. Worth exploring if they have gaming/creative AI interest. Limited website info - may need direct outreach.`,
    tags: ['ai', 'ai-native', 'italy', 'early-stage'],
    icpScore: 55,
    contact: {
      name: '',
      email: 'info@foolfarm.com',
      role: '',
      phone: '',
      linkedin: ''
    }
  },
  {
    id: '1IDPdB3h9wSDN3LInu7C',
    name: 'Merantix Capital',
    notes: `**Research Date:** 2026-03-02

**Overview:** Berlin-based AI venture firm, building and investing in AI since 2016. Combines venture studio (pre-idea partnerships) with venture capital (pre-seed to seed AI-native companies). Leverages Europe's biggest and most diverse AI community.

**Focus:** AI-native companies across multiple verticals.

**Areas of Interest:**
- Gen2 Fintech (AI-powered financial infrastructure)
- Tech-Bio & Healthcare Automation
- Agentic Models (autonomous workflow AI)
- Robotics & Industrial AI
- New Systems of Record (ERP reinvention)
- Defense & AI-Powered Security
- Neuroscience & AI for Brain Research
- IP Protection in Digital Age
- Safety for Highly Regulated Industries
- Cloud Labs (automated research)
- Online Trust & Fraud Prevention
- Government & Bureaucracy
- Cybersecurity
- Energy

**Highlights:**
- Pure AI thesis since 2016
- Venture studio + VC model
- Pre-idea to seed stage
- Strong AI community/network
- Very broad AI application interest

**Stage:** Pre-seed, seed
**Geography:** Europe (Berlin HQ)

**LoreWeaver Fit:** Good. Strong AI thesis aligns with LoreWeaver's AI-first approach. "Agentic Models" interest directly relevant to Director's multi-agent architecture. No explicit gaming/entertainment focus, but broad AI applications and pre-seed fit make this a good prospect. Worth direct outreach.`,
    tags: ['ai-native', 'pre-seed', 'seed', 'venture-studio', 'berlin', 'germany', 'agentic-ai'],
    icpScore: 68,
    contact: {
      name: '',
      email: '',
      role: '',
      phone: '',
      linkedin: 'https://www.linkedin.com/in/rasmus-rothe-5ab64825/'
    }
  }
];

async function updateLeads() {
  console.log('Updating batch 3 leads (20-29)...\n');
  
  for (const update of updates) {
    try {
      const leadRef = db.collection('leads').doc(update.id);
      const doc = await leadRef.get();
      
      if (!doc.exists) {
        console.log(`❌ Lead not found: ${update.name} (${update.id})`);
        continue;
      }
      
      const existingData = doc.data();
      
      await leadRef.update({
        notes: update.notes,
        tags: update.tags,
        'investor.fitScore': update.icpScore,
        'investor.fitReason': `ICP ${update.icpScore}/100 - ${update.icpScore >= 85 ? 'Qualified' : update.icpScore >= 50 ? 'Worth exploring' : 'Low priority'}`,
        contact: update.contact,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      console.log(`✅ Updated: ${update.name} (ICP: ${update.icpScore})`);
    } catch (error) {
      console.log(`❌ Error updating ${update.name}: ${error.message}`);
    }
  }
  
  console.log('\n--- Batch 3 Summary ---');
  console.log(`Total leads updated: ${updates.length}`);
  const qualified = updates.filter(u => u.icpScore >= 85);
  const worthExploring = updates.filter(u => u.icpScore >= 50 && u.icpScore < 85);
  const lowPriority = updates.filter(u => u.icpScore < 50);
  
  console.log(`Qualified (ICP >= 85): ${qualified.length}`);
  qualified.forEach(u => console.log(`  - ${u.name}: ${u.icpScore}`));
  
  console.log(`Worth Exploring (50-84): ${worthExploring.length}`);
  worthExploring.forEach(u => console.log(`  - ${u.name}: ${u.icpScore}`));
  
  console.log(`Low Priority (< 50): ${lowPriority.length}`);
}

updateLeads().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
