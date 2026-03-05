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

---

## Phase 12: Lead Qualification Workflow

**Status**: Complete

**Date**: March 2, 2026

### Completed
- **Prospect/Lead Category**: Added LeadCategory type ('prospect' | 'lead') to distinguish unqualified prospects from qualified leads
- **Category Filter**: Added category filter dropdown to leads list (All Categories, Prospects, Leads)
- **Category Column**: Added category column to leads table with clickable badge for quick qualification
- **Qualify Button**: Added "Qualify" button to lead detail header for prospects
- **Default Prospect**: New leads default to 'prospect' category
- **Activity Tracking**: Category changes are logged in activity timeline
- **Auto-Priority Calculation**: Priority auto-calculates from fit score (7+ high, 4-6 medium, 1-3 low, 0 none)
- **Manual Override**: Users can manually override auto-calculated priority

### Key Files
- `src/types/lead.ts` - Added LeadCategory type and category field
- `src/contexts/ConfigContext.tsx` - Added categories config array
- `src/components/leads/LeadsTable.tsx` - Category column with click-to-qualify
- `src/components/leads/LeadsFilters.tsx` - Category filter dropdown
- `src/components/leads/LeadHeader.tsx` - Qualify button and category badge
- `src/components/forms/LeadForm.tsx` - Default to prospect, auto-priority calculation
- `src/components/forms/LeadBasicFields.tsx` - Category selector field
- `src/components/forms/LeadStudioFields.tsx` - Fit score helper text
- `src/lib/utils.ts` - calculatePriorityFromFitScore utility
- `src/pages/Leads.tsx` - handleQualify function
- `src/pages/LeadDetail.tsx` - Qualify handler

### Badge Colors
- **Prospect**: orange (warming up, needs qualification)
- **Lead**: teal (qualified, ready for pipeline progression)

### Priority Auto-Calculation Logic
- Fit Score 7-10 → High priority
- Fit Score 4-6 → Medium priority
- Fit Score 1-3 → Low priority
- Fit Score 0 or undefined → None

### Technical Notes
- Category field is optional, defaults to 'prospect' for backwards compatibility
- Priority auto-calculates when fit score changes in the form
- Manual priority change disables auto-calculation for that form session
- Fit score range normalized to 0-10 (form label and max updated)

---

## Phase 13: Newsletter System

**Status**: Complete

**Date**: March 2, 2026

### Completed
- **Newsletter Lists**: Created Customer Newsletter and Investor Newsletter lists with tag/lead-type filtering
- **Manual Subscriber Management**: Add/remove contacts manually from lists
- **Newsletter Compose Page**: Markdown editor with template variables and preview
- **Template Variables**: Support for {{name}}, {{firstName}}, {{company}}, {{unsubscribeUrl}}
- **Gmail Integration**: Sends newsletters via existing Gmail API connection
- **Open Tracking**: Pixel tracking for email opens
- **Click Tracking**: Link wrapping for click tracking
- **Unsubscribe Handling**: HTTP endpoint with simple confirmation page
- **Newsletter Stats**: Track total, sent, opened, clicked, unsubscribed
- **Cloud Functions**: sendNewsletter, newsletterOpen, newsletterClick, newsletterUnsubscribe

### Key Files
- `src/types/newsletter.ts` - Newsletter, NewsletterList, NewsletterRecipient types
- `src/hooks/useNewsletterLists.ts` - List management with auto-initialization
- `src/hooks/useNewsletters.ts` - Newsletter CRUD and send trigger
- `src/pages/Newsletters.tsx` - Main page with Lists/Drafts/Sent tabs
- `src/pages/NewsletterCompose.tsx` - Compose page with markdown editor
- `src/components/newsletters/MarkdownEditor.tsx` - Markdown textarea with preview
- `src/components/newsletters/ListCard.tsx` - List overview card
- `src/components/newsletters/ListEditor.tsx` - Edit list filters/subscribers
- `src/components/newsletters/CampaignCard.tsx` - Campaign stats display
- `src/components/newsletters/RecipientPreview.tsx` - Subscriber list table
- `functions/src/newsletter.ts` - Newsletter sending logic
- `functions/src/index.ts` - Added newsletter Cloud Functions

