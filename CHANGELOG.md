# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-12-28

### 🚀 Major Refactor: Independent Style System

#### Changed
- **Removed Tailwind CSS dependency** - A2UI now has a completely independent style system
- **New CSS utility class system** with `a2-` prefix to avoid conflicts with host applications
- **Built-in dark mode support** using CSS `light-dark()` function
- **OKLCH color system** with 6 color palettes (Primary, Secondary, Tertiary, Neutral, NeutralVariant, Error)

#### Added
- `StyleProvider` component for automatic style injection
- `getStylesCSS()` and `createStyleElement()` for SSR and Shadow DOM support
- Complete structural styles generated at build time

#### Removed
- Tailwind CSS preset (`tailwind.preset.js`)
- Examples directory (will be recreated with new style system)

---

## [1.0.0] - 2025-12-25

### 🎉 Initial Release

#### Added
- Complete A2UI Protocol implementation based on Google's specification
- Full TypeScript support with comprehensive type definitions
- React component library:
  - Text (with markdown support)
  - Button (with action handling)
  - Card
  - List (vertical/horizontal)
  - Row & Column layouts
  - TextField
  - CheckBox
  - Image
  - Tabs
  - Surface
- Custom component registration support
- Event handling system (A2UIAction)
- ContentModel to ComponentNode rendering pipeline
- Multi-entry point exports:
  - Main package (`@zhama/a2ui`)
  - Types (`@zhama/a2ui/types`)
  - Data utilities (`@zhama/a2ui/data`)
  - Events (`@zhama/a2ui/events`)
  - Styles (`@zhama/a2ui/styles`)
  - UI components (`@zhama/a2ui/ui`)
  - Context (`@zhama/a2ui/context`)
- Responsive design with mobile-first approach
- Full documentation (README.md in English & Chinese)
- Contributing guidelines (CONTRIBUTING.md in English & Chinese)
- MIT License

#### Architecture
- Two-layer architecture:
  - ContentModel layer (high-level semantic)
  - A2UI Protocol layer (low-level UI)
- Scene-based rendering system
- Extensible component registry

#### Development Tools
- ESLint configuration
- Prettier formatting
- TypeScript strict mode
- tsup build system

---

## [Unreleased]

### Planned Features
- [ ] Additional component variants
- [ ] Animation support
- [ ] Accessibility improvements (ARIA)
- [ ] Server-side rendering (SSR) support
- [ ] Storybook documentation
- [ ] Comprehensive test suite
- [ ] Performance benchmarks
- [ ] More examples and templates

---

## Version History

- **1.0.0** (2025-12-25) - Initial release with complete A2UI protocol implementation

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute to this project.

## License

MIT License - see [LICENSE](./LICENSE) for details.

