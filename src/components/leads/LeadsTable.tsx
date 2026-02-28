import React from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Building, DollarSign, ExternalLink, Users } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { EmptyState } from '@/components/common';
import type { Lead } from '@/types/lead';

interface LeadsTableProps {
  leads: Lead[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  loading?: boolean;
}

const priorityColors: Record<string, string> = {
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  none: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
};

const typeColors: Record<string, string> = {
  studio: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  investor: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
};

const icpColors: Record<string, string> = {
  architect: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  director: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  both: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  none: 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400',
};

// Helper to extract ICP from tags
const getICP = (tags?: string[]): { type: 'architect' | 'director' | 'both' | 'none'; label: string } => {
  if (!tags) return { type: 'none', label: '—' };
  const hasArchitect = tags.includes('architect-icp');
  const hasDirector = tags.includes('director-icp');
  if (hasArchitect && hasDirector) return { type: 'both', label: 'Both' };
  if (hasArchitect) return { type: 'architect', label: 'Architect' };
  if (hasDirector) return { type: 'director', label: 'Director' };
  return { type: 'none', label: '—' };
};

export const LeadsTable: React.FC<LeadsTableProps> = ({
  leads,
  selectedIds,
  onSelectionChange,
  loading,
}) => {
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      onSelectionChange(leads.map((lead) => lead.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedIds, id]);
    } else {
      onSelectionChange(selectedIds.filter((selectedId) => selectedId !== id));
    }
  };

  const allSelected = leads.length > 0 && selectedIds.length === leads.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < leads.length;

  if (loading) {
    return (
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Fit</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Added</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((i) => (
              <TableRow key={i}>
                <TableCell><div className="h-4 w-4 bg-muted animate-pulse rounded" /></TableCell>
                <TableCell><div className="h-4 w-32 bg-muted animate-pulse rounded" /></TableCell>
                <TableCell><div className="h-4 w-16 bg-muted animate-pulse rounded" /></TableCell>
                <TableCell><div className="h-4 w-20 bg-muted animate-pulse rounded" /></TableCell>
                <TableCell><div className="h-4 w-24 bg-muted animate-pulse rounded" /></TableCell>
                <TableCell><div className="h-4 w-16 bg-muted animate-pulse rounded" /></TableCell>
                <TableCell><div className="h-4 w-16 bg-muted animate-pulse rounded" /></TableCell>
                <TableCell><div className="h-4 w-20 bg-muted animate-pulse rounded" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="border rounded-lg">
        <EmptyState
          icon={Users}
          title="No leads found"
          description="Try adjusting your filters or add a new lead to get started."
        />
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={allSelected}
                ref={(el) => {
                  if (el) (el as HTMLInputElement).indeterminate = someSelected;
                }}
                onChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Fit</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Added</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => {
            const createdAt = lead.createdAt instanceof Date
              ? lead.createdAt
              : lead.createdAt?.toDate?.() ?? new Date();
            const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true });
            const isSelected = selectedIds.includes(lead.id);

            return (
              <TableRow key={lead.id} data-state={isSelected ? 'selected' : undefined}>
                <TableCell>
                  <Checkbox
                    checked={isSelected}
                    onChange={(e) => handleSelectOne(lead.id, e.target.checked)}
                  />
                </TableCell>
                <TableCell>
                  <Link
                    to={`/leads/${lead.id}`}
                    className="flex items-center gap-2 font-medium hover:underline"
                  >
                    {lead.type === 'studio' ? (
                      <Building className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    )}
                    {lead.name}
                  </Link>
                  {lead.website && (
                    <a
                      href={lead.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {new URL(lead.website).hostname}
                    </a>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={typeColors[lead.type]}>
                    {lead.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  {(() => {
                    const icp = getICP(lead.tags);
                    const fitScore = lead.studio?.fitScore;
                    return (
                      <div className="flex items-center gap-2">
                        {fitScore !== undefined && (
                          <span className={`font-bold ${fitScore >= 85 ? 'text-green-600' : fitScore >= 70 ? 'text-yellow-600' : 'text-gray-500'}`}>
                            {fitScore}
                          </span>
                        )}
                        <Badge variant="secondary" className={icpColors[icp.type]}>
                          {icp.label}
                        </Badge>
                      </div>
                    );
                  })()}
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{lead.contact.name}</p>
                    <p className="text-xs text-muted-foreground">{lead.contact.role}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={priorityColors[lead.priority]}>
                    {lead.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="capitalize">{lead.status}</span>
                </TableCell>
                <TableCell>
                  <span className="text-muted-foreground">{timeAgo}</span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
