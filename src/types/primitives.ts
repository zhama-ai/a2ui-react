/**
 * A2UI Primitive Types - v0.9 Protocol
 *
 * 从 @zhama/a2ui-core 重导出基础类型
 */

export type {
  StringOrPath,
  NumberOrPath,
  BooleanOrPath,
  StringArrayOrPath,
} from '@zhama/a2ui-core';

// 类型别名保持向后兼容
export type StringValue = import('@zhama/a2ui-core').StringOrPath;
export type NumberValue = import('@zhama/a2ui-core').NumberOrPath;
export type BooleanValue = import('@zhama/a2ui-core').BooleanOrPath;
