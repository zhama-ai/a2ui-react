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

export function Card({ children }: CardProps) {
  const theme = useTheme();

  return <section className={cn(theme.components.Card)}>{children}</section>;
}
