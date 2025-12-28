/**
 * ContentCard - 内容卡片
 *
 * 通用内容展示卡片
 */

import { createContainer, createIcon, createText } from '../components';
import type { PatternResult, PatternOptions } from '../types';

export interface ContentCardOptions extends PatternOptions {
  /** 标题 */
  title: string;
  /** 内容 */
  content?: string;
  /** 图标 */
  icon?: string;
  /** 头部右侧内容 */
  headerRight?: string;
  /** 底部内容 */
  footer?: string;
  /** 变体 */
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  /** 颜色主题 */
  color?: string;
  /** 是否可点击 */
  clickable?: boolean;
}

/**
 * 创建内容卡片
 *
 * @example
 * ```typescript
 * const { rootId, components } = createContentCard({
 *   icon: '💡',
 *   title: '学习提示',
 *   content: '坚持每天学习30分钟，效果更好！',
 *   variant: 'filled',
 *   color: '#f59e0b',
 * });
 * ```
 */
export function createContentCard(options: ContentCardOptions): PatternResult {
  const {
    id = 'content-card',
    title,
    content,
    icon,
    headerRight,
    footer,
    variant = 'default',
    color = '#3b82f6',
    clickable = false,
  } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const isFilled = variant === 'filled';
  const isElevated = variant === 'elevated';
  const isOutlined = variant === 'outlined';

  // 头部
  const headerRowId = `${id}-header`;
  const headerChildIds: string[] = [];

  // 图标（如果有）
  if (icon) {
    const iconId = `${id}-icon`;
    headerChildIds.push(iconId);
    components.push(
      createIcon(iconId, icon, {
        fontSize: '20px',
        marginRight: '10px',
        color: isFilled ? '#ffffff' : color,
      })
    );
  }

  // 标题
  const titleId = `${id}-title`;
  headerChildIds.push(titleId);
  components.push(
    createText(titleId, title, {
      fontSize: '16px',
      fontWeight: '600',
      color: isFilled ? '#ffffff' : '#1f2937',
      flex: '1',
    })
  );

  // 右侧内容
  if (headerRight) {
    const rightId = `${id}-header-right`;
    headerChildIds.push(rightId);
    components.push(
      createText(rightId, headerRight, {
        fontSize: '14px',
        color: isFilled ? 'rgba(255,255,255,0.8)' : '#6b7280',
      })
    );
  }
  components.push(
    createContainer(headerRowId, headerChildIds, {
      display: 'flex',
      alignItems: 'center',
    })
  );
  containerChildIds.push(headerRowId);

  // 内容
  if (content) {
    const contentId = `${id}-content`;
    containerChildIds.push(contentId);
    components.push(
      createText(contentId, content, {
        fontSize: '14px',
        color: isFilled ? 'rgba(255,255,255,0.9)' : '#4b5563',
        marginTop: '12px',
        lineHeight: '1.6',
      })
    );
  }

  // 底部
  if (footer) {
    const footerId = `${id}-footer`;
    containerChildIds.push(footerId);
    components.push(
      createText(footerId, footer, {
        fontSize: '12px',
        color: isFilled ? 'rgba(255,255,255,0.7)' : '#9ca3af',
        marginTop: '12px',
        paddingTop: '12px',
        borderTop: `1px solid ${isFilled ? 'rgba(255,255,255,0.2)' : '#e5e7eb'}`,
      })
    );
  }

  // 主容器样式
  const containerStyle: Record<string, string> = {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    borderRadius: '12px',
  };

  if (isFilled) {
    containerStyle.backgroundColor = color || '#3b82f6';
  } else if (isElevated) {
    containerStyle.backgroundColor = '#ffffff';
    containerStyle.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
  } else if (isOutlined) {
    containerStyle.backgroundColor = '#ffffff';
    containerStyle.border = `1px solid ${color || '#e5e7eb'}`;
  } else {
    containerStyle.backgroundColor = '#ffffff';
    containerStyle.border = '1px solid #e5e7eb';
    containerStyle.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
  }

  if (clickable) {
    containerStyle.cursor = 'pointer';
    containerStyle.transition = 'transform 0.2s, box-shadow 0.2s';
  }

  // 主容器
  components.push(createContainer(id, containerChildIds, containerStyle));

  return { rootId: id, components };
}
