/**
 * Timeline - 时间线
 *
 * 展示时间顺序的事件/步骤
 */

import { createContainer, createText } from '../components';
import type { PatternResult, PatternOptions, TimelineItem } from '../types';

export interface TimelineOptions extends PatternOptions {
  /** 时间线项 */
  items: TimelineItem[];
  /** 方向 */
  direction?: 'vertical' | 'horizontal';
  /** 变体 */
  variant?: 'default' | 'compact' | 'alternating';
  /** 是否显示连接线 */
  showLine?: boolean;
}

/**
 * 获取状态配置
 */
function getStatusConfig(status: 'completed' | 'current' | 'pending'): {
  color: string;
  bgColor: string;
  icon: string;
} {
  switch (status) {
    case 'completed':
      return { color: '#10b981', bgColor: '#d1fae5', icon: '✓' };
    case 'current':
      return { color: '#3b82f6', bgColor: '#dbeafe', icon: '●' };
    default:
      return { color: '#9ca3af', bgColor: '#f3f4f6', icon: '○' };
  }
}

/**
 * 创建时间线
 *
 * @example
 * ```typescript
 * const { rootId, components } = createTimeline({
 *   items: [
 *     { id: '1', title: '开始学习', description: '注册账号', status: 'completed', time: '2024-01-01' },
 *     { id: '2', title: '完成基础课程', status: 'current' },
 *     { id: '3', title: '获得证书', status: 'pending' },
 *   ],
 * });
 * ```
 */
export function createTimeline(options: TimelineOptions): PatternResult {
  const {
    id = 'timeline',
    items,
    direction = 'vertical',
    variant = 'default',
    showLine = true,
  } = options;

  const components: unknown[] = [];
  const itemIds: string[] = [];

  const isVertical = direction === 'vertical';
  const isCompact = variant === 'compact';
  const isAlternating = variant === 'alternating';

  items.forEach((item, index) => {
    const isLast = index === items.length - 1;
    const statusConfig = getStatusConfig(item.status);
    const displayIcon = item.icon || statusConfig.icon;

    const itemId = `${id}-item-${index}`;
    const itemChildIds: string[] = [];

    // 时间线点和线
    const dotSectionId = `${itemId}-dot-section`;
    const dotChildIds: string[] = [];

    // 点
    const dotId = `${itemId}-dot`;
    dotChildIds.push(dotId);
    const dotIconId = `${dotId}-icon`;

    components.push(
      createText(dotIconId, displayIcon, {
        fontSize: item.status === 'current' ? '10px' : '12px',
        color: statusConfig.color,
        fontWeight: 'bold',
      })
    );
    components.push(
      createContainer(dotId, dotChildIds, {
        width: isCompact ? '24px' : '32px',
        height: isCompact ? '24px' : '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: statusConfig.bgColor,
        borderRadius: '50%',
        border: `2px solid ${statusConfig.color}`,
        flexShrink: '0',
        zIndex: '1',
      })
    );

    // 连接线
    if (showLine && !isLast) {
      const lineId = `${itemId}-line`;
      dotChildIds.push(lineId);
      components.push(
        createContainer(lineId, [], {
          width: isVertical ? '2px' : '100%',
          height: isVertical ? '100%' : '2px',
          backgroundColor: item.status === 'completed' ? statusConfig.color : '#e5e7eb',
          position: 'absolute',
          top: isVertical ? (isCompact ? '24px' : '32px') : '50%',
          left: isVertical ? '50%' : isCompact ? '24px' : '32px',
          transform: isVertical ? 'translateX(-50%)' : 'translateY(-50%)',
        })
      );
    }
    const dotSectionStyle: Record<string, string> = {
      position: 'relative',
      display: 'flex',
      flexDirection: isVertical ? 'column' : 'row',
      alignItems: 'center',
      width: isVertical ? 'auto' : '100%',
      height: isVertical ? '100%' : 'auto',
    };
    if (isVertical) {
      dotSectionStyle.minHeight = '60px';
    }
    components.push(createContainer(dotSectionId, dotChildIds, dotSectionStyle));
    itemChildIds.push(dotSectionId);

    // 内容区域
    const contentId = `${itemId}-content`;
    const contentChildIds: string[] = [];

    // 时间
    if (item.time && !isCompact) {
      const timeId = `${itemId}-time`;
      contentChildIds.push(timeId);
      components.push(
        createText(timeId, item.time, {
          fontSize: '12px',
          color: '#9ca3af',
          marginBottom: '4px',
        })
      );
    }

    // 标题
    const titleId = `${itemId}-title`;
    contentChildIds.push(titleId);
    components.push(
      createText(titleId, item.title, {
        fontSize: isCompact ? '13px' : '15px',
        fontWeight: item.status === 'current' ? '600' : '500',
        color: item.status === 'pending' ? '#9ca3af' : '#1f2937',
      })
    );

    // 描述
    if (item.description && !isCompact) {
      const descId = `${itemId}-desc`;
      contentChildIds.push(descId);
      components.push(
        createText(descId, item.description, {
          fontSize: '13px',
          color: '#6b7280',
          marginTop: '4px',
          lineHeight: '1.4',
        })
      );
    }
    components.push(
      createContainer(contentId, contentChildIds, {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: isVertical ? '16px' : '0',
        marginTop: isVertical ? '0' : '12px',
        flex: '1',
        paddingBottom: isVertical && !isLast ? '20px' : '0',
      })
    );
    itemChildIds.push(contentId);

    // 时间线项容器
    const itemContainerStyle: Record<string, string> = {
      display: 'flex',
      flexDirection: isVertical ? 'row' : 'column',
      alignItems: isVertical ? 'flex-start' : 'center',
      flex: isLast ? 'none' : '1',
    };
    if (!isVertical) {
      itemContainerStyle.minWidth = '120px';
    }
    components.push(createContainer(itemId, itemChildIds, itemContainerStyle));
    itemIds.push(itemId);
  });

  // 主容器
  components.push(
    createContainer(id, itemIds, {
      display: 'flex',
      flexDirection: isVertical ? 'column' : 'row',
    })
  );

  return { rootId: id, components };
}
