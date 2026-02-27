import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Archive, AlertCircle } from 'lucide-react';

interface LeadsBulkActionsProps {
  selectedCount: number;
  onDelete: () => void;
  onArchive: () => void;
  onSetPriority: (priority: 'high' | 'medium' | 'low' | 'none') => void;
}

export const LeadsBulkActions: React.FC<LeadsBulkActionsProps> = ({
  selectedCount,
  onDelete,
  onArchive,
  onSetPriority,
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
      <span className="text-sm font-medium">
        {selectedCount} lead{selectedCount > 1 ? 's' : ''} selected
      </span>
      <div className="flex-1" />
      <Button variant="outline" size="sm" onClick={() => onSetPriority('high')}>
        <AlertCircle className="h-4 w-4 mr-1 text-red-500" />
        High Priority
      </Button>
      <Button variant="outline" size="sm" onClick={onArchive}>
        <Archive className="h-4 w-4 mr-1" />
        Archive
      </Button>
      <Button variant="destructive" size="sm" onClick={onDelete}>
        <Trash2 className="h-4 w-4 mr-1" />
        Delete
      </Button>
    </div>
  );
};
