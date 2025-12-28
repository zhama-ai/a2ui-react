/**
 * StepList - 步骤列表
 *
 * 操作步骤说明
 */

import { createContainer, createText } from '../components';
import type { PatternResult, PatternOptions } from '../types';

export interface StepItem {
  /** 步骤标题 */
  title: string;
  /** 步骤描述 */
  description?: string;
  /** 代码示例 */
  code?: string;
}

export interface StepListOptions extends PatternOptions {
  /** 标题 */
  title?: string;
  /** 步骤列表 */
  steps: StepItem[];
  /** 变体 */
  variant?: 'default' | 'compact' | 'detailed';
  /** 颜色 */
  color?: string;
}

/**
 * 创建步骤列表
 *
 * @example
 * ```typescript
 * const { rootId, components } = createStepList({
 *   title: '安装步骤',
 *   steps: [
 *     { title: '安装 Python', description: '下载并安装 Python 3.x', code: 'brew install python' },
 *     { title: '验证安装', description: '检查 Python 版本', code: 'python --version' },
 *     { title: '运行第一个程序', code: 'print("Hello!")' },
 *   ],
 * });
 * ```
 */
export function createStepList(options: StepListOptions): PatternResult {
  const { id = 'step-list', title, steps, variant = 'default', color = '#3b82f6' } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const isCompact = variant === 'compact';
  const isDetailed = variant === 'detailed';

  // 标题
  if (title) {
    const titleId = `${id}-title`;
    containerChildIds.push(titleId);
    components.push(
      createText(titleId, title, {
        fontSize: '16px',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '16px',
      })
    );
  }

  // 步骤列表
  const listId = `${id}-list`;
  const stepIds: string[] = [];

  steps.forEach((step, index) => {
    const isLast = index === steps.length - 1;
    const stepId = `${id}-step-${index}`;
    const stepChildIds: string[] = [];

    // 序号
    const numberContainerId = `${stepId}-number`;
    const numberChildIds: string[] = [];

    const numberId = `${stepId}-num`;
    numberChildIds.push(numberId);
    components.push(
      createText(numberId, `${index + 1}`, {
        fontSize: isCompact ? '12px' : '14px',
        fontWeight: '600',
        color: '#ffffff',
      })
    );
    components.push(
      createContainer(numberContainerId, numberChildIds, {
        width: isCompact ? '24px' : '28px',
        height: isCompact ? '24px' : '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color,
        borderRadius: '50%',
        flexShrink: '0',
        zIndex: '1',
      })
    );
    stepChildIds.push(numberContainerId);

    // 内容区域
    const contentId = `${stepId}-content`;
    const contentChildIds: string[] = [];

    // 标题
    const stepTitleId = `${stepId}-title`;
    contentChildIds.push(stepTitleId);
    components.push(
      createText(stepTitleId, step.title, {
        fontSize: isCompact ? '14px' : '15px',
        fontWeight: '600',
        color: '#1f2937',
      })
    );

    // 描述
    if (step.description && !isCompact) {
      const descId = `${stepId}-desc`;
      contentChildIds.push(descId);
      components.push(
        createText(descId, step.description, {
          fontSize: '14px',
          color: '#6b7280',
          marginTop: '4px',
          lineHeight: '1.5',
        })
      );
    }

    // 代码示例
    if (step.code && isDetailed) {
      const codeId = `${stepId}-code`;
      contentChildIds.push(codeId);
      components.push(
        createText(codeId, step.code, {
          fontSize: '13px',
          fontFamily: 'monospace',
          color: '#1f2937',
          backgroundColor: '#f3f4f6',
          padding: '8px 12px',
          borderRadius: '4px',
          marginTop: '8px',
        })
      );
    }
    components.push(
      createContainer(contentId, contentChildIds, {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '16px',
        flex: '1',
        paddingBottom: isLast ? '0' : isCompact ? '16px' : '24px',
      })
    );
    stepChildIds.push(contentId);

    // 步骤容器
    components.push(
      createContainer(stepId, stepChildIds, {
        display: 'flex',
        alignItems: 'flex-start',
        position: 'relative',
      })
    );

    stepIds.push(stepId);

    // 连接线（不是最后一个）
    if (!isLast) {
      const lineId = `${id}-line-${index}`;
      stepIds.push(lineId);
      components.push(
        createContainer(lineId, [], {
          width: '2px',
          height: isCompact ? '16px' : '24px',
          backgroundColor: '#e5e7eb',
          marginLeft: isCompact ? '11px' : '13px',
        })
      );
    }
  });
  components.push(
    createContainer(listId, stepIds, {
      display: 'flex',
      flexDirection: 'column',
    })
  );
  containerChildIds.push(listId);

  // 主容器
  components.push(
    createContainer(id, containerChildIds, {
      display: 'flex',
      flexDirection: 'column',
    })
  );

  return { rootId: id, components };
}
