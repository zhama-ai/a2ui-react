/**
 * CodeBlock - 代码块
 *
 * 代码展示区域
 */

import { createContainer, createText, createButton } from '../components';
import type { PatternResult, PatternOptions, ActionButton } from '../types';

export interface CodeBlockOptions extends PatternOptions {
  /** 代码内容 */
  code: string;
  /** 语言 */
  language?: string;
  /** 标题 */
  title?: string;
  /** 是否显示行号 */
  showLineNumbers?: boolean;
  /** 输出结果 */
  output?: string;
  /** 是否可运行 */
  runnable?: boolean;
  /** 运行按钮动作 */
  runAction?: ActionButton;
  /** 复制按钮动作 */
  copyAction?: ActionButton;
  /** 变体 */
  variant?: 'default' | 'compact' | 'terminal';
}

/**
 * 创建代码块
 *
 * @example
 * ```typescript
 * const { rootId, components } = createCodeBlock({
 *   language: 'python',
 *   title: 'hello.py',
 *   code: 'print("Hello, World!")',
 *   output: 'Hello, World!',
 *   runnable: true,
 *   runAction: { id: 'run', text: '运行', action: 'run_code' },
 * });
 * ```
 */
export function createCodeBlock(options: CodeBlockOptions): PatternResult {
  const {
    id = 'code-block',
    code,
    language,
    title,
    showLineNumbers = false,
    output,
    runnable = false,
    runAction,
    copyAction,
    variant = 'default',
  } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const isCompact = variant === 'compact';
  const isTerminal = variant === 'terminal';

  // 头部（标题、语言、按钮）
  if (title || language || runnable || copyAction) {
    const headerRowId = `${id}-header`;
    const headerChildIds: string[] = [];

    // 标题/文件名
    if (title) {
      const titleId = `${id}-title`;
      headerChildIds.push(titleId);
      components.push(
        createText(titleId, title, {
          fontSize: '13px',
          fontWeight: '500',
          color: isTerminal ? '#9ca3af' : '#4b5563',
          fontFamily: 'monospace',
        })
      );
    }

    // 语言标签
    if (language && !title) {
      const langId = `${id}-language`;
      headerChildIds.push(langId);
      components.push(
        createText(langId, language, {
          fontSize: '12px',
          color: '#9ca3af',
          textTransform: 'uppercase',
        })
      );
    }

    // 占位符
    const spacerId = `${id}-spacer`;
    headerChildIds.push(spacerId);
    components.push(
      createContainer(spacerId, [], {
        flex: '1',
      })
    );

    // 复制按钮
    if (copyAction) {
      const copyContext = copyAction.context
        ? Object.entries(copyAction.context).map(([key, value]) => ({ key, value }))
        : [];
      const copyBtnResult = createButton(
        `${id}-copy-btn`,
        copyAction.text || '复制',
        copyAction.action,
        copyContext, {
      styles: {
          backgroundColor: 'transparent',
          color: '#6b7280',
          border: 'none',
          padding: '4px 8px',
          fontSize: '12px',
          cursor: 'pointer',
        },
    });
      headerChildIds.push(copyBtnResult.buttonId);
      components.push(...copyBtnResult.allComponents);
    }

    // 运行按钮
    if (runnable && runAction) {
      const runContext = runAction.context
        ? Object.entries(runAction.context).map(([key, value]) => ({ key, value }))
        : [];
      const runBtnResult = createButton(
        `${id}-run-btn`,
        runAction.text || '▶ 运行',
        runAction.action,
        runContext, {
      styles: {
          backgroundColor: '#10b981',
          color: '#ffffff',
          border: 'none',
          padding: '4px 12px',
          borderRadius: '4px',
          fontSize: '12px',
          cursor: 'pointer',
          marginLeft: '8px',
        },
    });
      headerChildIds.push(runBtnResult.buttonId);
      components.push(...runBtnResult.allComponents);
    }
    components.push(
      createContainer(headerRowId, headerChildIds, {
        display: 'flex',
        alignItems: 'center',
        padding: isCompact ? '8px 12px' : '10px 16px',
        backgroundColor: isTerminal ? '#1e1e1e' : '#f3f4f6',
        borderBottom: isTerminal ? '1px solid #333' : '1px solid #e5e7eb',
        borderRadius: '8px 8px 0 0',
      })
    );
    containerChildIds.push(headerRowId);
  }

  // 代码区域
  const codeAreaId = `${id}-code-area`;
  const codeAreaChildIds: string[] = [];

  // 行号
  if (showLineNumbers) {
    const lines = code.split('\n');
    const lineNumbersId = `${id}-line-numbers`;
    const lineNumIds: string[] = [];

    lines.forEach((_, idx) => {
      const lineNumId = `${lineNumbersId}-${idx}`;
      lineNumIds.push(lineNumId);
      components.push(
        createText(lineNumId, `${idx + 1}`, {
          fontSize: '13px',
          fontFamily: 'monospace',
          color: '#6b7280',
          textAlign: 'right',
          minWidth: '32px',
          paddingRight: '12px',
          lineHeight: '1.6',
        })
      );
    });
    components.push(
      createContainer(lineNumbersId, lineNumIds, {
        display: 'flex',
        flexDirection: 'column',
        borderRight: isTerminal ? '1px solid #333' : '1px solid #e5e7eb',
        paddingRight: '8px',
        marginRight: '12px',
        userSelect: 'none',
      })
    );
    codeAreaChildIds.push(lineNumbersId);
  }

  // 代码内容
  const codeId = `${id}-code`;
  codeAreaChildIds.push(codeId);
  components.push(
    createText(codeId, code, {
      fontSize: '13px',
      fontFamily: 'Monaco, Menlo, Consolas, "Courier New", monospace',
      color: isTerminal ? '#d4d4d4' : '#1f2937',
      lineHeight: '1.6',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all',
      flex: '1',
    })
  );
  components.push(
    createContainer(codeAreaId, codeAreaChildIds, {
      display: 'flex',
      padding: isCompact ? '12px' : '16px',
      backgroundColor: isTerminal ? '#1e1e1e' : '#fafafa',
      overflow: 'auto',
    })
  );
  containerChildIds.push(codeAreaId);

  // 输出区域
  if (output) {
    const outputAreaId = `${id}-output`;
    const outputChildIds: string[] = [];

    const outputLabelId = `${id}-output-label`;
    outputChildIds.push(outputLabelId);
    components.push(
      createText(outputLabelId, '输出:', {
        fontSize: '12px',
        color: '#6b7280',
        marginBottom: '8px',
      })
    );

    const outputContentId = `${id}-output-content`;
    outputChildIds.push(outputContentId);
    components.push(
      createText(outputContentId, output, {
        fontSize: '13px',
        fontFamily: 'monospace',
        color: isTerminal ? '#10b981' : '#1f2937',
        whiteSpace: 'pre-wrap',
        backgroundColor: isTerminal ? '#0a0a0a' : '#f0fdf4',
        padding: '8px 12px',
        borderRadius: '4px',
      })
    );
    components.push(
      createContainer(outputAreaId, outputChildIds, {
        display: 'flex',
        flexDirection: 'column',
        padding: '12px 16px',
        borderTop: isTerminal ? '1px solid #333' : '1px solid #e5e7eb',
        backgroundColor: isTerminal ? '#1e1e1e' : '#fafafa',
        borderRadius: '0 0 8px 8px',
      })
    );
    containerChildIds.push(outputAreaId);
  }

  // 主容器
  components.push(
    createContainer(id, containerChildIds, {
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '8px',
      border: isTerminal ? '1px solid #333' : '1px solid #e5e7eb',
      overflow: 'hidden',
    })
  );

  return { rootId: id, components };
}
