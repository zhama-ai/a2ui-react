/**
 * A2UI Message Processor
 * 处理并整合服务器消息，构建 UI Surface 层级模型
 */

import type {
  ServerToClientMessage,
  AnyComponentNode,
  BeginRenderingMessage,
  DataArray,
  DataMap,
  DataModelUpdate,
  DataValue,
  DeleteSurfaceMessage,
  ResolvedMap,
  ResolvedValue,
  Surface,
  SurfaceID,
  SurfaceUpdateMessage,
  MessageProcessor,
  ComponentInstance,
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
    for (const message of messages) {
      if (message.beginRendering) {
        this.handleBeginRendering(message.beginRendering, message.beginRendering.surfaceId);
      }

      if (message.surfaceUpdate) {
        this.handleSurfaceUpdate(message.surfaceUpdate, message.surfaceUpdate.surfaceId);
      }

      if (message.dataModelUpdate) {
        this.handleDataModelUpdate(message.dataModelUpdate, message.dataModelUpdate.surfaceId);
      }

      if (message.deleteSurface) {
        this.handleDeleteSurface(message.deleteSurface);
      }
    }
  }

  getData(
    node: AnyComponentNode,
    relativePath: string,
    surfaceId = A2uiMessageProcessor.DEFAULT_SURFACE_ID
  ): DataValue | null {
    const surface = this.getOrCreateSurface(surfaceId);
    if (!surface) return null;

    let finalPath: string;

    if (relativePath === '.' || relativePath === '') {
      finalPath = node.dataContextPath ?? '/';
    } else {
      finalPath = this.resolvePath(relativePath, node.dataContextPath);
    }

    return this.getDataByPath(surface.dataModel, finalPath);
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

  private parseIfJsonString(value: DataValue): DataValue {
    if (typeof value !== 'string') {
      return value;
    }

    const trimmedValue = value.trim();
    if (
      (trimmedValue.startsWith('{') && trimmedValue.endsWith('}')) ||
      (trimmedValue.startsWith('[') && trimmedValue.endsWith(']'))
    ) {
      try {
        return JSON.parse(value);
      } catch {
        console.warn(`Failed to parse potential JSON string: "${value.substring(0, 50)}..."`);
        return value;
      }
    }

    return value;
  }

  private convertKeyValueArrayToMap(arr: DataArray): DataMap {
    const map = new this.mapCtor<string, DataValue>();
    for (const item of arr) {
      if (!isObject(item) || !('key' in item)) continue;

      const key = item.key as string;
      const valueKey = this.findValueKey(item as Record<string, unknown>);
      if (!valueKey) continue;

      let value: DataValue = (item as Record<string, unknown>)[valueKey] as DataValue;
      if (valueKey === 'valueMap' && Array.isArray(value)) {
        value = this.convertKeyValueArrayToMap(value);
      } else if (typeof value === 'string') {
        value = this.parseIfJsonString(value);
      }

      this.setDataByPath(map, key, value);
    }
    return map;
  }

  private setDataByPath(root: DataMap, path: string, value: DataValue): void {
    if (Array.isArray(value) && (value.length === 0 || (isObject(value[0]) && 'key' in value[0]))) {
      if (
        value.length === 1 &&
        isObject(value[0]) &&
        (value[0] as Record<string, unknown>).key === '.'
      ) {
        const item = value[0] as Record<string, unknown>;
        const valueKey = this.findValueKey(item);

        if (valueKey) {
          value = item[valueKey] as DataValue;
          if (valueKey === 'valueMap' && Array.isArray(value)) {
            value = this.convertKeyValueArrayToMap(value);
          } else if (typeof value === 'string') {
            value = this.parseIfJsonString(value);
          }
        } else {
          value = this.convertKeyValueArrayToMap(value as DataArray);
        }
      } else {
        value = this.convertKeyValueArrayToMap(value as DataArray);
      }
    }

    const segments = this.normalizePath(path)
      .split('/')
      .filter((s) => s);
    if (segments.length === 0) {
      if (value instanceof Map || isObject(value)) {
        if (!(value instanceof Map) && isObject(value)) {
          value = new this.mapCtor(Object.entries(value)) as DataMap;
        }

        root.clear();
        for (const [key, v] of (value as DataMap).entries()) {
          root.set(key, v);
        }
      } else {
        console.error('Cannot set root of DataModel to a non-Map value.');
      }
      return;
    }

    let current: DataMap | DataArray = root;
    for (let i = 0; i < segments.length - 1; i++) {
      const segment = segments[i] as string;
      let target: DataValue | undefined;

      if (current instanceof Map) {
        target = current.get(segment);
      } else if (Array.isArray(current) && /^\d+$/.test(segment)) {
        target = current[parseInt(segment, 10)];
      }

      if (target === undefined || typeof target !== 'object' || target === null) {
        target = new this.mapCtor();
        if (current instanceof this.mapCtor) {
          current.set(segment, target);
        } else if (Array.isArray(current)) {
          current[parseInt(segment, 10)] = target;
        }
      }
      current = target as DataMap | DataArray;
    }

    const finalSegment = segments[segments.length - 1] as string;
    if (current instanceof this.mapCtor) {
      current.set(finalSegment, value);
    } else if (Array.isArray(current) && /^\d+$/.test(finalSegment)) {
      current[parseInt(finalSegment, 10)] = value;
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

    let current: DataValue | undefined = root;
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

  private handleBeginRendering(message: BeginRenderingMessage, surfaceId: SurfaceID): void {
    const surface = this.getOrCreateSurface(surfaceId);
    surface.rootComponentId = message.root;
    surface.styles = message.styles ?? {};
    this.rebuildComponentTree(surface);
  }

  private handleSurfaceUpdate(message: SurfaceUpdateMessage, surfaceId: SurfaceID): void {
    const surface = this.getOrCreateSurface(surfaceId);
    for (const component of message.components) {
      surface.components.set(component.id, component);
    }
    this.rebuildComponentTree(surface);
  }

  private handleDataModelUpdate(message: DataModelUpdate, surfaceId: SurfaceID): void {
    const surface = this.getOrCreateSurface(surfaceId);
    const path = message.path ?? '/';
    this.setDataByPath(surface.dataModel, path, message.contents as DataValue);
    this.rebuildComponentTree(surface);
  }

  private handleDeleteSurface(message: DeleteSurfaceMessage): void {
    this.surfaces.delete(message.surfaceId);
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

  private findValueKey(value: Record<string, unknown>): string | undefined {
    return Object.keys(value).find((k) => k.startsWith('value'));
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
    const componentProps = componentData.component ?? {};
    const componentType = Object.keys(componentProps)[0] ?? 'Unknown';
    const unresolvedProperties = componentProps[componentType as keyof typeof componentProps];

    const resolvedProperties: ResolvedMap = {};
    if (isObject(unresolvedProperties)) {
      for (const [key, value] of Object.entries(unresolvedProperties)) {
        resolvedProperties[key] = this.resolvePropertyValue(
          value,
          surface,
          visited,
          dataContextPath,
          idSuffix
        );
      }
    }

    visited.delete(fullId);

    const baseNode = {
      id: fullId,
      dataContextPath,
      weight: componentData.weight ?? 'initial',
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
        return {
          ...baseNode,
          type: 'AudioPlayer',
          properties: resolvedProperties,
        };

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
        return {
          ...baseNode,
          type: 'CheckBox',
          properties: resolvedProperties,
        };

      case 'TextField':
        if (!isResolvedTextField(resolvedProperties)) {
          throw new Error(`Invalid data; expected ${componentType}`);
        }
        return {
          ...baseNode,
          type: 'TextField',
          properties: resolvedProperties,
        };

      case 'DateTimeInput':
        if (!isResolvedDateTimeInput(resolvedProperties)) {
          throw new Error(`Invalid data; expected ${componentType}`);
        }
        return {
          ...baseNode,
          type: 'DateTimeInput',
          properties: resolvedProperties,
        };

      case 'MultipleChoice':
        if (!isResolvedMultipleChoice(resolvedProperties)) {
          throw new Error(`Invalid data; expected ${componentType}`);
        }
        return {
          ...baseNode,
          type: 'MultipleChoice',
          properties: resolvedProperties,
        };

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
    // 1. If it's a string that matches a component ID, build that node.
    if (typeof value === 'string' && surface.components.has(value)) {
      return this.buildNodeRecursive(value, surface, visited, dataContextPath, idSuffix);
    }

    // 2. If it's a ComponentArrayReference
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

    // 3. If it's a plain array, resolve each item
    if (Array.isArray(value)) {
      return value.map((item) =>
        this.resolvePropertyValue(item, surface, visited, dataContextPath, idSuffix)
      );
    }

    // 4. If it's a plain object, resolve each property
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

    // 5. Otherwise, it's a primitive value
    return value as ResolvedValue;
  }
}

/**
 * 创建默认的消息处理器
 */
export function createMessageProcessor(): A2uiMessageProcessor {
  return new A2uiMessageProcessor();
}
