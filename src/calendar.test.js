import { describe, expect, test } from 'vitest';
import {
  buildGoogleCalendarUrl,
  buildIcsCalendar,
  getNextOccurrence,
  getReminderEnd,
} from './calendar';

const labels = {
  titlePrefix: 'Raccolta',
  description: 'Promemoria raccolta differenziata.',
};

const schedule = [
  { weekday: 1, day: 'Lunedì', material: 'Organico', collects: true },
  { weekday: 2, day: 'Martedì', material: 'Carta', collects: true },
  { weekday: 3, day: 'Mercoledì', material: 'Plastica', collects: true },
  { weekday: 4, day: 'Giovedì', material: 'Organico', collects: true },
  { weekday: 5, day: 'Venerdì', material: 'Vetro', collects: true },
  { weekday: 6, day: 'Sabato', material: 'Indifferenziato', collects: true },
  { weekday: 0, day: 'Domenica', material: 'Nessun ritiro', collects: false },
];

describe('recycling calendar', () => {
  test('uses the next week when collection time has already passed today', () => {
    const now = new Date(2026, 7, 10, 21, 0);

    expect(getNextOccurrence(1, now)).toEqual(new Date(2026, 7, 17, 20, 0));
  });

  test('ends reminders four calendar months after the first collection', () => {
    expect(getReminderEnd(new Date(2026, 7, 17, 20, 0))).toEqual(
      new Date(2026, 11, 17, 20, 0),
    );
  });

  test('builds a prefilled weekly Google Calendar series', () => {
    const url = new URL(
      buildGoogleCalendarUrl(schedule[0], labels, new Date(2026, 7, 10, 10)),
    );

    expect(url.origin).toBe('https://calendar.google.com');
    expect(url.searchParams.get('action')).toBe('TEMPLATE');
    expect(url.searchParams.get('text')).toBe('Raccolta · Organico');
    expect(url.searchParams.get('recur')).toMatch(
      /^RRULE:FREQ=WEEKLY;UNTIL=\d{8}T\d{6}Z$/,
    );
  });

  test('serializes six weekly events with a previous-day alert', () => {
    const ics = buildIcsCalendar(
      schedule,
      labels,
      new Date(2026, 7, 10, 10),
    );

    expect(ics).toContain('BEGIN:VCALENDAR\r\nVERSION:2.0');
    expect(ics.match(/BEGIN:VEVENT/g)).toHaveLength(6);
    expect(ics).toContain('RRULE:FREQ=WEEKLY;UNTIL=');
    expect(ics).toContain('TRIGGER:-P1D');
    expect(ics).not.toContain('Nessun ritiro');
  });
});
