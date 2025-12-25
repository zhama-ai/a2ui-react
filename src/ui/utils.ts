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
        return '(no model)';
      }

      const textValue = processor.getData(
        component,
        val.path,
        surfaceId ?? A2uiMessageProcessor.DEFAULT_SURFACE_ID
      );

      if (textValue === null || typeof textValue !== 'string') {
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
 * 合并 className
 */
export function cn(
  ...classes: (string | Record<string, boolean> | undefined | null | false)[]
): string {
  const result: string[] = [];

  for (const cls of classes) {
    if (!cls) continue;

    if (typeof cls === 'string') {
      result.push(cls);
    } else if (typeof cls === 'object') {
      for (const [key, value] of Object.entries(cls)) {
        if (value) result.push(key);
      }
    }
  }

  return result.join(' ');
}
