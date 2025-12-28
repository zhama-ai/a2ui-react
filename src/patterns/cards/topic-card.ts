/**
 * TopicCard - 主题卡片
 *
 * 展示学习主题、课程单元等
 */

import { createContainer, createIcon, createText, createButton } from '../components';
import type { PatternResult, MetadataItem, PatternOptions, ActionButton } from '../types';

export interface TopicCardOptions extends PatternOptions {
  /** 图标 */
  icon: string;
  /** 标题 */
  title: string;
  /** 描述 */
  description?: string;
  /** 元数据 */
  metadata?: MetadataItem[];
  /** 进度（0-100） */
  progress?: number;
  /** 状态 */
  status?: 'not_started' | 'in_progress' | 'completed' | 'locked';
  /** 操作按钮 */
  action?: ActionButton;
  /** 变体 */
  variant?: 'default' | 'compact' | 'featured';
  /** 颜色主题 */
  color?: string;
}

/**
 * 获取状态配置
 */
function getStatusConfig(status: string): { icon: string; color: string; text: string } {
  switch (status) {
    case 'completed':
      return { icon: '✅', color: '#10b981', text: '已完成' };
    case 'in_progress':
      return { icon: '📖', color: '#3b82f6', text: '进行中' };
    case 'locked':
      return { icon: '🔒', color: '#9ca3af', text: '未解锁' };
    default:
      return { icon: '📚', color: '#6b7280', text: '未开始' };
  }
}

/**
 * 创建主题卡片
 *
 * @example
 * ```typescript
 * const { rootId, components } = createTopicCard({
 *   icon: '🐍',
 *   title: 'Python 基础',
 *   description: '学习 Python 编程语言的基础知识',
 *   progress: 60,
 *   status: 'in_progress',
 *   action: {
 *     id: 'continue',
 *     text: '继续学习',
 *     action: 'continue_learning',
 *     context: { topicId: 'python-basics' },
 *   },
 * });
 * ```
 */
