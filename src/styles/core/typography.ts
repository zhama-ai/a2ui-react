/**
 * A2UI Typography Styles
 *
 * 生成字体相关的 CSS 工具类
 */

/**
 * 生成字体样式 CSS
 */
export function generateTypographyStyles(): string {
  const styles: string[] = [];

  // Font family definitions（使用 :root 确保全局可用）
  styles.push(`
    :root, :host, .a2ui-root {
      /* Font families */
      --a2-font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      --a2-font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
      --a2-font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;

      /* Font sizes - Body */
      --a2-text-bs: 12px;
      --a2-text-bm: 14px;
      --a2-text-bl: 16px;

      /* Font sizes - Label */
      --a2-text-ls: 10px;
      --a2-text-lm: 11px;
      --a2-text-ll: 12px;

      /* Font sizes - Title */
      --a2-text-ts: 14px;
      --a2-text-tm: 16px;
      --a2-text-tl: 22px;

      /* Font sizes - Headline */
      --a2-text-hs: 24px;
      --a2-text-hm: 28px;
      --a2-text-hl: 32px;

      /* Font sizes - Display */
      --a2-text-ds: 36px;
      --a2-text-dm: 45px;
      --a2-text-dl: 57px;
    }
  `);

  // Font family classes
  styles.push(`
    .a2-font-sans { font-family: var(--a2-font-sans); }
    .a2-font-serif { font-family: var(--a2-font-serif); }
    .a2-font-mono { font-family: var(--a2-font-mono); }
  `);

  // Font weight (100-900)
  for (let w = 1; w <= 9; w++) {
    const weight = w * 100;
    styles.push(`.a2-fw-${weight} { font-weight: ${weight}; }`);
  }

  // Font size classes
  const sizeMap = {
    // Body sizes
    bs: 'var(--a2-text-bs)',
    bm: 'var(--a2-text-bm)',
    bl: 'var(--a2-text-bl)',
    // Label sizes
    ls: 'var(--a2-text-ls)',
    lm: 'var(--a2-text-lm)',
    ll: 'var(--a2-text-ll)',
    // Title sizes
    ts: 'var(--a2-text-ts)',
    tm: 'var(--a2-text-tm)',
    tl: 'var(--a2-text-tl)',
    // Headline sizes
    hs: 'var(--a2-text-hs)',
    hm: 'var(--a2-text-hm)',
    hl: 'var(--a2-text-hl)',
    // Display sizes
    ds: 'var(--a2-text-ds)',
    dm: 'var(--a2-text-dm)',
    dl: 'var(--a2-text-dl)',
  };

  for (const [key, value] of Object.entries(sizeMap)) {
    styles.push(`.a2-text-${key} { font-size: ${value}; }`);
  }

  // Fixed font sizes (px)
  const fixedSizes = [10, 11, 12, 13, 14, 15, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64];
  for (const size of fixedSizes) {
    styles.push(`.a2-text-${size} { font-size: ${size}px; }`);
  }

  // Font style
  styles.push(`
    .a2-fs-normal { font-style: normal; }
    .a2-fs-italic { font-style: italic; }
  `);

  // Text alignment
  styles.push(`
    .a2-ta-left { text-align: left; }
    .a2-ta-center { text-align: center; }
    .a2-ta-right { text-align: right; }
    .a2-ta-justify { text-align: justify; }
    .a2-ta-start { text-align: start; }
    .a2-ta-end { text-align: end; }
  `);

  // Text decoration
  styles.push(`
    .a2-td-none { text-decoration: none; }
    .a2-td-underline { text-decoration: underline; }
    .a2-td-overline { text-decoration: overline; }
    .a2-td-through { text-decoration: line-through; }
  `);

  // Text transform
  styles.push(`
    .a2-tt-none { text-transform: none; }
    .a2-tt-upper { text-transform: uppercase; }
    .a2-tt-lower { text-transform: lowercase; }
    .a2-tt-cap { text-transform: capitalize; }
  `);

  // Line height
  styles.push(`
    .a2-lh-none { line-height: 1; }
    .a2-lh-tight { line-height: 1.25; }
    .a2-lh-snug { line-height: 1.375; }
    .a2-lh-normal { line-height: 1.5; }
    .a2-lh-relaxed { line-height: 1.625; }
    .a2-lh-loose { line-height: 2; }
  `);

  // Letter spacing
  styles.push(`
    .a2-ls-tighter { letter-spacing: -0.05em; }
    .a2-ls-tight { letter-spacing: -0.025em; }
    .a2-ls-normal { letter-spacing: 0; }
    .a2-ls-wide { letter-spacing: 0.025em; }
    .a2-ls-wider { letter-spacing: 0.05em; }
    .a2-ls-widest { letter-spacing: 0.1em; }
  `);

  // Whitespace
  styles.push(`
    .a2-ws-normal { white-space: normal; }
    .a2-ws-nowrap { white-space: nowrap; }
    .a2-ws-pre { white-space: pre; }
    .a2-ws-preline { white-space: pre-line; }
    .a2-ws-prewrap { white-space: pre-wrap; }
    .a2-ws-break { white-space: break-spaces; }
  `);

  // Word break
  styles.push(`
    .a2-wb-normal { word-break: normal; }
    .a2-wb-words { overflow-wrap: break-word; }
    .a2-wb-all { word-break: break-all; }
    .a2-wb-keep { word-break: keep-all; }
  `);

  // Text overflow
  styles.push(`
    .a2-truncate {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .a2-text-clip { text-overflow: clip; }
    .a2-text-ellipsis { text-overflow: ellipsis; }
  `);

  // Vertical align
  styles.push(`
    .a2-va-baseline { vertical-align: baseline; }
    .a2-va-top { vertical-align: top; }
    .a2-va-middle { vertical-align: middle; }
    .a2-va-bottom { vertical-align: bottom; }
    .a2-va-text-top { vertical-align: text-top; }
    .a2-va-text-bottom { vertical-align: text-bottom; }
  `);

  return styles.join('\n');
}

export const typographyStyles = generateTypographyStyles();

