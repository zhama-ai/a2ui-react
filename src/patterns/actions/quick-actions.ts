/**
 * QuickActions - 快速操作
 *
 * 图标+文本的快速操作入口
 */

import { createContainer, createText, createButton } from '../components';
import type { PatternResult, PatternOptions, ActionButton } from '../types';

export interface QuickActionItem extends ActionButton {
  /** 描述 */
  description?: string;
  /** 颜色 */
  color?: string;
}

export interface QuickActionsOptions extends PatternOptions {
  /** 标题 */
  title?: string;
  /** 操作项 */
  items: QuickActionItem[];
  /** 列数 */
  columns?: 2 | 3 | 4;
  /** 变体 */
  variant?: 'default' | 'compact' | 'card';
}

/**
 * 创建快速操作
 *
 * @example
 * ```typescript
 * const { rootId, components } = createQuickActions({
 *   title: '快速开始',
 *   items: [
 *     { id: 'explore', icon: 'compass', text: '探索课程', action: 'explore_courses' },
 *     { id: 'practice', icon: 'edit', text: '开始练习', action: 'start_practice' },
 *     { id: 'review', icon: 'book-open', text: '复习内容', action: 'review_content' },
 *   ],
 *   columns: 3,
 * });
 * ```
 */
export function createQuickActions(options: QuickActionsOptions): PatternResult {
  const { id = 'quick-actions', title, items, columns = 3, variant = 'default' } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const isCompact = variant === 'compact';
  const isCard = variant === 'card';

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

  // 操作网格
  const gridId = `${id}-grid`;
  const itemIds: string[] = [];

  items.forEach((item, index) => {
    const itemId = `${id}-item-${index}`;

    // 构建操作上下文
    const actionContext = item.context
      ? Object.entries(item.context).map(([key, value]) => ({ key, value }))
      : [];

    // 创建按钮（带图标）
    const btnResult = createButton(itemId, item.text, item.action, actionContext, {
      icon: item.icon,
      styles: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isCompact ? '12px' : isCard ? '20px' : '16px',
        backgroundColor: isCard ? '#ffffff' : '#f9fafb',
        borderRadius: '12px',
        border: isCard ? '1px solid #e5e7eb' : 'none',
        cursor: item.disabled ? 'not-allowed' : 'pointer',
        opacity: item.disabled ? '0.5' : '1',
        transition: 'all 0.2s',
        minHeight: isCompact ? '80px' : '100px',
        width: '100%',
        textAlign: 'center',
      },
    });
    components.push(...btnResult.allComponents);

    // 描述（如果有且非紧凑模式）
    if (item.description && !isCompact) {
      const descId = `${itemId}-desc`;
      components.push(
        createText(descId, item.description, {
          fontSize: '12px',
          color: '#6b7280',
          textAlign: 'center',
          marginTop: '4px',
        })
      );

      // 如果有描述，创建一个包含按钮和描述的容器
      const itemContainerId = `${itemId}-container`;
      components.push(
        createContainer(itemContainerId, [btnResult.buttonId, descId], {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        })
      );
      itemIds.push(itemContainerId);
    } else {
      itemIds.push(btnResult.buttonId);
    }
  });

  components.push(
    createContainer(gridId, itemIds, {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: isCompact ? '8px' : '12px',
    })
  );
  containerChildIds.push(gridId);

  // 主容器
  components.push(
    createContainer(id, containerChildIds, {
      display: 'flex',
      flexDirection: 'column',
    })
  );

  return { rootId: id, components };
}
