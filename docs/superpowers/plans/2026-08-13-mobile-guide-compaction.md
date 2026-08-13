# Mobile Guide Compaction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Compattare la guida su mobile, aggiornare le icone, semplificare la tab Ospedali e aggiungere i flussi inline per recensione e promemoria.

**Architecture:** Conservare i dati localizzati in `content.js` e i componenti specializzati già presenti. Le modifiche comportamentali saranno isolate in `GuideGrid`, `HealthPanel`, `RecyclingPanel` e nel pannello Checkout di `SectionContent`; la densità visuale resterà responsabilità di `styles.css` e le icone SVG di `Icon.jsx`.

**Tech Stack:** React 18, Vite, Vitest, Testing Library, CSS responsive, SVG inline.

## Global Constraints

- Lavorare nel worktree principale richiesto dall'utente.
- Conservare italiano e inglese equivalenti.
- Non introdurre nuove dipendenze.
- Non ridurre la leggibilità o le aree interattive sotto una dimensione comoda al tocco.
- Nessuno scorrimento orizzontale a 320 px.
- Il pulsante recensione HOUSE deve essere visibile ma disabilitato finché manca l'URL reale.
- Il contatore visite resta fuori da questa implementazione.

---

### Task 1: Titoli essenziali e icone semantiche

**Files:**
- Modify: `src/App.test.jsx`
- Modify: `src/components/GuideGrid.jsx`
- Modify: `src/components/Icon.jsx`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: `section.id`, `section.title`, `section.subtitle` da `getLocalizedContent()`.
- Produces: card con solo titolo visibile e `Icon({ name })` che rende SVG per `checkin`, `wifi`, `groceries`, `transport`, `food` e `calendar`.

- [ ] **Step 1: Scrivere test fallenti per sottotitoli e icone**

In `src/App.test.jsx`, aggiungere un test che verifichi che ogni card abbia un solo `.guide-card__copy strong`, nessun `small`, mantenga il sottotitolo nell'`aria-label` e che le cinque icone richieste contengano un elemento `svg` identificabile tramite `data-icon`.

```jsx
test('hides card subtitles while keeping accessible descriptions and semantic icons', () => {
  render(<App />);
  const cards = screen.getAllByTestId('guide-card');
  expect(document.querySelectorAll('.guide-card__copy small')).toHaveLength(0);
  expect(screen.getByRole('button', { name: /Check-in\. Arrivo e accesso/ })).toBeVisible();
  ['checkin', 'wifi', 'groceries', 'transport', 'food'].forEach((id) => {
    expect(document.querySelector(`[data-section-id="${id}"] [data-icon="${id}"]`)).toBeTruthy();
  });
});
```

- [ ] **Step 2: Eseguire il test e verificarne il fallimento**

Run: `npm test -- --run src/App.test.jsx`

Expected: FAIL perché i sottotitoli `small` sono ancora visibili e le icone non espongono `data-icon` SVG.

- [ ] **Step 3: Implementare card e SVG**

In `GuideGrid.jsx`, lasciare `section.subtitle` nell'`aria-label` ma rimuovere `<small>`. In `Icon.jsx`, aggiungere SVG inline con `data-icon={name}` per segnaposto, Wi-Fi, carrello, bus, dollaro e campanella; conservare `aria-hidden="true"` sul wrapper. Eliminare da `styles.css` la regola non più usata `.guide-card__copy small` e centrare verticalmente la copia senza alterare la griglia.

- [ ] **Step 4: Eseguire il test e verificare che passi**

Run: `npm test -- --run src/App.test.jsx`

Expected: PASS.

---

### Task 2: Ospedali essenziali e recensione HOUSE inline

**Files:**
- Modify: `src/App.test.jsx`
- Modify: `src/components/HealthPanel.jsx`
- Modify: `src/components/SectionContent.jsx`
- Modify: `src/content.js`
- Modify: `src/content.test.js`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: `section.reviewPrompt`, `section.reviewHouse`, `guide.links.review` e la tab interna di `HealthPanel`.
- Produces: box `.review-panel` aperto dal comando recensione e pulsante HOUSE disabilitato quando `guide.links.review` è una stringa vuota.

- [ ] **Step 1: Scrivere test fallenti per Ospedali e recensione**

Aggiornare il test Ospedali perché, dopo lo switch, verifichi due `hospital-card` e assenza sia di “Trova pronto soccorso nel Lazio” sia della nota 112. Aggiungere:

```jsx
test('opens an inline HOUSE review panel with a disabled placeholder button', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole('button', { name: /Check-out/ }));
  await user.click(screen.getByRole('button', { name: 'Lascia una recensione' }));
  expect(screen.getByText(/prenotato tramite HOUSE/)).toBeVisible();
  expect(screen.getByRole('button', { name: 'Lascia recensione su HOUSE' })).toBeDisabled();
});
```

In `content.test.js`, verificare che `links.review === ''` e che i testi HOUSE esistano in entrambe le lingue.

- [ ] **Step 2: Eseguire i test e verificarne il fallimento**

Run: `npm test -- --run src/App.test.jsx src/content.test.js`

Expected: FAIL perché la tab Ospedali mostra ancora link/nota e la recensione è ancora un link esterno.

- [ ] **Step 3: Implementare il comportamento minimo**

In `content.js`, impostare `links.review: ''`, aggiungere `reviewPrompt` e `reviewHouse` IT/EN. In `HealthPanel.jsx`, per la tab ospedali non renderizzare contenuti dopo la lista. In `SectionContent.jsx`, aggiungere stato locale `showReview`; il comando secondario diventa un `button` che apre `.review-panel`, contenente il testo e un link solo se l'URL è valorizzato, altrimenti un `button disabled`. Aggiungere gli stili coerenti in `styles.css`.

