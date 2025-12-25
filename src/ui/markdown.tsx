/**
 * A2UI Markdown Utilities
 */

import type { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';

import { useTheme } from '../context/theme';

export interface MarkdownProps {
  children: string;
  className?: string;
}

/**
 * Markdown 渲染组件
 */
export function Markdown({ children, className }: MarkdownProps) {
  const theme = useTheme();

  return (
    <div className={className}>
      <ReactMarkdown
        components={{
          p: ({ children: content }: { children?: ReactNode }) => (
            <p className={theme.markdown.p.join(' ')}>{content}</p>
          ),
          h1: ({ children: content }: { children?: ReactNode }) => (
            <h1 className={theme.markdown.h1.join(' ')}>{content}</h1>
          ),
          h2: ({ children: content }: { children?: ReactNode }) => (
            <h2 className={theme.markdown.h2.join(' ')}>{content}</h2>
          ),
          h3: ({ children: content }: { children?: ReactNode }) => (
            <h3 className={theme.markdown.h3.join(' ')}>{content}</h3>
          ),
          h4: ({ children: content }: { children?: ReactNode }) => (
            <h4 className={theme.markdown.h4.join(' ')}>{content}</h4>
          ),
          h5: ({ children: content }: { children?: ReactNode }) => (
            <h5 className={theme.markdown.h5.join(' ')}>{content}</h5>
          ),
          ul: ({ children: content }: { children?: ReactNode }) => (
            <ul className={theme.markdown.ul.join(' ')}>{content}</ul>
          ),
          ol: ({ children: content }: { children?: ReactNode }) => (
            <ol className={theme.markdown.ol.join(' ')}>{content}</ol>
          ),
          li: ({ children: content }: { children?: ReactNode }) => (
            <li className={theme.markdown.li.join(' ')}>{content}</li>
          ),
          a: ({ children: content, href }: { children?: ReactNode; href?: string }) => (
            <a href={href} className={theme.markdown.a.join(' ')}>
              {content}
            </a>
          ),
          strong: ({ children: content }: { children?: ReactNode }) => (
            <strong className={theme.markdown.strong.join(' ')}>{content}</strong>
          ),
          em: ({ children: content }: { children?: ReactNode }) => (
            <em className={theme.markdown.em.join(' ')}>{content}</em>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

/**
 * 简单的 markdown 到 HTML 转换
 * 注意：这个函数返回一个 React 元素，不是原始 HTML 字符串
 */
export function renderMarkdown(value: string): ReactNode {
  return <ReactMarkdown>{value}</ReactMarkdown>;
}
