import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, DollarSign, Mail, MapPin } from 'lucide-react';
import type { Lead } from '@/types/lead';

interface PipelineCardProps {
  lead: Lead;
  isDragging?: boolean;
}

const priorityColors: Record<string, string> = {
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  none: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
};

export const PipelineCard: React.FC<PipelineCardProps> = ({ lead, isDragging }) => {
  const navigate = useNavigate();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({
    id: lead.id,
    data: {
      type: 'lead',
      lead,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isCurrentlyDragging = isDragging || isSortableDragging;

  const handleClick = () => {
    // Don't navigate if we're dragging
    if (!isCurrentlyDragging) {
      navigate(`/leads/${lead.id}`);
    }
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`mb-2 cursor-grab active:cursor-grabbing transition-all ${
        isCurrentlyDragging
          ? 'opacity-50 rotate-2 shadow-lg scale-105'
          : 'hover:shadow-md'
      }`}
      onClick={handleClick}
    >
      <CardContent className="p-3">
        <div className="flex items-start gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
            {lead.type === 'studio' ? (
              <Building className="h-4 w-4 text-primary" />
            ) : (
              <DollarSign className="h-4 w-4 text-primary" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm truncate">{lead.name}</h4>
            <p className="text-xs text-muted-foreground truncate">
              {lead.contact?.name || 'No contact'}
            </p>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap gap-1">
          {lead.priority !== 'none' && (
            <Badge variant="secondary" className={`text-xs ${priorityColors[lead.priority]}`}>
              {lead.priority}
            </Badge>
          )}
        </div>

        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          {lead.contact?.email && (
            <div className="flex items-center gap-1 truncate">
              <Mail className="h-3 w-3" />
              <span className="truncate">{lead.contact.email}</span>
            </div>
          )}
        </div>

        {(lead.location || lead.country) && (
          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="truncate">
              {[lead.location, lead.country].filter(Boolean).join(', ')}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Overlay version for drag preview
export const PipelineCardOverlay: React.FC<{ lead: Lead }> = ({ lead }) => {
  return (
    <Card className="shadow-xl rotate-3 scale-105">
      <CardContent className="p-3">
        <div className="flex items-start gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
            {lead.type === 'studio' ? (
              <Building className="h-4 w-4 text-primary" />
            ) : (
              <DollarSign className="h-4 w-4 text-primary" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm truncate">{lead.name}</h4>
            <p className="text-xs text-muted-foreground truncate">
              {lead.contact?.name || 'No contact'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
