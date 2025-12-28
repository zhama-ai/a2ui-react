/**
 * AlertBanner - 警告横幅
 *
 * 页面级别的警告/通知
 */

import { createContainer, createIcon, createText, createButton } from '../components';
import type { PatternResult, PatternOptions, ActionButton } from '../types';

export interface AlertBannerOptions extends PatternOptions {
  /** 类型 */
  type?: 'info' | 'success' | 'warning' | 'error';
  /** 标题 */
  title?: string;
  /** 消息 */
  message: string;
  /** 图标 */
  icon?: string;
  /** 操作按钮 */
  action?: ActionButton;
  /** 是否可关闭 */
  dismissible?: boolean;
  /** 关闭动作 */
  dismissAction?: string;
  /** 变体 */
  variant?: 'default' | 'solid' | 'outlined';
}

/**
 * 获取警告配置
 */
function getAlertConfig(type: 'info' | 'success' | 'warning' | 'error'): {
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
} {
  switch (type) {
    case 'success':
      return { icon: '✅', color: '#10b981', bgColor: '#ecfdf5', borderColor: '#10b981' };
    case 'warning':
      return { icon: '⚠️', color: '#f59e0b', bgColor: '#fffbeb', borderColor: '#f59e0b' };
    case 'error':
      return { icon: '❌', color: '#ef4444', bgColor: '#fef2f2', borderColor: '#ef4444' };
    default:
      return { icon: 'ℹ️', color: '#3b82f6', bgColor: '#eff6ff', borderColor: '#3b82f6' };
  }
}

/**
 * 创建警告横幅
 *
 * @example
 * ```typescript
 * const { rootId, components } = createAlertBanner({
 *   type: 'warning',
 *   title: '注意',
 *   message: '你的订阅将在3天后到期，请及时续费。',
 *   action: { id: 'renew', text: '立即续费', action: 'renew_subscription' },
 *   dismissible: true,
 * });
 * ```
 */
export function createAlertBanner(options: AlertBannerOptions): PatternResult {
  const {
    id = 'alert-banner',
    type = 'info',
    title,
    message,
    icon,
    action,
    dismissible = false,
    dismissAction = 'dismiss_alert',
    variant = 'default',
  } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const config = getAlertConfig(type);
  const displayIcon = icon || config.icon;
  const isSolid = variant === 'solid';
  const isOutlined = variant === 'outlined';

  // 图标
  const iconId = `${id}-icon`;
  containerChildIds.push(iconId);
  components.push(
    createIcon(iconId, displayIcon, {
      fontSize: '20px',
      flexShrink: '0',
    })
  );

  // 内容区域
  const contentSectionId = `${id}-content`;
  const contentChildIds: string[] = [];

  // 标题
  if (title) {
    const titleId = `${id}-title`;
    contentChildIds.push(titleId);
    components.push(
      createText(titleId, title, {
        fontSize: '15px',
        fontWeight: '600',
        color: isSolid ? '#ffffff' : '#1f2937',
        marginBottom: '2px',
      })
    );
  }

  // 消息
  const messageId = `${id}-message`;
  contentChildIds.push(messageId);
  components.push(
    createText(messageId, message, {
      fontSize: '14px',
      color: isSolid ? 'rgba(255,255,255,0.9)' : '#4b5563',
      lineHeight: '1.5',
    })
  );
  components.push(
    createContainer(contentSectionId, contentChildIds, {
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
      marginLeft: '12px',
    })
  );
  containerChildIds.push(contentSectionId);

  // 操作按钮
  if (action) {
    const actionContext = action.context
      ? Object.entries(action.context).map(([key, value]) => ({ key, value }))
      : [];

    const actionBtnResult = createButton(
      `${id}-action`,
      action.text,
      action.action,
      actionContext, {
      styles: {
        backgroundColor: isSolid ? 'rgba(255,255,255,0.2)' : config.color,
        color: isSolid ? '#ffffff' : '#ffffff',
        border: 'none',
        padding: '6px 12px',
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: '500',
        cursor: 'pointer',
        marginLeft: '16px',
        whiteSpace: 'nowrap',
      },
    });
    containerChildIds.push(actionBtnResult.buttonId);
    components.push(...actionBtnResult.allComponents);
  }

  // 关闭按钮
  if (dismissible) {
    const dismissBtnResult = createButton(`${id}-dismiss`, '✕', dismissAction, [], {
      styles: {
      backgroundColor: 'transparent',
      color: isSolid ? 'rgba(255,255,255,0.8)' : '#9ca3af',
      border: 'none',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '14px',
      cursor: 'pointer',
      marginLeft: action ? '8px' : '16px',
    },
    });
    containerChildIds.push(dismissBtnResult.buttonId);
    components.push(...dismissBtnResult.allComponents);
  }

  // 主容器
  const containerStyle: Record<string, string> = {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    borderRadius: '8px',
    width: '100%',
  };

  if (isSolid) {
    containerStyle.backgroundColor = config.color;
  } else if (isOutlined) {
    containerStyle.backgroundColor = '#ffffff';
    containerStyle.border = `1px solid ${config.borderColor}`;
  } else {
    containerStyle.backgroundColor = config.bgColor;
    containerStyle.border = `1px solid ${config.borderColor}30`;
  }

  components.push(createContainer(id, containerChildIds, containerStyle));

  return { rootId: id, components };
}
