/**
 * A2UI TextField Component - v0.9 Protocol
 */

import { useState, useEffect, useCallback } from 'react';

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
  usageHint?: ResolvedTextField['usageHint'];
  validationRegexp?: ResolvedTextField['validationRegexp'];
}

export function TextField({
  component,
  processor,
  surfaceId,
  label,
  text,
  usageHint = 'shortText',
}: TextFieldProps) {
  const theme = useTheme();

  const labelText = extractStringValue(label, component, processor, surfaceId);

  // 从 processor 获取初始值
  const initialValue = text ? extractStringValue(text, component, processor, surfaceId) : '';

  // 使用本地 state 管理输入值，解决 React 受控组件问题
  const [localValue, setLocalValue] = useState(initialValue);

  // 当初始值变化时更新本地状态
  useEffect(() => {
    setLocalValue(initialValue);
  }, [initialValue]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = e.target.value;

      // 立即更新本地状态，确保输入框响应
      setLocalValue(newValue);

      // 同步更新 processor 数据（如果有 path）
      if (text && processor && typeof text === 'object' && 'path' in text && text.path) {
        processor.setData(
          component,
          text.path,
          newValue,
          surfaceId ?? A2uiMessageProcessor.DEFAULT_SURFACE_ID
        );
      }
    },
    [text, processor, component, surfaceId]
  );

  const inputType =
    usageHint === 'number' ? 'number' : usageHint === 'obscured' ? 'password' : 'text';
  const isLongText = usageHint === 'longText';

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
          value={localValue}
          onChange={handleChange}
          placeholder="Please enter a value"
          rows={4}
        />
      ) : (
        <input
          id={`textfield-${component.id}`}
          type={inputType}
          className={cn(theme.components.TextField.element)}
          value={localValue}
          onChange={handleChange}
          placeholder="Please enter a value"
          autoComplete="off"
        />
      )}
    </section>
  );
}
