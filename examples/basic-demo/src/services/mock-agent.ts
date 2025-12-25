/**
 * Mock Agent Service
 * Simulates A2UI protocol responses using ContentModel format (like ai-training)
 */

export interface MockResponse {
  text: string;
  contentModel?: any; // ContentModel format (high-level semantic)
}

// Sample responses using ContentModel format (matching ai-training pattern)
const mockResponses: MockResponse[] = [
  {
    text: 'Hello! Welcome to A2UI Basic Demo. Let me show you some interactive UI components.',
    contentModel: {
      scene: 'welcome',
      content: {
        greeting: 'Welcome to A2UI',
        description:
          'This demo showcases the A2UI protocol in action. Choose an option below to explore.',
        topics: [
          {
            id: 'getting-started',
            title: 'Getting Started',
            description: 'Learn the basics of A2UI protocol',
            icon: 'book',
            actionText: 'Start Learning',
            actionValue: 'getting-started',
          },
          {
            id: 'components',
            title: 'Components',
            description: 'Explore available UI components',
            icon: 'grid',
            actionText: 'View Components',
            actionValue: 'components',
          },
          {
            id: 'examples',
            title: 'Examples',
            description: 'See A2UI in real-world scenarios',
            icon: 'code',
            actionText: 'Browse Examples',
            actionValue: 'examples',
          },
        ],
      },
    },
  },
  {
    text: 'Here is some learning content about A2UI components:',
    contentModel: {
      scene: 'learning',
      content: {
        title: 'A2UI Components Overview',
        sections: [
          {
            type: 'text',
            title: 'What is A2UI?',
            content:
              'A2UI (Agent-to-UI) is a protocol for AI agents to generate dynamic user interfaces. Instead of returning plain text, agents can return structured data that describes UI components.',
          },
          {
            type: 'text',
            title: 'Core Components',
            content:
              'A2UI provides several built-in components:\n\n- **Text**: Display formatted text\n- **Button**: Interactive buttons\n- **Card**: Content cards with title and description\n- **List**: Arrange multiple items\n- **TextField**: Input fields for user data',
          },
          {
            type: 'tips',
            content:
              'Each component can be customized with properties and can contain child components for complex layouts.',
          },
        ],
        actions: [
          {
            id: 'next',
            text: 'Continue',
            action: 'next_topic',
            context: { topicId: 'components' },
          },
        ],
      },
    },
  },
  {
    text: 'Here is a practice question for you:',
    contentModel: {
      scene: 'conversation',
      content: {
        message:
          'A2UI supports interactive forms and data collection. You can use TextField, Checkbox, and other input components to build dynamic forms.',
        suggestions: ['Try another example', 'Learn more about A2UI'],
      },
    },
  },
];

let responseIndex = 0;

export async function sendMessage(message: string): Promise<MockResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Get next response in rotation
  const response = mockResponses[responseIndex % mockResponses.length];
  responseIndex++;

  console.log('[MockAgent] Returning response:', response);
  return response;
}

export function resetMockAgent(): void {
  responseIndex = 0;
}
