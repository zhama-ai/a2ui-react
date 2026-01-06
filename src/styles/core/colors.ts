/**
 * A2UI Color Styles
 *
 * 设计原则：
 * 1. A2UI 定义自己的 CSS 变量（--a2-* 前缀）
 * 2. 所有变量都有默认值
 * 3. 宿主应用通过设置这些变量来注入主题
 * 4. 支持亮色/暗色主题切换
 *
 * 使用方式：
 * 宿主应用可以通过以下方式注入主题：
 *
 * :root {
 *   --a2-primary: 230 83% 60%;
 *   --a2-foreground: 222 84% 5%;
 *   --a2-border: 214 32% 91%;
 *   ...
 * }
 */

import { SHADES, PALETTE_KEYS, toProp, getInverseKey } from './shared';

/**
 * 生成调色板颜色样式（保留向后兼容）
 */
function generatePaletteColors(prefix: string): string {
  const styles: string[] = [];

  for (const shade of SHADES) {
    const key = `${prefix}${shade}`;
    const inverseKey = getInverseKey(key);

    // Border Color
    styles.push(
      `.a2-bc-${key} { border-color: light-dark(var(${toProp(key)}), var(${toProp(inverseKey)})); }`
    );

    // Background Color
    styles.push(
      `.a2-bgc-${key} { background-color: light-dark(var(${toProp(key)}), var(${toProp(inverseKey)})); }`
    );

    // Backdrop background
    styles.push(
      `.a2-bbgc-${key}::backdrop { background-color: light-dark(var(${toProp(key)}), var(${toProp(inverseKey)})); }`
    );

    // Background with opacity (10%-90%)
    for (let o = 1; o <= 9; o++) {
      const opacity = o * 10;
      styles.push(`
        .a2-bgc-${key}_${opacity} {
          background-color: light-dark(
            oklch(from var(${toProp(key)}) l c h / ${o / 10}),
            oklch(from var(${toProp(inverseKey)}) l c h / ${o / 10})
          );
        }
        .a2-bbgc-${key}_${opacity}::backdrop {
          background-color: light-dark(
            oklch(from var(${toProp(key)}) l c h / ${o / 10}),
            oklch(from var(${toProp(inverseKey)}) l c h / ${o / 10})
          );
        }
      `);
    }

    // Text Color
    styles.push(
      `.a2-c-${key} { color: light-dark(var(${toProp(key)}), var(${toProp(inverseKey)})); }`
    );
  }

  return styles.join('\n');
}

/**
 * 生成 A2UI 主题变量定义
 * 宿主应用可以覆盖这些变量来注入主题
 */
