import { useState } from 'react';
import Icon from './Icon';
import CheckinPhoto from './CheckinPhoto';
import HealthPanel from './HealthPanel';
import RecyclingPanel from './RecyclingPanel';
import TransportPanel from './TransportPanel';
import WifiPanel from './WifiPanel';

function ExternalLink({ href, children, className = 'action-link' }) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>{children}</span>
      <Icon name="arrow" />
    </a>
  );
}

function Detail({ label, children }) {
  return (
    <div className="detail">
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function Arrival({ section, guide }) {
  return (
    <div className="arrival-panel">
      <dl className="details-list">
        <Detail label={section.addressLabel}>{section.address}</Detail>
        <Detail label={section.checkInLabel}>{section.checkIn}</Detail>
      </dl>
      <CheckinPhoto
        src={section.housePhoto}
        alt={section.housePhotoAlt}
        fallback={section.housePhotoFallback}
      />
      <dl className="details-list">
        <Detail label={section.instructionsLabel}>
          {section.instructions}
        </Detail>
      </dl>
      <ExternalLink href={guide.links.propertyMap}>{guide.maps}</ExternalLink>
    </div>
  );
}

function Home({ section }) {
  return (
    <ul className="info-list">
      {section.items.map((item, index) => (
        <li key={item.title}>
          <span className="info-list__number" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function PlaceList({ items, guide, type }) {
  return (
    <ul className="place-list">
      {items.slice(0, 6).map((item) => (
        <li className="place-card" key={item.name}>
          <div className="place-card__topline">
            <h3>{item.name}</h3>
            <span className="distance">
              {type === 'food' ? item.category : item.distance}
            </span>
          </div>
          <p>{type === 'food' ? item.tip : item.description}</p>
          <ExternalLink href={item.map} className="text-link">
            {guide.maps}
          </ExternalLink>
        </li>
      ))}
    </ul>
  );
}

function StoreBadge({ action }) {
  const storeName = action.store === 'apple' ? 'App Store' : 'Google Play';
  const overline = action.label.replace(storeName, '').trim();

  return (
    <a
      className={`store-badge store-badge--${action.store}`}
      href={action.href}
      aria-label={action.label}
      target="_blank"
      rel="noopener noreferrer"
    >
      {action.store === 'apple' ? (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M16.7 12.8c0-2 1.7-3 1.8-3.1a4 4 0 0 0-3.1-1.7c-1.3-.1-2.6.8-3.3.8-.7 0-1.7-.8-2.8-.8a4.2 4.2 0 0 0-3.5 2.2c-1.5 2.6-.4 6.4 1.1 8.5.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.9-.7 1.3 0 1.7.7 2.8.7 1.2 0 1.9-1 2.6-2.1.8-1.2 1.2-2.4 1.2-2.5-.1 0-2.4-.9-2.4-3.4ZM14.5 6.6c.6-.8 1-1.8.9-2.8-.9 0-2 .6-2.6 1.3-.6.6-1 1.7-.9 2.7 1 .1 2-.5 2.6-1.2Z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="m4.5 3.7 10.8 8.2L4.5 20.3a2 2 0 0 1-.5-1.4V5.1c0-.5.2-1 .5-1.4Z" />
          <path d="m15.3 11.9 3-2.3c.8.6 1.3 1 1.3 1.1.8.6.8 1.7 0 2.3l-1.4 1.1-2.9-2.2ZM5.5 3.1l11.6 5.8-1.8 3L4.5 3.7c.3-.3.7-.5 1-.6ZM5.5 20.9l11.6-5.8-1.8-3-10.8 8.2c.3.3.7.5 1 .6Z" opacity=".82" />
        </svg>
      )}
      <span>
        <small>{overline}</small>
        <strong>{storeName}</strong>
      </span>
    </a>
  );
}

function UsefulNumbersPanel({ items }) {
  return (
    <ul className="place-list useful-list">
      {items.map((item) => {
        const hasStoreBadges = item.actions.some((action) => action.store);

        return (
        <li
          className={`place-card useful-card${hasStoreBadges ? ' has-store-badges' : ''}`}
          key={item.name}
        >
          <div className="place-card__topline">
            <h3>{item.name}</h3>
            <span className="distance">{item.badge}</span>
          </div>
          <p>{item.description}</p>
          {item.hours && (
            <ul className="useful-hours">
              {item.hours.map((hours) => (
                <li key={hours}>{hours}</li>
              ))}
            </ul>
          )}
          <div className={`useful-actions${hasStoreBadges ? ' store-badges' : ''}`}>
            {item.actions.map((action) => (
              action.store ? (
                <StoreBadge action={action} key={action.href} />
              ) : (
                <a
                  className="text-link"
                  href={action.href}
                  key={action.href}
                  {...(action.href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {action.label}
                  <Icon name="arrow" />
                </a>
              )
            ))}
          </div>
        </li>
        );
      })}
    </ul>
  );
}

function Checkout({ section, guide }) {
  const [showReview, setShowReview] = useState(false);

  return (
    <>
      <dl className="details-list details-list--compact">
        <Detail label={section.timeLabel}>{section.time}</Detail>
      </dl>
      <h3 className="subheading">{section.tasksLabel}</h3>
      <ul className="check-list">
        {section.tasks.map((task) => (
          <li key={task}>
            <Icon name="checkout" />
            <span>{task}</span>
          </li>
        ))}
      </ul>
      <div className="action-stack">
        <ExternalLink href={guide.contacts.whatsappUrl}>
          {section.contactHost}
        </ExternalLink>
        <button
          className="action-link secondary"
          type="button"
          aria-expanded={showReview}
          aria-controls="checkout-review-panel"
          onClick={() => setShowReview(true)}
        >
          {section.review}
        </button>
      </div>
      {showReview ? (
        <div className="review-panel" id="checkout-review-panel">
          <button
            className="review-panel__close"
            type="button"
            aria-label={section.closeReview}
            onClick={() => setShowReview(false)}
          >
            <Icon name="close" />
          </button>
          <p>{section.reviewPrompt}</p>
          {guide.links.review ? (
            <ExternalLink href={guide.links.review} className="action-link">
              {section.reviewHouse}
            </ExternalLink>
          ) : (
            <button className="action-link" type="button" disabled>
              {section.reviewHouse}
            </button>
          )}
        </div>
      ) : null}
    </>
  );
}

function Emergency({ guide }) {
  return <UsefulNumbersPanel items={guide.emergency.contacts} />;
}

export default function SectionContent({
  section,
  guide,
  onCopy,
  copyState,
  onCalendarError,
}) {
  switch (section.id) {
    case 'checkin':
      return <Arrival section={section} guide={guide} />;
    case 'wifi':
      return (
        <WifiPanel
          section={section}
          guide={guide}
          copyState={copyState}
          onCopy={onCopy}
        />
      );
    case 'rules':
      return <Home section={section} />;
    case 'food':
      return <UsefulNumbersPanel items={section.contacts} />;
    case 'transport':
      return (
        <TransportPanel section={section} guide={guide}>
          <UsefulNumbersPanel items={section.contacts} />
        </TransportPanel>
      );
    case 'groceries':
      return <PlaceList items={section.items} guide={guide} type="nearby" />;
    case 'health':
      return <HealthPanel section={section} guide={guide} />;
    case 'checkout':
      return <Checkout section={section} guide={guide} />;
    case 'emergency':
      return <Emergency guide={guide} />;
    case 'recycling':
      return (
        <RecyclingPanel
          recycling={guide.recycling}
          onCalendarError={onCalendarError}
        />
      );
    default:
      return null;
  }
}
