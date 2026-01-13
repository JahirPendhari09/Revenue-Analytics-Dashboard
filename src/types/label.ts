export type LabelUsageLocation = {
  component: string;
  location: string;
};

export type LabelUsage = {
  key: string;
  defaultValue: string;
  description?: string;
  totalLocations?: number;
  totalPages?: number;
  usages?: Record<string, LabelUsageLocation[]>;
};

export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};
