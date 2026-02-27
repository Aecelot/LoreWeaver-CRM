# LoreWeaver-CRM

A modern CRM application for managing game studio and investor leads, built with React 19, TypeScript, Tailwind CSS, and Firebase.

## Features

### Core Functionality
- **Lead Management**: Create, edit, and delete leads with full CRUD operations
- **Two Lead Types**: Support for both studio and investor leads with type-specific fields
- **Pipeline Kanban**: Drag-and-drop Kanban board for visual pipeline management
- **Notes System**: Add, edit, and delete notes on leads with status indicators (cold/warm/hot)
- **Dashboard**: Overview with stats, recent leads, and activity feed

### Data Management
- **Import**: Import leads from Excel (.xlsx, .xls) or CSV files with preview and validation
- **Export**: Export leads to Excel with filtering options (by type, include/exclude notes)

### User Interface
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Dark Mode**: Full dark theme support
- **Responsive**: Works on desktop and tablet devices
- **Real-time Updates**: Firestore real-time listeners for live data sync

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui |
| Routing | React Router 7 |
| State | Custom hooks with Firestore |
| Drag & Drop | @dnd-kit |
| Database | Firebase Firestore |
| Auth | Firebase Authentication |
| Excel I/O | xlsx |
| Testing | Vitest + Testing Library |

## Project Structure

```
src/
├── components/
│   ├── dashboard/      # Dashboard widgets (StatsCards, RecentLeads, etc.)
│   ├── forms/          # Lead form components
│   ├── layout/         # App layout (TopBar, Sidebar, etc.)
│   ├── leads/          # Lead-related components (table, detail, dialogs)
│   ├── notes/          # Notes system components
│   ├── pipeline/       # Kanban board components
│   ├── settings/       # Settings page components (Export/Import dialogs)
│   └── ui/             # shadcn/ui base components
├── contexts/           # React contexts (Auth, Config)
├── hooks/              # Custom hooks (useLeads, usePipeline, useNotes, etc.)
├── lib/                # Utilities (firebase, firestore, stages, validators)
├── pages/              # Page components
└── types/              # TypeScript type definitions
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase project with Firestore and Authentication enabled

### Installation

1. Clone the repository:
```bash
git clone https://github.com/neoliminal/LoreWeaver-CRM.git
cd LoreWeaver-CRM
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a `.env` file with your Firebase config
   - Or update `src/lib/firebase.ts` with your project credentials

4. Start development server:
```bash
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run tests |
| `npm run lint` | Run ESLint |

## Implementation Status

| Phase | Feature | Status |
|-------|---------|--------|
| 1 | Foundation & Routing | Complete |
| 2 | Dashboard | Complete |
| 3 | Leads List | Complete |
| 4 | Lead CRUD & Forms | Complete |
| 5 | Pipeline Kanban | Complete |
| 6 | Notes System | Complete |
| 7 | Settings & Export | Complete |
| 8 | Import | Complete |
| 9 | Integration Testing | Pending |
| 10 | Firebase Deployment | Pending |

## Data Model

### Lead
```typescript
interface Lead {
  id: string;
  name: string;
  type: 'studio' | 'investor';
  status: string;
  priority: 'high' | 'medium' | 'low' | 'none';
  owner: string;
  contact: LeadContact;
  website: string;
  country: string;
  location: string;
  notes: string;
  tags: string[];
  pipeline: PipelineInfo;
  studio?: StudioInfo;     // For studio leads
  investor?: InvestorInfo; // For investor leads
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
}
```

### Note
```typescript
interface Note {
  id: string;
  leadId: string;
  content: string;
  status: 'cold' | 'warm' | 'hot';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
}
```

## License

MIT
