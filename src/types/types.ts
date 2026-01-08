/**
 * A2UI Types - v0.9 Protocol
 *
 * 类型定义完全基于 A2UI v0.9 协议
 * 协议类型从 @zhama/a2ui-core 重导出
 */

// ============================================================================
// 从 @zhama/a2ui-core 重导出协议类型
// ============================================================================

export type {
  // Primitives (v0.9 格式)
  StringOrPath,
  NumberOrPath,
  BooleanOrPath,
  StringArrayOrPath,
  // Components
  Action,
  ComponentInstance,
  ComponentType,
  AnyComponent,
  TextComponent,
  ImageComponent,
  IconComponent,
  VideoComponent,
  AudioPlayerComponent,
  RowComponent,
  ColumnComponent,
  ListComponent,
  CardComponent,
  TabsComponent,
  DividerComponent,
  ModalComponent,
  ButtonComponent,
  CheckBoxComponent,
  TextFieldComponent,
  DateTimeInputComponent,
  ChoicePickerComponent,
  SliderComponent,
  ChartComponent,
  ChartType,
  ChartSeries,
  ChartAxisConfig,
  ChildrenProperty,
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
  // Theme
  Theme as A2UITheme,
} from '@zhama/a2ui-core';

export {
  STANDARD_CATALOG_ID,
  A2UI_EXTENSION_URI,
  A2UI_MIME_TYPE,
  isV09Message,
} from '@zhama/a2ui-core';

// 类型别名 - 保持 API 兼容
import type { ServerToClientMessageV09 } from '@zhama/a2ui-core';
export type ServerToClientMessage = ServerToClientMessageV09;

// ============================================================================
// React 渲染器类型
// ============================================================================

import type {
  Action,
  DataValue as CoreDataValue,
  DataObject as CoreDataObject,
  DataArray as CoreDataArray,
  ComponentInstance,
} from '@zhama/a2ui-core';

/** Message Processor 接口 */
export interface MessageProcessor {
  getSurfaces(): ReadonlyMap<string, Surface>;
  clearSurfaces(): void;
  processMessages(messages: ServerToClientMessage[]): void;
  getData(node: AnyComponentNode, relativePath: string, surfaceId: string): CoreDataValue | null;
  setData(
    node: AnyComponentNode | null,
    relativePath: string,
    value: CoreDataValue,
    surfaceId: string
  ): void;
  resolvePath(path: string, dataContextPath?: string): string;
}

// ============================================================================
// Theme（渲染器主题）
// ============================================================================

export interface Theme {
  components: {
    AudioPlayer: Record<string, boolean>;
    Button: Record<string, boolean>;
    Card: Record<string, boolean>;
    Column: Record<string, boolean>;
    CheckBox: {
      container: Record<string, boolean>;
      element: Record<string, boolean>;
      label: Record<string, boolean>;
    };
    DateTimeInput: {
      container: Record<string, boolean>;
      element: Record<string, boolean>;
      label: Record<string, boolean>;
    };
    Divider: Record<string, boolean>;
    Image: {
      all: Record<string, boolean>;
      icon: Record<string, boolean>;
      avatar: Record<string, boolean>;
      smallFeature: Record<string, boolean>;
      mediumFeature: Record<string, boolean>;
      largeFeature: Record<string, boolean>;
      header: Record<string, boolean>;
    };
    Icon: Record<string, boolean>;
    List: Record<string, boolean>;
    Modal: {
      backdrop: Record<string, boolean>;
      element: Record<string, boolean>;
    };
    MultipleChoice: {
      container: Record<string, boolean>;
      element: Record<string, boolean>;
      label: Record<string, boolean>;
    };
    Row: Record<string, boolean>;
    Slider: {
      container: Record<string, boolean>;
      element: Record<string, boolean>;
      label: Record<string, boolean>;
    };
    Chart: Record<string, boolean>;
    Tabs: {
      container: Record<string, boolean>;
      element: Record<string, boolean>;
      controls: {
        all: Record<string, boolean>;
        selected: Record<string, boolean>;
      };
    };
    Text: {
      all: Record<string, boolean>;
      h1: Record<string, boolean>;
      h2: Record<string, boolean>;
      h3: Record<string, boolean>;
      h4: Record<string, boolean>;
      h5: Record<string, boolean>;
      h6: Record<string, boolean>;
      caption: Record<string, boolean>;
      body: Record<string, boolean>;
      label: Record<string, boolean>;
    };
    TextField: {
      container: Record<string, boolean>;
      element: Record<string, boolean>;
      label: Record<string, boolean>;
    };
    Video: Record<string, boolean>;
  };
  elements: {
    a: Record<string, boolean>;
    audio: Record<string, boolean>;
    body: Record<string, boolean>;
    button: Record<string, boolean>;
    h1: Record<string, boolean>;
    h2: Record<string, boolean>;
    h3: Record<string, boolean>;
    h4: Record<string, boolean>;
    h5: Record<string, boolean>;
    iframe: Record<string, boolean>;
    input: Record<string, boolean>;
    p: Record<string, boolean>;
    pre: Record<string, boolean>;
    textarea: Record<string, boolean>;
    video: Record<string, boolean>;
  };
  markdown: {
    p: string[];
    h1: string[];
    h2: string[];
    h3: string[];
    h4: string[];
    h5: string[];
    ul: string[];
    ol: string[];
    li: string[];
    a: string[];
    strong: string[];
    em: string[];
    code: string[];
    blockquote: string[];
  };
  additionalStyles?: {
    AudioPlayer?: Record<string, string>;
    Button?: Record<string, string>;
    Card?: Record<string, string>;
    Column?: Record<string, string>;
    CheckBox?: Record<string, string>;
    DateTimeInput?: Record<string, string>;
    Divider?: Record<string, string>;
    Heading?: Record<string, string>;
    Icon?: Record<string, string>;
    Image?: Record<string, string>;
    List?: Record<string, string>;
    Modal?: Record<string, string>;
    MultipleChoice?: Record<string, string>;
    Row?: Record<string, string>;
    Slider?: Record<string, string>;
    Chart?: Record<string, string>;
    Tabs?: Record<string, string>;
    Text?:
      | Record<string, string>
      | {
          h1: Record<string, string>;
          h2: Record<string, string>;
          h3: Record<string, string>;
          h4: Record<string, string>;
          h5: Record<string, string>;
          body: Record<string, string>;
          caption: Record<string, string>;
        };
    TextField?: Record<string, string>;
    Video?: Record<string, string>;
  };
}

