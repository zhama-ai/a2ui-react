/**
 * TrendChart - 趋势图表
 *
 * 展示数据趋势（简化的折线/柱状图）
 */

import { createContainer, createText } from '../components';
import type { PatternResult, PatternOptions } from '../types';

export interface TrendDataPoint {
  /** 标签 */
  label: string;
  /** 值 */
  value: number;
}

export interface TrendChartOptions extends PatternOptions {
  /** 标题 */
  title?: string;
  /** 数据点 */
  data: TrendDataPoint[];
  /** 图表类型 */
  type?: 'bar' | 'line';
  /** 颜色 */
  color?: string;
  /** 是否显示数值 */
  showValues?: boolean;
  /** 变体 */
  variant?: 'default' | 'compact' | 'minimal';
  /** 高度 */
  height?: number;
}

/**
 * 创建趋势图表
 *
 * @example
 * ```typescript
 * const { rootId, components } = createTrendChart({
 *   title: '本周学习时长',
 *   data: [
 *     { label: '周一', value: 45 },
 *     { label: '周二', value: 60 },
 *     { label: '周三', value: 30 },
 *     { label: '周四', value: 75 },
 *     { label: '周五', value: 50 },
 *   ],
 *   type: 'bar',
 *   color: '#3b82f6',
 * });
 * ```
 */
export function createTrendChart(options: TrendChartOptions): PatternResult {
  const {
    id = 'trend-chart',
    title,
    data,
    type = 'bar',
    color = '#3b82f6',
    showValues = true,
    variant = 'default',
    height = 120,
  } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const isCompact = variant === 'compact';
  const isMinimal = variant === 'minimal';

  // 找出最大值用于计算比例
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  // 标题
  if (title && !isMinimal) {
    const titleId = `${id}-title`;
    containerChildIds.push(titleId);
    components.push(
      createText(titleId, title, {
        fontSize: '16px',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '16px',
      })
    );
  }

  // 图表区域
  const chartId = `${id}-chart`;
  const chartChildIds: string[] = [];

  if (type === 'bar') {
    // 柱状图
    data.forEach((point, index) => {
      const barGroupId = `${id}-bar-group-${index}`;
      const barGroupChildIds: string[] = [];

      const barHeight = Math.max((point.value / maxValue) * (height - 30), 4);

      // 数值标签
      if (showValues && !isMinimal) {
        const valueId = `${barGroupId}-value`;
        barGroupChildIds.push(valueId);
        components.push(
          createText(valueId, `${point.value}`, {
            fontSize: isCompact ? '10px' : '12px',
            color: '#6b7280',
            marginBottom: '4px',
          })
        );
      }

      // 柱子
      const barId = `${barGroupId}-bar`;
      barGroupChildIds.push(barId);
      components.push(
        createContainer(barId, [], {
          width: isCompact ? '16px' : '24px',
          height: `${barHeight}px`,
          backgroundColor: color,
          borderRadius: '4px 4px 0 0',
          transition: 'height 0.3s ease',
        })
      );

      // X轴标签
      const labelId = `${barGroupId}-label`;
      barGroupChildIds.push(labelId);
      components.push(
        createText(labelId, point.label, {
          fontSize: isCompact ? '10px' : '11px',
          color: '#9ca3af',
          marginTop: '6px',
          textAlign: 'center',
        })
      );
      components.push(
        createContainer(barGroupId, barGroupChildIds, {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          height: `${height}px`,
        })
      );
      chartChildIds.push(barGroupId);
    });
  } else {
    // 折线图 - 简化为点阵
    data.forEach((point, index) => {
      const pointGroupId = `${id}-point-group-${index}`;
      const pointGroupChildIds: string[] = [];

      const pointY = height - 30 - (point.value / maxValue) * (height - 40);

      // 点
      const pointId = `${pointGroupId}-point`;
      pointGroupChildIds.push(pointId);
      components.push(
        createContainer(pointId, [], {
          width: '10px',
          height: '10px',
          backgroundColor: color,
          borderRadius: '50%',
          border: '2px solid #ffffff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          marginTop: `${pointY}px`,
        })
      );

      // 数值
      if (showValues && !isMinimal) {
        const valueId = `${pointGroupId}-value`;
        pointGroupChildIds.push(valueId);
        components.push(
          createText(valueId, `${point.value}`, {
            fontSize: '10px',
            color: '#6b7280',
            marginTop: '4px',
          })
        );
      }

      // X轴标签
      const labelId = `${pointGroupId}-label`;
      pointGroupChildIds.push(labelId);
      components.push(
        createText(labelId, point.label, {
          fontSize: isCompact ? '10px' : '11px',
          color: '#9ca3af',
          marginTop: 'auto',
        })
      );
      components.push(
        createContainer(pointGroupId, pointGroupChildIds, {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: `${height}px`,
        })
      );
      chartChildIds.push(pointGroupId);
    });
  }
  components.push(
    createContainer(chartId, chartChildIds, {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-around',
      width: '100%',
      paddingBottom: '8px',
      borderBottom: isMinimal ? 'none' : '1px solid #e5e7eb',
    })
  );
  containerChildIds.push(chartId);

  // 主容器
  components.push(
    createContainer(id, containerChildIds, {
      display: 'flex',
      flexDirection: 'column',
    })
  );

  return { rootId: id, components };
}
