import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Text } from '../text';

describe('Text Component', () => {
  it('renders text content', () => {
    render(
      <Text
        component={{
          type: 'text',
          properties: {
            text: { literal: 'Hello World' },
          },
        }}
        surfaceId="test-surface"
      />
    );

    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders as h1 when usageHint is h1', () => {
    render(
      <Text
        component={{
          type: 'text',
          properties: {
            text: { literal: 'Heading' },
            usageHint: { literal: 'h1' },
          },
        }}
        surfaceId="test-surface"
      />
    );

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Heading');
  });

  it('renders markdown when markdown property is true', () => {
    render(
      <Text
        component={{
          type: 'text',
          properties: {
            text: { literal: '**Bold Text**' },
            markdown: { literal: true },
          },
        }}
        surfaceId="test-surface"
      />
    );

    const strong = screen.getByText('Bold Text');
    expect(strong.tagName).toBe('STRONG');
  });

  it('applies custom class names', () => {
    const { container } = render(
      <Text
        component={{
          type: 'text',
          properties: {
            text: { literal: 'Styled Text' },
            classes: { literal: ['custom-class', 'another-class'] },
          },
        }}
        surfaceId="test-surface"
      />
    );

    const element = container.firstChild as HTMLElement;
    expect(element.className).toContain('custom-class');
    expect(element.className).toContain('another-class');
  });
});

