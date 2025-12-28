/**
 * TextSection - 文本区块
 *
 * 带标题的文本内容块
 */

import { createContainer, createIcon, createText } from '../components';
import type { PatternResult, PatternOptions } from '../types';

export interface TextSectionOptions extends PatternOptions {
  /** 标题 */
  title?: string;
  /** 内容 */
  content: string;
  /** 图标/表情 */
  emoji?: string;
  /** 变体 */
  variant?: 'default' | 'highlighted' | 'bordered' | 'callout';
  /** 颜色（用于 callout 和 bordered） */
  color?: string;
}

/**
 * 创建文本区块
 *
 * @example
 * ```typescript
 * const { rootId, components } = createTextSection({
 *   emoji: '💡',
 *   title: '学习提示',
 *   content: '每天坚持学习30分钟，效果更佳！',
 *   variant: 'callout',
 *   color: '#f59e0b',
 * });
 * ```
 */
export function createTextSection(options: TextSectionOptions): PatternResult {
  const {
    id = 'text-section',
    title,
    content,
    emoji,
    variant = 'default',
    color = '#3b82f6',
  } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const isHighlighted = variant === 'highlighted';
  const isBordered = variant === 'bordered';
  const isCallout = variant === 'callout';

  // 标题区域
  if (title || emoji) {
    const headerRowId = `${id}-header`;
    const headerChildIds: string[] = [];

    if (emoji) {
      const emojiId = `${id}-emoji`;
      headerChildIds.push(emojiId);
      components.push(
        createIcon(emojiId, emoji, {
          fontSize: '20px',
          marginRight: '8px',
        })
      );
    }

    if (title) {
      const titleId = `${id}-title`;
      headerChildIds.push(titleId);
      components.push(
        createText(titleId, title, {
          fontSize: '16px',
          fontWeight: '600',
          color: isCallout ? color : '#1f2937',
        })
      );
    }
    components.push(
      createContainer(headerRowId, headerChildIds, {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '12px',
      })
    );
    containerChildIds.push(headerRowId);
  }

  // 内容
  const contentId = `${id}-content`;
  containerChildIds.push(contentId);
  components.push(
    createText(contentId, content, {
      fontSize: '14px',
      color: '#4b5563',
      lineHeight: '1.7',
      whiteSpace: 'pre-wrap',
    })
  );

  // 主容器样式
  const containerStyle: Record<string, string> = {
    display: 'flex',
    flexDirection: 'column',
  };

  if (isHighlighted) {
    containerStyle.padding = '16px';
    containerStyle.backgroundColor = '#fef3c7';
    containerStyle.borderRadius = '8px';
  } else if (isBordered) {
    containerStyle.padding = '16px';
    containerStyle.border = `1px solid ${color}`;
    containerStyle.borderRadius = '8px';
    containerStyle.borderLeft = `4px solid ${color}`;
  } else if (isCallout) {
    containerStyle.padding = '16px';
    containerStyle.backgroundColor = `${color}10`;
    containerStyle.borderRadius = '8px';
    containerStyle.borderLeft = `4px solid ${color}`;
  }

  // 主容器
  components.push(createContainer(id, containerChildIds, containerStyle));

  return { rootId: id, components };
}
