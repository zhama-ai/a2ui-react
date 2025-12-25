import { defineConfig } from 'tsup';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

export default defineConfig({
  // 多入口点
  entry: {
    index: 'src/index.ts',
    'types/index': 'src/types/index.ts',
    'data/index': 'src/data/index.ts',
    'events/index': 'src/events/index.ts',
    'styles/index': 'src/styles/index.ts',
    'ui/index': 'src/ui/index.ts',
    'context/index': 'src/context/index.tsx',
  },

  // 输出格式：CJS + ESM 双格式
  format: ['cjs', 'esm'],

  // 目标环境：ES2020
  target: 'es2020',

  // 外部依赖 - React 相关及 markdown
  external: ['react', 'react-dom', 'react-markdown'],

  // 生成类型定义（暂时禁用，React 19 类型兼容问题）
  dts: false,

  // 代码分割：库包不需要
  splitting: false,

  // 源码映射策略
  sourcemap: isDevelopment || process.env.ENABLE_SOURCEMAP === 'true',

  // 压缩策略：开发环境不压缩，生产环境压缩
  minify: isProduction && process.env.ENABLE_MINIFY !== 'false',

  // 清理输出目录
  clean: true,

  // Tree-shaking
  treeshake: true,

  // 输出目录
  outDir: 'dist',

  // CSS 处理
  loader: {
    '.css': 'copy',
  },
  injectStyle: false,

  // 构建成功提示
  onSuccess: 'echo "✅ @zhama/a2ui build completed"',
});
