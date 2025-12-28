/**
 * A2UI Video Component
 */

import { useTheme } from '../context/theme';
import type { AnyComponentNode, MessageProcessor, SurfaceID, ResolvedVideo } from '../types/types';

import { extractStringValue, cn } from './utils';

export interface VideoProps {
  component: AnyComponentNode;
  processor: MessageProcessor | null;
  surfaceId: SurfaceID | null;
  url: ResolvedVideo['url'];
}

export function Video({ component, processor, surfaceId, url }: VideoProps) {
  const theme = useTheme();

  const videoUrl = extractStringValue(url, component, processor, surfaceId);

  if (!videoUrl) {
    return <div className="a2-c-n50">(no video)</div>;
  }

  return (
    <section className={cn(theme.components.Video)}>
      <video controls src={videoUrl} className="a2-w-full" />
    </section>
  );
}