### Data Model
- **newsletterLists**: List configuration with filter rules and manual includes/excludes
- **newsletters**: Campaign content with status and stats
- **newsletterRecipients**: Individual recipient tracking
- **newsletterSendRequests**: Trigger documents for Cloud Functions
- **contacts.unsubscribedFrom**: Array of list IDs contact has unsubscribed from

### Technical Notes
- Default lists auto-created on first page load
- Subscriber computation: tag filter + lead type filter + manual includes - manual excludes - unsubscribed
- Rate limiting: 100ms delay between emails to avoid Gmail API limits
- Markdown converted to HTML in Cloud Function before sending
- Tracking uses base64url-encoded JSON with contactId, listId, newsletterId

---

## March 2, 2026 - Pipeline Card Cleanup

### Changes
- Simplified pipeline card layout to show only essential info:
  - Company name
  - Primary contact
  - Priority badge
  - Fit score (compact number or "N/A")
  - Location
- Removed tags display and email from cards
- Added `fitScore` field to `InvestorInfo` interface for parity with `StudioInfo`

### Files Modified
- `src/types/lead.ts` - Added fitScore to InvestorInfo
- `src/components/pipeline/PipelineCard.tsx` - Simplified card layout

---

## March 2, 2026 - Studio Pipeline: Qualified Lead Stage

### Changes
- Added "Qualified Lead" stage to studio pipeline between Researched and Contacted
- This stage represents when a user has decided a lead is worth pursuing
- New pipeline order: New Lead → Researched → **Qualified Lead** → Contacted → Meeting → Proposal → Negotiation → Won → Lost
- Added migration function to update existing pipelines
- Added migration button to Settings page under Pipeline Setup

### Files Modified
- `src/types/pipeline.ts` - Added Qualified Lead to DEFAULT_STUDIO_STAGES
- `src/lib/firestore.ts` - Updated initializeDefaultPipelines and added migrateStudioPipelineWithQualifiedLead
- `src/pages/Settings.tsx` - Added "Add Qualified Lead Stage" migration button

### Migration Required
For existing databases, run the migration from Settings → Pipeline Setup → "Add Qualified Lead Stage"

---

## March 2, 2026 - Multi-Factor Priority System

### Overview
Replaced the simple fitScore-only priority calculation with a multi-factor system that considers **Fit**, **Intent**, and **Recency**.

### Priority Formula
```
Priority Score = (Fit × 40%) + (Intent × 40%) + (Recency × 20%)
```

Score mapping:
- >= 7 → High (red)
- >= 4 → Medium (yellow)
- >= 1 → Low (blue)
- < 1 → None (gray)

### Component Scores

**Intent Score (0-10)** - Calculated from signals:
- `hasRequestedPricing`: +3 points
- `hasRequestedDemo`: +2 points
- `decisionTimeline` exists: +2 points
- `isDecisionMaker`: +2 points
- Inbound source (website/referral): +1 point

**Recency Score (0-10)** - Based on `lastContactedAt`:
- 0-7 days: 10
- 8-14 days: 8
- 15-30 days: 6
- 31-60 days: 4
- 61-90 days: 2
- 90+ days or never: 0

### New Features
- Intent signal checkboxes in lead form ("Requested pricing", "Requested demo")
- Priority breakdown popover on lead detail header showing all component scores
- Auto-calculation on save (respects manual override)
- Stored component scores (`intentScore`, `recencyScore`, `priorityScore`) for transparency

### Files Modified
- `src/types/lead.ts` - Added intent signal fields and score fields
- `src/lib/utils.ts` - Added calculation functions
- `src/components/forms/LeadQualificationFields.tsx` - Added intent checkboxes
- `src/components/forms/LeadForm.tsx` - Added qualification fields, auto-calculate on save
- `src/components/leads/LeadHeader.tsx` - Added priority breakdown popover

### Technical Notes
- Existing `calculatePriorityFromFitScore()` kept for backwards compatibility
- Manual priority changes disable auto-calculation for that form session
- Qualification fields section now rendered in LeadForm (was previously defined but unused)

