/**
 * A2UI Chart Component - v0.9 Protocol
 *
 * 直接使用原生 ECharts API，避免 echarts-for-react 在 React 18 严格模式下的问题
 * 支持 line、bar、pie、scatter、area、radar、gauge 图表类型
 */

import { useMemo, useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';

import { useTheme } from '../context/theme';
import type {
  AnyComponentNode,
  MessageProcessor,
  SurfaceID,
  ResolvedChart,
  ResolvedChartSeries,
  ResolvedChartAxis,
} from '../types/types';

import { extractStringValue, cn } from './utils';

export interface ChartProps {
  component: AnyComponentNode;
  processor: MessageProcessor | null;
  surfaceId: SurfaceID | null;
  chartType: ResolvedChart['chartType'];
  title?: ResolvedChart['title'];
  series: ResolvedChart['series'];
  xAxis?: ResolvedChartAxis;
  yAxis?: ResolvedChartAxis;
  legend?: ResolvedChart['legend'];
  tooltip?: ResolvedChart['tooltip'];
  height?: ResolvedChart['height'];
  width?: ResolvedChart['width'];
  echartsOption?: ResolvedChart['echartsOption'];
}

/**
 * 解析可能是路径绑定的值
 * 注意：使用严格的 undefined/null 检查，避免丢失 falsy 值（如 0、false、空字符串）
 *
 * 支持特殊路径语法：
 * - `/data/array[].field` - 提取数组中所有元素的指定字段
 */
function resolveValue<T>(
  value: T | { path: string } | undefined | null,
  component: AnyComponentNode,
  processor: MessageProcessor | null,
  surfaceId: SurfaceID | null
): T | undefined {
  if (value === undefined || value === null) return undefined;

  if (typeof value === 'object' && 'path' in value && value.path) {
    if (!processor || !surfaceId) return undefined;

    const path = value.path;

    // 处理 [] 语法：/data/array[].field -> 提取数组中所有元素的 field
    const arrayExtractMatch = path.match(/^(.+)\[\]\.(.+)$/);
    if (arrayExtractMatch) {
      const arrayPath = arrayExtractMatch[1];
      const fieldName = arrayExtractMatch[2];

      const arrayData = processor.getData(component, arrayPath!, surfaceId);
      if (Array.isArray(arrayData)) {
        return arrayData.map(item => {
          if (item && typeof item === 'object' && fieldName! in item) {
            return (item as Record<string, unknown>)[fieldName!];
          }
          return undefined;
        }).filter(v => v !== undefined) as T;
      }
      return undefined;
    }

    const resolved = processor.getData(component, path, surfaceId);
    return resolved as T;
  }

  return value as T;
}

/**
 * Chart 组件
 */
export function Chart({
  component,
  processor,
  surfaceId,
  chartType,
  title,
  series,
  xAxis,
  yAxis,
  legend = true,
  tooltip = true,
  height = 300,
  width,
  echartsOption,
}: ChartProps) {
  const theme = useTheme();

  // 解析标题
  const resolvedTitle = title ? extractStringValue(title, component, processor, surfaceId) : null;

  // 解析系列数据
  const resolvedSeries = useMemo(() => {
    const seriesData = resolveValue(series, component, processor, surfaceId);
    if (!seriesData || !Array.isArray(seriesData)) return [];

    return seriesData.map((s: ResolvedChartSeries) => {
      const data = resolveValue(s.data, component, processor, surfaceId);
      const seriesType = s.type || chartType;

      // 处理 area 类型（ECharts 使用 line + areaStyle）
      if (seriesType === 'area') {
        return {
          name: s.name,
          type: 'line' as const,
          data: data || [],
          areaStyle: {},
        };
      }

      // 处理 radar 图表（需要特殊配置）
      if (seriesType === 'radar') {
        return {
          name: s.name,
          type: 'radar' as const,
          data: Array.isArray(data) ? [{ value: data, name: s.name }] : [],
        };
      }

      // 处理 gauge 图表
      if (seriesType === 'gauge') {
        const gaugeValue = Array.isArray(data) ? data[0] : 0;
        return {
          name: s.name,
          type: 'gauge' as const,
          data: [{ value: gaugeValue, name: s.name }],
        };
      }

      return {
        name: s.name,
        type: seriesType as 'line' | 'bar' | 'pie' | 'scatter',
        data: data || [],
      };
    });
  }, [series, chartType, component, processor, surfaceId]);

  // 不需要坐标轴的图表类型
  const noAxisTypes = ['pie', 'radar', 'gauge'];

  // 解析 X 轴配置
  const resolvedXAxis = useMemo(() => {
    if (noAxisTypes.includes(chartType)) return undefined;
    if (!xAxis) return { type: 'category' as const };

    const data = resolveValue(xAxis.data, component, processor, surfaceId);
    return {
      type: xAxis.type || ('category' as const),
      data: data || undefined,
      name: xAxis.name,
    };
  }, [xAxis, chartType, component, processor, surfaceId]);

  // 解析 Y 轴配置
  const resolvedYAxis = useMemo(() => {
    if (noAxisTypes.includes(chartType)) return undefined;
    if (!yAxis) return { type: 'value' as const };

    return {
      type: yAxis.type || ('value' as const),
      name: yAxis.name,
    };
  }, [yAxis, chartType]);

  // 解析 radar 图表的 indicator 配置
  const resolvedRadar = useMemo(() => {
    if (chartType !== 'radar') return undefined;

    // 从 xAxis.data 获取 indicator
    const indicatorData = xAxis?.data ? resolveValue(xAxis.data, component, processor, surfaceId) : undefined;
    if (!indicatorData || !Array.isArray(indicatorData)) return { indicator: [] };

    return {
      indicator: indicatorData.map((name: string) => ({ name })),
    };
  }, [chartType, xAxis, component, processor, surfaceId]);

  // 解析扩展 option
  const resolvedEchartsOption = useMemo(() => {
    return resolveValue(echartsOption, component, processor, surfaceId) || {};
  }, [echartsOption, component, processor, surfaceId]);

  // 构建 ECharts option
  const option = useMemo(() => {
    // 确定 tooltip trigger 类型
    const tooltipTrigger = noAxisTypes.includes(chartType) ? 'item' : 'axis';

    const baseOption: Record<string, unknown> = {
      ...(resolvedTitle && {
        title: {
          text: resolvedTitle,
          left: 'center',
        },
      }),
      ...(tooltip && {
        tooltip: {
          trigger: tooltipTrigger,
        },
      }),
      ...(legend && {
        legend: {
          bottom: 0,
        },
      }),
      ...(resolvedXAxis && { xAxis: resolvedXAxis }),
      ...(resolvedYAxis && { yAxis: resolvedYAxis }),
      ...(resolvedRadar && { radar: resolvedRadar }),
      series: resolvedSeries,
    };

    // 合并用户自定义 option
    return {
      ...baseOption,
      ...resolvedEchartsOption,
    };
  }, [
    resolvedTitle,
    tooltip,
    legend,
    chartType,
    resolvedXAxis,
    resolvedYAxis,
    resolvedRadar,
    resolvedSeries,
    resolvedEchartsOption,
  ]);

  // 计算样式
  const containerStyle: React.CSSProperties = {
    height: height,
    width: width || '100%',
  };

  const themeClasses = theme.components.Chart || {};

  // 使用 ref 来管理 ECharts 实例和容器
  const containerRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<ECharts | null>(null);

  // 初始化和清理 ECharts 实例
  useEffect(() => {
    if (!containerRef.current) return;

    // 初始化 ECharts 实例
    const chart = echarts.init(containerRef.current, undefined, { renderer: 'canvas' });
    chartInstanceRef.current = chart;

    // 设置选项
    chart.setOption(option as EChartsOption, true);

    // 处理窗口 resize
    const handleResize = () => {
      chart.resize();
    };
    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartInstanceRef.current) {
        chartInstanceRef.current.dispose();
        chartInstanceRef.current = null;
      }
    };
  }, []); // 只在挂载时初始化

  // 当 option 变化时更新图表
  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.setOption(option as EChartsOption, true);
    }
  }, [option]);

  return (
    <div className={cn(themeClasses)} style={containerStyle}>
      <div ref={containerRef} style={{ height: '100%', width: '100%' }} />
    </div>
  );
}

