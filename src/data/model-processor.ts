/**
 * A2UI Message Processor - v0.9 Protocol
 * 处理 A2UI v0.9 消息，构建 UI Surface 层级模型
 */

import type {
  ServerToClientMessage,
  AnyComponentNode,
  DataMap,
  ResolvedMap,
  ResolvedValue,
  Surface,
  SurfaceID,
  MessageProcessor,
  ComponentInstance,
  CreateSurfaceMessage,
  UpdateComponentsMessage,
  UpdateDataModelMessage,
  DeleteSurfaceMessage,
  DataValue,
} from '../types/types';

import {
  isComponentArrayReference,
  isObject,
  isPath,
  isResolvedAudioPlayer,
  isResolvedButton,
  isResolvedCard,
  isResolvedCheckbox,
  isResolvedColumn,
  isResolvedDateTimeInput,
  isResolvedDivider,
  isResolvedIcon,
  isResolvedImage,
  isResolvedList,
  isResolvedModal,
  isResolvedMultipleChoice,
  isResolvedRow,
  isResolvedSlider,
  isResolvedTabs,
  isResolvedText,
  isResolvedTextField,
  isResolvedVideo,
} from './guards';

export class A2uiMessageProcessor implements MessageProcessor {
  static readonly DEFAULT_SURFACE_ID = '@default';

  private mapCtor: MapConstructor = Map;
  private arrayCtor: ArrayConstructor = Array;
  private setCtor: SetConstructor = Set;
  private objCtor: ObjectConstructor = Object;
  private surfaces: Map<SurfaceID, Surface>;

  constructor(
    opts: {
      mapCtor?: MapConstructor;
      arrayCtor?: ArrayConstructor;
      setCtor?: SetConstructor;
      objCtor?: ObjectConstructor;
    } = {}
  ) {
    this.arrayCtor = opts.arrayCtor ?? Array;
    this.mapCtor = opts.mapCtor ?? Map;
    this.setCtor = opts.setCtor ?? Set;
    this.objCtor = opts.objCtor ?? Object;
    this.surfaces = new this.mapCtor();
  }

  getSurfaces(): ReadonlyMap<string, Surface> {
    return this.surfaces;
  }

  clearSurfaces(): void {
    this.surfaces.clear();
  }

  processMessages(messages: ServerToClientMessage[]): void {
    console.log('[A2UI] processMessages called with', messages.length, 'messages');

    for (const message of messages) {
      // v0.9 消息类型检测
      if ('createSurface' in message) {
        this.handleCreateSurface(message as CreateSurfaceMessage);
      } else if ('updateComponents' in message) {
        this.handleUpdateComponents(message as UpdateComponentsMessage);
      } else if ('updateDataModel' in message) {
        this.handleUpdateDataModel(message as UpdateDataModelMessage);
      } else if ('deleteSurface' in message) {
        this.handleDeleteSurface(message as DeleteSurfaceMessage);
      } else {
        console.warn('[A2UI] Unknown message type:', Object.keys(message));
      }
    }
  }

  getData(
    node: AnyComponentNode,
    relativePath: string,
    surfaceId = A2uiMessageProcessor.DEFAULT_SURFACE_ID
  ): DataValue | null {
    const surface = this.getOrCreateSurface(surfaceId);
    if (!surface) {
      console.warn('[A2UI] getData: surface not found:', surfaceId);
      return null;
    }

    let finalPath: string;

    if (relativePath === '.' || relativePath === '') {
      finalPath = node.dataContextPath ?? '/';
    } else {
      finalPath = this.resolvePath(relativePath, node.dataContextPath);
    }

    const result = this.getDataByPath(surface.dataModel, finalPath);
    return result;
  }

  setData(
    node: AnyComponentNode | null,
    relativePath: string,
    value: DataValue,
    surfaceId = A2uiMessageProcessor.DEFAULT_SURFACE_ID
  ): void {
    if (!node) {
      console.warn('No component node set');
      return;
    }

    const surface = this.getOrCreateSurface(surfaceId);
    if (!surface) return;

    let finalPath: string;

    if (relativePath === '.' || relativePath === '') {
      finalPath = node.dataContextPath ?? '/';
    } else {
      finalPath = this.resolvePath(relativePath, node.dataContextPath);
    }

    this.setDataByPath(surface.dataModel, finalPath, value);
  }

  resolvePath(path: string, dataContextPath?: string): string {
    if (path.startsWith('/')) {
      return path;
    }

    if (dataContextPath && dataContextPath !== '/') {
      return dataContextPath.endsWith('/')
        ? `${dataContextPath}${path}`
        : `${dataContextPath}/${path}`;
    }

    return `/${path}`;
  }

  // ============================================================================
  // v0.9 消息处理器
  // ============================================================================

