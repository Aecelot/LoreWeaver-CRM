// Update batch 11 leads (100-109) with research findings
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
    id: 'rDB1bGIeA33TUUh0eTPm',
    name: 'āltitude',
    data: {
      notes: `āltitude is a European pre-seed/seed VC fund co-founded by Marc Penkala (Berlin), Ingo Drexler (Zurich), and Videesha Boeckle (London). They focus exclusively on B2B software startups serving SMEs across Europe.

Investment Focus: Software-as-a-Service for SMEs, including LegalTech, HealthTech, FinTech, and RetailTech verticals.
Stage: Pre-seed to Series A
Check Size: €300K-€2M first checks
Geography: European SME tech companies

Why NOT a fit for LoreWeaver:
- Exclusively B2B SaaS for SME market
- No gaming, entertainment, or AI/creative tech focus
- Target customers are small-medium businesses, not game studios
- Investment thesis doesn't align with narrative AI for games

Contact: hello@altitude-vc.com
Website: https://www.altitude-vc.com/

Research Date: 2026-03-03`,
      tags: ['software-startups', 'sme-tech', 'legaltech', 'healthtech', 'fintech', 'retailtech', 'b2b-saas', 'pre-seed', 'seed', 'germany', 'europe'],
      'investor.fitScore': 20,
      'contact.email': 'hello@altitude-vc.com',
      status: 'researched'
    }
  },
  {
    id: 'cFlFw9tivyQ9NVKwb6Ko',
    name: 'Alven',
    data: {
      notes: `Alven is an independent French venture capital firm founded in 1999, based in Paris. They've raised €350M and invested in 130+ startups over 20 years.

Investment Focus: B2C/B2B marketplaces, productivity and dev tools, vertical AI platforms, consumer social & entertainment, B2C financial services, and wellness brands.
Stage: Seed to Series A
Check Size: €100K to €15M with substantial follow-on reserves
Geography: Europe (France, UK, Finland, Sweden, Poland, Switzerland, USA)

Notable Portfolio:
- GAMING: Madbox (mobile games publisher)
- Social: Happn, Yubo, Tonsser
- Productivity: Dataiku, Algolia, Qonto, Stripe
- Dev Tools: Platform.sh, Sqreen

Team Note: François focuses on "new forms of consumer communication, education and entertainment – especially for younger generations"

70+ exits including: Sqreen to Datadog, Cardiologs to Philips, Frichti to Gorillas

Why MODERATE fit for LoreWeaver:
+ Has invested in mobile games (Madbox)
+ Consumer entertainment is core focus area
+ François specifically covers entertainment sector
- Gaming investment was mobile casual games, not narrative/AI
- No clear AI-for-games thesis
- More consumer app focused than gaming middleware/tools

Contact: contact@alven.co | +33 1 55 34 38 38
Address: 124 rue Réaumur, 75002 Paris
Website: https://alven.co

Research Date: 2026-03-03`,
      tags: ['france', 'seed', 'series-a', 'strategic', 'consumer-entertainment', 'gaming', 'mobile-games', 'ai-platforms', 'marketplace'],
      'investor.fitScore': 70,
      'contact.email': 'contact@alven.co',
      status: 'researched'
    }
  },
  {
    id: 'g5XSuXpPB606AVlyfwts',
    name: 'AM Ventures',
    data: {
      notes: `AM Ventures is a Munich-based venture capital firm exclusively focused on industrial 3D printing and additive manufacturing. They closed a $100M fund in 2022.

Investment Focus: EXCLUSIVELY additive manufacturing / 3D printing startups
Stage: Seed to Series B
Geography: International (portfolio spans 3 continents)
Portfolio: 18+ companies including Vectoflow, Conflux Technology, Lightforce, Additive Drives

Why NOT a fit for LoreWeaver:
- Single-vertical focus on 3D printing hardware/materials
- No software, AI, gaming, or entertainment investments
- Industrial manufacturing thesis, not creative tech
- Zero overlap with narrative AI or game development

Contact: info@amventures.com
Website: https://amventures.com/

Research Date: 2026-03-03`,
      tags: ['additive-manufacturing', '3d-printing', 'industrial', 'hardware', 'germany', 'deep-tech'],
      'investor.fitScore': 10,
      'contact.email': 'info@amventures.com',
      status: 'disqualified'
    }
  },
  {
    id: 'xjUvlJZv04AVM1uRizj9',
    name: 'Amadeus Capital Partners',
    data: {
      notes: `Amadeus Capital Partners is a Cambridge-based deep tech venture capital firm founded in 1997 by Anne Glover and Hermann Hauser. They've raised over $1.3 billion and backed 200+ companies with 17 IPOs.

Investment Focus: Deep tech across three areas:
1. INTELLIGENCE: AI, machine learning, quantum computing, cybersecurity
2. HUMAN: Health, medicine, wellness technologies
3. PLANET: Sustainability, energy, novel materials, space

Stage: Seed to growth
Geography: Primarily UK/Europe
Team: 29 people including 12 partners, recent addition Kelly Richdale (Venture Partner, deeptech/cyber/quantum)

Notable AI Portfolio: PolyAI (voice AI), V7 Labs (computer vision), Unlikely AI (neurosymbolic AI), Safe Intelligence (AI validation), GEMESYS (AI chips), Healx (drug discovery AI)

Why NOT a fit for LoreWeaver:
- Deep tech / hard science focus (quantum, biotech, hardware)
- AI investments are enterprise/infrastructure, not creative/entertainment
- No gaming, entertainment, or consumer media investments
- Thesis is "hard problems in large markets" - enterprise/industrial focus
- Portfolio has zero gaming or narrative tech companies

Website: https://www.amadeuscapital.com/

Research Date: 2026-03-03`,
      tags: ['ai-and-machine-learning', 'deep-tech', 'quantum', 'cyber-security', 'digital-health', 'enterprise-software', 'united-kingdom', 'seed', 'series-a', 'series-b'],
      'investor.fitScore': 25,
      status: 'researched'
    }
  },
  {
    id: 'iroRmAwNmfoBTL7gTHss',
    name: 'amberra',
    data: {
      notes: `amberra is a Berlin-based corporate venturing studio of the German Cooperative Financial Network (Volksbanken/Raiffeisenbanken). Founded in 2022, it operates as both a VC fund and startup builder.

Investment Focus: "Beyond Banking" ecosystem in four areas:
1. Housing and construction
2. Health
3. Sustainability
4. Regional economy

Stage: Series A focus
Geography: DACH region (Germany, Austria, Switzerland)
Model: Invest in startups, partner with startups, and build ventures

Why NOT a fit for LoreWeaver:
- Banking/cooperative ecosystem play, not tech VC
- Focus areas (housing, health, sustainability, regional economy) have zero gaming/AI overlap
- Corporate venture arm tied to financial services strategy
- DACH-only geographic focus
- No technology or entertainment thesis

Contact: info@amberra.de
Website: https://www.amberra.de/

Research Date: 2026-03-03`,
      tags: ['housing', 'health', 'sustainability', 'regional-economy', 'germany', 'cvc', 'banking'],
      'investor.fitScore': 5,
      'contact.email': 'info@amberra.de',
      status: 'disqualified'
    }
  },
  {
    id: '2it5jKPmWz1OivvNXpre',
    name: 'AMEX Ventures',
    data: {
      notes: `Amex Ventures is the corporate venture capital arm of American Express, founded in 2011 and based in New York. Led by Matt Sueoka (SVP & Global Head).

Investment Focus: Startups that can drive innovation across American Express business:
- Fintech and payments
- Commerce and retail
- Consumer services
- Enterprise technology
- Frontier technologies (aligned with Amex capabilities)

Stage: Seed to Series B
Notable Portfolio: Stripe, Instacart, Plaid, Boom Supersonic, FalconX

Strategic Model: ~2/3 of investments have partnerships with American Express business units. Investments enhance Consumer Card Membership value proposition (travel, dining, entertainment).

Why NOT a fit for LoreWeaver:
- CVC tied to American Express strategic interests
- Focus is fintech, payments, commerce - not gaming/creative
- "Entertainment" focus is consumer experiences (restaurants, travel) not games
- No gaming or AI-for-creative investments in portfolio
- Would need clear Amex business unit synergy

Contact: amexventures@aexp.com
Website: https://www.americanexpress.com/us/business/american-express-ventures/

Research Date: 2026-03-03`,
      tags: ['fintech', 'commerce', 'frontier-technologies', 'consumer-services', 'enterprise-technology', 'cvc', 'united-states', 'payments'],
      'investor.fitScore': 10,
      'contact.email': 'amexventures@aexp.com',
      status: 'disqualified'
    }
  },
  {
    id: 'VIcqnWbrcwLsD9hI7mSi',
    name: 'Amino Collective',
    data: {
      notes: `Amino Collective is a Berlin-based early-stage venture capital firm founded to invest exclusively in health and biotechnology companies.

Investment Focus: Health and bio sectors only
- Discovery tools (healthcare)
- Enterprise systems (healthcare)
- Devices and supplies
- Biotechnology

Stage: Early-stage (Pre-seed/Seed)
Geography: European ventures with global scaling potential
Portfolio: Valinor (Biotechnology), Equator, Portal Biotech

Mission: "Partner with scientists and entrepreneurs to build companies that shape a positive future for humanity"

Why NOT a fit for LoreWeaver:
- Exclusively health/biotech vertical
- No technology, AI, gaming, or entertainment investments
- Life sciences thesis has zero overlap with narrative AI
- Early-stage but wrong sector entirely

Contact: hi@aminocollective.com
Website: https://www.aminocollective.com

Research Date: 2026-03-03`,
      tags: ['health', 'biotechnology', 'life-sciences', 'germany', 'early-stage', 'deep-tech'],
      'investor.fitScore': 5,
      'contact.email': 'hi@aminocollective.com',
      status: 'disqualified'
    }
  },
  {
    id: 'gKOnwZjPJ3yzeWTsMjUf',
    name: 'Amitger Ventures',
    data: {
      notes: `Amitger is a Catalan (Spanish) business group, NOT a technology VC fund. The group operates in traditional industries including tourist accommodation, hospitality, construction, and business consulting.

Business Areas (from Catalan website):
- Tourist accommodation (allotjament turístic)
- Hospitality (hosteleria)
- Construction (construcció)
- Business consulting (assessorament empresarial)

Why NOT a fit for LoreWeaver:
- NOT a venture capital fund
- Operating company / holding group in traditional sectors
- Tourism, hospitality, and construction focus
- No technology, gaming, or startup investment activity
- Misclassified as investor in CRM

Website: https://amitger.com/

Research Date: 2026-03-03`,
      tags: ['consumer', 'real-estate', 'construction-tech', 'spain', 'hospitality', 'tourism'],
      'investor.fitScore': 5,
      status: 'disqualified'
    }
  },
  {
    id: 'd1Nlr6JMmhcwFQJOZokM',
    name: 'Ampli Ventures',
    data: {
      notes: `Ampli Ventures is a Stockholm-based venture capital firm focused on Nordic B2B SaaS companies ready to scale.

Investment Focus: SaaS and cloud software (B2B only)
Stage: Seed and Series A
Check Size: €1-5M per ticket
Geography: Nordic region exclusively

Model: Operational support for SaaS scaling

Why NOT a fit for LoreWeaver:
- Purely B2B SaaS focus, not gaming/entertainment
- Nordic-only geographic constraint (LoreWeaver is Dutch)
- No AI, gaming, or creative tech thesis
- Enterprise software focus doesn't align with game development tools

Website: https://www.ampli.vc

Research Date: 2026-03-03`,
      tags: ['saas', 'cloud', 'b2b', 'sweden', 'nordic', 'seed', 'series-a'],
      'investor.fitScore': 15,
      status: 'researched'
    }
  },
  {
    id: 'gfWTQvNoMe8oQkZwZBxR',
    name: 'AMPLIFIER',
    data: {
      notes: `AMPLIFIER is a Berlin-based early-stage venture capital fund focused on transforming the global supply chain through investments in industrial, logistics, and mobility sectors.

Investment Focus: "World's core operating system - the supply chain"
- Industrial technology
- Logistics and fulfillment
- Mobility and transportation

Stage: Seed to Series A
Portfolio includes: Micropsi Industries, Hive, Terminal Industries, Bliq, Aether Biomachines, Hexight, Yardlink, Trucksters, Isembard

Why NOT a fit for LoreWeaver:
- Industrial/supply chain vertical focus
- No gaming, entertainment, AI, or creative tech investments
- Portfolio is all logistics, mobility, industrial automation
- Thesis is physical world infrastructure, not digital entertainment

Website: https://amplifierlab.io

Research Date: 2026-03-03`,
      tags: ['industrial', 'logistics', 'mobility', 'supply-chain', 'germany', 'seed', 'series-a'],
      'investor.fitScore': 10,
      status: 'disqualified'
    }
  }
];

async function updateLeads() {
  console.log('Updating batch 11 leads with research findings...\n');
  
  for (const update of updates) {
    try {
      const docRef = db.collection('leads').doc(update.id);
      await docRef.update({
        ...update.data,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log(`✓ Updated: ${update.name} (ICP: ${update.data['investor.fitScore']})`);
    } catch (error) {
      console.error(`✗ Failed to update ${update.name}:`, error.message);
    }
  }
  
  console.log('\nBatch 11 research complete.');
  console.log('Leads qualified (ICP >= 85): 0');
  console.log('Leads researched: 10');
  console.log('Leads disqualified: 7');
}

updateLeads().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
