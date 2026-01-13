'use client';

import CountUp from 'react-countup';

type AnimatedNumberProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
};

export function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1.2,
}: AnimatedNumberProps) {
  return (
    <CountUp
      end={value}
      prefix={prefix}
      suffix={suffix}
      decimals={decimals}
      duration={duration}
      separator=","
    />
  );
}
