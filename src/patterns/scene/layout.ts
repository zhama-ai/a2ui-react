/**
 * Layout - 布局工具
 *
 * 提供布局容器的创建
 */

import { createContainer } from '../components';
import type { PatternResult } from '../types';

import type { LayoutConfig } from './scene-config';

/**
 * 创建布局容器
 */
export function createLayout(
  id: string,
  config: LayoutConfig,
  childIds: string[],
  additionalStyle?: Record<string, string>
): PatternResult {
  const components: unknown[] = [];

  // 计算布局样式
  const layoutStyle = getLayoutStyle(config);

  // 合并额外样式
  const finalStyle = {
    ...layoutStyle,
    ...additionalStyle,
  };

  components.push(createContainer(id, childIds, finalStyle));

  return { rootId: id, components };
}

/**
 * 获取布局样式
 */
function getLayoutStyle(config: LayoutConfig): Record<string, string> {
  const style: Record<string, string> = {
    display: 'flex',
    gap: config.gap || '16px',
  };

  switch (config.type) {
    case 'vertical':
      style.flexDirection = 'column';
      break;

    case 'horizontal':
      style.flexDirection = 'row';
      break;

    case 'grid':
      style.display = 'grid';
      style.gridTemplateColumns = `repeat(${config.columns || 3}, 1fr)`;
      break;

    case 'split':
      style.flexDirection = 'row';
      // ratio 如 "1:2" 转换为 flex 比例
      if (config.ratio) {
        // 通过包装子元素实现比例，这里只设置基本样式
      }
      break;
  }

  // 对齐方式
  switch (config.align) {
    case 'center':
      style.alignItems = 'center';
      break;
    case 'end':
      style.alignItems = 'flex-end';
      break;
    case 'stretch':
      style.alignItems = 'stretch';
      break;
    default:
      style.alignItems = 'flex-start';
  }

  return style;
}

/**
 * 创建响应式网格布局
 */
export function createResponsiveGrid(
  id: string,
  childIds: string[],
  options?: {
    minWidth?: string;
    gap?: string;
    additionalStyle?: Record<string, string>;
  }
): PatternResult {
  const { minWidth = '280px', gap = '16px', additionalStyle } = options || {};

  const components: unknown[] = [];

  const style: Record<string, string> = {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}, 1fr))`,
    gap,
    ...additionalStyle,
  };

  components.push(createContainer(id, childIds, style));

  return { rootId: id, components };
}

/**
 * 创建分栏布局
 */
export function createSplitLayout(
  id: string,
  leftId: string,
  rightId: string,
  options?: {
    ratio?: string;
    gap?: string;
    additionalStyle?: Record<string, string>;
  }
): PatternResult {
  const { ratio = '1:1', gap = '24px', additionalStyle } = options || {};

  const components: unknown[] = [];

  // 解析比例（用于将来可能的样式计算，目前暂未使用）
  const ratios = ratio.split(':').map(Number);
  const _leftRatio = ratios[0] || 1;
  const _rightRatio = ratios[1] || 1;

  const style: Record<string, string> = {
    display: 'flex',
    gap,
    ...additionalStyle,
  };

  components.push(createContainer(id, [leftId, rightId], style));

  return { rootId: id, components };
}

/**
 * 创建居中布局
 */
export function createCenteredLayout(
  id: string,
  childIds: string[],
  options?: {
    maxWidth?: string;
    padding?: string;
    additionalStyle?: Record<string, string>;
  }
): PatternResult {
  const { maxWidth = '800px', padding = '24px', additionalStyle } = options || {};

  const components: unknown[] = [];

  const style: Record<string, string> = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth,
    margin: '0 auto',
    padding,
    ...additionalStyle,
  };

  components.push(createContainer(id, childIds, style));

  return { rootId: id, components };
}

/**
 * 创建卡片容器
 */
export function createCardContainer(
  id: string,
  childIds: string[],
  options?: {
    padding?: string;
    variant?: 'default' | 'elevated' | 'outlined';
    additionalStyle?: Record<string, string>;
  }
): PatternResult {
  const { padding = '24px', variant = 'default', additionalStyle } = options || {};

  const components: unknown[] = [];

  const style: Record<string, string> = {
    display: 'flex',
    flexDirection: 'column',
    padding,
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    ...additionalStyle,
  };

  switch (variant) {
    case 'elevated':
      style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      break;
    case 'outlined':
      style.border = '1px solid #e5e7eb';
      break;
    default:
      style.border = '1px solid #e5e7eb';
      style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
  }

  components.push(createContainer(id, childIds, style));

  return { rootId: id, components };
}
