/**
 * SceneConfig - 场景配置
 *
 * 定义场景渲染的配置
 */

import type { PatternResult } from '../types';

/**
 * 场景区块渲染器
 * 将内容模型的一部分渲染为 A2UI 组件
 */
export type BlockRenderer<T = unknown> = (data: T, options: BlockRenderOptions) => PatternResult;

/**
 * 区块渲染选项
 */
export interface BlockRenderOptions {
  /** 组件 ID 前缀 */
  idPrefix: string;
  /** 场景上下文 */
  context?: Record<string, unknown>;
  /** 变体 */
  variant?: string;
}

/**
 * 区块配置
 */
export interface BlockConfig<T = unknown> {
  /** 区块类型 */
  type: string;
  /** 渲染器 */
  renderer: BlockRenderer<T>;
  /** 条件（返回 false 则不渲染） */
  condition?: (data: T, context?: Record<string, unknown>) => boolean;
  /** 包装器样式 */
  wrapperStyle?: Record<string, string>;
}

/**
 * 布局配置
 */
export interface LayoutConfig {
  /** 布局类型 */
  type: 'vertical' | 'horizontal' | 'grid' | 'split';
  /** 间距 */
  gap?: string;
  /** 对齐方式 */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /** 列数（grid 布局） */
  columns?: number;
  /** 分割比例（split 布局） */
  ratio?: string;
}

/**
 * 场景配置
 */
export interface SceneConfig<TContentModel = unknown> {
  /** 场景名称 */
  name: string;
  /** 场景描述 */
  description?: string;
  /** 布局配置 */
  layout: LayoutConfig;
  /** 区块列表 */
  blocks: Array<{
    /** 区块 ID */
    id: string;
    /** 从内容模型获取数据的路径或函数 */
    dataPath: string | ((model: TContentModel) => unknown);
    /** 区块配置 */
    config: BlockConfig;
  }>;
  /** 全局样式 */
  containerStyle?: Record<string, string>;
  /** 场景级别的条件 */
  condition?: (model: TContentModel) => boolean;
}

/**
 * 预设场景模板
 */
export const SceneTemplates = {
  /**
   * 欢迎场景模板
   */
  welcome: {
    name: 'welcome',
    layout: { type: 'vertical' as const, gap: '24px', align: 'center' as const },
    blocks: [],
    containerStyle: {
      padding: '32px',
      maxWidth: '800px',
      margin: '0 auto',
    },
  },

  /**
   * 学习场景模板
   */
  learning: {
    name: 'learning',
    layout: { type: 'split' as const, ratio: '1:1', gap: '24px' },
    blocks: [],
    containerStyle: {
      padding: '24px',
    },
  },

  /**
   * 练习场景模板
   */
  practice: {
    name: 'practice',
    layout: { type: 'vertical' as const, gap: '20px' },
    blocks: [],
    containerStyle: {
      padding: '24px',
      maxWidth: '700px',
      margin: '0 auto',
    },
  },

  /**
   * 反馈场景模板
   */
  feedback: {
    name: 'feedback',
    layout: { type: 'vertical' as const, gap: '16px', align: 'center' as const },
    blocks: [],
    containerStyle: {
      padding: '32px',
      maxWidth: '600px',
      margin: '0 auto',
    },
  },

  /**
   * 结果场景模板
   */
  result: {
    name: 'result',
    layout: { type: 'vertical' as const, gap: '24px', align: 'center' as const },
    blocks: [],
    containerStyle: {
      padding: '40px',
      maxWidth: '700px',
      margin: '0 auto',
    },
  },

  /**
   * 详情场景模板
   */
  detail: {
    name: 'detail',
    layout: { type: 'vertical' as const, gap: '20px' },
    blocks: [],
    containerStyle: {
      padding: '24px',
    },
  },

  /**
   * 列表场景模板
   */
  list: {
    name: 'list',
    layout: { type: 'grid' as const, columns: 3, gap: '16px' },
    blocks: [],
    containerStyle: {
      padding: '24px',
    },
  },
};

/**
 * 创建场景配置
 */
export function createSceneConfig<T>(
  template: keyof typeof SceneTemplates | Partial<SceneConfig<T>>,
  overrides?: Partial<SceneConfig<T>>
): SceneConfig<T> {
  const base = typeof template === 'string' ? SceneTemplates[template] : template;

  return {
    ...base,
    ...overrides,
    layout: {
      ...(base.layout || {}),
      ...(overrides?.layout || {}),
    },
    blocks: [...(base.blocks || []), ...(overrides?.blocks || [])],
    containerStyle: {
      ...(base.containerStyle || {}),
      ...(overrides?.containerStyle || {}),
    },
  } as SceneConfig<T>;
}
