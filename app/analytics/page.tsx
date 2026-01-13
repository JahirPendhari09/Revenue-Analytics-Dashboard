'use client';

import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EditableLabel } from '@/components/labels/EditableLabel';
import { formatCurrency } from '@/lib/utils';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { AnalyticsData } from '@/types/analytics';
import { getAnalyticsData } from '@/services/apiHelper';
import { PageStateWrapper } from '@/components/layout/PageStateWrapper';
import { CircularChart } from '@/components/charts/CircularChart';


export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnalyticsData()
      .then(setData)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageStateWrapper loading={loading} error={!data}>
      <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <EditableLabel labelKey="metric_revenue" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    <AnimatedNumber
                      value={data?.metrics.totalRevenue ?? 0}
                      prefix="$"
                      decimals={2}
                    />
                  </div>

                  <p className="text-xs text-muted-foreground mt-1">
                    Total across all categories
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    <EditableLabel labelKey="metric_sales" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    <AnimatedNumber value={data?.metrics.totalSales ?? 0} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Total transactions
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    <EditableLabel labelKey="metric_customers" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    <AnimatedNumber value={data?.metrics.totalCustomers ?? 0} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Active customers
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Sales by Category */}
            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data?.salesByCategory.map((category) => (
                    <div key={category.category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category.category}</span>
                        <span className="text-sm text-muted-foreground">
                          {formatCurrency(category.value)} ({category.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Customers */}
            <div>
              <CircularChart
                titleLabelKey="chart_top_customers"
                totalLabel="Total Revenue"
                showDoller={true}
                data={(data?.topCustomers ?? []).map((item) => ({
                  name: item.name,
                  value: item.revenue,
                }))}
                tooltipFormatter={({ name, value, percent }) => `
                  <strong>${name}</strong><br/>
                  ${formatCurrency(value)}<br/>
                  ${percent}%
                `}
              />
            </div>
          </div>
        </main>
    </PageStateWrapper>

  );
}