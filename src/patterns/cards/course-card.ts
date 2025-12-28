/**
 * CourseCard - 课程卡片
 *
 * 展示课程信息
 */

import { createContainer, createIcon, createText, createButton } from '../components';
import type { PatternResult, PatternOptions, ActionButton } from '../types';

export interface CourseCardOptions extends PatternOptions {
  /** 封面图标 */
  icon: string;
  /** 课程标题 */
  title: string;
  /** 课程描述 */
  description?: string;
  /** 作者 */
  author?: string;
  /** 时长 */
  duration?: string;
  /** 课时数 */
  lessonCount?: number;
  /** 学员数 */
  studentCount?: number;
  /** 难度 */
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  /** 评分 */
  rating?: number;
  /** 价格（0 表示免费） */
  price?: number;
  /** 进度（0-100，已购买的课程） */
  progress?: number;
  /** 标签 */
  tags?: string[];
  /** 操作按钮 */
  action?: ActionButton;
  /** 变体 */
  variant?: 'default' | 'horizontal' | 'compact';
  /** 颜色主题 */
  color?: string;
}

/**
 * 获取难度配置
 */
function getDifficultyConfig(difficulty: 'beginner' | 'intermediate' | 'advanced'): {
  text: string;
  color: string;
} {
  switch (difficulty) {
    case 'beginner':
      return { text: '入门', color: '#10b981' };
    case 'intermediate':
      return { text: '进阶', color: '#f59e0b' };
    case 'advanced':
      return { text: '高级', color: '#ef4444' };
    default:
      return { text: '入门', color: '#10b981' };
  }
}

/**
 * 创建课程卡片
 *
 * @example
 * ```typescript
 * const { rootId, components } = createCourseCard({
 *   icon: '🐍',
 *   title: 'Python 零基础入门',
 *   description: '从零开始学习 Python 编程',
 *   author: '张老师',
 *   duration: '8小时',
 *   lessonCount: 42,
 *   studentCount: 12500,
 *   difficulty: 'beginner',
 *   rating: 4.8,
 *   price: 0,
 *   action: {
 *     id: 'enroll',
 *     text: '免费学习',
 *     action: 'enroll_course',
 *   },
 * });
 * ```
 */
