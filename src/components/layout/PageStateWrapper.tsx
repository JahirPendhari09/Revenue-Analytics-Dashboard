'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Loader2 } from 'lucide-react';

type PageStateWrapperProps = {
  loading: boolean;
  error?: boolean;
  children: React.ReactNode;
};

export function PageStateWrapper({
  loading,
  error,
  children,
}: PageStateWrapperProps) {
  return (
    <div className="flex h-screen max-w-[1600px] mx-auto">
      <Sidebar />

      <div className="flex-1 flex items-center justify-center">
        {loading && <Loader2 className="w-8 h-8 animate-spin" />}

        {!loading && error && (
          <p className="text-muted-foreground">Failed to load data</p>
        )}

        {!loading && !error && (
          <div className="flex-1 h-full flex flex-col">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
