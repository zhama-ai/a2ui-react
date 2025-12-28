/**
 * RecommendationCard - 推荐卡片
 *
 * 展示个性化推荐内容
 */

import { createContainer, createIcon, createText, createButton } from '../components';
import type { PatternResult, PatternOptions, ActionButton } from '../types';

export interface RecommendationCardOptions extends PatternOptions {
  /** 图标 */
  icon: string;
  /** 标题 */
  title: string;
  /** 描述 */
  description: string;
  /** 推荐原因 */
  reason?: string;
  /** 标签 */
  tags?: string[];
  /** 评分（1-5） */
  rating?: number;
  /** 操作按钮 */
  action?: ActionButton;
  /** 变体 */
  variant?: 'default' | 'horizontal' | 'compact';
  /** 颜色 */
  color?: string;
}

/**
 * 创建推荐卡片
 *
 * @example
 * ```typescript
 * const { rootId, components } = createRecommendationCard({
 *   icon: '🎯',
 *   title: 'JavaScript 进阶',
 *   description: '掌握 ES6+ 和异步编程',
 *   reason: '基于你的学习历史推荐',
 *   rating: 4.5,
 *   tags: ['进阶', '热门'],
 *   action: {
 *     id: 'start',
 *     text: '开始学习',
 *     action: 'start_course',
 *     context: { courseId: 'js-advanced' },
 *   },
 * });
 * ```
 */
export function createRecommendationCard(options: RecommendationCardOptions): PatternResult {
  const {
    id = 'recommendation-card',
    icon,
    title,
    description,
    reason,
    tags,
    rating,
    action,
    variant = 'default',
    color = '#8b5cf6',
  } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const isHorizontal = variant === 'horizontal';
  const isCompact = variant === 'compact';

  // 推荐原因（顶部标签）
  if (reason && !isCompact) {
    const reasonId = `${id}-reason`;
    containerChildIds.push(reasonId);
    components.push(
      createText(reasonId, `💡 ${reason}`, {
        fontSize: '12px',
        color: color,
        backgroundColor: `${color}15`,
        padding: '4px 8px',
        borderRadius: '4px',
        alignSelf: 'flex-start',
        marginBottom: '12px',
      })
    );
  }

  // 主内容区域
  const mainRowId = `${id}-main`;
  const mainChildIds: string[] = [];

  // 图标
  const iconContainerId = `${id}-icon-container`;
  const iconChildIds: string[] = [];

  const iconId = `${id}-icon`;
  iconChildIds.push(iconId);
  components.push(
    createIcon(iconId, icon, {
      fontSize: isCompact ? '24px' : '32px',
    })
  );
  components.push(
    createContainer(iconContainerId, iconChildIds, {
      width: isCompact ? '48px' : '64px',
      height: isCompact ? '48px' : '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: `${color}15`,
      borderRadius: '12px',
      flexShrink: '0',
    })
  );
  mainChildIds.push(iconContainerId);

  // 内容区域
  const contentSectionId = `${id}-content-section`;
  const contentChildIds: string[] = [];

  // 标题
  const titleId = `${id}-title`;
  contentChildIds.push(titleId);
  components.push(
    createText(titleId, title, {
      fontSize: isCompact ? '14px' : '16px',
      fontWeight: '600',
      color: '#1f2937',
    })
  );

  // 描述
  if (!isCompact) {
    const descId = `${id}-description`;
    contentChildIds.push(descId);
    components.push(
      createText(descId, description, {
        fontSize: '14px',
        color: '#6b7280',
        marginTop: '4px',
        lineHeight: '1.4',
      })
    );
  }

  // 评分
  if (rating !== undefined && !isCompact) {
    const ratingRowId = `${id}-rating`;
    const ratingChildIds: string[] = [];

    const stars = '⭐'.repeat(Math.floor(rating));
    const starsId = `${id}-stars`;
    ratingChildIds.push(starsId);
    components.push(
      createText(starsId, stars, {
        fontSize: '12px',
      })
    );

    const ratingTextId = `${id}-rating-text`;
    ratingChildIds.push(ratingTextId);
    components.push(
      createText(ratingTextId, `${rating.toFixed(1)}`, {
        fontSize: '12px',
        color: '#6b7280',
        marginLeft: '4px',
      })
    );
    components.push(
      createContainer(ratingRowId, ratingChildIds, {
        display: 'flex',
        alignItems: 'center',
        marginTop: '8px',
      })
    );
    contentChildIds.push(ratingRowId);
  }
  components.push(
    createContainer(contentSectionId, contentChildIds, {
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
      marginLeft: '12px',
    })
  );
  mainChildIds.push(contentSectionId);
  components.push(
    createContainer(mainRowId, mainChildIds, {
      display: 'flex',
      alignItems: isHorizontal ? 'center' : 'flex-start',
    })
  );
  containerChildIds.push(mainRowId);

  // 标签
  if (tags && tags.length > 0 && !isCompact) {
    const tagsRowId = `${id}-tags`;
    const tagIds: string[] = [];

    tags.forEach((tag, idx) => {
      const tagId = `${id}-tag-${idx}`;
      tagIds.push(tagId);
      components.push(
        createText(tagId, tag, {
          fontSize: '12px',
          color: color,
          backgroundColor: `${color}10`,
          padding: '2px 8px',
          borderRadius: '4px',
        })
      );
    });
    components.push(
      createContainer(tagsRowId, tagIds, {
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        marginTop: '12px',
      })
    );
    containerChildIds.push(tagsRowId);
  }

  // 操作按钮
  if (action) {
    const actionContext = action.context
      ? Object.entries(action.context).map(([key, value]) => ({ key, value }))
      : [];

    const btnResult = createButton(`${id}-action-btn`, action.text, action.action, actionContext, {
      styles: {
      backgroundColor: color,
      color: '#ffffff',
      border: 'none',
      padding: isCompact ? '6px 12px' : '10px 20px',
      borderRadius: '8px',
      fontSize: isCompact ? '12px' : '14px',
      fontWeight: '500',
      cursor: 'pointer',
      marginTop: isCompact ? '12px' : '16px',
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
      padding: isCompact ? '12px' : '20px',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    })
  );

  return { rootId: id, components };
}
