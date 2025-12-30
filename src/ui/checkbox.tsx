/**
 * A2UI Checkbox Component - v0.9 Protocol
 */

import { useTheme } from '../context/theme';
import { A2uiMessageProcessor } from '../data/model-processor';
import type {
  AnyComponentNode,
  MessageProcessor,
  SurfaceID,
  ResolvedCheckbox,
} from '../types/types';

import { extractStringValue, extractBooleanValue, cn } from './utils';

export interface CheckboxProps {
  component: AnyComponentNode;
  processor: MessageProcessor | null;
  surfaceId: SurfaceID | null;
  label: ResolvedCheckbox['label'];
  value: ResolvedCheckbox['value'];
}

export function Checkbox({ component, processor, surfaceId, label, value }: CheckboxProps) {
  const theme = useTheme();

  const labelText = extractStringValue(label, component, processor, surfaceId);
  const checked = extractBooleanValue(value, component, processor, surfaceId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!value || !processor) return;
    // v0.9: value 可以是 boolean 或 { path: string }
    if (typeof value !== 'object' || !('path' in value) || !value.path) return;

    processor.setData(
      component,
      value.path,
      e.target.checked,
      surfaceId ?? A2uiMessageProcessor.DEFAULT_SURFACE_ID
    );
  };

  return (
    <section className={cn(theme.components.CheckBox.container)}>
      <input
        type="checkbox"
        id={`checkbox-${component.id}`}
        className={cn(theme.components.CheckBox.element)}
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={`checkbox-${component.id}`} className={cn(theme.components.CheckBox.label)}>
        {labelText}
      </label>
    </section>
  );
}
