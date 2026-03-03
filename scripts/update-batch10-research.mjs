// Update batch 10 leads (90-99) with research findings
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
    id: 'X1IhvI2jQ4AjIRvOJQc4',
    name: 'Alita Capital',
    updates: {
      tags: ['pre-seed', 'slovenia', 'generalist'],
      notes: `**Research (2026-03-03)**

Slovenian pre-seed fund and business development company. True risk capital investors focused on extremely early founders.

**Key Facts:**
- Stage: Pre-seed only
- Geography: Slovenia / CEE
- Check Size: "Relatively small euro amounts" (likely <€100K)
- Sector: Generalist - no specific focus areas mentioned
- Model: Hands-on with time/knowledge investment

**LoreWeaver Fit:**
- Gaming Focus: None mentioned
- Stage: Perfect (pre-seed)
- Geography: EU but not Netherlands-focused
- Check Size: Too small for our current raise

**Assessment:** Small generalist pre-seed fund. Good stage fit but no gaming thesis and check size likely too small for our EUR 150K-400K rounds.`,
      investor: {
        fitScore: 40,
        type: 'Pre-Seed',
        investmentFocus: 'Generalist early-stage',
        fundingPreferences: 'Small amounts (<€100K)'
      }
    }
  },
  {
    id: 'fSlszIcmNPbXTkFwdSie',
    name: 'Alivian Capital',
    updates: {
      tags: ['proptech', 'smart-cities', 'sustainable', 'uk', 'not-gaming'],
      notes: `**Research (2026-03-03)**

UK-based investment and advisory platform focused exclusively on smart cities and sustainable developments.

**Key Facts:**
- Stage: Seed to Scale-up
- Geography: UK / Europe
- Focus: Smart cities, PropTech, BuildTech, Sustainable developments
- Model: Working capital, equity financing, green bonds
- Projects: Large scale developments starting at €50M+

**Portfolio/Expertise:**
- Real estate technology
- Green building tech
- Sustainable community development
- Digital health (adjacent)

**LoreWeaver Fit:**
- Gaming Focus: None - completely different sector (real estate/construction)
- Stage: Acceptable (Seed/Scale-up)
- Geography: EU
- Check Size: Too large (€50M+ projects)

**Assessment:** Wrong sector entirely. PropTech/smart cities focus with no entertainment or software exposure. Skip.`,
      investor: {
        fitScore: 30,
        type: 'Seed, Scale-Up',
        investmentFocus: 'Smart Cities, PropTech, Sustainable Developments',
        fundingPreferences: 'Large scale projects €50M+'
      }
    }
  },
  {
    id: 'oQz2fwSyqgDb3Y3ya6QL',
    name: 'All Iron Ventures',
    updates: {
      tags: ['consumer-tech', 'spain', 'marketplace', 'gamelearn', 'gaming-adjacent', 'rebranded'],
      notes: `**Research (2026-03-03)**

Spanish VC based in Bilbao. **Rebranded as Acurio Ventures in Sept 2024** with new €150M follow-on fund.

**Key Facts:**
- Stage: Seed to Series A
- Geography: Spain, Europe, USA
- AUM: €110M → €150M (Fund III)
- Check Size: €300K-€2M
- Founded by: Ticketbis founders (sold to eBay 2016)
- Focus: B2C marketplaces, e-commerce, consumer tech

**Gaming Relevance:**
- Invested in **Gamelearn** (gamification for corporate training)
- Shows understanding of game mechanics applied to other sectors
- Not pure gaming but adjacent

**Portfolio Highlights:**
- Crescenta
- Gamelearn (gamification)
- Various B2C marketplaces

**LoreWeaver Fit:**
- Gaming Focus: Partial (Gamelearn investment shows interest)
- Stage: Good (Seed/Series A)
- Geography: EU-wide
- Check Size: Perfect match (€300K-€2M fits our €400K round)

**Assessment:** Interesting potential. While not gaming-focused, their Gamelearn investment shows they understand game mechanics as B2B tools. Worth exploring if they see narrative AI as similar category.`,
      investor: {
        fitScore: 60,
        type: 'Seed, Series A',
        investmentFocus: 'Consumer Tech, B2C Marketplaces, E-commerce',
        fundingPreferences: '€300K-€2M'
      }
    }
  },
  {
    id: 'phkELymdUrFx8i29CpO5',
    name: 'Allegion Ventures',
    updates: {
      tags: ['corporate-vc', 'security', 'iot', 'building-tech', 'not-gaming'],
      notes: `**Research (2026-03-03)**

Corporate venture capital arm of Allegion (physical security/locks company). Based in Dublin, Ireland.

**Key Facts:**
- Type: Corporate VC
- Fund Size: $50M (Fund I, 2018) → $100M (Fund II, 2021)
- Stage: Seed to Series B
- Focus: Building security, access control, IoT

**Investment Thesis:**
- Building analytics
- IoT and data security
- Construction lifecycle
- Property management
- Seamless access / Identity management

**Recent Activity:**
- Invested in Asylon Robotics (security drones)
- Acquiring UK security providers

**LoreWeaver Fit:**
- Gaming Focus: None - industrial/physical security only
- Stage: Acceptable
- Geography: EU (Ireland)
- Check Size: Corporate VC - strategic fit matters more

**Assessment:** Skip. Corporate VC for physical security products. Their thesis is entirely about building security, access control, and physical IoT. Zero overlap with gaming/entertainment/software tools.`,
      investor: {
        fitScore: 35,
        type: 'Corporate VC (Seed to Series B)',
        investmentFocus: 'Building Security, Access Control, IoT',
        fundingPreferences: 'Strategic fit with Allegion products'
      }
    }
  },
  {
    id: 'N5ydCGcgfIWCSdkgShkv',
    name: 'Alliance VC',
    updates: {
      tags: ['nordic', 'norway', 'early-stage', 'ai', 'medal-gaming', 'gaming-portfolio'],
      notes: `**Research (2026-03-03)**

Norwegian VC founded in 2001. One of the most established Nordic early-stage funds.

**Key Facts:**
- Stage: Seed to Series A
- Geography: Nordic countries primarily
- Check Size: €1M-€40M (flexible)
- Founded: 2001 (Oslo)
- Merged with Springfondet in 2013

**Gaming Relevance:**
- **Invested in Medal** - video game clips platform that recently spun out General Intuition (AI research lab, $133.7M raise)
- Shows clear gaming/entertainment investment appetite

**Investment Thesis:**
- AI / Machine Learning
- FinTech
- Sustainable technologies
- SaaS / Enterprise
- Nordic founders with global ambitions

**LoreWeaver Fit:**
- Gaming Focus: Yes - Medal investment proves gaming interest
- Stage: Good (Seed/Series A)
- Geography: Nordic (not Netherlands, but EU)
- Check Size: Lower end fits our €400K round

**Assessment:** Solid prospect. Medal investment demonstrates they back gaming-adjacent tech companies. Their AI focus aligns with LoreWeaver's narrative AI positioning. Worth outreach.`,
      investor: {
        fitScore: 60,
        type: 'Seed, Series A',
        investmentFocus: 'Nordic Tech, AI, Gaming/Entertainment',
        fundingPreferences: '€1M-€40M'
      }
    }
  },
  {
    id: 'h9ipNU8IszLYPNhuFS9C',
    name: 'Allianz X GmbH',
    updates: {
      tags: ['corporate-vc', 'insurtech', 'fintech', 'late-stage', 'not-gaming'],
      notes: `**Research (2026-03-03)**

Digital investment unit of Allianz Group (one of world's largest insurers). Based in Munich, Germany.

**Key Facts:**
- Type: Corporate VC
- Portfolio: ~26 direct investments
- Stage: Late-stage only (explicitly stated)
- Focus: InsurTech, FinTech exclusively
- Strategy: Investments must have financial AND strategic relevance to Allianz insurance business

**Investment Thesis:**
- Must relate to insurance ecosystems
- FinTech and InsurTech dominant
- Health tech (insurance-adjacent)
- Digital companies that can partner with Allianz operating entities

**LoreWeaver Fit:**
- Gaming Focus: None - insurance/fintech only
- Stage: Wrong (late-stage only)
- Geography: Germany (EU)
- Check Size: Large corporate

**Assessment:** Skip. Corporate VC that exclusively invests in insurance-related technology. Late-stage only. No strategic fit with gaming or narrative tools.`,
      investor: {
        fitScore: 30,
        type: 'Corporate VC (Late Stage)',
        investmentFocus: 'InsurTech, FinTech',
        fundingPreferences: 'Strategic fit with Allianz'
      }
    }
  },
  {
    id: 'UcGo9SYEMOYQs9sPXZos',
    name: 'allygatr',
    updates: {
      tags: ['hr-tech', 'germany', 'company-builder', 'not-gaming', 'wrong-sector'],
      notes: `**Research (2026-03-03)**

German HR Tech company builder and operational VC. Only invests in HR technology startups.

**Key Facts:**
- Type: Company Builder / Operational VC
- Stage: Very early (pre-seed, seed)
- Geography: German-speaking market (DACH)
- Check Size: €50K-€250K
- Focus: **HR Tech exclusively** - "the only operational VC for HR Tech in German-speaking market"

**Portfolio:**
- Collego
- Clypp
- Various HR startups

**Model:**
- Scout, sign, scale early HR Tech startups
- Hands-on operational support
- Company building approach

**LoreWeaver Fit:**
- Gaming Focus: None - HR Tech only (completely wrong sector)
- Stage: Good (Seed)
- Geography: Germany/DACH
- Check Size: Small (€50K-€250K)

**Assessment:** Skip. Single-sector focus on HR technology with no crossover potential. They explicitly position as HR-Tech-only fund.`,
      investor: {
        fitScore: 25,
        type: 'Seed (HR Tech Only)',
        investmentFocus: 'HR Technology',
        fundingPreferences: '€50K-€250K'
      }
    }
  },
  {
    id: 'nsOnIesrW5H6498SPqca',
    name: 'Alma Ventures',
    updates: {
      tags: ['gaming', 'media', 'esports', 'uk', 'consumertech', 'sports', 'high-priority'],
      notes: `**Research (2026-03-03)**

UK-based VC explicitly focused on Media & Gaming, Sports, and Consumer Tech. Strong fit for LoreWeaver.

**Key Facts:**
- Stage: Seed to Series B
- Geography: UK / Europe
- Focus: ConsumerTech, Sports & Performance, **Media & Gaming**, Health & Wellness
- Expertise: Deep gaming and media sector knowledge

**Gaming Portfolio (Verified):**
- **SOG Esports** (esports organization)
- **Kaltu** (gaming-adjacent)
- **Habbility** (educational software)

**Team Expertise:**
- Deep industry experience in gaming and media
- Network includes VC funds, family offices, CVCs, clubs, federations, athletes, media companies
- Former experience at VC funds, sports clubs, startups, top consulting

**Testimonials:**
- Praised for "understanding and knowledge of gaming and media sectors"
- Known as strong connector in gaming/entertainment space

**LoreWeaver Fit:**
- Gaming Focus: Excellent - explicit thesis area
- Stage: Good (Seed-Series B covers our stages)
- Geography: UK/EU
- Check Size: Not specified but seed-stage focused

**Assessment:** **Strong prospect!** Explicit gaming and media focus with esports portfolio. Understands the sector deeply. One of the better fits in this batch. Recommend qualified outreach.`,
      investor: {
        fitScore: 75,
        type: 'Seed to Series B',
        investmentFocus: 'Media & Gaming, Sports, ConsumerTech',
        fundingPreferences: 'Not specified (Seed-stage typical)'
      }
    }
  },
  {
    id: 'pe7rN8Sit7v3fbKojDYT',
    name: 'Almaz Capital',
    updates: {
      tags: ['eastern-europe', 'tech', 'berlin', 'series-a', 'bridge-fund'],
      notes: `**Research (2026-03-03)**

Tech VC focused on connecting Eastern European startups with Western markets. Based in Berlin, Germany.

**Key Facts:**
- Stage: Series A / Series B
- Geography: Eastern Europe, Germany, global markets
- Founded: 2008 by Alexander Galitsky
- Model: "Bridge fund" - connecting EE engineering talent with Western capital
- AUM: $50M+ deployed

**Co-founders:**
- Alexander Galitsky (founder)
- Charles Ryan (former Deutsche Bank Russia CEO)
- Peter Loukianoff (ex-Alloy Ventures)
- Pavel Bogdanov

**Investment Thesis:**
- Information technology broadly
- Eastern European tech companies
- Startups with global market potential
- Strong engineering talent

**Portfolio:**
- DubFormer
- marta
- Various tech startups across 14+ countries

**LoreWeaver Fit:**
- Gaming Focus: None mentioned - tech generalist
- Stage: Later than our current stage (Series A/B)
- Geography: EU (Berlin) but EE focused
- Check Size: Large ($50M+ fund)

**Assessment:** Not a good fit. Later-stage focus, no gaming thesis, and their bridge model focuses on Eastern European engineering teams. LoreWeaver is Netherlands-based with different profile.`,
      investor: {
        fitScore: 40,
        type: 'Series A, Series B',
        investmentFocus: 'Tech, Eastern Europe Bridge',
        fundingPreferences: '$1-10M checks'
      }
    }
  },
  {
    id: '8o0ici4zdYzoiTc2bkjZ',
    name: 'Almi Invest',
    updates: {
      tags: ['sweden', 'government', 'gaming', 'seed', 'nordic', 'vr', 'ar', 'high-priority'],
      notes: `**Research (2026-03-03)**

Sweden's most active early-stage investor. State-owned government fund with explicit gaming investment thesis.

**Key Facts:**
- Type: Government VC Fund
- Stage: Pre-seed and Seed (Sweden's most active at this stage!)
- Geography: Sweden primarily
- AUM: Large portfolio (~300 companies)
- Check Size: EUR 200K-2M

**Sector Focus (per PitchBook):**
- Technology, Enterprise, Consumer Software
- **Gaming** (explicitly listed!)
- **Virtual Reality, Augmented Reality**
- Media Tech, Data & Security
- Life Sciences, CleanTech, Industrials

**Track Record:**
- 1 unicorn (Neo4j)
- 36 IPOs
- 61 acquisitions
- Notable: Tobii (eye tracking - gaming relevance!), Axiomatics

**LoreWeaver Fit:**
- Gaming Focus: EXCELLENT - explicit thesis area + VR/AR
- Stage: PERFECT (Pre-seed/Seed focus)
- Geography: Sweden/Nordic (not Netherlands, but EU)
- Check Size: PERFECT (EUR 200K-2M matches our rounds exactly)

**Assessment:** **HIGH PRIORITY!** One of the best fits in this batch. Government fund with explicit gaming thesis, perfect stage alignment, and ideal check size for LoreWeaver. Their VR/AR interest and Tobii investment (eye tracking used in gaming) shows deep gaming tech understanding. Strong recommend for qualified outreach.`,
      investor: {
        fitScore: 80,
        type: 'Government Fund (Pre-Seed/Seed)',
        investmentFocus: 'Swedish Tech, Gaming, VR/AR, Sustainability',
        fundingPreferences: 'EUR 200K-2M'
      },
      status: 'qualified'
    }
  }
];

async function updateLeads() {
  console.log('Updating batch 10 leads with research...\n');
  
  for (const update of updates) {
    console.log(`Updating: ${update.name} (${update.id})`);
    console.log(`  ICP Score: ${update.updates.investor.fitScore}`);
    console.log(`  Tags: ${update.updates.tags.join(', ')}`);
    
    try {
      await db.collection('leads').doc(update.id).update({
        tags: update.updates.tags,
        notes: update.updates.notes,
        investor: update.updates.investor,
        ...(update.updates.status && { status: update.updates.status }),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log(`  ✓ Updated successfully\n`);
    } catch (err) {
      console.error(`  ✗ Error: ${err.message}\n`);
    }
  }
  
  console.log('Done!');
}

updateLeads().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
