import { useCallback, useEffect, useRef, useState } from 'react';
import { getLocalizedContent } from './content';
import GuideGrid from './components/GuideGrid';
import Header from './components/Header';
import QuickActions from './components/QuickActions';
import SectionContent from './components/SectionContent';
import Sheet from './components/Sheet';
import Toast from './components/Toast';

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
  const [toast, setToast] = useState('');
  const [copyState, setCopyState] = useState('idle');
  const returnFocusRef = useRef(null);
  const guide = getLocalizedContent(language);
  const activeSection = guide.sections.find(
    (section) => section.id === activeSectionId,
  );
  const activePanel =
    activeSectionId === 'emergency'
      ? {
          id: 'emergency',
          title: guide.emergency.title,
          subtitle: guide.emergency.intro,
        }
      : activeSectionId === 'recycling'
        ? {
            id: 'recycling',
            title: guide.recycling.title,
            subtitle: guide.recycling.intro,
          }
      : activeSection;

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    if (copyState !== 'copied') return undefined;
    const timer = window.setTimeout(() => setCopyState('idle'), 1400);
    return () => window.clearTimeout(timer);
  }, [copyState]);

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

  const closePanel = useCallback(() => setActiveSectionId(null), []);

  const copyPassword = async () => {
    setCopyState('copying');
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(guide.wifi.password);
      } else {
        const input = document.createElement('textarea');
        input.value = guide.wifi.password;
        input.setAttribute('readonly', '');
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.append(input);
        input.select();
        const copied = document.execCommand('copy');
        input.remove();
        if (!copied) throw new Error('Copy command failed');
      }
      setCopyState('copied');
      setToast(guide.passwordCopied);
    } catch {
      setCopyState('error');
      setToast(guide.copyFailed);
    }
  };

  const dismissToast = useCallback(() => setToast(''), []);

  return (
    <div className="app-shell">
      <Header
        brand={guide.brand}
        languageSelectorLabel={guide.languageSelectorLabel}
        language={language}
        onLanguageChange={changeLanguage}
      />
      <main className="guide-main">
        <GuideGrid
          sections={guide.sections}
          openSectionLabel={guide.openSection}
          onOpen={openSection}
        />
      </main>

      <QuickActions
        label={guide.quickActionsLabel}
        labels={guide.quickActions}
        links={{
          whatsapp: guide.contacts.whatsappUrl,
        }}
        onRecycling={(event) => openSection('recycling', event.currentTarget)}
        onEmergency={(event) => openSection('emergency', event.currentTarget)}
      />

      {activePanel ? (
        <Sheet
          title={activePanel.title}
          description={activePanel.subtitle}
          closeLabel={guide.close}
          onClose={closePanel}
          returnFocusRef={returnFocusRef}
        >
          <SectionContent
            section={activePanel}
            guide={guide}
            onCopy={copyPassword}
            copyState={copyState}
            onCalendarError={setToast}
          />
        </Sheet>
      ) : null}
      {toast ? <Toast message={toast} onDismiss={dismissToast} /> : null}
    </div>
  );
}
