export interface ReportsData {
  metrics: {
    totalRevenue: number;
    monthlyGrowth: number;
    yearlyGrowth: number;
    quarterlyRevenue: number;
  };
  monthlyPerformance: Array<{
    month: string;
    revenue: number;
    profit: number;
    expenses: number;
  }>;
  performanceByRegion: Array<{
    region: string;
    revenue: number;
    growth: number;
    market_share: number;
  }>;
  quarterlyComparison: Array<{
    quarter: string;
    revenue: number;
    sales: number;
  }>;
  topProducts: Array<{
    id: number;
    name: string;
    revenue: number;
    units: number;
    growth: number;
  }>;
}
