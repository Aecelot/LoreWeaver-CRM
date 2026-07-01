import * as admin from 'firebase-admin';

// Initialize Firebase Admin
const serviceAccount = require('../../service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

interface Contact {
  name: string;
  role: string;
  email: string;
  linkedin?: string;
  source: string;
}

interface LeadUpdate {
  leadName: string;
  contacts: Contact[];
  generalEmail?: string;
  notes?: string;
}

// Compiled contacts from all 3 batches - only verified emails
const updates: LeadUpdate[] = [
  // Batch 1
  { leadName: "Paintbucket Games", contacts: [{ name: "Jörg Friedrich", role: "Co-Founder & Game Director", email: "", linkedin: "https://www.linkedin.com/company/paintbucketgames", source: "https://paintbucket.de/en/about-us" }], generalEmail: "info@paintbucket.de" },
  { leadName: "Kiro'o Games", contacts: [{ name: "Olivier Madiba", role: "Founder & CEO", email: "", linkedin: "", source: "crunchbase" }], generalEmail: "founders@kiroogames.com" },
  { leadName: "Nordic Game Ventures", contacts: [], generalEmail: "invest@nordicgame.vc" },
  { leadName: "Graph Ventures", contacts: [], generalEmail: "team@graphventures.com" },
  { leadName: "11 bit studios", contacts: [], generalEmail: "info@11bitstudios.com" },
  { leadName: "Giant Sparrow", contacts: [{ name: "Ian Dallas", role: "Founder & Creative Director", email: "", linkedin: "https://www.linkedin.com/in/iandallas/", source: "iandallas.com" }], generalEmail: "ai@fortyseven.com", notes: "PR handled by FortySevenPR" },
  { leadName: "Harebrained Schemes", contacts: [], generalEmail: "info@hbs-studios.com" },
  { leadName: "Pathea Games", contacts: [], generalEmail: "contact@pathea.net" },
  { leadName: "DigixArt", contacts: [{ name: "Yoan Fanise", role: "Founder", email: "", linkedin: "", source: "wholesgame.com" }, { name: "Anne-Laure Fanise", role: "Founder", email: "", linkedin: "", source: "wholesgame.com" }], generalEmail: "contact@digixart.com" },
  { leadName: "Larian Studios", contacts: [], generalEmail: "info@larian.com", notes: "Also: press@larian.com, jobs@larian.com" },
  { leadName: "Alt Shift", contacts: [{ name: "Julien Cotret", role: "Owner", email: "contact@altshift.fr", linkedin: "", source: "altshift.fr/privacy-policy" }], generalEmail: "contact@altshift.fr" },
  { leadName: "Black Cube Games", contacts: [], generalEmail: "info@blackcubegames.com" },
  { leadName: "Falafel Games", contacts: [], generalEmail: "v@falafel-games.com" },
  { leadName: "Bloober Team", contacts: [{ name: "Piotr Babieno", role: "CEO", email: "", linkedin: "", source: "contactout.com" }], generalEmail: "biuro@blooberteam.com" },
  
  // Batch 2
  { leadName: "Game Kitchen", contacts: [], generalEmail: "info@thegamekitchen.com", notes: "Phone: +34 610616549" },
  { leadName: "Tactile Games", contacts: [], generalEmail: "hi@tactilegames.com" },
  { leadName: "Dvora Studio", contacts: [{ name: "Minho Kim", role: "Founder", email: "minho@devespresso.com", linkedin: "", source: "dvorastudio.com" }], generalEmail: "minho@devespresso.com" },
  { leadName: "Panic", contacts: [{ name: "Steven Frank & Cabel Sasser", role: "Founders", email: "founders@panic.com", linkedin: "", source: "help.panic.com" }], generalEmail: "pitches@panic.com", notes: "Use pitches@panic.com for game pitches. Games PR: pr@popagenda.co" },
  { leadName: "CreativeForge Games", contacts: [{ name: "Sebastian Żaczek", role: "CEO", email: "ceo@creativeforge.pl", linkedin: "", source: "creativeforge.pl/contact" }], generalEmail: "info@creativeforge.pl" },
  { leadName: "Maliyo Games", contacts: [], generalEmail: "info@maliyo.com" },
  { leadName: "Hero Concept", contacts: [], generalEmail: "info@heroconcept.com", notes: "Also: marketing@heroconcept.com for review keys" },
  { leadName: "The Gentlebros", contacts: [{ name: "Desmond Wong", role: "CEO, Artist, Game Designer", email: "", linkedin: "https://www.linkedin.com/in/desmond-wong-7300a910/", source: "thegentlebros.com" }], generalEmail: "contact@thegentlebros.com" },
  { leadName: "Maysalward", contacts: [], generalEmail: "info@maysalward.com", notes: "Also UK: info@maysalward.uk" },
  { leadName: "VIC Game Studios", contacts: [], generalEmail: "help@vicgamestudios.com" },
  { leadName: "Rayark", contacts: [], generalEmail: "service@rayark.com" },
  { leadName: "Spoilz Studio", contacts: [{ name: "Musab Almalki", role: "Founder", email: "hi@spoilz.studio", linkedin: "", source: "spoilz.studio" }], generalEmail: "hi@spoilz.studio" },
  
  // Batch 3
  { leadName: "Cyanide Studio", contacts: [], generalEmail: "com@cyanide-studio.com" },
  { leadName: "Weather Factory", contacts: [{ name: "Alexis Kennedy", role: "Co-Founder / Writer", email: "alexis@weatherfactory.biz", linkedin: "", source: "weatherfactory.biz" }, { name: "Lottie Bevan", role: "Co-Founder / Producer", email: "lottie@weatherfactory.biz", linkedin: "", source: "weatherfactory.biz" }], generalEmail: "support@weatherfactory.biz" },
  { leadName: "RealityArts Studio", contacts: [{ name: "Ismail Kemal Ciftcioglu", role: "Co-Founder", email: "", linkedin: "", source: "realityartsstudio.com" }, { name: "Bahar Baziki", role: "Co-Founder", email: "", linkedin: "", source: "realityartsstudio.com" }], generalEmail: "info@realityartsstudio.com" },
  { leadName: "Sabotage Studio", contacts: [{ name: "Thierry Boulanger", role: "President & Creative Director", email: "", linkedin: "", source: "sabotagestudio.com" }], generalEmail: "info@sabotagestudio.com" },
  { leadName: "Instinct Games", contacts: [], generalEmail: "info@instinctgames.com" },
  { leadName: "Terrifying Jellyfish", contacts: [{ name: "TJ Hughes", role: "Creator / Developer", email: "info@terrifyingjellyfish.com", linkedin: "", source: "terrifyingjellyfish.com" }], generalEmail: "info@terrifyingjellyfish.com", notes: "Creator of Nour. Also: help@food.game" },
  { leadName: "Deluxe Creation", contacts: [{ name: "Edu Shola", role: "Founder", email: "", linkedin: "", source: "deluxecreation.com" }], generalEmail: "deluxecreationstudiosng@gmail.com" },
  { leadName: "Atlus", contacts: [], generalEmail: "help.desk@shopatlus.com", notes: "Now part of SEGA" },
  { leadName: "Fast Travel Games", contacts: [], generalEmail: "info@fasttravelgames.com", notes: "Also: content@fasttravelgames.com, press@fasttravelgames.com" },
  { leadName: "Internet of Elephants", contacts: [{ name: "Gautam Shah", role: "Founder", email: "", linkedin: "", source: "internetofelephants.com" }], generalEmail: "info@internetofelephants.com" },
  { leadName: "Dark Emerald Studios", contacts: [], generalEmail: "info@darkemerald.me" },
  { leadName: "Techouse Games", contacts: [], generalEmail: "info@techousegames.com" },
];

async function importContacts() {
  console.log(`Importing contacts for ${updates.length} leads...`);
  
  let updated = 0;
  let notFound = 0;
  let errors = 0;
  
  for (const update of updates) {
    try {
      // Find lead by name (case-insensitive search)
      const leadsRef = db.collection('leads');
      const snapshot = await leadsRef.get();
      
      let foundDoc: admin.firestore.QueryDocumentSnapshot | null = null;
      for (const doc of snapshot.docs) {
        const data = doc.data();
        const name = (data.name || data.company || '').toLowerCase();
        const searchName = update.leadName.toLowerCase();
        
        // Match by exact name or partial match
        if (name === searchName || name.includes(searchName) || searchName.includes(name)) {
          foundDoc = doc;
          break;
        }
      }
      
      if (!foundDoc) {
        console.log(`  NOT FOUND: ${update.leadName}`);
        notFound++;
        continue;
      }
      
      // Prepare update data
      const updateData: any = {};
      
      if (update.generalEmail) {
        updateData.email = update.generalEmail;
        updateData.contactEmail = update.generalEmail;
      }
      
      if (update.contacts && update.contacts.length > 0) {
        // Filter contacts with actual info
        const validContacts = update.contacts.filter(c => c.name || c.email || c.linkedin);
        if (validContacts.length > 0) {
          updateData.contacts = validContacts;
          // Also set primary contact name if available
          const primaryContact = validContacts.find(c => c.name);
          if (primaryContact) {
            updateData.contactName = primaryContact.name;
            updateData.contactRole = primaryContact.role;
            if (primaryContact.linkedin) {
              updateData.linkedIn = primaryContact.linkedin;
            }
          }
        }
      }
      
      if (update.notes) {
        const existingNotes = foundDoc.data().notes || '';
        updateData.notes = existingNotes ? `${existingNotes}\n\n${update.notes}` : update.notes;
      }
      
      updateData.updatedAt = admin.firestore.FieldValue.serverTimestamp();
      updateData.contactEnriched = true;
      
      await foundDoc.ref.update(updateData);
      console.log(`  UPDATED: ${update.leadName} -> ${update.generalEmail || 'contacts only'}`);
      updated++;
      
    } catch (err: any) {
      console.error(`  ERROR: ${update.leadName} - ${err.message}`);
      errors++;
    }
  }
  
  console.log(`\nImport complete:`);
  console.log(`  Updated: ${updated}`);
  console.log(`  Not found: ${notFound}`);
  console.log(`  Errors: ${errors}`);
  
  process.exit(0);
}

importContacts().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
