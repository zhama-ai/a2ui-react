/**
 * A2UI Theme
 *
 * 主题配置和注入接口
 *
 * 使用方式：
 * ```ts
 * import { injectTheme, tegoOSTheme } from '@zhama/a2ui/styles';
 *
 * // 使用预设主题
 * injectTheme(tegoOSTheme);
 *
 * // 或自定义主题
 * injectTheme({
 *   primary: '230 83% 60%',
 *   foreground: '222 84% 5%',
 *   border: '214 32% 91%',
 * });
 * ```
 */

export interface A2UITheme {
  // Primary colors
  primary?: string;
  primaryForeground?: string;

  // Secondary colors
  secondary?: string;
  secondaryForeground?: string;

  // Muted colors
  muted?: string;
  mutedForeground?: string;

  // Accent colors
  accent?: string;
  accentForeground?: string;

  // Destructive colors
  destructive?: string;
  destructiveForeground?: string;

  // Background & Foreground
  background?: string;
  foreground?: string;

  // Card colors
  card?: string;
  cardForeground?: string;

  // Popover colors
  popover?: string;
  popoverForeground?: string;

  // Border & Input
  border?: string;
  input?: string;
  ring?: string;

  // Status colors
  success?: string;
  successForeground?: string;
  warning?: string;
  warningForeground?: string;
  info?: string;
  infoForeground?: string;

  // Layout
  radius?: string;
  radiusSm?: string;
  radiusLg?: string;

  // Fonts
  fontSans?: string;
  fontMono?: string;

  // Shadows
  shadowSm?: string;
  shadow?: string;
  shadowMd?: string;
  shadowLg?: string;
}

/**
 * 预设主题：Tego OS
 * 与 tego-os 的 shadcn/tailwind 主题完全一致
 */
export const tegoOSTheme: A2UITheme = {
  // Primary - 蓝色主题
  primary: '230 83% 60%',
  primaryForeground: '210 40% 98%',

  // Secondary
  secondary: '210 40% 96%',
  secondaryForeground: '222 84% 5%',

  // Muted
  muted: '210 40% 96%',
  mutedForeground: '215 16% 47%',

  // Accent
  accent: '210 40% 96%',
  accentForeground: '222 84% 5%',

  // Destructive
  destructive: '0 84% 60%',
  destructiveForeground: '210 40% 98%',

  // Background & Foreground
  background: '0 0% 100%',
  foreground: '222 84% 5%',

  // Card
  card: '0 0% 100%',
  cardForeground: '222 84% 5%',

  // Popover
  popover: '0 0% 100%',
  popoverForeground: '222 84% 5%',

  // Border & Input
  border: '214 32% 91%',
  input: '214 32% 91%',
  ring: '230 83% 60%',

  // Status
  success: '142 76% 36%',
  successForeground: '0 0% 98%',
  warning: '38 92% 50%',
  warningForeground: '0 0% 98%',
  info: '199 89% 48%',
  infoForeground: '0 0% 98%',

  // Layout
  radius: '0.5rem',
  radiusSm: '0.25rem',
  radiusLg: '0.75rem',
};

/**
 * 预设主题：Tego OS 暗色
 */
export const tegoOSDarkTheme: A2UITheme = {
  primary: '230 85% 65%',
  primaryForeground: '0 0% 17%',

  secondary: '0 0% 22%',
  secondaryForeground: '0 0% 95%',

  muted: '0 0% 22%',
  mutedForeground: '0 0% 70%',

  accent: '0 0% 22%',
  accentForeground: '0 0% 95%',

  destructive: '0 63% 31%',
  destructiveForeground: '0 0% 95%',

  background: '0 0% 17%',
  foreground: '0 0% 95%',

  card: '0 0% 20%',
  cardForeground: '0 0% 95%',

  popover: '0 0% 17%',
  popoverForeground: '0 0% 95%',

  border: '0 0% 27%',
  input: '0 0% 30%',
  ring: '230 85% 65%',

  success: '142 70% 45%',
  warning: '38 92% 50%',
  info: '199 89% 48%',

  radius: '0.5rem',
  radiusSm: '0.25rem',
  radiusLg: '0.75rem',
};

