/**
 * @zhama/a2ui/patterns
 *
 * 通用 UI 模式构建器
 *
 * 这些模式基于 A2UI 协议的基础组件，提供更高层次的抽象
 * 用于快速构建常见的 UI 结构
 *
 * 分类：
 * - stats/    数据展示（统计卡片、进度条、得分卡等）
 * - cards/    卡片类（主题卡片、内容卡片、推荐卡片等）
 * - actions/  交互类（按钮组、导航、分页等）
 * - feedback/ 反馈类（消息、提示、通知等）
 * - charts/   可视化（时间线、知识图谱、热力图等）
 * - content/  内容区块（文本、代码块、FAQ等）
 * - forms/    表单模式（表单组、验证提示等）
 */

// ============ Stats - 数据展示 ============
export {
  createStatsGrid,
  createProgressBar,
  createScoreCard,
  createMetadataRow,
  createBadge,
  createBadgeGroup,
  createStreakIndicator,
  createRankCard,
  createComparisonCard,
} from './stats';

// ============ Cards - 卡片类 ============
export {
  createTopicCard,
  createContentCard,
  createRecommendationCard,
  createRelatedContentCard,
  createCourseCard,
  createAchievementCard,
  createAchievementList,
} from './cards';

// ============ Actions - 交互类 ============
export {
  createActionButtonGroup,
  createQuickActions,
  createOptionButtons,
  createNavigationButtons,
  createBreadcrumb,
  createStepIndicator,
  createPagination,
} from './actions';

// ============ Feedback - 反馈类 ============
export {
  createFeedbackCard,
  createMessageCard,
  createToast,
  createAlertBanner,
  createResultBanner,
  createMotivationBanner,
} from './feedback';

// ============ Charts - 可视化 ============
export {
  createTimeline,
  createKnowledgeMap,
  createActivityHeatmap,
  createProgressChart,
  createTrendChart,
} from './charts';

// ============ Content - 内容区块 ============
export {
  createTextSection,
  createQuote,
  createCodeBlock,
  createKeyPoints,
  createStepList,
  createFaqList,
  createComparisonTable,
  createImageGallery,
} from './content';

// ============ Forms - 表单模式 ============
export { createFormGroup, createFieldSet, createValidationHint, createFormSection } from './forms';

// ============ Scene - 场景渲染框架 ============
export {
  SceneRenderer,
  createSceneRenderer,
  renderSimpleScene,
  renderSceneToMessages,
  SceneTemplates,
  createSceneConfig,
  createLayout,
  createResponsiveGrid,
  createSplitLayout,
  createCenteredLayout,
  createCardContainer,
} from './scene';

// ============ Types ============
export type {
  PatternResult,
  PatternMessagesResult,
  PatternOptions,
  StatItem,
  ProgressData,
  ActionButton,
  AchievementData,
  MetadataItem,
  Badge,
  FeedbackMessage,
  TimelineItem,
  KnowledgeNode,
  ContentSection,
  TextSectionData,
  CodeBlockData,
  QuoteData,
  KeyPointsData,
  StepListData,
  FaqListData,
  ComparisonTableData,
  FormField,
} from './types';
