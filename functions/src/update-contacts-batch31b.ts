import * as admin from 'firebase-admin';
const serviceAccount = require('../../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

interface ContactUpdate {
  id: string;
  name: string;
  email?: string;
  contactResearched?: boolean;
  notes?: string;
  narrativeFit?: number;
}

const updates: ContactUpdate[] = [
  // EMAILS FOUND
  {
    id: 'Q8OoTniQmBg6BCAQvUHt',
    name: 'Jump Over The Age',
    email: 'gareth@jumpovertheage.com',
    narrativeFit: 95,
    notes: 'Citizen Sleeper dev (Gareth Damian Martin). Narrative-driven RPGs. TTRPG-inspired. 4x BAFTA nominated. "some of the best prose in all of video games" - Waypoint. EXCELLENT narrative fit. High priority lead.'
  },
  {
    id: 'PBnddMf0AosgnSLohvUg',
    name: 'DoubleMoose',
    email: 'info@doublemoose.com',
    narrativeFit: 50,
    notes: 'Swedish indie studio (Skövde). Quirky game dev collective. Press via Keymailer.'
  },
  
  // STRONG NARRATIVE FIT - MARK FOR FOLLOW-UP (emails likely but not found)
  {
    id: 'MNeQCydY83D1QJMs6c4m',
    name: 'Revolution Software',
    contactResearched: true,
    narrativeFit: 90,
    notes: 'Broken Sword series - classic narrative adventure games. UK studio (York). Founded 1990 by Charles Cecil. Email obfuscated on site but likely press@revolution.co.uk or enquiries@revolution.co.uk. HIGH PRIORITY narrative fit.'
  },
  {
    id: 'V5WQZOaM39KZZQDfrSOv',
    name: 'Supermassive Games',
    contactResearched: true,
    narrativeFit: 95,
    notes: 'Until Dawn, Dark Pictures Anthology, The Quarry. BAFTA-winning narrative horror games. Now owned by Nordisk Games. Enterprise contact through parent company. VERY HIGH narrative fit but large studio.'
  },
  {
    id: 'QuiuC5MjWMMOfuaLj9pO',
    name: 'Sandfall Interactive',
    contactResearched: true,
    narrativeFit: 85,
    notes: 'Clair Obscur: Expedition 33 dev. French studio. "narrative-driven adventure" focus. Published by Kepler Interactive. Lead writer Jennifer Svedberg-Yen. HIGH narrative fit - turn-based RPG.'
  },
  {
    id: 'Rjfeq1GmcIAZecC3SOW9',
    name: 'Rusty Lake',
    contactResearched: true,
    narrativeFit: 75,
    notes: 'Dutch puzzle adventure studio. Cube Escape series. Atmospheric narrative puzzles with unique storylines. No direct email on site.'
  },
  {
    id: 'Ue0Kuu3McVJpxf61krl0',
    name: 'Motion Twin',
    contactResearched: true,
    narrativeFit: 45,
    notes: 'French worker cooperative (8 people). Dead Cells, Windblown. Action roguelike focus. Less narrative-heavy.'
  },
  {
    id: 'O1pOmEV1P85eLJnoXC0E',
    name: 'Frozenbyte',
    contactResearched: true,
    narrativeFit: 60,
    notes: 'Finnish studio. Trine series (puzzle-platformer with narrative). Starbase (MMO). Email likely press@frozenbyte.com based on contact page structure.'
  },
  {
    id: 'PkhToHNuNn7ECBoX0ki1',
    name: 'ustwo games',
    contactResearched: true,
    narrativeFit: 65,
    notes: 'Monument Valley series. UK studio, first B-Corp certified game studio. Beautiful puzzle games with light narrative. No direct email visible.'
  },
  {
    id: 'Pc09LQKWNjtsher42Flv',
    name: "That's No Moon",
    contactResearched: true,
    narrativeFit: 85,
    notes: 'Founded by ex-Naughty Dog devs. AAA narrative focus. Minimal website - no contact info visible. VC-funded studio.'
  },
  {
    id: 'Mo4Gx15qD2zXjM25NWIP',
    name: 'Nekcom Games',
    contactResearched: true,
    narrativeFit: 70,
    notes: 'Chinese studio. Showa American Story (narrative RPG), DYING series. Series A funded (Galaxy Interactive). No email visible.'
  },
  {
    id: 'QRtn1LXaXoZDTocj9JKh',
    name: 'Sokpop Collective',
    contactResearched: true,
    narrativeFit: 40,
    notes: 'Dutch indie collective. Prolific small game makers. Minimal website - interactive bubbles only. Less narrative focus.'
  },
  
  // LARGE/ENTERPRISE - CONTACT THROUGH CORPORATE
  {
    id: 'NGF4CtjlXcmNFZiyDxCm',
    name: 'Krafton',
    contactResearched: true,
    notes: 'Korean conglomerate (PUBG). Enterprise-level contact only. Not ideal for indie tools.'
  },
  {
    id: 'NXJCjELSNDKJ1S223sx5',
    name: 'CyberConnect2',
    contactResearched: true,
    narrativeFit: 70,
    notes: 'Japanese studio. .hack series, Naruto games, Fuga series. Good narrative pedigree but enterprise contact only (Japanese site).'
  },
  {
    id: 'PIS1zaENbnhH2ZEVNLrZ',
    name: 'Spike Chunsoft',
    contactResearched: true,
    narrativeFit: 85,
    notes: 'Danganronpa, Zero Escape, AI: The Somnium Files. EXCELLENT narrative fit but Japanese corporate - enterprise contact only.'
  },
  {
    id: 'O0aRnNX9sAPruvnYLfvm',
    name: 'MachineGames',
    contactResearched: true,
    narrativeFit: 75,
    notes: 'Swedish studio (Bethesda/Microsoft). Wolfenstein, Indiana Jones. AAA narrative but Microsoft subsidiary.'
  },
  {
    id: 'OZXoms4nIlAMCGWCHzQj',
    name: 'Plarium',
    contactResearched: true,
    notes: 'Israeli mobile/social game company. RAID: Shadow Legends. Not narrative-focused.'
  },
  {
    id: 'PoOM1S5BsktKDnFZT6xf',
    name: 'CrazyLabs',
    contactResearched: true,
    notes: 'Israeli mobile publisher. Hyper-casual games. Not a fit for narrative tools.'
  }
];

async function updateContacts() {
  console.log(`Updating ${updates.length} studio contacts (Batch 31b)...`);
  
  let emailsAdded = 0;
  let researched = 0;
  
  for (const update of updates) {
    const updateData: any = {
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    if (update.email) {
      updateData['contact.email'] = update.email;
      emailsAdded++;
    }
    
    if (update.contactResearched) {
      updateData.contactResearched = true;
      researched++;
    }
    
    if (update.narrativeFit !== undefined) {
      updateData.narrativeFit = update.narrativeFit;
    }
    
    try {
      await db.collection('leads').doc(update.id).update(updateData);
      console.log(`✓ Updated: ${update.name}`);
      
      // Add note if provided
      if (update.notes) {
        await db.collection('notes').add({
          leadId: update.id,
          content: update.notes,
          status: update.email ? 'warm' : 'cold',
          createdBy: 'skel-automation',
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }
    } catch (error: any) {
      console.error(`✗ Failed: ${update.name} - ${error.message}`);
    }
  }
  
  console.log(`\n=== Batch 31b Summary ===`);
  console.log(`Emails added: ${emailsAdded}`);
  console.log(`Marked researched: ${researched}`);
  console.log(`Total processed: ${updates.length}`);
}

updateContacts().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
