/**
 * A2UI Builders - v0.9 Protocol
 *
 * 提供 A2UI v0.9 协议的消息和组件构建器
 * 所有构建器从 @zhama/a2ui-core 重导出
 */

// ============================================================================
// ID 生成器
// ============================================================================

export { generateId, resetIdCounter } from '@zhama/a2ui-core';

// ============================================================================
// 组件构建器 (v0.9 扁平格式)
// ============================================================================

export {
  // 文本组件
  text,
  h1,
  h2,
  h3,
  h4,
  h5,
  caption,
  body,
  // 媒体组件
  image,
  icon,
  video,
  audioPlayer,
  // 布局组件
  row,
  column,
  list,
  card,
  tabs,
  divider,
  modal,
  // 交互组件
  button,
  textButton,
  checkbox,
  textField,
  dateTimeInput,
  choicePicker,
  slider,
} from '@zhama/a2ui-core';

// ============================================================================
// 消息构建器 (v0.9 格式)
// ============================================================================

export {
  createSurface,
  updateComponents,
  updateDataModel,
  deleteSurface,
  createV09Messages,
  messagesToJsonl,
  jsonlToMessages,
} from '@zhama/a2ui-core';

// ============================================================================
// 数据模型工具
// ============================================================================

export {
  objectToValueMap,
  valueToValueMap,
  normalizePath,
  updatesToValueMap,
  flattenObjectToValueMap,
  valueMapToObject,
  DEFAULT_PATH_MAPPINGS,
} from '@zhama/a2ui-core';

// ============================================================================
// Surface 工具
// ============================================================================

export {
  SURFACE_IDS,
  createChatSurface,
  createRecommendationSurface,
  createInputFormSurface,
  createOrchestrationSurface,
  createStatusSurface,
} from '@zhama/a2ui-core';
