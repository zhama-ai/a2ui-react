import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { Button } from '../button';

describe('Button Component', () => {
  it('renders button with text', () => {
    render(
      <Button
        component={{
          type: 'button',
          properties: {
            child: {
              id: 'text-1',
              type: 'Text',
              properties: {
                text: { literal: 'Click Me' },
              },
            },
          },
        }}
        surfaceId="test-surface"
      />
    );

    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('calls action handler on click', async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();

    render(
      <Button
        component={{
          type: 'button',
          properties: {
            child: {
              id: 'text-1',
              type: 'Text',
              properties: {
                text: { literal: 'Click Me' },
              },
            },
            action: {
              type: 'postback',
              payload: 'test-action',
            },
          },
        }}
        surfaceId="test-surface"
        onAction={onAction}
      />
    );

    const button = screen.getByRole('button');
    await user.click(button);

    expect(onAction).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'postback',
        payload: 'test-action',
      })
    );
  });

  it('applies disabled state', () => {
    render(
      <Button
        component={{
          type: 'button',
          properties: {
            child: {
              id: 'text-1',
              type: 'Text',
              properties: {
                text: { literal: 'Click Me' },
              },
            },
            disabled: { literal: true },
          },
        }}
        surfaceId="test-surface"
      />
    );

    expect(screen.getByRole('button')).toBeDisabled();
  });
});

