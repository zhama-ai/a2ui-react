/**
 * A2UI Action Event Types
 */

import type { Action } from '../types/components';
import type { AnyComponentNode } from '../types/types';

import type { BaseEventDetail } from './base';

type Namespace = 'a2ui';

export interface A2UIAction extends BaseEventDetail<`${Namespace}.action`> {
  readonly action: Action;
  readonly dataContextPath: string;
  readonly sourceComponentId: string;
  readonly sourceComponent: AnyComponentNode | null;
}

/**
 * A2UI 事件类型映射
 */
export interface A2UIEventDetailMap {
  'a2ui.action': A2UIAction;
}

/**
 * A2UI 事件名称
 */
export const A2UI_EVENT_NAME = 'a2uiaction' as const;

/**
 * A2UI 事件类型
 */
export type A2UIEventType = keyof A2UIEventDetailMap;
