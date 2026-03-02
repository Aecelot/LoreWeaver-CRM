import React, { useState, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { LeadBasicFields } from './LeadBasicFields';
import { LeadContactFields } from './LeadContactFields';
import { LeadStudioFields } from './LeadStudioFields';
import { LeadInvestorFields } from './LeadInvestorFields';
import { LeadQualificationFields } from './LeadQualificationFields';
import {
  validateRequired,
  validateEmail,
  validateUrl,
  validateLinkedInUrl,
} from '@/lib/validators';
import { calculatePriorityFromFitScore, calculateLeadPriority } from '@/lib/utils';
import type { Lead, LeadContact, StudioInfo, InvestorInfo } from '@/types/lead';

interface LeadFormProps {
  initialValues?: Partial<Lead>;
  onSubmit: (values: Partial<Lead>) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
  isSubmitting?: boolean;
}

export const LeadForm: React.FC<LeadFormProps> = ({
  initialValues = {},
  onSubmit,
  onCancel,
  submitLabel = 'Save',
  isSubmitting = false,
}) => {
  const [values, setValues] = useState<Partial<Lead>>({
    type: 'studio',
    status: 'new',
    priority: 'none',
    category: 'prospect',
    contact: { name: '', email: '', role: '', phone: '', linkedin: '' },
    ...initialValues,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Track if user manually changed priority (to allow override of auto-calculation)
  const priorityManuallySet = useRef(false);

  const handleChange = useCallback((field: keyof Lead, value: unknown) => {
    // Track manual priority changes
    if (field === 'priority') {
      priorityManuallySet.current = true;
    }

    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear error when field is modified
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  const handleContactChange = useCallback((_field: keyof Lead, value: LeadContact) => {
    setValues((prev) => ({ ...prev, contact: value }));
    // Clear contact errors
    setErrors((prev) => {
      const newErrors = { ...prev };
      Object.keys(newErrors)
        .filter((key) => key.startsWith('contact.'))
        .forEach((key) => delete newErrors[key]);
      return newErrors;
    });
  }, []);

  const handleStudioChange = useCallback((_field: keyof Lead, value: Partial<StudioInfo>) => {
    setValues((prev) => {
      const newValues = { ...prev, studio: { ...prev.studio, ...value } as StudioInfo };

      // Auto-calculate priority from fit score if not manually set
      if ('fitScore' in value && !priorityManuallySet.current) {
        const fitScore = value.fitScore;
        // Normalize if stored as 0-100 (divide by 10 for calculation)
        const normalizedScore = fitScore !== undefined && fitScore > 10 ? fitScore / 10 : fitScore;
        newValues.priority = calculatePriorityFromFitScore(normalizedScore);
      }

      return newValues;
    });
  }, []);

  const handleInvestorChange = useCallback((_field: keyof Lead, value: Partial<InvestorInfo>) => {
    setValues((prev) => ({ ...prev, investor: { ...prev.investor, ...value } as InvestorInfo }));
  }, []);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required fields
    const nameError = validateRequired(values.name || '', 'Company name');
    if (nameError) newErrors.name = nameError;

    const typeError = validateRequired(values.type || '', 'Lead type');
    if (typeError) newErrors.type = typeError;

    // Contact validation
    const contactNameError = validateRequired(values.contact?.name || '', 'Contact name');
    if (contactNameError) newErrors['contact.name'] = contactNameError;

    const contactEmailError = validateRequired(values.contact?.email || '', 'Contact email');
    if (contactEmailError) {
      newErrors['contact.email'] = contactEmailError;
    } else {
      const emailFormatError = validateEmail(values.contact?.email || '');
      if (emailFormatError) newErrors['contact.email'] = emailFormatError;
    }

    // Optional URL validation
    if (values.website) {
      const websiteError = validateUrl(values.website);
      if (websiteError) newErrors.website = websiteError;
    }

    if (values.contact?.linkedin) {
      const linkedinError = validateLinkedInUrl(values.contact.linkedin);
      if (linkedinError) newErrors['contact.linkedin'] = linkedinError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Calculate priority scores before saving
    const finalValues = { ...values };
    if (!priorityManuallySet.current && finalValues.type) {
      const priorityData = calculateLeadPriority(finalValues as Parameters<typeof calculateLeadPriority>[0]);
      finalValues.priority = priorityData.priority;
      finalValues.intentScore = priorityData.intentScore;
      finalValues.recencyScore = priorityData.recencyScore;
      finalValues.priorityScore = priorityData.priorityScore;
    }

    await onSubmit(finalValues);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <LeadBasicFields
        values={values}
        onChange={handleChange}
        errors={errors}
      />

      <div className="border-t pt-4">
        <LeadContactFields
          values={values}
          onChange={handleContactChange}
          errors={errors}
        />
      </div>

      {(values.type === 'studio' || values.type === 'publisher') && (
        <div className="border-t pt-4">
          <LeadStudioFields
            values={values}
            onChange={handleStudioChange}
            errors={errors}
            isPublisher={values.type === 'publisher'}
          />
        </div>
      )}

      {values.type === 'investor' && (
        <div className="border-t pt-4">
          <LeadInvestorFields
            values={values}
            onChange={handleInvestorChange}
            errors={errors}
          />
        </div>
      )}

      <div className="border-t pt-4">
        <LeadQualificationFields
          values={values}
          onChange={handleChange}
          errors={errors}
        />
      </div>

      <div className="border-t pt-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={values.notes || ''}
            onChange={(e) => handleChange('notes', e.target.value)}
            placeholder="Add any additional notes..."
            rows={4}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : submitLabel}
        </Button>
      </div>
    </form>
  );
};
