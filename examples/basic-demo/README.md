# A2UI Basic Demo

A basic demonstration application showcasing the A2UI (Agent-to-UI) v0.9 protocol with React.

## Features

- 🎨 **Interactive UI**: Dynamic UI generation based on AI agent responses
- 💬 **Chat Interface**: Simple chat panel for communicating with the mock agent
- 🔄 **Real-time Updates**: UI updates in response to agent messages
- 📱 **Responsive Design**: Clean, modern interface using Tailwind CSS
- ⚡ **A2UI v0.9**: Uses the latest A2UI protocol with flat component structure

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) to view the demo.

### Build

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
basic-demo/
├── src/
│   ├── components/          # React components
│   │   ├── chat-panel.tsx   # Chat interface
│   │   ├── welcome-screen.tsx
│   │   └── workspace-panel.tsx
│   ├── services/            # Service layer
│   │   └── mock-agent.ts    # Mock AI agent (v0.9 protocol)
│   ├── stores/              # State management
│   │   └── chat-store.ts    # Zustand store
│   ├── styles/              # Global styles
│   │   └── globals.css
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── index.html
├── package.json
└── vite.config.ts
```

## How It Works

1. **User Input**: Type a message in the chat panel
2. **Mock Agent**: The mock agent simulates A2UI v0.9 protocol messages
3. **Message Processing**: `A2uiMessageProcessor` builds the component tree
4. **UI Rendering**: `A2UIRoot` renders the dynamic UI from processed messages
5. **Interaction**: Users can interact with the generated UI components

## A2UI v0.9 Protocol

This demo uses the A2UI v0.9 protocol with four message types:

### Server to Client Messages

```typescript
// 1. Create Surface
{ createSurface: { surfaceId: "demo", catalogId: "..." } }

// 2. Update Components (flat adjacency list)
{ updateComponents: { 
    surfaceId: "demo", 
    components: [
      { id: "root", component: "Column", children: ["title", "btn"] },
      { id: "title", component: "Text", text: "Hello World", usageHint: "h1" },
      { id: "btn", component: "Button", child: "btn-text", action: { name: "click" } },
      { id: "btn-text", component: "Text", text: "Click Me" }
    ] 
  } 
}

// 3. Update Data Model
{ updateDataModel: { surfaceId: "demo", op: "replace", value: { user: { name: "John" } } } }

// 4. Delete Surface
{ deleteSurface: { surfaceId: "demo" } }
```

### Data Binding

Components can bind to the data model using JSON Pointer paths:

```typescript
{ id: "greeting", component: "Text", text: { path: "/user/name" } }
```

## Try These Messages

- Send any message to see the welcome screen with topic cards
- Click on topic buttons to navigate between different UI scenes
- The third response shows an interactive form with data binding

## Learn More

- [A2UI Documentation](../../README.md)
- [A2UI v0.9 Specification](https://a2ui.dev/specification/0.9)
- [@zhama/a2ui-core](../../../a2ui-core/README.md)

## License

MIT
