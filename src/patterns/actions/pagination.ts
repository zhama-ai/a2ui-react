/**
 * Pagination - 分页器
 *
 * 数据分页导航
 */

import { createContainer, createText, createButton } from '../components';
import type { PatternResult, PatternOptions } from '../types';

export interface PaginationOptions extends PatternOptions {
  /** 当前页 */
  current: number;
  /** 总页数 */
  total: number;
  /** 页码变化动作 */
  action: string;
  /** 动作上下文 */
  actionContext?: Record<string, string>;
  /** 显示的页码数量 */
  siblingCount?: number;
  /** 是否显示首尾页 */
  showBoundary?: boolean;
  /** 变体 */
  variant?: 'default' | 'compact' | 'simple';
}

/**
 * 生成页码列表
 */
function generatePageNumbers(
  current: number,
  total: number,
  siblingCount: number,
  showBoundary: boolean
): (number | 'ellipsis')[] {
  const pages: (number | 'ellipsis')[] = [];

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    return pages;
  }

  // 始终显示第一页
  if (showBoundary) {
    pages.push(1);
  }

  const leftSibling = Math.max(current - siblingCount, showBoundary ? 2 : 1);
  const rightSibling = Math.min(current + siblingCount, showBoundary ? total - 1 : total);

  // 左边省略号
  if (leftSibling > (showBoundary ? 2 : 1)) {
    pages.push('ellipsis');
  }

  // 中间页码
  for (let i = leftSibling; i <= rightSibling; i++) {
    pages.push(i);
  }

  // 右边省略号
  if (rightSibling < (showBoundary ? total - 1 : total)) {
    pages.push('ellipsis');
  }

  // 始终显示最后一页
  if (showBoundary && total > 1) {
    pages.push(total);
  }

  return pages;
}

/**
 * 创建分页器
 *
 * @example
 * ```typescript
 * const { rootId, components } = createPagination({
 *   current: 5,
 *   total: 20,
 *   action: 'go_to_page',
 *   siblingCount: 1,
 * });
 * ```
 */
export function createPagination(options: PaginationOptions): PatternResult {
  const {
    id = 'pagination',
    current,
    total,
    action,
    actionContext = {},
    siblingCount = 1,
    showBoundary = true,
    variant = 'default',
  } = options;

  const components: unknown[] = [];
  const itemIds: string[] = [];

  const isCompact = variant === 'compact';
  const isSimple = variant === 'simple';

  const baseContext = Object.entries(actionContext).map(([key, value]) => ({ key, value }));

  // 简单模式：只显示上一页/下一页
  if (isSimple) {
    // 上一页
    const prevResult = createButton(
      `${id}-prev`,
      '←',
      action,
      [...baseContext, { key: 'page', value: `${current - 1}` }],
      {
        styles: {
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          fontSize: '14px',
          color: current === 1 ? '#9ca3af' : '#374151',
          cursor: current === 1 ? 'not-allowed' : 'pointer',
          opacity: current === 1 ? '0.5' : '1',
        },
      }
    );
    itemIds.push(prevResult.buttonId);
    components.push(...prevResult.allComponents);

    // 页码信息
    const infoId = `${id}-info`;
    itemIds.push(infoId);
    components.push(
      createText(infoId, `${current} / ${total}`, {
        fontSize: '14px',
        color: '#374151',
        fontWeight: '500',
        margin: '0 12px',
      })
    );

    // 下一页
    const nextResult = createButton(
      `${id}-next`,
      '→',
      action,
      [...baseContext, { key: 'page', value: `${current + 1}` }],
      {
        styles: {
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          fontSize: '14px',
          color: current === total ? '#9ca3af' : '#374151',
          cursor: current === total ? 'not-allowed' : 'pointer',
          opacity: current === total ? '0.5' : '1',
        },
      }
    );
    itemIds.push(nextResult.buttonId);
    components.push(...nextResult.allComponents);
  } else {
    // 完整模式
    // 上一页按钮
    const prevResult = createButton(
      `${id}-prev`,
      isCompact ? '‹' : '上一页',
      action,
      [...baseContext, { key: 'page', value: `${current - 1}` }],
      {
        styles: {
          padding: isCompact ? '6px 10px' : '8px 16px',
          backgroundColor: '#ffffff',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          fontSize: isCompact ? '12px' : '14px',
          color: current === 1 ? '#9ca3af' : '#374151',
          cursor: current === 1 ? 'not-allowed' : 'pointer',
          opacity: current === 1 ? '0.5' : '1',
        },
      }
    );
    itemIds.push(prevResult.buttonId);
    components.push(...prevResult.allComponents);

    // 页码
    const pageNumbers = generatePageNumbers(current, total, siblingCount, showBoundary);
    let ellipsisCount = 0;

    pageNumbers.forEach((page) => {
      if (page === 'ellipsis') {
        ellipsisCount++;
        const ellipsisId = `${id}-ellipsis-${ellipsisCount}`;
        itemIds.push(ellipsisId);
        components.push(
          createText(ellipsisId, '...', {
            width: isCompact ? '28px' : '36px',
            height: isCompact ? '28px' : '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            color: '#9ca3af',
          })
        );
      } else {
        const isCurrent = page === current;
        const pageResult = createButton(
          `${id}-page-${page}`,
          `${page}`,
          action,
          [...baseContext, { key: 'page', value: `${page}` }],
          {
            styles: {
              width: isCompact ? '28px' : '36px',
              height: isCompact ? '28px' : '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isCurrent ? '#3b82f6' : '#ffffff',
              border: isCurrent ? 'none' : '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: isCompact ? '12px' : '14px',
              fontWeight: isCurrent ? '600' : '500',
              color: isCurrent ? '#ffffff' : '#374151',
              cursor: isCurrent ? 'default' : 'pointer',
            },
          }
        );
        itemIds.push(pageResult.buttonId);
        components.push(...pageResult.allComponents);
      }
    });

    // 下一页按钮
    const nextResult = createButton(
      `${id}-next`,
      isCompact ? '›' : '下一页',
      action,
      [...baseContext, { key: 'page', value: `${current + 1}` }],
      {
        styles: {
          padding: isCompact ? '6px 10px' : '8px 16px',
          backgroundColor: '#ffffff',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          fontSize: isCompact ? '12px' : '14px',
          color: current === total ? '#9ca3af' : '#374151',
          cursor: current === total ? 'not-allowed' : 'pointer',
          opacity: current === total ? '0.5' : '1',
        },
      }
    );
    itemIds.push(nextResult.buttonId);
    components.push(...nextResult.allComponents);
  }

  // 主容器
  components.push(
    createContainer(id, itemIds, {
      display: 'flex',
      alignItems: 'center',
      gap: isCompact ? '4px' : '8px',
    })
  );

  return { rootId: id, components };
}
