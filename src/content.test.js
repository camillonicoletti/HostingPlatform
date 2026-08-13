import { describe, expect, test } from 'vitest';
import { getLocalizedContent } from './content';

describe('guest guide content', () => {
  test('returns complete, distinct Italian and English content', () => {
    const it = getLocalizedContent('it');
    const en = getLocalizedContent('en');

    expect(it?.sections.map((section) => section.id)).toEqual([
      'checkin',
      'wifi',
      'rules',
      'groceries',
      'transport',
      'health',
      'food',
      'checkout',
    ]);
    expect(en?.sections.map((section) => section.id)).toEqual([
      'checkin',
      'wifi',
      'rules',
      'groceries',
      'transport',
      'health',
      'food',
      'checkout',
    ]);
    expect(it?.welcome).not.toBe(en?.welcome);
    expect(it.sections.find(({ id }) => id === 'food').title).toBe(
      'Banche e Ufficio postale',
    );
    expect(en.sections.find(({ id }) => id === 'food').title).toBe(
      'Banks and Post Office',
    );
    expect(it.sections.find(({ id }) => id === 'transport').lines).toHaveLength(
      1,
    );
    expect(en.sections.find(({ id }) => id === 'transport').lines).toHaveLength(
      1,
    );
    expect(it.sections.find(({ id }) => id === 'health').pharmacies).toHaveLength(
      1,
    );
    expect(it.sections.find(({ id }) => id === 'health').hospitals).toHaveLength(
      2,
    );
    expect(it.contacts.whatsappUrl).toBe('https://wa.me/393477005683');
    const italianCheckin = it.sections.find(({ id }) => id === 'checkin');
    const englishCheckin = en.sections.find(({ id }) => id === 'checkin');
    expect(italianCheckin.housePhoto).toBe('/img_casa.jpg');
    expect(italianCheckin.housePhotoAlt).toBe(
      'Ingresso della casa al civico 99',
    );
    expect(englishCheckin.housePhoto).toBe('/img_casa.jpg');
    expect(englishCheckin.housePhotoAlt).toBe('House entrance at number 99');
    expect(it.healthLinks.openPharmacies).toBe(
      'https://www.federfarmaroma.com/farmacie_aperte.php',
    );
    expect(it.sections.find(({ id }) => id === 'health').emergencyRooms).toBe(
      'Trova pronto soccorso nel Lazio',
    );
    expect(it.links.review).toBe('');
    expect(it.sections.find(({ id }) => id === 'checkout').reviewPrompt).toContain(
      'HOUSE',
    );
    expect(en.sections.find(({ id }) => id === 'checkout').reviewHouse).toBe(
      'Leave a review on HOUSE',
    );
    expect(it.sections.find(({ id }) => id === 'checkout').closeReview).toBe(
      'Chiudi recensione',
    );
    expect(en.sections.find(({ id }) => id === 'checkout').closeReview).toBe(
      'Close review',
    );
    const atacActions = it.sections
      .find(({ id }) => id === 'transport')
      .contacts.find(({ name }) => name === 'App ATAC Roma').actions;
    expect(atacActions.map(({ store }) => store)).toEqual(['apple', 'google']);
    expect(it.recycling.closeReminder).toBe('Chiudi promemoria');
    expect(en.recycling.reminder).toBe('Enable reminders');
    expect(en.recycling.closeReminder).toBe('Close reminders');
    expect(it.recycling.schedule).toHaveLength(7);
    expect(en.recycling.schedule).toHaveLength(7);
  });
});
