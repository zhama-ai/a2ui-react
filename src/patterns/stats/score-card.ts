/**
 * ScoreCard - 得分卡片
 *
 * 展示评分和成绩
 */

import { createContainer, createIcon, createText } from '../components';
import type { PatternResult, PatternOptions } from '../types';

export interface ScoreCardOptions extends PatternOptions {
  /** 得分 */
  score: number;
  /** 总分 */
  maxScore?: number;
  /** 标题 */
  title?: string;
  /** 描述 */
  description?: string;
  /** 图标 */
  icon?: string;
  /** 等级（A-F 或自定义） */
  grade?: string;
  /** 变体 */
  variant?: 'default' | 'large' | 'compact';
  /** 颜色（自动根据分数计算或手动指定） */
  color?: string;
}

/**
 * 根据分数获取颜色
 */
function getScoreColor(score: number, maxScore: number): string {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 80) return '#10b981';
  if (percentage >= 60) return '#f59e0b';
  if (percentage >= 40) return '#f97316';
  return '#ef4444';
}

/**
 * 创建得分卡片
 *
 * @example
 * ```typescript
 * const { rootId, components } = createScoreCard({
 *   score: 85,
 *   maxScore: 100,
 *   title: '练习得分',
 *   grade: 'A',
 *   icon: '🏆',
 * });
 * ```
 */
export function createScoreCard(options: ScoreCardOptions): PatternResult {
  const {
    id = 'score-card',
    score,
    maxScore = 100,
    title,
    description,
    icon = '🏆',
    grade,
    variant = 'default',
    color,
  } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const scoreColor = color || getScoreColor(score, maxScore);
  const isLarge = variant === 'large';
  const isCompact = variant === 'compact';

  // 图标（如果有）
  if (icon && !isCompact) {
    const iconId = `${id}-icon`;
    containerChildIds.push(iconId);
    components.push(
      createIcon(iconId, icon, {
        fontSize: isLarge ? '48px' : '32px',
        marginBottom: '12px',
      })
    );
  }

  // 分数显示
  const scoreDisplayId = `${id}-score-display`;
  const scoreChildIds: string[] = [];

  // 主分数
  const mainScoreId = `${id}-main-score`;
  scoreChildIds.push(mainScoreId);
  components.push(
    createText(mainScoreId, `${score}`, {
      fontSize: isLarge ? '56px' : isCompact ? '32px' : '48px',
      fontWeight: 'bold',
      color: scoreColor,
      lineHeight: '1',
    })
  );

  // 总分
  const maxScoreId = `${id}-max-score`;
  scoreChildIds.push(maxScoreId);
  components.push(
    createText(maxScoreId, `/${maxScore}`, {
      fontSize: isLarge ? '24px' : isCompact ? '16px' : '20px',
      color: '#9ca3af',
      alignSelf: 'flex-end',
      marginBottom: isLarge ? '10px' : '6px',
    })
  );
  components.push(
    createContainer(scoreDisplayId, scoreChildIds, {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'center',
    })
  );
  containerChildIds.push(scoreDisplayId);

  // 等级（如果有）
  if (grade && !isCompact) {
    const gradeId = `${id}-grade`;
    containerChildIds.push(gradeId);
    components.push(
      createText(gradeId, grade, {
        fontSize: isLarge ? '24px' : '20px',
        fontWeight: 'bold',
        color: scoreColor,
        backgroundColor: `${scoreColor}20`,
        padding: '4px 16px',
        borderRadius: '16px',
        marginTop: '8px',
      })
    );
  }

  // 标题
  if (title) {
    const titleId = `${id}-title`;
    containerChildIds.push(titleId);
    components.push(
      createText(titleId, title, {
        fontSize: isCompact ? '14px' : '16px',
        fontWeight: '600',
        color: '#374151',
        marginTop: isCompact ? '4px' : '16px',
        textAlign: 'center',
      })
    );
  }

  // 描述
  if (description && !isCompact) {
    const descId = `${id}-description`;
    containerChildIds.push(descId);
    components.push(
      createText(descId, description, {
        fontSize: '14px',
        color: '#6b7280',
        marginTop: '4px',
        textAlign: 'center',
      })
    );
  }

  // 主容器
  components.push(
    createContainer(id, containerChildIds, {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: isCompact ? '16px' : '24px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: isCompact ? 'none' : '0 2px 8px rgba(0,0,0,0.08)',
      border: '1px solid #e5e7eb',
    })
  );

  return { rootId: id, components };
}
