'use client';

import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EditableLabel } from '@/components/labels/EditableLabel';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { PerformanceChart } from '@/components/charts/PerformanceChart';
import { RegionalChart } from '@/components/charts/RegionalChart';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency } from '@/lib/utils';
import { ReportsData } from '@/types/reports';
import { getReportsData } from '@/services/apiHelper';
import { PageStateWrapper } from '@/components/layout/PageStateWrapper';

export default function ReportsPage() {
  const [data, setData] = useState<ReportsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReportsData()
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
                <p className="text-xs text-muted-foreground mt-1">
                  Total revenue this year
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  <EditableLabel labelKey="metric_monthly_growth" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <AnimatedNumber
                    value={data?.metrics.monthlyGrowth ?? 0}
                    suffix="%"
                    decimals={1}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Month over month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  <EditableLabel labelKey="metric_yearly_growth" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <AnimatedNumber
                    value={data?.metrics.yearlyGrowth ?? 0}
                    suffix="%"
                    decimals={1}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Year over year
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  <EditableLabel labelKey="metric_quarterly_revenue" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <AnimatedNumber
                    value={data?.metrics.quarterlyRevenue ?? 0}
                    prefix="$"
                    decimals={2}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Current quarter
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Performance Chart */}
          <PerformanceChart data={data?.monthlyPerformance ?? []} />

          {/* Regional Performance Chart */}
          <RegionalChart data={data?.performanceByRegion ?? []} />

          {/* Regional Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Regional Performance Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <EditableLabel labelKey="table_column_region" />
                    </TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-right">
                      <EditableLabel labelKey="table_column_growth" />
                    </TableHead>
                    <TableHead className="text-right">Market Share</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.performanceByRegion.map((region) => (
                    <TableRow key={region.region}>
                      <TableCell className="font-medium">{region.region}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(region.revenue)}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={region.growth >= 10 ? 'text-green-600 font-semibold' : ''}>
                          {region.growth}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">{region.market_share}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Top Products Table */}
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <EditableLabel labelKey="table_column_product" />
                    </TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-right">Units Sold</TableHead>
                    <TableHead className="text-right">
                      <EditableLabel labelKey="table_column_growth" />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.topProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(product.revenue)}
                      </TableCell>
                      <TableCell className="text-right">{product.units}</TableCell>
                      <TableCell className="text-right">
                        <span className={product.growth >= 15 ? 'text-green-600 font-semibold' : ''}>
                          {product.growth}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </PageStateWrapper>
  );
}