  private handleCreateSurface(message: CreateSurfaceMessage): void {
    const { createSurface } = message;
    const surfaceId = createSurface.surfaceId;

    // v0.9: createSurface 只创建一个空的 surface
    const surface = this.getOrCreateSurface(surfaceId);
    surface.catalogId = createSurface.catalogId;
  }

  private handleUpdateComponents(message: UpdateComponentsMessage): void {
    const { updateComponents } = message;
    const surfaceId = updateComponents.surfaceId;

    const surface = this.getOrCreateSurface(surfaceId);

    // 更新组件
    for (const component of updateComponents.components) {
      surface.components.set(component.id, component);

      // v0.9: 检查组件的 slotName 来确定根组件
      // 通常第一个组件或标记为 'root' 的组件是根组件
      if (!surface.rootComponentId) {
        surface.rootComponentId = component.id;
      }
    }

    this.rebuildComponentTree(surface);
  }

  private handleUpdateDataModel(message: UpdateDataModelMessage): void {
    const { updateDataModel } = message;
    const surfaceId = updateDataModel.surfaceId;

    const surface = this.getOrCreateSurface(surfaceId);

    // v0.9 使用 path + op + value 格式
    const path = updateDataModel.path ?? '/';
    const op = updateDataModel.op ?? 'replace';
    const value = updateDataModel.value;

    if (op === 'remove') {
      this.removeDataByPath(surface.dataModel, path);
    } else if (value !== undefined) {
      this.setDataByPath(surface.dataModel, path, value as DataValue);
    }

    this.rebuildComponentTree(surface);
  }

  private handleDeleteSurface(message: DeleteSurfaceMessage): void {
    const { deleteSurface } = message;
    this.surfaces.delete(deleteSurface.surfaceId);
  }

  // ============================================================================
  // 数据模型工具
  // ============================================================================

  private setDataByPath(root: DataMap, path: string, value: DataValue): void {
    const segments = this.normalizePath(path)
      .split('/')
      .filter((s) => s);

    if (segments.length === 0) {
      if (isObject(value) && !(value instanceof Map)) {
        root.clear();
        for (const [key, v] of Object.entries(value)) {
          root.set(key, v as DataValue);
        }
      }
      return;
    }

    let current: DataMap | DataValue[] = root;
    for (let i = 0; i < segments.length - 1; i++) {
      const segment = segments[i] as string;
      let target: DataValue | undefined;

      if (current instanceof Map) {
        target = current.get(segment);
      } else if (Array.isArray(current) && /^\d+$/.test(segment)) {
        target = current[parseInt(segment, 10)];
      }

      if (target === undefined || typeof target !== 'object' || target === null) {
        const newMap = new this.mapCtor<string, DataValue>();
        if (current instanceof Map) {
          current.set(segment, newMap as unknown as DataValue);
        } else if (Array.isArray(current)) {
          current[parseInt(segment, 10)] = newMap as unknown as DataValue;
        }
        target = newMap as unknown as DataValue;
      }
      current = target as unknown as DataMap | DataValue[];
    }

    const finalSegment = segments[segments.length - 1] as string;
    if (current instanceof Map) {
      current.set(finalSegment, value);
    } else if (Array.isArray(current) && /^\d+$/.test(finalSegment)) {
      current[parseInt(finalSegment, 10)] = value;
    }
  }

  private removeDataByPath(root: DataMap, path: string): void {
    const segments = this.normalizePath(path)
      .split('/')
      .filter((s) => s);

    if (segments.length === 0) {
      root.clear();
      return;
    }

    let current: DataMap | DataValue[] = root;
    for (let i = 0; i < segments.length - 1; i++) {
      const segment = segments[i] as string;
      let target: DataValue | undefined;

      if (current instanceof Map) {
        target = current.get(segment);
      } else if (Array.isArray(current) && /^\d+$/.test(segment)) {
        target = current[parseInt(segment, 10)];
      }

      if (target === undefined || typeof target !== 'object' || target === null) {
        return; // 路径不存在
      }
      current = target as DataMap | DataValue[];
    }

    const finalSegment = segments[segments.length - 1] as string;
    if (current instanceof Map) {
      current.delete(finalSegment);
    }
  }

  private normalizePath(path: string): string {
    const dotPath = path.replace(/\[(\d+)\]/g, '.$1');
    const segments = dotPath.split('.');
    return '/' + segments.filter((s) => s.length > 0).join('/');
  }

  private getDataByPath(root: DataMap, path: string): DataValue | null {
    const segments = this.normalizePath(path)
      .split('/')
      .filter((s) => s);

    let current: DataValue | undefined = root as unknown as DataValue;
    for (const segment of segments) {
      if (current === undefined || current === null) return null;

      if (current instanceof Map) {
        current = current.get(segment);
      } else if (Array.isArray(current) && /^\d+$/.test(segment)) {
        current = current[parseInt(segment, 10)];
      } else if (isObject(current)) {
        current = (current as Record<string, DataValue>)[segment];
      } else {
        return null;
      }
    }
    return current ?? null;
  }

