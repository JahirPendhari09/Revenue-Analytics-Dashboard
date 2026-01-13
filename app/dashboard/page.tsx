'use client';

import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { SalesChart } from '@/components/charts/SalesChart';
import { DataTable } from '@/components/tables/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EditableLabel } from '@/components/labels/EditableLabel';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { DashboardData } from '@/types/dashboard';
import { getDashboardData } from '@/services/apiHelper';
import { PageStateWrapper } from '@/components/layout/PageStateWrapper';


export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardData()
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
                    <EditableLabel labelKey="metric_revenue" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <AnimatedNumber
                      value={data?.metrics.totalRevenue ?? 0}
                      prefix="$"
                      decimals={2}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    <EditableLabel labelKey="metric_sales" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <AnimatedNumber
                      value={data?.metrics.totalSales ?? 0}
                      decimals={2}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    <EditableLabel labelKey="metric_customers" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <AnimatedNumber
                      value={data?.metrics.totalCustomers ?? 0}
                      decimals={2}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average Order Value
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <AnimatedNumber
                      value={data?.metrics.averageOrderValue ?? 0}
                      prefix="$"
                      decimals={2}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid gap-4 md:grid-cols-2">
              <RevenueChart data={data?.revenueData ?? []} />
              <SalesChart data={data?.revenueData ?? []} />
            </div>

            {/* Table */}
            <DataTable data={data?.recentTransactions ?? []} />
          </div>
        </main>
    </PageStateWrapper>

  );
}