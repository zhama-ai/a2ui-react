# @zhama/a2ui

A2UI (Agent-to-User Interface) 协议的 React 实现，完全对齐官方 Google A2UI Lit 实现。

## 特性

- 🎨 **独立样式系统** - 不依赖 Tailwind，自带完整的 CSS 工具类
- 🔒 **样式隔离** - 使用 `a2-` 前缀避免与宿主应用冲突
- 🌓 **自动暗色模式** - 使用 CSS `light-dark()` 函数
- 🎯 **主题可定制** - 完整的主题系统支持

## 安装

```bash
pnpm add @zhama/a2ui
```

## 快速开始

```tsx
import { StyleProvider, ThemeProvider, Surface, A2uiMessageProcessor } from '@zhama/a2ui';

function App() {
  const processor = new A2uiMessageProcessor();

  return (
    <StyleProvider>
      <ThemeProvider>
        <div className="a2ui-root">
          <Surface
            surfaceId="main"
            surface={processor.getSurface('main')}
            processor={processor}
    />
        </div>
      </ThemeProvider>
    </StyleProvider>
  );
}
```

## 样式系统

### 类名规范

所有样式类使用 `a2-` 前缀：

| 类别 | 前缀 | 示例 |
|------|------|------|
| Layout | `a2-p-*`, `a2-m-*`, `a2-gap-*` | `a2-p-4`, `a2-mx-2`, `a2-gap-2` |
| Display | `a2-dsp-*` | `a2-dsp-flex`, `a2-dsp-grid` |
| Flex | `a2-flex-*`, `a2-al-*`, `a2-jc-*` | `a2-flex-1`, `a2-al-center` |
| Colors | `a2-c-*`, `a2-bgc-*`, `a2-bc-*` | `a2-c-p50`, `a2-bgc-n0` |
| Typography | `a2-font-*`, `a2-fw-*`, `a2-text-*` | `a2-font-sans`, `a2-fw-500` |
| Border | `a2-br-*`, `a2-bw-*`, `a2-bs-*` | `a2-br-4`, `a2-bw-1` |
| Behavior | `a2-opacity-*`, `a2-shadow-*` | `a2-opacity-80`, `a2-shadow-md` |

### 颜色系统

使用 OKLCH 色彩空间，支持 6 个调色板：

| 前缀 | 说明 |
|------|------|
| `p` | Primary - 主色调 |
| `s` | Secondary - 次要色 |
| `t` | Tertiary - 第三色 |
| `n` | Neutral - 中性灰色 |
| `nv` | Neutral Variant - 中性变体 |
| `e` | Error - 错误色 |

色阶：0 (最亮) ~ 100 (最暗)

```css
/* 示例 */
.a2-c-p50 { /* 主色 50% */ }
.a2-bgc-n0 { /* 白色背景 */ }
.a2-bc-e40 { /* 错误色边框 */ }
```

### 手动注入样式

对于 SSR 或特殊场景：

```tsx
import { getStylesCSS } from '@zhama/a2ui';

// 获取完整 CSS 字符串
const css = getStylesCSS();

// 注入到 head
const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);
```

## 主题定制

```tsx
import { createTheme, ThemeProvider } from '@zhama/a2ui';

const customTheme = createTheme({
  components: {
    Button: {
      'a2-bgc-p40': true,  // 自定义按钮背景
      'a2-br-4': true,     // 更大圆角
    },
    Card: {
      'a2-shadow-lg': true, // 更大阴影
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* ... */}
    </ThemeProvider>
  );
}
```

## 与官方 Lit 实现对齐

| 官方 Lit | @zhama/a2ui |
|----------|-------------|
| `layout-p-4` | `a2-p-4` |
| `color-bgc-p50` | `a2-bgc-p50` |
| `typography-f-sf` | `a2-font-sans` |
| `border-br-4` | `a2-br-4` |
| `behavior-ho-80` | `a2-ho-80` |

## License

MIT
