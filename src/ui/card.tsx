/**
 * A2UI Card Component
 */

import type { ReactNode } from 'react';

import { useTheme } from '../context/theme';
import type { AnyComponentNode, MessageProcessor, SurfaceID } from '../types/types';

import { cn } from './utils';

export interface CardProps {
  component: AnyComponentNode;
  processor: MessageProcessor | null;
  surfaceId: SurfaceID | null;
  children?: ReactNode;
}

export function Card({ component, children }: CardProps) {
  const theme = useTheme();

  // 从 component.properties 获取额外的 classes（v0.9 协议中 classes 在 properties 中）
  const properties =
    (component as { properties?: { padding?: number; classes?: string[] } }).properties ?? {};
  const extraClasses = properties.classes ?? [];

  // 支持动态padding
  const paddingValue = properties.padding;
  const style = paddingValue !== undefined ? { padding: `${paddingValue * 0.25}rem` } : undefined;

  return (
    <section className={cn(theme.components.Card, ...extraClasses)} style={style}>
      {children}
    </section>
  );
}
