import Icon from './Icon';

function QuickLink({ href, icon, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Icon name={icon} />
      <span>{children}</span>
    </a>
  );
}

export default function QuickActions({ labels, links, label, onEmergency }) {
  return (
    <nav className="quick-actions" aria-label={label}>
      <QuickLink href={links.whatsapp} icon="whatsapp">
        {labels.whatsapp}
      </QuickLink>
      <QuickLink href={links.location} icon="location">
        {labels.location}
      </QuickLink>
      <button type="button" onClick={onEmergency}>
        <Icon name="emergency" />
        <span>{labels.emergency}</span>
      </button>
    </nav>
  );
}
