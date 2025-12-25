/**
 * A2UI Audio Component
 */

import { useTheme } from '../context/theme';
import type {
  AnyComponentNode,
  MessageProcessor,
  SurfaceID,
  ResolvedAudioPlayer,
} from '../types/types';

import { extractStringValue, cn } from './utils';

export interface AudioProps {
  component: AnyComponentNode;
  processor: MessageProcessor | null;
  surfaceId: SurfaceID | null;
  url: ResolvedAudioPlayer['url'];
  description?: ResolvedAudioPlayer['description'];
}

export function Audio({ component, processor, surfaceId, url, description }: AudioProps) {
  const theme = useTheme();

  const audioUrl = extractStringValue(url, component, processor, surfaceId);
  const desc = description
    ? extractStringValue(description, component, processor, surfaceId)
    : undefined;

  if (!audioUrl) {
    return <div className="text-gray-400">(no audio)</div>;
  }

  return (
    <section className={cn(theme.components.AudioPlayer)}>
      {desc && <p className="mb-2 text-sm">{desc}</p>}
      <audio controls src={audioUrl} className="w-full" />
    </section>
  );
}
