const glyphs = {
  rules: '⌂',
  health: '✚',
  checkout: '✓',
  close: '×',
  arrow: '↗',
  recycling: '♻',
  emergency: '!',
  copy: '⧉',
  hospital: '+',
};

function SemanticIcon({ name }) {
  const commonProps = {
    'data-icon': name,
    viewBox: '0 0 24 24',
    width: '1em',
    height: '1em',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    focusable: 'false',
  };

  switch (name) {
    case 'checkin':
      return (
        <svg {...commonProps}>
          <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case 'wifi':
      return (
        <svg {...commonProps}>
          <path d="M4.9 9.5a11 11 0 0 1 14.2 0M7.8 13a6.5 6.5 0 0 1 8.4 0M10.7 16.4a2 2 0 0 1 2.6 0" />
          <circle cx="12" cy="19" r=".7" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'groceries':
      return (
        <svg {...commonProps}>
          <path d="M3 4h2l2.3 10.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H6" />
          <circle cx="10" cy="20" r="1" fill="currentColor" stroke="none" />
          <circle cx="18" cy="20" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'transport':
    case 'bus':
      return (
        <svg {...commonProps}>
          <rect x="5" y="3" width="14" height="16" rx="3" />
          <path d="M8 7h8M5 13h14M8 19v2M16 19v2" />
          <circle cx="8.5" cy="16" r=".8" fill="currentColor" stroke="none" />
          <circle cx="15.5" cy="16" r=".8" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'food':
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M15.2 8.5c-.5-.7-1.4-1.1-2.7-1.1-1.7 0-2.8.8-2.8 2 0 3.3 5.8 1.6 5.8 4.9 0 1.3-1.2 2.2-3 2.2-1.4 0-2.5-.5-3.1-1.3M12.5 5.5v13" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...commonProps}>
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 8.5h18C21 15 18 15 18 8ZM9.5 20h5" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Icon({ name, className = '' }) {
  const semanticIcon = SemanticIcon({ name });

  return (
    <span className={`icon ${className}`.trim()} aria-hidden="true">
      {name === 'whatsapp' ? (
        <svg
          viewBox="0 0 24 24"
          width="1em"
          height="1em"
          fill="currentColor"
          focusable="false"
        >
          <path d="M12.04 2a9.84 9.84 0 0 0-8.43 14.92L2 22l5.2-1.56A9.95 9.95 0 1 0 12.04 2Zm0 17.9a8 8 0 0 1-4.08-1.12l-.3-.18-3.08.92.94-3-.2-.3A7.9 7.9 0 1 1 12.04 19.9Zm4.34-5.92c-.24-.12-1.4-.69-1.62-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.19a7.2 7.2 0 0 1-1.34-1.66c-.14-.24-.01-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.4-.58 1.6-1.13.2-.56.2-1.03.14-1.13-.06-.1-.22-.16-.46-.28Z" />
        </svg>
      ) : semanticIcon || (
        glyphs[name] ?? '•'
      )}
    </span>
  );
}
