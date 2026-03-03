// Update batch 6 leads (50-59) with research data
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
    id: 'A7aIve4hIWqFYf2BntUW',
    name: '9Yards Capital',
    data: {
      notes: `**Research Date:** 2026-03-03

**Overview:** US-based growth stage technology investment firm focused on critical infrastructure for foundational industries. Targets tech-enabled consumer and enterprise fintech/logistics at growth stage.

**Investment Focus:**
- Fintech/Insurtech
- Cyber/Defense
- Supply Chain
- Software infrastructure
- Logistics technology

**Portfolio Highlights:**
- Grammarly (productivity software)
- Robinhood (fintech - unicorn)
- Coinbase (crypto - unicorn)
- Carta (cap table management - unicorn)
- Doppel (most recent - Series C)
- iVerify (network management)
- 13 unicorns in portfolio total
- 4 IPOs, 1 acquisition

**Stage:** Series A, B, C (growth stage - NOT early stage)
**Check Size:** $100K - $3M

**Fit Analysis:** Growth-stage fintech/infrastructure fund. Wrong stage for LoreWeaver (pre-seed). No gaming or entertainment focus. Portfolio is pure fintech/enterprise. Not a fit.

**Contact:** info@9yardscapital.com
**Website:** https://www.9yardscapital.com/`,
      tags: ['growth-stage', 'fintech', 'software', 'us-based', 'series-a-plus'],
      investor: {
        fitScore: 2,
        fitCriteria: {
          preSeedFocus: false,
          gamingSectorActive: false,
          aiDevToolsThesis: false,
          euBased: false,
          relevantPortfolio: false,
          otherScore: 2,
          otherReason: 'Software focus but wrong stage and no EU/gaming alignment'
        },
        checkSize: '$100K - $3M',
        stage: 'Series A-C (growth)',
        thesis: 'Critical infrastructure for foundational industries'
      }
    }
  },
  {
    id: 'rNI0uoTIFE6Ethj0p5CQ',
    name: 'A11 Venture',
    data: {
      notes: `**Research Date:** 2026-03-03

**Overview:** Italian VC (Italy) focused on Industry 4.0, robotics, and industrial technology. Organizes "Pitch Day" events twice yearly to connect startups with VCs, family offices, and business angels.

**Investment Focus:**
- Industry 4.0
- Robotics & Automation
- Mechatronics
- Cleantech
- Cybersecurity
- Life Science
- Digital transformation
- New materials

**Approach:** Traditional pitch-day format. Startups present to panel including Federico Davini and Giovanni Polidori.

**Stage:** Pre-Seed, Seed, Series A, Series B
**Check Size:** €100K–€1.5M

**Fit Analysis:** Industrial/manufacturing tech focus. While they are EU-based and invest at pre-seed, their thesis is purely Industry 4.0 and hardware/robotics. No gaming, entertainment, or creative technology track record. Weak fit.

**Contact:** info@a11venture.it
**Website:** http://www.a11venture.it`,
      tags: ['industry-4.0', 'robotics', 'automation', 'italy', 'cleantech', 'industrial'],
      investor: {
        fitScore: 4,
        fitCriteria: {
          preSeedFocus: true, // +3
          gamingSectorActive: false,
          aiDevToolsThesis: false,
          euBased: true, // +1
          relevantPortfolio: false,
          otherScore: 0,
          otherReason: 'Pre-seed EU fund but industrial/robotics only'
        },
        checkSize: '€100K–€1.5M',
        stage: 'Pre-Seed to Series B',
        thesis: 'Industry 4.0, robotics, automation, cleantech'
      },
      contact: {
        name: 'Federico Davini',
        role: 'Partner'
      }
    }
  },
  {
    id: 'Y6zqKOPuTkkuHc7Hj6eY',
    name: 'AAA Venture Capital',
    data: {
      notes: `**Research Date:** 2026-03-03

**Overview:** Munich, Germany-based pre-seed/seed VC. Unique approach: uses AI-backed psychological assessments to identify founder talent regardless of background. Team is consortium of scientists, entrepreneurs, and investors.

**Investment Focus:**
- "All scalable tech businesses" (generalist)
- Focus on founder quality over sector
- AI/data-driven founder assessment
- Emphasize cognitive abilities, emotional intelligence, personality traits

**Philosophy:** "Talent knows no boundaries" — prioritize hidden talent over pedigree. Disinterested in GPAs or prestigious employers.

**Stage:** Pre-Seed, Seed
**Check Size:** $200K - $800K

**Fit Analysis:** Generalist EU seed fund with novel AI-based assessment methodology. While they use AI (for screening), they don't specifically invest in AI or gaming. Stage and geography fit, but no sector alignment. Moderate-low fit.

**Contact:** Via website
**Website:** https://aaa.vc/`,
      tags: ['generalist', 'pre-seed', 'seed', 'germany', 'founder-focused', 'ai-screening'],
      investor: {
        fitScore: 4,
        fitCriteria: {
          preSeedFocus: true, // +3
          gamingSectorActive: false,
          aiDevToolsThesis: false, // They USE AI but don't invest in it specifically
          euBased: true, // +1
          relevantPortfolio: false,
          otherScore: 0,
          otherReason: 'Generalist pre-seed fund, no gaming/AI thesis'
        },
        checkSize: '$200K - $800K',
        stage: 'Pre-Seed, Seed',
        thesis: 'Generalist (all scalable tech), founder-quality focused'
      }
    }
  },
  {
    id: 'dc4A0s2rsWAs41HynlIT',
    name: 'Abac Capital',
    data: {
      notes: `**Research Date:** 2026-03-03

**Overview:** Barcelona, Spain-based private equity/VC with impact focus. Values-driven investing: "create sustainable value in our businesses and communities."

**Investment Focus:**
- Consumer
- Fintech
- Software
- Impact/sustainability lens

**Values:** Integrity, transparency, excellence, entrepreneurship, accountability, respect, social conscience.

**Stage:** Seed (primarily)
**Check Size:** Unknown

**Fit Analysis:** Spanish PE/VC with consumer/fintech/software focus. EU-based but no pre-seed, no gaming or entertainment, no AI/dev tools thesis. Values-driven approach may be complementary but not directly aligned. Low fit.

**Contact:** enquiries@abaccapital.com
**Website:** https://www.abaccapital.com`,
      tags: ['consumer', 'fintech', 'software', 'spain', 'impact-investing', 'private-equity'],
      investor: {
        fitScore: 1,
        fitCriteria: {
          preSeedFocus: false, // Seed only
          gamingSectorActive: false,
          aiDevToolsThesis: false,
          euBased: true, // +1
          relevantPortfolio: false,
          otherScore: 0,
          otherReason: 'EU seed fund but consumer/fintech focus, no early-stage or gaming'
        },
        checkSize: 'Unknown',
        stage: 'Seed',
        thesis: 'Consumer, fintech, software with impact lens'
      }
    }
  },
  {
    id: 'etvRaGfmdSn3enmPbSCk',
    name: 'ABCXchange',
    data: {
      notes: `**Research Date:** 2026-03-03

**⚠️ INVALID LEAD: This is NOT an investment firm. ABCXchange appears to be a B2B SaaS product (AI.fred) targeting venture capitalists — a productivity/CRM tool for VC analysts.**

**What it actually is:**
- Software product called "AI.fred"
- AI-based matching and follow-up automation
- Designed for VC analysts
- Technology stack for venture capitalists

**Recommendation:** Remove from investor pipeline. This is a software product/company, not an investor. Could be interesting as a potential partner or comparison, but not a funding source.

**Contact:** N/A
**Website:** https://www.abcxchange.com`,
      tags: ['invalid-lead', 'software-product', 'vc-tools', 'not-investor', 'needs-removal'],
      investor: {
        fitScore: 0,
        fitCriteria: {
          preSeedFocus: false,
          gamingSectorActive: false,
          aiDevToolsThesis: false,
          euBased: false,
          relevantPortfolio: false,
          otherScore: 0,
          otherReason: 'NOT AN INVESTOR - software product targeting VCs'
        },
        checkSize: 'N/A',
        stage: 'N/A',
        thesis: 'N/A - Not an investment firm'
      },
      status: 'disqualified'
    }
  },
  {
    id: 'ECV1IO7mt0qDITXIJZ1K',
    name: 'Abingworth',
    data: {
      notes: `**Research Date:** 2026-03-03

**Overview:** UK-based life sciences VC with 35+ years experience (since 1987). One of Europe's oldest biotech investors. Invested in 100+ biopharma companies across US and Europe.

**Investment Focus:**
- Life sciences ONLY
- Biotechnology
- Biopharma
- Healthcare/therapeutics
- Drug development

**Approach:**
- Early-stage biotech focus
- Pioneer of "VIPEs" (Venture Investments in Public Equities)
- Clinical Co-Development model
- Long-term patient capital

**Portfolio:** 100+ biotech/biopharma companies

**Fit Analysis:** Pure life sciences fund since 1987. Zero relevance to gaming, entertainment, or AI dev tools. Ultra-specialized in drug development. Not a fit.

**Contact:** info@abingworth.com
**Website:** https://www.abingworth.com/`,
      tags: ['life-sciences', 'biotech', 'biopharma', 'healthcare', 'uk', 'specialized-fund'],
      investor: {
        fitScore: 1,
        fitCriteria: {
          preSeedFocus: false,
          gamingSectorActive: false,
          aiDevToolsThesis: false,
          euBased: true, // +1
          relevantPortfolio: false,
          otherScore: 0,
          otherReason: 'Life sciences only since 1987, no tech outside biotech'
        },
        checkSize: 'Unknown',
        stage: 'Seed to Development Stage',
        thesis: 'Life sciences and biopharma exclusively'
      }
    }
  },
  {
    id: '3xCqUxFOt3rzpKRBYqYQ',
    name: 'Abiss.',
    data: {
      notes: `**Research Date:** 2026-03-03

**Overview:** Swiss seed-stage investor. Minimal web presence — no functional website found. Limited information available.

**Known Details:**
- Location: Switzerland
- Stage: Seed
- Check Size: $50K - $500K

**Fit Analysis:** Insufficient information to evaluate properly. Switzerland is EU-adjacent but not EU. Small check sizes. No thesis information available. Unable to assess gaming/AI alignment. Low fit due to lack of data.

**Contact:** Unknown
**Website:** None found`,
      tags: ['switzerland', 'seed-stage', 'minimal-info', 'unknown-thesis'],
      investor: {
        fitScore: 1,
        fitCriteria: {
          preSeedFocus: false, // Seed, not pre-seed
          gamingSectorActive: false,
          aiDevToolsThesis: false,
          euBased: false, // Switzerland is not EU
          relevantPortfolio: false,
          otherScore: 1,
          otherReason: 'Minimal info available, Switzerland-based seed investor'
        },
        checkSize: '$50K - $500K',
        stage: 'Seed',
        thesis: 'Unknown'
      },
      status: 'disqualified' // Insufficient data
    }
  },
  {
    id: 'sH7cvBy4cDpQqHkyQgbM',
    name: 'ABOVE & BEYOND',
    data: {
      notes: `**Research Date:** 2026-03-03

**Overview:** French VC (Paris) specializing in tourism, sports, and leisure sectors. Founded by entrepreneurs for entrepreneurs. Offers hands-on operational support (avg 12 days/year per company).

**Investment Focus:**
- Tourism
- Sports
- Leisure
- Sustainable/responsible travel
- Technology within these verticals

**Philosophy:** "Par des entrepreneurs pour les entrepreneurs" (By entrepreneurs for entrepreneurs). Focus on sustainability and responsible investing. Patient capital approach.

**Stage:** Seed, Series A
**Check Size:** Unknown (typical French seed range €300K-2M)

**Fit Analysis:** Tourism/sports/leisure vertical fund. While EU-based with seed focus, thesis is entirely non-tech-focused entertainment. No gaming, no B2B software, no AI/dev tools. The "sports" angle is sports industry (teams, events, travel), not esports or gaming. Not a fit.

**Contact:** hello@aboveandbeyond.vc
**Website:** https://www.aboveandbeyond.vc`,
      tags: ['tourism', 'sports', 'leisure', 'france', 'seed', 'sustainability'],
      investor: {
        fitScore: 4,
        fitCriteria: {
          preSeedFocus: true, // +3 (seed/Series A)
          gamingSectorActive: false, // Sports industry, not gaming
          aiDevToolsThesis: false,
          euBased: true, // +1
          relevantPortfolio: false,
          otherScore: 0,
          otherReason: 'Tourism/sports/leisure only, no gaming or tech alignment'
        },
        checkSize: '€300K-2M (estimated)',
        stage: 'Seed, Series A',
        thesis: 'Tourism, sports, and leisure technology'
      }
    }
  },
  {
    id: 'J8mrmIPfoMAqq8wDnVAy',
    name: 'ABZ Ventures',
    data: {
      notes: `**Research Date:** 2026-03-03

**Overview:** Latvian VC (Riga) focused on B2B Software and B2C Services. Notable: explicitly mentions "Generative AI angle" as part of their investment thesis.

**Investment Focus:**
- B2B Software: Workload automation, Customer engagement, Generative AI angle
- B2C Services: Marketplaces, Social and Entertainment Services, Travel

**Investment Criteria:**
- Commercial product (not pre-product)
- Assessable product usage
- Engineering and Sales roles on board
- Carefully calculated market
- Domain expertise

**Team:**
- Eduards Zolotuhins (B2C) - linkedin.com/in/eduards-zolotuhins/
- Aleksejs Aleksandrovs (B2B)
- Aleksandrs Busarovs (B2B2C) - linkedin.com/in/abusarov/

**Values:** Relationship-focused, simple deal structures, no toxic founders, happiness-oriented

**Stage:** Pre-Seed, Seed
**Check Size:** Unknown

**Fit Analysis:** Best fit in this batch! EU-based, pre-seed focus, AND explicit "Generative AI angle" in thesis. B2B software focus aligns with LoreWeaver's dev tools positioning. "Social and Entertainment Services" in B2C also shows entertainment adjacency. Moderate-good fit.

**Contact:** hello@abz.vc
**Address:** Gunāra Astras 8B, LV-1082 Rīga, Latvia
**Phone:** +371 29436622
**Website:** http://www.abz.vc`,
      tags: ['generative-ai', 'b2b-software', 'latvia', 'pre-seed', 'seed', 'entertainment-services'],
      investor: {
        fitScore: 6,
        fitCriteria: {
          preSeedFocus: true, // +3
          gamingSectorActive: false, // Not explicitly gaming
          aiDevToolsThesis: true, // +2 - Explicit "Generative AI angle"
          euBased: true, // +1
          relevantPortfolio: false,
          otherScore: 0,
          otherReason: 'Generative AI thesis + B2B software + entertainment services angle'
        },
        checkSize: 'Unknown (typical Baltic €100K-500K)',
        stage: 'Pre-Seed, Seed',
        thesis: 'B2B Software (incl. Generative AI), B2C Services (incl. Entertainment)'
      },
      contact: {
        name: 'Eduards Zolotuhins',
        role: 'Partner (B2C)',
        linkedin: 'https://www.linkedin.com/in/eduards-zolotuhins/'
      }
    }
  },
  {
    id: 'm4wuZqqxTej1LjBWC28C',
    name: 'Accelerate Ventures',
    data: {
      notes: `**Research Date:** 2026-03-03

**Overview:** London-based VC (founded 2023) focused on sports technology and culture startups. CEO is Lucas Danson. Made trio of investments in early 2025.

**Investment Focus:**
- Sports technology
- Culture/entertainment tech
- Startups disrupting sports industry

**Criteria:**
- Operate in sports, technology, culture sectors
- Market disruption potential
- Demonstrated traction or rapid growth potential

**Services:**
- Direct capital investment (early-stage)
- Strategic consulting and guidance
- Network access to sports/tech industry experts

**Team:**
- Lucas Danson (CEO) - lucasdanson@accelerateventures.co.uk

**Stage:** Pre-Seed, Seed, Series A
**Check Size:** Unknown (typical UK early-stage £100K-500K)

**Fit Analysis:** UK sports-tech fund. While "culture" is mentioned, focus is sports industry technology (teams, venues, fan engagement), not gaming. Early-stage and EU-based is positive, but no gaming/AI/dev tools thesis. Low-moderate fit.

**Contact:** Via website contact form
**Website:** https://www.accelerateventures.co.uk`,
      tags: ['sports-tech', 'culture', 'uk', 'pre-seed', 'seed', 'series-a', 'early-stage'],
      investor: {
        fitScore: 4,
        fitCriteria: {
          preSeedFocus: true, // +3
          gamingSectorActive: false, // Sports, not gaming
          aiDevToolsThesis: false,
          euBased: true, // +1
          relevantPortfolio: false,
          otherScore: 0,
          otherReason: 'Sports-tech focus, "culture" mentioned but not gaming'
        },
        checkSize: '£100K-500K (estimated)',
        stage: 'Pre-Seed, Seed, Series A',
        thesis: 'Sports technology and culture startups'
      },
      contact: {
        name: 'Lucas Danson',
        role: 'CEO',
        email: 'lucasdanson@accelerateventures.co.uk'
      }
    }
  }
];

