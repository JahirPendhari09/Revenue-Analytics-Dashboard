'use client';

import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EditableLabel } from '@/components/labels/EditableLabel';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { CustomerGrowthChart } from '@/components/charts/CustomerGrowthChart';
import { CustomersTable } from '@/components/tables/CustomersTable';
import { CustomersData, LifetimeValueDistribution } from '@/types/customers';
import { getCustomersData } from '@/services/apiHelper';
import { PageStateWrapper } from '@/components/layout/PageStateWrapper';
import { CircularChart } from '@/components/charts/CircularChart';

export default function CustomersPage() {
  const [data, setData] = useState<CustomersData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCustomersData()
      .then(setData)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageStateWrapper loading={loading} error={!data}>
      <Header />
      <main className="flex-1 overflow-y-auto p-6 bg-background">
        <div className="space-y-6">
          {/* Metrics Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  <EditableLabel labelKey="metric_customers" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <AnimatedNumber value={data?.metrics.totalCustomers ?? 0} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  All time customers
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  <EditableLabel labelKey="metric_active_customers" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <AnimatedNumber value={data?.metrics.activeCustomers ?? 0} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Currently active
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  <EditableLabel labelKey="metric_new_customers" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <AnimatedNumber value={data?.metrics.newThisMonth ?? 0} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  New this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  <EditableLabel labelKey="metric_churn_rate" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <AnimatedNumber
                    value={data?.metrics.churnRate ?? 0}
                    suffix="%"
                    decimals={1}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Monthly churn rate
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid gap-4 md:grid-cols-2">
          
            <CircularChart
              titleLabelKey="chart_segmentation_title"
              totalLabel="Total Customers"
              data={(data?.customerSegmentation ?? []).map((item) => ({
                name: item.segment,
                value: item.count,
                extra: item,
              }))}
              tooltipFormatter={(params) => {
                const extra = params.data.extra;
                return `
                  <strong>${params.name}</strong><br/>
                  Customers: ${params.value} (${params.percent}%)<br/>
                  Avg Spent: $${extra.avgSpent.toLocaleString()}
               `;
              }}
            />

            <CustomerGrowthChart data={data?.customerGrowthTrend ?? []} />
          </div>

          {/* Lifetime Value Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Lifetime Value Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data?.lifetimeValueDistribution.map((item: LifetimeValueDistribution) => {
                  return (
                    <div key={item.range} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.range}</span>
                        <span className="text-sm text-muted-foreground">
                          {item.count} customers ({item.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                )})}
              </div>
            </CardContent>
          </Card>

          {/* Customers Table */}
          <CustomersTable data={data?.customerList ?? []} />
        </div>
      </main>
    </PageStateWrapper>
  );
}
