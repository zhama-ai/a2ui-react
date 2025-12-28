/**
 * ProgressBar - 进度条
 *
 * 展示任务完成进度
 */

import { createContainer, createText } from '../components';
import type { PatternResult, ProgressData, PatternOptions } from '../types';

export interface ProgressBarOptions extends PatternOptions, ProgressData {
  /** 变体 */
  variant?: 'default' | 'slim' | 'thick';
  /** 是否动画 */
  animated?: boolean;
  /** 是否显示标签 */
  showLabel?: boolean;
}

/**
 * 创建进度条
 *
 * @example
 * ```typescript
 * const { rootId, components } = createProgressBar({
 *   current: 7,
 *   total: 10,
 *   label: '学习进度',
 *   showPercentage: true,
 *   color: '#3b82f6',
 * });
 * ```
 */
export function createProgressBar(options: ProgressBarOptions): PatternResult {
  const {
    id = 'progress-bar',
    current,
    total,
    label,
    showPercentage = true,
    color = '#3b82f6',
    variant = 'default',
    showLabel = true,
  } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const percentage = Math.min(100, Math.round((current / total) * 100));

  // 标签行（如果有）
  if (showLabel && (label || showPercentage)) {
    const labelRowId = `${id}-label-row`;
    const labelRowChildIds: string[] = [];

    if (label) {
      const labelId = `${id}-label`;
      labelRowChildIds.push(labelId);
      components.push(
        createText(labelId, label, {
          fontSize: '14px',
          color: '#374151',
          fontWeight: '500',
        })
      );
    }

    if (showPercentage) {
      const percentId = `${id}-percent`;
      labelRowChildIds.push(percentId);
      components.push(
        createText(percentId, `${current}/${total} (${percentage}%)`, {
          fontSize: '14px',
          color: '#6b7280',
          marginLeft: label ? 'auto' : '0',
        })
      );
    }
    components.push(
      createContainer(labelRowId, labelRowChildIds, {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
        width: '100%',
      })
    );
    containerChildIds.push(labelRowId);
  }

  // 进度条轨道
  const trackId = `${id}-track`;
  const trackChildIds: string[] = [];

  // 进度条填充
  const fillId = `${id}-fill`;
  components.push(
    createContainer(fillId, [], {
      width: `${percentage}%`,
      height: '100%',
      backgroundColor: color,
      borderRadius: '4px',
      transition: 'width 0.3s ease',
    })
  );
  trackChildIds.push(fillId);
  const height = variant === 'slim' ? '4px' : variant === 'thick' ? '12px' : '8px';
  components.push(
    createContainer(trackId, trackChildIds, {
      width: '100%',
      height,
      backgroundColor: '#e5e7eb',
      borderRadius: '4px',
      overflow: 'hidden',
    })
  );
  containerChildIds.push(trackId);

  // 主容器
  components.push(
    createContainer(id, containerChildIds, {
      width: '100%',
    })
  );

  return { rootId: id, components };
}
