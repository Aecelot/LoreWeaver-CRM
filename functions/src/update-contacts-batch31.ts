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
    id: 'HJsEmYzcx1GOdWm9UZDz',
    name: 'Ska Studios',
    email: 'press@ska-studios.com',
    narrativeFit: 75,
    notes: 'Salt and Sanctuary, Salt and Sacrifice - soulslike 2D RPGs. Press contact found. Indie studio, good narrative fit.'
  },
  {
    id: 'HmCODD9NQVY8LwTHFqx8',
    name: 'Longdue Games',
    email: 'team@longduegames.com',
    narrativeFit: 95,
    notes: 'Making HOPETOWN - spiritual successor to Disco Elysium. Narrative-driven CRPG. Martin Luiga (ZA/UM founding member) involved. EXCELLENT narrative fit. High priority lead.'
  },
  
  // MARK AS RESEARCHED - NO DIRECT EMAIL (forms/large companies)
  {
    id: 'IDxiJqVHuWm5BXgUNvjL',
    name: 'PLAYISM',
    contactResearched: true,
    notes: 'Japanese indie publisher. Contact form only at playism.com/en/contact/business/. No direct email found.'
  },
  {
    id: 'EJHsS9HdwAHw2WdUPhR9',
    name: 'Redlynx',
    contactResearched: true,
    notes: 'Ubisoft subsidiary (Finland). No independent contact. Redirect to Ubisoft corporate.'
  },
  {
    id: 'GYknakLMujjJxdtFuNKI',
    name: 'Housemarque',
    contactResearched: true,
    narrativeFit: 30,
    notes: 'PlayStation Studios subsidiary. Makes arcade games (Returnal). Limited narrative focus. No independent contact.'
  },
  {
    id: 'HUpDLkFFamrzuXASIady',
    name: 'Gearbox Software',
    contactResearched: true,
    narrativeFit: 50,
    notes: 'AAA studio (Borderlands). Large company, no direct contact found. Website minimal.'
  },
  {
    id: 'JaU0fbzu1lb1iCppPPWG',
    name: 'Playground Games',
    contactResearched: true,
    narrativeFit: 40,
    notes: 'Xbox Game Studios subsidiary (Forza, upcoming Fable). Contact via Xbox/Microsoft only.'
  },
  {
    id: 'K8edfujzyY9VBXchJFBL',
    name: 'miHoYo / HoYoverse',
    contactResearched: true,
    narrativeFit: 60,
    notes: 'Genshin Impact, Star Rail. Large Chinese company. No direct contact found.'
  },
  {
    id: 'JCVhENx36WYfHlwx6jME',
    name: 'Everstone Studios (NetEase)',
    contactResearched: true,
    notes: 'NetEase subsidiary. Enterprise contact only.'
  },
  {
    id: 'LU6ehZh4agqjpJqCn9Vh',
    name: 'TiMi Studio Group (Tencent)',
    contactResearched: true,
    notes: 'Tencent subsidiary. Makes Honor of Kings, CoD Mobile. Enterprise contact only.'
  },
  {
    id: 'IN2fvLR9JdRFXTf2xgxl',
    name: 'Redhill Games',
    contactResearched: true,
    narrativeFit: 45,
    notes: 'Co-development studio (Helsinki). Contact page exists but no direct email visible. Focus on AAA co-dev.'
  },
  {
    id: 'LECOaesSwBLavnENntv3',
    name: 'Passion Republic',
    contactResearched: true,
    narrativeFit: 35,
    notes: 'Malaysian outsourcing/art studio. Works with From Software, Naughty Dog, etc. Not primary game dev.'
  },
  {
    id: 'G2qjxqRocSbW5dvMlfUb',
    name: 'Springloaded',
    contactResearched: true,
    notes: 'Singapore agency/consultancy. No game development focus. Not a fit.'
  },
  {
    id: 'IrbNPrdbFna3UdS4T0FX',
    name: 'Axios Games',
    contactResearched: true,
    narrativeFit: 40,
    notes: 'Argentina game consulting, not primary dev studio. Calendly booking only (antonio-martinez-369).'
  },
  {
    id: 'LCg0sZ7Hmt4awPrTBIqH',
    name: 'Subset Games',
    contactResearched: true,
    narrativeFit: 50,
    notes: 'FTL, Into the Breach. Minimal website with no contact info. Strategy/roguelike focus.'
  },
  {
    id: 'L72InWHvefM79egp4B30',
    name: 'Maccima Games',
    contactResearched: true,
    narrativeFit: 45,
    notes: 'Filipino indie studio. Making "Eat the Rich" multiplayer party game. No email found on website.'
  },
  {
    id: 'LBBaNHd92kmYsiKM9Wu5',
    name: 'Gentle Troll Entertainment',
    contactResearched: true,
    notes: 'Website down (gentle-troll.com ENOTFOUND). German studio.'
  },
  {
    id: 'KfNP9nZbBD4zUnykmQRS',
    name: 'Futile Games',
    contactResearched: true,
    narrativeFit: 55,
    notes: 'Taiwan indie. Making Mossasis (atmospheric puzzle). No direct contact - Steam page only.'
  },
  {
    id: 'H9lKShX3cZiTH8EvMWfp',
    name: 'AN Games Studio',
    contactResearched: true,
    notes: 'Egyptian game dev. Website shows "not accepting new projects". Not currently active.'
  },
  {
    id: 'LVE5DwlH5byZHiY46uee',
    name: 'The Molasses Flood',
    contactResearched: true,
    notes: 'Website down (molassesflood.com fetch failed). Already marked disqualified in CRM.'
  }
];

async function updateContacts() {
  console.log(`Updating ${updates.length} studio contacts...`);
  
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
  
  console.log(`\n=== Batch 31 Summary ===`);
  console.log(`Emails added: ${emailsAdded}`);
  console.log(`Marked researched: ${researched}`);
  console.log(`Total processed: ${updates.length}`);
}

updateContacts().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
