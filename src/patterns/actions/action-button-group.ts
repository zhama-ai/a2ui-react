/**
 * ActionButtonGroup - 操作按钮组
 *
 * 一组操作按钮，支持主次按钮
 */

import { createContainer, createButton } from '../components';
import type { PatternResult, PatternOptions, ActionButton } from '../types';

export interface ActionButtonGroupOptions extends PatternOptions {
  /** 按钮列表 */
  buttons: ActionButton[];
  /** 布局方向 */
  direction?: 'horizontal' | 'vertical';
  /** 对齐方式 */
  align?: 'start' | 'center' | 'end' | 'space-between';
  /** 按钮尺寸 */
  size?: 'sm' | 'md' | 'lg';
  /** 是否全宽 */
  fullWidth?: boolean;
}

/**
 * 创建操作按钮组
 *
 * @example
 * ```typescript
 * const { rootId, components } = createActionButtonGroup({
 *   buttons: [
 *     { id: 'submit', text: '提交答案', action: 'submit_answer', primary: true },
 *     { id: 'skip', text: '跳过', action: 'skip_question' },
 *     { id: 'hint', text: '提示', action: 'get_hint', icon: '💡' },
 *   ],
 *   align: 'center',
 * });
 * ```
 */
export function createActionButtonGroup(options: ActionButtonGroupOptions): PatternResult {
  const {
    id = 'action-button-group',
    buttons,
    direction = 'horizontal',
    align = 'start',
    size = 'md',
    fullWidth = false,
  } = options;

  const components: unknown[] = [];
  const buttonIds: string[] = [];

  const sizeStyles = {
    sm: { padding: '6px 12px', fontSize: '12px' },
    md: { padding: '10px 20px', fontSize: '14px' },
    lg: { padding: '14px 28px', fontSize: '16px' },
  };

  buttons.forEach((btn, index) => {
    const btnIdPrefix = `${id}-btn-${index}`;

    // 构建上下文
    const actionContext = btn.context
      ? Object.entries(btn.context).map(([key, value]) => ({ key, value }))
      : [];

    // 确定按钮样式
    const isPrimary = btn.primary || btn.type === 'primary';
    const isDanger = btn.type === 'danger';
    const isSuccess = btn.type === 'success';
    const isWarning = btn.type === 'warning';

    let bgColor = 'transparent';
    let textColor = '#374151';
    let borderColor = '#d1d5db';

    if (isPrimary) {
      bgColor = '#3b82f6';
      textColor = '#ffffff';
      borderColor = '#3b82f6';
    } else if (isDanger) {
      bgColor = '#ef4444';
      textColor = '#ffffff';
      borderColor = '#ef4444';
    } else if (isSuccess) {
      bgColor = '#10b981';
      textColor = '#ffffff';
      borderColor = '#10b981';
    } else if (isWarning) {
      bgColor = '#f59e0b';
      textColor = '#ffffff';
      borderColor = '#f59e0b';
    }

    // 添加图标到文本
    const buttonText = btn.icon ? `${btn.icon} ${btn.text}` : btn.text;

    const { buttonId, allComponents } = createButton(
      btnIdPrefix,
      buttonText,
      btn.action,
      actionContext,
      {
        styles: {
          backgroundColor: bgColor,
          color: textColor,
          border: `1px solid ${borderColor}`,
          padding: sizeStyles[size].padding,
          fontSize: sizeStyles[size].fontSize,
          fontWeight: '500',
          borderRadius: '8px',
          cursor: btn.disabled ? 'not-allowed' : 'pointer',
          opacity: btn.disabled ? '0.5' : '1',
          flex: fullWidth ? '1' : 'none',
          transition: 'all 0.2s',
        },
      }
    );
    buttonIds.push(buttonId);
    components.push(...allComponents);
  });

  // 容器样式
  const containerStyle: Record<string, string> = {
    display: 'flex',
    flexDirection: direction === 'vertical' ? 'column' : 'row',
    gap: direction === 'vertical' ? '8px' : '12px',
    width: fullWidth ? '100%' : 'auto',
  };

  // 对齐方式
  switch (align) {
    case 'center':
      containerStyle.justifyContent = 'center';
      break;
    case 'end':
      containerStyle.justifyContent = 'flex-end';
      break;
    case 'space-between':
      containerStyle.justifyContent = 'space-between';
      break;
    default:
      containerStyle.justifyContent = 'flex-start';
  }
  components.push(createContainer(id, buttonIds, containerStyle));

  return { rootId: id, components };
}
