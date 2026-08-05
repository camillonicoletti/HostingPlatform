import { describe, expect, test } from 'vitest';
import { getLocalizedContent } from './content';

describe('guest guide content', () => {
  test('returns complete, distinct Italian and English content', () => {
    const it = getLocalizedContent('it');
    const en = getLocalizedContent('en');

    expect(it?.sections.map((section) => section.id)).toEqual([
      'arrival',
      'wifi',
      'home',
      'food',
      'explore',
      'checkout',
    ]);
    expect(en?.sections.map((section) => section.id)).toEqual([
      'arrival',
      'wifi',
      'home',
      'food',
      'explore',
      'checkout',
    ]);
    expect(it?.welcome).not.toBe(en?.welcome);
  });
});
