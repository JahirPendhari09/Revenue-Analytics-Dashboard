
'use client';

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EditableLabel } from '../labels/EditableLabel';

interface RegionalChartProps {
  data: Array<{
    region: string;
    revenue: number;
    growth: number;
    market_share: number;
  }>;
}

export function RegionalChart({ data }: RegionalChartProps) {
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
        formatter: (params: any) => {
          const item = params[0];
          const dataItem = data[item.dataIndex];
          return `
            <strong>${dataItem.region}</strong><br/>
            Revenue: $${item.value.toLocaleString()}<br/>
            Growth: ${dataItem.growth}%<br/>
            Market Share: ${dataItem.market_share}%
          `;
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
        data: data.map((item) => item.region),
        axisLabel: {
          rotate: 15,
          fontSize: 11,
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
          data: data.map((item) => item.revenue),
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#8b5cf6' },
              { offset: 1, color: '#6d28d9' },
            ]),
            borderRadius: [4, 4, 0, 0],
          },
          barWidth: '60%',
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
          <EditableLabel labelKey="chart_regional_title" as="h3" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={chartRef} className="h-[300px]" />
      </CardContent>
    </Card>
  );
}
