/**
 * ResultBanner - 结果横幅
 *
 * 展示测试/练习结果
 */

import { createContainer, createIcon, createText, createButton } from '../components';
import type { PatternResult, PatternOptions, ActionButton } from '../types';

export interface ResultBannerOptions extends PatternOptions {
  /** 标题 */
  title: string;
  /** 副标题 */
  subtitle?: string;
  /** 图标 */
  icon: string;
  /** 分数 */
  score?: number;
  /** 总分 */
  maxScore?: number;
  /** 统计信息 */
  stats?: Array<{ label: string; value: string }>;
  /** 操作按钮 */
  actions?: ActionButton[];
  /** 变体 */
  variant?: 'default' | 'celebration' | 'compact';
  /** 颜色 */
  color?: string;
}

/**
 * 创建结果横幅
 *
 * @example
 * ```typescript
 * const { rootId, components } = createResultBanner({
 *   icon: '🎉',
 *   title: '恭喜完成测试！',
 *   subtitle: '你的表现超过了 85% 的学员',
 *   score: 85,
 *   maxScore: 100,
 *   stats: [
 *     { label: '正确题数', value: '17/20' },
 *     { label: '用时', value: '15分钟' },
 *   ],
 *   actions: [
 *     { id: 'review', text: '查看详情', action: 'review_result' },
 *     { id: 'continue', text: '继续学习', action: 'continue_learning', primary: true },
 *   ],
 *   variant: 'celebration',
 * });
 * ```
 */
export function createResultBanner(options: ResultBannerOptions): PatternResult {
  const {
    id = 'result-banner',
    title,
    subtitle,
    icon,
    score,
    maxScore,
    stats,
    actions,
    variant = 'default',
    color = '#10b981',
  } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const isCelebration = variant === 'celebration';
  const isCompact = variant === 'compact';

  // 图标区域
  const iconSectionId = `${id}-icon-section`;
  const iconChildIds: string[] = [];

  const iconId = `${id}-icon`;
  iconChildIds.push(iconId);
  components.push(
    createIcon(iconId, icon, {
      fontSize: isCelebration ? '64px' : isCompact ? '32px' : '48px',
    })
  );
  components.push(
    createContainer(iconSectionId, iconChildIds, {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: isCompact ? '12px' : '16px',
    })
  );
  containerChildIds.push(iconSectionId);

  // 标题
  const titleId = `${id}-title`;
  containerChildIds.push(titleId);
  components.push(
    createText(titleId, title, {
      fontSize: isCelebration ? '24px' : isCompact ? '18px' : '20px',
      fontWeight: 'bold',
      color: '#1f2937',
      textAlign: 'center',
    })
  );

  // 副标题
  if (subtitle) {
    const subtitleId = `${id}-subtitle`;
    containerChildIds.push(subtitleId);
    components.push(
      createText(subtitleId, subtitle, {
        fontSize: '14px',
        color: '#6b7280',
        textAlign: 'center',
        marginTop: '8px',
      })
    );
  }

  // 分数展示
  if (score !== undefined) {
    const scoreSectionId = `${id}-score-section`;
    const scoreChildIds: string[] = [];

    const scoreValueId = `${id}-score-value`;
    scoreChildIds.push(scoreValueId);
    components.push(
      createText(scoreValueId, `${score}`, {
        fontSize: isCelebration ? '56px' : isCompact ? '36px' : '48px',
        fontWeight: 'bold',
        color: color,
        lineHeight: '1',
      })
    );

    if (maxScore !== undefined) {
      const maxScoreId = `${id}-max-score`;
      scoreChildIds.push(maxScoreId);
      components.push(
        createText(maxScoreId, `/ ${maxScore}`, {
          fontSize: isCelebration ? '24px' : '20px',
          color: '#9ca3af',
          marginLeft: '4px',
          alignSelf: 'flex-end',
          marginBottom: isCelebration ? '10px' : '6px',
        })
      );
    }
    components.push(
      createContainer(scoreSectionId, scoreChildIds, {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'center',
        marginTop: isCompact ? '12px' : '20px',
      })
    );
    containerChildIds.push(scoreSectionId);
  }

  // 统计信息
  if (stats && stats.length > 0 && !isCompact) {
    const statsRowId = `${id}-stats`;
    const statIds: string[] = [];

    stats.forEach((stat, idx) => {
      const statId = `${id}-stat-${idx}`;
      const statChildIds: string[] = [];

      const statValueId = `${statId}-value`;
      statChildIds.push(statValueId);
      components.push(
        createText(statValueId, stat.value, {
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#1f2937',
        })
      );

      const statLabelId = `${statId}-label`;
      statChildIds.push(statLabelId);
      components.push(
        createText(statLabelId, stat.label, {
          fontSize: '12px',
          color: '#6b7280',
          marginTop: '4px',
        })
      );
      components.push(
        createContainer(statId, statChildIds, {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 24px',
          borderRight: idx < stats.length - 1 ? '1px solid #e5e7eb' : 'none',
        })
      );
      statIds.push(statId);
    });
    components.push(
      createContainer(statsRowId, statIds, {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '24px',
        padding: '16px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
      })
    );
    containerChildIds.push(statsRowId);
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
            backgroundColor: isPrimary ? color : 'transparent',
            color: isPrimary ? '#ffffff' : color,
            border: isPrimary ? 'none' : `1px solid ${color}`,
            padding: isCompact ? '10px 20px' : '12px 28px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            flex: actions.length === 1 ? 'none' : '1',
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
        marginTop: isCompact ? '16px' : '24px',
        justifyContent: 'center',
      })
    );
    containerChildIds.push(actionsRowId);
  }

  // 主容器
  components.push(
    createContainer(id, containerChildIds, {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: isCelebration ? '40px' : isCompact ? '24px' : '32px',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      border: '1px solid #e5e7eb',
      boxShadow: isCelebration ? '0 8px 24px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.05)',
    })
  );

  return { rootId: id, components };
}
