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
    <>
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
    </>
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

function Checkout({ section, guide }) {
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
        <ExternalLink href={guide.links.review} className="action-link secondary">
          {section.review}
        </ExternalLink>
      </div>
    </>
  );
}

function Emergency({ guide }) {
  return (
    <div className="emergency-panel">
      <p>{guide.emergency.intro}</p>
      <dl className="emergency-list">
        <Detail label={guide.emergency.europeanLabel}>
          <strong className="emergency-number">
            {guide.emergency.europeanNumber}
          </strong>
        </Detail>
        <Detail label={guide.emergency.hostLabel}>
          {guide.contacts.phone}
        </Detail>
        <Detail label={guide.emergency.localLabel}>
          {guide.contacts.localEmergencyName}
          <br />
          {guide.contacts.localEmergencyPhone}
        </Detail>
      </dl>
    </div>
  );
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
      return <PlaceList items={section.places} guide={guide} type="food" />;
    case 'transport':
      return <TransportPanel section={section} guide={guide} />;
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
