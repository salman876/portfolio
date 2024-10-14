import { ColorType, IChartApi, Time, createChart } from 'lightweight-charts';
import { FC, useEffect, useRef } from 'react';

import { colors } from 'constants/theme';

import { Tabs } from 'components/ui/Tabs';

import { ChartMount, TabWrapper } from './Chart.styles';

const DAY_RANGE_TABS: { label: string; value: number }[] = [
  {
    label: '1d',
    value: 1,
  },
  {
    label: '7d',
    value: 7,
  },
  {
    label: '30d',
    value: 30,
  },
];

type ChartProps = {
  basePrice: number;
  data: [number, number][];
  currentDayRange: number;
  onDayRangeChange: (days: number) => void;
};

export const Chart: FC<ChartProps> = ({ data, basePrice, currentDayRange, onDayRangeChange }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const chartOptions = {
        height: 480,
        autoSize: true,
        handleScroll: true,
        handleScale: true,
        layout: {
          textColor: 'white',
          background: { type: ColorType.VerticalGradient, color: colors.cardBackground },
        },
        grid: {
          vertLines: {
            visible: false,
          },
          horzLines: {
            visible: false,
          },
        },
        timeScale: {
          timeVisible: true,
        },
      };
      chartRef.current = createChart(chartContainerRef.current, chartOptions);

      const baselineSeries = chartRef.current.addBaselineSeries({
        baseValue: { type: 'price', price: basePrice },
        topLineColor: 'rgba( 38, 166, 154, 1)',
        topFillColor1: 'rgba( 38, 166, 154, 0.28)',
        topFillColor2: 'rgba( 38, 166, 154, 0.05)',
        bottomLineColor: 'rgba( 239, 83, 80, 1)',
        bottomFillColor1: 'rgba( 239, 83, 80, 0.05)',
        bottomFillColor2: 'rgba( 239, 83, 80, 0.28)',
      });

      const chartData = data.map(dataItem => ({
        value: dataItem[1],
        time: Math.floor(dataItem[0] / 1000) as Time,
      }));

      baselineSeries.setData(chartData);
      chartRef.current.timeScale().fitContent();
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, [basePrice, data]);

  return (
    <>
      <ChartMount ref={chartContainerRef} />
      <TabWrapper>
        <Tabs tabs={DAY_RANGE_TABS} selectedTab={currentDayRange} onChange={onDayRangeChange} />
      </TabWrapper>
    </>
  );
};
