/**
 * ValidationHint - 验证提示
 *
 * 表单验证状态提示
 */

import { createContainer, createText } from '../components';
import type { PatternResult, PatternOptions } from '../types';

export interface ValidationRule {
  /** 规则 ID */
  id: string;
  /** 规则描述 */
  text: string;
  /** 验证状态 */
  status: 'valid' | 'invalid' | 'pending';
}

export interface ValidationHintOptions extends PatternOptions {
  /** 验证规则列表 */
  rules: ValidationRule[];
  /** 变体 */
  variant?: 'default' | 'compact' | 'inline';
}

/**
 * 创建验证提示
 *
 * @example
 * ```typescript
 * const { rootId, components } = createValidationHint({
 *   rules: [
 *     { id: 'length', text: '至少 8 个字符', status: 'valid' },
 *     { id: 'uppercase', text: '包含大写字母', status: 'invalid' },
 *     { id: 'number', text: '包含数字', status: 'pending' },
 *   ],
 * });
 * ```
 */
export function createValidationHint(options: ValidationHintOptions): PatternResult {
  const { id = 'validation-hint', rules, variant = 'default' } = options;

  const components: unknown[] = [];
  const ruleIds: string[] = [];

  const isCompact = variant === 'compact';
  const isInline = variant === 'inline';

  rules.forEach((rule, index) => {
    const ruleId = `${id}-rule-${index}`;
    const ruleChildIds: string[] = [];

    // 状态图标
    let statusIcon: string;
    let statusColor: string;

    switch (rule.status) {
      case 'valid':
        statusIcon = '✓';
        statusColor = '#10b981';
        break;
      case 'invalid':
        statusIcon = '✗';
        statusColor = '#ef4444';
        break;
      default:
        statusIcon = '○';
        statusColor = '#9ca3af';
    }

    const iconId = `${ruleId}-icon`;
    ruleChildIds.push(iconId);
    components.push(
      createText(iconId, statusIcon, {
        fontSize: isCompact ? '12px' : '14px',
        color: statusColor,
        fontWeight: 'bold',
        width: '16px',
      })
    );

    // 规则文本
    const textId = `${ruleId}-text`;
    ruleChildIds.push(textId);
    components.push(
      createText(textId, rule.text, {
        fontSize: isCompact ? '12px' : '13px',
        color: rule.status === 'valid' ? '#374151' : '#6b7280',
        marginLeft: '8px',
        textDecoration: rule.status === 'valid' ? 'line-through' : 'none',
        opacity: rule.status === 'valid' ? '0.7' : '1',
      })
    );
    components.push(
      createContainer(ruleId, ruleChildIds, {
        display: 'flex',
        alignItems: 'center',
        marginBottom: isInline ? '0' : isCompact ? '4px' : '6px',
        marginRight: isInline ? '16px' : '0',
      })
    );
    ruleIds.push(ruleId);
  });

  // 主容器
  components.push(
    createContainer(id, ruleIds, {
      display: 'flex',
      flexDirection: isInline ? 'row' : 'column',
      flexWrap: isInline ? 'wrap' : 'nowrap',
      padding: isCompact ? '8px' : '12px',
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
    })
  );

  return { rootId: id, components };
}
