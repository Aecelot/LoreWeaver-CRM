import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

const serviceAccountPath = path.resolve(__dirname, '../../service-account.json');
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const PIPELINE_ID = 'MUCFmGdpqPYAT0tKSAWs';
const RESEARCHED_STAGE = 'researched';
const RESEARCH_DIR = 'C:\\Users\\rijkg\\clawd\\research';

// Updated threat assessments based on deep-dives
const updates: Record<string, { threatLevel: string; category: string; summary: string; researchFile?: string }> = {
  'General Intuition': {
    threatLevel: 'low',
    category: 'spatial-ai',
    summary: '$133.7M seed but DIFFERENT MARKET - spatial reasoning for robotics/autonomous systems, not NPC AI. Spun from Medal.tv. Founder turned down $500M OpenAI offer.',
    researchFile: 'competitor-deep-dive-general-intuition-2026-03-07.md'
  },
  'Friends & Fables': {
    threatLevel: 'medium',
    category: 'narrative-ai',
    summary: 'B2C AI GM for D&D 5e, 100K+ players. 2-person bootstrapped team. Currently REWRITING their narration engine due to limitations. Biggest complaint: memory/consistency. Validates demand but different market (consumer vs B2B).',
    researchFile: 'competitor-deep-dive-friends-fables-2026-03-07.md'
  },
  'ego AI': {
    threatLevel: 'medium',
    category: 'runtime-npc-ai',
    summary: 'YC W24, $6.7M seed. Behavior-first (not chat-first) using small LMs + RL. Open-source Character Context Protocol. 1M+ Roblox users in first month. Consumer-focused but interesting tech.',
    researchFile: 'competitor-deep-dive-ego-ai-2026-03-07.md'
  },
  'Giant AI': {
    threatLevel: 'low',
    category: 'kids-entertainment',
    summary: '$8M seed, kids entertainment app (ages 4+). Memory-driven storytelling. 4.8/5 App Store. Different market (COPPA, parental controls) but interesting memory tech.',
    researchFile: 'competitor-deep-dive-giant-ai-2026-03-07.md'
  },
  'Qualcomm Snapdragon Game AI SDK': {
    threatLevel: 'low',
    category: 'platform',
    summary: 'Mobile on-device AI SDK. Supports 3-7B models, <5ms latency on Snapdragon 8. Free SDK. Platform enabler, not competitor. Could be Director mobile runtime target.',
    researchFile: 'competitor-deep-dive-qualcomm-game-ai-2026-03-07.md'
  },
  'Glade Studio': {
    threatLevel: 'medium',
    category: 'runtime-npc-ai',
    summary: 'YC S23, shipped GladeCore Oct 2025. On-device LLM plugin (Llama 3.2 1B) for Unreal/Unity, $0-145/mo. Similar on-device positioning but dialogue-only. Could be complementary.',
    researchFile: 'competitor-deep-dive-glade-studio-2026-03-07.md'
  },
  'Jenova.ai': {
    threatLevel: 'low',
    category: 'game-creation',
    summary: 'Tiny team (~4), only ~$110K funding. General AI agent platform pivoted from stock valuation. Has "unlimited memory" feature but severely under-resourced.',
    researchFile: 'competitor-deep-dive-jenova-ai-2026-03-07.md'
  },
  'NPCx': {
    threatLevel: 'low',
    category: 'animation',
    summary: '$3.6M total (Kakao backed). Actually mocap tools company (TrackerX, FaceX), not NPC AI. BehaviorX not shipped yet. Not a direct threat.',
    researchFile: 'competitor-deep-dive-npcx-2026-03-07.md'
  },
  'Kinetix': {
    threatLevel: 'low',
    category: 'animation',
    summary: 'Paris, ~71 employees, ~$6.9M revenue. Video-to-animation, now pivoting to AI video gen (Kamo-1). Unity Muse integration. Animation layer, complementary.',
    researchFile: 'competitor-deep-dive-kinetix-2026-03-07.md'
  },
  'Meshcapade': {
    threatLevel: 'low',
    category: 'digital-humans',
    summary: 'ACQUIRED BY EPIC GAMES Feb 2026. SMPL body model (de facto standard). Epic consolidating "body layer" - "mind layer" remains open for Director.',
    researchFile: 'competitor-deep-dive-meshcapade-2026-03-07.md'
  },
  'Kaedim': {
    threatLevel: 'low',
    category: 'asset-generation',
    summary: '$15.2M from a16z Games, $5.6M ARR. Image-to-3D with human-in-the-loop. 250+ enterprise customers. Different market (static 3D assets).',
    researchFile: 'competitor-deep-dive-kaedim-2026-03-07.md'
  },
  'Bitmagic': {
    threatLevel: 'low',
    category: 'game-creation',
    summary: '$4M seed. Browser-based AI 3D world creation from text. Different market (world building, not NPC AI).',
  },
  'TILKI': {
    threatLevel: 'low',
    category: 'game-creation',
    summary: 'London, 17 people, $3.45M. AI-first game creation with autonomous NPCs. Closed beta. Consumer creation market, competing with Rosebud AI (2.1M games).',
    researchFile: 'competitor-deep-dive-tilki-2026-03-07.md'
  },
  'Sortium': {
    threatLevel: 'low',
    category: 'asset-generation',
    summary: '$11.75M. Real-time AI 3D asset/texture generation. Different market (asset pipeline).',
  },
  'NobodyWho': {
    threatLevel: 'low',
    category: 'open-source',
    summary: 'Open source Godot LLM plugin, 719⭐. Infrastructure layer only (LLM inference). Could be useful foundation for Director Godot integration.',
    researchFile: 'competitor-deep-dive-nobodywho-2026-03-07.md'
  },
  'Mantella': {
    threatLevel: 'low',
    category: 'open-source',
    summary: 'Open source Skyrim mod for local LLM NPCs (Whisper + LLM + xVASynth). Proves demand for local NPC AI. Community project.',
  },
  'AI Game Master (App)': {
    threatLevel: 'low',
    category: 'consumer-ai',
    summary: 'Popular iOS/Android text RPG (4.7★). Consumer app validating demand for AI GMs. Different market (consumer vs B2B).',
  },
};

