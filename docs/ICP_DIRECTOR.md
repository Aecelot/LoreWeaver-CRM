# Ideal Customer Profile: Director

LoreWeaver Director is an **on-device AI engine** for dynamic NPC dialogue in games.

---

## Product Summary

**What it is:** Runtime AI that generates contextual NPC dialogue during gameplay.

**What it's NOT:** An authoring tool for writers.

**Key differentiator:** On-device inference (not cloud). <100ms latency, fixed cost, works offline.

**Pricing:** 1-5% revenue share + optional add-ons (fine-tuning, engine ports, on-prem)

---

## Target Customer

### Company Profile
| Attribute | Ideal |
|-----------|-------|
| Type | AA studio |
| Size | 20-150 employees |
| Budget | €1M+ project budget |
| Games | RPG, open-world, narrative-heavy with many NPCs |

### User Profile
| Role | Pain |
|------|------|
| Technical Director | Cloud AI latency (500ms+), unpredictable API costs |
| Game Director | NPCs feel scripted/repetitive |
| Producer | Scaling dialogue content is expensive |

---

## AI Positioning

### 🔑 Critical Distinction: Production vs. Creative AI

**Director = Creative/Generative AI**
- Generates NPC dialogue at **runtime**
- AI creates content that players directly experience
- This is what some studios explicitly reject

**Architect = Production AI**
- Helps writers during **development**
- AI assists, human creates
- Much easier sell to AI-skeptical studios

### Implications for Leads

| Studio AI Stance | Director Fit | Architect Fit |
|------------------|--------------|---------------|
| "No generative AI" | ❌ Hard no | ✅ May accept |
| "AI for production only" | ❌ Conflicts | ✅ PERFECT |
| AI-curious | ✅ Worth pitching | ✅ Good |
| AI-forward | ✅ PERFECT | ✅ Good |

### Example: Remedy Entertainment

> "We're not using generative AI... cautious about adopting AI"

- ❌ **Director doesn't fit**: Runtime generation = generative AI
- ✅ **Architect fits**: Production tooling = what they're open to

### Example: Hazelight Studios

> Asymmetric co-op where NPCs should react differently to each player

- ✅ **Director fits**: Dynamic NPC responses enhance their design
- Unknown AI stance, but use case is strong

---

## Qualifying Questions

1. Do your NPCs have dialogue? How much? (More = better fit)
2. Are you concerned about cloud AI latency/cost? (Yes = Director value)
3. Does your game need to work offline? (Yes = Director required)
4. What's your stance on AI-generated content in games? (Determines viability)

---

## Competitive Landscape

| Competitor | Weakness |
|------------|----------|
| Inworld AI | Cloud-only, 500ms+ latency, per-token costs |
| Convai | Cloud-dependent, unpredictable scaling costs |
| NVIDIA ACE | Requires high-end hardware, cloud components |
| Ubisoft NEO NPC | Internal only, cloud-based |

**Director's edge:** On-device, fixed cost, <100ms, works offline.

---

## Messaging by AI Stance

### For AI-forward studios:
> "Director brings AI NPCs on-device: no cloud latency, no per-token costs, works offline. Your NPCs respond dynamically while respecting your authored narrative bounds."

### For AI-curious studios:
> "We're not replacing your writers—Director handles ambient NPC responses while your authored story stays intact. Think of it as dynamic delivery of your narrative intent."

### For AI-skeptical studios:
> ⚠️ **Likely not a fit.** Director IS generative AI at runtime. If they've explicitly rejected this, don't pitch Director. Consider Architect instead.

---

## Red Flags (Not a Fit)

- "No generative AI in our games" — explicit rejection
- Mobile games (device constraints)
- Multiplayer-only with no NPC dialogue
- Linear games with fully scripted dialogue (no dynamic need)
- Studios that already committed to Inworld/Convai

---

## 4GB VRAM Constraint

Director must run on consumer hardware with **4GB VRAM or less**.

| Model | Size (Q4) | Fits? |
|-------|-----------|-------|
| Current 1.2B fine-tuned | ~1.5 GB | ✅ |
| SmolLM3-3B | ~2.5 GB | ✅ |
| Qwen3-4B | ~3.2 GB | ✅ |
| Phi-4-mini 3.8B | ~3 GB | ✅ |
| Anything 7B+ | 6-8 GB+ | ❌ |

---

## ICP Tags for CRM

- `director-icp` — AA studio with NPC dialogue needs
- `ai-forward` — Actively exploring/using AI in games
- `ai-curious` — Open to AI, worth pitching both products
- `ai-cautious` — May only accept Architect
- `ai-skeptical` — Probably Architect only, if anything

---

*Last updated: 2026-02-28*
