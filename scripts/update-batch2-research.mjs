// Update batch 2 leads with research findings
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
    id: '3P0XDPnLvc74C3hV3upR',
    name: 'Gary Vaynerchuk (Angel)',
    updates: {
      name: 'Gary Vaynerchuk',
      website: 'https://garyvaynerchuk.com',
      tags: ['angel', 'celebrity', 'consumer', 'mobile', 'tier-2', 'us', 'series-a'],
      notes: `**Gary Vaynerchuk** — Serial entrepreneur and prolific angel investor with 176+ investments.

**Background:**
- Chairman of VaynerX, CEO of VaynerMedia, Creator & CEO of VeeFriends
- Known as "GaryVee" — one of the most influential voices in business/marketing
- Early investments in Facebook, Twitter, Tumblr, Venmo, Snapchat, Coinbase, Uber

**Gaming Investments:**
- ~10 gaming investments per original notes
- SlamBall team owner
- Consumer/mobile focus — tends toward entertainment & media

**Investment Style:**
- Angel/seed through Series A
- Invests in people he believes in + consumer traction
- Very high profile but difficult to reach for cold outreach
- Investment arm: Vayner/RSE (partnership with RSE Ventures)

**Contact:**
- Email: gary@veefriends.com (public contact)
- Twitter/X: @garyvee (13M+ followers)
- LinkedIn: linkedin.com/in/garyvaynerchuk

**LoreWeaver Fit Assessment:**
- Consumer/mobile focus doesn't align well with narrative middleware
- Gaming investments exist but not in tools/middleware space
- Celebrity status makes cold outreach very unlikely to succeed
- Better as a "dream investor" than actionable lead

**ICP Score: 55** — Gaming connection exists but focus is consumer/mobile, not game dev tools. High profile but low accessibility.

Sources: PitchBook, Inc.com, SlamBall official, ContactOut`,
      investor: {
        fitScore: 55,
        checkSize: '$100K-$1M',
        stages: ['Seed', 'Series A'],
        thesis: 'Consumer tech, media, entertainment. Invests in people with passion and drive.',
        recentDeals: ['SlamBall', 'VeeFriends ecosystem', 'Various consumer startups']
      },
      contacts: [
        {
          name: 'Gary Vaynerchuk',
          role: 'Founder/Investor',
          email: 'gary@veefriends.com',
          linkedIn: 'https://linkedin.com/in/garyvaynerchuk',
          twitter: '@garyvee'
        }
      ],
      status: 'new' // Keep as new - not a great fit
    }
  },
  {
    id: '3ThBseP0A2FKirvbBjw9',
    name: 'Sam Enrico Williams (Angel)',
    updates: {
      name: 'Sam Enrico Williams',
      website: 'https://sewcapital.co.uk',
      tags: ['angel', 'uk', 'european', 'gaming', 'esports', 'seed-focus', 'tier-2'],
      notes: `**Sam Enrico Williams** — UK gaming angel and founder of SEW Capital.

**Background:**
- Founder of SEW Capital (incubator and fund since 2012)
- Founder of Crypt2 Esports
- Partner at Knight Capital (digital property assets)
- Focus on disrupting industry norms through development

**Investment Focus:**
- 18+ gaming investments in Europe (per original data)
- Pre-seed and seed stage
- UK/European gaming ecosystem
- Digital assets and esports intersection

**Portfolio:**
- Gaming startups across UK and Europe
- Digital asset projects
- Esports ventures

**Contact:**
- Email: sam@zloadr.com (via ContactOut)
- LinkedIn: linkedin.com/in/samenricowilliams

**LoreWeaver Fit Assessment:**
- Active in European gaming ecosystem — good geographic fit
- Seed focus aligns with LoreWeaver stage
- Digital assets/esports focus may not directly align with narrative AI
- Worth pursuing as UK gaming connection

**ICP Score: 72** — Active UK gaming angel with good seed focus, but portfolio leans toward esports/digital assets rather than game dev tools.

Sources: Crunchbase, Shizune, ContactOut, The Org`,
      investor: {
        fitScore: 72,
        checkSize: '$25K-$100K',
        stages: ['Pre-Seed', 'Seed'],
        thesis: 'Gaming, esports, digital assets, disruptive technologies',
        recentDeals: ['Various UK gaming startups', 'Crypt2 Esports']
      },
      contacts: [
        {
          name: 'Sam Enrico Williams',
          role: 'Founder/Angel',
          email: 'sam@zloadr.com',
          linkedIn: 'https://linkedin.com/in/samenricowilliams'
        }
      ],
      status: 'new'
    }
  },
  {
    id: '4AfVV4hgYQPGbTzd6Szu',
    name: 'Asbjoern Malte Soendergaard (Angel)',
    updates: {
      name: 'Asbjørn Malte Søndergaard',
      website: 'https://tactilegames.com',
      tags: ['angel', 'nordic', 'european', 'mobile', 'casual-games', 'game-operator', 'seed-focus', 'tier-1'],
      notes: `**Asbjørn Malte Søndergaard** — Danish gaming veteran, founder of Tactile Games.

**Background:**
- Founder of Tactile Games (Copenhagen, 2009) — casual mobile games developer
- Tactile raised $50.5M in funding
- Active Nordic gaming angel investor
- Part of the tight-knit Nordic gaming investor network

**Notable Investments:**
- Savage Game Studios (€4.4M seed, alongside Play Ventures, Makers Fund)
- Dead Astronauts (€4M seed, alongside Behold Ventures, 1Up Ventures)
- Propane (€1M, AI-powered customer intelligence)

**Investment Style:**
- Seed stage focus
- Nordic gaming ecosystem
- Often co-invests with: Joakim Achrén, Klaas Kersting, Are Mack Growen, Kristian Segerstrale

**Contact:**
- LinkedIn: Via Crunchbase profile
- Best approach: Nordic gaming events, warm intro through Nordic network

**LoreWeaver Fit Assessment:**
- Excellent: Active gaming angel with deep industry experience
- Mobile/casual background but invests across gaming
- Nordic network access is valuable
- Invested in AI (Propane) — shows AI interest
- Strong co-investor network for follow-on

**ICP Score: 88** — Highly active gaming angel with operator experience, Nordic network, and demonstrated AI interest. Excellent seed-stage fit.

Sources: Crunchbase, Nordic 9, EU-Startups, GamesIndustry.biz, Tracxn`,
      investor: {
        fitScore: 88,
        checkSize: '$25K-$150K',
        stages: ['Seed'],
        thesis: 'Gaming studios, especially Nordic. Operator turned investor.',
        recentDeals: ['Dead Astronauts (€4M)', 'Savage Game Studios (€4.4M)', 'Propane (€1M)']
      },
      contacts: [
        {
          name: 'Asbjørn Malte Søndergaard',
          role: 'Founder Tactile Games / Angel',
          linkedIn: 'https://linkedin.com/in/asbjoernmalte'
        }
      ],
      status: 'qualified' // ICP >= 85
    }
  },
  {
    id: '4KlEv3sJc5CHuW5raDDk',
    name: 'Jon Oringer (Angel)',
    updates: {
      name: 'Jon Oringer',
      website: 'https://shutterstock.com',
      tags: ['angel', 'us', 'creator-economy', 'content', 'tier-2', 'series-a'],
      notes: `**Jon Oringer** — Founder of Shutterstock, tech billionaire, angel investor.

**Background:**
- Founded Shutterstock in 2003 (microstock photography platform)
- Executive Chairman since 2020 (was CEO 2003-2020)
- NYSE listed since 2012 — became NY's first tech billionaire in 2013
- Also: helicopter pilot, serial bootstrapper

**Investment Portfolio:**
- NUE Life Health (mental health)
- Transpose (Web3 data infrastructure)
- Spenny (savings/investing)
- ~7 gaming investments (per original data)

**Investment Style:**
- Angel/seed through Series A
- Content/creator economy focus
- Marketplace business models

**Contact:**
- LinkedIn: linkedin.com/in/shutterstock
- Best approach: Through Shutterstock network or tech events

**LoreWeaver Fit Assessment:**
- Creator economy/content background aligns with narrative generation
- Gaming investments exist but unclear depth
- Shutterstock integration potential (stock content for games?)
- Content marketplace experience relevant to game asset pipeline

**ICP Score: 70** — Creator economy background relevant, but primary focus not on gaming/game tools. Gaming investments suggest some interest.

Sources: Wikipedia, LinkedIn, Crunchbase, Forbes`,
      investor: {
        fitScore: 70,
        checkSize: '$100K-$500K',
        stages: ['Seed', 'Series A'],
        thesis: 'Creator economy, content marketplaces, tech-enabled services',
        recentDeals: ['NUE Life Health', 'Transpose', 'Spenny']
      },
      contacts: [
        {
          name: 'Jon Oringer',
          role: 'Founder Shutterstock / Angel',
          linkedIn: 'https://linkedin.com/in/shutterstock'
        }
      ],
      status: 'new'
    }
  },
  {
    id: '6A6c4IGpcXSTkXnh2389',
    name: 'Ethan Levy (Angel)',
    updates: {
      name: 'Ethan Levy',
      website: 'https://deconstructoroffun.com',
      tags: ['angel', 'us', 'mobile', 'f2p', 'game-designer', 'industry-expert', 'tier-2'],
      notes: `**Ethan Levy** — F2P game design expert, host of Deconstructor of Fun.

**Background:**
- Host and Publisher at Deconstructor of Fun (industry-leading F2P games blog)
- 7 years at N3TWORK (mobile gaming platform)
- Currently CEO of a stealth VC-backed startup
- USC education, games-as-a-service specialist
- GDC speaker (2024+)

**Expertise:**
- F2P game design and monetization
- Mobile games industry
- Game economics and live ops
- At the intersection of game design and marketing

**Contact:**
- LinkedIn: linkedin.com/in/famousaspect
- Twitter: @famousaspect
- Best approach: Through Deconstructor of Fun, GDC events

**LoreWeaver Fit Assessment:**
- Deep gaming industry knowledge and connections
- F2P/mobile focus doesn't directly align with narrative RPG tools
- Deconstructor of Fun platform = thought leadership potential
- Currently running own startup — may have limited bandwidth
- Better as advisor/connector than check-writer

**ICP Score: 62** — Excellent industry connections and expertise, but F2P mobile focus misaligned with Director's narrative RPG positioning.

Sources: LinkedIn, Deconstructor of Fun, GDC Schedule, PocketGamer`,
      investor: {
        fitScore: 62,
        checkSize: '$10K-$50K',
        stages: ['Seed'],
        thesis: 'F2P mobile games, games-as-a-service',
        recentDeals: ['Stealth startup (current CEO)']
      },
      contacts: [
        {
          name: 'Ethan Levy',
          role: 'CEO (stealth) / DoF Host',
          linkedIn: 'https://linkedin.com/in/famousaspect',
          twitter: '@famousaspect'
        }
      ],
      status: 'new'
    }
  },
  {
    id: '6N3uh75h78NXBeNPWpOC',
    name: 'Mark Dyne (Angel)',
    updates: {
      name: 'Mark Dyne',
      website: 'https://morpheus.com',
      tags: ['angel', 'us', 'vc-partner', 'gaming', 'esports', 'hardware', 'seed-focus', 'series-a', 'tier-1'],
      notes: `**Mark Dyne** — Founding Partner & Chairman of Morpheus Ventures.

**Background:**
- Founding Partner and Chairman of Morpheus Ventures ($200M Fund II)
- Board member at Atomico (Europe's preeminent VC)
- Board: Talon International (TALN), RapidDeploy, HouseCanary
- Also: Founder, Chairman & CEO at ECA Ventures

**Investment Focus:**
- Games and gaming/esports
- Hardware
- SMB software
- IoT and data services
- FinTech
- Seed to Series B stages

**Investment Style:**
- $100K-$5M check sizes
- Hands-on board involvement
- Strong network across US and Europe (Atomico connection)

**Contact:**
- LinkedIn: linkedin.com/in/markdyne
- Best approach: Through Morpheus Ventures website or Atomico network

**LoreWeaver Fit Assessment:**
- Excellent: Explicit gaming/esports focus
- Morpheus Ventures = institutional backing, not just personal checks
- SMB software experience relevant to B2B game tools
- Atomico connection = European network access
- $200M fund = serious capital deployment capability

**ICP Score: 90** — Institutional investor with explicit gaming focus, appropriate stage, and European network. Strong fit for Director.

Sources: Morpheus Ventures, Crunchbase, NFX Signal, Evalyze.ai`,
      investor: {
        fitScore: 90,
        checkSize: '$100K-$5M',
        stages: ['Seed', 'Series A', 'Series B'],
        thesis: 'Games, gaming/esports, hardware, SMB software, fintech',
        recentDeals: ['Via Morpheus Ventures portfolio']
      },
      contacts: [
        {
          name: 'Mark Dyne',
          role: 'Founding Partner, Morpheus Ventures',
          linkedIn: 'https://linkedin.com/in/markdyne'
        }
      ],
      status: 'qualified' // ICP >= 85
    }
  },
  {
    id: '6NLyUWaIVUUk4jL3ue1o',
    name: 'Matt Mullenweg (Angel)',
    updates: {
      name: 'Matt Mullenweg',
      website: 'https://audrey.co',
      tags: ['angel', 'us', 'open-source', 'dev-tools', 'tier-2', 'seed-focus'],
      notes: `**Matt Mullenweg** — WordPress/Automattic founder, Audrey Capital principal.

**Background:**
- Co-founder of WordPress (powers 40%+ of the web)
- Founder & CEO of Automattic (WordPress.com, WooCommerce, Tumblr)
- Principal at Audrey Capital (angel investment firm, co-founded 2008)
- TechStars mentor
- Board observer at GitLab

**Investment Style:**
- Audrey Capital: angel investment and research company
- Strong preference for open source orientation
- Seed stage focus
- Portfolio: Decrypt, Jangle, Journey Clinical, and others

**Recent Controversy:**
- February 2025: Class action lawsuit regarding WordPress hosting/security
- May impact availability and reputation

**Contact:**
- Website: audrey.co
- LinkedIn: Via Automattic
- Twitter: @photomatt

**LoreWeaver Fit Assessment:**
- Dev tools background highly relevant
- Open source orientation — Director could potentially have open components
- 8 gaming investments (per original data) — shows gaming interest
- Recent legal issues may be distraction
- WordPress ecosystem = massive distribution potential if partnership angle

**ICP Score: 68** — Strong dev tools background and gaming interest, but recent controversies and unclear gaming focus depth. Open source angle interesting.

Sources: Wikipedia, PitchBook, CB Insights, Audrey.co`,
      investor: {
        fitScore: 68,
        checkSize: '$50K-$250K',
        stages: ['Seed'],
        thesis: 'Open source, developer tools, innovative ideas',
        recentDeals: ['Decrypt', 'Jangle', 'Journey Clinical']
      },
      contacts: [
        {
          name: 'Matt Mullenweg',
          role: 'Principal, Audrey Capital',
          twitter: '@photomatt'
        }
      ],
      status: 'new'
    }
  },
  {
    id: '6WEUpA8RYCgF1HaP2sUI',
    name: 'Kishen Patel (Angel)',
    updates: {
      name: 'Kishen Patel',
      website: 'https://kishen-patel.com',
      tags: ['angel', 'us', 'gaming', 'ai', 'interactive-media', 'seed-focus', 'vc-background', 'tier-1'],
      notes: `**Kishen Patel** — Gaming/AI angel investor, now at Greycroft.

**Background:**
- Currently: Investor at Greycroft (seed-to-growth VC, $3B+ raised, 400+ investments)
- Previously: Lightspeed Venture Partners (gaming focus)
- Previously: BITKRAFT (gaming-focused VC)
- Yale education
- Personal website: kishen-patel.com

**Investment Focus:**
- Interactive media and AI intersection
- Gaming startups
- AI applications and data infrastructure
- Novel consumer technology
- Early-stage software

**Notable Appearances:**
- Featured in Solsten's "What Will Game Funding Look Like" (alongside Moritz Baier-Lentz, Kelly Wallick)
- DCLA 2023 speaker
- "Inside Greycroft" series speaker

**Contact:**
- LinkedIn: linkedin.com/in/kishen-patel-b3598949
- Website: kishen-patel.com
- Best approach: Through Greycroft or gaming events

**LoreWeaver Fit Assessment:**
- Excellent: Explicit focus on "interactive media and AI intersection"
- Gaming + AI = perfect Director positioning
- VC background at gaming-focused funds (BITKRAFT, Lightspeed)
- Now at Greycroft = institutional backing
- Actively speaking about gaming funding landscape

**ICP Score: 92** — Perfect thesis alignment: gaming + AI intersection. VC pedigree at gaming-focused funds. Currently at Greycroft with early-stage focus.

Sources: Greycroft, Solsten, LinkedIn, DCLA, kishen-patel.com`,
      investor: {
        fitScore: 92,
        checkSize: '$100K-$1M',
        stages: ['Seed', 'Series A'],
        thesis: 'Interactive media + AI, gaming, novel consumer tech',
        recentDeals: ['Via Greycroft portfolio']
      },
      contacts: [
        {
          name: 'Kishen Patel',
          role: 'Investor, Greycroft',
          linkedIn: 'https://linkedin.com/in/kishen-patel-b3598949'
        }
      ],
      status: 'qualified' // ICP >= 85
    }
  },
  {
    id: '74ARD4zB4vlLW1xFva3x',
    name: 'Are Mack Growen (Angel)',
    updates: {
      name: 'Are Mack Growen',
      tags: ['angel', 'nordic', 'european', 'game-operator', 'seed-focus', 'tier-1'],
      notes: `**Are Mack Growen** — Norwegian gaming angel.

**Background:**
- Norwegian gaming industry veteran
- Active in Nordic gaming ecosystem
- Part of the influential Nordic gaming angel syndicate

**Notable Investments:**
- Dead Astronauts (€4M seed, Oct 2025) — alongside Behold Ventures, 1Up Ventures, Acequia Capital
- Co-invested with: Matt Bilbey, Klaas Kersting, Asbjørn Malte Søndergaard, Kristian Segerstråle

**Investment Style:**
- Seed stage
- Nordic gaming studios
- Often syndicates with other Nordic gaming angels
- Tight network with Asbjoern, Klaas Kersting, etc.

**Network:**
- Connected to: Behold Ventures, 1Up Ventures, Lifelike Capital
- Nordic gaming ecosystem access

**Contact:**
- Best approach: Nordic gaming events, warm intro through Asbjoern or other Nordic angels

**LoreWeaver Fit Assessment:**
- Active gaming angel with recent investments
- Nordic network access valuable for European expansion
- Co-investor network strong (Klaas Kersting, Asbjoern)
- Limited online presence — harder to reach directly
- Warm intro through Nordic network recommended

**ICP Score: 85** — Active Nordic gaming angel with strong co-investor network. Good fit for European seed round.

Sources: GamesIndustry.biz, Games Press, GamesBeat, Dead Astronauts announcement`,
      investor: {
        fitScore: 85,
        checkSize: '$25K-$100K',
        stages: ['Seed'],
        thesis: 'Nordic gaming studios',
        recentDeals: ['Dead Astronauts (€4M, 2025)']
      },
      contacts: [
        {
          name: 'Are Mack Growen',
          role: 'Angel Investor'
        }
      ],
      status: 'qualified' // ICP >= 85
    }
  },
  {
    id: '74IlmiaesZy9fHzhl5v3',
    name: 'Scott Belsky (Angel)',
    updates: {
      name: 'Scott Belsky',
      website: 'https://scottbelsky.com',
      tags: ['angel', 'us', 'creator-tools', 'design', 'seed-focus', 'tier-2'],
      notes: `**Scott Belsky** — Behance founder, former Adobe CPO, A24 partner.

**Background:**
- Founder of Behance (acquired by Adobe)
- Former Chief Product Officer at Adobe (2012-2025)
- During tenure: Adobe grew from $19B to $160B market cap
- Now: Partner at A24 (film/TV/music studio), founder of A24 Labs
- Author: "Making Ideas Happen", "The Messy Middle"

**Investment Track Record:**
- Angel investor since 2010
- Early investments: Uber, Pinterest
- Focus: Consumer, marketplace, "transformation by interface"
- 2 gaming investments (per original data)

**Current Focus:**
- A24 Labs — innovation at intersection of storytelling and technology
- Creative tools and design
- Consumer products

**Contact:**
- Website: scottbelsky.com
- LinkedIn: linkedin.com/in/scottbelsky
- Twitter: @scottbelsky

**LoreWeaver Fit Assessment:**
- Exceptional track record (Uber, Pinterest early)
- A24 = storytelling focus, potentially relevant for narrative AI
- Adobe CPO = creator tools expertise
- "Transformation by interface" thesis aligns with Director's authoring approach
- Gaming investments limited but storytelling angle strong

**ICP Score: 75** — Strong creator tools background and storytelling focus (A24). Limited gaming investments but narrative AI angle could resonate.

Sources: Wikipedia, LinkedIn, scottbelsky.com, Mercury Investor DB`,
      investor: {
        fitScore: 75,
        checkSize: '$50K-$250K',
        stages: ['Seed'],
        thesis: 'Consumer, marketplace, transformation by interface, creative tools',
        recentDeals: ['A24 Labs focus', 'Various seed investments']
      },
      contacts: [
        {
          name: 'Scott Belsky',
          role: 'Partner A24 / Angel',
          linkedIn: 'https://linkedin.com/in/scottbelsky',
          twitter: '@scottbelsky'
        }
      ],
      status: 'new'
    }
  }
];

async function updateLeads() {
  console.log('Updating batch 2 leads with research findings...\n');
  
  for (const lead of updates) {
    console.log(`Updating: ${lead.name} (${lead.id})`);
    try {
      const docRef = db.collection('leads').doc(lead.id);
      await docRef.update({
        ...lead.updates,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log(`  ✓ Updated - ICP: ${lead.updates.investor?.fitScore}, Status: ${lead.updates.status}`);
    } catch (err) {
      console.error(`  ✗ Error: ${err.message}`);
    }
  }
  
  console.log('\n=== Summary ===');
  const qualified = updates.filter(u => u.updates.status === 'qualified');
  console.log(`Total updated: ${updates.length}`);
  console.log(`Qualified (ICP >= 85): ${qualified.length}`);
  qualified.forEach(u => {
    console.log(`  - ${u.name}: ICP ${u.updates.investor?.fitScore}`);
  });
}

updateLeads().then(() => {
  console.log('\nDone!');
  process.exit(0);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
