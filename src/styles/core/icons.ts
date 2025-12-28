/**
 * A2UI Icon Styles
 *
 * Material Icons 支持
 */

/**
 * 生成图标样式 CSS
 */
export function generateIconStyles(): string {
  return `
    /* Material Icons Support */
    .a2-icon {
      font-family: 'Material Symbols Outlined', 'Material Icons', sans-serif;
      font-weight: normal;
      font-style: normal;
      font-size: 24px;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
      -webkit-font-feature-settings: 'liga';
      -webkit-font-smoothing: antialiased;
    }

    .a2-icon-sm { font-size: 18px; }
    .a2-icon-md { font-size: 24px; }
    .a2-icon-lg { font-size: 32px; }
    .a2-icon-xl { font-size: 48px; }

    .a2-icon-filled {
      font-variation-settings: 'FILL' 1;
    }

    .a2-icon-outlined {
      font-variation-settings: 'FILL' 0;
    }
  `;
}

export const iconStyles = generateIconStyles();