async function updateLeads() {
  console.log('Updating batch 6 leads (50-59) with research data...\n');
  
  for (const update of updates) {
    console.log(`Updating ${update.name} (${update.id})...`);
    
    try {
      const leadDoc = await db.collection('leads').doc(update.id).get();
      if (!leadDoc.exists) {
        console.log(`  ✗ Lead not found`);
        continue;
      }
      
      const currentData = leadDoc.data();
      
      const updateData = {
        notes: update.data.notes,
        tags: update.data.tags,
        investor: {
          ...currentData.investor,
          ...update.data.investor
        },
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };
      
      // Update contact if provided
      if (update.data.contact) {
        updateData.contact = {
          ...currentData.contact,
          ...update.data.contact
        };
      }
      
      // Update status if flagged
      if (update.data.status) {
        updateData.status = update.data.status;
        console.log(`  ⚠️ Status changed to: ${update.data.status}`);
      }
      
      await db.collection('leads').doc(update.id).update(updateData);
      console.log(`  ✓ Updated - ICP Score: ${update.data.investor.fitScore}`);
    } catch (err) {
      console.error(`  ✗ Error: ${err.message}`);
    }
  }
  
  console.log('\nBatch 6 update complete!');
  
  // Summary
  console.log('\n=== SUMMARY ===');
  const qualified = updates.filter(u => u.data.investor.fitScore >= 85);
  const disqualified = updates.filter(u => u.data.status === 'disqualified');
  
  console.log(`Leads processed: ${updates.length}`);
  console.log(`Leads qualifying (ICP >= 85): ${qualified.length}`);
  console.log(`Leads disqualified: ${disqualified.length}`);
  
  if (qualified.length > 0) {
    console.log('\nQualified leads:');
    qualified.forEach(q => console.log(`  - ${q.name}: ICP ${q.data.investor.fitScore}`));
  } else {
    console.log('\nNo investor leads met qualification threshold (ICP >= 85)');
  }
  
  if (disqualified.length > 0) {
    console.log('\nDisqualified leads:');
    disqualified.forEach(d => console.log(`  - ${d.name}: ${d.data.investor.fitCriteria?.otherReason || 'Invalid'}`));
  }
  
  console.log('\nICP Score distribution:');
  updates.sort((a, b) => b.data.investor.fitScore - a.data.investor.fitScore)
    .forEach(u => console.log(`  ${u.data.investor.fitScore}: ${u.name}`));
  
  // Top prospects
  console.log('\n=== NOTABLE LEADS ===');
  console.log('ABZ Ventures (ICP 6): Best fit in batch');
  console.log('  → Explicit "Generative AI angle" in thesis');
  console.log('  → B2B Software + Entertainment Services focus');
  console.log('  → Pre-seed/seed stage, EU-based (Latvia)');
  console.log('  → Contact: Eduards Zolotuhins, hello@abz.vc');
  
  console.log('\n=== CLEANUP NOTES ===');
  console.log('ABCXchange: NOT an investor — is a VC software tool. Remove from investor pipeline.');
  console.log('Abiss.: Insufficient data — no website, minimal info. Marked disqualified.');
}

updateLeads().then(() => process.exit(0)).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
