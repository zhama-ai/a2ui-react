/**
 * A2UI Color Styles
 *
 * 生成颜色相关的 CSS 工具类
 * 支持 light-dark() 自动适配亮暗主题
 */

import { SHADES, PALETTE_KEYS, toProp, getInverseKey } from './shared';

/**
 * 生成调色板颜色样式
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
 * 生成颜色样式 CSS
 */
export function generateColorStyles(): string {
  const styles: string[] = [];

  // CSS 变量定义 - 调色板（使用 :root 确保全局可用）
  styles.push(`
    :root, :host, .a2ui-root {
      /* Primary */
      --p-0: oklch(100% 0 0);
      --p-5: oklch(97.8% 0.014 238.66);
      --p-10: oklch(95.3% 0.026 236.62);
      --p-15: oklch(92.8% 0.039 235.74);
      --p-20: oklch(90.3% 0.052 235.13);
      --p-25: oklch(87.8% 0.064 234.68);
      --p-30: oklch(85.3% 0.076 234.33);
      --p-35: oklch(78.8% 0.108 233.32);
      --p-40: oklch(72.3% 0.139 232.51);
      --p-50: oklch(64.8% 0.161 232.01);
      --p-60: oklch(57.3% 0.174 231.57);
      --p-70: oklch(49.8% 0.171 231.41);
      --p-80: oklch(42.3% 0.154 231.36);
      --p-90: oklch(34.8% 0.128 231.43);
      --p-95: oklch(29.8% 0.105 231.5);
      --p-98: oklch(26.3% 0.088 231.55);
      --p-99: oklch(24.8% 0.079 231.58);
      --p-100: oklch(23.3% 0.071 231.6);

      /* Secondary */
      --s-0: oklch(100% 0 0);
      --s-5: oklch(97.8% 0.012 285);
      --s-10: oklch(95.3% 0.024 285);
      --s-15: oklch(92.8% 0.036 285);
      --s-20: oklch(90.3% 0.048 285);
      --s-25: oklch(87.8% 0.06 285);
      --s-30: oklch(85.3% 0.072 285);
      --s-35: oklch(78.8% 0.096 285);
      --s-40: oklch(72.3% 0.12 285);
      --s-50: oklch(64.8% 0.144 285);
      --s-60: oklch(57.3% 0.156 285);
      --s-70: oklch(49.8% 0.156 285);
      --s-80: oklch(42.3% 0.14 285);
      --s-90: oklch(34.8% 0.116 285);
      --s-95: oklch(29.8% 0.096 285);
      --s-98: oklch(26.3% 0.08 285);
      --s-99: oklch(24.8% 0.072 285);
      --s-100: oklch(23.3% 0.064 285);

      /* Tertiary */
      --t-0: oklch(100% 0 0);
      --t-5: oklch(97.8% 0.012 160);
      --t-10: oklch(95.3% 0.024 160);
      --t-15: oklch(92.8% 0.036 160);
      --t-20: oklch(90.3% 0.048 160);
      --t-25: oklch(87.8% 0.06 160);
      --t-30: oklch(85.3% 0.072 160);
      --t-35: oklch(78.8% 0.096 160);
      --t-40: oklch(72.3% 0.12 160);
      --t-50: oklch(64.8% 0.144 160);
      --t-60: oklch(57.3% 0.156 160);
      --t-70: oklch(49.8% 0.156 160);
      --t-80: oklch(42.3% 0.14 160);
      --t-90: oklch(34.8% 0.116 160);
      --t-95: oklch(29.8% 0.096 160);
      --t-98: oklch(26.3% 0.08 160);
      --t-99: oklch(24.8% 0.072 160);
      --t-100: oklch(23.3% 0.064 160);

      /* Neutral */
      --n-0: oklch(100% 0 0);
      --n-5: oklch(97% 0 0);
      --n-10: oklch(94% 0 0);
      --n-15: oklch(91% 0 0);
      --n-20: oklch(88% 0 0);
      --n-25: oklch(85% 0 0);
      --n-30: oklch(82% 0 0);
      --n-35: oklch(75% 0 0);
      --n-40: oklch(68% 0 0);
      --n-50: oklch(58% 0 0);
      --n-60: oklch(48% 0 0);
      --n-70: oklch(38% 0 0);
      --n-80: oklch(30% 0 0);
      --n-90: oklch(22% 0 0);
      --n-95: oklch(18% 0 0);
      --n-98: oklch(15% 0 0);
      --n-99: oklch(13% 0 0);
      --n-100: oklch(11% 0 0);

      /* Neutral Variant */
      --nv-0: oklch(100% 0 0);
      --nv-5: oklch(97% 0.006 240);
      --nv-10: oklch(94% 0.012 240);
      --nv-15: oklch(91% 0.018 240);
      --nv-20: oklch(88% 0.024 240);
      --nv-25: oklch(85% 0.03 240);
      --nv-30: oklch(82% 0.036 240);
      --nv-35: oklch(75% 0.048 240);
      --nv-40: oklch(68% 0.06 240);
      --nv-50: oklch(58% 0.072 240);
      --nv-60: oklch(48% 0.078 240);
      --nv-70: oklch(38% 0.078 240);
      --nv-80: oklch(30% 0.07 240);
      --nv-90: oklch(22% 0.058 240);
      --nv-95: oklch(18% 0.048 240);
      --nv-98: oklch(15% 0.04 240);
      --nv-99: oklch(13% 0.036 240);
      --nv-100: oklch(11% 0.032 240);

      /* Error */
      --e-0: oklch(100% 0 0);
      --e-5: oklch(97.8% 0.016 25);
      --e-10: oklch(95.3% 0.032 25);
      --e-15: oklch(92.8% 0.048 25);
      --e-20: oklch(90.3% 0.064 25);
      --e-25: oklch(87.8% 0.08 25);
      --e-30: oklch(85.3% 0.096 25);
      --e-35: oklch(78.8% 0.128 25);
      --e-40: oklch(72.3% 0.16 25);
      --e-50: oklch(64.8% 0.192 25);
      --e-60: oklch(57.3% 0.208 25);
      --e-70: oklch(49.8% 0.208 25);
      --e-80: oklch(42.3% 0.187 25);
      --e-90: oklch(34.8% 0.155 25);
      --e-95: oklch(29.8% 0.128 25);
      --e-98: oklch(26.3% 0.107 25);
      --e-99: oklch(24.8% 0.096 25);
      --e-100: oklch(23.3% 0.086 25);

      /* Color scheme */
      color-scheme: var(--a2-color-scheme, light dark);
    }
  `);

  // 生成各调色板颜色类
  for (const prefix of PALETTE_KEYS) {
    styles.push(generatePaletteColors(prefix));
  }

  // 特殊颜色类
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

