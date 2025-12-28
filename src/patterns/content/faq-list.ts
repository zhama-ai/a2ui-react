/**
 * FaqList - FAQ 列表
 *
 * 问答列表
 */

import { createContainer, createText, createButton } from '../components';
import type { PatternResult, PatternOptions } from '../types';

export interface FaqItem {
  /** 问题 */
  question: string;
  /** 答案 */
  answer: string;
  /** 是否展开（用于交互） */
  expanded?: boolean;
}

export interface FaqListOptions extends PatternOptions {
  /** 标题 */
  title?: string;
  /** FAQ 列表 */
  faqs: FaqItem[];
  /** 变体 */
  variant?: 'default' | 'accordion' | 'cards';
  /** 展开动作（用于 accordion） */
  toggleAction?: string;
}

/**
 * 创建 FAQ 列表
 *
 * @example
 * ```typescript
 * const { rootId, components } = createFaqList({
 *   title: '常见问题',
 *   faqs: [
 *     { question: '什么是变量？', answer: '变量是存储数据的容器...' },
 *     { question: '如何定义变量？', answer: '使用赋值语句 x = value...' },
 *   ],
 *   variant: 'cards',
 * });
 * ```
 */
export function createFaqList(options: FaqListOptions): PatternResult {
  const { id = 'faq-list', title, faqs, variant = 'default', toggleAction } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const isAccordion = variant === 'accordion';
  const isCards = variant === 'cards';

  // 标题
  if (title) {
    const titleId = `${id}-title`;
    containerChildIds.push(titleId);
    components.push(
      createText(titleId, title, {
        fontSize: '18px',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '20px',
      })
    );
  }

  // FAQ 列表
  const listId = `${id}-list`;
  const faqIds: string[] = [];

  faqs.forEach((faq, index) => {
    const faqId = `${id}-faq-${index}`;
    const faqChildIds: string[] = [];

    const isExpanded = faq.expanded !== false; // 默认展开

    // 问题
    const questionRowId = `${faqId}-question-row`;
    const questionChildIds: string[] = [];

    // Q 标记
    const qMarkId = `${faqId}-q-mark`;
    questionChildIds.push(qMarkId);
    components.push(
      createText(qMarkId, 'Q', {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#3b82f6',
        backgroundColor: '#eff6ff',
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        flexShrink: '0',
      })
    );

    const questionId = `${faqId}-question`;
    questionChildIds.push(questionId);
    components.push(
      createText(questionId, faq.question, {
        fontSize: '15px',
        fontWeight: '600',
        color: '#1f2937',
        marginLeft: '12px',
        flex: '1',
      })
    );

    // 展开/收起按钮（accordion 模式）
    if (isAccordion && toggleAction) {
      const toggleBtnResult = createButton(
        `${faqId}-toggle`,
        isExpanded ? '−' : '+',
        toggleAction,
        [{ key: 'faqIndex', value: `${index}` }],
        {
          styles: {
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '20px',
            color: '#6b7280',
            cursor: 'pointer',
            padding: '0 4px',
          },
        }
      );
      questionChildIds.push(toggleBtnResult.buttonId);
      components.push(...toggleBtnResult.allComponents);
    }
    components.push(
      createContainer(questionRowId, questionChildIds, {
        display: 'flex',
        alignItems: 'center',
        cursor: isAccordion ? 'pointer' : 'default',
      })
    );
    faqChildIds.push(questionRowId);

    // 答案（非 accordion 或已展开）
    if (!isAccordion || isExpanded) {
      const answerRowId = `${faqId}-answer-row`;
      const answerChildIds: string[] = [];

      // A 标记
      const aMarkId = `${faqId}-a-mark`;
      answerChildIds.push(aMarkId);
      components.push(
        createText(aMarkId, 'A', {
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#10b981',
          backgroundColor: '#ecfdf5',
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '4px',
          flexShrink: '0',
        })
      );

      const answerId = `${faqId}-answer`;
      answerChildIds.push(answerId);
      components.push(
        createText(answerId, faq.answer, {
          fontSize: '14px',
          color: '#4b5563',
          marginLeft: '12px',
          lineHeight: '1.6',
          flex: '1',
        })
      );
      components.push(
        createContainer(answerRowId, answerChildIds, {
          display: 'flex',
          alignItems: 'flex-start',
          marginTop: '12px',
        })
      );
      faqChildIds.push(answerRowId);
    }

    // FAQ 项容器
    const faqStyle: Record<string, string> = {
      display: 'flex',
      flexDirection: 'column',
      padding: '16px',
    };

    if (isCards) {
      faqStyle.backgroundColor = '#ffffff';
      faqStyle.border = '1px solid #e5e7eb';
      faqStyle.borderRadius = '12px';
    } else {
      faqStyle.borderBottom = index < faqs.length - 1 ? '1px solid #e5e7eb' : 'none';
    }

    components.push(createContainer(faqId, faqChildIds, faqStyle));
    faqIds.push(faqId);
  });
  components.push(
    createContainer(listId, faqIds, {
      display: 'flex',
      flexDirection: 'column',
      gap: isCards ? '12px' : '0',
    })
  );
  containerChildIds.push(listId);

  // 主容器
  components.push(
    createContainer(id, containerChildIds, {
      display: 'flex',
      flexDirection: 'column',
    })
  );

  return { rootId: id, components };
}
