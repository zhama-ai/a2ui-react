/**
 * A2UI Divider Component
 */

import { useTheme } from '../context/theme';
import type {
  AnyComponentNode,
  MessageProcessor,
  SurfaceID,
  ResolvedDivider,
} from '../types/types';

import { cn } from './utils';

export interface DividerProps {
  component: AnyComponentNode;
  processor: MessageProcessor | null;
  surfaceId: SurfaceID | null;
  axis?: ResolvedDivider['axis'];
  thickness?: ResolvedDivider['thickness'];
  color?: ResolvedDivider['color'];
}

export function Divider({ axis = 'horizontal', thickness = 1, color }: DividerProps) {
  const theme = useTheme();

  const style: React.CSSProperties = {};
  if (color) {
    style.borderColor = color;
  }
  if (thickness) {
    style.borderWidth = thickness;
  }

  const axisClass = axis === 'vertical' ? 'border-l h-full' : 'border-t w-full';

  return <hr className={cn(theme.components.Divider, axisClass)} style={style} />;
}
