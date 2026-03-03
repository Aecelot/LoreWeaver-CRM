// Update batch 9 leads (80-89) with research findings
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
    id: 'LVjNMkVAw1VtxMGQi3zF',
    name: 'AI.FUND',
    data: {
      tags: ['enterprise-ai', 'vertical-ai', 'industrial-ai', 'advanced-ai-tech', 'ai-focused', 'early-stage', 'eu-wide'],
      investor: {
        type: 'Seed, Series A',
        investmentFocus: 'Enterprise AI, Vertical AI, Industrial AI, Advanced AI Tech',
        fundingPreferences: '€500k–€3M',
        fitScore: 35
      },
      notes: `**AI.FUND** — German AI-focused VC

**Research (2026-03-03):**
- Based in Germany, focus on European AI leaders
- Investment range: €500k–€3M (too large for current LoreWeaver raise)
- Stage: Seed, Series A
- Portfolio includes Sinpex and ALEIA (enterprise AI)
- Team includes experienced tech entrepreneurs/investors with 30+ years software experience
- Partners: Ragnar Kruse, Petra Vorsteher, Dr. Hauke Hansen, Fabian J. G. Westerheide, Ingo Hoffmann

**LoreWeaver Fit Analysis:**
- Gaming Focus: 0/40 — No gaming investments, purely enterprise AI
- Stage: 20/25 — Seed/Series A fits
- Geographic: 10/20 — EU-wide
- Check Size: 5/15 — €500k minimum too high for current €150K-400K raises

**ICP Score: 35 (Skip)**
Not a fit — Enterprise AI focus without gaming angle, check size too large.`,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  },
  {
    id: 'z3Tk2dXroRITsPMKPtm1',
    name: 'AIDGE Ventures',
    data: {
      tags: ['technology-driven-startups', 'india-focused', 'early-stage', 'sector-agnostic'],
      investor: {
        type: 'Pre-Seed, Seed',
        investmentFocus: 'Indian innovation going global, Technology-driven startups (sector-agnostic)',
        fundingPreferences: 'Pre-Seed/Seed',
        fitScore: 40
      },
      contact: {
        email: 'pitch@aidge.ventures'
      },
      notes: `**AIDGE Ventures** — UK-based fund for Indian startups

**Research (2026-03-03):**
- Mission: Take Indian innovation global
- Focus: Pre-seed/Seed, sector-agnostic technology startups
- Based in UK but primarily backs Indian founders
- Provides hands-on support for global scaling

**LoreWeaver Fit Analysis:**
- Gaming Focus: 0/40 — Sector agnostic but no gaming portfolio visible
- Stage: 25/25 — Pre-seed/Seed perfect fit
- Geographic: 5/20 — India-focused, LoreWeaver is Netherlands-based
- Check Size: 10/15 — Likely fits but unspecified

**ICP Score: 40 (Low Priority)**
Geographic mismatch — Fund focuses on Indian founders expanding globally, not EU-based companies.`,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  },
  {
    id: 'ir2GYwZ77shQbahipmTm',
    name: 'Aidiom',
    data: {
      tags: ['ai-powered-european-deep-tech', 'enterprise-software', 'business-productivity-software', 'b2b-focus', 'ai-interested', 'early-stage', 'norway'],
      investor: {
        type: 'Seed, Early-stage',
        investmentFocus: 'AI-powered European deep tech, Enterprise software, B2B with applied AI',
        fundingPreferences: '$100k to $1M',
        fitScore: 50
      },
      contact: {
        name: 'Jon Øyvind Eriksen',
        title: 'CEO & Founder',
        email: null
      },
      notes: `**Aidiom** — Norwegian deep tech investor

**Research (2026-03-03):**
- Leading Norwegian deep tech investor, $30M fund
- Focus: Early-stage B2B companies with applied AI
- Ticket sizes: $100k to $1M — fits LoreWeaver raises
- Invests in EEA
- Notable exits: Signicat (acquired by Nordic Capital), FONN (acquired by Access Group)
- Current portfolio: Levantor, Loopfront, Intelecy, Partory
- Also LP investments in Whitestar Capital, Curiosity Ventures, Proventure, Movens Capital

**Team:**
- Jon Øyvind Eriksen — CEO & Founder (serial entrepreneur, ex-Kantega, Signicat founder, ex-Investinor)
- Øistein Sonstad — Investment Manager (startup experience in Silicon Valley & Europe)

**LoreWeaver Fit Analysis:**
- Gaming Focus: 0/40 — Enterprise software/B2B, no gaming
- Stage: 25/25 — Seed/early-stage fits perfectly
- Geographic: 10/20 — Norway-based, invests in EEA
- Check Size: 15/15 — $100k-$1M perfect range

**ICP Score: 50 (Low Priority)**
Strong AI/enterprise focus but no gaming angle. Could position as AI-powered B2B tools for game industry, but stretch.`,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  },
  {
    id: 'tcyXcrvfIPR7EhC0Fj0Z',
    name: 'Aikainen',
    data: {
      tags: ['legal-tech', 'influencer-marketing', 'data-platform', 'early-stage', 'finland', 'small-checks'],
      investor: {
        type: 'Pre-Seed, Seed',
        investmentFocus: 'Legal Tech, Influencer Marketing, Data platforms, Impact-driven startups',
        fundingPreferences: '$20-100k',
        fitScore: 40
      },
      contact: {
        name: 'Otso Laakkonen',
        title: 'Founder',
        email: 'otso@aikainen.com'
      },
      notes: `**Aikainen** — Finnish pre-seed/seed fund

**Research (2026-03-03):**
- Founded 2021, Helsinki-based
- 7 investments to date (PitchBook/Tracxn data)
- Focus: Impact-driven startups, fail-fast mentality, data-driven
- Check size: $20-100k — too small for LoreWeaver current raises
- Portfolio: Boksi Solutions, Happens, Statzon, Aatos, Maire.ai, Menddie

**Team/Advisors:**
- Otso Laakkonen — Founder
- Karri Kurunmäki (Hoxhunt) — Sales advisor
- Tomer Atzmon (Boksi) — Financial Planning
- Henrik Suikkanen (Demos) — Foresight & Impact
- Various tech advisors (mobile, web, design, comms)

**LoreWeaver Fit Analysis:**
- Gaming Focus: 0/40 — Legal tech, influencer marketing, data platforms
- Stage: 25/25 — Pre-seed/Seed fits
- Geographic: 10/20 — Finland/Nordic
- Check Size: 5/15 — $20-100k too small for €150K-400K raises

**ICP Score: 40 (Low Priority)**
Check size too small for current fundraising targets.`,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  },
  {
    id: 'l4FEnDQ8Wv4BLfr0LfYC',
    name: 'Aim High Venture',
    data: {
      tags: ['technology', 'clean-internet', 'food-service-ai', 'automotive', 'early-stage', 'spain', 'eu-wide'],
      investor: {
        type: 'Pre-Seed, Seed',
        investmentFocus: 'Technology, Clean Internet, Food Service AI, Automotive, Europe & Americas',
        fundingPreferences: 'Early-stage',
        fitScore: 45
      },
      notes: `**Aim High Venture** — Spanish early-stage VC

**Research (2026-03-03):**
- Supports exceptional founders at early stages
- Presence: Madrid, Barcelona, Mexico City, Berlin
- Team: Serial entrepreneurs, financial analysts, people/talent experts, technical/operational professionals
- Focus: Technology, Clean Internet, Food Service AI, Automotive
- Track record investing across Europe and Americas

**LoreWeaver Fit Analysis:**
- Gaming Focus: 0/40 — No gaming, focuses on food AI, automotive, clean tech
- Stage: 25/25 — Pre-seed/Seed fits perfectly
- Geographic: 10/20 — EU presence (Spain, Germany)
- Check Size: 10/15 — Unspecified but likely fits early-stage

**ICP Score: 45 (Low Priority)**
Generalist early-stage without gaming focus. Could be opportunistic if AI angle resonates.`,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  },
  {
    id: 'KMFZzgexGIAJfttGy4QJ',
    name: 'AINAD',
    data: {
      tags: ['ai', 'saas', 'health', 'education', 'fintech', 'sustainability', 'venture-studio', 'uk'],
      investor: {
        type: 'Venture Studio',
        investmentFocus: 'AI, SaaS, Health, Education, Fintech, Sustainability — builds companies, not traditional VC',
        fundingPreferences: '£100K - £500K',
        fitScore: 45
      },
      contact: {
        phone: '+44 20 3308 7666',
        email: 'info@ainad.net'
      },
      notes: `**AINAD** — UK venture studio (not traditional VC)

**Research (2026-03-03):**
- Website: ainadventures.com / ainad.net
- "Build Smarter. Scale Faster." — venture studio model
- Located: 86-90 Paul Street, London
- Focus: Creates high-impact startups in AI, SaaS, Education, Healthcare, Sustainability, FinTech
- NOT a traditional fund — they build companies

**Business Model:**
Venture studio = they co-found/build companies rather than just invest. Different engagement model than VC.

**LoreWeaver Fit Analysis:**
- Gaming Focus: 0/40 — No gaming (health, education, fintech focus)
- Stage: 25/25 — Early-stage building
- Geographic: 10/20 — UK/Europe
- Check Size: 10/15 — £100K-500K fits but studio model different

**ICP Score: 45 (Low Priority)**
Venture studio model doesn't fit LoreWeaver's needs — they build their own companies, not invest in external startups.`,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  },
  {
    id: 'xrgxN9FfEhYTGMk4R76k',
    name: 'Airborn',
    data: {
      tags: ['circular-economy', 'sustainable-food', 'climate-change-solutions', 'impact-investing', 'angel-collective', 'benelux', 'early-stage'],
      investor: {
        type: 'Angel Collective',
        investmentFocus: 'Impact/sustainability, Circular Economy, Sustainable Food, Climate Solutions',
        fundingPreferences: '€100k-€250k',
        fitScore: 55
      },
      notes: `**Airborn** — Belgian impact angel collective

**Research (2026-03-03):**
- Website: airborn.vc (currently down/unreachable)
- LinkedIn: @airborncollective
- "Impact-driven angel investors providing capital, knowhow & network to accelerate planet-first ventures"
- Focus: Sustainability, climate, circular economy, sustainable food
- Check size: €100k-€250k (avg ~€722k per round via syndication)
- Portfolio: ClimateCamp
- Based in Belgium (Benelux!)

**LoreWeaver Fit Analysis:**
- Gaming Focus: 0/40 — Pure sustainability/climate focus, no entertainment
- Stage: 25/25 — Pre-seed/Seed fits
- Geographic: 15/20 — Belgium = Benelux, good proximity
- Check Size: 15/15 — €100k-€250k perfect for current raises

**ICP Score: 55 (Low Priority)**
Good geographic fit (Benelux) and check size, but sustainability-only mandate doesn't match LoreWeaver. Would need strong impact angle (accessible storytelling? democratizing narrative?) to fit.`,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  },
  {
    id: 'ZyTyh31aTJqOktBE1IJk',
    name: 'Ajira Ventures',
    data: {
      tags: ['early-stage', 'germany', 'esports-connection', 'founder-friendly'],
      investor: {
        type: 'Pre-Seed, Seed',
        investmentFocus: 'Early-stage startups, Entrepreneurial talent',
        fundingPreferences: '€120k',
        fitScore: 55
      },
      contact: {
        name: 'Caspar von Hayek',
        title: 'Investor',
        email: null
      },
      notes: `**Ajira Ventures** — German pre-seed/seed fund

**Research (2026-03-03):**
- Germany-based, €120k checks
- Pre-seed/Seed focus

**Team:**
- Caspar von Hayek — Investor
  - **Esports background: Top 0.1% Fortnite player in EU** ⚡
  - Self-taught (built first PC from scrap parts)
  - Loves pressure-testing ideas with founders
- Charlie Hoch — Investor/Co-founder
  - Former competitive soccer player
  - Skipped business school to become investor
  - Passionate about entrepreneurial talent

**LoreWeaver Fit Analysis:**
- Gaming Focus: 15/40 — Caspar's esports background is notable, but fund isn't gaming-focused
- Stage: 25/25 — Pre-seed/Seed perfect
- Geographic: 10/20 — Germany/EU
- Check Size: 15/15 — €120k fits current raises well

**ICP Score: 55 (Low-Medium Priority)**
Interesting esports connection via Caspar. Could leverage gaming/esports angle in pitch. Worth exploring if they have personal interest in gaming/entertainment investments.`,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  },
  {
    id: 'C3ClDkxlBoKB8keaIxbY',
    name: 'Akcelerator Technologiczny Gliwice ASI Sp. z o.o.',
    data: {
      tags: ['innovative-technologies', 'industrial-processes', 'accelerator', 'poland', 'tech-park', 'hardware'],
      investor: {
        type: 'Accelerator',
        investmentFocus: 'Innovative Technologies, Industrial Processes, Hardware, DeepTech',
        fundingPreferences: 'Accelerator model',
        fitScore: 45
      },
      contact: {
        email: 'info@akceleratorgliwice.pl'
      },
      notes: `**Akcelerator Technologiczny Gliwice** — Polish tech accelerator

**Research (2026-03-03):**
- Part of TechnoPark Gliwice (Science & Technology Park)
- Focus: Industrial tech, hardware, innovative technologies
- Accelerator model (not pure VC)

**Portfolio includes:**
- Cypherdog (cybersecurity)
- Smart RFID (UHF RFID technology)
- 3D Motion Controls (motion controllers for CAD/CAM)
- Hoverbike Raptor (flying vehicle!)
- CARDIOVICE (telemedical ECG)
- IAMBOT (chatbot platform with AI)
- GlucoActive (non-invasive glucose monitor)
- One gaming company (3D games/simulation)

**LoreWeaver Fit Analysis:**
- Gaming Focus: 10/40 — Has one gaming portfolio company (3D games/simulation)
- Stage: 25/25 — Accelerator fits early-stage
- Geographic: 10/20 — Poland/EU
- Check Size: 10/15 — Accelerator model, unclear investment terms

**ICP Score: 45 (Low Priority)**
Industrial/hardware focus doesn't match LoreWeaver's software/AI narrative tools. Gaming portfolio presence is minimal.`,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  },
  {
    id: 'A96wheuo1EUVrjVzvj0n',
    name: 'Akha Ventures',
    data: {
      tags: ['sustainable-products', 'sustainability', 'impact-investing', 'uk', 'early-stage'],
      investor: {
        type: 'Seed Capital, Patient Capital, Private Credit',
        investmentFocus: 'Sustainable Products, Sustainability',
        fundingPreferences: 'Seed',
        fitScore: 45
      },
      contact: {
        email: 'contact@akhaventures.com'
      },
      notes: `**Akha Ventures** — UK sustainability-focused VC

**Research (2026-03-03):**
- "Venture capital with sustainability at the core"
- London-based
- Focus: Sustainable products and companies that can change the planet
- LinkedIn: @akha-ventures

**Mission:**
"We believe in companies that want to redefine the boundaries of doing business in today's world. We help entrepreneurs with the purpose to create sustainable products."

**LoreWeaver Fit Analysis:**
- Gaming Focus: 0/40 — Pure sustainability mandate
- Stage: 25/25 — Seed fits
- Geographic: 10/20 — UK/Europe
- Check Size: 10/15 — Unspecified, likely fits

**ICP Score: 45 (Low Priority)**
Sustainability-only mandate. Would need creative positioning (democratizing storytelling, reducing waste in content production?) to fit — likely not worth the stretch.`,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  }
];

async function updateBatch9() {
  console.log('Updating batch 9 leads with research findings...\n');
  
  for (const update of updates) {
    try {
      await db.collection('leads').doc(update.id).update(update.data);
      console.log(`✅ Updated: ${update.name} (ICP: ${update.data.investor.fitScore})`);
    } catch (error) {
      console.error(`❌ Failed: ${update.name} — ${error.message}`);
    }
  }
  
  console.log('\n=== BATCH 9 SUMMARY ===');
  const scored = updates.map(u => ({
    name: u.name,
    score: u.data.investor.fitScore,
    priority: u.data.investor.fitScore >= 80 ? '🔴 High' :
              u.data.investor.fitScore >= 60 ? '🟡 Medium' :
              u.data.investor.fitScore >= 40 ? '🟢 Low' : '⚪ Skip'
  }));
  
  scored.sort((a, b) => b.score - a.score);
  scored.forEach(s => console.log(`${s.priority} ${s.name}: ${s.score}`));
  
  const qualified = updates.filter(u => u.data.investor.fitScore >= 85);
  console.log(`\nQualified (ICP >= 85): ${qualified.length}`);
  if (qualified.length > 0) {
    qualified.forEach(q => console.log(`  - ${q.name}`));
  }
}

updateBatch9().then(() => {
  console.log('\nDone!');
  process.exit(0);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
