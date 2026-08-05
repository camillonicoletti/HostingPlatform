import Icon from './Icon';

export default function GuideGrid({ sections, openSectionLabel, onOpen }) {
  return (
    <div className="guide-grid">
      {sections.map((section) => (
        <button
          className={`guide-card guide-card--${section.id}`}
          type="button"
          key={section.id}
          data-section-id={section.id}
          aria-label={`${section.title}. ${section.subtitle}. ${openSectionLabel}`}
          onClick={(event) => onOpen(section.id, event.currentTarget)}
        >
          <Icon name={section.id} className="guide-card__icon" />
          <span className="guide-card__copy">
            <strong>{section.title}</strong>
            <small>{section.subtitle}</small>
          </span>
          <Icon name="arrow" className="guide-card__arrow" />
        </button>
      ))}
    </div>
  );
}
