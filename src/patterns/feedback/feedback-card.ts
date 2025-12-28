/**
 * FeedbackCard - 反馈卡片
 *
 * 用于答题反馈、评估结果等
 */

import { createContainer, createIcon, createText, createButton } from '../components';
import type { PatternResult, PatternOptions, ActionButton } from '../types';

export interface FeedbackCardOptions extends PatternOptions {
  /** 反馈类型 */
  type: 'correct' | 'incorrect' | 'partial' | 'info';
  /** 标题 */
  title: string;
  /** 反馈消息 */
  message: string;
  /** 图标（可选，默认根据类型） */
  icon?: string;
  /** 详细说明 */
  details?: string;
  /** 正确答案（错误时显示） */
  correctAnswer?: string;
  /** 用户答案 */
  userAnswer?: string;
  /** 得分 */
  score?: number;
  /** 最高得分 */
  maxScore?: number;
  /** 操作按钮 */
  actions?: ActionButton[];
  /** 变体 */
  variant?: 'default' | 'compact' | 'expanded';
}

/**
 * 获取反馈类型配置
 */
function getFeedbackConfig(type: 'correct' | 'incorrect' | 'partial' | 'info'): {
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
} {
  switch (type) {
    case 'correct':
      return { icon: '✅', color: '#10b981', bgColor: '#ecfdf5', borderColor: '#10b981' };
    case 'incorrect':
      return { icon: '❌', color: '#ef4444', bgColor: '#fef2f2', borderColor: '#ef4444' };
    case 'partial':
      return { icon: '⚠️', color: '#f59e0b', bgColor: '#fffbeb', borderColor: '#f59e0b' };
    default:
      return { icon: 'ℹ️', color: '#3b82f6', bgColor: '#eff6ff', borderColor: '#3b82f6' };
  }
}

/**
 * 创建反馈卡片
 *
 * @example
 * ```typescript
 * const { rootId, components } = createFeedbackCard({
 *   type: 'correct',
 *   title: '回答正确！',
 *   message: '太棒了，你已经掌握了这个知识点！',
 *   score: 10,
 *   maxScore: 10,
 *   actions: [
 *     { id: 'next', text: '下一题', action: 'next_question', primary: true },
 *   ],
 * });
 * ```
 */
