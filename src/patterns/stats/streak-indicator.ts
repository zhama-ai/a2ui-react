/**
 * StreakIndicator - 连续记录指示器
 *
 * 展示连续天数、打卡记录等
 */

import { createContainer, createIcon, createText } from '../components';
import type { PatternResult, PatternOptions } from '../types';

export interface StreakIndicatorOptions extends PatternOptions {
  /** 连续天数 */
  streak: number;
  /** 图标 */
  icon?: string;
  /** 标签 */
  label?: string;
  /** 最佳记录 */
  bestStreak?: number;
  /** 变体 */
  variant?: 'default' | 'compact' | 'fire';
  /** 颜色 */
  color?: string;
}

/**
 * 获取连续记录颜色
 */
function getStreakColor(streak: number): string {
  if (streak >= 30) return '#ef4444';
  if (streak >= 14) return '#f97316';
  if (streak >= 7) return '#f59e0b';
  if (streak >= 3) return '#eab308';
  return '#6b7280';
}

/**
 * 创建连续记录指示器
 *
 * @example
 * ```typescript
 * const { rootId, components } = createStreakIndicator({
 *   streak: 7,
 *   icon: '🔥',
 *   label: '连续学习',
 *   bestStreak: 15,
 * });
 * ```
 */
export function createStreakIndicator(options: StreakIndicatorOptions): PatternResult {
  const {
    id = 'streak',
    streak,
    icon = '🔥',
    label = '连续',
    bestStreak,
    variant = 'default',
    color,
  } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const streakColor = color || getStreakColor(streak);
  const isCompact = variant === 'compact';

  // 火焰变体 - 多个火焰图标
  if (variant === 'fire' && streak > 0) {
    const fireCount = Math.min(streak, 5);
    const fireRowId = `${id}-fire-row`;
    const fireIds: string[] = [];

    for (let i = 0; i < fireCount; i++) {
      const fireId = `${id}-fire-${i}`;
      fireIds.push(fireId);
      components.push(
        createIcon(fireId, '🔥', {
          fontSize: '24px',
          opacity: 1 - i * 0.15 + '',
        })
      );
    }

    if (streak > 5) {
      const moreId = `${id}-fire-more`;
      fireIds.push(moreId);
      components.push(
        createText(moreId, `+${streak - 5}`, {
          fontSize: '16px',
          fontWeight: 'bold',
          color: streakColor,
          marginLeft: '4px',
        })
      );
    }
    components.push(
      createContainer(fireRowId, fireIds, {
        display: 'flex',
        alignItems: 'center',
      })
    );
    containerChildIds.push(fireRowId);
  } else {
    // 默认和紧凑变体
    // 图标
    const iconId = `${id}-icon`;
    containerChildIds.push(iconId);
    components.push(
      createIcon(iconId, icon, {
        fontSize: isCompact ? '20px' : '28px',
      })
    );

    // 数字
    const numberId = `${id}-number`;
    containerChildIds.push(numberId);
    components.push(
      createText(numberId, `${streak}`, {
        fontSize: isCompact ? '24px' : '32px',
        fontWeight: 'bold',
        color: streakColor,
        marginLeft: '8px',
      })
    );

    // 标签
    const labelId = `${id}-label`;
    containerChildIds.push(labelId);
    components.push(
      createText(labelId, label, {
        fontSize: isCompact ? '12px' : '14px',
        color: '#6b7280',
        marginLeft: '4px',
      })
    );
  }

  // 最佳记录（如果有）
  if (bestStreak !== undefined && bestStreak > streak && !isCompact) {
    const bestId = `${id}-best`;
    containerChildIds.push(bestId);
    components.push(
      createText(bestId, `最佳: ${bestStreak}天`, {
        fontSize: '12px',
        color: '#9ca3af',
        marginLeft: '12px',
        paddingLeft: '12px',
        borderLeft: '1px solid #e5e7eb',
      })
    );
  }

  // 主容器
  components.push(
    createContainer(id, containerChildIds, {
      display: 'flex',
      alignItems: 'center',
      padding: isCompact ? '8px 12px' : '12px 16px',
      backgroundColor: '#fffbeb',
      borderRadius: '12px',
    })
  );

  return { rootId: id, components };
}
