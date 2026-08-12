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
      'food',
      'transport',
      'health',
      'groceries',
      'checkout',
    ]);
    expect(en?.sections.map((section) => section.id)).toEqual([
      'checkin',
      'wifi',
      'rules',
      'food',
      'transport',
      'health',
      'groceries',
      'checkout',
    ]);
    expect(it?.welcome).not.toBe(en?.welcome);
    expect(it.sections.find(({ id }) => id === 'food').title).toBe(
      'Dove mangiare nei dintorni',
    );
    expect(en.sections.find(({ id }) => id === 'food').title).toBe(
      'Where to eat nearby',
    );
    expect(it.sections.find(({ id }) => id === 'transport').lines).toHaveLength(
      2,
    );
    expect(en.sections.find(({ id }) => id === 'transport').lines).toHaveLength(
      2,
    );
    expect(it.sections.find(({ id }) => id === 'health').pharmacies).toHaveLength(
      3,
    );
    expect(it.sections.find(({ id }) => id === 'health').hospitals).toHaveLength(
      2,
    );
    expect(it.contacts.whatsappUrl).toBe('https://wa.me/393477005683');
    expect(it.healthLinks.openPharmacies).toBe(
      'https://www.federfarmaroma.com/farmacie_aperte.php',
    );
    expect(it.sections.find(({ id }) => id === 'health').emergencyRooms).toBe(
      'Trova pronto soccorso nel Lazio',
    );
    expect(it.recycling.schedule).toHaveLength(7);
    expect(en.recycling.schedule).toHaveLength(7);
  });
});
