'use client';

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EditableLabel } from '../labels/EditableLabel';

interface SalesChartProps {
  data: Array<{
    month: string;
    sales: number;
  }>;
}

export function SalesChart({ data }: SalesChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || !data.length) return;
    const chartInstance = echarts.init(chartRef.current);
    chartInstance.setOption({
      title: { text: 'Sales Chart' },
      xAxis: { type: 'category', data: data.map(item => item.month) },
      yAxis: { type: 'value' },
      series: [{
        data: data.map(item => item.sales),
        type: 'bar',
      }],
    });

    const chart = echarts.init(chartRef.current);

    const option = {
      tooltip: {
        trigger: 'axis',
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
      },
      series: [
        {
          name: 'Sales',
          type: 'line',
          smooth: true,
          data: data.map((item) => item.sales),
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(34, 197, 94, 0.3)' },
              { offset: 1, color: 'rgba(34, 197, 94, 0.05)' },
            ]),
          },
          lineStyle: {
            color: '#22c55e',
            width: 2,
          },
          itemStyle: {
            color: '#22c55e',
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
          <EditableLabel labelKey="chart_sales_title" as="h3" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={chartRef} className="h-[300px]" />
      </CardContent>
    </Card>
  );
}