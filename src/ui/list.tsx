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
  /**
   * 网格列数（仅在 direction='grid' 时生效）
   * @default 2
   */
  columns?: number;
  children?: ReactNode;
}

export function List({ component, direction = 'vertical', columns = 2, children }: ListProps) {
  const theme = useTheme();

  // 从组件属性获取网格列数
  const props = (component as any)?.properties ?? {};
  const gridColumns = props.columns ?? columns;

  // 根据方向选择布局类
  let directionClass: string;
  let style: React.CSSProperties | undefined;

  // 获取 theme 类，在 grid 模式下过滤掉 flex 相关类以避免冲突
  let themeClasses = theme.components.List;
  if (direction === 'grid' && typeof themeClasses === 'object') {
    themeClasses = Object.fromEntries(
      Object.entries(themeClasses).filter(
        ([key]) => !key.includes('flex') && !key.includes('flexvert') && !key.includes('flexhor')
      )
    );
  }

  switch (direction) {
    case 'horizontal':
      directionClass = 'a2-flex-row a2-overflow-x-auto';
      break;
    case 'grid':
      directionClass = 'a2-dsp-grid';
      style = {
        gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
      };
      break;
    default: // vertical
      directionClass = 'a2-flex-col';
  }

  return (
    <section className={cn(themeClasses, directionClass)} style={style}>
      {children}
    </section>
  );
}
