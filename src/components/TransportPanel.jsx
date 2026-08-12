import Icon from './Icon';

function ExternalLink({ href, children, className = 'text-link' }) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      <span>{children}</span>
      <Icon name="arrow" />
    </a>
  );
}

export default function TransportPanel({ section, guide, children }) {
  return (
    <>
      <div className="bus-lines">
        {section.lines.map((line) => (
          <article
            className="bus-line"
            data-testid="bus-line"
            key={line.name}
            style={{ '--line-color': line.color }}
          >
            <header className="bus-line__header">
              <span className="bus-line__badge">
                <Icon name="bus" />
                {line.name}
              </span>
            </header>
            <dl className="bus-line__details">
              <div>
                <dt>{section.stopLabel}</dt>
                <dd>{line.stop}</dd>
              </div>
              <div>
                <dt>{section.directionLabel}</dt>
                <dd>{line.direction}</dd>
              </div>
              <div>
                <dt>{section.frequencyLabel}</dt>
                <dd>{line.frequency}</dd>
              </div>
            </dl>
            <ol className="route-strip">
              {line.stops.map((stop, index) => (
                <li key={stop} aria-current={index === 0 ? 'location' : undefined}>
                  <span className="route-stop__dot" aria-hidden="true" />
                  <span>{stop}</span>
                </li>
              ))}
            </ol>
            <div className="bus-line__actions">
              <ExternalLink href={line.moovit}>{section.moovit}</ExternalLink>
              <ExternalLink href={line.map}>{guide.maps}</ExternalLink>
            </div>
          </article>
        ))}
      </div>
      {children}
    </>
  );
}
