/**
 * NavigationButtons - 导航按钮
 *
 * 上一步/下一步导航
 */

import { createContainer, createButton, createText } from '../components';
import type { PatternResult, PatternOptions } from '../types';

export interface NavigationButtonsOptions extends PatternOptions {
  /** 上一步配置 */
  prev?: {
    text?: string;
    action: string;
    context?: Record<string, string>;
    disabled?: boolean;
  };
  /** 下一步配置 */
  next?: {
    text?: string;
    action: string;
    context?: Record<string, string>;
    disabled?: boolean;
    primary?: boolean;
  };
  /** 中间内容（如进度信息） */
  middle?: string;
  /** 变体 */
  variant?: 'default' | 'compact' | 'minimal';
}

/**
 * 创建导航按钮
 *
 * @example
 * ```typescript
 * const { rootId, components } = createNavigationButtons({
 *   prev: { action: 'go_prev', text: '上一题' },
 *   next: { action: 'go_next', text: '下一题', primary: true },
 *   middle: '3 / 10',
 * });
 * ```
 */
export function createNavigationButtons(options: NavigationButtonsOptions): PatternResult {
  const { id = 'navigation-buttons', prev, next, middle, variant = 'default' } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const isCompact = variant === 'compact';
  const isMinimal = variant === 'minimal';

  // 上一步按钮
  if (prev) {
    const prevContext = prev.context
      ? Object.entries(prev.context).map(([key, value]) => ({ key, value }))
      : [];

    const prevText = prev.text || (isMinimal ? '←' : '← 上一步');

    const prevResult = createButton(`${id}-prev`, prevText, prev.action, prevContext, {
      styles: {
        backgroundColor: 'transparent',
        color: prev.disabled ? '#9ca3af' : '#374151',
        border: isMinimal ? 'none' : '1px solid #d1d5db',
        padding: isCompact ? '8px 16px' : '10px 20px',
        fontSize: isCompact ? '13px' : '14px',
        fontWeight: '500',
        borderRadius: '8px',
        cursor: prev.disabled ? 'not-allowed' : 'pointer',
        opacity: prev.disabled ? '0.5' : '1',
      },
    });
    containerChildIds.push(prevResult.buttonId);
    components.push(...prevResult.allComponents);
  } else {
    // 占位
    const placeholderId = `${id}-prev-placeholder`;
    containerChildIds.push(placeholderId);
    components.push(
      createContainer(placeholderId, [], {
        width: '1px',
        height: '1px',
      })
    );
  }

  // 中间内容
  if (middle) {
    const middleId = `${id}-middle`;
    containerChildIds.push(middleId);
    components.push(
      createText(middleId, middle, {
        fontSize: isCompact ? '12px' : '14px',
        color: '#6b7280',
        fontWeight: '500',
      })
    );
  }

  // 下一步按钮
  if (next) {
    const nextContext = next.context
      ? Object.entries(next.context).map(([key, value]) => ({ key, value }))
      : [];

    const nextText = next.text || (isMinimal ? '→' : '下一步 →');
    const isPrimary = next.primary !== false; // 默认为 primary

    const nextResult = createButton(`${id}-next`, nextText, next.action, nextContext, {
      styles: {
        backgroundColor: isPrimary ? '#3b82f6' : 'transparent',
        color: isPrimary ? '#ffffff' : next.disabled ? '#9ca3af' : '#374151',
        border: isPrimary ? 'none' : isMinimal ? 'none' : '1px solid #d1d5db',
        padding: isCompact ? '8px 16px' : '10px 20px',
        fontSize: isCompact ? '13px' : '14px',
        fontWeight: '500',
        borderRadius: '8px',
        cursor: next.disabled ? 'not-allowed' : 'pointer',
        opacity: next.disabled ? '0.5' : '1',
      },
    });
    containerChildIds.push(nextResult.buttonId);
    components.push(...nextResult.allComponents);
  } else {
    // 占位
    const placeholderId = `${id}-next-placeholder`;
    containerChildIds.push(placeholderId);
    components.push(
      createContainer(placeholderId, [], {
        width: '1px',
        height: '1px',
      })
    );
  }

  // 主容器
  components.push(
    createContainer(id, containerChildIds, {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      padding: isCompact ? '8px 0' : '12px 0',
    })
  );

  return { rootId: id, components };
}
