/**
 * Query GAME STUDIOS missing contact emails - extended search
 * Run with: npx ts-node src/query-missing-contacts.ts
 */

import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    projectId: "loreweaver-crm",
  });
}

const db = admin.firestore();

async function queryMissingContacts() {
  console.log("Querying game studios missing contact emails (extended)...\n");

  const leadsRef = db.collection("leads");
  const snapshot = await leadsRef.get();
  
  const studiosNeedingContacts: Array<{
    id: string;
    name: string;
    fitScore: number;
    website: string;
    country: string;
  }> = [];

  // Keywords that indicate a game studio name
  const studioKeywords = [
    'games', 'gaming', 'studio', 'studios', 'interactive', 'entertainment',
    'digital', 'software', 'productions', 'works', 'labs', 'team'
  ];
  
  // Keywords that indicate VC/non-studio entries - more comprehensive
  const excludeKeywords = [
    'venture', 'capital', 'fund', 'invest', 'partner', 'vc', 'angel',
    'accelerator', 'incubator', 'seed', 'check', 'holdings', 'zrt',
    'discord', 'community', 'reddit', 'forum', 'youtube', 'twitch',
    'awards', 'festival', 'expo', 'conference', 'event', 'jam',
    'association', 'alliance', 'network', 'guild', 'institute',
    'university', 'college', 'school', 'center', 'media group',
    'holding', 'wayra', 'catalyst', 'collective', 'egx', 'indiedb',
    'taptap', 'g-star', 'ggj', 'bafta', 'usc games', 'comiket',
    'mandalore', 'pilabs', 'pi labs', 'humble games'
  ];

  snapshot.forEach((doc) => {
    const data = doc.data();
    const nameLower = (data.name || "").toLowerCase();
    const websiteLower = (data.website || "").toLowerCase();
    
    // Skip if already has contact email
    if (data.contact?.email) return;
    
    // Skip if already researched
    if (data.contactResearched === true) return;
    
    // Skip competitors pipeline
    if (data.pipeline?.pipelineId === "MUCFmGdpqPYAT0tKSAWs") return;
    
    // Skip if no website
    const website = data.website || "";
    if (!website) return;
    
    // Skip social media as primary website
    if (websiteLower.includes("discord.") || websiteLower.includes("reddit.com") || 
        websiteLower.includes("linkedin.com") || websiteLower.includes("twitter.com") ||
        websiteLower.includes("facebook.com") || websiteLower.includes("instagram.com") ||
        websiteLower.includes("youtube.com")) return;
    
    // Skip excluded entries
    if (excludeKeywords.some(kw => nameLower.includes(kw))) return;
    
    // Skip entries named "Unknown"
    if (nameLower === "unknown" || nameLower.trim() === "") return;
    
    // Check if name looks like a game studio
    const isStudioName = studioKeywords.some(kw => nameLower.includes(kw));
    
    // Prioritize entries:
    const hasGames = data.notableGames && data.notableGames.length > 0;
    const hasNarrativeFocus = data.narrativeFocus && data.narrativeFocus.length > 0;
    const fitScore = data.fitScore || 0;
    
    let priorityScore = fitScore;
    if (hasGames) priorityScore += 100;
    if (hasNarrativeFocus) priorityScore += 50;
    if (isStudioName) priorityScore += 30;
    
    studiosNeedingContacts.push({
      id: doc.id,
      name: data.name || "Unknown",
      fitScore: priorityScore,
      website: website,
      country: data.country || "",
    });
  });

  // Sort by priority score (highest first)
  studiosNeedingContacts.sort((a, b) => b.fitScore - a.fitScore);

  // Take 21-50 (skipping first 20 which we already checked)
  const batch = studiosNeedingContacts.slice(20, 50);

  console.log(`Total filtered entries: ${studiosNeedingContacts.length}`);
  console.log(`\nEntries 21-50:\n`);
  
  batch.forEach((studio, i) => {
    console.log(`${i + 21}. ${studio.name}`);
    console.log(`   Website: ${studio.website}`);
    console.log(`   Country: ${studio.country}`);
    console.log("");
  });

  // Output as JSON
  console.log("\n--- JSON OUTPUT ---");
  console.log(JSON.stringify(batch, null, 2));
}

queryMissingContacts().catch(console.error);
