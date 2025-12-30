/**
 * Mock Agent Service
 * Simulates A2UI v0.9 protocol responses
 */

import type { ServerToClientMessageV09 } from '@zhama/a2ui';

export interface MockResponse {
  text: string;
  messages: ServerToClientMessageV09[];
}

// Standard catalog ID
const CATALOG_ID = 'https://a2ui.dev/specification/0.9/standard_catalog_definition.json';

// Sample responses using A2UI v0.9 format
const mockResponses: MockResponse[] = [
  // Welcome response
  {
    text: 'Hello! Welcome to A2UI Basic Demo. Let me show you some interactive UI components.',
    messages: [
      {
        createSurface: {
          surfaceId: 'welcome',
          catalogId: CATALOG_ID,
        },
      },
      {
        updateComponents: {
          surfaceId: 'welcome',
          components: [
            { id: 'root', component: 'Column', children: ['title', 'description', 'topics-list'] },
            { id: 'title', component: 'Text', text: 'Welcome to A2UI', usageHint: 'h1' },
            {
              id: 'description',
              component: 'Text',
              text: 'This demo showcases the A2UI protocol in action. Choose an option below to explore.',
              usageHint: 'body',
            },
            {
              id: 'topics-list',
              component: 'List',
              children: ['card-getting-started', 'card-components', 'card-examples'],
              direction: 'vertical',
            },
            // Getting Started Card
            {
              id: 'card-getting-started',
              component: 'Card',
              child: 'card-getting-started-content',
            },
            {
              id: 'card-getting-started-content',
              component: 'Column',
              children: [
                'card-getting-started-title',
                'card-getting-started-desc',
                'card-getting-started-btn',
              ],
            },
            {
              id: 'card-getting-started-title',
              component: 'Text',
              text: 'Getting Started',
              usageHint: 'h3',
            },
            {
              id: 'card-getting-started-desc',
              component: 'Text',
              text: 'Learn the basics of A2UI protocol',
              usageHint: 'caption',
            },
            {
              id: 'card-getting-started-btn',
              component: 'Button',
              child: 'card-getting-started-btn-text',
              action: { name: 'navigate', context: { topic: 'getting-started' } },
            },
            { id: 'card-getting-started-btn-text', component: 'Text', text: 'Start Learning' },
            // Components Card
            {
              id: 'card-components',
              component: 'Card',
              child: 'card-components-content',
            },
            {
              id: 'card-components-content',
              component: 'Column',
              children: ['card-components-title', 'card-components-desc', 'card-components-btn'],
            },
            {
              id: 'card-components-title',
              component: 'Text',
              text: 'Components',
              usageHint: 'h3',
            },
            {
              id: 'card-components-desc',
              component: 'Text',
              text: 'Explore available UI components',
              usageHint: 'caption',
            },
            {
              id: 'card-components-btn',
              component: 'Button',
              child: 'card-components-btn-text',
              action: { name: 'navigate', context: { topic: 'components' } },
            },
            { id: 'card-components-btn-text', component: 'Text', text: 'View Components' },
            // Examples Card
            {
              id: 'card-examples',
              component: 'Card',
              child: 'card-examples-content',
            },
            {
              id: 'card-examples-content',
              component: 'Column',
              children: ['card-examples-title', 'card-examples-desc', 'card-examples-btn'],
            },
            { id: 'card-examples-title', component: 'Text', text: 'Examples', usageHint: 'h3' },
            {
              id: 'card-examples-desc',
              component: 'Text',
              text: 'See A2UI in real-world scenarios',
              usageHint: 'caption',
            },
            {
              id: 'card-examples-btn',
              component: 'Button',
              child: 'card-examples-btn-text',
              action: { name: 'navigate', context: { topic: 'examples' } },
            },
            { id: 'card-examples-btn-text', component: 'Text', text: 'Browse Examples' },
          ],
        },
      },
    ],
  },
  // Learning content response
  {
    text: 'Here is some learning content about A2UI components:',
    messages: [
      {
        createSurface: {
          surfaceId: 'learning',
          catalogId: CATALOG_ID,
        },
      },
      {
        updateComponents: {
          surfaceId: 'learning',
          components: [
            {
              id: 'root',
              component: 'Column',
              children: ['title', 'divider1', 'section1-title', 'section1-content', 'divider2', 'section2-title', 'section2-content', 'tips', 'actions-row'],
            },
            {
              id: 'title',
              component: 'Text',
              text: 'A2UI Components Overview',
              usageHint: 'h2',
            },
            { id: 'divider1', component: 'Divider', axis: 'horizontal' },
            {
              id: 'section1-title',
              component: 'Text',
              text: 'What is A2UI?',
              usageHint: 'h3',
            },
            {
              id: 'section1-content',
              component: 'Text',
              text: 'A2UI (Agent-to-UI) is a protocol for AI agents to generate dynamic user interfaces. Instead of returning plain text, agents can return structured data that describes UI components.',
              usageHint: 'body',
            },
            { id: 'divider2', component: 'Divider', axis: 'horizontal' },
            {
              id: 'section2-title',
              component: 'Text',
              text: 'Core Components',
              usageHint: 'h3',
            },
            {
              id: 'section2-content',
              component: 'Text',
              text: 'A2UI provides several built-in components:\n\n- **Text**: Display formatted text\n- **Button**: Interactive buttons\n- **Card**: Content cards with title and description\n- **List**: Arrange multiple items\n- **TextField**: Input fields for user data',
              usageHint: 'body',
            },
            {
              id: 'tips',
              component: 'Text',
              text: '💡 Each component can be customized with properties and can contain child components for complex layouts.',
              usageHint: 'caption',
            },
            {
              id: 'actions-row',
              component: 'Row',
              children: ['continue-btn'],
              distribution: 'end',
            },
            {
              id: 'continue-btn',
              component: 'Button',
              child: 'continue-btn-text',
              action: { name: 'navigate', context: { topic: 'components' } },
              primary: true,
            },
            { id: 'continue-btn-text', component: 'Text', text: 'Continue' },
          ],
        },
      },
    ],
  },
  // Conversation response with form
  {
    text: 'Let me show you an interactive form:',
    messages: [
      {
        createSurface: {
          surfaceId: 'form-demo',
          catalogId: CATALOG_ID,
        },
      },
      {
        updateComponents: {
          surfaceId: 'form-demo',
          components: [
            {
              id: 'root',
              component: 'Column',
              children: ['title', 'description', 'form-card', 'suggestions-row'],
            },
            {
              id: 'title',
              component: 'Text',
              text: 'Interactive Form Demo',
              usageHint: 'h2',
            },
            {
              id: 'description',
              component: 'Text',
              text: 'A2UI supports interactive forms and data collection. Try editing the fields below:',
              usageHint: 'body',
            },
            { id: 'form-card', component: 'Card', child: 'form-content' },
            {
              id: 'form-content',
              component: 'Column',
              children: ['name-field', 'email-field', 'agree-checkbox', 'submit-btn'],
            },
            {
              id: 'name-field',
              component: 'TextField',
              label: 'Your Name',
              text: { path: '/form/name' },
              usageHint: 'shortText',
            },
            {
              id: 'email-field',
              component: 'TextField',
              label: 'Email Address',
              text: { path: '/form/email' },
              usageHint: 'shortText',
            },
            {
              id: 'agree-checkbox',
              component: 'CheckBox',
              label: 'I agree to the terms',
              value: { path: '/form/agreed' },
            },
            {
              id: 'submit-btn',
              component: 'Button',
              child: 'submit-btn-text',
              action: {
                name: 'submit',
                context: {
                  name: { path: '/form/name' },
                  email: { path: '/form/email' },
                  agreed: { path: '/form/agreed' },
                },
              },
              primary: true,
            },
            { id: 'submit-btn-text', component: 'Text', text: 'Submit Form' },
            {
              id: 'suggestions-row',
              component: 'Row',
              children: ['suggest1-btn', 'suggest2-btn'],
              distribution: 'start',
            },
            {
              id: 'suggest1-btn',
              component: 'Button',
              child: 'suggest1-text',
              action: { name: 'navigate', context: { topic: 'examples' } },
            },
            { id: 'suggest1-text', component: 'Text', text: 'Try another example' },
            {
              id: 'suggest2-btn',
              component: 'Button',
              child: 'suggest2-text',
              action: { name: 'navigate', context: { topic: 'getting-started' } },
            },
            { id: 'suggest2-text', component: 'Text', text: 'Learn more about A2UI' },
          ],
        },
      },
      {
        updateDataModel: {
          surfaceId: 'form-demo',
          op: 'replace',
          value: {
            form: {
              name: '',
              email: '',
              agreed: false,
            },
          },
        },
      },
    ],
  },
];

let responseIndex = 0;

export async function sendMessage(_message: string): Promise<MockResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Get next response in rotation
  const response = mockResponses[responseIndex % mockResponses.length];
  responseIndex++;

  console.log('[MockAgent] Returning v0.9 response:', response);
  return response ?? { text: 'No response', messages: [] };
}

export function resetMockAgent(): void {
  responseIndex = 0;
}
