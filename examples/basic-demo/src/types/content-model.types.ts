/**
 * Content Model Types
 * Based on ai-training n8n-prompt.md
 * High-level semantic data structures that will be converted to A2UI ComponentNodes
 */

// Base ContentModel
export interface ContentModel {
  scene: 'welcome' | 'learning' | 'practice' | 'feedback' | 'progress' | 'conversation';
  content: any;
  metadata?: Record<string, any>;
}

// Welcome Scene (intent: welcome)
export interface WelcomeContent extends ContentModel {
  scene: 'welcome';
  content: {
    greeting: string;
    description: string;
    topics: Array<{
      id: string;
      title: string;
      description: string;
      icon?: string;
      actionText: string;
      actionValue: string;
    }>;
  };
}

// Learning Scene (intent: select_topic or learning)
export interface LearningContent extends ContentModel {
  scene: 'learning';
  content: {
    title: string;
    sections: Array<{
      type: 'text' | 'code' | 'tips' | 'warning';
      title?: string;
      content: string;
      language?: string; // for code type
    }>;
    actions?: Array<{
      id: string;
      text: string;
      action: string;
      context?: Record<string, any>;
    }>;
  };
}

// Practice Scene (intent: practice)
export interface PracticeContent extends ContentModel {
  scene: 'practice';
  content: {
    title: string;
    description: string;
    questions: Array<{
      id: string;
      type: 'single_choice' | 'multiple_choice' | 'text_input' | 'code_input';
      question: string;
      options?: Array<{
        id: string;
        text: string;
      }>;
      correctAnswer?: string; // server-side only, not sent to client
      hint?: string;
      difficulty: 'easy' | 'medium' | 'hard';
      explanation?: string; // shown after answer
    }>;
  };
  metadata?: {
    topicId: string;
    difficulty: string;
    totalQuestions: number;
  };
}

// Feedback Scene (intent: submit_answer)
export interface FeedbackContent extends ContentModel {
  scene: 'feedback';
  content: {
    type: 'success' | 'partial' | 'error';
    title: string;
    message: string;
    score: number;
    maxScore: number;
    analysis: string;
    suggestions: string[];
    nextSteps: Array<{
      id: string;
      text: string;
      action: string;
      context?: Record<string, any>;
    }>;
  };
}

// Progress Scene (intent: progress)
export interface ProgressContent extends ContentModel {
  scene: 'progress';
  content: {
    title: string;
    current: number;
    total: number;
    currentTopic: string;
    stats: Array<{
      label: string;
      value: string;
      icon?: string;
    }>;
  };
}

// Conversation Scene (intent: conversation)
export interface ConversationContent extends ContentModel {
  scene: 'conversation';
  content: {
    message: string;
    suggestions?: string[];
  };
}
