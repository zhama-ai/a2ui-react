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
      'a2-px-4': true,
      'a2-py-2': true,
      'a2-br-3': true, // 12px
      'a2-bw-0': true,
      'a2-bs-solid': true,
      'a2-bgc-p35': true,
      'a2-c-n0': true,
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
      'a2-br-4': true, // 16px
      'a2-p-4': true,
      'a2-bgc-n0': true,
      'a2-border': true,
      'a2-bc-n90': true,
      'a2-shadow': true,
      'a2-transition': true,
      'a2-hover-shadow-md': true,
      'a2-overflow-hidden': true,
    },

    // Column - 垂直布局
    Column: {
      'a2-dsp-flexvert': true,
      'a2-gap-2': true,
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
        'a2-bc-n90': true,
      },
    },

    // Text - 文本组件
    // 颜色说明：neutral 色阶中，数值越大颜色越深
    // n90/n95 = 深色（用于亮色背景），n10/n20 = 浅色（用于暗色背景）
    // light-dark() 会自动反转：亮色模式用 n90，暗色模式用 n10
    // 注意：不要设置 a2-w-full，否则会破坏 Row 布局
    Text: {
      all: {},
      h1: {
        'a2-font-sans': true,
        'a2-fw-600': true,
        'a2-text-hs': true, // 24px
        'a2-m-0': true,
        'a2-p-0': true,
        'a2-c-n95': true, // 深色标题
      },
      h2: {
        'a2-font-sans': true,
        'a2-fw-600': true,
        'a2-text-tl': true, // 22px
        'a2-m-0': true,
        'a2-p-0': true,
        'a2-c-n95': true,
      },
      h3: {
        'a2-font-sans': true,
        'a2-fw-600': true,
        'a2-text-tm': true, // 16px
        'a2-m-0': true,
        'a2-p-0': true,
        'a2-c-n90': true,
      },
      h4: {
        'a2-font-sans': true,
        'a2-fw-500': true,
        'a2-text-bl': true, // 16px
        'a2-m-0': true,
        'a2-p-0': true,
        'a2-c-n90': true,
      },
      h5: {
        'a2-font-sans': true,
        'a2-fw-500': true,
        'a2-text-bm': true, // 14px
        'a2-m-0': true,
        'a2-p-0': true,
        'a2-c-n80': true,
      },
      h6: {
        'a2-font-sans': true,
        'a2-fw-500': true,
        'a2-text-bs': true, // 12px
        'a2-m-0': true,
        'a2-p-0': true,
        'a2-c-n70': true,
      },
      body: {
        'a2-font-sans': true, // 使用 sans-serif 更现代
        'a2-fw-400': true,
        'a2-text-bm': true,
        'a2-lh-relaxed': true,
        'a2-c-n80': true, // 深灰色正文
      },
      caption: {
        'a2-font-sans': true,
        'a2-fw-400': true,
        'a2-text-bs': true,
        'a2-c-n60': true, // 中灰色说明文字
      },
      label: {
        'a2-font-sans': true,
        'a2-fw-500': true,
        'a2-text-bm': true,
        'a2-c-n70': true,
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
      'a2-c-p40': true,
    },
    audio: {
      'a2-w-full': true,
    },
    body: {
      'a2-font-serif': true,
      'a2-fw-400': true,
      'a2-text-bm': true,
      'a2-mt-0': true,
      'a2-mb-2': true,
      'a2-c-n90': true,
    },
    button: {
      'a2-font-sans': true,
      'a2-fw-500': true,
      'a2-py-3': true,
      'a2-px-5': true,
      'a2-mb-1': true,
      'a2-br-4': true,
      'a2-bw-0': true,
      'a2-bs-solid': true,
      'a2-bgc-s30': true,
      'a2-ho-80': true,
    },
    h1: {
      'a2-font-sans': true,
      'a2-fw-500': true,
      'a2-mt-0': true,
      'a2-mb-2': true,
    },
    h2: {
      'a2-font-sans': true,
      'a2-fw-500': true,
      'a2-mt-0': true,
      'a2-mb-2': true,
    },
    h3: {
      'a2-font-sans': true,
      'a2-fw-500': true,
      'a2-mt-0': true,
      'a2-mb-2': true,
    },
    h4: {
      'a2-font-sans': true,
      'a2-fw-500': true,
      'a2-mt-0': true,
      'a2-mb-2': true,
    },
    h5: {
      'a2-font-sans': true,
      'a2-fw-500': true,
      'a2-mt-0': true,
      'a2-mb-2': true,
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
      'a2-bc-s70': true,
      'a2-bs-solid': true,
      'a2-c-n90': true,
    },
    p: {
      'a2-font-serif': true,
      'a2-fw-400': true,
      'a2-m-0': true,
      'a2-text-bm': true,
      'a2-c-n90': true,
    },
    pre: {
      'a2-font-mono': true,
      'a2-fw-400': true,
      'a2-text-bm': true,
      'a2-ws-pre': true,
    },
    textarea: {
      'a2-font-sans': true,
      'a2-fw-400': true,
      'a2-px-4': true,
      'a2-py-2': true,
      'a2-br-2': true,
      'a2-border': true,
      'a2-bc-s70': true,
      'a2-bs-solid': true,
      'a2-c-n90': true,
      'a2-resize-y': true,
    },
    video: {
      'a2-media-cover': true,
    },
  },

  // Markdown 渲染样式
  markdown: {
    p: ['a2-font-serif', 'a2-fw-400', 'a2-text-bm', 'a2-lh-relaxed', 'a2-c-n90', 'a2-mb-2'],
    h1: ['a2-font-sans', 'a2-fw-500', 'a2-text-hs', 'a2-m-0', 'a2-mb-2'],
    h2: ['a2-font-sans', 'a2-fw-500', 'a2-text-tl', 'a2-m-0', 'a2-mb-2'],
    h3: ['a2-font-sans', 'a2-fw-500', 'a2-text-tm', 'a2-m-0', 'a2-mb-2'],
    h4: ['a2-font-sans', 'a2-fw-500', 'a2-text-bl', 'a2-m-0', 'a2-mb-2'],
    h5: ['a2-font-sans', 'a2-fw-500', 'a2-text-bm', 'a2-m-0', 'a2-mb-1', 'a2-c-n70'],
    ul: ['a2-font-serif', 'a2-fw-400', 'a2-text-bm', 'a2-m-0'],
    ol: ['a2-font-serif', 'a2-fw-400', 'a2-text-bm', 'a2-m-0'],
    li: ['a2-font-serif', 'a2-fw-400', 'a2-text-bm'],
    a: ['a2-font-sans', 'a2-fw-500', 'a2-c-p40', 'a2-td-none'],
    strong: ['a2-fw-700'],
    em: ['a2-fs-italic'],
    code: ['a2-font-mono', 'a2-text-bs', 'a2-bgc-n95', 'a2-px-1', 'a2-br-1'],
    blockquote: ['a2-pl-4', 'a2-border-l', 'a2-bw-l-3', 'a2-bc-p60', 'a2-c-n50', 'a2-fs-italic'],
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
export function mergeStyles(
  ...classes: Array<Record<string, boolean>>
): Record<string, boolean> {
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
