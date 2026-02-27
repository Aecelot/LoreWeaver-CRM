import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PipelineBoard } from '@/components/pipeline';

export const PipelineView: React.FC = () => {
  const { type } = useParams<{ type: 'studios' | 'investors' }>();
  const [searchTerm, setSearchTerm] = useState('');

  // Convert URL param to pipeline type
  const pipelineType = type === 'investors' ? 'investor' : type === 'studios' ? 'studio' : null;

  // Redirect if invalid type
  if (!pipelineType) {
    return <Navigate to="/pipeline/studios" replace />;
  }

  const pipelineTitle = pipelineType === 'investor' ? 'Investors' : 'Studios';

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{pipelineTitle} Pipeline</h1>
          <p className="text-muted-foreground">
            Drag and drop leads between stages
          </p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-9"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 p-0"
              onClick={() => setSearchTerm('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <PipelineBoard pipelineType={pipelineType} searchTerm={searchTerm} />
    </div>
  );
};
