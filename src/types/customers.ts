
export interface CustomerData {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  totalSpent: number;
  orders: number;
  joinDate: string;
  lastOrder: string;
  segment: string;
} 

export interface CustomerGrowthTrend {
  month: string;
  newCustomers: number;
  churned: number;
}

export interface LifetimeValueDistribution {
  range: string;
  count: number;
  percentage: number;
}

export interface CustomerSegmentation {
  segment: string;
  count: number;
  percentage: number;
  avgSpent: number;
}

export interface Metrics {
  totalCustomers: number;
  activeCustomers: number;
  newThisMonth: number;
  churnRate: number;
}

export interface CustomersData {
  metrics: Metrics;
  customerList: CustomerData[];
  customerSegmentation: CustomerSegmentation[];
  customerGrowthTrend: CustomerGrowthTrend[];
  lifetimeValueDistribution: LifetimeValueDistribution[];
}
