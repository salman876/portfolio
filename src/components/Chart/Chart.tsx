import { ColorType, IChartApi, ISeriesApi, LastPriceAnimationMode, Time, createChart } from 'lightweight-charts';
import { FC, useEffect, useRef } from 'react';

import { colors } from 'constants/theme';

import { Tabs } from 'components/ui/Tabs';

import { ChartMount, ChartWrapper, TabWrapper } from './Chart.styles';

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

type ChartProps = {
  basePrice: number;
  data: [number, number][];
  currentDayRange: number;
  onDayRangeChange: (days: number) => void;
};

export const Chart: FC<ChartProps> = ({ data, basePrice, currentDayRange, onDayRangeChange }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const series = useRef<ISeriesApi<'Baseline'> | null>(null);

  // handle chart
  useEffect(() => {
    if (chartContainerRef.current) {
      chartRef.current = createChart(chartContainerRef.current, chartOptions);

      series.current = chartRef.current.addBaselineSeries({
        topLineColor: 'rgba( 38, 166, 154, 1)',
        topFillColor1: 'rgba( 38, 166, 154, 0.28)',
        topFillColor2: 'rgba( 38, 166, 154, 0.05)',
        bottomLineColor: 'rgba( 239, 83, 80, 1)',
        bottomFillColor1: 'rgba( 239, 83, 80, 0.05)',
        bottomFillColor2: 'rgba( 239, 83, 80, 0.28)',
        lastPriceAnimation: LastPriceAnimationMode.Continuous,
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, []);

  // Handle chart data
  useEffect(() => {
    if (!chartRef.current || !series.current) return;

    const chartData = data.map(dataItem => ({
      value: dataItem[1],
      time: Math.floor(dataItem[0] / 1000) as Time,
    }));

    // basePrice usually only changes when data changes
    series.current.applyOptions({
      baseValue: { type: 'price', price: basePrice },
    });

    series.current.setData(chartData);

    chartRef.current.timeScale().fitContent();
  }, [basePrice, data]);

  return (
    <>
      <ChartWrapper>
        <ChartMount ref={chartContainerRef} />
      </ChartWrapper>
      <TabWrapper>
        <Tabs tabs={DAY_RANGE_TABS} selectedTab={currentDayRange} onChange={onDayRangeChange} />
      </TabWrapper>
    </>
  );
};
