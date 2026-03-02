import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Lead, StudioInfo } from '@/types/lead';

interface LeadStudioFieldsProps {
  values: Partial<Lead>;
  onChange: (field: keyof Lead, value: StudioInfo) => void;
  errors?: Record<string, string>;
}

export const LeadStudioFields: React.FC<LeadStudioFieldsProps> = ({
  values,
  onChange,
}) => {
  const studio: Partial<StudioInfo> = values.studio || {};

  const handleStudioChange = (field: keyof StudioInfo, value: string | number | string[]) => {
    onChange('studio', {
      ...studio,
      [field]: value,
    } as StudioInfo);
  };

  const handleGamesChange = (value: string) => {
    const games = value.split(',').map((g) => g.trim()).filter(Boolean);
    handleStudioChange('games', games);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Studio Details</h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="studioSize">Team Size</Label>
          <Input
            id="studioSize"
            value={studio.size || ''}
            onChange={(e) => handleStudioChange('size', e.target.value)}
            placeholder="e.g., 10-50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="studioType">Studio Type</Label>
          <Select
            value={studio.type || ''}
            onValueChange={(value) => handleStudioChange('type', value)}
          >
            <SelectTrigger id="studioType">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="indie">Indie</SelectItem>
              <SelectItem value="aa">AA</SelectItem>
              <SelectItem value="aaa">AAA</SelectItem>
              <SelectItem value="mobile">Mobile</SelectItem>
              <SelectItem value="vr">VR/AR</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="studioFocus">Focus/Genre</Label>
        <Input
          id="studioFocus"
          value={studio.focus || ''}
          onChange={(e) => handleStudioChange('focus', e.target.value)}
          placeholder="e.g., RPG, Action-Adventure"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="studioGames">Notable Games</Label>
        <Input
          id="studioGames"
          value={studio.games?.join(', ') || ''}
          onChange={(e) => handleGamesChange(e.target.value)}
          placeholder="Game 1, Game 2, Game 3"
        />
        <p className="text-xs text-muted-foreground">Separate games with commas</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="studioFitScore">Fit Score (0-10)</Label>
          <Input
            id="studioFitScore"
            type="number"
            min={0}
            max={10}
            value={studio.fitScore ?? ''}
            onChange={(e) => handleStudioChange('fitScore', parseInt(e.target.value) || 0)}
            placeholder="7"
          />
          <p className="text-xs text-muted-foreground">Priority auto-calculates: 7+ high, 4-6 medium, 1-3 low</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="studioFitReason">Fit Reason</Label>
        <Textarea
          id="studioFitReason"
          value={studio.fitReason || ''}
          onChange={(e) => handleStudioChange('fitReason', e.target.value)}
          placeholder="Why is this studio a good fit?"
          rows={3}
        />
      </div>
    </div>
  );
};
