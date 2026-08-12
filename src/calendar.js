const CALENDAR_BASE_URL = 'https://calendar.google.com/calendar/render';

function pad(value) {
  return String(value).padStart(2, '0');
}

function toLocalCalendarDate(date) {
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
    'T',
    pad(date.getHours()),
    pad(date.getMinutes()),
    '00',
  ].join('');
}

function toUtcCalendarDate(date) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

function escapeIcs(value) {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,');
}

export function getNextOccurrence(weekday, now = new Date()) {
  const next = new Date(now);
  const daysUntil = (weekday - now.getDay() + 7) % 7;
  next.setDate(now.getDate() + daysUntil);
  next.setHours(20, 0, 0, 0);

  if (next <= now) next.setDate(next.getDate() + 7);
  return next;
}

export function getReminderEnd(start) {
  const end = new Date(start);
  end.setMonth(end.getMonth() + 4);
  return end;
}

export function buildGoogleCalendarUrl(item, labels, now = new Date()) {
  const start = getNextOccurrence(item.weekday, now);
  const end = new Date(start);
  end.setHours(end.getHours() + 1);
  const until = getReminderEnd(start);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${labels.titlePrefix} · ${item.material}`,
    details: labels.description,
    dates: `${toLocalCalendarDate(start)}/${toLocalCalendarDate(end)}`,
    ctz: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Rome',
    recur: `RRULE:FREQ=WEEKLY;UNTIL=${toUtcCalendarDate(until)}`,
  });

  return `${CALENDAR_BASE_URL}?${params.toString()}`;
}

export function buildIcsCalendar(schedule, labels, now = new Date()) {
  const events = schedule
    .filter((item) => item.collects)
    .map((item) => {
      const start = getNextOccurrence(item.weekday, now);
      const end = new Date(start);
      end.setHours(end.getHours() + 1);
      const until = getReminderEnd(start);
      const uidDate = `${start.getFullYear()}${pad(start.getMonth() + 1)}${pad(start.getDate())}`;

      return [
        'BEGIN:VEVENT',
        `UID:${uidDate}-${item.weekday}@la-mia-casa`,
        `DTSTAMP:${toUtcCalendarDate(now)}`,
        `DTSTART:${toLocalCalendarDate(start)}`,
        `DTEND:${toLocalCalendarDate(end)}`,
        `RRULE:FREQ=WEEKLY;UNTIL=${toUtcCalendarDate(until)}`,
        `SUMMARY:${escapeIcs(`${labels.titlePrefix} · ${item.material}`)}`,
        `DESCRIPTION:${escapeIcs(labels.description)}`,
        'BEGIN:VALARM',
        'ACTION:DISPLAY',
        `DESCRIPTION:${escapeIcs(labels.description)}`,
        'TRIGGER:-P1D',
        'END:VALARM',
        'END:VEVENT',
      ].join('\r\n');
    });

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//La mia Casa//Guest Guide//IT',
    'CALSCALE:GREGORIAN',
    ...events,
    'END:VCALENDAR',
    '',
  ].join('\r\n');
}
