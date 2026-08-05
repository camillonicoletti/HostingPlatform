import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import App from './App';

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  cleanup();
});

describe('guest guide navigation', () => {
  test('switches to English immediately and persists the choice', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'English' }));

    expect(screen.getByRole('button', { name: /Arrival/ })).toBeVisible();
    expect(localStorage.getItem('guest-guide-language')).toBe('en');
  });

  test.each([
    'Arrivo',
    'Wi-Fi',
    'La casa',
    'Dove mangiare',
    'Cosa vedere',
    'Check-out',
  ])('opens and closes the %s sheet', async (label) => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: new RegExp(label) }));

    expect(screen.getByRole('dialog')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Chiudi' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('copies the Wi-Fi password and announces success', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
    render(<App />);

    await user.click(screen.getByRole('button', { name: /Wi-Fi/ }));
    await user.click(screen.getByRole('button', { name: 'Copia password' }));

    expect(await screen.findByRole('status')).toHaveTextContent(
      'Password copiata',
    );
  });

  test('shows emergency numbers without starting a call', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Emergenze' }));

    expect(screen.getByRole('dialog')).toHaveTextContent('112');
    expect(
      screen.queryByRole('link', { name: /112/ }),
    ).not.toBeInTheDocument();
  });

  test('offers a protected Google Maps link from the arrival sheet', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /Arrivo/ }));
    const mapLink = screen.getByRole('link', {
      name: 'Apri in Google Maps',
    });

    expect(mapLink).toHaveAttribute('href', expect.stringMatching(/^https:\/\//));
    expect(mapLink).toHaveAttribute('target', '_blank');
    expect(mapLink).toHaveAttribute('rel', expect.stringContaining('noreferrer'));
  });
});
