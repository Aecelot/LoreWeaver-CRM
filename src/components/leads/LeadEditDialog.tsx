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

interface LeadEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: Lead;
}

export const LeadEditDialog: React.FC<LeadEditDialogProps> = ({
  open,
  onOpenChange,
  lead,
}) => {
  const { editLead } = useLeads();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: Partial<Lead>) => {
    setIsSubmitting(true);
    try {
      await editLead(lead.id, values);
      toast.success('Lead updated');
      onOpenChange(false);
    } catch {
      toast.error('Failed to update lead');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Lead</DialogTitle>
          <DialogDescription>
            Update information for {lead.name}.
          </DialogDescription>
        </DialogHeader>
        <LeadForm
          initialValues={lead}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          submitLabel="Save Changes"
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};
