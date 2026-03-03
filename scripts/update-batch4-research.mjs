// Update batch 4 leads (30-39) with research data
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
    id: '1Y5uCtahgiZqOjlNXgvn',
    name: 'Agile Partners',
    data: {
      notes: `**Research Date:** 2026-03-02

**Overview:** Berlin-based early-stage VC founded by the team behind Astaro and Ocedo. They describe themselves as "software founders backing software founders" and invest their own capital long-term without fund cycles.

**Investment Focus:**
- Early-stage/seed B2B software startups
- Technical teams (often first backer)
- AI, business intelligence, malware detection, social media tools

**Portfolio Highlights:**
- ForeAI (AI software testing, Zürich)
- ZebraBI (Business intelligence, Ljubljana)
- Inlyse (Malware detection, Karlsruhe)
- understand.ai (Data labeling, acquired by Dspace)
- Boxcryptor (Cloud encryption, acquired by Dropbox)

**Offices:** Berlin + Karlsruhe

**Fit Analysis:** General B2B software/AI focus - no gaming or entertainment vertical. They invest in technical AI tools but narrative AI for games is outside their typical portfolio. Low fit.

**Contact:** hello@agile.vc`,
      tags: ['b2b-software', 'ai', 'early-stage', 'founder-fund', 'berlin'],
      investor: {
        fitScore: 35,
        checkSize: '€100K-500K (estimated)',
        stage: 'Pre-seed/Seed',
        thesis: 'B2B software, technical founders'
      }
    }
  },
  {
    id: '1YUqUKY5ddTyHJhsaka1',
    name: 'Quantonation',
    data: {
      notes: `**Research Date:** 2026-03-02

**Overview:** Global early-stage VC fund investing in breakthrough technologies based on advances in physics and computing. Pioneer in quantum technology investing, founded in France.

**Investment Focus:**
- Quantum computing (Pasqal, Quobly, ORCA Computing, Quandela)
- Quantum communications & cryptography
- Quantum sensing & imaging
- Deep physics technologies
- Only invests in physics-based/quantum startups

**Portfolio Highlights:**
- Pasqal (quantum processors, neutral atoms)
- Diraq (silicon quantum processors)
- Qblox (quantum control stacks)
- ORCA Computing (photonic quantum)
- CryptoNext Security (post-quantum cryptography)

**Geographic Scope:** Europe, North America, Asia-Pacific

**Fit Analysis:** Highly specialized quantum/physics fund. Zero relevance to gaming or narrative AI. Not a fit.

**Contact:** contact@quantonation.com
**LinkedIn Contact:** Christophe Jurczak (Founder)`,
      tags: ['quantum-computing', 'deep-tech', 'physics', 'specialized-fund'],
      investor: {
        fitScore: 10,
        checkSize: '€1-5M (Series A/B)',
        stage: 'Seed to Series B',
        thesis: 'Quantum technologies and deep physics only'
      },
      contact: {
        name: 'Christophe Jurczak',
        role: 'Founder',
        linkedin: 'https://www.linkedin.com/in/christophe-jurczak/'
      }
    }
  },
  {
    id: '1a5zBhXSmb6RA7oKtJzt',
    name: 'Greencode Ventures',
    data: {
      notes: `**Research Date:** 2026-03-02

**Overview:** Finland-based VC focused exclusively on green transition/climate tech. First green transition fund in Finland. Raised €70M, targeting digital solutions for sustainability.

**Investment Focus:**
- Green Energy (clean energy systems, distribution, consumption)
- Green Mobility (electrification, accessibility)
- Green Industries (manufacturing efficiency, circular economy)
- Green Cities (construction, carbon neutral buildings)
- Digital-first sustainability solutions only

**Portfolio:** Cronvall (B2B procurement), FLEXECHARGE, Renow, enterprise applications for sustainability

**Geographic Focus:** Pan-European with Nordic/DACH emphasis

**AUM:** €70M

**Fit Analysis:** Pure climate/sustainability tech fund. No gaming, entertainment, or AI narrative focus. Not a fit.

**Contact:** hello@greencode.vc
**LinkedIn Contact:** Tomi Väisänen (Managing Partner)`,
      tags: ['climate-tech', 'green-transition', 'sustainability', 'finland', 'specialized-fund'],
      investor: {
        fitScore: 10,
        checkSize: '€500K-3M',
        stage: 'Seed to Series A+',
        thesis: 'Digital-first green transition solutions only'
      },
      contact: {
        name: 'Tomi Väisänen',
        role: 'Managing Partner',
        linkedin: 'https://www.linkedin.com/in/tjvapola/'
      }
    }
  },
  {
    id: '1cyO1d73fujB14xUniEE',
    name: 'Firgun Ventures',
    data: {
      notes: `**Research Date:** 2026-03-02

**Overview:** UK-based "quantum-first" VC firm focused on Series A/B scale-ups in quantum technologies. Specialized deep-tech fund.

**Investment Focus:**
- Quantum computing
- Quantum communications & cryptography
- Quantum sensing & imaging
- Applications: pharma, chemistry, energy, finance, aerospace
- Only quantum technology companies

**Thesis:** At the "quantum inflection point" - targeting $1T+ potential market. Invests in scale-ups not early stage.

**Stage:** Series A/B (later than LoreWeaver's current stage)

**Fit Analysis:** Exclusively quantum technology focused, later stage than LoreWeaver needs. Zero relevance to gaming or narrative AI. Not a fit.

**Contact:** info@firgun.vc
**LinkedIn Contact:** Dr. Kris Naudts (Partner)`,
      tags: ['quantum-technology', 'deep-tech', 'series-a', 'series-b', 'specialized-fund'],
      investor: {
        fitScore: 10,
        checkSize: '€5-15M',
        stage: 'Series A/B',
        thesis: 'Quantum technologies at scale-up stage only'
      },
      contact: {
        name: 'Dr. Kris Naudts',
        role: 'Partner',
        linkedin: 'https://www.linkedin.com/in/dr-kris-naudts-md-phd-10403838/'
      }
    }
  },
  {
    id: '1eIxBecV2JY7eJaydnq9',
    name: 'Schenker Ventures',
    data: {
      notes: `**Research Date:** 2026-03-02

**Overview:** Corporate Venture Capital arm of DB Schenker (logistics giant). Founded 2021 in Essen, Germany. Focuses on logistics and supply chain digitization.

**Investment Focus:**
- Logistics startups
- Supply chain technology
- B2B XaaS
- Digital business models in logistics
- Seed to Series B

**Portfolio:** Warehousing1 (e-commerce fulfillment)

**Check Size:** €200K-5M

**Note:** Website appears to be down/misconfigured (404 error during research)

**Fit Analysis:** Corporate VC focused exclusively on logistics/supply chain. Zero relevance to gaming, entertainment, or narrative AI. Not a fit.

**Contact:** schenkerventures@dbschenker.com
**LinkedIn Contact:** Niklas Lechner`,
      tags: ['cvc', 'logistics', 'supply-chain', 'b2b', 'corporate-venture'],
      investor: {
        fitScore: 5,
        checkSize: '€200K-5M',
        stage: 'Seed to Series B',
        thesis: 'Logistics and supply chain digitization only'
      },
      contact: {
        name: 'Niklas Lechner',
        role: 'Investment Manager',
        linkedin: 'https://www.linkedin.com/in/niklaslechner/'
      }
    }
  },
  {
    id: '1iukGFysQDpPotfp8H1g',
    name: 'ROCH Ventures',
    data: {
      notes: `**Research Date:** 2026-03-02

**Overview:** Luxembourg-based VC focused exclusively on Travel & Hospitality tech. Founded by former BCG partners. 60+ years combined experience in travel industry.

**Investment Focus (6 verticals):**
- Corporate Travel
- Lodging
- Travel-Tech (AI agents, NDC, biometrics)
- Sustainability in travel
- Digital platforms
- Experiential travel

**Team:** Bobby Demri (Managing Partner, ex-BCG), Kai Kramer (Managing Partner), Ludger Kuebel-Sorger (Founder, BCG Senior Partner Emeritus)

**Portfolio:** Apartool (corporate travel), RAUS (sustainable lodging)

**Geographic Focus:** Europe and Israel

**Fit Analysis:** Highly specialized in travel & hospitality only. Zero relevance to gaming or narrative AI. Not a fit.

**Contact:** Via website form
**LinkedIn Contact:** Ludger Kuebel-Sorger (Chair of Investment Committee)`,
      tags: ['travel-tech', 'hospitality', 'specialized-fund', 'bcg-alumni'],
      investor: {
        fitScore: 10,
        checkSize: '€1-5M (estimated)',
        stage: 'Seed to Series A',
        thesis: 'Travel and hospitality tech only'
      },
      contact: {
        name: 'Ludger Kuebel-Sorger',
        role: 'Founder & Managing Partner, Chair of Investment Committee',
        linkedin: 'https://www.linkedin.com/in/ludger-kuebel-sorger-430160/'
      }
    }
  },
  {
    id: '1jmUXKgSdDUbysKJ36Fy',
    name: 'Belbo Ventures',
    data: {
      notes: `**Research Date:** 2026-03-02

**Overview:** Spain-based mobility-focused investment and consulting firm. Combines investment with management consulting, buy-sell advisory, and project financing.

**Services:**
- Transform (mobility strategies)
- Management Consulting
- Buy-Sell & Spin-Off advisory
- Co-Investment in mobility startups
- Project Financing
- People/HR consulting

**Note:** More of a consulting firm with investment capability than pure VC

**Fit Analysis:** Mobility/automotive sector only. Not a traditional VC fund. Zero relevance to gaming or narrative AI. Not a fit.

**Contact:** Innovation@belboventures.com`,
      tags: ['mobility', 'consulting', 'automotive', 'spain', 'hybrid-model'],
      investor: {
        fitScore: 10,
        checkSize: 'Unknown (co-investment model)',
        stage: 'Various',
        thesis: 'Mobility and automotive only'
      }
    }
  },
  {
    id: '1lIx59DdjB96IN9VUvhI',
    name: 'Cyverse Capital',
    data: {
      notes: `**Research Date:** 2026-03-02

**Overview:** Zurich-based VC focused exclusively on Israeli cybersecurity startups. Builds on Cyverse AG (distributes Israeli cyber solutions to DACH enterprises). Brings DACH-based senior executive investors.

**Founder:** Shira Kaplan (8200 Unit alumni, Harvard BA, St. Gallen MBA, WEF Young Global Leader 2017)

**Investment Focus:**
- Israeli cybersecurity startups only
- DACH-region strategic value-add
- Senior executive angel syndicate model

**Advisory Board:** Senior executives from Liontrust, Bystronic Group, Eurizon Capital, SDA Bocconi

**Fit Analysis:** Ultra-specialized in Israeli cybersecurity only. Geographic and sector mismatch. Not a fit.

**Contact:** sk@cyversecapital.com (Shira Kaplan)`,
      tags: ['cybersecurity', 'israeli-startups', 'dach', 'angel-syndicate', 'specialized-fund'],
      investor: {
        fitScore: 10,
        checkSize: '€100K-1M (estimated, angel syndicate)',
        stage: 'Seed',
        thesis: 'Israeli cybersecurity startups with DACH potential only'
      },
      contact: {
        name: 'Shira Kaplan',
        role: 'Founder & CEO',
        email: 'sk@cyversecapital.com',
        linkedin: ''
      }
    }
  },
  {
    id: '1nxw564NgHM4FZ86cG5F',
    name: 'Supersonic Ventures',
    data: {
      notes: `**Research Date:** 2026-03-02

**Overview:** Oslo-based VC investing in B2B SaaS startups. Founded 2020. Unique hybrid model combining incubator, accelerator, and scale-up services.

**Track Record:** 
- 40M NOK (€3M) MRR generated
- 500M NOK (€50M) ARR across portfolio

**Investment Focus:**
- B2B SaaS only
- Early-stage
- Hands-on support (training, expertise, network)

**Portfolio:** Flextribe (10x revenue growth)

**Team:** Mark Boje Jensen (Managing Partner, serial entrepreneur), Daniel Bekken, Thomas Johansson, Nicolas Gronslet, Oddbjørn Rogne

**Fund 2:** Launched Sept 2023

**Fit Analysis:** B2B SaaS focus could theoretically include gaming tools, but no gaming or entertainment track record. General SaaS fund without creative/gaming expertise. Low fit.

**Contact:** Via website form
**LinkedIn Contact:** Thomas Johansson (Partner)`,
      tags: ['b2b-saas', 'accelerator', 'norway', 'hands-on'],
      investor: {
        fitScore: 30,
        checkSize: '€100K-500K (estimated)',
        stage: 'Pre-seed/Seed',
        thesis: 'B2B SaaS with accelerator support'
      },
      contact: {
        name: 'Thomas Johansson',
        role: 'Partner',
        linkedin: 'https://www.linkedin.com/in/thomas-johansson-2511968a/'
      }
    }
  },
  {
    id: '1pybxz8NGvWcbej7A63b',
    name: 'Portfolion Zrt.',
    data: {
      notes: `**Research Date:** 2026-03-02

**Overview:** Major CEE-focused VC and Growth Equity fund manager based in Budapest, Hungary. Backed by OTP Bank (Hungary's largest bank). Founded 2010.

**AUM:** €440M across 6 funds

**Investment Focus:**
- Central and Eastern European startups
- Pre-Seed to Series B
- Generalist tech (no specific sector focus)
- All business lifecycle stages

**Notable Exits:**
- Tresorit (encrypted cloud storage)
- SEON (fraud prevention, raised $150M+)
- Banzai Cloud (acquired)
- Szallas.hu (travel platform)

**Co-investors:** Day One Capital, others

**Fit Analysis:** Large generalist CEE fund. No gaming/entertainment focus or portfolio companies. Geographic focus (CEE) doesn't align well with LoreWeaver's primarily Western European network. Moderate-low fit.

**Contact:** info@portfolion.hu
**LinkedIn Contact:** Zsolt Mihaly`,
      tags: ['cee', 'generalist', 'growth-equity', 'hungary', 'otp-bank'],
      investor: {
        fitScore: 25,
        checkSize: '€500K-10M',
        stage: 'Pre-Seed to Series B',
        thesis: 'CEE tech companies across sectors'
      },
      contact: {
        name: 'Zsolt Mihaly',
        role: 'Partner',
        linkedin: 'https://www.linkedin.com/in/zsolt-mihaly/'
      }
    }
  }
];

