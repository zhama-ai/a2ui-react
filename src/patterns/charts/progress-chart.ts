/**
 * ProgressChart - 进度图表
 *
 * 展示多个项目的进度对比
 */

import { createContainer, createText } from '../components';
import type { PatternResult, PatternOptions } from '../types';

export interface ProgressItem {
  /** 标签 */
  label: string;
  /** 当前值 */
  value: number;
  /** 最大值 */
  maxValue?: number;
  /** 颜色 */
  color?: string;
  /** 图标 */
  icon?: string;
}

export interface ProgressChartOptions extends PatternOptions {
  /** 标题 */
  title?: string;
  /** 进度项 */
  items: ProgressItem[];
  /** 变体 */
  variant?: 'default' | 'stacked' | 'comparison';
  /** 是否显示百分比 */
  showPercentage?: boolean;
  /** 是否显示数值 */
  showValue?: boolean;
}

/**
 * 创建进度图表
 *
 * @example
 * ```typescript
 * const { rootId, components } = createProgressChart({
 *   title: '学习进度',
 *   items: [
 *     { label: 'Python 基础', value: 80, color: '#3b82f6' },
 *     { label: 'JavaScript', value: 65, color: '#f59e0b' },
 *     { label: 'React', value: 30, color: '#10b981' },
 *   ],
 *   showPercentage: true,
 * });
 * ```
 */
export function createProgressChart(options: ProgressChartOptions): PatternResult {
  const {
    id = 'progress-chart',
    title,
    items,
    variant = 'default',
    showPercentage = true,
    showValue = false,
  } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  // 标题
  if (title) {
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

  // 默认颜色
  const defaultColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  // 进度项列表
  const itemsContainerId = `${id}-items`;
  const itemIds: string[] = [];

  items.forEach((item, index) => {
    const itemId = `${id}-item-${index}`;
    const itemChildIds: string[] = [];

    const color = item.color || defaultColors[index % defaultColors.length] || '#3b82f6';
    const maxValue = item.maxValue || 100;
    const percentage = Math.min(100, Math.round((item.value / maxValue) * 100));

    // 标签行
    const labelRowId = `${itemId}-label-row`;
    const labelRowChildIds: string[] = [];

    // 图标和标签
    const labelId = `${itemId}-label`;
    labelRowChildIds.push(labelId);
    const labelText = item.icon ? `${item.icon} ${item.label}` : item.label;
    components.push(
      createText(labelId, labelText, {
        fontSize: '14px',
        color: '#374151',
        flex: '1',
      })
    );

    // 数值/百分比
    if (showValue || showPercentage) {
      const valueId = `${itemId}-value`;
      labelRowChildIds.push(valueId);
      const displayValue = showValue ? `${item.value}/${maxValue}` : `${percentage}%`;
      components.push(
        createText(valueId, displayValue, {
          fontSize: '13px',
          fontWeight: '500',
          color: color,
        })
      );
    }
    components.push(
      createContainer(labelRowId, labelRowChildIds, {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '6px',
      })
    );
    itemChildIds.push(labelRowId);

    // 进度条
    const barId = `${itemId}-bar`;
    const barChildIds: string[] = [];

    const fillId = `${itemId}-fill`;
    barChildIds.push(fillId);
    components.push(
      createContainer(fillId, [], {
        width: `${percentage}%`,
        height: '100%',
        backgroundColor: color,
        borderRadius: '4px',
        transition: 'width 0.3s ease',
      })
    );
    components.push(
      createContainer(barId, barChildIds, {
        width: '100%',
        height: '8px',
        backgroundColor: '#e5e7eb',
        borderRadius: '4px',
        overflow: 'hidden',
      })
    );
    itemChildIds.push(barId);

    // 进度项容器
    components.push(
      createContainer(itemId, itemChildIds, {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: index < items.length - 1 ? '16px' : '0',
      })
    );
    itemIds.push(itemId);
  });
  components.push(
    createContainer(itemsContainerId, itemIds, {
      display: 'flex',
      flexDirection: 'column',
    })
  );
  containerChildIds.push(itemsContainerId);

  // 主容器
  components.push(
    createContainer(id, containerChildIds, {
      display: 'flex',
      flexDirection: 'column',
    })
  );

  return { rootId: id, components };
}
