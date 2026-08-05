import { useMemo, useRef, useState } from 'react';
import { getLocalizedContent } from './content';
import GuideGrid from './components/GuideGrid';
import Header from './components/Header';
import Sheet from './components/Sheet';

const LANGUAGE_KEY = 'guest-guide-language';

function readStoredLanguage() {
  try {
    const stored = localStorage.getItem(LANGUAGE_KEY);
    return stored === 'en' ? 'en' : 'it';
  } catch {
    return 'it';
  }
}

export default function App() {
  const [language, setLanguage] = useState(readStoredLanguage);
  const [activeSectionId, setActiveSectionId] = useState(null);
  const returnFocusRef = useRef(null);
  const guide = useMemo(() => getLocalizedContent(language), [language]);
  const activeSection = guide.sections.find(
    (section) => section.id === activeSectionId,
  );

  const changeLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
    document.documentElement.lang = nextLanguage;
    try {
      localStorage.setItem(LANGUAGE_KEY, nextLanguage);
    } catch {
      // The language still changes for this session if storage is unavailable.
    }
  };

  const openSection = (sectionId, trigger) => {
    returnFocusRef.current = trigger;
    setActiveSectionId(sectionId);
  };

  return (
    <div className="app-shell">
      <Header
        brand={guide.brand}
        eyebrow={guide.eyebrow}
        welcome={guide.welcome}
        language={language}
        onLanguageChange={changeLanguage}
      />
      <main className="guide-main">
        <h2>{guide.guidePrompt}</h2>
        <GuideGrid
          sections={guide.sections}
          openSectionLabel={guide.openSection}
          onOpen={openSection}
        />
      </main>

      {activeSection ? (
        <Sheet
          title={activeSection.title}
          description={activeSection.subtitle}
          closeLabel={guide.close}
          onClose={() => setActiveSectionId(null)}
          returnFocusRef={returnFocusRef}
        >
          <p>{activeSection.subtitle}</p>
        </Sheet>
      ) : null}
    </div>
  );
}
