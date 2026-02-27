import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Badge } from '@/components/ui/badge';
import { Inbox } from 'lucide-react';
import { PipelineCard } from './PipelineCard';
import { getStageColorClass, getStageBorderColorClass } from '@/lib/stages';
import type { Lead } from '@/types/lead';
import type { PipelineStage } from '@/types/pipeline';

interface PipelineColumnProps {
  stage: PipelineStage;
  leads: Lead[];
}

export const PipelineColumn: React.FC<PipelineColumnProps> = ({ stage, leads }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: stage.id,
    data: {
      type: 'column',
      stage,
    },
  });

  const leadIds = leads.map((lead) => lead.id);

  return (
    <div
      className={`flex flex-col min-w-[280px] max-w-[320px] bg-muted/50 rounded-lg ${
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
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            {leads.length}
          </span>
        </div>
      </div>

      {/* Column Content */}
      <div
        ref={setNodeRef}
        className={`flex-1 p-2 min-h-[200px] overflow-y-auto transition-colors ${
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
            <span>Drop leads here</span>
          </div>
        )}
      </div>
    </div>
  );
};
