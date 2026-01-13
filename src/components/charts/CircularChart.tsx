'use client';

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EditableLabel } from '@/components/labels/EditableLabel';

export type CircularChartDataItem = {
  name: string;
  value: number;
  extra?: Record<string, any>;
};

interface CircularChartProps {
  titleLabelKey: string;
  data: CircularChartDataItem[];
  tooltipFormatter?: (params: any) => string;
  totalLabel?: string;
  colors?: string[];
  showDoller?: boolean
}

export function CircularChart({
  titleLabelKey,
  data,
  tooltipFormatter,
  totalLabel = 'Total',
  colors = ['#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6', '#de8264'],
  showDoller = false
}: CircularChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || !data.length) return;

    const chart = echarts.init(chartRef.current);
    const total = data.reduce((sum, item) => sum + item.value, 0);

    chart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: tooltipFormatter,
      },

      legend: {
        orient: 'vertical',
        left: 'left',
        bottom: 0 ,
      },

      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '45%'],
          z: 5,
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: true,
            formatter: '{b}\n{d}%',
            fontSize: 12,
          },
          emphasis: {
            scale: true,
            scaleSize: 10,
          },
          data: data.map((item, index) => ({
            ...item,
            itemStyle: {
              color: colors[index % colors.length],
            },
          })),
        },
      ],

      graphic: [
        {
          type: 'text',
          left: 'center',
          top: '43%',
          style: {
            text: showDoller ? `$${total.toLocaleString()}` : total.toLocaleString(),
            fontSize: 16,
            fontWeight: 600,
            fill: '#111',
            textAlign: 'center',
          },
        },
        {
          type: 'text',
          left: 'center',
          top: '49%',
          style: {
            text: totalLabel,
            fontSize: 12,
            fill: '#6b7280',
            textAlign: 'center',
          },
        },
      ]
    });

    const resize = () => chart.resize();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      chart.dispose();
    };
  }, [data, tooltipFormatter, totalLabel, colors]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <EditableLabel labelKey={titleLabelKey} as="h3" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={chartRef} className="h-[350px]" />
      </CardContent>
    </Card>
  );
}
