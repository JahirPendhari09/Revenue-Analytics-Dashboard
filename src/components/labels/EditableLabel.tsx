'use client';

import React, { useState } from 'react';
import { Pencil } from 'lucide-react';
import { LabelEditDialog } from './LabelEditDialog';
import { useLabels } from '@/contexts/LabelContext';

interface EditableLabelProps {
  labelKey: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

export function EditableLabel({ 
  labelKey, 
  className = '', 
  as: Component = 'span' 
}: EditableLabelProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { getLabel } = useLabels();

  const labelValue = getLabel(labelKey);

  return (
    <>
      <Component
        className={`relative inline-flex items-center gap-2 group cursor-pointer ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsDialogOpen(true)}
      >
        {labelValue}
        {isHovered && (
          <Pencil className="w-4 h-4 text-muted-foreground opacity-70 hover:opacity-100 transition-opacity" />
        )}
      </Component>
      
      <LabelEditDialog
        labelKey={labelKey}
        currentValue={labelValue}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
}