# LoreWeaver – Investor Update Q1 2026 (DRAFT)

**Status:** Draft — review before sending  
**Target send date:** Week of March 10, 2026

---

## Email Body

```
Subject: LoreWeaver – Investor Update Q1 2026

Dear all,

Please find attached our Q1 2026 investor update. This quarter has been focused on technical validation and building our commercial pipeline.

Key highlights: Director's on-device model achieved 74% benchmark accuracy (up from baseline), we've built a CRM with 400+ qualified leads across Europe and Asia, and secured productive conversations with narrative-focused studios including LOI discussions with two new partners.

The update details our product progress, commercial traction, and the path to our EUR 400K equity round in October. As always, your support makes this momentum possible.

If you have any questions, please let us know!

Kind regards,

-- 
Rijk Groenewoud
Founder & CEO | +31 6 1898 7973 | LinkedIn
www.loreweaver.ink
```

---

## PDF Content Draft

### Highlights – Q1 2026

**Technical Validation**
- Director LoRA v2 fine-tuning complete: 80% meaning preservation, 100% voice accuracy, 97% intent detection
- On-device inference under 4GB VRAM validated — key differentiator vs cloud competitors (Inworld, Convai, NVIDIA ACE)
- Style-transfer architecture proven for 20 RPG character voices

**Commercial Pipeline**
- Built LoreWeaver CRM with **400+ qualified leads** across 20+ countries
- Deep research completed on 15+ high-priority targets (Larian, Paradox, Remedy, Inkle, Hazelight, etc.)
- ICP framework documented: Architect = production AI, Director = generative AI
  - Key insight: Studios with "no generative AI" stance may still accept Architect

**Strategic Positioning**
- On-device inference validated as market trend (NVIDIA ACE deploying 8B models, <100ms latency)
- LoreWeaver's 4GB VRAM constraint is now a **market differentiator**, not limitation
- Anti-AI sentiment research: 52% devs, 62.7% gamers hostile — our "production AI" framing addresses this

---

### Product Progress

**Architect (v0.3.1 — Production)**
- Stable release in customer hands
- [Add: any customer feedback, usage metrics, feature updates]

**Director (v0.2.1 — Alpha)**
- **UE5 demo in active development** (Pawel) — 2 weeks from true emergent gameplay
  - Dynamic dialogue, actions, plot, quests, character development
  - First playable demonstration of Director's full capability
- LoRA v2 training complete (r=32, alpha=64, 8 target modules, 5 epochs)
- Evaluation: 74.3% overall benchmark (up from baseline)
- EU AI Act compliance documented
- On-device inference architecture finalized

**Intent Classifier (v7 — Production-ready)**
- **92.3% accuracy** routing player actions to correct subsystem (up from 58.9% v1)
- 96 intent classes (UPDATE_STATE, GENERATE_DIALOGUE, RESOLVE_MECHANICS, etc.)
- Runs on CPU with <50ms latency — no GPU required for routing
- 8,109 training examples across 8 epochs

**Dialogue Style Transfer (Paraphrasing Fine-Tuning)**
- **20 unique character voices** trained (Brix, Morvak, K'Bari, Brother Elias, etc.)
- Tier 4 evaluation: **96% pass rate**, 88.55% intent match
- Tier 5 qualitative: **8.58/10 overall** (tonal consistency 9.0/10)
- Task: Transform neutral dialogue → character voice while preserving exact meaning

**Lore RAG System**
- **50ms retrieval latency** for game lore context injection
- Enables Director to reference world knowledge in real-time

**Model-Creation Pipeline**
- Training pipeline: YAML → JSONL → LoRA fine-tune → merge → eval
- 3,500 training examples (70% SFT / 30% DPO)
- Difficulty scale stress test built (1-10 complexity levels)

---

### Commercial & Team

**Pipeline Highlights**
- 400+ leads in CRM (studios + investors)
- Top targets by region:
  - **Nordics:** Paradox (CK3's 22 DLCs), Hazelight (GOTY 2021), Remedy
  - **Benelux:** Larian (BG3), like Charlie, Appeal Studios
  - **UK:** Inkle, Weather Factory, Supermassive
  - **Poland:** Fool's Theory (Witcher Remake), Anshar, The Astronauts
  - **Asia:** 80+ Director leads across Korea, Japan, Taiwan, India, SEA

**LOIs & Conversations**
- [Add: specific LOI updates since Q4]
- Articy partnership discussions ongoing (Carsten Schröder)
- Hawkswell Studios LOI signed

**Team**
- Kiomi ten Damme — Narrative Design Intern
- Pawel — UE5 Integration / Director Demo Development
- [Add: any other team updates]

---

### Financials & Next Steps

**Current Position**
- EUR 50K SAFE closed (Q4 2024)
- EUR 150K SAFE coming (April 2026)
- EUR 400K equity round planned (October 2026)

**Runway**
- [Add: current burn rate and runway months]

**Q2 2026 Priorities**
1. **Director UE5 demo launch** (~mid-March) — first public demonstration of emergent gameplay
2. Architect customer expansion
3. B'Game presentation (March 19)
4. GDC networking / follow-up
5. Close EUR 150K SAFE tranche

**How You Can Help**
- Intros to gaming VCs (BITKRAFT, Konvoy, Hiro Capital)
- Introductions at narrative-focused studios
- Feedback on Director positioning

---

### Key Learnings This Quarter

1. **On-device is the play.** NVIDIA ACE validating on-device approach, but they're doing 8B models. Our 4GB constraint positions us for the broader market (indie/AA studios without RTX 4090s).

2. **Production AI vs Creative AI framing works.** Studios hostile to "AI writing" are receptive to "AI helping writers organize content."

3. **Paradox taught us caution matters.** Their Stellaris AI controversy shows even AI-curious studios can face backlash. Lead with "content QA at scale" not "AI NPCs."

---

*Draft prepared 2026-03-02 by Skel*
*Review with Rijk before finalizing*
