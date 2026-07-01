import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccountPath = path.resolve(__dirname, '../../service-account.json');
const serviceAccount = require(serviceAccountPath);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

// Southeast Asia Studios - Thailand, Malaysia, Singapore, Hong Kong
const studios = [
  // ==================== THAILAND ====================
  { name: 'Yggdrazil Group', games: ['Home Sweet Home', 'Home Sweet Home EP2', 'Home Sweet Home Survive'], focus: 'Thai Horror', fitScore: 95, website: 'https://ygg-cg.com/', location: 'Thailand', country: 'Thailand', notes: 'Founded 2006 by Tanat Juwiwat & Saroot Tubloy. VFX background. Hollywood film adaptation. Thai folklore horror.' },
  { name: 'Urnique Studio', games: ['Timelie'], focus: 'Puzzle Adventure', fitScore: 92, website: 'https://www.urniquestudio.com/', location: 'Bangkok', country: 'Thailand', notes: 'Award-winning. Started as student project. Won Microsoft Imagine Cup. College friends team.' },
  { name: 'FairPlay Studios', games: ['The Land Beneath Us', 'Fallen Knight', 'Nightmare Circus'], focus: 'Roguelite/Action', fitScore: 90, website: 'https://fairplaystudios.net/', location: 'Bangkok', country: 'Thailand', notes: 'TGS 2023 Selected Indie 80. Won SEA Game Awards Best Game Design. BIDC 2024 multiple awards.' },
  { name: 'Vermillion Digital', games: ['M.A.S.S. Builder', 'Seed of Heroes'], focus: 'Mecha Action RPG', fitScore: 85, website: 'https://v-dgt.com/', location: 'Bangkok', country: 'Thailand', notes: 'Founded by 7 friends. 6 devs living together. Published by Sekai Project.' },
  { name: 'Peakware Studio', games: ['Exsys'], focus: 'Indie', fitScore: 70, website: 'https://peakwarestudio.com/', location: 'Bangkok', country: 'Thailand', notes: 'Small passionate team.' },
  { name: 'In Game Studios', games: ['RPG/Strategy games'], focus: 'Mobile/Console', fitScore: 65, website: '', location: 'Thailand', country: 'Thailand', notes: 'RPG and strategy focus.' },
  { name: 'Asphere Innovations', games: ['Publisher - SEA distribution'], focus: 'Publisher', fitScore: 60, website: '', location: 'Thailand', country: 'Thailand', notes: 'Formerly Asiasoft. SEA game publisher since 2001.' },

  // ==================== MALAYSIA ====================
  { name: 'Metronomik', games: ['No Straight Roads', 'No Straight Roads 2'], focus: 'Rhythm Action Adventure', fitScore: 98, website: 'https://www.metronomik.net/', location: 'Kuala Lumpur', country: 'Malaysia', notes: 'Founded Dec 2017 by Wan Hazmer (FFXV Lead Designer) + Daim Dziauddin (SFV Concept Artist). Epic MegaGrants. NSR2 published by Shueisha Games (2026).' },
  { name: 'Persona Theory Games', games: ['Fires At Midnight', 'Kabaret', 'Sara is Missing', 'The Lonely Hearts Petshop'], focus: 'Narrative Visual Novel', fitScore: 98, website: 'https://personatheory.com/', location: 'Kuala Lumpur', country: 'Malaysia', notes: 'Founded 2017. "Indie narrative games studio". SEA stories. Won SEA Independent Games Awards. TV/Cinema background. Published with WINGS, ID@Xbox.' },
  { name: 'Magnus Games Studio', games: ['Re:Legend', 'Project Survival'], focus: 'Co-op RPG', fitScore: 88, website: 'https://www.magnusgamesstudio.com/', location: 'Kuala Lumpur', country: 'Malaysia', notes: 'Re:Legend = most funded SEA Kickstarter game ever. Founded 2017 by two brothers.' },
  { name: 'Passion Republic', games: ['Various'], focus: 'Game Dev Services', fitScore: 70, website: '', location: 'Kuala Lumpur', country: 'Malaysia', notes: 'Since 2009. AAA support studio.' },
  { name: 'Why Knot Studio', games: ['Various'], focus: 'Game Development', fitScore: 65, website: 'https://whyknot.games/', location: 'Malaysia', country: 'Malaysia', notes: 'Founded 2016.' },
  { name: '1+1 Studios', games: ['Co-op games'], focus: 'Co-op Games', fitScore: 70, website: 'https://1plus1gamestudios.com/', location: 'Kuala Lumpur', country: 'Malaysia', notes: 'Bringing people together through games.' },
  { name: 'Spacepup Entertainment', games: ['Puzzle narrative games'], focus: 'Puzzle/Narrative', fitScore: 80, website: '', location: 'Malaysia', country: 'Malaysia', notes: 'Core team of 5. Story discovery + puzzles with narrative twist.' },
  { name: 'Appxplore', games: ['Mobile games'], focus: 'Mobile', fitScore: 60, website: '', location: 'Kuala Lumpur', country: 'Malaysia', notes: 'Founded 2011. Acquired by Fatfish/iCandy.' },

  // ==================== SINGAPORE ====================
  { name: 'Witching Hour Studios', games: ['Masquerada: Songs and Shadows', 'Ravenmark: Scourge of Estellion'], focus: 'Tactical RPG/Narrative', fitScore: 95, website: 'https://www.witching-hour.net/', location: 'Singapore', country: 'Singapore', notes: 'Founded 2010. TGS 2016 Best Indie. 500-page script. Voice cast: Matthew Mercer, Jennifer Hale, Catherine Taber. DigiPen connection.' },
  { name: 'The Gentlebros', games: ['Cat Quest', 'Cat Quest II', 'Cat Quest III'], focus: 'Action RPG', fitScore: 88, website: '', location: 'Singapore', country: 'Singapore', notes: 'Award-winning. Google Indie Games Accelerator.' },
  { name: 'BattleBrew Productions', games: ['Cuisineer', 'BattleSky Brigade'], focus: 'Action/Restaurant Sim', fitScore: 85, website: 'https://www.battle-brew.com/', location: 'Singapore', country: 'Singapore', notes: 'Founded Feb 2017. AAA veterans (AC3, Gumi, DeNA, Gameloft). Google IGA.' },
  { name: 'Mighty Bear Games', games: ['Butter Royale'], focus: 'Mobile/Casual', fitScore: 70, website: '', location: 'Singapore', country: 'Singapore', notes: 'Apple Arcade featured.' },
  { name: 'Boomzap Entertainment', games: ['Various'], focus: 'Casual/Adventure', fitScore: 65, website: '', location: 'Singapore', country: 'Singapore', notes: 'Casual game developer.' },
  { name: 'Spiral Up Games', games: ['Publisher'], focus: 'Publisher', fitScore: 75, website: 'https://www.spiralupgames.com/', location: 'Singapore', country: 'Singapore', notes: 'International indie publisher. Marketing, funding, community support.' },
  { name: 'Secret Base', games: ['Indie titles'], focus: 'Indie', fitScore: 70, website: '', location: 'Singapore', country: 'Singapore', notes: 'Singapore indie studio.' },
  { name: 'Andrew Teo Games', games: ['Ghostlore'], focus: 'ARPG', fitScore: 85, website: '', location: 'Singapore', country: 'Singapore', notes: 'Ghostlore developer. SEA-inspired ARPG.' },

  // ==================== HONG KONG ====================
  { name: 'eastasiasoft', games: ['Publisher - 331+ games'], focus: 'Publisher', fitScore: 80, website: 'https://www.eastasiasoft.com/', location: 'Hong Kong', country: 'Hong Kong', notes: 'Niche indie publisher. 331+ games published. Works with DOMO, Compile Heart, Rainbite, Suzaku, SideQuest, Softstar.' },
  { name: 'GameOne', games: ['Various PC games'], focus: 'PC Games', fitScore: 65, website: '', location: 'Hong Kong', country: 'Hong Kong', notes: 'Classic HK game developer.' },
  { name: 'CreDeOne', games: ['鈦神 (Titanium God)', '鋼甲機神', '烽火戰車'], focus: 'Online PC Games', fitScore: 60, website: '', location: 'Hong Kong', country: 'Hong Kong', notes: 'Multiple online games 2007-2011.' },
  { name: 'PLUTONIZATION', games: ['Rev to Vertex'], focus: 'Racing', fitScore: 65, website: '', location: 'Hong Kong', country: 'Hong Kong', notes: 'Racing game developer.' },
  { name: 'Huogou Workshop (火狗工房)', games: ['愛神餐館', '公主幻想曲'], focus: 'PC Games', fitScore: 70, website: '', location: 'Hong Kong', country: 'Hong Kong', notes: 'Classic HK indie developer.' },
];

