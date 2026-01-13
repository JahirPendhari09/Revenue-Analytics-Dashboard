'use client';

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EditableLabel } from '../labels/EditableLabel';

interface RevenueChartProps {
  data: Array<{
    month: string;
    revenue: number;
  }>;
}

export function RevenueChart({ data }: RevenueChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || !data.length) return;
    const chartInstance = echarts.init(chartRef.current);
    chartInstance.setOption({
      title: { text: 'Revenue Chart' },
      xAxis: { type: 'category', data: data.map(item => item.month) },
      yAxis: { type: 'value' },
      series: [{
        data: data.map(item => item.revenue),
        type: 'line',
      }],
    });

    const chart = echarts.init(chartRef.current);

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: data.map((item) => item.month),
        axisTick: {
          alignWithLabel: true,
        },
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
          type: 'bar',
          barWidth: '60%',
          data: data.map((item) => item.revenue),
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#3b82f6' },
              { offset: 1, color: '#1d4ed8' },
            ]),
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
          <EditableLabel labelKey="chart_revenue_title"  as="h3" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={chartRef} className="h-[300px]" />
      </CardContent>
    </Card>
  );
}