- [ ] **Step 4: Eseguire i test e verificare che passino**

Run: `npm test -- --run src/App.test.jsx src/content.test.js`

Expected: PASS.

---

### Task 3: Promemoria in alto e avviso vetro evidenziato

**Files:**
- Modify: `src/App.test.jsx`
- Modify: `src/components/RecyclingPanel.jsx`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: `recycling.reminder`, `recycling.demoNote`, calendario e `Icon name="calendar"`.
- Produces: `.recycling-reminder` prima dell'elenco, `.recycling-demo-note` dopo l'elenco e `<strong className="glass-warning">` intorno alla parola localizzata vetro/Glass.

- [ ] **Step 1: Scrivere test fallenti per ordine, campanella e vetro**

```jsx
test('places the bell reminder before the schedule and highlights glass in red', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole('button', { name: 'Raccolta' }));
  const reminder = screen.getByRole('button', { name: 'Attiva promemoria' });
  const firstDay = screen.getAllByTestId('recycling-day')[0];
  expect(reminder.compareDocumentPosition(firstDay) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(reminder.querySelector('[data-icon="calendar"]')).toBeTruthy();
  expect(screen.getByText('vetro', { exact: false }).closest('.glass-warning')).toBeTruthy();
});
```

- [ ] **Step 2: Eseguire il test e verificarne il fallimento**

Run: `npm test -- --run src/App.test.jsx`

Expected: FAIL perché il promemoria segue l'elenco, l'icona è un glifo e il vetro non ha marcatura dedicata.

- [ ] **Step 3: Implementare ordine e testo segmentato**

Spostare pulsante e pannello scelte all'inizio di `RecyclingPanel`. Creare un helper locale che separi `demoNote` con una regex case-insensitive `(vetro|glass)` e renda la corrispondenza in `<strong className="glass-warning">`. Lasciare l'elenco e quindi la nota come ultimi contenuti. In `styles.css`, rendere `.glass-warning` rosso e compattare righe, icone, gap e padding senza toccare il comportamento calendario.

- [ ] **Step 4: Eseguire il test e verificare che passi**

Run: `npm test -- --run src/App.test.jsx src/calendar.test.js`

Expected: PASS e calendari invariati.

---

### Task 4: Compattazione Trasporti e pannelli mobili

**Files:**
- Modify: `src/components/TransportPanel.jsx`
- Modify: `src/components/SectionContent.jsx`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: markup esistente `.bus-lines`, `.bus-line`, `.route-strip`, `.useful-list`, `.useful-card`.
- Produces: modificatori `.transport-panel` e `.transport-extras` per limitare la densità senza alterare altri elenchi utili.

- [ ] **Step 1: Aggiungere un'asserzione strutturale fallente**

Nel test trasporti esistente verificare che il dialog contenga `.transport-panel` e `.transport-extras`, così gli stili compatti restano isolati.

```jsx
expect(screen.getByRole('dialog').querySelector('.transport-panel')).toBeTruthy();
expect(screen.getByRole('dialog').querySelector('.transport-extras')).toBeTruthy();
```

- [ ] **Step 2: Eseguire il test e verificarne il fallimento**

Run: `npm test -- --run src/App.test.jsx`

Expected: FAIL perché i wrapper dedicati non esistono.

- [ ] **Step 3: Implementare wrapper e CSS compatto**

Avvolgere il contenuto di `TransportPanel` in `.transport-panel` e passare gli extra dentro `.transport-extras`. Ridurre in questo ambito: gap tra schede a 8 px, padding linea a 12 px, margini dettagli/percorso, dimensione punti e spazi interni; rendere le schede Taxi/ATAC più compatte con padding 12 px e azioni ravvicinate. Conservare link con altezza/tocco adeguata e applicare un fallback a colonna a 320 px soltanto se necessario.

- [ ] **Step 4: Eseguire il test e verificare che passi**

Run: `npm test -- --run src/App.test.jsx`

Expected: PASS.

---

### Task 5: Verifica completa e responsive

**Files:**
- Modify only if verification exposes a scoped defect: `src/styles.css`, relevant component or test.

**Interfaces:**
- Consumes: app completa.
- Produces: build valida e schermate senza overflow a 320 px e 430 px.

- [ ] **Step 1: Eseguire la suite completa**

Run: `npm test -- --run`

Expected: tutti i test PASS senza warning inattesi.

- [ ] **Step 2: Eseguire build e controllo whitespace**

Run: `npm run build`

Expected: build Vite completata.

Run: `git diff --check`

Expected: nessun output.

- [ ] **Step 3: Verificare visivamente su mobile**

Avviare `npm run dev -- --host 127.0.0.1`, aprire l'app a 320x700 e 430x932 e controllare schermata iniziale, Trasporti, Ospedali, Check-out e Raccolta. Per ogni viewport verificare `document.documentElement.scrollWidth === document.documentElement.clientWidth`, assenza di errori console e leggibilità/attivabilità dei controlli.

- [ ] **Step 4: Salvare l'implementazione**

```bash
git add src/App.test.jsx src/content.test.js src/content.js src/components/GuideGrid.jsx src/components/Icon.jsx src/components/HealthPanel.jsx src/components/RecyclingPanel.jsx src/components/SectionContent.jsx src/components/TransportPanel.jsx src/styles.css
git commit -m "feat: refine compact mobile guest guide"
```
