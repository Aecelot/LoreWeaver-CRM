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
import type { Lead, InvestorInfo } from '@/types/lead';

interface LeadInvestorFieldsProps {
  values: Partial<Lead>;
  onChange: (field: keyof Lead, value: InvestorInfo) => void;
  errors?: Record<string, string>;
}

export const LeadInvestorFields: React.FC<LeadInvestorFieldsProps> = ({
  values,
  onChange,
}) => {
  const investor: Partial<InvestorInfo> = values.investor || {};

  const handleInvestorChange = (field: keyof InvestorInfo, value: string | string[]) => {
    onChange('investor', {
      ...investor,
      [field]: value,
    } as InvestorInfo);
  };

  const handleRegionsChange = (value: string) => {
    const regions = value.split(',').map((r) => r.trim()).filter(Boolean);
    handleInvestorChange('geographicalRegions', regions);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Investor Details</h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="investorType">Investor Type</Label>
          <Select
            value={investor.type || ''}
            onValueChange={(value) => handleInvestorChange('type', value)}
          >
            <SelectTrigger id="investorType">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vc">Venture Capital</SelectItem>
              <SelectItem value="angel">Angel Investor</SelectItem>
              <SelectItem value="publisher">Publisher</SelectItem>
              <SelectItem value="corporate">Corporate</SelectItem>
              <SelectItem value="family-office">Family Office</SelectItem>
              <SelectItem value="pe">Private Equity</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="investorFounded">Year Founded</Label>
          <Input
            id="investorFounded"
            value={investor.founded || ''}
            onChange={(e) => handleInvestorChange('founded', e.target.value)}
            placeholder="e.g., 2015"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="investorFocus">Investment Focus</Label>
        <Input
          id="investorFocus"
          value={investor.investmentFocus || ''}
          onChange={(e) => handleInvestorChange('investmentFocus', e.target.value)}
          placeholder="e.g., Gaming, Entertainment Tech"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="investorHqRegion">HQ Region</Label>
          <Input
            id="investorHqRegion"
            value={investor.hqRegion || ''}
            onChange={(e) => handleInvestorChange('hqRegion', e.target.value)}
            placeholder="e.g., North America"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="investorRegions">Geographical Regions</Label>
          <Input
            id="investorRegions"
            value={investor.geographicalRegions?.join(', ') || ''}
            onChange={(e) => handleRegionsChange(e.target.value)}
            placeholder="North America, Europe"
          />
          <p className="text-xs text-muted-foreground">Separate regions with commas</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="investorFundingPrefs">Funding Preferences</Label>
        <Textarea
          id="investorFundingPrefs"
          value={investor.fundingPreferences || ''}
          onChange={(e) => handleInvestorChange('fundingPreferences', e.target.value)}
          placeholder="Preferred investment stages, amounts, terms..."
          rows={3}
        />
      </div>
    </div>
  );
};
