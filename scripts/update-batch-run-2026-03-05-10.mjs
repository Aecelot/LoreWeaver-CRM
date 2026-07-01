// Batch research update - 2026-03-05 run 10 (3:07 AM)
import admin from 'firebase-admin';
import { readFileSync } from 'fs';

// Firebase Admin init
const sa = JSON.parse(readFileSync('./service-account.json', 'utf8'));
if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(sa) });
}
const db = admin.firestore();

const updates = [
  {
    id: "KRNxZ5nLviYVoWwVIdW1",
    name: "IMAX Games",
    note: `**Research (2026-03-05)**
- Full name: iMAX Games (Brazil-based indie studio, NOT IMAX Corporation theater company)
- Email: info@imaxgames.com.br
- LinkedIn: linkedin.com/company/imax-games (430+ followers)
- Focus: Games for education, serious training, marketing, social portals, mobile
- Location: Brazil
- Crunchbase profile available
- Note: Brazilian game dev company specializing in various game domains`,
    status: "cold"
  },
  {
    id: "KSMuKjlgeF9n74zF2jkg",
    name: "Simogo",
    note: `**Research (2026-03-05)**
- Email: info@simogo.com (privacy: privacy@simogo.com)
- Location: Malmö, Sweden
- Founders: Simon Flesser (art/design/words), Magnus "Gordon" Gardebäck (code/admin)
- Founded: 2010
- Notable games: Device 6, Sayonara Wild Hearts, Year Walk (highly narrative-driven!)
- Narrative collaborator: Jonas Tarestad
- Note: "notoriously bad at responding to email" per their website
- Just released Simogo Legacy Collection (Dec 2025) on Nintendo Switch
- Wikipedia entry exists
- Very small team (2 people core)
- HIGH ICP FIT: Known for innovative narrative games, exactly the type of studio that could benefit from Director for branching narratives`,
    status: "warm"
  },
  {
    id: "LCg0sZ7Hmt4awPrTBIqH",
    name: "Subset Games",
    note: `**Research (2026-03-05)**
- Email: contact@subsetgames.com
- Website: subsetgames.com
- Notable games: FTL: Faster Than Light, Into the Breach
- Focus: Indie strategy games with emergent narrative
- GDC talk: 'Into the Breach' Design Postmortem available
- Currently focused on Linux port and support (no active new projects announced)
- Very small team
- Crunchbase profile available
- Note: Their games have procedurally generated scenarios - could be interesting for Director's emergent narrative approach`,
    status: "cold"
  },
  {
    id: "LCthdLcQ1m7hKWQRHifP",
    name: "Celestial Games",
    note: `**Research (2026-03-05)**
- Email: info@celestial-games.com
- Phone: +27 (0)11 431 2468
- Website: celestial-games.com
- Location: Johannesburg, South Africa
- Founded: 1994 (one of the first African game dev studios)
- Notable games: Toxic Bunny HD, Montez, Battle Arena Drones, The Tainted
- LinkedIn: 510+ followers
- Historical significance: Pioneer of African game development
- Note: Smaller studio, may be interested in AI narrative tools for new projects`,
    status: "cold"
  },
  {
    id: "LU6ehZh4agqjpJqCn9Vh",
    name: "TiMi Studio Group (Tencent)",
    note: `**Research (2026-03-05)**
- Parent: Tencent Games (subsidiary)
- Website: timistudios.com
- No public narrative submission email - too large/corporate
- PR/Media via Level Infinite: press.levelinfinite.com/TiMi-Studio-Group
- LinkedIn: 11.2K+ followers
- Global offices: Shenzhen (HQ), Singapore, Los Angeles, Seattle
- Montreal office closed early 2026
- Notable: Global leader in video game development, Call of Duty Mobile, Honor of Kings
- Contact individual: Nicolas Novali (****@timistudios.com - paywalled via ZoomInfo)
- NOT A FIT: Too large/corporate for LoreWeaver's current stage. Would need enterprise sales approach, different ICP tier.`,
    status: "cold"
  }
];

async function updateLeads() {
  for (const lead of updates) {
    try {
      // Update lead status
      await db.collection('leads').doc(lead.id).update({
        status: 'researched',
        'pipeline.stageId': 'researched',
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      // Add research note
      await db.collection('notes').add({
        leadId: lead.id,
        content: lead.note,
        status: lead.status,
        createdBy: 'skel-batch-research',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      console.log(`✓ Updated ${lead.name}`);
    } catch (error) {
      console.error(`✗ Error updating ${lead.name}:`, error.message);
    }
  }
  console.log('\nDone!');
  process.exit(0);
}

updateLeads();