---

## March 2, 2026 - Investor Database Import

### Summary
Imported 2,310 investors from VC database spreadsheets into the CRM.

### Data Sources
1. **VB_VC Europe Seed & Series A database.xlsx** - 2,563 rows
2. **Filtered_Angels_VCs_PreSeed.xlsx** - 329 rows (all duplicates of file 1)

### Import Results
- **2,310 investor leads** created
- **2,049 partner contacts** created from LinkedIn profiles
- **582 duplicates** skipped

### Import Script
Created one-time import script at `functions/src/importInvestors.ts`:
- Uses Firebase Admin SDK with application default credentials
- Extracts partner names from LinkedIn URLs
- Creates Contact entities and links them to leads
- Parses sectors into tags
- Duplicate detection by name/website
- Batch operations for performance (400 ops per batch)

### Data Mapping
| Excel Column | Lead Field |
|-------------|------------|
| VC Name | `name` |
| Websites | `website` |
| Country | `country`, `investor.hqRegion` |
| Investment Size | `investor.fundingPreferences` |
| Sectors | `investor.investmentFocus`, `tags` |
| General Email | `contact.email` |
| Rounds | `investor.type` |
| Country 1/2 | `investor.geographicalRegions` |
| Partners' LinkedIn | Separate Contact entities |

### Files Created
- `functions/src/importInvestors.ts` - Import script
- `functions/package.json` - Added xlsx, ts-node dependencies

---

## March 2, 2026 - Investor Card Enhancements

### Changes
- Added investor-specific fields to pipeline cards:
  - **Rounds** (`investor.type`) - e.g., "Pre-Seed, Seed, Series A"
  - **Investment Size** (`investor.fundingPreferences`) - e.g., "$100K - $5M"
- These fields only appear on investor leads, not studio leads

### Files Modified
- `src/components/pipeline/PipelineCard.tsx` - Added conditional investor fields

---

## March 2, 2026 - Fit Score Criteria System

### Overview
Replaced manual fit score input (0-10 slider) with a criteria-based rubric system. Users now check specific criteria checkboxes that auto-calculate to a fit score. Includes an "Other" field for custom adjustments with reason text.

### Studio Fit Criteria
| Criteria | Points | Description |
|----------|--------|-------------|
| Narrative-heavy genre | +3 | RPG, adventure, visual novel, story-driven |
| AI-positive attitude | +3 | Eager to use AI to innovate/scale production |
| Right size | +2 | Indie to AA studio (not solo, not massive AAA) |
| In active production | +1 | Currently making a game |
| Uses target engine | +1 | Unity or Unreal |
| Other | 0-10 | Custom adjustment with reason |

### Investor Fit Criteria
| Criteria | Points | Description |
|----------|--------|-------------|
| Pre-seed stage focus | +3 | Invests at pre-seed stage |
| Gaming sector active | +3 | Active in gaming/interactive entertainment |
| AI/Dev Tools thesis | +2 | Invests in AI, dev tools, or B2B SaaS |
| EU-based | +1 | EU-based or invests in EU |
| Relevant portfolio | +1 | Has gaming or dev tools portfolio companies |
| Other | 0-10 | Custom adjustment with reason |

### New Features
- Type-specific fit criteria checkboxes in studio/investor forms
- Real-time fit score calculation as checkboxes change
- "Other" field with reason text + score adjustment
- Score capped at 10 maximum
- Auto-syncs fitScore on mount when criteria exists

### New Type Interfaces
```typescript
interface StudioFitCriteria {
  narrativeHeavyGenre?: boolean;    // +3
  aiPositiveAttitude?: boolean;      // +3
  rightSize?: boolean;               // +2
  inActiveProduction?: boolean;      // +1
  usesTargetEngine?: boolean;        // +1
  otherScore?: number;               // 0-10
  otherReason?: string;              // Explanation
}

interface InvestorFitCriteria {
  preSeedFocus?: boolean;            // +3
  gamingSectorActive?: boolean;      // +3
  aiDevToolsThesis?: boolean;        // +2
  euBased?: boolean;                 // +1
  relevantPortfolio?: boolean;       // +1
  otherScore?: number;               // 0-10
  otherReason?: string;              // Explanation
}
```