async function main() {
  console.log('Updating competitors with deep-dive research...\n');
  
  const results = { updated: 0, notFound: 0, errors: 0 };
  
  for (const [name, data] of Object.entries(updates)) {
    try {
      // Find the lead
      const snapshot = await db.collection('leads')
        .where('name', '==', name)
        .where('pipeline.id', '==', PIPELINE_ID)
        .get();
      
      if (snapshot.empty) {
        console.log(`⚠️  Not found: ${name}`);
        results.notFound++;
        continue;
      }
      
      const doc = snapshot.docs[0];
      const leadId = doc.id;
      
      // Update lead metadata and move to Researched
      await db.collection('leads').doc(leadId).update({
        status: RESEARCHED_STAGE,
        'pipeline.stageId': RESEARCHED_STAGE,
        'metadata.threatLevel': data.threatLevel,
        'metadata.category': data.category,
        'metadata.deepDiveDate': '2026-03-07',
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      
      // Read full research file if exists
      let fullResearch = data.summary;
      if (data.researchFile) {
        const filePath = path.join(RESEARCH_DIR, data.researchFile);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf-8');
          fullResearch = content.length > 50000 
            ? content.substring(0, 50000) + '\n\n[Truncated]'
            : content;
        }
      }
      
      // Add/update research note
      await db.collection('notes').add({
        leadId: leadId,
        content: fullResearch,
        status: data.threatLevel === 'high' ? 'hot' : data.threatLevel === 'medium' ? 'warm' : 'cold',
        createdBy: 'skel-deepdive',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      
      console.log(`✅ Updated: ${name} → ${data.threatLevel.toUpperCase()} (${data.category})`);
      results.updated++;
      
    } catch (e) {
      console.error(`❌ Error updating ${name}:`, e);
      results.errors++;
    }
  }
  
  console.log(`\n--- Results ---`);
  console.log(`Updated: ${results.updated}`);
  console.log(`Not found: ${results.notFound}`);
  console.log(`Errors: ${results.errors}`);
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
