import { useMemo, useCallback } from 'react';

import { A2UIRoot, A2uiMessageProcessor, createMessageProcessor } from '@zhama/a2ui';
import type { A2UIAction, ServerToClientMessageV09 } from '@zhama/a2ui';

import { useChatStore } from '@/stores/chat-store';

export function WorkspacePanel() {
  const { currentA2UIMessages, sendMessage } = useChatStore();

  // Create message processor (stable across renders)
  const processor = useMemo(() => createMessageProcessor(), []);

  // Process messages when they change
  const { surfaces, rootComponent } = useMemo(() => {
    if (!currentA2UIMessages || currentA2UIMessages.length === 0) {
      processor.clearSurfaces();
      return { surfaces: new Map(), rootComponent: null };
    }

    // Process all messages
    processor.processMessages(currentA2UIMessages as ServerToClientMessageV09[]);

    const allSurfaces = processor.getSurfaces();
    console.log('[WorkspacePanel] Processed surfaces:', allSurfaces);

    // Get the first surface (or could support multiple)
    const firstSurface = allSurfaces.values().next().value;
    const root = firstSurface?.componentTree ?? null;

    return { surfaces: allSurfaces, rootComponent: root };
  }, [currentA2UIMessages, processor]);

  // Handle button clicks / user actions - MUST be before any conditional returns
  const handleAction = useCallback(
    (event: A2UIAction) => {
      console.log('[WorkspacePanel] Action triggered:', event);

      // Handle navigation actions
      if (event.action?.name === 'navigate' && event.action?.context) {
        const topic = event.action.context.topic as string;
        if (topic) {
          sendMessage(`I want to learn about ${topic}`);
        }
        return;
      }

      // Handle submit action
      if (event.action?.name === 'submit' && event.action?.context) {
        console.log('[WorkspacePanel] Form submitted with context:', event.action.context);
        sendMessage(`Form submitted: ${JSON.stringify(event.action.context)}`);
        return;
      }

      // Handle generic actions
      if (event.action?.name) {
        sendMessage(`Action: ${event.action.name}`);
      }
    },
    [sendMessage]
  );

  // Get surfaceId from the first surface
  const surfaceId = useMemo(() => {
    return surfaces.keys().next().value ?? null;
  }, [surfaces]);

  console.log('[WorkspacePanel] Current messages:', currentA2UIMessages);
  console.log('[WorkspacePanel] Root component:', rootComponent);

  // Conditional renders AFTER all hooks
  if (!currentA2UIMessages || currentA2UIMessages.length === 0) {
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

  if (!rootComponent) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Processing UI components...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto p-6">
      <A2UIRoot
        processor={processor}
        surfaceId={surfaceId}
        childComponents={[rootComponent]}
        enableCustomElements={false}
        onAction={handleAction}
      />
    </div>
  );
}