### Files Modified
- `src/types/lead.ts` - Added StudioFitCriteria and InvestorFitCriteria interfaces, added fitCriteria field to StudioInfo and InvestorInfo
- `src/lib/utils.ts` - Added calculateStudioFitScore() and calculateInvestorFitScore() functions
- `src/components/forms/LeadStudioFields.tsx` - Rewrote with fit criteria checkboxes and Other field
- `src/components/forms/LeadInvestorFields.tsx` - Rewrote with fit criteria checkboxes and Other field

### Technical Notes
- Fit score auto-calculates when any criteria changes
- Score stored in both fitCriteria (breakdown) and fitScore (total) for backwards compatibility
- "Other" score clamped to 0-10 range
- Total score capped at 10 regardless of criteria sum
- useEffect syncs fitScore on component mount if criteria exists but score differs

---

## March 2, 2026 - CRM Enhancements (CSV Analysis)

### Overview
Based on analysis of external leads spreadsheet (SHARED - LoreWeaver - Client Leads - Studios.csv), implemented several features to better align the CRM with the team's actual workflow.

### New Features

#### 1. Publisher Lead Type
- Added 'publisher' as a new lead type alongside 'studio' and 'investor'
- Publishers share studio fields (size, games, focus, fit criteria) since they're evaluated similarly
- Lead detail page shows "Publisher Details" section for publisher leads

#### 2. Industry-Standard Studio Sizes
Replaced generic company size options with gaming industry standard:
| Value | Label |
|-------|-------|
| micro | Micro (1-3) |
| indie | Indie (3-15) |
| a | A (15-50) |
| aa | AA (50-250) |
| aaa | AAA (250+) |

#### 3. Multi-Owner Notes (Team Notes)
- New OwnerNotes component for lead detail page
- Each team member can have their own note with timestamp
- Notes keyed by author name, showing when last updated
- Color-coded avatars per owner (Rijk=blue, Collin=green, Stephan=purple, John=orange)
- Users can only edit their own notes

#### 4. Fit Tags
Added predefined fit tags matching the spreadsheet:
- Narrative Focus
- User of Similar Tools
- Prototyping
- Innovation
- Efficiency
- Emergent Narrative

Tags displayed as badges in studio form (toggle buttons) and on lead detail page.

#### 5. Manual Activity Logging
- New "Log Activity" button on activity timeline
- Modal to log calls, emails, meetings, demos, LinkedIn messages, other
- Activity types have distinct icons and colors:
  - Call: teal, Phone icon
  - Email: cyan, Mail icon
  - Meeting: indigo, Calendar icon
  - Demo: pink, Monitor icon
  - LinkedIn: sky blue, Linkedin icon
  - Other: slate, CircleDot icon

### New Types
```typescript
// Owner note structure
interface OwnerNote {
  author: string;
  content: string;
  updatedAt: Date;
}

// Studio size enum
type StudioSize = 'micro' | 'indie' | 'a' | 'aa' | 'aaa';

// Fit tags
type FitTag = 'Narrative Focus' | 'User of Similar Tools' | 'Prototyping'
            | 'Innovation' | 'Efficiency' | 'Emergent Narrative';

// Manual activity types
type ManualActivityType = 'call' | 'email' | 'meeting' | 'demo' | 'linkedin_message' | 'other';
```

### Files Created
- `src/components/leads/OwnerNotes.tsx` - Team notes component
- `src/components/activities/LogActivityModal.tsx` - Activity logging modal

