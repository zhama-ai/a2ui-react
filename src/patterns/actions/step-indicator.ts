/**
 * StepIndicator - 步骤指示器
 *
 * 展示步骤流程进度
 */

import { createContainer, createText } from '../components';
import type { PatternResult, PatternOptions } from '../types';

export interface StepItem {
  /** 步骤 ID */
  id: string;
  /** 步骤标题 */
  title: string;
  /** 步骤描述（可选） */
  description?: string;
  /** 状态 */
  status: 'completed' | 'current' | 'pending';
  /** 自定义图标 */
  icon?: string;
}

export interface StepIndicatorOptions extends PatternOptions {
  /** 步骤列表 */
  steps: StepItem[];
  /** 方向 */
  direction?: 'horizontal' | 'vertical';
  /** 变体 */
  variant?: 'default' | 'compact' | 'simple';
  /** 是否显示描述 */
  showDescription?: boolean;
}

/**
 * 获取步骤状态样式
 */
function getStepStyles(status: 'completed' | 'current' | 'pending'): {
  bg: string;
  border: string;
  text: string;
  lineColor: string;
} {
  switch (status) {
    case 'completed':
      return { bg: '#10b981', border: '#10b981', text: '#ffffff', lineColor: '#10b981' };
    case 'current':
      return { bg: '#3b82f6', border: '#3b82f6', text: '#ffffff', lineColor: '#e5e7eb' };
    default:
      return { bg: '#ffffff', border: '#d1d5db', text: '#9ca3af', lineColor: '#e5e7eb' };
  }
}

/**
 * 创建步骤指示器
 *
 * @example
 * ```typescript
 * const { rootId, components } = createStepIndicator({
 *   steps: [
 *     { id: '1', title: '选择课程', status: 'completed' },
 *     { id: '2', title: '学习内容', status: 'current' },
 *     { id: '3', title: '完成练习', status: 'pending' },
 *     { id: '4', title: '获取证书', status: 'pending' },
 *   ],
 *   direction: 'horizontal',
 * });
 * ```
 */
export function createStepIndicator(options: StepIndicatorOptions): PatternResult {
  const {
    id = 'step-indicator',
    steps,
    direction = 'horizontal',
    variant = 'default',
    showDescription = true,
  } = options;

  const components: unknown[] = [];
  const stepIds: string[] = [];

  const isVertical = direction === 'vertical';
  const isCompact = variant === 'compact';
  const isSimple = variant === 'simple';

  steps.forEach((step, index) => {
    const isLast = index === steps.length - 1;
    const stepStyles = getStepStyles(step.status);

    const stepId = `${id}-step-${index}`;
    const stepChildIds: string[] = [];

    // 步骤指示器（圆圈/数字）
    const indicatorId = `${stepId}-indicator`;
    const indicatorChildIds: string[] = [];

    if (step.status === 'completed') {
      const checkId = `${stepId}-check`;
      indicatorChildIds.push(checkId);
      components.push(
        createText(checkId, step.icon || '✓', {
          fontSize: isCompact ? '12px' : '14px',
          color: stepStyles.text,
          fontWeight: 'bold',
        })
      );
    } else {
      const numId = `${stepId}-num`;
      indicatorChildIds.push(numId);
      components.push(
        createText(numId, step.icon || `${index + 1}`, {
          fontSize: isCompact ? '12px' : '14px',
          color: stepStyles.text,
          fontWeight: '600',
        })
      );
    }
    components.push(
      createContainer(indicatorId, indicatorChildIds, {
        width: isCompact ? '24px' : '32px',
        height: isCompact ? '24px' : '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: stepStyles.bg,
        border: `2px solid ${stepStyles.border}`,
        borderRadius: '50%',
        flexShrink: '0',
        zIndex: '1',
      })
    );
    stepChildIds.push(indicatorId);

    // 文本区域（非 simple 模式）
    if (!isSimple) {
      const textSectionId = `${stepId}-text`;
      const textChildIds: string[] = [];

      // 标题
      const titleId = `${stepId}-title`;
      textChildIds.push(titleId);
      components.push(
        createText(titleId, step.title, {
          fontSize: isCompact ? '12px' : '14px',
          fontWeight: step.status === 'current' ? '600' : '500',
          color: step.status === 'pending' ? '#9ca3af' : '#374151',
        })
      );

      // 描述
      if (step.description && showDescription && !isCompact) {
        const descId = `${stepId}-desc`;
        textChildIds.push(descId);
        components.push(
          createText(descId, step.description, {
            fontSize: '12px',
            color: '#6b7280',
            marginTop: '2px',
          })
        );
      }
      components.push(
        createContainer(textSectionId, textChildIds, {
          display: 'flex',
          flexDirection: 'column',
          marginLeft: isVertical ? '12px' : '0',
          marginTop: isVertical ? '0' : '8px',
          alignItems: isVertical ? 'flex-start' : 'center',
        })
      );
      stepChildIds.push(textSectionId);
    }

    // 步骤容器
    components.push(
      createContainer(stepId, stepChildIds, {
        display: 'flex',
        flexDirection: isVertical ? 'row' : 'column',
        alignItems: isVertical ? 'flex-start' : 'center',
        flex: isLast ? 'none' : '1',
        position: 'relative',
      })
    );
    stepIds.push(stepId);

    // 连接线（不是最后一个）
    if (!isLast) {
      const lineId = `${id}-line-${index}`;
      stepIds.push(lineId);

      const lineStyle: Record<string, string> = isVertical
        ? {
            width: '2px',
            height: '100%',
            minHeight: '40px',
            backgroundColor: stepStyles.lineColor,
            marginLeft: isCompact ? '11px' : '15px',
          }
        : {
            flex: '1',
            height: '2px',
            backgroundColor: stepStyles.lineColor,
            marginTop: isCompact ? '11px' : '15px',
          };

      components.push(createContainer(lineId, [], lineStyle));
    }
  });

  // 主容器
  components.push(
    createContainer(id, stepIds, {
      display: 'flex',
      flexDirection: isVertical ? 'column' : 'row',
      alignItems: isVertical ? 'flex-start' : 'flex-start',
      width: '100%',
    })
  );

  return { rootId: id, components };
}
