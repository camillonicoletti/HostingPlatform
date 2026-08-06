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
      'pharmacies',
      'groceries',
      'checkout',
    ]);
    expect(en?.sections.map((section) => section.id)).toEqual([
      'checkin',
      'wifi',
      'rules',
      'food',
      'transport',
      'pharmacies',
      'groceries',
      'checkout',
    ]);
    expect(it?.welcome).not.toBe(en?.welcome);
  });
});