export function createTopicCard(options: TopicCardOptions): PatternResult {
  const {
    id = 'topic-card',
    icon,
    title,
    description,
    metadata,
    progress,
    status = 'not_started',
    action,
    variant = 'default',
    color,
  } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const statusConfig = getStatusConfig(status);
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';
  const isLocked = status === 'locked';

  // 头部区域（图标 + 标题 + 状态）
  const headerRowId = `${id}-header`;
  const headerChildIds: string[] = [];

  // 图标
  const iconContainerId = `${id}-icon-container`;
  const iconChildIds: string[] = [];

  const iconId = `${id}-icon`;
  iconChildIds.push(iconId);
  components.push(
    createIcon(iconId, icon, {
      fontSize: isFeatured ? '32px' : isCompact ? '20px' : '24px',
      opacity: isLocked ? '0.5' : '1',
    })
  );
  components.push(
    createContainer(iconContainerId, iconChildIds, {
      width: isFeatured ? '64px' : isCompact ? '40px' : '48px',
      height: isFeatured ? '64px' : isCompact ? '40px' : '48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: color ? `${color}15` : '#f3f4f6',
      borderRadius: '12px',
      flexShrink: '0',
    })
  );
  headerChildIds.push(iconContainerId);

  // 标题区域
  const titleSectionId = `${id}-title-section`;
  const titleSectionChildIds: string[] = [];

  // 标题
  const titleId = `${id}-title`;
  titleSectionChildIds.push(titleId);
  components.push(
    createText(titleId, title, {
      fontSize: isFeatured ? '18px' : isCompact ? '14px' : '16px',
      fontWeight: '600',
      color: isLocked ? '#9ca3af' : '#1f2937',
    })
  );

  // 状态标签
  if (!isCompact) {
    const statusId = `${id}-status`;
    titleSectionChildIds.push(statusId);
    components.push(
      createText(statusId, `${statusConfig.icon} ${statusConfig.text}`, {
        fontSize: '12px',
        color: statusConfig.color,
        marginTop: '4px',
      })
    );
  }
  components.push(
    createContainer(titleSectionId, titleSectionChildIds, {
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
      marginLeft: '12px',
    })
  );
  headerChildIds.push(titleSectionId);
  components.push(
    createContainer(headerRowId, headerChildIds, {
      display: 'flex',
      alignItems: 'center',
    })
  );
  containerChildIds.push(headerRowId);

  // 描述
  if (description && !isCompact) {
    const descId = `${id}-description`;
    containerChildIds.push(descId);
    components.push(
      createText(descId, description, {
        fontSize: '14px',
        color: isLocked ? '#9ca3af' : '#6b7280',
        marginTop: '12px',
        lineHeight: '1.5',
      })
    );
  }

  // 元数据
  if (metadata && metadata.length > 0 && !isCompact) {
    const metaRowId = `${id}-metadata`;
    const metaChildIds: string[] = [];

    metadata.forEach((item, idx) => {
      const metaItemId = `${id}-meta-${idx}`;
      const metaItemChildIds: string[] = [];

      const metaIconId = `${metaItemId}-icon`;
      metaItemChildIds.push(metaIconId);
      components.push(
        createIcon(metaIconId, item.icon, {
          fontSize: '12px',
          color: item.color || '#6b7280',
        })
      );

      const metaTextId = `${metaItemId}-text`;
      metaItemChildIds.push(metaTextId);
      components.push(
        createText(metaTextId, item.text, {
          fontSize: '12px',
          color: item.color || '#6b7280',
          marginLeft: '4px',
        })
      );
      components.push(
        createContainer(metaItemId, metaItemChildIds, {
          display: 'flex',
          alignItems: 'center',
          marginRight: '16px',
        })
      );
      metaChildIds.push(metaItemId);
    });
    components.push(
      createContainer(metaRowId, metaChildIds, {
        display: 'flex',
        alignItems: 'center',
        marginTop: '12px',
      })
    );
    containerChildIds.push(metaRowId);
  }

  // 进度条
  if (progress !== undefined && !isLocked && !isCompact) {
    const progressRowId = `${id}-progress`;
    const progressChildIds: string[] = [];

    // 进度条轨道
    const trackId = `${id}-track`;
    const trackChildIds: string[] = [];

    const fillId = `${id}-fill`;
    trackChildIds.push(fillId);
    components.push(
      createContainer(fillId, [], {
        width: `${progress}%`,
        height: '100%',
        backgroundColor: color || '#3b82f6',
        borderRadius: '4px',
        transition: 'width 0.3s ease',
      })
    );
    components.push(
      createContainer(trackId, trackChildIds, {
        flex: '1',
        height: '6px',
        backgroundColor: '#e5e7eb',
        borderRadius: '4px',
        overflow: 'hidden',
      })
    );
    progressChildIds.push(trackId);

    // 进度文本
    const progressTextId = `${id}-progress-text`;
    progressChildIds.push(progressTextId);
    components.push(
      createText(progressTextId, `${progress}%`, {
        fontSize: '12px',
        color: '#6b7280',
        marginLeft: '8px',
      })
    );
    components.push(
      createContainer(progressRowId, progressChildIds, {
        display: 'flex',
        alignItems: 'center',
        marginTop: '12px',
      })
    );
    containerChildIds.push(progressRowId);
  }

  // 操作按钮
  if (action && !isLocked) {
    const actionContext = action.context
      ? Object.entries(action.context).map(([key, value]) => ({ key, value }))
      : [];

    const btnResult = createButton(`${id}-action-btn`, action.text, action.action, actionContext, {
      styles: {
        backgroundColor: action.primary ? color || '#3b82f6' : 'transparent',
        color: action.primary ? '#ffffff' : color || '#3b82f6',
        border: action.primary ? 'none' : `1px solid ${color || '#3b82f6'}`,
        padding: isCompact ? '6px 12px' : '8px 16px',
        borderRadius: '8px',
        fontSize: isCompact ? '12px' : '14px',
        fontWeight: '500',
        cursor: 'pointer',
        marginTop: '16px',
        alignSelf: 'flex-start',
      },
    });
    containerChildIds.push(btnResult.buttonId);
    components.push(...btnResult.allComponents);
  }

  // 主容器
  components.push(
    createContainer(id, containerChildIds, {
      display: 'flex',
      flexDirection: 'column',
      padding: isFeatured ? '24px' : isCompact ? '12px' : '16px',
      backgroundColor: isLocked ? '#f9fafb' : '#ffffff',
      borderRadius: '12px',
      border: `1px solid ${isFeatured ? color || '#3b82f6' : '#e5e7eb'}`,
      boxShadow: isFeatured ? '0 4px 12px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.05)',
      opacity: isLocked ? '0.7' : '1',
    })
  );

  return { rootId: id, components };
}
