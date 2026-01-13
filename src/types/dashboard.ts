export type DashboardMetrics = {
  totalRevenue: number;
  totalSales: number;
  totalCustomers: number;
  averageOrderValue: number;
};

export type RevenueDataPoint = {
  month: string;
  revenue: number;
  sales: number;
};

export type TransactionStatus = 'completed' | 'pending';

export type RecentTransaction = {
  id: number;
  date: string; 
  customer: string;
  amount: number;
  status: TransactionStatus;
};

export type DashboardData = {
  metrics: DashboardMetrics;
  revenueData: RevenueDataPoint[];
  recentTransactions: RecentTransaction[];
};
