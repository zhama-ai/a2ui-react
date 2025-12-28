/**
 * 通用 UI 模式类型定义
 */

import type { ServerToClientMessage } from '../types/types';

// ============ 通用返回类型 ============

/**
 * 模式构建结果
 * 包含根组件 ID 和所有生成的组件
 */
export interface PatternResult {
  /** 根组件 ID */
  rootId: string;
  /** 生成的所有组件 */
  components: unknown[];
}

/**
 * 带消息的模式构建结果
 * 用于需要完整 A2UI 消息的场景
 */
export interface PatternMessagesResult {
  /** 根组件 ID */
  rootId: string;
  /** 生成的所有组件 */
  components: unknown[];
  /** A2UI 消息 */
  messages: ServerToClientMessage[];
}

// ============ 通用数据类型 ============

/**
 * 统计项
 */
export interface StatItem {
  /** 图标名称 */
  icon: string;
  /** 标签 */
  label: string;
  /** 值 */
  value: string;
  /** 颜色（可选） */
  color?: string;
  /** 副标题（可选） */
  subtitle?: string;
  /** 趋势（可选） */
  trend?: {
    direction: 'up' | 'down' | 'flat';
    value: string;
  };
}

/**
 * 进度数据
 */
export interface ProgressData {
  /** 当前值 */
  current: number;
  /** 总值 */
  total: number;
  /** 标签（可选） */
  label?: string;
  /** 是否显示百分比 */
  showPercentage?: boolean;
  /** 颜色（可选） */
  color?: string;
}

/**
 * 操作按钮
 */
export interface ActionButton {
  /** 唯一 ID */
  id: string;
  /** 按钮文本 */
  text: string;
  /** 图标（可选） */
  icon?: string;
  /** 操作名称 */
  action: string;
  /** 操作上下文 */
  context?: Record<string, string>;
  /** 是否为主按钮 */
  primary?: boolean;
  /** 按钮类型 */
  type?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * 成就数据
 */
export interface AchievementData {
  /** 唯一 ID */
  id: string;
  /** 标题 */
  title: string;
  /** 描述 */
  description: string;
  /** 图标 */
  icon: string;
  /** 是否已解锁 */
  unlocked: boolean;
  /** 稀有度 */
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  /** 积分 */
  points?: number;
  /** 进度（0-100） */
  progress?: number;
  /** 解锁日期 */
  unlockedDate?: string;
}

/**
 * 卡片元数据项
 */
export interface MetadataItem {
  /** 图标 */
  icon: string;
  /** 文本 */
  text: string;
  /** 颜色（可选） */
  color?: string;
}

/**
 * 徽章
 */
export interface Badge {
  /** 文本 */
  text: string;
  /** 类型 */
  type?: 'info' | 'success' | 'warning' | 'error';
  /** 颜色（可选） */
  color?: string;
}

/**
 * 反馈消息
 */
export interface FeedbackMessage {
  /** 类型 */
  type: 'success' | 'error' | 'warning' | 'info';
  /** 标题 */
  title: string;
  /** 消息内容 */
  message: string;
  /** 图标（可选） */
  icon?: string;
  /** 详细说明（可选） */
  details?: string;
}

/**
 * 时间线项
 */
export interface TimelineItem {
  /** 唯一 ID */
  id: string;
  /** 标题 */
  title: string;
  /** 描述 */
  description?: string;
  /** 状态 */
  status: 'completed' | 'current' | 'pending';
  /** 图标（可选） */
  icon?: string;
  /** 时间（可选） */
  time?: string;
  /** 颜色（可选） */
  color?: string;
}

/**
 * 知识点/技能节点
 */
export interface KnowledgeNode {
  /** 唯一 ID */
  id: string;
  /** 标题 */
  title: string;
  /** 掌握度（0-100） */
  mastery: number;
  /** 颜色 */
  color: string;
  /** 相关课程 */
  relatedLesson?: string;
  /** 是否为当前节点 */
  isCurrent?: boolean;
  /** 是否需要复习 */
  needReview?: boolean;
}

/**
 * 内容区块基础类型
 */
export interface ContentSection {
  /** 区块类型 */
  type: string;
  /** 标题（可选） */
  title?: string;
}

/**
 * 文本区块
 */
export interface TextSectionData extends ContentSection {
  type: 'text';
  /** 内容（支持 Markdown） */
  content: string;
  /** 表情符号前缀 */
  emoji?: string;
}

/**
 * 代码区块
 */
export interface CodeBlockData extends ContentSection {
  type: 'code';
  /** 代码内容 */
  code: string;
  /** 语言 */
  language: string;
  /** 输出（可选） */
  output?: string;
  /** 是否可运行 */
  runnable?: boolean;
}

/**
 * 引用区块
 */
export interface QuoteData extends ContentSection {
  type: 'quote';
  /** 引用内容 */
  content: string;
  /** 作者（可选） */
  author?: string;
}

/**
 * 关键要点
 */
export interface KeyPointsData extends ContentSection {
  type: 'key-points';
  /** 要点列表 */
  points: Array<{
    icon: string;
    text: string;
    color?: string;
  }>;
}

/**
 * 步骤列表
 */
export interface StepListData extends ContentSection {
  type: 'step-list';
  /** 步骤列表 */
  steps: Array<{
    number: number;
    title: string;
    description?: string;
  }>;
}

/**
 * FAQ 列表
 */
export interface FaqListData extends ContentSection {
  type: 'faq-list';
  /** FAQ 列表 */
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

/**
 * 对比表格
 */
export interface ComparisonTableData extends ContentSection {
  type: 'comparison-table';
  /** 表头 */
  headers: string[];
  /** 行数据 */
  rows: Array<{
    label: string;
    values: string[];
  }>;
}

/**
 * 表单字段
 */
export interface FormField {
  /** 字段 ID */
  id: string;
  /** 标签 */
  label: string;
  /** 字段类型 */
  type: 'text' | 'number' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'date';
  /** 占位符 */
  placeholder?: string;
  /** 默认值 */
  defaultValue?: string;
  /** 是否必填 */
  required?: boolean;
  /** 验证错误消息 */
  error?: string;
  /** 提示文本 */
  hint?: string;
  /** 选项（用于 select） */
  options?: Array<{ value: string; label: string }>;
}

/**
 * 通用选项配置
 */
export interface PatternOptions {
  /** 组件 ID 前缀 */
  id?: string;
  /** 自定义样式类 */
  className?: string;
}
