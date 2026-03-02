# LoreWeaver Product Features Overview — Q1 2026

*Generated 2026-03-02 from GitHub commit history analysis*

---

## Director (Narrative Engine)

### Core Architecture — ✅ BETA READY

| Component | Status | Description |
|-----------|--------|-------------|
| **LoreWeaver Pipeline** | ✅ Beta | Main request/response processing |
| **Local LLM Server** | ✅ Beta | llama.cpp + CUDA integration, prompt caching |
| **OpenRouter Fallback** | ✅ Beta | Cloud API support for testing |
| **XML/JSON Validation** | ✅ Beta | Strict schema validation with lenient mode |
| **YAML Config System** | ✅ Beta | Replaced PowerShell scripts with config.yaml |

### Modules — 🔶 IN TESTING

| Module | Status | Description |
|--------|--------|-------------|
| **Character Cards** | ✅ Beta | XML-based NPC definitions, auto-injection |
| **NPC Module** | 🔶 Testing | Character loading and state management |
| **Plot Module** | 🔶 Testing | Arc/Beat narrative state machine |
| **Arc Generator** | 🔶 Testing | Async LLM-powered narrative generation |
| **Lore Module** | 🔶 Testing | Entity and narrative content |

### Plot Module Features — 🔶 IN TESTING

| Feature | Status | Description |
|---------|--------|-------------|
| Emergent Mode | 🔶 Testing | LLM generates arcs from game state |
| Structured Mode | 🔶 Testing | Predefined narrative paths |
| Hybrid Mode | 🔷 Prototype | Mix of authored + generated |
| Generic Trigger System | 🔶 Testing | Conditions on ANY game state param |
| Async Arc Generation | 🔶 Testing | Non-blocking background generation |
| Beat Progression | 🔶 Testing | State machine for narrative beats |
| Context Injection | ✅ Beta | XML context building for prompts |

### Evaluation Framework — ✅ BETA READY

| Tier | Status | Description |
|------|--------|-------------|
| Tier 1: Exact Match | ✅ Beta | Schema + value matching |
| Tier 2: Fuzzy Parser | ✅ Beta | Lenient XML/JSON parsing |
| Tier 3: Valid Answer | ✅ Beta | Valid response structure |
| Tier 4: LLM Judge | ✅ Beta | 96% pass rate, intent matching |
| Tier 5: Qualitative | ✅ Beta | 8.58/10 overall score |
| Batch Test Suites | ✅ Beta | XML-defined test cases |
| Persistent Storage | ✅ Beta | Eval results database |

### Frontend (Testing Interface) — ✅ BETA READY

| Feature | Status | Description |
|---------|--------|-------------|
| Request/Response UI | ✅ Beta | Test Director API |
| Evaluation Dashboard | ✅ Beta | Run and view eval results |
| Tabbed Response/History | ✅ Beta | Session history tracking |
| Settings Panel | ✅ Beta | Module toggles, model selection |
| Local/Cloud Toggle | ✅ Beta | Switch inference providers |

### Recent Commits (Jan-Mar 2026)

```
✅ feat: integrate prompt_builder setting into pipeline
✅ feat: add structured prompts with enhanced prompting patterns
✅ add batch evaluation test suites module
✅ evaluation: accumulate results across batch runs
✅ restructure UI: tabbed response/history + permanent settings panel
✅ add persistent evaluation storage with backend API
✅ add frontend testing interface with evaluation suite
✅ reorganize project structure: src/ -> backend/, add frontend/
✅ add optimization work, tests, docs, and prompt templates
✅ optimize llama-server config and enable prompt caching
✅ add v2 endpoint with lenient validation and training format support
✅ add generic trigger system and predefined narrative content
✅ add plot module - narrative generator and state machine
✅ add logging system, character card injection, and npc-module
```

---

## Architect (Authoring Tool)

### Core Features — ✅ PRODUCTION (v0.3.2)

| Feature | Status | Description |
|---------|--------|-------------|
| **Entity Management** | ✅ Production | CRUD for characters, locations, items, etc. |
| **Schema Management** | ✅ Production | Custom entity types and fields |
| **Project Selection** | ✅ Production | Multi-project support |
| **Login/Auth** | ✅ Production | User authentication |
| **XML Lore Upload** | ✅ Production | Import existing lore |