function generateThemeVariables(): string {
  return `
    /* ========================================
     * A2UI 主题变量系统
     *
     * 宿主应用可以通过设置这些变量来自定义主题
     * 所有变量使用 HSL 格式（不含 hsl() 函数）
     * 例如: --a2-primary: 230 83% 60%;
     * ======================================== */

    :root, :host, .a2ui-root {
      /* ===== 语义化颜色变量 ===== */

      /* Primary - 主色调（按钮、链接、强调元素） */
      --a2-primary: 230 83% 60%;
      --a2-primary-foreground: 210 40% 98%;

      /* Secondary - 次要色（次要按钮、标签） */
      --a2-secondary: 210 40% 96%;
      --a2-secondary-foreground: 222 84% 5%;

      /* Muted - 柔和色（禁用状态、次要文字） */
      --a2-muted: 210 40% 96%;
      --a2-muted-foreground: 215 16% 47%;

      /* Accent - 强调色（悬停、选中状态） */
      --a2-accent: 210 40% 96%;
      --a2-accent-foreground: 222 84% 5%;

      /* Destructive - 危险色（删除、错误） */
      --a2-destructive: 0 84% 60%;
      --a2-destructive-foreground: 210 40% 98%;

      /* Background & Foreground - 背景和前景 */
      --a2-background: 0 0% 100%;
      --a2-foreground: 222 84% 5%;

      /* Card - 卡片 */
      --a2-card: 0 0% 100%;
      --a2-card-foreground: 222 84% 5%;

      /* Popover - 弹出层 */
      --a2-popover: 0 0% 100%;
      --a2-popover-foreground: 222 84% 5%;

      /* Border & Input - 边框和输入框 */
      --a2-border: 214 32% 91%;
      --a2-input: 214 32% 91%;
      --a2-ring: 230 83% 60%;

      /* Success/Warning/Info - 状态色 */
      --a2-success: 142 76% 36%;
      --a2-success-foreground: 0 0% 98%;
      --a2-warning: 38 92% 50%;
      --a2-warning-foreground: 0 0% 98%;
      --a2-info: 199 89% 48%;
      --a2-info-foreground: 0 0% 98%;

      /* ===== 布局变量 ===== */
      --a2-radius: 0.5rem;
      --a2-radius-sm: 0.25rem;
      --a2-radius-lg: 0.75rem;

      /* ===== 字体变量 ===== */
      --a2-font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      --a2-font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace;

      /* ===== 阴影变量 ===== */
      --a2-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
      --a2-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
      --a2-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
      --a2-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    }

    /* 暗色主题 */
    .dark, [data-theme="dark"] {
      --a2-primary: 230 85% 65%;
      --a2-primary-foreground: 0 0% 17%;

      --a2-secondary: 0 0% 22%;
      --a2-secondary-foreground: 0 0% 95%;

      --a2-muted: 0 0% 22%;
      --a2-muted-foreground: 0 0% 70%;

      --a2-accent: 0 0% 22%;
      --a2-accent-foreground: 0 0% 95%;

      --a2-destructive: 0 63% 31%;
      --a2-destructive-foreground: 0 0% 95%;

      --a2-background: 0 0% 17%;
      --a2-foreground: 0 0% 95%;

      --a2-card: 0 0% 20%;
      --a2-card-foreground: 0 0% 95%;

      --a2-popover: 0 0% 17%;
      --a2-popover-foreground: 0 0% 95%;

      --a2-border: 0 0% 27%;
      --a2-input: 0 0% 30%;
      --a2-ring: 230 85% 65%;

      --a2-success: 142 70% 45%;
      --a2-warning: 38 92% 50%;
      --a2-info: 199 89% 48%;
    }
  `;
}

/**
 * 生成语义化颜色工具类
 * 这些类使用 A2UI 的主题变量
 */
