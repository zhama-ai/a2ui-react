/**
 * A2UI Text Component
 */

import type { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';

import { useTheme } from '../context/theme';
import { merge } from '../styles/utils';
import type { AnyComponentNode, MessageProcessor, SurfaceID, ResolvedText } from '../types/types';

import { extractStringValue, cn } from './utils';

export interface TextProps {
  component: AnyComponentNode;
  processor: MessageProcessor | null;
  surfaceId: SurfaceID | null;
  text: ResolvedText['text'];
  usageHint?: ResolvedText['usageHint'];
  /**
   * 是否使用 markdown 渲染
   * @default true
   */
  markdown?: boolean;
}

export function Text({
  component,
  processor,
  surfaceId,
  text,
  usageHint = 'body',
  markdown = true,
}: TextProps) {
  const theme = useTheme();

  const textValue = extractStringValue(text, component, processor, surfaceId);

  if (!textValue) {
    return <span className="text-gray-400">(empty)</span>;
  }

  const classes = merge(
    theme.components.Text.all,
    usageHint ? theme.components.Text[usageHint] : {}
  );

  // 如果启用 markdown 渲染
  if (markdown) {
    // 根据 usageHint 预处理文本
    const getMarkdownText = (): string => {
      switch (usageHint) {
        case 'h1':
          return `# ${textValue}`;
        case 'h2':
          return `## ${textValue}`;
        case 'h3':
          return `### ${textValue}`;
        case 'h4':
          return `#### ${textValue}`;
        case 'h5':
          return `##### ${textValue}`;
        case 'caption':
          return `*${textValue}*`;
        default:
          return textValue;
      }
    };

    return (
      <section className={cn(classes)}>
        <ReactMarkdown
          components={{
            p: ({ children }: { children?: ReactNode }) => (
              <p className={theme.markdown.p.join(' ')}>{children}</p>
            ),
            h1: ({ children }: { children?: ReactNode }) => (
              <h1 className={theme.markdown.h1.join(' ')}>{children}</h1>
            ),
            h2: ({ children }: { children?: ReactNode }) => (
              <h2 className={theme.markdown.h2.join(' ')}>{children}</h2>
            ),
            h3: ({ children }: { children?: ReactNode }) => (
              <h3 className={theme.markdown.h3.join(' ')}>{children}</h3>
            ),
            h4: ({ children }: { children?: ReactNode }) => (
              <h4 className={theme.markdown.h4.join(' ')}>{children}</h4>
            ),
            h5: ({ children }: { children?: ReactNode }) => (
              <h5 className={theme.markdown.h5.join(' ')}>{children}</h5>
            ),
            ul: ({ children }: { children?: ReactNode }) => (
              <ul className={theme.markdown.ul.join(' ')}>{children}</ul>
            ),
            ol: ({ children }: { children?: ReactNode }) => (
              <ol className={theme.markdown.ol.join(' ')}>{children}</ol>
            ),
            li: ({ children }: { children?: ReactNode }) => (
              <li className={theme.markdown.li.join(' ')}>{children}</li>
            ),
            a: ({ children, href }: { children?: ReactNode; href?: string }) => (
              <a href={href} className={theme.markdown.a.join(' ')}>
                {children}
              </a>
            ),
            strong: ({ children }: { children?: ReactNode }) => (
              <strong className={theme.markdown.strong.join(' ')}>{children}</strong>
            ),
            em: ({ children }: { children?: ReactNode }) => (
              <em className={theme.markdown.em.join(' ')}>{children}</em>
            ),
          }}
        >
          {getMarkdownText()}
        </ReactMarkdown>
      </section>
    );
  }

  // 普通文本渲染
  switch (usageHint) {
    case 'h1':
      return <h1 className={cn(classes)}>{textValue}</h1>;
    case 'h2':
      return <h2 className={cn(classes)}>{textValue}</h2>;
    case 'h3':
      return <h3 className={cn(classes)}>{textValue}</h3>;
    case 'h4':
      return <h4 className={cn(classes)}>{textValue}</h4>;
    case 'h5':
      return <h5 className={cn(classes)}>{textValue}</h5>;
    case 'caption':
      return <span className={cn(classes)}>{textValue}</span>;
    default:
      return <p className={cn(classes)}>{textValue}</p>;
  }
}
