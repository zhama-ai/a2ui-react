/**
 * A2UI Tailwind CSS Preset
 *
 * 提供 A2UI 组件所需的完整 Tailwind 配置
 *
 * 使用方式：
 * // tailwind.config.js
 * import a2uiPreset from '@zhama/a2ui/tailwind.preset'
 *
 * export default {
 *   presets: [a2uiPreset],
 *   content: [
 *     './src/**\/*.{js,ts,jsx,tsx}',
 *     './node_modules/@zhama/a2ui/**\/*.{js,ts,jsx,tsx}',
 *   ],
 * }
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      // shadcn 颜色系统 - 基于 CSS 变量
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: [
          'var(--font-sans)',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: ['var(--font-mono)', 'Fira Code', 'Monaco', 'Consolas', 'monospace'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
    },
  },

  // 安全列表：强制生成 A2UI 主题中使用的所有样式类
  safelist: [
    // ============ 布局 ============
    'flex',
    'inline-flex',
    'grid',
    'block',
    'hidden',
    'items-center',
    'items-start',
    'items-end',
    'items-stretch',
    'justify-center',
    'justify-between',
    'justify-start',
    'justify-end',
    'justify-around',
    'justify-evenly',
    'flex-col',
    'flex-row',
    'flex-wrap',
    'space-y-1',
    'space-y-2',
    'space-y-3',
    'space-y-4',
    'space-x-1',
    'space-x-2',
    'space-x-3',
    'space-x-4',
    'gap-1',
    'gap-1.5',
    'gap-2',
    'gap-3',
    'gap-4',
    'gap-6',
    'w-full',
    'w-4',
    'w-5',
    'w-6',
    'w-10',
    'w-24',
    'w-48',
    'h-10',
    'h-4',
    'h-5',
    'h-6',
    'h-auto',
    'h-32',
    'max-w-full',
    'max-w-lg',
    'max-h-96',
    'relative',
    'absolute',
    'fixed',
    'inset-0',
    'group',

    // ============ 响应式网格 ============
    'grid-cols-1',
    'md:grid-cols-2',
    'lg:grid-cols-3',

    // ============ 边框 ============
    'border',
    'border-0',
    'border-2',
    'border-t',
    'border-b',
    'border-l-4',
    'border-border',
    'border-input',
    'border-primary',
    'rounded-sm',
    'rounded-md',
    'rounded-lg',
    'rounded-xl',
    'rounded-full',
    'rounded-t-md',

    // ============ 背景颜色 ============
    'bg-card',
    'bg-background',
    'bg-primary',
    'bg-muted',
    'bg-secondary',
    'bg-accent',
    'bg-black/50',
    'bg-transparent',

    // ============ 文字颜色 ============
    'text-card-foreground',
    'text-foreground',
    'text-primary-foreground',
    'text-muted-foreground',
    'text-primary',
    'text-secondary-foreground',
    'text-destructive-foreground',
    'text-accent-foreground',
    'text-primary-foreground/70',
    'text-white',

    // ============ 文字大小和样式 ============
    'text-xs',
    'text-sm',
    'text-base',
    'text-lg',
    'text-xl',
    'text-2xl',
    'font-medium',
    'font-semibold',
    'font-bold',
    'font-mono',
    'tracking-tight',
    'leading-none',
    'leading-tight',
    'leading-snug',
    'leading-normal',
    'leading-relaxed',
    'whitespace-nowrap',
    'italic',

    // ============ 间距 ============
    'p-1',
    'p-2',
    'p-3',
    'p-4',
    'p-5',
    'p-6',
    'p-8',
    'px-1',
    'px-1.5',
    'px-2',
    'px-3',
    'px-4',
    'px-5',
    'px-6',
    'py-0.5',
    'py-1',
    'py-2',
    'py-2.5',
    'py-3',
    'py-4',
    'mx-4',
    'my-4',
    'mb-2',
    'mb-3',
    'mb-4',
    'mt-2',
    'pl-4',
    '-mb-px',

    // ============ 阴影 ============
    'shadow-sm',
    'shadow-md',
    'shadow-lg',
    'shadow-xl',

    // ============ 过渡和动画 ============
    'transition-all',
    'transition-colors',
    'transition-shadow',
    'transition-transform',
    'duration-150',
    'duration-200',
    'duration-300',
    'backdrop-blur-sm',

    // ============ 悬停效果 ============
    'hover:bg-primary/90',
    'hover:bg-muted/80',
    'hover:bg-secondary/80',
    'hover:shadow-md',
    'hover:shadow-lg',
    'hover:shadow-xl',
    'hover:-translate-y-0.5',
    'hover:underline',
    'hover:border-primary',
    'hover:scale-105',

    // ============ 焦点效果 ============
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-ring',
    'focus-visible:ring-offset-2',
    'ring-offset-background',

    // ============ 激活/禁用状态 ============
    'active:scale-95',
    'active:scale-[0.98]',
    'disabled:pointer-events-none',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'cursor-pointer',
    'cursor-default',
    'cursor-wait',

    // ============ 占位符 ============
    'placeholder:text-muted-foreground',

    // ============ 列表和文本 ============
    'list-disc',
    'list-decimal',
    'list-inside',
    'overflow-x-auto',
    'overflow-hidden',
    'underline-offset-4',

    // ============ 定位 ============
    'z-50',

    // ============ 图片 ============
    'object-cover',
  ],

  plugins: [],
};
