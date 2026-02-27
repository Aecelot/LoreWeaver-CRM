# LoreWeaver-CRM Development Log

## Project Timeline

Development started by adapting patterns from `crm_custom` (React Admin + Material UI) to a modern stack (React 19 + Tailwind + shadcn/ui).

---

## Phase 1: Foundation & Routing

**Status**: Complete

### Completed
- Set up Vitest + Testing Library in `/tests` folder
- Configured React Router 7 with protected routes
- Created AuthContext for Firebase authentication
- Created ConfigContext for app configuration
- Implemented redirect to login for unauthenticated users
- Added path aliases to tsconfig.app.json

### Key Files
- `src/App.tsx` - Main app with routing
- `src/contexts/AuthContext.tsx` - Authentication context
- `src/contexts/ConfigContext.tsx` - App configuration
- `tests/setup.ts` - Test configuration

### Technical Notes
- Using `verbatimModuleSyntax` requires `import type` for type-only imports
- Path aliases configured in both `tsconfig.app.json` and Vite config

---

## Phase 2: Dashboard

**Status**: Complete

### Completed
- Created Dashboard page with stats overview
- Built StatsCards component showing lead counts by type/priority
- Built RecentLeads component showing latest leads
- Built PipelineSummary component showing stage distribution
- Built ActivityFeed component for recent actions
- Added activity tracking to Firestore operations

### Key Files
- `src/pages/Dashboard.tsx`
- `src/components/dashboard/StatsCards.tsx`
- `src/components/dashboard/RecentLeads.tsx`
- `src/components/dashboard/PipelineSummary.tsx`
- `src/components/dashboard/ActivityFeed.tsx`

---

## Phase 3: Leads List

**Status**: Complete

### Completed
- Created Leads list page with data table
- Implemented filtering by type, status, priority
- Implemented search by name/email
- Connected TopBar search to leads filter
- Added shadcn/ui Table, Select, Dialog components

### Key Files
- `src/pages/Leads.tsx`
- `src/components/leads/LeadsTable.tsx`
- `src/components/leads/LeadsFilters.tsx`

---

## Phase 4: Lead CRUD & Forms

**Status**: Complete

### Completed
- Created Lead detail page with all sections
- Built LeadHeader with actions (edit, delete)
- Built LeadContactInfo, LeadStudioInfo, LeadInvestorInfo sections
- Created form components for lead creation/editing
- Implemented form validation with zod
- Created LeadCreateDialog and LeadEditDialog
- Added LinkedIn URL validation

### Key Files
- `src/pages/LeadDetail.tsx`
- `src/components/leads/LeadHeader.tsx`
- `src/components/leads/LeadContactInfo.tsx`
- `src/components/leads/LeadStudioInfo.tsx`
- `src/components/leads/LeadInvestorInfo.tsx`
- `src/components/forms/LeadForm.tsx`
- `src/lib/validators.ts`

---

## Phase 5: Pipeline Kanban

**Status**: Complete

### Completed
- Created `getLeadsByStage` utility for grouping leads
- Built PipelineBoard with @dnd-kit DndContext
- Built PipelineColumn using useDroppable
- Built PipelineCard using useSortable
- Implemented drag-and-drop between stages
- Added optimistic updates with rollback on error
- Created drag overlay for visual feedback

### Key Files
- `src/lib/stages.ts` - Stage grouping utilities
- `src/components/pipeline/PipelineBoard.tsx`
- `src/components/pipeline/PipelineColumn.tsx`
- `src/components/pipeline/PipelineCard.tsx`
- `src/pages/PipelineView.tsx`

### Technical Notes
- Converted from @hello-pangea/dnd (React Admin) to @dnd-kit
- @dnd-kit uses `useSortable` for items that are both draggable and droppable
- DndContext requires sensors configuration for mouse/touch/keyboard
- Optimistic updates update local state before Firestore, rollback on error

---

## Phase 6: Notes System

**Status**: Complete

