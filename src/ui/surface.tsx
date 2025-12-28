/**
 * A2UI Surface Component
 * 渲染整个 Surface
 */

import type { A2UIAction } from '../events/a2ui';
import type { MessageProcessor, Surface as SurfaceState, SurfaceID } from '../types/types';

import { Root } from './root';

/**
 * Primary 色阶覆盖配置
 * 用于自定义 A2UI 组件的主题色
 */
export interface PrimaryColorScale {
  '--p-5'?: string;
  '--p-10'?: string;
  '--p-15'?: string;
  '--p-20'?: string;
  '--p-25'?: string;
  '--p-30'?: string;
  '--p-35'?: string;  // 按钮背景色
  '--p-40'?: string;
  '--p-50'?: string;  // 主色
  '--p-60'?: string;
  '--p-70'?: string;
  '--p-80'?: string;
  '--p-90'?: string;
  '--p-95'?: string;
}

export interface SurfaceProps {
  surfaceId: SurfaceID;
  surface: SurfaceState | null;
  processor: MessageProcessor | null;
  enableCustomElements?: boolean;
  onAction?: (event: A2UIAction) => void;
  /**
   * 主题色覆盖
   * 传入 CSS 变量覆盖 A2UI 默认的 primary 色阶
   * @example
   * ```tsx
   * <Surface
   *   themeColors={{
   *     '--p-35': 'oklch(72% 0.16 250)',
   *     '--p-50': 'oklch(63% 0.19 250)',
   *   }}
   * />
   * ```
   */
  themeColors?: PrimaryColorScale;
}

export function Surface({
  surfaceId,
  surface,
  processor,
  enableCustomElements = false,
  onAction,
  themeColors,
}: SurfaceProps) {
  if (!surface) {
    return null;
  }

  const renderLogo = () => {
    if (!surface.styles?.logoUrl) {
      return null;
    }

    return (
      <div className="a2-mb-4 a2-dsp-flexhor a2-jc-center">
        <img
          src={surface.styles.logoUrl}
          alt="Logo"
          className="a2-w-50"
          style={{ maxWidth: '220px' }}
        />
      </div>
    );
  };

  const renderSurface = () => {
    return (
      <Root
        surfaceId={surfaceId}
        processor={processor}
        childComponents={surface.componentTree ? [surface.componentTree] : null}
        enableCustomElements={enableCustomElements}
        onAction={onAction}
      />
    );
  };

  // 合并样式：themeColors 覆盖 + surface.styles.primaryColor 兼容
  const styleOverrides = {
    paddingBottom: '80px',
    ...themeColors,
    // 兼容旧的 primaryColor 配置
    ...(surface.styles?.primaryColor && !themeColors?.['--p-50'] 
      ? { '--p-50': surface.styles.primaryColor } 
      : {}),
  } as React.CSSProperties;

  return (
    <div
      className="a2ui-surface a2ui-root a2-dsp-flexvert a2-gap-8 a2-p-10"
      style={styleOverrides}
    >
      {renderLogo()}
      {renderSurface()}
    </div>
  );
}
