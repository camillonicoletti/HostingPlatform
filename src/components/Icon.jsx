const glyphs = {
  arrival: '⌖',
  wifi: '⌁',
  home: '⌂',
  food: '◇',
  explore: '☼',
  checkout: '✓',
  close: '×',
  arrow: '↗',
  whatsapp: '◌',
  location: '⌖',
  emergency: '!',
  copy: '⧉',
};

export default function Icon({ name, className = '' }) {
  return (
    <span className={`icon ${className}`.trim()} aria-hidden="true">
      {glyphs[name] ?? '•'}
    </span>
  );
}
