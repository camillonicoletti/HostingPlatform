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

  test('shows LA MIA CASA and the eight categories in the requested order', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'LA MIA CASA',
    );
    expect(
      screen
        .getAllByTestId('guide-card')
        .map((button) => button.dataset.sectionId),
    ).toEqual([
      'checkin',
      'wifi',
      'rules',
      'groceries',
      'transport',
      'health',
      'food',
      'checkout',
    ]);
  });

  test('hides card subtitles while keeping accessible descriptions and semantic icons', () => {
    render(<App />);

    expect(document.querySelectorAll('.guide-card__copy small')).toHaveLength(0);
    expect(
      screen.getByRole('button', { name: /Check-in\. Arrivo e accesso/ }),
    ).toBeVisible();

    ['checkin', 'wifi', 'groceries', 'transport', 'food'].forEach((id) => {
      expect(
        document.querySelector(
          `[data-section-id="${id}"] [data-icon="${id}"]`,
        ),
      ).toBeTruthy();
    });
  });

  test.each([
    'Check-in',
    'Wi-Fi',
    'Regole casa',
    'Supermercati',
    'Trasporti',
    'Farmacie e ospedali',
    'Banche e Ufficio postale',
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

  test('shows emergency numbers with direct call actions', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Emergenze' }));

    expect(screen.getByRole('dialog')).toHaveTextContent('112');
    expect(screen.getByRole('link', { name: 'Chiama 112' })).toHaveAttribute(
      'href',
      'tel:112',
    );
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

  test('places the real house photo before the entry instructions', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /Check-in/ }));

    const photo = screen.getByRole('img', {
      name: 'Ingresso della casa al civico 99',
    });
    const instructions = screen.getByText('Come entrare');
    const arrivalPanel = photo.closest('.arrival-panel');

    expect(photo).toHaveAttribute('src', '/img_casa.jpg');
    expect(arrivalPanel).toBeInTheDocument();
    expect(arrivalPanel).toContainElement(instructions);
    expect(arrivalPanel).toContainElement(
      screen.getByRole('link', { name: 'Apri in Google Maps' }),
    );
    expect(
      photo.compareDocumentPosition(instructions) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      screen.queryByText('Foto della casa in arrivo'),
    ).not.toBeInTheDocument();
  });

  test('shows the configured bus line in a compact transport panel', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /Trasporti/ }));

    expect(screen.getAllByTestId('bus-line')).toHaveLength(1);
    expect(
      screen.getAllByRole('link', { name: 'Apri orari e fermate' }),
    ).toHaveLength(1);
    expect(
      screen.getAllByRole('link', { name: 'Apri in Google Maps' }),
    ).toHaveLength(1);
    expect(screen.getAllByRole('listitem', { current: 'location' })).toHaveLength(
      1,
    );
    expect(
      screen.getByRole('dialog').querySelector('.transport-panel'),
    ).toBeTruthy();
    expect(
      screen.getByRole('dialog').querySelector('.transport-extras'),
    ).toBeTruthy();
  });

  test('shows separate ATAC store badges with the official destinations', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /Trasporti/ }));

    const apple = screen.getByRole('link', { name: 'Scarica su App Store' });
    const google = screen.getByRole('link', {
      name: 'Scarica su Google Play',
    });

    expect(apple).toHaveAttribute(
      'href',
      'https://apps.apple.com/it/app/atac-roma/id1544302659',
    );
    expect(google).toHaveAttribute(
      'href',
      'https://play.google.com/store/apps/details?id=it.roma.atac.mobile&pcampaignid=web_share',
    );
    expect(apple).toHaveClass('store-badge');
    expect(google).toHaveClass('store-badge');
    expect(apple).not.toHaveTextContent('↗');
    expect(google).not.toHaveTextContent('↗');
    expect(
      screen.queryByRole('link', { name: 'Scarica App ATAC Roma' }),
    ).not.toBeInTheDocument();
  });

  test('isolates the ATAC store badge layout from the other transport links', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /Trasporti/ }));

    const atacCard = screen.getByText('App ATAC Roma').closest('.useful-card');
    expect(atacCard).toHaveClass('has-store-badges');
    expect(atacCard.querySelector('.store-badges')).toBeTruthy();
  });

  test('opens health on pharmacies, switches to hospitals and resets on reopen', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /Farmacie e ospedali/ }));
    expect(screen.getByRole('button', { name: 'Farmacie' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getAllByTestId('pharmacy-card')).toHaveLength(1);

    await user.click(screen.getByRole('button', { name: 'Ospedali' }));
    expect(screen.getAllByTestId('hospital-card')).toHaveLength(2);
    expect(
      screen.queryByRole('link', {
        name: 'Trova pronto soccorso nel Lazio',
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/non scegliere un ospedale soltanto in base alla distanza/),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Chiudi' }));
    await user.click(screen.getByRole('button', { name: /Farmacie e ospedali/ }));
    expect(screen.getByRole('button', { name: 'Farmacie' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  test('opens and closes the inline HOUSE review panel', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /Check-out/ }));
    const reviewButton = screen.getByRole('button', {
      name: 'Lascia una recensione',
    });

    expect(reviewButton).toHaveAttribute('aria-expanded', 'false');
    await user.click(reviewButton);

    expect(reviewButton).toHaveAttribute('aria-expanded', 'true');
    expect(reviewButton).toHaveAttribute(
      'aria-controls',
      'checkout-review-panel',
    );
    expect(screen.getByText(/prenotato tramite HOUSE/)).toBeVisible();
    expect(
      screen.getByRole('button', { name: 'Lascia recensione su HOUSE' }),
    ).toBeDisabled();

    const closeReview = screen.getByRole('button', {
      name: 'Chiudi recensione',
    });
    expect(closeReview).toHaveTextContent('×');
    await user.click(closeReview);

    expect(reviewButton).toHaveAttribute('aria-expanded', 'false');
    expect(
      screen.queryByText(/prenotato tramite HOUSE/),
    ).not.toBeInTheDocument();
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

  test('toggles the reminder choices and restores the bell when closed', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Raccolta' }));
    const reminder = screen.getByRole('button', { name: 'Attiva promemoria' });
    const firstDay = screen.getAllByTestId('recycling-day')[0];

    expect(
      reminder.compareDocumentPosition(firstDay) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(reminder).toHaveAttribute('aria-expanded', 'false');
    expect(reminder.querySelector('[data-icon="calendar"]')).toBeTruthy();
    expect(screen.getByText(/^vetro$/i)).toHaveClass(
      'glass-warning',
    );

    await user.click(reminder);

    expect(reminder).toHaveAccessibleName('Chiudi promemoria');
    expect(reminder).toHaveAttribute('aria-expanded', 'true');
    expect(reminder).toHaveAttribute(
      'aria-controls',
      'recycling-reminder-options',
    );
    expect(reminder.querySelector('.icon')).toHaveTextContent('×');
    expect(
      screen.getByText('Scegli il calendario che usi sul telefono.'),
    ).toBeVisible();

    await user.click(reminder);

    expect(reminder).toHaveAccessibleName('Attiva promemoria');
    expect(reminder).toHaveAttribute('aria-expanded', 'false');
    expect(
      screen.queryByText('Scegli il calendario che usi sul telefono.'),
    ).not.toBeInTheDocument();
  });

  test('offers one Google series per collection day and downloads one Apple calendar file', async () => {
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
    expect(googleLinks).toHaveLength(5);
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
