import { defineConfig } from 'tsup';

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = !isDevelopment;
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

  // 生成类型定义
  dts: {
    resolve: true, // 自动解析类型依赖
  },

  // 代码分割：库包不需要
  splitting: false,

  // 源码映射策略
  sourcemap: !isProduction || process.env.ENABLE_SOURCEMAP === 'true',

  // 压缩策略：始终启用压缩（发布库需要）
  minify: true,

  // 清理输出目录
  clean: true,

  // Tree-shaking
  treeshake: true,

  // 输出目录
  outDir: 'dist',

  // CSS 处理 - 样式现在通过 StyleProvider 动态生成
  injectStyle: false,

  // 构建完成回调
  onSuccess: 'echo "✅ @zhama/a2ui build completed"',
});
