/**
 * A2UI Border Styles
 *
 * 生成边框相关的 CSS 工具类
 */

import { GRID } from './shared';

/**
 * 生成边框样式 CSS
 */
export function generateBorderStyles(): string {
  const styles: string[] = [];

  // Border radius (0-24 * GRID)
  for (let i = 0; i <= 24; i++) {
    styles.push(`.a2-br-${i} { border-radius: ${i * GRID}px; }`);
  }

  // Special border radius
  styles.push(`
    .a2-br-none { border-radius: 0; }
    .a2-br-sm { border-radius: 2px; }
    .a2-br-md { border-radius: 6px; }
    .a2-br-lg { border-radius: 8px; }
    .a2-br-xl { border-radius: 12px; }
    .a2-br-2xl { border-radius: 16px; }
    .a2-br-3xl { border-radius: 24px; }
    .a2-br-full { border-radius: 9999px; }
    .a2-br-50pc { border-radius: 50%; }
  `);

  // Border radius for specific corners
  for (let i = 0; i <= 8; i++) {
    const val = i * GRID;
    styles.push(`
      .a2-br-t-${i} { border-top-left-radius: ${val}px; border-top-right-radius: ${val}px; }
      .a2-br-r-${i} { border-top-right-radius: ${val}px; border-bottom-right-radius: ${val}px; }
      .a2-br-b-${i} { border-bottom-left-radius: ${val}px; border-bottom-right-radius: ${val}px; }
      .a2-br-l-${i} { border-top-left-radius: ${val}px; border-bottom-left-radius: ${val}px; }
      .a2-br-tl-${i} { border-top-left-radius: ${val}px; }
      .a2-br-tr-${i} { border-top-right-radius: ${val}px; }
      .a2-br-bl-${i} { border-bottom-left-radius: ${val}px; }
      .a2-br-br-${i} { border-bottom-right-radius: ${val}px; }
    `);
  }

  // Border width (0-8 px)
  for (let i = 0; i <= 8; i++) {
    styles.push(`
      .a2-bw-${i} { border-width: ${i}px; }
      .a2-bw-t-${i} { border-top-width: ${i}px; }
      .a2-bw-r-${i} { border-right-width: ${i}px; }
      .a2-bw-b-${i} { border-bottom-width: ${i}px; }
      .a2-bw-l-${i} { border-left-width: ${i}px; }
      .a2-bw-x-${i} { border-left-width: ${i}px; border-right-width: ${i}px; }
      .a2-bw-y-${i} { border-top-width: ${i}px; border-bottom-width: ${i}px; }
    `);
  }

  // Border style
  styles.push(`
    .a2-bs-none { border-style: none; }
    .a2-bs-solid { border-style: solid; }
    .a2-bs-dashed { border-style: dashed; }
    .a2-bs-dotted { border-style: dotted; }
    .a2-bs-double { border-style: double; }
    .a2-bs-hidden { border-style: hidden; }
  `);

  // Border shorthand
  styles.push(`
    .a2-border { border-width: 1px; border-style: solid; }
    .a2-border-t { border-top-width: 1px; border-top-style: solid; }
    .a2-border-r { border-right-width: 1px; border-right-style: solid; }
    .a2-border-b { border-bottom-width: 1px; border-bottom-style: solid; }
    .a2-border-l { border-left-width: 1px; border-left-style: solid; }
    .a2-border-x { border-left-width: 1px; border-right-width: 1px; border-left-style: solid; border-right-style: solid; }
    .a2-border-y { border-top-width: 1px; border-bottom-width: 1px; border-top-style: solid; border-bottom-style: solid; }
    .a2-border-none { border: none; }
  `);

  // Divide (for lists)
  styles.push(`
    .a2-divide-y > * + * { border-top-width: 1px; border-top-style: solid; }
    .a2-divide-x > * + * { border-left-width: 1px; border-left-style: solid; }
  `);

  // Outline
  styles.push(`
    .a2-outline-none { outline: 2px solid transparent; outline-offset: 2px; }
    .a2-outline { outline-style: solid; }
    .a2-outline-dashed { outline-style: dashed; }
    .a2-outline-dotted { outline-style: dotted; }
    .a2-outline-double { outline-style: double; }
  `);

  // Ring (focus ring)
  styles.push(`
    .a2-ring-0 { box-shadow: 0 0 0 0px var(--a2-ring-color, currentColor); }
    .a2-ring-1 { box-shadow: 0 0 0 1px var(--a2-ring-color, currentColor); }
    .a2-ring-2 { box-shadow: 0 0 0 2px var(--a2-ring-color, currentColor); }
    .a2-ring-4 { box-shadow: 0 0 0 4px var(--a2-ring-color, currentColor); }
    .a2-ring-inset { box-shadow: inset 0 0 0 2px var(--a2-ring-color, currentColor); }
    .a2-ring-primary { --a2-ring-color: light-dark(var(--p-35), var(--p-60)); }
  `);

  return styles.join('\n');
}

export const borderStyles = generateBorderStyles();
