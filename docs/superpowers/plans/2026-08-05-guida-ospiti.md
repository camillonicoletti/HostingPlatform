# Mini-guida ospiti Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Creare una mini-guida React statica, bilingue, mobile-first e accessibile per gli ospiti di una casa vacanze.

**Architecture:** Una singola applicazione React legge tutti i contenuti da `src/content.js`. `App` mantiene solo lingua e scheda attiva; componenti focalizzati rendono home, dialogo, contenuti e azioni rapide. Vite produce la cartella statica `dist`, mentre Vitest e Testing Library verificano i comportamenti osservabili.

**Tech Stack:** React, Vite, Vitest, Testing Library, CSS nativo, localStorage e Clipboard API.

## Global Constraints

- Ottimizzare prima per schermi da 360–430 px, senza scorrimento orizzontale.
- Tutti i contenuti devono esistere in italiano e inglese e risiedere in `src/content.js`.
- Contrassegnare i dati dimostrativi configurabili con `[DA PERSONALIZZARE]`.
- Non inserire codici di serrature, casseforti, allarmi o altre informazioni sensibili.
- Usare al massimo due caratteri tipografici e nessun servizio esterno salvo link a Maps, WhatsApp e recensioni.
- Garantire controlli di almeno 44 × 44 px, navigazione da tastiera, focus visibile e supporto a `prefers-reduced-motion`.

---

### Task 1: Fondazione React e contratto dei contenuti

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/content.js`
- Test: `src/content.test.js`

**Interfaces:**
- Produces: `content` con chiavi `brand`, `contacts`, `links`, `wifi`, `locale.it`, `locale.en`; `getLocalizedContent(language)` restituisce `{...content.locale[language], brand, contacts, links, wifi}`.
- Consumes: nessuna interfaccia applicativa precedente.

- [ ] **Step 1: Creare configurazione Vite/Vitest e il modulo vuoto `src/content.js`**

```js
export const content = {};
export function getLocalizedContent(language) {
  return content.locale?.[language];
}
```

- [ ] **Step 2: Scrivere il test fallimentare del contratto bilingue**

```js
test('returns complete, distinct Italian and English content', () => {
  const it = getLocalizedContent('it');
  const en = getLocalizedContent('en');
  expect(it.sections.map((section) => section.id)).toEqual([
    'arrival', 'wifi', 'home', 'food', 'explore', 'checkout'
  ]);
  expect(en.sections.map((section) => section.id)).toEqual([
    'arrival', 'wifi', 'home', 'food', 'explore', 'checkout'
  ]);
  expect(it.welcome).not.toBe(en.welcome);
});
```

- [ ] **Step 3: Eseguire il test e confermare il fallimento sui contenuti mancanti**

Run: `npm test -- --run src/content.test.js`
Expected: FAIL perché `sections` non esiste.

- [ ] **Step 4: Compilare `content` con identità, contatti, sei sezioni, locali, attrazioni e link bilingui**

```js
export function getLocalizedContent(language) {
  const selected = content.locale[language] ?? content.locale.it;
  return {
    ...selected,
    brand: content.brand,
    contacts: content.contacts,
    links: content.links,
    wifi: content.wifi,
  };
}
```

- [ ] **Step 5: Eseguire il test e confermare il passaggio**

Run: `npm test -- --run src/content.test.js`
Expected: PASS, 1 test.

### Task 2: Navigazione, lingua e dialogo accessibile

**Files:**
- Create: `src/App.jsx`, `src/components/Header.jsx`, `src/components/GuideGrid.jsx`, `src/components/Sheet.jsx`, `src/components/Icon.jsx`, `src/setupTests.js`
- Modify: `src/main.jsx`
- Test: `src/App.test.jsx`

**Interfaces:**
- Consumes: `getLocalizedContent(language)` da `src/content.js`.
- Produces: `App`; `Sheet({ title, children, onClose, returnFocusRef })`; pulsanti sezione con `data-section-id`.

- [ ] **Step 1: Creare uno stub `App` privo di interazioni e scrivere test fallimentari per lingua persistente e apertura/chiusura schede**

```jsx
export default function App() {
  return <main>Guest guide</main>;
}

beforeEach(() => localStorage.clear());

test('switches to English immediately and persists the choice', async () => {
  render(<App />);
  await userEvent.click(screen.getByRole('button', { name: 'English' }));
  expect(screen.getByRole('button', { name: 'Arrival' })).toBeVisible();
  expect(localStorage.getItem('guest-guide-language')).toBe('en');
});