  private getOrCreateSurface(surfaceId: string): Surface {
    let surface: Surface | undefined = this.surfaces.get(surfaceId);
    if (!surface) {
      surface = {
        rootComponentId: null,
        componentTree: null,
        dataModel: new this.mapCtor(),
        components: new this.mapCtor(),
        styles: {},
      };
      this.surfaces.set(surfaceId, surface);
    }
    return surface;
  }

  private rebuildComponentTree(surface: Surface): void {
    if (!surface.rootComponentId) {
      surface.componentTree = null;
      return;
    }

    const visited = new this.setCtor<string>();
    surface.componentTree = this.buildNodeRecursive(
      surface.rootComponentId,
      surface,
      visited,
      '/',
      ''
    );
  }

  private buildNodeRecursive(
    baseComponentId: string,
    surface: Surface,
    visited: Set<string>,
    dataContextPath: string,
    idSuffix = ''
  ): AnyComponentNode | null {
    const fullId = `${baseComponentId}${idSuffix}`;
    const { components } = surface;

    if (!components.has(baseComponentId)) {
      return null;
    }

    if (visited.has(fullId)) {
      throw new Error(`Circular dependency for component "${fullId}".`);
    }

    visited.add(fullId);

    const componentData = components.get(baseComponentId) as ComponentInstance;

    // v0.9 格式：组件类型直接在 component 字段
    const componentType = componentData.component;
    const unresolvedProperties = { ...componentData } as Record<string, unknown>;
    delete unresolvedProperties.id;
    delete unresolvedProperties.component;

    const resolvedProperties: ResolvedMap = {};
    for (const [key, value] of Object.entries(unresolvedProperties)) {
      resolvedProperties[key] = this.resolvePropertyValue(
        value,
        surface,
        visited,
        dataContextPath,
        idSuffix
      );
    }

    visited.delete(fullId);

    const weight = (componentData as Record<string, unknown>).weight;
    const baseNode = {
      id: fullId,
      dataContextPath,
      weight: typeof weight === 'number' || typeof weight === 'string' ? weight : undefined,
    };

    switch (componentType) {
      case 'Text':
        if (!isResolvedText(resolvedProperties)) {
          throw new Error(`Invalid data; expected ${componentType}`);
        }
        return { ...baseNode, type: 'Text', properties: resolvedProperties };

      case 'Image':
        if (!isResolvedImage(resolvedProperties)) {
          throw new Error(`Invalid data; expected ${componentType}`);
        }
        return { ...baseNode, type: 'Image', properties: resolvedProperties };

      case 'Icon':
        if (!isResolvedIcon(resolvedProperties)) {
          throw new Error(`Invalid data; expected ${componentType}`);
        }
        return { ...baseNode, type: 'Icon', properties: resolvedProperties };

      case 'Video':
        if (!isResolvedVideo(resolvedProperties)) {
          throw new Error(`Invalid data; expected ${componentType}`);
        }
        return { ...baseNode, type: 'Video', properties: resolvedProperties };

      case 'AudioPlayer':
        if (!isResolvedAudioPlayer(resolvedProperties)) {
          throw new Error(`Invalid data; expected ${componentType}`);
        }
        return { ...baseNode, type: 'AudioPlayer', properties: resolvedProperties };

      case 'Row':
        if (!isResolvedRow(resolvedProperties)) {
          throw new Error(`Invalid data; expected ${componentType}`);
        }
        return { ...baseNode, type: 'Row', properties: resolvedProperties };

      case 'Column':
        if (!isResolvedColumn(resolvedProperties)) {
          throw new Error(`Invalid data; expected ${componentType}`);
        }
        return { ...baseNode, type: 'Column', properties: resolvedProperties };

      case 'List':
        if (!isResolvedList(resolvedProperties)) {
          throw new Error(`Invalid data; expected ${componentType}`);
        }
        return { ...baseNode, type: 'List', properties: resolvedProperties };

      case 'Card':
        if (!isResolvedCard(resolvedProperties)) {
          throw new Error(`Invalid data; expected ${componentType}`);
        }
        return { ...baseNode, type: 'Card', properties: resolvedProperties };

      case 'Tabs':
        if (!isResolvedTabs(resolvedProperties)) {
          throw new Error(`Invalid data; expected ${componentType}`);
        }
        return { ...baseNode, type: 'Tabs', properties: resolvedProperties };

      case 'Divider':
        if (!isResolvedDivider(resolvedProperties)) {
          throw new Error(`Invalid data; expected ${componentType}`);
        }
        return { ...baseNode, type: 'Divider', properties: resolvedProperties };

      case 'Modal':
        if (!isResolvedModal(resolvedProperties)) {
          throw new Error(`Invalid data; expected ${componentType}`);
        }
        return { ...baseNode, type: 'Modal', properties: resolvedProperties };

      case 'Button':
        if (!isResolvedButton(resolvedProperties)) {
          throw new Error(`Invalid data; expected ${componentType}`);
        }
        return { ...baseNode, type: 'Button', properties: resolvedProperties };

      case 'CheckBox':
        if (!isResolvedCheckbox(resolvedProperties)) {
          throw new Error(`Invalid data; expected ${componentType}`);
        }
        return { ...baseNode, type: 'CheckBox', properties: resolvedProperties };

      case 'TextField':
        if (!isResolvedTextField(resolvedProperties)) {
          throw new Error(`Invalid data; expected ${componentType}`);
        }
        return { ...baseNode, type: 'TextField', properties: resolvedProperties };

      case 'DateTimeInput':
        if (!isResolvedDateTimeInput(resolvedProperties)) {
          throw new Error(`Invalid data; expected ${componentType}`);
        }
        return { ...baseNode, type: 'DateTimeInput', properties: resolvedProperties };

      case 'MultipleChoice':
        if (!isResolvedMultipleChoice(resolvedProperties)) {
          throw new Error(`Invalid data; expected ${componentType}`);
        }
        return { ...baseNode, type: 'MultipleChoice', properties: resolvedProperties };

      case 'Slider':
        if (!isResolvedSlider(resolvedProperties)) {
          throw new Error(`Invalid data; expected ${componentType}`);
        }
        return { ...baseNode, type: 'Slider', properties: resolvedProperties };

      default:
        return {
          ...baseNode,
          type: componentType,
          properties: resolvedProperties,
        };
    }
  }

