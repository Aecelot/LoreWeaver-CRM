// Batch research update - Run 21 (2026-03-05 06:22 AM)
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ccjwqpoizxzuvjeuzxbn.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjandxcG9penh6dXZqZXV6eGJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5NjcyNzgsImV4cCI6MjA1NTU0MzI3OH0.2jurWBAtxMCLbPU-M-sP2s2kYDhexaGnL2K-TTXN93I';
const supabase = createClient(supabaseUrl, supabaseKey);

const updates = [
  {
    id: 'h34Y3oiWl5QUJKXzTXd8',
    name: 'Null DIES',
    note: `**Research Summary (2026-03-05)**

**Location:** Cairo, Egypt (founders now in Germany)
**Founded:** 2010
**Type:** Indie game development studio

**Key Personnel:**
- ElHassan Makled - CEO, Game Director & Co-Founder
- Amr Kandil - Creative Director & Co-Founder
- Ahmad ElKassed - Game Designer

**Contact Information:**
- Email: info@nulldies.com
- Phone: +201008559815 | +201001008856
- Website: nulldies.com
- Facebook: facebook.com/nulldies/
- Instagram: @nulldies

**Games:**
- Hello, Helix (Global Game Jam 2019)
- Various game jam projects (Ludum Dare)

**Narrative Focus:** Character realism, emphasis on characteristics and persona development

**Notes:** Small indie team with strong game jam background. Focus on VR and multi-platform development. Active since 2010 with emphasis on character-driven narratives.`,
    status: 'researched'
  },
  {
    id: 'hNDfXsmCR2QSZPKLcCVA',
    name: '2024 Studios',
    note: `**Research Summary (2026-03-05)**

**Location:** Egypt
**Type:** Egyptian Indie Game Studio

**Key Personnel:**
- Ahmed Mohi-Eldin Fahmy - Founder

**Contact Information:**
- LinkedIn: linkedin.com/company/2024-studios (~1.8K followers)
- Primary contact via LinkedIn

**Focus Areas:**
- Educational games (coding principles for children)
- Level design and lighting
- Mechanics-driven storytelling (without text)

**Activities:**
- #ArabicGames2025 conference participation
- Partnership with KufiTech Ventures (business modeling)
- Educational racing game development

**Narrative Focus:** Mechanics-driven storytelling without text, narrative-driven educational content

**Notes:** Named after game developers' lab number "2024". Active in Arabic game development scene. Focus on educational games with narrative elements conveyed through gameplay mechanics rather than text.`,
    status: 'researched'
  },
  {
    id: 'i3MeYIex1NOHcLNAHsuJ',
    name: 'QUByte Interactive',
    note: `**Research Summary (2026-03-05)**

**Location:** São Paulo, Brazil
**Founded:** 2009
**Type:** Largest Latin American indie publisher and developer

**Key Personnel:**
- Marivaldo Cabral - CEO
- Guilherme Damian - Co-Founder

**Contact Information:**
- General: contact@qubyteinteractive.com
- PR/Press: pr@qubytegames.com
- Phone: +55 (11) 2307 8425
- Website: qubyteinteractive.com
- Address: Rua Alexandre Dumas, 1562, Sala 64 – São Paulo-SP – Brazil

**Social Media:**
- Twitter: @qubytegames (15.8K followers)
- Instagram: @qubyteinteractive (6.1K followers)
- Facebook: 40K+ followers
- LinkedIn: 5.3K+ followers
- Discord available

**Focus Areas:**
- Narrative-driven adventures (Hannah, One Step After Fall)
- Retro classics (QUByte Classics series)
- Porting and publishing for indie developers

**Narrative Focus:** Strong focus on narrative-driven adventure games. Recent titles include story-focused experiences.

**Notes:** Major publisher in Latin America with 100+ games released. Excellent partner for porting and publishing. Active in narrative-driven indie space.`,
    status: 'researched'
  },
  {
    id: 'i6ewLBT23nCn0PhFo56w',
    name: 'Candivore',
    note: `**Research Summary (2026-03-05)**

**Location:** Tel Aviv, Israel
**Founded:** 2018
**Type:** Mobile gaming startup (Series D)
**Size:** 51-200 employees

**Key Personnel:**
- Zur Tamam - Co-Founder, Chief Creative Officer
- Alon Shkedi - Co-Founder
- Tom Amel - Co-Founder, R&D Lead
- Gal Goldstein - Founder
- Ilya Ägron - Founder
- Sahar Azran - Founder
- Anat Treibatch - CFO

**Contact Information:**
- Email: contact@candivore.io
- Website: www.candivore.io
- LinkedIn: linkedin.com/company/candivore (18.3K followers)

**Games:**
- Match Masters (flagship - multiplayer match-3)

**Focus Areas:**
- Mobile multiplayer games
- Competitive casual gaming
- Match-3 puzzle games

**Narrative Focus:** Limited - primarily focused on competitive multiplayer casual games. Not a strong fit for narrative AI tools.

**Notes:** Well-funded mobile gaming company. Focus is on competitive casual gaming rather than narrative content. Low priority for LoreWeaver outreach.`,
    status: 'researched'
  },
  {
    id: 'iusfQ7AC4HArsmMb6vdz',
    name: 'SHIFT UP',
    note: `**Research Summary (2026-03-05)**

**Location:** Seoul, South Korea
**Founded:** December 2, 2013
**Type:** Publicly traded game developer/publisher (KRX:462870)

**Key Personnel:**
- Kim Hyung Tae (Kim HyunTae) - Founder, CEO (renowned illustrator)
- KyungRip Min - Co-Founder

**Contact Information:**
- Email: shiftup@shiftup.co.kr
- Support: cs@shiftup.co.kr
- Stellar Blade support: stellarblade_help@shiftup.co.kr
- Phone: 02-562-5071
- Website: shiftup.co.kr
- Address: 12F ~ 15F, Apro Square, 55 Seocho-daero 77-gil, Seocho-gu, Seoul, 06611, Korea

**Games:**
- Stellar Blade (PS5 exclusive, 2024)
- Goddess of Victory: NIKKE (gacha, 2022)
- Destiny Child (2016)
- Project Spirits (upcoming - "Eastern Fantasy" cross-platform)

**Focus Areas:**
- High-quality narrative-driven action games
- Subculture/anime aesthetic
- Character-driven storytelling
- Premium console experiences

**Narrative Focus:** VERY STRONG. Known for distinctive graphics and immersive storytelling. Stellar Blade features deep narrative. Project Spirits emphasizes narrative.

**Publishing:** Recently signed deal with Level Infinite (Tencent) for Project Spirits

**Notes:** TOP TIER PROSPECT. Major Korean studio with strong narrative focus. Publicly traded, well-resourced. Stellar Blade success proves commitment to story-driven games. High priority for Director outreach.`,
    status: 'researched'
  }
];

async function updateCRM() {
  console.log('Updating CRM with research notes...\n');
  
  for (const update of updates) {
    console.log(`Processing: ${update.name} (${update.id})`);
    
    // Add research note
    const { error: noteError } = await supabase
      .from('notes')
      .insert({
        leadId: update.id,
        content: update.note,
        status: 'cold',
        createdBy: 'skel-research-bot',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    
    if (noteError) {
      console.error(`  Note error: ${noteError.message}`);
    } else {
      console.log(`  ✓ Note added`);
    }
    
    // Update lead status
    const { error: statusError } = await supabase
      .from('leads')
      .update({ 
        status: update.status,
        'pipeline.stageId': update.status
      })
      .eq('id', update.id);
    
    if (statusError) {
      console.error(`  Status error: ${statusError.message}`);
    } else {
      console.log(`  ✓ Status updated to: ${update.status}`);
    }
  }
  
  console.log('\nDone!');
}

updateCRM().catch(console.error);
