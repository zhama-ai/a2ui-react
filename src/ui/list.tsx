/**
 * A2UI List Component
 */

import type { ReactNode } from 'react';

import { useTheme } from '../context/theme';
import type { AnyComponentNode, MessageProcessor, SurfaceID, ResolvedList } from '../types/types';

import { cn } from './utils';

export interface ListProps {
  component: AnyComponentNode;
  processor: MessageProcessor | null;
  surfaceId: SurfaceID | null;
  direction?: ResolvedList['direction'];
  children?: ReactNode;
}

export function List({ direction = 'vertical', children }: ListProps) {
  const theme = useTheme();

  const directionClass = direction === 'horizontal' ? 'a2-flex-row a2-overflow-x-auto' : 'a2-flex-col';

  return <section className={cn(theme.components.List, directionClass)}>{children}</section>;
}
