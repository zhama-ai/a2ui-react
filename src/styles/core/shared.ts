/**
 * A2UI Shared Style Constants
 *
 * 基础设计常量，参照官方 A2UI Lit 实现
 */

/** 基础网格单位 (px) */
export const GRID = 4;

/** 调色板色调值 */
export const SHADES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100] as const;

/** 调色板前缀 */
export const PALETTE_KEYS = ['p', 's', 't', 'n', 'nv', 'e'] as const;

export type Shade = (typeof SHADES)[number];
export type PaletteKey = (typeof PALETTE_KEYS)[number];

/**
 * 将样式键转换为 CSS 变量名
 * 例如: "p35" -> "--p-35", "n0" -> "--n-0"
 */
export function toProp(key: string): string {
  // 在字母和数字之间插入破折号
  const formatted = key.replace(/([a-z]+)(\d+)/, '$1-$2');
  return `--${formatted}`;
}

/**
 * 获取反转的色调 (用于暗色模式)
 */
export function getInverseKey(key: string): string {
  const match = key.match(/^([a-z]+)(\d+)$/);
  if (!match) return key;

  const prefix = match[1];
  const shadeStr = match[2];
  if (!prefix || !shadeStr) return key;

  const shade = parseInt(shadeStr, 10);
  const target = 100 - shade;

  const inverseShade = SHADES.reduce((prev, curr) =>
    Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev
  );

  return `${prefix}${inverseShade}`;
}

