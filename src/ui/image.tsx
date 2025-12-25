/**
 * A2UI Image Component
 */

import { useTheme } from '../context/theme';
import { merge } from '../styles/utils';
import type { AnyComponentNode, MessageProcessor, SurfaceID, ResolvedImage } from '../types/types';

import { extractStringValue, cn } from './utils';

export interface ImageProps {
  component: AnyComponentNode;
  processor: MessageProcessor | null;
  surfaceId: SurfaceID | null;
  url: ResolvedImage['url'];
  usageHint?: ResolvedImage['usageHint'];
  fit?: ResolvedImage['fit'];
}

export function Image({
  component,
  processor,
  surfaceId,
  url,
  usageHint,
  fit = 'cover',
}: ImageProps) {
  const theme = useTheme();

  const imageUrl = extractStringValue(url, component, processor, surfaceId);

  if (!imageUrl) {
    return <div className="text-gray-400">(no image)</div>;
  }

  const classes = merge(
    theme.components.Image.all,
    usageHint ? theme.components.Image[usageHint] : {}
  );

  const style: React.CSSProperties = {
    objectFit: fit ?? 'cover',
  };

  return <img src={imageUrl} alt="" className={cn(classes)} style={style} />;
}
