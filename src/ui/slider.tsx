/**
 * A2UI Slider Component
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
  minValue?: ResolvedSlider['minValue'];
  maxValue?: ResolvedSlider['maxValue'];
}

export function Slider({
  component,
  processor,
  surfaceId,
  value,
  minValue,
  maxValue,
}: SliderProps) {
  const theme = useTheme();

  const currentValue = extractNumberValue(value, component, processor, surfaceId);

  // 提取 min/max 值，支持 NumberValue 对象或原始数字
  const min =
    typeof minValue === 'number'
      ? minValue
      : minValue
        ? extractNumberValue(minValue, component, processor, surfaceId)
        : 0;

  const max =
    typeof maxValue === 'number'
      ? maxValue
      : maxValue
        ? extractNumberValue(maxValue, component, processor, surfaceId)
        : 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!value || !processor || !('path' in value) || !value.path) return;

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
