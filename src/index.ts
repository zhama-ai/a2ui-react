/**
 * @zhama/a2ui
 * A2UI Protocol - Agent-to-User Interface Protocol
 *
 * 基于 Google A2UI 协议的 React 实现
 *
 * 特点：
 * - 完整的 A2UI 协议实现
 * - 消息处理器 (MessageProcessor)
 * - Surface 管理
 * - 数据模型和数据绑定
 * - 主题系统
 * - 可扩展的组件注册
 */

// ============ Core - 核心模块 ============
export * as Data from './data';
export * as Events from './events';
export * as Types from './types';
export * as Styles from './styles';
export * as UI from './ui';

// ============ Types - 类型定义 ============
export type {
  // Primitives
  StringValue,
  NumberValue,
  BooleanValue,
} from './types/primitives';

export type {
  // Components
  Action,
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

export type {
  // Core Types
  MessageProcessor,
  Theme,
  UserAction,
  DataValue,
  DataObject,
  DataMap,
  DataArray,
  ComponentArrayTemplate,
  ComponentArrayReference,
  ComponentProperties,
  ComponentInstance,
  BeginRenderingMessage,
  SurfaceUpdateMessage,
  DataModelUpdate,
  ValueMap,
  DeleteSurfaceMessage,
  ServerToClientMessage,
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
export { merge, appendToAll, classesToString, stylesToCSS } from './styles/utils';
export { defaultTheme, createTheme } from './styles/default-theme';

// ============ Context - React Context ============
export { ThemeProvider, useTheme, ThemeContext } from './context/theme';
export { ProcessorProvider, useProcessor, ProcessorContext } from './context/processor';

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

// Alias exports for better DX
export { Root as A2UIRoot } from './ui';

export type { A2UIComponentProps } from './ui';

// ============ Utils ============
export { extractStringValue, extractNumberValue, cn } from './ui/utils';
