/**
 * A2UI Row Component
 */

import type { ReactNode } from 'react';

import { useTheme } from '../context/theme';
import type { AnyComponentNode, MessageProcessor, SurfaceID, ResolvedRow } from '../types/types';

import { cn } from './utils';

export interface RowProps {
  component: AnyComponentNode;
  processor: MessageProcessor | null;
  surfaceId: SurfaceID | null;
  alignment?: ResolvedRow['alignment'];
  distribution?: ResolvedRow['distribution'];
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

export function Row({
  component,
  alignment = 'stretch',
  distribution = 'start',
  children,
}: RowProps) {
  const theme = useTheme();

  const alignmentClass = alignmentMap[alignment] ?? alignmentMap.stretch;
  const distributionClass = distributionMap[distribution] ?? distributionMap.start;

  // 支持通过属性动态设置间距
  const props = (component as any).properties ?? {};
  const gap = props.gap !== undefined ? `gap-${props.gap}` : '';

  return (
    <section className={cn(theme.components.Row, alignmentClass, distributionClass, gap)}>
      {children}
    </section>
  );
}
