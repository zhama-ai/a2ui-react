/**
 * Quote - 引用
 *
 * 引用文本块
 */

import { createContainer, createText } from '../components';
import type { PatternResult, PatternOptions } from '../types';

export interface QuoteOptions extends PatternOptions {
  /** 引用内容 */
  content: string;
  /** 作者 */
  author?: string;
  /** 来源 */
  source?: string;
  /** 变体 */
  variant?: 'default' | 'large' | 'minimal';
  /** 颜色 */
  color?: string;
}

/**
 * 创建引用
 *
 * @example
 * ```typescript
 * const { rootId, components } = createQuote({
 *   content: '学而不思则罔，思而不学则殆。',
 *   author: '孔子',
 *   source: '《论语》',
 *   variant: 'large',
 * });
 * ```
 */
export function createQuote(options: QuoteOptions): PatternResult {
  const { id = 'quote', content, author, source, variant = 'default', color = '#6b7280' } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const isLarge = variant === 'large';
  const isMinimal = variant === 'minimal';

  // 引号（非 minimal）
  if (!isMinimal) {
    const quoteMarkId = `${id}-quote-mark`;
    containerChildIds.push(quoteMarkId);
    components.push(
      createText(quoteMarkId, '"', {
        fontSize: isLarge ? '48px' : '32px',
        color: `${color}40`,
        fontFamily: 'Georgia, serif',
        lineHeight: '1',
        marginBottom: '-8px',
      })
    );
  }

  // 引用内容
  const contentId = `${id}-content`;
  containerChildIds.push(contentId);
  components.push(
    createText(contentId, content, {
      fontSize: isLarge ? '18px' : '15px',
      fontStyle: 'italic',
      color: '#374151',
      lineHeight: '1.7',
      paddingLeft: isMinimal ? '16px' : '0',
      borderLeft: isMinimal ? `3px solid ${color}` : 'none',
    })
  );

  // 作者和来源
  if (author || source) {
    const attributionId = `${id}-attribution`;
    const attrChildIds: string[] = [];

    const dash = `${id}-dash`;
    attrChildIds.push(dash);
    components.push(
      createText(dash, '—', {
        fontSize: '14px',
        color: '#9ca3af',
        marginRight: '8px',
      })
    );

    if (author) {
      const authorId = `${id}-author`;
      attrChildIds.push(authorId);
      components.push(
        createText(authorId, author, {
          fontSize: '14px',
          fontWeight: '500',
          color: '#4b5563',
        })
      );
    }

    if (source) {
      const sourceId = `${id}-source`;
      attrChildIds.push(sourceId);
      components.push(
        createText(sourceId, source, {
          fontSize: '13px',
          color: '#9ca3af',
          marginLeft: author ? '8px' : '0',
        })
      );
    }
    components.push(
      createContainer(attributionId, attrChildIds, {
        display: 'flex',
        alignItems: 'center',
        marginTop: '12px',
        paddingLeft: isMinimal ? '16px' : '0',
      })
    );
    containerChildIds.push(attributionId);
  }

  // 主容器
  components.push(
    createContainer(id, containerChildIds, {
      display: 'flex',
      flexDirection: 'column',
      padding: isMinimal ? '0' : '16px',
      backgroundColor: isMinimal ? 'transparent' : '#f9fafb',
      borderRadius: isMinimal ? '0' : '8px',
    })
  );

  return { rootId: id, components };
}
