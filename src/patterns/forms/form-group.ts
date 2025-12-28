/**
 * FormGroup - 表单组
 *
 * 单个表单字段（标签 + 输入框 + 提示）
 */

import { createContainer, createText, createInput } from '../components';
import type { PatternResult, PatternOptions, FormField } from '../types';

export interface FormGroupOptions extends Omit<PatternOptions, 'id'>, FormField {
  /** 变体 */
  variant?: 'default' | 'floating' | 'inline';
  /** 输入变化动作 */
  changeAction?: string;
}

/**
 * 创建表单组
 *
 * @example
 * ```typescript
 * const { rootId, components } = createFormGroup({
 *   id: 'username',
 *   label: '用户名',
 *   type: 'text',
 *   placeholder: '请输入用户名',
 *   required: true,
 *   hint: '3-20个字符',
 *   error: '用户名不能为空',
 * });
 * ```
 */
export function createFormGroup(options: FormGroupOptions): PatternResult {
  const {
    id = 'form-group',
    label,
    type = 'text',
    placeholder,
    defaultValue,
    required = false,
    error,
    hint,
    variant = 'default',
  } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const isInline = variant === 'inline';
  const hasError = !!error;

  // 标签
  const labelId = `${id}-label`;
  containerChildIds.push(labelId);

  const labelText = required ? `${label} *` : label;
  components.push(
    createText(labelId, labelText, {
      fontSize: '14px',
      fontWeight: '500',
      color: hasError ? '#ef4444' : '#374151',
      marginBottom: isInline ? '0' : '6px',
      marginRight: isInline ? '12px' : '0',
      minWidth: isInline ? '100px' : 'auto',
    })
  );

  // 输入区域容器
  const inputAreaId = `${id}-input-area`;
  const inputAreaChildIds: string[] = [];

  // 输入框
  const inputId = `${id}-input`;
  inputAreaChildIds.push(inputId);

  const inputStyle: Record<string, string> = {
    width: '100%',
    padding: '10px 12px',
    fontSize: '14px',
    border: `1px solid ${hasError ? '#ef4444' : '#d1d5db'}`,
    borderRadius: '8px',
    outline: 'none',
    backgroundColor: '#ffffff',
  };

  if (type === 'textarea') {
    inputStyle.minHeight = '100px';
    inputStyle.resize = 'vertical';
  }

  components.push(createInput(inputId, type, placeholder || '', defaultValue, inputStyle));

  // 错误信息或提示
  if (error) {
    const errorId = `${id}-error`;
    inputAreaChildIds.push(errorId);
    components.push(
      createText(errorId, `⚠ ${error}`, {
        fontSize: '12px',
        color: '#ef4444',
        marginTop: '4px',
      })
    );
  } else if (hint) {
    const hintId = `${id}-hint`;
    inputAreaChildIds.push(hintId);
    components.push(
      createText(hintId, hint, {
        fontSize: '12px',
        color: '#6b7280',
        marginTop: '4px',
      })
    );
  }
  components.push(
    createContainer(inputAreaId, inputAreaChildIds, {
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
    })
  );
  containerChildIds.push(inputAreaId);

  // 主容器
  components.push(
    createContainer(id, containerChildIds, {
      display: 'flex',
      flexDirection: isInline ? 'row' : 'column',
      alignItems: isInline ? 'center' : 'stretch',
      marginBottom: '16px',
    })
  );

  return { rootId: id, components };
}
