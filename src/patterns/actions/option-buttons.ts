/**
 * OptionButtons - 选项按钮
 *
 * 单选/多选选项按钮（用于问答题等）
 */

import { createContainer, createText, createButton } from '../components';
import type { PatternResult, PatternOptions } from '../types';

export interface OptionItem {
  /** 选项 ID */
  id: string;
  /** 选项标签（如 A, B, C, D） */
  label: string;
  /** 选项内容 */
  content: string;
  /** 是否已选中 */
  selected?: boolean;
  /** 是否正确（用于答案反馈） */
  isCorrect?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
}

export interface OptionButtonsOptions extends PatternOptions {
  /** 选项列表 */
  options: OptionItem[];
  /** 选择动作 */
  action: string;
  /** 动作上下文 */
  actionContext?: Record<string, string>;
  /** 是否多选 */
  multiple?: boolean;
  /** 是否显示答案反馈 */
  showFeedback?: boolean;
  /** 变体 */
  variant?: 'default' | 'card' | 'compact';
  /** 列数 */
  columns?: 1 | 2;
}

/**
 * 获取选项状态样式
 */
function getOptionStyles(
  option: OptionItem,
  showFeedback: boolean
): { bg: string; border: string; labelBg: string; labelColor: string } {
  if (showFeedback && option.selected) {
    if (option.isCorrect) {
      return {
        bg: '#ecfdf5',
        border: '#10b981',
        labelBg: '#10b981',
        labelColor: '#ffffff',
      };
    } else {
      return {
        bg: '#fef2f2',
        border: '#ef4444',
        labelBg: '#ef4444',
        labelColor: '#ffffff',
      };
    }
  }

  if (option.selected) {
    return {
      bg: '#eff6ff',
      border: '#3b82f6',
      labelBg: '#3b82f6',
      labelColor: '#ffffff',
    };
  }

  return {
    bg: '#ffffff',
    border: '#e5e7eb',
    labelBg: '#f3f4f6',
    labelColor: '#374151',
  };
}

/**
 * 创建选项按钮
 *
 * @example
 * ```typescript
 * const { rootId, components } = createOptionButtons({
 *   options: [
 *     { id: 'a', label: 'A', content: 'print()' },
 *     { id: 'b', label: 'B', content: 'console.log()' },
 *     { id: 'c', label: 'C', content: 'echo()' },
 *     { id: 'd', label: 'D', content: 'write()' },
 *   ],
 *   action: 'select_answer',
 * });
 * ```
 */
export function createOptionButtons(options: OptionButtonsOptions): PatternResult {
  const {
    id = 'option-buttons',
    options: optionItems,
    action,
    actionContext = {},
    showFeedback = false,
    variant = 'default',
    columns = 1,
  } = options;

  const components: unknown[] = [];
  const optionIds: string[] = [];

  const isCard = variant === 'card';
  const isCompact = variant === 'compact';

  optionItems.forEach((option, index) => {
    const optionId = `${id}-option-${index}`;

    const styles = getOptionStyles(option, showFeedback);

    // 构建按钮显示文本：标签 + 内容
    let buttonText = `${option.label}. ${option.content}`;

    // 添加反馈图标到文本
    if (showFeedback && option.selected) {
      buttonText = option.isCorrect
        ? `✓ ${buttonText}`
        : `✗ ${buttonText}`;
    }

    // 构建上下文
    const context = [
      { key: 'optionId', value: option.id },
      { key: 'optionLabel', value: option.label },
      ...Object.entries(actionContext).map(([key, value]) => ({ key, value })),
    ];

    // 选项按钮
    const isDisabled = option.disabled || (showFeedback && option.selected);

    const optionBtnResult = createButton(optionId, buttonText, action, context, {
      styles: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: isCompact ? '10px 12px' : isCard ? '16px' : '12px 16px',
        backgroundColor: styles.bg,
        border: `2px solid ${styles.border}`,
        borderRadius: isCard ? '12px' : '8px',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: option.disabled ? '0.5' : '1',
        transition: 'all 0.2s',
        textAlign: 'left',
      },
    });
    components.push(...optionBtnResult.allComponents);
    optionIds.push(optionBtnResult.buttonId);
  });

  // 主容器
  components.push(
    createContainer(id, optionIds, {
      display: 'grid',
      gridTemplateColumns: columns === 2 ? 'repeat(2, 1fr)' : '1fr',
      gap: isCompact ? '8px' : '12px',
    })
  );

  return { rootId: id, components };
}
