/**
 * A2UI Type Guards - v0.9 Protocol
 * 类型守卫函数
 */

import type { StringOrPath, NumberOrPath, BooleanOrPath } from '@zhama/a2ui-core';

import type {
  AnyComponentNode,
  ComponentArrayReference,
  ResolvedAudioPlayer,
  ResolvedButton,
  ResolvedCard,
  ResolvedCheckbox,
  ResolvedColumn,
  ResolvedDateTimeInput,
  ResolvedDivider,
  ResolvedIcon,
  ResolvedImage,
  ResolvedList,
  ResolvedModal,
  ResolvedMultipleChoice,
  ResolvedRow,
  ResolvedSlider,
  ResolvedTabItem,
  ResolvedTabs,
  ResolvedText,
  ResolvedTextField,
  ResolvedVideo,
} from '../types/types';

/**
 * 检查是否是 v0.9 的值映射对象
 */
export function isValueMap(value: unknown): value is Record<string, unknown> {
  return isObject(value);
}

export function isPath(key: string, value: unknown): value is string {
  return key === 'path' && typeof value === 'string';
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isComponentArrayReference(value: unknown): value is ComponentArrayReference {
  if (!isObject(value)) return false;
  return 'explicitList' in value || 'template' in value;
}

/**
 * v0.9 StringOrPath 类型守卫
 */
export function isStringValue(value: unknown): value is StringOrPath {
  if (typeof value === 'string') return true;
  if (isObject(value) && 'path' in value && typeof value.path === 'string') return true;
  return false;
}

/**
 * v0.9 NumberOrPath 类型守卫
 */
export function isNumberValue(value: unknown): value is NumberOrPath {
  if (typeof value === 'number') return true;
  if (isObject(value) && 'path' in value && typeof value.path === 'string') return true;
  return false;
}

/**
 * v0.9 BooleanOrPath 类型守卫
 */
export function isBooleanValue(value: unknown): value is BooleanOrPath {
  if (typeof value === 'boolean') return true;
  if (isObject(value) && 'path' in value && typeof value.path === 'string') return true;
  return false;
}

export function isAnyComponentNode(value: unknown): value is AnyComponentNode {
  if (!isObject(value)) return false;
  return 'id' in value && 'type' in value && 'properties' in value;
}

export function isResolvedAudioPlayer(props: unknown): props is ResolvedAudioPlayer {
  return isObject(props) && 'url' in props && isStringValue(props.url);
}

export function isResolvedButton(props: unknown): props is ResolvedButton {
  return (
    isObject(props) && 'child' in props && isAnyComponentNode(props.child) && 'action' in props
  );
}

export function isResolvedCard(props: unknown): props is ResolvedCard {
  if (!isObject(props)) return false;
  if (!('child' in props)) {
    if (!('children' in props)) {
      return false;
    } else {
      return Array.isArray(props.children) && props.children.every(isAnyComponentNode);
    }
  }
  return isAnyComponentNode(props.child);
}

export function isResolvedCheckbox(props: unknown): props is ResolvedCheckbox {
  return (
    isObject(props) &&
    'label' in props &&
    isStringValue(props.label) &&
    'value' in props &&
    isBooleanValue(props.value)
  );
}

export function isResolvedColumn(props: unknown): props is ResolvedColumn {
  return (
    isObject(props) &&
    'children' in props &&
    Array.isArray(props.children) &&
    props.children.every(isAnyComponentNode)
  );
}

export function isResolvedDateTimeInput(props: unknown): props is ResolvedDateTimeInput {
  return isObject(props) && 'value' in props && isStringValue(props.value);
}

export function isResolvedDivider(props: unknown): props is ResolvedDivider {
  return isObject(props);
}

export function isResolvedImage(props: unknown): props is ResolvedImage {
  return isObject(props) && 'url' in props && isStringValue(props.url);
}

export function isResolvedIcon(props: unknown): props is ResolvedIcon {
  return isObject(props) && 'name' in props && isStringValue(props.name);
}

export function isResolvedList(props: unknown): props is ResolvedList {
  return (
    isObject(props) &&
    'children' in props &&
    Array.isArray(props.children) &&
    props.children.every(isAnyComponentNode)
  );
}

export function isResolvedModal(props: unknown): props is ResolvedModal {
  return (
    isObject(props) &&
    'entryPointChild' in props &&
    isAnyComponentNode(props.entryPointChild) &&
    'contentChild' in props &&
    isAnyComponentNode(props.contentChild)
  );
}

export function isResolvedMultipleChoice(props: unknown): props is ResolvedMultipleChoice {
  return isObject(props) && 'selections' in props;
}

export function isResolvedRow(props: unknown): props is ResolvedRow {
  return (
    isObject(props) &&
    'children' in props &&
    Array.isArray(props.children) &&
    props.children.every(isAnyComponentNode)
  );
}

export function isResolvedSlider(props: unknown): props is ResolvedSlider {
  return isObject(props) && 'value' in props && isNumberValue(props.value);
}

export function isResolvedTabItem(item: unknown): item is ResolvedTabItem {
  return (
    isObject(item) &&
    'title' in item &&
    isStringValue(item.title) &&
    'child' in item &&
    isAnyComponentNode(item.child)
  );
}

export function isResolvedTabs(props: unknown): props is ResolvedTabs {
  return (
    isObject(props) &&
    'tabItems' in props &&
    Array.isArray(props.tabItems) &&
    props.tabItems.every(isResolvedTabItem)
  );
}

export function isResolvedText(props: unknown): props is ResolvedText {
  return isObject(props) && 'text' in props && isStringValue(props.text);
}

export function isResolvedTextField(props: unknown): props is ResolvedTextField {
  return isObject(props) && 'label' in props && isStringValue(props.label);
}

export function isResolvedVideo(props: unknown): props is ResolvedVideo {
  return isObject(props) && 'url' in props && isStringValue(props.url);
}
