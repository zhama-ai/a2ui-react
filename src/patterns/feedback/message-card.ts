/**
 * MessageCard - 消息卡片
 *
 * 通用消息展示
 */

import { createContainer, createIcon, createText } from '../components';
import type { PatternResult, PatternOptions } from '../types';

export interface MessageCardOptions extends PatternOptions {
  /** 消息类型 */
  type?: 'info' | 'success' | 'warning' | 'error';
  /** 图标 */
  icon?: string;
  /** 标题 */
  title?: string;
  /** 消息内容 */
  message: string;
  /** 时间 */
  timestamp?: string;
  /** 发送者 */
  sender?: string;
  /** 发送者头像 */
  avatar?: string;
  /** 变体 */
  variant?: 'default' | 'bubble' | 'card';
  /** 是否为用户消息 */
  isUser?: boolean;
}

/**
 * 获取消息类型配置
 */
function getMessageConfig(type: 'info' | 'success' | 'warning' | 'error'): {
  icon: string;
  color: string;
  bgColor: string;
} {
  switch (type) {
    case 'success':
      return { icon: '✅', color: '#10b981', bgColor: '#ecfdf5' };
    case 'warning':
      return { icon: '⚠️', color: '#f59e0b', bgColor: '#fffbeb' };
    case 'error':
      return { icon: '❌', color: '#ef4444', bgColor: '#fef2f2' };
    default:
      return { icon: 'ℹ️', color: '#3b82f6', bgColor: '#eff6ff' };
  }
}

/**
 * 创建消息卡片
 *
 * @example
 * ```typescript
 * const { rootId, components } = createMessageCard({
 *   type: 'success',
 *   title: '学习提醒',
 *   message: '你已经连续学习7天了，继续保持！',
 *   timestamp: '2分钟前',
 * });
 * ```
 */
export function createMessageCard(options: MessageCardOptions): PatternResult {
  const {
    id = 'message-card',
    type = 'info',
    icon,
    title,
    message,
    timestamp,
    sender,
    avatar,
    variant = 'default',
    isUser = false,
  } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const config = getMessageConfig(type);
  const displayIcon = icon || config.icon;
  const isBubble = variant === 'bubble';
  const isCard = variant === 'card';

  // 头像/图标区域
  if (!isBubble || avatar) {
    const avatarSectionId = `${id}-avatar`;
    const avatarChildIds: string[] = [];

    const avatarIconId = `${id}-avatar-icon`;
    avatarChildIds.push(avatarIconId);
    components.push(
      createIcon(avatarIconId, avatar || displayIcon, {
        fontSize: avatar ? '24px' : '20px',
      })
    );
    components.push(
      createContainer(avatarSectionId, avatarChildIds, {
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: avatar ? '#f3f4f6' : config.bgColor,
        borderRadius: '50%',
        flexShrink: '0',
      })
    );
    containerChildIds.push(avatarSectionId);
  }

  // 内容区域
  const contentSectionId = `${id}-content`;
  const contentChildIds: string[] = [];

  // 发送者和时间
  if (sender || timestamp) {
    const metaRowId = `${id}-meta`;
    const metaChildIds: string[] = [];

    if (sender) {
      const senderId = `${id}-sender`;
      metaChildIds.push(senderId);
      components.push(
        createText(senderId, sender, {
          fontSize: '13px',
          fontWeight: '500',
          color: '#374151',
        })
      );
    }

    if (timestamp) {
      const timeId = `${id}-time`;
      metaChildIds.push(timeId);
      components.push(
        createText(timeId, timestamp, {
          fontSize: '12px',
          color: '#9ca3af',
          marginLeft: sender ? '8px' : '0',
        })
      );
    }
    components.push(
      createContainer(metaRowId, metaChildIds, {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '6px',
      })
    );
    contentChildIds.push(metaRowId);
  }

  // 标题
  if (title) {
    const titleId = `${id}-title`;
    contentChildIds.push(titleId);
    components.push(
      createText(titleId, title, {
        fontSize: '15px',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '4px',
      })
    );
  }

  // 消息内容
  const messageId = `${id}-message`;
  contentChildIds.push(messageId);
  components.push(
    createText(messageId, message, {
      fontSize: '14px',
      color: '#4b5563',
      lineHeight: '1.5',
    })
  );
  // 气泡样式
  const bubbleStyle: Record<string, string> = isBubble
    ? {
        padding: '12px 16px',
        backgroundColor: isUser ? '#3b82f6' : '#f3f4f6',
        borderRadius: '16px',
        borderBottomLeftRadius: isUser ? '16px' : '4px',
        borderBottomRightRadius: isUser ? '4px' : '16px',
        maxWidth: '80%',
      }
    : {
        flex: '1',
        marginLeft: '12px',
      };

  if (isBubble && isUser) {
    // 用户消息文字颜色调整
    const messageText = components.find(
      (c) => (c as Record<string, unknown>).id === messageId
    ) as Record<string, unknown>;
    if (messageText?.component) {
      const comp = messageText.component as Record<string, Record<string, Record<string, string>>>;
      if (comp.Text?.styles) {
        comp.Text.styles.color = '#ffffff';
      }
    }
  }

  components.push(createContainer(contentSectionId, contentChildIds, bubbleStyle));
  containerChildIds.push(contentSectionId);

  // 主容器
  const containerStyle: Record<string, string> = {
    display: 'flex',
    alignItems: isBubble ? 'flex-end' : 'flex-start',
    flexDirection: isBubble && isUser ? 'row-reverse' : 'row',
  };

  if (isCard) {
    containerStyle.padding = '16px';
    containerStyle.backgroundColor = '#ffffff';
    containerStyle.borderRadius = '12px';
    containerStyle.border = '1px solid #e5e7eb';
    containerStyle.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
  }

  components.push(createContainer(id, containerChildIds, containerStyle));

  return { rootId: id, components };
}
