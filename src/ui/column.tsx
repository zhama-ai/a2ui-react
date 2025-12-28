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
  start: 'a2-al-start',
  center: 'a2-al-center',
  end: 'a2-al-end',
  stretch: 'a2-al-stretch',
};

const distributionMap: Record<string, string> = {
  start: 'a2-jc-start',
  center: 'a2-jc-center',
  end: 'a2-jc-end',
  spaceBetween: 'a2-jc-between',
  spaceAround: 'a2-jc-around',
  spaceEvenly: 'a2-jc-evenly',
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
  const spaceYValue = props.spaceY;

  // 使用内联样式支持动态间距值（1 单位 = 4px）
  const style = spaceYValue !== undefined ? { gap: `${spaceYValue * 4}px` } : undefined;

  return (
    <section
      className={cn(theme.components.Column, alignmentClass, distributionClass)}
      style={style}
    >
      {children}
    </section>
  );
}
