export default function Header({
  brand,
  eyebrow,
  welcome,
  language,
  onLanguageChange,
}) {
  return (
    <header className="hero">
      <div className="language-switch" aria-label="Language · Lingua">
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
      <p className="eyebrow">{eyebrow}</p>
      <h1>{brand.name}</h1>
      <p className="location">{brand.location}</p>
      <p className="welcome">{welcome}</p>
    </header>
  );
}
