/**
 * Seed script for creative industries events (Apr-Sep 2026)
 * Run with: npx ts-node src/seed-creative-events.ts
 * 
 * Focus: Dutch creative industries events relevant to LoreWeaver
 * - Design/tech crossover
 * - Animation industry
 * - Creative coding
 * - Game-adjacent creative professionals
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
  type: 'conference' | 'showcase' | 'awards' | 'meetup' | 'festival' | 'exhibition' | 'other';
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
  // HIGH PRIORITY
  {
    name: 'The Art Department Eindhoven 2026',
    type: 'festival',
    description: 'Festival dedicated to design and craftsmanship in film, animation and games. Features talks, masterclasses, workshops with industry professionals.',
    startDate: '2026-04-15',
    endDate: '2026-04-17',
    location: 'Eindhoven, Netherlands',
    isOnline: false,
    website: 'https://weareplaygrounds.nl/event/the-art-department-eindhoven-2026/',
    cost: 'TBD (check website)',
    travelRequired: false,
    status: 'tracking',
    priority: 'high',
    relevantFor: ['architect', 'both'],
    expectedAudience: '1500+ art directors, concept artists, game/film/animation professionals',
    notes: 'Premier Benelux event for game/film/animation art. Direct access to narrative-adjacent creative professionals. Environment design, character design workshops. Good for Architect awareness.',
    tags: ['creative', 'games', 'animation', 'film', 'design', 'benelux', 'local'],
  },
  {
    name: 'Playgrounds In-Depth Day 2026',
    type: 'conference',
    description: 'Extra festival day filled with in-depth artist talks and masterclasses. Part of The Art Department week.',
    startDate: '2026-04-15',
    location: 'Eindhoven, Netherlands',
    isOnline: false,
    website: 'https://weareplaygrounds.nl/event/the-art-department-2026-in-depth-day/',
    cost: 'Separate ticket required',
    travelRequired: false,
    status: 'tracking',
    priority: 'medium',
    relevantFor: ['architect'],
    expectedAudience: 'Creative professionals seeking deep technical knowledge',
    notes: 'Masterclasses include Nathan Fowkes (Environment Design - SOLD OUT) and Erik Hillenbrink (Creature Design & Sculpting). Premium content for serious creatives.',
    tags: ['masterclass', 'workshop', 'creative', 'design'],
  },
  {
    name: 'Playgrounds International Film Festival 2026',
    type: 'festival',
    description: 'Film festival focused on the art of filmmaking. Runs concurrently with The Art Department.',
    startDate: '2026-04-15',
    endDate: '2026-04-19',
    location: 'Eindhoven, Netherlands',
    isOnline: false,
    website: 'https://weareplaygrounds.nl/event/playgrounds-international-film-festival-2026/',
    cost: 'TBD',
    travelRequired: false,
    status: 'tracking',
    priority: 'medium',
    relevantFor: ['architect'],
    expectedAudience: 'Film industry professionals, animators, storytellers',
    notes: 'Includes Film & Talent Industry Day (Apr 17) for professional networking.',
    tags: ['film', 'festival', 'storytelling', 'creative'],
  },
  {
    name: 'FIBER Festival 2026',
    type: 'festival',
    description: 'Amsterdam-based festival for audiovisual art, digital culture, daring conversations and experimental music. Theme: "Fragile Forces".',
    startDate: '2026-05-28',
    endDate: '2026-05-31',
    location: 'Amsterdam, Netherlands',
    isOnline: false,
    venue: 'Various venues in Amsterdam',
    website: 'https://2026.fiberfestival.nl/',
    cost: '~€30-80 (reduced tickets available)',
    travelRequired: false,
    status: 'considering',
    priority: 'high',
    relevantFor: ['architect', 'both'],
    expectedAudience: '3000+ digital artists, audiovisual performers, creative technologists',
    notes: '11th edition. Theme "Fragile Forces" explores alternative relationships with technology. A/V performances, installation art, in-depth artist talks. Good for positioning LoreWeaver in creative AI conversation.',
    tags: ['digital-art', 'audiovisual', 'creative-tech', 'amsterdam', 'local', 'festival'],
  },

  // MEETUPS & RECURRING
  {
    name: 'Vibe-Coding Meetup Amsterdam',
    type: 'meetup',
    description: 'AI-powered builders community. Monthly meetups, hands-on AI prototyping workshops, buildathons. Tools: Lovable, Cursor, Claude, Miro.',
    startDate: '2026-04-01', // Recurring
    location: 'Amsterdam, Netherlands',
    isOnline: false,
    venue: 'Various (Volkshotel, Social Hub, etc.)',
    website: 'https://luma.com/craftingproduct',
    cost: 'Free (meetups), €85-190 (workshops)',
    travelRequired: false,
    status: 'considering',
    priority: 'high',
    relevantFor: ['architect', 'both'],
    expectedAudience: '100+ founders, designers, product people, AI-curious builders',
    notes: 'Extremely relevant for Architect positioning. AI-first builders who might adopt narrative AI tools. Could pitch LoreWeaver at Show & Tell. Organizer: Dima Abramov.',
    tags: ['meetup', 'ai', 'builders', 'startup', 'amsterdam', 'recurring'],
  },
  {
    name: 'Creative Coding Amsterdam',
    type: 'meetup',
    description: 'Community for anyone fascinated by the creative side of programming. Informal events to connect, share work, and collaborate.',
    startDate: '2026-04-01', // Recurring
    location: 'Amsterdam, Netherlands',
    isOnline: false,
    website: 'https://www.meetup.com/creative-coding-amsterdam/',
    applicationUrl: 'https://discord.gg/eJJvn3487M',
    cost: 'Free',
    travelRequired: false,
    status: 'tracking',
    priority: 'medium',
    relevantFor: ['architect'],
    expectedAudience: '200+ generative artists, Processing/p5.js enthusiasts, creative coders',
    notes: 'Active Discord community. Mix of professionals and hobbyists. Good for demoing AI+creativity tools to technical creatives who understand code.',
    tags: ['meetup', 'creative-coding', 'processing', 'generative-art', 'community'],
  },
  {
    name: 'Creative Mornings Amsterdam: PUNK',
    type: 'meetup',
    description: '12th anniversary "Audience Takes the Stage" edition. Theme: PUNK - challenging status quo, speaking truth, making noise. 3 community speakers.',
    startDate: '2026-06-20',
    location: 'Amsterdam, Netherlands',
    isOnline: false,
    venue: 'OBA or rotating venue',
    website: 'https://creativemornings.com/cities/ams',
    applicationDeadline: '2026-06-08',
    cost: 'Free',
    travelRequired: false,
    status: 'considering',
    priority: 'medium',
    relevantFor: ['architect', 'both'],
    expectedAudience: '200+ designers, creatives, marketers, founders',
    notes: 'Free monthly breakfast lectures. Call for speakers open until June 8 — could pitch AI+creativity angle for "PUNK" theme (disrupting narrative design). Long-running community.',
    tags: ['meetup', 'creative', 'networking', 'free', 'speaker-opportunity'],
  },

  // DESIGN/TECH CROSSOVER
  {
    name: 'Nieuwe Instituut Events',
    type: 'other',
    description: 'Dutch national institute for architecture, design, and digital culture. Regular events including Thursday Night Detours, Research Nights, International Clinics.',
    startDate: '2026-04-01', // Ongoing
    location: 'Rotterdam, Netherlands',
    isOnline: false,
    venue: 'Nieuwe Instituut, Rotterdam',
    website: 'https://nieuweinstituut.nl/en/events',
    cost: 'Many events free, museum entry ~€16',
    travelRequired: false,
    status: 'tracking',
    priority: 'low',
    relevantFor: ['architect'],
    expectedAudience: 'Architects, designers, digital culture practitioners',
    notes: 'Apr 9: -1 Digital Lab "Desire & Technology" reading group on technological futures. Academic connections, research partnerships potential.',
    tags: ['design', 'architecture', 'digital-culture', 'research', 'rotterdam'],
  },

  // FALL SEASON (Outside Apr-Sep but worth tracking)
  {
    name: 'Playgrounds Illustrada 2026',
    type: 'exhibition',
    description: 'Outdoor illustration exhibition in Tilburg city center.',
    startDate: '2026-09-05',
    endDate: '2026-09-13',
    location: 'Tilburg, Netherlands',
    isOnline: false,
    website: 'https://weareplaygrounds.nl/event/illustrada-2026/',
    cost: 'Free',
    travelRequired: false,
    status: 'tracking',
    priority: 'low',
    relevantFor: ['architect'],
    expectedAudience: 'General public + illustration community',
    notes: 'Free outdoor exhibition. Lower priority but good for casual creative community engagement.',
    tags: ['exhibition', 'illustration', 'free', 'outdoor'],
  },
  {
    name: 'Dutch Design Week 2026',
    type: 'festival',
    description: 'Northern Europe\'s largest design event. Platform for quality design - design of the future and future of design.',
    startDate: '2026-10-17',
    endDate: '2026-10-25',
    location: 'Eindhoven, Netherlands',
    isOnline: false,
    website: 'https://ddw.nl/en/',
    cost: 'TBD',
    travelRequired: false,
    status: 'tracking',
    priority: 'medium',
    relevantFor: ['architect', 'both'],
    expectedAudience: '300,000+ visitors, designers, creatives, industry professionals',
    notes: 'Outside Apr-Sep window but major event. Consider exhibition/project submission. Design innovation showcase potential for narrative AI tools.',
    tags: ['design', 'festival', 'eindhoven', 'major-event', 'fall'],
  },
  {
    name: 'Dutch Game Week 2026',
    type: 'festival',
    description: 'A full week dedicated to the world of play. Organized by Playgrounds.',
    startDate: '2026-11-14',
    endDate: '2026-11-22',
    location: 'Netherlands',
    isOnline: false,
    website: 'https://weareplaygrounds.nl/event/dutch-game-week-2026/',
    cost: 'TBD',
    travelRequired: false,
    status: 'tracking',
    priority: 'high',
    relevantFor: ['architect', 'director', 'both'],
    expectedAudience: 'Game developers, players, industry professionals',
    notes: 'Outside Apr-Sep window but highly relevant. Full week of game-focused events. Plan early for participation.',
    tags: ['games', 'festival', 'national', 'major-event', 'fall'],
  },
];

async function seedEvents() {
  console.log('🎨 Seeding creative industries events...');
  
  const batch = db.batch();
  const eventsRef = db.collection('events');
  
  for (const event of events) {
    const docRef = eventsRef.doc();
    batch.set(docRef, {
      ...event,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      source: 'creative-industries-research-2026-03-31',
    });
    console.log(`  ✅ ${event.name}`);
  }
  
  await batch.commit();
  console.log(`\n✨ Successfully seeded ${events.length} creative industries events!`);
}

seedEvents()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Error seeding events:', error);
    process.exit(1);
  });
