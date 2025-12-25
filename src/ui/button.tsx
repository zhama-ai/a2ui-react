/**
 * A2UI Button Component
 */

import type { ReactNode } from 'react';

import { useTheme } from '../context/theme';
import type { A2UIAction } from '../events/a2ui';
import type { AnyComponentNode, MessageProcessor, SurfaceID, ResolvedButton } from '../types/types';

import { cn } from './utils';

export interface ButtonProps {
  component: AnyComponentNode;
  processor: MessageProcessor | null;
  surfaceId: SurfaceID | null;
  action: ResolvedButton['action'];
  children?: ReactNode;
  onAction?: (event: A2UIAction) => void;
}

export function Button({ component, action, children, onAction }: ButtonProps) {
  const theme = useTheme();

  const handleClick = () => {
    if (!action || !onAction) return;

    const event: A2UIAction = {
      eventType: 'a2ui.action',
      action,
      dataContextPath: component.dataContextPath ?? '/',
      sourceComponentId: component.id,
      sourceComponent: component,
    };

    onAction(event);
  };

  return (
    <button type="button" className={cn(theme.components.Button)} onClick={handleClick}>
      {children}
    </button>
  );
}
