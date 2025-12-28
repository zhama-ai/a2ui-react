/**
 * A2UI UI Utilities
 */

import { A2uiMessageProcessor } from '../data/model-processor';
import type { NumberValue, StringValue } from '../types/primitives';
import type { AnyComponentNode, MessageProcessor } from '../types/types';

/**
 * 从 StringValue 提取实际字符串值
 */
export function extractStringValue(
  val: StringValue | null,
  component: AnyComponentNode | null,
  processor: MessageProcessor | null,
  surfaceId: string | null
): string {
  if (val !== null && typeof val === 'object') {
    if ('literalString' in val) {
      return val.literalString ?? '';
    } else if ('literal' in val && val.literal !== undefined) {
      return val.literal ?? '';
    } else if (val && 'path' in val && val.path) {
      if (!processor || !component) {
        console.warn('[A2UI] extractStringValue: no processor or component for path:', val.path);
        return '(no model)';
      }

      const textValue = processor.getData(
        component,
        val.path,
        surfaceId ?? A2uiMessageProcessor.DEFAULT_SURFACE_ID
      );

      // 调试：记录数据绑定结果
      if (process.env.NODE_ENV === 'development') {
        console.debug('[A2UI] extractStringValue:', {
          path: val.path,
          value: textValue,
          type: typeof textValue,
          componentId: component.id,
          surfaceId,
        });
      }

      if (textValue === null) {
        console.warn('[A2UI] extractStringValue: null value for path:', val.path);
        return '';
      }

      // 支持数字类型自动转换为字符串
      if (typeof textValue === 'number') {
        return String(textValue);
      }

      if (typeof textValue !== 'string') {
        console.warn(
          '[A2UI] extractStringValue: non-string value for path:',
          val.path,
          typeof textValue
        );
        return '';
      }

      return textValue;
    }
  }

  return '';
}

/**
 * 从 NumberValue 提取实际数字值
 */
export function extractNumberValue(
  val: NumberValue | null,
  component: AnyComponentNode | null,
  processor: MessageProcessor | null,
  surfaceId: string | null
): number {
  if (val !== null && typeof val === 'object') {
    if ('literalNumber' in val) {
      return val.literalNumber ?? 0;
    } else if ('literal' in val && val.literal !== undefined) {
      return val.literal ?? 0;
    } else if (val && 'path' in val && val.path) {
      if (!processor || !component) {
        return -1;
      }

      let numberValue = processor.getData(
        component,
        val.path,
        surfaceId ?? A2uiMessageProcessor.DEFAULT_SURFACE_ID
      );

      if (typeof numberValue === 'string') {
        numberValue = Number.parseInt(numberValue, 10);
        if (Number.isNaN(numberValue)) {
          numberValue = null;
        }
      }

      if (numberValue === null || typeof numberValue !== 'number') {
        return -1;
      }

      return numberValue;
    }
  }

  return 0;
}

/**
 * 合并 className（支持 string 和 Record<string, boolean>）
 */
export function cn(
  ...inputs: (string | Record<string, boolean> | undefined | null | false)[]
): string {
  const result: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === 'string') {
      result.push(input);
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) result.push(key);
      }
    }
  }

  return result.join(' ');
}

/**
 * 将样式对象转换为内联样式
 */
export function styleMap(styles: Record<string, string | number | undefined>): React.CSSProperties {
  const cssProperties: Record<string, string | number> = {};

  for (const [key, value] of Object.entries(styles)) {
    if (value === undefined) continue;

    // 将 kebab-case 转换为 camelCase
    const camelKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    cssProperties[camelKey] = value;
  }

  return cssProperties as React.CSSProperties;
}
