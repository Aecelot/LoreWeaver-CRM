// Update batch 13 leads (120-129) with research findings
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
    id: 'CajVUbBEjd0PDHyrLkJN',
    name: 'Apeiron Venture Capital',
    data: {
      notes: `Apeiron Ventures (also known as Apeiron VC) is a Greek pre-seed and seed-stage venture fund investing in startups reimagining defense, industry, and infrastructure through applied AI and digital systems.

Investment Focus:
- Defense & Dual-Use Tech: AI/ML, ISR, cyber, autonomous systems
- Construction & Industrial Tech: robotics, digital twins, supply chain ops
- Logistics & Infrastructure AI: vertical SaaS, automation, fleet tech
- Productivity & Workflow AI: industry-specific copilots and platforms
- Cybersecurity & Digital Sovereignty: infrastructure, identity, compliance

Stage: Pre-seed, Seed
Check Size: €300K - €1M (avg round size $1.53M)
Geography: Europe
Portfolio: 40Kft, Alta Ares, PlugSecure (2 seed investments)

Team:
- Dimitris Kalavros-Gousiou (Founding Partner) - Co-founded Found.ation, launched TEDxAthens, former board member at Instacar, finloup, MyJobNow
- Nikos Antoniou (Founding Partner) - Former MD at PJ Tech Catalyst (€15M fund), led investments in Accusonus (acquired by Facebook), Pollfish (acquired by Prodege), Taxibeat (acquired by Daimler)
- Despoina Argyrou (Investment Analyst)
- Aris Kefalogiannis (Investment Analyst)

Why MODERATE fit for LoreWeaver:
+ Applied AI thesis with productivity/workflow copilots focus
+ Pre-seed/seed stage matches LoreWeaver's phase
+ EU-based with strong exit track record
+ "Industry-specific copilots and platforms" could include game development
- Primary focus is defense/industrial/infrastructure, not gaming
- No specific entertainment or gaming portfolio companies
- Greece-based but invests pan-European

Contact: hello@apeiron.vc
Website: https://apeiron.vc

Research Date: 2026-03-03`,
      tags: ['defense', 'industry', 'infrastructure', 'applied-ai', 'digital-systems', 'pre-seed', 'seed', 'greece', 'europe', 'productivity-ai'],
      'investor.fitScore': 40,
      'investor.fitCriteria': {
        preSeedFocus: true,
        gamingSectorActive: false,
        aiDevToolsThesis: true,
        euBased: true,
        relevantPortfolio: false,
        otherScore: 0,
        otherReason: 'Applied AI thesis but defense/industrial focus, not gaming'
      },
      'contact.name': 'Dimitris Kalavros-Gousiou',
      'contact.title': 'Founding Partner',
      'contact.email': 'hello@apeiron.vc',
      status: 'researched'
    }
  },
  {
    id: 'mPZgcTzTFeuewOeKuv0i',
    name: 'Aper Ventures',
    data: {
      notes: `APER Ventures is a Polish VC fund specializing in deep tech and hardware solutions, co-investing with local and foreign private investors and business angels. Based in Warsaw.

Investment Focus: Deep Tech, Hardware
Stage: Pre-seed, Seed
Check Size: €1-4M (co-investor model)
Geography: Poland-focused with international co-investment
Portfolio: 30+ investments including The Batteries, Talent Alpha, Coolomat, Norsa Pharma, Inuru, Aisens, Apeiron Synthesis, United Robots

Team:
- Jacek (Managing Partner) - Closed 30+ investments, Board Member of Business Angels Europe (BAE), founded APER Angels. Former BMW Group, Enterprise Investors, Simon Kucher. IESE Barcelona MBA.
- Piotrek (Partner) - Responsible for structuring transactions, 30+ investments closed. Former BBI Seed Fund, PARP. PhD in Management/Finance.
- Gianni Giovannetti - CEO of META Group, founder of Italian Angels for Growth, CEO of Business Angels Europe
- Bartek - Investment operations and portfolio supervision
- Michał (Associate) - Deep tech and hardware investments, doctoral research on startup valuation
- Ilona - Corporate governance and administration

Why NOT a fit for LoreWeaver:
- Hardware and physical deep tech focus (robotics, batteries, materials)
- Poland-centric investment mandate
- No software, AI dev tools, or entertainment thesis
- Co-investor model requires finding Polish lead investors
- Portfolio companies are hardware/industrial, not gaming/software

Contact: contact@aperventures.com
Website: https://aperventures.com

Research Date: 2026-03-03`,
      tags: ['deep-tech', 'hardware', 'poland', 'pre-seed', 'seed', 'robotics', 'materials'],
      'investor.fitScore': 20,
      'investor.fitCriteria': {
        preSeedFocus: true,
        gamingSectorActive: false,
        aiDevToolsThesis: false,
        euBased: true,
        relevantPortfolio: false,
        otherScore: -5,
        otherReason: 'Hardware focus, Poland-centric, no software/gaming thesis'
      },
      'contact.email': 'contact@aperventures.com',
      status: 'researched'
    }
  },
  {
    id: 'BTvZakzf9J9MGJiOcj4d',
    name: 'aperture.co',
    data: {
      notes: `Aperture (aperture.co) is a Geneva-based high-conviction VC firm investing in early-growth B2B fintech in Europe. Founded 2019, they combine investment with proprietary growth services platform.

Investment Focus: EXCLUSIVELY B2B Fintech, Vertical SaaS with fintech monetization
Stage: Seed to Series B (early-growth focus)
Geography: Europe
Model: VC + Growth Services platform for sourcing, diligence, and portfolio acceleration
Portfolio: 17 Tech companies, 14 Software companies, 13 Enterprise B2B, 7+ SaaS

Team:
- Ben Robinson (Partner) - Former CMO, CSO at Temenos, chartered accountant, equity analyst
- Dan Colceriu (Managing Partner) - Former Senior Corporate Strategy at Temenos
- Eleanora Angeliniadis (Investment Director) - Former VC/equity analyst at South Africa's largest corporate VC, chartered accountant
- Olivia Spencer (Investment Director) - Former VC/PE at ACE & Company, M&A at Oakvale Capital
- Aleksandra Laska (Advisor, IC member) - Ex-Redalpine Partner, Improbable founding team ($750M raise)
- Brett Bivens (Advisor, IC member) - Investor/writer with decade of tech investing experience
- Allison Chapman (Client Director) - Former Global Head GTM at Temenos

Locations: Geneva, London, Luxembourg

Why NOT a fit for LoreWeaver:
- Exclusive B2B fintech mandate (no gaming, entertainment, or dev tools)
- Vertical SaaS focus is on fintech monetization, not creative tools
- Later stage (Seed-Series B) vs LoreWeaver's current pre-seed needs
- Team background is heavily fintech/banking (Temenos)
- No evidence of gaming or AI creativity investments

Contact: contact@aperture.co
Website: https://www.aperture.co

Research Date: 2026-03-03`,
      tags: ['b2b-fintech', 'vertical-saas', 'switzerland', 'seed', 'series-b', 'growth-stage', 'fintech'],
      'investor.fitScore': 15,
      'investor.fitCriteria': {
        preSeedFocus: false,
        gamingSectorActive: false,
        aiDevToolsThesis: false,
        euBased: true,
        relevantPortfolio: false,
        otherScore: -5,
        otherReason: 'Fintech-only mandate, later stage, no gaming/AI tools'
      },
      'contact.email': 'contact@aperture.co',
      status: 'disqualified'
    }
  },
  {
    id: 'wiGtE7ksAFTgx6280Z7o',
    name: 'APEX Ventures',
    data: {
      notes: `APEX Ventures is a Vienna-based deep-tech and medical focused venture capital firm, run by founders with complementary backgrounds. Founded 2016.

Investment Focus:
- Deep Technology: AI/ML, autonomous systems, robotics, quantum tech, photonics
- Medical Technology
- Mobility & Space Innovation

Stage: Pre-seed, Seed, Series A
Check Size: EUR 500K to 1.5M
Geography: US and Europe-based companies
Portfolio: 51 companies including contextflow (medical imaging AI), DeepSpin (quantum computing), Mobius Labs (computer vision AI), Kiutra, ImageBiopsy Lab, MindPeak, T3K Forensics

Philosophy: "Build the next generation of world's leading companies"

Team:
- Florian Haas (new board member invest.austria)
- Stefan Haubner (new board member invest.austria)

Why MODERATE fit for LoreWeaver:
+ Strong AI/ML thesis with portfolio companies like Mobius Labs (computer vision)
+ Pre-seed/seed/Series A covers LoreWeaver's stage
+ EU-based with US investment capability
+ Deep tech appreciation for complex technical products
- Primary focus is medical/industrial AI, not entertainment
- No gaming or creative AI portfolio companies
- Austrian headquarters may limit Dutch startup interest

Contact: Via website
Website: https://www.apex.ventures

Research Date: 2026-03-03`,
      tags: ['deep-tech', 'medical', 'ai-ml', 'austria', 'pre-seed', 'seed', 'series-a', 'robotics', 'quantum'],
      'investor.fitScore': 45,
      'investor.fitCriteria': {
        preSeedFocus: true,
        gamingSectorActive: false,
        aiDevToolsThesis: true,
        euBased: true,
        relevantPortfolio: false,
        otherScore: 0,
        otherReason: 'Strong AI/ML portfolio but medical/industrial focus'
      },
      status: 'researched'
    }
  },
  {
    id: 'sLvoEPOsCE35dB6bx0cI',
    name: 'Apollo Health Ventures',
    data: {
      notes: `Apollo Health Ventures is a transatlantic early-stage VC firm focused exclusively on transformative healthcare companies targeting age-related diseases and aging itself. Based in Berlin, founded 2016.

Investment Focus: EXCLUSIVELY
- Age-related diseases (Alzheimer's, Parkinson's, Sarcopenia, Frailty, Cancer)
- Biotechnology
- Healthcare data platforms
- Therapeutics and longevity research

Stage: Seed, Early-stage
Check Size: $200K - $2M
Geography: Transatlantic (US/Europe)
Portfolio: Refoxy Pharmaceuticals, Booster Therapeutics (recent investments)

Team:
- Nils Regge (Co-Founder & General Partner) - Serial entrepreneur, co-founder TruVenturo, helped 30+ startups raise funding
- Dr. Ole Mensching (Co-Founder & General Partner) - Serial entrepreneur, HR expert, co-founded CareerTeam (sold)
- Dr. Marianne Mertens (Partner) - 10+ years life sciences, former Wellington Partners, HTGF
- Antoine Boulanger, Ph.D. (Partner)
- Dr. Alexandra Bause (Co-Founder & Venture Partner) - Harvard, longevity research
- Florian Haupt (Partner) - Health tech and health data investments
- Anne Marije van Harten, Ph.D. (Investment Director)
- Chris Shepard, Ph.D. (Venture Partner) - $1.5B+ biotech investments
- Dr. Gerd Hummel (Venture Partner) - 20+ years pharma R&D

Why NOT a fit for LoreWeaver:
- Exclusively healthcare/biotech/longevity focus
- Zero overlap with gaming, entertainment, or AI development tools
- Scientific/medical team has no gaming industry expertise
- Thesis is aging/disease prevention, not creative technology
- Investment process designed for drug development timelines

Contact: info@apollo.vc
Website: https://www.apollo.vc

Research Date: 2026-03-03`,
      tags: ['age-related-diseases', 'biotechnology', 'healthcare', 'longevity', 'germany', 'seed', 'therapeutics'],
      'investor.fitScore': 5,
      'investor.fitCriteria': {
        preSeedFocus: false,
        gamingSectorActive: false,
        aiDevToolsThesis: false,
        euBased: true,
        relevantPortfolio: false,
        otherScore: -10,
        otherReason: 'Biotech/healthcare-only mandate, zero gaming relevance'
      },
      'contact.email': 'info@apollo.vc',
      status: 'disqualified'
    }
  },
  {
    id: 'o2jZHJXorQUkPSMl2M3D',
    name: 'Aquiti Gestion',
    data: {
      notes: `Aquiti Gestion is a leading capital investment firm in the Nouvelle-Aquitaine region of France, supporting high-potential companies from initial concept to industry leader.

Investment Focus:
- Tech startups in South-West France
- Climate & Health sectors (high interest)
- General technology investments

Stage: Pre-seed, Seed, Series A, B, C (full range)
Check Size: €2M lead/co-lead on first round, up to €6M follow-on for portfolio champions
Geography: Nouvelle-Aquitaine region of France (regional focus)
Portfolio: 278 companies total
Team: 10 members

Investment Style:
- Minority shareholder
- Active board presence
- Local VC providing first operational support for seed entrepreneurs

Why NOT a fit for LoreWeaver:
- Strong regional focus on South-West France (Nouvelle-Aquitaine)
- Climate & Health priority sectors, not gaming/entertainment
- Regional development mandate may limit foreign company investment
- No evidence of gaming, AI dev tools, or entertainment investments
- Portfolio skews toward industrial, materials, and services companies

Contact: contact@aquiti.fr
Website: https://www.aquiti.fr

Research Date: 2026-03-03`,
      tags: ['finance', 'fintech', 'b2b', 'climate', 'health', 'france', 'regional', 'pre-seed', 'seed', 'series-a'],
      'investor.fitScore': 15,
      'investor.fitCriteria': {
        preSeedFocus: true,
        gamingSectorActive: false,
        aiDevToolsThesis: false,
        euBased: true,
        relevantPortfolio: false,
        otherScore: -5,
        otherReason: 'Regional France focus, climate/health priority, no gaming'
      },
      'contact.email': 'contact@aquiti.fr',
      status: 'researched'
    }
  },
  {
    id: '88UBGRvNtNGaWym3ty3J',
    name: 'Arāya Ventures',
    data: {
      notes: `Arāya Ventures is a UK-based early-stage investment firm with a $30M global fund backing seed-stage companies across Europe, GCC, and Asia. Notable: 70%+ of portfolio is in AI application companies.

Investment Focus:
- AI (primary - 70%+ portfolio)
- Healthcare
- Fintech
- Future of Work
- Next-generation Commerce

Stage: Pre-seed, Seed, Series A
Funds: Arāya Super Angel Fund ($26.3M), Arāya Global Fund ($30M), Arāya SIE Fund (£15M)
Geography: Europe, GCC (Gulf), Asia
Backed by: British Business Bank (£20M first fund)

Team:
- Rupa Popat (Founder & Managing Partner)
- Mitul Ruparelia (Partner, Global Fund)
- Triin Linamagi (Managing Partner, Arāya SIE Fund)
- Kavit Haria (CEO & Partner, Syndicate)
- Martin Carruthers (Investments, Super Angel Fund)
- Omar Khan (Head of GCC)
- Manny Singh (Investment Principal)
- Vicky Stogiannidou (Investment Associate)

Venture Partners with expertise: Rolf Groenewold (Data & AI), Maya Ghosn Bichara (Health & FinTech), Dr. Oliver Shastri (Health & Life Sciences)

Why MODERATE-HIGH fit for LoreWeaver:
+ 70%+ portfolio in AI applications - strong AI thesis!
+ "Future of Work" focus could include creative productivity tools
+ Pre-seed/seed stage matches LoreWeaver
+ UK-based with European investment mandate
+ British Business Bank backing adds credibility
+ Data & AI venture partner on team
- No specific gaming or entertainment portfolio companies
- AI investments appear enterprise/productivity focused
- GCC/Asia focus may dilute European attention

Contact: Via website
Website: https://araya.ventures

Research Date: 2026-03-03`,
      tags: ['ai', 'healthcare', 'fintech', 'future-of-work', 'united-kingdom', 'pre-seed', 'seed', 'series-a', 'ai-applications'],
      'investor.fitScore': 60,
      'investor.fitCriteria': {
        preSeedFocus: true,
        gamingSectorActive: false,
        aiDevToolsThesis: true,
        euBased: true,
        relevantPortfolio: false,
        otherScore: 5,
        otherReason: '70%+ AI portfolio, Future of Work thesis, but no gaming focus'
      },
      'contact.name': 'Rupa Popat',
      'contact.title': 'Founder & Managing Partner',
      status: 'researched'
    }
  },
  {
    id: 'zrVdB4EMgOHCbmnjrg78',
    name: 'ARC HealthTech Innovation Holding',
    data: {
      notes: `ARC HealthTech Innovation Holding is a Spanish holding company focused on creating, promoting, and driving innovative companies in the biosanitary/healthcare sector. Based in Spain, website primarily in Spanish.

Investment Focus: EXCLUSIVELY Digital Health / Biotechnology
Stage: Pre-seed, Seed (early stage)
Geography: Spain
Mission: "La tecnología al servicio del bienestar de las personas" (Technology at the service of people's wellbeing)

Note: Different from ARC Health Technology Limited (Hong Kong-based R&D company for healthcare electronics)

Why NOT a fit for LoreWeaver:
- Exclusive healthcare/biosanitary focus
- Spain-focused with Spanish-language operations
- No gaming, AI dev tools, or entertainment thesis
- Very limited public information available
- Small operation focused on regional healthcare innovation

Website: http://www.archealth.eu

Research Date: 2026-03-03`,
      tags: ['digital-health', 'spain', 'pre-seed', 'seed', 'healthcare', 'biosanitary'],
      'investor.fitScore': 5,
      'investor.fitCriteria': {
        preSeedFocus: true,
        gamingSectorActive: false,
        aiDevToolsThesis: false,
        euBased: true,
        relevantPortfolio: false,
        otherScore: -10,
        otherReason: 'Healthcare-only mandate, Spain regional focus, no gaming'
      },
      status: 'disqualified'
    }
  },
  {
    id: '4snmd8lgoIpZfse2LuQG',
    name: 'Archangel adVenture',
    data: {
      notes: `Archangel AdVenture is an Italian seed-stage investor focused on financial services, information services, business/productivity software, and food & agriculture technology.

Investment Focus:
- Financial Services
- Information Services (B2C)
- Business/Productivity Software
- Food & Agriculture Tech

Stage: Seed
Check Size: $163K - $235K (small tickets)
Geography: Italy
Portfolio: Kilogram, IllumyFi, Caboto (application software, financial software, business software)

Why LOW fit for LoreWeaver:
+ Business/productivity software is a potential adjacent category
+ Seed stage is appropriate
+ EU-based (Italy)
- Very small check sizes ($163K-$235K) insufficient for meaningful round
- No gaming, entertainment, or AI dev tools focus
- B2C information services focus differs from B2B tools
- Italy-centric with limited portfolio
- No AI or machine learning thesis evident

Website: archangeladventure.it

Research Date: 2026-03-03`,
      tags: ['financial-services', 'information-services-b2c', 'business-productivity-software', 'food-agriculture-tech', 'italy', 'seed'],
      'investor.fitScore': 30,
      'investor.fitCriteria': {
        preSeedFocus: false,
        gamingSectorActive: false,
        aiDevToolsThesis: false,
        euBased: true,
        relevantPortfolio: false,
        otherScore: -2,
        otherReason: 'Business software angle but small checks, no gaming/AI'
      },
      status: 'researched'
    }
  },
  {
    id: 'JXJgkfiKnfmCab05T4SC',
    name: 'Arches Capital',
    data: {
      notes: `Arches Capital is a fast-growing Dutch angel group and pre-seed VC bridging the gap between VCs and traditional angels. Based in Amsterdam, they invest alongside 100+ expert angels with a €22M fund.

Investment Focus: EXCLUSIVELY B2B Software
Stage: Pre-seed (first-check investors, often leading rounds)
Check Size: €250K - €1M
Geography: Netherlands-based, internationally minded
Portfolio: 18+ companies including TheyDo, Eco-movement, The Selection Lab, Space4Good, Konekti, Acumen Cost Analytics

Value Proposition:
- One line on cap table brings expertise + network
- 100+ expert angels activated for intros, advice, sparring
- Arches Academy: leadership program for founders
- €60M+ follow-on capability
- 100% transparency on terms and processes

Team:
- Frank Appeldoorn - Veteran VC with operational finance and IT background

Model: Source, select, invest like VC; engage and inspire like angels

Why STRONG fit for LoreWeaver:
+ Dutch-based! Same market as LoreWeaver
+ B2B software focus directly matches LoreWeaver's product category
+ Pre-seed investor - perfect stage match
+ €250K-€1M check sizes appropriate for pre-seed/seed rounds
+ 100+ expert angels could include gaming/AI expertise
+ Internationally minded despite Dutch base
+ €60M+ follow-on capability for future rounds
+ "TheyDo" portfolio company shows design/UX software interest
- No specific gaming or entertainment portfolio yet
- AI not explicitly mentioned in thesis
- Would need to find gaming-interested angels in network

Contact: Via website (arches.capital)
Website: https://arches.capital

Research Date: 2026-03-03`,
      tags: ['b2b-software', 'netherlands', 'pre-seed', 'angel-network', 'amsterdam', 'dutch'],
      'investor.fitScore': 75,
      'investor.fitCriteria': {
        preSeedFocus: true,
        gamingSectorActive: false,
        aiDevToolsThesis: false,
        euBased: true,
        relevantPortfolio: true,
        otherScore: 10,
        otherReason: 'Dutch B2B software pre-seed investor - strong local fit!'
      },
      'contact.name': 'Frank Appeldoorn',
      status: 'researched'
    }
  }
];

async function updateLeads() {
  console.log('Updating batch 13 leads with research findings...\n');
  
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
  
  console.log('\n=== BATCH 13 SUMMARY ===');
  console.log(`Leads qualified (ICP >= 85): ${qualified}`);
  console.log(`Leads researched: ${researched}`);
  console.log(`Leads disqualified: ${disqualified}`);
  console.log(`Total processed: ${updates.length}`);
}

updateLeads().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
