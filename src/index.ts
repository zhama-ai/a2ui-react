/**
 * @zhama/a2ui
 * A2UI Protocol - Agent-to-User Interface Protocol React 实现
 *
 * 基于 A2UI v0.9 协议
 */

// ============ Core Modules ============
export * as Data from './data';
export * as Events from './events';
export * as Types from './types';
export * as Styles from './styles';
export * as UI from './ui';
export * as Builders from './builders';

// ============ Types - 从 @zhama/a2ui-core 重导出 ============
export type {
  // Primitives (v0.9)
  StringOrPath,
  NumberOrPath,
  BooleanOrPath,
  StringArrayOrPath,
  // Components
  Action,
  ComponentInstance,
  ComponentType,
  AnyComponent,
  // Messages v0.9
  CreateSurfaceMessage,
  UpdateComponentsMessage,
  UpdateDataModelMessage,
  DeleteSurfaceMessage,
  ServerToClientMessageV09,
  // Client Events
  UserActionEvent,
  DataChangeEvent,
  ClientToServerMessage,
  // Data
  DataValue,
  DataObject,
  DataArray,
} from '@zhama/a2ui-core';

export {
  STANDARD_CATALOG_ID,
  A2UI_EXTENSION_URI,
  A2UI_MIME_TYPE,
  isV09Message,
} from '@zhama/a2ui-core';

// 别名
export type { ServerToClientMessageV09 as ServerToClientMessage } from '@zhama/a2ui-core';

// ============ Types - 渲染器类型 ============
export type {
  // Core Types
  MessageProcessor,
  Theme,
  UserAction,
  DataMap,
  ComponentArrayTemplate,
  ComponentArrayReference,
  ComponentProperties,
  ResolvedValue,
  ResolvedMap,
  ResolvedArray,
  AnyComponentNode,
  TextNode,
  ImageNode,
  IconNode,
  VideoNode,
  AudioPlayerNode,
  RowNode,
  ColumnNode,
  ListNode,
  CardNode,
  TabsNode,
  DividerNode,
  ModalNode,
  ButtonNode,
  CheckboxNode,
  TextFieldNode,
  DateTimeInputNode,
  MultipleChoiceNode,
  SliderNode,
  CustomNode,
  ResolvedText,
  ResolvedIcon,
  ResolvedImage,
  ResolvedVideo,
  ResolvedAudioPlayer,
  ResolvedDivider,
  ResolvedCheckbox,
  ResolvedTextField,
  ResolvedDateTimeInput,
  ResolvedMultipleChoice,
  ResolvedSlider,
  ResolvedRow,
  ResolvedColumn,
  ResolvedButton,
  ResolvedList,
  ResolvedCard,
  ResolvedTabItem,
  ResolvedTabs,
  ResolvedModal,
  CustomNodeProperties,
  SurfaceID,
  Surface as SurfaceState,
  A2UIClientEventMessage,
  ClientCapabilitiesDynamic,
} from './types/types';

// 组件类型
export type {
  Text as TextComponent,
  Image as ImageComponent,
  Icon as IconComponent,
  Video as VideoComponent,
  AudioPlayer,
  Tabs as TabsComponent,
  Divider as DividerComponent,
  Modal as ModalComponent,
  Button as ButtonComponent,
  Checkbox as CheckboxComponent,
  TextField as TextFieldComponent,
  DateTimeInput as DateTimeInputComponent,
  MultipleChoice as MultipleChoiceComponent,
  Slider as SliderComponent,
} from './types/components';

// ============ Data - 数据处理 ============
export { A2uiMessageProcessor, createMessageProcessor } from './data/model-processor';

export {
  isValueMap,
  isPath,
  isObject,
  isComponentArrayReference,
  isStringValue,
  isNumberValue,
  isBooleanValue,
  isAnyComponentNode,
  isResolvedAudioPlayer,
  isResolvedButton,
  isResolvedCard,
  isResolvedCheckbox,
  isResolvedColumn,
  isResolvedDateTimeInput,
  isResolvedDivider,
  isResolvedImage,
  isResolvedIcon,
  isResolvedList,
  isResolvedModal,
  isResolvedMultipleChoice,
  isResolvedRow,
  isResolvedSlider,
  isResolvedTabItem,
  isResolvedTabs,
  isResolvedText,
  isResolvedTextField,
  isResolvedVideo,
} from './data/guards';

// ============ Events - 事件系统 ============
export type { BaseEventDetail } from './events/base';
export type { A2UIAction, A2UIEventDetailMap, A2UIEventType } from './events/a2ui';
export { A2UI_EVENT_NAME } from './events/a2ui';

// ============ Styles - 样式系统 ============
export { merge, appendToAll, classesToString, stylesToCSS, cn as cnStyles } from './styles/utils';
export { defaultTheme, createTheme, mergeStyles, cloneDefaultTheme } from './styles/default-theme';
export { structuralStyles, getA2UIStyles } from './styles/core';

// ============ Context - React Context ============
export { ThemeProvider, useTheme, ThemeContext } from './context/theme';
export { ProcessorProvider, useProcessor, ProcessorContext } from './context/processor';
export { StyleProvider, getStylesCSS, createStyleElement } from './context/style-provider';

// ============ UI Components - React 组件 ============
export {
  // Basic Components
  Text,
  Image,
  Icon,
  Video,
  Audio,
  Button,
  Divider,
  // Layout Components
  Row,
  Column,
  List,
  Card,
  // Interactive Components
  Checkbox,
  TextField,
  DateTimeInput,
  MultipleChoice,
  Slider,
  Tabs,
  Modal,
  // Root & Surface
  Root,
  Surface,
  ComponentRenderer,
  // Markdown
  Markdown,
  renderMarkdown,
  // Registry
  ComponentRegistry,
  componentRegistry,
} from './ui';

// Alias exports
export { Root as A2UIRoot } from './ui';
export type { A2UIComponentProps } from './ui';

// ============ Utils ============
export { extractStringValue, extractNumberValue, cn } from './ui/utils';

// ============ Builders - v0.9 构建器 ============
export {
  // ID 生成
  generateId,
  resetIdCounter,
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
  // 消息构建
  createSurface,
  updateComponents,
  updateDataModel,
  deleteSurface,
  createV09Messages,
  messagesToJsonl,
  jsonlToMessages,
  // 数据模型工具
  objectToValueMap,
  valueToValueMap,
  normalizePath,
  updatesToValueMap,
  flattenObjectToValueMap,
  valueMapToObject,
  DEFAULT_PATH_MAPPINGS,
  // Surface 工具
  SURFACE_IDS,
  createChatSurface,
  createRecommendationSurface,
  createInputFormSurface,
  createOrchestrationSurface,
  createStatusSurface,
} from './builders';
