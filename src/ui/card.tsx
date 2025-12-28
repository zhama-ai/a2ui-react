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

  // 支持动态padding - 从component.properties.padding读取
  const properties = (component as any).properties ?? {};
  const paddingValue = properties.padding;
  const style = paddingValue !== undefined ? { padding: `${paddingValue * 0.25}rem` } : undefined;

  return (
    <section className={cn(theme.components.Card)} style={style}>
      {children}
    </section>
  );
}
