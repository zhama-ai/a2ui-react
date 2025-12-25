/**
 * A2UI Component Types
 * 组件类型定义
 */

import type { StringValue } from './primitives';

export interface Action {
  name: string;
  context?: Array<{
    key: string;
    value: {
      path?: string;
      literalString?: string;
      literalNumber?: number;
      literalBoolean?: boolean;
    };
  }>;
}

export interface Text {
  text: StringValue;
  usageHint: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'caption' | 'body';
}

export interface Image {
  url: StringValue;
  usageHint: 'icon' | 'avatar' | 'smallFeature' | 'mediumFeature' | 'largeFeature' | 'header';
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

export interface Icon {
  name: StringValue;
  size?: number | string;
  container?: boolean;
  variant?: string;
}

export interface Video {
  url: StringValue;
}

export interface AudioPlayer {
  url: StringValue;
  description?: StringValue;
}

export interface Tabs {
  tabItems: Array<{
    title: { path?: string; literalString?: string };
    child: string;
  }>;
}

export interface Divider {
  axis?: 'horizontal' | 'vertical';
  color?: string;
  thickness?: number;
}

export interface Modal {
  entryPointChild: string;
  contentChild: string;
}

export interface Button {
  child: string;
  action: Action;
}

export interface Checkbox {
  label: StringValue;
  value: { path?: string; literalBoolean?: boolean };
}

export interface TextField {
  text?: StringValue;
  label: StringValue;
  type?: 'shortText' | 'number' | 'date' | 'longText';
  validationRegexp?: string;
}

export interface DateTimeInput {
  value: StringValue;
  enableDate?: boolean;
  enableTime?: boolean;
  outputFormat?: string;
}

export interface MultipleChoice {
  selections: { path?: string; literalArray?: string[] };
  options?: Array<{
    label: { path?: string; literalString?: string };
    value: string;
  }>;
  maxAllowedSelections?: number;
}

export interface Slider {
  value: { path?: string; literalNumber?: number };
  minValue?: number;
  maxValue?: number;
}
