# Dismissible Inline Panels Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rendere richiudibili i box del promemoria raccolta e della recensione HOUSE, aggiungendo lo spazio richiesto prima dei bidoni.

**Architecture:** I due stati locali restano nei componenti che già possiedono i pannelli. Il pulsante promemoria diventa un toggle con testo e icona dipendenti dallo stato; la recensione riceve invece un pulsante di chiusura interno. Le stringhe accessibili restano nel contenuto bilingue e gli stili vengono aggiunti al foglio globale esistente.

**Tech Stack:** React 19, JavaScript/JSX, CSS, Vitest, React Testing Library, Vite.

## Global Constraints

- Il lavoro viene svolto direttamente sul branch `main` del worktree principale.
- Il promemoria chiuso mostra campanella e **Attiva promemoria**; aperto mostra `×` e **Chiudi promemoria**.
- La versione inglese usa **Enable reminders** e **Close reminders**.
- Il box recensione usa **Chiudi recensione** in italiano e **Close review** in inglese come nome accessibile.
- Tra il box promemoria aperto e l’elenco dei bidoni devono esserci 12 px.
- I controlli devono conservare uno stato `focus-visible` riconoscibile e non causare overflow a 320 px e 430 px.

---

## File Structure

- `src/content.js`: contiene le stringhe italiane e inglesi per i controlli aperti e chiusi.
- `src/content.test.js`: verifica la presenza delle nuove stringhe bilingui.
- `src/components/RecyclingPanel.jsx`: gestisce toggle, attributi accessibili e reset delle scelte del calendario.
- `src/components/SectionContent.jsx`: gestisce apertura e chiusura del box recensione.
- `src/styles.css`: aggiunge distanza sotto il box promemoria e stile del pulsante `×` della recensione.
- `src/App.test.jsx`: verifica i due flussi completi di apertura e chiusura.

---

### Task 1: Toggle del promemoria raccolta

**Files:**
- Modify: `src/content.js:313-322,596-605`
- Modify: `src/content.test.js:55-68`
- Modify: `src/components/RecyclingPanel.jsx:60-99`
- Modify: `src/styles.css:994-1020`
- Test: `src/App.test.jsx:294-310`

**Interfaces:**
- Consumes: `recycling.reminder`, `recycling.reminderIntro` e lo stato locale `showChoices: boolean`.
- Produces: `recycling.closeReminder: string`, il pannello `#recycling-reminder-options` e un pulsante toggle con `aria-expanded` e `aria-controls`.

- [ ] **Step 1: Scrivere i test che descrivono il nuovo comportamento**

In `src/content.test.js`, aggiungere:

```js
expect(it.recycling.closeReminder).toBe('Chiudi promemoria');
expect(en.recycling.reminder).toBe('Enable reminders');
expect(en.recycling.closeReminder).toBe('Close reminders');
```

In `src/App.test.jsx`, estendere il test del pulsante campanella:

```jsx
const reminder = screen.getByRole('button', { name: 'Attiva promemoria' });
expect(reminder).toHaveAttribute('aria-expanded', 'false');
expect(reminder.querySelector('[data-icon="calendar"]')).toBeTruthy();

await user.click(reminder);
expect(reminder).toHaveAccessibleName('Chiudi promemoria');
expect(reminder).toHaveAttribute('aria-expanded', 'true');
expect(reminder).toHaveAttribute('aria-controls', 'recycling-reminder-options');
expect(reminder.querySelector('.icon')).toHaveTextContent('×');
expect(screen.getByText('Scegli il calendario che usi sul telefono.')).toBeVisible();

await user.click(reminder);
expect(reminder).toHaveAccessibleName('Attiva promemoria');
expect(reminder).toHaveAttribute('aria-expanded', 'false');
expect(screen.queryByText('Scegli il calendario che usi sul telefono.')).not.toBeInTheDocument();
```

- [ ] **Step 2: Eseguire i test e confermare il fallimento**

Run: `npm test -- --run src/content.test.js src/App.test.jsx`

Expected: FAIL perché `closeReminder` non esiste, il testo non cambia e il pulsante non richiude il pannello.

- [ ] **Step 3: Implementare contenuto e toggle minimo**

In `src/content.js`, aggiungere:

```js
reminder: 'Attiva promemoria',
closeReminder: 'Chiudi promemoria',
```

```js
reminder: 'Enable reminders',
closeReminder: 'Close reminders',
```

In `RecyclingPanel`, aggiungere l’handler:

```jsx
const toggleChoices = () => {
  if (showChoices) setShowGoogle(false);
  setShowChoices(!showChoices);
};
```

Sostituire il controllo e identificare il pannello:

```jsx
<button
  className="primary-button recycling-reminder"
  type="button"
  aria-expanded={showChoices}
  aria-controls="recycling-reminder-options"
  onClick={toggleChoices}
>
  <Icon name={showChoices ? 'close' : 'calendar'} />
  {showChoices ? recycling.closeReminder : recycling.reminder}
</button>
{showChoices ? (
  <div className="reminder-panel" id="recycling-reminder-options">
```

In `src/styles.css`, aggiungere il margine inferiore:

```css
.reminder-panel {
  margin-top: 12px;
  margin-bottom: 12px;
}
```

- [ ] **Step 4: Eseguire i test mirati e confermare il passaggio**

Run: `npm test -- --run src/content.test.js src/App.test.jsx`

Expected: PASS per contenuti, toggle, stato accessibile e flussi calendario già esistenti.

- [ ] **Step 5: Committare il toggle del promemoria**

```bash
git add src/content.js src/content.test.js src/components/RecyclingPanel.jsx src/styles.css src/App.test.jsx
git commit -m "feat: make recycling reminders dismissible"
```

