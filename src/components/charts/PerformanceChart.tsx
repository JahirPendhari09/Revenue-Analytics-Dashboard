
'use client';

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EditableLabel } from '../labels/EditableLabel';

interface PerformanceChartProps {
  data: Array<{
    month: string;
    revenue: number;
    profit: number;
    expenses: number;
  }>;
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || !data.length) return;

    const chart = echarts.init(chartRef.current);

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      legend: {
        data: ['Revenue', 'Profit', 'Expenses'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.map((item) => item.month),
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '${value}',
        },
      },
      series: [
        {
          name: 'Revenue',
          type: 'line',
          smooth: true,
          data: data.map((item) => item.revenue),
          lineStyle: {
            color: '#3b82f6',
            width: 2,
          },
          itemStyle: {
            color: '#3b82f6',
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
              { offset: 1, color: 'rgba(59, 130, 246, 0.05)' },
            ]),
          },
        },
        {
          name: 'Profit',
          type: 'line',
          smooth: true,
          data: data.map((item) => item.profit),
          lineStyle: {
            color: '#22c55e',
            width: 2,
          },
          itemStyle: {
            color: '#22c55e',
          },
        },
        {
          name: 'Expenses',
          type: 'line',
          smooth: true,
          data: data.map((item) => item.expenses),
          lineStyle: {
            color: '#ef4444',
            width: 2,
          },
          itemStyle: {
            color: '#ef4444',
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
          <EditableLabel labelKey="chart_performance_title" as="h3" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={chartRef} className="h-[350px]" />
      </CardContent>
    </Card>
  );
}