### Files Modified
- `src/types/lead.ts` - Added OwnerNote, StudioSize, FitTag types; ownerNotes field on Lead; fitTags on StudioInfo
- `src/types/activity.ts` - Added manual activity types and labels
- `src/contexts/ConfigContext.tsx` - Added 'publisher' to lead types
- `src/components/forms/LeadForm.tsx` - Show studio fields for publishers
- `src/components/forms/LeadStudioFields.tsx` - Size dropdown, fit tags, isPublisher prop
- `src/components/leads/LeadStudioInfo.tsx` - Display fit tags, use size labels, support publishers
- `src/components/activities/ActivityTimeline.tsx` - New activity icons/colors, Log Activity button
- `src/components/leads/index.ts` - Export OwnerNotes
- `src/components/activities/index.ts` - Export LogActivityModal
- `src/pages/LeadDetail.tsx` - Integrated OwnerNotes, LogActivityModal, publisher studio info

### Technical Notes
- Publisher leads reuse StudioInfo since they share most attributes with studios
- Size field supports both new StudioSize enum and old string values for backwards compatibility
- OwnerNotes stored as array on lead document (not separate collection)
- Author name extracted from user email (before @)
- Activity logging uses existing createActivity() function

---

## March 4, 2026 - Community Lead Type & Channels Pipeline

### Overview
Added a new lead type "Community" for tracking distribution channels like Discord servers, Reddit communities, game jams, and other places to promote the Architect beta to indie developers and students.

### Why Communities Are Different
Unlike studio/publisher/investor leads (transactional relationships where you pitch → they buy/invest), communities are **distribution channels** where you provide value → members self-select into your beta. This requires different tracking: relationship progression, engagement quality, and attribution rather than deal stages.

### New Features

#### 1. Community Lead Type
- Added `community` as fourth lead type alongside studio, publisher, investor
- Community-specific fields:
  - **Platform**: Discord, Reddit, Twitter/X, YouTube, itch.io, Forum, Jam Organization, University, Association, Mastodon, Other
  - **Community Type**: Narrative Tools, Game Dev General, Engine-Specific, Writing/Worldbuilding, Student, Indie Platform, Jam Community, Other
  - **Estimated Reach**: Number of members/followers/participants
  - **Engagement Quality**: High/Medium/Low
  - **Access Method**: Public, Invite-only, Paid, Application-required
  - **Platform URL**: Direct link to the community
  - **Posting Rules**: Notes about self-promo rules, showcase channels
  - **Narrative Focus**: Boolean flag for IF/storytelling communities
  - **Referral Code**: Auto-generated for UTM attribution (e.g., `reddit-gamedev`)
  - **Beta Signups Attributed**: Manual counter for tracking conversions

#### 2. Community Fit Criteria
| Criteria | Points | Description |
|----------|--------|-------------|
| Narrative Focused | +3 | Specifically about narrative/IF/storytelling |
| Active Community | +3 | Regular posts, engaged members |
| Tool-Friendly | +2 | Welcomes tool showcases, has promo channels |
| Target Demographic | +2 | Indies, students, small teams |
| Large Reach | +1 | 10K+ members/followers |
| Low Saturation | +1 | Not flooded with competing tool announcements |
| Other | 0-10 | Custom adjustment with reason |

**Max score: 12** (vs 10 for other lead types)

#### 3. Channels Pipeline
New pipeline with relationship-focused stages:
1. **Identified** (gray) - We know this community exists
2. **Researched** (blue) - Investigated rules, activity level, fit
3. **Joined** (cyan) - We're a member, observing
4. **Participating** (yellow) - Contributing value (not promoting yet)
5. **Relationship Built** (orange) - Known to mods/key members
6. **Promotion Approved** (purple) - Green-lit to share Architect
7. **Active Channel** (indigo) - Regularly posting, getting traction
8. **High-Performing** (green) - Consistent beta signups
9. **Inactive** (red) - Community died, banned, or poor ROI

#### 4. Community-Specific Tags
Pre-created tags for community leads:
- `narrative-focused` - Core narrative/IF audience
- `high-engagement` - Very active community
- `jam-related` - Game jam organization
- `student-focused` - University/academic
- `tool-friendly` - Welcomes tool posts
- `quick-win` - Easy to post, low barrier
- `influencer-present` - Notable devs/YouTubers present
- `seasonal` - Only active at certain times
- `verified-active` - Confirmed still active
- `relationship-needed` - Need to build relationship first