export function createFeedbackCard(options: FeedbackCardOptions): PatternResult {
  const {
    id = 'feedback-card',
    type,
    title,
    message,
    icon,
    details,
    correctAnswer,
    userAnswer,
    score,
    maxScore,
    actions,
    variant = 'default',
  } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const config = getFeedbackConfig(type);
  const displayIcon = icon || config.icon;
  const isCompact = variant === 'compact';
  const isExpanded = variant === 'expanded';

  // 头部区域
  const headerRowId = `${id}-header`;
  const headerChildIds: string[] = [];

  // 图标
  const iconId = `${id}-icon`;
  headerChildIds.push(iconId);
  components.push(
    createIcon(iconId, displayIcon, {
      fontSize: isCompact ? '24px' : '32px',
    })
  );

  // 标题和消息区域
  const titleSectionId = `${id}-title-section`;
  const titleChildIds: string[] = [];

  const titleId = `${id}-title`;
  titleChildIds.push(titleId);
  components.push(
    createText(titleId, title, {
      fontSize: isCompact ? '16px' : '18px',
      fontWeight: '600',
      color: config.color,
    })
  );

  const messageId = `${id}-message`;
  titleChildIds.push(messageId);
  components.push(
    createText(messageId, message, {
      fontSize: '14px',
      color: '#4b5563',
      marginTop: '4px',
      lineHeight: '1.5',
    })
  );
  components.push(
    createContainer(titleSectionId, titleChildIds, {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '16px',
      flex: '1',
    })
  );
  headerChildIds.push(titleSectionId);

  // 得分（如果有）
  if (score !== undefined) {
    const scoreSectionId = `${id}-score`;
    const scoreChildIds: string[] = [];

    const scoreValueId = `${id}-score-value`;
    scoreChildIds.push(scoreValueId);
    components.push(
      createText(scoreValueId, `+${score}`, {
        fontSize: isCompact ? '20px' : '24px',
        fontWeight: 'bold',
        color: config.color,
      })
    );

    if (maxScore !== undefined) {
      const maxScoreId = `${id}-max-score`;
      scoreChildIds.push(maxScoreId);
      components.push(
        createText(maxScoreId, `/${maxScore}分`, {
          fontSize: '12px',
          color: '#6b7280',
          marginTop: '2px',
        })
      );
    }
    components.push(
      createContainer(scoreSectionId, scoreChildIds, {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginLeft: '16px',
      })
    );
    headerChildIds.push(scoreSectionId);
  }
  components.push(
    createContainer(headerRowId, headerChildIds, {
      display: 'flex',
      alignItems: 'flex-start',
    })
  );
  containerChildIds.push(headerRowId);

  // 答案对比（错误时显示）
  if (type === 'incorrect' && (correctAnswer || userAnswer) && !isCompact) {
    const comparisonId = `${id}-comparison`;
    const comparisonChildIds: string[] = [];

    if (userAnswer) {
      const userAnswerRowId = `${id}-user-answer`;
      const userAnswerChildIds: string[] = [];

      const userLabelId = `${id}-user-label`;
      userAnswerChildIds.push(userLabelId);
      components.push(
        createText(userLabelId, '你的答案：', {
          fontSize: '13px',
          color: '#6b7280',
          width: '80px',
        })
      );

      const userValueId = `${id}-user-value`;
      userAnswerChildIds.push(userValueId);
      components.push(
        createText(userValueId, userAnswer, {
          fontSize: '14px',
          color: '#ef4444',
          textDecoration: 'line-through',
        })
      );
      components.push(
        createContainer(userAnswerRowId, userAnswerChildIds, {
          display: 'flex',
          alignItems: 'center',
          marginBottom: '8px',
        })
      );
      comparisonChildIds.push(userAnswerRowId);
    }

    if (correctAnswer) {
      const correctAnswerRowId = `${id}-correct-answer`;
      const correctAnswerChildIds: string[] = [];

      const correctLabelId = `${id}-correct-label`;
      correctAnswerChildIds.push(correctLabelId);
      components.push(
        createText(correctLabelId, '正确答案：', {
          fontSize: '13px',
          color: '#6b7280',
          width: '80px',
        })
      );

      const correctValueId = `${id}-correct-value`;
      correctAnswerChildIds.push(correctValueId);
      components.push(
        createText(correctValueId, correctAnswer, {
          fontSize: '14px',
          color: '#10b981',
          fontWeight: '500',
        })
      );
      components.push(
        createContainer(correctAnswerRowId, correctAnswerChildIds, {
          display: 'flex',
          alignItems: 'center',
        })
      );
      comparisonChildIds.push(correctAnswerRowId);
    }
    components.push(
      createContainer(comparisonId, comparisonChildIds, {
        display: 'flex',
        flexDirection: 'column',
        padding: '12px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        marginTop: '16px',
      })
    );
    containerChildIds.push(comparisonId);
  }

  // 详细说明
  if (details && isExpanded) {
    const detailsId = `${id}-details`;
    containerChildIds.push(detailsId);
    components.push(
      createText(detailsId, details, {
        fontSize: '14px',
        color: '#4b5563',
        lineHeight: '1.6',
        marginTop: '16px',
        padding: '12px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        borderLeft: `3px solid ${config.color}`,
      })
    );
  }

  // 操作按钮
  if (actions && actions.length > 0) {
    const actionsRowId = `${id}-actions`;
    const actionIds: string[] = [];

    actions.forEach((action, idx) => {
      const actionContext = action.context
        ? Object.entries(action.context).map(([key, value]) => ({ key, value }))
        : [];

      const isPrimary = action.primary;
      const actionBtnResult = createButton(
        `${id}-action-${idx}`,
        action.text,
        action.action,
        actionContext,
        {
          styles: {
            backgroundColor: isPrimary ? config.color : 'transparent',
            color: isPrimary ? '#ffffff' : config.color,
            border: isPrimary ? 'none' : `1px solid ${config.color}`,
            padding: isCompact ? '8px 16px' : '10px 20px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
          },
        }
      );
      actionIds.push(actionBtnResult.buttonId);
      components.push(...actionBtnResult.allComponents);
    });
    components.push(
      createContainer(actionsRowId, actionIds, {
        display: 'flex',
        gap: '12px',
        marginTop: '16px',
        justifyContent: 'flex-end',
      })
    );
    containerChildIds.push(actionsRowId);
  }

  // 主容器
  components.push(
    createContainer(id, containerChildIds, {
      display: 'flex',
      flexDirection: 'column',
      padding: isCompact ? '16px' : '20px',
      backgroundColor: config.bgColor,
      borderRadius: '12px',
      border: `1px solid ${config.borderColor}`,
    })
  );

  return { rootId: id, components };
}
