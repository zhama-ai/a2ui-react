/**
 * FieldSet - 字段组
 *
 * 相关表单字段的分组
 */

import { createContainer, createText } from '../components';
import type { PatternResult, PatternOptions, FormField } from '../types';

import { createFormGroup } from './form-group';
import type { FormGroupOptions } from './form-group';

export interface FieldSetOptions extends PatternOptions {
  /** 分组标题 */
  legend?: string;
  /** 分组描述 */
  description?: string;
  /** 字段列表 */
  fields: FormGroupOptions[];
  /** 布局 */
  layout?: 'vertical' | 'horizontal' | 'grid';
  /** 列数（用于 grid 布局） */
  columns?: 2 | 3;
  /** 变体 */
  variant?: 'default' | 'bordered' | 'card';
}

/**
 * 创建字段组
 *
 * @example
 * ```typescript
 * const { rootId, components } = createFieldSet({
 *   legend: '个人信息',
 *   description: '请填写您的基本信息',
 *   fields: [
 *     { id: 'name', label: '姓名', type: 'text', required: true },
 *     { id: 'email', label: '邮箱', type: 'email', required: true },
 *     { id: 'phone', label: '电话', type: 'text' },
 *   ],
 *   layout: 'grid',
 *   columns: 2,
 * });
 * ```
 */
export function createFieldSet(options: FieldSetOptions): PatternResult {
  const {
    id = 'field-set',
    legend,
    description,
    fields,
    layout = 'vertical',
    columns = 2,
    variant = 'default',
  } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const isBordered = variant === 'bordered';
  const isCard = variant === 'card';

  // 标题
  if (legend) {
    const legendId = `${id}-legend`;
    containerChildIds.push(legendId);
    components.push(
      createText(legendId, legend, {
        fontSize: '16px',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: description ? '4px' : '16px',
      })
    );
  }

  // 描述
  if (description) {
    const descId = `${id}-description`;
    containerChildIds.push(descId);
    components.push(
      createText(descId, description, {
        fontSize: '14px',
        color: '#6b7280',
        marginBottom: '16px',
      })
    );
  }

  // 字段容器
  const fieldsContainerId = `${id}-fields`;
  const fieldIds: string[] = [];

  fields.forEach((field, index) => {
    const fieldId = `${id}-field-${index}`;
    const fieldResult = createFormGroup({
      ...field,
      id: fieldId,
    });
    fieldIds.push(fieldResult.rootId);
    components.push(...fieldResult.components);
  });
  const fieldsStyle: Record<string, string> = {
    display: layout === 'grid' ? 'grid' : 'flex',
    flexDirection: layout === 'horizontal' ? 'row' : 'column',
    gap: layout === 'horizontal' ? '16px' : '0',
  };

  if (layout === 'grid') {
    fieldsStyle.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    fieldsStyle.gap = '16px';
  }

  components.push(createContainer(fieldsContainerId, fieldIds, fieldsStyle));
  containerChildIds.push(fieldsContainerId);

  // 主容器样式
  const containerStyle: Record<string, string> = {
    display: 'flex',
    flexDirection: 'column',
  };

  if (isBordered) {
    containerStyle.padding = '20px';
    containerStyle.border = '1px solid #e5e7eb';
    containerStyle.borderRadius = '12px';
  } else if (isCard) {
    containerStyle.padding = '24px';
    containerStyle.backgroundColor = '#ffffff';
    containerStyle.borderRadius = '12px';
    containerStyle.border = '1px solid #e5e7eb';
    containerStyle.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
  }

  // 主容器
  components.push(createContainer(id, containerChildIds, containerStyle));

  return { rootId: id, components };
}