// ============================================================================
// User Action
// ============================================================================

export interface UserAction {
  actionName: string;
  sourceComponentId: string;
  timestamp: string;
  context?: Record<string, unknown>;
}

// ============================================================================
// Data Model（渲染器内部使用）
// ============================================================================

export type DataMap = Map<string, CoreDataValue>;

export interface ComponentArrayTemplate {
  componentId: string;
  dataBinding: string;
}

export interface ComponentArrayReference {
  explicitList?: string[];
  template?: ComponentArrayTemplate;
}

export type ComponentProperties = {
  children?: ComponentArrayReference | string[];
  child?: string;
  [k: string]: unknown;
};

// ============================================================================
// Resolved Values（解析后的值，用于渲染）
// ============================================================================

export interface ResolvedMap {
  [key: string]: ResolvedValue;
}

export type ResolvedArray = ResolvedValue[];

export type ResolvedValue =
  | string
  | number
  | boolean
  | null
  | AnyComponentNode
  | ResolvedMap
  | ResolvedArray;

// ============================================================================
// Component Nodes（渲染树节点）
// ============================================================================

interface BaseComponentNode {
  id: string;
  weight?: number | string;
  dataContextPath?: string;
  slotName?: string;
}

export interface TextNode extends BaseComponentNode {
  type: 'Text';
  properties: ResolvedText;
}

export interface ImageNode extends BaseComponentNode {
  type: 'Image';
  properties: ResolvedImage;
}

export interface IconNode extends BaseComponentNode {
  type: 'Icon';
  properties: ResolvedIcon;
}

export interface VideoNode extends BaseComponentNode {
  type: 'Video';
  properties: ResolvedVideo;
}

export interface AudioPlayerNode extends BaseComponentNode {
  type: 'AudioPlayer';
  properties: ResolvedAudioPlayer;
}

export interface RowNode extends BaseComponentNode {
  type: 'Row';
  properties: ResolvedRow;
}

export interface ColumnNode extends BaseComponentNode {
  type: 'Column';
  properties: ResolvedColumn;
}

export interface ListNode extends BaseComponentNode {
  type: 'List';
  properties: ResolvedList;
}

export interface CardNode extends BaseComponentNode {
  type: 'Card';
  properties: ResolvedCard;
}

export interface TabsNode extends BaseComponentNode {
  type: 'Tabs';
  properties: ResolvedTabs;
}

export interface DividerNode extends BaseComponentNode {
  type: 'Divider';
  properties: ResolvedDivider;
}

export interface ModalNode extends BaseComponentNode {
  type: 'Modal';
  properties: ResolvedModal;
}

export interface ButtonNode extends BaseComponentNode {
  type: 'Button';
  properties: ResolvedButton;
}

export interface CheckboxNode extends BaseComponentNode {
  type: 'CheckBox';
  properties: ResolvedCheckbox;
}

export interface TextFieldNode extends BaseComponentNode {
  type: 'TextField';
  properties: ResolvedTextField;
}

export interface DateTimeInputNode extends BaseComponentNode {
  type: 'DateTimeInput';
  properties: ResolvedDateTimeInput;
}

export interface MultipleChoiceNode extends BaseComponentNode {
  type: 'MultipleChoice';
  properties: ResolvedMultipleChoice;
}

export interface SliderNode extends BaseComponentNode {
  type: 'Slider';
  properties: ResolvedSlider;
}

export interface ChartNode extends BaseComponentNode {
  type: 'Chart';
  properties: ResolvedChart;
}

export interface CustomNode extends BaseComponentNode {
  type: string;
  properties: CustomNodeProperties;
}