async function updateLeads() {
  console.log('Updating batch 4 leads with research data...\n');
  
  for (const update of updates) {
    console.log(`Updating ${update.name} (${update.id})...`);
    
    try {
      await db.collection('leads').doc(update.id).update({
        notes: update.data.notes,
        tags: update.data.tags,
        investor: update.data.investor,
        ...(update.data.contact ? { contact: update.data.contact } : {}),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log(`  ✓ Updated - ICP Score: ${update.data.investor.fitScore}`);
    } catch (err) {
      console.error(`  ✗ Error: ${err.message}`);
    }
  }
  
  console.log('\nBatch 4 update complete!');
  
  // Summary
  console.log('\n=== SUMMARY ===');
  const qualified = updates.filter(u => u.data.investor.fitScore >= 85);
  console.log(`Leads processed: ${updates.length}`);
  console.log(`Leads qualifying (ICP >= 85): ${qualified.length}`);
  
  if (qualified.length > 0) {
    console.log('\nQualified leads:');
    qualified.forEach(q => console.log(`  - ${q.name}: ICP ${q.data.investor.fitScore}`));
  } else {
    console.log('\nNo leads met qualification threshold (ICP >= 85)');
    console.log('\nICP Score distribution:');
    updates.sort((a, b) => b.data.investor.fitScore - a.data.investor.fitScore)
      .forEach(u => console.log(`  ${u.data.investor.fitScore}: ${u.name}`));
  }
}

updateLeads().then(() => process.exit(0)).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
