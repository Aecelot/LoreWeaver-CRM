// Update batch 12 leads (110-119) with research findings
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
    id: 'vuUGDlvufqAuHFBPO78m',
    name: 'Angel Investor',
    data: {
      notes: `"Angel Investor" appears to be a generic or placeholder entry referencing a LinkedIn company page. The website linked (linkedin.com/company/the-angel-investor) suggests this may be a UK-based entity focused on consumer technology and food/drink sectors.

Investment Focus: Consumer technology, Food & Drink
Stage: Seed onwards (based on tag)
Geography: United Kingdom

Why NOT a fit for LoreWeaver:
- Consumer tech and F&B focus, no gaming or AI dev tools thesis
- Appears to be a generic/placeholder entry with limited verifiable information
- No evidence of gaming, entertainment, or B2B software investments
- Lacks concrete portfolio or investment track record data

Status: Insufficient data to properly evaluate. Recommend removing or verifying legitimacy.

Research Date: 2026-03-03`,
      tags: ['consumer-technology', 'food-and-drink', 'united-kingdom', 'seed', 'unverified'],
      'investor.fitScore': 10,
      status: 'disqualified'
    }
  },
  {
    id: '0cXLHuF5pSXuzTlT6CIm',
    name: 'Angel One',
    data: {
      notes: `Angel One is a Ukrainian venture capital fund launched in 2022 with an initial $1.5M capital. Based in Lviv, Ukraine, it focuses on backing Ukrainian founders across all technology sectors.

Investment Focus: Fintech, SaaS, EdTech, AI/ML
Stage: Pre-seed and Seed
Check Size: $50,000 - $200,000
Geography: Exclusively Ukrainian startups and founders
Team: Connected to Lviv University with global business network of angel investors and mentors

Why NOT a fit for LoreWeaver:
- Exclusively invests in Ukrainian-based startups (LoreWeaver is Dutch)
- No gaming, entertainment, or creative tech focus
- AI/ML investments appear enterprise/productivity focused, not gaming
- Small fund size ($1.5M) limits capacity for B2B SaaS tools

Contact: Via angelone.fund website
Website: https://www.angelone.fund/

Research Date: 2026-03-03`,
      tags: ['fintech', 'saas', 'edutech', 'ai-ml', 'ukraine', 'pre-seed', 'seed', 'eastern-europe'],
      'investor.fitScore': 20,
      'investor.fitCriteria': {
        preSeedFocus: true,
        gamingSectorActive: false,
        aiDevToolsThesis: false,
        euBased: false,
        relevantPortfolio: false,
        otherScore: -3,
        otherReason: 'Ukraine-only mandate, no gaming'
      },
      status: 'researched'
    }
  },
  {
    id: 'bjFdK1PgaarlgVyQPpsk',
    name: 'angelfund.vc',
    data: {
      notes: `angelfund.vc (also known as MAS Angel Fund) is a Berlin-based venture capital firm founded in 2010 by entrepreneur Benjamin Rohé. The fund has invested in 20+ tech startups, primarily at seed stage in Germany.

Investment Focus: Tech startups - "tech investments from an Entrepreneur for Entrepreneurs"
Stage: Seed, Early-stage, and Later-stage
Geography: Primarily Germany-based startups
Founder: Benjamin Rohé (Berlin-based serial entrepreneur)
Portfolio Size: 20+ companies

Investment Philosophy: Entrepreneur-friendly approach with operational support

Why MODERATE fit for LoreWeaver:
+ EU-based (Germany) with tech focus
+ Seed stage investments appropriate for LoreWeaver
+ Entrepreneur-led fund may appreciate founder perspective
- No specific gaming or entertainment track record found
- No AI/dev tools thesis evident
- Appears to be a smaller fund with limited recent activity (last data from 2017)

Contact: Via angelfund.vc website
Website: https://angelfund.vc

Research Date: 2026-03-03`,
      tags: ['tech', 'startups', 'germany', 'seed', 'berlin', 'entrepreneur-led'],
      'investor.fitScore': 40,
      'investor.fitCriteria': {
        preSeedFocus: false,
        gamingSectorActive: false,
        aiDevToolsThesis: false,
        euBased: true,
        relevantPortfolio: false,
        otherScore: 3,
        otherReason: 'Entrepreneur-led, seed focus, but limited recent activity'
      },
      status: 'researched'
    }
  },
  {
    id: 'qxhLXDHlCKdQpckhFslL',
    name: 'Angelini Ventures',
    data: {
      notes: `Angelini Ventures is the corporate venture capital arm of Angelini Industries (Italian industrial conglomerate), launched in November 2022 with a €300 million capital commitment.

Investment Focus: EXCLUSIVELY Biotechnology, Digital Health, and Life Sciences
Stage: Series A and Series B
Geography: European startups (€150M EIB partnership for European biotech/digital health)
Capital: €300 million committed
Parent: Angelini Industries (pharmaceutical/healthcare conglomerate)

Recent: Signed €150M agreement with European Investment Bank (EIB) for European biotech/digital health startups

Why NOT a fit for LoreWeaver:
- Exclusive focus on biotech, digital health, life sciences
- No technology, gaming, AI, or entertainment investments
- CVC tied to parent company's pharmaceutical/healthcare strategic interests
- Series A/B focus is later stage than LoreWeaver's current phase
- Zero overlap with narrative AI or game development tools

Contact: info@angeliniventures.com
Website: https://www.angeliniventures.com

Research Date: 2026-03-03`,
      tags: ['biotech', 'digital-health', 'healthtech', 'life-sciences', 'italy', 'cvc', 'series-a', 'series-b'],
      'investor.fitScore': 5,
      'investor.fitCriteria': {
        preSeedFocus: false,
        gamingSectorActive: false,
        aiDevToolsThesis: false,
        euBased: true,
        relevantPortfolio: false,
        otherScore: -5,
        otherReason: 'Healthcare-only mandate, Series A/B stage mismatch'
      },
      'contact.email': 'info@angeliniventures.com',
      status: 'disqualified'
    }
  },
  {
    id: 'HpFnkrUCdXPW31xGzA22',
    name: 'Angelize',
    data: {
      notes: `Angelize is a community-based investment firm active across Europe, connecting successful founders who angel invest together. Every year, they invest in approximately 50 pre-seed technology startups through their fund.

Investment Focus: Technology startups (broad)
Stage: Pre-seed
Volume: ~50 investments per year
Model: Community of successful founders angel investing together
Geography: Pan-European

Value Proposition: "Earned your wings as a founder? Start angel investing to stay relevant & give back"

Why MODERATE fit for LoreWeaver:
+ Pre-seed focus matches LoreWeaver stage
+ Pan-European with tech focus
+ Community of successful founders may appreciate narrative AI/gaming tech innovation
+ High volume of investments (50/year) suggests active dealflow
- No specific gaming or AI dev tools portfolio evidence
- Broad tech mandate may dilute gaming expertise

Contact: pr@angelize.eu
Website: https://angelize.eu (redirects to angelize.webflow.io)

Research Date: 2026-03-03`,
      tags: ['technology', 'pre-seed', 'germany', 'europe', 'founder-network', 'angel-syndicate'],
      'investor.fitScore': 55,
      'investor.fitCriteria': {
        preSeedFocus: true,
        gamingSectorActive: false,
        aiDevToolsThesis: false,
        euBased: true,
        relevantPortfolio: false,
        otherScore: 3,
        otherReason: 'High volume pre-seed, founder community, but no gaming thesis'
      },
      'contact.email': 'pr@angelize.eu',
      status: 'researched'
    }
  },
  {
    id: 'BIPex8u3Ws8v3xjRuVYv',
    name: 'Angelor',
    data: {
      notes: `Angelor is a French entrepreneurial venture capital firm focused on impact investing in sectors that benefit humanity. Based in France, they describe themselves as "investisseurs entrepreneurs engagés" (engaged entrepreneur investors).

Investment Focus: Three societal sectors only:
1. Health (santé)
2. Food (alimentation)
3. Environment (environnement)

Stage: Pre-seed, Seed, Series A
Geography: France (regional territories focus)
Capital Deployed: €25M invested to date
Philosophy: Long-term, sustainable growth with social impact; emphasis on human relationships and regional job creation

Team: Led by Sébastien Bonte (Founder, President), with partners Charly Germain and Didier Pradeilles

Mission: "Build a world we'll be proud to leave to our children"

Why NOT a fit for LoreWeaver:
- Exclusive focus on health, food, environment sectors
- No technology, gaming, entertainment, or AI thesis
- Impact investing mandate doesn't align with gaming/AI tools
- Regional France focus with emphasis on local job creation
- Philosophy prioritizes sustainable growth over tech scale-up

Contact: contact@angelor.fr
Website: https://angelor.fr/

Research Date: 2026-03-03`,
      tags: ['health', 'food', 'environment', 'impact-investing', 'france', 'pre-seed', 'seed', 'series-a'],
      'investor.fitScore': 10,
      'investor.fitCriteria': {
        preSeedFocus: true,
        gamingSectorActive: false,
        aiDevToolsThesis: false,
        euBased: true,
        relevantPortfolio: false,
        otherScore: -6,
        otherReason: 'Impact investing in health/food/environment only'
      },
      'contact.email': 'contact@angelor.fr',
      status: 'disqualified'
    }
  },
  {
    id: 'avpk5UFRTifUZFDIAjCE',
    name: 'Angels Den',
    data: {
      notes: `Angels Den is the UK and Europe's largest and longest-running angel investment network, founded in 2007. They connect early-stage startups with a network of 21,000+ experienced investors.

Investment Focus: Sector-agnostic - "Backing exceptional founders across all sectors"
Stage: Early-stage (Pre-seed/Seed)
Network Size: 21,000+ angel investors
Capital Raised: £250M+ across 2,500+ deals since 2007
Model: Platform connecting startups with angels through curated opportunities and pitch events

Services:
- Curated investment opportunities with detailed profiles
- Network of 21,000+ investors
- Expert collaboration and syndication
- Exclusive events, roundtables, and networking

Why MODERATE-HIGH fit for LoreWeaver:
+ UK's largest angel network with significant capital (£250M+ raised)
+ Sector-agnostic means gaming/AI not excluded
+ Previous database entry notes "gaming" in investment focus
+ Pre-seed/seed stage appropriate for LoreWeaver
+ Large network increases chance of gaming-interested angels
+ EU-accessible via UK operations
- Not a dedicated gaming fund
- Broad network means diluted gaming expertise
- UK-centric which may limit Dutch startup focus

Website: https://www.angelsden.com

Research Date: 2026-03-03`,
      tags: ['uk', 'angel-network', 'seed', 'pre-seed', 'sector-agnostic', 'gaming'],
      'investor.fitScore': 65,
      'investor.fitCriteria': {
        preSeedFocus: true,
        gamingSectorActive: false,
        aiDevToolsThesis: false,
        euBased: true,
        relevantPortfolio: false,
        otherScore: 4,
        otherReason: 'Large network, sector-agnostic, some gaming interest noted'
      },
      status: 'researched'
    }
  },
  {
    id: 'u5pihlTCtLQTvCrnK1yJ',
    name: 'Angels United',
    data: {
      notes: `Angels United is an Austrian angel investment group based in Vienna, with 150+ investments and 30+ exits. The team includes Karl Büche, Markus Ertler, Hermann Futter, Niki Futter, Michael Edtmayer, and Alexandra Ruzsa.

Investment Focus: Young Austrian tech companies
Stage: Pre-seed and Seed
Check Size: Up to €300,000 per ticket with follow-on rounds
Geography: Exclusively Austrian startups
Track Record: 150+ investments, 30+ exits, 70+ years combined digital business experience

Team Highlights:
- Karl Büche: Corporate manager and serial entrepreneur
- Markus Ertler: Founded first worldwide real estate platform (1994), exit with Immobilien.NET (2014)
- Hermann Futter: Led Compass Group digitalization for 20+ years
- Niki Futter: Chair of invest.austria, focused on startup investments
- Michael Edtmayer: Managing Director, multi-family office manager

Investment Criteria: Strong founder team, good timing, excellent execution

Why NOT a fit for LoreWeaver:
- Exclusively invests in Austrian startups (LoreWeaver is Dutch)
- No gaming, entertainment, or AI dev tools focus evident
- Geographic mandate is strict Austria-only
- Small check sizes may not suit LoreWeaver's funding needs

Contact: pitchdeck submissions via email (hidden on website)
Website: https://angelsunited.at/

Research Date: 2026-03-03`,
      tags: ['austria', 'pre-seed', 'seed', 'tech', 'angel-group', 'dach'],
      'investor.fitScore': 25,
      'investor.fitCriteria': {
        preSeedFocus: true,
        gamingSectorActive: false,
        aiDevToolsThesis: false,
        euBased: true,
        relevantPortfolio: false,
        otherScore: -3,
        otherReason: 'Austria-only mandate, no gaming thesis'
      },
      status: 'researched'
    }
  },
  {
    id: 'NWF9DFcZePdjTwvJoo93',
    name: 'AngelsCube',
    data: {
      notes: `AngelsCube is a UK-based angel investment entity focused on seed-stage technology startups. Limited public information available; website (angelscube.com) appears inactive or minimal.

Investment Focus: Technology
Stage: Seed
Geography: United Kingdom

Why NOT a fit for LoreWeaver:
- Limited verifiable information available
- Website appears minimal/inactive
- No gaming, AI, or dev tools thesis evident
- No portfolio or track record publicly available
- Recommend verifying legitimacy before outreach

Contact: info@angelscube.com (if active)
Website: http://www.angelscube.com (limited content)

Research Date: 2026-03-03`,
      tags: ['technology', 'united-kingdom', 'seed', 'unverified'],
      'investor.fitScore': 15,
      'investor.fitCriteria': {
        preSeedFocus: false,
        gamingSectorActive: false,
        aiDevToolsThesis: false,
        euBased: true,
        relevantPortfolio: false,
        otherScore: -5,
        otherReason: 'Insufficient data, website inactive'
      },
      'contact.email': 'info@angelscube.com',
      status: 'researched'
    }
  },
  {
    id: 'IFysjv976yNjylSuTltP',
    name: 'AngelsWay',
    data: {
      notes: `AngelsWay is a Portuguese community-driven angel investment network focused on fostering early-stage technology startups. Based in Portugal, they aim to empower local talent to build scalable ventures and prevent brain drain.

Investment Focus: Technology-driven companies with real-world impact
Stage: Pre-seed and Seed
Check Size: €1,200 - €50,000
Geography: Portugal-based or Portugal-connected startups
Mission: Community-driven approach to funding, resources, and support

Model: Empowers Portuguese founders to access early-stage capital and build from within Portugal rather than relocating to better-funded hubs

Why NOT a fit for LoreWeaver:
- Small check sizes (€1.2K-€50K) insufficient for LoreWeaver's needs
- Portugal-focused mandate (LoreWeaver is Dutch)
- No specific gaming, AI, or dev tools thesis
- Impact/technology focus is broad without entertainment sector emphasis
- Community model may lack gaming industry expertise

Website: https://angelsway.pt/

Research Date: 2026-03-03`,
      tags: ['technology', 'impact', 'startups', 'portugal', 'pre-seed', 'seed', 'community-driven'],
      'investor.fitScore': 20,
      'investor.fitCriteria': {
        preSeedFocus: true,
        gamingSectorActive: false,
        aiDevToolsThesis: false,
        euBased: true,
        relevantPortfolio: false,
        otherScore: -5,
        otherReason: 'Portugal-only, very small check sizes'
      },
      status: 'researched'
    }
  }
];

async function updateLeads() {
  console.log('Updating batch 12 leads with research findings...\n');
  
  let qualified = 0;
  let researched = 0;
  let disqualified = 0;
  
  for (const update of updates) {
    try {
      const docRef = db.collection('leads').doc(update.id);
      await docRef.update({
        ...update.data,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      const score = update.data['investor.fitScore'];
      if (score >= 85) {
        qualified++;
        console.log(`★ Qualified: ${update.name} (ICP: ${score})`);
      } else if (update.data.status === 'disqualified') {
        disqualified++;
        console.log(`✗ Disqualified: ${update.name} (ICP: ${score})`);
      } else {
        researched++;
        console.log(`✓ Researched: ${update.name} (ICP: ${score})`);
      }
    } catch (error) {
      console.error(`✗ Failed to update ${update.name}:`, error.message);
    }
  }
  
  console.log('\n=== BATCH 12 SUMMARY ===');
  console.log(`Leads qualified (ICP >= 85): ${qualified}`);
  console.log(`Leads researched: ${researched}`);
  console.log(`Leads disqualified: ${disqualified}`);
  console.log(`Total processed: ${updates.length}`);
}

updateLeads().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