  private resolvePropertyValue(
    value: unknown,
    surface: Surface,
    visited: Set<string>,
    dataContextPath: string,
    idSuffix = ''
  ): ResolvedValue {
    // 1. 如果是字符串且匹配组件 ID，构建节点
    if (typeof value === 'string' && surface.components.has(value)) {
      return this.buildNodeRecursive(value, surface, visited, dataContextPath, idSuffix);
    }

    // 2. 如果是 ComponentArrayReference
    if (isComponentArrayReference(value)) {
      if (value.explicitList) {
        return value.explicitList.map((id) =>
          this.buildNodeRecursive(id, surface, visited, dataContextPath, idSuffix)
        );
      }

      if (value.template) {
        const fullDataPath = this.resolvePath(value.template.dataBinding, dataContextPath);
        const data = this.getDataByPath(surface.dataModel, fullDataPath);

        const template = value.template;

        if (Array.isArray(data)) {
          return data.map((_, index) => {
            const parentIndices = dataContextPath
              .split('/')
              .filter((segment) => /^\d+$/.test(segment));

            const newIndices = [...parentIndices, index];
            const newSuffix = `:${newIndices.join(':')}`;
            const childDataContextPath = `${fullDataPath}/${index}`;

            return this.buildNodeRecursive(
              template.componentId,
              surface,
              visited,
              childDataContextPath,
              newSuffix
            );
          });
        }

        if (data instanceof Map) {
          return Array.from(data.keys(), (key) => {
            const newSuffix = `:${key}`;
            const childDataContextPath = `${fullDataPath}/${key}`;

            return this.buildNodeRecursive(
              template.componentId,
              surface,
              visited,
              childDataContextPath,
              newSuffix
            );
          });
        }

        return [];
      }
    }

    // 3. 如果是数组，解析每个元素
    if (Array.isArray(value)) {
      return value.map((item) =>
        this.resolvePropertyValue(item, surface, visited, dataContextPath, idSuffix)
      );
    }

    // 4. 如果是对象，解析每个属性
    if (isObject(value)) {
      const newObj: ResolvedMap = {};
      for (const [key, propValue] of Object.entries(value)) {
        let propertyValue = propValue;
        if (isPath(key, propValue) && dataContextPath !== '/') {
          propertyValue = (propValue as string)
            .replace(/^\.?\/item/, '')
            .replace(/^\.?\/text/, '')
            .replace(/^\.?\/label/, '')
            .replace(/^\.?\//, '');
          newObj[key] = propertyValue as ResolvedValue;
          continue;
        }

        newObj[key] = this.resolvePropertyValue(
          propertyValue,
          surface,
          visited,
          dataContextPath,
          idSuffix
        );
      }
      return newObj;
    }

    // 5. 原始值
    return value as ResolvedValue;
  }
}

/**
 * 创建默认的消息处理器
 */
export function createMessageProcessor(): A2uiMessageProcessor {
  return new A2uiMessageProcessor();
}
