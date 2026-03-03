import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Badge } from '@/components/ui/badge';
import { Inbox } from 'lucide-react';
import { PipelineCard } from './PipelineCard';
import { ColumnFilters } from './ColumnFilters';
import { ColumnSortDropdown } from './ColumnSort';
import { getStageColorClass, getStageBorderColorClass } from '@/lib/stages';
import type { ColumnFilter, ColumnSort } from '@/types/filters';
import { DEFAULT_SORT, isFilterActive } from '@/types/filters';
import type { Lead } from '@/types/lead';
import type { PipelineStage } from '@/types/pipeline';

interface PipelineColumnProps {
  stage: PipelineStage;
  leads: Lead[];
  filter?: ColumnFilter;
  sort?: ColumnSort;
  onFilterChange?: (filter: ColumnFilter) => void;
  onSortChange?: (sort: ColumnSort) => void;
  availableTags?: string[];
}

export const PipelineColumn: React.FC<PipelineColumnProps> = ({
  stage,
  leads,
  filter = {},
  sort = DEFAULT_SORT,
  onFilterChange,
  onSortChange,
  availableTags = [],
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: stage.id,
    data: {
      type: 'column',
      stage,
    },
  });

  const leadIds = leads.map((lead) => lead.id);
  const hasActiveFilter = isFilterActive(filter);

  return (
    <div
      className={`flex flex-col w-full md:min-w-[280px] md:max-w-[320px] md:w-auto bg-muted/50 rounded-lg ${
        isOver ? 'ring-2 ring-primary ring-offset-2' : ''
      }`}
    >
      {/* Column Header */}
      <div
        className={`p-3 rounded-t-lg border-b-2 ${getStageBorderColorClass(stage.color)}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className={getStageColorClass(stage.color)}
            >
              {stage.name}
            </Badge>
            <span className="text-sm font-medium text-muted-foreground">
              {leads.length}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {onFilterChange && (
              <ColumnFilters
                filter={filter}
                onChange={onFilterChange}
                availableTags={availableTags}
              />
            )}
            {onSortChange && (
              <ColumnSortDropdown sort={sort} onChange={onSortChange} />
            )}
          </div>
        </div>
        {/* Active filter indicator */}
        {hasActiveFilter && (
          <div className="mt-2 text-xs text-muted-foreground">
            Filtered results
          </div>
        )}
      </div>

      {/* Column Content */}
      <div
        ref={setNodeRef}
        className={`flex-1 p-2 min-h-[200px] max-h-[calc(100vh-280px)] overflow-y-auto transition-colors ${
          isOver ? 'bg-primary/5' : ''
        }`}
      >
        <SortableContext items={leadIds} strategy={verticalListSortingStrategy}>
          {leads.map((lead) => (
            <PipelineCard key={lead.id} lead={lead} />
          ))}
        </SortableContext>

        {leads.length === 0 && (
          <div className="flex flex-col items-center justify-center h-24 text-sm text-muted-foreground border-2 border-dashed rounded-lg gap-1">
            <Inbox className="h-5 w-5" />
            <span>{hasActiveFilter ? 'No matches' : 'Drop leads here'}</span>
          </div>
        )}
      </div>
    </div>
  );
};
