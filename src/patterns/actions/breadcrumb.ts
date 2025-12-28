/**
 * Breadcrumb - 面包屑导航
 *
 * 层级导航
 */

import { createContainer, createText, createButton } from '../components';
import type { PatternResult, PatternOptions } from '../types';

export interface BreadcrumbItem {
  /** 唯一 ID */
  id: string;
  /** 显示文本 */
  text: string;
  /** 图标（可选） */
  icon?: string;
  /** 导航动作（最后一项通常没有） */
  action?: string;
  /** 动作上下文 */
  context?: Record<string, string>;
}

export interface BreadcrumbOptions extends PatternOptions {
  /** 面包屑项 */
  items: BreadcrumbItem[];
  /** 分隔符 */
  separator?: string;
  /** 变体 */
  variant?: 'default' | 'compact' | 'pills';
  /** 最大显示数量（超出则折叠） */
  maxItems?: number;
}

/**
 * 创建面包屑导航
 *
 * @example
 * ```typescript
 * const { rootId, components } = createBreadcrumb({
 *   items: [
 *     { id: 'home', text: '首页', icon: '🏠', action: 'go_home' },
 *     { id: 'course', text: 'Python课程', action: 'go_course' },
 *     { id: 'lesson', text: '第3课：循环语句' },
 *   ],
 *   separator: '/',
 * });
 * ```
 */
export function createBreadcrumb(options: BreadcrumbOptions): PatternResult {
  const { id = 'breadcrumb', items, separator = '/', variant = 'default', maxItems } = options;

  const components: unknown[] = [];
  const crumbIds: string[] = [];

  const isCompact = variant === 'compact';
  const isPills = variant === 'pills';

  // 处理折叠逻辑
  let displayItems = items;

  if (maxItems && items.length > maxItems) {
    const first = items.slice(0, 1);
    const last = items.slice(-(maxItems - 2));
    displayItems = [...first, { id: 'collapsed', text: '...', icon: undefined }, ...last];
  }

  displayItems.forEach((item, index) => {
    const isLast = index === displayItems.length - 1;
    const isCollapsed = item.id === 'collapsed';

    // 添加分隔符（不是第一个）
    if (index > 0) {
      const sepId = `${id}-sep-${index}`;
      crumbIds.push(sepId);
      components.push(
        createText(sepId, separator, {
          fontSize: isCompact ? '10px' : '12px',
          color: '#9ca3af',
          margin: '0 8px',
        })
      );
    }

    const itemId = `${id}-item-${index}`;

    // 构建显示文本（包含图标）
    const displayText = item.icon ? `${item.icon} ${item.text}` : item.text;

    // 可点击项使用 button，否则使用纯文本
    let actualItemId = itemId;
    if (item.action && !isLast && !isCollapsed) {
      const context = item.context
        ? Object.entries(item.context).map(([key, value]) => ({ key, value }))
        : [];

      const btnResult = createButton(itemId, displayText, item.action, context, {
        styles: {
          display: 'inline-flex',
          alignItems: 'center',
          backgroundColor: isPills ? '#f3f4f6' : 'transparent',
          border: 'none',
          padding: isPills ? '4px 8px' : '0',
          borderRadius: isPills ? '4px' : '0',
          cursor: 'pointer',
          transition: 'color 0.2s',
          fontSize: isCompact ? '12px' : '14px',
          color: '#6b7280',
        },
      });
      components.push(...btnResult.allComponents);
      actualItemId = btnResult.buttonId;
    } else {
      // 静态文本项
      components.push(
        createText(itemId, displayText, {
          display: 'inline-flex',
          alignItems: 'center',
          backgroundColor: isPills && isLast ? '#3b82f6' : isPills ? '#f3f4f6' : 'transparent',
          padding: isPills ? '4px 8px' : '0',
          borderRadius: isPills ? '4px' : '0',
          fontSize: isCompact ? '12px' : '14px',
          color: isPills && isLast ? '#ffffff' : isLast ? '#1f2937' : '#6b7280',
          fontWeight: isLast ? '500' : 'normal',
        })
      );
      actualItemId = itemId;
    }

    crumbIds.push(actualItemId);
  });

  // 主容器
  components.push(
    createContainer(id, crumbIds, {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
    })
  );

  return { rootId: id, components };
}
