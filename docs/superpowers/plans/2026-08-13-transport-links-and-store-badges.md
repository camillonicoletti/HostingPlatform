# Transport Links and Store Badges Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Avvicinare le frecce ai testi dei collegamenti Trasporti e sostituire il singolo download ATAC con badge App Store e Google Play separati.

**Architecture:** I dati dei due store vivono nelle azioni localizzate di `content.js` tramite un campo `store`. `UsefulNumbersPanel` riconosce le azioni store e le rende con un nuovo componente presentazionale `StoreBadge`; gli altri link mantengono il markup corrente e ricevono soltanto regole CSS circoscritte a `.transport-panel`.

**Tech Stack:** React 18, Vite, Vitest, Testing Library, CSS responsive, SVG inline.

## Global Constraints

- Lavorare direttamente su `main` nel worktree principale.
- Non aggiungere dipendenze o file immagine.
- Usare i due URL esatti forniti dall'utente.
- Badge accessibili, indipendenti e aperti in nuova scheda con `noopener noreferrer`.
- Nessuna freccia aggiuntiva nei badge store.
- Nessun overflow orizzontale o aumento dello scorrimento a 320 px e 430 px.

---

### Task 1: Dati e comportamento dei badge store

**Files:**
- Modify: `src/App.test.jsx`
- Modify: `src/content.test.js`
- Modify: `src/content.js`
- Modify: `src/components/SectionContent.jsx`

**Interfaces:**
- Consumes: `action.store` con valore `apple` oppure `google`, `action.label`, `action.href`.
- Produces: `StoreBadge({ action })`, un link esterno con classe `store-badge store-badge--${action.store}` e SVG del relativo store.

- [ ] **Step 1: Scrivere i test fallenti**

In `src/App.test.jsx`, aprire Trasporti e verificare che i due link abbiano nomi e URL letterali, che contengano `.store-badge` e che non contengano `.guide-card__arrow` o il glifo freccia. In `src/content.test.js`, verificare `store: 'apple'` e `store: 'google'` nelle azioni della scheda App ATAC.

```jsx
const apple = screen.getByRole('link', { name: 'Scarica su App Store' });
const google = screen.getByRole('link', { name: 'Scarica su Google Play' });
expect(apple).toHaveAttribute('href', 'https://apps.apple.com/it/app/atac-roma/id1544302659');
expect(google).toHaveAttribute('href', 'https://play.google.com/store/apps/details?id=it.roma.atac.mobile&pcampaignid=web_share');
expect(apple).toHaveClass('store-badge');
expect(google).toHaveClass('store-badge');
expect(apple).not.toHaveTextContent('↗');
expect(google).not.toHaveTextContent('↗');
```

- [ ] **Step 2: Verificare il fallimento**

Run: `npm test -- --run src/App.test.jsx src/content.test.js -t "store badge|complete, distinct"`

Expected: FAIL perché esiste ancora soltanto “Scarica App ATAC Roma”.

- [ ] **Step 3: Implementare dati e componente**

Sostituire l'azione unica App ATAC in italiano e inglese con:

```js
{ label: 'Scarica su App Store', href: 'https://apps.apple.com/it/app/atac-roma/id1544302659', store: 'apple' },
{ label: 'Scarica su Google Play', href: 'https://play.google.com/store/apps/details?id=it.roma.atac.mobile&pcampaignid=web_share', store: 'google' },
```

Usare le label inglesi `Download on the App Store` e `Get it on Google Play`. In `SectionContent.jsx`, aggiungere `StoreBadge` fuori dagli altri componenti e renderizzarlo in `UsefulNumbersPanel` quando `action.store` è valorizzato; altrimenti conservare il link testuale esistente.

- [ ] **Step 4: Verificare i test verdi**

Run: `npm test -- --run src/App.test.jsx src/content.test.js -t "store badge|complete, distinct"`

Expected: PASS.

---

### Task 2: Aspetto badge e allineamento frecce

**Files:**
- Modify: `src/styles.css`
- Modify: `src/App.test.jsx`

**Interfaces:**
- Consumes: `.bus-line__actions`, `.transport-extras .useful-actions`, `.text-link`, `.store-badge`.
- Produces: link di testo a larghezza contenuto e badge store responsive in `.store-badges`.

- [ ] **Step 1: Scrivere un test strutturale fallente**

Verificare che la scheda App ATAC abbia classe `has-store-badges` e che il relativo gruppo azioni abbia classe `store-badges`; questo isola gli stili dei badge senza influire sul Taxi.

```jsx
expect(screen.getByText('App ATAC Roma').closest('.useful-card')).toHaveClass('has-store-badges');
expect(screen.getByText('App ATAC Roma').closest('.useful-card').querySelector('.store-badges')).toBeTruthy();
```

- [ ] **Step 2: Verificare il fallimento**

Run: `npm test -- --run src/App.test.jsx -t "store badge layout"`

Expected: FAIL perché le classi di layout non esistono.

- [ ] **Step 3: Implementare classi e CSS**

In `UsefulNumbersPanel`, derivare `const hasStoreBadges = item.actions.some((action) => action.store)` e applicare le classi richieste. In `styles.css`, impostare i link testuali Trasporti con `width: fit-content`, `justify-content: flex-start`, `gap: 5px`, primo elemento `justify-self: start` e ultimo `justify-self: end`. Impostare `.store-badges` su due colonne, `.store-badge` con sfondo `#080d13`, testo bianco, SVG e altezza minima 48 px; a 320 px mantenere due colonne con font e padding ridotti finché non compare overflow.

- [ ] **Step 4: Verificare i test verdi**

Run: `npm test -- --run src/App.test.jsx -t "store badge layout|compact transport panel"`

Expected: PASS.

---

### Task 3: Verifica completa

**Files:**
- Modify only if verification exposes a scoped defect: `src/styles.css`, `src/components/SectionContent.jsx`, `src/App.test.jsx`.

**Interfaces:**
- Consumes: pannello Trasporti completo.
- Produces: build valida, URL corretti e layout mobile senza overflow.

- [ ] **Step 1: Eseguire suite, build e controllo diff**

Run: `npm test -- --run && npm run build && git diff --check`

Expected: 0 test falliti, build Vite completata e nessun output da `git diff --check`.

- [ ] **Step 2: Verificare 320 px e 430 px**

Avviare `npm run dev -- --host 127.0.0.1`. Alle due dimensioni verificare che ogni freccia disti circa 5 px dal relativo testo, che i badge siano separati e leggibili, che `scrollWidth === clientWidth` e che l'altezza scorrevole del pannello non superi quella precedente.

- [ ] **Step 3: Salvare l'implementazione**

```bash
git add src/App.test.jsx src/content.test.js src/content.js src/components/SectionContent.jsx src/styles.css
git commit -m "feat: add ATAC store badges"
```
