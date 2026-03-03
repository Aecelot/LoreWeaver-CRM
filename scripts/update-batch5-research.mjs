// Update batch 5 leads (40-49) with research data
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
    id: '6VSKeIrZutYUfttwilTd',
    name: '415 Capital',
    data: {
      notes: `**Research Date:** 2026-03-03

**Overview:** Munich-based MedTech-focused VC. Second fund closed at €150M. Invests in breakthrough medical devices and life-saving medical innovation across Europe, US, and Israel.

**Investment Focus:**
- Medical devices and therapies
- Diagnostics
- Digital Health
- MedTech with AI applications
- Life sciences/biotechnology

**Track Record:**
- Portfolio companies have attracted €600M+ in follow-on financing
- Invests in early-stage through commercial-stage medical innovations

**Team:** Investment team combines backgrounds in investing, entrepreneurship, biomedical engineering, business development/strategy, medicine, and medical device commercialization.

**Check Size:** €150M fund (Fund II), invests across stages

**Fit Analysis:** Pure MedTech/life sciences fund. Zero overlap with gaming, entertainment, or narrative AI. Not a fit.

**Contact:** info@415capital.com`,
      tags: ['medtech', 'life-sciences', 'diagnostics', 'biotechnology', 'healthcare', 'munich'],
      investor: {
        fitScore: 5,
        checkSize: '€2-15M (estimated)',
        stage: 'Early to Commercial Stage',
        thesis: 'MedTech and medical devices only'
      }
    }
  },
  {
    id: 'qyOPDH84QFko5FwRmC8H',
    name: '42CAP',
    data: {
      notes: `**Research Date:** 2026-03-03

**Overview:** Munich-based seed-stage VC founded by entrepreneurs who built two of Europe's largest software companies (eCircle, acquired by Teradata in 2012). Now investing out of 4th fund generation. €50M AUM.

**Investment Focus:**
- B2B software (core focus)
- SaaS
- AI/Machine Learning
- Data analytics
- Deep tech
- Sustainable ventures/clean tech
- Tech- and data-driven businesses

**Check Size:** €0.5-3M initial investments

**Stage:** Pre-seed/Seed

**Team:**
- Thomas Wilke (Co-founder, ex-eCircle founder/Teradata)
- Alex Meyer (Co-founder, ex-CFO eCircle/Teradata, Berkeley MBA)
- Moritz Zimmermann (Venture Partner, Hybris co-founder, Europe's 1st SaaS unicorn, acquired by SAP)
- Julian von Fischer (Principal)
- Johannes/Vincent Pistor (Investment team)

**Fit Analysis:** Strong B2B software/AI focus. However, they focus on data-driven B2B SaaS for enterprise use cases, not gaming or entertainment. No creative/gaming portfolio companies. General AI tools interest, but narrative AI for games is outside their typical thesis. Moderate-low fit.

**Contact:** info@42cap.com
**Website:** https://www.42cap.com/`,
      tags: ['b2b-software', 'saas', 'ai', 'seed-stage', 'munich', 'data-driven'],
      investor: {
        fitScore: 30,
        checkSize: '€0.5-3M',
        stage: 'Pre-seed/Seed',
        thesis: 'B2B software, SaaS, AI/data-driven ventures'
      },
      contact: {
        name: 'Thomas Wilke',
        role: 'Managing Partner',
        linkedin: 'https://www.linkedin.com/in/wilkethomas/'
      }
    }
  },
  {
    id: 'QpOGlL5xr3IH6QFbiuns',
    name: '4BIO Capital',
    data: {
      notes: `**Research Date:** 2026-03-03

**Overview:** London-based life sciences VC focused exclusively on advanced therapies (gene therapy, cell therapy, RNA-based therapy, microbiome). Three funds raised.

**Investment Focus:**
- Gene therapy
- Cell therapy
- RNA-based therapies
- Targeted therapies
- Microbiome
- Advanced therapies addressing high unmet medical and social needs

**Track Record:**
- Founded Trogenix (£70M Series A, 2025)
- Raised $50M for cell/gene therapy fund (2020)
- Focus on breakthrough therapies for diabetes, rheumatoid arthritis, aggressive cancers

**Fund:** 4BIO Ventures III focused on private companies developing advanced therapies

**Fit Analysis:** Ultra-specialized biotech fund. Invests only in life sciences/medical therapies. Zero relevance to gaming, entertainment, or AI tools. Not a fit.

**Contact:** info@4biocapital.com
**Website:** https://www.4biocapital.com/`,
      tags: ['gene-therapy', 'cell-therapy', 'biotech', 'life-sciences', 'london', 'specialized-fund'],
      investor: {
        fitScore: 5,
        checkSize: '€5-20M (estimated)',
        stage: 'Seed to Series B',
        thesis: 'Advanced therapies (gene/cell/RNA) only'
      }
    }
  },
  {
    id: '4lQIGoypHaPWncqe1aYf',
    name: '4Founders Capital',
    data: {
      notes: `**Research Date:** 2026-03-03

**Overview:** Barcelona-based VC founded 2017. Team has 10+ years VC experience across Silicon Valley, USA, Spain, and UK. Invested over $200M in 50+ startups across 15+ countries. Recently closed Fund III at €70M.

**Investment Focus (Generalist with verticals):**
- Fintech
- Business services
- Traveltech
- Cybersecurity
- Developer tools
- Capital-efficient B2B/B2C businesses
- AI applications

**Track Record:**
- Portfolio of 57 companies (Tracxn data)
- Notable investments: Easygoband, Improfit
- Founded/managed CVC of Bank Sabadell
- Managed micro VC fund with 4.2x TVPI

**Fund III:** €70M (above target), maintains generalist thesis

**Fit Analysis:** Generalist fund with fintech/business services focus. No gaming or entertainment track record. Developer tools vertical is adjacent but not closely aligned. Low-moderate fit.

**Contact:** info@4founderscapital.com
**Website:** https://www.4founderscapital.com/`,
      tags: ['fintech', 'business-services', 'developer-tools', 'generalist', 'spain', 'seed'],
      investor: {
        fitScore: 25,
        checkSize: '€500K-3M (estimated)',
        stage: 'Seed to Series A',
        thesis: 'Generalist with fintech, dev tools, business services focus'
      }
    }
  },
  {
    id: 'lR0zS55cZzXWOhEpCty3',
    name: '4FOX Ventures',
    data: {
      notes: `**Research Date:** 2026-03-03

**Overview:** Swiss healthcare and technology-focused VC operating since 2017. Manages portfolio of 10+ highly innovative companies in Switzerland.

**Investment Focus:**
- Healthcare
- Healthcare technology
- Swiss companies specifically
- Early-stage innovation

**Team:** Dedicated healthcare professionals with deep operational, technological, and investment expertise.

**Geographic Focus:** Switzerland-only (Swiss companies exclusively)

**Fit Analysis:** Healthcare-only fund focused exclusively on Swiss companies. Geographic restriction (Switzerland) and sector mismatch (healthcare). Not a fit.

**Contact:** Via website
**Website:** https://4fox-ventures.com/`,
      tags: ['healthcare', 'healthtech', 'switzerland', 'early-stage', 'regional-fund'],
      investor: {
        fitScore: 10,
        checkSize: 'Unknown',
        stage: 'Early-stage',
        thesis: 'Swiss healthcare and technology only'
      }
    }
  },
  {
    id: 'ixXe1XWPX0mVxAmrEvp1',
    name: '4impact capital',
    data: {
      notes: `**Research Date:** 2026-03-03

**Overview:** The Hague-based impact VC investing in European Tech4Good startups. Fund II closed at €68M (Nov 2024). SFDR Article 9 fund backed by EIF and Invest-NL. Founded 2019 by Ali Najafbagy and Pauline Wink.

**Investment Focus:**
- Digital tech + sustainability/impact (dual mandate)
- Tech4Good
- Climate tech (energy, clean tech)
- Circular economy
- Social impact technology
- Northwestern Europe focus

**Portfolio (sustainability/climate tech):**
- Exnaton (AI platform for energy)
- Greenshift (cloud sustainability)
- Suena Energy (energy trading)
- ETPA (energy trading)
- Cool Gradient (data center cooling)
- Deft Power (energy grid flexibility)
- Myrspoven (building efficiency)
- Tvarit (zero-waste manufacturing)
- Carbon Future (CO2 removal)
- Circularise (circular supply chains)
- Carbon Equity (climate investing)
- The Fabricant (digital-only fashion)
- Satelligence (deforestation tracking)

**Fit Analysis:** Impact/sustainability-first fund. All portfolio companies are climate tech, circular economy, or social impact. No gaming, entertainment, or creative tech. Not a fit.

**Contact:** Via website
**Website:** https://www.4impact.vc/`,
      tags: ['impact-investing', 'climate-tech', 'sustainability', 'netherlands', 'tech4good'],
      investor: {
        fitScore: 15,
        checkSize: '€500K-3M (estimated)',
        stage: 'Seed to Series A',
        thesis: 'Digital technology for sustainability and impact only'
      },
      contact: {
        name: 'Ali Najafbagy',
        role: 'Co-founder',
        linkedin: ''
      }
    }
  },
  {
    id: 'vXrN37cvGr1WsMZEak96',
    name: '4PM Ventures',
    data: {
      notes: `**Research Date:** 2026-03-03

**Overview:** Latvia-based VC focused exclusively on healthtech. Runs "Future Health Venture Lab" — a venture builder model focused on building healthtech platforms.

**Investment Focus:**
- Digital therapy
- Personal medical assistants
- Rehabtech
- Diagnostics solutions
- Home healthcare
- Men's health
- Femtech
- Agetech/silvertech

**Approach:** Platform-focused venture builder model. Emphasizes building healthtech platforms as core competitive advantage vs traditional VCs.

**Fit Analysis:** Pure healthtech fund with specific focus on patient-facing digital health solutions. Zero relevance to gaming, entertainment, or narrative AI. Not a fit.

**Contact:** Via website
**Website:** https://4pmventures.com/`,
      tags: ['healthtech', 'digital-health', 'femtech', 'agetech', 'venture-builder', 'latvia'],
      investor: {
        fitScore: 5,
        checkSize: 'Unknown',
        stage: 'Early-stage (venture builder)',
        thesis: 'Healthtech platforms only (digital therapy, diagnostics, etc.)'
      }
    }
  },
  {
    id: 'Vns9jrq2fq5q1hsgPxBM',
    name: '4u-ventures',
    data: {
      notes: `**Research Date:** 2026-03-03

**Overview:** Austria-based seed-stage VC founded 2020 in Pfaffstätten. Invests in early-stage Austrian startups. Small fund with regional focus.

**Investment Focus:**
- High tech
- Enterprise applications
- Austrian startups specifically

**Portfolio:** Repark (PropTech, Vienna) — six-figure investments

**Co-investors:** Austria Wirtschaftsservice (government agency)

**Fit Analysis:** Small regional fund focused on Austrian startups only. Geographic restriction and no gaming/entertainment track record. Not a fit.

**Contact:** office@4u-ventures.com
**Website:** https://4u-ventures.com/`,
      tags: ['austria', 'seed-stage', 'proptech', 'enterprise-apps', 'regional-fund'],
      investor: {
        fitScore: 15,
        checkSize: '€100K-500K (estimated)',
        stage: 'Seed',
        thesis: 'Austrian tech startups (high tech, enterprise apps)'
      }
    }
  },
  {
    id: 'hflDBjgGQVi2Ozs5symq',
    name: '505 Games',
    data: {
      notes: `**Research Date:** 2026-03-03

**⚠️ NOTE: This is a GAME PUBLISHER, not an investor. Should be recategorized as type=publisher or type=partner.**

**Overview:** Global video game publisher based in Milan, Italy. Subsidiary of Digital Bros (listed on Italian stock exchange). Founded as publishing arm, publishes games across all ages and skill levels.

**Publishing Portfolio:**
- Assetto Corsa (racing sim franchise)
- Bloodstained
- Eiyuden Chronicle
- Ghostrunner
- Puzzle Quest series
- Death Stranding (publishing partner)
- Control (505 published)

**Corporate Structure:**
- Parent: Digital Bros (Italian stock exchange)
- Subsidiaries: Supernova Games Studios (Milan, racing sims), Nesting Games (Quebec, AAA RPGs)
- Acquisitions: D3 Go! (2022, including Puzzle Quest IP), DR Studios (2015), 49% stake in Ovosonico, Kunos Simulazioni (2017)

**Layoffs:** Nov 2023 Digital Bros announced ~30% global layoffs

**Fit Analysis:** EXCELLENT FIT for LoreWeaver Architect as a **customer/partner** (not investor). They publish narrative games and have internal/external development studios. Should be moved to publisher pipeline, not investor pipeline.

**Contact:** Via website contact form
**Website:** https://505games.com/`,
      tags: ['italy', 'aa', 'publisher', 'narrative', 'architect-icp', 'needs-recategorization'],
      type: 'publisher', // Flag for recategorization
      investor: {
        fitScore: 80,
        checkSize: 'N/A - Publisher, not investor',
        stage: 'N/A',
        thesis: 'Game publishing (AA/AAA titles)'
      },
      status: 'qualified' // They qualify as a potential customer
    }
  },
  {
    id: '4NvKOQ7lV6KnaKslnhuf',
    name: '55 North',
    data: {
      notes: `**Research Date:** 2026-03-03

**Overview:** Danish-led VC raising €300M fund exclusively for quantum technologies. First close at €134M. World's largest dedicated quantum fund. Cornerstone investor: Novo Holdings.

**Investment Focus:**
- Quantum computing
- Quantum sensing
- Quantum timing
- Quantum communication
- Quantum technologies broadly

**Track Record:**
- IQM investment (€275M Series B — largest European quantum round ever)
- Connected to Novo Nordisk Foundation quantum initiatives
- QuNorth establishment (€80M)

**Thesis:** At quantum technology inflection point, backing companies commercializing quantum applications.

**Fit Analysis:** Ultra-specialized quantum technology fund. Zero relevance to gaming, entertainment, or narrative AI. Not a fit.

**Contact:** info@55n.vc
**Website:** https://55n.vc/`,
      tags: ['quantum-technology', 'deep-tech', 'denmark', 'specialized-fund', 'novo-holdings'],
      investor: {
        fitScore: 5,
        checkSize: '€5-50M+ (large fund)',
        stage: 'Seed to Series B+',
        thesis: 'Quantum technologies only'
      }
    }
  }
];

