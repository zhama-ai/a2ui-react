/**
 * A2UI MultipleChoice Component - v0.9 Protocol
 */

import { useTheme } from '../context/theme';
import { A2uiMessageProcessor } from '../data/model-processor';
import type {
  AnyComponentNode,
  MessageProcessor,
  SurfaceID,
  ResolvedMultipleChoice,
} from '../types/types';

import { extractStringValue, cn } from './utils';

export interface MultipleChoiceProps {
  component: AnyComponentNode;
  processor: MessageProcessor | null;
  surfaceId: SurfaceID | null;
  value?: ResolvedMultipleChoice['value'];
  options?: ResolvedMultipleChoice['options'];
  label?: ResolvedMultipleChoice['label'];
  usageHint?: ResolvedMultipleChoice['usageHint'];
}

export function MultipleChoice({
  component,
  processor,
  surfaceId,
  value,
  options = [],
  label,
}: MultipleChoiceProps) {
  const theme = useTheme();

  const labelText = label
    ? extractStringValue(label, component, processor, surfaceId)
    : 'Select an item';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!value || !processor) return;
    if (typeof value !== 'object' || !('path' in value) || !value.path) return;

    processor.setData(
      component,
      value.path,
      [e.target.value],
      surfaceId ?? A2uiMessageProcessor.DEFAULT_SURFACE_ID
    );
  };

  return (
    <section className={cn(theme.components.MultipleChoice.container)}>
      <label
        htmlFor={`multichoice-${component.id}`}
        className={cn(theme.components.MultipleChoice.label)}
      >
        {labelText}
      </label>
      <select
        id={`multichoice-${component.id}`}
        className={cn(theme.components.MultipleChoice.element)}
        onChange={handleChange}
      >
        {options?.map((option, index) => {
          const optionLabel = extractStringValue(option.label, component, processor, surfaceId);
          return (
            <option key={index} value={option.value}>
              {optionLabel}
            </option>
          );
        })}
      </select>
    </section>
  );
}