export type AnyComponentNode =
  | TextNode
  | IconNode
  | ImageNode
  | VideoNode
  | AudioPlayerNode
  | RowNode
  | ColumnNode
  | ListNode
  | CardNode
  | TabsNode
  | DividerNode
  | ModalNode
  | ButtonNode
  | CheckboxNode
  | TextFieldNode
  | DateTimeInputNode
  | MultipleChoiceNode
  | SliderNode
  | ChartNode
  | CustomNode;

// ============================================================================
// Resolved Component Properties（v0.9 格式）
// ============================================================================

export interface ResolvedText {
  text: string | { path: string };
  usageHint?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'caption' | 'body';
}

export interface ResolvedIcon {
  name: string | { path: string };
  size?: number | string;
  color?: string;
  container?: boolean;
  variant?: string;
}

export interface ResolvedImage {
  url: string | { path: string };
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  usageHint?: 'icon' | 'avatar' | 'smallFeature' | 'mediumFeature' | 'largeFeature' | 'header';
}

export interface ResolvedVideo {
  url: string | { path: string };
}

export interface ResolvedAudioPlayer {
  url: string | { path: string };
  description?: string | { path: string };
}

export interface ResolvedDivider {
  axis?: 'horizontal' | 'vertical';
  thickness?: number;
  color?: string;
}

export interface ResolvedCheckbox {
  label: string | { path: string };
  value: boolean | { path: string };
}

export interface ResolvedTextField {
  label: string | { path: string };
  text?: string | { path: string };
  usageHint?: 'longText' | 'number' | 'shortText' | 'obscured';
  validationRegexp?: string;
}

export interface ResolvedDateTimeInput {
  value: string | { path: string };
  enableDate?: boolean;
  enableTime?: boolean;
  outputFormat?: string;
  label?: string | { path: string };
}

export interface ResolvedMultipleChoice {
  label?: string | { path: string };
  usageHint?: 'multipleSelection' | 'mutuallyExclusive';
  options?: Array<{
    label: string | { path: string };
    value: string;
  }>;
  value?: string[] | { path: string };
}

export interface ResolvedSlider {
  label?: string | { path: string };
  min?: number;
  max?: number;
  value: number | { path: string };
}

export interface ResolvedChartSeries {
  name?: string;
  type?: string;
  data: number[] | Array<{ name?: string; value: number }> | { path: string };
}

export interface ResolvedChartAxis {
  type?: 'category' | 'value' | 'time' | 'log';
  data?: string[] | { path: string };
  name?: string;
}

export interface ResolvedChart {
  chartType: 'line' | 'bar' | 'pie' | 'scatter' | 'area' | 'radar' | 'gauge';
  title?: string | { path: string };
  series: ResolvedChartSeries[] | { path: string };
  xAxis?: ResolvedChartAxis;
  yAxis?: ResolvedChartAxis;
  legend?: boolean;
  tooltip?: boolean;
  height?: number;
  width?: number | string;
  echartsOption?: Record<string, unknown> | { path: string };
}

export interface ResolvedRow {
  children: AnyComponentNode[];
  distribution?: 'start' | 'center' | 'end' | 'spaceBetween' | 'spaceAround' | 'spaceEvenly';
  alignment?: 'start' | 'center' | 'end' | 'stretch';
}

export interface ResolvedColumn {
  children: AnyComponentNode[];
  distribution?: 'start' | 'center' | 'end' | 'spaceBetween' | 'spaceAround' | 'spaceEvenly';
  alignment?: 'start' | 'center' | 'end' | 'stretch';
}

export interface ResolvedButton {
  child: AnyComponentNode;
  action: Action;
  primary?: boolean;
}

export interface ResolvedList {
  children: AnyComponentNode[];
  direction?: 'vertical' | 'horizontal' | 'grid';
  alignment?: 'start' | 'center' | 'end' | 'stretch';
  columns?: number;
}

export interface ResolvedCard {
  child?: AnyComponentNode;
  children?: AnyComponentNode[];
  padding?: number;
}

export interface ResolvedTabItem {
  title: string | { path: string };
  child: AnyComponentNode;
}

export interface ResolvedTabs {
  tabItems: ResolvedTabItem[];
}

export interface ResolvedModal {
  entryPointChild: AnyComponentNode;
  contentChild: AnyComponentNode;
}

export interface CustomNodeProperties {
  [k: string]: ResolvedValue;
}

// ============================================================================
// Surface（渲染状态）
// ============================================================================

export type SurfaceID = string;

export interface Surface {
  /** 根组件 ID */
  rootComponentId: string | null;
  /** 渲染树 */
  componentTree: AnyComponentNode | null;
  /** 数据模型 */
  dataModel: DataMap;
  /** 组件映射 */
  components: Map<string, ComponentInstance>;
  /** 样式配置 */
  styles: Record<string, string>;
  /** Catalog ID (v0.9) */
  catalogId?: string;
}

// ============================================================================
// 客户端消息类型
// ============================================================================

export type { ClientToServerMessage as A2UIClientEventMessage } from '@zhama/a2ui-core';

export interface ClientCapabilitiesDynamic {
  customComponents?: string[];
  [key: string]: unknown;
}
