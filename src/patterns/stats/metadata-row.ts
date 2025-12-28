/**
 * MetadataRow - 元数据行
 *
 * 水平展示多个元数据项（图标+文本）
 */

import { createContainer, createIcon, createText } from '../components';
import type { PatternResult, MetadataItem, PatternOptions } from '../types';

export interface MetadataRowOptions extends PatternOptions {
  /** 元数据项列表 */
  items: MetadataItem[];
  /** 分隔符 */
  separator?: string;
  /** 变体 */
  variant?: 'default' | 'compact' | 'spaced';
}

/**
 * 创建元数据行
 *
 * @example
 * ```typescript
 * const { rootId, components } = createMetadataRow({
 *   items: [
 *     { icon: '📚', text: '12 课时' },
 *     { icon: '⏱️', text: '约 2 小时' },
 *     { icon: '👥', text: '1.2k 人学习' },
 *   ],
 *   separator: '•',
 * });
 * ```
 */
export function createMetadataRow(options: MetadataRowOptions): PatternResult {
  const { id = 'metadata-row', items, separator, variant = 'default' } = options;

  const components: unknown[] = [];
  const rowChildIds: string[] = [];

  const isCompact = variant === 'compact';
  const gap = variant === 'spaced' ? '24px' : isCompact ? '12px' : '16px';

  items.forEach((item, index) => {
    // 添加分隔符（如果不是第一个且有分隔符）
    if (separator && index > 0) {
      const sepId = `${id}-sep-${index}`;
      rowChildIds.push(sepId);
      components.push(
        createText(sepId, separator, {
          fontSize: '12px',
          color: '#d1d5db',
        })
      );
    }

    // 元数据项容器
    const itemId = `${id}-item-${index}`;
    const itemChildIds: string[] = [];

    // 图标
    const iconId = `${itemId}-icon`;
    itemChildIds.push(iconId);
    components.push(
      createIcon(iconId, item.icon, {
        fontSize: isCompact ? '12px' : '14px',
        color: item.color || '#6b7280',
      })
    );

    // 文本
    const textId = `${itemId}-text`;
    itemChildIds.push(textId);
    components.push(
      createText(textId, item.text, {
        fontSize: isCompact ? '12px' : '14px',
        color: item.color || '#6b7280',
        marginLeft: '4px',
      })
    );

    // 项容器
    components.push(
      createContainer(itemId, itemChildIds, {
        display: 'flex',
        alignItems: 'center',
      })
    );
    rowChildIds.push(itemId);
  });

  // 行容器
  components.push(
    createContainer(id, rowChildIds, {
      display: 'flex',
      alignItems: 'center',
      gap,
      flexWrap: 'wrap',
    })
  );

  return { rootId: id, components };
}
