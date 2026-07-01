import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccountPath = path.resolve(__dirname, '../../service-account.json');
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Competition Pipeline
const PIPELINE_ID = 'MUCFmGdpqPYAT0tKSAWs';
const NEW_STAGE = 'new';

interface Competitor {
  name: string;
  funding?: string;
  description: string;
  category: string;
  threatLevel: string;
  onDevice: boolean;
  website?: string;
}

// New competitors from 2026-03-07 scans
const competitors: Competitor[] = [
  // From character-engines scan
  {
    name: 'General Intuition',
    funding: '$133.7M seed',
    description: 'Largest AI gaming seed ever. Details TBD.',
    category: 'runtime-npc-ai',
    threatLevel: 'high',
    onDevice: false,
  },
  {
    name: 'ego AI',
    funding: '$6.7M (Oct 2025)',
    description: 'Character platform to make in-game characters more human-like.',
    category: 'runtime-npc-ai',
    threatLevel: 'medium',
    onDevice: false,
  },
  {
    name: 'Qualcomm Snapdragon Game AI SDK',
    funding: 'Corporate',
    description: 'On-device AI for mobile/portable gaming. Local AI-driven NPCs without cloud dependency. Launched March 2026.',
    category: 'platform',
    threatLevel: 'medium',
    onDevice: true,
    website: 'https://www.qualcomm.com/developer/blog/2026/03/snapdragon-game-ai-sdk-launch-on-device-ai-in-gaming',
  },
  {
    name: 'NPCx',
    funding: 'Crowdfunding (Republic)',
    description: 'Generative AI and ML to bring animated characters to life.',
    category: 'runtime-npc-ai',
    threatLevel: 'low',
    onDevice: false,
    website: 'https://republic.com/npcx2024',
  },
  {
    name: 'Kinetix',
    funding: '$11M',
    description: 'AI-powered animations from video (no-code).',
    category: 'animation',
    threatLevel: 'low',
    onDevice: false,
  },
  {
    name: 'Meshcapade',
    funding: '$6M seed',
    description: 'Digital humans with foundation models (SMPL body model).',
    category: 'animation',
    threatLevel: 'low',
    onDevice: false,
  },
  {
    name: 'Kaedim',
    funding: '$15M Series A',
    description: '2D concept art to 3D assets via AI.',
    category: 'asset-generation',
    threatLevel: 'low',
    onDevice: false,
  },
  {
    name: 'Bitmagic',
    funding: '$4M seed',
    description: 'Browser-based AI toolkit for 3D worlds from text prompts.',
    category: 'game-creation',
    threatLevel: 'low',
    onDevice: false,
  },
  {
    name: 'TILKI',
    funding: '$2.2M pre-seed',
    description: 'AI-powered game creation (no coding).',
    category: 'game-creation',
    threatLevel: 'low',
    onDevice: false,
  },
  {
    name: 'Sortium',
    funding: '$11.75M total',
    description: 'AI 3D asset/texture generation in real-time.',
    category: 'asset-generation',
    threatLevel: 'low',
    onDevice: false,
  },
  {
    name: 'Glade Studio',
    funding: 'Unknown',
    description: 'Local on-device AI companions (mentioned July 2025).',
    category: 'runtime-npc-ai',
    threatLevel: 'medium',
    onDevice: true,
  },
  {
    name: 'NobodyWho',
    funding: 'Open source',
    description: 'Godot plugin for local LLMs, embeddings, streaming.',
    category: 'open-source',
    threatLevel: 'low',
    onDevice: true,
    website: 'https://github.com/nobodywho-ooo/nobodywho',
  },
  {
    name: 'Mantella',
    funding: 'Open source',
    description: 'Skyrim mod for local LLM NPCs (Whisper + xVASynth). Full local pipeline.',
    category: 'open-source',
    threatLevel: 'low',
    onDevice: true,
  },
  // From emergent-narrative scan
  {
    name: 'Giant AI',
    funding: '$8M (Feb 2026)',
    description: 'Memory-driven storytelling for kids.',
    category: 'narrative-ai',
    threatLevel: 'medium',
    onDevice: false,
  },
  {
    name: 'Friends & Fables',
    funding: 'Unknown',
    description: 'AI GM for TTRPGs. Direct competitor for AI game master / Director concept.',
    category: 'narrative-ai',
    threatLevel: 'high',
    onDevice: false,
    website: 'https://fables.gg',
  },
  {
    name: 'Jenova.ai',
    funding: 'Unknown',
    description: 'AI-native game development platform.',
    category: 'game-creation',
    threatLevel: 'medium',
    onDevice: false,
  },
  {
    name: 'AI Game Master (App)',
    funding: 'Unknown',
    description: 'Popular iOS/Android text RPG (4.7★). Consumer AI GM.',
    category: 'consumer-ai',
    threatLevel: 'low',
    onDevice: false,
  },
];

async function main() {
  console.log(`Importing ${competitors.length} new competitors...\n`);
  
  // Get existing leads
  const existingLeads = await db.collection('leads')
    .where('pipeline.id', '==', PIPELINE_ID)
    .get();
  
  const existingNames = new Set(
    existingLeads.docs.map(doc => doc.data().name?.toLowerCase())
  );
  
  const results = { added: 0, skipped: 0, errors: 0 };
  
  for (const comp of competitors) {
    try {
      if (existingNames.has(comp.name.toLowerCase())) {
        console.log(`⏭️  Skip (exists): ${comp.name}`);
        results.skipped++;
        continue;
      }
      
      const lead = {
        name: comp.name,
        website: comp.website || '',
        status: NEW_STAGE,
        pipeline: {
          id: PIPELINE_ID,
          stageId: NEW_STAGE,
        },
        metadata: {
          type: 'competitor',
          category: comp.category,
          threatLevel: comp.threatLevel,
          funding: comp.funding,
          onDevice: comp.onDevice,
          source: 'competitor-scan-2026-03-07',
        },
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      };
      
      const docRef = await db.collection('leads').add(lead);
      
      // Add description as note
      await db.collection('notes').add({
        leadId: docRef.id,
        content: `**${comp.name}**\n\nFunding: ${comp.funding || 'Unknown'}\n\n${comp.description}\n\nCategory: ${comp.category}\nOn-device: ${comp.onDevice ? 'Yes' : 'No'}\nThreat: ${comp.threatLevel}`,
        status: comp.threatLevel === 'high' ? 'hot' : comp.threatLevel === 'medium' ? 'warm' : 'cold',
        createdBy: 'skel-scan',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      
      console.log(`✅ Added: ${comp.name} (${comp.category}, ${comp.threatLevel})`);
      results.added++;
      
    } catch (e) {
      console.error(`❌ Error: ${comp.name}:`, e);
      results.errors++;
    }
  }
  
  console.log(`\n--- Results ---`);
  console.log(`Added: ${results.added}`);
  console.log(`Skipped: ${results.skipped}`);
  console.log(`Errors: ${results.errors}`);
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
