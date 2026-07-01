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
    id: 'HEgo2QHyQwArilgMPkJr',
    name: 'Sea Monster Entertainment',
    note: `**Research completed 2026-03-05**

**Location:** Cape Town, South Africa
**Website:** https://www.seamonster.digital
**Type:** Impact Games Studio (educational/social games + storytelling)

**Contacts:**
- General: hello@seamonster.digital / hello@seamonster.co.za
- Business/Creative: asavela@seamonster.digital
- Careers: careers@seamonster.digital
- CEO: Glenn Gillis (glenn@seamonster.co.za) - also Chairperson of Games for Change Africa
- Creative Director: Jade Duckitt (LinkedIn: jade-duckitt-95a427117)

**Phone:** +27 21 461 0365
**Address:** 9 Caxton Street, Zonnebloem, Cape Town

**Profile:** 40+ full-time staff. Specializes in "impact games" combining storytelling with technology. Strong narrative focus. Founded 2011.

**ICP Fit:** HIGH - narrative-focused impact games studio, good size team, established reputation`
  },
  {
    id: 'HJsEmYzcx1GOdWm9UZDz',
    name: 'Ska Studios',
    note: `**Research completed 2026-03-05**

**Location:** USA (indie)
**Website:** https://ska-studios.com
**Type:** Indie game studio (action-RPGs)

**Contacts:**
- Key Requests/General: james@ska-studios.com
- Support: contact@ska-studios.com
- Twitter: @skastudios, @jamezila
- LinkedIn: linkedin.com/in/jamessilva

**Team:** Very small (1-2 person husband/wife team)
- James Silva - Founder, President, Designer/Artist/Engineer
- Michelle Silva - Co-creator (art)

**Known For:** Salt and Sanctuary, Salt and Sacrifice (2D action-RPGs, Dark Souls-inspired)

**Notes:** 
- Very small indie, may not reply to all requests
- Press/review keys via Keymailer
- Founded 2007

**ICP Fit:** MEDIUM - narrative-driven games but extremely small team, may not have bandwidth for external tools`
  },
  {
    id: 'HMVHDaPVfXHafe8VRTAh',
    name: 'SYCK',
    note: `**Research completed 2026-03-05**

**Location:** Colombia
**Website:** http://syck.com
**Type:** Indie game studio (narrative-driven JRPGs)

**Contacts:**
- Facebook (primary): facebook.com/syckstudio (best for professional inquiries)
- No public email found

**Team:** Founded 2014 by Sebas, Yadd, Carlos, and Kamilo

**Known For:** Cris Tales (co-developed with Dreams Uncorporated) - narrative-driven JRPG published by Modus Games

**Focus:** New stories, artistic character design, innovative narrative-driven gameplay

**Collaboration:** Often works with Dreams Uncorporated

**ICP Fit:** HIGH - narrative-focused JRPG developers, co-developed award-winning Cris Tales. Contact via Facebook messenger for business inquiries.`
  },
  {
    id: 'Hbda9dey3wGjjHgTbD2r',
    name: 'ACE Team',
    note: `**Research completed 2026-03-05**

**Location:** Santiago, Chile
**Website:** https://www.aceteam.cl
**Type:** Indie game studio (unique/genre-defying action games)

**Contacts:**
- General/Press: contact@aceteam.cl
- Business: business@aceteam.cl
- Carlos Bordeu (co-founder): cbordeu@aceteam.cl

**Team:** ~35 employees, $5.1M revenue (RocketReach estimate)
- Founded by brothers Andres, Carlos, and Edmundo Bordeu

**Known For:** 
- Zeno Clash series (surreal first-person brawler)
- Rock of Ages series
- Abyss Odyssey
- Clash: Artifacts of Chaos

**Mission:** "Create high-quality, genre-defying gameplay experiences with unmistakably unique style"

**Awards:** Best Chilean Development Studio 2011, PC Gamer Indie Game of the Year 2009

**ICP Fit:** HIGH - established studio with unique artistic vision, strong narrative elements in their games, good team size for tool adoption`
  },
  {
    id: 'HfccGWA0eqG4COjv4aXq',
    name: 'Sinergia Studios',
    note: `**Research completed 2026-03-05**

**Location:** São Paulo, Brazil
**Website:** https://sinergiagames.com.br / www.sinergiastudios.com
**Type:** Game and animation studio

**Contacts:**
- General: contato@sinergiagames.com.br
- Alternative: contact@sinergiastudios.com
- Creative Director: Cristhyane Ribeiro - cristhyane@sinergiagames.com.br

**Phone:** +55 71 99604-5242 / +55 1137179120

**Team:** Cristhyane Ribeiro - Co-founder, Writer, Screenwriter, Creative Director

**Focus:** Games, animations, visual novels, comics. Entertainment market products with cultural themes (e.g., "O Feitiço de Exú" - Afro-Brazilian cultural game)

**Member of:** Abragames (Brazilian Game Developers Association)

**ICP Fit:** HIGH - narrative-focused studio (writer/screenwriter as Creative Director), produces visual novels and story-driven games, good fit for Architect`
  }
];

async function updateStudio(studio) {
  try {
    // Add research note
    await db.collection('notes').add({
      leadId: studio.id,
      content: studio.note,
      status: 'warm',
      createdBy: 'skel-research',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log(`✓ Added note for ${studio.name}`);

    // Update lead status
    await db.collection('leads').doc(studio.id).update({ 
      status: 'researched',
      'pipeline.stageId': 'researched',
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log(`✓ Updated status for ${studio.name}`);
  } catch (err) {
    console.error(`Error processing ${studio.name}:`, err.message);
  }
}

async function main() {
  console.log('Updating 5 studios from batch research...\n');
  
  for (const studio of updates) {
    await updateStudio(studio);
  }
  
  console.log('\nDone!');
}

main();
