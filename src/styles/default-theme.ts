/**
 * A2UI Default Theme
 *
 * 完全匹配 packages/ui 设计系统
 * 基于 shadcn + Tailwind + Radix UI
 */

import type { Theme } from '../types/types';

/**
 * 创建空的 class 映射
 */
function emptyClasses(): Record<string, boolean> {
  return {};
}

/**
 * 默认主题配置
 * 现代化、专业的 UI 视觉风格
 */
export const defaultTheme: Theme = {
  components: {
    AudioPlayer: emptyClasses(),

    // Button - 完全匹配 packages/ui/button.tsx 的默认样式
    Button: {
      'a2ui-btn': true,
      'inline-flex': true,
      'items-center': true,
      'justify-center': true,
      'whitespace-nowrap': true,
      'rounded-xl': true,
      'text-xs': true, // 更小更精致
      'font-medium': true,
      'transition-all': true,
      'duration-300': true,
      'disabled:pointer-events-none': true,
      'disabled:opacity-50': true,
      'active:scale-95': true,
      // 默认变体样式
      'bg-primary': true,
      'text-primary-foreground': true,
      'hover:bg-primary/90': true,
      'shadow-sm': true,
      // 默认尺寸
      'h-9': true,
      'px-4': true,
      'py-2': true,
    },

    // Card - 增强视觉效果，支持玻璃拟态
    Card: {
      'a2ui-card': true,
      group: true,
      relative: true,
      'rounded-2xl': true, // 对齐首页的 rounded-2xl
      border: true,
      'border-border/50': true,
      'bg-card': true,
      'text-card-foreground': true,
      'shadow-sm': true,
      'transition-all': true,
      'duration-300': true,
      'hover:shadow-md': true,
      'hover:border-primary/40': true,
      'hover:-translate-y-1': true,
      'p-5': true, // 对齐首页的 p-5
      'overflow-hidden': true,
    },

    // Column - 增加默认间距
    Column: {
      'a2ui-column': true,
      flex: true,
      'flex-col': true,
      'space-y-4': true,
    },

    CheckBox: {
      container: {
        'a2ui-checkbox': true,
        flex: true,
        'items-center': true,
        'gap-2': true,
      },
      element: { 'w-4': true, 'h-4': true },
      label: { 'text-sm': true, 'font-medium': true },
    },

    DateTimeInput: {
      container: {
        'a2ui-datetime': true,
        flex: true,
        'flex-col': true,
        'gap-1': true,
      },
      element: {
        'px-3': true,
        'py-2': true,
        border: true,
        'border-input': true,
        'rounded-md': true,
        'bg-background': true,
        'transition-colors': true,
      },
      label: { 'text-sm': true, 'font-medium': true },
    },

    Divider: {
      'a2ui-divider': true,
      'border-t': true,
      'border-border/50': true,
      'my-8': true,
    },

    Image: {
      all: { 'a2ui-image': true, 'max-w-full': true, 'h-auto': true },
      icon: { 'w-6': true, 'h-6': true },
      avatar: { 'w-10': true, 'h-10': true, 'rounded-full': true },
      smallFeature: { 'w-24': true, 'h-24': true },
      mediumFeature: { 'w-48': true, 'h-48': true },
      largeFeature: { 'w-full': true, 'max-h-96': true },
      header: { 'w-full': true, 'h-32': true, 'object-cover': true },
    },

    Icon: {
      'a2ui-icon': true,
      'w-5': true,
      'h-5': true,
    },

    // List - 话题卡片列表
    List: {
      'a2ui-list': true,
      grid: true,
      'grid-cols-1': true,
      'md:grid-cols-2': true,
      'gap-4': true, // 完全对齐首页
      'w-full': true,
    },

    Modal: {
      backdrop: {
        fixed: true,
        'inset-0': true,
        'bg-black/50': true,
        flex: true,
        'items-center': true,
        'justify-center': true,
        'z-50': true,
      },
      element: {
        'bg-card': true,
        'rounded-lg': true,
        'p-6': true,
        'max-w-lg': true,
        'w-full': true,
        'mx-4': true,
        'shadow-xl': true,
        border: true,
        'border-border': true,
        'border-white/60': true,
      },
    },

    MultipleChoice: {
      container: {
        'a2ui-multichoice': true,
        flex: true,
        'flex-col': true,
        'gap-2': true,
      },
      element: {
        'px-3': true,
        'py-2': true,
        border: true,
        'border-input': true,
        'rounded-md': true,
        'bg-background': true,
        'w-full': true,
      },
      label: { 'text-sm': true, 'font-medium': true },
    },

    // Row - 匹配设计系统
    Row: {
      'a2ui-row': true,
      flex: true,
      'flex-row': true,
      'items-center': true,
      'justify-between': true,
      'gap-6': true, // 增加间距
      'w-full': true,
    },

    Slider: {
      container: {
        'a2ui-slider': true,
        flex: true,
        'flex-col': true,
        'gap-1': true,
      },
      element: { 'w-full': true },
      label: { 'text-sm': true, 'font-medium': true },
    },

    Tabs: {
      container: {
        'a2ui-tabs': true,
        flex: true,
        'flex-col': true,
        'space-y-4': true,
      },
      element: {
        flex: true,
        'border-b': true,
        'border-border': true,
      },
      controls: {
        all: {
          'px-4': true,
          'py-2': true,
          'text-sm': true,
          'font-medium': true,
          'cursor-pointer': true,
          'transition-colors': true,
          'rounded-t-md': true,
        },
        selected: {
          'border-b-2': true,
          'border-primary': true,
          'text-primary': true,
          '-mb-px': true,
        },
      },
    },

    // Text - 完全匹配 design-tokens typography
    Text: {
      all: { 'a2ui-text': true },
      // h1: 24px - 页面主标题
      h1: {
        'text-3xl': true,
        'font-bold': true,
        'tracking-tight': true,
        'mb-4': true,
      },
      // h2: 18px - 区块标题
      h2: {
        'text-xl': true,
        'font-semibold': true,
        'mb-2': true,
      },
      // h3-h5
      h3: {
        'text-lg': true,
        'font-medium': true, // 对齐首页的标题粗细
        'mb-1': true,
      },
      h4: {
        'text-base': true,
        'font-medium': true,
      },
      h5: {
        'text-sm': true,
        'font-medium': true,
      },
      h6: {
        'text-xs': true,
        'font-medium': true,
      },
      // body: 16px - 正文
      body: {
        'text-base': true,
        'leading-relaxed': true,
        'text-foreground/90': true,
      },
      // caption: 12px - 说明文字
      caption: {
        'text-sm': true,
        'text-muted-foreground': true,
        'leading-relaxed': true,
      },
      // label - 表单标签，移除强制颜色以支持继承
      label: {
        'text-sm': true,
        'font-medium': true,
        'leading-none': true,
      },
    },

    TextField: {
      container: {
        'a2ui-textfield': true,
        flex: true,
        'flex-col': true,
        'gap-1.5': true,
      },
      element: {
        flex: true,
        'h-10': true,
        'w-full': true,
        'rounded-md': true,
        border: true,
        'border-input': true,
        'bg-background': true,
        'px-3': true,
        'py-2': true,
        'text-sm': true,
        'ring-offset-background': true,
        'transition-colors': true,
        'placeholder:text-muted-foreground': true,
        'focus-visible:outline-none': true,
        'focus-visible:ring-2': true,
        'focus-visible:ring-ring': true,
        'focus-visible:ring-offset-2': true,
        'disabled:cursor-not-allowed': true,
        'disabled:opacity-50': true,
      },
      label: {
        'text-sm': true,
        'font-medium': true,
        'leading-none': true,
      },
    },

    Video: {
      'a2ui-video': true,
      'w-full': true,
      'rounded-2xl': true,
      border: true,
      'border-border/50': true,
    },
  },

  // HTML 元素样式
  elements: {
    a: {
      'text-primary': true,
      'underline-offset-4': true,
      'hover:underline': true,
      'transition-colors': true,
    },
    audio: emptyClasses(),
    body: {
      'text-base': true,
    },
    button: emptyClasses(),
    h1: {
      'text-3xl': true,
      'font-bold': true,
      'tracking-tight': true,
    },
    h2: {
      'text-xl': true,
      'font-semibold': true,
    },
    h3: {
      'text-lg': true,
      'font-bold': true,
    },
    h4: {
      'text-base': true,
      'font-semibold': true,
    },
    h5: {
      'text-base': true,
      'font-medium': true,
    },
    iframe: emptyClasses(),
    input: emptyClasses(),
    p: {
      'text-base': true,
      'leading-relaxed': true,
    },
    pre: {
      'font-mono': true,
      'text-sm': true,
      'bg-muted': true,
      'p-4': true,
      'rounded-md': true,
      'overflow-x-auto': true,
      border: true,
      'border-border': true,
    },
    textarea: emptyClasses(),
    video: emptyClasses(),
  },

  // Markdown 样式 - 专业协调的排版设计
  // 注意：不设置强制颜色，让文字继承父元素颜色（支持按钮等有色背景）
  markdown: {
    // 段落：精简字体大小，适中行距，继承颜色
    p: ['text-[15px]', 'leading-[1.7]', 'mb-3'],

    // 标题层级：清晰的视觉层次，增加上边距分隔内容块
    h1: ['text-xl', 'font-bold', 'tracking-tight', 'mt-6', 'mb-4'],
    h2: ['text-[17px]', 'font-semibold', 'mt-5', 'mb-3'],
    h3: ['text-[15px]', 'font-semibold', 'mt-4', 'mb-2'],
    h4: ['text-[15px]', 'font-medium', 'mt-3', 'mb-2'],
    h5: ['text-sm', 'font-medium', 'mt-3', 'mb-2'],

    // 列表：紧凑但不拥挤，提升可读性
    ul: ['list-disc', 'list-outside', 'ml-5', 'mb-3', 'space-y-1.5'],
    ol: ['list-decimal', 'list-outside', 'ml-5', 'mb-3', 'space-y-1.5'],
    li: ['text-[15px]', 'leading-[1.7]', 'pl-1'],

    // 链接：适度强调（保留颜色，因为需要可识别）
    a: ['text-primary', 'underline-offset-2', 'hover:underline', 'font-medium'],

    // 强调：保持简洁，继承颜色
    strong: ['font-semibold'],
    em: ['not-italic', 'opacity-80'], // 用透明度代替固定颜色

    // 行内代码：精致小巧，继承颜色
    code: [
      'font-mono',
      'text-[13px]',
      'bg-muted/60',
      'px-1.5',
      'py-0.5',
      'rounded',
      'border',
      'border-border/50',
    ],

    // 引用块：移除斜体，保持专业
    blockquote: [
      'border-l-3',
      'border-primary/40',
      'pl-4',
      'py-2',
      'text-muted-foreground',
      'bg-muted/30',
      'rounded-r',
      'mb-3',
      'text-[14px]',
    ],
  },
};

/**
 * 深层合并对象
 */
function deepMerge<T extends Record<string, unknown>>(target: T, source: Partial<T>): T {
  const result = { ...target };

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const targetValue = result[key];
      const sourceValue = source[key];

      if (
        typeof targetValue === 'object' &&
        targetValue !== null &&
        typeof sourceValue === 'object' &&
        sourceValue !== null &&
        !Array.isArray(targetValue) &&
        !Array.isArray(sourceValue)
      ) {
        result[key] = deepMerge(
          targetValue as Record<string, unknown>,
          sourceValue as Record<string, unknown>
        ) as T[Extract<keyof T, string>];
      } else {
        result[key] = sourceValue as T[Extract<keyof T, string>];
      }
    }
  }

  return result;
}

/**
 * 创建自定义主题
 */
export function createTheme(customTheme: Partial<Theme>): Theme {
  return deepMerge(
    defaultTheme as unknown as Record<string, unknown>,
    customTheme as unknown as Record<string, unknown>
  ) as unknown as Theme;
}

/**
 * 导出默认主题
 */
export default defaultTheme;