#### 5. Attribution System
- Each community gets a unique `referralCode` (auto-generated from name + platform)
- Use in UTM parameters: `?ref=discord-renpy`
- Track `betaSignupsAttributed` manually (or via webhook later)
- Enables ROI calculation: `conversionRate = betaSignups / estimatedReach`

### New Type Interfaces
```typescript
type CommunityPlatform = 'discord' | 'reddit' | 'twitter' | 'youtube' | 'itch'
                       | 'forum' | 'jam-org' | 'university' | 'association'
                       | 'mastodon' | 'other';

type CommunityType = 'narrative-tools' | 'gamedev-general' | 'engine-specific'
                   | 'writing' | 'student' | 'indie-platform' | 'jam-community' | 'other';

interface CommunityFitCriteria {
  narrativeFocused?: boolean;     // +3
  activeCommunity?: boolean;      // +3
  toolFriendly?: boolean;         // +2
  targetDemographic?: boolean;    // +2
  largeReach?: boolean;           // +1
  lowSaturation?: boolean;        // +1
  otherScore?: number;            // 0-10
  otherReason?: string;
}

interface CommunityInfo {
  platform: CommunityPlatform;
  communityType: CommunityType;
  estimatedReach: number;
  engagementQuality: 'high' | 'medium' | 'low';
  accessMethod: 'public' | 'invite-only' | 'paid' | 'application';
  platformUrl: string;
  postingRules?: string;
  narrativeFocus: boolean;
  referralCode: string;
  betaSignupsAttributed: number;
  lastPostedAt?: Date;
  fitScore: number;
  fitCriteria?: CommunityFitCriteria;
  lastVerifiedAt?: Date;
}
```

### Files Created
- `src/components/forms/LeadCommunityFields.tsx` - Community-specific form fields

### Files Modified
- `src/types/lead.ts` - Added CommunityInfo, CommunityFitCriteria, CommunityPlatform, CommunityType
- `src/types/pipeline.ts` - Added 'community' to Pipeline type, DEFAULT_COMMUNITY_STAGES
- `src/lib/firestore.ts` - Added community to initializeDefaultPipelines, initializeCommunityPipeline, initializeCommunityTags
- `src/lib/utils.ts` - Added calculateCommunityFitScore
- `src/contexts/ConfigContext.tsx` - Added 'community' to defaultLeadTypes
- `src/hooks/usePipeline.ts` - Added getCommunityPipeline
- `src/components/forms/LeadForm.tsx` - Added LeadCommunityFields section
- `src/components/forms/index.ts` - Export LeadCommunityFields
- `src/components/leads/LeadCreateDialog.tsx` - Added 'community' to defaultType prop
- `src/components/leads/LeadsBulkActions.tsx` - Added community pipeline stages to bulk actions
- `src/pages/Settings.tsx` - Added "Add Community Features" button for existing databases

### Migration for Existing Databases
Run from Settings → Pipeline Setup → "Add Community Features" to:
1. Create the Channels pipeline
2. Create community-specific tags

### Technical Notes
- Community leads use existing Contact linking system for moderator/champion relationships
- Referral code auto-generates from community name + platform slug
- Fit score normalized to 0-10 range for priority calculation (even though max is 12)
- Priority auto-calculates from community fit score like other lead types

---

## March 5, 2026 - Server-Side Pagination Architecture

### Overview
Rebuilt the data fetching architecture to support 50k+ leads with server-side pagination. The old architecture loaded all leads into memory via Firestore real-time subscriptions, which caused slow page loads and would not scale.

### Architecture Changes

**Before (Problems):**
- `useLeads` hook loaded ALL leads via `onSnapshot()`
- Client-side filtering and sorting
- No pagination - entire dataset in memory
- Freezing on large datasets, high Firestore read costs

**After (Solution):**
- Express REST API in Cloud Functions with paginated endpoints
- TanStack Query for caching, polling (15s), and state management
- Server-side filtering, sorting, and pagination
- Page numbers with configurable page size (25/50/100)
- Firestore real-time only for single lead detail views

### New Backend Infrastructure