---

### Task 2: Chiusura interna del box recensione

**Files:**
- Modify: `src/content.js:273-287,556-570`
- Modify: `src/content.test.js:55-68`
- Modify: `src/components/SectionContent.jsx:172-217`
- Modify: `src/styles.css:1162-1187`
- Test: `src/App.test.jsx:266-279`

**Interfaces:**
- Consumes: `section.reviewPrompt`, `section.reviewHouse` e lo stato locale `showReview: boolean`.
- Produces: `section.closeReview: string`, il pannello `#checkout-review-panel` e il pulsante `.review-panel__close`.

- [ ] **Step 1: Scrivere i test che descrivono la chiusura**

In `src/content.test.js`, aggiungere:

```js
expect(it.sections.find(({ id }) => id === 'checkout').closeReview).toBe('Chiudi recensione');
expect(en.sections.find(({ id }) => id === 'checkout').closeReview).toBe('Close review');
```

In `src/App.test.jsx`, verificare il collegamento accessibile e chiudere dalla `×`:

```jsx
const reviewButton = screen.getByRole('button', { name: 'Lascia una recensione' });
expect(reviewButton).toHaveAttribute('aria-expanded', 'false');

await user.click(reviewButton);
expect(reviewButton).toHaveAttribute('aria-expanded', 'true');
expect(reviewButton).toHaveAttribute('aria-controls', 'checkout-review-panel');
expect(screen.getByText(/prenotato tramite HOUSE/)).toBeVisible();

const closeReview = screen.getByRole('button', { name: 'Chiudi recensione' });
expect(closeReview).toHaveTextContent('×');
await user.click(closeReview);
expect(reviewButton).toHaveAttribute('aria-expanded', 'false');
expect(screen.queryByText(/prenotato tramite HOUSE/)).not.toBeInTheDocument();
```

- [ ] **Step 2: Eseguire i test e confermare il fallimento**

Run: `npm test -- --run src/content.test.js src/App.test.jsx`

Expected: FAIL perché `closeReview`, `aria-controls` e il pulsante interno non esistono.

- [ ] **Step 3: Implementare contenuto, controllo e stile minimo**

In `src/content.js`, aggiungere alle sezioni checkout:

```js
closeReview: 'Chiudi recensione',
```

```js
closeReview: 'Close review',
```

Collegare il pulsante principale:

```jsx
<button
  className="action-link secondary"
  type="button"
  aria-expanded={showReview}
  aria-controls="checkout-review-panel"
  onClick={() => setShowReview(true)}
>
```

Aggiungere la chiusura al pannello:

```jsx
<div className="review-panel" id="checkout-review-panel">
  <button
    className="review-panel__close"
    type="button"
    aria-label={section.closeReview}
    onClick={() => setShowReview(false)}
  >
    <Icon name="close" />
  </button>
```

In `src/styles.css`, posizionare la `×` e proteggere il testo:

```css
.review-panel { position: relative; }
.review-panel p { padding-inline: 34px; }
.review-panel__close {
  position: absolute;
  top: 9px;
  right: 9px;
  display: grid;
  width: 34px;
  height: 34px;
  padding: 0;
  border: 1px solid rgba(23, 39, 55, 0.14);
  border-radius: 50%;
  place-items: center;
  color: var(--night);
  background: rgba(255, 255, 255, 0.68);
}
.review-panel__close:focus-visible {
  outline: 3px solid rgba(169, 78, 52, 0.34);
  outline-offset: 2px;
}
```

- [ ] **Step 4: Eseguire i test mirati e confermare il passaggio**

Run: `npm test -- --run src/content.test.js src/App.test.jsx`

Expected: PASS per apertura, bottone HOUSE disabilitato, chiusura e contenuto bilingue.

- [ ] **Step 5: Committare la chiusura della recensione**

```bash
git add src/content.js src/content.test.js src/components/SectionContent.jsx src/styles.css src/App.test.jsx
git commit -m "feat: make review panel dismissible"
```

---

### Task 3: Verifica completa desktop e mobile

**Files:**
- Verify: `src/components/RecyclingPanel.jsx`
- Verify: `src/components/SectionContent.jsx`
- Verify: `src/styles.css`
- Verify: `src/App.test.jsx`
- Verify: `src/content.test.js`

**Interfaces:**
- Consumes: i due flussi implementati nelle Task 1 e 2.
- Produces: evidenza che test, build, layout e console del browser sono puliti.

- [ ] **Step 1: Eseguire l’intera suite e la build**

Run: `npm test -- --run`, poi `npm run build`, poi `git diff --check`.

Expected: tutti i test PASS, build Vite conclusa senza errori e nessun errore di whitespace.

- [ ] **Step 2: Verificare la raccolta a 320 px e 430 px**

Avviare il server locale e, a entrambe le larghezze:

1. Aprire **Raccolta**.
2. Verificare campanella e testo iniziali.
3. Aprire il promemoria e verificare `×`, testo **Chiudi promemoria** e 12 px tra pannello e primo bidone.
4. Richiudere il pannello.
5. Verificare `document.documentElement.scrollWidth === document.documentElement.clientWidth`.

- [ ] **Step 3: Verificare la recensione a 320 px e 430 px**

A entrambe le larghezze:

1. Aprire **Check-out** e poi **Lascia una recensione**.
2. Verificare che la `×` sia allineata a destra e non copra il testo.
3. Premere la `×` e verificare la scomparsa del box.
4. Controllare che la console non contenga errori o warning.

- [ ] **Step 4: Controllare lo stato Git finale**

Run: `git status --short` e `git log -4 --oneline`.

Expected: worktree pulito e due commit di implementazione sopra il commit del piano.
