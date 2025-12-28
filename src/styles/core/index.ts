/**
 * A2UI Core Styles
 *
 * 合并所有样式模块，生成完整的 CSS 字符串
 */

import { layoutStyles } from './layout';
import { colorStyles } from './colors';
import { typographyStyles } from './typography';
import { borderStyles } from './border';
import { behaviorStyles } from './behavior';
import { iconStyles } from './icons';

export * from './shared';
export { layoutStyles } from './layout';
export { colorStyles } from './colors';
export { typographyStyles } from './typography';
export { borderStyles } from './border';
export { behaviorStyles } from './behavior';
export { iconStyles } from './icons';

/**
 * 基础样式 (reset + container)
 */
export const baseStyles = `
  /* A2UI Base Styles */
  .a2ui-root {
    font-family: var(--a2-font-sans);
    font-size: var(--a2-text-bm);
    line-height: 1.5;
    color: light-dark(var(--n-10), var(--n-90));
    background-color: light-dark(var(--n-0), var(--n-100));
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }

  .a2ui-root *,
  .a2ui-root *::before,
  .a2ui-root *::after {
    box-sizing: border-box;
  }

  /* Reset headings */
  .a2ui-root h1,
  .a2ui-root h2,
  .a2ui-root h3,
  .a2ui-root h4,
  .a2ui-root h5,
  .a2ui-root h6 {
    margin: 0;
    font-weight: 600;
    line-height: 1.25;
  }

  .a2ui-root p {
    margin: 0;
  }

  .a2ui-root ul,
  .a2ui-root ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .a2ui-root a {
    color: inherit;
    text-decoration: none;
  }

  /* 按钮基础重置 - 只设置继承属性，不覆盖工具类 */
  .a2ui-root button {
    font: inherit;
    margin: 0;
    cursor: pointer;
  }

  .a2ui-root input,
  .a2ui-root textarea,
  .a2ui-root select {
    font: inherit;
    color: inherit;
  }

  .a2ui-root img,
  .a2ui-root video {
    max-width: 100%;
    height: auto;
  }

  /* Scrollbar styling */
  .a2ui-root::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  .a2ui-root::-webkit-scrollbar-track {
    background: transparent;
  }

  .a2ui-root::-webkit-scrollbar-thumb {
    background: light-dark(var(--n-30), var(--n-70));
    border-radius: 3px;
  }

  .a2ui-root::-webkit-scrollbar-thumb:hover {
    background: light-dark(var(--n-40), var(--n-60));
  }
`;

/**
 * 所有结构化样式（合并后的 CSS 字符串）
 */
export const structuralStyles = [
  baseStyles,
  layoutStyles,
  colorStyles,
  typographyStyles,
  borderStyles,
  behaviorStyles,
  iconStyles,
].join('\n');

/**
 * 获取完整的 A2UI 样式 CSS
 */
export function getA2UIStyles(): string {
  return structuralStyles;
}

