/**
 * A2UI TextField Component
 */

import { useTheme } from '../context/theme';
import { A2uiMessageProcessor } from '../data/model-processor';
import type {
  AnyComponentNode,
  MessageProcessor,
  SurfaceID,
  ResolvedTextField,
} from '../types/types';

import { extractStringValue, cn } from './utils';

export interface TextFieldProps {
  component: AnyComponentNode;
  processor: MessageProcessor | null;
  surfaceId: SurfaceID | null;
  label: ResolvedTextField['label'];
  text?: ResolvedTextField['text'];
  type?: ResolvedTextField['type'];
  validationRegexp?: ResolvedTextField['validationRegexp'];
}

export function TextField({
  component,
  processor,
  surfaceId,
  label,
  text,
  type = 'shortText',
}: TextFieldProps) {
  const theme = useTheme();

  const labelText = extractStringValue(label, component, processor, surfaceId);
  const textValue = text ? extractStringValue(text, component, processor, surfaceId) : '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!text || !processor || !('path' in text) || !text.path) return;

    processor.setData(
      component,
      text.path,
      e.target.value,
      surfaceId ?? A2uiMessageProcessor.DEFAULT_SURFACE_ID
    );
  };

  const inputType = type === 'number' ? 'number' : type === 'date' ? 'date' : 'text';
  const isLongText = type === 'longText';

  return (
    <section className={cn(theme.components.TextField.container)}>
      {labelText && (
        <label
          htmlFor={`textfield-${component.id}`}
          className={cn(theme.components.TextField.label)}
        >
          {labelText}
        </label>
      )}
      {isLongText ? (
        <textarea
          id={`textfield-${component.id}`}
          className={cn(theme.components.TextField.element)}
          value={textValue}
          onChange={handleChange}
          placeholder="Please enter a value"
          rows={4}
        />
      ) : (
        <input
          id={`textfield-${component.id}`}
          type={inputType}
          className={cn(theme.components.TextField.element)}
          value={textValue}
          onChange={handleChange}
          placeholder="Please enter a value"
          autoComplete="off"
        />
      )}
    </section>
  );
}
