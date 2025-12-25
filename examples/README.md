# A2UI Examples

This directory contains example applications demonstrating the usage of the A2UI protocol and library.

## Available Examples

### 1. Basic Demo (`basic-demo/`)

A fundamental demonstration of A2UI protocol basics.

**Features:**
- Simple chat interface
- Mock AI agent responses
- Dynamic UI generation
- Component showcase

**Quick Start:**
```bash
cd basic-demo
pnpm install
pnpm dev
```

Visit http://localhost:5173 to see the demo in action.

## What is A2UI?

A2UI (Agent-to-UI) is a protocol that enables AI agents to generate dynamic, interactive user interfaces. Instead of just returning text, agents can return structured data that describes UI components, layouts, and interactions.

## Example Structure

Each example follows a similar structure:

```
example-name/
├── src/
│   ├── components/     # React components
│   ├── services/       # API services
│   ├── stores/         # State management
│   ├── styles/         # Styles
│   └── main.tsx        # Entry point
├── package.json
├── vite.config.ts
└── README.md
```

## Running Examples

All examples use Vite for development and build:

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Creating Your Own Example

1. Copy the `basic-demo` folder as a template
2. Update `package.json` with your example name
3. Modify the source code to demonstrate your use case
4. Add a README.md documenting your example
5. Submit a pull request!

## Learn More

- [A2UI Documentation](../README.md)
- [Component Reference](../src/ui/)
- [Protocol Specification](../docs/)

## Contributing

We welcome contributions! If you have an interesting use case or example, please:

1. Create a new directory under `examples/`
2. Follow the existing structure and naming conventions
3. Include comprehensive documentation
4. Submit a pull request with a clear description

## License

MIT - See the [main LICENSE](../LICENSE) file for details.

