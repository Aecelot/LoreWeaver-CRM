import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { PipelineBoard } from '@/components/pipeline';

export const PipelineView: React.FC = () => {
  const { type } = useParams<{ type: 'studios' | 'investors' }>();

  // Convert URL param to pipeline type
  const pipelineType = type === 'investors' ? 'investor' : type === 'studios' ? 'studio' : null;

  // Redirect if invalid type
  if (!pipelineType) {
    return <Navigate to="/pipeline/studios" replace />;
  }

  const pipelineTitle = pipelineType === 'investor' ? 'Investors' : 'Studios';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{pipelineTitle} Pipeline</h1>
        <p className="text-muted-foreground">
          Drag and drop leads between stages
        </p>
      </div>

      <PipelineBoard pipelineType={pipelineType} />
    </div>
  );
};
