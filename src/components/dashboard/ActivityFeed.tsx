import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Edit, ArrowRight, MessageSquare, Activity } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { Activity as ActivityType } from '@/types/activity';
import { getActivityDescription } from '@/hooks/useActivity';

interface ActivityFeedProps {
  activities: ActivityType[];
  loading?: boolean;
  limit?: number;
}

const activityIcons: Record<ActivityType['type'], React.ElementType> = {
  LEAD_CREATED: PlusCircle,
  LEAD_UPDATED: Edit,
  LEAD_STAGE_CHANGED: ArrowRight,
  NOTE_ADDED: MessageSquare,
};

const activityColors: Record<ActivityType['type'], string> = {
  LEAD_CREATED: 'text-green-500',
  LEAD_UPDATED: 'text-blue-500',
  LEAD_STAGE_CHANGED: 'text-purple-500',
  NOTE_ADDED: 'text-yellow-500',
};

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  loading,
  limit = 10,
}) => {
  const displayActivities = activities.slice(0, limit);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Activity Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-48 bg-muted animate-pulse rounded" />
                  <div className="h-3 w-24 bg-muted animate-pulse rounded" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (displayActivities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Activity Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Activity className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No recent activity.</p>
            <p className="text-sm text-muted-foreground">
              Activities will appear here as you work with leads.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayActivities.map((activity) => {
            const Icon = activityIcons[activity.type] || Activity;
            const colorClass = activityColors[activity.type] || 'text-gray-500';
            const description = getActivityDescription(activity);
            const timeAgo = formatDistanceToNow(activity.timestamp, { addSuffix: true });

            return (
              <div key={activity.id} className="flex items-start gap-4">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-muted ${colorClass}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  {activity.leadId ? (
                    <Link
                      to={`/leads/${activity.leadId}`}
                      className="text-sm hover:underline"
                    >
                      {description}
                    </Link>
                  ) : (
                    <p className="text-sm">{description}</p>
                  )}
                  <p className="text-xs text-muted-foreground">{timeAgo}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
