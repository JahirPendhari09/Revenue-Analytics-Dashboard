'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLabels } from '@/contexts/LabelContext';
import type { LabelUsage } from '@/types/label';
import { Loader2, AlertCircle } from 'lucide-react';

interface LabelEditDialogProps {
  labelKey: string;
  currentValue: string;
  isOpen: boolean;
  onClose: () => void;
}

export function LabelEditDialog({
  labelKey,
  currentValue,
  isOpen,
  onClose,
}: LabelEditDialogProps) {
  const [newValue, setNewValue] = useState(currentValue);
  const [usage, setUsage] = useState<LabelUsage | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { updateLabel, getLabelUsage } = useLabels();

  useEffect(() => {
    if (isOpen) {
      setNewValue(currentValue);
      fetchUsage();
    }
  }, [isOpen, currentValue]);

  const fetchUsage = async () => {
    setLoading(true);
    try {
      const usageData = await getLabelUsage(labelKey);
      setUsage(usageData);
    } catch (error) {
      console.error('Error fetching usage:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!newValue.trim() || newValue === currentValue) {
      return;
    }

    setSaving(true);
    try {
      await updateLabel(labelKey, newValue.trim());
      onClose();
    } catch (error) {
      console.error('Error updating label:', error);
      alert('Failed to update label. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Label</DialogTitle>
          <DialogDescription>
            Update the label text. This change will be reflected across all uses.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="label-key">Label Key</Label>
            <Input
              id="label-key"
              value={labelKey}
              disabled
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="label-value">Label Value</Label>
            <Input
              id="label-value"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder="Enter label text"
              autoFocus
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : usage && usage.totalLocations > 0 ? (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-amber-900">
                    Impact Warning
                  </h4>
                  <p className="text-sm text-amber-800 mt-1">
                    This change will affect{' '}
                    <strong>{usage.totalLocations} location{usage.totalLocations !== 1 ? 's' : ''}</strong>{' '}
                    across{' '}
                    <strong>{usage.totalPages} page{usage.totalPages !== 1 ? 's' : ''}</strong>
                  </p>
                  
                  <div className="mt-3 space-y-2">
                    {Object.entries(usage.usages).map(([pageName, locations]) => (
                      <div key={pageName} className="text-sm">
                        <div className="font-medium text-amber-900">{pageName}:</div>
                        <ul className="ml-4 mt-1 space-y-1">
                          {locations.map((loc, idx) => (
                            <li key={idx} className="text-amber-700">
                              • {loc.component} - {loc.location}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              This label is used in 1 location.
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving || !newValue.trim() || newValue === currentValue}
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}