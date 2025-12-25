/**
 * A2UI Component Registry
 */

import type { ComponentType } from 'react';

import type { AnyComponentNode, MessageProcessor, SurfaceID } from '../types/types';

/**
 * 组件 Props 基础接口
 */
export interface A2UIComponentProps {
  component: AnyComponentNode;
  processor: MessageProcessor | null;
  surfaceId: SurfaceID | null;
  childComponents?: AnyComponentNode[] | null;
  enableCustomElements?: boolean;
}

/**
 * 组件注册项
 */
type RegisteredComponent = ComponentType<A2UIComponentProps & Record<string, unknown>>;

/**
 * 组件注册表
 */
class ComponentRegistry {
  private registry: Map<string, RegisteredComponent> = new Map();

  /**
   * 注册组件
   */
  register(typeName: string, component: RegisteredComponent): void {
    if (!/^[a-zA-Z0-9]+$/.test(typeName)) {
      throw new Error(`[Registry] Invalid typeName '${typeName}'. Must be alphanumeric.`);
    }
    this.registry.set(typeName, component);
  }

  /**
   * 获取组件
   */
  get(typeName: string): RegisteredComponent | undefined {
    return this.registry.get(typeName);
  }

  /**
   * 检查组件是否已注册
   */
  has(typeName: string): boolean {
    return this.registry.has(typeName);
  }

  /**
   * 注销组件
   */
  unregister(typeName: string): boolean {
    return this.registry.delete(typeName);
  }

  /**
   * 获取所有已注册的组件类型
   */
  getRegisteredTypes(): string[] {
    return Array.from(this.registry.keys());
  }
}

export const componentRegistry = new ComponentRegistry();

export { ComponentRegistry };
