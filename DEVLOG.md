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

### Integration Testing
- [ ] Set up Firebase emulator for tests
- [ ] Write integration tests for full workflows
- [ ] Generate coverage report

### Future Enhancements
- [x] Activity tracking system
- [x] Activity timeline component
- [x] Keyboard shortcuts (N=new lead, /=search, Esc=close)
- [x] Mobile-responsive pipeline columns
- [x] Touch-friendly drag handles
- [x] Code splitting for smaller bundle
- [x] Virtualization for large lead lists
- [x] Firestore security rules
- [x] Firebase deployment configuration
- [x] Lead duplicate detection
- [x] Improved bulk import validation
- [x] Dashboard charts (type, priority, stage distribution)
- [ ] Set up CI/CD (optional)
- [ ] E2E tests with Playwright

---

## Phase 9: UX Improvements

**Status**: Complete

### Completed
- Moved Firebase config to environment variables (.env file)
- Removed Firebase credentials from git history
- Added toast notification system using shadcn/ui Sonner
- Replaced console.error calls with user-facing error toasts
- Added ErrorBoundary component for graceful error handling
- Enhanced bulk actions with stage change dropdown
- Enhanced bulk actions with full priority dropdown
- Added search/filter bar to pipeline view
- Added quick action buttons to pipeline cards (view, edit, delete)
- Created reusable EmptyState component
- Added onboarding empty state for new users
- Created Tag type and Firestore schema
- Built TagManager UI in Settings page
- Added TagSelector component to lead forms
- Display tags on pipeline cards

### Key Files
- `.env` - Firebase credentials (gitignored)
- `.env.example` - Template for environment variables
- `src/lib/firebase.ts` - Updated to use environment variables
- `src/components/ui/sonner.tsx` - Toast component
- `src/components/common/ErrorBoundary.tsx` - Error boundary
- `src/components/common/EmptyState.tsx` - Reusable empty state
- `src/components/dashboard/OnboardingEmptyState.tsx` - New user onboarding
- `src/types/tag.ts` - Tag type and color definitions
- `src/hooks/useTags.ts` - Tags management hook
- `src/components/settings/TagManager.tsx` - Tag CRUD UI
- `src/components/forms/TagSelector.tsx` - Tag selector for leads
- `src/components/leads/LeadsBulkActions.tsx` - Enhanced bulk actions
- `src/components/pipeline/PipelineCard.tsx` - Added quick actions and tags
- `src/pages/PipelineView.tsx` - Added search functionality

### Technical Notes
- Tags are stored in Firestore 'tags' collection
- Lead tags stored as array of tag names (strings)
- Tags display limited to 2 on pipeline cards with +N indicator
- Environment variables use VITE_ prefix for client-side access

---

## Phase 10: Performance & Production Ready

**Status**: Complete

### Completed
- **Activity Tracking System**: Created Activity type, Firestore operations, and useActivityLogger hook
- **Activity Timeline**: Built ActivityTimeline component for lead detail page with icons and formatting
- **Keyboard Shortcuts**: Added N (new lead), / (search focus), Escape (close/clear) via useKeyboardShortcuts hook
- **Mobile Responsive Pipeline**: Pipeline columns stack vertically on mobile, horizontal scroll on desktop
- **Touch-Friendly Drag**: Added TouchSensor to @dnd-kit and GripVertical drag handles for mobile
- **Code Splitting**: Implemented React.lazy() for page components, reduced main bundle from ~1.37MB to ~294KB
- **Vendor Chunking**: Split vendor libraries (react, firebase, radix-ui, dnd-kit, xlsx, recharts)
- **List Virtualization**: Added @tanstack/react-virtual to LeadsTable for large dataset performance
- **Firestore Security Rules**: Created firestore.rules with user-based access control
- **Firebase Deployment Config**: Added firebase.json, .firebaserc, and deployment npm scripts
- **Duplicate Detection**: Created duplicate detection utility checking email, website domain, and name similarity
- **Import Validation**: Enhanced bulk import with validation issues, duplicate detection, and skip duplicates option
- **Dashboard Charts**: Added LeadsByTypeChart, LeadsByPriorityChart, LeadsByStageChart using recharts

