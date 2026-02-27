import React from 'react';
import { useLeads } from '@/hooks/useLeads';
import { useActivity } from '@/hooks/useActivity';
import { StatsCards, RecentLeads, ActivityFeed } from '@/components/dashboard';

export const Dashboard: React.FC = () => {
  const { leads, loading: leadsLoading } = useLeads();
  const { activities, loading: activitiesLoading } = useActivity(10);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to LoreWeaver CRM</p>
      </div>

      <StatsCards leads={leads} loading={leadsLoading} />

      <div className="grid gap-4 md:grid-cols-2">
        <RecentLeads leads={leads} loading={leadsLoading} limit={5} />
        <ActivityFeed activities={activities} loading={activitiesLoading} limit={10} />
      </div>
    </div>
  );
};
