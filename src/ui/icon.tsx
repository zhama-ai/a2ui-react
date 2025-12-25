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

  const variantMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600',
    primary: 'bg-primary/10 text-primary',
  };

  const variantClass = variant ? variantMap[variant] : variantMap.primary;

  const renderIcon = () => {
    if (LucideIcon) {
      return <LucideIcon size={size} className={cn(theme.components.Icon, className)} />;
    }

    return (
      <span
        className={cn(theme.components.Icon, 'material-icons', className)}
        style={{ fontSize: size }}
      >
        {iconName}
      </span>
    );
  };

  if (container) {
    return (
      <div
        className={cn(
          'flex shrink-0 items-center justify-center rounded-xl transition-all duration-300',
          'group-hover:scale-110 group-hover:shadow-sm',
          variantClass
        )}
        style={{ width: 40, height: 40 }}
      >
        {renderIcon()}
      </div>
    );
  }

  return renderIcon();
}
