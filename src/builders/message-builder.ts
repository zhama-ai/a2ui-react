/**
 * A2UI Message Builder
 *
 * 提供 A2UI 协议消息的构建工具函数
 * 用于构建 surfaceUpdate, dataModelUpdate, beginRendering 等消息
 */

import type { ServerToClientMessage, ComponentInstance } from '../types/types';

import { objectToValueMap, updatesToValueMap, valueToValueMap } from './data-model-builder';
import type { UpdateDataItem } from './types';

/**
 * 组件 ID 计数器
 */
let componentIdCounter = 0;

/**
 * 生成唯一的组件 ID
 *
 * @param prefix - ID 前缀
 */
export function generateId(prefix = 'comp'): string {
  return `${prefix}_${Date.now()}_${componentIdCounter++}`;
}

/**
 * 重置 ID 计数器
 * 在渲染新场景时调用，确保 ID 从 0 开始
 */
export function resetIdCounter(): void {
  componentIdCounter = 0;
}

/**
 * 创建 beginRendering 消息
 * 通知客户端可以开始渲染指定的 Surface
 *
 * @param rootId - 根组件 ID
 * @param surfaceId - Surface ID，默认为 '@default'
 * @param styles - 可选的样式配置，如 { primaryColor: '#3b82f6' }
 */
export function createBeginRendering(
  rootId: string,
  surfaceId = '@default',
  styles?: Record<string, string>
): ServerToClientMessage {
  return {
    beginRendering: {
      surfaceId,
      root: rootId,
      ...(styles && { styles }),
    },
  };
}

/**
 * 创建 surfaceUpdate 消息
 * 定义或更新 Surface 中的组件
 *
 * @param components - 组件定义数组
 * @param surfaceId - Surface ID，默认为 '@default'
 */
export function createSurfaceUpdate(
  components: ComponentInstance[] | unknown[],
  surfaceId = '@default'
): ServerToClientMessage {
  return {
    surfaceUpdate: {
      surfaceId,
      components: components as ComponentInstance[],
    },
  };
}

/**
 * 创建 DataModel 初始化消息
 * 在首次渲染时设置初始数据
 *
 * @param data - 初始数据对象
 * @param surfaceId - Surface ID，默认为 '@default'
 */
export function createDataModelInit(
  data: Record<string, unknown>,
  surfaceId = '@default'
): ServerToClientMessage {
  const valueMap = objectToValueMap(data);
  return {
    dataModelUpdate: {
      surfaceId,
      contents: valueMap,
    },
  } as ServerToClientMessage;
}

/**
 * 创建 DataModel 更新消息
 * 用于增量更新 UI
 *
 * @param updates - 更新数据项数组
 * @param surfaceId - Surface ID，默认为 '@default'
 * @param basePath - 基础路径（可选）
 */
export function createDataModelUpdate(
  updates: UpdateDataItem[],
  surfaceId = '@default',
  basePath = ''
): ServerToClientMessage {
  const valueMap = updatesToValueMap(updates, basePath);
  return {
    dataModelUpdate: {
      surfaceId,
      contents: valueMap,
    },
  } as ServerToClientMessage;
}

/**
 * 创建路径更新消息
 * 直接指定路径和值进行更新
 *
 * @param path - 数据路径
 * @param value - 新值
 * @param surfaceId - Surface ID，默认为 '@default'
 */
export function createPathUpdate(
  path: string,
  value: unknown,
  surfaceId = '@default'
): ServerToClientMessage {
  return {
    dataModelUpdate: {
      surfaceId,
      path,
      contents: [valueToValueMap('', value)],
    },
  } as ServerToClientMessage;
}

/**
 * 创建 deleteSurface 消息
 * 删除指定的 Surface
 *
 * @param surfaceId - 要删除的 Surface ID
 */
export function createDeleteSurface(surfaceId: string): ServerToClientMessage {
  return {
    deleteSurface: {
      surfaceId,
    },
  };
}

/**
 * A2UI 消息创建选项
 */
export interface CreateA2UIMessagesOptions {
  /** 根组件 ID */
  rootId: string;
  /** 组件定义数组 */
  components: ComponentInstance[] | unknown[];
  /** 可选的初始数据模型 */
  dataModel?: Record<string, unknown>;
  /** Surface ID，默认为 '@default' */
  surfaceId?: string;
  /** 样式配置，如 { primaryColor: '#3b82f6' } */
  styles?: Record<string, string>;
}

/**
 * 创建完整的 A2UI 消息数组
 *
 * 符合协议要求的顺序：
 * 1. surfaceUpdate (组件定义)
 * 2. dataModelUpdate (数据初始化，可选)
 * 3. beginRendering (渲染信号)
 *
 * @param rootId - 根组件 ID
 * @param components - 组件定义数组
 * @param dataModel - 可选的初始数据模型
 * @param surfaceId - Surface ID，默认为 '@default'
 */
export function createA2UIMessages(
  rootId: string,
  components: ComponentInstance[] | unknown[],
  dataModel?: Record<string, unknown>,
  surfaceId = '@default',
  styles?: Record<string, string>
): ServerToClientMessage[] {
  const messages: ServerToClientMessage[] = [createSurfaceUpdate(components, surfaceId)];

  if (dataModel) {
    messages.push(createDataModelInit(dataModel, surfaceId));
  }

  messages.push(createBeginRendering(rootId, surfaceId, styles));

  return messages;
}

/**
 * 使用选项对象创建完整的 A2UI 消息数组
 *
 * @example
 * ```ts
 * const messages = createA2UIMessagesWithOptions({
 *   rootId: 'root',
 *   components,
 *   styles: { primaryColor: '#10b981' },  // 绿色主题
 * });
 * ```
 */
export function createA2UIMessagesWithOptions(
  options: CreateA2UIMessagesOptions
): ServerToClientMessage[] {
  const { rootId, components, dataModel, surfaceId = '@default', styles } = options;
  return createA2UIMessages(rootId, components, dataModel, surfaceId, styles);
}

/**
 * 创建带数据模型的完整消息数组
 * 这是 createA2UIMessages 的便捷版本
 *
 * @param rootId - 根组件 ID
 * @param components - 组件定义数组
 * @param dataModel - 初始数据模型
 * @param surfaceId - Surface ID，默认为 '@default'
 */
export function createA2UIMessagesWithData(
  rootId: string,
  components: ComponentInstance[] | unknown[],
  dataModel: Record<string, unknown>,
  surfaceId = '@default'
): ServerToClientMessage[] {
  return createA2UIMessages(rootId, components, dataModel, surfaceId);
}
