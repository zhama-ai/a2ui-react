/**
 * Content Renderer
 * Converts high-level ContentModel to A2UI ComponentNodes
 * Simplified version inspired by ai-training's scene-renderer
 */

let idCounter = 0;
const generateId = (prefix: string = 'comp') => `${prefix}_${Date.now()}_${idCounter++}`;

export function renderContentModel(model: any): any[] {
  if (!model?.scene) {
    return [];
  }

  switch (model.scene) {
    case 'welcome':
      return renderWelcomeScene(model);
    case 'learning':
      return renderLearningScene(model);
    case 'conversation':
      return renderConversationScene(model);
    default:
      return [];
  }
}

function renderWelcomeScene(model: any) {
  const components: any[] = [];

  // Title
  components.push({
    id: generateId('title'),
    type: 'Text',
    properties: {
      text: { literal: model.content.greeting },
      usageHint: { literal: 'h1' },
    },
  });

  // Description
  components.push({
    id: generateId('desc'),
    type: 'Text',
    properties: {
      text: { literal: model.content.description },
      usageHint: { literal: 'body' },
    },
  });

  // Topics as cards in a list
  const topicCards = model.content.topics.map((topic: any) => ({
    id: generateId(`card_${topic.id}`),
    type: 'Card',
    properties: {
      children: [
        {
          id: generateId(`title_${topic.id}`),
          type: 'Text',
          properties: {
            text: { literal: topic.title },
            usageHint: { literal: 'h3' },
          },
        },
        {
          id: generateId(`desc_${topic.id}`),
          type: 'Text',
          properties: {
            text: { literal: topic.description },
            usageHint: { literal: 'caption' },
          },
        },
        {
          id: generateId(`btn_${topic.id}`),
          type: 'Button',
          properties: {
            child: {
              id: generateId(`btn_text_${topic.id}`),
              type: 'Text',
              properties: {
                text: { literal: topic.actionText },
              },
            },
            action: {
              type: 'postback',
              payload: topic.actionValue,
            },
          },
        },
      ],
    },
  }));

  components.push({
    id: generateId('list'),
    type: 'List',
    properties: {
      children: topicCards,
    },
  });

  return components;
}

function renderLearningScene(model: any) {
  const components: any[] = [];

  // Title
  components.push({
    id: generateId('title'),
    type: 'Text',
    properties: {
      text: { literal: model.content.title },
      usageHint: { literal: 'h2' },
    },
  });

  // Sections
  model.content.sections.forEach((section: any) => {
    if (section.title) {
      components.push({
        id: generateId('section_title'),
        type: 'Text',
        properties: {
          text: { literal: section.title },
          usageHint: { literal: 'h3' },
        },
      });
    }

    components.push({
      id: generateId('section_content'),
      type: 'Text',
      properties: {
        text: { literal: section.content },
        usageHint: { literal: section.type === 'tips' ? 'caption' : 'body' },
      },
    });
  });

  // Actions
  if (model.content.actions && model.content.actions.length > 0) {
    const buttons = model.content.actions.map((action: any) => ({
      id: generateId(`action_${action.id}`),
      type: 'Button',
      properties: {
        child: {
          id: generateId(`action_text_${action.id}`),
          type: 'Text',
          properties: {
            text: { literal: action.text },
          },
        },
        action: {
          type: 'postback',
          payload: action.id,
        },
      },
    }));

    components.push({
      id: generateId('actions'),
      type: 'Row',
      properties: {
        children: buttons,
      },
    });
  }

  return components;
}

function renderConversationScene(model: any) {
  const components: any[] = [];

  // Message
  components.push({
    id: generateId('message'),
    type: 'Text',
    properties: {
      text: { literal: model.content.message },
      usageHint: { literal: 'body' },
    },
  });

  // Suggestions as buttons
  if (model.content.suggestions && model.content.suggestions.length > 0) {
    const suggestionButtons = model.content.suggestions.map(
      (suggestion: string, index: number) => ({
        id: generateId(`suggest_${index}`),
        type: 'Button',
        properties: {
          child: {
            id: generateId(`suggest_text_${index}`),
            type: 'Text',
            properties: {
              text: { literal: suggestion },
            },
          },
          action: {
            type: 'postback',
            payload: suggestion,
          },
        },
      })
    );

    components.push({
      id: generateId('suggestions'),
      type: 'Row',
      properties: {
        children: suggestionButtons,
      },
    });
  }

  return components;
}