### Narrative Features — 🔶 IN TESTING

| Feature | Status | Description |
|---------|--------|-------------|
| **Story Board** | 🔶 Testing | Visual narrative editing |
| **Narrative Board** | 🔶 Testing | Arc/Beat visualization |
| **Story Editor** | 🔶 Testing | Text-based story editing |
| **World Builder** | 🔶 Testing | Location/world management |
| **Designer View** | 🔶 Testing | Overview dashboard |

### Graph/Visual Features — 🔶 IN TESTING

| Feature | Status | Description |
|---------|--------|-------------|
| Graph Canvas | 🔶 Testing | Node-based visualization |
| Selection Box | 🔶 Testing | Multi-select with performance optimization |
| Edge Resize Handles | 🔶 Testing | Connection editing |
| Infinite Grid | 🔶 Testing | Virtualized pan/zoom |
| Node Text Sizing | ✅ Beta | Auto-sizing text |
| Delete Key Support | ✅ Beta | Keyboard shortcuts |

### LLM Features — 🔶 IN TESTING

| Feature | Status | Description |
|---------|--------|-------------|
| Entity Generation | 🔶 Testing | Generate entities from examples |
| Entity Extraction | 🔶 Testing | Extract from uploaded text |
| LLM Task Queue | 🔶 Testing | Background processing |
| LLM Monitor | 🔶 Testing | Progress tracking UI |
| Edit Locking | 🔶 Testing | Prevent edits during LLM tasks |

### Schema Features — 🔶 IN TESTING

| Feature | Status | Description |
|---------|--------|-------------|
| Core Fields Enforcement | 🔶 Testing | Required fields per type |
| Entity Propagation | 🔶 Testing | Field changes cascade |
| Delete Field Modal | 🔶 Testing | Safe field removal |
| Manual Entity Type Creation | 🔶 Testing | Custom types |
| Field Auto-scroll | ✅ Beta | Navigate to selected field |

### UI/UX — ✅ PRODUCTION

| Feature | Status | Description |
|---------|--------|-------------|
| Settings Tabs | ✅ Production | Organized preferences |
| Customizable Colors | ✅ Production | Theme customization |
| Narrative Background Color | ✅ Production | Visual customization |
| Entity View Improvements | ✅ Production | Better table layout |
| Global Escape Key | ✅ Production | Keyboard navigation |
| Media Panel | 🔷 Prototype | Image/sound management (disabled) |

### Recent Commits (Jan-Mar 2026)

```
✅ feat: add LLM task polling with edit locking, UI improvements
✅ fix: add XML lore upload support and fix PostgreSQL chunks query
✅ feat(schema): add entity propagation for field changes and DeleteFieldModal
✅ feat(schema): enforce core fields and add manual entity type creation
✅ feat(ui): add customizable colors and UI improvements
✅ Add entity generation from examples feature
✅ feat(ui): v0.3.2 - UI polish and cleanup
✅ feat(graph): optimize selection box performance and add edge resize handles
✅ Add Story Board feature and enhance Arc node functionality
✅ Optimize GraphCanvas performance with virtualization and infinite grid
✅ Add Media Panel to Narrative Board for image/sound management
```

---

## Summary by Status

### ✅ BETA/PRODUCTION READY

**Director:**
- Core pipeline + validation
- Local LLM server (llama.cpp)
- Character Cards
- 5-Tier Evaluation Framework
- Frontend testing UI

**Architect:**
- Entity Management (v0.3.2)
- Schema Management
- Project system
- UI/UX polish

### 🔶 IN TESTING

**Director:**
- Plot Module (emergent narratives)
- NPC Module
- Arc Generator
- Generic Trigger System

**Architect:**
- Story/Narrative Boards
- Graph visualization
- LLM entity generation
- Schema propagation

### 🔷 PROTOTYPE

**Director:**
- Hybrid narrative mode

**Architect:**
- Media Panel (disabled)
- Audio support (designed, not implemented)

---

## Tech Debt / Known Issues

**Director:**
- llama.cpp version requirements need documentation
- Some circular dependency issues resolved but fragile

**Architect:**
- AI Branch features temporarily disabled
- PostgreSQL chunks query had issues (fixed)
- LLM task orphaning on restart (fixed)

---

*This document should be updated monthly as features ship.*
