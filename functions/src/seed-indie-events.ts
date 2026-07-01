/**
 * Seed script for indie showcase events (Apr-Sep 2026)
 * Run with: npx ts-node src/seed-indie-events.ts
 */

import * as admin from 'firebase-admin';

// Initialize Firebase Admin
const serviceAccount = require('../../service-account.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

interface EventData {
  name: string;
  type: 'conference' | 'showcase' | 'awards' | 'meetup' | 'game-jam' | 'other';
  description: string;
  startDate: string;
  endDate?: string;
  applicationDeadline?: string;
  location: string;
  isOnline: boolean;
  venue?: string;
  website: string;
  applicationUrl?: string;
  cost?: string;
  travelRequired: boolean;
  status: 'tracking' | 'considering' | 'applied' | 'accepted' | 'attending' | 'declined' | 'passed' | 'completed';
  priority: 'high' | 'medium' | 'low';
  relevantFor: ('architect' | 'director' | 'both')[];
  expectedAudience?: string;
  notes: string;
  tags: string[];
}

const events: EventData[] = [
  {
    name: 'INDIGO 2026',
    type: 'showcase',
    description: 'Premier B2B games event for Benelux. DISCOVER Showcase, Pitch Perfect competition, MeetToMatch business meetings.',
    startDate: '2026-06-02',
    endDate: '2026-06-03',
    applicationDeadline: '2026-03-31',
    location: 'Rotterdam, Netherlands',
    isOnline: false,
    venue: 'World Trade Center Rotterdam',
    website: 'https://indigoshowcase.nl',
    applicationUrl: 'https://www.eventbrite.nl/e/tickets-indigo-2026-1981408192241',
    cost: '€132-198',
    travelRequired: false,
    status: 'considering',
    priority: 'high',
    relevantFor: ['architect', 'both'],
    expectedAudience: '1000+ game industry professionals',
    notes: '⚠️ EARLY BIRD ENDS TODAY (March 31). Local event — minimal travel. Perfect for showcasing Architect to Benelux indie devs.',
    tags: ['indie', 'showcase', 'networking', 'B2B', 'benelux', 'local'],
  },
  {
    name: 'A MAZE. / Berlin 2026',
    type: 'showcase',
    description: '15th anniversary edition. International festival for indie/arthouse games and playful media. Talks, workshops, panels, game exhibitions.',
    startDate: '2026-05-13',
    endDate: '2026-05-16',
    location: 'Berlin, Germany',
    isOnline: false,
    venue: 'Silent Green Kulturquartier & Panke Club',
    website: 'https://amaze-berlin.de',
    applicationUrl: 'https://eventix.shop/zdtz5jxn',
    cost: 'TBD (early bird available)',
    travelRequired: true,
    status: 'tracking',
    priority: 'high',
    relevantFor: ['architect', 'both'],
    expectedAudience: 'Indie devs, worldbuilders, storytellers, playful media creators',
    notes: 'Strong indie/arthouse focus — perfect for narrative tools positioning. 15th anniversary = major milestone event.',
    tags: ['indie', 'arthouse', 'narrative', 'creative', 'festival'],
  },
  {
    name: 'Nordic Game 2026',
    type: 'conference',
    description: 'Europe\'s leading games conference. 100+ indie games in Showcase Hall. Publishers & Investors Day, pitch competition, People\'s Choice Awards.',
    startDate: '2026-05-26',
    endDate: '2026-05-29',
    location: 'Malmö, Sweden',
    isOnline: false,
    venue: 'Slagthuset',
    website: 'https://nordicgame.com',
    cost: '€499-549 (Content/Business pass)',
    travelRequired: true,
    status: 'tracking',
    priority: 'medium',
    relevantFor: ['architect', 'both'],
    expectedAudience: '3000+ attendees, Nordic game industry professionals',
    notes: 'Demo Table upgrade only €199 — great value! Strong Nordic presence, good for regional expansion.',
    tags: ['conference', 'nordic', 'showcase', 'B2B', 'pitch'],
  },
  {
    name: 'gamescom 2026 Indie Area',
    type: 'showcase',
    description: 'World\'s largest gaming event. Dedicated Indie Area and Indie Arena Booth. Massive press/publisher exposure.',
    startDate: '2026-08-26',
    endDate: '2026-08-30',
    applicationDeadline: '2026-05-07',
    location: 'Cologne, Germany',
    isOnline: false,
    venue: 'Koelnmesse',
    website: 'https://www.gamescom.global',
    applicationUrl: 'https://www.gamescom.global/en/info/exhibitors/exhibit/be-part-of-gamescom-indie-area',
    cost: 'Booth cost varies',
    travelRequired: true,
    status: 'tracking',
    priority: 'high',
    relevantFor: ['architect', 'both'],
    expectedAudience: '300,000+ visitors, global press, publishers',
    notes: 'Multiple indie options: gamescom Indie Area (deadline May 7), gamescom dev Indies (deadline Apr 10), Indie Arena Booth (applications open).',
    tags: ['indie', 'showcase', 'press', 'global', 'major-event'],
  },
  {
    name: 'Develop:Brighton 2026',
    type: 'conference',
    description: 'UK\'s biggest game developer conference. Indie Showcase competition, Indie BootCamp track, 10+ conference tracks.',
    startDate: '2026-07-14',
    endDate: '2026-07-16',
    applicationDeadline: '2026-04-15',
    location: 'Brighton, UK',
    isOnline: false,
    venue: 'DoubleTree by Hilton Brighton Metropole',
    website: 'https://www.developconference.com',
    applicationUrl: 'https://www.developconference.com/whats-on/indie-showcase',
    cost: '~€400',
    travelRequired: true,
    status: 'tracking',
    priority: 'medium',
    relevantFor: ['architect', 'both'],
    expectedAudience: 'European game devs, from micro indies to global studios',
    notes: 'Indie Showcase submissions open early April 2026. Consider submitting Architect for showcase.',
    tags: ['conference', 'indie', 'UK', 'showcase'],
  },
  {
    name: 'gamescom dev Indies Showcase',
    type: 'showcase',
    description: 'Developer track at gamescom. Dedicated indie showcase within the developer conference.',
    startDate: '2026-08-26',
    endDate: '2026-08-28',
    applicationDeadline: '2026-04-10',
    location: 'Cologne, Germany',
    isOnline: false,
    venue: 'Koelnmesse - Dev Area',
    website: 'https://dev.gamescom.global/conference/indies/',
    cost: 'Part of gamescom dev pass',
    travelRequired: true,
    status: 'tracking',
    priority: 'high',
    relevantFor: ['architect', 'both'],
    expectedAudience: 'Game developers, publishers, press',
    notes: '⚠️ DEADLINE: April 10, 2026. Selection announced April 23.',
    tags: ['indie', 'developer', 'showcase', 'deadline-soon'],
  },
  {
    name: 'London Games Festival 2026',
    type: 'showcase',
    description: 'Week-long festival celebrating games. Multiple indie events and showcases throughout London.',
    startDate: '2026-04-13',
    endDate: '2026-04-19',
    location: 'London, UK',
    isOnline: false,
    website: 'https://games.london',
    cost: 'Varies by event',
    travelRequired: true,
    status: 'tracking',
    priority: 'low',
    relevantFor: ['architect'],
    expectedAudience: 'UK game industry, public',
    notes: 'Worth monitoring for specific showcase opportunities. One week event.',
    tags: ['festival', 'UK', 'indie'],
  },
  {
    name: 'Indie Game Fest Cologne',
    type: 'showcase',
    description: 'One-day indie-focused event in Cologne.',
    startDate: '2026-05-09',
    location: 'Cologne, Germany',
    isOnline: false,
    website: 'https://www.gamesmarket.global',
    cost: 'TBD',
    travelRequired: true,
    status: 'tracking',
    priority: 'medium',
    relevantFor: ['architect'],
    expectedAudience: 'Indie developers, local scene',
    notes: 'One-day event. Close to Amsterdam (~2.5h train). Good local networking.',
    tags: ['indie', 'local', 'networking'],
  },
];

async function seedEvents() {
  console.log('🎮 Seeding indie showcase events...\n');
  
  const eventsCollection = db.collection('events');
  
  for (const event of events) {
    // Check if event already exists
    const existing = await eventsCollection
      .where('name', '==', event.name)
      .where('startDate', '==', event.startDate)
      .get();
    
    if (!existing.empty) {
      console.log(`⏭️  Skipping "${event.name}" (already exists)`);
      continue;
    }
    
    const docData = {
      ...event,
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now(),
      createdBy: 'seed-script',
    };
    
    const docRef = await eventsCollection.add(docData);
    console.log(`✅ Added: ${event.name} (${docRef.id})`);
  }
  
  console.log('\n🎉 Done! Added events to LoreWeaver CRM.');
  console.log('\nKey deadlines to watch:');
  console.log('  • TODAY: INDIGO early bird ends');
  console.log('  • Apr 10: gamescom dev Indies deadline');
  console.log('  • May 7: gamescom Indie Area deadline');
}

seedEvents()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error seeding events:', error);
    process.exit(1);
  });