export function createCourseCard(options: CourseCardOptions): PatternResult {
  const {
    id = 'course-card',
    icon,
    title,
    description,
    author,
    duration,
    lessonCount,
    studentCount,
    difficulty,
    rating,
    price,
    progress,
    tags,
    action,
    variant = 'default',
    color = '#3b82f6',
  } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const isHorizontal = variant === 'horizontal';
  const isCompact = variant === 'compact';

  // 主布局容器
  const mainLayoutId = `${id}-main-layout`;
  const mainLayoutChildIds: string[] = [];

  // 封面区域
  const coverId = `${id}-cover`;
  const coverChildIds: string[] = [];

  const coverIconId = `${id}-cover-icon`;
  coverChildIds.push(coverIconId);
  components.push(
    createIcon(coverIconId, icon, {
      fontSize: isCompact ? '32px' : '48px',
    })
  );

  // 难度标签（覆盖在封面上）
  if (difficulty && !isCompact) {
    const diffConfig = getDifficultyConfig(difficulty);
    const diffBadgeId = `${id}-difficulty`;
    coverChildIds.push(diffBadgeId);
    components.push(
      createText(diffBadgeId, diffConfig.text, {
        position: 'absolute',
        top: '8px',
        right: '8px',
        fontSize: '10px',
        fontWeight: '500',
        color: '#ffffff',
        backgroundColor: diffConfig.color,
        padding: '2px 8px',
        borderRadius: '4px',
      })
    );
  }
  components.push(
    createContainer(coverId, coverChildIds, {
      position: 'relative',
      width: isHorizontal ? '120px' : '100%',
      height: isHorizontal ? '100%' : isCompact ? '80px' : '120px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: `${color}15`,
      borderRadius: isHorizontal ? '8px 0 0 8px' : '8px 8px 0 0',
      flexShrink: '0',
    })
  );
  mainLayoutChildIds.push(coverId);

  // 信息区域
  const infoSectionId = `${id}-info`;
  const infoChildIds: string[] = [];

  // 标题
  const titleId = `${id}-title`;
  infoChildIds.push(titleId);
  components.push(
    createText(titleId, title, {
      fontSize: isCompact ? '14px' : '16px',
      fontWeight: '600',
      color: '#1f2937',
      lineHeight: '1.3',
    })
  );

  // 描述
  if (description && !isCompact) {
    const descId = `${id}-description`;
    infoChildIds.push(descId);
    components.push(
      createText(descId, description, {
        fontSize: '14px',
        color: '#6b7280',
        marginTop: '6px',
        lineHeight: '1.4',
        display: '-webkit-box',
        WebkitLineClamp: '2',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      })
    );
  }

  // 作者
  if (author && !isCompact) {
    const authorId = `${id}-author`;
    infoChildIds.push(authorId);
    components.push(
      createText(authorId, `👤 ${author}`, {
        fontSize: '12px',
        color: '#9ca3af',
        marginTop: '8px',
      })
    );
  }

  // 统计信息行
  const statsRowId = `${id}-stats`;
  const statsChildIds: string[] = [];

  if (duration) {
    const durationId = `${id}-duration`;
    statsChildIds.push(durationId);
    components.push(
      createText(durationId, `⏱️ ${duration}`, {
        fontSize: '12px',
        color: '#6b7280',
      })
    );
  }

  if (lessonCount) {
    const lessonId = `${id}-lessons`;
    statsChildIds.push(lessonId);
    components.push(
      createText(lessonId, `📚 ${lessonCount}课时`, {
        fontSize: '12px',
        color: '#6b7280',
      })
    );
  }

  if (studentCount) {
    const studentId = `${id}-students`;
    statsChildIds.push(studentId);
    components.push(
      createText(
        studentId,
        `👥 ${studentCount >= 1000 ? `${(studentCount / 1000).toFixed(1)}k` : studentCount}人`,
        {
          fontSize: '12px',
          color: '#6b7280',
        }
      )
    );
  }

  if (statsChildIds.length > 0) {
    components.push(
      createContainer(statsRowId, statsChildIds, {
        display: 'flex',
        gap: '12px',
        marginTop: '8px',
      })
    );
    infoChildIds.push(statsRowId);
  }

  // 评分和价格行
  const priceRowId = `${id}-price-row`;
  const priceRowChildIds: string[] = [];

  if (rating !== undefined) {
    const ratingId = `${id}-rating`;
    priceRowChildIds.push(ratingId);
    components.push(
      createText(ratingId, `⭐ ${rating.toFixed(1)}`, {
        fontSize: '12px',
        color: '#f59e0b',
        fontWeight: '500',
      })
    );
  }

  if (price !== undefined) {
    const priceId = `${id}-price`;
    priceRowChildIds.push(priceId);
    components.push(
      createText(priceId, price === 0 ? '免费' : `¥${price}`, {
        fontSize: '16px',
        fontWeight: 'bold',
        color: price === 0 ? '#10b981' : '#ef4444',
        marginLeft: 'auto',
      })
    );
  }

  if (priceRowChildIds.length > 0) {
    components.push(
      createContainer(priceRowId, priceRowChildIds, {
        display: 'flex',
        alignItems: 'center',
        marginTop: '8px',
      })
    );
    infoChildIds.push(priceRowId);
  }

  // 进度条（已购买课程）
  if (progress !== undefined) {
    const progressRowId = `${id}-progress`;
    const progressChildIds: string[] = [];

    const trackId = `${id}-track`;
    const trackChildIds: string[] = [];

    const fillId = `${id}-fill`;
    trackChildIds.push(fillId);
    components.push(
      createContainer(fillId, [], {
        width: `${progress}%`,
        height: '100%',
        backgroundColor: color,
        borderRadius: '4px',
      })
    );
    components.push(
      createContainer(trackId, trackChildIds, {
        flex: '1',
        height: '4px',
        backgroundColor: '#e5e7eb',
        borderRadius: '4px',
        overflow: 'hidden',
      })
    );
    progressChildIds.push(trackId);

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
    infoChildIds.push(progressRowId);
  }

  // 标签
  if (tags && tags.length > 0 && !isCompact) {
    const tagsRowId = `${id}-tags`;
    const tagIds: string[] = [];

    tags.slice(0, 3).forEach((tag, idx) => {
      const tagId = `${id}-tag-${idx}`;
      tagIds.push(tagId);
      components.push(
        createText(tagId, tag, {
          fontSize: '10px',
          color: '#6b7280',
          backgroundColor: '#f3f4f6',
          padding: '2px 6px',
          borderRadius: '4px',
        })
      );
    });
    components.push(
      createContainer(tagsRowId, tagIds, {
        display: 'flex',
        gap: '6px',
        marginTop: '8px',
      })
    );
    infoChildIds.push(tagsRowId);
  }

  // 操作按钮
  if (action) {
    const actionContext = action.context
      ? Object.entries(action.context).map(([key, value]) => ({ key, value }))
      : [];

    const btnResult = createButton(`${id}-action-btn`, action.text, action.action, actionContext, {
      styles: {
        width: '100%',
        backgroundColor: color,
        color: '#ffffff',
        border: 'none',
        padding: isCompact ? '8px' : '10px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        marginTop: '12px',
      },
    });
    infoChildIds.push(btnResult.buttonId);
    components.push(...btnResult.allComponents);
  }
  components.push(
    createContainer(infoSectionId, infoChildIds, {
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
      padding: isCompact ? '12px' : '16px',
    })
  );
  mainLayoutChildIds.push(infoSectionId);
  components.push(
    createContainer(mainLayoutId, mainLayoutChildIds, {
      display: 'flex',
      flexDirection: isHorizontal ? 'row' : 'column',
    })
  );
  containerChildIds.push(mainLayoutId);

  // 主容器
  components.push(
    createContainer(id, containerChildIds, {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    })
  );

  return { rootId: id, components };
}
