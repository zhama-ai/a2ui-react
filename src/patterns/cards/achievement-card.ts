/**
 * AchievementCard - 成就卡片
 *
 * 展示成就、徽章、奖励等
 */

import { createContainer, createIcon, createText } from '../components';
import type { PatternResult, PatternOptions, AchievementData } from '../types';

export interface AchievementCardOptions extends Omit<PatternOptions, 'id'>, AchievementData {
  /** 变体 */
  variant?: 'default' | 'compact' | 'showcase';
}

/**
 * 获取稀有度配置
 */
function getRarityConfig(rarity: 'common' | 'rare' | 'epic' | 'legendary'): {
  color: string;
  bgColor: string;
  text: string;
} {
  switch (rarity) {
    case 'legendary':
      return { color: '#f59e0b', bgColor: '#fef3c7', text: '传说' };
    case 'epic':
      return { color: '#a855f7', bgColor: '#f3e8ff', text: '史诗' };
    case 'rare':
      return { color: '#3b82f6', bgColor: '#dbeafe', text: '稀有' };
    default:
      return { color: '#6b7280', bgColor: '#f3f4f6', text: '普通' };
  }
}

/**
 * 创建成就卡片
 *
 * @example
 * ```typescript
 * const { rootId, components } = createAchievementCard({
 *   id: 'first-lesson',
 *   icon: '🎯',
 *   title: '初学者',
 *   description: '完成第一节课',
 *   unlocked: true,
 *   rarity: 'common',
 *   points: 50,
 *   unlockedDate: '2024-01-15',
 * });
 * ```
 */
