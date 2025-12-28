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
      <div className="a2-mb-4 a2-dsp-flexhor a2-jc-center">
        <img
          src={surface.styles.logoUrl}
          alt="Logo"
          className="a2-w-50"
          style={{ maxWidth: '220px' }}
        />
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
      className="a2ui-surface a2ui-root a2-dsp-flexvert a2-gap-8 a2-p-10"
      style={
        {
          '--p-50': surface.styles?.primaryColor ?? 'var(--primary)',
          paddingBottom: '80px',
        } as React.CSSProperties
      }
    >
      {renderLogo()}
      {renderSurface()}
    </div>
  );
}
