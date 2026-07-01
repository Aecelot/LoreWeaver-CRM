import * as admin from 'firebase-admin';
import * as fs from 'fs';

// Initialize Firebase Admin
const serviceAccount = JSON.parse(
  fs.readFileSync('C:\\Users\\rijkg\\OneDrive\\Documenten\\GitHub\\LoreWeaver-CRM\\service-account.json', 'utf8')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Studio pipeline ID (from CRM)
const STUDIO_PIPELINE = 'GgsAYpDcelzHMNoRtamS';

// IDs we've already processed
const processedIds = [
  '2Jn2UdZY6i868txUNIuw', // sunset visitor
  'CDAElwycF00Vt1VNkELf', // Squeaky Wheel
  '7H78xJt4VOSrIiSSUEfR', // Rockhead
  'BRw3bYa6fVic78aWvyXj', // Nour
  'DY1jzA5uvr8xd2vbOlIG', // Night School
  'DsMIxEabnaQSDg04soBb', // RealityArts
  '62G0mfan41oQXhWSm3ZL', // Naughty Dog
  'CO1vi6g2SpT831yVBt8I', // Dragon Game Studio
  '5toEcPMkYnvt00HVHx1S', // Ninja Theory
  '0IE7vOyc3TkWrxwMPALy', // Acquire
  'AxgsTmYj2Tu8sMSZO0TP', // Piranha Bytes
  'ChjipSpRHrkgPJ8rydHF', // Double Fine
  '9jpe3w9iqIX2bab4xwn8', // Bethesda
  '5MUt9JXOr2W1z8Yi3afE', // Santa Monica
  '9MCJDILQ5cWW8QOfOMnu', // Respawn
  'EJHsS9HdwAHw2WdUPhR9', // Redlynx
  '8jd7VoC6NIxti4FufiK6', // Thunderful
  '39W8lDjxBjOHtyPWo77b', // Vanillaware
  'BvosN6QLMqiHJB2F3NO5', // CreSpirit
  '1Cd1PglGOyze0s10ILE3', // Innocent Grey
  'BKGxHPxfMG65jRRzhnEr', // Umbu
  '2LvQvD74n9BKQeWwZNJm', // Experience Inc
  '9yX7qPsUlEAfbnHm9mZ5', // Manga Productions
  '9ye5JXODjorkwBWRthyM', // Neowiz
  'BHcncBPLFIcDJ6QVwvCI', // Full Control
];

async function getMoreStudios() {
  const leadsRef = db.collection('leads');
  const snapshot = await leadsRef.get();
  
  const studiosWithoutEmail: any[] = [];
  
  // Skip domains that aren't useful for contact research
  const skipDomains = [
    'discord.gg', 'discord.com', 'reddit.com', 'twitter.com', 'x.com',
    'facebook.com', 'linkedin.com', 'youtube.com', 'twitch.tv',
    'itch.io', 'steam', 'gamejolt', 'indiedb', 'wikipedia', 'N/A'
  ];
  
  snapshot.forEach((doc: any) => {
    const data = doc.data();
    const email = data.contact?.email;
    const website = data.website;
    const pipelineId = data.pipeline?.pipelineId;
    
    // Only studios pipeline
    if (pipelineId !== STUDIO_PIPELINE) return;
    
    // Skip if already has email or already processed
    if (email) return;
    if (processedIds.includes(doc.id)) return;
    
    // Skip if no website
    if (!website) return;
    
    // Skip social/community URLs
    const lowerWebsite = website.toLowerCase();
    if (skipDomains.some((d: string) => lowerWebsite.includes(d))) return;
    
    // Prioritize indie/AA studios with narrative tags
    const tags = data.tags || [];
    const narrativeScore = tags.filter((t: string) => 
      ['narrative', 'narrative-heavy', 'director-target', 'branching', 'visual-novel', 'indie', 'aa'].includes(t)
    ).length;
    
    studiosWithoutEmail.push({
      id: doc.id,
      name: data.name,
      website: data.website,
      fitScore: data.fitScore || 0,
      narrativeScore,
      country: data.country,
      tags: data.tags || []
    });
  });
  
  // Sort by narrative relevance, then fit score
  studiosWithoutEmail.sort((a: any, b: any) => {
    if (b.narrativeScore !== a.narrativeScore) return b.narrativeScore - a.narrativeScore;
    return b.fitScore - a.fitScore;
  });
  
  const next25 = studiosWithoutEmail.slice(0, 25);
  
  console.log(JSON.stringify(next25, null, 2));
  console.log(`\nRemaining studios without email: ${studiosWithoutEmail.length}`);
}

getMoreStudios().then(() => process.exit(0)).catch((err: any) => {
  console.error(err);
  process.exit(1);
});
