/**
 * Toast - 轻提示
 *
 * 短暂显示的通知消息
 */

import { createContainer, createText } from '../components';
import type { PatternResult, PatternOptions } from '../types';

export interface ToastOptions extends PatternOptions {
  /** 消息类型 */
  type?: 'info' | 'success' | 'warning' | 'error';
  /** 消息内容 */
  message: string;
  /** 图标（可选） */
  icon?: string;
  /** 位置 */
  position?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /** 变体 */
  variant?: 'default' | 'solid' | 'outlined';
}

/**
 * 获取 Toast 配置
 */
function getToastConfig(type: 'info' | 'success' | 'warning' | 'error'): {
  icon: string;
  color: string;
  bgColor: string;
} {
  switch (type) {
    case 'success':
      return { icon: '✓', color: '#10b981', bgColor: '#ecfdf5' };
    case 'warning':
      return { icon: '!', color: '#f59e0b', bgColor: '#fffbeb' };
    case 'error':
      return { icon: '✗', color: '#ef4444', bgColor: '#fef2f2' };
    default:
      return { icon: 'i', color: '#3b82f6', bgColor: '#eff6ff' };
  }
}

/**
 * 创建 Toast
 *
 * @example
 * ```typescript
 * const { rootId, components } = createToast({
 *   type: 'success',
 *   message: '保存成功！',
 * });
 * ```
 */
export function createToast(options: ToastOptions): PatternResult {
  const { id = 'toast', type = 'info', message, icon, variant = 'default' } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const config = getToastConfig(type);
  const displayIcon = icon || config.icon;
  const isSolid = variant === 'solid';
  const isOutlined = variant === 'outlined';

  // 图标
  const iconContainerId = `${id}-icon-container`;
  const iconChildIds: string[] = [];

  const iconId = `${id}-icon`;
  iconChildIds.push(iconId);
  components.push(
    createText(iconId, displayIcon, {
      fontSize: '12px',
      fontWeight: 'bold',
      color: isSolid ? '#ffffff' : config.color,
    })
  );
  components.push(
    createContainer(iconContainerId, iconChildIds, {
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isSolid ? 'rgba(255,255,255,0.2)' : config.color,
      borderRadius: '50%',
      flexShrink: '0',
    })
  );
  containerChildIds.push(iconContainerId);

  // 消息
  const messageId = `${id}-message`;
  containerChildIds.push(messageId);
  components.push(
    createText(messageId, message, {
      fontSize: '14px',
      color: isSolid ? '#ffffff' : '#374151',
      marginLeft: '10px',
    })
  );

  // 主容器
  const containerStyle: Record<string, string> = {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    minWidth: '200px',
    maxWidth: '400px',
  };

  if (isSolid) {
    containerStyle.backgroundColor = config.color;
  } else if (isOutlined) {
    containerStyle.backgroundColor = '#ffffff';
    containerStyle.border = `1px solid ${config.color}`;
  } else {
    containerStyle.backgroundColor = config.bgColor;
  }

  components.push(createContainer(id, containerChildIds, containerStyle));

  return { rootId: id, components };
}
