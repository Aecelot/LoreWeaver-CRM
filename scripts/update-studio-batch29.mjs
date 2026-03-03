// Update batch 29 leads with Director ICP research
// Researched 2026-03-03 by Skel
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
    id: '6EMdR3tsWPx1jScohMZG',
    name: 'ONESOFT',
    notes: `[Director Research 2026-03-03]
ONESOFT is a leading Vietnamese mobile game developer founded in 2010, based in Hanoi. Top 3 game company in Southeast Asia (2019). Focus on hyper-casual, shooters, idle, and casual mobile games. Millions of users globally.

Director Fit: LOW - Mobile casual/hyper-casual games with minimal narrative needs. No complex NPC dialogue or emergent story systems. Not aligned with Director's narrative AI focus.`,
    tags: ['vietnam', 'indie', 'mobile', 'hyper-casual', 'shooters'],
    directorICP: 35,
    fitReason: 'Mobile casual games - minimal narrative requirements, not Director fit'
  },
  {
    id: 'UjF2fSrQakrDarbvIdJB',
    name: 'Out of the Blue',
    website: 'https://www.outbluegames.com',
    notes: `[Director Research 2026-03-03]
Out of the Blue Games is an indie studio based in Madrid, Spain. ~12 person team. Founded by Tatiana Delgado.

Games:
- Call of the Sea (2020) - Lovecraftian puzzle adventure
- American Arcadia (2023) - Narrative adventure/platformer
- The Vigilante Diaries (upcoming) - Narrative-driven RPG

Director Fit: EXCELLENT - Pure narrative focus. All games are story-driven adventures with rich dialogue and character development. The Vigilante Diaries is a narrative RPG - perfect Director showcase. Small team means accessible decision-making.

Contact: Tatiana Delgado (Founder)`,
    tags: ['spain', 'indie', 'adventure', 'mystery', 'narrative', 'rpg', 'director-icp'],
    directorICP: 90,
    fitReason: 'Narrative-focused studio making story-driven adventures and narrative RPGs'
  },
  {
    id: 'oCYX7UZqm8XmC5sJyGGo',
    name: 'Paintbucket Games',
    notes: `[Director Research 2026-03-03]
Paintbucket Games is a German indie studio specializing in narrative-heavy historical games with serious themes.

Games:
- Through the Darkest of Times (2020) - Resistance group management in Nazi Berlin
- Beholder 3 (2022) - Totalitarian state landlord sim
- Forced Abroad (visual novel) - Based on real WWII diary
- The Darkest Files (upcoming) - Post-WWII Nazi prosecution investigation

Director Fit: EXCELLENT - Heavy focus on narrative, dialogue, and character-driven stories. Historical accuracy combined with emergent story choices. Perfect fit for Director's narrative generation for branching storylines and character interactions.

Also does commissioned serious games development.`,
    tags: ['germany', 'indie', 'narrative', 'historical', 'visual-novel', 'serious-games', 'director-icp'],
    directorICP: 92,
    fitReason: 'Historical narrative specialists with branching storylines and character-driven games'
  },
  {
    id: 'blKeMhHRDK0EF6neJLMc',
    name: 'Pajama Llama Games',
    notes: `[Director Research 2026-03-03]
Pajama Llama Games is a 3-person Belgian indie studio based in Ghent.

Games:
- Flotsam - Garbage town builder in a flooded world (survival/townbuilder)
- Hexjack - Won Belgian Student Game Award

Director Fit: LOW - Primarily simulation/management games without significant narrative or dialogue systems. Very small team (3 people) with limited scope for narrative AI integration.`,
    tags: ['belgium', 'indie', 'simulation', 'town-builder', 'survival'],
    directorICP: 45,
    fitReason: 'Small team making simulation games - minimal narrative/dialogue needs'
  },
  {
    id: 'Vh3ln9YMR4sqRKAvD0N3',
    name: 'Panic',
    notes: `[Director Research 2026-03-03]
Panic is a US-based publisher (Portland, OR) that also develops apps and created the Playdate handheld console. Known for publishing critically acclaimed narrative indie games.

Published Games (partial):
- Firewatch - Award-winning narrative walking sim
- Untitled Goose Game - Comedic adventure
- Thank Goodness You're Here! - Comedy slapformer
- Arco - Revenge narrative RPG
- despelote - Slice-of-life story adventure
- Herdling, Time Flies, Nour, Big Walk (upcoming)

Director Fit: HIGH - Publisher with clear preference for narrative-driven, character-focused games. Firewatch is a landmark narrative game. Good entry point as publisher who could recommend Director to their studio partners.`,
    tags: ['usa', 'publisher', 'indie', 'narrative', 'experimental', 'playdate', 'director-icp'],
    directorICP: 88,
    fitReason: 'Publisher specializing in narrative indie games - potential to introduce Director to portfolio studios'
  },
  {
    id: 'TVXHqQME767aWDuT9AkR',
    name: 'Papergames',
    notes: `[Director Research 2026-03-03]
Papergames is a major Chinese developer/publisher based in Suzhou, Jiangsu. Known for narrative-heavy visual novels and otome games with gacha monetization.

Games:
- Love and Deepspace (2024) - 3D sci-fi otome game, $250M+ revenue
- Shining Nikki - Fashion dress-up with story
- Infinity Nikki - Open-world fashion RPG
- Mr. Love: Queen's Choice - Otome game series

Director Fit: EXCELLENT - Heavy narrative focus across all products. Visual novels and otome games are dialogue-intensive. Love and Deepspace combines narrative with 3D characters - perfect for Director's NPC dialogue generation. Large studio with resources to adopt new narrative tech.`,
    tags: ['china', 'aa', 'visual-novel', 'romance', 'otome', 'gacha', 'director-icp'],
    directorICP: 95,
    fitReason: 'Visual novel/otome specialists - narrative and dialogue are core to all products'
  },
  {
    id: 'ltnA6JbOmObu848GqMQz',
    name: 'Paradox Development Studio',
    country: 'Sweden',
    notes: `[Director Research 2026-03-03]
Paradox Development Studio is the internal development arm of Paradox Interactive (Sweden). They are THE leaders in grand strategy games with emergent narrative.

Games:
- Crusader Kings 3 - Character-driven medieval dynasty sim
- Europa Universalis V (2025) - Historical grand strategy
- Stellaris - Sci-fi 4X with emergent stories
- Hearts of Iron IV - WWII strategy
- Victoria 3 - Economic/political sim

Director Fit: EXCELLENT - Pioneer of emergent narrative in games. CK3 in particular generates complex character stories dynamically. Their games feature procedural events, character relationships, and narrative emergence. Director would be a natural enhancement to their existing narrative systems.

Note: Paradox Interactive (publisher) is separate from PDS (dev studio). Both based in Sweden, not USA.`,
    tags: ['sweden', 'aa', 'strategy', 'grand-strategy', 'emergent-narrative', 'simulation', 'director-icp'],
    directorICP: 94,
    fitReason: 'Leaders in emergent narrative - CK3 and EU5 already use procedural story generation'
  },
  {
    id: '8kPff8fkDAdnLFg1Xk4i',
    name: 'Pathea Games',
    notes: `[Director Research 2026-03-03]
Pathea Games is a Chinese indie studio known for the "My Time" life simulation RPG series.

Games:
- My Time at Portia (2018) - Life sim/RPG builder
- My Time at Sandrock (2023) - Sequel with expanded features
- My Time at Evershine (Kickstarter) - New entry with evolved features
- Let's School (2023) - School management sim
- The God Slayer (upcoming) - Open-world action RPG

Director Fit: HIGH - Life sim games heavily feature NPC relationships, dialogue, and quests. Dating sim elements require varied NPC conversations. My Time series has dozens of NPCs with relationship arcs. God Slayer suggests move into narrative RPG territory.`,
    tags: ['china', 'indie', 'life-sim', 'rpg', 'dating-sim', 'open-world', 'director-icp'],
    directorICP: 88,
    fitReason: 'Life sim RPGs with NPC relationships, dialogue, and dating systems'
  },
  {
    id: 'bLIzX1j75AVh76EclJFH',
    name: 'Pearl Abyss',
    notes: `[Director Research 2026-03-03]
Pearl Abyss is a major South Korean AAA developer known for MMORPGs.

Games:
- Black Desert Online - Flagship open-world MMORPG
- Crimson Desert (March 2026) - Open-world action-adventure, NVIDIA GeForce NOW partnership
- DokeV (upcoming) - Creature collection open-world

Director Fit: MEDIUM-HIGH - Open-world games with NPC systems. Crimson Desert positioned as action-adventure suggests narrative focus beyond typical MMO. Large AAA studio with resources, but long sales cycles and enterprise decision-making. Worth pursuing given narrative direction of Crimson Desert.`,
    tags: ['south-korea', 'aaa', 'mmorpg', 'open-world', 'action-adventure', 'director-icp'],
    directorICP: 78,
    fitReason: 'AAA open-world games - Crimson Desert suggests increased narrative focus'
  },
  {
    id: 'drwlNnZgwVO8DwGF4FVC',
    name: 'Pieces Interactive',
    notes: `[Director Research 2026-03-03]
Pieces Interactive is a Swedish studio owned by Embracer Group/THQ Nordic. Known for horror games.

Games:
- Alone in the Dark (2024) - Survival horror reimagining, THQ Nordic published
- Previously: Kill to Collect, Magicka 2 DLC, Titan Quest expansions

Director Fit: MEDIUM - Survival horror with narrative elements. Alone in the Dark has story/mystery components. Part of Embracer Group which has complex corporate structure and ongoing restructuring (2024-25). Decision-making may be challenging.`,
    tags: ['sweden', 'indie', 'horror', 'action', 'embracer', 'thq-nordic'],
    directorICP: 68,
    fitReason: 'Horror with narrative elements - Embracer ownership creates uncertainty'
  }
];