### Completed
- Created Note type with status field (cold/warm/hot)
- Added note CRUD operations to firestore.ts
- Built useNotes hook with real-time updates
- Built NotesList component with add/edit/delete dialogs
- Built NoteCard for individual note display
- Built NoteForm for create/edit
- Built NoteStatusBadge for status indicators
- Integrated notes into LeadDetail page

### Key Files
- `src/types/note.ts`
- `src/hooks/useNotes.ts`
- `src/components/notes/NotesList.tsx`
- `src/components/notes/NoteCard.tsx`
- `src/components/notes/NoteForm.tsx`
- `src/components/notes/NoteStatusBadge.tsx`

---

## Phase 7: Settings & Export

**Status**: Complete

### Completed
- Created Settings page with profile section
- Built ExportDialog with type filtering
- Created useExport hook using xlsx library
- Export includes lead fields, type-specific fields, timestamps
- Optional notes inclusion in export
- Auto-fit column widths in Excel output

### Key Files
- `src/pages/Settings.tsx`
- `src/hooks/useExport.ts`
- `src/components/settings/ExportDialog.tsx`

---

## Phase 8: Import

**Status**: Complete

### Completed
- Created useImport hook for parsing Excel/CSV
- Built ImportDialog with file upload
- Implemented preview before import
- Added validation for required fields (name, email)
- Shows invalid rows count and details
- Import creates leads with default pipeline stage
- Progress and error reporting

### Key Files
- `src/hooks/useImport.ts`
- `src/components/settings/ImportDialog.tsx`

### Technical Notes
- Uses xlsx library for parsing both .xlsx and .csv
- Normalizes field names (handles multiple naming conventions)
- Type normalization: "investor"/"investors" -> "investor", default -> "studio"
- Priority normalization: handles "med" -> "medium"
- Tags parsing: splits comma-separated string

---

## Technical Challenges Resolved

### 1. Tailwind CSS v4 Migration
**Issue**: PostCSS plugin errors with Tailwind v4

**Solution**:
- Install `@tailwindcss/postcss`
- Update postcss.config.js to use new plugin
- Replace `@tailwind` directives with `@import "tailwindcss"`
- Use `@theme` block for CSS variables

### 2. Type-Only Imports (verbatimModuleSyntax)
**Issue**: TypeScript errors on regular imports for types

**Solution**: Use `import type { X } from 'module'` for all type-only imports

### 3. Path Aliases
**Issue**: `@/*` imports not resolving

**Solution**: Add to tsconfig.app.json:
```json
"baseUrl": ".",
"paths": {
  "@/*": ["./src/*"]
}
```

### 4. @dnd-kit Type Exports
**Issue**: Missing type exports from @dnd-kit/core

**Solution**: Import types separately:
```typescript
import type { DragEndEvent, DragOverEvent } from '@dnd-kit/core';
```

### 5. Test Mock Configuration
**Issue**: Firestore mock functions not returning proper types

**Solution**: Use mockResolvedValue for async functions:
```typescript
initializeDefaultPipelines: vi.fn().mockResolvedValue(['id1', 'id2'])
```

---

## Build Statistics

**Final Build** (Phase 8 complete):
- Modules transformed: 2,193
- CSS output: 40.63 kB (gzip: 7.97 kB)
- JS output: 1,272.10 kB (gzip: 405.85 kB)
- Build time: ~13-15 seconds

**Note**: Bundle size warning (>500kB) - recommend code splitting for production.

---

## Remaining Work

### Phase 9: Integration Testing
- [ ] Set up Firebase emulator for tests
- [ ] Write integration tests for full workflows
- [ ] Generate coverage report

### Phase 10: Firebase Deployment
- [ ] Configure production Firebase credentials
- [ ] Create Firestore security rules
- [ ] Deploy to Firebase Hosting
- [ ] Set up CI/CD (optional)

### Future Enhancements
- [ ] Bulk actions on leads list
- [ ] Tags filtering and management
- [ ] Keyboard shortcuts
- [ ] Code splitting for smaller bundle
- [ ] Virtualization for large lead lists
