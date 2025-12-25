/**
 * A2UI Core Types
 * 核心协议类型定义
 */

import type {
  AudioPlayer,
  Button,
  Checkbox,
  DateTimeInput,
  Divider,
  Icon,
  Image,
  MultipleChoice,
  Slider,
  Text,
  TextField,
  Video,
  Action,
} from './components';
import type { StringValue } from './primitives';

export type { Action } from './components';
export type {
  ClientToServerMessage as A2UIClientEventMessage,
  ClientCapabilitiesDynamic,
} from './client-event';

// ============ Message Processor ============

export interface MessageProcessor {
  getSurfaces(): ReadonlyMap<string, Surface>;
  clearSurfaces(): void;
  processMessages(messages: ServerToClientMessage[]): void;
  getData(node: AnyComponentNode, relativePath: string, surfaceId: string): DataValue | null;
  setData(
    node: AnyComponentNode | null,
    relativePath: string,
    value: DataValue,
    surfaceId: string
  ): void;
  resolvePath(path: string, dataContextPath?: string): string;
}

// ============ Theme ============

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

// ============ User Action ============

export interface UserAction {
  actionName: string;
  sourceComponentId: string;
  timestamp: string;
  context?: Record<string, unknown>;
}

// ============ Data Model ============

// 使用接口避免循环引用
export interface DataObject {
  [key: string]: DataValue;
}

export type DataMap = Map<string, DataValue>;
export type DataArray = DataValue[];

export type DataValue = string | number | boolean | null | DataMap | DataObject | DataArray;

export interface ComponentArrayTemplate {
  componentId: string;
  dataBinding: string;
}

export interface ComponentArrayReference {
  explicitList?: string[];
  template?: ComponentArrayTemplate;
}

export type ComponentProperties = {
  children?: ComponentArrayReference;
  child?: string;
  [k: string]: unknown;
};

export interface ComponentInstance {
  id: string;
  weight?: number;
  component?: Record<string, ComponentProperties>;
}

// ============ Server Messages ============

export interface BeginRenderingMessage {
  surfaceId: string;
  root: string;
  styles?: Record<string, string>;
}

export interface SurfaceUpdateMessage {
  surfaceId: string;
  components: ComponentInstance[];
}

export interface DataModelUpdate {
  surfaceId: string;
  path?: string;
  contents: ValueMap[];
}

export type ValueMap = DataObject & {
  key: string;
  valueString?: string;
  valueNumber?: number;
  valueBoolean?: boolean;
  valueMap?: ValueMap[];
};

export interface DeleteSurfaceMessage {
  surfaceId: string;
}

export interface ServerToClientMessage {
  beginRendering?: BeginRenderingMessage;
  surfaceUpdate?: SurfaceUpdateMessage;
  dataModelUpdate?: DataModelUpdate;
  deleteSurface?: DeleteSurfaceMessage;
}

// ============ Resolved Values ============

// 使用接口避免循环引用
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

// ============ Component Nodes ============

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
  | CustomNode;

// ============ Resolved Component Properties ============

export type ResolvedText = Text;
export type ResolvedIcon = Icon;
export type ResolvedImage = Image;
export type ResolvedVideo = Video;
export type ResolvedAudioPlayer = AudioPlayer;
export type ResolvedDivider = Divider;
export type ResolvedCheckbox = Checkbox;
export type ResolvedTextField = TextField;
export type ResolvedDateTimeInput = DateTimeInput;
export type ResolvedMultipleChoice = MultipleChoice;
export type ResolvedSlider = Slider;

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
}

export interface ResolvedList {
  children: AnyComponentNode[];
  direction?: 'vertical' | 'horizontal';
  alignment?: 'start' | 'center' | 'end' | 'stretch';
}

export interface ResolvedCard {
  child?: AnyComponentNode;
  children?: AnyComponentNode[];
}

export interface ResolvedTabItem {
  title: StringValue;
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

// ============ Surface ============

export type SurfaceID = string;

export interface Surface {
  rootComponentId: string | null;
  componentTree: AnyComponentNode | null;
  dataModel: DataMap;
  components: Map<string, ComponentInstance>;
  styles: Record<string, string>;
}
