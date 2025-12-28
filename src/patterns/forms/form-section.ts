/**
 * FormSection - 表单区块
 *
 * 完整表单区块（含标题、字段、按钮）
 */

import { createContainer, createText, createButton } from '../components';
import type { PatternResult, PatternOptions, ActionButton } from '../types';

import { createFieldSet } from './field-set';
import type { FieldSetOptions } from './field-set';

export interface FormSectionOptions extends PatternOptions {
  /** 标题 */
  title?: string;
  /** 描述 */
  description?: string;
  /** 字段组 */
  fieldSets: FieldSetOptions[];
  /** 提交按钮 */
  submitAction?: ActionButton;
  /** 取消按钮 */
  cancelAction?: ActionButton;
  /** 附加按钮 */
  extraActions?: ActionButton[];
  /** 变体 */
  variant?: 'default' | 'card' | 'wizard';
}

/**
 * 创建表单区块
 *
 * @example
 * ```typescript
 * const { rootId, components } = createFormSection({
 *   title: '用户注册',
 *   description: '请填写以下信息完成注册',
 *   fieldSets: [
 *     {
 *       legend: '账号信息',
 *       fields: [
 *         { id: 'email', label: '邮箱', type: 'email', required: true },
 *         { id: 'password', label: '密码', type: 'password', required: true },
 *       ],
 *     },
 *     {
 *       legend: '个人信息',
 *       fields: [
 *         { id: 'name', label: '姓名', type: 'text' },
 *       ],
 *     },
 *   ],
 *   submitAction: { id: 'submit', text: '注册', action: 'submit_form', primary: true },
 *   cancelAction: { id: 'cancel', text: '取消', action: 'cancel_form' },
 * });
 * ```
 */
export function createFormSection(options: FormSectionOptions): PatternResult {
  const {
    id = 'form-section',
    title,
    description,
    fieldSets,
    submitAction,
    cancelAction,
    extraActions,
    variant = 'default',
  } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const isCard = variant === 'card';
  const isWizard = variant === 'wizard';

  // 标题
  if (title) {
    const titleId = `${id}-title`;
    containerChildIds.push(titleId);
    components.push(
      createText(titleId, title, {
        fontSize: isWizard ? '20px' : '18px',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: description ? '8px' : '24px',
      })
    );
  }

  // 描述
  if (description) {
    const descId = `${id}-description`;
    containerChildIds.push(descId);
    components.push(
      createText(descId, description, {
        fontSize: '14px',
        color: '#6b7280',
        marginBottom: '24px',
        lineHeight: '1.5',
      })
    );
  }

  // 字段组
  const fieldSetsContainerId = `${id}-fieldsets`;
  const fieldSetIds: string[] = [];

  fieldSets.forEach((fieldSet, index) => {
    const fsId = `${id}-fieldset-${index}`;
    const fsResult = createFieldSet({
      ...fieldSet,
      id: fsId,
      variant: isCard ? 'bordered' : 'default',
    });
    fieldSetIds.push(fsResult.rootId);
    components.push(...fsResult.components);
  });
  components.push(
    createContainer(fieldSetsContainerId, fieldSetIds, {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    })
  );
  containerChildIds.push(fieldSetsContainerId);

  // 操作按钮区域
  if (submitAction || cancelAction || extraActions) {
    const actionsRowId = `${id}-actions`;
    const actionIds: string[] = [];

    // 额外按钮（左侧）
    if (extraActions) {
      extraActions.forEach((action, idx) => {
        const actionContext = action.context
          ? Object.entries(action.context).map(([key, value]) => ({ key, value }))
          : [];

        const extraBtnResult = createButton(
          `${id}-extra-action-${idx}`,
          action.text,
          action.action,
          actionContext,
          {
            styles: {
              backgroundColor: 'transparent',
              color: '#6b7280',
              border: 'none',
              padding: '10px 16px',
              fontSize: '14px',
              cursor: 'pointer',
            },
          }
        );
        actionIds.push(extraBtnResult.buttonId);
        components.push(...extraBtnResult.allComponents);
      });
    }

    // 占位符
    const spacerId = `${id}-spacer`;
    actionIds.push(spacerId);
    components.push(
      createContainer(spacerId, [], {
        flex: '1',
      })
    );

    // 取消按钮
    if (cancelAction) {
      const cancelContext = cancelAction.context
        ? Object.entries(cancelAction.context).map(([key, value]) => ({ key, value }))
        : [];

      const cancelBtnResult = createButton(
        `${id}-cancel`,
        cancelAction.text,
        cancelAction.action,
        cancelContext,
        {
          styles: {
            backgroundColor: 'transparent',
            color: '#374151',
            border: '1px solid #d1d5db',
            padding: '10px 20px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            marginRight: '12px',
          },
        }
      );
      actionIds.push(cancelBtnResult.buttonId);
      components.push(...cancelBtnResult.allComponents);
    }

    // 提交按钮
    if (submitAction) {
      const submitContext = submitAction.context
        ? Object.entries(submitAction.context).map(([key, value]) => ({ key, value }))
        : [];

      const submitBtnResult = createButton(
        `${id}-submit`,
        submitAction.text,
        submitAction.action,
        submitContext,
        {
          styles: {
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            border: 'none',
            padding: '10px 24px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
          },
        }
      );
      actionIds.push(submitBtnResult.buttonId);
      components.push(...submitBtnResult.allComponents);
    }
    components.push(
      createContainer(actionsRowId, actionIds, {
        display: 'flex',
        alignItems: 'center',
        marginTop: '32px',
        paddingTop: '24px',
        borderTop: '1px solid #e5e7eb',
      })
    );
    containerChildIds.push(actionsRowId);
  }

  // 主容器样式
  const containerStyle: Record<string, string> = {
    display: 'flex',
    flexDirection: 'column',
  };

  if (isCard) {
    containerStyle.padding = '32px';
    containerStyle.backgroundColor = '#ffffff';
    containerStyle.borderRadius = '16px';
    containerStyle.border = '1px solid #e5e7eb';
    containerStyle.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
  }

  // 主容器
  components.push(createContainer(id, containerChildIds, containerStyle));

  return { rootId: id, components };
}
