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

    expect(screen.getByRole('button', { name: /Check-in/ })).toBeVisible();
    expect(localStorage.getItem('guest-guide-language')).toBe('en');
  });

  test('applies a stored language to the document on first render', () => {
    localStorage.setItem('guest-guide-language', 'en');
    document.documentElement.lang = 'it';

    render(<App />);

    expect(document.documentElement).toHaveAttribute('lang', 'en');
  });

  test('shows La mia Casa and the eight categories in the requested order', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'La mia Casa',
    );
    expect(
      screen
        .getAllByTestId('guide-card')
        .map((button) => button.dataset.sectionId),
    ).toEqual([
      'checkin',
      'wifi',
      'rules',
      'food',
      'transport',
      'health',
      'groceries',
      'checkout',
    ]);
  });

  test.each([
    'Check-in',
    'Wi-Fi',
    'Regole casa',
    'Dove mangiare nei dintorni',
    'Trasporti vicini',
    'Farmacie e ospedali',
    'Supermercati',
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
    expect(
      screen.getByRole('button', { name: 'Accesso copiato' }),
    ).toBeVisible();
    expect(screen.getByTestId('wifi-password')).toHaveClass('is-scrambling');
    expect(screen.getByTestId('wifi-password')).not.toHaveTextContent(
      'Password Wi-Fi',
    );
  });

  test.each([
    'Supermercati',
  ])(
    'shows configurable places in the %s sheet',
    async (label) => {
      const user = userEvent.setup();
      render(<App />);

      await user.click(screen.getByRole('button', { name: new RegExp(label) }));

      expect(
        screen.getAllByRole('link', { name: 'Apri in Google Maps' }),
      ).not.toHaveLength(0);
    },
  );

  test('shows emergency numbers without starting a call', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Emergenze' }));

    expect(screen.getByRole('dialog')).toHaveTextContent('112');
    expect(
      screen.queryByRole('link', { name: /112/ }),
    ).not.toBeInTheDocument();
  });

  test('offers a protected Google Maps link from the check-in sheet', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /Check-in/ }));
    const mapLink = screen.getByRole('link', {
      name: 'Apri in Google Maps',
    });

    expect(mapLink).toHaveAttribute('href', expect.stringMatching(/^https:\/\//));
    expect(mapLink).toHaveAttribute('target', '_blank');
    expect(mapLink).toHaveAttribute('rel', expect.stringContaining('noreferrer'));
  });

  test('places the house photo placeholder before the entry instructions', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /Check-in/ }));

    const photo = screen.getByText('Foto della casa in arrivo');
    const instructions = screen.getByText('Come entrare');
    expect(
      photo.compareDocumentPosition(instructions) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  test('shows exactly two bus lines with Moovit, Maps and the home stop', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /Trasporti vicini/ }));

    expect(screen.getAllByTestId('bus-line')).toHaveLength(2);
    expect(screen.getAllByRole('link', { name: 'Apri in Moovit' })).toHaveLength(2);
    expect(
      screen.getAllByRole('link', { name: 'Apri in Google Maps' }),
    ).toHaveLength(2);
    expect(screen.getAllByRole('listitem', { current: 'location' })).toHaveLength(
      2,
    );
  });

  test('opens health on pharmacies, switches to hospitals and resets on reopen', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /Farmacie e ospedali/ }));
    expect(screen.getByRole('button', { name: 'Farmacie' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getAllByTestId('pharmacy-card')).toHaveLength(3);

    await user.click(screen.getByRole('button', { name: 'Ospedali' }));
    expect(screen.getAllByTestId('hospital-card')).toHaveLength(2);
    expect(
      screen.getByRole('link', {
        name: 'Trova pronto soccorso nel Lazio',
      }),
    ).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Chiudi' }));
    await user.click(screen.getByRole('button', { name: /Farmacie e ospedali/ }));
    expect(screen.getByRole('button', { name: 'Farmacie' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  test('replaces Location with Recycling and shows all seven collection days', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.queryByRole('link', { name: 'Posizione' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Raccolta' }));

    expect(screen.getAllByTestId('recycling-day')).toHaveLength(7);
    expect(screen.getByText('Lunedì')).toBeVisible();
    expect(screen.getByText('Domenica')).toBeVisible();
    expect(screen.getAllByTestId('bin-icon')).toHaveLength(7);
  });

  test('offers six Google series and downloads one Apple calendar file', async () => {
    const user = userEvent.setup();
    const createObjectURL = vi.fn(() => 'blob:recycling-calendar');
    const revokeObjectURL = vi.fn();
    const anchorClick = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});
    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      value: createObjectURL,
    });
    Object.defineProperty(URL, 'revokeObjectURL', {
      configurable: true,
      value: revokeObjectURL,
    });
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Raccolta' }));
    await user.click(screen.getByRole('button', { name: 'Attiva promemoria' }));
    await user.click(screen.getByRole('button', { name: 'Google Calendar' }));
    const googleLinks = screen.getAllByRole('link', { name: /Aggiungi/ });
    expect(googleLinks).toHaveLength(6);
    googleLinks.forEach((link) => {
      expect(new URL(link.href).hostname).toBe('calendar.google.com');
    });

    await user.click(screen.getByRole('button', { name: 'Apple / iPhone' }));
    expect(createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
    expect(anchorClick).toHaveBeenCalledTimes(1);
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:recycling-calendar');
    anchorClick.mockRestore();
  });
});
