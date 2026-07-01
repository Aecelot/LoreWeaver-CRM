import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

const serviceAccountPath = path.resolve(__dirname, '../../service-account.json');
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Competition Pipeline
const PIPELINE_ID = 'MUCFmGdpqPYAT0tKSAWs';
const RESEARCHED_STAGE = 'researched';

// Research directory
const RESEARCH_DIR = 'C:\\Users\\rijkg\\clawd\\research';

// Interface for reference (used in processing)
// companyName, fileName, content, threatLevel, category

function extractCompanyName(fileName: string): string {
  // competitor-deep-dive-{name}-2026-03-06.md
  const match = fileName.match(/competitor-deep-dive-(.+)-2026-03-\d+\.md/);
  if (match) {
    return match[1]
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  return fileName;
}

function extractThreatLevel(content: string): string {
  if (content.match(/🔴|HIGH.*threat|Threat.*HIGH/i)) return 'high';
  if (content.match(/🟠|MEDIUM.*threat|Threat.*MEDIUM/i)) return 'medium';
  if (content.match(/🟡|LOW.*threat|Threat.*LOW/i)) return 'low';
  return 'unknown';
}

function categorizeCompetitor(content: string, name: string): string {
  const lowerContent = content.toLowerCase();
  const lowerName = name.toLowerCase();
  
  // Voice/TTS
  if (lowerContent.includes('voice') || lowerContent.includes('tts') || 
      lowerContent.includes('text-to-speech') || lowerContent.includes('speech synthesis') ||
      ['elevenlabs', 'hume', 'playht', 'lovo', 'murf', 'resemble', 'respeecher', 
       'voicemod', 'sonantic', 'coqui', 'replica studios', 'readspeaker', 'speechify', 'google tts'].some(v => lowerName.includes(v))) {
    return 'voice-tts';
  }
  
  // Authoring tools
  if (['articy', 'arcweave', 'chat mapper', 'twine', 'ink', 'yarn spinner', 'renpy', 
       'choicescript', 'inklewriter', 'scrivener', 'final draft', 'writerduet', 
       'campfire', 'logic driver', 'pixel crushers', 'kanka', 'world anvil', 'obsidian'].some(v => lowerName.includes(v))) {
    return 'authoring-tools';
  }
  
  // Runtime NPC AI
  if (['inworld', 'convai', 'charisma', 'bitpart', 'artificial agency', 'iconic', 
       'parametrix', 'rct ai', 'nvidia ace', 'spirit ai', 'ubisoft neo', 'netease',
       'mihoyo', 'tencent', 'supercell'].some(v => lowerName.includes(v))) {
    return 'runtime-npc-ai';
  }
  
  // Consumer AI
  if (['ai dungeon', 'character ai', 'novelai', 'dreamgen', 'hidden door', 
       'fable studio', 'kobold', 'sillytavern'].some(v => lowerName.includes(v))) {
    return 'consumer-ai';
  }
  
  // Academic/Historical
  if (['facade', 'versu', 'event0', 'eis', 'wildermyth'].some(v => lowerName.includes(v))) {
    return 'academic-historical';
  }
  
  // Middleware
  if (lowerContent.includes('middleware') || lowerContent.includes('sdk') || 
      lowerContent.includes('plugin') || lowerName.includes('llmunity')) {
    return 'middleware';
  }
  
  return 'other';
}

async function main() {
  console.log('Scanning for deep-dive files...\n');
  
  // Get all deep-dive files
  const files = fs.readdirSync(RESEARCH_DIR)
    .filter(f => f.startsWith('competitor-deep-dive-') && f.endsWith('.md'));
  
  console.log(`Found ${files.length} deep-dive files\n`);
  
  // Get existing leads to avoid duplicates
  const existingLeads = await db.collection('leads')
    .where('pipeline.id', '==', PIPELINE_ID)
    .get();
  
  const existingNames = new Set(
    existingLeads.docs.map(doc => doc.data().name?.toLowerCase())
  );
  
  console.log(`Found ${existingNames.size} existing leads in competition pipeline\n`);
  
  const results = { imported: 0, skipped: 0, errors: 0 };
  
  for (const fileName of files) {
    try {
      const companyName = extractCompanyName(fileName);
      
      // Check if exists
      if (existingNames.has(companyName.toLowerCase())) {
        console.log(`⏭️  Skip (exists): ${companyName}`);
        results.skipped++;
        continue;
      }
      
      // Read content
      const filePath = path.join(RESEARCH_DIR, fileName);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Extract metadata
      const threatLevel = extractThreatLevel(content);
      const category = categorizeCompetitor(content, companyName);
      
      // Create lead
      const lead = {
        name: companyName,
        status: RESEARCHED_STAGE,
        pipeline: {
          id: PIPELINE_ID,
          stageId: RESEARCHED_STAGE,
        },
        metadata: {
          type: 'competitor',
          category: category,
          threatLevel: threatLevel,
          source: 'deep-dive-research-2026-03',
          researchFile: fileName,
        },
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      };
      
      const docRef = await db.collection('leads').add(lead);
      
      // Add research note
      const noteContent = content.length > 50000 
        ? content.substring(0, 50000) + '\n\n[Truncated - full report in research files]'
        : content;
      
      await db.collection('notes').add({
        leadId: docRef.id,
        content: noteContent,
        status: threatLevel === 'high' ? 'hot' : threatLevel === 'medium' ? 'warm' : 'cold',
        createdBy: 'skel-import',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      
      console.log(`✅ Imported: ${companyName} (${category}, ${threatLevel} threat)`);
      results.imported++;
      
    } catch (e) {
      console.error(`❌ Error: ${fileName}:`, e);
      results.errors++;
    }
  }
  
  console.log(`\n--- Results ---`);
  console.log(`Imported: ${results.imported}`);
  console.log(`Skipped (existing): ${results.skipped}`);
  console.log(`Errors: ${results.errors}`);
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