async function main() {
  const STUDIO_PIPELINE_ID = 'Yo2OlGZdFFMWkFTr0n08';
  let imported = 0;
  let skipped = 0;
  
  for (const studio of studios) {
    // Check if already exists
    const existing = await db.collection('leads')
      .where('name', '==', studio.name)
      .limit(1)
      .get();
    
    if (!existing.empty) {
      console.log(`SKIP (exists): ${studio.name}`);
      skipped++;
      continue;
    }
    
    const fitTags: string[] = [];
    const focusLower = studio.focus.toLowerCase();
    if (focusLower.includes('narrative') || focusLower.includes('story') || focusLower.includes('adventure') || focusLower.includes('visual novel')) {
      fitTags.push('Narrative Focus');
    }
    if (focusLower.includes('rpg')) {
      fitTags.push('RPG');
    }
    if (focusLower.includes('horror')) {
      fitTags.push('Horror');
    }
    if (focusLower.includes('rhythm') || focusLower.includes('puzzle')) {
      fitTags.push('Gameplay Focus');
    }
    
    // Determine priority
    const priority = studio.fitScore >= 95 ? 'high' : studio.fitScore >= 85 ? 'medium' : 'none';
    
    // Determine tags
    const tags = ['asia', 'southeast-asia', studio.country.toLowerCase().replace(' ', '-')];
    
    // Create lead
    await db.collection('leads').add({
      name: studio.name,
      type: 'studio',
      website: studio.website,
      country: studio.country,
      location: studio.location || studio.country,
      status: 'new',
      priority: priority,
      owner: '',
      contact: {
        name: '',
        role: '',
        email: '',
        phone: '',
        linkedin: '',
      },
      studio: {
        size: 'indie',
        type: studio.focus.includes('Publisher') ? 'Publisher' : 'Developer',
        games: studio.games,
        focus: studio.focus,
        fitScore: studio.fitScore,
        fitReason: studio.notes || studio.country + ' studio - ' + studio.focus,
        fitTags: fitTags,
      },
      tags: tags,
      notes: studio.notes || '',
      pipeline: {
        id: STUDIO_PIPELINE_ID,
        stageId: 'new-lead',
      },
      metadata: {
        source: 'sea-research-2026-03-07',
        region: 'asia',
      },
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now(),
      createdBy: 'skel-import',
    });
    
    console.log(`IMPORTED: ${studio.name} [${studio.country}] (${studio.focus}, fit: ${studio.fitScore})`);
    imported++;
  }
  
  console.log(`\n===========================`);
  console.log(`Imported: ${imported}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`===========================`);
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