test.each(['Arrivo', 'Wi-Fi', 'La casa', 'Dove mangiare', 'Cosa vedere', 'Check-out'])(
  'opens and closes the %s sheet', async (label) => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: new RegExp(label) }));
    expect(screen.getByRole('dialog')).toBeVisible();
    await userEvent.click(screen.getByRole('button', { name: 'Chiudi' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  }
);
```

- [ ] **Step 2: Eseguire i test e confermare il fallimento perché lo stub non offre lingua o schede**

Run: `npm test -- --run src/App.test.jsx`
Expected: FAIL perché il pulsante `English` non è presente.

- [ ] **Step 3: Implementare home, selettore lingua, griglia e dialogo**

```jsx
const [language, setLanguage] = useState(
  () => localStorage.getItem('guest-guide-language') || 'it'
);
const changeLanguage = (nextLanguage) => {
  setLanguage(nextLanguage);
  localStorage.setItem('guest-guide-language', nextLanguage);
};
```

`Sheet` deve usare `role="dialog"`, `aria-modal="true"`, chiudersi con Escape e overlay, bloccare lo scroll e ripristinare il focus sul pulsante di origine.

- [ ] **Step 4: Eseguire i test e confermare il passaggio**

Run: `npm test -- --run src/App.test.jsx`
Expected: PASS per lingua e tutte le sei schede.

### Task 3: Contenuti delle schede e azioni rapide

**Files:**
- Create: `src/components/SectionContent.jsx`, `src/components/QuickActions.jsx`, `src/components/Toast.jsx`
- Modify: `src/App.jsx`, `src/App.test.jsx`

**Interfaces:**
- Consumes: `activeSection`, dati localizzati, `content.wifi`, `content.contacts`, `content.links`.
- Produces: `SectionContent({ section, data, onCopy })`; `QuickActions({ labels, links, onEmergency })`; stato toast con `role="status"`.

- [ ] **Step 1: Aggiungere test fallimentari per copia Wi-Fi, emergenze e link**

```jsx
test('copies the Wi-Fi password and announces success', async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.assign(navigator, { clipboard: { writeText } });
  render(<App />);
  await userEvent.click(screen.getByRole('button', { name: /Wi-Fi/ }));
  await userEvent.click(screen.getByRole('button', { name: 'Copia password' }));
  expect(await screen.findByRole('status')).toHaveTextContent('Password copiata');
});

test('shows emergency numbers without starting a call', async () => {
  render(<App />);
  await userEvent.click(screen.getByRole('button', { name: 'Emergenze' }));
  expect(screen.getByRole('dialog')).toHaveTextContent('112');
  expect(screen.queryByRole('link', { name: /112/ })).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Eseguire i test e confermare il fallimento per azioni mancanti**

Run: `npm test -- --run src/App.test.jsx`
Expected: FAIL perché i pulsanti di copia ed emergenze non sono presenti.

- [ ] **Step 3: Implementare i sei layout contenuto, copia con fallback, toast e barra inferiore**

```js
async function copyPassword(password) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(password);
    return;
  }
  const input = document.createElement('textarea');
  input.value = password;
  document.body.append(input);
  input.select();
  document.execCommand('copy');
  input.remove();
}
```

Gli elenchi devono rispettare i limiti: cinque informazioni casa, sei locali e sei attrazioni. I collegamenti esterni devono usare `target="_blank"` e `rel="noreferrer"`.

- [ ] **Step 4: Eseguire l'intera suite e confermare il passaggio**

Run: `npm test -- --run`
Expected: PASS per contenuti, lingua, schede, copia ed emergenze.

### Task 4: Design responsive, accessibilità e documentazione

**Files:**
- Create: `src/styles.css`, `README.md`
- Modify: `src/main.jsx`, `index.html`
- Test: `src/App.test.jsx`

**Interfaces:**
- Consumes: classi e struttura semantica prodotte dai componenti React.
- Produces: layout mobile-first, token CSS modificabili in `:root`, regole `prefers-reduced-motion`, istruzioni operative complete.

- [ ] **Step 1: Aggiungere il test fallimentare per Escape e ripristino del focus**

```jsx
test('closes with Escape and restores focus to the originating card', async () => {
  render(<App />);
  const arrival = screen.getByRole('button', { name: /Arrivo/ });
  await userEvent.click(arrival);
  await userEvent.keyboard('{Escape}');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(arrival).toHaveFocus();
});
```

- [ ] **Step 2: Eseguire il test e confermare il fallimento se focus o Escape non sono completi**

Run: `npm test -- --run src/App.test.jsx -t "closes with Escape"`
Expected: FAIL finché il focus non torna al pulsante originario.

- [ ] **Step 3: Completare focus management, CSS e README**

Definire in `:root` `--ivory`, `--terracotta`, `--olive`, `--night`, raggiungere 44 px minimi, aggiungere breakpoint per tablet/desktop, safe-area della barra inferiore e disattivare transizioni con `@media (prefers-reduced-motion: reduce)`. Il README deve indicare `src/content.js`, i token colore, `npm run dev`, `npm run build`, pubblicazione di `dist` e generazione QR dall'URL pubblico.

- [ ] **Step 4: Eseguire test e build di produzione**

Run: `npm test -- --run && npm run build`
Expected: tutti i test PASS e build conclusa con exit code 0.

- [ ] **Step 5: Avviare il server e verificare nel browser**

Run: `npm run dev -- --host 127.0.0.1`
Expected: home significativa senza overlay di errore; tutte le schede si aprono e chiudono; cambio IT/EN immediato; copia confermata; emergenze mostrano 112 senza chiamata; nessun overflow a 360, 390 e 430 px; layout leggibile a 1280 px.
