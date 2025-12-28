/**
 * A2UI Builders
 *
 * 提供便捷的函数来构建标准的 A2UI 协议消息和组件
 *
 * 主要模块：
 * - message-builder: A2UI 消息构建（surfaceUpdate, dataModelUpdate, beginRendering）
 * - component-builder: 组件定义构建（Text, Button, Column, Card 等）
 * - data-model-builder: DataModel 数据工具（ValueMap 转换等）
 */

// ============================================================================
// Types - 类型定义
// ============================================================================

export type {
  // 组件相关类型
  ComponentDefinition,
  ButtonResult,
  TextOptions,
  IconOptions,
  LayoutOptions,
  CardOptions,
  ListOptions,
  TabsOptions,
  DividerOptions,
  ButtonOptions,
  TabItem,
  ActionDefinition,
  // 数据模型相关类型
  A2UIValueMap,
  UpdateDataItem,
  PathMappings,
} from './types';

// ============================================================================
// Message Builder - A2UI 消息构建
// ============================================================================

export {
  // ID 生成
  generateId,
  resetIdCounter,
  // 消息构建
  createBeginRendering,
  createSurfaceUpdate,
  createDataModelInit,
  createDataModelUpdate,
  createPathUpdate,
  createDeleteSurface,
  // 完整消息数组
  createA2UIMessages,
  createA2UIMessagesWithData,
} from './message-builder';

// ============================================================================
// Component Builder - 组件定义构建
// ============================================================================

export {
  // 基础组件
  createText,
  createBoundText,
  createIcon,
  createBoundIcon,
  // 布局组件
  createColumn,
  createRow,
  createCard,
  createList,
  createTabs,
  createDivider,
  // 交互组件
  createButton,
  createSimpleButton,
  // 表单组件
  createTextField,
  createCheckbox,
  createSlider,
  // 媒体组件
  createImage,
  createVideo,
  // 条件渲染
  createConditional,
} from './component-builder';

// ============================================================================
// Data Model Builder - DataModel 数据工具
// ============================================================================

export {
  // 常量
  DEFAULT_PATH_MAPPINGS,
  // ValueMap 转换
  objectToValueMap,
  valueToValueMap,
  updatesToValueMap,
  flattenObjectToValueMap,
  normalizePath,
  // 兼容性函数
  valueToValueMapEntry,
  jsValueToA2UIValue,
} from './data-model-builder';
