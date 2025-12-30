/**
 * A2UI DateTimeInput Component
 */

import { useTheme } from '../context/theme';
import { A2uiMessageProcessor } from '../data/model-processor';
import type {
  AnyComponentNode,
  MessageProcessor,
  SurfaceID,
  ResolvedDateTimeInput,
} from '../types/types';

import { extractStringValue, cn } from './utils';

export interface DateTimeInputProps {
  component: AnyComponentNode;
  processor: MessageProcessor | null;
  surfaceId: SurfaceID | null;
  value: ResolvedDateTimeInput['value'];
  enableDate?: ResolvedDateTimeInput['enableDate'];
  enableTime?: ResolvedDateTimeInput['enableTime'];
}

export function DateTimeInput({
  component,
  processor,
  surfaceId,
  value,
  enableDate = true,
  enableTime = true,
}: DateTimeInputProps) {
  const theme = useTheme();

  const currentValue = extractStringValue(value, component, processor, surfaceId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!value || !processor) return;
    // v0.9: value 可以是 string 或 { path: string }
    if (typeof value !== 'object' || !('path' in value) || !value.path) return;

    processor.setData(
      component,
      value.path,
      e.target.value,
      surfaceId ?? A2uiMessageProcessor.DEFAULT_SURFACE_ID
    );
  };

  let inputType = 'datetime-local';
  if (enableDate && !enableTime) {
    inputType = 'date';
  } else if (!enableDate && enableTime) {
    inputType = 'time';
  }

  return (
    <section className={cn(theme.components.DateTimeInput.container)}>
      <input
        type={inputType}
        id={`datetime-${component.id}`}
        className={cn(theme.components.DateTimeInput.element)}
        value={currentValue}
        onChange={handleChange}
      />
    </section>
  );
}