#### API Layer (`functions/src/api/`)
```
api/
├── index.ts                 # Express app with CORS, auth, error handling
├── middleware/
│   ├── auth.ts              # Firebase Auth token verification
│   ├── error-handler.ts     # Consistent error responses, ApiError class
│   └── validate.ts          # Zod request validation middleware
├── leads/
│   ├── leads.routes.ts      # Route definitions
│   ├── leads.controller.ts  # Request handlers
│   ├── leads.service.ts     # Business logic, Firestore queries
│   └── leads.schema.ts      # Zod validation schemas
└── shared/
    ├── types.ts             # Shared API types (PaginatedResponse, etc.)
    └── paginator.ts         # Generic pagination utility
```

#### API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/leads` | Paginated list with filters |
| GET | `/api/leads/:id` | Single lead |
| POST | `/api/leads` | Create lead |
| PATCH | `/api/leads/:id` | Update lead |
| DELETE | `/api/leads/:id` | Delete lead |
| GET | `/api/leads/stats` | Aggregated statistics |

### New Frontend Infrastructure

#### TanStack Query Setup (`src/lib/query.ts`)
- QueryClient with 15s stale time and polling interval
- Query key factory for consistent cache invalidation
- Automatic refetch on window focus

#### API Client (`src/api/client.ts`)
- Authenticated fetch wrapper using Firebase ID tokens
- TypeScript-safe request/response handling
- Error class for typed error handling

#### New Hooks
- `useLeadsList` - Paginated list with TanStack Query
- `useLeadDetail` - Single lead with Firestore real-time (for detail pages)
- `useLeadMutations` - Create/update/delete with cache invalidation

#### UI Components
- `Pagination` - Page numbers, first/last/prev/next, page size selector
- `LeadsPaginated` - New leads page using server-side pagination

### Dependencies Added

**Backend (functions/package.json):**
- express ^4.21.0
- cors ^2.8.5
- zod ^3.24.0
- @types/express, @types/cors

**Frontend (package.json):**
- @tanstack/react-query ^5.60.0
- @tanstack/react-query-devtools ^5.60.0

### Files Created
- `functions/src/api/**` - Complete API layer (12 files)
- `src/api/client.ts` - API client
- `src/api/leads.api.ts` - Leads API functions
- `src/api/index.ts` - API exports
- `src/lib/query.ts` - TanStack Query configuration
- `src/hooks/useLeadsList.ts` - Paginated list hook
- `src/hooks/useLeadDetail.ts` - Real-time detail hook
- `src/hooks/useLeadMutations.ts` - Mutation hooks
- `src/components/ui/pagination.tsx` - Pagination component
- `src/pages/LeadsPaginated.tsx` - New paginated leads page

### Files Modified
- `functions/src/index.ts` - Added API Cloud Function export
- `functions/package.json` - Added new dependencies
- `package.json` - Added TanStack Query
- `src/App.tsx` - Added QueryClientProvider, switched to LeadsPaginated

### Migration Notes
- Old `useLeads` hook and `Leads.tsx` preserved for reference
- New paginated system activated via App.tsx route change
- Old Firestore real-time subscription still used for lead detail page
- No database changes required - uses existing Firestore collections

### Performance Impact
- Initial page load: 50 leads instead of ALL leads
- Firestore reads: ~50/page instead of N (where N = total leads)
- Memory usage: Constant regardless of total lead count
- Polling: Every 15 seconds for fresh data

### Technical Notes
- Offset-based pagination works well up to ~50k documents
- For larger datasets, consider cursor-based pagination with `startAfter()`
- Search currently uses client-side filtering on server (fetches matching filter, then searches)
- For full-text search at scale, add Algolia or Typesense

---

## March 5, 2026 - Competition Lead Type & Pipeline

### Overview
Added a new lead type "Competition" for tracking competitor companies and products. This enables systematic competitive research to inform product strategy for both Architect and Director.

### Why Competition Tracking
Unlike other lead types that represent potential customers or partners, competition leads track companies that compete in the same space. This requires different tracking: product analysis, threat assessment, market positioning, and ongoing monitoring rather than relationship progression.