function generateSemanticColors(): string {
  return `
    /* ========================================
     * 语义化颜色工具类
     * 使用 A2UI 主题变量 (--a2-*)
     * ======================================== */

    /* Primary */
    .a2-bg-primary { background-color: hsl(var(--a2-primary)); }
    .a2-bg-primary-foreground { background-color: hsl(var(--a2-primary-foreground)); }
    .a2-text-primary { color: hsl(var(--a2-primary)); }
    .a2-text-primary-foreground { color: hsl(var(--a2-primary-foreground)); }
    .a2-border-primary { border-color: hsl(var(--a2-primary)); }

    /* Secondary */
    .a2-bg-secondary { background-color: hsl(var(--a2-secondary)); }
    .a2-text-secondary-foreground { color: hsl(var(--a2-secondary-foreground)); }
    .a2-border-secondary { border-color: hsl(var(--a2-secondary)); }

    /* Muted */
    .a2-bg-muted { background-color: hsl(var(--a2-muted)); }
    .a2-text-muted-foreground { color: hsl(var(--a2-muted-foreground)); }

    /* Accent */
    .a2-bg-accent { background-color: hsl(var(--a2-accent)); }
    .a2-text-accent-foreground { color: hsl(var(--a2-accent-foreground)); }

    /* Destructive */
    .a2-bg-destructive { background-color: hsl(var(--a2-destructive)); }
    .a2-text-destructive { color: hsl(var(--a2-destructive)); }
    .a2-text-destructive-foreground { color: hsl(var(--a2-destructive-foreground)); }

    /* Background & Foreground */
    .a2-bg-background { background-color: hsl(var(--a2-background)); }
    .a2-text-foreground { color: hsl(var(--a2-foreground)); }

    /* Card */
    .a2-bg-card { background-color: hsl(var(--a2-card)); }
    .a2-text-card-foreground { color: hsl(var(--a2-card-foreground)); }

    /* Popover */
    .a2-bg-popover { background-color: hsl(var(--a2-popover)); }
    .a2-text-popover-foreground { color: hsl(var(--a2-popover-foreground)); }

    /* Border */
    .a2-border-default { border-color: hsl(var(--a2-border)); }
    .a2-border-input { border-color: hsl(var(--a2-input)); }

    /* Ring */
    .a2-ring { box-shadow: 0 0 0 2px hsl(var(--a2-ring)); }
    .a2-ring-offset { box-shadow: 0 0 0 2px hsl(var(--a2-background)), 0 0 0 4px hsl(var(--a2-ring)); }

    /* Status Colors */
    .a2-bg-success { background-color: hsl(var(--a2-success)); }
    .a2-text-success { color: hsl(var(--a2-success)); }
    .a2-bg-warning { background-color: hsl(var(--a2-warning)); }
    .a2-text-warning { color: hsl(var(--a2-warning)); }
    .a2-bg-info { background-color: hsl(var(--a2-info)); }
    .a2-text-info { color: hsl(var(--a2-info)); }

    /* Radius */
    .a2-rounded { border-radius: var(--a2-radius); }
    .a2-rounded-sm { border-radius: var(--a2-radius-sm); }
    .a2-rounded-lg { border-radius: var(--a2-radius-lg); }
    .a2-rounded-full { border-radius: 9999px; }
    .a2-rounded-none { border-radius: 0; }

    /* Shadow */
    .a2-shadow-sm { box-shadow: var(--a2-shadow-sm); }
    .a2-shadow { box-shadow: var(--a2-shadow); }
    .a2-shadow-md { box-shadow: var(--a2-shadow-md); }
    .a2-shadow-lg { box-shadow: var(--a2-shadow-lg); }
    .a2-shadow-none { box-shadow: none; }

    /* ========================================
     * Markdown 样式 - 专业简洁设计
     * 使用 !important 确保优先于 Tailwind preflight reset
     * ======================================== */

    p.a2-md-p {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      font-weight: 400 !important;
      font-size: 14px !important;
      line-height: 1.7 !important;
      color: inherit !important;
      margin: 0 0 12px 0 !important;
    }

    p.a2-md-p:last-child {
      margin-bottom: 0 !important;
    }

    h1.a2-md-h1 {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      font-weight: 700 !important;
      font-size: 24px !important;
      line-height: 1.4 !important;
      color: hsl(var(--a2-foreground)) !important;
      margin: 24px 0 16px 0 !important;
      letter-spacing: -0.02em !important;
    }

    h1.a2-md-h1:first-child {
      margin-top: 0 !important;
    }

    h2.a2-md-h2 {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      font-weight: 600 !important;
      font-size: 18px !important;
      line-height: 1.45 !important;
      color: hsl(var(--a2-foreground)) !important;
      margin: 20px 0 12px 0 !important;
      letter-spacing: -0.01em !important;
    }

    h2.a2-md-h2:first-child {
      margin-top: 0 !important;
    }

    h3.a2-md-h3 {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      font-weight: 600 !important;
      font-size: 16px !important;
      line-height: 1.5 !important;
      color: hsl(var(--a2-foreground)) !important;
      margin: 16px 0 8px 0 !important;
    }

    h3.a2-md-h3:first-child {
      margin-top: 0 !important;
    }

    h4.a2-md-h4 {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      font-weight: 600 !important;
      font-size: 14px !important;
      line-height: 1.55 !important;
      color: hsl(var(--a2-foreground)) !important;
      margin: 12px 0 6px 0 !important;
    }

    h4.a2-md-h4:first-child {
      margin-top: 0 !important;
    }

    h5.a2-md-h5 {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      font-weight: 500 !important;
      font-size: 13px !important;
      line-height: 1.55 !important;
      color: hsl(var(--a2-muted-foreground)) !important;
      margin: 8px 0 4px 0 !important;
    }

    h5.a2-md-h5:first-child {
      margin-top: 0 !important;
    }

    ul.a2-md-ul {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      font-size: 14px !important;
      line-height: 1.7 !important;
      color: hsl(var(--a2-foreground)) !important;
      margin: 0 0 12px 0 !important;
      padding-left: 20px !important;
      list-style-type: disc !important;
    }

    ol.a2-md-ol {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      font-size: 14px !important;
      line-height: 1.7 !important;
      color: hsl(var(--a2-foreground)) !important;
      margin: 0 0 12px 0 !important;
      padding-left: 20px !important;
      list-style-type: decimal !important;
    }

    li.a2-md-li {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      font-size: 14px !important;
      line-height: 1.7 !important;
      color: hsl(var(--a2-foreground)) !important;
      margin-bottom: 4px !important;
    }

    a.a2-md-a {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      font-weight: 500 !important;
      color: hsl(var(--a2-primary)) !important;
      text-decoration: none !important;
      transition: opacity 0.15s ease !important;
    }

    a.a2-md-a:hover {
      opacity: 0.8 !important;
      text-decoration: underline !important;
    }

    strong.a2-md-strong {
      font-weight: 600 !important;
      color: inherit !important;
    }

    em.a2-md-em {
      font-style: italic !important;
    }

    code.a2-md-code {
      font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace !important;
      font-size: 13px !important;
      background-color: hsl(var(--a2-muted)) !important;
      color: hsl(var(--a2-foreground)) !important;
      padding: 2px 6px !important;
      border-radius: 4px !important;
    }

    blockquote.a2-md-blockquote {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      font-size: 14px !important;
      line-height: 1.7 !important;
      color: hsl(var(--a2-muted-foreground)) !important;
      font-style: italic !important;
      margin: 12px 0 !important;
      padding-left: 16px !important;
      border-left: 3px solid hsl(var(--a2-primary)) !important;
    }
  `;
}

