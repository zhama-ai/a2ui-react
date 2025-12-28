/**
 * RelatedContentCard - 相关内容卡片
 *
 * 展示相关推荐、延伸阅读等
 */

import { createContainer, createIcon, createText, createButton } from '../components';
import type { PatternResult, PatternOptions, ActionButton } from '../types';

export interface RelatedContentItem {
  /** 唯一 ID */
  id: string;
  /** 图标 */
  icon: string;
  /** 标题 */
  title: string;
  /** 类型标签 */
  type?: string;
  /** 操作 */
  action: ActionButton;
}

export interface RelatedContentCardOptions extends PatternOptions {
  /** 标题 */
  title?: string;
  /** 相关内容列表 */
  items: RelatedContentItem[];
  /** 变体 */
  variant?: 'default' | 'list' | 'grid';
  /** 最大显示数量 */
  maxItems?: number;
}

/**
 * 创建相关内容卡片
 *
 * @example
 * ```typescript
 * const { rootId, components } = createRelatedContentCard({
 *   title: '相关推荐',
 *   items: [
 *     {
 *       id: '1',
 *       icon: '📖',
 *       title: 'Python 变量详解',
 *       type: '文章',
 *       action: { id: 'read', text: '阅读', action: 'read_article' },
 *     },
 *     {
 *       id: '2',
 *       icon: '🎬',
 *       title: '数据类型视频教程',
 *       type: '视频',
 *       action: { id: 'watch', text: '观看', action: 'watch_video' },
 *     },
 *   ],
 * });
 * ```
 */
export function createRelatedContentCard(options: RelatedContentCardOptions): PatternResult {
  const {
    id = 'related-content',
    title = '相关推荐',
    items,
    variant = 'default',
    maxItems = 5,
  } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const isGrid = variant === 'grid';
  const displayItems = items.slice(0, maxItems);

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

  // 内容列表
  const listId = `${id}-list`;
  const itemIds: string[] = [];

  displayItems.forEach((item, idx) => {
    const itemId = `${id}-item-${idx}`;
    const itemChildIds: string[] = [];

    // 图标
    const iconId = `${itemId}-icon`;
    itemChildIds.push(iconId);
    components.push(
      createIcon(iconId, item.icon, {
        fontSize: '20px',
        flexShrink: '0',
      })
    );

    // 内容区域
    const contentId = `${itemId}-content`;
    const contentChildIds: string[] = [];

    // 标题
    const itemTitleId = `${itemId}-title`;
    contentChildIds.push(itemTitleId);
    components.push(
      createText(itemTitleId, item.title, {
        fontSize: '14px',
        color: '#374151',
        fontWeight: '500',
      })
    );

    // 类型标签
    if (item.type) {
      const typeId = `${itemId}-type`;
      contentChildIds.push(typeId);
      components.push(
        createText(typeId, item.type, {
          fontSize: '12px',
          color: '#9ca3af',
          marginTop: '2px',
        })
      );
    }
    components.push(
      createContainer(contentId, contentChildIds, {
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        marginLeft: '12px',
      })
    );
    itemChildIds.push(contentId);

    // 操作按钮
    const actionContext = item.action.context
      ? Object.entries(item.action.context).map(([key, value]) => ({ key, value }))
      : [];

    const btnResult = createButton(
      `${itemId}-btn`,
      item.action.text,
      item.action.action,
      actionContext,
      {
        styles: {
          backgroundColor: 'transparent',
          color: '#3b82f6',
          border: 'none',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: '500',
          cursor: 'pointer',
        },
      }
    );
    itemChildIds.push(btnResult.buttonId);
    components.push(...btnResult.allComponents);
    components.push(
      createContainer(itemId, itemChildIds, {
        display: 'flex',
        alignItems: 'center',
        padding: '12px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
      })
    );
    itemIds.push(itemId);
  });
  const listContainerStyle: Record<string, string> = {
    display: isGrid ? 'grid' : 'flex',
    flexDirection: 'column',
    gap: '8px',
  };
  if (isGrid) {
    listContainerStyle.gridTemplateColumns = 'repeat(2, 1fr)';
  }
  components.push(createContainer(listId, itemIds, listContainerStyle));
  containerChildIds.push(listId);

  // 主容器
  components.push(
    createContainer(id, containerChildIds, {
      display: 'flex',
      flexDirection: 'column',
      padding: '16px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
    })
  );

  return { rootId: id, components };
}