/**
 * 注入主题变量到 DOM
 *
 * @param theme - 主题配置对象
 * @param target - 注入目标，默认为 document.documentElement
 */
export function injectTheme(
  theme: A2UITheme,
  target: HTMLElement = document.documentElement
): void {
  const themeMap: Record<keyof A2UITheme, string> = {
    primary: '--a2-primary',
    primaryForeground: '--a2-primary-foreground',
    secondary: '--a2-secondary',
    secondaryForeground: '--a2-secondary-foreground',
    muted: '--a2-muted',
    mutedForeground: '--a2-muted-foreground',
    accent: '--a2-accent',
    accentForeground: '--a2-accent-foreground',
    destructive: '--a2-destructive',
    destructiveForeground: '--a2-destructive-foreground',
    background: '--a2-background',
    foreground: '--a2-foreground',
    card: '--a2-card',
    cardForeground: '--a2-card-foreground',
    popover: '--a2-popover',
    popoverForeground: '--a2-popover-foreground',
    border: '--a2-border',
    input: '--a2-input',
    ring: '--a2-ring',
    success: '--a2-success',
    successForeground: '--a2-success-foreground',
    warning: '--a2-warning',
    warningForeground: '--a2-warning-foreground',
    info: '--a2-info',
    infoForeground: '--a2-info-foreground',
    radius: '--a2-radius',
    radiusSm: '--a2-radius-sm',
    radiusLg: '--a2-radius-lg',
    fontSans: '--a2-font-sans',
    fontMono: '--a2-font-mono',
    shadowSm: '--a2-shadow-sm',
    shadow: '--a2-shadow',
    shadowMd: '--a2-shadow-md',
    shadowLg: '--a2-shadow-lg',
  };

  for (const [key, value] of Object.entries(theme)) {
    if (value !== undefined) {
      const cssVar = themeMap[key as keyof A2UITheme];
      if (cssVar) {
        target.style.setProperty(cssVar, value);
      }
    }
  }
}

/**
 * 生成主题 CSS 字符串
 * 可用于 SSR 或 style 标签注入
 *
 * @param theme - 主题配置对象
 * @param selector - CSS 选择器，默认为 ':root'
 */
export function generateThemeCSS(theme: A2UITheme, selector: string = ':root'): string {
  const variables: string[] = [];

  const themeMap: Record<keyof A2UITheme, string> = {
    primary: '--a2-primary',
    primaryForeground: '--a2-primary-foreground',
    secondary: '--a2-secondary',
    secondaryForeground: '--a2-secondary-foreground',
    muted: '--a2-muted',
    mutedForeground: '--a2-muted-foreground',
    accent: '--a2-accent',
    accentForeground: '--a2-accent-foreground',
    destructive: '--a2-destructive',
    destructiveForeground: '--a2-destructive-foreground',
    background: '--a2-background',
    foreground: '--a2-foreground',
    card: '--a2-card',
    cardForeground: '--a2-card-foreground',
    popover: '--a2-popover',
    popoverForeground: '--a2-popover-foreground',
    border: '--a2-border',
    input: '--a2-input',
    ring: '--a2-ring',
    success: '--a2-success',
    successForeground: '--a2-success-foreground',
    warning: '--a2-warning',
    warningForeground: '--a2-warning-foreground',
    info: '--a2-info',
    infoForeground: '--a2-info-foreground',
    radius: '--a2-radius',
    radiusSm: '--a2-radius-sm',
    radiusLg: '--a2-radius-lg',
    fontSans: '--a2-font-sans',
    fontMono: '--a2-font-mono',
    shadowSm: '--a2-shadow-sm',
    shadow: '--a2-shadow',
    shadowMd: '--a2-shadow-md',
    shadowLg: '--a2-shadow-lg',
  };

  for (const [key, value] of Object.entries(theme)) {
    if (value !== undefined) {
      const cssVar = themeMap[key as keyof A2UITheme];
      if (cssVar) {
        variables.push(`  ${cssVar}: ${value};`);
      }
    }
  }

  return `${selector} {\n${variables.join('\n')}\n}`;
}
