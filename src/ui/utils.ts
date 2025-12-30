/**
 * A2UI UI Utilities - v0.9 Protocol
 */

import type { StringOrPath, NumberOrPath, BooleanOrPath } from '@zhama/a2ui-core';

import { A2uiMessageProcessor } from '../data/model-processor';
import type { AnyComponentNode, MessageProcessor } from '../types/types';

/**
 * 从 StringOrPath 提取实际字符串值 (v0.9 格式)
 */
export function extractStringValue(
  val: StringOrPath | null,
  component: AnyComponentNode | null,
  processor: MessageProcessor | null,
  surfaceId: string | null
): string {
  if (val === null) return '';

  // v0.9: 直接字符串字面值
  if (typeof val === 'string') {
    return val;
  }

  // v0.9: { path: string } 数据绑定
  if (typeof val === 'object' && 'path' in val && val.path) {
    if (!processor || !component) {
      console.warn('[A2UI] extractStringValue: no processor or component for path:', val.path);
      return '(no model)';
    }

    const textValue = processor.getData(
      component,
      val.path,
      surfaceId ?? A2uiMessageProcessor.DEFAULT_SURFACE_ID
    );

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

  return '';
}

/**
 * 从 NumberOrPath 提取实际数字值 (v0.9 格式)
 */
export function extractNumberValue(
  val: NumberOrPath | null,
  component: AnyComponentNode | null,
  processor: MessageProcessor | null,
  surfaceId: string | null
): number {
  if (val === null) return 0;

  // v0.9: 直接数字字面值
  if (typeof val === 'number') {
    return val;
  }

  // v0.9: { path: string } 数据绑定
  if (typeof val === 'object' && 'path' in val && val.path) {
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

  return 0;
}

/**
 * 从 BooleanOrPath 提取实际布尔值 (v0.9 格式)
 */
export function extractBooleanValue(
  val: BooleanOrPath | null,
  component: AnyComponentNode | null,
  processor: MessageProcessor | null,
  surfaceId: string | null
): boolean {
  if (val === null) return false;

  // v0.9: 直接布尔字面值
  if (typeof val === 'boolean') {
    return val;
  }

  // v0.9: { path: string } 数据绑定
  if (typeof val === 'object' && 'path' in val && val.path) {
    if (!processor || !component) {
      return false;
    }

    const boolValue = processor.getData(
      component,
      val.path,
      surfaceId ?? A2uiMessageProcessor.DEFAULT_SURFACE_ID
    );

    if (typeof boolValue === 'boolean') {
      return boolValue;
    }

    // 支持字符串 "true" / "false"
    if (typeof boolValue === 'string') {
      return boolValue.toLowerCase() === 'true';
    }

    return false;
  }

  return false;
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
