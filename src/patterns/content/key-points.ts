/**
 * KeyPoints - 关键要点
 *
 * 要点列表展示
 */

import { createContainer, createText } from '../components';
import type { PatternResult, PatternOptions } from '../types';

export interface KeyPoint {
  /** 图标 */
  icon?: string;
  /** 文本 */
  text: string;
  /** 颜色 */
  color?: string;
}

export interface KeyPointsOptions extends PatternOptions {
  /** 标题 */
  title?: string;
  /** 要点列表 */
  points: KeyPoint[];
  /** 变体 */
  variant?: 'default' | 'numbered' | 'checklist' | 'cards';
  /** 列数（用于 cards 变体） */
  columns?: 1 | 2 | 3;
  /** 颜色 */
  color?: string;
}

/**
 * 创建关键要点
 *
 * @example
 * ```typescript
 * const { rootId, components } = createKeyPoints({
 *   title: '本节要点',
 *   points: [
 *     { icon: '✓', text: '变量是存储数据的容器', color: '#10b981' },
 *     { icon: '✓', text: '变量名应该见名知意', color: '#10b981' },
 *     { icon: '!', text: '避免使用关键字作为变量名', color: '#f59e0b' },
 *   ],
 *   variant: 'checklist',
 * });
 * ```
 */
export function createKeyPoints(options: KeyPointsOptions): PatternResult {
  const {
    id = 'key-points',
    title,
    points,
    variant = 'default',
    columns = 1,
    color = '#3b82f6',
  } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const isNumbered = variant === 'numbered';
  const isChecklist = variant === 'checklist';
  const isCards = variant === 'cards';

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

  // 要点列表
  const listId = `${id}-list`;
  const pointIds: string[] = [];

  points.forEach((point, index) => {
    const pointId = `${id}-point-${index}`;
    const pointChildIds: string[] = [];

    const pointColor = point.color || color;

    // 图标/序号
    const markerContainerId = `${pointId}-marker`;
    const markerChildIds: string[] = [];

    let markerContent: string;
    if (isNumbered) {
      markerContent = `${index + 1}`;
    } else if (isChecklist) {
      markerContent = point.icon || '✓';
    } else {
      markerContent = point.icon || '•';
    }

    const markerId = `${pointId}-marker-icon`;
    markerChildIds.push(markerId);
    components.push(
      createText(markerId, markerContent, {
        fontSize: isNumbered ? '12px' : '14px',
        fontWeight: isNumbered ? '600' : 'normal',
        color: isNumbered || isChecklist ? '#ffffff' : pointColor,
      })
    );
    if (isNumbered || isChecklist) {
      components.push(
        createContainer(markerContainerId, markerChildIds, {
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: pointColor,
          borderRadius: isNumbered ? '50%' : '4px',
          flexShrink: '0',
        })
      );
    } else {
      components.push(
        createContainer(markerContainerId, markerChildIds, {
          width: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: '0',
        })
      );
    }
    pointChildIds.push(markerContainerId);

    // 文本
    const textId = `${pointId}-text`;
    pointChildIds.push(textId);
    components.push(
      createText(textId, point.text, {
        fontSize: '14px',
        color: '#374151',
        lineHeight: '1.6',
        marginLeft: '12px',
        flex: '1',
      })
    );

    // 要点容器
    const pointStyle: Record<string, string> = {
      display: 'flex',
      alignItems: 'flex-start',
    };

    if (isCards) {
      pointStyle.padding = '16px';
      pointStyle.backgroundColor = '#ffffff';
      pointStyle.border = '1px solid #e5e7eb';
      pointStyle.borderRadius = '8px';
    } else {
      pointStyle.marginBottom = index < points.length - 1 ? '12px' : '0';
    }

    components.push(createContainer(pointId, pointChildIds, pointStyle));
    pointIds.push(pointId);
  });
  const listStyle: Record<string, string> = {
    display: isCards ? 'grid' : 'flex',
    flexDirection: 'column',
  };

  if (isCards) {
    listStyle.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    listStyle.gap = '12px';
  }

  components.push(createContainer(listId, pointIds, listStyle));
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
