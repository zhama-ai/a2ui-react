/**
 * ActivityHeatmap - 活动热力图
 *
 * 展示活动频率（类似 GitHub 贡献图）
 */

import { createContainer, createText } from '../components';
import type { PatternResult, PatternOptions } from '../types';

export interface ActivityData {
  /** 日期 (YYYY-MM-DD) */
  date: string;
  /** 活动次数/强度 */
  count: number;
}

export interface ActivityHeatmapOptions extends PatternOptions {
  /** 标题 */
  title?: string;
  /** 活动数据 */
  data: ActivityData[];
  /** 显示周数 */
  weeks?: number;
  /** 颜色主题 */
  color?: string;
  /** 变体 */
  variant?: 'default' | 'compact';
  /** 是否显示月份标签 */
  showMonths?: boolean;
  /** 是否显示星期标签 */
  showWeekdays?: boolean;
}

/**
 * 获取活动强度颜色
 */
function getActivityColor(count: number, maxCount: number, baseColor: string): string {
  if (count === 0) return '#ebedf0';

  const intensity = Math.min(count / maxCount, 1);
  const alpha = 0.2 + intensity * 0.8;

  // 简化处理：使用固定的绿色梯度
  if (intensity < 0.25) return '#9be9a8';
  if (intensity < 0.5) return '#40c463';
  if (intensity < 0.75) return '#30a14e';
  return '#216e39';
}

/**
 * 创建活动热力图
 *
 * @example
 * ```typescript
 * const { rootId, components } = createActivityHeatmap({
 *   title: '学习活动',
 *   data: [
 *     { date: '2024-01-01', count: 5 },
 *     { date: '2024-01-02', count: 3 },
 *     // ...
 *   ],
 *   weeks: 12,
 * });
 * ```
 */
export function createActivityHeatmap(options: ActivityHeatmapOptions): PatternResult {
  const {
    id = 'activity-heatmap',
    title,
    data,
    weeks = 12,
    color = '#10b981',
    variant = 'default',
    showMonths = true,
    showWeekdays = true,
  } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const isCompact = variant === 'compact';
  const cellSize = isCompact ? 10 : 12;
  const cellGap = 2;

  // 构建数据映射
  const dataMap = new Map<string, number>();
  let maxCount = 1;
  data.forEach((d) => {
    dataMap.set(d.date, d.count);
    if (d.count > maxCount) maxCount = d.count;
  });

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

  // 热力图容器
  const heatmapId = `${id}-heatmap`;
  const heatmapChildIds: string[] = [];

  // 星期标签
  if (showWeekdays && !isCompact) {
    const weekdaysId = `${id}-weekdays`;
    const weekdayLabels = ['一', '三', '五'];
    const weekdayChildIds: string[] = [];

    weekdayLabels.forEach((label, idx) => {
      const labelId = `${weekdaysId}-${idx}`;
      weekdayChildIds.push(labelId);
      components.push(
        createText(labelId, label, {
          fontSize: '10px',
          color: '#6b7280',
          height: `${cellSize}px`,
          lineHeight: `${cellSize}px`,
          marginBottom: `${cellSize + cellGap}px`,
        })
      );
    });
    components.push(
      createContainer(weekdaysId, weekdayChildIds, {
        display: 'flex',
        flexDirection: 'column',
        marginRight: '8px',
        paddingTop: showMonths ? '20px' : '0',
      })
    );
    heatmapChildIds.push(weekdaysId);
  }

  // 周列容器
  const weeksContainerId = `${id}-weeks`;
  const weekIds: string[] = [];

  // 生成周数据
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - (weeks * 7 - 1));

  for (let w = 0; w < weeks; w++) {
    const weekId = `${id}-week-${w}`;
    const dayIds: string[] = [];

    for (let d = 0; d < 7; d++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + w * 7 + d);

      if (currentDate > today) continue;

      const dateStr = currentDate.toISOString().split('T')[0] || '';
      const count = dataMap.get(dateStr) || 0;
      const cellColor = getActivityColor(count, maxCount, color);

      const dayId = `${weekId}-day-${d}`;
      dayIds.push(dayId);
      components.push(
        createContainer(dayId, [], {
          width: `${cellSize}px`,
          height: `${cellSize}px`,
          backgroundColor: cellColor,
          borderRadius: '2px',
        })
      );
    }
    components.push(
      createContainer(weekId, dayIds, {
        display: 'flex',
        flexDirection: 'column',
        gap: `${cellGap}px`,
      })
    );
    weekIds.push(weekId);
  }
  components.push(
    createContainer(weeksContainerId, weekIds, {
      display: 'flex',
      gap: `${cellGap}px`,
    })
  );
  heatmapChildIds.push(weeksContainerId);
  components.push(
    createContainer(heatmapId, heatmapChildIds, {
      display: 'flex',
    })
  );
  containerChildIds.push(heatmapId);

  // 图例
  if (!isCompact) {
    const legendId = `${id}-legend`;
    const legendChildIds: string[] = [];

    const lessId = `${legendId}-less`;
    legendChildIds.push(lessId);
    components.push(
      createText(lessId, '少', {
        fontSize: '10px',
        color: '#6b7280',
        marginRight: '4px',
      })
    );

    const levels = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
    levels.forEach((lvl, idx) => {
      const lvlId = `${legendId}-lvl-${idx}`;
      legendChildIds.push(lvlId);
      components.push(
        createContainer(lvlId, [], {
          width: `${cellSize}px`,
          height: `${cellSize}px`,
          backgroundColor: lvl,
          borderRadius: '2px',
          marginRight: '2px',
        })
      );
    });

    const moreId = `${legendId}-more`;
    legendChildIds.push(moreId);
    components.push(
      createText(moreId, '多', {
        fontSize: '10px',
        color: '#6b7280',
        marginLeft: '4px',
      })
    );
    components.push(
      createContainer(legendId, legendChildIds, {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: '8px',
      })
    );
    containerChildIds.push(legendId);
  }

  // 主容器
  components.push(
    createContainer(id, containerChildIds, {
      display: 'flex',
      flexDirection: 'column',
    })
  );

  return { rootId: id, components };
}
