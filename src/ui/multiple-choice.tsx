/**
 * A2UI MultipleChoice Component
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
  selections: ResolvedMultipleChoice['selections'];
  options?: ResolvedMultipleChoice['options'];
  maxAllowedSelections?: ResolvedMultipleChoice['maxAllowedSelections'];
}

export function MultipleChoice({
  component,
  processor,
  surfaceId,
  selections,
  options = [],
}: MultipleChoiceProps) {
  const theme = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!selections || !processor || !('path' in selections) || !selections.path) return;

    processor.setData(
      component,
      selections.path,
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
        Select an item
      </label>
      <select
        id={`multichoice-${component.id}`}
        className={cn(theme.components.MultipleChoice.element)}
        onChange={handleChange}
      >
        {options?.map((option, index) => {
          const label = extractStringValue(option.label, component, processor, surfaceId);
          return (
            <option key={index} value={option.value}>
              {label}
            </option>
          );
        })}
      </select>
    </section>
  );
}
