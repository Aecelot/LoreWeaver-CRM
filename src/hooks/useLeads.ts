import { useState, useEffect } from 'react';
import { getLeadsRealtime, createLead, updateLead, deleteLead } from '@/lib/firestore';
import type { Lead, LeadFilters } from '@/types/lead';

export const useLeads = (filters?: LeadFilters) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const unsubscribe = getLeadsRealtime((leadsData) => {
      // Apply client-side search filter if provided
      let filteredLeads = leadsData;
      if (filters?.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredLeads = leadsData.filter(lead => 
          lead.name.toLowerCase().includes(searchTerm) ||
          lead.contact.name.toLowerCase().includes(searchTerm) ||
          lead.contact.email.toLowerCase().includes(searchTerm) ||
          lead.website.toLowerCase().includes(searchTerm)
        );
      }
      
      setLeads(filteredLeads);
      setLoading(false);
    }, filters);

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [filters]);

  const addLead = async (leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await createLead(leadData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create lead');
      throw err;
    }
  };

  const editLead = async (id: string, data: Partial<Lead>) => {
    try {
      await updateLead(id, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update lead');
      throw err;
    }
  };

  const removeLead = async (id: string) => {
    try {
      await deleteLead(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete lead');
      throw err;
    }
  };

  return {
    leads,
    loading,
    error,
    addLead,
    editLead,
    removeLead,
  };
};