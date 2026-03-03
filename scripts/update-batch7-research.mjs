// Batch 7 research updates - leads 60-69 (investor, status=new)
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
    id: '1SgqGWkry8MdmEytf0cm', // Lead 62 - YGG co-founder
    data: {
      name: 'Gabby Dizon',
      website: 'https://www.linkedin.com/in/gabbydizon/',
      tags: ['angel', 'web3-gaming', 'ygg', 'philippines', 'gaming-veteran', 'tier-2'],
      notes: `**Gabby Dizon** — YGG (Yield Guild Games) co-founder, web3 gaming pioneer.

**Background:**
- Co-founder of Yield Guild Games (YGG), the leading play-to-earn gaming guild
- 50+ portfolio companies as angel investor
- 20+ years in gaming industry in Southeast Asia
- CEO of Altitude Games (Manila-based mobile game studio)
- Chairman and co-founder of Alto.io (blockchain game platform)
- Partner at LongHash Ventures
- Based in Philippines (Pasig, Metro Manila)

**Investment Focus:**
- Web3/blockchain gaming
- Play-to-earn games
- NFT gaming infrastructure
- Southeast Asian gaming startups

**LoreWeaver Fit Analysis:**
- Strong gaming industry background ✓
- Deep understanding of game economics and player engagement ✓
- Focus is primarily on web3/blockchain gaming (not narrative AI) △
- Geographic focus on SEA, not Europe/US where LoreWeaver is based △
- Could provide valuable connections to SEA gaming market

**ICP Assessment:** Web3 gaming expertise is valuable but his focus on blockchain/P2E games differs from LoreWeaver's narrative AI direction. Good for network value but not ideal primary investor.`,
      investor: {
        fitScore: 72,
        checkSize: '$25K-$100K',
        investmentFocus: ['web3-gaming', 'play-to-earn', 'nft-gaming', 'sea-gaming'],
        portfolioSize: 50,
        linkedIn: 'https://www.linkedin.com/in/gabbydizon/'
      },
      contact: {
        name: 'Gabby Dizon',
        linkedin: 'https://www.linkedin.com/in/gabbydizon/'
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  },
  {
    id: '6NLyUWaIVUUk4jL3ue1o', // Lead 63 - Matt Mullenweg (update existing)
    data: {
      tags: ['angel', 'us', 'open-source', 'dev-tools', 'wordpress', 'tier-2', 'seed-focus'],
      notes: `**Matt Mullenweg** — WordPress/Automattic founder, Audrey Capital principal.

**Background:**
- Co-founder of WordPress (powers 40%+ of the web)
- Founder & CEO of Automattic (WordPress.com, WooCommerce, Tumblr)
- Principal at Audrey Capital (personal investment vehicle)
- Jazz musician and photographer
- Based in Houston, TX / San Francisco

**Investment Focus via Audrey Capital:**
- Open source software
- Developer tools
- Content creation platforms
- Early-stage startups

**LoreWeaver Fit Analysis:**
- Strong platform/infrastructure mindset from WordPress ✓
- Open source philosophy aligns with LoreWeaver's developer-friendly approach ✓
- Not specifically gaming or AI focused △
- Huge reach but very selective in investments △
- More interested in platforms than B2B tools

**ICP Assessment:** Impressive background but investment thesis doesn't align well with narrative AI for games. WordPress/Automattic focus is on content platforms broadly, not gaming vertical.`,
      investor: {
        fitScore: 65,
        checkSize: '$50K-$250K',
        investmentFocus: ['open-source', 'dev-tools', 'content-platforms', 'early-stage'],
        linkedIn: 'https://www.linkedin.com/in/mattmullenweg/'
      },
      contact: {
        name: 'Matt Mullenweg',
        linkedin: 'https://www.linkedin.com/in/mattmullenweg/'
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  },
  {
    id: 'Yw9IiV84Hnu1SirLu9IL', // Lead 67 - Crashlytics co-founder
    data: {
      name: 'Jeff Seibert',
      website: 'https://jeffseibert.com/',
      tags: ['angel', 'crashlytics', 'twitter', 'dev-tools', 'mobile-analytics', 'tier-2'],
      notes: `**Jeff Seibert** — Serial entrepreneur, Crashlytics co-founder, Digits CEO.

**Background:**
- Founder & CEO of Digits (AI-native accounting platform)
- Co-founder & CEO of Crashlytics (acquired by Twitter 2013 for $100M+)
- Former Head of Consumer Product at Twitter
- Featured in Netflix documentary "The Social Dilemma"
- Co-founded Increo (acquired by Box 2009)
- 95+ startup investments
- Stanford CS, Mayfield Fellow
- Based in San Francisco

**Investment Focus:**
- Developer tools and analytics
- Mobile/consumer tech
- B2B SaaS
- Technical founders

**LoreWeaver Fit Analysis:**
- Excellent technical background (Crashlytics = mobile dev tools) ✓
- Understands developer experience and tools ✓
- Active angel with large portfolio (95+) ✓
- Focus is on dev tools/analytics, not gaming △
- No evident gaming industry connections △

**ICP Assessment:** Strong technical investor with great track record, but investment thesis centers on developer tools and mobile analytics rather than gaming or AI. Useful for technical validation but not ideal gaming industry investor.`,
      investor: {
        fitScore: 58,
        checkSize: '$25K-$100K',
        investmentFocus: ['dev-tools', 'mobile-analytics', 'b2b-saas', 'technical-founders'],
        portfolioSize: 95,
        linkedIn: 'https://www.linkedin.com/in/jeffseibert/'
      },
      contact: {
        name: 'Jeff Seibert',
        linkedin: 'https://www.linkedin.com/in/jeffseibert/'
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  },
  {
    id: '2VRNvnLyTVdkGFRVlNVc', // Lead 69 - Instacart co-founder
    data: {
      name: 'Max Mullen',
      website: 'https://www.maxmullen.com/',
      tags: ['angel', 'instacart', 'consumer-tech', 'founder-community', 'prolific-angel', 'tier-2'],
      notes: `**Max Mullen** — Instacart co-founder, prolific angel investor.

**Background:**
- Co-founded Instacart (grocery delivery unicorn, IPO 2023)
- 100+ startup investments
- Runs "Workshop" founder community in San Francisco
- USC graduate
- Based in San Francisco

**Notable Portfolio:**
- Ashby (HR tech)
- Checkr (background checks)
- Deel (global payroll)
- Mercury (banking)
- Lattice (people management)
- Owner.com (restaurant tech)
- Many more consumer and B2B companies

**Investment Focus:**
- Consumer tech
- B2B SaaS
- Marketplaces
- Technical founders
- Early-stage (seed/Series A)

**LoreWeaver Fit Analysis:**
- Prolific angel with huge portfolio (100+) ✓
- Understands marketplace dynamics (Instacart) ✓
- Strong SF network through Workshop ✓
- No evident gaming or AI focus △
- Portfolio skews toward consumer/marketplace, not gaming tech △

**ICP Assessment:** Impressive founder-turned-investor but investment thesis doesn't match LoreWeaver's gaming AI focus. Better fit for consumer marketplaces or B2B SaaS than narrative technology for games.`,
      investor: {
        fitScore: 52,
        checkSize: '$25K-$100K',
        investmentFocus: ['consumer-tech', 'b2b-saas', 'marketplaces', 'early-stage'],
        portfolioSize: 100,
        linkedIn: 'https://www.linkedin.com/in/maxmullen/'
      },
      contact: {
        name: 'Max Mullen',
        linkedin: 'https://www.linkedin.com/in/maxmullen/'
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  }
];

// Leads that cannot be researched (missing names/identifying info)
const unreseachable = [
  { id: 'kY0ojtLUcJwZ6DsKBe9J', notes: '8 gaming investments.' },
  { id: '19oTKVWntUSAqeIwaPQc', notes: '7 gaming investments.' },
  { id: 'Fa0ifCXUKku1tUzbYQ49', notes: '7 gaming investments.' },
  { id: 'JBjOQwUIxgTv8Q7QyRDo', notes: '7 gaming investments.' },
  { id: 'RHtQzC3xIruYrcK3l9Ts', notes: '7 gaming investments.' },
  { id: 'moNSiFes5GHSEVAXjgXx', notes: 'NBA player. 8 gaming investments. Athlete-investor.' }
];

async function updateLeads() {
  console.log('=== BATCH 7 LEAD RESEARCH UPDATE ===\n');
  
  let updated = 0;
  let failed = 0;
  
  for (const update of updates) {
    try {
      await db.collection('leads').doc(update.id).update(update.data);
      console.log(`✓ Updated: ${update.data.name || update.id}`);
      updated++;
    } catch (err) {
      console.error(`✗ Failed: ${update.id}`, err.message);
      failed++;
    }
  }
  
  console.log('\n--- UNRESEARCHABLE LEADS (missing names) ---');
  for (const lead of unreseachable) {
    console.log(`⚠ ${lead.id}: "${lead.notes}" - Cannot research without identifying info`);
  }
  
  console.log(`\n=== SUMMARY ===`);
  console.log(`Updated: ${updated}`);
  console.log(`Failed: ${failed}`);
  console.log(`Unresearchable: ${unreseachable.length}`);
  console.log(`Total in batch: 10`);
  console.log(`\nNone qualified (ICP >= 85). Highest ICP: Gabby Dizon at 72.`);
}

updateLeads().then(() => process.exit(0)).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
