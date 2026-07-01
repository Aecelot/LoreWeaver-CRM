# Investor Scoring Rubric

## LoreWeaver Investment Profile

| Attribute | Current Status |
|-----------|----------------|
| **Stage** | Pre-seed → Seed |
| **Raising** | EUR 150K (now), EUR 400K (Oct 2026) |
| **Sector** | Gaming × AI × B2B SaaS/Tools |
| **Ideal check size** | EUR 25K-100K (angels), EUR 100K-500K (VCs) |
| **Geography** | EU-based (Netherlands), UAE expansion |
| **Traction** | Architect v0.4.0 live, Director alpha Q2 2027 |

---

## Scoring Dimensions

### 1. Thesis Fit (0-5) — Weight: 3x

Does the investor's stated thesis align with LoreWeaver?

| Score | Criteria |
|-------|----------|
| **5** | Explicitly invests in gaming tools, game tech, or AI for games |
| **4** | Invests in gaming broadly OR AI/developer tools |
| **3** | Invests in B2B SaaS, creative tools, or entertainment tech |
| **2** | Generalist with some software/tech focus |
| **1** | Generalist with no clear tech focus |
| **0** | Explicitly excludes gaming, software, or early-stage |

**Keywords to look for:**
- Positive: gaming, games, esports, AI, ML, developer tools, creative tools, B2B SaaS, entertainment, media tech, game tech
- Negative: hardware only, biotech only, fintech only, later-stage only

### 2. Stage Fit (0-5) — Weight: 2x

Does the investor invest at our current stage?

| Score | Criteria |
|-------|----------|
| **5** | Explicitly pre-seed/seed focused |
| **4** | Seed stage included in range |
| **3** | Early-stage but primarily Series A |
| **2** | Growth stage with occasional seed |
| **1** | Primarily Series B+ |
| **0** | Only growth/PE, no early stage |

### 3. Check Size Fit (0-5) — Weight: 2x

Does their typical check size match our round?

| Score | Criteria |
|-------|----------|
| **5** | Typical check EUR 50K-200K (sweet spot) |
| **4** | Check EUR 25K-50K or EUR 200K-500K |
| **3** | Check EUR 10K-25K or EUR 500K-1M |
| **2** | Check under EUR 10K or EUR 1M-2M |
| **1** | Check EUR 2M+ (too large) |
| **0** | Unknown or incompatible |

### 4. Gaming Expertise (0-5) — Weight: 2x

Do they understand the games industry?

| Score | Criteria |
|-------|----------|
| **5** | Gaming-dedicated fund OR multiple gaming portfolio companies |
| **4** | 2-3 gaming investments, shows industry knowledge |
| **3** | 1 gaming investment or adjacent experience |
| **2** | Entertainment/media experience but no gaming |
| **1** | Tech investor, no gaming exposure |
| **0** | No relevant experience |

**Portfolio signals:**
- Direct: Game studios, game tools, esports, game publishers
- Adjacent: Streaming, creator tools, UGC platforms, VR/AR

### 5. Activity (0-5) — Weight: 1x

Are they actively deploying capital?

| Score | Criteria |
|-------|----------|
| **5** | 3+ investments in last 6 months |
| **4** | 1-2 investments in last 6 months |
| **3** | Investment in last 12 months |
| **2** | Investment in last 2 years |
| **1** | No recent investments, fund may be deployed |
| **0** | Inactive or closed fund |

### 6. Geography Fit (0-5) — Weight: 1x

Are they accessible to a Netherlands-based company?

| Score | Criteria |
|-------|----------|
| **5** | Netherlands-based or Benelux-focused |
| **4** | EU-based, invests cross-border |
| **3** | UK-based, Europe-friendly |
| **2** | US-based but invests in EU |
| **1** | Asia/other, rarely invests in EU |
| **0** | Explicitly local-only (not EU) |

---

## Score Calculation

```
Total Score = (Thesis × 3) + (Stage × 2) + (Check × 2) + (Gaming × 2) + (Activity × 1) + (Geography × 1)

Maximum possible: 55 points
```

### Tiers

| Tier | Score Range | Action |
|------|-------------|--------|
| **Tier 1** | 40-55 | Priority outreach — warm intro or direct pitch |
| **Tier 2** | 30-39 | Strong fit — include in outreach sequence |
| **Tier 3** | 20-29 | Moderate fit — batch outreach, lower priority |
| **Tier 4** | 10-19 | Weak fit — only if they reach out |
| **Tier 5** | 0-9 | No fit — do not pursue |

---

## Research Checklist

For each investor, find:

- [ ] **Thesis statement** (from website/LinkedIn)
- [ ] **Stage focus** (pre-seed, seed, A, B, growth)
- [ ] **Typical check size** (if disclosed)
- [ ] **Gaming portfolio** (any game companies?)
- [ ] **Recent investments** (last 12 months)
- [ ] **Key decision maker** (partner name + contact)
- [ ] **Location** (HQ and investment geography)

---

## CRM Fields to Update

| Field | Type | Description |
|-------|------|-------------|
| `investorThesis` | string | Their stated investment thesis |
| `investorStage` | string | "pre-seed", "seed", "series-a", etc. |
| `typicalCheckSize` | string | "50-100K EUR", "500K-2M USD" |
| `portfolioGaming` | array | Gaming companies in portfolio |
| `lastInvestmentDate` | string | Most recent known investment |
| `thesisFitScore` | number | 0-5 |
| `stageFitScore` | number | 0-5 |
| `checkSizeFitScore` | number | 0-5 |
| `gamingExpertiseScore` | number | 0-5 |
| `activityScore` | number | 0-5 |
| `geographyFitScore` | number | 0-5 |
| `totalFitScore` | number | Weighted composite (max 55) |
| `investorTier` | string | "tier-1", "tier-2", "tier-3", "tier-4", "tier-5" |

---

## Example Scoring

### Example: BITKRAFT Ventures

| Dimension | Score | Reasoning |
|-----------|-------|-----------|
| Thesis | 5 | Gaming-dedicated fund |
| Stage | 4 | Seed to Series A |
| Check Size | 4 | $250K-2M typical |
| Gaming Expertise | 5 | 50+ gaming investments |
| Activity | 5 | Very active, multiple 2025 investments |
| Geography | 3 | US-based, invests globally |

**Total: (5×3) + (4×2) + (4×2) + (5×2) + (5×1) + (3×1) = 15 + 8 + 8 + 10 + 5 + 3 = 49 → Tier 1**

### Example: Generic European VC

| Dimension | Score | Reasoning |
|-----------|-------|-----------|
| Thesis | 2 | Generalist, mentions "digital" |
| Stage | 5 | Pre-seed/seed focused |
| Check Size | 5 | EUR 50-150K typical |
| Gaming Expertise | 0 | No gaming investments |
| Activity | 3 | 2 investments in 2025 |
| Geography | 4 | EU-based |

**Total: (2×3) + (5×2) + (5×2) + (0×2) + (3×1) + (4×1) = 6 + 10 + 10 + 0 + 3 + 4 = 33 → Tier 2**

---

*Last updated: 2026-03-05*
