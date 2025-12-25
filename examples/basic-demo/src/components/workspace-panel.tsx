import { A2UIRoot } from '@zhama/a2ui';
import type { A2UIAction } from '@zhama/a2ui/events';

import { renderContentModel } from '@/services/content-renderer';
import { useChatStore } from '@/stores/chat-store';

export function WorkspacePanel() {
  const { currentA2UI, sendMessage } = useChatStore();

  console.log('[WorkspacePanel] Current ContentModel:', currentA2UI);

  if (!currentA2UI) {
    console.log('[WorkspacePanel] No ContentModel, showing placeholder');
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">
            No UI to display yet. Send a message to see A2UI in action!
          </p>
        </div>
      </div>
    );
  }

  // Convert ContentModel to A2UI components
  const components = renderContentModel(currentA2UI);

  console.log('[WorkspacePanel] Rendered components:', components);

  if (!components || components.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">
            Failed to render content. Please try again.
          </p>
        </div>
      </div>
    );
  }

  // Handle button clicks
  const handleAction = (event: A2UIAction) => {
    console.log('[WorkspacePanel] Action triggered:', event);

    if (event.action?.type === 'postback' && event.action?.payload) {
      // Send the payload as a message
      const message =
        typeof event.action.payload === 'string'
          ? event.action.payload
          : JSON.stringify(event.action.payload);

      sendMessage(message);
    }
  };

  return (
    <div className="h-full overflow-auto p-6">
      <A2UIRoot
        processor={null}
        surfaceId={null}
        childComponents={components}
        enableCustomElements={false}
        onAction={handleAction}
      />
    </div>
  );
}
