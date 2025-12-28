/**
 * A2UI Component Builder
 *
 * 提供 A2UI 组件定义的构建工具函数
 * 用于创建符合 A2UI 协议的组件结构
 */

import { generateId } from './message-builder';
import type {
  ComponentDefinition,
  ButtonResult,
  TextOptions,
  IconOptions,
  LayoutOptions,
  CardOptions,
  ListOptions,
  TabsOptions,
  DividerOptions,
  ButtonOptions,
  TabItem,
  ActionDefinition,
} from './types';

// ============================================================================
// 基础组件
// ============================================================================

/**
 * 创建 Text 组件
 *
 * @param text - 文本内容
 * @param options - 组件选项
 */
export function createText(text: string, options: TextOptions = {}): ComponentDefinition {
  const id = options.id || generateId('text');
  return {
    id,
    component: {
      Text: {
        text: { literalString: text },
        ...(options.usageHint && { usageHint: options.usageHint }),
        ...(options.markdown && { markdown: true }),
      },
    },
  };
}

/**
 * 创建数据绑定的 Text 组件
 * 文本内容从 DataModel 的指定路径读取，支持实时更新
 *
 * @param path - 数据路径，如 "/progress/percentage"
 * @param options - 组件选项
 */
export function createBoundText(path: string, options: TextOptions = {}): ComponentDefinition {
  const id = options.id || generateId('bound_text');
  return {
    id,
    component: {
      Text: {
        text: { path },
        ...(options.usageHint && { usageHint: options.usageHint }),
        ...(options.markdown && { markdown: true }),
      },
    },
  };
}

/**
 * 创建 Icon 组件
 *
 * @param name - 图标名称
 * @param options - 组件选项
 */
export function createIcon(name: string, options: IconOptions = {}): ComponentDefinition {
  return {
    id: options.id || generateId('icon'),
    component: {
      Icon: {
        name: { literalString: name },
        ...(options.size && { size: options.size }),
        ...(options.color && { color: options.color }),
        ...(options.container && { container: true }),
        ...(options.variant && { variant: options.variant }),
      },
    },
  };
}

/**
 * 创建数据绑定的 Icon 组件
 *
 * @param namePath - 图标名称的数据路径
 * @param options - 组件选项
 */
export function createBoundIcon(namePath: string, options: IconOptions = {}): ComponentDefinition {
  return {
    id: options.id || generateId('bound_icon'),
    component: {
      Icon: {
        name: { path: namePath },
        ...(options.size && { size: options.size }),
        ...(options.color && { color: options.color }),
        ...(options.container && { container: true }),
        ...(options.variant && { variant: options.variant }),
      },
    },
  };
}

// ============================================================================
// 布局组件
// ============================================================================

/**
 * 创建 Column 组件（垂直布局）
 *
 * @param childIds - 子组件 ID 数组
 * @param options - 布局选项
 */
export function createColumn(childIds: string[], options: LayoutOptions = {}): ComponentDefinition {
  return {
    id: options.id || generateId('column'),
    component: {
      Column: {
        children: { explicitList: childIds },
        ...(options.alignment && { alignment: options.alignment }),
      },
    },
  };
}

/**
 * 创建 Row 组件（水平布局）
 *
 * @param childIds - 子组件 ID 数组
 * @param options - 布局选项
 */
export function createRow(childIds: string[], options: LayoutOptions = {}): ComponentDefinition {
  return {
    id: options.id || generateId('row'),
    component: {
      Row: {
        children: { explicitList: childIds },
        ...(options.alignment && { alignment: options.alignment }),
        ...(options.distribution && { distribution: options.distribution }),
      },
    },
  };
}

/**
 * 创建 Card 组件
 *
 * @param childIds - 子组件 ID 数组
 * @param options - 卡片选项
 */
export function createCard(childIds: string[], options: CardOptions = {}): ComponentDefinition {
  return {
    id: options.id || generateId('card'),
    component: {
      Card: {
        children: { explicitList: childIds },
      },
    },
  };
}

/**
 * 创建 List 组件
 *
 * @param childIds - 子组件 ID 数组
 * @param options - 列表选项
 */
export function createList(childIds: string[], options: ListOptions = {}): ComponentDefinition {
  return {
    id: options.id || generateId('list'),
    component: {
      List: {
        children: { explicitList: childIds },
        ...(options.direction && { direction: options.direction }),
      },
    },
  };
}

/**
 * 创建 Tabs 组件
 *
 * @param tabs - Tab 项目数组
 * @param options - Tabs 选项
 */
export function createTabs(tabs: TabItem[], options: TabsOptions = {}): ComponentDefinition {
  return {
    id: options.id || generateId('tabs'),
    component: {
      Tabs: {
        tabItems: tabs.map((tab) => ({
          title: { literalString: tab.title },
          child: tab.contentId,
        })),
      },
    },
  };
}

/**
 * 创建 Divider 组件
 *
 * @param options - 分割线选项
 */
export function createDivider(options: DividerOptions = {}): ComponentDefinition {
  return {
    id: options.id || generateId('divider'),
    component: {
      Divider: {
        ...(options.axis && { axis: options.axis }),
        ...(options.thickness && { thickness: options.thickness }),
        ...(options.color && { color: options.color }),
      },
    },
  };
}

// ============================================================================
// 交互组件
// ============================================================================

