/**
 * MotivationBanner - 激励横幅
 *
 * 鼓励、激励用户的横幅
 */

import { createContainer, createIcon, createText } from '../components';
import type { PatternResult, PatternOptions } from '../types';

export interface MotivationBannerOptions extends PatternOptions {
  /** 图标/表情 */
  icon: string;
  /** 主要消息 */
  message: string;
  /** 副消息 */
  subMessage?: string;
  /** 名言引用 */
  quote?: {
    text: string;
    author?: string;
  };
  /** 变体 */
  variant?: 'default' | 'gradient' | 'minimal';
  /** 颜色主题 */
  color?: string;
}

/**
 * 创建激励横幅
 *
 * @example
 * ```typescript
 * const { rootId, components } = createMotivationBanner({
 *   icon: '💪',
 *   message: '坚持就是胜利！',
 *   subMessage: '你已经连续学习7天了，继续保持！',
 *   quote: {
 *     text: '千里之行，始于足下。',
 *     author: '老子',
 *   },
 *   variant: 'gradient',
 * });
 * ```
 */
export function createMotivationBanner(options: MotivationBannerOptions): PatternResult {
  const {
    id = 'motivation-banner',
    icon,
    message,
    subMessage,
    quote,
    variant = 'default',
    color = '#8b5cf6',
  } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const isGradient = variant === 'gradient';
  const isMinimal = variant === 'minimal';

  // 图标
  const iconId = `${id}-icon`;
  containerChildIds.push(iconId);
  components.push(
    createIcon(iconId, icon, {
      fontSize: isMinimal ? '32px' : '48px',
      marginBottom: isMinimal ? '8px' : '16px',
    })
  );

  // 主要消息
  const messageId = `${id}-message`;
  containerChildIds.push(messageId);
  components.push(
    createText(messageId, message, {
      fontSize: isMinimal ? '18px' : '22px',
      fontWeight: 'bold',
      color: isGradient ? '#ffffff' : '#1f2937',
      textAlign: 'center',
    })
  );

  // 副消息
  if (subMessage) {
    const subMessageId = `${id}-sub-message`;
    containerChildIds.push(subMessageId);
    components.push(
      createText(subMessageId, subMessage, {
        fontSize: '14px',
        color: isGradient ? 'rgba(255,255,255,0.85)' : '#6b7280',
        textAlign: 'center',
        marginTop: '8px',
        lineHeight: '1.5',
      })
    );
  }

  // 名言引用
  if (quote && !isMinimal) {
    const quoteSectionId = `${id}-quote`;
    const quoteChildIds: string[] = [];

    const quoteTextId = `${id}-quote-text`;
    quoteChildIds.push(quoteTextId);
    components.push(
      createText(quoteTextId, `"${quote.text}"`, {
        fontSize: '14px',
        fontStyle: 'italic',
        color: isGradient ? 'rgba(255,255,255,0.9)' : '#4b5563',
        textAlign: 'center',
        lineHeight: '1.5',
      })
    );

    if (quote.author) {
      const quoteAuthorId = `${id}-quote-author`;
      quoteChildIds.push(quoteAuthorId);
      components.push(
        createText(quoteAuthorId, `— ${quote.author}`, {
          fontSize: '12px',
          color: isGradient ? 'rgba(255,255,255,0.7)' : '#9ca3af',
          textAlign: 'center',
          marginTop: '8px',
        })
      );
    }
    components.push(
      createContainer(quoteSectionId, quoteChildIds, {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '20px',
        padding: '16px',
        backgroundColor: isGradient ? 'rgba(255,255,255,0.1)' : '#f9fafb',
        borderRadius: '8px',
        borderLeft: isGradient ? 'none' : `3px solid ${color}`,
      })
    );
    containerChildIds.push(quoteSectionId);
  }

  // 主容器
  const containerStyle: Record<string, string> = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: isMinimal ? '20px' : '32px',
    borderRadius: '16px',
    width: '100%',
  };

  if (isGradient) {
    containerStyle.background = `linear-gradient(135deg, ${color} 0%, ${adjustColor(color, -20)} 100%)`;
    containerStyle.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
  } else if (isMinimal) {
    containerStyle.backgroundColor = '#f9fafb';
    containerStyle.border = '1px solid #e5e7eb';
  } else {
    containerStyle.backgroundColor = '#ffffff';
    containerStyle.border = '1px solid #e5e7eb';
    containerStyle.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
  }

  components.push(createContainer(id, containerChildIds, containerStyle));

  return { rootId: id, components };
}

/**
 * 调整颜色亮度
 */
function adjustColor(hex: string, percent: number): string {
  // 简单的颜色调整
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000ff) + amt));
  return `#${((1 << 24) | (R << 16) | (G << 8) | B).toString(16).slice(1)}`;
}
