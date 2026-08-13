# Check-in House Photo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mostrare la fotografia reale dell’ingresso nella sezione Check-in al posto del segnaposto.

**Architecture:** La configurazione bilingue della sezione Check-in fornisce al componente esistente `CheckinPhoto` il percorso pubblico e il testo alternativo. Il componente conserva il proprio fallback in caso di errore; il CSS cambia soltanto il rapporto del riquadro da 16:9 a 6:7.

**Tech Stack:** React 19, JavaScript/JSX, CSS, Vitest, React Testing Library, Vite.

## Global Constraints

- Il lavoro viene svolto direttamente sul branch `main` del worktree principale.
- L’asset sorgente è `public/img_casa.jpg` e viene servito come `/img_casa.jpg`.
- Il riquadro usa `aspect-ratio: 6 / 7` e mantiene `object-fit: cover`.
- Testo alternativo italiano: **Ingresso della casa al civico 99**.
- Testo alternativo inglese: **House entrance at number 99**.
- Il fallback esistente resta disponibile se il caricamento fallisce.
- La foto resta prima di **Come entrare** e non deve causare overflow a 320 px o 430 px.

---

## File Structure

- `public/img_casa.jpg`: fotografia sorgente copiata da Vite nella radice della build.
- `src/content.js`: percorso e descrizioni accessibili italiane e inglesi.
- `src/content.test.js`: verifica il contratto bilingue della configurazione.
- `src/App.test.jsx`: verifica l’immagine reale e il suo ordine nella scheda Check-in.
- `src/styles.css`: proporzioni 6:7 del riquadro.

---

### Task 1: Integrare la foto reale nel Check-in

**Files:**
- Add: `public/img_casa.jpg`
- Modify: `src/content.js:54-64,364-374`
- Modify: `src/content.test.js:48-72`
- Modify: `src/App.test.jsx:160-172`
- Modify: `src/styles.css:507-523`
- Test: `src/content.test.js`
- Test: `src/App.test.jsx`

**Interfaces:**
- Consumes: `CheckinPhoto({ src, alt, fallback })` e il file pubblico `public/img_casa.jpg`.
- Produces: `housePhoto: '/img_casa.jpg'`, testi `housePhotoAlt` bilingui e un elemento `img` visibile prima delle istruzioni.

- [ ] **Step 1: Scrivere i test che rilevano il segnaposto attuale**

In `src/content.test.js`, aggiungere:

```js
const italianCheckin = it.sections.find(({ id }) => id === 'checkin');
const englishCheckin = en.sections.find(({ id }) => id === 'checkin');

expect(italianCheckin.housePhoto).toBe('/img_casa.jpg');
expect(italianCheckin.housePhotoAlt).toBe('Ingresso della casa al civico 99');
expect(englishCheckin.housePhoto).toBe('/img_casa.jpg');
expect(englishCheckin.housePhotoAlt).toBe('House entrance at number 99');
```

Sostituire in `src/App.test.jsx` il test del segnaposto con:

```jsx
test('places the real house photo before the entry instructions', async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole('button', { name: /Check-in/ }));

  const photo = screen.getByRole('img', {
    name: 'Ingresso della casa al civico 99',
  });
  const instructions = screen.getByText('Come entrare');

  expect(photo).toHaveAttribute('src', '/img_casa.jpg');
  expect(
    photo.compareDocumentPosition(instructions) &
      Node.DOCUMENT_POSITION_FOLLOWING,
  ).toBeTruthy();
  expect(screen.queryByText('Foto della casa in arrivo')).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Eseguire i test e confermare il fallimento**

Run: `npm test -- --run src/content.test.js src/App.test.jsx`

Expected: FAIL perché `housePhoto` è vuoto e il componente mostra ancora **Foto della casa in arrivo**.

- [ ] **Step 3: Collegare l’asset e aggiornare le proporzioni**

In `src/content.js`, usare per l’italiano:

```js
housePhoto: '/img_casa.jpg',
housePhotoAlt: 'Ingresso della casa al civico 99',
```

Per l’inglese:

```js
housePhoto: '/img_casa.jpg',
housePhotoAlt: 'House entrance at number 99',
```

Non modificare `housePhotoFallback`: `CheckinPhoto` continuerà a mostrare la stringa bilingue già configurata soltanto se il JPEG non può essere caricato.

In `src/styles.css`, aggiornare soltanto il rapporto:

```css
.checkin-photo {
  aspect-ratio: 6 / 7;
}
```

Conservare inalterato:

```css
.checkin-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

- [ ] **Step 4: Eseguire i test mirati e confermare il passaggio**

Run: `npm test -- --run src/content.test.js src/App.test.jsx`

Expected: PASS per configurazione bilingue, immagine visibile, percorso e ordine prima di **Come entrare**.

- [ ] **Step 5: Committare asset e integrazione**

```bash
git add public/img_casa.jpg src/content.js src/content.test.js src/App.test.jsx src/styles.css
git commit -m "feat: add house photo to check-in"
```

---

### Task 2: Verificare build e resa mobile

**Files:**
- Verify: `public/img_casa.jpg`
- Verify: `src/content.js`
- Verify: `src/App.test.jsx`
- Verify: `src/styles.css`

**Interfaces:**
- Consumes: l’asset e il contratto Check-in implementati nella Task 1, oltre ai box richiudibili già presenti.
- Produces: evidenza che build, test e resa reale funzionano a 320 px e 430 px.

- [ ] **Step 1: Eseguire la verifica automatica completa**

Run: `npm test -- --run`, poi `npm run build`, poi `test -f dist/img_casa.jpg`, infine `git diff --check`.

Expected: 30 test PASS, build Vite completata, `dist/img_casa.jpg` presente e nessun errore di whitespace.

- [ ] **Step 2: Verificare il Check-in a 320 px e 430 px**

Per entrambe le larghezze:

1. Aprire **Check-in**.
2. Verificare che la foto abbia rapporto 6:7 e preceda **Come entrare**.
3. Verificare visivamente che portone e civico 99 siano leggibili.
4. Verificare `document.documentElement.scrollWidth === document.documentElement.clientWidth`.

- [ ] **Step 3: Completare il controllo dei box richiudibili**

Per entrambe le larghezze:

1. Aprire **Raccolta**, aprire e richiudere il promemoria e misurare 12 px prima dei bidoni.
2. Aprire **Check-out**, aprire la recensione e richiuderla dalla `×` a destra.
3. Verificare l’assenza di errori e warning nella console.

- [ ] **Step 4: Controllare lo stato Git**

Run: `git status --short` e `git log -6 --oneline`.

Expected: worktree pulito e commit della foto sopra i commit dei box richiudibili.
