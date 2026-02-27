import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Lead, LeadFilters } from '../types/lead';
import type { Note, NoteFormData } from '../types/note';
import type { Pipeline } from '../types/pipeline';

// Collections
const LEADS_COLLECTION = 'leads';
const NOTES_COLLECTION = 'notes';
const PIPELINES_COLLECTION = 'pipelines';

// Lead operations
export const getLeads = (filters?: LeadFilters) => {
  let q = query(collection(db, LEADS_COLLECTION), orderBy('createdAt', 'desc'));
  
  if (filters) {
    if (filters.type) {
      q = query(q, where('type', '==', filters.type));
    }
    if (filters.status) {
      q = query(q, where('status', '==', filters.status));
    }
    if (filters.priority && filters.priority !== 'none') {
      q = query(q, where('priority', '==', filters.priority));
    }
    if (filters.owner) {
      q = query(q, where('owner', '==', filters.owner));
    }
  }
  
  return getDocs(q);
};

export const getLeadsRealtime = (
  callback: (leads: Lead[]) => void,
  filters?: LeadFilters
) => {
  // Build query - only use simple filters to avoid index requirements
  let q;

  if (filters?.type) {
    q = query(collection(db, LEADS_COLLECTION), where('type', '==', filters.type));
  } else {
    q = query(collection(db, LEADS_COLLECTION));
  }

  return onSnapshot(q, (snapshot) => {
    let leads = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Lead[];

    // Apply additional filters client-side
    if (filters) {
      if (filters.status) {
        leads = leads.filter(lead => lead.status === filters.status);
      }
      if (filters.priority && filters.priority !== 'none') {
        leads = leads.filter(lead => lead.priority === filters.priority);
      }
      if (filters.owner) {
        leads = leads.filter(lead => lead.owner === filters.owner);
      }
    }

    // Sort by createdAt client-side
    leads.sort((a, b) => {
      const dateA = a.createdAt?.toDate?.() ?? new Date(0);
      const dateB = b.createdAt?.toDate?.() ?? new Date(0);
      return dateB.getTime() - dateA.getTime();
    });

    callback(leads);
  }, (error) => {
    console.error('Leads fetch error:', error);
    callback([]);
  });
};

export const getLead = async (id: string): Promise<Lead | null> => {
  const docRef = doc(db, LEADS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Lead;
  }
  return null;
};

export const getLeadRealtime = (
  id: string,
  callback: (lead: Lead | null) => void
) => {
  const docRef = doc(db, LEADS_COLLECTION, id);
  
  return onSnapshot(docRef, (snapshot) => {
    if (snapshot.exists()) {
      const lead = { id: snapshot.id, ...snapshot.data() } as Lead;
      callback(lead);
    } else {
      callback(null);
    }
  });
};

export const createLead = async (leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => {
  const docRef = await addDoc(collection(db, LEADS_COLLECTION), {
    ...leadData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

export const updateLead = async (id: string, data: Partial<Lead>) => {
  const docRef = doc(db, LEADS_COLLECTION, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

export const deleteLead = async (id: string) => {
  const docRef = doc(db, LEADS_COLLECTION, id);
  await deleteDoc(docRef);
};

export const updateLeadStage = async (id: string, stageId: string) => {
  const docRef = doc(db, LEADS_COLLECTION, id);
  await updateDoc(docRef, {
    'pipeline.stageId': stageId,
    'pipeline.enteredStageAt': serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

// Note operations
export const getNotesForLead = async (leadId: string): Promise<Note[]> => {
  const q = query(
    collection(db, NOTES_COLLECTION),
    where('leadId', '==', leadId),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Note[];
};

export const getNotesForLeadRealtime = (
  leadId: string,
  callback: (notes: Note[]) => void
) => {
  const q = query(
    collection(db, NOTES_COLLECTION),
    where('leadId', '==', leadId),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const notes = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Note[];
    callback(notes);
  });
};

export const createNote = async (noteData: NoteFormData): Promise<string> => {
  const docRef = await addDoc(collection(db, NOTES_COLLECTION), {
    ...noteData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

export const updateNote = async (id: string, data: Partial<Note>): Promise<void> => {
  const docRef = doc(db, NOTES_COLLECTION, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

export const deleteNote = async (id: string): Promise<void> => {
  const docRef = doc(db, NOTES_COLLECTION, id);
  await deleteDoc(docRef);
};

// Pipeline operations
export const getPipelines = async () => {
  const snapshot = await getDocs(collection(db, PIPELINES_COLLECTION));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Pipeline[];
};

export const getPipelinesRealtime = (callback: (pipelines: Pipeline[]) => void) => {
  return onSnapshot(collection(db, PIPELINES_COLLECTION), (snapshot) => {
    const pipelines = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Pipeline[];
    callback(pipelines);
  }, (error) => {
    console.error('Pipeline fetch error:', error);
    callback([]);
  });
};

export const createPipeline = async (pipeline: Omit<Pipeline, 'id' | 'createdAt' | 'updatedAt'>) => {
  const docRef = await addDoc(collection(db, PIPELINES_COLLECTION), {
    ...pipeline,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

// Initialize default pipelines
export const initializeDefaultPipelines = async () => {
  const batch = writeBatch(db);
  
  // Studio pipeline
  const studioRef = doc(collection(db, PIPELINES_COLLECTION));
  batch.set(studioRef, {
    name: 'Studio Pipeline',
    type: 'studio',
    stages: [
      { id: 'new-lead', name: 'New Lead', color: 'gray', order: 1, isActive: true },
      { id: 'researched', name: 'Researched', color: 'blue', order: 2, isActive: true },
      { id: 'contacted', name: 'Contacted', color: 'yellow', order: 3, isActive: true },
      { id: 'meeting', name: 'Meeting', color: 'orange', order: 4, isActive: true },
      { id: 'proposal', name: 'Proposal', color: 'purple', order: 5, isActive: true },
      { id: 'negotiation', name: 'Negotiation', color: 'indigo', order: 6, isActive: true },
      { id: 'won', name: 'Won', color: 'green', order: 7, isActive: true },
      { id: 'lost', name: 'Lost', color: 'red', order: 8, isActive: false },
    ],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  
  // Investor pipeline
  const investorRef = doc(collection(db, PIPELINES_COLLECTION));
  batch.set(investorRef, {
    name: 'Investor Pipeline',
    type: 'investor',
    stages: [
      { id: 'identified', name: 'Identified', color: 'gray', order: 1, isActive: true },
      { id: 'researched', name: 'Researched', color: 'blue', order: 2, isActive: true },
      { id: 'warm-intro', name: 'Warm Intro', color: 'yellow', order: 3, isActive: true },
      { id: 'first-meeting', name: 'First Meeting', color: 'orange', order: 4, isActive: true },
      { id: 'follow-up', name: 'Follow-up', color: 'purple', order: 5, isActive: true },
      { id: 'due-diligence', name: 'Due Diligence', color: 'indigo', order: 6, isActive: true },
      { id: 'term-sheet', name: 'Term Sheet', color: 'cyan', order: 7, isActive: true },
      { id: 'closed', name: 'Closed', color: 'green', order: 8, isActive: true },
      { id: 'passed', name: 'Passed', color: 'red', order: 9, isActive: false },
    ],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  
  await batch.commit();
  return [studioRef.id, investorRef.id];
};