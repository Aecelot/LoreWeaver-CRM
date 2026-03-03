// Batch 8 research updates - leads 70-79 (investor, status=new)
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
    id: 'i3pAeV3CW3Ag0Jwo4LYG', // Lead 70 - Additio Investment Group
    data: {
      tags: ['vc', 'spain', 'medtech', 'digital-health', 'healthcare', 'tier-3', 'no-gaming'],
      notes: `**Additio Investment Group** — Spanish healthcare-focused VC.

**Background:**
- Founded: 2019 (AiG1 pledge fund)
- Based in Spain
- Team of healthcare & life sciences entrepreneurs, industry executives, and investors

**Investment Focus:**
- MedTech
- Digital Health/HealthTech
- Bio/Pharma (highly selective)
- EU-based seed and Series A opportunities

**Check Size:** €300K-€3M

**LoreWeaver Fit Analysis:**
- Pure healthcare/life sciences focus ✗
- No gaming or entertainment investments ✗
- No AI/ML tech investments visible ✗
- Geographic alignment (EU) ✓

**ICP Assessment:** Healthcare-only thesis with no gaming overlap. Not a fit for LoreWeaver's narrative AI for games.`,
      investor: {
        fitScore: 15,
        checkSize: '€300K-€3M',
        investmentFocus: ['medtech', 'digital-health', 'bio-pharma', 'eu-healthcare']
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  },
  {
    id: 'OixGvaClr9bw1CAO7QNf', // Lead 71 - Adelis Equity
    data: {
      tags: ['pe', 'sweden', 'nordic', 'business-services', 'healthcare', 'growth-equity', 'tier-3', 'no-gaming'],
      notes: `**Adelis Equity** — Nordic private equity firm.

**Background:**
- Growth equity firm based in Sweden
- €4.3B in capital raised
- 49 platform investments, 300+ add-ons
- 22 completed exits
- 30 deal team members

**Investment Focus:**
- Business Services
- Tech & Software (not gaming-specific)
- Healthcare & Life Sciences
- Northern European mid-market

**Investment Style:**
- Partners with entrepreneurs and management teams
- Focus on market consolidation and European champions
- Long-term transformation approach
- Broad ownership structures

**LoreWeaver Fit Analysis:**
- Private equity (not venture) - different stage △
- Tech & Software vertical exists ✓
- But focus is on business services, not gaming ✗
- Mid-market focus, not early-stage ✗
- No gaming or entertainment portfolio companies visible ✗

**ICP Assessment:** PE firm focused on Northern European mid-market consolidation. Too late-stage and no gaming thesis.`,
      investor: {
        fitScore: 18,
        checkSize: 'N/A (PE)',
        investmentFocus: ['business-services', 'tech-software', 'healthcare', 'nordic-mid-market']
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  },
  {
    id: 'jXHhY4cFfF8HxeUDjPLb', // Lead 72 - Adjuvant Capital
    data: {
      tags: ['vc', 'us', 'life-sciences', 'pharma', 'healthcare', 'tier-3', 'no-gaming'],
      notes: `**Adjuvant Capital** — US life sciences growth investor.

**Background:**
- Based in United States
- Growth-stage life sciences investor
- Focus on global health impact

**Investment Focus:**
- Life sciences
- Drugs
- Vaccines
- Diagnostics
- Medical devices

**Check Size:** $10M-$25M (Series A-C)

**LoreWeaver Fit Analysis:**
- Pure life sciences/pharma focus ✗
- No technology or software investments ✗
- No gaming or entertainment ✗
- Much larger check sizes than LoreWeaver needs △

**ICP Assessment:** Healthcare/pharma only. Zero overlap with gaming AI thesis.`,
      investor: {
        fitScore: 10,
        checkSize: '$10M-$25M',
        investmentFocus: ['life-sciences', 'drugs', 'vaccines', 'diagnostics', 'medical-devices']
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  },
  {
    id: 'd0CSvvO3QcJuftaDZS8z', // Lead 73 - Advent Life Sciences
    data: {
      tags: ['vc', 'uk', 'life-sciences', 'pharma', 'medtech', 'tier-3', 'no-gaming'],
      notes: `**Advent Life Sciences** — UK life sciences specialist VC.

**Background:**
- UK-based venture capital
- Dedicated life sciences investor
- Focus on translational medicine

**Investment Focus:**
- New drug discovery
- MedTech
- Enabling technologies (for healthcare)
- Vaccines

**Stage:** Seed to Series B

**LoreWeaver Fit Analysis:**
- Pure life sciences thesis ✗
- "Enabling technologies" refers to healthcare tech, not gaming ✗
- No entertainment or media investments ✗
- Strong UK presence ✓

**ICP Assessment:** Life sciences only. Not relevant for gaming AI.`,
      investor: {
        fitScore: 12,
        checkSize: 'Seed-Series B',
        investmentFocus: ['drug-discovery', 'medtech', 'vaccines', 'enabling-tech-healthcare']
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  },
  {
    id: '5aTG8m0KRMsA6ukWTpKM', // Lead 74 - Advent Venture Partners
    data: {
      tags: ['vc', 'uk', 'technology', 'life-sciences', 'tier-3', 'no-gaming'],
      notes: `**Advent Venture Partners** — UK technology and life sciences VC.

**Background:**
- UK-based venture capital firm
- Dual focus: technology and life sciences
- Series A/B stage investor

**Investment Focus:**
- Technology (general)
- Life Sciences

**LoreWeaver Fit Analysis:**
- Has technology vertical ✓
- But technology appears broad/enterprise focused △
- Life sciences is other main vertical ✗
- No visible gaming or entertainment investments ✗
- No AI/ML specific thesis visible ✗

**ICP Assessment:** Generalist tech + life sciences. No gaming focus evident.`,
      investor: {
        fitScore: 22,
        checkSize: 'Series A-B',
        investmentFocus: ['technology', 'life-sciences']
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  },
  {
    id: 'ph5LPxqV8gX0Rjvgwj2b', // Lead 75 - AENU
    data: {
      tags: ['vc', 'germany', 'impact', 'climate-tech', 'social-impact', 'tier-3', 'no-gaming'],
      notes: `**AENU** — German impact VC (climate & social).

**Background:**
- Founded 2022, Berlin-based
- Impact-focused venture capital
- Founded by ex-Earlybird and Speedinvest partners
- Previously invested €400M+ with top-quartile returns
- Co-founded Leaders For Climate Action

**Investment Focus:**
- Climate impact technologies
- Energy transition
- Carbon removal
- Food & agri-tech
- Enabling tech (climate)
- Inclusive education-tech
- Social impact opportunities
- Sustainable fintech

**Check Size:** €500K-€5M (Seed/Series A)

**LoreWeaver Fit Analysis:**
- Pure impact/climate thesis ✗
- No entertainment, gaming, or media ✗
- Strong VC pedigree (Earlybird, Speedinvest) ✓
- German/EU presence ✓
- But thesis requires climate/social impact angle ✗

**ICP Assessment:** Climate and social impact only. Would need clear sustainability angle for fit (LoreWeaver doesn't have this).`,
      investor: {
        fitScore: 15,
        checkSize: '€500K-€5M',
        investmentFocus: ['climate-tech', 'energy-transition', 'carbon-removal', 'social-impact']
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  },
  {
    id: 'gCaELtuE5Hl7BamBd2gr', // Lead 76 - Aera Capital
    data: {
      tags: ['vc', 'uk', 'singapore', 'deep-tech', 'climate', 'space', 'tier-3', 'no-gaming'],
      notes: `**Aera Capital** — Singapore-regulated deep-tech VC.

**Background:**
- Early-stage VC fund
- Regulated by Monetary Authority of Singapore
- Global reach: USA, APAC
- Focus on "resilient future" companies

**Portfolio (examples):**
- Array Labs (satellite imaging)
- Dawn (space propulsion)
- Gridsight (AI grid optimization)
- Provocative (AI inference cloud)
- Solugen (sustainable chemicals)
- Twelve (sustainable aviation fuel)

**Investment Focus:**
- Deep tech
- Climate tech
- Space technology
- AI infrastructure (not gaming AI)

**Check Size:** Up to $500K initial, $2M average rounds

**LoreWeaver Fit Analysis:**
- Has software/AI investment capability ✓
- But focus is on climate/space/infrastructure △
- No gaming or entertainment investments visible ✗
- AI focus is on infrastructure, not applications ✗

**ICP Assessment:** Deep-tech climate/space focus. AI thesis is infrastructure-level, not gaming applications.`,
      investor: {
        fitScore: 25,
        checkSize: 'Up to $500K',
        investmentFocus: ['deep-tech', 'climate', 'space', 'ai-infrastructure']
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  },
  {
    id: 'uZvsDkdOM1Mqiuat5wLF', // Lead 77 - Aerium Pecunia
    data: {
      tags: ['angel', 'denmark', 'advisory', 'tier-3', 'minimal-info'],
      notes: `**Aerium Pecunia** — Danish investment/advisory firm.

**Background:**
- Based in Denmark
- Small investment/advisory operation
- Website has minimal information
- Focus on business planning and startup advisory

**Investment Focus:**
- General startup advisory
- Business planning services
- Limited investment activity visible

**LoreWeaver Fit Analysis:**
- Very limited information available ✗
- No clear investment thesis ✗
- No gaming or entertainment focus visible ✗
- Small operation △

**ICP Assessment:** Minimal information available. Appears to be advisory-focused rather than active investor. Not a fit.`,
      investor: {
        fitScore: 8,
        checkSize: 'Unknown',
        investmentFocus: ['startup-advisory', 'business-planning']
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  },
  {
    id: 'wNj3TR2cW3bHM03UF0Nr', // Lead 78 - Aeronaut Invest GmbH
    data: {
      tags: ['vc', 'germany', 'fintech', 'legaltech', 'tier-3', 'no-gaming'],
      notes: `**Aeronaut Invest GmbH** — German fintech/legaltech seed investor.

**Background:**
- Based in Germany
- Seed-stage investor
- Focus on fintech and legaltech verticals

**Investment Focus:**
- Fintech
- Legaltech
- Early-stage startups (Germany-focused)

**LoreWeaver Fit Analysis:**
- Pure fintech/legaltech thesis ✗
- No gaming or entertainment ✗
- No AI/ML specific investments visible ✗
- German presence ✓
- Seed stage alignment ✓

**ICP Assessment:** Narrow fintech/legaltech focus. No overlap with gaming AI.`,
      investor: {
        fitScore: 12,
        checkSize: 'Seed',
        investmentFocus: ['fintech', 'legaltech', 'german-startups']
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  },
  {
    id: '2qi9UT2KKsU0W1r30Qap', // Lead 79 - Aethos Holding
    data: {
      tags: ['vc', 'luxembourg', 'new-tech', 'generalist', 'tier-3', 'no-gaming'],
      notes: `**Aethos Holding** — Luxembourg closed investment vehicle.

**Background:**
- Founded 2012, based in Luxembourg
- Privately held closed investment vehicle
- Geographic focus: Luxembourg, France, Belgium, Austria, USA

**Investment Focus:**
- New technologies (general)
- Innovation
- Early-stage startups

**LoreWeaver Fit Analysis:**
- Generalist "new technologies" thesis △
- No specific gaming or entertainment focus ✗
- Closed fund structure (may limit new investments) △
- EU presence ✓
- Could potentially include AI/gaming under "new tech" but no evidence ✗

**ICP Assessment:** Generalist tech investor without gaming focus. Closed fund structure suggests limited availability.`,
      investor: {
        fitScore: 20,
        checkSize: 'Seed-Series A',
        investmentFocus: ['new-technologies', 'innovation', 'eu-startups']
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  }
];

async function updateLeads() {
  console.log('=== BATCH 8 LEAD RESEARCH UPDATE ===\n');
  console.log('Research Date: 2026-03-03');
  console.log('Leads 70-79 (offset 70, limit 10)\n');
  
  let updated = 0;
  let failed = 0;
  
  for (const update of updates) {
    try {
      await db.collection('leads').doc(update.id).update(update.data);
      console.log(`✓ Updated: ${update.id}`);
      console.log(`  ICP Score: ${update.data.investor.fitScore}`);
      updated++;
    } catch (err) {
      console.error(`✗ Failed: ${update.id}`, err.message);
      failed++;
    }
  }
  
  console.log(`\n=== SUMMARY ===`);
  console.log(`Updated: ${updated}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total in batch: 10`);
  
  // Show ICP scores
  console.log(`\n=== ICP SCORES ===`);
  updates.forEach(u => {
    console.log(`${u.data.investor.fitScore} - ${u.id}`);
  });
  
  const highestScore = Math.max(...updates.map(u => u.data.investor.fitScore));
  console.log(`\nHighest ICP: ${highestScore}`);
  console.log(`Qualified (ICP >= 85): 0`);
  console.log(`\nNote: All leads in batch 8 are healthcare, climate, or fintech focused.`);
  console.log(`None have gaming investment thesis.`);
}

updateLeads().then(() => process.exit(0)).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
