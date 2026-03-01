// Seed 50 EU-based gaming investors (active 2025-2026)
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
  // === GAMING-FOCUSED VCs (Tier 1) ===
  {
    name: "London Venture Partners (LVP)",
    country: "UK",
    location: "London, UK",
    website: "https://londonvp.com",
    tags: ["uk", "gaming-focused", "seed", "early-stage", "strategic"],
    investor: {
      type: "VC Fund",
      founded: "2010",
      investmentFocus: "Games ecosystem — studios, tech, services",
      fundingPreferences: "EUR 500K-5M",
      geographicalRegions: ["UK", "Europe", "USA", "Finland"],
      hqRegion: "UK",
      fitScore: 95,
      fitReason: "Gaming-only fund. Early investor in Supercell, Unity, NaturalMotion. 80+ investments. $18B value created. PERFECT fit."
    }
  },
  {
    name: "Play Ventures",
    country: "Finland",
    location: "Helsinki, Finland",
    website: "https://www.play.vc",
    tags: ["finland", "gaming-focused", "seed", "early-stage", "strategic"],
    investor: {
      type: "VC Fund",
      founded: "2018",
      investmentFocus: "Games, game services, playable apps",
      fundingPreferences: "EUR 200K-2M",
      geographicalRegions: ["Global"],
      hqRegion: "Finland",
      fitScore: 90,
      fitReason: "Founded by Supercell/King veterans. 8 investments in 2025. Gaming + game-adjacent tech. Very active."
    }
  },
  {
    name: "Sisu Game Ventures",
    country: "Finland",
    location: "Helsinki, Finland",
    website: "https://sisugameventures.com",
    tags: ["finland", "gaming-focused", "seed", "early-stage"],
    investor: {
      type: "VC Fund",
      founded: "2019",
      investmentFocus: "Game studios and game tech",
      fundingPreferences: "EUR 200K-1M",
      geographicalRegions: ["Europe", "Global"],
      hqRegion: "Finland",
      fitScore: 90,
      fitReason: "18 European gaming investments. Finnish gaming ecosystem experts. Game tech in thesis."
    }
  },
  {
    name: "The Games Fund",
    country: "Poland",
    location: "Warsaw, Poland",
    website: "https://gamesfund.vc",
    tags: ["poland", "gaming-focused", "seed", "early-stage", "strategic"],
    investor: {
      type: "VC Fund",
      founded: "2020",
      investmentFocus: "Game developers, gaming technologies, services",
      fundingPreferences: "EUR 100K-1M",
      geographicalRegions: ["Global"],
      hqRegion: "Poland",
      fitScore: 90,
      fitReason: "Gaming industry veterans. 13 EU gaming investments. Explicitly invests in gaming tech."
    }
  },
  {
    name: "Makers Fund",
    country: "UK",
    location: "London, UK",
    website: "https://makers.fund",
    tags: ["uk", "gaming-focused", "growth", "strategic", "ai-interested"],
    investor: {
      type: "VC Fund",
      founded: "2017",
      investmentFocus: "Interactive entertainment, VR/AR, AI, esports",
      fundingPreferences: "EUR 1M-10M",
      geographicalRegions: ["Global"],
      hqRegion: "UK",
      fitScore: 85,
      fitReason: "15 EU gaming investments. AI and game tech in thesis. Series A/B focus but strategic."
    }
  },
  {
    name: "Initial Capital",
    country: "UK",
    location: "London, UK",
    website: "https://initialcapital.com",
    tags: ["uk", "gaming-focused", "seed", "early-stage"],
    investor: {
      type: "VC Fund",
      founded: "2012",
      investmentFocus: "Games, consumer services, tech enablers",
      fundingPreferences: "EUR 200K-2M",
      geographicalRegions: ["UK", "Europe", "USA", "Finland"],
      hqRegion: "UK",
      fitScore: 85,
      fitReason: "22 EU gaming investments. Seed + Series A. Tech enablers in thesis."
    }
  },
  {
    name: "Lifeline Ventures",
    country: "Finland",
    location: "Helsinki, Finland",
    website: "https://www.lifelineventures.com",
    tags: ["finland", "gaming", "deep-tech", "early-stage"],
    investor: {
      type: "VC Fund",
      founded: "2009",
      investmentFocus: "Tech, gaming, deep tech",
      fundingPreferences: "EUR 500K-5M",
      geographicalRegions: ["Finland", "Nordics", "Europe"],
      hqRegion: "Finland",
      fitScore: 80,
      fitReason: "14 gaming investments. Finnish gaming ecosystem. Backed Supercell early."
    }
  },

  // === FRANCE ===
  {
    name: "Bpifrance",
    country: "France",
    location: "Paris, France",
    website: "https://www.bpifrance.fr",
    tags: ["france", "government", "growth", "strategic"],
    investor: {
      type: "Government Fund",
      founded: "2012",
      investmentFocus: "French tech companies, gaming",
      fundingPreferences: "EUR 500K-50M",
      geographicalRegions: ["France"],
      hqRegion: "France",
      fitScore: 70,
      fitReason: "24 gaming investments — most active in EU! French focus. Large checks possible."
    }
  },
  {
    name: "Kima Ventures",
    country: "France",
    location: "Paris, France",
    website: "https://www.kimaventures.com",
    tags: ["france", "seed", "early-stage", "prolific"],
    investor: {
      type: "Seed Fund",
      founded: "2010",
      investmentFocus: "Tech startups, gaming",
      fundingPreferences: "EUR 50K-150K",
      geographicalRegions: ["Global"],
      hqRegion: "France",
      fitScore: 75,
      fitReason: "22 gaming investments. Xavier Niel's fund. Very small checks but prolific. Good for syndicate."
    }
  },
  {
    name: "Partech",
    country: "France",
    location: "Paris, France",
    website: "https://partechpartners.com",
    tags: ["france", "growth", "series-a", "strategic"],
    investor: {
      type: "VC Fund",
      founded: "1982",
      investmentFocus: "Tech, SaaS, gaming",
      fundingPreferences: "EUR 1M-20M",
      geographicalRegions: ["Europe", "USA", "Africa"],
      hqRegion: "France",
      fitScore: 70,
      fitReason: "13 gaming investments. Large fund, Series A/B focus. Good for later rounds."
    }
  },
  {
    name: "Alven",
    country: "France",
    location: "Paris, France",
    website: "https://www.alven.co",
    tags: ["france", "seed", "series-a", "strategic"],
    investor: {
      type: "VC Fund",
      founded: "2000",
      investmentFocus: "Tech, consumer, gaming",
      fundingPreferences: "EUR 500K-10M",
      geographicalRegions: ["Europe"],
      hqRegion: "France",
      fitScore: 70,
      fitReason: "12 gaming investments. French tech leader. Seed to Series B."
    }
  },
  {
    name: "XAnge",
    country: "France",
    location: "Paris, France",
    website: "https://www.xange.fr",
    tags: ["france", "seed", "series-a"],
    investor: {
      type: "VC Fund",
      founded: "2003",
      investmentFocus: "Tech, B2B, gaming",
      fundingPreferences: "EUR 500K-5M",
      geographicalRegions: ["France", "Europe"],
      hqRegion: "France",
      fitScore: 65,
      fitReason: "11 gaming investments. French early-stage. B2B tools could fit."
    }
  },

  // === GERMANY ===
  {
    name: "HV Capital",
    country: "Germany",
    location: "Munich, Germany",
    website: "https://www.hvcapital.de",
    tags: ["germany", "growth", "series-a", "strategic"],
    investor: {
      type: "VC Fund",
      founded: "2000",
      investmentFocus: "Tech, e-commerce, gaming",
      fundingPreferences: "EUR 1M-20M",
      geographicalRegions: ["Germany", "Europe"],
      hqRegion: "Germany",
      fitScore: 70,
      fitReason: "20 gaming investments. Major German VC. Series A/B focus."
    }
  },
  {
    name: "Cherry Ventures",
    country: "Germany",
    location: "Berlin, Germany",
    website: "https://www.cherry.vc",
    tags: ["germany", "seed", "early-stage"],
    investor: {
      type: "VC Fund",
      founded: "2012",
      investmentFocus: "Tech, consumer, gaming",
      fundingPreferences: "EUR 500K-5M",
      geographicalRegions: ["Europe"],
      hqRegion: "Germany",
      fitScore: 75,
      fitReason: "13 gaming investments. Zalando founders' fund. Early stage focus."
    }
  },
  {
    name: "HTGF (High-Tech Gründerfonds)",
    country: "Germany",
    location: "Bonn, Germany",
    website: "https://www.htgf.de",
    tags: ["germany", "seed", "government", "deep-tech"],
    investor: {
      type: "Seed Fund",
      founded: "2005",
      investmentFocus: "Deep tech, gaming, software",
      fundingPreferences: "EUR 500K-3M",
      geographicalRegions: ["Germany"],
      hqRegion: "Germany",
      fitScore: 75,
      fitReason: "11 gaming investments. German government-backed. Seed focus. Deep tech friendly."
    }
  },
  {
    name: "Global Founders Capital",
    country: "Germany",
    location: "Berlin, Germany",
    website: "https://globalfounderscapital.com",
    tags: ["germany", "seed", "early-stage"],
    investor: {
      type: "VC Fund",
      founded: "2013",
      investmentFocus: "Tech startups, gaming",
      fundingPreferences: "EUR 100K-500K",
      geographicalRegions: ["Global"],
      hqRegion: "Germany",
      fitScore: 70,
      fitReason: "13 gaming investments. Rocket Internet affiliated. Seed checks."
    }
  },
  {
    name: "Speedinvest",
    country: "Austria",
    location: "Vienna, Austria",
    website: "https://www.speedinvest.com",
    tags: ["austria", "seed", "early-stage", "eu-wide"],
    investor: {
      type: "VC Fund",
      founded: "2011",
      investmentFocus: "Tech, fintech, gaming",
      fundingPreferences: "EUR 500K-3M",
      geographicalRegions: ["Europe"],
      hqRegion: "Austria",
      fitScore: 75,
      fitReason: "12 gaming investments. Pan-European. Active seed investor."
    }
  },

  // === UK ===
  {
    name: "Balderton Capital",
    country: "UK",
    location: "London, UK",
    website: "https://www.balderton.com",
    tags: ["uk", "series-a", "growth", "strategic"],
    investor: {
      type: "VC Fund",
      founded: "2000",
      investmentFocus: "Tech, consumer, gaming",
      fundingPreferences: "EUR 1M-20M",
      geographicalRegions: ["Europe"],
      hqRegion: "UK",
      fitScore: 70,
      fitReason: "11 gaming investments. Major European VC. Series A/B. Benchmark for Europe."
    }
  },
  {
    name: "Index Ventures",
    country: "UK",
    location: "London, UK",
    website: "https://www.indexventures.com",
    tags: ["uk", "series-a", "growth", "strategic"],
    investor: {
      type: "VC Fund",
      founded: "1996",
      investmentFocus: "Tech, gaming, fintech",
      fundingPreferences: "EUR 1M-50M",
      geographicalRegions: ["Europe", "USA"],
      hqRegion: "UK",
      fitScore: 65,
      fitReason: "18 gaming investments. Top-tier VC. Large checks. Series A+."
    }
  },
  {
    name: "Seedcamp",
    country: "UK",
    location: "London, UK",
    website: "https://seedcamp.com",
    tags: ["uk", "seed", "pre-seed", "accelerator"],
    investor: {
      type: "Seed Fund + Accelerator",
      founded: "2007",
      investmentFocus: "Tech startups, gaming",
      fundingPreferences: "EUR 100K-500K",
      geographicalRegions: ["Europe"],
      hqRegion: "UK",
      fitScore: 80,
      fitReason: "15 gaming investments. Pre-seed/seed focus. European accelerator. Good stage fit."
    }
  },
  {
    name: "Hoxton Ventures",
    country: "UK",
    location: "London, UK",
    website: "https://www.hoxtonventures.com",
    tags: ["uk", "seed", "early-stage"],
    investor: {
      type: "VC Fund",
      founded: "2013",
      investmentFocus: "Tech, mobile, gaming",
      fundingPreferences: "EUR 500K-3M",
      geographicalRegions: ["Europe", "USA"],
      hqRegion: "UK",
      fitScore: 75,
      fitReason: "Gaming in portfolio. Early-stage focus. Deliveroo investors."
    }
  },
  {
    name: "JamJar Investments",
    country: "UK",
    location: "London, UK",
    website: "https://jamjarinvestments.com",
    tags: ["uk", "seed", "consumer", "strategic"],
    investor: {
      type: "VC Fund",
      founded: "2014",
      investmentFocus: "Consumer brands, gaming",
      fundingPreferences: "EUR 500K-5M",
      geographicalRegions: ["UK", "Europe"],
      hqRegion: "UK",
      fitScore: 70,
      fitReason: "18 gaming investments. Innocent Drinks founders. Consumer focus."
    }
  },
  {
    name: "Venrex",
    country: "UK",
    location: "London, UK",
    website: "https://www.venrex.partners",
    tags: ["uk", "seed", "early-stage"],
    investor: {
      type: "VC Fund",
      founded: "2013",
      investmentFocus: "Tech, gaming, fintech",
      fundingPreferences: "EUR 100K-1M",
      geographicalRegions: ["UK", "Europe"],
      hqRegion: "UK",
      fitScore: 70,
      fitReason: "16 gaming investments. Seed/early-stage. UK focused."
    }
  },
  {
    name: "SFC Capital",
    country: "UK",
    location: "London, UK",
    website: "https://sfccapital.com",
    tags: ["uk", "seed", "pre-seed", "seis"],
    investor: {
      type: "Seed Fund",
      founded: "2012",
      investmentFocus: "Tech startups, gaming",
      fundingPreferences: "EUR 50K-250K",
      geographicalRegions: ["UK"],
      hqRegion: "UK",
      fitScore: 70,
      fitReason: "16 gaming investments. SEIS/EIS specialists. Very early stage."
    }
  },
  {
    name: "Worth Capital",
    country: "UK",
    location: "Chichester, UK",
    website: "https://www.worthcapital.co.uk",
    tags: ["uk", "seed", "early-stage"],
    investor: {
      type: "Seed Fund",
      founded: "2013",
      investmentFocus: "Tech, gaming, consumer",
      fundingPreferences: "EUR 100K-500K",
      geographicalRegions: ["UK"],
      hqRegion: "UK",
      fitScore: 65,
      fitReason: "13 gaming investments. UK seed fund."
    }
  },
  {
    name: "Northstar Ventures",
    country: "UK",
    location: "Newcastle, UK",
    website: "https://www.northstarventures.co.uk",
    tags: ["uk", "seed", "regional"],
    investor: {
      type: "VC Fund",
      founded: "2004",
      investmentFocus: "Tech, gaming, North England",
      fundingPreferences: "EUR 100K-1M",
      geographicalRegions: ["UK"],
      hqRegion: "UK",
      fitScore: 65,
      fitReason: "19 gaming investments. North England regional fund."
    }
  },
  {
    name: "Equity Gap",
    country: "UK",
    location: "Edinburgh, UK",
    website: "https://www.equitygap.co.uk",
    tags: ["uk", "seed", "scotland", "angel-network"],
    investor: {
      type: "Angel Network",
      founded: "2003",
      investmentFocus: "Scottish tech, gaming",
      fundingPreferences: "EUR 50K-500K",
      geographicalRegions: ["Scotland", "UK"],
      hqRegion: "UK",
      fitScore: 65,
      fitReason: "19 gaming investments. Scottish angel network. Edinburgh game scene."
    }
  },
  {
    name: "Par Equity",
    country: "UK",
    location: "Edinburgh, UK",
    website: "https://www.parequity.com",
    tags: ["uk", "seed", "scotland"],
    investor: {
      type: "VC Fund",
      founded: "2008",
      investmentFocus: "Tech, gaming, Scotland",
      fundingPreferences: "EUR 500K-3M",
      geographicalRegions: ["UK", "Europe"],
      hqRegion: "UK",
      fitScore: 70,
      fitReason: "13 gaming investments. Edinburgh based. Rockstar North ecosystem."
    }
  },
  {
    name: "Northern Powerhouse Investment Fund",
    country: "UK",
    location: "Sheffield, UK",
    website: "https://www.npif.co.uk",
    tags: ["uk", "government", "regional", "north-england"],
    investor: {
      type: "Government Fund",
      founded: "2017",
      investmentFocus: "North England businesses, gaming",
      fundingPreferences: "EUR 100K-2M",
      geographicalRegions: ["North England"],
      hqRegion: "UK",
      fitScore: 60,
      fitReason: "12 gaming investments. North England regional fund. Government backed."
    }
  },
  {
    name: "Maven Capital Partners",
    country: "UK",
    location: "London, UK",
    website: "https://www.mavencp.com",
    tags: ["uk", "growth", "regional"],
    investor: {
      type: "VC Fund",
      founded: "2009",
      investmentFocus: "UK SMEs, gaming",
      fundingPreferences: "EUR 500K-5M",
      geographicalRegions: ["UK"],
      hqRegion: "UK",
      fitScore: 65,
      fitReason: "12 gaming investments. UK regional specialist."
    }
  },
  {
    name: "Angels Den",
    country: "UK",
    location: "London, UK",
    website: "https://www.angelsden.com",
    tags: ["uk", "angel-network", "seed"],
    investor: {
      type: "Angel Network",
      founded: "2007",
      investmentFocus: "Tech startups, gaming",
      fundingPreferences: "EUR 50K-500K",
      geographicalRegions: ["UK"],
      hqRegion: "UK",
      fitScore: 65,
      fitReason: "12 gaming investments. Angel network platform."
    }
  },
  {
    name: "FSE Group",
    country: "UK",
    location: "London, UK",
    website: "https://www.thefsegroup.com",
    tags: ["uk", "seed", "south-england", "regional"],
    investor: {
      type: "VC Fund",
      founded: "2002",
      investmentFocus: "South England tech, gaming",
      fundingPreferences: "EUR 100K-1M",
      geographicalRegions: ["South England"],
      hqRegion: "UK",
      fitScore: 60,
      fitReason: "14 gaming investments. South England regional."
    }
  },

  // === NORDICS ===
  {
    name: "Heartcore Capital",
    country: "Denmark",
    location: "Copenhagen, Denmark",
    website: "https://heartcore.com",
    tags: ["denmark", "seed", "consumer", "gaming"],
    investor: {
      type: "VC Fund",
      founded: "2016",
      investmentFocus: "Consumer tech, gaming",
      fundingPreferences: "EUR 500K-5M",
      geographicalRegions: ["Europe"],
      hqRegion: "Denmark",
      fitScore: 75,
      fitReason: "17 gaming investments. Nordic consumer focus. Early stage."
    }
  },
  {
    name: "Northzone",
    country: "Sweden",
    location: "Stockholm, Sweden",
    website: "https://www.northzone.com",
    tags: ["sweden", "series-a", "growth", "strategic"],
    investor: {
      type: "VC Fund",
      founded: "1996",
      investmentFocus: "Tech, consumer, gaming",
      fundingPreferences: "EUR 1M-20M",
      geographicalRegions: ["Europe", "USA"],
      hqRegion: "Sweden",
      fitScore: 70,
      fitReason: "13 gaming investments. Major Nordic VC. Spotify investors."
    }
  },
  {
    name: "Almi Invest",
    country: "Sweden",
    location: "Stockholm, Sweden",
    website: "https://www.almi.se/almi-invest",
    tags: ["sweden", "government", "seed", "early-stage"],
    investor: {
      type: "Government Fund",
      founded: "2009",
      investmentFocus: "Swedish tech, sustainability, gaming",
      fundingPreferences: "EUR 200K-2M",
      geographicalRegions: ["Sweden"],
      hqRegion: "Sweden",
      fitScore: 70,
      fitReason: "21 gaming investments. Swedish government backed. €430M under management."
    }
  },

  // === SOUTHERN EUROPE ===
  {
    name: "Cabiedes & Partners",
    country: "Spain",
    location: "Madrid, Spain",
    website: "https://cabiedes.com",
    tags: ["spain", "seed", "early-stage"],
    investor: {
      type: "VC Fund",
      founded: "1998",
      investmentFocus: "Tech, gaming, Spain/LatAm",
      fundingPreferences: "EUR 100K-500K",
      geographicalRegions: ["Spain", "Latin America"],
      hqRegion: "Spain",
      fitScore: 65,
      fitReason: "14 gaming investments. Spanish seed leader."
    }
  },
  {
    name: "CDP Venture Capital",
    country: "Italy",
    location: "Rome, Italy",
    website: "https://www.cdpventurecapital.it",
    tags: ["italy", "government", "growth", "strategic"],
    investor: {
      type: "Government Fund",
      founded: "2020",
      investmentFocus: "Italian tech ecosystem, gaming",
      fundingPreferences: "EUR 500K-10M",
      geographicalRegions: ["Italy"],
      hqRegion: "Italy",
      fitScore: 65,
      fitReason: "14 gaming investments. Italian government fund. Good for Italian partnerships."
    }
  },
  {
    name: "P101",
    country: "Italy",
    location: "Milan, Italy",
    website: "https://www.p101.it",
    tags: ["italy", "seed", "series-a"],
    investor: {
      type: "VC Fund",
      founded: "2013",
      investmentFocus: "Italian tech, gaming",
      fundingPreferences: "EUR 500K-5M",
      geographicalRegions: ["Italy", "Europe"],
      hqRegion: "Italy",
      fitScore: 65,
      fitReason: "13 gaming investments. Italian early-stage leader."
    }
  },
  {
    name: "360 Capital",
    country: "France",
    location: "Paris, France",
    website: "https://360capitalpartners.com",
    tags: ["france", "seed", "series-a"],
    investor: {
      type: "VC Fund",
      founded: "1997",
      investmentFocus: "Tech, gaming, B2B",
      fundingPreferences: "EUR 500K-5M",
      geographicalRegions: ["France", "Italy"],
      hqRegion: "France",
      fitScore: 65,
      fitReason: "12 gaming investments. Franco-Italian focus."
    }
  },

  // === EASTERN EUROPE ===
  {
    name: "Eleven Ventures",
    country: "Bulgaria",
    location: "Sofia, Bulgaria",
    website: "https://www.11.vc",
    tags: ["bulgaria", "seed", "eastern-europe", "accelerator"],
    investor: {
      type: "Seed Fund + Accelerator",
      founded: "2012",
      investmentFocus: "Eastern European tech, gaming",
      fundingPreferences: "EUR 50K-200K",
      geographicalRegions: ["Eastern Europe"],
      hqRegion: "Bulgaria",
      fitScore: 70,
      fitReason: "13 gaming investments. Eastern European focus. Accelerator model."
    }
  },
  {
    name: "Fil Rouge Capital",
    country: "Poland",
    location: "Warsaw, Poland",
    website: "https://filrougecapital.com",
    tags: ["poland", "seed", "gaming-focused"],
    investor: {
      type: "VC Fund",
      founded: "2019",
      investmentFocus: "Gaming, game tech",
      fundingPreferences: "EUR 100K-500K",
      geographicalRegions: ["Poland", "Europe"],
      hqRegion: "Poland",
      fitScore: 80,
      fitReason: "12 gaming investments. Polish gaming VC. CD Projekt ecosystem."
    }
  },
  {
    name: "GEM Capital",
    country: "Russia/EU",
    location: "Limassol, Cyprus",
    website: "https://gem-capital.com",
    tags: ["cyprus", "seed", "gaming-focused"],
    investor: {
      type: "VC Fund",
      founded: "2018",
      investmentFocus: "Gaming, game services",
      fundingPreferences: "EUR 200K-2M",
      geographicalRegions: ["Europe", "Global"],
      hqRegion: "Cyprus",
      fitScore: 75,
      fitReason: "14 gaming investments. Gaming-focused. CIS/EU hybrid."
    }
  },

  // === IRELAND ===
  {
    name: "Enterprise Ireland",
    country: "Ireland",
    location: "Dublin, Ireland",
    website: "https://www.enterprise-ireland.com",
    tags: ["ireland", "government", "strategic"],
    investor: {
      type: "Government Agency",
      founded: "1998",
      investmentFocus: "Irish companies, gaming",
      fundingPreferences: "EUR 200K-2M",
      geographicalRegions: ["Ireland"],
      hqRegion: "Ireland",
      fitScore: 65,
      fitReason: "17 gaming investments. Irish government agency. Good for Irish expansion."
    }
  },

  // === ADDITIONAL GAMING-FOCUSED ===
  {
    name: "Faraday Venture Partners",
    country: "UK",
    location: "London, UK",
    website: "https://faradayvp.com",
    tags: ["uk", "seed", "deep-tech", "gaming"],
    investor: {
      type: "VC Fund",
      founded: "2019",
      investmentFocus: "Deep tech, gaming tech",
      fundingPreferences: "EUR 200K-2M",
      geographicalRegions: ["UK", "Europe"],
      hqRegion: "UK",
      fitScore: 70,
      fitReason: "13 gaming investments. Deep tech + gaming focus."
    }
  },
  {
    name: "Blue Horizon Corporation",
    country: "Switzerland",
    location: "Zurich, Switzerland",
    website: "https://bluehorizon.com",
    tags: ["switzerland", "growth", "gaming"],
    investor: {
      type: "Investment Company",
      founded: "2016",
      investmentFocus: "Tech, gaming, sustainability",
      fundingPreferences: "EUR 1M-10M",
      geographicalRegions: ["Europe", "Global"],
      hqRegion: "Switzerland",
      fitScore: 65,
      fitReason: "14 gaming investments. Swiss investment company."
    }
  },
  {
    name: "Club Italia Investimenti",
    country: "Italy",
    location: "Milan, Italy",
    website: "https://www.clubitalia.it",
    tags: ["italy", "angel-network", "seed"],
    investor: {
      type: "Angel Network",
      founded: "2008",
      investmentFocus: "Italian startups, gaming",
      fundingPreferences: "EUR 100K-500K",
      geographicalRegions: ["Italy"],
      hqRegion: "Italy",
      fitScore: 60,
      fitReason: "14 gaming investments. Italian angel club."
    }
  },
  {
    name: "M Capital Partners",
    country: "Italy",
    location: "Milan, Italy",
    website: "https://mcapital.vc",
    tags: ["italy", "seed", "early-stage"],
    investor: {
      type: "VC Fund",
      founded: "2015",
      investmentFocus: "Italian tech, gaming",
      fundingPreferences: "EUR 200K-2M",
      geographicalRegions: ["Italy", "Europe"],
      hqRegion: "Italy",
      fitScore: 65,
      fitReason: "12 gaming investments. Italian early-stage."
    }
  },
  {
    name: "SOSV",
    country: "UK/USA",
    location: "London, UK",
    website: "https://sosv.com",
    tags: ["uk", "accelerator", "deep-tech", "hardware"],
    investor: {
      type: "Accelerator + VC",
      founded: "1995",
      investmentFocus: "Deep tech, hardware, gaming/XR",
      fundingPreferences: "EUR 150K-500K",
      geographicalRegions: ["Global"],
      hqRegion: "UK",
      fitScore: 70,
      fitReason: "21 gaming investments. HAX accelerator. Hardware/XR focus."
    }
  }
];

async function seedEUInvestors() {
  console.log(`Seeding ${leads.length} EU gaming investors...\n`);
  
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
      createdBy: 'seed-eu-investors',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`✅ ${lead.name} (${lead.country}) — Score: ${fitScore}`);
    created++;
  }
  
  console.log(`\n✅ Created ${created}, skipped ${skipped}`);
  process.exit(0);
}

seedEUInvestors().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
