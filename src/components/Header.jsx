export default function Header({
  brand,
  languageSelectorLabel,
  language,
  onLanguageChange,
}) {
  return (
    <header className="hero">
      <div
        className="language-switch"
        role="group"
        aria-label={languageSelectorLabel}
      >
        <button
          type="button"
          aria-label="Italiano"
          aria-pressed={language === 'it'}
          onClick={() => onLanguageChange('it')}
        >
          IT
        </button>
        <button
          type="button"
          aria-label="English"
          aria-pressed={language === 'en'}
          onClick={() => onLanguageChange('en')}
        >
          EN
        </button>
      </div>
      <h1>{brand.name}</h1>
    </header>
  );
}
