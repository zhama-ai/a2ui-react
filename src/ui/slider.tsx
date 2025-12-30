/**
 * A2UI Slider Component - v0.9 Protocol
 */

import { useTheme } from '../context/theme';
import { A2uiMessageProcessor } from '../data/model-processor';
import type { AnyComponentNode, MessageProcessor, SurfaceID, ResolvedSlider } from '../types/types';

import { extractNumberValue, cn } from './utils';

export interface SliderProps {
  component: AnyComponentNode;
  processor: MessageProcessor | null;
  surfaceId: SurfaceID | null;
  value: ResolvedSlider['value'];
  min?: ResolvedSlider['min'];
  max?: ResolvedSlider['max'];
  label?: ResolvedSlider['label'];
}

export function Slider({
  component,
  processor,
  surfaceId,
  value,
  min = 0,
  max = 100,
}: SliderProps) {
  const theme = useTheme();

  const currentValue = extractNumberValue(value, component, processor, surfaceId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!value || !processor) return;
    if (typeof value !== 'object' || !('path' in value) || !value.path) return;

    processor.setData(
      component,
      value.path,
      Number(e.target.value),
      surfaceId ?? A2uiMessageProcessor.DEFAULT_SURFACE_ID
    );
  };

  return (
    <section className={cn(theme.components.Slider.container)}>
      <input
        type="range"
        id={`slider-${component.id}`}
        className={cn(theme.components.Slider.element)}
        value={currentValue}
        min={min}
        max={max}
        onChange={handleChange}
      />
      <span className={cn(theme.components.Slider.label)}>{currentValue}</span>
    </section>
  );
}
