
'use client';

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EditableLabel } from '../labels/EditableLabel';

interface CustomerGrowthChartProps {
  data: Array<{
    month: string;
    newCustomers: number;
    churned: number;
  }>;
}

export function CustomerGrowthChart({ data }: CustomerGrowthChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || !data.length) return;

    const chart = echarts.init(chartRef.current);

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['New Customers', 'Churned'],
        top: 0,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '15%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: data.map((item) => item.month),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'New Customers',
          type: 'bar',
          data: data.map((item) => item.newCustomers),
          itemStyle: {
            color: '#22c55e',
            borderRadius: [4, 4, 0, 0],
          },
        },
        {
          name: 'Churned',
          type: 'bar',
          data: data.map((item) => item.churned),
          itemStyle: {
            color: '#ef4444',
            borderRadius: [4, 4, 0, 0],
          },
        },
      ],
    };

    chart.setOption(option);

    const handleResize = () => {
      chart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <EditableLabel labelKey="chart_growth_trend_title" as="h3" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={chartRef} className="h-[300px]" />
      </CardContent>
    </Card>
  );
}