async function updateLeads() {
  console.log('Updating batch 5 leads (40-49) with research data...\n');
  
  for (const update of updates) {
    console.log(`Updating ${update.name} (${update.id})...`);
    
    try {
      const updateData = {
        notes: update.data.notes,
        tags: update.data.tags,
        investor: update.data.investor,
        ...(update.data.contact ? { contact: update.data.contact } : {}),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };
      
      // Special handling for 505 Games - flag for recategorization
      if (update.data.type) {
        console.log(`  ⚠️ Flagged for recategorization to: ${update.data.type}`);
      }
      if (update.data.status) {
        updateData.status = update.data.status;
      }
      
      await db.collection('leads').doc(update.id).update(updateData);
      console.log(`  ✓ Updated - ICP Score: ${update.data.investor.fitScore}`);
    } catch (err) {
      console.error(`  ✗ Error: ${err.message}`);
    }
  }
  
  console.log('\nBatch 5 update complete!');
  
  // Summary
  console.log('\n=== SUMMARY ===');
  const qualified = updates.filter(u => u.data.investor.fitScore >= 85);
  console.log(`Leads processed: ${updates.length}`);
  console.log(`Leads qualifying (ICP >= 85): ${qualified.length}`);
  
  if (qualified.length > 0) {
    console.log('\nQualified leads:');
    qualified.forEach(q => console.log(`  - ${q.name}: ICP ${q.data.investor.fitScore}`));
  } else {
    console.log('\nNo investor leads met qualification threshold (ICP >= 85)');
  }
  
  console.log('\nICP Score distribution:');
  updates.sort((a, b) => b.data.investor.fitScore - a.data.investor.fitScore)
    .forEach(u => console.log(`  ${u.data.investor.fitScore}: ${u.name}`));
  
  // Special notes
  console.log('\n=== SPECIAL NOTES ===');
  console.log('505 Games: Should be recategorized as PUBLISHER (not investor)');
  console.log('  → Excellent Architect customer prospect (ICP 80)');
  console.log('  → Already marked as qualified in CRM');
}

updateLeads().then(() => process.exit(0)).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
