/**
 * A2UI Tabs Component
 */

import { useState, type ReactNode } from 'react';

import { useTheme } from '../context/theme';
import { merge } from '../styles/utils';
import type { StringValue } from '../types/primitives';
import type { AnyComponentNode, MessageProcessor, SurfaceID } from '../types/types';

import { extractStringValue, cn } from './utils';

export interface TabsProps {
  component: AnyComponentNode;
  processor: MessageProcessor | null;
  surfaceId: SurfaceID | null;
  titles: StringValue[];
  children?: ReactNode[];
}

export function Tabs({ component, processor, surfaceId, titles, children }: TabsProps) {
  const theme = useTheme();
  const [selected, setSelected] = useState(0);

  const renderTabs = () => {
    return (
      <div className={cn(theme.components.Tabs.element)}>
        {titles.map((title, idx) => {
          const titleString = extractStringValue(title, component, processor, surfaceId);

          const classes =
            selected === idx
              ? merge(theme.components.Tabs.controls.all, theme.components.Tabs.controls.selected)
              : { ...theme.components.Tabs.controls.all };

          return (
            <button
              key={idx}
              disabled={selected === idx}
              className={cn(classes)}
              onClick={() => setSelected(idx)}
            >
              {titleString}
            </button>
          );
        })}
      </div>
    );
  };

  const selectedChild = children?.[selected];

  return (
    <section className={cn(theme.components.Tabs.container)}>
      {renderTabs()}
      <div className="mt-4">{selectedChild}</div>
    </section>
  );
}
