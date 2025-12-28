/**
 * Components - 模式组件构建器
 *
 * 提供简化的组件构建函数，用于构建通用 UI 模式
 * 这些函数生成 A2UI 协议兼容的组件定义
 *
 * 注意：这些函数是对 A2UI 基础构建器的封装，主要用于模式构建
 */

import {
  createText as baseCreateText,
  createIcon as baseCreateIcon,
  createColumn,
  createRow,
  createButton as baseCreateButton,
  createTextField as baseCreateTextField,
} from '../builders/component-builder';
import type { ComponentDefinition, ActionDefinition } from '../builders/types';

// 重导出基础类型
export type { ComponentDefinition };

// ============================================================================
// 简化的组件构建器（用于模式）
// ============================================================================

/**
 * 创建文本组件（带样式支持）
 */
export function createText(
  id: string,
  text: string,
  styles?: Record<string, string>
): ComponentDefinition {
  const component = baseCreateText(text, { id });

  if (styles) {
    const textComp = component.component as Record<string, Record<string, unknown>>;
    if (textComp.Text) {
      textComp.Text.styles = styles;
    }
  }

  return component;
}

/**
 * 创建图标组件（带样式支持）
 */
export function createIcon(
  id: string,
  name: string,
  styles?: Record<string, string>
): ComponentDefinition {
  const component = baseCreateIcon(name, { id });

  if (styles) {
    const iconComp = component.component as Record<string, Record<string, unknown>>;
    if (iconComp.Icon) {
      iconComp.Icon.styles = styles;
    }
  }

  return component;
}

/**
 * 创建容器组件（Column 垂直布局）
 *
 * @param id - 组件 ID
 * @param childIds - 子元素 ID 数组
 * @param styles - 样式
 */
export function createContainer(
  id: string,
  childIds: string[],
  styles?: Record<string, string>
): ComponentDefinition {
  const component = createColumn(childIds, { id });

  if (styles) {
    const colComp = component.component as Record<string, Record<string, unknown>>;
    if (colComp.Column) {
      colComp.Column.styles = styles;
    }
  }

  return component;
}

/**
 * 创建水平布局组件（Row 布局）
 *
 * @param id - 组件 ID
 * @param childIds - 子元素 ID 数组
 * @param styles - 样式
 */
export function createRowLayout(
  id: string,
  childIds: string[],
  styles?: Record<string, string>
): ComponentDefinition {
  const component = createRow(childIds, { id });

  if (styles) {
    const rowComp = component.component as Record<string, Record<string, unknown>>;
    if (rowComp.Row) {
      rowComp.Row.styles = styles;
    }
  }

  return component;
}

/**
 * 按钮创建结果
 */
export interface CreateButtonResult {
  /** 按钮的 ID（用于布局引用） */
  buttonId: string;
  /** 所有组件（包含按钮和其子组件如文本、图标等） */
  allComponents: ComponentDefinition[];
}

/**
 * 按钮选项
 */
export interface CreateButtonOptions {
  /** 样式 */
  styles?: Record<string, string>;
  /** 图标名称（Lucide 图标） */
  icon?: string;
}

/**
 * 创建按钮组件
 *
 * 返回按钮 ID 和所有相关组件（按钮 + 子组件）
 * 调用者需要将 allComponents 添加到结果中，并使用 buttonId 进行布局
 *
 * @example
 * ```typescript
 * const { buttonId, allComponents } = createButton('submit', '提交', 'submit', []);
 * buttonIds.push(buttonId);
 * components.push(...allComponents);
 *
 * // 带图标和样式
 * const { buttonId, allComponents } = createButton('nav', '导航', 'navigate', [], {
 *   icon: 'compass',
 *   styles: { backgroundColor: '#3b82f6' }
 * });
 * ```
 */
export function createButton(
  id: string,
  text: string,
  actionName: string,
  context: Array<{ key: string; value: string }>,
  options?: CreateButtonOptions
): CreateButtonResult {
  const action: ActionDefinition = {
    name: actionName,
    context,
  };

  const result = baseCreateButton(text, action, { buttonId: id, icon: options?.icon });

  if (options?.styles) {
    const btnComp = result.button.component as Record<string, Record<string, unknown>>;
    if (btnComp.Button) {
      btnComp.Button.styles = options.styles;
    }
  }

  return {
    buttonId: result.button.id,
    allComponents: [result.button, ...result.components],
  };
}

/**
 * 创建输入框组件
 */
export function createInput(
  id: string,
  type: string,
  placeholder: string,
  defaultValue?: string,
  styles?: Record<string, string>
): ComponentDefinition {
  const component = baseCreateTextField({
    id,
    placeholder,
  });

  const fieldComp = component.component as Record<string, Record<string, unknown>>;
  if (fieldComp.TextField) {
    fieldComp.TextField.inputType = type;
    if (defaultValue) {
      fieldComp.TextField.defaultValue = defaultValue;
    }
    if (styles) {
      fieldComp.TextField.styles = styles;
    }
  }

  return component;
}
