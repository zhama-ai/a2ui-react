/**
 * Scene 模式 - 场景渲染框架
 *
 * 提供一个通用的场景渲染框架，将语义化内容模型转换为 A2UI 消息
 *
 * 核心概念：
 * - SceneConfig: 场景配置，定义如何渲染一个场景
 * - SceneRenderer: 场景渲染器，将内容模型转换为 A2UI 组件
 * - ContentModel: 语义化内容模型（由业务层定义）
 */

export * from './scene-renderer';
export * from './scene-config';
export * from './layout';
