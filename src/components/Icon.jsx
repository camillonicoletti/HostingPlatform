const glyphs = {
  checkin: '⌖',
  wifi: '⌁',
  rules: '⌂',
  food: '◇',
  transport: '⇄',
  health: '✚',
  groceries: '▤',
  checkout: '✓',
  close: '×',
  arrow: '↗',
  whatsapp: '◌',
  recycling: '♻',
  emergency: '!',
  copy: '⧉',
  bus: '▰',
  hospital: '+',
  calendar: '□',
};

export default function Icon({ name, className = '' }) {
  return (
    <span className={`icon ${className}`.trim()} aria-hidden="true">
      {glyphs[name] ?? '•'}
    </span>
  );
}
