/**
 * A2UI Types Module - v0.9 Protocol
 *
 * 类型分层：
 * - 协议类型：从 @zhama/a2ui-core 重导出
 * - 渲染器类型：本包特有的类型（组件节点、解析值等）
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

// ============================================================================
// 渲染器类型
// ============================================================================

export * from './types';

// ============================================================================
// Legacy 组件类型（保持 UI 组件兼容）
// ============================================================================

export * from './components';
