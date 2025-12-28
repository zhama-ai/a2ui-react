/**
 * Badge - 徽章
 *
 * 状态标签、标记
 */

import { createText, createContainer } from '../components';
import type { PatternResult, Badge as BadgeData, PatternOptions } from '../types';

export interface BadgeOptions extends PatternOptions, BadgeData {
  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg';
  /** 变体 */
  variant?: 'solid' | 'outline' | 'subtle';
  /** 图标 */
  icon?: string;
}

/**
 * 根据类型获取颜色配置
 */
function getBadgeColors(
  type: 'info' | 'success' | 'warning' | 'error',
  variant: 'solid' | 'outline' | 'subtle'
): { bg: string; color: string; border?: string } {
  const colors = {
    info: { main: '#3b82f6', light: '#dbeafe' },
    success: { main: '#10b981', light: '#d1fae5' },
    warning: { main: '#f59e0b', light: '#fef3c7' },
    error: { main: '#ef4444', light: '#fee2e2' },
  };

  const c = colors[type];

  switch (variant) {
    case 'solid':
      return { bg: c.main, color: '#ffffff' };
    case 'outline':
      return { bg: 'transparent', color: c.main, border: c.main };
    case 'subtle':
    default:
      return { bg: c.light, color: c.main };
  }
}

/**
 * 创建徽章
 *
 * @example
 * ```typescript
 * const { rootId, components } = createBadge({
 *   text: '已完成',
 *   type: 'success',
 *   variant: 'subtle',
 * });
 * ```
 */
export function createBadge(options: BadgeOptions): PatternResult {
  const { id = 'badge', text, type = 'info', variant = 'subtle', size = 'md', icon } = options;

  const components: unknown[] = [];
  const badgeChildIds: string[] = [];

  const { bg, color, border } = getBadgeColors(type, variant);

  const sizeStyles = {
    sm: { fontSize: '10px', padding: '2px 6px' },
    md: { fontSize: '12px', padding: '4px 10px' },
    lg: { fontSize: '14px', padding: '6px 14px' },
  };

  // 图标（如果有）
  if (icon) {
    const iconId = `${id}-icon`;
    badgeChildIds.push(iconId);
    components.push(
      createText(iconId, icon, {
        fontSize: sizeStyles[size].fontSize,
        marginRight: '4px',
      })
    );
  }

  // 文本
  const textId = `${id}-text`;
  badgeChildIds.push(textId);
  components.push(
    createText(textId, text, {
      fontSize: sizeStyles[size].fontSize,
      fontWeight: '500',
      color,
    })
  );

  // 徽章容器
  const childListId = `${id}-children`;
  const containerStyle: Record<string, string> = {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: bg,
    borderRadius: '9999px',
    padding: sizeStyles[size].padding,
    whiteSpace: 'nowrap',
  };

  if (border) {
    containerStyle.border = `1px solid ${border}`;
  }

  components.push(createContainer(id, badgeChildIds, containerStyle));

  return { rootId: id, components };
}

/**
 * 创建多个徽章
 */
export interface BadgeGroupOptions extends PatternOptions {
  badges: BadgeOptions[];
  gap?: string;
}

export function createBadgeGroup(options: BadgeGroupOptions): PatternResult {
  const { id = 'badge-group', badges, gap = '8px' } = options;

  const components: unknown[] = [];
  const badgeIds: string[] = [];

  badges.forEach((badge, index) => {
    const badgeId = `${id}-badge-${index}`;
    const badgeResult = createBadge({ ...badge, id: badgeId });
    badgeIds.push(badgeResult.rootId);
    components.push(...badgeResult.components);
  });

  components.push(
    createContainer(id, badgeIds, {
      display: 'flex',
      flexWrap: 'wrap',
      gap,
    })
  );

  return { rootId: id, components };
}
