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

async function getStudiosWithoutEmail() {
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
    
    // Skip if already has email
    if (email) return;
    
    // Skip if no website
    if (!website) return;
    
    // Skip social/community URLs
    const lowerWebsite = website.toLowerCase();
    if (skipDomains.some((d: string) => lowerWebsite.includes(d))) return;
    
    studiosWithoutEmail.push({
      id: doc.id,
      name: data.name,
      website: data.website,
      fitScore: data.fitScore || 0,
      country: data.country,
      linkedin: data.contact?.linkedin || null,
      tags: data.tags || []
    });
  });
  
  // Sort by fit score descending, take top 25
  studiosWithoutEmail.sort((a: any, b: any) => b.fitScore - a.fitScore);
  const top25 = studiosWithoutEmail.slice(0, 25);
  
  console.log(JSON.stringify(top25, null, 2));
  console.log(`\nTotal studios without email: ${studiosWithoutEmail.length}`);
  console.log(`Returning top 25 by fit score`);
}

getStudiosWithoutEmail().then(() => process.exit(0)).catch((err: any) => {
  console.error(err);
  process.exit(1);
});