### New Features

#### 1. Competition Lead Type
- Added `competition` as fifth lead type alongside studio, publisher, investor, community
- Competition-specific fields:
  - **Products**: List of products they offer (array)
  - **Target Market**: Architect, Director, or Both
  - **Threat Level**: 1-5 scale (Minimal to Major Threat)
  - **Strengths**: List of competitive advantages
  - **Weaknesses**: List of vulnerabilities
  - **Differentiator**: What makes them different from us
  - **Funding Stage**: e.g., "Series A", "Bootstrapped"
  - **Team Size**: e.g., "10-50", "startup"
  - **Founded Year**: When the company was founded
  - **Website**: Competitor's website URL
  - **Pricing Info**: e.g., "$29/mo", "freemium", "enterprise"
  - **Last Checked**: When competitor was last researched
  - **Est. Paid Users**: Estimated number of paying customers
  - **Est. Free Users**: Estimated free tier users
  - **Est. Revenue**: Estimated annual revenue
  - **Amount Raised**: Total funding raised

#### 2. Competition Pipeline
New pipeline with research-focused stages:
1. **New** (gray) - Just identified, no research yet
2. **Researched** (blue) - Basic research completed, scored
3. **Tracking** (yellow) - Not direct competition, but worth monitoring
4. **Direct - Architect** (red) - Direct competitor to Architect product
5. **Direct - Director** (orange) - Direct competitor to Director product

#### 3. Priority Auto-Calculation
Priority auto-calculates from threat level:
- Threat Level 4-5 → High priority
- Threat Level 3 → Medium priority
- Threat Level 2 → Low priority
- Threat Level 1 → None

### New Type Interfaces
```typescript
type CompetitionTargetMarket = 'architect' | 'director' | 'both';

interface CompetitionInfo {
  // What they offer
  products: string[];
  targetMarket: CompetitionTargetMarket;

  // Assessment
  threatLevel: 1 | 2 | 3 | 4 | 5;
  strengths: string[];
  weaknesses: string[];

  // Context
  fundingStage?: string;
  teamSize?: string;
  foundedYear?: number;
  differentiator?: string;

  // Links & metrics
  website?: string;
  pricingInfo?: string;
  lastChecked?: Date;
  estimatedPaidUsers?: number;
  estimatedFreeUsers?: number;
  estimatedRevenue?: number;
  amountRaised?: number;
}
```

### Files Created
- `src/components/forms/LeadCompetitionFields.tsx` - Competition-specific form fields
- `src/components/leads/LeadCompetitionInfo.tsx` - Competition info display component

### Files Modified
- `src/types/lead.ts` - Added CompetitionInfo, CompetitionTargetMarket, updated Lead type
- `src/types/pipeline.ts` - Added 'competition' to Pipeline type, DEFAULT_COMPETITION_STAGES
- `src/lib/firestore.ts` - Added competition to initializeDefaultPipelines, initializeCompetitionPipeline
- `src/contexts/ConfigContext.tsx` - Added 'competition' to defaultLeadTypes
- `src/components/forms/LeadForm.tsx` - Added LeadCompetitionFields section
- `src/components/leads/index.ts` - Export LeadCompetitionInfo
- `src/components/layout/Sidebar.tsx` - Added Competition Pipeline to navigation (Shield icon)
- `src/pages/PipelineView.tsx` - Added competition URL mapping
- `src/pages/LeadDetail.tsx` - Added LeadCompetitionInfo display
- `src/pages/Settings.tsx` - Added "Add Competition Pipeline" button

### Migration for Existing Databases
Go to Settings > Pipeline Setup and click "Add Competition Pipeline" to add the Competition pipeline to existing databases. This button calls `initializeCompetitionPipeline()` and shows feedback on success/failure.

### Technical Notes
- Competition leads use existing Contact linking system for tracking key personnel
- Priority auto-calculates from threat level (1-5 scale maps to priority)
- Strengths/weaknesses stored as arrays, entered one per line in form
- Products displayed as badges in detail view
- Financial metrics formatted with K/M suffixes for readability