### Key Files
- `src/types/activity.ts` - Activity type definitions
- `src/hooks/useActivities.ts` - Activity logging hook
- `src/components/activities/ActivityTimeline.tsx` - Activity timeline component
- `src/hooks/useKeyboardShortcuts.ts` - Global keyboard shortcut handler
- `src/lib/duplicateDetection.ts` - Duplicate detection utility
- `src/hooks/useDuplicateDetection.ts` - Duplicate detection hook
- `src/components/dashboard/LeadsByTypeChart.tsx` - Pie chart for lead types
- `src/components/dashboard/LeadsByPriorityChart.tsx` - Pie chart for priorities
- `src/components/dashboard/LeadsByStageChart.tsx` - Bar chart for pipeline stages
- `firestore.rules` - Firestore security rules
- `firebase.json` - Firebase hosting configuration
- `vite.config.ts` - Added manual chunks for vendor splitting

### Build Statistics
- Main bundle: 298 kB (gzip: 91 kB)
- vendor-react: 47 kB
- vendor-firebase: 337 kB
- vendor-ui: 113 kB
- vendor-dnd: 49 kB
- vendor-xlsx: 424 kB
- vendor-charts: 361 kB
- Build time: ~14 seconds

### Technical Notes
- Virtualization threshold set to 50 rows (below uses standard rendering)
- Keyboard shortcuts disabled in input fields except Escape
- Duplicate detection uses Levenshtein distance for name similarity (0.7 threshold)
- Security rules enforce user-based access via createdBy/userId fields
- Charts use recharts library with custom tooltip styling

---

## Phase 11: Contact Book

**Status**: Complete

**Date**: February 28, 2026

### Completed
- **Contact Type & Schema**: Created Contact and LeadContactLink types for many-to-many relationships
- **Firestore Operations**: Added full CRUD operations for contacts and lead-contact links
- **Contact Hooks**: Created useContacts and useLeadContacts hooks with real-time updates
- **Contacts Page**: Built /contacts page with table, search, and tag filtering
- **Contact Form**: Built reusable ContactForm component with validation
- **Contact Dialogs**: Created ContactCreateDialog and ContactEditDialog
- **Link Contact Dialog**: Built LinkContactDialog for linking existing contacts to leads
- **Lead Contacts Section**: Built LeadContacts component showing linked contacts on lead detail
- **Primary Contact**: Support for designating a primary contact per lead
- **Migration Function**: Created migrateEmbeddedContacts to convert existing lead.contact to Contact entities
- **Sidebar Navigation**: Added Contacts to main navigation
- **Security Rules**: Added Firestore rules for contacts and leadContacts collections

### Key Files
- `src/types/contact.ts` - Contact and LeadContactLink type definitions
- `src/hooks/useContacts.ts` - Contacts management hook
- `src/hooks/useLeadContacts.ts` - Lead-contact links hook
- `src/pages/Contacts.tsx` - Contacts list page
- `src/components/contacts/ContactForm.tsx` - Reusable contact form
- `src/components/contacts/ContactsTable.tsx` - Contacts list table
- `src/components/contacts/ContactCreateDialog.tsx` - Create contact dialog
- `src/components/contacts/ContactEditDialog.tsx` - Edit contact dialog
- `src/components/contacts/LinkContactDialog.tsx` - Link contact to lead dialog
- `src/components/contacts/LeadContacts.tsx` - Contacts section for lead detail
- `firestore.rules` - Updated with contacts and leadContacts rules

### Data Model
- **contacts** collection: Standalone contact entities with name, email, company, tags
- **leadContacts** junction collection: Links contacts to leads with isPrimary flag and role
- Supports many-to-many: one contact can be linked to multiple leads
- Supports primary contact designation per lead

### Technical Notes
- Contact email used as deduplication key during migration
- LeadContactLink stores relationship metadata (isPrimary, role specific to that lead)
- When setting a contact as primary, other contacts for that lead are automatically unset
- Deleting a contact removes all its lead links via batch operation
- Existing lead.contact field preserved for backwards compatibility
