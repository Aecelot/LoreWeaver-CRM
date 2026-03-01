// Seed 20 publishers that also invest in game tools/tech
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

const leads = [
  // === MAJOR PUBLISHERS WITH INVESTMENT ARMS ===
  {
    name: "Tencent Investment",
    country: "China",
    location: "Shenzhen, China",
    website: "https://www.tencent.com",
    tags: ["china", "aaa", "publisher", "investment-arm", "tools-investor", "director-icp"],
    investor: {
      type: "Corporate VC",
      founded: "2008",
      investmentFocus: "Gaming, internet, AI, game tech",
      fundingPreferences: "EUR 1M-100M+",
      geographicalRegions: ["Global"],
      hqRegion: "China",
      fitScore: 70,
      fitReason: "World's largest gaming company. 600+ investments. Invests in game tech/tools. Very large checks."
    }
  },
  {
    name: "NetEase Capital",
    country: "China",
    location: "Hangzhou, China",
    website: "https://www.neteasegames.com",
    tags: ["china", "aaa", "publisher", "investment-arm", "tools-investor", "director-icp"],
    investor: {
      type: "Corporate VC",
      founded: "2010",
      investmentFocus: "Gaming studios, game tech, AI",
      fundingPreferences: "EUR 5M-50M+",
      geographicalRegions: ["Global"],
      hqRegion: "China",
      fitScore: 65,
      fitReason: "Major Chinese publisher. Acquired Quantic Dream. Large checks, strategic investor."
    }
  },
  {
    name: "Supercell Investments",
    country: "Finland",
    location: "Helsinki, Finland",
    website: "https://investments.supercell.com",
    tags: ["finland", "aaa", "publisher", "investment-arm", "tools-investor", "strategic"],
    investor: {
      type: "Corporate VC",
      founded: "2016",
      investmentFocus: "Game studios, game tech",
      fundingPreferences: "EUR 500K-10M",
      geographicalRegions: ["Global"],
      hqRegion: "Finland",
      fitScore: 80,
      fitReason: "Backs creative studios AND game tech. Mobile focus but invests broadly. Good brand association."
    }
  },
  {
    name: "Krafton Blue Ocean Games",
    country: "South Korea",
    location: "Seoul, South Korea",
    website: "https://www.krafton.com",
    tags: ["korea", "aaa", "publisher", "investment-arm", "indie-fund", "director-icp"],
    investor: {
      type: "Corporate VC Fund",
      founded: "2025",
      investmentFocus: "Indie game developers",
      fundingPreferences: "EUR 100K-500K",
      geographicalRegions: ["Global"],
      hqRegion: "South Korea",
      fitScore: 75,
      fitReason: "$30M fund for indie devs. 100 studios over 3 years. PUBG parent. Stage fit good."
    }
  },
  {
    name: "Nexon",
    country: "Japan",
    location: "Tokyo, Japan",
    website: "https://www.nexon.co.jp",
    tags: ["japan", "aaa", "publisher", "investment-arm", "strategic"],
    investor: {
      type: "Corporate Investor",
      founded: "1994",
      investmentFocus: "Gaming companies, publishers",
      fundingPreferences: "EUR 10M-100M+",
      geographicalRegions: ["Global"],
      hqRegion: "Japan",
      fitScore: 60,
      fitReason: "Invested $874M in Bandai Namco, Konami, Sega. Massive scale but strategic, not tools-focused."
    }
  },

  // === PUBLISHER-FUNDS (Hybrid) ===
  {
    name: "Kowloon Nights",
    country: "USA",
    location: "Los Angeles, USA",
    website: "https://www.kowloonnights.com",
    tags: ["usa", "fund", "publisher", "indie", "tools-investor", "architect-icp", "director-icp"],
    investor: {
      type: "Investment Fund",
      founded: "2017",
      investmentFocus: "Indie game developers, 50+ portfolio",
      fundingPreferences: "EUR 500K-5M",
      geographicalRegions: ["Global"],
      hqRegion: "USA",
      fitScore: 85,
      fitReason: "Provides backend tools + distribution. Perfect fit — they VALUE tools for their portfolio studios."
    }
  },
  {
    name: "Kepler Interactive",
    country: "UK",
    location: "London, UK",
    website: "https://www.keplerinteractive.com",
    tags: ["uk", "publisher", "studio-collective", "strategic", "architect-icp"],
    investor: {
      type: "Studio Collective + Publisher",
      founded: "2021",
      investmentFocus: "Premium games, studio partnerships",
      fundingPreferences: "EUR 1M-10M",
      geographicalRegions: ["Global"],
      hqRegion: "UK",
      fitScore: 75,
      fitReason: "$120M from NetEase. Developer-owned publisher. Could adopt tools for portfolio."
    }
  },
  {
    name: "Xsolla",
    country: "USA",
    location: "Los Angeles, USA",
    website: "https://xsolla.com",
    tags: ["usa", "platform", "tools", "funding", "strategic"],
    investor: {
      type: "Platform + Funding",
      founded: "2005",
      investmentFocus: "Game studios via funding platform",
      fundingPreferences: "EUR 100K-1M",
      geographicalRegions: ["Global"],
      hqRegion: "USA",
      fitScore: 70,
      fitReason: "Commerce platform with funding arm. Could integrate LoreWeaver tools into their ecosystem."
    }
  },

  // === INDIE PUBLISHERS THAT FUND ===
  {
    name: "Devolver Digital",
    country: "USA",
    location: "Austin, Texas, USA",
    website: "https://www.devolverdigital.com",
    tags: ["usa", "aa", "publisher", "indie", "narrative", "architect-icp", "director-icp"],
    investor: {
      type: "Publisher",
      founded: "2009",
      investmentFocus: "Unique indie games, narrative-driven",
      fundingPreferences: "EUR 100K-500K advances",
      geographicalRegions: ["Global"],
      hqRegion: "USA",
      fitScore: 90,
      fitReason: "Inscryption, Hotline Miami, Enter the Gungeon. Bold narrative games. Portfolio would benefit from LoreWeaver tools."
    }
  },
  {
    name: "Annapurna Interactive",
    country: "USA",
    location: "Los Angeles, USA",
    website: "https://annapurnainteractive.com",
    tags: ["usa", "aa", "publisher", "narrative", "premium", "architect-icp"],
    investor: {
      type: "Publisher",
      founded: "2016",
      investmentFocus: "Premium narrative games",
      fundingPreferences: "EUR 500K-5M",
      geographicalRegions: ["Global"],
      hqRegion: "USA",
      fitScore: 90,
      fitReason: "What Remains of Edith Finch, Outer Wilds, Stray. NARRATIVE FOCUSED. Perfect Architect fit."
    }
  },
  {
    name: "Team17",
    country: "UK",
    location: "Wakefield, UK",
    website: "https://www.team17.com",
    tags: ["uk", "aa", "publisher", "indie", "strategic"],
    investor: {
      type: "Publisher",
      founded: "1990",
      investmentFocus: "Indie games across genres",
      fundingPreferences: "EUR 200K-2M",
      geographicalRegions: ["Global"],
      hqRegion: "UK",
      fitScore: 75,
      fitReason: "90+ games published. Moving Out, Escapists. Could standardize tools across portfolio."
    }
  },
  {
    name: "505 Games",
    country: "Italy",
    location: "Milan, Italy",
    website: "https://505games.com",
    tags: ["italy", "aa", "publisher", "narrative", "architect-icp"],
    investor: {
      type: "Publisher",
      founded: "2006",
      investmentFocus: "AA games, action-adventure",
      fundingPreferences: "EUR 1M-10M",
      geographicalRegions: ["Global"],
      hqRegion: "Italy",
      fitScore: 80,
      fitReason: "Control, Death Stranding PC. Works with narrative-heavy games. Good Architect fit."
    }
  },
  {
    name: "Raw Fury",
    country: "Sweden",
    location: "Stockholm, Sweden",
    website: "https://rawfury.com",
    tags: ["sweden", "indie", "publisher", "narrative", "architect-icp"],
    investor: {
      type: "Publisher",
      founded: "2015",
      investmentFocus: "Indie games, narrative/adventure",
      fundingPreferences: "EUR 100K-500K",
      geographicalRegions: ["Global"],
      hqRegion: "Sweden",
      fitScore: 85,
      fitReason: "Sable, Call of the Sea, Kingdom. Narrative-focused indie publisher. Perfect ICP."
    }
  },
  {
    name: "Fellow Traveller",
    country: "Australia",
    location: "Melbourne, Australia",
    website: "https://www.fellowtraveller.games",
    tags: ["australia", "indie", "publisher", "narrative", "architect-icp"],
    investor: {
      type: "Publisher",
      founded: "2012",
      investmentFocus: "Narrative-driven indie games",
      fundingPreferences: "EUR 50K-300K",
      geographicalRegions: ["Global"],
      hqRegion: "Australia",
      fitScore: 90,
      fitReason: "Paradise Killer, Suzerain, Orwell. EXPLICITLY narrative-focused. Already in CRM (studio). Perfect fit."
    }
  },
  {
    name: "Humble Games",
    country: "USA",
    location: "San Francisco, USA",
    website: "https://www.humblegames.com",
    tags: ["usa", "indie", "publisher", "narrative", "architect-icp"],
    investor: {
      type: "Publisher",
      founded: "2017",
      investmentFocus: "Indie games, diverse genres",
      fundingPreferences: "EUR 200K-1M",
      geographicalRegions: ["Global"],
      hqRegion: "USA",
      fitScore: 80,
      fitReason: "Unpacking, Temtem, Forager. Part of Humble Bundle (IGN). Good reach."
    }
  },
  {
    name: "tinyBuild",
    country: "USA",
    location: "Seattle, USA",
    website: "https://www.tinybuild.com",
    tags: ["usa", "aa", "publisher", "narrative", "architect-icp"],
    investor: {
      type: "Publisher",
      founded: "2011",
      investmentFocus: "Indie to AA games",
      fundingPreferences: "EUR 200K-2M",
      geographicalRegions: ["Global"],
      hqRegion: "USA",
      fitScore: 75,
      fitReason: "Hello Neighbor, Graveyard Keeper. Growing publisher with narrative titles."
    }
  },
  {
    name: "Chucklefish",
    country: "UK",
    location: "London, UK",
    website: "https://www.chucklefish.org",
    tags: ["uk", "indie", "publisher", "pixel-art", "narrative", "architect-icp"],
    investor: {
      type: "Publisher + Developer",
      founded: "2011",
      investmentFocus: "Pixel art, RPG, narrative",
      fundingPreferences: "EUR 100K-500K",
      geographicalRegions: ["Global"],
      hqRegion: "UK",
      fitScore: 80,
      fitReason: "Wargroove, Eastward, Starbound. Narrative-heavy catalogue. Good fit."
    }
  },
  {
    name: "No More Robots",
    country: "UK",
    location: "Manchester, UK",
    website: "https://nomorerobots.io",
    tags: ["uk", "indie", "publisher", "narrative", "architect-icp"],
    investor: {
      type: "Publisher",
      founded: "2017",
      investmentFocus: "Unique indie games",
      fundingPreferences: "EUR 50K-200K",
      geographicalRegions: ["Global"],
      hqRegion: "UK",
      fitScore: 80,
      fitReason: "Hypnospace Outlaw, Descenders, Yes Your Grace. Boutique but narrative-focused."
    }
  },
  {
    name: "Curve Games",
    country: "UK",
    location: "London, UK",
    website: "https://www.curve-games.com",
    tags: ["uk", "aa", "publisher", "indie", "architect-icp"],
    investor: {
      type: "Publisher",
      founded: "2013",
      investmentFocus: "Indie to AA games",
      fundingPreferences: "EUR 250K-1M",
      geographicalRegions: ["Global"],
      hqRegion: "UK",
      fitScore: 75,
      fitReason: "The Ascent, Human Fall Flat. Growing publisher, some narrative titles."
    }
  },
  {
    name: "Hooded Horse",
    country: "USA",
    location: "Dallas, USA",
    website: "https://www.hoodedhorce.com",
    tags: ["usa", "indie", "publisher", "strategy", "narrative", "architect-icp"],
    investor: {
      type: "Publisher",
      founded: "2019",
      investmentFocus: "Strategy, simulation, RPG",
      fundingPreferences: "EUR 500K-2M",
      geographicalRegions: ["Global"],
      hqRegion: "USA",
      fitScore: 80,
      fitReason: "Manor Lords, Old World, Terra Invicta. Strategy/RPG focus. Some narrative overlap."
    }
  }
];

