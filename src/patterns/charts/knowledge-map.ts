/**
 * KnowledgeMap - 知识图谱
 *
 * 展示知识点掌握情况
 */

import { createContainer, createText, createButton } from '../components';
import type { PatternResult, PatternOptions, KnowledgeNode } from '../types';

export interface KnowledgeMapOptions extends PatternOptions {
  /** 标题 */
  title?: string;
  /** 知识节点 */
  nodes: KnowledgeNode[];
  /** 节点点击动作 */
  action?: string;
  /** 变体 */
  variant?: 'default' | 'compact' | 'detailed';
  /** 列数 */
  columns?: 2 | 3 | 4;
}

/**
 * 获取掌握度颜色
 */
function getMasteryColor(mastery: number): string {
  if (mastery >= 80) return '#10b981';
  if (mastery >= 60) return '#3b82f6';
  if (mastery >= 40) return '#f59e0b';
  if (mastery >= 20) return '#f97316';
  return '#ef4444';
}

/**
 * 创建知识图谱
 *
 * @example
 * ```typescript
 * const { rootId, components } = createKnowledgeMap({
 *   title: '知识掌握',
 *   nodes: [
 *     { id: '1', title: '变量', mastery: 90, color: '#10b981' },
 *     { id: '2', title: '函数', mastery: 75, color: '#3b82f6' },
 *     { id: '3', title: '循环', mastery: 45, color: '#f59e0b', needReview: true },
 *   ],
 *   action: 'view_knowledge',
 * });
 * ```
 */
export function createKnowledgeMap(options: KnowledgeMapOptions): PatternResult {
  const { id = 'knowledge-map', title, nodes, action, variant = 'default', columns = 3 } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const isCompact = variant === 'compact';
  const isDetailed = variant === 'detailed';

  // 标题
  if (title) {
    const titleId = `${id}-title`;
    containerChildIds.push(titleId);
    components.push(
      createText(titleId, title, {
        fontSize: '16px',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '16px',
      })
    );
  }

  // 节点网格
  const gridId = `${id}-grid`;
  const nodeIds: string[] = [];

  nodes.forEach((node, index) => {
    const nodeId = `${id}-node-${index}`;
    const nodeChildIds: string[] = [];

    const color = node.color || getMasteryColor(node.mastery);

    // 进度环（简化为进度条）
    const progressId = `${nodeId}-progress`;
    const progressChildIds: string[] = [];

    // 进度条背景
    const trackId = `${nodeId}-track`;
    const trackChildIds: string[] = [];

    const fillId = `${nodeId}-fill`;
    trackChildIds.push(fillId);
    components.push(
      createContainer(fillId, [], {
        width: `${node.mastery}%`,
        height: '100%',
        backgroundColor: color,
        borderRadius: '4px',
        transition: 'width 0.3s ease',
      })
    );
    components.push(
      createContainer(trackId, trackChildIds, {
        width: '100%',
        height: isCompact ? '4px' : '6px',
        backgroundColor: '#e5e7eb',
        borderRadius: '4px',
        overflow: 'hidden',
      })
    );
    progressChildIds.push(trackId);
    components.push(
      createContainer(progressId, progressChildIds, {
        width: '100%',
        marginBottom: '8px',
      })
    );
    nodeChildIds.push(progressId);

    // 标题行
    const titleRowId = `${nodeId}-title-row`;
    const titleRowChildIds: string[] = [];

    const nodeTitleId = `${nodeId}-title`;
    titleRowChildIds.push(nodeTitleId);
    components.push(
      createText(nodeTitleId, node.title, {
        fontSize: isCompact ? '12px' : '14px',
        fontWeight: '500',
        color: node.isCurrent ? color : '#374151',
        flex: '1',
      })
    );

    // 掌握度百分比
    const masteryId = `${nodeId}-mastery`;
    titleRowChildIds.push(masteryId);
    components.push(
      createText(masteryId, `${node.mastery}%`, {
        fontSize: isCompact ? '11px' : '12px',
        fontWeight: '600',
        color: color,
      })
    );
    components.push(
      createContainer(titleRowId, titleRowChildIds, {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      })
    );
    nodeChildIds.push(titleRowId);

    // 需要复习标记
    if (node.needReview && !isCompact) {
      const reviewId = `${nodeId}-review`;
      nodeChildIds.push(reviewId);
      components.push(
        createText(reviewId, '📝 需要复习', {
          fontSize: '11px',
          color: '#f59e0b',
          marginTop: '6px',
        })
      );
    }

    // 相关课程
    if (node.relatedLesson && isDetailed) {
      const lessonId = `${nodeId}-lesson`;
      nodeChildIds.push(lessonId);
      components.push(
        createText(lessonId, `📖 ${node.relatedLesson}`, {
          fontSize: '11px',
          color: '#6b7280',
          marginTop: '4px',
        })
      );
    }

    // 节点容器
    let actualNodeId = nodeId;
    if (action) {
      const context = [
        { key: 'nodeId', value: node.id },
        { key: 'nodeTitle', value: node.title },
      ];
      // 使用节点标题作为按钮文本
      const buttonText = node.needReview ? `📝 ${node.title}` : node.title;
      const nodeBtnResult = createButton(nodeId, buttonText, action, context, {
        styles: {
          display: 'flex',
          flexDirection: 'column',
          padding: isCompact ? '10px' : '14px',
          backgroundColor: node.isCurrent ? `${color}08` : '#ffffff',
          border: node.isCurrent ? `2px solid ${color}` : '1px solid #e5e7eb',
          borderRadius: '10px',
          cursor: 'pointer',
          transition: 'all 0.2s',
          textAlign: 'left',
        },
      });
      components.push(...nodeBtnResult.allComponents);
      actualNodeId = nodeBtnResult.buttonId;
    } else {
      components.push(
        createContainer(nodeId, nodeChildIds, {
          display: 'flex',
          flexDirection: 'column',
          padding: isCompact ? '10px' : '14px',
          backgroundColor: node.isCurrent ? `${color}08` : '#ffffff',
          border: node.isCurrent ? `2px solid ${color}` : '1px solid #e5e7eb',
          borderRadius: '10px',
        })
      );
    }

    nodeIds.push(actualNodeId);
  });
  components.push(
    createContainer(gridId, nodeIds, {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: isCompact ? '8px' : '12px',
    })
  );
  containerChildIds.push(gridId);

  // 主容器
  components.push(
    createContainer(id, containerChildIds, {
      display: 'flex',
      flexDirection: 'column',
    })
  );

  return { rootId: id, components };
}
