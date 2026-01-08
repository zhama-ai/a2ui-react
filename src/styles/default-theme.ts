/**
 * A2UI Default Theme
 *
 * 使用自定义 A2UI 工具类系统，对齐官方 Lit 实现
 * 类名格式: a2-{category}-{value}
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
 */
export const defaultTheme: Theme = {
  // 附加样式（直接 CSS，用于复杂效果）
  additionalStyles: {
    Button: {},
    Card: {},
    Text: {
      h1: {},
      h2: {},
      h3: {},
      h4: {},
      h5: {},
      body: {},
      caption: {},
    },
  },

  // 组件样式
  components: {
    AudioPlayer: {
      'a2-w-full': true,
    },

    // Button - 按钮组件
    Button: {
      'a2-dsp-iflex': true,
      'a2-al-center': true,
      'a2-jc-center': true,
      'a2-gap-2': true,
      'a2-px-6': true, // 增加水平内边距
      'a2-py-3': true, // 增加垂直内边距
      'a2-br-2': true, // 8px 圆角
      'a2-bw-0': true,
      'a2-bs-solid': true,
      'a2-bg-primary': true, // 使用语义化类
      'a2-text-primary-foreground': true, // 白色文字
      'a2-font-sans': true,
      'a2-fw-500': true,
      'a2-text-bm': true,
      'a2-cursor-pointer': true,
      'a2-transition': true,
      'a2-ho-80': true,
      'a2-active-scale-95': true,
      'a2-select-none': true,
    },

    // Card - 卡片容器
    Card: {
      'a2-pos-rel': true,
      'a2-br-2': true, // 8px 圆角
      'a2-p-4': true,
      'a2-bg-card': true, // 语义化背景
      'a2-text-card-foreground': true, // 设置卡片内文字颜色
      'a2-border': true,
      'a2-border-default': true, // 语义化边框
      'a2-shadow-sm': true, // 轻微阴影
      'a2-transition': true,
      'a2-hover-shadow-md': true,
      'a2-overflow-hidden': true,
      'a2-flex-1': true, // 在 Row 中均匀分布
      'a2-min-w-0': true, // 防止内容溢出
    },

    // Column - 垂直布局
    Column: {
      'a2-dsp-flexvert': true,
      'a2-gap-2': true,
      'a2-w-full': true, // 占满父容器宽度
    },

    // CheckBox - 复选框
    CheckBox: {
      container: {
        'a2-dsp-iflex': true,
        'a2-al-center': true,
        'a2-gap-2': true,
        'a2-cursor-pointer': true,
      },
      element: {
        'a2-wp-4': true, // 16px
        'a2-hp-4': true,
        'a2-br-1': true, // 4px
        'a2-border': true,
        'a2-bc-n60': true,
        'a2-bgc-n0': true,
        'a2-cursor-pointer': true,
      },
      label: {
        'a2-font-sans': true,
        'a2-text-bm': true,
        'a2-fw-400': true,
        'a2-c-n70': true,
        'a2-flex-1': true,
      },
    },

    // DateTimeInput - 日期时间输入
    DateTimeInput: {
      container: {
        'a2-dsp-flexhor': true,
        'a2-al-center': true,
        'a2-gap-2': true,
        'a2-w-full': true,
        'a2-text-bm': true,
        'a2-ws-nowrap': true,
      },
      element: {
        'a2-px-3': true,
        'a2-py-2': true,
        'a2-br-2': true, // 8px
        'a2-border': true,
        'a2-bc-n60': true,
        'a2-bgc-n0': true,
        'a2-c-n70': true,
        'a2-transition-colors': true,
      },
      label: {
        'a2-c-n70': true,
        'a2-text-bm': true,
        'a2-flex-0': true,
      },
    },

    // Divider - 分隔线
    Divider: {
      'a2-bgc-n90': true,
      'a2-my-4': true,
    },

    // Image - 图片
    Image: {
      all: {
        'a2-br-2': true,
        'a2-media-cover': true,
        'a2-w-full': true,
        'a2-h-full': true,
      },
      avatar: {
        'a2-br-50pc': true,
      },
      header: emptyClasses(),
      icon: emptyClasses(),
      largeFeature: emptyClasses(),
      mediumFeature: emptyClasses(),
      smallFeature: emptyClasses(),
    },

    // Icon - 图标
    Icon: {
      'a2-icon': true,
      'a2-dsp-iflex': true,
      'a2-al-center': true,
      'a2-jc-center': true,
      'a2-c-inherit': true, // 继承父元素颜色
    },

    // List - 列表
    List: {
      'a2-dsp-flexvert': true,
      'a2-gap-4': true,
      'a2-p-2': true,
    },

    // Modal - 模态框
    Modal: {
      backdrop: {
        'a2-pos-fixed': true,
        'a2-inset-0': true,
        'a2-dsp-flex': true,
        'a2-al-center': true,
        'a2-jc-center': true,
        'a2-bgc-n100_50': true,
        'a2-z-50': true,
        'a2-blur-sm': true,
      },
      element: {
        'a2-br-4': true,
        'a2-bgc-n0': true,
        'a2-p-4': true,
        'a2-border': true,
        'a2-bc-n80': true,
        'a2-shadow-xl': true,
      },
    },

    // MultipleChoice - 多选
    MultipleChoice: {
      container: {
        'a2-dsp-flexvert': true,
        'a2-gap-2': true,
      },
      element: {
        'a2-px-3': true,
        'a2-py-2': true,
        'a2-br-2': true,
        'a2-border': true,
        'a2-bc-n60': true,
        'a2-bgc-n0': true,
        'a2-w-full': true,
      },
      label: {
        'a2-text-bm': true,
        'a2-fw-500': true,
      },
    },

    // Row - 水平布局
    Row: {
      'a2-dsp-flexhor': true,
      'a2-gap-4': true,
      'a2-w-full': true, // 占满父容器宽度
      'a2-flex-wrap': true, // 允许换行
    },

    // Slider - 滑块
    Slider: {
      container: {
        'a2-dsp-flexvert': true,
        'a2-gap-1': true,
      },
      element: {
        'a2-w-full': true,
      },
      label: {
        'a2-text-bm': true,
        'a2-fw-500': true,
      },
    },

    // Chart - 图表
    Chart: {
      'a2-w-full': true,
      'a2-br-2': true,
      'a2-overflow-hidden': true,
    },

    // Tabs - 标签页
    Tabs: {
      container: {
        'a2-dsp-flexvert': true,
        'a2-gap-4': true,
      },
      controls: {
        all: {
          'a2-px-4': true,
          'a2-py-2': true,
          'a2-text-bm': true,
          'a2-fw-500': true,
          'a2-cursor-pointer': true,
          'a2-transition-colors': true,
          'a2-br-t-2': true,
        },
        selected: {
          'a2-bw-b-2': true,
          'a2-bc-p50': true,
          'a2-c-p50': true,
        },
      },
      element: {
        'a2-dsp-flexhor': true,
        'a2-border-b': true,
        'a2-bc-n20': true, // 使用浅色边框
      },
    },

    // Text - 文本组件
    // 使用 color: inherit 让文字继承父元素颜色（重要：避免覆盖按钮内文字颜色）
    Text: {
      all: {
        'a2-c-inherit': true, // 继承父元素颜色
      },
      h1: {
        'a2-font-sans': true,
        'a2-fw-600': true,
        'a2-text-hs': true, // 24px
        'a2-m-0': true,
        'a2-p-0': true,
      },
      h2: {
        'a2-font-sans': true,
        'a2-fw-600': true,
        'a2-text-tl': true, // 22px
        'a2-m-0': true,
        'a2-p-0': true,
      },
      h3: {
        'a2-font-sans': true,
        'a2-fw-600': true,
        'a2-text-tm': true, // 16px
        'a2-m-0': true,
        'a2-p-0': true,
      },
      h4: {
        'a2-font-sans': true,
        'a2-fw-500': true,
        'a2-text-bl': true, // 16px
        'a2-m-0': true,
        'a2-p-0': true,
      },
      h5: {
        'a2-font-sans': true,
        'a2-fw-500': true,
        'a2-text-bm': true, // 14px
        'a2-m-0': true,
        'a2-p-0': true,
      },
      h6: {
        'a2-font-sans': true,
        'a2-fw-500': true,
        'a2-text-bs': true, // 12px
        'a2-m-0': true,
        'a2-p-0': true,
      },
      body: {
        'a2-font-sans': true,
        'a2-fw-400': true,
        'a2-text-bm': true,
        'a2-lh-relaxed': true,
      },
      caption: {
        'a2-font-sans': true,
        'a2-fw-400': true,
        'a2-text-bs': true,
        'a2-text-muted-foreground': true,
      },
      label: {
        'a2-font-sans': true,
        'a2-fw-500': true,
        'a2-text-bm': true,
      },
    },

    // TextField - 文本输入
    TextField: {
      container: {
        'a2-dsp-flexhor': true,
        'a2-al-center': true,
        'a2-gap-2': true,
        'a2-w-full': true,
        'a2-text-bm': true,
        'a2-ws-nowrap': true,
      },
      element: {
        'a2-text-bm': true,
        'a2-px-3': true,
        'a2-py-2': true,
        'a2-br-2': true,
        'a2-border': true,
        'a2-bc-n60': true,
        'a2-bgc-n0': true,
        'a2-c-n90': true,
        'a2-flex-1': true,
        'a2-transition-colors': true,
        'a2-focus-visible-ring': true,
      },
      label: {
        'a2-flex-0': true,
        'a2-c-n70': true,
        'a2-fw-500': true,
      },
    },

    // Video - 视频
    Video: {
      'a2-br-2': true,
      'a2-media-cover': true,
    },
  },

  // HTML 元素样式
  elements: {
    a: {
      'a2-font-sans': true,
      'a2-fw-500': true,
      'a2-dsp-iflex': true,
      'a2-al-center': true,
      'a2-td-none': true,
      'a2-text-primary': true,
    },
    audio: {
      'a2-w-full': true,
    },
    body: {
      'a2-font-sans': true,
      'a2-fw-400': true,
      'a2-text-bm': true,
      'a2-mt-0': true,
      'a2-mb-2': true,
      'a2-text-foreground': true,
    },
    button: {
      'a2-font-sans': true,
      'a2-fw-500': true,
      'a2-py-3': true,
      'a2-px-5': true,
      'a2-mb-1': true,
      'a2-br-2': true,
      'a2-bw-0': true,
      'a2-bs-solid': true,
      'a2-bg-primary': true,
      'a2-text-primary-foreground': true,
      'a2-ho-80': true,
    },
    h1: {
      'a2-font-sans': true,
      'a2-fw-600': true,
      'a2-mt-0': true,
      'a2-mb-3': true,
      'a2-text-foreground': true,
    },
    h2: {
      'a2-font-sans': true,
      'a2-fw-600': true,
      'a2-mt-0': true,
      'a2-mb-3': true,
      'a2-text-foreground': true,
    },
    h3: {
      'a2-font-sans': true,
      'a2-fw-600': true,
      'a2-mt-0': true,
      'a2-mb-2': true,
      'a2-text-foreground': true,
    },
    h4: {
      'a2-font-sans': true,
      'a2-fw-500': true,
      'a2-mt-0': true,
      'a2-mb-2': true,
      'a2-text-foreground': true,
    },
    h5: {
      'a2-font-sans': true,
      'a2-fw-500': true,
      'a2-mt-0': true,
      'a2-mb-2': true,
      'a2-text-foreground': true,
    },
    iframe: {
      'a2-scrollbar-none': true,
    },
    input: {
      'a2-font-sans': true,
      'a2-fw-400': true,
      'a2-px-4': true,
      'a2-py-2': true,
      'a2-br-2': true,
      'a2-border': true,
      'a2-border-input': true,
      'a2-bs-solid': true,
      'a2-text-foreground': true,
    },
    p: {
      'a2-font-sans': true,
      'a2-fw-400': true,
      'a2-m-0': true,
      'a2-text-bm': true,
      'a2-text-foreground': true,
    },
    pre: {
      'a2-font-mono': true,
      'a2-fw-400': true,
      'a2-text-bm': true,
      'a2-ws-pre': true,
      'a2-text-foreground': true,
    },
    textarea: {
      'a2-font-sans': true,
      'a2-fw-400': true,
      'a2-px-4': true,
      'a2-py-2': true,
      'a2-br-2': true,
      'a2-border': true,
      'a2-border-input': true,
      'a2-bs-solid': true,
      'a2-text-foreground': true,
      'a2-resize-y': true,
    },
    video: {
      'a2-media-cover': true,
    },
  },

  // Markdown 渲染样式 - 专业简洁的设计
  markdown: {
    p: ['a2-md-p'],
    h1: ['a2-md-h1'],
    h2: ['a2-md-h2'],
    h3: ['a2-md-h3'],
    h4: ['a2-md-h4'],
    h5: ['a2-md-h5'],
    ul: ['a2-md-ul'],
    ol: ['a2-md-ol'],
    li: ['a2-md-li'],
    a: ['a2-md-a'],
    strong: ['a2-md-strong'],
    em: ['a2-md-em'],
    code: ['a2-md-code'],
    blockquote: ['a2-md-blockquote'],
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
 * 创建自定义主题（基于默认主题）
 */
export function createTheme(customTheme: Partial<Theme>): Theme {
  return deepMerge(
    defaultTheme as unknown as Record<string, unknown>,
    customTheme as unknown as Record<string, unknown>
  ) as unknown as Theme;
}

/**
 * 合并样式类映射
 */
export function mergeStyles(...classes: Array<Record<string, boolean>>): Record<string, boolean> {
  const result: Record<string, boolean> = {};

  for (const cls of classes) {
    if (!cls) continue;

    for (const [key, val] of Object.entries(cls)) {
      // 找到同一类别的已有类并删除
      const prefix = key.split('-').slice(0, 2).join('-') + '-';
      const existingKeys = Object.keys(result).filter((k) => k.startsWith(prefix));

      for (const existingKey of existingKeys) {
        delete result[existingKey];
      }

      result[key] = val;
    }
  }

  return result;
}

/**
 * 克隆默认主题（用于创建变体）
 */
export function cloneDefaultTheme(): Theme {
  return JSON.parse(JSON.stringify(defaultTheme));
}

export default defaultTheme;
