# LoreWeaver Newsletter — March 2026

**Building the Future of Narrative AI for Games**

---

Dear friends and supporters,

Q1 2026 has been our most productive quarter yet. While the industry debates whether AI belongs in games, we've been building — and now we have working systems to show for it.

Here's what's new at LoreWeaver.

---

## 🎮 Director: From Prototype to Alpha

**Director is now running end-to-end gameplay loops.**

This isn't a demo. This isn't a pitch deck promise. Director is a fully operational narrative AI engine connected to Unreal Engine 5, making real-time decisions about dialogue, actions, plot progression, and character development.

### What's Working Now

**On-Device Inference**
- 11.86ms response latency (local llama.cpp server)
- Runs on consumer GPUs (4GB VRAM)
- No cloud dependency, no per-token API costs
- Works offline — critical for shipped games

**Character Voice System**
- 20 unique character voices trained
- 96% accuracy preserving meaning while transforming style
- "Brix the Goblin" doesn't sound like "Brother Elias the Monk"
- Tonal consistency score: 9.0/10

**Emergent Plot Generation**
- NPCs pursue their own goals
- Story arcs generate dynamically from game state
- Relationships evolve based on player choices
- No more "dialogue trees" — real emergent narrative

**Knowledge Integration**
- Lore RAG system: 58ms retrieval latency
- NPCs actually know your world's lore
- Consistent references to locations, history, factions

### The Relationship Graph

This is the feature that gets people excited:

Director tracks every relationship between characters in real-time. Not just "friendly" or "hostile" — actual semantic relationships:

- *"sold intelligence about"*
- *"former employee of"*
- *"investigating"*
- *"avoiding"*

When you ask an NPC about another character, they don't just recite a canned response. They know the history. They have opinions. They might lie.

**This is what "emergent narrative" actually looks like.**

---

## ✍️ Architect: v0.3.2 Released

Architect continues to mature as a production tool for narrative designers.

### New This Quarter

**Entity Generation from Examples**
Upload a few example characters, and Architect generates more in the same style. Not replacing writers — accelerating them.

**Visual Story Board**
Arc and Beat visualization with an infinite canvas. See your entire narrative structure at once. Drag, connect, reorganize.

**LLM Task Queue**
Background processing for large lore imports. Progress tracking. Edit locking to prevent conflicts. The boring infrastructure that makes tools reliable.

**Schema Propagation**
Change a field definition once, and it cascades to all entities of that type. No more manual updates across hundreds of characters.

### Customer Feedback

*"Finally, a tool that understands narrative isn't just dialogue."*

Architect is in active use by narrative teams. We're collecting feedback and shipping fixes weekly.

---

## 📊 By The Numbers

| Metric | Value |
|--------|-------|
| Director response latency | 11.86ms |
| Intent classification accuracy | 92.3% |
| Character voice fidelity | 96% |
| Lore retrieval (P50) | 58ms |
| Qualitative evaluation score | 8.58/10 |
| Character voices trained | 20 |
| Intent classes supported | 96 |
| CRM leads | 400+ |

---

## 🌍 Market Validation

We've spent Q1 talking to studios across Europe and Asia. Here's what we learned:

**The "No AI" Stance Has Nuance**

Many studios publicly oppose "AI-generated content" but are open to "AI-assisted production tools." The distinction matters:

- ❌ "AI writes your story" — backlash risk
- ✅ "AI helps writers organize and QA content" — accepted

We've refined our positioning accordingly. Architect is a production tool. Director is opt-in emergent content for studios that want it.

**On-Device Is The Future**

NVIDIA ACE validated what we believed: on-device inference is where the industry is heading. But ACE targets high-end hardware (8B models, RTX 4090s).

LoreWeaver targets the rest of the market — indie and AA studios shipping to mid-range PCs. Our 4GB VRAM constraint isn't a limitation. It's our competitive advantage.

**400+ Qualified Leads**

We've built a CRM with studios and investors across:
- Nordic region (Paradox, Hazelight, Remedy)
- Benelux (Larian, Appeal, like Charlie)
- UK (Inkle, Weather Factory, Supermassive)
- Poland (Fool's Theory, Anshar, The Astronauts)
- Asia-Pacific (80+ studios across Korea, Japan, Taiwan, India, SEA)

Deep research completed on 15+ high-priority targets. Outreach begins this month.

---

## 🎯 What's Next

**March 2026**
- Director UE5 demo showcase (~2 weeks)
- B'Game presentation (March 19)
- Begin studio outreach campaign

**April 2026**
- EUR 150K SAFE closing
- Architect customer expansion
- Director pilot program launch

**Q4 2026**
- EUR 400K equity round
- Director commercial release

---

## 🤝 How You Can Help

**Investors:** We're closing a EUR 150K SAFE this month and preparing a EUR 400K equity round for October. Intros to gaming-focused VCs (BITKRAFT, Konvoy, Hiro Capital) are valuable.

**Studios:** If you're building narrative-heavy games and frustrated with dialogue trees, let's talk. We're looking for pilot partners for Director.

**Industry Contacts:** Introductions to narrative directors, technical directors, and tool leads at AA+ studios help us understand the market.

---

## 💬 One More Thing

We get asked: *"Aren't you worried about the AI backlash in games?"*

Honestly? No.

The backlash is against lazy AI — generated slop replacing human creativity. That's not what we're building.

Director doesn't write your story. It runs your story in real-time, making thousands of small decisions that used to require either massive scripting budgets or compromise.

The studios that embrace this technology will ship games with narrative depth that wasn't previously possible at their budget level. The ones that don't will keep shipping dialogue trees.

We know which future we're betting on.

---

**Thanks for being part of the journey.**

Rijk Groenewoud
Founder & CEO, LoreWeaver

[LinkedIn](https://linkedin.com/in/rijkgroenewoud) | [Website](https://loreweaver.ink) | [Email](mailto:rijk@loreweaver.ink)

---

*To unsubscribe or update your preferences, reply to this email.*

*LoreWeaver B.V. — Amsterdam, Netherlands*
