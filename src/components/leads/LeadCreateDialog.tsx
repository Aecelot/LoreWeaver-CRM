import React, { useState } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { LeadForm } from '@/components/forms';
import { useLeads } from '@/hooks/useLeads';
import type { Lead } from '@/types/lead';

interface LeadCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultType?: 'studio' | 'investor';
}

export const LeadCreateDialog: React.FC<LeadCreateDialogProps> = ({
  open,
  onOpenChange,
  defaultType = 'studio',
}) => {
  const { addLead } = useLeads();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: Partial<Lead>) => {
    setIsSubmitting(true);
    try {
      await addLead(values as Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>);
      toast.success('Lead created successfully');
      onOpenChange(false);
    } catch {
      toast.error('Failed to create lead');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Lead</DialogTitle>
          <DialogDescription>
            Add a new {defaultType} lead to your pipeline.
          </DialogDescription>
        </DialogHeader>
        <LeadForm
          initialValues={{ type: defaultType }}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          submitLabel="Create Lead"
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};
