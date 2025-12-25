import { Send } from 'lucide-react';
import { useState } from 'react';

import { sendMessage } from '@/services/mock-agent';
import { useChatStore } from '@/stores/chat-store';

export function ChatPanel() {
  const { messages, isLoading, addMessage, setLoading, setCurrentA2UI } = useChatStore();
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: `msg-${Date.now()}`,
      role: 'user' as const,
      content: input.trim(),
      timestamp: Date.now(),
    };

    addMessage(userMessage);
    setInput('');
    setLoading(true);

    try {
      const response = await sendMessage(userMessage.content);

      const assistantMessage = {
        id: `msg-${Date.now()}`,
        role: 'assistant' as const,
        content: response.text,
        timestamp: Date.now(),
        contentModel: response.contentModel,
      };

      addMessage(assistantMessage);

      if (response.contentModel) {
        console.log('[ChatPanel] Setting ContentModel:', response.contentModel);
        setCurrentA2UI(response.contentModel);
      } else {
        console.log('[ChatPanel] No ContentModel in response');
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">Chat</h2>
        <p className="text-sm text-muted-foreground">Conversation with AI Agent</p>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground'
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg bg-muted px-4 py-2">
              <p className="text-sm text-muted-foreground">Thinking...</p>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
