export type CategoryData = {
  category: string;
  value: number;
  percentage: number;
};

export type CustomerData = {
  name: string;
  orders: number;
  revenue: number;
};

export interface Metrics {
    totalRevenue: number;
    totalSales: number;
    totalCustomers: number;
    averageOrderValue?: number
}

export type AnalyticsData = {
  metrics: Metrics
  salesByCategory: CategoryData[];
  topCustomers: CustomerData[];
  totalRevenue?: number;
  totalSales?: number;
  totalCustomers?: number;
};
