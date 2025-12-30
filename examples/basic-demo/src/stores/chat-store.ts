import { create } from 'zustand';

import type { ServerToClientMessageV09 } from '@zhama/a2ui';

import { sendMessage as sendMockMessage } from '@/services/mock-agent';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface ChatState {
  messages: Message[];
  sessionId: string | null;
  isLoading: boolean;
  currentA2UIMessages: ServerToClientMessageV09[] | null;

  // Actions
  initialize: () => void;
  addMessage: (message: Message) => void;
  setLoading: (loading: boolean) => void;
  setCurrentA2UIMessages: (messages: ServerToClientMessageV09[]) => void;
  clearMessages: () => void;
  sendMessage: (content: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  sessionId: null,
  isLoading: false,
  currentA2UIMessages: null,

  initialize: () => {
    set({
      sessionId: `session-${Date.now()}`,
      messages: [],
      currentA2UIMessages: null,
    });
  },

  addMessage: (message) => {
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  setCurrentA2UIMessages: (messages) => {
    set({ currentA2UIMessages: messages });
  },

  clearMessages: () => {
    set({ messages: [], currentA2UIMessages: null });
  },

  sendMessage: async (content: string) => {
    const { addMessage, setLoading, setCurrentA2UIMessages } = get();

    // Add user message
    const userMessage: Message = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content,
      timestamp: Date.now(),
    };
    addMessage(userMessage);
    setLoading(true);

    try {
      // Get response from mock agent
      const response = await sendMockMessage(content);

      // Add assistant message
      const assistantMessage: Message = {
        id: `msg-${Date.now()}-assistant`,
        role: 'assistant',
        content: response.text,
        timestamp: Date.now(),
      };
      addMessage(assistantMessage);

      // Update A2UI messages
      if (response.messages && response.messages.length > 0) {
        setCurrentA2UIMessages(response.messages);
      }
    } catch (error) {
      console.error('[ChatStore] Error sending message:', error);
      // Add error message
      const errorMessage: Message = {
        id: `msg-${Date.now()}-error`,
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.',
        timestamp: Date.now(),
      };
      addMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  },
}));
