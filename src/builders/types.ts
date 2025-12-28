/**
 * A2UI Builders Types
 *
 * 定义构建器相关的类型
 */

/**
 * 组件定义
 */
export interface ComponentDefinition {
  id: string;
  component: Record<string, unknown>;
}

/**
 * Button 创建结果
 */
export interface ButtonResult {
  button: ComponentDefinition;
  components: ComponentDefinition[];
}

/**
 * Text 组件选项
 */
export interface TextOptions {
  id?: string;
  usageHint?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'label';
  markdown?: boolean;
}

/**
 * Icon 组件选项
 */
export interface IconOptions {
  id?: string;
  size?: number;
  color?: string;
  container?: boolean;
  variant?: string;
}

/**
 * 布局组件选项
 */
export interface LayoutOptions {
  id?: string;
  alignment?: 'start' | 'center' | 'end' | 'stretch';
  distribution?: 'start' | 'center' | 'end' | 'spaceBetween' | 'spaceAround' | 'spaceEvenly';
}

/**
 * Card 组件选项
 */
export interface CardOptions {
  id?: string;
}

/**
 * List 组件选项
 */
export interface ListOptions {
  id?: string;
  direction?: 'vertical' | 'horizontal';
}

/**
 * Tabs 组件选项
 */
export interface TabsOptions {
  id?: string;
}

/**
 * Divider 组件选项
 */
export interface DividerOptions {
  id?: string;
  axis?: 'horizontal' | 'vertical';
  thickness?: number;
  color?: string;
}

/**
 * Button 组件选项
 */
export interface ButtonOptions {
  id?: string;
  buttonId?: string;
  icon?: string;
}

/**
 * Tab 项目
 */
export interface TabItem {
  title: string;
  contentId: string;
}

/**
 * Action 定义
 */
export interface ActionDefinition {
  name: string;
  context?: Array<{ key: string; value: string }>;
}

/**
 * A2UI ValueMap (符合协议标准)
 */
export interface A2UIValueMap {
  key: string;
  valueString?: string;
  valueNumber?: number;
  valueBoolean?: boolean;
  valueMap?: A2UIValueMap[];
}

/**
 * 更新数据项
 */
export interface UpdateDataItem {
  path: string;
  value: unknown;
  valueType?: 'string' | 'number' | 'boolean' | 'list' | 'map';
  operation?: 'set' | 'increment' | 'decrement' | 'append' | 'remove';
}

/**
 * 路径映射表
 */
export type PathMappings = Record<string, string>;
