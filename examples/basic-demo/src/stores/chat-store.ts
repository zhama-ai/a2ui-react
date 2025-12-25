import { create } from 'zustand';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  contentModel?: any; // ContentModel (high-level semantic format)
}

interface ChatState {
  messages: Message[];
  sessionId: string | null;
  isLoading: boolean;
  currentA2UI: any | null;

  // Actions
  initialize: () => void;
  addMessage: (message: Message) => void;
  setLoading: (loading: boolean) => void;
  setCurrentA2UI: (a2ui: any) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  sessionId: null,
  isLoading: false,
  currentA2UI: null,

  initialize: () => {
    set({
      sessionId: `session-${Date.now()}`,
      messages: [],
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

  setCurrentA2UI: (a2ui) => {
    set({ currentA2UI: a2ui });
  },

  clearMessages: () => {
    set({ messages: [], currentA2UI: null });
  },
}));
