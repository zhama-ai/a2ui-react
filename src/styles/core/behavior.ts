/**
 * A2UI Behavior & Effects Styles
 *
 * 生成交互、动画、过渡等相关的 CSS 工具类
 */

/**
 * 生成行为样式 CSS
 */
export function generateBehaviorStyles(): string {
  const styles: string[] = [];

  // Opacity (0-100, step 5)
  for (let i = 0; i <= 100; i += 5) {
    const val = i / 100;
    styles.push(`.a2-opacity-${i} { opacity: ${val}; }`);
  }

  // Hover opacity (0-100, step 5)
  for (let i = 0; i <= 100; i += 5) {
    const val = i / 100;
    styles.push(`.a2-ho-${i}:hover { opacity: ${val}; }`);
  }

  // Cursor
  styles.push(`
    .a2-cursor-auto { cursor: auto; }
    .a2-cursor-default { cursor: default; }
    .a2-cursor-pointer { cursor: pointer; }
    .a2-cursor-wait { cursor: wait; }
    .a2-cursor-text { cursor: text; }
    .a2-cursor-move { cursor: move; }
    .a2-cursor-help { cursor: help; }
    .a2-cursor-not-allowed { cursor: not-allowed; }
    .a2-cursor-none { cursor: none; }
    .a2-cursor-grab { cursor: grab; }
    .a2-cursor-grabbing { cursor: grabbing; }
  `);

  // Pointer events
  styles.push(`
    .a2-pe-none { pointer-events: none; }
    .a2-pe-auto { pointer-events: auto; }
  `);

  // User select
  styles.push(`
    .a2-select-none { user-select: none; }
    .a2-select-text { user-select: text; }
    .a2-select-all { user-select: all; }
    .a2-select-auto { user-select: auto; }
  `);

  // Visibility
  styles.push(`
    .a2-visible { visibility: visible; }
    .a2-invisible { visibility: hidden; }
    .a2-collapse { visibility: collapse; }
  `);

  // Transition
  styles.push(`
    .a2-transition-none { transition-property: none; }
    .a2-transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
    .a2-transition { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
    .a2-transition-colors { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
    .a2-transition-opacity { transition-property: opacity; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
    .a2-transition-shadow { transition-property: box-shadow; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
    .a2-transition-transform { transition-property: transform; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
  `);

  // Duration
  styles.push(`
    .a2-duration-75 { transition-duration: 75ms; }
    .a2-duration-100 { transition-duration: 100ms; }
    .a2-duration-150 { transition-duration: 150ms; }
    .a2-duration-200 { transition-duration: 200ms; }
    .a2-duration-300 { transition-duration: 300ms; }
    .a2-duration-500 { transition-duration: 500ms; }
    .a2-duration-700 { transition-duration: 700ms; }
    .a2-duration-1000 { transition-duration: 1000ms; }
  `);

  // Easing
  styles.push(`
    .a2-ease-linear { transition-timing-function: linear; }
    .a2-ease-in { transition-timing-function: cubic-bezier(0.4, 0, 1, 1); }
    .a2-ease-out { transition-timing-function: cubic-bezier(0, 0, 0.2, 1); }
    .a2-ease-in-out { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
  `);

  // Transform
  styles.push(`
    .a2-scale-0 { transform: scale(0); }
    .a2-scale-50 { transform: scale(0.5); }
    .a2-scale-75 { transform: scale(0.75); }
    .a2-scale-90 { transform: scale(0.9); }
    .a2-scale-95 { transform: scale(0.95); }
    .a2-scale-100 { transform: scale(1); }
    .a2-scale-105 { transform: scale(1.05); }
    .a2-scale-110 { transform: scale(1.1); }
    .a2-scale-125 { transform: scale(1.25); }
    .a2-scale-150 { transform: scale(1.5); }

    .a2-rotate-0 { transform: rotate(0deg); }
    .a2-rotate-1 { transform: rotate(1deg); }
    .a2-rotate-2 { transform: rotate(2deg); }
    .a2-rotate-3 { transform: rotate(3deg); }
    .a2-rotate-6 { transform: rotate(6deg); }
    .a2-rotate-12 { transform: rotate(12deg); }
    .a2-rotate-45 { transform: rotate(45deg); }
    .a2-rotate-90 { transform: rotate(90deg); }
    .a2-rotate-180 { transform: rotate(180deg); }

    .a2-translate-x-0 { transform: translateX(0); }
    .a2-translate-y-0 { transform: translateY(0); }
    .a2--translate-y-1 { transform: translateY(-4px); }
    .a2--translate-y-2 { transform: translateY(-8px); }
    .a2--translate-y-4 { transform: translateY(-16px); }
    .a2-translate-y-1 { transform: translateY(4px); }
    .a2-translate-y-2 { transform: translateY(8px); }
    .a2-translate-y-4 { transform: translateY(16px); }
  `);

  // Hover transforms
  styles.push(`
    .a2-hover-scale-105:hover { transform: scale(1.05); }
    .a2-hover-scale-110:hover { transform: scale(1.1); }
    .a2-hover--translate-y-1:hover { transform: translateY(-4px); }
    .a2-hover--translate-y-2:hover { transform: translateY(-8px); }
  `);

  // Active state
  styles.push(`
    .a2-active-scale-95:active { transform: scale(0.95); }
    .a2-active-scale-90:active { transform: scale(0.9); }
  `);

  // Shadow
  styles.push(`
    .a2-shadow-none { box-shadow: 0 0 #0000; }
    .a2-shadow-sm { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
    .a2-shadow { box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1); }
    .a2-shadow-md { box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); }
    .a2-shadow-lg { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); }
    .a2-shadow-xl { box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1); }
    .a2-shadow-2xl { box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25); }
    .a2-shadow-inner { box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05); }
  `);

  // Hover shadow
  styles.push(`
    .a2-hover-shadow:hover { box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1); }
    .a2-hover-shadow-md:hover { box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); }
    .a2-hover-shadow-lg:hover { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); }
  `);

  // Backdrop blur
  styles.push(`
    .a2-blur-none { backdrop-filter: none; }
    .a2-blur-sm { backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); }
    .a2-blur { backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
    .a2-blur-md { backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
    .a2-blur-lg { backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); }
    .a2-blur-xl { backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); }
    .a2-blur-2xl { backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px); }
    .a2-blur-3xl { backdrop-filter: blur(64px); -webkit-backdrop-filter: blur(64px); }
  `);

  // Focus visible
  styles.push(`
    .a2-focus-visible-ring:focus-visible {
      outline: 2px solid var(--p-50, currentColor);
      outline-offset: 2px;
    }
    .a2-focus-visible-none:focus-visible {
      outline: none;
    }
  `);

  // Disabled state
  styles.push(`
    .a2-disabled:disabled,
    .a2-disabled[disabled] {
      opacity: 0.5;
      pointer-events: none;
      cursor: not-allowed;
    }
  `);

  // Scrollbar
  styles.push(`
    .a2-scrollbar-none {
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    .a2-scrollbar-none::-webkit-scrollbar {
      display: none;
    }
    .a2-scrollbar-thin {
      scrollbar-width: thin;
    }
  `);

  return styles.join('\n');
}

export const behaviorStyles = generateBehaviorStyles();
