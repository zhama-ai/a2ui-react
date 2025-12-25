import { useEffect } from 'react';

import { ChatPanel } from '@/components/chat-panel';
import { WelcomeScreen } from '@/components/welcome-screen';
import { WorkspacePanel } from '@/components/workspace-panel';
import { useChatStore } from '@/stores/chat-store';

function App() {
  const { messages, sessionId, initialize } = useChatStore();

  // Initialize session on mount
  useEffect(() => {
    if (!sessionId) {
      initialize();
    }
  }, [sessionId, initialize]);

  // Show welcome screen when no messages
  const showWelcome = messages.length === 0;

  return (
    <div className="flex h-full w-full overflow-hidden bg-background">
      {/* Left: Chat Panel */}
      <div className="flex h-full w-[400px] min-w-[360px] flex-col border-r">
        <ChatPanel />
      </div>

      {/* Right: Dynamic UI Workspace */}
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        {showWelcome ? <WelcomeScreen /> : <WorkspacePanel />}
      </div>
    </div>
  );
}

export default App;
