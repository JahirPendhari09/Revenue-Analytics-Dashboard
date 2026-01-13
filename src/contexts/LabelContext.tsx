'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import type { LabelUsage } from '@/types//label';
import {
  getAllLabels,
  updateLabelApi,
} from '@/services/apiHelper';
import { getLabelUsage as fetchLabelUsage } from '@/services/apiHelper';

interface LabelContextType {
  labels: Record<string, string>;
  loading: boolean;
  updateLabel: (key: string, value: string) => Promise<void>;
  getLabel: (key: string, defaultValue?: string) => string;
  getLabelUsage: (key: string) => Promise<LabelUsage>;
}

const LabelContext = createContext<LabelContextType | undefined>(undefined);

export function LabelProvider({ children }: { children: React.ReactNode }) {
  const [labels, setLabels] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  /** Fetch labels from backend on app load */
  useEffect(() => {
    const loadLabels = async () => {
      try {
        const data = await getAllLabels();
        setLabels(data);
      } catch (error) {
        console.error('Failed to load labels:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLabels();
  }, []);

  const updateLabel = useCallback(async (key: string, value: string) => {
    await updateLabelApi(key, value);

    setLabels((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const getLabel = useCallback(
    (key: string, defaultValue: string = key) => {
      return labels[key] ?? defaultValue;
    },
    [labels]
  );

  const getLabelUsage = useCallback(
    async (key: string): Promise<LabelUsage> => {
      return await fetchLabelUsage(key);
    },
    []
  );

  return (
    <LabelContext.Provider
      value={{
        labels,
        loading,
        updateLabel,
        getLabel,
        getLabelUsage,
      }}
    >
      {children}
    </LabelContext.Provider>
  );
}

export function useLabels() {
  const context = useContext(LabelContext);
  if (!context) {
    throw new Error('useLabels must be used within a LabelProvider');
  }
  return context;
}

