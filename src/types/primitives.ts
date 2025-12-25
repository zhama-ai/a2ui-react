/**
 * A2UI Primitive Types
 * 基础值类型，支持字面值和数据绑定路径
 */

export interface StringValue {
  path?: string;
  literalString?: string;
  literal?: string;
}

export interface NumberValue {
  path?: string;
  literalNumber?: number;
  literal?: number;
}

export interface BooleanValue {
  path?: string;
  literalBoolean?: boolean;
  literal?: boolean;
}