/**
 * 生成颜色样式 CSS
 */
export function generateColorStyles(): string {
  const styles: string[] = [];

  // 1. 首先添加 A2UI 主题变量系统（可被宿主应用覆盖）
  styles.push(generateThemeVariables());

  // 2. 添加语义化颜色工具类
  styles.push(generateSemanticColors());

  // 3. CSS 变量定义 - 调色板（直接使用 HSL 值，与 tego-os 主题一致）
  // tego-os: primary=hsl(230,83%,60%), foreground=hsl(222,84%,5%), border=hsl(214,32%,91%)
  styles.push(`
    :root, :host, .a2ui-root {
      /* Primary - tego-os 蓝色主题 */
      --p-0: hsl(0 0% 100%);
      --p-5: hsl(230 83% 97%);
      --p-10: hsl(230 83% 94%);
      --p-15: hsl(230 83% 90%);
      --p-20: hsl(230 83% 85%);
      --p-25: hsl(230 83% 80%);
      --p-30: hsl(230 83% 70%);
      --p-35: hsl(230 83% 60%);
      --p-40: hsl(230 83% 55%);
      --p-50: hsl(230 83% 50%);
      --p-60: hsl(230 83% 45%);
      --p-70: hsl(230 83% 40%);
      --p-80: hsl(230 83% 35%);
      --p-90: hsl(230 83% 28%);
      --p-95: hsl(230 83% 23%);
      --p-98: hsl(230 83% 18%);
      --p-99: hsl(230 83% 15%);
      --p-100: hsl(230 83% 10%);

      /* Neutral - tego-os 灰色系（带轻微蓝调） */
      --n-0: hsl(0 0% 100%);
      --n-5: hsl(210 40% 98%);
      --n-10: hsl(210 40% 96%);
      --n-15: hsl(214 32% 94%);
      --n-20: hsl(214 32% 91%);
      --n-25: hsl(214 32% 85%);
      --n-30: hsl(215 20% 70%);
      --n-35: hsl(215 16% 60%);
      --n-40: hsl(215 16% 50%);
      --n-50: hsl(215 16% 47%);
      --n-60: hsl(220 14% 35%);
      --n-70: hsl(220 20% 25%);
      --n-80: hsl(222 40% 15%);
      --n-90: hsl(222 84% 10%);
      --n-95: hsl(222 84% 7%);
      --n-98: hsl(222 84% 6%);
      --n-99: hsl(222 84% 5.5%);
      --n-100: hsl(222 84% 5%);

      /* Secondary - 次要色（浅灰） */
      --s-0: hsl(0 0% 100%);
      --s-5: hsl(210 40% 98%);
      --s-10: hsl(210 40% 96%);
      --s-15: hsl(210 40% 94%);
      --s-20: hsl(210 40% 90%);
      --s-25: hsl(210 40% 85%);
      --s-30: hsl(210 40% 80%);
      --s-35: hsl(210 40% 70%);
      --s-40: hsl(210 40% 60%);
      --s-50: hsl(210 40% 50%);
      --s-60: hsl(210 40% 40%);
      --s-70: hsl(210 40% 30%);
      --s-80: hsl(210 40% 20%);
      --s-90: hsl(210 40% 15%);
      --s-95: hsl(210 40% 10%);
      --s-98: hsl(210 40% 7%);
      --s-99: hsl(210 40% 5%);
      --s-100: hsl(210 40% 3%);

      /* Tertiary - 强调色（绿色） */
      --t-0: hsl(0 0% 100%);
      --t-5: hsl(142 76% 97%);
      --t-10: hsl(142 76% 90%);
      --t-15: hsl(142 76% 80%);
      --t-20: hsl(142 76% 70%);
      --t-25: hsl(142 76% 60%);
      --t-30: hsl(142 76% 50%);
      --t-35: hsl(142 76% 45%);
      --t-40: hsl(142 76% 40%);
      --t-50: hsl(142 76% 36%);
      --t-60: hsl(142 76% 32%);
      --t-70: hsl(142 76% 28%);
      --t-80: hsl(142 76% 24%);
      --t-90: hsl(142 76% 20%);
      --t-95: hsl(142 76% 16%);
      --t-98: hsl(142 76% 12%);
      --t-99: hsl(142 76% 10%);
      --t-100: hsl(142 76% 8%);

      /* Neutral Variant - 灰色变体 */
      --nv-0: hsl(0 0% 100%);
      --nv-5: hsl(210 40% 98%);
      --nv-10: hsl(210 40% 96%);
      --nv-15: hsl(214 32% 94%);
      --nv-20: hsl(214 32% 91%);
      --nv-25: hsl(214 32% 85%);
      --nv-30: hsl(215 20% 70%);
      --nv-35: hsl(215 16% 60%);
      --nv-40: hsl(215 16% 50%);
      --nv-50: hsl(215 16% 47%);
      --nv-60: hsl(220 14% 35%);
      --nv-70: hsl(220 20% 25%);
      --nv-80: hsl(222 40% 15%);
      --nv-90: hsl(222 84% 10%);
      --nv-95: hsl(222 84% 7%);
      --nv-98: hsl(222 84% 6%);
      --nv-99: hsl(222 84% 5.5%);
      --nv-100: hsl(222 84% 5%);

      /* Error - 红色（危险/错误） */
      --e-0: hsl(0 0% 100%);
      --e-5: hsl(0 84% 97%);
      --e-10: hsl(0 84% 92%);
      --e-15: hsl(0 84% 85%);
      --e-20: hsl(0 84% 78%);
      --e-25: hsl(0 84% 72%);
      --e-30: hsl(0 84% 66%);
      --e-35: hsl(0 84% 60%);
      --e-40: hsl(0 84% 55%);
      --e-50: hsl(0 84% 50%);
      --e-60: hsl(0 84% 45%);
      --e-70: hsl(0 84% 40%);
      --e-80: hsl(0 84% 35%);
      --e-90: hsl(0 84% 28%);
      --e-95: hsl(0 84% 22%);
      --e-98: hsl(0 84% 16%);
      --e-99: hsl(0 84% 12%);
      --e-100: hsl(0 84% 8%);

      /* Color scheme */
      color-scheme: light dark;
    }
  `);

  // 4. 生成各调色板颜色类（向后兼容）
  for (const prefix of PALETTE_KEYS) {
    styles.push(generatePaletteColors(prefix));
  }

  // 5. 特殊颜色类
  styles.push(`
    .a2-bgc-transparent { background-color: transparent; }
    .a2-c-inherit { color: inherit; }
    .a2-c-current { color: currentColor; }
    .a2-bc-transparent { border-color: transparent; }
    .a2-bc-current { border-color: currentColor; }
  `);

  return styles.join('\n');
}

export const colorStyles = generateColorStyles();
