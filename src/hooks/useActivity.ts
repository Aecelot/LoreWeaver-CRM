import { useMemo } from 'react';
import { useLeads } from './useLeads';
import type { Activity } from '@/types/activity';

/**
 * Derives activities from leads based on their timestamps.
 * This is a simplified approach that doesn't require a separate activity collection.
 */
export const useActivity = (limit: number = 50) => {
  const { leads, loading, error } = useLeads();

  const activities = useMemo(() => {
    if (!leads.length) return [];

    const activityList: Activity[] = [];

    // Generate activities from leads
    leads.forEach((lead) => {
      // Lead created activity
      if (lead.createdAt) {
        const createdAt = lead.createdAt instanceof Date
          ? lead.createdAt
          : lead.createdAt?.toDate?.() ?? new Date(lead.createdAt);

        activityList.push({
          id: `LEAD_CREATED.${lead.id}.${createdAt.getTime()}`,
          type: 'LEAD_CREATED',
          leadId: lead.id,
          lead,
          userId: lead.createdBy,
          timestamp: createdAt,
        });
      }

      // Lead updated activity (only if different from created)
      if (lead.updatedAt && lead.createdAt) {
        const updatedAt = lead.updatedAt instanceof Date
          ? lead.updatedAt
          : lead.updatedAt?.toDate?.() ?? new Date(lead.updatedAt);
        const createdAt = lead.createdAt instanceof Date
          ? lead.createdAt
          : lead.createdAt?.toDate?.() ?? new Date(lead.createdAt);

        // Only add update activity if it's significantly different from create (more than 1 minute)
        if (updatedAt.getTime() - createdAt.getTime() > 60000) {
          activityList.push({
            id: `LEAD_UPDATED.${lead.id}.${updatedAt.getTime()}`,
            type: 'LEAD_UPDATED',
            leadId: lead.id,
            lead,
            timestamp: updatedAt,
          });
        }
      }

      // Stage change activity
      if (lead.pipeline?.enteredStageAt) {
        const enteredStageAt = lead.pipeline.enteredStageAt instanceof Date
          ? lead.pipeline.enteredStageAt
          : lead.pipeline.enteredStageAt?.toDate?.() ?? new Date(lead.pipeline.enteredStageAt);

        activityList.push({
          id: `LEAD_STAGE_CHANGED.${lead.id}.${enteredStageAt.getTime()}`,
          type: 'LEAD_STAGE_CHANGED',
          leadId: lead.id,
          lead,
          timestamp: enteredStageAt,
          data: {
            newStage: lead.pipeline.stageId,
          },
        });
      }
    });

    // Sort by timestamp descending and limit
    return activityList
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }, [leads, limit]);

  return {
    activities,
    loading,
    error,
  };
};

/**
 * Get a human-readable description for an activity
 */
export const getActivityDescription = (activity: Activity): string => {
  const leadName = activity.lead?.name ?? 'Unknown lead';

  switch (activity.type) {
    case 'LEAD_CREATED':
      return `${leadName} was added as a new ${activity.lead?.type ?? 'lead'}`;
    case 'LEAD_UPDATED':
      return `${leadName} was updated`;
    case 'LEAD_STAGE_CHANGED':
      return `${leadName} moved to ${activity.data?.newStage ?? 'a new stage'}`;
    case 'NOTE_ADDED':
      return `Note added to ${leadName}`;
    default:
      return `Activity on ${leadName}`;
  }
};

/**
 * Get icon name for an activity type
 */
export const getActivityIcon = (type: Activity['type']): string => {
  switch (type) {
    case 'LEAD_CREATED':
      return 'plus-circle';
    case 'LEAD_UPDATED':
      return 'edit';
    case 'LEAD_STAGE_CHANGED':
      return 'arrow-right';
    case 'NOTE_ADDED':
      return 'message-square';
    default:
      return 'activity';
  }
};
