// Update like Charlie, Supermassive, Fool's Theory, Failbetter with deep research
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
    searchName: "like Charlie",
    data: {
      name: "like Charlie",
      priority: "high",
      contact: { 
        name: "Dagmar Blommaert", 
        role: "Co-founder, Writer", 
        email: "", 
        twitter: "@LCharlieGames"
      },
      website: "https://www.likecharlie.com",
      location: "Ghent, Belgium",
      country: "Belgium",
      tags: ["belgium", "indie", "narrative", "branching", "architect-icp", "researched"],
      notes: `DEEP RESEARCH COMPLETE (2026-02-28)

== COMPANY ==
Founded: ~2018 | Location: Ghent, Belgium
Team: 8 "storytelling enthusiasts"
Origin: Two co-workers made Marie's Room as passion project

== KEY PEOPLE ==
Dagmar Blommaert — Co-founder, Writer
Kenny Guillaume — Co-founder, 3D Artist
Twitter: @LCharlieGames

== GAMES ==
Ghost on the Shore (2022) — Branching narrative, multiple endings
Marie's Room (2018) — Free walking sim, award-winning, breakthrough hit

== DESIGN ==
Narrative-focused, relationship exploration
Branching paths, emotional choices
Belgian Game Awards 2021 nominee

== FIT ==
Architect ICP: PERFECT. 8-person team doing branching narrative.
Exactly our target customer.

See: research/leads/like-charlie.md`,
      "studio.size": "8",
      "studio.type": "indie",
      "studio.games": ["Ghost on the Shore", "Marie's Room"],
      "studio.fitScore": 95,
      "studio.fitReason": "8-person narrative studio doing branching games. PERFECT Architect ICP.",
      "pipeline.stageId": "researched",
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  },
  {
    searchName: "Supermassive",
    data: {
      priority: "medium",
      contact: { name: "", role: "", email: "", twitter: "" },
      location: "Guildford, UK",
      tags: ["uk", "aa", "horror", "branching", "director-icp", "researched", "unstable"],
      notes: `DEEP RESEARCH COMPLETE (2026-02-28)

== COMPANY ==
Founded: 2008 | Location: Guildford, UK
Team: 300+ (pre-layoffs) → ~210 (post-2024 layoffs)
Status: UNSTABLE — layoffs, founders left, delays

== TIMELINE ==
Jul 2025: More layoffs, Directive 8020 delayed
Feb 2024: 90 layoffs
2024: Founders Pete & Joe Samuels stepped down

== GAMES ==
Directive 8020 (2025 delayed) — Sci-fi horror
The Quarry (2022) — 186 possible endings
Dark Pictures Anthology (2019-2024) — 5 games
Until Dawn (2015) — Breakthrough, butterfly effect

== FIT ==
Director ICP: Good fit for NPC dialogue at scale
Architect ICP: Also good — 186 endings needs tooling
BUT: Currently unstable. Deprioritize until they stabilize.

See: research/leads/supermassive-games.md`,
      "studio.size": "210",
      "studio.fitScore": 90,
      "studio.fitReason": "Branching horror masters, 186 endings in The Quarry. BUT currently unstable (layoffs, delays). Wait for stabilization.",
      "pipeline.stageId": "researched",
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  },
  {
    searchName: "Fool's Theory",
    data: {
      priority: "high",
      contact: { 
        name: "Jakub Rokosz", 
        role: "CEO, Co-owner", 
        email: "", 
        linkedin: "",
        background: "Ex-CD Projekt Red Senior Quest Designer (Witcher 2/3)"
      },
      location: "Bielsko-Biała, Poland",
      tags: ["poland", "aa", "rpg", "witcher", "director-icp", "architect-icp", "researched"],
      notes: `DEEP RESEARCH COMPLETE (2026-02-28)

== COMPANY ==
Founded: 2015 by ex-CD Projekt Red devs
Location: Bielsko-Biała, Poland (19th-century building!)
Team: ~100 (expanding to 140)

== KEY PEOPLE ==
Jakub Rokosz — CEO. EX-CDPR SENIOR QUEST DESIGNER (Witcher 2/3).
Understands branching narrative deeply.

== GAMES ==
The Witcher Remake (TBD) — LEAD DEVELOPER, UE5
Baldur's Gate 3 — co-dev with Larian
Divinity: OS2 DLC — co-dev with Larian
Hellblade, Outriders, Gord — co-dev
Seven: The Days Long Gone (2017) — original game

== UNIQUE ==
"Trusted outsource" for AAA studios
Larian AND CDPR trust them with major projects
This is extremely rare validation

== FIT ==
Director ICP: Witcher Remake = tons of NPC dialogue
Architect ICP: Quest design DNA = needs narrative tools
BOTH products could fit.

See: research/leads/fools-theory.md`,
      "studio.size": "100-140",
      "studio.fitScore": 90,
      "studio.fitReason": "Making Witcher Remake. CEO is ex-CDPR Quest Designer. Perfect Director + Architect prospect.",
      "pipeline.stageId": "researched",
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  },
  {
    searchName: "Failbetter",
    data: {
      priority: "medium",
      contact: { name: "", role: "", email: "" },
      location: "London, UK",
      tags: ["uk", "indie", "narrative", "qbn", "architect-icp", "researched", "ai-anti-generative"],
      notes: `DEEP RESEARCH COMPLETE (2026-02-28)

== COMPANY ==
Founded: 2009 | Location: London, UK
Team: ~12-16 (fluctuates, had layoffs)
Awards: Best Places to Work 2017, 2019, 2020, 2021

== AI STANCE (CRITICAL) ==
FROM THEIR WEBSITE:
"We make our games WITHOUT CRUNCH OR GENERATIVE AI."
EXPLICITLY ANTI-GENERATIVE AI.

== CONNECTION ==
Alexis Kennedy FOUNDED Failbetter, left 2016
Lottie Bevan was producer here
Both now run Weather Factory
Same universe: Fallen London → Sunless Sea → Cultist Simulator

== GAMES ==
Fallen London (2009+) — STILL RUNNING live service
Sunless Sea (2015), Sunless Skies (2019)
Mask of the Rose (2023)
Fallen London TTRPG (2025) — with Magpie Games

== INVENTED QBN ==
Quality-Based Narrative — their innovation
Very opinionated about narrative tools

== FIT ==
Architect: COMPLICATED. Must position as "production tool, not generator"
Director: HARD NO. Explicit rejection of generative AI.

APPROACH VIA WEATHER FACTORY FIRST.

See: research/leads/failbetter-games.md`,
      "studio.size": "12-16",
      "studio.fitScore": 90,
      "studio.fitReason": "Invented QBN, massive credibility. BUT explicitly anti-generative AI. Only Architect might work, positioned as production tool. Approach via Weather Factory.",
      "pipeline.stageId": "researched",
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  }
];

async function updateLeads() {
  for (const update of updates) {
    const snapshot = await db.collection('leads')
      .where('name', '>=', update.searchName)
      .where('name', '<=', update.searchName + '\uf8ff')
      .limit(1)
      .get();
    
    if (snapshot.empty) {
      console.log(`⚠️  ${update.searchName} not found, creating...`);
      await db.collection('leads').add({
        type: "studio",
        status: "active",
        owner: "system",
        ...update.data,
        pipeline: { pipelineId: "default", stageId: "researched", enteredStageAt: admin.firestore.FieldValue.serverTimestamp() },
        createdBy: "research-deep-dive",
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log(`✅ Created ${update.searchName}`);
    } else {
      await snapshot.docs[0].ref.update(update.data);
      console.log(`✅ Updated ${update.searchName}`);
    }
  }
  
  process.exit(0);
}

updateLeads();