/**
 * 创建 Button 组件
 *
 * @param text - 按钮文本
 * @param action - 按钮动作
 * @param options - 按钮选项
 * @returns 包含按钮和相关组件的结果对象
 */
export function createButton(
  text: string,
  action: ActionDefinition,
  options: ButtonOptions = {}
): ButtonResult {
  const buttonId = options.buttonId || generateId('btn');
  const textId = options.id || generateId('btn_text');

  const textComponent = createText(text, { id: textId, usageHint: 'label' });

  let childId = textId;
  const components: ComponentDefinition[] = [textComponent];

  if (options.icon) {
    const iconId = generateId('btn_icon');
    const iconComponent = createIcon(options.icon, { id: iconId, size: 16 });
    components.push(iconComponent);

    const rowId = generateId('btn_content');
    const rowComponent = createRow([iconId, textId], {
      id: rowId,
      alignment: 'center',
      distribution: 'center',
    });
    // 设置内部间距
    const rowComp = rowComponent.component as Record<string, Record<string, unknown>>;
    if (rowComp.Row) {
      rowComp.Row.gap = 2;
    }
    components.push(rowComponent);
    childId = rowId;
  }

  // 将按钮文本添加到 context 中，用于生成友好的消息
  const actionWithText: ActionDefinition = {
    ...action,
    context: [...(action.context || []), { key: '_buttonText', value: text }],
  };

  return {
    button: {
      id: buttonId,
      component: {
        Button: {
          child: childId,
          action: actionWithText,
        },
      },
    },
    components,
  };
}

/**
 * 创建简单 Button 组件（不带图标）
 *
 * @param text - 按钮文本
 * @param action - 按钮动作
 * @param options - 按钮选项
 */
export function createSimpleButton(
  text: string,
  action: ActionDefinition,
  options: { id?: string; buttonId?: string } = {}
): ButtonResult {
  return createButton(text, action, options);
}

// ============================================================================
// 表单组件
// ============================================================================

/**
 * 创建 TextField 组件
 *
 * @param options - TextField 选项
 */
export function createTextField(
  options: {
    id?: string;
    label?: string;
    placeholder?: string;
    textPath?: string;
  } = {}
): ComponentDefinition {
  return {
    id: options.id || generateId('textfield'),
    component: {
      TextField: {
        ...(options.label && { label: { literalString: options.label } }),
        ...(options.placeholder && { placeholder: { literalString: options.placeholder } }),
        ...(options.textPath && { text: { path: options.textPath } }),
      },
    },
  };
}

/**
 * 创建 Checkbox 组件
 *
 * @param options - Checkbox 选项
 */
export function createCheckbox(
  options: {
    id?: string;
    label?: string;
    valuePath?: string;
  } = {}
): ComponentDefinition {
  return {
    id: options.id || generateId('checkbox'),
    component: {
      CheckBox: {
        ...(options.label && { label: { literalString: options.label } }),
        ...(options.valuePath && { value: { path: options.valuePath } }),
      },
    },
  };
}

/**
 * 创建 Slider 组件
 *
 * @param options - Slider 选项
 */
export function createSlider(
  options: {
    id?: string;
    min?: number;
    max?: number;
    valuePath?: string;
  } = {}
): ComponentDefinition {
  return {
    id: options.id || generateId('slider'),
    component: {
      Slider: {
        ...(options.min !== undefined && { min: options.min }),
        ...(options.max !== undefined && { max: options.max }),
        ...(options.valuePath && { value: { path: options.valuePath } }),
      },
    },
  };
}

// ============================================================================
// 媒体组件
// ============================================================================

/**
 * 创建 Image 组件
 *
 * @param src - 图片 URL
 * @param options - Image 选项
 */
export function createImage(
  src: string,
  options: {
    id?: string;
    alt?: string;
    width?: number;
    height?: number;
  } = {}
): ComponentDefinition {
  return {
    id: options.id || generateId('image'),
    component: {
      Image: {
        url: { literalString: src },
        ...(options.alt && { alt: { literalString: options.alt } }),
        ...(options.width && { width: options.width }),
        ...(options.height && { height: options.height }),
      },
    },
  };
}

/**
 * 创建 Video 组件
 *
 * @param src - 视频 URL
 * @param options - Video 选项
 */
export function createVideo(
  src: string,
  options: {
    id?: string;
    autoplay?: boolean;
    controls?: boolean;
  } = {}
): ComponentDefinition {
  return {
    id: options.id || generateId('video'),
    component: {
      Video: {
        url: { literalString: src },
        ...(options.autoplay !== undefined && { autoplay: options.autoplay }),
        ...(options.controls !== undefined && { controls: options.controls }),
      },
    },
  };
}

// ============================================================================
// 条件渲染（扩展）
// ============================================================================

/**
 * 创建条件渲染的容器
 * 根据数据路径的布尔值决定是否渲染子组件
 *
 * 注意：这是对 A2UI 协议的扩展，需要前端支持
 *
 * @param conditionPath - 条件数据路径
 * @param childId - 子组件 ID
 * @param options - 组件选项
 */
export function createConditional(
  conditionPath: string,
  childId: string,
  options: { id?: string; invert?: boolean } = {}
): ComponentDefinition {
  return {
    id: options.id || generateId('conditional'),
    component: {
      Conditional: {
        condition: { path: conditionPath },
        child: childId,
        ...(options.invert && { invert: true }),
      },
    },
  };
}
