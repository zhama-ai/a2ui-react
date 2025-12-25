/**
 * A2UI Surface Component
 * 渲染整个 Surface
 */

import type { A2UIAction } from '../events/a2ui';
import type { MessageProcessor, Surface as SurfaceState, SurfaceID } from '../types/types';

import { Root } from './root';

export interface SurfaceProps {
  surfaceId: SurfaceID;
  surface: SurfaceState | null;
  processor: MessageProcessor | null;
  enableCustomElements?: boolean;
  onAction?: (event: A2UIAction) => void;
}

export function Surface({
  surfaceId,
  surface,
  processor,
  enableCustomElements = false,
  onAction,
}: SurfaceProps) {
  if (!surface) {
    return null;
  }

  const renderLogo = () => {
    if (!surface.styles?.logoUrl) {
      return null;
    }

    return (
      <div className="mb-4 flex justify-center">
        <img src={surface.styles.logoUrl} alt="Logo" className="w-1/2 max-w-[220px]" />
      </div>
    );
  };

  const renderSurface = () => {
    return (
      <Root
        surfaceId={surfaceId}
        processor={processor}
        childComponents={surface.componentTree ? [surface.componentTree] : null}
        enableCustomElements={enableCustomElements}
        onAction={onAction}
      />
    );
  };

  return (
    <div
      className="a2ui-surface a2ui-root flex flex-col gap-8 p-10 pb-20"
      style={
        {
          '--p-50': surface.styles?.primaryColor ?? 'var(--primary)',
        } as React.CSSProperties
      }
    >
      {renderLogo()}
      {renderSurface()}
    </div>
  );
}
