import * as LucideIcons from 'lucide-react';

import { useTheme } from '../context/theme';
import type { AnyComponentNode, MessageProcessor, SurfaceID, ResolvedIcon } from '../types/types';

import { extractStringValue, cn } from './utils';

export interface IconProps {
  component: AnyComponentNode;
  processor: MessageProcessor | null;
  surfaceId: SurfaceID | null;
  name: ResolvedIcon['name'];
  size?: number | string;
  className?: string;
  /**
   * 是否使用容器包裹 (类似首页风格)
   */
  container?: boolean;
  /**
   * 容器颜色变体: blue, green, purple, orange, primary, etc.
   */
  variant?: string;
}

export function Icon({
  component,
  processor,
  surfaceId,
  name,
  size = 20,
  className,
  container,
  variant,
}: IconProps) {
  const theme = useTheme();

  const iconName = extractStringValue(name, component, processor, surfaceId);

  if (!iconName) {
    return null;
  }

  // 1. 尝试作为 Lucide Icon 渲染 (PascalCase)
  const pascalName = iconName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  // @ts-expect-error - Dynamic icon lookup from Lucide library using computed string keys
  const LucideIcon = LucideIcons[pascalName] ?? LucideIcons[iconName];

  // 变体样式映射 - 使用 CSS 变量定义的颜色
  const variantStyles: Record<string, React.CSSProperties> = {
    blue: { backgroundColor: 'oklch(95% 0.04 240)', color: 'oklch(55% 0.15 240)' },
    green: { backgroundColor: 'oklch(95% 0.04 160)', color: 'oklch(55% 0.15 160)' },
    purple: { backgroundColor: 'oklch(95% 0.04 285)', color: 'oklch(55% 0.15 285)' },
    orange: { backgroundColor: 'oklch(95% 0.04 60)', color: 'oklch(55% 0.15 60)' },
    red: { backgroundColor: 'oklch(95% 0.04 25)', color: 'oklch(55% 0.15 25)' },
    primary: {
      backgroundColor: 'light-dark(var(--p-5), var(--p-95))',
      color: 'light-dark(var(--p-50), var(--p-40))',
    },
  };

  const variantStyle = variant ? variantStyles[variant] : variantStyles.primary;

  // 检测是否为 loading 类图标，自动添加旋转动画
  const isLoadingIcon = iconName === 'loader-2' || iconName === 'loader';
  const animationClass = isLoadingIcon ? 'a2-animate-spin' : '';

  const renderIcon = () => {
    if (LucideIcon) {
      return (
        <LucideIcon size={size} className={cn(theme.components.Icon, animationClass, className)} />
      );
    }

    return (
      <span
        className={cn(theme.components.Icon, animationClass, 'material-icons', className)}
        style={{ fontSize: size }}
      >
        {iconName}
      </span>
    );
  };

  if (container) {
    return (
      <div
        className="a2-dsp-flex a2-flex-0 a2-al-center a2-jc-center a2-br-xl a2-transition"
        style={{ width: 40, height: 40, ...variantStyle }}
      >
        {renderIcon()}
      </div>
    );
  }

  return renderIcon();
}
