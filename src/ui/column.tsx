/**
 * A2UI Column Component
 */

import type { ReactNode } from 'react';

import { useTheme } from '../context/theme';
import type { AnyComponentNode, MessageProcessor, SurfaceID, ResolvedColumn } from '../types/types';

import { cn } from './utils';

export interface ColumnProps {
  component: AnyComponentNode;
  processor: MessageProcessor | null;
  surfaceId: SurfaceID | null;
  alignment?: ResolvedColumn['alignment'];
  distribution?: ResolvedColumn['distribution'];
  children?: ReactNode;
}

const alignmentMap: Record<string, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const distributionMap: Record<string, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  spaceBetween: 'justify-between',
  spaceAround: 'justify-around',
  spaceEvenly: 'justify-evenly',
};

export function Column({
  component,
  alignment = 'stretch',
  distribution = 'start',
  children,
}: ColumnProps) {
  const theme = useTheme();

  const alignmentClass = alignmentMap[alignment] ?? alignmentMap.stretch;
  const distributionClass = distributionMap[distribution] ?? distributionMap.start;

  // 支持通过属性动态设置间距
  const props = (component as any).properties ?? {};
  const spaceY = props.spaceY !== undefined ? `space-y-${props.spaceY}` : '';

  return (
    <section className={cn(theme.components.Column, alignmentClass, distributionClass, spaceY)}>
      {children}
    </section>
  );
}