async function seedPublisherInvestors() {
  console.log(`Seeding ${leads.length} publisher-investors...\n`);
  
  let created = 0;
  let skipped = 0;
  
  for (const lead of leads) {
    // Check if exists
    const existing = await db.collection('leads')
      .where('name', '==', lead.name)
      .limit(1)
      .get();
    
    if (!existing.empty) {
      console.log(`⏭️  ${lead.name} already exists`);
      skipped++;
      continue;
    }
    
    const fitScore = lead.investor.fitScore;
    
    // Create lead
    await db.collection('leads').add({
      type: 'investor',
      status: 'active',
      owner: 'system',
      priority: fitScore >= 85 ? 'high' : fitScore >= 70 ? 'medium' : 'low',
      name: lead.name,
      website: lead.website || '',
      location: lead.location,
      country: lead.country,
      contact: { name: '', role: '', email: '' },
      tags: lead.tags,
      notes: '',
      investor: lead.investor,
      pipeline: {
        pipelineId: 'investors',
        stageId: 'new',
        enteredStageAt: admin.firestore.FieldValue.serverTimestamp()
      },
      createdBy: 'seed-publisher-investors',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`✅ ${lead.name} (${lead.country}) — Score: ${fitScore}`);
    created++;
  }
  
  console.log(`\n✅ Created ${created}, skipped ${skipped}`);
  process.exit(0);
}

seedPublisherInvestors().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
