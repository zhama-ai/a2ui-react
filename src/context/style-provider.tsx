/**
 * A2UI Style Provider
 *
 * 将 A2UI 样式注入到 DOM 中
 */

import { useEffect, type ReactNode } from 'react';

import { structuralStyles } from '../styles/core';

// 全局样式注入标记
let stylesInjected = false;

/**
 * 注入样式到 document.head
 */
function injectStyles(styleId: string): void {
  if (stylesInjected) return;

  // 检查是否已存在
  if (document.getElementById(styleId)) {
    stylesInjected = true;
    return;
  }

  const styleElement = document.createElement('style');
  styleElement.id = styleId;
  styleElement.textContent = structuralStyles;
  document.head.appendChild(styleElement);
  stylesInjected = true;
}

/**
 * 移除注入的样式
 */
function removeStyles(styleId: string): void {
  const styleElement = document.getElementById(styleId);
  if (styleElement) {
    styleElement.remove();
    stylesInjected = false;
  }
}

export interface StyleProviderProps {
  children: ReactNode;
  /**
   * 是否在组件卸载时移除样式
   * @default false
   */
  removeOnUnmount?: boolean;
}

const STYLE_ID = 'a2ui-structural-styles';

/**
 * A2UI 样式提供者
 *
 * 自动将 A2UI 的 CSS 工具类注入到页面中
 *
 * @example
 * ```tsx
 * <StyleProvider>
 *   <A2UIRoot>
 *     <YourComponents />
 *   </A2UIRoot>
 * </StyleProvider>
 * ```
 */
export function StyleProvider({ children, removeOnUnmount = false }: StyleProviderProps) {
  useEffect(() => {
    injectStyles(STYLE_ID);

    return () => {
      if (removeOnUnmount) {
        removeStyles(STYLE_ID);
      }
    };
  }, [removeOnUnmount]);

  return <>{children}</>;
}

/**
 * 手动获取样式 CSS 字符串（用于 SSR 或其他场景）
 */
export function getStylesCSS(): string {
  return structuralStyles;
}

/**
 * 创建内联 style 标签（用于 Shadow DOM 等场景）
 */
export function createStyleElement(): HTMLStyleElement {
  const style = document.createElement('style');
  style.textContent = structuralStyles;
  return style;
}

