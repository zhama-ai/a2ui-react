/**
 * ComparisonCard - 对比卡片
 *
 * 展示前后对比、提升幅度等
 */

import { createContainer, createIcon, createText } from '../components';
import type { PatternResult, PatternOptions } from '../types';

export interface ComparisonCardOptions extends PatternOptions {
  /** 标题 */
  title: string;
  /** 之前的值 */
  before: number | string;
  /** 之后的值 */
  after: number | string;
  /** 单位 */
  unit?: string;
  /** 图标 */
  icon?: string;
  /** 变化类型 */
  changeType?: 'increase' | 'decrease' | 'neutral';
  /** 变化值 */
  changeValue?: string;
  /** 变体 */
  variant?: 'default' | 'compact' | 'horizontal';
}

/**
 * 获取变化颜色
 */
function getChangeColor(changeType: 'increase' | 'decrease' | 'neutral'): string {
  switch (changeType) {
    case 'increase':
      return '#10b981';
    case 'decrease':
      return '#ef4444';
    default:
      return '#6b7280';
  }
}

/**
 * 创建对比卡片
 *
 * @example
 * ```typescript
 * const { rootId, components } = createComparisonCard({
 *   title: '答题正确率',
 *   before: 65,
 *   after: 85,
 *   unit: '%',
 *   changeType: 'increase',
 *   changeValue: '+20%',
 * });
 * ```
 */
export function createComparisonCard(options: ComparisonCardOptions): PatternResult {
  const {
    id = 'comparison-card',
    title,
    before,
    after,
    unit = '',
    icon,
    changeType = 'neutral',
    changeValue,
    variant = 'default',
  } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const changeColor = getChangeColor(changeType);
  const isHorizontal = variant === 'horizontal';
  const isCompact = variant === 'compact';

  // 标题行
  const headerRowId = `${id}-header`;
  const headerChildIds: string[] = [];

  if (icon) {
    const iconId = `${id}-icon`;
    headerChildIds.push(iconId);
    components.push(
      createIcon(iconId, icon, {
        fontSize: isCompact ? '16px' : '20px',
        marginRight: '8px',
      })
    );
  }

  const titleId = `${id}-title`;
  headerChildIds.push(titleId);
  components.push(
    createText(titleId, title, {
      fontSize: isCompact ? '14px' : '16px',
      fontWeight: '600',
      color: '#374151',
    })
  );

  // 变化标签
  if (changeValue) {
    const changeId = `${id}-change`;
    headerChildIds.push(changeId);
    const changeIcon = changeType === 'increase' ? '↑' : changeType === 'decrease' ? '↓' : '→';
    components.push(
      createText(changeId, `${changeIcon} ${changeValue}`, {
        fontSize: '12px',
        fontWeight: '500',
        color: changeColor,
        backgroundColor: `${changeColor}15`,
        padding: '2px 8px',
        borderRadius: '4px',
        marginLeft: 'auto',
      })
    );
  }
  components.push(
    createContainer(headerRowId, headerChildIds, {
      display: 'flex',
      alignItems: 'center',
      marginBottom: isCompact ? '12px' : '16px',
    })
  );
  containerChildIds.push(headerRowId);

  // 对比区域
  const comparisonId = `${id}-comparison`;
  const comparisonChildIds: string[] = [];

  // 之前
  const beforeSectionId = `${id}-before`;
  const beforeChildIds: string[] = [];

  const beforeLabelId = `${id}-before-label`;
  beforeChildIds.push(beforeLabelId);
  components.push(
    createText(beforeLabelId, '之前', {
      fontSize: '12px',
      color: '#9ca3af',
      marginBottom: '4px',
    })
  );

  const beforeValueId = `${id}-before-value`;
  beforeChildIds.push(beforeValueId);
  components.push(
    createText(beforeValueId, `${before}${unit}`, {
      fontSize: isCompact ? '20px' : '24px',
      fontWeight: 'bold',
      color: '#6b7280',
    })
  );
  components.push(
    createContainer(beforeSectionId, beforeChildIds, {
      display: 'flex',
      flexDirection: 'column',
      alignItems: isHorizontal ? 'flex-start' : 'center',
      flex: '1',
    })
  );
  comparisonChildIds.push(beforeSectionId);

  // 箭头
  const arrowId = `${id}-arrow`;
  comparisonChildIds.push(arrowId);
  components.push(
    createIcon(arrowId, isHorizontal ? '→' : '↓', {
      fontSize: '20px',
      color: '#d1d5db',
      margin: isHorizontal ? '0 16px' : '8px 0',
    })
  );

  // 之后
  const afterSectionId = `${id}-after`;
  const afterChildIds: string[] = [];

  const afterLabelId = `${id}-after-label`;
  afterChildIds.push(afterLabelId);
  components.push(
    createText(afterLabelId, '之后', {
      fontSize: '12px',
      color: '#9ca3af',
      marginBottom: '4px',
    })
  );

  const afterValueId = `${id}-after-value`;
  afterChildIds.push(afterValueId);
  components.push(
    createText(afterValueId, `${after}${unit}`, {
      fontSize: isCompact ? '20px' : '24px',
      fontWeight: 'bold',
      color: changeColor,
    })
  );
  components.push(
    createContainer(afterSectionId, afterChildIds, {
      display: 'flex',
      flexDirection: 'column',
      alignItems: isHorizontal ? 'flex-start' : 'center',
      flex: '1',
    })
  );
  comparisonChildIds.push(afterSectionId);
  components.push(
    createContainer(comparisonId, comparisonChildIds, {
      display: 'flex',
      flexDirection: isHorizontal ? 'row' : 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isCompact ? '12px' : '16px',
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
    })
  );
  containerChildIds.push(comparisonId);

  // 主容器
  components.push(
    createContainer(id, containerChildIds, {
      padding: isCompact ? '12px' : '16px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    })
  );

  return { rootId: id, components };
}
