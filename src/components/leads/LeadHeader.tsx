import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, ExternalLink, Building, DollarSign } from 'lucide-react';
import type { Lead } from '@/types/lead';

interface LeadHeaderProps {
  lead: Lead;
  onEdit: () => void;
  onDelete: () => void;
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

export const LeadHeader: React.FC<LeadHeaderProps> = ({ lead, onEdit, onDelete }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/leads">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              {lead.type === 'studio' ? (
                <Building className="h-6 w-6 text-primary" />
              ) : (
                <DollarSign className="h-6 w-6 text-primary" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{lead.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className={typeColors[lead.type]}>
                  {lead.type}
                </Badge>
                <Badge variant="secondary" className={priorityColors[lead.priority]}>
                  {lead.priority} priority
                </Badge>
                <span className="text-sm text-muted-foreground capitalize">
                  {lead.status}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {lead.website && (
            <Button variant="outline" size="sm" asChild>
              <a href={lead.website} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Website
              </a>
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={onDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
