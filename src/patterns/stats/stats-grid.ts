/**
 * StatsGrid - 统计数据网格
 *
 * 以网格形式展示多个统计项
 */

import { createContainer, createIcon, createText } from '../components';
import type { PatternResult, StatItem, PatternOptions } from '../types';

export interface StatsGridOptions extends PatternOptions {
  /** 统计项列表 */
  items: StatItem[];
  /** 每行列数 */
  columns?: 2 | 3 | 4;
  /** 是否显示背景 */
  showBackground?: boolean;
  /** 变体 */
  variant?: 'default' | 'compact' | 'detailed';
}

/**
 * 创建统计数据网格
 *
 * @example
 * ```typescript
 * const { rootId, components } = createStatsGrid({
 *   items: [
 *     { icon: '📚', label: '总课程', value: '12' },
 *     { icon: '✅', label: '已完成', value: '8' },
 *     { icon: '⏱️', label: '学习时长', value: '24h' },
 *   ],
 *   columns: 3,
 * });
 * ```
 */
export function createStatsGrid(options: StatsGridOptions): PatternResult {
  const {
    id = 'stats-grid',
    items,
    columns = 3,
    showBackground = true,
    variant = 'default',
  } = options;

  const components: unknown[] = [];
  const statItemIds: string[] = [];

  // 创建每个统计项
  items.forEach((item, index) => {
    const itemId = `${id}-item-${index}`;
    statItemIds.push(itemId);

    const itemChildIds: string[] = [];

    // 图标
    const iconId = `${itemId}-icon`;
    itemChildIds.push(iconId);
    const iconStyle: Record<string, string> = {
      fontSize: variant === 'compact' ? '20px' : '24px',
      marginBottom: '8px',
    };
    if (item.color) {
      iconStyle.color = item.color;
    }
    components.push(createIcon(iconId, item.icon, iconStyle));

    // 值
    const valueId = `${itemId}-value`;
    itemChildIds.push(valueId);
    components.push(
      createText(valueId, item.value, {
        fontSize: variant === 'compact' ? '20px' : '24px',
        fontWeight: 'bold',
        color: item.color || '#1f2937',
        marginBottom: '4px',
      })
    );

    // 标签
    const labelId = `${itemId}-label`;
    itemChildIds.push(labelId);
    components.push(
      createText(labelId, item.label, {
        fontSize: '14px',
        color: '#6b7280',
      })
    );

    // 趋势（如果有）
    if (item.trend && variant === 'detailed') {
      const trendId = `${itemId}-trend`;
      itemChildIds.push(trendId);
      const trendColor =
        item.trend.direction === 'up'
          ? '#10b981'
          : item.trend.direction === 'down'
            ? '#ef4444'
            : '#6b7280';
      const trendIcon =
        item.trend.direction === 'up' ? '↑' : item.trend.direction === 'down' ? '↓' : '→';
      components.push(
        createText(trendId, `${trendIcon} ${item.trend.value}`, {
          fontSize: '12px',
          color: trendColor,
          marginTop: '4px',
        })
      );
    }

    // 统计项容器
    const itemStyle: Record<string, string> = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: variant === 'compact' ? '12px' : '16px',
    };
    if (showBackground) {
      itemStyle.backgroundColor = '#f9fafb';
      itemStyle.borderRadius = '8px';
    }
    components.push(createContainer(itemId, itemChildIds, itemStyle));
  });

  // 创建网格容器
  const gridStyle: Record<string, string> = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: '16px',
    width: '100%',
  };

  components.push(createContainer(id, statItemIds, gridStyle));

  return { rootId: id, components };
}
