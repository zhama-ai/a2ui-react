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
export * as Builders from './builders';
export * as Patterns from './patterns';

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

// Alias exports for better DX
export { Root as A2UIRoot } from './ui';

export type { A2UIComponentProps } from './ui';

// ============ Utils ============
export { extractStringValue, extractNumberValue, cn } from './ui/utils';

// ============ Builders - 消息和组件构建器 ============
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
} from './builders';

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
  createA2UIMessages,
  createA2UIMessagesWithData,
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
  // DataModel 工具
  DEFAULT_PATH_MAPPINGS,
  objectToValueMap,
  valueToValueMap,
  updatesToValueMap,
  flattenObjectToValueMap,
  normalizePath,
  valueToValueMapEntry,
  jsValueToA2UIValue,
} from './builders';

// ============ Patterns - 通用 UI 模式 ============
export {
  // Stats 模式
  createStatsGrid,
  createProgressBar,
  createScoreCard,
  createMetadataRow,
  createBadge,
  createBadgeGroup,
  createStreakIndicator,
  createRankCard,
  createComparisonCard,
  // Cards 模式
  createTopicCard,
  createContentCard,
  createRecommendationCard,
  createRelatedContentCard,
  createCourseCard,
  createAchievementCard,
  createAchievementList,
  // Actions 模式
  createActionButtonGroup,
  createQuickActions,
  createOptionButtons,
  createNavigationButtons,
  createBreadcrumb,
  createStepIndicator,
  createPagination,
  // Feedback 模式
  createFeedbackCard,
  createMessageCard,
  createToast,
  createAlertBanner,
  createResultBanner,
  createMotivationBanner,
  // Charts 模式
  createTimeline,
  createKnowledgeMap,
  createActivityHeatmap,
  createProgressChart,
  createTrendChart,
  // Content 模式
  createTextSection,
  createQuote,
  createCodeBlock,
  createKeyPoints,
  createStepList,
  createFaqList,
  createComparisonTable,
  createImageGallery,
  // Forms 模式
  createFormGroup,
  createFieldSet,
  createValidationHint,
  createFormSection,
  // Scene 渲染
  SceneRenderer,
  createSceneRenderer,
  renderSimpleScene,
  renderSceneToMessages,
  SceneTemplates,
  createSceneConfig,
  createLayout,
  createResponsiveGrid,
  createSplitLayout,
  createCenteredLayout,
  createCardContainer,
} from './patterns';

// Pattern Types
export type {
  PatternResult,
  PatternMessagesResult,
  PatternOptions,
  StatItem,
  ProgressData,
  ActionButton,
  AchievementData,
  MetadataItem,
  Badge,
  FeedbackMessage,
  TimelineItem,
  KnowledgeNode,
  ContentSection,
  TextSectionData,
  CodeBlockData,
  QuoteData,
  KeyPointsData,
  StepListData,
  FaqListData,
  ComparisonTableData,
  FormField,
} from './patterns';
