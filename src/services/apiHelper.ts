import { apiGet, apiPut } from './api';
import type { AnalyticsData } from '@/types/analytics';
import type { DashboardData } from '@/types/dashboard';
import type { LabelUsage } from '@/types/label';
import type { CustomersData } from '@/types/customers';
import type { ReportsData } from '@/types/reports';


export function getAnalyticsData() {
  return apiGet<AnalyticsData>('/data/analytics');
}

export function getDashboardData() {
  return apiGet<DashboardData>('/data/dashboard');
}

export function getLabelUsage(key: string) {
  return apiGet<LabelUsage>(`/labels/usage/${key}`);
}

export type LabelDto = {
  key: string;
  value: string;
  description?: string;
};

export async function getAllLabels(): Promise<Record<string, string>> {
  const labels = await apiGet<LabelDto[]>('/labels');

  return labels.reduce((acc, label) => {
    acc[label.key] = label.value;
    return acc;
  }, {} as Record<string, string>);
}

export async function updateLabelApi(key: string, value: string) {
  return apiPut(`/labels/${key}`, { value });
}

export function getCustomersData() {
  return apiGet<CustomersData>('/data/customers');
}

export function getReportsData() {
  return apiGet<ReportsData>('/data/reports');
}
