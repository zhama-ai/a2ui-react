# Contributing to @zhama/a2ui

[English](#english) | [中文](#中文)

---

## English

Thank you for your interest in contributing to @zhama/a2ui! We welcome contributions from the community.

### 📋 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful and constructive in all interactions.

### 🐛 Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Description**: Clear description of the bug
- **Steps to Reproduce**: Step-by-step instructions
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Environment**: OS, Node version, package version, etc.
- **Screenshots**: If applicable

### 💡 Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

- **Clear description** of the feature
- **Use cases** and examples
- **Potential implementation** approach (if you have ideas)
- **Benefits** to the project

### 🔧 Development Setup

1. **Fork and Clone**

```bash
git clone https://github.com/YOUR_USERNAME/a2ui-react.git
cd a2ui-react/zhama/a2ui
```

2. **Install Dependencies**

```bash
pnpm install
```

3. **Build the Project**

```bash
pnpm run build
```

4. **Run Examples**

```bash
cd examples/basic-demo
pnpm install
pnpm run dev
```

### 📝 Pull Request Process

1. **Create a Branch**

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

2. **Make Your Changes**

- Write clear, concise code
- Follow the existing code style
- Add tests for new features
- Update documentation as needed

3. **Test Your Changes**

```bash
# Run type checking
pnpm run type-check

# Run linting
pnpm run lint

# Format code
pnpm run format

# Build to ensure no errors
pnpm run build
```

4. **Commit Your Changes**

Follow conventional commit messages:

```bash
git commit -m "feat: add new component"
git commit -m "fix: resolve rendering issue"
git commit -m "docs: update README"
git commit -m "refactor: improve performance"
```

Commit types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

5. **Push and Create PR**

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear title and description
- Reference any related issues
- List of changes made
- Screenshots/GIFs for UI changes

### 📐 Code Style Guidelines

#### TypeScript

- Use TypeScript for all code
- Prefer `interface` over `type` for object shapes
- Use explicit return types for functions
- Avoid `any` - use proper typing

```typescript
// Good
interface ButtonProps {
  text: string;
  onClick: () => void;
}

function MyComponent({ text, onClick }: ButtonProps): JSX.Element {
  return <button onClick={onClick}>{text}</button>;
}

// Avoid
function MyComponent(props: any) {
  return <button>{props.text}</button>;
}
```

#### React Components

- Use functional components
- Use `function` keyword for components
- Keep components small and focused
- Extract reusable logic to custom hooks

```typescript
// Good
export function Button({ text, onClick }: ButtonProps) {
  return <button onClick={onClick}>{text}</button>;
}

// Avoid
export const Button = (props) => <button>{props.text}</button>;
```

#### File Organization

```
src/
├── types/          # Type definitions
├── ui/             # UI components
│   ├── button.tsx  # Component file (lowercase with dashes)
│   └── index.ts    # Barrel export
├── utils/          # Utility functions
└── index.ts        # Main entry
```

#### Naming Conventions

- **Files**: `kebab-case.tsx`
- **Components**: `PascalCase`
- **Functions**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Interfaces/Types**: `PascalCase`

### ✅ Testing

- Add tests for new features
- Ensure all tests pass before submitting PR
- Write clear test descriptions

### 📚 Documentation

- Update README.md if adding new features
- Add JSDoc comments for public APIs
- Update examples if behavior changes
- Keep documentation in sync with code

### 🔍 Code Review

All submissions require review. We use GitHub pull requests for this purpose. Reviewers may ask for changes before merging.

### 📦 Release Process

Maintainers will handle releases:

1. Version bump following [Semantic Versioning](https://semver.org/)
2. Update CHANGELOG.md
3. Create release tag
4. Publish to npm

### 🤔 Questions?

Feel free to:
- Open an issue for questions
- Join discussions on GitHub Discussions
- Contact maintainers via email

---

## 中文

感谢你对 @zhama/a2ui 做出贡献的兴趣！我们欢迎来自社区的贡献。

### 📋 行为准则

参与本项目即表示你同意遵守我们的行为准则。请在所有互动中保持尊重和建设性。

### 🐛 报告 Bug

在创建 bug 报告之前，请检查现有问题以避免重复。创建 bug 报告时，请包含尽可能多的细节：

- **描述**: 清晰描述 bug
- **重现步骤**: 逐步说明
- **预期行为**: 你期望发生什么
- **实际行为**: 实际发生了什么
- **环境**: 操作系统、Node 版本、包版本等
- **截图**: 如果适用

### 💡 建议增强功能

欢迎提出增强建议！请提供：

- **清晰的描述**
- **使用场景**和示例
- **潜在实现**方法（如果你有想法）
- 对项目的**好处**

### 🔧 开发设置

1. **Fork 和克隆**

```bash
git clone https://github.com/YOUR_USERNAME/a2ui-react.git
cd a2ui-react/zhama/a2ui
```

2. **安装依赖**

```bash
pnpm install
```

3. **构建项目**

```bash
pnpm run build
```

4. **运行示例**

```bash
cd examples/basic-demo
pnpm install
pnpm run dev
```

### 📝 Pull Request 流程

1. **创建分支**

```bash
git checkout -b feature/your-feature-name
# 或
git checkout -b fix/your-bug-fix
```

2. **进行更改**

- 编写清晰、简洁的代码
- 遵循现有代码风格
- 为新功能添加测试
- 根据需要更新文档

3. **测试你的更改**

```bash
# 运行类型检查
pnpm run type-check

# 运行代码检查
pnpm run lint

# 格式化代码
pnpm run format

# 构建以确保没有错误
pnpm run build
```

4. **提交你的更改**

遵循约定式提交消息：

```bash
git commit -m "feat: 添加新组件"
git commit -m "fix: 解决渲染问题"
git commit -m "docs: 更新 README"
git commit -m "refactor: 提升性能"
```

提交类型：
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更改
- `style`: 代码样式更改（格式化等）
- `refactor`: 代码重构
- `perf`: 性能改进
- `test`: 添加或更新测试
- `chore`: 维护任务

5. **推送并创建 PR**

```bash
git push origin feature/your-feature-name
```

然后在 GitHub 上创建 Pull Request，包含：
- 清晰的标题和描述
- 引用任何相关问题
- 所做更改的列表
- UI 更改的截图/GIF

### 📐 代码风格指南

#### TypeScript

- 所有代码使用 TypeScript
- 对象形状优先使用 `interface` 而非 `type`
- 为函数使用显式返回类型
- 避免 `any` - 使用适当的类型

```typescript
// 好的
interface ButtonProps {
  text: string;
  onClick: () => void;
}

function MyComponent({ text, onClick }: ButtonProps): JSX.Element {
  return <button onClick={onClick}>{text}</button>;
}

// 避免
function MyComponent(props: any) {
  return <button>{props.text}</button>;
}
```

#### React 组件

- 使用函数组件
- 组件使用 `function` 关键字
- 保持组件小而专注
- 将可重用逻辑提取到自定义 hooks

```typescript
// 好的
export function Button({ text, onClick }: ButtonProps) {
  return <button onClick={onClick}>{text}</button>;
}

// 避免
export const Button = (props) => <button>{props.text}</button>;
```

#### 文件组织

```
src/
├── types/          # 类型定义
├── ui/             # UI 组件
│   ├── button.tsx  # 组件文件（小写加短横线）
│   └── index.ts    # 桶导出
├── utils/          # 工具函数
└── index.ts        # 主入口
```

#### 命名约定

- **文件**: `kebab-case.tsx`
- **组件**: `PascalCase`
- **函数**: `camelCase`
- **常量**: `UPPER_SNAKE_CASE`
- **接口/类型**: `PascalCase`

### ✅ 测试

- 为新功能添加测试
- 提交 PR 前确保所有测试通过
- 编写清晰的测试描述

### 📚 文档

- 添加新功能时更新 README.md
- 为公共 API 添加 JSDoc 注释
- 行为更改时更新示例
- 保持文档与代码同步

### 🔍 代码审查

所有提交都需要审查。我们使用 GitHub Pull Request 进行此过程。审查者可能会在合并前要求更改。

### 📦 发布流程

维护者将处理发布：

1. 遵循[语义化版本](https://semver.org/)进行版本提升
2. 更新 CHANGELOG.md
3. 创建发布标签
4. 发布到 npm

### 🤔 有问题？

随时：
- 为问题打开 issue
- 在 GitHub Discussions 中参与讨论
- 通过电子邮件联系维护者

---

<div align="center">

Thank you for contributing! 感谢你的贡献！

</div>