async function updateBatch29() {
  console.log('Updating batch 29 leads with Director ICP research...\n');
  
  let updated = 0;
  let qualified = 0;
  
  for (const lead of updates) {
    try {
      const docRef = db.collection('leads').doc(lead.id);
      const doc = await docRef.get();
      
      if (!doc.exists) {
        console.log(`❌ Lead not found: ${lead.name} (${lead.id})`);
        continue;
      }
      
      const existingData = doc.data();
      const updateData = {
        notes: lead.notes,
        tags: lead.tags,
        'studio.fitScore': lead.directorICP,
        'studio.fitReason': lead.fitReason,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };
      
      // Update website if provided and different
      if (lead.website && lead.website !== existingData.website) {
        updateData.website = lead.website;
      }
      
      // Update country if provided and different
      if (lead.country && lead.country !== existingData.country) {
        updateData.country = lead.country;
      }
      
      // Qualify if ICP >= 85 - move to "qualified-lead" stage
      if (lead.directorICP >= 85) {
        updateData['pipeline.stageId'] = 'qualified-lead';
        updateData['pipeline.enteredStageAt'] = admin.firestore.FieldValue.serverTimestamp();
        qualified++;
      }
      
      await docRef.update(updateData);
      
      const qualifiedMark = lead.directorICP >= 85 ? ' ✓ QUALIFIED' : '';
      console.log(`✅ ${lead.name}: ICP ${lead.directorICP}${qualifiedMark}`);
      updated++;
      
    } catch (error) {
      console.error(`❌ Error updating ${lead.name}:`, error.message);
    }
  }
  
  console.log(`\n=== Summary ===`);
  console.log(`Updated: ${updated}/${updates.length}`);
  console.log(`Qualified (ICP >= 85): ${qualified}`);
}

updateBatch29().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
