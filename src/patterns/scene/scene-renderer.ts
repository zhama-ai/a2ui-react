/**
 * SceneRenderer - 场景渲染器
 *
 * 将语义化内容模型转换为 A2UI 组件
 */

import { createA2UIMessages } from '../../builders/message-builder';
import type { ComponentInstance } from '../../types/types';
import type { ServerToClientMessage } from '../../types/types';
import { createContainer } from '../components';
import type { PatternResult, PatternMessagesResult } from '../types';

import { createLayout } from './layout';
import type { SceneConfig, BlockConfig, BlockRenderOptions } from './scene-config';

/**
 * 场景渲染器类
 */
export class SceneRenderer<TContentModel = unknown> {
  private config: SceneConfig<TContentModel>;
  private customRenderers: Map<string, BlockConfig['renderer']> = new Map();

  constructor(config: SceneConfig<TContentModel>) {
    this.config = config;
  }

  /**
   * 注册自定义区块渲染器
   */
  registerBlockRenderer(type: string, renderer: BlockConfig['renderer']): this {
    this.customRenderers.set(type, renderer);
    return this;
  }

  /**
   * 渲染场景为 A2UI 组件
   */
  render(model: TContentModel, context?: Record<string, unknown>): PatternResult {
    // 检查场景条件
    if (this.config.condition && !this.config.condition(model)) {
      return { rootId: '', components: [] };
    }

    const components: unknown[] = [];
    const blockIds: string[] = [];
    const sceneId = `scene-${this.config.name}`;

    // 渲染每个区块
    this.config.blocks.forEach((block, index) => {
      const blockId = `${sceneId}-block-${block.id}`;

      // 获取区块数据
      const data = this.getBlockData(model, block.dataPath);

      // 检查区块条件
      if (block.config.condition && !block.config.condition(data, context)) {
        return;
      }

      // 获取渲染器
      const renderer = this.customRenderers.get(block.config.type) || block.config.renderer;
      if (!renderer) {
        console.warn(`No renderer found for block type: ${block.config.type}`);
        return;
      }

      // 渲染区块
      const renderOptions: BlockRenderOptions = {
        idPrefix: blockId,
        context,
        variant: undefined,
      };

      const blockResult = renderer(data, renderOptions);

      // 如果区块有包装器样式，添加包装容器
      if (block.config.wrapperStyle) {
        const wrapperId = `${blockId}-wrapper`;
        components.push(
          createContainer(wrapperId, [blockResult.rootId], block.config.wrapperStyle)
        );
        blockIds.push(wrapperId);
      } else {
        blockIds.push(blockResult.rootId);
      }

      components.push(...blockResult.components);
    });

    // 创建场景布局
    const layoutResult = createLayout(
      sceneId,
      this.config.layout,
      blockIds,
      this.config.containerStyle
    );

    components.push(...layoutResult.components);

    return { rootId: sceneId, components };
  }

  /**
   * 渲染场景为 A2UI 消息
   */
  renderToMessages(model: TContentModel, context?: Record<string, unknown>): PatternMessagesResult {
    const result = this.render(model, context);

    const messages = createA2UIMessages(result.rootId, result.components as ComponentInstance[]);

    return {
      ...result,
      messages,
    };
  }

  /**
   * 从模型获取区块数据
   */
  private getBlockData(
    model: TContentModel,
    dataPath: string | ((model: TContentModel) => unknown)
  ): unknown {
    if (typeof dataPath === 'function') {
      return dataPath(model);
    }

    // 简单的路径解析 (如 "user.profile.name")
    return dataPath.split('.').reduce((obj: unknown, key) => {
      if (obj && typeof obj === 'object' && key in (obj as Record<string, unknown>)) {
        return (obj as Record<string, unknown>)[key];
      }
      return undefined;
    }, model);
  }
}

/**
 * 创建场景渲染器
 */
export function createSceneRenderer<T>(config: SceneConfig<T>): SceneRenderer<T> {
  return new SceneRenderer(config);
}

/**
 * 简单场景渲染
 *
 * 快速将多个 PatternResult 组合成一个场景
 */
export function renderSimpleScene(
  sceneId: string,
  blocks: PatternResult[],
  options?: {
    layout?: 'vertical' | 'horizontal' | 'grid';
    gap?: string;
    containerStyle?: Record<string, string>;
  }
): PatternResult {
  const { layout = 'vertical', gap = '20px', containerStyle } = options || {};

  const components: unknown[] = [];
  const blockIds: string[] = [];

  // 收集所有区块
  blocks.forEach((block) => {
    blockIds.push(block.rootId);
    components.push(...block.components);
  });

  // 创建布局
  const layoutResult = createLayout(sceneId, { type: layout, gap }, blockIds, containerStyle);

  components.push(...layoutResult.components);

  return { rootId: sceneId, components };
}

/**
 * 渲染场景为 A2UI 消息
 */
export function renderSceneToMessages(
  sceneId: string,
  blocks: PatternResult[],
  options?: {
    layout?: 'vertical' | 'horizontal' | 'grid';
    gap?: string;
    containerStyle?: Record<string, string>;
  }
): ServerToClientMessage[] {
  const result = renderSimpleScene(sceneId, blocks, options);

  return createA2UIMessages(result.rootId, result.components as ComponentInstance[]);
}
