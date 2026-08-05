import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
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
});
