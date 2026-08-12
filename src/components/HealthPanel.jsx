import { useState } from 'react';
import Icon from './Icon';

function ExternalLink({ href, children, className = 'text-link' }) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      <span>{children}</span>
      <Icon name="arrow" />
    </a>
  );
}

function HealthCard({ item, section, guide, type }) {
  return (
    <li
      className="health-card"
      data-testid={type === 'pharmacies' ? 'pharmacy-card' : 'hospital-card'}
    >
      <div className="place-card__topline">
        <h3>{item.name}</h3>
        <span className="distance">{item.distance}</span>
      </div>
      <p>{item.description}</p>
      {item.phone ? (
        <p className="health-card__phone">
          <strong>{section.phoneLabel}:</strong> {item.phone}
        </p>
      ) : null}
      <ExternalLink href={item.map}>{guide.maps}</ExternalLink>
    </li>
  );
}

export default function HealthPanel({ section, guide }) {
  const [activeTab, setActiveTab] = useState('pharmacies');
  const isPharmacies = activeTab === 'pharmacies';
  const items = isPharmacies ? section.pharmacies : section.hospitals;

  return (
    <div className="health-panel">
      <div
        className="segmented-control"
        role="group"
        aria-label={section.tabsLabel}
      >
        <button
          type="button"
          aria-pressed={isPharmacies}
          onClick={() => setActiveTab('pharmacies')}
        >
          {section.pharmaciesTab}
        </button>
        <button
          type="button"
          aria-pressed={!isPharmacies}
          onClick={() => setActiveTab('hospitals')}
        >
          {section.hospitalsTab}
        </button>
      </div>
      <ul className="health-list">
        {items.map((item) => (
          <HealthCard
            key={item.name}
            item={item}
            section={section}
            guide={guide}
            type={activeTab}
          />
        ))}
      </ul>
      {isPharmacies ? (
        <ExternalLink href={guide.healthLinks.openPharmacies} className="action-link">
          {section.openPharmacies}
        </ExternalLink>
      ) : (
        <>
          <ExternalLink href={guide.healthLinks.emergencyRooms} className="action-link">
            {section.emergencyRooms}
          </ExternalLink>
          <p className="health-emergency-note">{section.emergencyNote}</p>
        </>
      )}
    </div>
  );
}
