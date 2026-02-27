import React, { useState, useMemo } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragStartEvent, DragEndEvent, DragOverEvent } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { PipelineColumn } from './PipelineColumn';
import { PipelineCardOverlay } from './PipelineCard';
import { getLeadsByStage } from '@/lib/stages';
import { useLeads } from '@/hooks/useLeads';
import { usePipeline } from '@/hooks/usePipeline';
import { Skeleton } from '@/components/ui/skeleton';
import type { Lead } from '@/types/lead';

interface PipelineBoardProps {
  pipelineType: 'studio' | 'investor';
}

export const PipelineBoard: React.FC<PipelineBoardProps> = ({ pipelineType }) => {
  const { leads, loading: leadsLoading } = useLeads({ type: pipelineType });
  const { pipelines, loading: pipelinesLoading, moveLeadToStage } = usePipeline();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [optimisticLeads, setOptimisticLeads] = useState<Lead[] | null>(null);

  // Get the relevant pipeline
  const pipeline = useMemo(() => {
    return pipelines.find((p) => p.type === pipelineType);
  }, [pipelines, pipelineType]);

  // Get active stages (sorted by order)
  const stages = useMemo(() => {
    if (!pipeline) return [];
    return [...pipeline.stages]
      .filter((s) => s.isActive)
      .sort((a, b) => a.order - b.order);
  }, [pipeline]);

  // Use optimistic leads if available, otherwise use real leads
  const displayLeads = optimisticLeads ?? leads;

  // Group leads by stage
  const leadsByStage = useMemo(() => {
    return getLeadsByStage(displayLeads, stages);
  }, [displayLeads, stages]);

  // Get the active lead being dragged
  const activeLead = useMemo(() => {
    if (!activeId) return null;
    return displayLeads.find((lead) => lead.id === activeId) ?? null;
  }, [activeId, displayLeads]);

  // Sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeLeadId = active.id as string;
    const overId = over.id as string;

    // Find the source and destination stages
    const activeLead = displayLeads.find((l) => l.id === activeLeadId);
    if (!activeLead) return;

    // Determine if we're over a column or another lead
    let targetStageId: string | null = null;

    // Check if we're over a column
    const overStage = stages.find((s) => s.id === overId);
    if (overStage) {
      targetStageId = overStage.id;
    } else {
      // We're over a lead, find its stage
      const overLead = displayLeads.find((l) => l.id === overId);
      if (overLead) {
        targetStageId = overLead.pipeline?.stageId ?? null;
      }
    }

    // Only update if moving to a different stage
    if (targetStageId && targetStageId !== activeLead.pipeline?.stageId) {
      // Optimistic update - move lead to new stage locally
      setOptimisticLeads((prev) => {
        const currentLeads = prev ?? leads;
        return currentLeads.map((lead) =>
          lead.id === activeLeadId
            ? {
                ...lead,
                pipeline: {
                  ...lead.pipeline,
                  stageId: targetStageId!,
                  enteredStageAt: new Date(),
                },
              }
            : lead
        );
      });
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) {
      // Cancelled - reset optimistic state
      setOptimisticLeads(null);
      return;
    }

    const activeLeadId = active.id as string;
    const activeLead = leads.find((l) => l.id === activeLeadId);
    if (!activeLead) {
      setOptimisticLeads(null);
      return;
    }

    // Determine target stage
    let targetStageId: string | null = null;
    const overStage = stages.find((s) => s.id === over.id);
    if (overStage) {
      targetStageId = overStage.id;
    } else {
      const overLead = displayLeads.find((l) => l.id === over.id);
      if (overLead) {
        targetStageId = overLead.pipeline?.stageId ?? null;
      }
    }

    // If target stage is different, persist the change
    if (targetStageId && targetStageId !== activeLead.pipeline?.stageId) {
      try {
        await moveLeadToStage(activeLeadId, targetStageId);
      } catch (error) {
        console.error('Failed to move lead:', error);
        // Rollback on error
        setOptimisticLeads(null);
        return;
      }
    }

    // Clear optimistic state (real data will update via subscription)
    setOptimisticLeads(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setOptimisticLeads(null);
  };

  // Loading state
  if (leadsLoading || pipelinesLoading) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="min-w-[280px]">
            <Skeleton className="h-12 w-full rounded-t-lg" />
            <Skeleton className="h-[400px] w-full rounded-b-lg mt-1" />
          </div>
        ))}
      </div>
    );
  }

  // No pipeline configured
  if (!pipeline || stages.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        No pipeline stages configured. Please set up your pipeline first.
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => (
          <PipelineColumn
            key={stage.id}
            stage={stage}
            leads={leadsByStage[stage.id] || []}
          />
        ))}
      </div>

      <DragOverlay>
        {activeLead ? <PipelineCardOverlay lead={activeLead} /> : null}
      </DragOverlay>
    </DndContext>
  );
};