export function createAchievementCard(options: AchievementCardOptions): PatternResult {
  const {
    id = 'achievement-card',
    icon,
    title,
    description,
    unlocked,
    rarity = 'common',
    points,
    progress,
    unlockedDate,
    variant = 'default',
  } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const rarityConfig = getRarityConfig(rarity);
  const isCompact = variant === 'compact';
  const isShowcase = variant === 'showcase';

  // 图标区域
  const iconSectionId = `${id}-icon-section`;
  const iconChildIds: string[] = [];

  const iconId = `${id}-icon`;
  iconChildIds.push(iconId);
  components.push(
    createIcon(iconId, icon, {
      fontSize: isShowcase ? '48px' : isCompact ? '24px' : '32px',
      opacity: unlocked ? '1' : '0.3',
      filter: unlocked ? 'none' : 'grayscale(100%)',
    })
  );

  // 解锁状态标记
  if (unlocked && !isCompact) {
    const checkId = `${id}-check`;
    iconChildIds.push(checkId);
    components.push(
      createIcon(checkId, '✅', {
        position: 'absolute',
        bottom: '-4px',
        right: '-4px',
        fontSize: '16px',
      })
    );
  }
  components.push(
    createContainer(iconSectionId, iconChildIds, {
      position: 'relative',
      width: isShowcase ? '80px' : isCompact ? '48px' : '64px',
      height: isShowcase ? '80px' : isCompact ? '48px' : '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: unlocked ? rarityConfig.bgColor : '#f3f4f6',
      borderRadius: isShowcase ? '16px' : '12px',
      border: unlocked ? `2px solid ${rarityConfig.color}` : '2px solid #e5e7eb',
      flexShrink: '0',
    })
  );
  containerChildIds.push(iconSectionId);

  // 信息区域
  const infoSectionId = `${id}-info`;
  const infoChildIds: string[] = [];

  // 标题行
  const titleRowId = `${id}-title-row`;
  const titleRowChildIds: string[] = [];

  const titleId = `${id}-title`;
  titleRowChildIds.push(titleId);
  components.push(
    createText(titleId, title, {
      fontSize: isCompact ? '14px' : '16px',
      fontWeight: '600',
      color: unlocked ? '#1f2937' : '#9ca3af',
    })
  );

  // 稀有度标签
  if (!isCompact && rarity !== 'common') {
    const rarityId = `${id}-rarity`;
    titleRowChildIds.push(rarityId);
    components.push(
      createText(rarityId, rarityConfig.text, {
        fontSize: '10px',
        fontWeight: '500',
        color: rarityConfig.color,
        backgroundColor: rarityConfig.bgColor,
        padding: '2px 6px',
        borderRadius: '4px',
        marginLeft: '8px',
      })
    );
  }
  components.push(
    createContainer(titleRowId, titleRowChildIds, {
      display: 'flex',
      alignItems: 'center',
    })
  );
  infoChildIds.push(titleRowId);

  // 描述
  if (!isCompact) {
    const descId = `${id}-description`;
    infoChildIds.push(descId);
    components.push(
      createText(descId, description, {
        fontSize: '14px',
        color: unlocked ? '#6b7280' : '#9ca3af',
        marginTop: '4px',
      })
    );
  }

  // 进度条（未解锁且有进度）
  if (!unlocked && progress !== undefined) {
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
        backgroundColor: rarityConfig.color,
        borderRadius: '4px',
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
        marginTop: '8px',
      })
    );
    infoChildIds.push(progressRowId);
  }

  // 底部信息（积分、解锁日期）
  if ((points !== undefined || unlockedDate) && !isCompact) {
    const footerRowId = `${id}-footer`;
    const footerChildIds: string[] = [];

    if (points !== undefined) {
      const pointsId = `${id}-points`;
      footerChildIds.push(pointsId);
      components.push(
        createText(pointsId, `+${points} 积分`, {
          fontSize: '12px',
          fontWeight: '500',
          color: unlocked ? '#10b981' : '#9ca3af',
        })
      );
    }

    if (unlockedDate && unlocked) {
      const dateId = `${id}-date`;
      footerChildIds.push(dateId);
      components.push(
        createText(dateId, `解锁于 ${unlockedDate}`, {
          fontSize: '12px',
          color: '#9ca3af',
          marginLeft: points !== undefined ? 'auto' : '0',
        })
      );
    }
    components.push(
      createContainer(footerRowId, footerChildIds, {
        display: 'flex',
        alignItems: 'center',
        marginTop: '8px',
      })
    );
    infoChildIds.push(footerRowId);
  }
  components.push(
    createContainer(infoSectionId, infoChildIds, {
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
      marginLeft: isShowcase ? '0' : '16px',
      marginTop: isShowcase ? '12px' : '0',
      alignItems: isShowcase ? 'center' : 'flex-start',
    })
  );
  containerChildIds.push(infoSectionId);

  // 主容器
  components.push(
    createContainer(id, containerChildIds, {
      display: 'flex',
      flexDirection: isShowcase ? 'column' : 'row',
      alignItems: isShowcase ? 'center' : 'flex-start',
      padding: isCompact ? '12px' : '16px',
      backgroundColor: unlocked ? '#ffffff' : '#fafafa',
      borderRadius: '12px',
      border: unlocked ? `1px solid ${rarityConfig.color}30` : '1px solid #e5e7eb',
      boxShadow: unlocked ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
    })
  );

  return { rootId: id, components };
}

/**
 * 创建成就列表
 */
export interface AchievementListOptions extends PatternOptions {
  achievements: AchievementCardOptions[];
  variant?: 'grid' | 'list';
  columns?: 2 | 3 | 4;
}

export function createAchievementList(options: AchievementListOptions): PatternResult {
  const { id = 'achievement-list', achievements, variant = 'grid', columns = 3 } = options;

  const components: unknown[] = [];
  const itemIds: string[] = [];

  achievements.forEach((achievement, idx) => {
    const itemId = `${id}-item-${idx}`;
    const cardResult = createAchievementCard({
      ...achievement,
      id: itemId,
      variant: variant === 'list' ? 'compact' : 'default',
    });
    itemIds.push(cardResult.rootId);
    components.push(...cardResult.components);
  });

  const containerStyle: Record<string, string> = {
    display: variant === 'grid' ? 'grid' : 'flex',
    flexDirection: 'column',
    gap: '16px',
  };
  if (variant === 'grid') {
    containerStyle.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  }
  components.push(createContainer(id, itemIds, containerStyle));

  return { rootId: id, components };
}
