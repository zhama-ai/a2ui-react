/**
 * RankCard - 排名卡片
 *
 * 展示用户排名、积分等
 */

import { createContainer, createIcon, createText } from '../components';
import type { PatternResult, PatternOptions } from '../types';

export interface RankCardOptions extends PatternOptions {
  /** 排名 */
  rank: number;
  /** 总人数 */
  totalUsers?: number;
  /** 积分 */
  points?: number;
  /** 用户名 */
  username?: string;
  /** 头像 URL 或 emoji */
  avatar?: string;
  /** 等级 */
  level?: number;
  /** 变体 */
  variant?: 'default' | 'compact' | 'podium';
}

/**
 * 获取排名奖牌
 */
function getRankMedal(rank: number): { icon: string; color: string } {
  switch (rank) {
    case 1:
      return { icon: '🥇', color: '#fbbf24' };
    case 2:
      return { icon: '🥈', color: '#9ca3af' };
    case 3:
      return { icon: '🥉', color: '#cd7c2f' };
    default:
      return { icon: '', color: '#6b7280' };
  }
}

/**
 * 创建排名卡片
 *
 * @example
 * ```typescript
 * const { rootId, components } = createRankCard({
 *   rank: 1,
 *   totalUsers: 1000,
 *   points: 8500,
 *   username: '学霸小明',
 *   level: 12,
 * });
 * ```
 */
export function createRankCard(options: RankCardOptions): PatternResult {
  const {
    id = 'rank-card',
    rank,
    totalUsers,
    points,
    username,
    avatar,
    level,
    variant = 'default',
  } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const { icon: medalIcon, color: rankColor } = getRankMedal(rank);
  const isCompact = variant === 'compact';

  // 领奖台变体
  if (variant === 'podium' && rank <= 3) {
    const podiumId = `${id}-podium`;
    const podiumChildIds: string[] = [];

    // 奖牌
    const medalId = `${id}-medal`;
    podiumChildIds.push(medalId);
    components.push(
      createIcon(medalId, medalIcon, {
        fontSize: '48px',
      })
    );

    // 排名数字
    const rankNumId = `${id}-rank-num`;
    podiumChildIds.push(rankNumId);
    components.push(
      createText(rankNumId, `第 ${rank} 名`, {
        fontSize: '24px',
        fontWeight: 'bold',
        color: rankColor,
        marginTop: '8px',
      })
    );
    components.push(
      createContainer(podiumId, podiumChildIds, {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px',
        backgroundColor: `${rankColor}15`,
        borderRadius: '16px',
      })
    );
    containerChildIds.push(podiumId);
  } else {
    // 左侧 - 排名显示
    const rankSectionId = `${id}-rank-section`;
    const rankSectionChildIds: string[] = [];

    if (medalIcon) {
      const medalIconId = `${id}-medal-icon`;
      rankSectionChildIds.push(medalIconId);
      components.push(
        createIcon(medalIconId, medalIcon, {
          fontSize: isCompact ? '24px' : '32px',
        })
      );
    } else {
      const rankNumId = `${id}-rank-number`;
      rankSectionChildIds.push(rankNumId);
      components.push(
        createText(rankNumId, `#${rank}`, {
          fontSize: isCompact ? '20px' : '28px',
          fontWeight: 'bold',
          color: rankColor,
        })
      );
    }
    components.push(
      createContainer(rankSectionId, rankSectionChildIds, {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: isCompact ? '48px' : '64px',
        height: isCompact ? '48px' : '64px',
        backgroundColor: `${rankColor}15`,
        borderRadius: '12px',
      })
    );
    containerChildIds.push(rankSectionId);

    // 中间 - 用户信息
    const infoSectionId = `${id}-info-section`;
    const infoChildIds: string[] = [];

    // 头像（如果有）
    if (avatar && !isCompact) {
      const avatarId = `${id}-avatar`;
      infoChildIds.push(avatarId);
      if (avatar.startsWith('http')) {
        // URL - 简化处理，用 emoji 代替
        components.push(
          createIcon(avatarId, '👤', {
            fontSize: '24px',
            marginRight: '8px',
          })
        );
      } else {
        components.push(
          createIcon(avatarId, avatar, {
            fontSize: '24px',
            marginRight: '8px',
          })
        );
      }
    }

    // 用户名
    if (username) {
      const usernameId = `${id}-username`;
      infoChildIds.push(usernameId);
      components.push(
        createText(usernameId, username, {
          fontSize: isCompact ? '14px' : '16px',
          fontWeight: '600',
          color: '#1f2937',
        })
      );
    }

    // 等级
    if (level !== undefined && !isCompact) {
      const levelId = `${id}-level`;
      infoChildIds.push(levelId);
      components.push(
        createText(levelId, `Lv.${level}`, {
          fontSize: '12px',
          color: '#6b7280',
          backgroundColor: '#f3f4f6',
          padding: '2px 8px',
          borderRadius: '4px',
          marginLeft: '8px',
        })
      );
    }
    components.push(
      createContainer(infoSectionId, infoChildIds, {
        display: 'flex',
        alignItems: 'center',
        flex: '1',
        marginLeft: '16px',
      })
    );
    containerChildIds.push(infoSectionId);

    // 右侧 - 积分/总人数
    const statsSectionId = `${id}-stats-section`;
    const statsChildIds: string[] = [];

    if (points !== undefined) {
      const pointsId = `${id}-points`;
      statsChildIds.push(pointsId);
      components.push(
        createText(pointsId, `${points.toLocaleString()} 分`, {
          fontSize: isCompact ? '14px' : '16px',
          fontWeight: 'bold',
          color: '#1f2937',
        })
      );
    }

    if (totalUsers && !isCompact) {
      const totalId = `${id}-total`;
      statsChildIds.push(totalId);
      components.push(
        createText(totalId, `共 ${totalUsers.toLocaleString()} 人`, {
          fontSize: '12px',
          color: '#9ca3af',
          marginTop: '2px',
        })
      );
    }
    components.push(
      createContainer(statsSectionId, statsChildIds, {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      })
    );
    containerChildIds.push(statsSectionId);
  }

  // 主容器
  components.push(
    createContainer(id, containerChildIds, {
      display: 'flex',
      alignItems: 'center',
      padding: isCompact ? '12px' : '16px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    })
  );

  return { rootId: id, components };
}
