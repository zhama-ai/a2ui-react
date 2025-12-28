/**
 * A2UI Layout Styles
 *
 * 生成布局相关的 CSS 工具类
 * 类名格式: a2-layout-{property}-{value}
 */

import { GRID } from './shared';

/**
 * 生成布局样式 CSS
 */
export function generateLayoutStyles(): string {
  const styles: string[] = [];

  // CSS 变量定义 - 使用 :root 确保全局可用
  styles.push(`
    :root, :host, .a2ui-root {
      ${Array.from({ length: 16 }, (_, idx) => `--a2-g-${idx + 1}: ${(idx + 1) * GRID}px;`).join('\n      ')}
    }
  `);

  // Padding & Margin (0-24 steps, including negative values)
  for (let i = -24; i <= 24; i++) {
    const lbl = i < 0 ? `n${Math.abs(i)}` : i.toString();
    const val = i * GRID;

    styles.push(`
      .a2-p-${lbl} { --a2-padding: ${val}px; padding: var(--a2-padding); }
      .a2-pt-${lbl} { padding-top: ${val}px; }
      .a2-pr-${lbl} { padding-right: ${val}px; }
      .a2-pb-${lbl} { padding-bottom: ${val}px; }
      .a2-pl-${lbl} { padding-left: ${val}px; }
      .a2-px-${lbl} { padding-left: ${val}px; padding-right: ${val}px; }
      .a2-py-${lbl} { padding-top: ${val}px; padding-bottom: ${val}px; }

      .a2-m-${lbl} { --a2-margin: ${val}px; margin: var(--a2-margin); }
      .a2-mt-${lbl} { margin-top: ${val}px; }
      .a2-mr-${lbl} { margin-right: ${val}px; }
      .a2-mb-${lbl} { margin-bottom: ${val}px; }
      .a2-ml-${lbl} { margin-left: ${val}px; }
      .a2-mx-${lbl} { margin-left: ${val}px; margin-right: ${val}px; }
      .a2-my-${lbl} { margin-top: ${val}px; margin-bottom: ${val}px; }

      .a2-t-${lbl} { top: ${val}px; }
      .a2-r-${lbl} { right: ${val}px; }
      .a2-b-${lbl} { bottom: ${val}px; }
      .a2-l-${lbl} { left: ${val}px; }
    `);
  }

  // Gap (0-24 steps)
  for (let i = 0; i <= 24; i++) {
    styles.push(`.a2-gap-${i} { gap: ${i * GRID}px; }`);
  }

  // Grid columns (1-8)
  for (let i = 1; i <= 8; i++) {
    styles.push(`.a2-grid-cols-${i} { grid-template-columns: ${'1fr '.repeat(i).trim()}; }`);
  }

  // Width percentage (10-100)
  for (let i = 1; i <= 10; i++) {
    const pct = i * 10;
    styles.push(`.a2-w-${pct} { width: ${pct}%; max-width: ${pct}%; }`);
  }

  // Width in pixels (0-15 * GRID)
  for (let i = 0; i <= 15; i++) {
    styles.push(`.a2-wp-${i} { width: ${i * GRID}px; }`);
  }

  // Height percentage (10-100)
  for (let i = 1; i <= 10; i++) {
    const pct = i * 10;
    styles.push(`.a2-h-${pct} { height: ${pct}%; }`);
  }

  // Height in pixels (0-15 * GRID)
  for (let i = 0; i <= 15; i++) {
    styles.push(`.a2-hp-${i} { height: ${i * GRID}px; }`);
  }

  // Static layout utilities
  styles.push(`
    /* Position */
    .a2-pos-abs { position: absolute; }
    .a2-pos-rel { position: relative; }
    .a2-pos-fixed { position: fixed; }
    .a2-pos-sticky { position: sticky; }
    .a2-inset-0 { inset: 0; }

    /* Display */
    .a2-dsp-none { display: none; }
    .a2-dsp-block { display: block; }
    .a2-dsp-inline { display: inline; }
    .a2-dsp-iblock { display: inline-block; }
    .a2-dsp-grid { display: grid; }
    .a2-dsp-iflex { display: inline-flex; }
    .a2-dsp-flex { display: flex; }
    .a2-dsp-flexvert { display: flex; flex-direction: column; }
    .a2-dsp-flexhor { display: flex; flex-direction: row; }

    /* Flex Direction */
    .a2-flex-row { flex-direction: row; }
    .a2-flex-col { flex-direction: column; }
    .a2-flex-wrap { flex-wrap: wrap; }
    .a2-flex-nowrap { flex-wrap: nowrap; }

    /* Align Items */
    .a2-al-start { align-items: flex-start; }
    .a2-al-end { align-items: flex-end; }
    .a2-al-center { align-items: center; }
    .a2-al-stretch { align-items: stretch; }
    .a2-al-baseline { align-items: baseline; }

    /* Align Self */
    .a2-as-auto { align-self: auto; }
    .a2-as-start { align-self: flex-start; }
    .a2-as-end { align-self: flex-end; }
    .a2-as-center { align-self: center; }
    .a2-as-stretch { align-self: stretch; }

    /* Justify Content */
    .a2-jc-start { justify-content: flex-start; }
    .a2-jc-end { justify-content: flex-end; }
    .a2-jc-center { justify-content: center; }
    .a2-jc-between { justify-content: space-between; }
    .a2-jc-around { justify-content: space-around; }
    .a2-jc-evenly { justify-content: space-evenly; }

    /* Justify Self */
    .a2-js-auto { justify-self: auto; }
    .a2-js-start { justify-self: start; }
    .a2-js-end { justify-self: end; }
    .a2-js-center { justify-self: center; }

    /* Flex */
    .a2-flex-0 { flex: 0 0 auto; }
    .a2-flex-1 { flex: 1 1 0%; }
    .a2-flex-auto { flex: 1 1 auto; }
    .a2-flex-none { flex: none; }
    .a2-flex-grow { flex-grow: 1; }
    .a2-flex-shrink { flex-shrink: 1; }

    /* Sizing */
    .a2-w-full { width: 100%; }
    .a2-w-auto { width: auto; }
    .a2-w-fit { width: fit-content; }
    .a2-w-min { width: min-content; }
    .a2-w-max { width: max-content; }
    .a2-h-full { height: 100%; }
    .a2-h-auto { height: auto; }
    .a2-h-fit { height: fit-content; }
    .a2-min-h-0 { min-height: 0; }
    .a2-min-w-0 { min-width: 0; }
    .a2-max-w-full { max-width: 100%; }

    /* Overflow */
    .a2-overflow-auto { overflow: auto; }
    .a2-overflow-hidden { overflow: hidden; }
    .a2-overflow-scroll { overflow: scroll; }
    .a2-overflow-visible { overflow: visible; }
    .a2-overflow-x-auto { overflow-x: auto; }
    .a2-overflow-y-auto { overflow-y: auto; }
    .a2-overflow-x-hidden { overflow-x: hidden; }
    .a2-overflow-y-hidden { overflow-y: hidden; }

    /* Resize */
    .a2-resize-none { resize: none; }
    .a2-resize-y { resize: vertical; }
    .a2-resize-x { resize: horizontal; }
    .a2-resize { resize: both; }

    /* Object Fit */
    .a2-obj-contain { object-fit: contain; }
    .a2-obj-cover { object-fit: cover; }
    .a2-obj-fill { object-fit: fill; }
    .a2-obj-none { object-fit: none; }
    .a2-obj-scale { object-fit: scale-down; }

    /* Aspect Ratio */
    .a2-aspect-auto { aspect-ratio: auto; }
    .a2-aspect-square { aspect-ratio: 1 / 1; }
    .a2-aspect-video { aspect-ratio: 16 / 9; }

    /* Z-Index */
    .a2-z-0 { z-index: 0; }
    .a2-z-10 { z-index: 10; }
    .a2-z-20 { z-index: 20; }
    .a2-z-30 { z-index: 30; }
    .a2-z-40 { z-index: 40; }
    .a2-z-50 { z-index: 50; }
    .a2-z-auto { z-index: auto; }

    /* Image/Video container */
    .a2-media-cover img,
    .a2-media-cover video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      margin: 0;
    }
  `);

  return styles.join('\n');
}

export const layoutStyles = generateLayoutStyles();
