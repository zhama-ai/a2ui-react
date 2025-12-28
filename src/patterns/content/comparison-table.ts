/**
 * ComparisonTable - 对比表格
 *
 * 功能/特性对比表格
 */

import { createContainer, createText } from '../components';
import type { PatternResult, PatternOptions } from '../types';

export interface ComparisonRow {
  /** 特性名称 */
  feature: string;
  /** 各列的值 */
  values: (string | boolean)[];
}

export interface ComparisonTableOptions extends PatternOptions {
  /** 标题 */
  title?: string;
  /** 表头 */
  headers: string[];
  /** 行数据 */
  rows: ComparisonRow[];
  /** 变体 */
  variant?: 'default' | 'striped' | 'compact';
  /** 高亮列索引 */
  highlightColumn?: number;
}

/**
 * 创建对比表格
 *
 * @example
 * ```typescript
 * const { rootId, components } = createComparisonTable({
 *   title: '版本对比',
 *   headers: ['特性', '免费版', '专业版', '企业版'],
 *   rows: [
 *     { feature: '课程数量', values: ['10', '100', '无限'] },
 *     { feature: '证书', values: [false, true, true] },
 *     { feature: '客服支持', values: ['邮件', '在线', '24/7'] },
 *   ],
 *   highlightColumn: 2,
 * });
 * ```
 */
export function createComparisonTable(options: ComparisonTableOptions): PatternResult {
  const {
    id = 'comparison-table',
    title,
    headers,
    rows,
    variant = 'default',
    highlightColumn,
  } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const isStriped = variant === 'striped';
  const isCompact = variant === 'compact';

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

  // 表格容器
  const tableId = `${id}-table`;
  const tableRowIds: string[] = [];

  // 表头
  const headerRowId = `${id}-header`;
  const headerCellIds: string[] = [];

  headers.forEach((header, colIndex) => {
    const cellId = `${headerRowId}-cell-${colIndex}`;
    headerCellIds.push(cellId);

    const isHighlight = highlightColumn === colIndex;
    components.push(
      createText(cellId, header, {
        fontSize: isCompact ? '12px' : '13px',
        fontWeight: '600',
        color: isHighlight ? '#3b82f6' : '#374151',
        padding: isCompact ? '8px 12px' : '12px 16px',
        backgroundColor: isHighlight ? '#eff6ff' : '#f9fafb',
        borderBottom: '2px solid #e5e7eb',
        flex: colIndex === 0 ? '2' : '1',
        textAlign: colIndex === 0 ? 'left' : 'center',
      })
    );
  });
  components.push(
    createContainer(headerRowId, headerCellIds, {
      display: 'flex',
    })
  );
  tableRowIds.push(headerRowId);

  // 数据行
  rows.forEach((row, rowIndex) => {
    const rowId = `${id}-row-${rowIndex}`;
    const cellIds: string[] = [];

    // 特性名称
    const featureCellId = `${rowId}-feature`;
    cellIds.push(featureCellId);
    components.push(
      createText(featureCellId, row.feature, {
        fontSize: isCompact ? '12px' : '14px',
        fontWeight: '500',
        color: '#374151',
        padding: isCompact ? '8px 12px' : '12px 16px',
        backgroundColor: isStriped && rowIndex % 2 === 1 ? '#f9fafb' : 'transparent',
        flex: '2',
      })
    );

    // 值
    row.values.forEach((value, colIndex) => {
      const cellId = `${rowId}-cell-${colIndex}`;
      cellIds.push(cellId);

      const isHighlight = highlightColumn === colIndex + 1;
      let displayValue: string;
      let valueColor = '#4b5563';

      if (typeof value === 'boolean') {
        displayValue = value ? '✓' : '—';
        valueColor = value ? '#10b981' : '#9ca3af';
      } else {
        displayValue = value;
      }

      components.push(
        createText(cellId, displayValue, {
          fontSize: isCompact ? '12px' : '14px',
          color: valueColor,
          padding: isCompact ? '8px 12px' : '12px 16px',
          backgroundColor: isHighlight
            ? '#f0f9ff'
            : isStriped && rowIndex % 2 === 1
              ? '#f9fafb'
              : 'transparent',
          flex: '1',
          textAlign: 'center',
        })
      );
    });
    components.push(
      createContainer(rowId, cellIds, {
        display: 'flex',
        borderBottom: rowIndex < rows.length - 1 ? '1px solid #e5e7eb' : 'none',
      })
    );
    tableRowIds.push(rowId);
  });
  components.push(
    createContainer(tableId, tableRowIds, {
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      overflow: 'hidden',
    })
  );
  containerChildIds.push(tableId);

  // 主容器
  components.push(
    createContainer(id, containerChildIds, {
      display: 'flex',
      flexDirection: 'column',
    })
  );

  return { rootId: id, components };
}
