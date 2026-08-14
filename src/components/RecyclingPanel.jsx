import { useState } from 'react';
import { buildGoogleCalendarUrl, buildIcsCalendar } from '../calendar';
import Icon from './Icon';

function BinIcon({ kind }) {
  return (
    <svg
      className={`bin-icon bin-icon--${kind}`}
      data-testid="bin-icon"
      viewBox="0 0 36 44"
      aria-hidden="true"
    >
      <path d="M10 12h16l-1.5 27h-13z" fill="currentColor" />
      <path d="M7 8h22v5H7zM14 3h8l2 5H12z" fill="currentColor" />
      <path d="M16 17v16M21 17l-1 16" fill="none" stroke="white" strokeWidth="1.5" opacity=".8" />
    </svg>
  );
}

function RecyclingNotice({ text }) {
  const match = text.match(/^(.*?)(il\s+|le\s+)?(vetro|glass|verre)(.*)$/i);

  if (!match) return text;

  return (
    <>
      {match[1]}
      {match[2]}
      <strong className="glass-warning">{match[3]}</strong>
      {match[4]}
    </>
  );
}

export default function RecyclingPanel({ recycling, onCalendarError }) {
  const [showChoices, setShowChoices] = useState(false);
  const [showGoogle, setShowGoogle] = useState(false);
  const collectedItems = recycling.schedule.filter((item) => item.collects);
  const labels = {
    titlePrefix: recycling.calendarTitlePrefix,
    description: recycling.calendarDescription,
  };

  const toggleChoices = () => {
    if (showChoices) setShowGoogle(false);
    setShowChoices(!showChoices);
  };

  const downloadAppleCalendar = () => {
    try {
      const calendar = buildIcsCalendar(recycling.schedule, labels);
      const blob = new Blob([calendar], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'la-mia-casa-raccolta.ics';
      document.body.append(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch {
      onCalendarError(recycling.calendarError);
    }
  };

  return (
    <div className="recycling-panel">
      <button
        className="primary-button recycling-reminder"
        type="button"
        aria-expanded={showChoices}
        aria-controls="recycling-reminder-options"
        onClick={toggleChoices}
      >
        <Icon name={showChoices ? 'close' : 'calendar'} />
        {showChoices ? recycling.closeReminder : recycling.reminder}
      </button>
      {showChoices ? (
        <div className="reminder-panel" id="recycling-reminder-options">
          <p>{recycling.reminderIntro}</p>
          <div className="reminder-actions">
            <button type="button" onClick={downloadAppleCalendar}>
              {recycling.apple}
            </button>
            <button type="button" onClick={() => setShowGoogle(true)}>
              {recycling.google}
            </button>
          </div>
          {showGoogle ? (
            <ul className="google-reminders">
              {collectedItems.map((item) => (
                <li key={`${item.weekday}-${item.material}`}>
                  <span>{item.day} · {item.material}</span>
                  <a
                    href={buildGoogleCalendarUrl(item, labels)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {recycling.addToGoogle} {item.material}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
      <ul className="recycling-list">
        {recycling.schedule.map((item) => (
          <li className="recycling-row" data-testid="recycling-day" key={item.day}>
            <div>
              <strong>{item.day}</strong>
              <span>{item.material}</span>
            </div>
            <BinIcon kind={item.kind} />
          </li>
        ))}
      </ul>
      <p className="recycling-demo-note">
        <RecyclingNotice text={recycling.demoNote} />
      </p>
    </div>
  );
}
